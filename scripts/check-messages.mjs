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
  'resources.whitepapers.slug',
  'a dynamic segment loses its brackets — `[slug]` is not a legal ICU key path',
);

// ── The loader returns only what was asked for ─────────────────────────────
const run = async (routeId, locale, extra) =>
  (await messagesFor(routeId, extra)({ locale })).props.messages;

const home = await run('index', 'en');
assert.deepEqual(
  Object.keys(home).sort(),
  ['common', 'home'],
  'a page must receive its own namespace plus the shared one, and nothing else',
);
assert.ok(home.home.meta.title, 'the picked namespace keeps its nested shape');

// The degradation path: asking for a namespace the catalogue does not have must
// yield nothing for it, not throw and not leak the rest of the catalogue.
const missing = await run('customers/does-not-exist', 'en');
assert.deepEqual(
  Object.keys(missing).sort(),
  ['common'],
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

const onlyEn = en.filter((k) => !it.includes(k));
const onlyIt = it.filter((k) => !en.includes(k));
assert.deepEqual(onlyEn, [], `messages/en.json has keys missing from it.json:\n  ${onlyEn.join('\n  ')}`);
assert.deepEqual(onlyIt, [], `messages/it.json has keys missing from en.json:\n  ${onlyIt.join('\n  ')}`);

console.log(`[OK] messages: ${en.length} keys, en/it at parity, namespaces isolated`);
