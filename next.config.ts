import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Points next-intl at i18n/request.ts. Without it the server has no config and
// every App Router page fails at prerender with "Couldn't find next-intl config
// file" — which surfaces as a build error, not a runtime one.
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Locale routing lives in i18n/routing.ts + middleware.ts, not here. The `i18n`
// block does not exist in the App Router, and the /clienti rewrites it used to
// carry are now next-intl `pathnames`, generated from i18n/routes.json.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Inlines the CSS each page actually uses above the fold and defers the
    // rest, so the full site-wide Tailwind bundle stops blocking first paint.
    // noscriptFallback: without it, a client with JS disabled would only
    // ever get the critical subset and never load the rest of the sheet.
    optimizeCss: { noscriptFallback: true },
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
