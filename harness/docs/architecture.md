# Architecture — What "good work" means in corporate-site

> This document defines the quality bar. Reviewer agents grade code against it.
> If it isn't here, it isn't a requirement.

## What this product is

The public marketing site for **skillvue.ai**: a single Next.js **Pages Router**
app, bilingual EN/IT, deployed on Vercel from `main`. No backend, no database,
no auth. Forms are embedded HubSpot; analytics is GTM in `_app.tsx`.

Content is the product. ~62 routes: the homepage, 5 solution pages, ~10 customer
stories, ~15 landing pages, ~11 blog posts, plus about/careers/press/legal. A
change here is almost always **a page**, and the risk is almost always
**localization or routing**, not application logic.

## Principles

1. **Pages Router. Stay there.**
   `pages/` with file-based routing, `_app.tsx` as the only shell (background
   layers, GTM, hreflang, `LanguageProvider`). Do not introduce `app/`, Server
   Components, or a route-group migration without an Issue that documents a
   concrete reason. React 19 and Next 16 are installed; that is not permission
   to migrate.

2. **Every page renders its own `Navbar` and `Footer`.**
   There is no shared layout component and no `getLayout` pattern. Follow the
   existing shape rather than introducing one for a single page.

3. **The i18n target pattern is the content object.**
   ```tsx
   const content = { it: { … }, en: { … } };
   const c = lang === 'it' ? content.it : content.en;
   ```
   Three patterns exist in the repo today — this one, the `t()` dictionary in
   `i18n/translations.ts`, and bare `lang === 'it' ? … : …` ternaries. Only the
   first is the target.

   - **New pages use the content object.** Always.
   - **Never add a key to `i18n/translations.ts`.** The dictionary uses the
     English string as its key, so editing English copy silently drops the
     Italian; it also holds 13 duplicate keys with conflicting values, where the
     last one silently wins. It is frozen: edit existing values, add nothing.
   - **Never add a bare `lang === 'it' ? … : …` ternary** outside a content
     object. There are 417 of them; that number goes down, not up.

3b. **How messages reach a page (next-intl, Pages Router).**
   Decided in #97; this is the contract every migrated page follows.

   ```tsx
   export const getStaticProps = messagesFor('customers/adr');  // the route id
   const t = useTranslations('customers.adr');
   ```

   - **Per-page namespaces, never the whole catalogue.** `_app.tsx` mounts
     `NextIntlClientProvider` but imports no messages of its own. Each page
     loads only what it renders, through `getStaticProps`. This is the whole
     reason the loader exists: the finished catalogue is ~19k words per locale,
     and importing it in `_app.tsx` would ship every page's copy, in both
     languages, to every visitor. `scripts/check-messages.mjs` asserts a page
     receives its own namespace plus `common`, and nothing else.
   - **The argument is the route's `id` in `routes.json`**, not a free-form
     string, so a page cannot key off a namespace no route claims.
     `namespaceOf()` maps it: `index` → `home`, `customers/adr` →
     `customers.adr`, `[slug]` loses its brackets.
   - **A missing key throws in dev, degrades in production.** `onError` in
     `_app.tsx` rethrows outside production, so whoever introduced the gap sees
     a 500 on the page they are already looking at rather than an English string
     sitting quietly on the Italian site. Production logs and falls back —
     one absent string is not a reason to take the site down. `check:i18n` and
     `check:messages` in CI are what keep them out of production.
   - **The JSON import carries `with { type: 'json' }`.** Turbopack does not
     need it; bare Node does. Without it the gate script could only test the
     pure helpers and never the loading path a page actually uses.

4. **Italian apostrophes are `’`, never `'`.**
   A straight apostrophe inside a single-quoted JS string breaks the parser.
   Use the curly `’` (or `’`), or a double-quoted string. This is the most
   frequent build breakage in this repo.

5. **Routing changes touch four files, and the compiler checks none of them.**
   Adding or renaming a route with an Italian slug means, every time:

   | File | What it holds | What breaks if you forget |
   |---|---|---|
   | `next.config.ts` | `rewrites` mapping the IT slug onto the EN page | 404 on the Italian URL |
   | `i18n/localePaths.ts` | the EN↔IT slug pair | language switcher 404s, hreflang points nowhere |
   | `pages/sitemap.xml.tsx` | the route in `pages` or `translatedPages` | the page is never indexed |
   | `components/landing/Navbar.tsx`, `components/Footer.tsx` | `hrefIt` / `nameIt` / `hideInIT` | Italian nav sends users to the English page |

   These are four independent hand-kept lists. Nothing fails the build when
   they disagree — commit `67f53be` exists because `localePaths.ts` had fallen
   behind the rewrites and the language switcher 404'd in production. Treat
   "did I update all four?" as part of Acceptance, not as a detail.

6. **Monolingual pages must not claim to be bilingual.**
   `_app.tsx` emits `hreflang` for `en`, `it` and `x-default` on *every* route,
   with no opt-out. Several landing pages are hardcoded in one language only
   (e.g. `pages/lp/il-turnover-nei-negozi-del-lusso.tsx`: 732 lines of Italian,
   zero references to `lang`). Those pages currently declare an English
   alternate that serves Italian. If your Issue adds a monolingual page, say so
   on the Issue — do not quietly add another false alternate.

7. **`components/ui/` is vendored shadcn/ui. Don't hand-edit it.**
   48 files, `new-york` style, generated by the shadcn CLI (`components.json`).
   Need a variant? Compose around the component, or add it with the CLI. A
   hand-patched primitive is the kind of change nobody remembers when the CLI
   regenerates it.

8. **Centralized visual values stay centralized.**
   `.stat-value` in `styles/globals.css` is the single source of truth for the
   big metric callouts across ~24 files. Its weight was once hard-coded per file
   during a layout pass and drifted across the whole site (PR #80). Change the
   rule, never the 24 call sites. The same applies to the Mona Sans `@font-face`
   block: `tailwind.config.ts` still names `Inter` and is overridden — do not
   "fix" it by loading Inter.

9. **No new dependency for what a few lines do.**
   `package.json` already carries framer-motion, embla, recharts, lottie, ogl,
   react-hook-form, zod and 25 Radix packages. Reach for what's installed.
   A new dependency needs a line on the Issue saying what it replaces.

10. **Deliberate shortcuts are marked.**
    A `// ponytail:` comment naming the ceiling and the upgrade path. A shortcut
    nobody wrote down reads as ignorance to the next person.

## What has no guardrails (know this before you trust the build)

- **No lint, no test runner, no CI.** No ESLint config, no GitHub Action, and
  Playwright is in `devDependencies` with zero test files.
- **TypeScript is nearly off.** `strict: false`, `noImplicitAny: false`, and
  `// @ts-nocheck` at the top of **157 of 186** `.tsx` files.
- Consequence: `npm run build` catches syntax errors and little else. **Nothing
  automated checks localization, routing or SEO.** That is precisely why the
  reviewer walks `CHECKPOINTS.md` by hand, and why a new piece of non-trivial
  logic ships with its own check (`docs/verification.md`).
