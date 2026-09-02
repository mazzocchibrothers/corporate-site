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
label, owner is the assignee.

- [ ] At most one `in_progress` Issue per overlapping Scope (parallel
      `in_progress` Issues are allowed only across disjoint Scopes).
- [ ] Every `in_progress` Issue has an assignee — no orphaned `in_progress`.
- [ ] Every `status:done` Issue landed on `app-router` — by a merged
      `Closes #<n>` PR into that branch, or by a commit already contained in it
      (`git merge-base --is-ancestor`). **Not** by a merge into `main`: `main`
      receives one merge, at the switch (#120).
- [ ] No Issue is `done` while an Issue it **Depends on** is still open.
- [ ] The merged branch left nothing behind: no worktree, no local branch, no
      remote branch.

## C3 — The code respects the architecture

- [ ] New copy went into `messages/{en,it}.json` under the route's namespace.
      No string was hardcoded in a component, and no bare
      `lang === 'it' ? … : …` ternary was introduced.
- [ ] `en` and `it` declare the **same keys and the same array shapes**. No
      locale renders `undefined` or one card fewer.
- [ ] No straight `'` in Italian copy. Curly `’` only — and before `<` or `{`
      it is not style, it is an ICU escape that eats the tag.
- [ ] The page renders its own `Navbar` and `Footer`, and its title and
      description come from `buildMetadata`, not from a hand-written tag.
- [ ] `page.tsx` provides messages narrowed to its own namespaces. Nothing
      widened the provider — one without `messages` ships the whole catalogue
      into every document.
- [ ] `router.push` came from `@/i18n/navigation`, not `next/navigation`.
- [ ] `components/ui/` was not hand-edited.
- [ ] No per-file override of a centralized value (`.stat-value`, the font
      stack, the Tailwind content globs).
- [ ] No new dependency without a line on the Issue saying what it replaces.
- [ ] No `// @ts-nocheck` added to silence a real error. No debug
      `console.log`. No TODO without context.
- [ ] Deliberate shortcuts are marked `// ponytail:` and name the upgrade path.

## C4 — Routing and SEO stayed consistent

Only applies when the Issue adds, renames or removes a route.

Almost everything that used to be on this list is now derived from
`i18n/routes.json` and asserted by `npm run check:routes` — the rewrite, the
locale-path map, the sitemap entry and the hreflang cluster were four
hand-kept lists, and commit `67f53be` exists because they drifted. What is left
is what no check can decide for you.

- [ ] The route is in `i18n/routes.json`, with a path for **every locale it
      actually has content in** — and none for the ones it does not.
- [ ] It has `meta.title` and `meta.description` in both locales, and the title
      is not one another page already uses.
- [ ] An alternate cut of an existing page declares `canonicalOf` rather than
      competing with the page it is a cut of.
- [ ] The directory under `app/[locale]` is the English path (or the Italian
      one where there is no English) — one directory per route, never two.
- [ ] `Navbar.tsx` / `Footer.tsx` link it through `href(id, locale)` where it
      belongs in the nav.
- [ ] `ExploreStories.tsx` lists it, if it is a customer story. A story missing
      from that array is a page nothing links to.

## C5 — Verification is real

- [ ] `./harness/init.sh` ended green — the full run, not `--fast`.
- [ ] Every non-trivial piece of logic added by this Issue has one runnable
      check under `scripts/check-*.mjs`, wired to a `check:*` script and
      registered in the `GATES` array of `init.sh`.
- [ ] Checks use `node:assert/strict`, run offline, assert concrete results,
      and cover the degradation path. No test framework was installed.
- [ ] Any Issue touching a page or a route has a **bilingual** smoke test
      recorded as an Issue comment: both locales opened, the switcher
      round-tripped, what was actually observed.

## C6 — The session closed cleanly

- [ ] No suspicious untracked files (`.next/`, `*.tmp`, stray assets outside
      `.gitignore`).
- [ ] The Issue carries a closing summary comment for the last session.
- [ ] The last Issue worked on carries its correct `status:*` label.
- [ ] Commits are conventional and scoped, with no AI attribution.

---

**How to use this file:** the reviewer agent (`.claude/agents/site-reviewer.md`)
walks every box, marks `[x]` or `[ ]`, and refuses the session close while any
box in C1–C6 is empty.
