// Structure only. Every string a visitor reads lives in the catalogue under
// resources.whitepapers, keyed on the slug — including the number of takeaways,
// which the page counts from the catalogue rather than from here.
//
// The HubSpot form GUIDs stay: they identify a form, not a translation of one.
export const whitepapers = [
  {
    slug: 'beyond-skills',
    published: true,
    publishDate: '2026-01-15',
    languageAvailability: ['en', 'it'],
    industry: ['Cross-Industry'],
    topic: ['Motivation & Career Aspirations', 'Skills Verification'],
    hrProcess: ['Talent Acquisition', 'Performance Management'],
    coverImage: '/logos/wp-beyond-skills-en.png',
    coverBg: '/logos/wp-beyond-skills-bg.jpg',
    hubspotFormEN: '9df1d718-fd1d-4ad3-8b27-7e3065400e57',
    hubspotFormIT: '6b9dc8cf-8b5a-484d-9071-eb8f8ac8464c',
    takeawayCount: 4,
    relatedSlugs: ['future-leaders', 'sales-network-turnover'],
  },
  {
    slug: 'future-leaders',
    published: true,
    publishDate: '2025-11-20',
    languageAvailability: ['en', 'it'],
    industry: ['Cross-Industry'],
    topic: ['Leadership & Succession'],
    hrProcess: ['Performance Management', 'Learning & Development'],
    coverImage: '/logos/wp-future-leaders-en.png',
    coverBg: '/logos/wp-future-leaders-bg.jpg',
    hubspotFormEN: '94ebdca6-8524-4761-9049-538eecd03ed9',
    hubspotFormIT: '18a67f76-6c6c-496e-8df5-2c258b175d31',
    takeawayCount: 4,
    relatedSlugs: ['beyond-skills', 'sales-network-turnover'],
  },
  {
    slug: 'sales-network-turnover',
    published: true,
    publishDate: '2025-09-10',
    languageAvailability: ['en', 'it'],
    industry: ['Retail', 'Professional Services'],
    topic: ['Turnover & Talent Retention'],
    hrProcess: ['Talent Acquisition', 'Performance Management'],
    coverImage: '/logos/wp-turnover-en.png',
    coverBg: '/logos/wp-turnover-bg.jpg',
    hubspotFormEN: '83ec81c0-c980-41b3-8207-bbe73f6a38b4',
    hubspotFormIT: '4d13b5dc-65b4-464d-bea6-4537f9130d27',
    takeawayCount: 4,
    relatedSlugs: ['beyond-skills', 'future-leaders'],
  },
];

