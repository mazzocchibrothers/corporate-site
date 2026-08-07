import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Inlines the CSS each page actually uses above the fold and defers the
    // rest, so the full site-wide Tailwind bundle stops blocking first paint.
    // noscriptFallback: without it, a client with JS disabled would only
    // ever get the critical subset and never load the rest of the sheet.
    optimizeCss: { noscriptFallback: true },
  },
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
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
  async rewrites() {
    return {
      // None of these set locale:false, so Next matches them with the locale
      // prefix already stripped — "/it/clienti" is tested as "clienti" under
      // the it locale and matches the same rule as plain "/clienti". No
      // separate afterFiles entry needed for the IT-prefixed form.
      beforeFiles: [
        { source: '/customers/mediaset', destination: '/customers/mediaset-2' },
        { source: '/clienti/mediaset', destination: '/customers/mediaset-2' },
        { source: '/clienti', destination: '/customers' },
        { source: '/clienti/:slug', destination: '/customers/:slug' },
      ],
    };
  },
  async redirects() {
    return [
      { source: '/it/customers', destination: '/it/clienti', locale: false, permanent: true },
      { source: '/it/customers/:slug', destination: '/it/clienti/:slug', locale: false, permanent: true },
    ];
  },
};

export default nextConfig;
