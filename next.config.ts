import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import routes from "./i18n/routes.json";

// Points next-intl at i18n/request.ts. Without it the server has no config and
// every App Router page fails at prerender with "Couldn't find next-intl config
// file" — which surfaces as a build error, not a runtime one.
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Locale routing lives in i18n/routing.ts + middleware.ts, not here. The `i18n`
// block does not exist in the App Router, and the /clienti rewrites it used to
// carry are now next-intl `pathnames`, generated from i18n/routes.json.
//
// There are no rewrites left at all. The last one aliased /customers/mediaset
// onto the mediaset-2 cut of that story; it is a re-export in that route's
// page.tsx now, because a rewrite onto a path that also exists as a page never
// fires — which is how it broke once already (#113).
//
// There is no CSS option here on purpose. experimental.optimizeCss went with
// pages/ — critters is Pages Router only, and it did not fail when a page
// moved, it just quietly stopped inlining that page's critical CSS. Its App
// Router counterpart, experimental.inlineCss, was measured and rejected: see
// harness/docs/conventions.md, "CSS delivery" (#135).
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Permanent redirects for every Italian slug, generated from the registry.
  //
  // next-intl already sends /it/customers/adr to /it/clienti/adr — but with a
  // 307, which tells Google the move is temporary and to keep indexing the old
  // URL. A slug that has been translated is not moving back. These run before
  // the middleware, so they answer first and next-intl's 307 is never reached.
  //
  // Nothing to maintain: the list is every route whose Italian path differs
  // from its English one, which is two today and becomes every route as #119
  // translates them. Adding a slug to i18n/routes.json is the whole change.
  async redirects() {
    return routes
      .filter((r) => r.paths.en !== undefined && r.paths.it !== undefined)
      .filter((r) => r.paths.en !== r.paths.it)
      .map((r) => ({
        source: `/it${r.paths.en}`,
        destination: `/it${r.paths.it}`,
        permanent: true,
      }));
  },

  async headers() {
    const oneYearImmutable = 'public, max-age=31536000, immutable';
    const thirtyDays = 'public, max-age=2592000, stale-while-revalidate=86400';
    return [
      { source: '/fonts/:path*', headers: [{ key: 'Cache-Control', value: oneYearImmutable }] },
      { source: '/logos/:path*', headers: [{ key: 'Cache-Control', value: thirtyDays }] },
      { source: '/assets/:path*', headers: [{ key: 'Cache-Control', value: thirtyDays }] },
      { source: '/animations/:path*', headers: [{ key: 'Cache-Control', value: thirtyDays }] },
      { source: '/team/:path*', headers: [{ key: 'Cache-Control', value: thirtyDays }] },
      { source: '/about/:path*', headers: [{ key: 'Cache-Control', value: thirtyDays }] },
      { source: '/careers/:path*', headers: [{ key: 'Cache-Control', value: thirtyDays }] },
    ];
  },
};

export default withNextIntl(nextConfig);
