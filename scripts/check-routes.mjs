// check-routes — keeps i18n/routes.json and the page files in agreement.
//
// Why this exists: routing here is spread over four hand-kept lists that the
// compiler never compares. A page added without a sitemap entry is invisible to
// Google; a slug added without a localePaths entry 404s the language switcher.
// Both failures are silent, and both have shipped. The registry is now the one
// list, and this check is what stops it drifting from reality.
//
// It read both routers while the site was half in each (#133). There is one
// router now, so what it checks is simpler: every route in the registry has a
// directory under app/[locale], every directory under app/[locale] is a route,
// and every one of them emits its own metadata.
//
// Run: npm run check:routes

import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { appRoutePaths, routeAtPath } from './lib/app-routes.mjs';
// Node 24 runs the TypeScript directly, so the URLs asserted below are built by
// the same function the sitemap and the hreflang tags emit from — not by a
// second copy of the rule that can drift from it.
import { alternatesFor, localesOf, urlFor } from '../i18n/urls.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY = 'i18n/routes.json';

// ── Read the registry ──────────────────────────────────────────────────────
// The data is JSON so every consumer parses it the same way, with no eval and
// no TypeScript toolchain: this script, next.config.ts, and the typed view in
// i18n/routes.ts all read the same bytes.
const routes = JSON.parse(readFileSync(join(ROOT, REGISTRY), 'utf8'));
assert.ok(Array.isArray(routes) && routes.length > 0, `${REGISTRY}: the registry is empty.`);

const appSet = new Set(appRoutePaths(ROOT));

// ── Every route has exactly one directory ──────────────────────────────────
for (const route of routes) {
  // A route's directory is its internal path — the English one where the route
  // has English, the Italian one where it does not. next-intl rewrites the
  // other URL onto it, so a second directory would be a second page drifting
  // away from the first rather than a translation of it.
  const internal = route.paths.en ?? route.paths.it;
  assert.ok(
    appSet.has(internal),
    `Route '${route.id}' has no page: app/[locale]${internal === '/' ? '' : internal}/page.tsx ` +
      'does not exist. A route in the registry with no page behind it is a 404 in the sitemap.',
  );

  const extra = [...new Set(Object.values(route.paths))].filter(
    (p) => p !== internal && appSet.has(p),
  );
  assert.deepEqual(
    extra,
    [],
    `Route '${route.id}' has a second directory (${extra.join(', ')}) alongside ${internal}. ` +
      'A localized pathname is one directory — next-intl rewrites the other URL onto it.',
  );
}

// A page under app/ that no route claims is the same defect as an unclaimed
// page under pages/: invisible to the sitemap and the hreflang tags.
const strayApp = [...appSet].filter((p) => !routeAtPath(routes, p));
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

// ── Every route has a title and a description, and no two share one ────────
// 16 routes shipped no <title> at all (#138) — every blog post among them, the
// pages most likely to be found by search rather than by navigation. A page
// with no title shows the URL in the tab and lets Google write its own from the
// body. buildMetadata used to guard against the gap; this is what replaced the
// guard.
//
// The duplicate check is the other half: one title on four pages is the same
// defect wearing a different hat, and the three whitepaper detail pages would
// have inherited the index's title without noticing.
const namespaceOf = (id) =>
  id === 'index'
    ? 'home'
    : id.split('/').filter((s) => !/^\[.*\]$/.test(s)).join('.');

for (const locale of ['en', 'it']) {
  const catalogue = JSON.parse(readFileSync(join(ROOT, `messages/${locale}.json`), 'utf8'));
  const at = (dotted) => dotted.split('.').reduce((o, k) => (o ?? {})[k], catalogue);
  const seen = new Map();

  for (const route of routes) {
    if (route.paths[locale] === undefined) continue;
    const meta = at(`${namespaceOf(route.id)}.meta`);

    assert.ok(
      meta?.title && meta?.description,
      `Route '${route.id}' has no ${locale} meta.title/meta.description in messages/${locale}.json.\n` +
        'A page with no title shows its URL in the browser tab and lets Google write one from the ' +
        'body. Add it under the route namespace, not to the page.',
    );

    // The dynamic route is N pages behind one registry entry; each one titles
    // itself from its own item, so the shared namespace title is the index's.
    if (route.id.includes('[')) continue;
    // An alternate cut is allowed to share its base's title: it canonicalises
    // to it and is not in the sitemap, so the two do not compete.
    if (route.canonicalOf !== undefined) continue;

    assert.ok(
      !seen.has(meta.title),
      `Routes '${seen.get(meta.title)}' and '${route.id}' share the ${locale} title ` +
        `'${meta.title}'. Two pages with one title compete with each other in search results.`,
    );
    seen.set(meta.title, route.id);
  }
}

