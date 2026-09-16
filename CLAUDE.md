# CLAUDE.md

Skillvue's marketing site (skillvue.ai). Content-heavy Next.js **App Router**
app, bilingual EN/IT — almost all work here is adding or editing marketing
pages, not building infrastructure.

## Commands

```bash
npm run dev          # localhost:3000
./harness/init.sh    # every gate, then the build — this is the check
npm run check:build  # the build gate alone: next build, and a warning fails it
npm run test:smoke   # Playwright journeys against a running server (CI runs it after the build)
```

There is no lint and no test framework. The gates are small `node:assert`
scripts in `scripts/`, one per `check:*` entry in `package.json`.
`scripts/gates.mjs` derives the list from those entries, so `init.sh` and CI
(`.github/workflows/ci.yml`) cannot disagree about it. Adding a gate means
adding a `check:*` script — nothing else.

## Stack

Next.js 16 (App Router, `app/`, `proxy.ts`) · React 19 · Tailwind 3 ·
next-intl 4 · TypeScript with `strict: false` but `strictNullChecks: true`.
**No file carries `// @ts-nocheck` any more — don't add one.** Deployed on
Vercel from `main`.

`components/ui/` holds the house primitives — `Button`, `Reveal`, `HeroVideo`,
`IconTile`. Reuse them rather than writing a second version.

## The shape of a page

Every route is a directory under `app/[locale]/`, holding three files:

```
app/[locale]/customers/adr/
  page.tsx              server. The same file on every route, only ROUTE changes.
  body.tsx              the page.
  opengraph-image.tsx   hands the route id to ogFor() in i18n/og-card.tsx.
```

`page.tsx` does the three things only the server can: `generateMetadata` calling
`buildMetadata(routeId, locale)`, a `NextIntlClientProvider` narrowed to the
route's namespaces with `messagesForRoute(ROUTE, locale)`, and
`<JsonLd routeId={ROUTE} locale={locale} />`. **Do not widen that provider.** One
rendered without `messages` inherits the entire catalogue (~600 KB per locale)
and serializes it into every document. The one page.tsx that differs is
`resources/insights/[slug]` — the only dynamic route, with
`generateStaticParams` over `data/whitepapers.ts`.

`body.tsx` is a **server component unless it needs the client** (hooks, event
handlers, browser APIs, framer-motion). The blog articles read copy with
`getTranslations` and ship no JS; interactive pages open with `'use client'`.
`npm run check:client` decides, not taste — `--fix` inserts a missing directive.

`opengraph-image.tsx` and `<JsonLd>` are both per-route by construction and
cannot be inherited from a layout, so `check:routes` fails on a route that
lacks either — without them the page shares as a blank rectangle and tells
Google nothing about itself.

## The route registry — `i18n/routes.json`

One entry per route, and everything derives from it: the URL in each locale, the
Italian slug, the 308 from the old slug, the canonical, the hreflang cluster,
the sitemap. There is no second list to keep in step.

```json
{ "id": "customers/adr", "paths": { "en": "/customers/adr", "it": "/clienti/adr" } }
```

- `id` — stable, independent of either slug. It is also the message namespace
  (`customers.adr`) and the argument to `buildMetadata`.
- `paths` — the URL per locale, **without** the `/it` prefix. A missing locale
  means the route has no content there, and its page 404s in that language
  rather than serving the other one.
- `canonicalOf` — set when the route is an alternate cut of another
  (`customers/eataly-2`). It keeps its URL, canonicalises to the base, and stays
  out of the sitemap.
- `noindex` — set on pages that must not be found by search (the `/demo`
  dashboards, reached only through a link sent to a prospect).

The directory under `app/[locale]` is the **English** path (or the Italian one
where there is no English). next-intl rewrites the other URL onto it.

**Adding a route means adding it here.** `npm run check:routes` fails otherwise,
and it also fails if the page has no title, or if two pages share one.

## Copy — `messages/{en,it}.json`

