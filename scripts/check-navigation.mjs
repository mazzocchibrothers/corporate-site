// check-navigation — localizePath is what every in-site link and every
// router.push now goes through, so it is the single point where the whole
// site's Italian navigation can break at once.
//
// Under nextConfig.i18n, Next added the /it prefix and a rewrite resolved the
// slug. Both are gone (#128). This function is their replacement, and the two
// properties below are the ones that are easy to lose:
//
//   * a path that is already localized must come back unchanged — roughly half
//     the call sites pass href(id, lang), which is already localized, and a
//     second pass would produce /it/it/clienti
//   * a URL under a dynamic route has no registry entry of its own, so it needs
//     its parent's
//
// Run: npm run check:navigation

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
// Node 24 runs the TypeScript directly, so this asserts against the same
// function the site navigates with.
import { internalPathIn, localizePathIn, routeAt } from '../i18n/urls.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const routes = JSON.parse(readFileSync(join(ROOT, 'i18n/routes.json'), 'utf8'));
const at = (path, locale) => localizePathIn(routes, path, locale);

// ── English is the unprefixed locale: nothing moves ────────────────────────
assert.equal(at('/', 'en'), '/');
assert.equal(at('/customers/adr', 'en'), '/customers/adr');
assert.equal(at('/book-meeting', 'en'), '/book-meeting');

// ── Italian gets the prefix, and the slug where there is one ───────────────
assert.equal(at('/', 'it'), '/it');
assert.equal(at('/blog', 'it'), '/it/blog');
assert.equal(at('/customers', 'it'), '/it/clienti');
assert.equal(at('/customers/adr', 'it'), '/it/clienti/adr');
assert.equal(at('/book-meeting', 'it'), '/it/prenota-incontro');
assert.equal(at('/about', 'it'), '/it/chi-siamo');
assert.equal(at('/science', 'it'), '/it/scienza');
assert.equal(at('/product-overview', 'it'), '/it/piattaforma');
assert.equal(at('/solutions/internal-mobility', 'it'), '/it/soluzioni/mobilita-interna');
assert.equal(at('/resources/press', 'it'), '/it/risorse/stampa');

// ── Idempotent ────────────────────────────────────────────────────────────
// The property that lets one guard sit in i18n/navigation.ts instead of at 98
// call sites: passing an already-localized path is a no-op, so a caller that
// already used href(id, lang) is not localized twice.
for (const path of ['/it', '/it/blog', '/it/clienti/adr', '/it/prenota-incontro',
                    '/it/chi-siamo', '/it/soluzioni/mobilita-interna', '/it/risorse/stampa']) {
  assert.equal(at(path, 'it'), path, `${path} was localized twice`);
}

// ── A URL under a dynamic route travels with its parent ───────────────────
assert.equal(
  at('/resources/whitepapers/beyond-skills', 'it'),
  '/it/risorse/whitepaper/beyond-skills',
);
// …and '/' must not act as everyone's parent. An unknown path is returned as
// given, not prefixed on a guess.
assert.equal(at('/not-a-route', 'it'), '/not-a-route');

// ── Query strings and hashes ride along ───────────────────────────────────
// UTM-tagged links are how half the traffic to the landing pages arrives.
assert.equal(at('/customers/adr?utm_source=nl', 'it'), '/it/clienti/adr?utm_source=nl');
assert.equal(at('/book-meeting#form', 'it'), '/it/prenota-incontro#form');
assert.equal(
  at('/resources/whitepapers/beyond-skills?utm_medium=email', 'it'),
  '/it/risorse/whitepaper/beyond-skills?utm_medium=email',
);

// ── A route with no page in the target locale is left alone ───────────────
// /lp/hidden-cost-recruiting is English-only. Localizing it would hand the
// visitor a URL that 404s; the decision to hide the link belongs to the caller.
assert.equal(at('/lp/hidden-cost-recruiting', 'it'), '/lp/hidden-cost-recruiting');

// ── A trailing slash does not become its own parent (#144 review) ─────────
// Regression for a bug where '/customers/adr/'.startsWith('/customers/adr/')
// matched the route as a "parent" of its own trailing-slash form, producing
// '/it/clienti/adr/' instead of the canonical '/it/clienti/adr'.
assert.equal(at('/customers/adr/', 'it'), '/it/clienti/adr');
assert.equal(internalPathIn(routes, '/it/clienti/adr/', 'it'), '/customers/adr');

