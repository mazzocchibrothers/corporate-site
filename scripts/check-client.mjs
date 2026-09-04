// check-client — every file that needs `'use client'` has it, and no file that
// doesn't need it carries it.
//
// Why this exists: under the App Router the directive is the boundary between
// what runs on the server and what ships to the browser, and getting it wrong
// fails in two different unhelpful ways. Missing, and the build dies with a
// stack trace pointing at React internals rather than at the file. Present
// where it isn't needed, and the boundary creeps upward one component at a
// time until the whole tree is client-rendered and nobody can say when that
// happened.
//
// Neither failure is something a human notices by reading a diff, which is why
// this is a check and not a convention. It also means the answer to "does this
// component need the directive?" is a command, not a judgement call.
//
// Run: npm run check:client        (--fix inserts the missing directives)

import assert from 'node:assert/strict';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['components', 'hooks', 'lib', 'i18n'];
const FIX = process.argv.includes('--fix');

// A Server Component may not use hooks, context, browser APIs or event
// handlers. These are the ways this codebase reaches for them.
const SIGNALS = [
  // Any hook, not a list of React's: `useToast` and `useTheme` are hooks too,
  // and an enumerated list would have missed both (it did).
  [/\buse[A-Z]\w*\s*\(/, 'hooks'],
  [/\bcreateContext\b/, 'createContext'],
  [/from ['"]framer-motion['"]/, 'framer-motion'],
  [/from ['"]next\/router['"]/, 'next/router'],
  [/\son[A-Z]\w*={/, 'event handlers'],
  [/\b(window|document|localStorage|sessionStorage|navigator|matchMedia|IntersectionObserver|ResizeObserver)\b/, 'browser APIs'],
];

// Dependencies whose importer has to carry the directive itself.
//
// Two different reasons, both found by building a Server Component that
// imports every file this check calls server-capable:
//
//   react-day-picker, embla-carousel-react  ship no 'use client' at all and
//     call createContext at module scope:
//     `TypeError: (0 , q.createContext) is not a function`
//
//   cmdk, vaul  do ship it, but the shadcn wrapper reads `.displayName` off
//     the primitive at module scope, and on the server that is a client
//     reference, not a component:
//     `TypeError: Cannot read properties of undefined (reading 'displayName')`
//
// Radix does not belong here: its own 'use client' is enough, and 40 wrappers
// around it render on the server today. That was measured, not assumed.
const CLIENT_DEPS = ['react-day-picker', 'embla-carousel-react', 'cmdk', 'vaul'];

const walk = (dir) =>
  readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? walk(join(dir, e.name))
      : /\.tsx?$/.test(e.name) && !e.name.endsWith('.d.ts')
        ? [join(dir, e.name)]
        : [],
  );

// Comments are stripped first: a `// uses window.matchMedia` in a note about
// why something was removed would otherwise keep the file marked client
// forever.
const strip = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

// Each comment must be consumed to its newline. Without the `\n` the `.*`
// backtracks mid-line and finds the words 'use client' inside a sentence about
// 'use client' — which is exactly what i18n/request.ts says in its header.
const HAS_DIRECTIVE = /^(?:\s*\/\/[^\n]*\n|\s*\/\*[\s\S]*?\*\/)*\s*['"]use client['"]/;

const missing = [];
const gratuitous = [];
let client = 0;

for (const file of DIRS.flatMap(walk)) {
  const src = readFileSync(join(ROOT, file), 'utf8');
  const clean = strip(src);
  const reasons = SIGNALS.filter(([re]) => re.test(clean)).map(([, why]) => why);
  for (const dep of CLIENT_DEPS) {
    if (new RegExp(`from ['"]${dep}['"]`).test(clean)) reasons.push(`${dep} (client-only dependency)`);
  }
  const has = HAS_DIRECTIVE.test(src);

  if (reasons.length > 0) client += 1;

  if (reasons.length > 0 && !has) {
    if (FIX) {
      // After the leading comment block, not above it: `// @ts-nocheck` has to
      // stay in the first comments to be honoured, and 97 files open with it.
      const lines = src.split('\n');
      let at = 0;
      while (at < lines.length && (lines[at].trim() === '' || lines[at].trim().startsWith('//'))) at += 1;
      lines.splice(at, 0, "'use client';", '');
      writeFileSync(join(ROOT, file), lines.join('\n'));
    } else {
      missing.push(`  ${file}  <- ${reasons.join(', ')}`);
    }
  }

  if (reasons.length === 0 && has) gratuitous.push(`  ${file}`);
}

if (FIX) {
  console.log(`[OK] inserted 'use client' where it was missing — re-run without --fix`);
} else {
  assert.deepEqual(
    missing,
    [],
    `${missing.length} file(s) use client-only features without 'use client':\n${missing.join('\n')}`,
  );
  assert.deepEqual(
    gratuitous,
    [],
    `${gratuitous.length} file(s) carry 'use client' but use nothing that needs it:\n` +
      `${gratuitous.join('\n')}\n` +
      'Each one pulls a component that could render on the server into the browser bundle.',
  );
  console.log(`[OK] client boundaries: ${client} client, ${DIRS.flatMap(walk).length - client} server-capable`);
}
