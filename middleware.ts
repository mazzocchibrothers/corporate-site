// Locale routing, applied. This is what replaced the `i18n` block in
// next.config.ts: it resolves the locale from the URL prefix, the cookie and
// Accept-Language, and rewrites the localized pathname onto the internal one
// (`/it/clienti/adr` -> `/it/customers/adr`).

import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import migrated from './i18n/migrated.json';

const intlMiddleware = createMiddleware(routing);

// ponytail: migration scaffolding, deleted at the switch (#120) together with
// i18n/migrated.json and scripts/gen-migrated.mjs.
//
// The rewrite this middleware performs adds a locale segment, which pages/
// routes do not have — so running it over an unmigrated route turns it into a
// 404. Skipping those keeps the English site previewable for the whole
// migration instead of leaving the branch dark until the last page lands.
// Italian for an unmigrated route stays unavailable either way: there is no
// /it/... page under pages/ once nextConfig.i18n is gone.
const MIGRATED = new Set(migrated.paths);

function isMigrated(pathname: string): boolean {
  // Strip the locale prefix the visitor typed, so /it/clienti is tested as
  // /clienti — the form the registry actually holds.
  const withoutLocale = pathname.replace(/^\/(en|it)(?=\/|$)/, '') || '/';
  if (MIGRATED.has(withoutLocale)) return true;
  // Nested paths under a migrated route (a dynamic segment, say) travel with it.
  return [...MIGRATED].some((p) => p !== '/' && withoutLocale.startsWith(`${p}/`));
}

export default function middleware(request: NextRequest) {
  if (!isMigrated(request.nextUrl.pathname)) return NextResponse.next();
  return intlMiddleware(request);
}

export const config = {
  // Everything except Next internals, the API routes and anything with a file
  // extension. Without the extension guard the middleware would run for every
  // font, image and PDF in public/ — 80+ font files alone.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
