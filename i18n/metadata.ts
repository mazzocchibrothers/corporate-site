// generateMetadata for App Router pages: title, description, canonical and
// hreflang alternates, all derived from the route registry and the message
// catalogue.
//
// What this replaces, per page: a <Head> block, a `locale === 'it' ? … : …`
// ternary for each of title and description, and a hand-written canonical.
// There were 49 of those ternaries across the site, and the canonical was
// wrong wherever a page had been copied from another one.
//
// The alternates come from i18n/urls.ts, which scripts/check-routes.mjs runs
// directly — so what the pages emit and what the check asserts are the same
// function, not two implementations of the same rule.

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routes } from './routes';
import { namespaceOf } from './messages';
import { alternatesFor, urlFor, type Locale } from './urls';

const LOCALES: Locale[] = ['en', 'it'];

/**
 * `locale` is typed as string because that is what it is: a URL segment, from
 * the visitor. Every page would otherwise cast it, 61 times, and a cast is
 * exactly what stops being true the day someone adds a third locale.
 */
export async function buildMetadata(routeId: string, locale: string): Promise<Metadata> {
  if (!LOCALES.includes(locale as Locale)) {
    throw new Error(`buildMetadata: '${locale}' is not a locale. Expected one of ${LOCALES.join(', ')}.`);
  }
  const route = routes.find((r) => r.id === routeId);
  if (!route) {
    throw new Error(
      `buildMetadata: no route '${routeId}' in i18n/routes.json. ` +
        'The id is the route id, not the URL — see the registry.',
    );
  }

  const canonical = urlFor(route, locale as Locale);
  if (!canonical) {
    // The page rendered in a locale its own registry entry says it does not
    // serve. That is a routing bug upstream, and emitting a canonical pointing
    // at the other language would bury it.
    throw new Error(
      `buildMetadata: route '${routeId}' has no ${locale} path, but a ${locale} page rendered. ` +
        'Either add the path to i18n/routes.json or stop serving the route in that locale (#116).',
    );
  }

  const t = await getTranslations(`${namespaceOf(routeId)}.meta`);

  // 16 routes have no meta in the catalogue because they have no <title> on the
  // site today either — the blog posts, the whitepaper pages, /privacy-policy
  // and /resources/press ship a document with no title at all (#138). Without
  // this guard next-intl would fill the gap with the key path itself, and
  // 'blog.accountability.meta.title' in a search result is worse than the blank
  // it replaces.
  return {
    ...(t.has('title') ? { title: t('title') } : {}),
    ...(t.has('description') ? { description: t('description') } : {}),
    alternates: { canonical, languages: alternatesFor(route) },
  };
}
