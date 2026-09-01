# CLAUDE.md

Skillvue's marketing site (skillvue.ai). Content-heavy Next.js **Pages Router** app — almost all work here is adding or editing marketing pages, not building infrastructure.

## Commands

```bash
npm run dev     # localhost:3000
npm run build   # the only real check — there is no lint or test setup
```

## Stack

Next.js 16 (Pages Router, `pages/`) · React 19 · Tailwind 3 · shadcn/ui (`components/ui/`, new-york, alias `@/*`) · framer-motion · TypeScript with `strict: false` and `// @ts-nocheck` at the top of most pages/components. Deployed on Vercel from `main`.

## Bilingual (EN/IT) — the thing to get right

Next i18n locales `['en','it']`, default `en`. English at `/`, Italian at `/it/…`. `useLanguage()` from `@/i18n/LanguageContext` gives `{ lang, t, switchLang }`.

Two coexisting patterns:

1. **`const content = { it: {...}, en: {...} }` at the top of the page**, then `const c = lang === 'it' ? content.it : content.en`. This is the pattern for all customer stories and LPs — **use it for new pages**.
2. `t('English string')` against the flat dictionary in `i18n/translations.ts` (English strings are the keys). Legacy; still used by shared components like the navbar. Only touch it when editing those.

**Italian apostrophes:** never a straight `'` inside a single-quoted JS string — it breaks the parser. Use the Unicode escape `\u2019`, or a curly `’`.

**Italian slugs** are rewrites, not separate pages (`next.config.ts`): `/clienti` → `/customers`, `/clienti/:slug` → `/customers/:slug`, plus `/prenota-incontro` ↔ `/book-meeting`. Those two pairs are also mapped in `i18n/localePaths.ts`, which drives both the language switcher and the hreflang tags in `_app.tsx`. **Adding a new IT-slugged route means editing `localePaths.ts` too, or the language switcher 404s.**

## Adding a customer story

1. `pages/customers/<slug>.tsx` — copy an existing one (`europ-assistance.tsx` is the reference structure: Hero → Context → Challenge → Objectives → Solution → Results → Vision → Related).
2. Register it in `components/customers/ExploreStories.tsx` (`allStories`: `id`, `company`, `industry`, `useCases[]`, both headlines, `bgImage`). Filters derive from this array — no separate filter list to update.
3. Add the EN/IT pair to `translatedPages` in `pages/sitemap.xml.tsx`.
4. Assets go in `public/logos/` (AVIF for card backgrounds).

`pages/customers/` also holds numbered variants (`mediaset-2`, `adr-2`, `eataly-3`, …) — alternate cuts of a story. Some are live via a rewrite: `/customers/mediaset` serves `mediaset-2`. Check `next.config.ts` rewrites before assuming a file is dead.

## Conventions

- **Fonts:** Mona Sans, self-hosted via `@font-face` in `styles/globals.css`. `tailwind.config.ts` still says `Inter` in `fontFamily` — it is stale and overridden by the `body` rule; don't "fix" it by adding Inter.
- **Big metric numbers** use the `.stat-value` class (~24 files). Its font-weight lives only in `globals.css` — change it there, never per-file. That drift already happened once (PR #80).
- HubSpot forms are embedded by portal ID + form GUID (see `pages/book-meeting.tsx`, `data/whitepapers.ts`, `pages/lp/*`). GTM is in `_app.tsx`.
- Every page renders `Navbar` + `Footer` itself; there's no shared layout.

## Agent harness

Structured multi-agent work runs through `harness/`. Start at
`harness/AGENTS.md` (the map), gate with `./harness/init.sh`, and grade against
`harness/CHECKPOINTS.md`. Backlog is GitHub Issues, label `harness`. The three
subagents are `.claude/agents/site-{leader,implementer,reviewer}.md`.

Not every change needs it — a one-line copy fix doesn't. Reach for it when work
spans several pages, several agents, or touches routing/i18n.

## Git

One branch per change, PR into `main` (Vercel auto-deploys). Commit and push only when asked.
