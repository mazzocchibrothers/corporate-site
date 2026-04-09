import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      { source: '/it/clienti', destination: '/it/customers', locale: false },
    ];
  },
  async redirects() {
    return [
      { source: '/it/customers', destination: '/it/clienti', locale: false, permanent: true },
    ];
  },
};

export default nextConfig;
