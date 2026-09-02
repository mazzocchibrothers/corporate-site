// check-messages — proves the message loader hands a page the namespaces it
// asked for, and nothing else.
//
// Why this exists: the whole reason messages load per-page instead of from
// _app.tsx is payload size — the catalogue is ~19k words per locale. If `pick`
// silently widened, or `merge` dropped a namespace, nothing would look broken:
// the page would still render, just with the wrong bytes on the wire or a
// missing string in one language. Both failures are invisible without this.
//
// Run: npm run check:messages

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { messagesFor, namespaceOf, pick, merge } = await import(join(ROOT, 'i18n/messages.ts'));

// ── Route id -> namespace ──────────────────────────────────────────────────
assert.equal(namespaceOf('index'), 'home', 'the homepage namespace is `home`, not `index`');
assert.equal(namespaceOf('about'), 'about');
assert.equal(namespaceOf('customers/adr'), 'customers.adr', 'path separators become dots');
assert.equal(
  namespaceOf('resources/whitepapers/[slug]'),
  'resources.whitepapers',
  'a dynamic segment is dropped: the collection and its detail page share one ' +
    'namespace, because they render the same titles',
);

// ── The loader returns only what was asked for ─────────────────────────────
const run = async (routeId, locale, forceLocale) =>
  (await messagesFor(routeId, forceLocale)({ locale })).props.messages;

const home = await run('index', 'en');
assert.deepEqual(
  Object.keys(home).sort(),
  ['common', 'home', 'shared'],
  'a page must receive its own namespace plus the shared ones (common, shared), and nothing else',
);
assert.ok(home.home.meta.title, 'the picked namespace keeps its nested shape');

// The degradation path: asking for a namespace the catalogue does not have must
// yield nothing for it, not throw and not leak the rest of the catalogue.
const missing = await run('customers/does-not-exist', 'en');
assert.deepEqual(
  Object.keys(missing).sort(),
  ['common', 'shared'],
  'an unknown namespace contributes nothing — and must not drag the catalogue in with it',
);

// Two namespaces under one root is the case a shallow spread gets wrong: the
// second `customers` object would replace the first instead of joining it.
// This is a real bug that was in `merge` before it was a merge.
assert.deepEqual(
  merge({ customers: { alpha: { k: 'A' } } }, { customers: { beta: { k: 'B' } } }),
  { customers: { alpha: { k: 'A' }, beta: { k: 'B' } } },
  'sibling namespaces under one root must both survive the merge',
);
assert.deepEqual(
  merge({ a: { b: 1 } }, { a: { b: 2 } }),
  { a: { b: 2 } },
  'a leaf collision resolves to the later value, it does not merge into an object',
);
assert.deepEqual(
  merge({ list: ['a'] }, { list: ['b'] }),
  { list: ['b'] },
  'arrays replace rather than merge — an ICU message list is one value',
);

// `pick` on its own: the shape it rebuilds, and what it does with an absent path.
const catalogue = JSON.parse(readFileSync(join(ROOT, 'messages/en.json'), 'utf8'));
assert.deepEqual(
  pick(catalogue, 'home.meta'),
  { home: { meta: catalogue.home.meta } },
  'pick rebuilds the full nesting, not just the leaf',
);
assert.deepEqual(pick(catalogue, 'nope.at.all'), {}, 'an absent path picks nothing');
assert.deepEqual(pick(catalogue, 'home.meta.title.deeper'), {}, 'walking past a leaf picks nothing');

// ── The catalogue obeys its own conventions ────────────────────────────────
// Documented in harness/docs/conventions.md. Three of the four rules there are
// mechanical, so they are checked rather than trusted: 20-odd pages of copy get
// migrated by different passes over five weeks, and a convention nobody
// enforces on day one is a convention nobody follows by day ten.

const leaves = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? leaves(v, `${prefix}${k}.`)
      : [[`${prefix}${k}`, v]],
  );

const catalogueEn = JSON.parse(readFileSync(join(ROOT, 'messages/en.json'), 'utf8'));
const catalogueIt = JSON.parse(readFileSync(join(ROOT, 'messages/it.json'), 'utf8'));
const entries = [
  ...leaves(catalogueEn).map(([k, v]) => ['en', k, v]),
  ...leaves(catalogueIt).map(([k, v]) => ['it', k, v]),
];

// A key is an identifier, never the English sentence it holds. English-as-key
// is what this whole migration exists to undo: it makes the Italian
// unfindable, ties every key to one phrasing, and turns a copy edit into a
// rename across 20 files.
const SEGMENT = /^[a-z][a-zA-Z0-9]*(-[a-z0-9]+)*$/;
const badKeys = entries
  .filter(([, key]) => !key.split('.').every((seg) => SEGMENT.test(seg)))
  .map(([locale, key]) => `  ${locale}: ${key}`);
assert.deepEqual(
  [...new Set(badKeys)],
  [],
  `Keys must be camelCase identifiers, not sentences:\n${[...new Set(badKeys)].join('\n')}`,
);

// Namespaces are not free-form: every message belongs to a route, to `common`
// (rendered on every page), or to `shared.*` (rendered on some, pulled in
// explicitly by the pages that want it). Without this, orphan copy accumulates
// under namespaces no page loads and nobody can tell what is still in use.
const routeNamespaces = JSON.parse(readFileSync(join(ROOT, 'i18n/routes.json'), 'utf8'))
  .map((r) => namespaceOf(r.id));
