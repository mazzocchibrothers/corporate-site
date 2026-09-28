// The server half of this route. The page itself is body.tsx.
//
// Every route has this pair, and this file is the same eight lines everywhere:
// what only the server can do — the title and canonical from the registry, and
// the message provider narrowed to this route's namespaces. body.tsx is the
// page as it was written, and it is a client component because the HubSpot
// embed script and useRouter both live in it.
//
// Duplicated from app/[locale]/book-meeting/, which is the site's other
// HubSpot-form landing page.
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/i18n/metadata';
import { messagesForRoute } from '@/i18n/messages';
import JsonLd from '@/i18n/json-ld';
import Body from './body';

const ROUTE = 'become-a-partner';

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
