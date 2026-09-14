# Architecture — What "good work" means in corporate-site

> This document defines the quality bar. Reviewer agents grade code against it.
> If it isn't here, it isn't a requirement.

## What this product is

The public marketing site for **skillvue.ai**: a single Next.js **App Router**
app, bilingual EN/IT, deployed on Vercel from `main`. No backend, no database,
no auth. Forms are embedded HubSpot; analytics is GTM in the root layout.

Content is the product. 66 routes: the homepage, 5 solution pages, 18 customer
stories and their listing, 15 landing pages, 11 blog posts and newsletters,
Insights and Press, 4 `noindex` demo dashboards, plus
about/careers/science/legal. A
change here is almost always **a page**, and the risk is almost always
**localization or routing**, not application logic.

## Principles

1. **One route is one directory under `app/[locale]`, holding three files.**

   ```
   app/[locale]/customers/adr/
     page.tsx              server. The same file on every route.
     body.tsx              the page. Server by default.
     opengraph-image.tsx   the share card, from i18n/og-card.tsx.
   ```

   `page.tsx` does what only the server can: `generateMetadata` calling
   `buildMetadata(routeId, locale)`, and a `NextIntlClientProvider` narrowed to
   the route's namespaces, and `<JsonLd>`. `body.tsx` stays a Server Component unless it
   directly needs browser state or an event handler; motion and other
   interactivity belong in their smallest client component.

   **Never widen that provider.** One rendered without `messages` inherits the
   whole catalogue from `i18n/request.ts` and serializes it into the document —
   measured before the fix, a ten-line page prerendered to 310 KB, of which
   251 KB was copy nothing on screen used.

   The directory name is the **English** path, or the Italian one where the
   route has no English. next-intl rewrites the other URL onto it. Two
   directories for one route is two pages that will drift apart, and
   `check:routes` refuses it.

2. **Every page renders its own `Navbar` and `Footer`.**
   There is no shared layout component and no `getLayout` pattern. Follow the
   existing shape rather than introducing one for a single page.

