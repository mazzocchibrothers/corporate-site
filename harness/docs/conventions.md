# Conventions

> Extreme homogeneity. An AI predicts better when the repository looks like
> itself everywhere.

## TypeScript

- The repo runs `strict: false` / `noImplicitAny: false`, and most files open
  with `// @ts-nocheck`. **Write code that would pass under strict anyway.**
- Adding `// @ts-nocheck` to a *new* file is allowed only to match the shape of
  the page you copied. Never add it to silence a real error in code you wrote.
- Path alias is `@/*` → repo root. Use it: `@/components/landing/Navbar`, never
  a `../../..` chain.

## Naming and layout

| Thing | Convention | Example |
|---|---|---|
| Page files | `kebab-case.tsx`, route = path | `pages/customers/europ-assistance.tsx` |
| Components | `PascalCase.tsx`, grouped by area | `components/customers/ExploreStories.tsx` |
| Component dirs | the site area they serve | `landing/`, `product/`, `science/`, `solutions/`, `customers/`, `shared/` |
| shadcn primitives | untouched, `kebab-case` | `components/ui/navigation-menu.tsx` |
| Public assets | `kebab-case`, AVIF for photos | `public/logos/adr-explore-stories.avif` |
| Functions / vars | `camelCase` | `toItPath`, `activeUseCase` |

No spaces in new asset filenames. Two shipped assets have them
(`mediaset-background-explore-stories (2).avif`); don't add a third.

## Page shape (the one being migrated away from)

**Read this to understand the 61 pages that still look like it, not to write a
new one.** Copy lives in the page file here; the whole point of the migration is
that it stops doing so. The replacement is the next section.

```tsx
// @ts-nocheck
import React, { useRef } from 'react';
import Head from 'next/head';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';

// ─── BILINGUAL CONTENT ──────────────────────────────────────────────
const content = {
  it: { … },
  en: { … },
};

export default function Page() {
  const { lang } = useLanguage();
  const c = lang === 'it' ? content.it : content.en;
  return (
    <>
      <Head>{/* title + meta description, per locale */}</Head>
      <Navbar />
      {/* sections */}
      <Footer />
    </>
  );
}
```

- **`content` sits above the component**, not inside it — it is data, and
  rebuilding it on every render is the tell that someone inlined it.
- **Both locales carry the same keys.** A key present in `it` and missing in
  `en` renders `undefined` in production with no warning.
- **`<Head>` is per-page and per-locale.** Title and meta description are copy;
  they belong in the content object like everything else.

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

`framer-motion` is the house animation library. The recurring reveal wrapper is
a local `Section` component (`useInView`, `once: true`, `margin: '-80px'`,
`opacity/y` transition, 0.6s) declared at the top of the page file. Copy it;
don't invent a second reveal idiom, and don't extract it into a shared component
without an Issue — 17 pages currently declare it locally and a half-migration is
worse than either state.

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

1. `pages/customers/<slug>.tsx` — content object, both locales.
2. Register in `components/customers/ExploreStories.tsx` → `allStories`:
   `id`, `company`, `industry`, `useCases[]`, `headlineIt`, `headlineEn`,
   `bgImage`. The filter lists derive from this array; there is no second list.
3. Add the EN/IT pair to `translatedPages` in `pages/sitemap.xml.tsx`.
4. Assets in `public/logos/`, AVIF for the card background.
5. The `/clienti/:slug` rewrite in `next.config.ts` is generic — it already
   covers you. `localePaths.ts` is also already generic for `/customers` →
   `/clienti`. **A new customer story is the one route change that does *not*
   need those two files.** Any other new route does.

Numbered variants (`mediaset-2.tsx`, `adr-2.tsx`, `eataly-3.tsx`) are alternate
cuts of a story. Some are live via a rewrite — `/customers/mediaset` serves
`mediaset-2`. **Check `next.config.ts` before assuming a variant file is dead.**

## Comments

- Explain **why**, never what. The codebase's existing comments are the model:
  `next.config.ts` explains why no `afterFiles` entry is needed;
  `_app.tsx` explains why GTM is `afterInteractive` and not `lazyOnload`.
- A deliberate shortcut gets `// ponytail:` and names the upgrade path.
- No commented-out code without a line saying when it comes back.
  `ExploreStories.tsx` does this correctly for the Credem story.
- No AI attribution in comments or commit messages.

## Git

- One Issue → one branch → one PR. **During the App Router migration the base
  is `app-router`, not `main`** — branch off it, rebase onto `origin/app-router`,
  and target it in the PR. `main` receives exactly one merge, at the switch
  (#120). See `harness/AGENTS.md` §2b.
- Conventional, scoped commit subjects in the imperative:
  `Add August newsletter (EN/IT) and supermarkets one-pager LP`.
- PR body says `Closes #<n>`.
