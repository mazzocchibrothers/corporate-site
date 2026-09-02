// @ts-nocheck
import { ogFor } from '@/i18n/og-card';

export { size, contentType } from '@/i18n/og-card';

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return ogFor('lp/hidden-cost-recruiting', locale);
}
