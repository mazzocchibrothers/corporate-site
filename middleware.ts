// Locale routing, applied. This is what replaced the `i18n` block in
// next.config.ts: it resolves the locale from the URL prefix, the cookie and
// Accept-Language, and rewrites the localized pathname onto the internal one
// (`/it/clienti/adr` -> `/it/customers/adr`).

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Everything except Next internals, the API routes and anything with a file
  // extension. Without the extension guard the middleware would run for every
  // font, image and PDF in public/ — 80+ font files alone.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
