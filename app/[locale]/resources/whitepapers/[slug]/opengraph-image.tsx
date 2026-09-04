// @ts-nocheck
// The only share card that is not one route, one image: four URLs share this
// namespace, so the title comes from the whitepaper's own meta rather than the
// route's — the same reason generateMetadata in page.tsx overrides it.
import { getTranslations } from 'next-intl/server';
import { ogCard } from '@/i18n/og-card';
import { whitepapers } from '@/data/whitepapers';

export { size, contentType } from '@/i18n/og-card';

export function generateStaticParams() {
  return ['en', 'it'].flatMap((locale) => whitepapers.map((w) => ({ locale, slug: w.slug })));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: `resources.whitepapers.items.${slug}.meta` });
  const og = await getTranslations({ locale, namespace: 'shared.ogEyebrow' });
  return ogCard({ title: t('title'), eyebrow: og('resources') });
}
