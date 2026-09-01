// check-routes — keeps i18n/routes.json and the pages/ directory in agreement.
//
// Why this exists: routing here is spread over four hand-kept lists that the
// compiler never compares. A page added without a sitemap entry is invisible to
// Google; a slug added without a localePaths entry 404s the language switcher.
// Both failures are silent, and both have shipped. The registry is now the one
// list, and this check is what stops it drifting from reality.
//
// Run: npm run check:routes

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY = 'i18n/routes.json';

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

const ghosts = [...claimed.keys()].filter((f) => !onDisk.includes(f));
assert.deepEqual(
  ghosts,
  [],
  `${REGISTRY} points at ${ghosts.length} page(s) that do not exist.\n` +
    ghosts.map((f) => `  pages/${f}.tsx  <- claimed by ${claimed.get(f).join(', ')}`).join('\n'),
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
console.log(
  `[OK] ${REGISTRY}: ${routes.length} routes, ${onDisk.length} page files, all matched ` +
    `(${monolingual.length} single-locale)`,
);
