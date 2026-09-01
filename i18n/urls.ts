// The one place a public URL for a route is built.
//
// Three consumers need it and used to each have their own copy: the hreflang
// tags, the sitemap, and the canonical link. The copies disagreed — the sitemap
// listed 20 of the 61 routes and every one of them claimed an Italian alternate,
// including the ten that have no Italian page (#102, #116).
//
// Plain TypeScript with no imports on purpose: Node 24 runs this file directly,
// so scripts/check-routes.mjs asserts against the same function the site emits
// from, instead of against a second copy of the rule.

export type Locale = 'en' | 'it';

/** A route as the registry holds it. `paths` without the /it prefix. */
export type RouteLike = {
  id: string;
  paths: Partial<Record<Locale, string>>;
};

export const BASE_URL = 'https://skillvue.ai';

/** The locales a route actually has content in. */
export const localesOf = (route: RouteLike): Locale[] =>
  (['en', 'it'] as Locale[]).filter((l) => route.paths[l] !== undefined);

/**
 * Absolute URL for one locale of a route, or undefined if the route has no
 * content there. Undefined is the point: a monolingual route must not be given
 * a URL in the language it cannot serve.
 */
export function urlFor(route: RouteLike, locale: Locale): string | undefined {
  const path = route.paths[locale];
  if (path === undefined) return undefined;
  if (locale === 'en') return `${BASE_URL}${path}`;
  return path === '/' ? `${BASE_URL}/it` : `${BASE_URL}/it${path}`;
}

/**
 * The in-site path for one locale of a route, prefixed the way the visitor
 * sees it. This is what a link href needs; urlFor is the same thing absolute,
 * for canonicals and the sitemap.
 *
 * Undefined means the route has no content in that locale — a nav item with no
 * Italian version, which is a link the Italian navbar must not render rather
 * than one that quietly falls back to English.
 */
export function pathFor(route: RouteLike, locale: Locale): string | undefined {
  const path = route.paths[locale];
  if (path === undefined) return undefined;
  if (locale === 'en') return path;
  return path === '/' ? '/it' : `/it${path}`;
}

/**
 * The hreflang set for a route: one entry per locale it serves, plus
 * x-default.
 *
 * x-default names the version to show a visitor whose language we do not
 * publish. That is English where English exists; for the ten Italian-only
 * landing pages it is the Italian one, because a page that exists beats a page
 * that does not.
 */
export function alternatesFor(route: RouteLike): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of localesOf(route)) {
    languages[locale] = urlFor(route, locale)!;
  }
  const fallback = languages.en ?? Object.values(languages)[0];
  if (fallback) languages['x-default'] = fallback;
  return languages;
}
