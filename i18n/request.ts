// Server-side message resolution for the App Router.
//
// The per-page namespace loading from #97 does not carry over: in the App
// Router a Server Component reads messages through this config, not through
// getStaticProps. The payload constraint it existed to solve is handled
// differently here — a Server Component renders its strings on the server, so
// only what a `'use client'` boundary actually needs crosses to the browser.
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
