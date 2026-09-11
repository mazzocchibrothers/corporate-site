// check-colors — every hex the site draws is in the palette.
//
// This used to scan the raw text of the .tsx files, comments included. `#176`
// is a three-digit hex, and so is every Issue number this repo encourages
// people to cite in a comment: the gate read them as colours and went red on
// prose (#177).
//
// The obvious fix is to strip comments before looking. It does not hold, tried
// twice. A regex `(^|[^:])//.*$` cuts from a `//` inside a string to the end of
// the line, and seven files here load the HubSpot script with a
// protocol-relative URL — `script.src = '//js.hsforms.net/forms/embed/v2.js'` —
// which no colon precedes. A hand-written scanner that tracks quotes trips on
// the first unpaired apostrophe in JSX text, which opens a string that never
// closes, and stops stripping comments from there on. Both fail silently, and
// this is the file whose only job is to notice a colour: an extra green here
// costs nothing until it costs everything.
//
// So nothing is stripped. A colour in a .tsx always lives inside a string, a
// template literal or JSX text — never in a comment, by definition — and the
// TypeScript parser already knows which is which. It is the same parser that
// runs in `npm run typecheck`, so this is not a new dependency.
//
// One thing to know: `ts.createSourceFile` is error-tolerant, so a file that
// does not parse yields fewer nodes rather than an exception — run by hand
// against a half-written source, this gate would say green. In
// `harness/init.sh`, `typecheck` runs first, so it never gets there broken.
//
// Run: npm run check:colors

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import ts from 'typescript';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// The palette. Until #177 it also held #113, #116, #126, #136, #137, #138 and
// #144: those are not colours, they are the numbers of Issues cited in as many
// comments, added here to turn the gate green. It is the shape a false positive
// takes when the shortest way to silence it is to widen the list of what counts
// as allowed — and every entry added that way is a real colour that passes from
// then on with nobody looking at it.
//
// The three entries #189 added are the opposite case, and are worth telling
// apart from those: they silence no false positive, they admit a colour the
// site was already drawing from outside the gate's reach.
//
//   #ff8a5b   the share card's eyebrow (i18n/og-card.tsx). An orange taken from
//             between the two warm ends of the brand gradient, #ffaf64 and
//             #ff5656. Not drift: it has been there since the card existed, and
//             every preview on LinkedIn and Slack shows it. Replacing it with a
//             near neighbour already on the list would have changed how every
//             share looks in order to satisfy a gate, which is backwards.
//   #2d1a6b   the two stops of the mobile hero gradient (styles/globals.css).
//   #3a1525   Its third stop, #0d0d1f, was already here — which says on its own
//             that the other two were missing because of the gate's reach, not
//             because anyone chose to leave them out.
const ALLOWED = new Set(
  (
    '#000000 #010102 #040404 #047857 #050508 #059669 #064e3b #08080c #0b3b28 #0d0d0d #0d0d1f ' +
    '#0e0e0e #10b981 #111 #121212 #141516 #16163a #16a34a #1a1a2e #1a1a3f #201436 #222 ' +
    '#22c55e #23234d #2a2350 #2d1a6b #3133e7 #3a1525 #3a1730 #4b4df7 #4e4e4e #4e6bff #5667ff ' +
    '#5ddba4 #6366f8 #7577f8 #7a7a7a #7b4dff #7b7df9 #8385ff #848484 #8587ff #888888 #8a8cff ' +
    '#9395ff #93e0bb #9a9a9a #9b59b6 #9b9dfb #a8ecca #a9a9a9 #a9aaff #b7f5d8 #c7d2fe #cdc6f5 ' +
    '#d9603f #d97706 #e2e8f0 #e3f9ec #e5e7eb #e6d5ea #e6e6e6 #ea580c #ece9fb #ef4444 #f0f0f8 ' +
    '#f1f5f9 #f5f5f7 #f5f5fa #f7e6dc #f7f7f7 #f8ddc9 #f8f8fa #f8f8ff #fafafa #ff5656 #ff5b5b ' +
    '#ff5f24 #ff6262 #ff6550 #ff7a7a #ff7d49 #ff8447 #ff8a5b #ff8a8a #ff8c00 #ff8c42 #ff9a9a ' +
    '#ffaf64 #ffb74b #fff #ffffff'
  ).split(' '),
);

const HEX = /#[0-9a-f]{3,8}\b/gi;

/** Every hex the file writes inside a string, a template literal or JSX text.
 *  A comment is none of the three. */
const colorsIn = (source, file = 'probe.tsx') => {
  const found = [];
  const isLiteral = (node) =>
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateHead(node) ||
    ts.isTemplateMiddle(node) ||
    ts.isTemplateTail(node) ||
    ts.isJsxText(node);

  // An href is not a place a colour lives, it is a place a fragment lives:
  // `<a href="#cafe">` is an anchor, and read as a colour it turns the gate
  // red. It matters because the shortest way to silence that red is to add
  // `#cafe` to the palette — the same gesture that put seven Issue numbers in
  // it, and this time it would pass the new assertion too, since `#cafe` really
  // would be drawn somewhere.
  const isHref = (node) =>
    ts.isJsxAttribute(node) && ts.isIdentifier(node.name) && node.name.text === 'href';

  const visit = (node) => {
    if (isHref(node)) return;
    if (isLiteral(node)) found.push(...((node.text ?? '').match(HEX) ?? []));
    ts.forEachChild(node, visit);
  };
  visit(ts.createSourceFile(file, source, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX));
  return found;
};

/** A .css file has no ambiguity to resolve: a hex `#` is a colour and comments
 *  are only `/* *\/`. The TSX parser is not needed, and would not help. */