const validPrefixes = ['common', 'shared', ...routeNamespaces];
const orphans = entries
  .filter(([, key]) => !validPrefixes.some((p) => key === p || key.startsWith(`${p}.`)))
  .map(([, key]) => `  ${key}`);
assert.deepEqual(
  [...new Set(orphans)],
  [],
  `Namespaces with no page behind them:\n${[...new Set(orphans)].join('\n')}\n` +
    'A namespace is a route id from i18n/routes.json, `common`, or `shared.<name>`.',
);

// Markup in a message means a translator has to edit HTML to change a comma,
// and a class name has to survive a language it has no business being in.
// next-intl's t.rich() takes the tags from the component instead, so a message
// carries `<link>the docs</link>` and the page decides what a link looks like.
// An ICU tag has no attributes; that is what separates the two.
const withMarkup = entries
  .filter(([, , value]) => typeof value === 'string' && /<[a-zA-Z][^>]*\s[a-zA-Z-]+=/.test(value))
  .map(([locale, key]) => `  ${locale}: ${key}`);
assert.deepEqual(
  withMarkup,
  [],
  `Messages carrying markup:\n${withMarkup.join('\n')}\n` +
    'Use an ICU tag and resolve it with t.rich() — the markup belongs to the component.',
);

const empty = entries
  .filter(([, , value]) => typeof value === 'string' && value.trim() === '')
  .map(([locale, key]) => `  ${locale}: ${key}`);
assert.deepEqual(
  empty,
  [],
  `Empty messages:\n${empty.join('\n')}\n` +
    'An empty string renders as nothing and reads as a finished translation. Delete the key ' +
    'or translate it.',
);

// ── Catalogue parity ───────────────────────────────────────────────────────
// A key in one locale only renders `undefined` in production, in one language,
// which is exactly the failure nobody notices until a customer does.
const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? flatten(v, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  );

const en = flatten(JSON.parse(readFileSync(join(ROOT, 'messages/en.json'), 'utf8')));
const it = flatten(JSON.parse(readFileSync(join(ROOT, 'messages/it.json'), 'utf8')));

// An array leaf is compared as a key above, which says nothing about what is
// inside it. A story whose Italian list is one item short renders one card
// fewer, in one language, and nothing says so.
const arrays = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    Array.isArray(v)
      ? [[`${prefix}${k}`, v]]
      : v && typeof v === 'object'
        ? arrays(v, `${prefix}${k}.`)
        : [],
  );

const shapeOf = (v) =>
  Array.isArray(v)
    ? `[${v.map(shapeOf).join(',')}]`
    : v && typeof v === 'object'
      ? `{${Object.keys(v).sort().join(',')}}`
      : typeof v;

const arraysIt = new Map(arrays(JSON.parse(readFileSync(join(ROOT, 'messages/it.json'), 'utf8'))));
const mismatched = arrays(JSON.parse(readFileSync(join(ROOT, 'messages/en.json'), 'utf8')))
  .filter(([key, value]) => arraysIt.has(key) && shapeOf(value) !== shapeOf(arraysIt.get(key)))
  .map(([key, value]) => `  ${key}: en ${shapeOf(value)} vs it ${shapeOf(arraysIt.get(key))}`);
assert.deepEqual(
  mismatched,
  [],
  `${mismatched.length} array(s) differ in shape between the locales:\n${mismatched.join('\n')}`,
);

// ── ICU escapes ───────────────────────────────────────────────────────────
// A straight apostrophe immediately before `<` or `{` is not an apostrophe to
// ICU — it opens a quoted literal, and everything up to the next quote is
// emitted verbatim. Two Italian messages read `l'<b>espansione…` and rendered
// the tag as visible text with the apostrophe swallowed. Nothing failed: the
// page compiled, the build passed, and the sentence was wrong in one language.
//
// The fix in the catalogue is the curly apostrophe the house style asks for
// anyway. This is the check that keeps the straight one from coming back.
const values = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'string'
      ? [[`${prefix}${k}`, v]]
      : v && typeof v === 'object'
        ? values(v, `${prefix}${k}.`)
        : [],
  );

const escaping = ['en', 'it'].flatMap((locale) =>
  values(JSON.parse(readFileSync(join(ROOT, `messages/${locale}.json`), 'utf8')))
    .filter(([, value]) => /'[<{]/.test(value))
    .map(([key, value]) => `  ${locale}: ${key}\n      ${value.slice(0, 120)}`),
);
assert.deepEqual(
  escaping,
  [],
  `${escaping.length} message(s) open an ICU quoted literal before a tag:\n${escaping.join('\n')}\n` +
    'Use the curly apostrophe (\u2019). ICU reads the straight one as an escape and renders the ' +
    'tag as text.',
);

const onlyEn = en.filter((k) => !it.includes(k));
const onlyIt = it.filter((k) => !en.includes(k));
assert.deepEqual(onlyEn, [], `messages/en.json has keys missing from it.json:\n  ${onlyEn.join('\n  ')}`);
assert.deepEqual(onlyIt, [], `messages/it.json has keys missing from en.json:\n  ${onlyIt.join('\n  ')}`);

console.log(
  `[OK] messages: ${en.length} keys across ${Object.keys(catalogueEn).length} namespaces, ` +
    'en/it at parity, keys semantic, no markup',
);
