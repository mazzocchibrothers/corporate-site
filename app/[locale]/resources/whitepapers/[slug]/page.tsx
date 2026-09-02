// The server half of this route, and the only one that is not the same eight
// lines as every other: this is the site's only dynamic route, so it is the
// only page.tsx with generateStaticParams and a slug to hand down. The page
// itself is body.tsx.
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/i18n/metadata';
import { messagesForRoute } from '@/i18n/messages';
import { notFound } from 'next/navigation';
import { whitepapers } from '@/data/whitepapers';
import Body from './body';

const ROUTE = 'resources/whitepapers/[slug]';

type Props = { params: Promise<{ locale: string; slug: string }> };

// The one dynamic route on the site. Prerendered from the same array the
// sitemap expands, so a whitepaper cannot exist in one and not the other.
//
// Under pages/ this route had no getStaticPaths at all: the three whitepaper
// URLs served the component's own "not found" branch as their static HTML, and
// only filled in after hydration. Google saw the empty one.
export function generateStaticParams() {
  return whitepapers.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return buildMetadata(ROUTE, locale);
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!whitepapers.some((w) => w.slug === slug)) notFound();
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={await messagesForRoute(ROUTE, locale)}>
      <Body slug={slug} />
    </NextIntlClientProvider>
  );
}