const colorsInCss = (source) => source.replace(/\/\*[\s\S]*?\*\//g, '').match(HEX) ?? [];

// The collector is the one part that can make this gate lie, so it is asserted
// rather than trusted. Above the line: colours that must stay visible, each one
// a way the two strippers lost them. Below: prose that must not be mistaken for
// a colour.
for (const [source, expected, why] of [
  ['const s = "//js.hsforms.net/x"; const c = "#123456";', ['#123456'],
    'a protocol-relative URL in a string does not open a comment'],
  ['const s = `a //b`; const c = "#123456";', ['#123456'],
    'nor does one inside a template literal'],
  ['const s = "a/*b*/"; const c = "#123456";', ['#123456'],
    'nor does /* inside a string open a block comment'],
  ['const f = () => <p>Don\'t worry</p>; const c = "#123456";', ['#123456'],
    'an apostrophe in JSX text does not open a string'],
  ['const r = /^https?:\\/\\//; const c = "#123456";', ['#123456'],
    'nor do the slashes inside a regular expression'],
  ['const q = /[\'"]/; const c = "#123456";', ['#123456'],
    'a quote in a character class does not open a string'],
  ['const s = u.split(/\\/\\//); const c = "#123456";', ['#123456'],
    'two adjacent slashes in a regular expression do not open a comment'],
  ['const c = "#123456"; // trailing comment', ['#123456'],
    'a colour before a comment survives it'],
  ['const s = `background: linear-gradient(#123456, #654321)`;', ['#123456', '#654321'],
    'one template literal can carry more than one'],
  ['// Issue (#176), #168, #abc, and a fake #123456', [],
    'a line comment contributes nothing'],
  ['/* block comment with #123456 in it */', [],
    'and neither does a block comment'],
  ['const a = <a href="#cafe">x</a>;', [],
    'an href is an anchor, not a colour'],
  ['const a = <a href="#cafe" style={{ color: "#123456" }}>x</a>;', ['#123456'],
    'but skipping the href does not skip the rest of the tag'],
]) {
  assert.deepEqual(colorsIn(source), expected, why);
}

// The CSS reader has far less to get wrong, but it is still what decides
// whether the stylesheet is covered or only said to be.
for (const [source, expected, why] of [
  ['.a { background: #123456; }', ['#123456'], 'a declaration'],
  ['.a { background: radial-gradient(#123456 0%, #654321 40%); }', ['#123456', '#654321'],
    'several stops in one gradient'],
  ['/* the old gradient was #123456 */', [], 'a CSS comment contributes nothing'],
  ['.a { color: #123456; } /* was #654321 */', ['#123456'],
    'and does not take the declaration before it away'],
]) {
  assert.deepEqual(colorsInCss(source), expected, why);
}

// `.tsx` only, not `.ts`.
//
// A colour is drawn in a component or in a stylesheet; a `.ts` is logic.
// Verified rather than assumed: running the parser over every `.ts` in
// `app components i18n lib hooks data scripts`, the only hex inside a string is
// `#116` in `i18n/metadata.ts:67` — an Issue number in the text of an assert,
// not a colour.
//
// ponytail: the day a `.ts` holds a colour constant, this gate will not see it.
// The fix is not to widen to `.ts` — inside a message string an Issue reference
// is indistinguishable from a colour, which is exactly the false positive #177
// spent two rounds removing — but to move the constant into a `.tsx` or into
// the CSS, where the rest of the palette lives.
const walk = (dir) =>
  readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(join(dir, entry.name))
      : entry.name.endsWith('.tsx')
        ? [join(dir, entry.name)]
        : [],
  );

// The reach is the site, not two directories out of four.
//
// Until #189 it was `app` and `components`. Outside them sat three colours the
// site really draws and no gate had ever looked at: the share card's eyebrow in
// `i18n/og-card.tsx`, and two stops of the mobile hero gradient in
// `styles/globals.css`. The share card ends up in every preview on LinkedIn and
// Slack, so this was not a theoretical blind spot.
//
// The defect was not that three colours escaped. It was that the palette reads
// as the site's palette while covering half of it: whoever read it believed
// they knew which colours the site draws, and did not.
const SCAN = ['app', 'components', 'i18n'];
const CSS = ['styles/globals.css'];

const unexpected = [];
const used = new Set();

for (const file of SCAN.flatMap(walk)) {
  for (const color of colorsIn(readFileSync(join(ROOT, file), 'utf8'), file)) {
    const hex = color.toLowerCase();
    used.add(hex);
    if (!ALLOWED.has(hex)) unexpected.push(`${relative('.', file)}: ${color}`);
  }
}

for (const file of CSS) {
  for (const color of colorsInCss(readFileSync(join(ROOT, file), 'utf8'))) {
    const hex = color.toLowerCase();
    used.add(hex);
    if (!ALLOWED.has(hex)) unexpected.push(`${file}: ${color}`);
  }
}

assert.deepEqual(unexpected, [], `Unexpected hex color(s):\n${unexpected.join('\n')}`);

// An entry nobody uses is an entry nobody has checked, and that is how seven
// Issue numbers stayed on the list for months.
const unused = [...ALLOWED].filter((c) => !used.has(c));
assert.deepEqual(
  unused,
  [],
  `${unused.length} approved colour(s) no file draws:\n${unused.map((c) => `  ${c}`).join('\n')}\n` +
    'Either the code that used it is gone — remove the entry — or it was never a colour. ' +
    'If you are adding one, add the entry in the same change as the code that draws it.',
);

console.log(`[OK] colors: ${ALLOWED.size} approved hex values, all of them drawn`);
