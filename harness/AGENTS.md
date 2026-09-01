# AGENTS.md — Navigation map for corporate-site

> Entry point for any agent working on this repository.
> This is **not** a rulebook: it is a **map**. Read only what you need, when you
> need it (progressive disclosure).
>
> **Scope:** the whole repo. It is a single Next.js Pages Router marketing site
> for skillvue.ai, bilingual EN/IT. There is no monorepo, no backend, no
> database — almost all work here is content pages, not infrastructure.

---

## 1. Before you start (mandatory)

1. Run `./harness/init.sh` and check it exits clean. If it fails, **stop** and
   fix the environment before touching code.
2. List the backlog: `gh issue list --label harness`. The `status:*` label is
   the state; the assignee is the single owner of an `in_progress` Issue.
3. Read **your** Issue in full (`gh issue view <n>`): its Acceptance, its
   **Scope** (the files/globs it declares), and its **Depends on**.
4. Before you claim it, check that **no `in_progress` Issue has an overlapping
   Scope**. Parallel work is allowed only across disjoint scopes (see §7).

## 2. The map

| Where | What it holds | When to read it |
|---|---|---|
| GitHub Issues, label `harness` | The live backlog. State = `status:*` label; owner = assignee; progress log / smoke test / reviewer verdict = Issue **comments** | Always, at the start |
| `harness/BACKLOG.md` | How the backlog is queried and what an Issue must declare | If you're unsure where the backlog lives |
| `harness/docs/architecture.md` | What "good work" means here | Before implementing |
| `harness/docs/conventions.md` | Style, naming, page structure, the i18n patterns | Before writing code |
| `harness/docs/verification.md` | How to prove your work runs | Before handing to review |
| `harness/CHECKPOINTS.md` | Objective "correct end state" criteria | To self-assess |
| `.claude/agents/site-*.md` | Subagent definitions: leader, implementer, reviewer | If you orchestrate work |
| `CLAUDE.md` | Repo orientation: stack, i18n patterns, the customer-story checklist | First, if you've never worked here |
| `DEPLOY.md` | Domain, locale routing and DNS decisions already made | Before changing routing |
| `pages/`, `components/`, `i18n/` | The code | To implement |

**Known live conflict:** `HANDOFF.md` describes a mid-2026 session and names
files and asset gaps that have since moved (it still calls `carrefour.tsx` a
`t()` page; it isn't). When it disagrees with the code, **the code wins** —
`HANDOFF.md` is frozen history, not a spec.

## 2b. Branch model during the App Router migration

`app-router` is the integration branch. **`main` is touched once, at the end.**

```
main         ●━━●━━●━━●━━●━━━━━━━━━━━━━━━━━━━●   ← marketing keeps shipping here
              ╲                              ╱
app-router     ●━━●━━●━━●━━●━━●━━●━━●━━●━━━━●    ← every Issue lands here
                 ↑ one Issue = one branch off app-router, one PR back into it
```

- **Branch off `app-router`, PR into `app-router`.** Never into `main`.
- **A PR that targets `main` during the migration is a mistake**, with one
  exception: an urgent content fix the marketing team needs live. Those still go
  to `main` — see the sync rule below.
- Rebase onto `origin/app-router` before opening your PR, not onto `main`.

### Syncing `main` in, and the trap in it

Marketing keeps publishing while this runs, and every page they add lands in
`pages/` — the directory this branch is deleting. So:

```bash
git checkout app-router && git merge origin/main
npm run check:routes      # reports which router serves each route
```

The merge itself will be clean, because a new landing page is a new file. **That
is the trap:** it lands in `pages/`, where nothing on this branch serves it, and
git will not say a word. `check:routes` is what catches it (#133) — a route
served by `pages/` after the sync is a route that still has to be re-created
under `app/`.

Sync weekly, not at the end. A month of unsynced content pages is a month of
them discovered at once.

### Before `app-router` merges into `main`

The switch is the only moment the live site changes. See #120 — it is a gate,
not a formality, and it is the last Issue in the backlog for that reason.

## 3. Hard rules (non-negotiable)

- **One Issue per branch/worktree.** Never mix changes from different Issues.
- **Never declare `done` with red gates.** `./harness/init.sh` must exit 0.
- **Write down what you do** as **comments on your Issue**, in real time, not after.
- **A route change touches four files, not one** (see
  `docs/architecture.md` §Routing). Miss one and you ship a 404 or an SEO hole
  instead of a build error — that failure has already happened here once.
- **Never a straight `'` in an Italian string literal.** Use `’`. A straight
  apostrophe inside a single-quoted JS string breaks the parser; this is the
  single most frequent build breakage in this repo's history.
- **If you don't know something, look in `harness/docs/`** before inventing it.

## 4. How to pick a task

```
1. gh issue list --label "harness,status:pending"
2. Take one whose "Depends on" Issues are all closed/done
3. Confirm its Scope is disjoint from every in_progress Issue's Scope
4. Self-assign it and swap the label: status:pending -> status:in_progress
     gh issue edit <n> --add-assignee @me \
       --remove-label status:pending --add-label status:in_progress
5. Comment on the Issue: your plan (3-5 bullets) and start time
```

## 5. Session close

1. Run `./harness/init.sh` — all green.
2. Open a PR whose body says `Closes #<n>`. One Issue per branch/PR.
3. After review approves and the PR merges: set `status:done`
   (`gh issue edit <n> --remove-label status:in_progress --add-label status:done`);
   the merged `Closes #<n>` closes the Issue.
4. Post a closing summary as an **Issue comment** (what shipped, what you ran,
   what you observed **in both locales**).
5. **A merged branch leaves nothing behind** — remove its worktree, its local
   branch, **and its remote branch**:

   ```bash
   git worktree remove <path> --force && git worktree prune
   git branch -D <branch>
   git push origin --delete <branch>
   ```

   Don't assume `gh pr merge --delete-branch` did it: that call exits non-zero
   and skips the deletion whenever the branch is still checked out in a
   worktree — the normal case here — so the remote branch survives. Verify with
   `git branch -a`, not by trusting the merge output. (`origin` currently
   carries ~20 merged branches that were never cleaned up; don't add to them.)
6. No temp files, no debug `console.log`, no TODOs without context.

## 6. If you get stuck

- Re-read the relevant section of `harness/docs/`.
- If a tool doesn't do what you expect, **do not invent a workaround**: comment
  the blocker on the Issue, set `status:blocked`, and end the session.

## 7. Parallelism

Several Issues may be in flight **at once**, each in its **own worktree/branch**,
**only if their Scope sections are disjoint** (no shared files/globs). The leader
checks scope-disjointness before launching in parallel.

- One Issue → one worktree → one branch. Never two Issues in the same worktree.
- Before opening your PR, **rebase onto `origin/main` and resolve conflicts in
  your own worktree**. Merges land one at a time (a landing queue) — the tree you
  rebase onto is the one that will be there when you merge.

**Scope in this repo is unusually easy to get wrong.** Most content pages are
genuinely disjoint (`pages/customers/adr.tsx` and `pages/blog/accountability.tsx`
share nothing). But four files are touched by almost every *routing* change —
`next.config.ts`, `i18n/localePaths.ts`, `pages/sitemap.xml.tsx`,
`components/landing/Navbar.tsx` — and `i18n/translations.ts` is touched by
almost every *copy* change. Two Issues that both add a route are **not**
disjoint, however unrelated their pages look. Sequence them.
