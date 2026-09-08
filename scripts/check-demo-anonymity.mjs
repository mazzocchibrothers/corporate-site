// check-demo-anonymity — the demo dashboards carry no personal data.
//
// The three files in data/demo/ were derived from real assessment programmes:
// hundreds of named participants, an agent network with a surname column, and a
// retail estate with store codes and per-store revenue. None of that is in the
// repository, and this is what makes that a fact rather than a claim.
//
// It reads the files two ways, because the two failures look different. As
// text, because a name can arrive in a comment or a key and never be a value.
// As a module, because "we removed the individual records" is a statement about
// the shape of the data, not about any one string in it.
//
// Every rule below carries its own dirty input at the bottom of the file and is
// asserted to fail on it. A rule that has only ever been run against clean data
// is a rule nobody has tested.
//
// Run: npm run check:demo-anonymity

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'data/demo');

/** A group smaller than this is not an anonymous population, so its scores do not ship. */
const MIN_GROUP = 25;

/** Headcounts round to this, so no count in these files is a fingerprint. */
const ROUND_TO = 5;

/**
 * The keys that hold a headcount. Explicit, because there is no way to tell a
 * count from a measurement by looking at the number: `threshold: 40` and
 * `visitsPerDay: 306` are neither counts nor rounded, and a heuristic that
 * guessed would have to be loosened until it stopped saying anything.
 */
const COUNT_KEYS = new Set([
  'n', 'stores', 'nStores', 'nIndividuals', 'invited', 'evaluated',
  'candidates', 'interviews', 'assessed', 'notAssessed',
  'salesAdvisors', 'storeManagers', 'outlets', 'topPerformers',
]);

// ---------------------------------------------------------------- text rules

