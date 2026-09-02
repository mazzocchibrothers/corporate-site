# Verification — How to prove the work runs

> Golden rule: **the agent does not say "it works", it shows it.**
> Every feature ends with executable evidence, not a claim.

## Starting point: this repo has almost no automated safety net

Verified fact, not an opinion. There is no ESLint config and no `lint` script;
no jest, no vitest, no `*.spec.ts`, no `test` script; Playwright sits in
`devDependencies` with zero test files; there is no `.github/workflows/`.
TypeScript runs `strict: false` with `// @ts-nocheck` on 157 of 186 `.tsx`
files.

So: **`npm run build` catches syntax errors and broken imports. It does not
catch a missing Italian translation, a route absent from the sitemap, a
language switcher that 404s, or a wrong `hreflang`.** Those are exactly this
repo's recurring failures, and they are caught by Level 2 and Level 3 below,
never by Level 1 alone. Do not read a green `init.sh` as "the change is
correct" — read it as "the change compiles".

## Level 1 — Gates (mandatory, every feature)

`./harness/init.sh` runs all of them.

The gates live in the `GATES` array of `init.sh`, one npm script name per gate.
That array is the only list — it is not duplicated here, so this doc cannot
drift from what actually runs. To see it, and to run one by hand:

```bash
sed -n '/^GATES=(/,/^)/p' harness/init.sh   # the live list
npm run typecheck                           # one of them
```

The production build (`npm run build`) is a separate, slower tier, skipped by
`./harness/init.sh --fast`. Use `--fast` while iterating; **never** to declare
an Issue done.

CI runs the same list on every push, from `scripts/gates.mjs` — the runner and
the workflow cannot disagree about what runs. Running `init.sh` locally is still
not optional: it is how you find out before the push.

## Level 2 — One runnable check per piece of non-trivial logic (mandatory)

Non-trivial means: a branch, a loop, a parser, a filter, a locale mapping, a
data transform. UI markup is not non-trivial; `localizePath()` is.

Add `scripts/check-<feature>.mjs`, wire it as a `check:<feature>` script in
`package.json`, and register it in the `GATES` array of `harness/init.sh`.

- **`node:assert/strict`, no framework, no fixtures.** Do not install jest,
  vitest or Playwright to add one assertion.
- Runs **offline** — no network, no dev server.
- Asserts the concrete result, not merely "it didn't throw".
- Covers the degradation path, not only the happy one: the missing translation
  key, the locale a route has no page in, the query string riding along a path.
- **Verify it red.** A check that has never failed is a check you have not
  tested. Break the thing it guards, watch it fail with a message that names the
  problem, put it back. Every gate in this repo was verified red; one of them
  (`check:messages`) reported a real collision that went unnoticed because
  nobody read its exit code.

Shape:

```js
// scripts/check-navigation.mjs
import assert from 'node:assert/strict';
// Node 24 runs the TypeScript directly, so this asserts against the same
// function the site navigates with — not a second copy of the rule.
import { localizePathIn } from '../i18n/urls.ts';

assert.equal(at('/customers/adr', 'it'), '/it/clienti/adr');
assert.equal(at('/it/clienti/adr', 'it'), '/it/clienti/adr');   // idempotent
assert.equal(at('/customers/adr?utm_source=nl', 'it'), '/it/clienti/adr?utm_source=nl');
console.log('[OK] navigation');
```

Two habits make these checks worth their length. **Import the real function**,
not a reimplementation of it — `i18n/urls.ts` has no imports precisely so plain
Node can run it. And **assert the property, not just the example**: the round
trip over all 61 routes catches what eight hand-picked cases do not.

### The eight gates, and what each one exists because of

| Gate | Guards against |
|---|---|
| `typecheck` | broken imports and the type errors `@ts-nocheck` does not hide |
| `check:i18n` | a `t('…')` literal with no key in one of the catalogues |
| `check:routes` | a route with no page, a page with no route, two directories for one route, a page with no title, two pages with one title, an hreflang pointing at a URL nothing serves |
| `check:client` | a client component doing server work, and the reverse |
| `check:messages` | `en`/`it` key drift, an Italian array one item short, an ICU escape eating a tag, an empty string passing as a translation |
| `check:navigation` | an Italian link losing its prefix or its slug; the language switcher failing to round-trip |
| `check:dead` | a component nothing imports, an import nothing renders |
| `check:hardcoded` | copy that is in the code rather than in the catalogue |
| `build` | everything the above cannot see |

