// check-i18n — guards i18n/translations.ts against duplicate keys.
//
// Why this exists: the dictionary is a plain object literal, so a repeated key
// silently overwrites the earlier one — no error, no warning, in the editor or
// at build time. Two pages that pick the same English fragment as a key end up
// sharing one Italian value, and whichever page loses reads wrong in Italian
// with nothing to point at. That already happened 79 times, 10 of them with
// genuinely different values.
//
// It also checks the catalogue that is replacing it: every key a
// useTranslations/getTranslations call site asks for must exist in both
// messages/en.json and messages/it.json. Today that is 3 call sites; by #118 it
// is every string on the site, and a missing key there renders as the key path
// itself in production.
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
const FILE = 'i18n/translations.ts';

// Every entry in this file is a single line: two quoted strings and a comma.
// Verified against all 1218 content lines — see the shape guard below, which
// is what keeps this line-based parse honest instead of merely convenient.
const ENTRY =
  /^ {2}('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")\s*:\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")\s*,?\s*$/;

// A key written 'l\'anno' and one written "l'anno" are the same key to
// JavaScript. Compare the decoded strings, or the check reports pairs that
// aren't duplicates and misses pairs that are.
const decode = (quoted) =>
  quoted
    .slice(1, -1)
    .replace(/\\(['"\\])/g, '$1');

const lines = readFileSync(join(ROOT, FILE), 'utf8').split('\n');

const entries = [];
const unparsed = [];

for (const [index, line] of lines.entries()) {
  const lineNo = index + 1;
  if (!line.trim() || line.trim().startsWith('//')) continue;
  const match = ENTRY.exec(line);
  if (match) {
    entries.push({ lineNo, key: decode(match[1]), value: decode(match[2]) });
  } else {
    unparsed.push({ lineNo, line: line.trim() });
  }
}

// ── Shape guard ────────────────────────────────────────────────────────────
// The duplicate scan can only see lines it parsed. A multi-line value, or a
// nested object, would slip past the regex and be silently exempt from the
// check — the failure mode where a gate stays green precisely because it
// stopped looking. Only the two structural lines may go unparsed.
const STRUCTURAL = ['export const translations = {', '};'];
const unexpected = unparsed.filter((u) => !STRUCTURAL.includes(u.line));

assert.deepEqual(
  unexpected,
  [],
  `${FILE}: ${unexpected.length} line(s) the duplicate scan cannot read, so they are not being checked.\n` +
    unexpected.map((u) => `  L${u.lineNo}: ${u.line.slice(0, 100)}`).join('\n') +
    '\nEvery entry must be a single line: \'key\': \'value\',',
);

assert.ok(entries.length > 0, `${FILE}: parsed 0 entries — the parser is broken, not the file.`);

// ── Duplicate keys ─────────────────────────────────────────────────────────
const seen = new Map();
for (const entry of entries) {
  if (!seen.has(entry.key)) seen.set(entry.key, []);
  seen.get(entry.key).push(entry);
}

const duplicates = [...seen.entries()].filter(([, occurrences]) => occurrences.length > 1);

if (duplicates.length > 0) {
  const report = duplicates
    .map(([key, occurrences]) => {
      const values = new Set(occurrences.map((o) => o.value));
      const verdict = values.size > 1 ? 'CONFLICT — the last value silently wins' : 'same value';
      const where = occurrences
        .map((o, i) => {
          const wins = i === occurrences.length - 1 && values.size > 1 ? '  <- in use today' : '';
          return `      L${o.lineNo}: ${JSON.stringify(o.value)}${wins}`;
        })
        .join('\n');
      return `  ${JSON.stringify(key)}  [${verdict}]\n${where}`;
    })
    .join('\n\n');

  assert.fail(
    `${FILE}: ${duplicates.length} duplicate key(s).\n\n${report}\n\n` +
      'Fix: keep one declaration per key. Deleting the earlier occurrences preserves\n' +
      'what the site renders today, because the last declaration is the one that wins.\n' +
      'A CONFLICT usually means two different sentences are sharing one key — no single\n' +
      'value is right for both, and the real fix is to stop sharing it.',
  );
}

// ── Italian values identical to their English key ──────────────────────────
// A ratchet, not an allowlist. Most of these are correct — proper nouns,
// percentages, and the English job titles Italian tech companies actually use
// ("ML Engineer" is not translated to "Ingegnere ML" by anyone). Naming an
// owner for each would be bureaucracy around a file that #110 deletes. What
// matters is that the number cannot grow: a genuinely untranslated string added
// tomorrow fails here, and every one of these is read again as its page moves
// to the catalogue in #106-#118.
const UNTRANSLATED_BUDGET = 42;
const untranslated = entries.filter((e) => e.key === e.value);

assert.ok(
  untranslated.length <= UNTRANSLATED_BUDGET,
  `${FILE}: ${untranslated.length} entries whose Italian value is the English key, ` +
    `up from ${UNTRANSLATED_BUDGET}.\n` +
    untranslated.map((e) => `  L${e.lineNo}: ${JSON.stringify(e.key)}`).join('\n') +
    '\nIf the new one is a proper noun or a term Italian keeps in English, raise the ' +
    'budget in this file and say which. Otherwise translate it.',
);

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
  `[OK] ${FILE}: ${entries.length} entries, ${seen.size} unique keys, no duplicates, ` +
    `${untranslated.length}/${UNTRANSLATED_BUDGET} untranslated\n` +
    `[OK] messages: ${checked} key(s) used by call sites exist in en and it` +
    (dynamic > 0 ? ` (${dynamic} dynamic namespace(s) not statically checkable)` : ''),
);
