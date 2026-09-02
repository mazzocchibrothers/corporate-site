// Message loading for Pages Router.
//
// The constraint that shapes this file: the catalogue is roughly 19k words per
// locale. Importing all of it into _app.tsx would ship every page's copy to
// every visitor, in both languages. So a page loads only the namespaces it
// actually renders, through getStaticProps, and next-intl gets exactly those.
//
// Usage, one line per page:
//
//   export const getStaticProps = messagesFor('customers/adr');
//
// The argument is the route's `id` in routes.json — the same identifier the
// sitemap and the hreflang tags key off, so a page cannot drift into using a
// namespace no route claims.

import type { GetStaticProps } from 'next';

/**
 * Namespaces every page renders.
 *
 * `common` is the navbar and the footer. `shared` is the handful of components
 * used by more than one page — the cross-link blocks and the final CTA, which
 * between them appear on 23 of the 61 routes. Loading the whole block everywhere
 * costs less than the machinery to load a page's share of it.
 */
const SHARED = ['common', 'shared'];

/**
 * Route id -> message namespace.
 *
 * `customers/adr` -> `customers.adr`, so the catalogue nests the same way the
 * routes do. Two adjustments:
 *
 * - the homepage is `home` rather than the meaningless `index`
 * - a dynamic segment is dropped, not de-bracketed. `[slug]` is not a legal ICU
 *   key path, and `resources.whitepapers.slug` would be worse than illegal: it
 *   would split one whitepaper's copy across two namespaces, because the card on
 *   the index and the page it links to render the same title.
 */
export function namespaceOf(routeId: string): string {
  if (routeId === 'index') return 'home';
  return routeId
    .split('/')
    .filter((segment) => !/^\[.*\]$/.test(segment))
    .join('.');
}

/** Rebuilds `{a: {b: …}}` from a dotted path, dropping everything else.
 *  Exported for scripts/check-messages.mjs — pure, and it has had a bug. */
export function pick(source: Record<string, unknown>, dotted: string) {
  const segments = dotted.split('.');
  const out: Record<string, unknown> = {};

  let from: unknown = source;
  let to = out;
  for (const [i, segment] of segments.entries()) {
    if (typeof from !== 'object' || from === null) return {};
    const next = (from as Record<string, unknown>)[segment];
    if (next === undefined) return {};
    if (i === segments.length - 1) {
      to[segment] = next;
    } else {
      to[segment] = {};
      to = to[segment] as Record<string, unknown>;
    }
    from = next;
  }
  return out;
}

/**
 * Deep-merges the picked namespaces.
 *
 * A shallow spread would be wrong the moment one page wants two namespaces
 * under the same root — `customers.adr` and `customers.list` would each carry
 * their own `customers` object and the second would replace the first.
 */
export function merge(a: Record<string, unknown>, b: Record<string, unknown>) {
  const out = { ...a };
  for (const [key, value] of Object.entries(b)) {
    const existing = out[key];
    const bothPlainObjects =
      typeof existing === 'object' && existing !== null && !Array.isArray(existing) &&
      typeof value === 'object' && value !== null && !Array.isArray(value);
    out[key] = bothPlainObjects
      ? merge(existing as Record<string, unknown>, value as Record<string, unknown>)
      : value;
  }
  return out;
}

/**
 * @param routeId   the route's `id` in routes.json
 * @param forceLocale for a twin-page pair — one route, one file per locale, like
 *   book-meeting/prenota-incontro. Such a file serves exactly one language, and
 *   during the migration `locale` is undefined here: nextConfig.i18n is gone and
 *   the middleware skips unmigrated routes, so without this the Italian file
 *   would render an English title. Delete the argument when the pair moves to
 *   app/ and next-intl resolves the locale itself (#119).
 */
export function messagesFor(routeId: string, forceLocale?: 'en' | 'it'): GetStaticProps {
  return async function getStaticProps({ locale: contextLocale }) {
    const locale = forceLocale ?? contextLocale;
    // A literal path prefix keeps the bundler able to see the whole directory,
    // so both catalogues are emitted and only the requested one is fetched.
    // The import attribute is not decoration: without it Node refuses to load
    // JSON through a dynamic import, and scripts/check-messages.mjs could only
    // ever test the pure helpers, never the loading path a page actually uses.
    // Turbopack accepts it too, so one line of code serves both runtimes.
    const all = (await import(`../messages/${locale ?? 'en'}.json`, { with: { type: 'json' } }))
      .default;

    const wanted = [...SHARED, namespaceOf(routeId)];
    const messages = wanted.reduce<Record<string, unknown>>(
      (acc, ns) => merge(acc, pick(all, ns)),
      {},
    );

    return { props: { messages } };
  };
}