3. **All copy is in `messages/{en,it}.json`. There is no other place.**

   ```tsx
   const t = useTranslations('customers.adr');      // client
   const t = await getTranslations('customers.adr'); // server
   ```

   The namespace is the route's `id` in `routes.json` with `/` becoming `.` —
   `index` → `home`, `[slug]` loses its brackets. `namespaceOf()` does the
   mapping, so a page cannot key off a namespace no route claims.

   The three patterns that used to coexist are gone: the `i18n/translations.ts`
   dictionary (925 entries, deleted in #110), the per-page
   `const content = { it, en }` objects, and 417 bare
   `lang === 'it' ? … : …` ternaries. Three codemods moved them, and
   `check:i18n` fails on a call site whose key is not in both catalogues.

   - `en` and `it` must hold the same keys **and the same array shapes**. A
     story whose Italian list is one item short renders one card fewer, in one
     language, and nothing else would say so.
   - Inline markup goes through `t.rich` with ICU tags, not into the string as
     HTML.
   - **A missing key throws in dev and degrades in production.** Whoever
     introduced the gap sees it on the page they are looking at; production logs
     and falls back, because one absent string is not a reason to take the site
     down.
   - The JSON import carries `with { type: 'json' }`. Turbopack does not need
     it; bare Node does, and that is what lets the gate scripts exercise the
     real loading path instead of only the pure helpers.

4. **Italian apostrophes are `’`, never `'`.**
   Two reasons, and the second is the one that does not announce itself. In JS
   source a straight apostrophe inside a single-quoted string breaks the parser
   — loud, and the most frequent build breakage this repo has had. In a
   catalogue value it is worse: before `<` or `{` ICU reads it as an **escape**,
   so `l'<b>espansione</b>` renders the tag as visible text with the apostrophe
   swallowed, on one page, in one language, with a green build.
   `check:messages` fails on it now.

5. **Routing is one file: `i18n/routes.json`. Everything derives from it.**

   ```json
   { "id": "customers/adr", "paths": { "en": "/customers/adr", "it": "/clienti/adr" } }
   ```

   It used to be four hand-kept lists — the `next.config.ts` rewrites,
   `i18n/localePaths.ts`, `pages/sitemap.xml.tsx`, and the `hrefIt`/`hideInIT`
   flags in the navbar and footer. Nothing failed the build when they drifted,
   which is how the language switcher shipped a 404 (commit `67f53be`). All
   four are gone. From this one entry come: the URL in each locale, the
   next-intl `pathnames` map, the 308 from the old slug, the canonical, the
   hreflang cluster, the sitemap, and every nav link through `href(id, locale)`.

   `npm run check:routes` asserts the registry against the tree: every route has
   exactly one directory, every directory is a route, every page emits its own
   metadata, every route has a unique title in both locales it serves, and every
   hreflang alternate points at a URL some route actually serves.

   `canonicalOf` marks an alternate cut of another page — it keeps its URL,
   canonicalises to the base and stays out of the sitemap, rather than competing
   with the page it supports.

6. **Monolingual pages must not claim to be bilingual.**
   A locale missing from a route's `paths` means the route has no content in
   that language, and its page **404s** there rather than serving the other one
   under a URL that claims, through hreflang, to be a translation. Eleven routes
   are single-locale: ten Italian-only landing pages and one English-only.
   They used to render in both and declare an alternate they could not serve
   (#116). If your Issue adds a monolingual page, give it one locale in the
   registry — do not give it two and hope.

7. **`components/ui/` holds the house primitives. Reuse them.**
   `Button`, `Reveal`, `HeroVideo`, `IconTile` — the unused shadcn files were
   deleted. A page that re-implements a reveal, a hero video or a button is the
   second copy that drifts. Need a variant? Add a prop to the primitive, in its
   own change.

8. **Centralized visual values stay centralized.**
   `.stat-value` in `styles/globals.css` is the single source of truth for the
   big metric callouts across ~25 files. Its weight was once hard-coded per file
   during a layout pass and drifted across the whole site (PR #80). Change the
   rule, never the call sites. The same applies to the Mona Sans `@font-face`
   block: `tailwind.config.ts` still names `Inter` and is overridden — do not
   "fix" it by loading Inter.

9. **No new dependency for what a few lines do.**
   `package.json` already carries framer-motion, lottie, class-variance-authority
   and the Radix Slot primitive. Reach for what's installed.
   A new dependency needs a line on the Issue saying what it replaces.

10. **Deliberate shortcuts are marked.**
    A `// ponytail:` comment naming the ceiling and the upgrade path. A shortcut
    nobody wrote down reads as ignorance to the next person.

## Images

- LCP candidates use native `<img>` with intrinsic dimensions, `loading="eager"`,
  `fetchPriority="high"`, and `decoding="async"`.
- Below-the-fold photography is `loading="lazy" decoding="async"` inside an
  aspect-ratio container. Content photos are local AVIF in `public/covers/` or
  `public/logos/`, not hotlinked from an image host.
- SVG logos and decorative blurred backgrounds remain native images: they are
  small or non-content, so an optimizer wrapper adds no value.

`check:images` protects the representative LCP and content-card rules.

## What has guardrails now, and what still does not

The gates are `typecheck` plus every `check:*` script in `package.json`, run by
`./harness/init.sh` and by CI on every PR; CI then runs the Playwright smoke
test against the production build. `scripts/gates.mjs` derives the list, so the
runner and the workflow cannot disagree about what runs. What each gate guards
is the table in `docs/verification.md`.

Between them they cover what used to be uncovered: a route missing from the
sitemap, a slug that 404s the switcher, an hreflang pointing at a page that does
not exist, a key present in one locale only, an array one item short in Italian,
an ICU escape eating a tag, a component nothing imports, a page with no title or
one another page already uses, a hex outside the palette, copy left in the JSX,
an Italian value that is still English, personal data in a demo dataset.

What they still do not cover:

- **TypeScript is loose.** `strict: false` and `noImplicitAny: false`, with
  `strictNullChecks` on and no `// @ts-nocheck` left anywhere. It catches broken
  imports and null errors, not an untyped prop passed wrong.
- **No lint, and no test runner.** The gates are `node:assert` scripts; there is
  no framework and none should be installed for one assertion.
- **Nothing reads the page.** No gate can tell you the Italian copy is wrong,
  only that it exists — nor that a redesigned page no longer looks like its
  siblings (`CHECKPOINTS.md` C7). That is why the reviewer walks `CHECKPOINTS.md` by hand
  and why a route change ends with a bilingual smoke test recorded on the Issue
  (`docs/verification.md`).
