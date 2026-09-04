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
  /** Set when this route is an alternate cut of another. See i18n/routes.ts. */
  canonicalOf?: string;
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
 * Absolute URL of a route's generated share card.
 *
 * Next builds this URL from the *file-system* route, which under app/[locale]
 * always carries the prefix — so the English page emitted
 * `/en/about/opengraph-image`, and that 307s to `/about/opengraph-image`
 * because English has no prefix in a URL. Crawlers follow it, but a redirect
 * on every card fetch is a redirect that did not have to exist.
 *
 * The directory under app/[locale] is the English path, or the Italian one
 * where there is no English page — the same rule the routes README states, and
 * the reason this cannot be built from `pathFor`, which returns the *localised*
 * URL that next-intl rewrites onto that directory.
 */
export function ogImageUrl(all: RouteLike[], route: RouteLike, locale: Locale): string | undefined {
  if (route.paths[locale] === undefined) return undefined;
  const dir = route.paths.en ?? route.paths.it!;

  // One exception, and it is structural rather than a quirk of one route: a
  // route with a dynamic child is shadowed by it. /resources/whitepapers has
  // /resources/whitepapers/[slug] beneath it, so the internal path of its own
  // card reads as a slug and redirects to the Italian URL. There the card does
  // resolve — next-intl rewrites the localised path back onto the directory —
  // so for a shadowed route the localised path is the one to name.
  const shadowed = all.some((r) => (r.paths.en ?? r.paths.it ?? '').startsWith(`${dir}/[`));
  const path = shadowed ? (route.paths[locale] as string) : dir;

  const base = locale === 'en' ? BASE_URL : `${BASE_URL}/it`;
  return `${base}${path === '/' ? '' : path}/opengraph-image`;
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

/**
 * The localized form of an English in-site path — `/customers/adr` becomes
 * `/it/clienti/adr`. For a raw <a href> and for router.push, neither of which
 * adds the locale prefix itself once nextConfig.i18n is gone.
 *
 * It is idempotent: an already-localized path is not a known English path, so
 * it comes back untouched. About half the call sites already pass
 * `href(id, lang)`, and they must not be localized twice.
 *
 * `routes` is a parameter rather than an import because this file has none —
 * that is what lets scripts/check-navigation.mjs run the real function instead
 * of a second copy of the rule.
 */
export function localizePathIn(routes: RouteLike[], path: string, locale: Locale): string {
  const [rawPathname, suffix = ''] = path.split(/(?=[?#])/);
  // A trailing slash otherwise matches a route's own path as its own parent
  // below (`/customers/adr/`.startsWith('/customers/adr/')), producing
  // `/it/clienti/adr/` instead of the canonical `/it/clienti/adr` (#144 review).
  const pathname = rawPathname.length > 1 && rawPathname.endsWith('/') ? rawPathname.slice(0, -1) : rawPathname;

  const exact = routes.find((r) => r.paths.en === pathname);
  if (exact) return (pathFor(exact, locale) ?? pathname) + suffix;

  // A URL under a dynamic route — /resources/whitepapers/beyond-skills — has no
  // registry entry of its own; its parent does. Without this branch it is the
  // one link shape that keeps its English prefix in Italian, silently.
  //
  // The trailing slash in the test is what keeps '/' — which is a route — from
  // claiming every path on the site: no pathname starts with '//'. The longest
  // match wins, so /resources/whitepapers/x is claimed by /resources/whitepapers
  // and not by /resources.
  const parent = routes
    .filter((r) => r.paths.en !== undefined)
    .filter((r) => pathname.startsWith(`${r.paths.en}/`))
    .sort((a, b) => b.paths.en!.length - a.paths.en!.length)[0];
  if (parent) {
    const localized = pathFor(parent, locale);
    if (localized === undefined) return path;
    return localized + pathname.slice(parent.paths.en!.length) + suffix;
  }

  return path;
}

/**
 * The route whose content is at `pathname` in `locale` — exact match, or by
 * dynamic-child parent, the same matching internalPathIn does below.
 *
 * Exposed separately so the language switcher can check locale coverage of
 * the *current* page directly: internalPathIn's English-keyed result has no
 * representation for a route with no English page, so probing through it for
 * "does the target locale have this page" always looked like yes (#144
 * review — the switcher sent a monolingual page's visitor to a 404).
 */
export function routeAt(routes: RouteLike[], path: string, locale: Locale): RouteLike | undefined {
  const pathname = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  const exact = routes.find((r) => r.paths[locale] === pathname);
  if (exact) return exact;
  return routes
    .filter((r) => r.paths[locale] !== undefined)
    .filter((r) => pathname.startsWith(`${r.paths[locale]}/`))
    .sort((a, b) => b.paths[locale]!.length - a.paths[locale]!.length)[0];
}

/**
 * The reverse of localizePathIn: the URL a visitor is on, back to the internal
 * English-keyed path the registry is written in. `/it/clienti/adr` becomes
 * `/customers/adr`.
 *
 * The language switcher is the one caller that needs it — "this page, in the
 * other language" is `internalPathIn` followed by `localizePathIn`. Doing it in
 * two steps rather than one it-to-en map is what makes a third locale a data
 * change instead of a code change.
 */
export function internalPathIn(routes: RouteLike[], path: string, locale: Locale): string {
  const [prefixed, suffix = ''] = path.split(/(?=[?#])/);
  // Strip the prefix the visitor sees; the registry is written without it.
  const stripped = locale === 'en' ? prefixed : prefixed.replace(/^\/it(?=\/|$)/, '') || '/';
  // Same trailing-slash normalization as localizePathIn, for the same reason.
  const pathname = stripped.length > 1 && stripped.endsWith('/') ? stripped.slice(0, -1) : stripped;

  const exact = routes.find((r) => r.paths[locale] === pathname);
  if (exact) return (exact.paths.en ?? pathname) + suffix;

  const parent = routes
    .filter((r) => r.paths[locale] !== undefined)
    .filter((r) => pathname.startsWith(`${r.paths[locale]}/`))
    .sort((a, b) => b.paths[locale]!.length - a.paths[locale]!.length)[0];
  if (parent?.paths.en !== undefined) {
    return parent.paths.en + pathname.slice(parent.paths[locale]!.length) + suffix;
  }

  return pathname + suffix;
}
