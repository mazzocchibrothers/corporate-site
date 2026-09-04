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

const missing = [];
let checked = 0;
let dynamic = 0;

for (const file of sources) {
  const src = readFileSync(join(ROOT, file), 'utf8');
  dynamic += [...src.matchAll(DYNAMIC_NS)].length;

  for (const [, binding, , namespace] of src.matchAll(BINDING)) {
    // `t('key')` and `t.rich('key')` for this binding, string literals only.
    const usage = new RegExp(`\\b${binding}(?:\\.rich)?\\(\\s*(['"])([^'"\`]+)\\1`, 'g');
    for (const [, , key] of src.matchAll(usage)) {
      const path = `${namespace}.${key}`;
      checked += 1;
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
  `[OK] messages: ${checked} key(s) used by call sites exist in en and it` +
    (dynamic > 0 ? ` (${dynamic} dynamic namespace(s) not statically checkable)` : ''),
);
