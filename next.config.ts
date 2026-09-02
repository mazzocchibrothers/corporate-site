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
    //
    // Pages Router only. Measured on this build (#132): a pages/ route ships
    // 21.7 KB of inlined critical CSS and defers the 105 KB sheet; the app/
    // route ships no inline CSS and a render-blocking <link> to the whole
    // thing. So this option quietly stops doing anything, page by page, as the
    // migration proceeds — it does not fail, it just goes silent. The
    // replacement is decided in #135, before the switch.
    optimizeCss: { noscriptFallback: true },
  },
  // The one rewrite that is not about locale, and so did not move to next-intl
  // pathnames with the others (#126): /customers/mediaset serves the mediaset-2
  // cut of the story. It was dropped with the locale rewrites, which silently
  // changed what that URL renders — found by diffing against production (#113).
  //
  // Which cut should be live is a content question, recorded on #113. This
  // restores what the site serves today.
  // beforeFiles, not the default afterFiles: pages/customers/mediaset.tsx
  // exists, so an afterFiles rewrite would never fire — the page matches first
  // and the alias is silently ignored.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/customers/mediaset', destination: '/customers/mediaset-2' },
        { source: '/it/customers/mediaset', destination: '/it/customers/mediaset-2' },
      ],
    };
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