Zero hardcoded copy, and `npm run check:hardcoded` is what makes that a fact
rather than a claim. Every string is in the catalogue under the route's
namespace, read with `useTranslations` in a client component or
`getTranslations` on the server. The one exception is a name — a company, a
person — listed in `NAMES` in `scripts/check-hardcoded.mjs`. Never a sentence.

- A namespace is a route id, `common` (every page) or `shared.<name>` (the
  pages that ask for it). Keys are camelCase identifiers, never sentences.
  `check:messages` enforces both.
- **Italian apostrophes: curly `’`, never straight `'`.** Before `<` or `{` a
  straight quote is an ICU escape — `l'<b>x</b>` renders the tag as visible text
  with the apostrophe swallowed. `check:messages` fails on it.
- Inline markup goes through `t.rich` with ICU tags (`<b>`, `<span>`), never
  with attributes and never as HTML in the string.
- `en` and `it` must hold the same keys and the same array shapes
  (`check:messages`), and an Italian value may not still be the English one
  (`check:untranslated`).
- A key no page renders any more is dead copy: delete it in the same change
  that stops rendering it.

## Adding content

Every case below also needs `meta.title` and `meta.description` in both locales
if it adds a route.

**A customer story.**
1. `app/[locale]/customers/<slug>/` — copy an existing trio.
   `europ-assistance` is the reference structure: Hero → Context → Challenge →
   Objectives → Solution → Results → Vision → Related.
2. Copy under `customers.<slug>` in both catalogues.
3. The route in `i18n/routes.json` (Italian slug `/clienti/<slug>`).
4. Register it in `components/customers/ExploreStories.tsx` (`allStories`) —
   the filters on `/customers/customer-stories` derive from that array, and a
   story missing from it is a page nothing links to.
5. Assets in `public/logos/`, AVIF for the card background.

**An insight (whitepaper) or a one-pager.** An entry in `data/whitepapers.ts`
or `data/onepagers.ts` — structure only: slug, dates, filters, covers, HubSpot
form GUIDs or PDF path. The copy goes under `resources.insights` keyed on the
slug. Insights are served by the one dynamic route, so there is no new
directory and no registry entry. Covers in `public/covers/`, AVIF.

**A blog article or newsletter.** The route trio under `app/[locale]/blog/`,
the route in the registry, and the card in the `ARTICLES` / `NEWSLETTERS`
arrays in `app/[locale]/blog/body.tsx`, with its card copy under
`blog.articles.<id>`. Covers in `public/covers/`, AVIF.

**A demo dashboard.** Data in `data/demo/`, route marked `noindex`.
`check:demo-anonymity` fails on any personal data — names, store codes,
individual records — so aggregate before it enters the repo.

The sitemap, the hreflang tags, the share card, the structured data and the
language switcher need no edit beyond the steps above.

## Design system

