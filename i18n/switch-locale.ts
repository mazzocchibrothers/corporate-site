'use client';

// The language switcher's one job: send the visitor to this page in the other
// language.
//
// It is all that survived i18n/LanguageContext.tsx. That context existed to
// hand out `t` — the dictionary lookup — and `lang`, which is `useLocale()`.
// With the dictionary gone (#110), a whole React context for one navigation
// helper is machinery around nothing.
//
// ponytail: this goes too, at the switch. next-intl's own Link and usePathname
// do it natively once routing is `pathnames`-driven (#119).

import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { localizePath } from './routes';

export function useSwitchLocale() {
  const router = useRouter();
  return useCallback(
    (locale: string) => {
      // asPath comes with the locale prefix stripped, so /it/clienti reads as
      // /clienti — which is not a real English path. The registry maps it.
      const target = localizePath(router.asPath, locale);
      router.push(target, target, { locale });
    },
    [router],
  );
}
