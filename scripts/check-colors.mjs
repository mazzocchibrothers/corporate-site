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
//   #1e1e1e, #4b4b4b, #6b7dff
//             Talent Pioneers' body copy, eyebrow and gradients.
//   #ebebeb
//             The Partners page's own card and dropdown borders — not the tag
//             pill, which draws the two shades CLAUDE.md documents for it
//             (#e5e7eb border, #f1f5f9 fill), already allowed above.
//   #161616
//             The Partners page (app/[locale]/customers/partners): the final
//             CTA band's gradient base, same tone Figma names neutral/900.
//   #1a1a1a
//             The customer stories filter dropdowns
//             (components/customers/ExploreStories.tsx): the panel behind the
//             industry and use-case options, a step darker than #1e1e1e.
//   #030101
//             The Blog page's Skills Signal banner — the backdrop baked into
//             its video, so the frame meets the banner with no seam.
//   #e7e7e8
//             The active tab pill above the Skillvue Map screens on /product,
//             which sit on the white page with no card behind them.
const ALLOWED = new Set(
  (
    '#14181f #d9daff #f6f7ff #e1e2ff #6b7280 #eef0f2 #555555 #777777 #444444 #f1f2ff #ececf8 #f6b24a #f4617e #8b5cf6 ' +
    '#000000 #010102 #030101 #040404 #047857 #050508 #059669 #064e3b #08080c #0b3b28 #0d0d0d #0d0d1f ' +
    '#0e0e0e #10b981 #111 #121212 #141516 #16163a #161616 #16a34a #1a1a1a #1a1a2e #1a1a3f #1e1e1e #201436 #222 ' +
    '#22c55e #23234d #2a2350 #2d1a6b #3133e7 #3a1525 #3a1730 #4b4b4b #4b4df7 #4e6bff #5667ff ' +
    '#5ddba4 #6366f8 #6b7dff #7577f8 #7a7a7a #7b4dff #7b7df9 #8385ff #848484 #8587ff #888888 #8a8cff ' +
    '#9395ff #93e0bb #9a9a9a #9b59b6 #9b9dfb #a8ecca #a9a9a9 #a9aaff #b7f5d8 #c7d2fe #cdc6f5 ' +
    '#d9603f #d97706 #e2e8f0 #e3f9ec #e5e7eb #e6d5ea #e7e7e8 #ea580c #ebebeb #ece9fb #ef4444 #efeefb #efeefd #f0f0f8 ' +
    '#f1f5f9 #f5f5f7 #f5f5fa #f7e6dc #f7f7f7 #f8ddc9 #f8f8fa #f8f8ff #fafafa #fdf1ea #fdf3ec #ff5656 #ff5b5b ' +
    '#ff5f24 #ff6262 #ff6550 #ff7a7a #ff7d49 #ff8447 #ff8a5b #ff8a8a #ff8c00 #ff8c42 #ff9a9a ' +
    '#ffaf64 #ffb74b #fff #ffffff'
  ).split(' '),
);

// The product's palette, not the site's. A component that redraws Skillvue's
// own product UI in HTML — where a screenshot used to be — draws the colours of
// that UI: its greys, its status pills, its chart fills. They are allowed in the
// file that draws them and nowhere else, so the site palette above stays the
// site's, and a product grey cannot drift into a marketing section unnoticed.
const PRODUCT_UI = {
  'components/product/map-screens.tsx': new Set(
    (
      '#1a1af0 #28c840 #2f7a2a #333 #444 #4b4ef8 #555 #5e6b12 #6264f2 #666 #777 #7f7ff7 #888 #adadfa #bbb #ccc ' +
      '#d3f3cc #d4d4d8 #d9443c #dcdcfc #ddd #e3e3e3 #e5484d #e5566e #e6e6e6 #e7a6c4 #e8731e #e8e8e9 ' +
      '#e9e9ea #e9f6be #eaeaea #ebebec #efeff0 #f0f0f0 #f2954a #febc2e #ff5f57'
    ).split(' '),
  ),
  'components/product/map-skills-demo.tsx': new Set(
    (
      '#000 #22a06b #22b07d #2e8b7a #333 #3e9a6a #444 #4f86b8 #555 #5b5db8 #5b5fc7 #666 #777 #7e8f4e ' +
      '#8a6bb8 #999 #9b5cf0 #a9d6cb #b4cde6 #b6dcc4 #b9b9e6 #b9dcd2 #bcd3ea #bcddc8 #bfe3d9 #c8705f ' +
      '#c8c8ec #c9b8e6 #cfc2e8 #cfd3b3 #d4d8be #dadada #dcdcf2 #ddd #dddddd #ddefea #deeaf6 #def0e4 ' +
      '#dff5e6 #e2e2f5 #e3e3e3 #e6e6e6 #e8c3bd #eac6c0 #eae2f5 #eaeaea #ebebec #eceee0 #eee #f0566e ' +
      '#f3faf8 #f4f8fc #f4faf6 #f5f5f5 #f6e2df #f6f6fc #f9f6fc #fafbf4 #fcf5f4 #ffb35c'
    ).split(' '),
  ),
  'components/product/assess-screens.tsx': new Set(
    (
      '#111111 #222222 #28c840 #333333 #3a3a3a #444 #555 #666 #777 #a9a3ff #bbb #cccccc #d4d4d8 #dcdcdc ' +
      '#dedede #eeeeee #efeff0 #f7a3b0 #febc2e #ff5f57 #ffb3a0 #ffd3a4'
    ).split(' '),
  ),
  'components/product/decide-demo.tsx': new Set(
    (
      '#000 #1d6b3a #28c840 #333 #3bb273 #444 #555 #666 #777 #888 #9a86f0 #9b7bff #bbb #c9f2d6 #ccc ' +
      '#cfcfcf #d4d4d8 #ddd #ddf5c6 #e6e6e6 #eee #efeff0 #f46b6b #f4f4f4 #f7877a #febc2e #ff5f57 #ffb08a #ffc29a'
    ).split(' '),
  ),
};

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

