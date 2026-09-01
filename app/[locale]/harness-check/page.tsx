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
import { buildMetadata } from '@/i18n/metadata';
import { GtmProbe, HubSpotProbe, MotionProbe } from './probes';

// ponytail: the probe has no registry entry of its own, so it exercises the
// helper against a real one. `index` is chosen because it is the only route
// whose meta copy is in the catalogue today. The canonical this emits is the
// homepage's, which is wrong for this URL and harmless: the probe is never
// deployed, and it is deleted at the switch (#120).
export async function generateMetadata({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return buildMetadata('index', locale);
}

export default async function HarnessCheck({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home.meta');
  const meta = await buildMetadata('index', locale);

  return (
    <main style={{ padding: '3rem', fontFamily: 'monospace', lineHeight: 1.8 }}>
      <h1>harness-check</h1>
      <p>router: <strong>app</strong></p>
      <p>locale: <strong>{locale}</strong></p>
      <p>message: <strong>{t('title')}</strong></p>

      <hr style={{ margin: '2rem 0' }} />
      <h2>dependency probes (#132)</h2>
      <pre data-probe="metadata" style={{ whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(meta.alternates, null, 2)}
      </pre>
      <MotionProbe />
      <GtmProbe />
      <HubSpotProbe />
    </main>
  );
}
