// check-placeholders — a value marked "[TODO:" is not ready to ship.
//
// Content sometimes has to land before its final copy does: a card whose
// wording is still being decided, a date that is the day it merges. The
// placeholder goes in as `[TODO: …]` and this gate fails until every one is
// replaced, so a forgotten one cannot reach main. The bracket is part of the
// marker: a bare TODO matches Italian copy ("METODO").
//
// Scanned: both catalogues, every value; and data/, every string literal.
//
// Run: npm run check:placeholders

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MARKER = /\[TODO:/;
const found = [];

const walk = (node, path, file) => {
  if (typeof node === 'string') {
    if (MARKER.test(node)) found.push(`  ${file}  ${path}: ${node}`);
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k, file);
  }
};
for (const locale of ['en', 'it']) {
  const file = `messages/${locale}.json`;
  walk(JSON.parse(readFileSync(join(ROOT, file), 'utf8')), '', file);
}

for (const name of readdirSync(join(ROOT, 'data'), { recursive: true })) {
  if (!/\.(ts|json)$/.test(name)) continue;
  const file = `data/${name}`;
  readFileSync(join(ROOT, file), 'utf8').split('\n').forEach((line, i) => {
    if (MARKER.test(line)) found.push(`  ${file}:${i + 1}  ${line.trim()}`);
  });
}

assert.deepEqual(
  found,
  [],
  `${found.length} placeholder(s) still marked [TODO: — replace them before merging:\n${found.join('\n')}`,
);
console.log('[OK] no [TODO: placeholders in the catalogues or data/');
