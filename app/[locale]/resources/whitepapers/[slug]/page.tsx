// The server half of this route, and the only one that is not the same eight
// lines as every other: this is the site's only dynamic route, so it is the
// only page.tsx with generateStaticParams and a slug to hand down. The page
// itself is body.tsx.
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/i18n/metadata';
import { messagesForRoute } from '@/i18n/messages';
import { notFound } from 'next/navigation';
import { whitepapers } from '@/data/whitepapers';
import { routes } from '@/i18n/routes';
import { ogImageUrl } from '@/i18n/urls';
import JsonLd from '@/i18n/json-ld';
import Body from './body';

const ROUTE = 'resources/whitepapers/[slug]';

type Props = { params: Promise<{ locale: string; slug: string }> };

// The one dynamic route on the site. Prerendered from the same array the
// sitemap expands, so a whitepaper cannot exist in one and not the other.
//
// The old router served this route with nothing declaring its paths, so the
// three whitepaper URLs shipped the component's own "not found" branch as their
// static HTML and only filled in after hydration. Google saw the empty one.
export function generateStaticParams() {
  return whitepapers.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const meta = await buildMetadata(ROUTE, locale);

  // The registry holds one entry for N real URLs, so the canonical and the
  // alternates come back with the segment still bracketed —
  // /resources/whitepapers/[slug]. Every whitepaper would name a URL that does
  // not exist as its canonical, which tells Google to index none of them.
  // app/sitemap.ts fills the slug the same way.
  const fill = (url: string) => url.replace('[slug]', slug);
  const languages = Object.fromEntries(
    Object.entries(meta.alternates?.languages ?? {}).map(([k, v]) => [k, fill(String(v))]),
  );

  // Four URLs share this route's namespace, so buildMetadata alone would give
  // the index's title to all three whitepapers and to the index — one title on
  // four pages, which is the defect #138 exists to remove, reintroduced.
  const t = await getTranslations(`resources.whitepapers.items.${slug}.meta`);

  // The card too: one image per whitepaper, not the route's bracketed one.
  const card = fill(ogImageUrl(routes, routes.find((r) => r.id === ROUTE)!, locale as 'en' | 'it')!);
  return {
    ...meta,
    title: t('title'),
    description: t('description'),
    alternates: { canonical: fill(String(meta.alternates?.canonical)), languages },
    // openGraph carries the same three strings, and spreading `meta` alone
    // would hand all four URLs the index's share card and the index's title
    // on LinkedIn — the defect above, one level down.
    openGraph: {
      ...meta.openGraph,
      title: t('title'),
      description: t('description'),
      url: fill(String(meta.alternates?.canonical)),
      images: [{ url: card, width: 1200, height: 630, type: 'image/png' }],
    },
    twitter: {
      ...meta.twitter,
      title: t('title'),
      description: t('description'),
      images: [card],
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!whitepapers.some((w) => w.slug === slug)) notFound();
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={await messagesForRoute(ROUTE, locale)}>
      <JsonLd routeId={ROUTE} locale={locale} />
      <Body slug={slug} />
    </NextIntlClientProvider>
  );
}
