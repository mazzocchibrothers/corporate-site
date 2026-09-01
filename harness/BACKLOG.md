# Backlog

The live backlog is **GitHub Issues**, label `harness`.

```bash
gh issue list --label harness                     # the whole backlog
gh issue list --label "harness,status:pending"    # what's up for grabs
gh issue view <n>                                 # Acceptance + Scope + Depends on
```

Model: **1 Issue = 1 feature.** State is the `status:*` label
(`pending | in_progress | done | blocked`); the single owner of an `in_progress`
Issue is its **assignee**; the progress log, smoke test and reviewer verdict are
**Issue comments**; an Issue closes when a PR saying `Closes #<n>` merges.

Parallel Issues are allowed only across **disjoint Scopes**, each in its own
worktree/branch — see `AGENTS.md` §7.

## What an Issue must declare

An Issue with no Scope cannot be claimed, because scope-disjointness is what
makes parallel work safe. Three sections, always:

```markdown
## Acceptance
- [ ] One observable outcome per line. "The IT page renders X", not "refactor Y".
- [ ] For a bilingual change, list the EN item and the IT item separately.

## Scope
- pages/customers/<slug>.tsx
- components/customers/ExploreStories.tsx
- public/logos/<slug>-*.avif

## Depends on
- #<n>   (or: none)
```

**Scope is files and globs, not prose.** "the customer stories area" is not a
Scope; `pages/customers/*.tsx` is. If your work turns out to need a file the
Scope doesn't name, that is a blocker to comment — not a licence to widen.

## Labels the harness needs

One-time setup, if `gh label list` doesn't show them:

```bash
gh label create harness             --color 0E8A16 --description "Agent harness backlog"
gh label create status:pending      --color FBCA04
gh label create status:in_progress  --color 1D76DB
gh label create status:done         --color 0E8A16
gh label create status:blocked      --color B60205
```
