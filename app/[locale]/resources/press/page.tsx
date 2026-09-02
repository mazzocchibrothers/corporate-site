// The server half of this route. The page itself is body.tsx.
//
// Every route has this pair, and this file is the same eight lines everywhere:
// what only the server can do — the title and canonical from the registry, and
// the message provider narrowed to this route's namespaces. body.tsx is the
// page as it was written, and it is a client component because framer-motion,
// useEffect and useRouter all live in it.
//
// Both files were produced in one pass over pages/ at the switch (#137).
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/i18n/metadata';
import { messagesForRoute } from '@/i18n/messages';
import Body from './body';

const ROUTE = 'resources/press';

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
      <Body />
    </NextIntlClientProvider>
  );
}
