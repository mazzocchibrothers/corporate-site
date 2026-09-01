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
- [ ] Every `status:done` Issue was closed by a merged `Closes #<n>` PR.
- [ ] No Issue is `done` while an Issue it **Depends on** is still open.
- [ ] The merged branch left nothing behind: no worktree, no local branch, no
      remote branch.

## C3 — The code respects the architecture

- [ ] New bilingual copy uses the **content object** pattern. No key was added
      to `i18n/translations.ts`, and no new bare `lang === 'it' ? … : …`
      ternary was introduced outside a content object.
- [ ] `content.it` and `content.en` declare the **same keys**. No locale
      renders `undefined`.
- [ ] No straight `'` inside a single-quoted Italian string. Curly `’` only.
- [ ] The page renders its own `Navbar` and `Footer`, and its `<Head>` title
      and description are per-locale.
- [ ] `components/ui/` was not hand-edited.
- [ ] No per-file override of a centralized value (`.stat-value`, the font
      stack).
- [ ] No new dependency without a line on the Issue saying what it replaces.
- [ ] No `// @ts-nocheck` added to silence a real error. No debug
      `console.log`. No TODO without context.
- [ ] Deliberate shortcuts are marked `// ponytail:` and name the upgrade path.

## C4 — Routing and SEO stayed consistent

Only applies when the Issue adds, renames or removes a route. When it does,
**all four** must hold — the build checks none of them.

- [ ] `next.config.ts` — the IT slug rewrite exists (or the generic
      `/clienti/:slug` rule already covers it).
- [ ] `i18n/localePaths.ts` — the EN↔IT pair is mapped, and the language
      switcher round-trips on the new route.
- [ ] `pages/sitemap.xml.tsx` — the route is in `pages` or `translatedPages`.
- [ ] `Navbar.tsx` / `Footer.tsx` — `hrefIt` / `nameIt` / `hideInIT` set where
      the route is linked.
- [ ] A monolingual page is flagged as such on the Issue rather than silently
      inheriting `_app.tsx`'s unconditional `hreflang` for both locales.

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
