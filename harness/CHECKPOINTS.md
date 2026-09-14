# CHECKPOINTS — Grading the end state

> In multi-agent systems you don't grade the path, you grade the destination.
> These are the objective checkpoints a judge (human or AI) uses to decide
> whether the site is healthy.

## C1 — The harness is complete

- [ ] The base files exist: `harness/AGENTS.md`, `harness/init.sh`,
      `harness/CHECKPOINTS.md`, `harness/BACKLOG.md`.
- [ ] The three docs exist: `harness/docs/architecture.md`,
      `harness/docs/conventions.md`, `harness/docs/verification.md`.
- [ ] `./harness/init.sh` exits 0.

## C2 — The state is coherent

The live backlog is GitHub Issues (label `harness`); state is the `status:*`
label, owner is the assignee. The base branch is `main` — the App Router
migration is over and `app-router` no longer exists.

- [ ] At most one `in_progress` Issue per overlapping Scope (parallel
      `in_progress` Issues are allowed only across disjoint Scopes).
- [ ] Every `in_progress` Issue has an assignee — no orphaned `in_progress`.
- [ ] Every Issue carries exactly one `status:*` label.
- [ ] Every `status:done` Issue landed on `main` — by a merged PR whose body
      says `Closes #<n>`, or by a commit already contained in it
      (`git merge-base --is-ancestor <sha> origin/main`).
- [ ] No Issue is `done` while an Issue it **Depends on** is still open.
- [ ] The merged branch left nothing behind: no worktree, no local branch, no
      remote branch.

## C3 — The code respects the architecture

- [ ] New copy went into `messages/{en,it}.json` under the route's namespace
      (or `common` / `shared.<name>`). No string was hardcoded in a component,
      no sentence was added to `NAMES` in `check-hardcoded.mjs`, and no bare
      `lang === 'it' ? … : …` ternary was introduced.
- [ ] `en` and `it` declare the **same keys and the same array shapes**, and no
      Italian value is still the English one. No locale renders `undefined` or
      one card fewer.
- [ ] No straight `'` in Italian copy. Curly `’` only — and before `<` or `{`
      it is not style, it is an ICU escape that eats the tag.
- [ ] A key the change stopped rendering was deleted from both catalogues.
- [ ] The page renders its own `Navbar` and `Footer`, and its title and
      description come from `buildMetadata`, not from a hand-written tag.
- [ ] `page.tsx` provides messages narrowed to its own namespaces with
      `messagesForRoute`. Nothing widened the provider — one without
      `messages` ships the whole catalogue into every document.
- [ ] `router.push` came from `@/i18n/navigation`, not `next/navigation`; a raw
      `<a>` uses `href(id, locale)`.
- [ ] `'use client'` is on the files that need it and no others
      (`check:client`). A page that only reads copy stays a server component.
- [ ] Scroll reveals use `<Reveal>`. framer-motion was added only for something
      genuinely state-driven, and the reason is in the PR.
- [ ] The primitives in `components/ui/` (`Button`, `Reveal`, `HeroVideo`,
      `IconTile`) were reused, not re-implemented in a page.
- [ ] No per-file override of a centralized value (`.stat-value`, the font
      stack, the Tailwind content globs).
- [ ] No new dependency without a line on the Issue or PR saying what it
      replaces.
- [ ] No `// @ts-nocheck` (the codebase has none). No debug `console.log`. No
      TODO without context.
- [ ] Deliberate shortcuts are marked `// ponytail:` and name the upgrade path.

## C4 — Routing and SEO stayed consistent

Only applies when the change adds, renames or removes a route.

The rewrite, the locale-path map, the sitemap entry and the hreflang cluster are
derived from `i18n/routes.json` and asserted by `npm run check:routes`, together
with the title, the share card and the structured data. What is left is what no
check can decide for you.

- [ ] The route is in `i18n/routes.json`, with a path for **every locale it
      actually has content in** — and none for the ones it does not.
- [ ] It has `meta.title` and `meta.description` in both locales, the title is
      not one another page already uses, and both still describe the page
      after a redesign changed its headline.
- [ ] An alternate cut of an existing page declares `canonicalOf` rather than
      competing with the page it is a cut of.
- [ ] A page that must not be found by search (a demo dashboard) declares
      `noindex`.
- [ ] The directory under `app/[locale]` is the English path (or the Italian
      one where there is no English) — one directory per route, never two.
- [ ] `Navbar.tsx` / `Footer.tsx` link it through `href(id, locale)` where it
      belongs in the nav.
- [ ] It is listed where its section lists content: `allStories` in
      `ExploreStories.tsx` for a customer story, `ARTICLES` / `NEWSLETTERS` in
      the blog page, `data/whitepapers.ts` / `data/onepagers.ts` for an insight.
      A page nothing lists is a page nothing links to.

## C5 — Verification is real

- [ ] `./harness/init.sh` ended green — the full run, not `--fast`.
- [ ] CI is green on the PR: the gates, `check:build` and `test:smoke`.
- [ ] Every non-trivial piece of logic added by the change has one runnable
      check: a `scripts/check-*.mjs` wired to a `check:*` script in
      `package.json` (`scripts/gates.mjs` picks it up — there is no second
      list). Logic worth testing lives in a `.ts` module the check imports.
- [ ] Checks use `node:assert/strict`, run offline, assert concrete results,
      and cover the degradation path. No test framework was installed.
- [ ] Any change touching a page or a route has a **bilingual** smoke test
      recorded on its Issue or PR: both locales opened, the switcher
      round-tripped, what was actually observed.

## C6 — The session closed cleanly

- [ ] No suspicious untracked files (`.next/`, `*.tmp`, stray assets outside
      `.gitignore`).
- [ ] The Issue carries a closing summary comment for the last session.
- [ ] The last Issue worked on carries its correct `status:*` label.
- [ ] Commits are scoped, in the imperative, with no AI attribution — no
      `Co-Authored-By: Claude`, no session URL, no "Generated with" line, in
      commits or in the PR body.

## C7 — The page looks like the rest of the site

Only applies when the change touches what a visitor sees. The standard is the
**Design system** section of `CLAUDE.md`.

- [ ] Headings follow the standard: H1 hero `font-semibold`, `48px`/`64px`,
      `-0.02em`; H2 section title `font-semibold`, `tracking-[-0.02em]`, max
      `3rem` on a `4vw` slope.
- [ ] A gradient accent phrase has the same weight as its heading — it differs
      by colour only.
- [ ] Metric numbers use `.stat-value`; tag pills use the shared neutral pill.
- [ ] Every new hex is in the palette in `scripts/check-colors.mjs`, added in
      the same change, and none was added to silence a false positive.
- [ ] Photos are AVIF in `public/covers/` or `public/logos/`; hero video is
      webm + mp4 + poster in `public/videos/` through `<HeroVideo>`. No external
      image hosts.
- [ ] A pattern changed on one page (a hero layout, a CTA block, an eyebrow
      removed) was either applied to its sibling pages and recorded in
      `CLAUDE.md`, or reverted. One page alone is drift, not a new standard.
- [ ] Checked at phone width and on desktop, in both locales — Italian copy is
      longer and breaks layouts English does not.

---

**How to use this file:** the reviewer agent (`.claude/agents/site-reviewer.md`)
walks every box, marks `[x]` or `[ ]`, and refuses the session close while any
applicable box in C1–C7 is empty.