Each was written after the defect it guards had already shipped at least once.
That is the bar for adding a tenth: name the failure, then write the check that
would have caught it.

`check:hardcoded` is the one to read if you only read one. It exists because
"zero hardcoded copy" was reported as done and was not — not as a lie, as an
unmeasured belief. Three codemods had moved every shape they could read, all
the gates were green, and 1,919 readable strings were still in the JSX: an
entire customer story, the homepage's own h1, eleven landing pages and a legal
text. Nothing counted them, so nobody knew. **A claim nothing measures is a
claim, not a fact.**

### What is still uncovered

No gate reads the page. They can tell you a string exists, not that it is the
right string; that a route resolves, not that it resolves somewhere useful. Two
things fill that gap and neither is automatable:

1. **The bilingual smoke test below**, on every page or routing change.
2. **The text comparison against production** when a change is large enough to
   touch many pages at once — fetch both, strip the tags, diff the words. It is
   what proved the App Router migration changed nothing a visitor sees, and it
   is the only check that would have caught a page silently serving a different
   cut of a customer story.

3. **The structural comparison against the previous build**, for a mechanical
   change to markup. The text diff proves the sentences survived and says
   nothing about what surrounds them — and moving ~1,900 strings meant rebuilding
   their inline tags through `t.rich` handlers, where a dropped `className` is
   invisible to a reader of words.

   Build the commit before the change into a worktree, serve it on another port,
   and diff the two documents as a sequence of `tag.class[style]` tokens with the
   text removed:

   ```bash
   git worktree add /tmp/before <sha>
   cp -R node_modules /tmp/before/    # a symlink makes Turbopack panic
   (cd /tmp/before && npm run build && PORT=3001 npm run start &)
   ```

   Do not use production as the baseline for this one: the router changed, so
   the shell differs on every page and the signal drowns. The previous build is
   the only baseline that isolates what you did.

   It earned its keep the first time it ran: 112 of 115 pages matched, and the
   three that did not were two customer-story icons silently swapped by a
   hand-written id list, and a Tailwind class the Italian headline never had.
   Every text check on those pages was green.

## Level 3 — Bilingual smoke test (required for any page or routing change)

**This is the level that matters here, and it is always ×2.** A page verified
in one locale is a page verified half way.

```bash
npm run build && npm run start               # :3000 — not dev; prerendering is
                                             # where locale bugs actually show
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/customers/<slug>
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/it/clienti/<slug>
# and the old slug, which must 308 rather than 404
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" localhost:3000/it/customers/<slug>
```

Then, in a browser, for **both** locales:

- [ ] The page renders and the copy is in the right language throughout —
      no English fragments left on the Italian page.
- [ ] The **language switcher round-trips**: EN → IT → EN lands back on the
      same page, not on a 404 and not on the homepage.
- [ ] Navbar and Footer links from this page go to the right locale's URLs.
- [ ] `view-source` → the `<title>`, the `canonical` and the `hreflang` tags
      are all there, in the right language, pointing at URLs that resolve.
- [ ] If the page is in `ExploreStories`, its card appears under every filter
      its `useCases[]` declares.

Record **as a comment on the Issue** what you actually saw — status codes,
which URLs you opened, what the switcher did. Not what the code should do.

## Anti-patterns

- ❌ "I added the page, it should work." → no executable evidence.
- ❌ Verifying only the English route. The Italian one is a different code path.
- ❌ Installing a test framework to add one assertion.
- ❌ Declaring an Issue done after `./harness/init.sh --fast`.
- ❌ Marking a feature `done` with `./harness/init.sh` red.

## Final check before closing

```bash
./harness/init.sh          # must end with [OK] Environment ready
```

If it is red, **do not** mark anything `done`. Comment the blocker on the Issue
and set its label to `status:blocked`.
