// Locale routing, applied. This is what replaced the `i18n` block in
// next.config.ts: it resolves the locale from the URL prefix, the cookie and
// Accept-Language, and rewrites the localized pathname onto the internal one
// (`/it/clienti/adr` -> `/it/customers/adr`).

import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Language detection on the homepage only, which is what the site has always
// done and what `nextConfig.i18n` did for free: Next's built-in detection
// redirected `/` by Accept-Language and left every other path alone.
//
// next-intl detects on *every* path by default, and that is a different site.
// An Italian colleague opening an English link to a customer story would be
// bounced to the Italian version of it — measured against production, where
// that URL answers 200 in English. Sharing a link would stop meaning what it
// says.
//
// So: two middlewares, and the homepage is the only one that guesses.
const detectLocale = createMiddleware(routing);
const respectTheUrl = createMiddleware({ ...routing, localeDetection: false });

export default function middleware(request: NextRequest) {
  const isHomepage = request.nextUrl.pathname === '/';
  return (isHomepage ? detectLocale : respectTheUrl)(request);
}

export const config = {
  // Everything except Next internals, the API routes and anything with a file
  // extension. Without the extension guard the middleware would run for every
  // font, image and PDF in public/ — 80+ font files alone.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
