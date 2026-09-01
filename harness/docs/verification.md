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

There is no CI, so `init.sh` is not a local echo of a pipeline — it is the only
gate that exists. Running it is not optional.

## Level 2 — One runnable check per piece of non-trivial logic (mandatory)

Non-trivial means: a branch, a loop, a parser, a filter, a locale mapping, a
data transform. UI markup is not non-trivial; `toItPath()` is.

Add `scripts/check-<feature>.mjs`, wire it as a `check:<feature>` script in
`package.json`, and register it in the `GATES` array of `harness/init.sh`.

- **`node:assert/strict`, no framework, no fixtures.** Do not install jest,
  vitest or Playwright to add one assertion.
- Runs **offline** — no network, no dev server.
- Asserts the concrete result, not merely "it didn't throw".
- Covers the degradation path, not only the happy one: the missing translation
  key, the locale with no slug mapping, the query string riding along an
  `asPath`.

Shape:

```js
// scripts/check-locale-paths.mjs
import assert from 'node:assert/strict';
import { toItPath, toEnPath } from '../i18n/localePaths.ts';

assert.equal(toItPath('/customers/adr'), '/clienti/adr');
assert.equal(toEnPath('/clienti/adr?utm_source=nl'), '/customers/adr?utm_source=nl');
console.log('[OK] locale paths');
```

### What exists: `check:i18n`

`scripts/check-i18n.mjs` guards `i18n/translations.ts` against **duplicate
keys**. The dictionary is a plain object literal, so a repeated key silently
overwrites the earlier one — 79 keys were duplicated when the check was written,
10 of them with genuinely different Italian values, and nothing anywhere
reported it. It is registered in `GATES`, so it runs on every `init.sh`.

It also carries a **shape guard**: the scan is line-based, so a multi-line value
would slip past the regex and be silently exempt. Any line the parser cannot
read fails the check, rather than quietly narrowing what it covers.

Its scope stops at duplicates on purpose. The dictionary's other two defects
need copy decisions, not a parser — see below.

### What's still missing, in value order

Take one as part of an Issue that touches the area, not as a project of its own:

1. **`check:i18n`, second dimension** — every `t('…')` literal in the codebase
   exists in the dictionary. 22 currently don't and render English on the
   Italian site; making this green means writing 22 Italian strings, which is a
   copy task. Note that 129 `t()` calls take a *variable*, not a literal
   (`t(card.title)`), so a static scan can never be complete here — it can only
   prove that the literals resolve.
2. **`check:i18n`, third dimension** — `content.it` and `content.en` declare the
   same keys in every page's content object. A key present in one locale only
   renders `undefined` in production.
3. **`check:routes`** — every route under `pages/` is either in
   `sitemap.xml.tsx` or on an explicit exclusion list (43 currently are not),
   and every IT slug in `next.config.ts` has its pair in `localePaths.ts`.
4. **`check:apostrophes`** — no straight `'` between two letters inside a
   single-quoted string in an Italian content block.

## Level 3 — Bilingual smoke test (required for any page or routing change)

**This is the level that matters here, and it is always ×2.** A page verified
in one locale is a page verified half way.

```bash
npm run dev                                  # :3000
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/customers/<slug>
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/it/clienti/<slug>
```

Then, in a browser, for **both** locales:

- [ ] The page renders and the copy is in the right language throughout —
      no English fragments left on the Italian page.
- [ ] The **language switcher round-trips**: EN → IT → EN lands back on the
      same page, not on a 404 and not on the homepage.
- [ ] Navbar and Footer links from this page go to the right locale's URLs.
- [ ] `view-source` → the `hreflang` tags point at URLs that actually resolve.
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