Pages were brought to one standard (#183, #194, #195). Match it; don't
reintroduce per-page variants.

- **H1 hero:** `font-semibold text-[48px] md:text-[64px]`, `lineHeight: 1.05`,
  `letterSpacing: '-0.02em'`.
- **H2 section title:** `font-semibold tracking-[-0.02em]`, max `3rem` (48px)
  reached with a `4vw` slope — `text-[clamp(1.8rem,4vw,3rem)]`. The mobile
  minimum may vary; the max, the slope, the weight and the tracking don't.
- **Accent phrase** in a heading: a `t.rich` `<span className="gradient-text">`,
  `font-semibold` like its heading — the accent differs by colour, never by
  weight.
- **Big metric numbers** use the `.stat-value` class. Its font-weight lives
  only in `styles/globals.css` — change it there, never per-file.
- **Tag pills:** `rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-0.5
  text-[12px] text-[#4B4B4B]` (Insights cards, Customer testimonials).
- **Resources page heroes** (Insights, Press) are a `lg:grid-cols-12` grid: copy
  on the left, a `<HeroVideo>` on the right (webm + mp4 + poster in
  `public/videos/`).
- **Navbar and its dropdowns** are flat `#ffffff` on light sections and
  `#000000` on dark ones — no translucent tints.
- **Dark text on light sections** is `#121212` and its opacity variants. Light
  section background is `.section-breathe` (`#F7F7F7`).
- **Colours:** every hex drawn in `app/`, `components/`, `i18n/` and
  `globals.css` must be in the palette in `scripts/check-colors.mjs`. A new
  colour is added there in the same change that draws it — and never to silence
  a false positive.
- When a redesign changes one of these on one page, it is either a new
  standard — apply it to its sibling pages and update this section — or it is
  drift.

## Navigation

`router.push` comes from `@/i18n/navigation`, **not** `next/navigation`. It
applies `localizePath`, which is what turns `/book-meeting` into
`/it/prenota-incontro` for an Italian visitor. `check:navigation` guards it.

For a raw `<a href>`, use `href(id, locale)` from `@/i18n/routes`.

## Conventions

- **Fonts:** Mona Sans, self-hosted via `@font-face` in `styles/globals.css`.
  `tailwind.config.ts` still says `Inter` in `fontFamily` — it is stale and
  overridden by the `body` rule; don't "fix" it by adding Inter.
- **`./app/**` is in the Tailwind content globs and must stay.** Without it a
  page compiles and silently loses every utility it uses.
- **Scroll animations are `<Reveal>`, not framer-motion.** The site has one
  animation — fade in, rise, once, on scroll into view — and
  `components/ui/reveal.tsx` is it: an IntersectionObserver and a CSS
  transition. framer-motion costs ~38 KB gz on a page that loads it, so reach
  for it only when the thing is genuinely state-driven (an exit animation, a
  carousel, an animated value). A handful of files still do, correctly.
- **Don't wrap a masked, animated element (the logo marquee) in `<Reveal>`.**
  Mobile Safari stops repainting it when an ancestor's transform toggles.
- **Images:** AVIF for photos, `loading="lazy" decoding="async"` below the fold,
  `fetchPriority="high"` on the LCP image (`check:images`). Kebab-case
  filenames, no spaces.
- **Logic a gate can test lives in a `.ts` module** the gate imports
  (`components/customers/talent-pioneers-carousel.ts` and
  `check:talent-pioneers-carousel`), not buried in a component.
- **CSS delivery** is decided and measured: one external sheet, no `inlineCss`.
  See `harness/docs/conventions.md`.
- **`assets/` is build input, not `public/`.** The two Mona Sans ttf weights
  live there because satori cannot read the woff2 the site serves. Conversely
  `public/robots.txt` and `public/site.webmanifest` are requested by name and
  referenced by no source file — `check:assets` asserts them explicitly, and
  also fails on an asset a page asks for that is not in `public/`.
- HubSpot forms are embedded by portal ID + form GUID: `book-meeting`,
  `app/[locale]/lp/*`, the insight pages (GUIDs in `data/whitepapers.ts`) and
  `components/customers/TalentPioneersContactForm.tsx`. GTM is in
  `app/[locale]/layout.tsx`; demo pages push a `demo_view` event
  (`check:demo-event`).
- Every page renders `Navbar` + `Footer` itself; the layout is the shell only.
- A component nothing imports, or imports but never renders, fails
  `check:dead`. Delete it or wire it up.

## Agent harness

Structured multi-agent work runs through `harness/`. Start at
`harness/AGENTS.md` (the map), gate with `./harness/init.sh`, and grade against
`harness/CHECKPOINTS.md`. Backlog is GitHub Issues, label `harness`. The three
subagents are `.claude/agents/site-{leader,implementer,reviewer}.md`.

Not every change needs it — a copy fix or a single-page redesign doesn't. Reach
for it when work spans several pages, several agents, or touches routing, i18n
or the gates.

The App Router migration is finished: there is no `app-router` branch and no
`pages/` directory. The base for every branch is `main`.

## Git

One branch per change, PR into `main` (Vercel auto-deploys; CI runs the gates,
the build and the smoke test). Commit and push only when asked.

**No AI attribution, anywhere.** No `Co-Authored-By: Claude`, no session URL, no
"Generated with Claude Code" — not in a commit message, not in a PR body, not in
a code comment. A commit ends with its last real paragraph. It was missed for
43 commits on one branch, and again in #194; `harness/CHECKPOINTS.md` C6 says it
too.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
