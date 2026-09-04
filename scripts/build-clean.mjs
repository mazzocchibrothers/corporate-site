// build-clean — `next build`, and a warning is a failure.
//
// Next 16 deprecated the `middleware` file convention in favour of `proxy`, and
// said so on every build for a whole session. Nobody read it, because the way
// this project checks a build is `grep -E "Error"` and a deprecation is not an
// error. It is the thing that becomes one at the next major.
//
// So the build gate reads its own output. A deprecation notice, a Browserslist
// nag, an experimental-feature warning: each is Next telling you something has
// moved, and each is cheap to act on the day it appears and expensive a year
// later.
//
// Run: npm run check:build

import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Lines that carry a warning but are not one: Next prints these as part of
// normal output.
const NOT_A_WARNING = [
  /Compiled successfully/,
  /^\s*$/,
];

const build = spawn('npx', ['next', 'build'], { cwd: ROOT, env: { ...process.env, FORCE_COLOR: '0' } });

let output = '';
const capture = (chunk) => { const s = String(chunk); output += s; process.stdout.write(s); };
build.stdout.on('data', capture);
build.stderr.on('data', capture);

const code = await new Promise((resolve) => build.on('close', resolve));
if (code !== 0) {
  console.error('\n[FAIL] next build exited ' + code);
  process.exit(code);
}

const warnings = output
  .split('\n')
  .filter((line) => /(^|\s)(⚠|warn(ing)?[: ]|deprecat|Browserslist:)/i.test(line))
  .filter((line) => !NOT_A_WARNING.some((r) => r.test(line)))
  .map((line) => `  ${line.trim()}`);

if (warnings.length > 0) {
  console.error(
    `\n[FAIL] the build printed ${warnings.length} warning(s):\n${warnings.join('\n')}\n\n` +
      'A warning here is a deprecation with a date on it. Act on it now, while it is one line, ' +
      'or read it again every build until it becomes an error.',
  );
  process.exit(1);
}

console.log(`\n[OK] build: clean, no warnings`);
