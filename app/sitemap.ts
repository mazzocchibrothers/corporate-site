// The sitemap, generated from the route registry.
//
// It replaces pages/sitemap.xml.tsx, which held its own hand-written list of
// URLs and had drifted badly: 20 of the 61 routes, and every one of those 20
// claimed an Italian alternate — including the pages that have no Italian
// version. Google was being pointed at URLs that do not exist.
//
// Nothing here is a list. Routes come from i18n/routes.json, URLs from
// i18n/urls.ts, and the same alternatesFor() the pages' hreflang tags use.

import type { MetadataRoute } from 'next';
import { routes } from '@/i18n/routes';
import { alternatesFor, localesOf, urlFor } from '@/i18n/urls';
import { whitepapers } from '@/data/whitepapers';

// ponytail: one route has a dynamic segment, so it gets one expansion rather
// than a generic mechanism. A second dynamic route is when that changes.
const DYNAMIC: Record<string, string[]> = {
  '/resources/whitepapers/[slug]': whitepapers.map((w) => w.slug),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // An alternate cut of another story canonicalises to it, and a sitemap
    // entry for a URL that says "index the other one" is a contradiction Google
    // has to resolve on its own. Seven of these existed, three of them sharing
    // a title with the page they are a cut of.
    if (route.canonicalOf !== undefined) continue;

    const languages = alternatesFor(route);

    // A dynamic route's registry entry stands for N real URLs. Substituting the
    // slug into both the loc and its alternates keeps each expansion a complete
    // hreflang cluster rather than N pages all pointing at the bracketed one.
    const slugs: (string | null)[] =
      DYNAMIC[route.paths.en ?? route.paths.it ?? ''] ?? [null];

    for (const slug of slugs) {
      const fill = (url: string) => (slug ? url.replace('[slug]', slug) : url);

      for (const locale of localesOf(route)) {
        entries.push({
          url: fill(urlFor(route, locale)!),
          changeFrequency: 'monthly',
          priority: route.id === 'index' ? 1.0 : 0.8,
          alternates: {
            languages: Object.fromEntries(
              Object.entries(languages).map(([k, v]) => [k, fill(v)]),
            ),
          },
        });
      }
    }
  }

  return entries;
}
