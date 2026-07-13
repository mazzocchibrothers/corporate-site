import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
      beforeFiles: [
        { source: '/customers/mediaset', destination: '/customers/mediaset-2' },
        { source: '/clienti/mediaset', destination: '/customers/mediaset-2' },
        { source: '/clienti/:slug', destination: '/customers/:slug' },
      ],
      afterFiles: [
        { source: '/it/clienti', destination: '/it/customers', locale: false },
        { source: '/it/clienti/:slug', destination: '/it/customers/:slug', locale: false },
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
