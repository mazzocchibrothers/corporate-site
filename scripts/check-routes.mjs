// check-routes — keeps i18n/routes.json and the page files in agreement.
//
// Why this exists: routing here is spread over four hand-kept lists that the
// compiler never compares. A page added without a sitemap entry is invisible to
// Google; a slug added without a localePaths entry 404s the language switcher.
// Both failures are silent, and both have shipped. The registry is now the one
// list, and this check is what stops it drifting from reality.
//
// It reads both routers. A route may be served by pages/ or by app/, and
// during the migration the site is half in each — a check that only knows
// about pages/ blesses a tree where a page has left one router without
// arriving in the other (#133).
//
// Run: npm run check:routes

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { appRoutePaths, routeAtPath } from './lib/app-routes.mjs';
// Node 24 runs the TypeScript directly, so the URLs asserted below are built by
// the same function the sitemap and the hreflang tags emit from — not by a
// second copy of the rule that can drift from it.
import { alternatesFor, localesOf, urlFor } from '../i18n/urls.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY = 'i18n/routes.json';

// ponytail: the temporary probe from #128 is the one page under app/ with no
// route. It and this line go at the switch (#120).
const NOT_A_ROUTE_IN_APP = new Set(['/harness-check']);

// Pages that are not routes: Next internals. The sitemap used to be one of
// these too — it is app/sitemap.ts now, generated from this registry (#130).
const NOT_A_ROUTE = (file) => /(^|\/)_/.test(file);

// ── Read the registry ──────────────────────────────────────────────────────
// The data is JSON so every consumer parses it the same way, with no eval and
// no TypeScript toolchain: this script, next.config.ts, and the typed view in
// i18n/routes.ts all read the same bytes.
const routes = JSON.parse(readFileSync(join(ROOT, REGISTRY), 'utf8'));
assert.ok(Array.isArray(routes) && routes.length > 0, `${REGISTRY}: the registry is empty.`);

// ── Every page file is claimed by exactly one route ────────────────────────
const walk = (dir) =>
  readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? walk(join(dir, e.name))
      : e.name.endsWith('.tsx')
        ? [relative('pages', join(dir, e.name)).replace(/\.tsx$/, '')]
        : [],
  );

const onDisk = walk('pages').filter((f) => !NOT_A_ROUTE(f));
const pagesSet = new Set(onDisk);
const appSet = new Set(appRoutePaths(ROOT));

const claimed = new Map();
for (const route of routes) {
  for (const [locale, file] of Object.entries(route.files)) {
    if (!claimed.has(file)) claimed.set(file, []);
    claimed.get(file).push(`${route.id} (${locale})`);
  }
}

const unclaimed = onDisk.filter((f) => !claimed.has(f));
assert.deepEqual(
  unclaimed,
  [],
  `pages/ has ${unclaimed.length} file(s) with no entry in ${REGISTRY}.\n` +
    unclaimed.map((f) => `  pages/${f}.tsx`).join('\n') +
    '\nA route missing from the registry is missing from the sitemap and the hreflang tags.',
);

// ── Every route is served by exactly one router ────────────────────────────
// This replaces the old "the registry points at a page that exists" check,
// which a migrated route would fail: its pages/ file is gone on purpose.
const servedBy = new Map();

for (const route of routes) {
  // Deduplicated: both locales usually point at one file, and naming it twice
  // in a failure message reads like two separate problems.
  const files = [...new Set(Object.values(route.files))];
  const missing = files.filter((f) => !pagesSet.has(f));
  const appPaths = [...new Set(Object.values(route.paths))].filter((p) => appSet.has(p));

  if (appPaths.length > 0 && missing.length < files.length) {
    assert.fail(
      `Route '${route.id}' is served by both routers: app/[locale]${appPaths[0]}/page.tsx ` +
        `and ${files.filter((f) => pagesSet.has(f)).map((f) => `pages/${f}.tsx`).join(', ')}.\n` +
        'Next serves the app/ one and ignores the other, so the pages/ file is dead code that ' +
        'still looks live — delete it as part of the move.',
    );
  }

  if (appPaths.length > 1) {
    assert.fail(
      `Route '${route.id}' has an app/ directory for more than one of its URLs ` +
        `(${appPaths.join(', ')}). A localized pathname is one directory — next-intl rewrites ` +
        'the other URL onto it. Two directories are two pages that will drift apart.',
    );
  }

  if (appPaths.length === 0) {
    assert.deepEqual(
      missing,
      [],
      `Route '${route.id}' is served by neither router.\n` +
        missing.map((f) => `  pages/${f}.tsx missing`).join('\n') +
        `\nand no app/[locale]${Object.values(route.paths)[0]}/page.tsx. ` +
        'A route in the registry with no page behind it is a 404 in the sitemap.',
    );
  }

  servedBy.set(route.id, appPaths.length > 0 ? 'app' : 'pages');
}

