// check-i18n — every key a call site asks for exists, in both languages.
//
// It used to guard i18n/translations.ts against duplicate keys: the dictionary
// was a plain object literal, so a repeated key silently overwrote the earlier
// one and two pages ended up sharing an Italian value. That file is gone (#110),
// and the guard with it — there is nothing left to duplicate.
//
// What remains is the check that matters now. next-intl renders the key path
// itself when a key is missing, so `home.meta.title` ships as literal text on
// the page. This is what stops that.
//
// en/it key-set parity is NOT asserted here — check:messages already does it,
// and two gates asserting the same thing is the drift this project exists to
// remove.
//
// Run: npm run check:i18n

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── Every key a call site asks for exists in both catalogues ───────────────
const catalogues = Object.fromEntries(
  ['en', 'it'].map((l) => [l, JSON.parse(readFileSync(join(ROOT, `messages/${l}.json`), 'utf8'))]),
);

const has = (catalogue, path) =>
  path.split('.').reduce((node, seg) => (node == null ? undefined : node[seg]), catalogue) !==
  undefined;

const SCAN_DIRS = ['pages', 'components', 'app', 'i18n', 'lib', 'hooks'];
const sources = SCAN_DIRS.flatMap(function walk(dir) {
  let listing;
  try {
    listing = readdirSync(join(ROOT, dir), { withFileTypes: true });
  } catch {
    return [];
  }
  return listing.flatMap((e) =>
    e.isDirectory()
      ? walk(join(dir, e.name))
      : /\.tsx?$/.test(e.name)
        ? [join(dir, e.name)]
        : [],
  );
});

// `const t = useTranslations('home.meta')` / `= await getTranslations('x')`.
const BINDING = /(?:const|let)\s+(\w+)\s*=\s*(?:await\s+)?(?:use|get)Translations\s*\(\s*(['"])([^'"]*)\2\s*\)/g;
// A namespace that is not a plain string — i18n/metadata.ts derives it from the
// registry. Not checkable statically; counted so it stays visible.
const DYNAMIC_NS = /(?:use|get)Translations\s*\(\s*(?!['"]|\))/g;

// Both sets hold `file|namespace.key`, and both are Sets for the same reason:
// the loop below runs once per `useTranslations` binding, so a file that
// declares one twice — five of the lp/ pages do, once per component — sweeps
// its own call sites twice. Counting the raw matches inflated the static side
// by a fifth and left the two halves of the ratio measured differently (#177
// review). One call site is one call site.
const missing = [];
const shapes = new Set();
const checked = new Set();
let dynamic = 0;

for (const file of sources) {
  const src = readFileSync(join(ROOT, file), 'utf8');
  dynamic += [...src.matchAll(DYNAMIC_NS)].length;

  for (const [, binding, , namespace] of src.matchAll(BINDING)) {
    // A key built at runtime — `t(`dashboards.${id}.sector`)`. There is nothing
    // to look up: `${id}` could be anything, so no catalogue lookup can decide
    // whether the key exists. What is wrong is staying quiet about it. In #176
    // a key was deleted from both catalogues in the belief that this gate
    // covered its call site; it did not, and it would have stayed green with
    // the page rendering `demo.dashboards.crossCountry.sector` as text.
    //
    // So they are listed, every run, with the shape the call site asks for.
    // Whoever writes one knows it is uncovered instead of assuming otherwise.
    const template = new RegExp(`\\b${binding}(?:\\.rich|\\.raw)?\\(\\s*\`([^\`]*)\``, 'g');
    for (const [, shape] of src.matchAll(template)) {
      shapes.add(`${relative('.', file)}|${namespace}.${shape}`);
    }

    // `t('key')`, `t.rich('key')` and `t.raw('key')` for this binding, string
    // literals only. `.raw` was outside the regex until #177, so 96 call sites
    // went unchecked — it returns the message instead of formatting it, which
    // changes nothing about whether the key has to exist. (96 is the delta of
    // `checked`, 2280 to 2376; the raw occurrence count is 105, and an earlier
    // draft of this comment said 108 — the same class of miscount the rest of
    // this commit exists to fix.)
    const usage = new RegExp(`\\b${binding}(?:\\.rich|\\.raw)?\\(\\s*(['"])([^'"\`]+)\\1`, 'g');
    for (const [, , key] of src.matchAll(usage)) {
      const path = `${namespace}.${key}`;
      checked.add(`${relative('.', file)}|${path}`);
      for (const locale of ['en', 'it']) {
        if (!has(catalogues[locale], path)) {
          missing.push(`  ${relative('.', file)}: ${path} missing from messages/${locale}.json`);
        }
      }
    }
  }
}

assert.deepEqual(
  missing,
  [],
  `${missing.length} translation key(s) a call site asks for do not exist.\n` +
    missing.join('\n') +
    '\nnext-intl renders the key path itself when a key is missing, so this ships as ' +
    'literal "home.meta.title" on the page.',
);

console.log(
  `[OK] messages: ${checked.size} key(s) used by call sites exist in en and it` +
    (dynamic > 0 ? ` (${dynamic} dynamic namespace(s) not statically checkable)` : ''),
);

if (shapes.size > 0) {
  const entries = [...shapes].map((s) => s.split('|')).sort();
  const files = [...new Set(entries.map(([file]) => file))];
  const worst = files
    .map((file) => [file, entries.filter(([f]) => f === file).length])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  const share = Math.round((shapes.size / (shapes.size + checked.size)) * 1000) / 10;

  console.log(
    `[--] ${shapes.size} key shape(s) in ${files.length} file(s) are built at runtime, so ` +
      `nothing above covers them — ${share}% of the call sites on the site.\n` +
      worst.map(([file, n]) => `     ${file} (${n})`).join('\n') +
      (process.argv.includes('--list')
        ? `\n${entries.map(([file, key]) => `     ${file}: ${key}`).join('\n')}`
        : '\n     Full list: node scripts/check-i18n.mjs --list'),
  );
}
