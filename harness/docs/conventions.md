# Conventions

> Extreme homogeneity. An AI predicts better when the repository looks like
> itself everywhere.

## TypeScript

- The repo runs `strict: false` / `noImplicitAny: false` with
  `strictNullChecks: true`. **Write code that would pass under strict anyway.**
- No file carries `// @ts-nocheck` any more. Don't add one — fix the error.
- Path alias is `@/*` → repo root. Use it: `@/components/landing/Navbar`, never
  a `../../..` chain.

## Naming and layout

| Thing | Convention | Example |
|---|---|---|
| Routes | one `kebab-case` directory, `page.tsx` + `body.tsx` | `app/[locale]/customers/europ-assistance/` |
| Components | `PascalCase.tsx`, grouped by area | `components/customers/ExploreStories.tsx` |
| Component dirs | the site area they serve | `landing/`, `product/`, `science/`, `solutions/`, `customers/`, `shared/` |
| House primitives | `kebab-case`, reused not re-implemented | `components/ui/reveal.tsx`, `hero-video.tsx` |
| Public assets | `kebab-case`, AVIF for photos | `public/logos/adr-explore-stories.avif` |
| Functions / vars | `camelCase` | `localizePath`, `activeUseCase` |

No spaces in new asset filenames. Two shipped assets have them
(`mediaset-background-explore-stories (2).avif`); don't add a third.

## Page shape

Three files per route — `page.tsx`, `body.tsx`, `opengraph-image.tsx`. Nothing
else is a page.

```tsx
// app/[locale]/customers/adr/page.tsx — server. The same on every route.
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
```

```tsx
// app/[locale]/customers/adr/body.tsx — the page. 'use client' only because
// it uses hooks; a page that only reads copy is a server component and calls
// getTranslations instead (check:client decides).
'use client';

export default function AdrStory() {
  const lang = useLocale();
  const t = useTranslations('customers.adr');
  return (
    <>
      <Navbar />
      {/* sections, every string through t() */}
      <Footer />
    </>
  );
}
```

No copy in either file — `check:hardcoded` fails on a readable string in the
code, and the only exception is a name (a company, a person), listed in that
script.

No copy in either file. No `<Head>` — `generateMetadata` emits the title, the
description and the canonical, and a bare `<link rel="preload">` rendered in the
body is hoisted into `<head>` by React 19 if a page needs one of its own.

Structure the catalogue cannot hold — an icon per row, a component per card —
stays in the file as a small array of ids:

```tsx
const LEVERS = [
  { id: 'n01', icon: Settings },
  { id: 'n02', icon: MessageSquare },
];
…
{LEVERS.map((l) => <Row key={l.id} icon={l.icon} title={t(`levers.${l.id}.title`)} />)}
```

## Copy and translation

All copy lives in `messages/en.json` and `messages/it.json`. A page reads it
through next-intl; no string a visitor can read belongs in a `.tsx` file.

**Namespace = route id.** The id comes from `i18n/routes.json`, with `/` becoming
`.`: `customers/adr` → `customers.adr`. Two adjustments, both in
`i18n/messages.ts` → `namespaceOf`: the homepage is `home`, not `index`, and a
dynamic segment drops its brackets, because `[slug]` is not a legal ICU key path.

Only three kinds of top-level namespace exist, and `check:messages` rejects a
fourth:

| Namespace | Loaded by | For |
|---|---|---|
| a route id | that one page | everything that page says |
| `common` | every page | navbar, footer, the strings on all 61 pages |
| `shared.<name>` | the pages that ask for it | copy several pages share but not all |

`common` is the expensive one — it ships with every page in both directions of
the migration. Copy that five solution pages share goes in `shared.solutions`,
which those five pull in explicitly.

**Keys are identifiers, never sentences.**

```jsonc
// no
"Verify skills, predict performance": "Verify skills, predict performance"
// yes
"hero": { "title": "Verify skills, predict performance" }
```

English-as-key is what this migration exists to undo. It makes the Italian
unfindable, welds every key to one phrasing, and turns a copy edit into a rename
across every file that renders it. `check:messages` fails on any key segment
that is not `camelCase` (or the kebab already in a route id).

**One key per full sentence. Never a fragment.**

```jsonc
// no — "trusted by" + "teams" cannot be reassembled into Italian
"trustedBy": "Trusted by", "teams": "teams"
// yes
"trustedBy": "Trusted by {count} teams"
```

Italian moves the verb, agrees the adjective, and puts the number somewhere
else. A sentence split into fragments is a sentence that can only ever be
English with Italian words in it.

**Markup belongs to the component, not the message.** Rich text uses an ICU tag
resolved by `t.rich()`:

```jsonc
"consent": "By continuing you accept our <terms>terms of service</terms>."
```

```tsx
t.rich('consent', { terms: (chunks) => <Link href="/terms">{chunks}</Link> })
```

The tag name is yours; the message never carries a class, an href, or a `<span>`.
`check:messages` rejects any tag with an attribute — that is exactly what
separates an ICU tag from HTML.

**Both locales carry identical key sets**, and a key may not be an empty string.
Both are checked. An empty string renders as nothing and reads, in a diff, like a
finished translation.

