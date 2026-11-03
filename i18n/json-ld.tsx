// The structured data, derived from the registry and the catalogue.
//
// The site had none. Google could read the pages but not what they *are*: no
// Organization to attach the brand to, no article marked as an article, no
// breadcrumb trail on a URL three levels deep.
//
// Nothing here is written twice. The headline is meta.title, the same string
// the <title> and the share card use; the image is the card; the URLs come from
// i18n/urls.ts like the canonical and the sitemap. A page whose title changes
// changes here with it.

import { getTranslations } from 'next-intl/server';
import { BASE_URL, ogImageUrl, urlFor, type Locale } from './urls';
import { canonicalRoute, routes, type Route } from './routes';
import { namespaceOf } from './messages';
import { isoDate } from './dates';

/** The brand, named once so every article can point at it instead of repeating it. */
const ORG_ID = `${BASE_URL}/#organization`;

const LANG: Record<Locale, string> = { en: 'en-US', it: 'it-IT' };

/** meta.title is written for the search result. A breadcrumb wants the name. */
function shortName(title: string) {
  const clean = title.replace(/\s*[|\-–—]\s*Skillvue\s*$/, '');
  const head = clean.split(':')[0];
  return head.length < 40 && head.length < clean.length ? head : clean;
}


/**
 * Home, then every ancestor that is a real route, then the page.
 *
 * `/customers/adr` gets Home > Customers > Aeroporti di Roma because
 * `/customers` is in the registry. `/lp/food-retail` gets no trail, because
 * `/lp` is not a page — a breadcrumb naming a URL that 404s is worse than none.
 */
async function breadcrumbs(route: Route, locale: Locale, slug?: string) {
  const path = route.paths[locale]!;
  if (path === '/') return undefined;

  const segments = path.split('/').filter(Boolean);
  const trail: Route[] = [];
  for (let i = 1; i < segments.length; i++) {
    const prefix = '/' + segments.slice(0, i).join('/');
    const ancestor = routes.find((r) => r.paths[locale] === prefix);
    if (ancestor) trail.push(ancestor);
  }

  const home = routes.find((r) => r.id === 'index');
  if (!home) return undefined;
  const items: Array<{ '@type': string; position: number; name: string; item: string }> = [];
  let position = 1;
  for (const r of [home, ...trail, route]) {
    // The dynamic route's last crumb is one insight, not the registry entry:
    // its URL has the slug filled in and its name is that insight's title.
    // Without this every insight ended its trail on a literal
    // /resources/insights/[slug], named after the index.
    const leaf = r === route && slug !== undefined;
    const t = await getTranslations({
      locale,
      namespace: leaf ? `${namespaceOf(r.id)}.items.${slug}.meta` : `${namespaceOf(r.id)}.meta`,
    });
    const url = urlFor(canonicalRoute(r), locale) ?? urlFor(r, locale);
    if (!url) continue;
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: r.id === 'index' ? 'Skillvue' : shortName(t('title')),
      item: leaf ? url.replace('[slug]', slug) : url,
    });
  }
  return { '@type': 'BreadcrumbList', itemListElement: items };
}

/**
 * `contentId` is for the one URL that shows another route's story:
 * /customers/mediaset renders the mediaset-2 cut. The URL, the breadcrumb and
 * the canonical are the route's; the headline is the story's, which is the
 * same split generateMetadata makes there for the <title>.
 */
export default async function JsonLd({
  routeId,
  contentId,
  slug,
  locale,
}: {
  routeId: string;
  contentId?: string;
  /** The dynamic route's segment — `resources/insights/[slug]` only. */
  slug?: string;
  locale: string;
}) {
  const loc = locale as Locale;
  const route = routes.find((r) => r.id === routeId);
  if (!route || route.paths[loc] === undefined) return null;

  const t = await getTranslations({ locale, namespace: `${namespaceOf(contentId ?? routeId)}.meta` });
  const url = urlFor(canonicalRoute(route), loc) ?? urlFor(route, loc);
  const image = ogImageUrl(routes, route, loc);
  const graph: object[] = [];

  // The brand, on every page rather than only the homepage. A page's JSON-LD
  // is read on its own, so an @id defined somewhere else is a reference that
  // resolves to nothing — the node has to be in the graph that names it.
  graph.push({
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Skillvue',
    url: BASE_URL,
    logo: `${BASE_URL}/web-app-manifest-512x512.png`,
    sameAs: ['https://www.linkedin.com/company/skillvue/'],
  });

  if (routeId === 'index') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Skillvue',
      description: t('description'),
      publisher: { '@id': ORG_ID },
      inLanguage: LANG[loc],
    });
  }

  // A blog post is a BlogPosting and a customer story is an Article. Both are
  // written pieces with a headline and a publisher; only the blog has a date,
  // because only the blog has one to give.
  const section = routeId.split('/')[0];
  if (section === 'blog' && routeId !== 'blog') {
    const slug = routeId.slice('blog/'.length);
    const dates = await getTranslations({ locale: 'en', namespace: 'blog.articles' });
    const published = dates.has(`${slug}.date`) ? isoDate(dates(`${slug}.date`)) : undefined;
    graph.push({
      '@type': 'BlogPosting',
      headline: shortName(t('title')),
      description: t('description'),
      ...(published ? { datePublished: published } : {}),
      image,
      inLanguage: LANG[loc],
      mainEntityOfPage: url,
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
    });
  } else if (section === 'customers' && routeId !== 'customers') {
    graph.push({
      '@type': 'Article',
      headline: shortName(t('title')),
      description: t('description'),
      image,
      inLanguage: LANG[loc],
      mainEntityOfPage: url,
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
    });
  }

  // A page with a FAQ in its catalogue (`faq.items`, each `{q, a}`) says so,
  // in the same words the page renders: the answers are what search engines
  // and LLMs quote back.
  const page = await getTranslations({ locale, namespace: namespaceOf(contentId ?? routeId) });
  if (page.has('faq.items')) {
    const items = page.raw('faq.items') as { q: string; a: string }[];
    graph.push({
      '@type': 'FAQPage',
      inLanguage: LANG[loc],
      mainEntity: items.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }

  const crumbs = await breadcrumbs(route, loc, slug);
  if (crumbs) graph.push(crumbs);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
