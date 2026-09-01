// Temporary migration probe. It answers, without a real page, the questions the
// App Router shell has to get right: did the middleware resolve the locale,
// does the root layout render, does next-intl read the catalogue on the server,
// and do the three dependencies most likely to break still work inside a client
// boundary (#132).
//
// ponytail: scaffolding with a defined end — delete this route and probes.tsx
// with the last page that leaves pages/ (#120). It exists because a 5-week
// migration needs a route that proves the infrastructure independently of
// whichever page is half-migrated that day.

import { setRequestLocale, getTranslations } from 'next-intl/server';
import { GtmProbe, HubSpotProbe, MotionProbe } from './probes';

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

      <hr style={{ margin: '2rem 0' }} />
      <h2>dependency probes (#132)</h2>
      <MotionProbe />
      <GtmProbe />
      <HubSpotProbe />
    </main>
  );
}
