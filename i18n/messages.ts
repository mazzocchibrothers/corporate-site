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

/** Namespaces every page renders, because every page has a navbar and a footer. */
const SHARED = ['common'];

/**
 * Route id -> message namespace.
 *
 * `customers/adr` -> `customers.adr`, so the catalogue nests the same way the
 * routes do. Two adjustments: the homepage is `home` rather than the
 * meaningless `index`, and a dynamic segment loses its brackets because
 * `[slug]` is not a legal thing to type in an ICU key path.
 */
export function namespaceOf(routeId: string): string {
  if (routeId === 'index') return 'home';
  return routeId.replace(/\[|\]/g, '').replace(/\//g, '.');
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

export function messagesFor(routeId: string, extra: string[] = []): GetStaticProps {
  return async function getStaticProps({ locale }) {
    // A literal path prefix keeps the bundler able to see the whole directory,
    // so both catalogues are emitted and only the requested one is fetched.
    // The import attribute is not decoration: without it Node refuses to load
    // JSON through a dynamic import, and scripts/check-messages.mjs could only
    // ever test the pure helpers, never the loading path a page actually uses.
    // Turbopack accepts it too, so one line of code serves both runtimes.
    const all = (await import(`../messages/${locale ?? 'en'}.json`, { with: { type: 'json' } }))
      .default;

    const wanted = [...SHARED, namespaceOf(routeId), ...extra];
    const messages = wanted.reduce<Record<string, unknown>>(
      (acc, ns) => merge(acc, pick(all, ns)),
      {},
    );

    return { props: { messages } };
  };
}
