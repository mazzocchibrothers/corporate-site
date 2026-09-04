// check-assets — an asset a page asks for that is not in public/.
//
// It exists because one was: /solutions/talent-acquisition asked for
// `greenhouse_onblack_white.png` — the logo list held `greenhouse_onblack` and
// the component appends `_white` — and the file is `greenhouse_onblack.png`.
// A 404 on an <img>, in three places on that page, live on production. Nothing
// noticed: the build does not fetch images, the text comparison strips tags,
// and a broken logo renders as empty space that looks like design.
//
// Two shapes are checked, because assets are written two ways:
//
//   literal   src="/logos/adr.avif"            — read straight out of the source
//   computed  `/logos/integrations/${x}_white.png`  — expanded from the array
//             that feeds it, which is where the greenhouse bug lived
//
// Offline, like every other gate: it reads the tree, not a running server.
//
// Run: npm run check:assets

import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const walk = (dir) =>
  readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);

const EXT = /\.(png|jpe?g|webp|avif|gif|svg|pdf|mp4|webm|woff2?|ico|webmanifest)$/i;
const sources = [...walk('app'), ...walk('components'), ...walk('data'), ...walk('i18n'), ...walk('styles')]
  .filter((f) => /\.(tsx?|css|json)$/.test(f));

const wanted = new Map();          // path -> where it was written
const want = (path, where) => { if (!wanted.has(path)) wanted.set(path, where); };

for (const file of sources) {
  const src = readFileSync(join(ROOT, file), 'utf8');

  // literal
  for (const [, path] of src.matchAll(/["'`(](\/[A-Za-z0-9._%()/ +-]+\.[a-z0-9]{2,12})["'`)]/gi)) {
    if (EXT.test(path) && !path.startsWith('/_next')) want(decodeURIComponent(path), file);
  }

  // computed: a template with one ${…}, expanded from the array literals in the
  // same file. Only an array whose *other* members resolve is treated as the one
  // feeding the template — that is exactly the greenhouse shape, five of six
  // expansions landing and one not, and it keeps every other quoted string in
  // the file from being guessed at.
  for (const [, prefix, suffix] of src.matchAll(/`(\/[A-Za-z0-9._%/-]*)\$\{[^}]+\}([A-Za-z0-9._%/-]*)`/g)) {
    if (!EXT.test(prefix + suffix)) continue;
    for (const [, body] of src.matchAll(/\[((?:\s*'[A-Za-z0-9_-]+'\s*,?\s*){2,})\]/g)) {
      const members = [...body.matchAll(/'([A-Za-z0-9_-]+)'/g)].map((m) => m[1]);
      const resolves = members.filter((v) => existsSync(join(ROOT, 'public', `${prefix}${v}${suffix}`)));
      if (resolves.length < 2) continue;                     // not this array
      for (const v of members) want(`${prefix}${v}${suffix}`, file);
    }
  }
}

// The catalogue holds a handful too — a one-pager's PDF, a coverage map.
for (const locale of ['en', 'it']) {
  const cat = readFileSync(join(ROOT, `messages/${locale}.json`), 'utf8');
  for (const [, path] of cat.matchAll(/"(\/[A-Za-z0-9._%()/ +-]+\.[a-z0-9]{2,12})"/gi)) {
    if (EXT.test(path)) want(decodeURIComponent(path), `messages/${locale}.json`);
  }
}

/**
 * Files nothing in the source ever names, because the thing that asks for them
 * is not the app.
 *
 * A crawler asks for /robots.txt by name. A browser asks for /favicon.ico by
 * name. site.webmanifest is named once, in the layout, and the two icons it
 * points at are named only inside the manifest itself — a JSON file in public/,
 * which nothing scans.
 *
 * All four were deleted by a sweep for assets no source file references, which
 * is exactly what they are. robots.txt took `Disallow: /lp/` and the sitemap
 * declaration with it; the manifest took the install icons. Nothing failed:
 * the build does not fetch them either.
 */
const WELL_KNOWN = [
  '/robots.txt',
  '/favicon.ico',
  '/site.webmanifest',
];

for (const path of WELL_KNOWN) want(path, 'requested by name — see WELL_KNOWN');

// The manifest names its own icons and lives in public/, so it is the one
// asset that is also a source of references.
const manifest = join(ROOT, 'public/site.webmanifest');
if (existsSync(manifest)) {
  for (const icon of JSON.parse(readFileSync(manifest, 'utf8')).icons ?? []) {
    want(icon.src, 'public/site.webmanifest');
  }
}

/**
 * Files a page asks for that do not exist and are not ours to create.
 *
 * Five Italian landing pages offer a whitepaper PDF that has never been in the
 * repository — the "Scarica PDF" button 404s on production too. The asset is
 * the product of those pages, so this list records the gap rather than hiding
 * it. Nothing else belongs here: a missing image with a fixable name is a bug,
 * not an entry.
 */
const KNOWN_MISSING = new Map([
  ['/WP-B1-ITA.pdf', 'lp/ai-act-banking — the whitepaper was never delivered (#145)'],
  ['/WP-B2-ITA.pdf', 'lp/la-crisi-delle-competenze — same (#145)'],
  ['/WP-L1-ITA.pdf', 'lp/arte-di-misurare-allineamento — same (#145)'],
  ['/WP-L2-ITA.pdf', 'lp/il-turnover-nei-negozi-del-lusso — same (#145)'],
  ['/WP-L3-ITA.pdf', 'lp/scalare-l-eccellenza — same (#145)'],
]);

const missing = [...wanted]
  .filter(([path]) => !existsSync(join(ROOT, 'public', path)) && !KNOWN_MISSING.has(path))
  .map(([path, where]) => `  ${path}\n      asked for by ${where}`);

assert.deepEqual(
  missing,
  [],
  `${missing.length} asset(s) a page asks for are not in public/:\n${missing.join('\n')}\n` +
    'A missing image renders as empty space that looks like design. Add the file, or fix the ' +
    'name that asks for it.',
);

console.log(
  `[OK] assets: ${wanted.size} referenced, all present ` +
    `(${KNOWN_MISSING.size} known missing, see #145)`,
);
