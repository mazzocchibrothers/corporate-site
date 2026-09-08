// The server half of this route. The page itself is body.tsx.
//
// The same eight lines as every other route, with one difference that lives in
// the registry rather than here: `"noindex": true` in i18n/routes.json, which
// buildMetadata turns into robots noindex/nofollow and which keeps the route
// out of the sitemap. Nothing on this page renders a robots tag by hand.
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/i18n/metadata';
import { messagesForRoute } from '@/i18n/messages';
import JsonLd from '@/i18n/json-ld';
import Body from './body';

const ROUTE = 'demo';

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
