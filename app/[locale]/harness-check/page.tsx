// Temporary migration probe. It answers, without a browser and without a real
// page, the three questions the App Router shell has to get right: did the
// middleware resolve the locale, does the root layout render, and does
// next-intl read the catalogue on the server.
//
// ponytail: scaffolding with a defined end — delete this route with the last
// page that leaves pages/ (#131). It exists because a 5-week migration needs a
// route that proves the infrastructure independently of whichever page is
// half-migrated that day.

import { setRequestLocale, getTranslations } from 'next-intl/server';

export default async function HarnessCheck({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home.meta');

  return (
    <main style={{ padding: '3rem', fontFamily: 'monospace', lineHeight: 1.8 }}>
      <h1>harness-check</h1>
      <p>router: <strong>app</strong></p>
      <p>locale: <strong>{locale}</strong></p>
      <p>message: <strong>{t('title')}</strong></p>
    </main>
  );
}