/** Every hex in a stylesheet, comments removed.
 *
 *  A .css file has far less ambiguity to resolve than a .tsx: a hex `#` is
 *  almost always a colour, and comments are only `/* *\/`. The TSX parser is
 *  not needed here, and would not help.
 *
 *  Almost, not always. Three forms would read as colours without being one: a
 *  `content: "#abcdef"` string, an id selector that happens to be hex
 *  (`#fade`, `#a1b2c3`), and `url(#facade)` for an SVG filter. None exists in
 *  this stylesheet — the only id selector is `#emergent-badge`, there is no
 *  `content:` declaration at all, and the one SVG filter passes its fragment
 *  as `%23noise` inside a data URI (#189 review, checked form by form).
 *
 *  ponytail: no guard for them, because a guard would be code for a case that
 *  does not exist. It is worth knowing that the id selector is the exact
 *  analogue of the `href="#cafe"` the reader above skips by name, with the same
 *  wrong way out behind it: the shortest fix for that red would be to add the
 *  value to the palette, and the `unused` assertion would not catch it, because
 *  the value really would appear. If one ever shows up, skip it the way `href`
 *  is skipped — do not widen the palette. */
const colorsInCss = (source) => source.replace(/\/\*[\s\S]*?\*\//g, '').match(HEX) ?? [];

// The collector is the one part that can make this gate lie, so it is asserted
// rather than trusted. Above the line: colours that must stay visible, each one
// a way the two strippers lost them. Below: prose that must not be mistaken for
// a colour.
//
// The source goes into the failure message alongside the reason. `deepEqual`
// prints the message and the two arrays but not the input that produced them,
// and several of these reasons are fragments that continue the line before —
// "nor does one inside a template literal" on its own, next to two lists of hex,
// tells whoever is looking at a red gate nothing about what to fix (#189
// review).
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
  ['const s = `a #123456 ${x} b #654321 ${y} c #abcdef`;', ['#123456', '#654321', '#abcdef'],
    'a substitution splits the literal into head, middle and tail — all three count'],
  ['// Issue (#176), #168, #abc, and a fake #123456', [],
    'a line comment contributes nothing'],
  ['/* block comment with #123456 in it */', [],
    'and neither does a block comment'],
  ['const a = <p>#123456</p>;', ['#123456'],
    'JSX text counts too — a colour written as page text is still a colour'],
  ['const a = <a href="#cafe">x</a>;', [],
    'an href is an anchor, not a colour'],
  ['const a = <a href="#cafe" style={{ color: "#123456" }}>x</a>;', ['#123456'],
    'but skipping the href does not skip the rest of the tag'],
]) {
  assert.deepEqual(colorsIn(source), expected, `${why}\n  ${source}`);
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
  assert.deepEqual(colorsInCss(source), expected, `${why}\n  ${source}`);
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
const usedByProduct = Object.fromEntries(Object.keys(PRODUCT_UI).map((f) => [f, new Set()]));

for (const file of SCAN.flatMap(walk)) {
  const own = PRODUCT_UI[file];
  for (const color of colorsIn(readFileSync(join(ROOT, file), 'utf8'), file)) {
    const hex = color.toLowerCase();
    if (own?.has(hex)) {
      usedByProduct[file].add(hex);
      continue;
    }
    used.add(hex);
    if (!ALLOWED.has(hex)) unexpected.push(`${relative('.', file)}: ${color}`);
  }
}

// The same rule as the site palette's, per file: an entry the file no longer
// draws is removed with the code that drew it.
for (const [file, own] of Object.entries(PRODUCT_UI)) {
  const stale = [...own].filter((c) => !usedByProduct[file].has(c));
  assert.deepEqual(stale, [], `${file}: ${stale.length} product colour(s) it no longer draws:\n  ${stale.join('\n  ')}`);
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