// ── Nothing of the Pages Router survives ───────────────────────────────────
// Every one of these is **inert** under the App Router, not broken: Next does
// not read them and does not say so. A `getStaticProps` added to a page.tsx
// simply never runs, and the page renders without whatever it was meant to
// fetch. `useRouter` from next/router is the loud one — it throws at prerender —
// and it is the only loud one.
//
// The whole migration existed because this repo's failures are silent. This is
// the check that keeps the silent half of the old router from creeping back.
const PAGES_ROUTER = [
  ['getStaticProps', 'never runs under the App Router — use generateStaticParams, or fetch in the Server Component'],
  ['getStaticPaths', 'never runs — use generateStaticParams'],
  ['getServerSideProps', 'never runs — a Server Component already runs on the server'],
  ['getInitialProps', 'never runs'],
  ["from 'next/router'", 'throws at prerender — use @/i18n/navigation, which adds the locale'],
  ["from 'next/head'", 'silently renders nothing — use generateMetadata, or let React 19 hoist a bare <link>'],
  ["from 'next/document'", 'has no meaning without pages/_document'],
];

const scan = (dir) =>
  readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? scan(join(dir, e.name))
      : /\.tsx?$/.test(e.name)
        ? [join(dir, e.name)]
        : [],
  );

const relics = [];
for (const file of ['app', 'components', 'i18n', 'lib', 'data'].filter((d) => existsSync(join(ROOT, d))).flatMap(scan)) {
  const src = readFileSync(join(ROOT, file), 'utf8');
  // Comments are prose about the past; code is the past still running.
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !/^\s*(\/\/|\*)/.test(l)).join('\n');
  for (const [needle, why] of PAGES_ROUTER) {
    if (code.includes(needle)) relics.push(`  ${file}: ${needle} — ${why}`);
  }
}
assert.ok(
  !existsSync(join(ROOT, 'pages')),
  'pages/ exists. Two routers serving one site is how a route ends up live in ' +
    'one language and 404 in the other; there is one router here.',
);
assert.deepEqual(
  relics,
  [],
  `${relics.length} Pages Router API(s) left in the tree:\n${relics.join('\n')}`,
);

// ── Structural invariants ──────────────────────────────────────────────────
const ids = routes.map((r) => r.id);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
assert.deepEqual(dupIds, [], `${REGISTRY}: duplicate route id(s): ${dupIds.join(', ')}`);

for (const route of routes) {
  assert.ok(
    Object.keys(route.paths).length > 0,
    `Route '${route.id}' declares no locale. A route nobody can reach is a deleted page, not a route.`,
  );
  assert.deepEqual(
    Object.keys(route.paths).filter((l) => !['en', 'it'].includes(l)),
    [],
    `Route '${route.id}': paths holds a locale that is not en or it.`,
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

// ── Every route carries its share card and its structured data ─────────────
// Both are per-route by construction: opengraph-image.tsx is Next's file
// convention, and JsonLd is rendered by page.tsx because that is the only
// server component that knows which route it is. Neither can be inherited, so
// a route added without them ships a page that shares as a blank rectangle and
// tells Google nothing about itself — and nothing else fails.
const missingSeo = [];
for (const route of routes) {
  const dir = join(ROOT, 'app/[locale]', (route.paths.en ?? route.paths.it) === '/' ? '' : (route.paths.en ?? route.paths.it));
  if (!existsSync(join(dir, 'opengraph-image.tsx'))) {
    missingSeo.push(`  ${route.id}: no opengraph-image.tsx — the page has no share card`);
  }
  const page = join(dir, 'page.tsx');
  if (existsSync(page) && !readFileSync(page, 'utf8').includes('<JsonLd')) {
    missingSeo.push(`  ${route.id}: page.tsx does not render <JsonLd> — the page has no structured data`);
  }
}
assert.deepEqual(
  missingSeo,
  [],
  `${missingSeo.length} route(s) are missing what every route carries:\n${missingSeo.join('\n')}\n` +
    'Copy the three lines from a neighbouring route.',
);

const monolingual = routes.filter((r) => Object.keys(r.paths).length === 1);
console.log(
  `[OK] ${REGISTRY}: ${routes.length} routes, all served by app/[locale] ` +
    `(${monolingual.length} single-locale)`,
);
