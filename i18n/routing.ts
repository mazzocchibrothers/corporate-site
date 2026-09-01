// Locale routing. Replaces the `i18n` block that used to live in
// next.config.ts — that block does not exist in the App Router, and leaving it
// in place while an app/ directory exists makes routing 404
// (vercel/next.js#57704). This file is its replacement, and the middleware is
// what applies it.
//
// `localePrefix: 'as-needed'` preserves the URL contract exactly as visitors
// know it today: English at `/`, unprefixed; Italian at `/it/...`.
//
// `pathnames` is generated from routes.json, so the Italian slugs are declared
// in one place and next-intl resolves them natively — this is what retired the
// hand-written `/clienti` rewrites. The keys are the INTERNAL paths (the folder
// structure under app/[locale]); the values are what the visitor sees.
//
// Generated from i18n/routes.json. Add a slug there, not here.

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'it'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/about': '/about',
    '/blog': '/blog',
    '/blog/accountability': '/blog/accountability',
    '/blog/attitude-vs-competence': '/blog/attitude-vs-competence',
    '/blog/corporate-onboarding': '/blog/corporate-onboarding',
    '/blog/critical-thinking': '/blog/critical-thinking',
    '/blog/managerial-skills': '/blog/managerial-skills',
    '/blog/negotiation-techniques': '/blog/negotiation-techniques',
    '/blog/newsletter-august-2026': '/blog/newsletter-august-2026',
    '/blog/newsletter-july-2026': '/blog/newsletter-july-2026',
    '/blog/recruitment-biases': '/blog/recruitment-biases',
    '/blog/social-skills': '/blog/social-skills',
    '/blog/talent-acquisition': '/blog/talent-acquisition',
    '/book-meeting': { en: '/book-meeting', it: '/prenota-incontro' },
    '/careers': '/careers',
    '/customers': { en: '/customers', it: '/clienti' },
    '/customers/adr': { en: '/customers/adr', it: '/clienti/adr' },
    '/customers/adr-2': { en: '/customers/adr-2', it: '/clienti/adr-2' },
    '/customers/carrefour': { en: '/customers/carrefour', it: '/clienti/carrefour' },
    '/customers/credem': { en: '/customers/credem', it: '/clienti/credem' },
    '/customers/douglas': { en: '/customers/douglas', it: '/clienti/douglas' },
    '/customers/eataly': { en: '/customers/eataly', it: '/clienti/eataly' },
    '/customers/eataly-2': { en: '/customers/eataly-2', it: '/clienti/eataly-2' },
    '/customers/eataly-3': { en: '/customers/eataly-3', it: '/clienti/eataly-3' },
    '/customers/europ-assistance': { en: '/customers/europ-assistance', it: '/clienti/europ-assistance' },
    '/customers/europ-assistance-2': { en: '/customers/europ-assistance-2', it: '/clienti/europ-assistance-2' },
    '/customers/fidia-farmaceutici': { en: '/customers/fidia-farmaceutici', it: '/clienti/fidia-farmaceutici' },
    '/customers/ins-mercato': { en: '/customers/ins-mercato', it: '/clienti/ins-mercato' },
    '/customers/mediaset': { en: '/customers/mediaset', it: '/clienti/mediaset' },
    '/customers/mediaset-1': { en: '/customers/mediaset-1', it: '/clienti/mediaset-1' },
    '/customers/mediaset-2': { en: '/customers/mediaset-2', it: '/clienti/mediaset-2' },
    '/customers/subdued': { en: '/customers/subdued', it: '/clienti/subdued' },
    '/customers/unicomm': { en: '/customers/unicomm', it: '/clienti/unicomm' },
    '/': '/',
    '/lp/ai-act-banking': { it: '/lp/ai-act-banking' },
    '/lp/ai-competency': '/lp/ai-competency',
    '/lp/ai-competency-newsletter': '/lp/ai-competency-newsletter',
    '/lp/arte-di-misurare-allineamento': { it: '/lp/arte-di-misurare-allineamento' },
    '/lp/career-aspiration-insurance': { it: '/lp/career-aspiration-insurance' },
    '/lp/career-aspiration-insurance/whitepaper': { it: '/lp/career-aspiration-insurance/whitepaper' },
    '/lp/europ-assistance': '/lp/europ-assistance',
    '/lp/food-retail': '/lp/food-retail',
    '/lp/hidden-cost-recruiting': { en: '/lp/hidden-cost-recruiting' },
    '/lp/il-costo-invisibile': { it: '/lp/il-costo-invisibile' },
    '/lp/il-costo-invisibile/whitepaper': { it: '/lp/il-costo-invisibile/whitepaper' },
    '/lp/il-turnover-nei-negozi-del-lusso': { it: '/lp/il-turnover-nei-negozi-del-lusso' },
    '/lp/la-crisi-delle-competenze': { it: '/lp/la-crisi-delle-competenze' },
    '/lp/scalare-l-eccellenza': { it: '/lp/scalare-l-eccellenza' },
    '/lp/supermarkets': '/lp/supermarkets',
    '/privacy-policy': '/privacy-policy',
    '/privacy-policy-algo': { it: '/privacy-policy-algo' },
    '/product-overview': '/product-overview',
    '/resources/press': '/resources/press',
    '/resources/whitepapers': '/resources/whitepapers',
    '/resources/whitepapers/[slug]': '/resources/whitepapers/[slug]',
    '/science': '/science',
    '/solutions/internal-mobility': '/solutions/internal-mobility',
    '/solutions/learning-development': '/solutions/learning-development',
    '/solutions/performance-management': '/solutions/performance-management',
    '/solutions/project-resourcing': '/solutions/project-resourcing',
    '/solutions/talent-acquisition': '/solutions/talent-acquisition',
  },
});

export type AppPathname = keyof typeof routing.pathnames;
