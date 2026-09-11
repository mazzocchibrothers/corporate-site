import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ALLOWED = new Set('#000000 #010102 #040404 #047857 #050508 #059669 #064e3b #08080c #0b3b28 #0d0d0d #0d0d1f #0e0e0e #10b981 #111 #113 #116 #121212 #126 #136 #137 #138 #141516 #144 #16163a #16a34a #1a1a2e #1a1a3f #201436 #222 #22c55e #23234d #2a2350 #3133e7 #3a1730 #4b4df7 #4e4e4e #4e6bff #5667ff #5ddba4 #6366f8 #7577f8 #7a7a7a #7b4dff #7b7df9 #8385ff #848484 #8587ff #888888 #8a8cff #9395ff #93e0bb #9a9a9a #9b59b6 #9b9dfb #a8ecca #a9a9a9 #a9aaff #b7f5d8 #c7d2fe #cdc6f5 #d9603f #d97706 #e2e8f0 #e3f9ec #e5e7eb #e6d5ea #e6e6e6 #ea580c #ece9fb #ef4444 #f0f0f8 #f1f5f9 #f5f5f7 #f5f5fa #f7e6dc #f7f7f7 #f8ddc9 #f8f8fa #f8f8ff #fafafa #ff5656 #ff5b5b #ff5f24 #ff6262 #ff6550 #ff7a7a #ff7d49 #ff8447 #ff8a8a #ff8c00 #ff8c42 #ff9a9a #ffaf64 #ffb74b #fff #ffffff'.split(' '));
const walk = (dir) => readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory() ? walk(join(dir, entry.name)) : entry.name.endsWith('.tsx') ? [join(dir, entry.name)] : [],
);

// Comments come out first: `#176` is a three-digit hex, and so is every Issue
// number this repo encourages people to cite in a comment, so the gate read
// them as colours and went red on prose (#177).
//
// Not with a regex, though. The obvious stripper — the one check-dead.mjs uses
// — treats `//` as the start of a comment unless a colon precedes it, and seven
// files here embed the HubSpot script with a protocol-relative URL:
//
//     script.src = '//js.hsforms.net/forms/embed/v2.js';
//
// It would cut from that quote to the end of the line. Nothing is lost there
// today, but this is the file whose entire job is to notice a colour, and a
// stripper that can silently swallow one is a worse bug than the false positive
// it was brought in to fix. So: one pass, tracking whether we are inside a
// string. Comments become whitespace, everything else survives byte for byte.
const stripComments = (src) => {
  let out = '';
  let quote = null; // the open string delimiter, or null when in code

  for (let i = 0; i < src.length; i += 1) {
    const c = src[i];

    if (quote) {
      out += c;
      if (c === '\\') {
        out += src[i + 1] ?? '';
        i += 1;
      } else if (c === quote) {
        quote = null;
      }
      continue;
    }

    if (c === "'" || c === '"' || c === '`') {
      quote = c;
      out += c;
      continue;
    }

    if (c === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i += 1;
      out += '\n';
      continue;
    }

    if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      const comment = src.slice(i, end === -1 ? src.length : end + 2);
      out += comment.replace(/[^\n]/g, ' '); // keep the newlines, drop the text
      i += comment.length - 1;
      continue;
    }

    out += c;
  }

  return out;
};

// The stripper is the one part of this gate that can make it lie, so it is
// asserted rather than trusted: everything below is a colour that must still be
// found, or prose that must not be mistaken for one.
for (const [source, expected, why] of [
  ['const s = "//js.hsforms.net/x"; const c = "#123456";', '#123456',
    'a protocol-relative URL in a string does not open a comment'],
  ['const s = `a //b`; const c = "#123456";', '#123456',
    '…nor does one in a template literal'],
  ['const s = "a/*b*/"; const c = "#123456";', '#123456',
    '…nor does /* inside a string open a block comment'],
  ['const s = "esc\\" d"; const c = "#123456";', '#123456',
    'an escaped quote does not end the string'],
  ['const c = "#123456"; // trailing comment', '#123456',
    'a colour before a comment survives it'],
  ['// Issue (#176), #168, #abc, and a fake #123456', null,
    'a line comment contributes nothing — Issue numbers are three-digit hex (#177)'],
  ['/* block comment with #123456 in it */', null, 'and neither does a block comment'],
]) {
  const found = stripComments(source).match(/#[0-9a-f]{3,8}\b/gi);
  assert.deepEqual(found, expected === null ? null : [expected], why);
}

const unexpected = [];
for (const file of ['app', 'components'].flatMap(walk)) {
  const source = stripComments(readFileSync(join(ROOT, file), 'utf8'));
  for (const color of source.match(/#[0-9a-f]{3,8}\b/gi) ?? []) {
    if (!ALLOWED.has(color.toLowerCase())) unexpected.push(`${relative('.', file)}: ${color}`);
  }
}

assert.deepEqual(unexpected, [], `Unexpected hex color(s):\n${unexpected.join('\n')}`);
console.log(`[OK] colors: ${ALLOWED.size} approved hex values`);
