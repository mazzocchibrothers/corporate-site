'use client';

// The App Router's useRouter, taught the one thing the Pages Router did for
// free: locale.
//
// Under `nextConfig.i18n`, `router.push('/book-meeting')` sent an Italian
// visitor to `/it/prenota-incontro` — Next added the prefix and the rewrite
// resolved the slug. Neither exists in the App Router, so the same call would
// have dropped every Italian visitor onto the English page. There are 98
// `router.push` calls on this site and about half take a variable, a catalogue
// value or a field of a data object, so guarding them at the call sites was
// never going to hold.
//
// So the guard is here, once, and the codemod's only edit per file is the
// import specifier: `next/router` becomes `@/i18n/navigation`.
//
// localizePath is idempotent — an already-localized path is not a known English
// path, so it comes back unchanged. That matters because roughly half the call
// sites already pass `href(id, lang)`.

import { useRouter as useNextRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useMemo } from 'react';
import { localizePath } from './routes';

export function useRouter() {
  const router = useNextRouter();
  const locale = useLocale();

  return useMemo(
    () => ({
      push: (path: string) => router.push(localizePath(path, locale)),
      replace: (path: string) => router.replace(localizePath(path, locale)),
      // Spelled out rather than spread: `...router` would carry whatever
      // next/navigation adds next, and a future `router.prefetch` that skipped
      // localizePath would be a bug nobody wrote.
      back: () => router.back(),
      forward: () => router.forward(),
      refresh: () => router.refresh(),
      prefetch: (path: string) => router.prefetch(localizePath(path, locale)),
    }),
    [router, locale],
  );
}