**Reading messages:** `useTranslations` in a Client Component, `getTranslations`
in a Server Component. A Server Component renders its strings on the server, so
only what crosses a `'use client'` boundary is paid for in the bundle — which is
why the boundaries in `check:client` are drawn where they are.

## Sections and animation

The site has one scroll animation — fade in, rise, once — and it is
`<Reveal>` from `components/ui/reveal.tsx`: an IntersectionObserver and a CSS
transition, usable from a server component. Don't declare a local `Section`
wrapper and don't reach for framer-motion to reveal something; it costs ~38 KB
gz on the page that loads it. framer-motion stays only where the motion is
genuinely state-driven (an exit animation, a carousel, an animated value).

Don't wrap a masked, animated element (the logo marquee) in `<Reveal>`: mobile
Safari stops repainting it when an ancestor's transform toggles.

What a heading, a metric, a pill or a hero looks like is the **Design system**
section of `CLAUDE.md`. Match it rather than the page you happened to copy.

## Styling

- Tailwind utility classes inline. `styles/globals.css` holds only what
  utilities can't express: `@font-face`, the animated background layers, the
  grain overlay, and the centralized `.stat-value`.
- Brand gradient, when you need it literally:
  `linear-gradient(135deg, #FFAF64 0%, #FF5656 62%, #4B4DF7 128%)`.
- `cn()` from `@/lib/utils` for conditional classes.
- Dark text on light sections is `text-[#121212]` and its opacity variants —
  match the surrounding page rather than introducing a new neutral.

## Adding a customer story (the full checklist)

1. `app/[locale]/customers/<slug>/` — copy an existing `page.tsx` + `body.tsx`
   pair and change the route id.
2. Copy into `messages/en.json` and `messages/it.json` under
   `customers.<slug>`, including `meta.title` and `meta.description`. The title
   must not be one another page already uses — `check:routes` fails on that,
   and it is how six alternate cuts were found competing with the stories they
   are cuts of.
3. Add the route to `i18n/routes.json`. The Italian slug is `/clienti/<slug>`.
4. Register in `components/customers/ExploreStories.tsx` → `allStories`:
   `id`, `company`, `industry`, `useCases[]`, `bgImage` — the headline is copy
   and lives in the catalogue. The filters on `/customers/customer-stories`
   derive from this array; there is no second list. A story missing from it is
   a page nothing links to.
5. Assets in `public/logos/`, AVIF for the card background.

The sitemap, the hreflang cluster, the canonical, the 308 from the old slug and
the language switcher all derive from step 3. There is nothing else to edit.

An alternate cut of an existing story (`mediaset-2`, `adr-2`, `eataly-3`)
declares `"canonicalOf": "customers/mediaset"` in the registry. It keeps its
URL, points its canonical and hreflang at the base story, and stays out of the
sitemap — otherwise it competes in search with the page it is a cut of.

## Comments

- Explain **why**, never what. The codebase's existing comments are the model:
  `i18n/navigation.ts` explains why the locale guard is in one module and not
  at 98 call sites; `app/[locale]/layout.tsx` explains why GTM is
  `afterInteractive` and not `lazyOnload`, and why there is no message provider
  at that level.
- A deliberate shortcut gets `// ponytail:` and names the upgrade path.
- No commented-out code without a line saying when it comes back.
  `ExploreStories.tsx` does this correctly for the Credem story.
- No AI attribution in comments or commit messages.

## Git

- One Issue → one branch off `origin/main` → one PR into `main`. See
  `harness/AGENTS.md` §2b.
- Conventional, scoped commit subjects in the imperative:
  `Add August newsletter (EN/IT) and supermarkets one-pager LP`.
- PR body says `Closes #<n>` when there is an Issue.
- No AI attribution in commits, PR bodies or comments.

## CSS delivery

One stylesheet, external, cached. No `experimental.inlineCss`, no critical-CSS
extraction step. **Decided on measurement (#135), not on default.**

The site compiles to a single sheet: 105.5 KB raw, 18.7 KB gzipped, 1,562
utility rules across 61 pages — for markup this dense that is what the pages
use, not bloat, so there is nothing to trim first. Next puts a `<link>` for it
in `<head>`, where the preload scanner finds it immediately, and
`/_next/static` already carries an immutable cache header, so it is fetched
once per visitor and never again.

`experimental.inlineCss: true` is the App Router replacement for the
`optimizeCss` that the Pages Router used, and it is the wrong trade here.
Measured on two real pages, same build:

| | `/about` | `/it/clienti/adr` |
|---|---|---|
| external sheet (this) | 13.1 KB gzip | 17.2 KB gzip |
| `inlineCss: true` | 51.2 KB gzip | 55.7 KB gzip |

It costs **+38 KB gzipped on every page view, uncacheable**, to save one
request for an 18.7 KB sheet that is cached for the rest of the visit and the
next one. Marketing traffic lands, reads, and moves on: paying 38 KB per view
to save one cached fetch per visitor is backwards.

What was actually lost with `optimizeCss` is the deferred load — the sheet is
render-blocking again. That is one round trip on the connection that already
delivered the HTML. Revisit only with a real LCP measurement saying it matters.

**Do not add `./app/**` to the Tailwind content globs as an afterthought.** It
is there because a page moved to `app/[locale]` without it keeps compiling and
loses every utility it uses. Nothing warns; the page just renders unstyled.

