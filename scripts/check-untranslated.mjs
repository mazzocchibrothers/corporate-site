// check-untranslated — an Italian value that is still the English one.
//
// `check:messages` proves the two catalogues have the same *keys*. It says
// nothing about the *values*, and that is the gap the site kept falling into:
// "All rights reserved." in the Italian footer, twelve English keywords on the
// Italian homepage, "HR & PEOPLE CHALLENGES" on fifteen Italian customer
// stories, four of five compliance badges. Every one of those shipped with a
// green build, because nothing compared the words.
//
// The rule: a value of four words or more that is byte-identical in both
// locales is untranslated until someone says otherwise. Shorter strings are not
// checked — a label, a number, a loanword is identical on purpose far more often
// than not, and a check that cries wolf gets deleted.
//
// Run: npm run check:untranslated

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const routes = JSON.parse(readFileSync(join(ROOT, 'i18n/routes.json'), 'utf8'));

const namespaceOf = (id) =>
  id === 'index' ? 'home' : id.split('/').filter((s) => !/^\[.*\]$/.test(s)).join('.');

/**
 * Namespaces of routes that serve one language.
 *
 * Their two catalogue entries hold the same text by construction and the second
 * one never renders — the page 404s in the locale it has no path for. Comparing
 * them would report the whole of eleven landing pages.
 */
const MONOLINGUAL = routes
  .filter((r) => Object.keys(r.paths).length === 1)
  .map((r) => namespaceOf(r.id));

/**
 * Decisions, not exceptions. Each entry is a value that is the same in both
 * languages **on purpose**, with the reason. A prefix ends in `.`; anything else
 * is an exact path.
 *
 * Adding a line here is a copy decision and should be made like one. If you are
 * adding one because the check is inconvenient, translate the string instead.
 */
const DELIBERATE = [
  // The privacy policy exists in Italian only. Both URLs serve it, which is a
  // content gap (there is no English text to serve), not a translation bug.
  ['privacy-policy.', 'no English privacy policy exists — the Italian text serves both URLs'],
  // Job titles are not translated in Italian business writing.
  ['customers.adr.results.quote.role', 'job title'],
  ['customers.adr-2.results.quote.role', 'job title'],
  ['customers.europ-assistance.quote.role', 'job title'],
  ['customers.europ-assistance-2.quote.role', 'job title'],
  ['customers.mediaset.quote.role', 'job title'],
  ['customers.mediaset-1.quote.role', 'job title'],
  ['customers.mediaset-2.quote.role', 'job title'],
  ['customers.credem.quote.role', 'job title'],
  ['customers.unicomm.quote.role', 'job title'],
  ['customers.subdued.quote.role', 'job title'],
  ['customers.douglas.quote.role', 'job title'],
  ['customers.fidia-farmaceutici.quote.role', 'job title'],
  ['customers.eataly.quote.role', 'job title'],
  ['customers.eataly-2.quote.role', 'job title'],
  ['customers.eataly-3.quote.role', 'job title'],
  ['customers.carrefour.quote.role', 'job title'],
  ['customers.ins-mercato.quote.role', 'job title'],
  ['lp.europ-assistance.quote.role', 'job title'],
  ['home.customerStories.stories.', 'job titles in the homepage story cards'],
  ['science.team.', 'job titles on the science team'],
  // The registered company address.
  ['common.footer.legalAddress', 'a registered address, not copy'],
  // Use cases and industries as the Italian pages themselves name them.
  ['customers.adr.clientCard.', 'use case named in English on the Italian page too'],
  ['customers.adr-2.clientCard.', 'use case named in English on the Italian page too'],
  ['customers.carrefour.clientCard.', 'use case named in English on the Italian page too'],
  ['customers.douglas.clientCard.', 'use case named in English on the Italian page too'],
  ['customers.unicomm.clientCard.', 'use case named in English on the Italian page too'],
  // Story tags: the industry half is English in Italian business usage.
  ['customers.adr.related.', 'industry names'],
  ['customers.carrefour.related.', 'industry names'],
  ['customers.credem.related.', 'industry names'],
  ['customers.douglas.related.', 'industry names'],
  ['customers.eataly.related.', 'industry names'],
  ['customers.eataly-2.related.', 'industry names'],
  ['customers.eataly-3.related.', 'industry names'],
  ['customers.europ-assistance.related.', 'industry names'],
  ['customers.europ-assistance-2.related.', 'industry names'],
  ['customers.fidia-farmaceutici.related.', 'industry names'],
  ['customers.ins-mercato.related.', 'industry names'],
  ['customers.mediaset.related.', 'industry names'],
  ['customers.mediaset-1.related.', 'industry names'],
  ['customers.mediaset-2.related.', 'industry names'],
  ['customers.subdued.related.', 'industry names'],
  ['customers.unicomm.related.', 'industry names'],
  // The three one-pagers are an English PDF served at a bilingual URL (#142).
  ['lp.supermarkets.', 'an English one-pager, served under both locales'],
  ['lp.ai-competency.', 'an English one-pager, served under both locales'],
  ['lp.ai-competency-newsletter.', 'an English one-pager, served under both locales'],
  // Landing-page microcopy shared by Italian-only pages.
  ['shared.lp.', 'used only by the Italian-only landing pages'],
  // A named interview methodology.
  ['blog.attitude-vs-competence.methods.', 'named methodologies (BEI, STAR)'],
  // Product surface named in English on both sites.
  ['solutions.talent-acquisition.taFunnel.', 'product surface named in English on the Italian page too'],
  ['solutions.project-resourcing.prHero.body', 'English copy on the Italian page (#142)'],
];

const allowed = (path) =>
  MONOLINGUAL.some((ns) => path === ns || path.startsWith(`${ns}.`)) ||
  DELIBERATE.some(([p]) => (p.endsWith('.') ? path.startsWith(p) : path === p));

function* leaves(a, b, prefix = '') {
  for (const key of Object.keys(a)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const value = a[key];
    if (typeof value === 'string') { yield [path, value, b?.[key]]; continue; }
    if (Array.isArray(value)) {
      for (const [i, item] of value.entries()) yield* leaves({ [i]: item }, { [i]: b?.[key]?.[i] }, path);
      continue;
    }
    if (value && typeof value === 'object') yield* leaves(value, b?.[key] ?? {}, path);
  }
}

const en = JSON.parse(readFileSync(join(ROOT, 'messages/en.json'), 'utf8'));
const it = JSON.parse(readFileSync(join(ROOT, 'messages/it.json'), 'utf8'));

const wordCount = (s) => s.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;

const untranslated = [...leaves(en, it)]
  .filter(([path, a, b]) => a === b && wordCount(a) >= 4 && !allowed(path))
  .map(([path, a]) => `  ${path}\n      ${JSON.stringify(a.slice(0, 100))}`);

assert.deepEqual(
  untranslated,
  [],
  `${untranslated.length} Italian value(s) are still the English one:\n${untranslated.join('\n')}\n` +
    'Translate them. If a string is deliberately the same in both languages, add it to ' +
    'DELIBERATE in this file with the reason — that list is a record of copy decisions, not a ' +
    'way to silence the check.',
);

const checked = [...leaves(en, it)].filter(([p, a]) => wordCount(a) >= 4 && !allowed(p)).length;
console.log(`[OK] untranslated: none, over ${checked} bilingual values of 4+ words`);
