// check-i18n — guards i18n/translations.ts against duplicate keys.
//
// Why this exists: the dictionary is a plain object literal, so a repeated key
// silently overwrites the earlier one — no error, no warning, in the editor or
// at build time. Two pages that pick the same English fragment as a key end up
// sharing one Italian value, and whichever page loses reads wrong in Italian
// with nothing to point at. That already happened 79 times, 10 of them with
// genuinely different values.
//
// Scope is deliberately narrow: duplicates only. The dictionary's other two
// defects (English-as-key, and t() calls whose key is missing) are recorded in
// harness/docs/verification.md and need copy decisions, not a parser.
//
// Run: npm run check:i18n

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

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

console.log(`[OK] ${FILE}: ${entries.length} entries, ${seen.size} unique keys, no duplicates`);