// ── routeAt sees a route's locale coverage without the English-keyed detour
// (#144 review) — this is what the language switcher checks before
// switching, so a monolingual route's other-locale button can be routed home
// instead of to a 404.
assert.equal(routeAt(routes, '/lp/hidden-cost-recruiting', 'en')?.id, 'lp/hidden-cost-recruiting');
assert.equal(routeAt(routes, '/lp/hidden-cost-recruiting', 'en')?.paths.it, undefined);

// ── External URLs are not paths ───────────────────────────────────────────
assert.equal(at('https://www.linkedin.com/company/skillvue/', 'it'),
  'https://www.linkedin.com/company/skillvue/');

console.log(`[OK] navigation: localizePath over ${routes.length} routes`);

// ── The language switcher: this page, in the other language ───────────────
// Two steps, not one it-to-en map: internalPathIn back to the registry's own
// spelling, then localizePathIn forward into the target locale. The property
// that matters is the round trip — a switch to Italian and back must land where
// it started, on every route, or the switcher walks the visitor off the page.
const switchTo = (path, from, to) => at(internalPathIn(routes, path, from), to);

assert.equal(switchTo('/customers/adr', 'en', 'it'), '/it/clienti/adr');
assert.equal(switchTo('/it/clienti/adr', 'it', 'en'), '/customers/adr');
assert.equal(switchTo('/', 'en', 'it'), '/it');
assert.equal(switchTo('/it', 'it', 'en'), '/');
assert.equal(switchTo('/book-meeting', 'en', 'it'), '/it/prenota-incontro');
assert.equal(switchTo('/it/prenota-incontro', 'it', 'en'), '/book-meeting');
assert.equal(
  switchTo('/it/risorse/whitepaper/beyond-skills', 'it', 'en'),
  '/resources/whitepapers/beyond-skills',
);
assert.equal(switchTo('/about', 'en', 'it'), '/it/chi-siamo');
assert.equal(switchTo('/it/chi-siamo', 'it', 'en'), '/about');
assert.equal(switchTo('/it/clienti/adr?utm_source=nl', 'it', 'en'), '/customers/adr?utm_source=nl');

for (const route of routes) {
  for (const locale of ['en', 'it']) {
    if (route.paths[locale] === undefined) continue;
    const other = locale === 'en' ? 'it' : 'en';
    if (route.paths[other] === undefined) continue; // monolingual: no round trip to make
    const here = locale === 'en' ? route.paths.en : `/it${route.paths.it}`.replace(/\/$/, '');
    const there = switchTo(here, locale, other);
    assert.equal(
      switchTo(there, other, locale),
      here,
      `Round trip lost '${route.id}': ${here} -> ${there} -> ${switchTo(there, other, locale)}`,
    );
  }
}

console.log(`[OK] navigation: locale switch round-trips on every bilingual route`);

// ── Language detection belongs to the homepage only ───────────────────────
// Not a property of localizePath, but of the middleware that calls it, and the
// one thing about this migration that changed the site without anyone asking.
//
// `nextConfig.i18n` redirected `/` by Accept-Language and left every other path
// alone. next-intl's middleware detects on every path by default, so an Italian
// browser opening an English link to a customer story was bounced to the
// Italian version of it — production answers that URL 200, in English. Sharing
// a link would have stopped meaning what it says.
//
// proxy.ts runs detection for '/' and only '/'. This asserts the shape of that
// decision, because it is one line and it is easy to delete by accident.
const middleware = readFileSync(join(ROOT, 'proxy.ts'), 'utf8');
assert.match(
  middleware,
  /localeDetection:\s*false/,
  'proxy.ts must build a locale-detection-free middleware for non-homepage ' +
    'paths, or every English URL redirects an Italian browser away from it.',
);
assert.match(
  middleware,
  /pathname === '\/'/,
  'proxy.ts must decide by pathname whether to detect the locale: the ' +
    'homepage guesses, every other path answers what its URL says.',
);

console.log('[OK] navigation: locale detection is scoped to the homepage');
