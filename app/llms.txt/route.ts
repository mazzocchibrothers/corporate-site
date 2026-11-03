// /llms.txt — the site described for a language model (llmstxt.org).
//
// It used to answer 500. The proxy skips any path with a file extension, so
// /llms.txt reached app/[locale] with "llms.txt" as the locale, and the root
// layout's notFound() has no boundary above it to land in.
//
// Like app/sitemap.ts, nothing here is a list. The pages come from
// i18n/routes.json, their titles and summaries from the English catalogue —
// the same meta.title and meta.description the <title> and the search snippet
// use — so a page added to the registry appears here, and a description
// rewritten for search is rewritten here too.

import { routes, type Route } from '@/i18n/routes';
import { urlFor } from '@/i18n/urls';
import { namespaceOf } from '@/i18n/messages';
import { whitepapers } from '@/data/whitepapers';
import en from '@/messages/en.json';

export const dynamic = 'force-static';

type Meta = { title: string; description: string };

function metaOf(namespace: string): Meta | undefined {
  let node: unknown = en;
  for (const key of namespace.split('.')) node = (node as Record<string, unknown>)?.[key];
  return (node as { meta?: Meta })?.meta;
}

/** "Carrefour: how to … | Skillvue" -> "Carrefour: how to …" */
const clean = (title: string) => title.replace(/\s*[|\-–—]\s*Skillvue\s*$/, '');

// The order a reader needs them in: what it is, what it does, who uses it,
// what it has published, then the company. The headings are for the model
// reading the file, which is English-only, as llms.txt is.
//
// The sections only order the file; they do not decide what is in it.
// `Optional` (the llmstxt.org name for "skippable") takes every indexable route
// no section above claims — the privacy notices today, and any new top-level
// page until it is given a section — so a page added to the registry cannot
// silently go missing from here.
const SECTIONS: Array<{ heading: string; prefix: string[] | 'rest' }> = [
  { heading: 'Product', prefix: ['product', 'science'] },
  { heading: 'Solutions', prefix: ['solutions/'] },
  { heading: 'Customer stories', prefix: ['customers', 'customers/'] },
  { heading: 'Research and insights', prefix: ['resources/insights', 'roi-calculator'] },
  { heading: 'Articles and newsletters', prefix: ['blog'] },
  { heading: 'Company', prefix: ['about', 'careers', 'resources/press', 'become-a-partner', 'book-meeting'] },
  { heading: 'Optional', prefix: 'rest' },
];

const matches = (route: Route, prefix: string[] | 'rest') =>
  // The homepage is the file's header, not a line in it.
  prefix === 'rest'
    ? route.id !== 'index'
    : prefix.some((p) => route.id === p || route.id.startsWith(p.endsWith('/') ? p : `${p}/`));

function linesFor(route: Route): string[] {
  // Indexable, English, and the URL itself rather than a cut of another one —
  // the same three rules the sitemap applies.
  if (route.noindex || route.canonicalOf !== undefined) return [];
  if (route.paths.en === undefined) return [];

  if (route.id === 'resources/insights/[slug]') {
    return whitepapers
      .filter((w) => w.published && w.languageAvailability.includes('en'))
      .flatMap((w) => {
        const meta = metaOf(`resources.insights.items.${w.slug}`);
        const url = urlFor(route, 'en')?.replace('[slug]', w.slug);
        return meta && url ? [`- [${clean(meta.title)}](${url}): ${meta.description}`] : [];
      });
  }

  const meta = metaOf(namespaceOf(route.id));
  const url = urlFor(route, 'en');
  return meta && url ? [`- [${clean(meta.title)}](${url}): ${meta.description}`] : [];
}

export function GET() {
  const home = metaOf('home')!;
  const product = metaOf('product')!;

  const out: string[] = [
    `# ${clean(home.title).replace(/^Skillvue\s*\|\s*/, 'Skillvue: ')}`,
    '',
    `> ${home.description}`,
    '',
    product.description,
    '',
  ];

  const placed = new Set<string>();
  for (const section of SECTIONS) {
    const lines = routes
      .filter((r) => !placed.has(r.id) && matches(r, section.prefix))
      .flatMap((r) => {
        placed.add(r.id);
        return linesFor(r);
      });
    if (lines.length === 0) continue;
    out.push(`## ${section.heading}`, '', ...lines, '');
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
