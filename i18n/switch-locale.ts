'use client';

// The language switcher's one job: send the visitor to this page in the other
// language.
//
// It is all that survived i18n/LanguageContext.tsx. That context existed to
// hand out `t` — the dictionary lookup — and `lang`, which is `useLocale()`.
// With the dictionary gone (#110), a whole React context for one navigation
// helper is machinery around nothing.
//
// The route it lands on is the registry's, in two steps: the visitor's URL back
// to the internal path (`/it/clienti/adr` -> `/customers/adr`), then forward
// into the target locale. Both steps are covered by scripts/check-navigation.mjs,
// which round-trips every bilingual route — this is the code path that shipped a
// 404 once already (commit 67f53be).

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback } from 'react';
import { routes } from './routes';
import { internalPathIn, localizePathIn, type Locale } from './urls';

export function useSwitchLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale();

  return useCallback(
    (locale: string) => {
      // usePathname is null only before the router mounts; there is nothing to
      // switch to then, and guessing '/' would move the visitor off the page.
      if (pathname === null) return;
      const internal = internalPathIn(routes, pathname, current as Locale);
      // Plain next/navigation, not i18n/navigation: the target is already
      // localized, and localizing it a second time is exactly what this hook
      // must not do.
      router.push(localizePathIn(routes, internal, locale as Locale));
    },
    [router, pathname, current],
  );
}
