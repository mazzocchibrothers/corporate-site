// Not generated: /customers/mediaset is an alias, and the codemod does not
// invent those.
//
// The URL serves the *mediaset-2* cut of the story. Under pages/ that was a
// rewrite in next.config.ts; the rewrite was dropped with the locale ones in
// #126 and the URL silently started serving a different, shorter cut of the
// story with no customer quote — found by diffing against production (#113).
//
// It is expressed here instead of in a rewrite because a rewrite onto a path
// that also exists as a page never fires, which is exactly how it broke. Which
// cut should be live is a content question, open on #136; until it is answered
// this reproduces what skillvue.ai serves today.
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/i18n/metadata';
import { messagesForRoute, namespaceOf } from '@/i18n/messages';
import JsonLd from '@/i18n/json-ld';
import Body from '../mediaset-2/body';

/** The URL — what the canonical and the hreflang alternates are built from. */
const ROUTE = 'customers/mediaset';
/** The story rendered at it. */
const CONTENT = 'customers/mediaset-2';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations(`${namespaceOf(CONTENT)}.meta`);
  // The canonical stays this URL's own; the title and description belong to the
  // story being shown, which is the pair a search result has to agree on — and
  // openGraph carries the same pair, so it splits the same way. Without this
  // the page's <title> named one cut of the story and its share card named the
  // other.
  const meta = await buildMetadata(ROUTE, locale);
  return {
    ...meta,
    title: t('title'),
    description: t('description'),
    openGraph: { ...meta.openGraph, title: t('title'), description: t('description') },
    twitter: { ...meta.twitter, title: t('title'), description: t('description') },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={await messagesForRoute(CONTENT, locale)}>
      <JsonLd routeId={ROUTE} contentId={CONTENT} locale={locale} />
      <Body />
    </NextIntlClientProvider>
  );
}
