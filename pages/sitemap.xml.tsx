import { GetServerSideProps } from 'next';

const BASE_URL = 'https://skillvue.ai';

const pages = [
  '/',
  '/product-overview',
  '/about',
  '/science',
  '/solutions/talent-acquisition',
  '/solutions/performance-management',
  '/solutions/learning-development',
  '/solutions/internal-mobility',
  '/solutions/project-resourcing',
  '/customers/carrefour',
  '/customers/subdued',
  '/customers/ins-mercato',
];

// Pages with different IT slugs
const translatedPages = [
  { en: '/customers', it: '/clienti' },
];

function generateSitemap(): string {
  const standardUrls = pages.flatMap((path) => {
    const enLoc = `${BASE_URL}${path}`;
    const itLoc = path === '/' ? `${BASE_URL}/it` : `${BASE_URL}/it${path}`;
    return [
      `
  <url>
    <loc>${enLoc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="it" href="${itLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>
    <changefreq>monthly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
      `
  <url>
    <loc>${itLoc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="it" href="${itLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>
    <changefreq>monthly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
    ];
  });

  const translatedUrls = translatedPages.flatMap(({ en, it }) => {
    const enLoc = `${BASE_URL}${en}`;
    const itLoc = `${BASE_URL}/it${it}`;
    return [
      `
  <url>
    <loc>${enLoc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="it" href="${itLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
      `
  <url>
    <loc>${itLoc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="it" href="${itLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${enLoc}"/>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    ];
  });

  const urls = [...standardUrls, ...translatedUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join('')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(generateSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
