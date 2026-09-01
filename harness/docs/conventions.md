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

## Page shape

Every page follows the same skeleton. Copy `pages/customers/europ-assistance.tsx`
for a customer story, `pages/lp/supermarkets.tsx` for a landing page.

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

- One Issue → one branch → one PR. Branch off `main`, rebase onto
  `origin/main` before opening the PR.
- Conventional, scoped commit subjects in the imperative:
  `Add August newsletter (EN/IT) and supermarkets one-pager LP`.
- PR body says `Closes #<n>`.
