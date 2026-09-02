# CLAUDE.md

Skillvue's marketing site (skillvue.ai). Content-heavy Next.js **App Router**
app — almost all work here is adding or editing marketing pages, not building
infrastructure.

## Commands

```bash
npm run dev          # localhost:3000
./harness/init.sh    # every gate, then the build — this is the check
npm run build        # the build gate alone
```

There is no lint and no test framework. The gates are small `node:assert`
scripts in `scripts/`, one per `check:*` entry in `package.json`, and
`scripts/gates.mjs` derives the list so `init.sh` and CI cannot disagree with
it.

## Stack

Next.js 16 (App Router, `app/`) · React 19 · Tailwind 3 · shadcn/ui
(`components/ui/`, new-york, alias `@/*`) · framer-motion · next-intl ·
TypeScript with `strict: false` and `// @ts-nocheck` at the top of most files.
Deployed on Vercel from `main`.

## The shape of a page

Every route is a directory under `app/[locale]/`, holding two files:

```
app/[locale]/customers/adr/
  page.tsx    server. The same eight lines on every route.
  body.tsx    the page. 'use client', because framer-motion and useRouter live here.
```

`page.tsx` does the two things only the server can: `generateMetadata` calling
`buildMetadata(routeId, locale)`, and a `NextIntlClientProvider` narrowed to the
route's namespaces. **Do not widen that provider.** One rendered without
`messages` inherits the entire catalogue and serializes 338 KB of copy into
every document.

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

The directory under `app/[locale]` is the **English** path (or the Italian one
where there is no English). next-intl rewrites the other URL onto it.

**Adding a route means adding it here.** `npm run check:routes` fails otherwise,
and it also fails if the page has no title, or if two pages share one.

## Copy — `messages/{en,it}.json`

Zero hardcoded copy, and `npm run check:hardcoded` is what makes that a fact
rather than a claim. Every string is in the catalogue under the route's
namespace, read with `useTranslations` in a client component or
`getTranslations` on the server. The one exception is a name — a company, a
person — listed in `scripts/check-hardcoded.mjs`.

- **Italian apostrophes: curly `’`, never straight `'`.** Before `<` or `{` a
  straight quote is an ICU escape — `l'<b>x</b>` renders the tag as visible text
  with the apostrophe swallowed. `check:messages` fails on it.
- Inline markup goes through `t.rich` with ICU tags (`<b>`, `<span>`), not into
  the string as HTML.
- `en` and `it` must hold the same keys and the same array shapes.
  `check:messages` compares them.

## Adding a customer story

1. `app/[locale]/customers/<slug>/` — copy an existing pair.
   `europ-assistance` is the reference structure: Hero → Context → Challenge →
   Objectives → Solution → Results → Vision → Related.
2. Add the copy to `messages/en.json` and `messages/it.json` under
   `customers.<slug>`, including `meta.title` and `meta.description`.
3. Add the route to `i18n/routes.json`.
4. Register it in `components/customers/ExploreStories.tsx` (`allStories`) —
   the filters derive from that array, and a story missing from it is a page
   nothing links to.
5. Assets go in `public/logos/` (AVIF for card backgrounds).

The sitemap, the hreflang tags and the language switcher need no edit.

## Navigation

`router.push` comes from `@/i18n/navigation`, **not** `next/navigation`. It
applies `localizePath`, which is what turns `/book-meeting` into
`/it/prenota-incontro` for an Italian visitor. Next used to do that itself under
`nextConfig.i18n`; it does not any more, and half the call sites pass a
variable, so the guard is in that one module.

For a raw `<a href>`, use `href(id, locale)` from `@/i18n/routes`.

## Conventions

- **Fonts:** Mona Sans, self-hosted via `@font-face` in `styles/globals.css`.
  `tailwind.config.ts` still says `Inter` in `fontFamily` — it is stale and
  overridden by the `body` rule; don't "fix" it by adding Inter.
- **`./app/**` is in the Tailwind content globs and must stay.** Without it a
  page compiles and silently loses every utility it uses.
- **Big metric numbers** use the `.stat-value` class (~24 files). Its
  font-weight lives only in `globals.css` — change it there, never per-file.
- **CSS delivery** is decided and measured: one external sheet, no `inlineCss`.
  See `harness/docs/conventions.md`.
- HubSpot forms are embedded by portal ID + form GUID (see
  `app/[locale]/book-meeting/body.tsx`, `data/whitepapers.ts`,
  `app/[locale]/lp/*`). GTM is in `app/[locale]/layout.tsx`.
- Every page renders `Navbar` + `Footer` itself; the layout is the shell only.
- A component nothing imports fails `check:dead`. Delete it or wire it up.

## Agent harness

Structured multi-agent work runs through `harness/`. Start at
`harness/AGENTS.md` (the map), gate with `./harness/init.sh`, and grade against
`harness/CHECKPOINTS.md`. Backlog is GitHub Issues, label `harness`. The three
subagents are `.claude/agents/site-{leader,implementer,reviewer}.md`.

Not every change needs it — a one-line copy fix doesn't. Reach for it when work
spans several pages, several agents, or touches routing/i18n.

## Git

One branch per change, PR into `main` (Vercel auto-deploys). Commit and push
only when asked.

**No AI attribution, anywhere.** No `Co-Authored-By: Claude`, no session URL, no
"Generated with Claude Code" — not in a commit message, not in a PR body, not in
a code comment. A commit ends with its last real paragraph. `harness/CHECKPOINTS.md`
C6 has always said this; it was still missed for 43 commits on one branch, so it
is here too.
