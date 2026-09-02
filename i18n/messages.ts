// Which messages reach the browser.
//
// The constraint that shapes this file: the catalogue is ~19k words per locale.
// A NextIntlClientProvider rendered without `messages` inherits all of it from
// i18n/request.ts and serializes it into the document — measured, a ten-line
// page prerendered to 310 KB. So each page provides its own, narrowed to the
// namespaces it renders.
//
// Usage, one line per page.tsx:
//
//   <NextIntlClientProvider messages={await messagesForRoute(ROUTE, locale)}>
//
// The argument is the route's `id` in routes.json — the same identifier the
// sitemap and the hreflang tags key off, so a page cannot drift into using a
// namespace no route claims.

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
 * The namespaces one route renders, for both locales' catalogues.
 *
 * Server-rendered strings do not come through here — they read from the request
 * config. This is only what crosses to the browser.
 */
export async function messagesForRoute(routeId: string, locale: string | undefined) {
  // A literal path prefix keeps the bundler able to see the whole directory,
  // so both catalogues are emitted and only the requested one is fetched.
  // The import attribute is not decoration: without it Node refuses to load
  // JSON through a dynamic import, and scripts/check-messages.mjs could only
  // ever test the pure helpers, never the loading path a page actually uses.
  // Turbopack accepts it too, so one line of code serves both runtimes.
  const all = (await import(`../messages/${locale ?? 'en'}.json`, { with: { type: 'json' } }))
    .default;

  const wanted = [...SHARED, namespaceOf(routeId)];
  return wanted.reduce<Record<string, unknown>>((acc, ns) => merge(acc, pick(all, ns)), {});
}
