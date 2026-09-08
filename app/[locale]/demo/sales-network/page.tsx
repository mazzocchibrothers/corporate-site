// The server half of this route. The page itself is body.tsx.
//
// Same shape as every other route, with `"noindex": true` on
// `demo/sales-network` in i18n/routes.json doing the one thing that is
// different: robots noindex/nofollow, and out of the sitemap. These pages
// travel by link, one prospect at a time.
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/i18n/metadata';
import { messagesForRoute } from '@/i18n/messages';
import JsonLd from '@/i18n/json-ld';
import Body from './body';

const ROUTE = 'demo/sales-network';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return buildMetadata(ROUTE, locale);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={await messagesForRoute(ROUTE, locale)}>
      <JsonLd routeId={ROUTE} locale={locale} />
      <Body />
    </NextIntlClientProvider>
  );
}
