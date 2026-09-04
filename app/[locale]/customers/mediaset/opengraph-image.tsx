// @ts-nocheck
import { ogFor } from '@/i18n/og-card';

export { size, contentType } from '@/i18n/og-card';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'it' }];
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // The card names the story the URL shows, not the route it is filed under —
  // the same split as generateMetadata in page.tsx.
  return ogFor('customers/mediaset-2', locale);
}
