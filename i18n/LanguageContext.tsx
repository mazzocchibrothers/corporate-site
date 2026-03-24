import React, { createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { translations } from './translations';

interface LanguageContextType {
  lang: string;
  switchLang: (newLang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const lang = router.locale || 'en';

  const switchLang = useCallback((newLang: string) => {
    router.push(router.asPath, router.asPath, { locale: newLang });
  }, [router]);

  const t = useCallback((key: string): string => {
    if (lang === 'en') return key;
    return (translations as Record<string, string>)[key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) return { lang: 'en', switchLang: () => {}, t: (k: string) => k };
  return ctx;
}
