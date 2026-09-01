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

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY = 'i18n/routes.json';

// ponytail: the temporary probe from #128 is the one page under app/ with no
// route. It and this line go at the switch (#120).
const NOT_A_ROUTE_IN_APP = new Set(['/harness-check']);

// Pages that are not routes: Next internals and the server-rendered sitemap.
const NOT_A_ROUTE = (file) => /(^|\/)_/.test(file) || file.startsWith('sitemap');

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
