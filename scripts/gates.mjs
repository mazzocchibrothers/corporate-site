// Prints the gate list, one per line, in the order it must run.
//
// It exists so that harness/init.sh and .github/workflows/ci.yml cannot
// disagree about what "green" means. They used to hold two copies of the list,
// which is the same defect as the four hand-kept routing lists this project
// started by removing — a gate added locally and forgotten in CI is a gate that
// only runs when someone remembers to run it.
//
// The list is derived, not written: `typecheck` first, because a type error
// makes every other failure noise, then every `check:*` script in package.json
// in declaration order. Adding a gate means adding a script — nothing else.
//
// `check:build` is not in the list. It runs `next build`, which is the slow
// tier: harness/init.sh runs it separately and skips it under --fast, and CI
// runs it as its own step. Including it here would run the build twice and make
// --fast mean nothing.
//
// Run: node scripts/gates.mjs [--all]

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { scripts } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

const SLOW = new Set(['check:build']);
const all = process.argv.includes('--all');
const gates = [
  'typecheck',
  ...Object.keys(scripts).filter((s) => s.startsWith('check:') && (all || !SLOW.has(s))),
];

if (gates.length < 2) {
  console.error('[FAIL] scripts/gates.mjs found no check:* scripts. Every gate would be skipped.');
  process.exit(1);
}

console.log(gates.join('\n'));