// A page under app/ that no route claims is the same defect as an unclaimed
// page under pages/: invisible to the sitemap and the hreflang tags.
const strayApp = [...appSet].filter(
  (p) => !NOT_A_ROUTE_IN_APP.has(p) && !routeAtPath(routes, p),
);
assert.deepEqual(
  strayApp,
  [],
  `app/[locale] has ${strayApp.length} page(s) with no entry in ${REGISTRY}.\n` +
    strayApp.map((p) => `  app/[locale]${p}/page.tsx`).join('\n'),
);

// ── Every hreflang alternate points at a route that exists ─────────────────
// The defect this catches shipped: the old sitemap gave all 20 of the routes it
// listed an Italian alternate, including pages with no Italian version, so
// Google was told about URLs that 404. The rule is that an alternate is only
// ever a URL some route in this registry actually serves.
const everyUrl = new Set(
  routes.flatMap((r) => localesOf(r).map((l) => urlFor(r, l))),
);

for (const route of routes) {
  const languages = alternatesFor(route);
  const locales = localesOf(route);

  for (const [hreflang, url] of Object.entries(languages)) {
    assert.ok(
      everyUrl.has(url),
      `Route '${route.id}' emits hreflang='${hreflang}' -> ${url}, which no route serves.`,
    );
    if (hreflang !== 'x-default') {
      assert.ok(
        locales.includes(hreflang),
        `Route '${route.id}' claims a '${hreflang}' alternate but has no ${hreflang} path. ` +
          'An alternate for a language the page does not have is a 404 handed to Google.',
      );
    }
  }

  assert.deepEqual(
    Object.keys(languages).filter((k) => k !== 'x-default').sort(),
    [...locales].sort(),
    `Route '${route.id}': one alternate per locale it serves, no more and no fewer.`,
  );
  assert.ok(
    languages['x-default'] !== undefined,
    `Route '${route.id}' emits no x-default. Every cluster needs one — it is what a ` +
      'visitor in a language we do not publish is sent to.',
  );
}

// ── Every app/ page emits its own metadata ─────────────────────────────────
// A page that moves to app/ and forgets generateMetadata loses its title, its
// description and its canonical silently: the page still renders, and nothing
// in the build mentions it. Nobody notices until the traffic does.
for (const path of appSet) {
  const file = join(ROOT, 'app/[locale]', path === '/' ? '' : path, 'page.tsx');
  assert.ok(
    /export\s+(async\s+)?function\s+generateMetadata|export\s+const\s+metadata\b/.test(
      readFileSync(file, 'utf8'),
    ),
    `app/[locale]${path}/page.tsx exports neither generateMetadata nor metadata.\n` +
      'Use buildMetadata(routeId, locale) from i18n/metadata.ts — it derives the title, the ' +
      'description, the canonical and the hreflang alternates from the registry.',
  );
}

// ── Structural invariants ──────────────────────────────────────────────────
const ids = routes.map((r) => r.id);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
assert.deepEqual(dupIds, [], `${REGISTRY}: duplicate route id(s): ${dupIds.join(', ')}`);

for (const route of routes) {
  const pathLocales = Object.keys(route.paths);
  const fileLocales = Object.keys(route.files);

  assert.ok(
    pathLocales.length > 0,
    `Route '${route.id}' declares no locale. A route nobody can reach is a deleted page, not a route.`,
  );
  assert.deepEqual(
    pathLocales.sort(),
    fileLocales.sort(),
    `Route '${route.id}': paths and files disagree on which locales exist ` +
      `(paths: ${pathLocales}, files: ${fileLocales}). A locale with a URL and no page is a 404.`,
  );
  for (const [locale, path] of Object.entries(route.paths)) {
    assert.ok(
      path.startsWith('/'),
      `Route '${route.id}' (${locale}): path '${path}' must start with '/'. ` +
        'Paths are written without the /it prefix — Next adds that itself.',
    );
  }
}

// ── One URL, one route, per locale ─────────────────────────────────────────
// Two routes claiming the same URL is ambiguous for every consumer: the
// switcher cannot tell which twin to send you to, and the sitemap emits a
// duplicate <loc>.
for (const locale of ['en', 'it']) {
  const seen = new Map();
  for (const route of routes) {
    const path = route.paths[locale];
    if (path === undefined) continue;
    if (seen.has(path)) {
      assert.fail(
        `Both '${seen.get(path)}' and '${route.id}' claim the ${locale} URL '${path}'.`,
      );
    }
    seen.set(path, route.id);
  }
}

const monolingual = routes.filter((r) => Object.keys(r.paths).length === 1);
const migrated = [...servedBy.values()].filter((r) => r === 'app').length;
console.log(
  `[OK] ${REGISTRY}: ${routes.length} routes, all matched ` +
    `(${monolingual.length} single-locale) \u2014 ` +
    `${migrated} on app/, ${routes.length - migrated} on pages/`,
);