const PATTERNS = [
  // A first name and a surname. Every source dashboard indexes people this way,
  // and the retail one indexes an aggregate by them too (`seg_dm`).
  ['a name', /\b[A-Z][a-zà-ù]+ [A-Z][a-zà-ù]+\b/u, { comments: true }],
  // The customers themselves. De-branding is the other half of the removal:
  // the numbers stay honest, the source of them does not ship.
  ['a customer name', /Fidia|Wind ?Tre|Motivi|Glow ?Up|\bOVS\b/i, { comments: true }],
  // Store codes are bare five-digit integers in the source. Nothing here needs
  // one — the largest legitimate figure is a four-digit total in thousands —
  // so the shape is refused outright rather than matched against a range.
  ['a store code', /\b\d{5}\b/, { comments: true }],
  // Copy lives in messages/. A string literal here is either a label that
  // should have been a key, or a value that was never anonymised at all.
  // Comments are dropped for this one alone: they are where the files explain
  // what was removed, and they quote key names in backticks to do it.
  ['a string literal', /(['"`])(?:(?!\1)[^\\])*\p{L}(?:(?!\1)[^\\])*\1/u, { comments: false }],
];

const stripComments = (text) => text.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ');

/** @returns {string[]} one message per rule the text breaks. */
function scanText(text) {
  const code = stripComments(text);
  return PATTERNS.flatMap(([what, re, where]) => {
    const hit = (where.comments ? text : code).match(re);
    return hit ? [`${what}: ${JSON.stringify(hit[0])}`] : [];
  });
}

// -------------------------------------------------------------- shape rules

/**
 * Walks a parsed module.
 *
 * The load-bearing rule is the first one: every leaf is a number. It is what
 * makes a row of people impossible to express here at all — a person is a name,
 * and a name is a string — and it is why the labels these keys stand for have
 * to live in the catalogue.
 */
function scanValue(node, path = '', out = []) {
  if (node === null || typeof node === 'number') return out;
  if (Array.isArray(node)) {
    node.forEach((v, i) => scanValue(v, `${path}[${i}]`, out));
    return out;
  }
  if (typeof node !== 'object') {
    out.push(`${path} is a ${typeof node}, and every leaf here must be a number`);
    return out;
  }
  for (const [key, value] of Object.entries(node)) {
    const at = path ? `${path}.${key}` : key;
    if (!/^[a-z][A-Za-z0-9]*$/.test(key)) out.push(`${at} is not an identifier key`);
    if (COUNT_KEYS.has(key)) {
      if (typeof value !== 'number' || value % ROUND_TO !== 0) {
        out.push(`${at} is ${value}, and a headcount rounds to ${ROUND_TO}`);
      }
      if (key === 'n' && typeof value === 'number' && value < MIN_GROUP) {
        out.push(`${at} is ${value}, under the ${MIN_GROUP}-person floor for a group that carries scores`);
      }
    }
    scanValue(value, at, out);
  }
  return out;
}

/** How many numbers a file holds. A dump of individual records is thousands. */
const LEAF_CAP = 600;
function countLeaves(node) {
  if (typeof node === 'number' || node === null) return 1;
  if (typeof node !== 'object') return 1;
  return Object.values(node).reduce((sum, v) => sum + countLeaves(v), 0);
}

// ------------------------------------------------------------------ the files

const files = readdirSync(DIR).filter((f) => f.endsWith('.ts')).sort();
assert.deepEqual(files, ['cross-country.ts', 'retail.ts', 'sales-network.ts'],
  'data/demo must hold exactly the three dashboards');

for (const file of files) {
  const text = readFileSync(join(DIR, file), 'utf8');
  assert.deepEqual(scanText(text), [], `data/demo/${file}`);

  const mod = await import(pathToFileURL(join(DIR, file)).href);
  const exported = Object.values(mod);
  assert.equal(exported.length, 1, `data/demo/${file} must export exactly one dataset`);

  const [data] = exported;
  assert.deepEqual(scanValue(data), [], `data/demo/${file}`);

  const leaves = countLeaves(data);
  assert.ok(leaves < LEAF_CAP,
    `data/demo/${file} holds ${leaves} numbers, over the ${LEAF_CAP} that says a record array crept back in`);

  // Not vacuous: the file must actually declare headcounts for the rules above
  // to have had anything to check.
  assert.ok(/\bn: \d+/.test(text), `data/demo/${file} declares no group size`);
}

// ------------------------------------------------------- the rules, run red
//
// Each of these is a line that has really been in one of the sources.

const DIRTY = [
  ['  dm: Alessandro Bosica,', 'a name'],
  ['// the Motivi store network', 'a customer name'],
  ['// Fidia Farmaceutici, cross-country', 'a customer name'],
  ['  cod: 36895,', 'a store code'],
  ['  name: "Parma · C.C. Eurotorri",', 'a string literal'],
];
for (const [line, expected] of DIRTY) {
  const found = scanText(line);
  assert.ok(found.some((f) => f.startsWith(expected)),
    `scanText missed ${expected} in ${JSON.stringify(line)} — it found ${JSON.stringify(found)}`);
}

const DIRTY_SHAPES = [
  [{ people: [{ n: 1, name: 'Sara' }] }, /is a string/],
  [{ people: [{ n: 1, name: 'Sara' }] }, /under the 25-person floor/],
  [{ population: { stores: 129 } }, /a headcount rounds to 5/],
  [{ 'Alessandro Bosica': { a: 5 } }, /is not an identifier key/],
  [{ segment: { n: 20, skill: 3 } }, /under the 25-person floor/],
];
for (const [shape, expected] of DIRTY_SHAPES) {
  const found = scanValue(shape);
  assert.ok(found.some((f) => expected.test(f)),
    `scanValue missed ${expected} in ${JSON.stringify(shape)} — it found ${JSON.stringify(found)}`);
}

// And clean input stays clean, so the rules above are not simply always red.
assert.deepEqual(scanText('  aboveThresholdPct: 20.5,'), []);
assert.deepEqual(scanValue({ area1: { n: 85, skill: 32.1 } }), []);
assert.ok(countLeaves(Array.from({ length: LEAF_CAP }, () => ({ skill: 1, pk: 2 }))) > LEAF_CAP);

console.log(`[OK] demo-anonymity — ${files.length} datasets, aggregates only`);
