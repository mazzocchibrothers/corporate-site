// Server-side message resolution for the App Router.
//
// A Server Component reads its messages through this config, and the whole
// catalogue is what it gets. That is correct here and dangerous one level up:
// a NextIntlClientProvider rendered without `messages` inherits all of it and
// serializes it into the document. Each page narrows its own — see
// messagesForRoute in i18n/messages.ts, and the note in app/[locale]/layout.tsx.
//
// See harness/docs/architecture.md §3b.

import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is the segment the middleware resolved. It can be absent or
  // unknown (a hand-typed URL, a stale link), and falling back is the correct
  // response — the layout is what turns an unknown locale into a 404.
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`, { with: { type: 'json' } })).default,
  };
});
