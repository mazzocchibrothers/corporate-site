// Locale routing. Replaces the `i18n` block that used to live in
// next.config.ts — that block does not exist in the App Router, and leaving it
// in place while an app/ directory exists makes routing 404
// (vercel/next.js#57704). This file is its replacement, and the middleware is
// what applies it.
//
// `localePrefix: 'as-needed'` preserves the URL contract exactly as visitors
// know it today: English at `/`, unprefixed; Italian at `/it/...`.
//
// `pathnames` is what retired the hand-written /clienti rewrites: next-intl
// resolves the Italian slugs natively. The keys are the INTERNAL paths — the
// folder structure under app/[locale] — and the values are what the visitor
// sees.
//
// It is *computed* from the registry, not generated into this file. It used to
// be a literal with a comment above it saying "Generated from
// i18n/routes.json", and there was no generator: adding a slug to the registry
// left this list behind, and the new URL simply did not resolve. A file that
// derives cannot drift from what it derives from, which is one fewer check to
// write and one fewer failure to have.

import { defineRouting } from 'next-intl/routing';
import routes from './routes.json';

/**
 * Internal path -> the URL per locale.
 *
 * The internal path is the English one where the route has English and the
 * Italian one where it does not — the same rule that decides which directory
 * the page lives in, because they are the same decision.
 */
const pathnames = Object.fromEntries(
  routes.map((route) => {
    const internal = route.paths.en ?? route.paths.it;
    const localized = Object.fromEntries(
      Object.entries(route.paths).filter(([, path]) => path !== undefined),
    );
    // A route with the same path in both locales needs no per-locale object,
    // and next-intl accepts the bare string for it.
    const values = Object.values(localized);
    return [internal, values.length === 2 && values[0] === values[1] ? internal : localized];
  }),
);

export const routing = defineRouting({
  locales: ['en', 'it'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames,
});
