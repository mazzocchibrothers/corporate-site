// check-demo-retail — the retail dashboard's labels exist, and its copy still
// describes the data underneath it.
//
// Two gaps meet on this page and neither is covered elsewhere.
//
// The first: every label on it is fetched with a composed key —
// t(`cuts.groups.${cut}.${id}`), t(`skills.${s}`), t(`segments.items.${s}.name`).
// check:i18n only reads string literals, so none of those keys is checked by
// anything. A group renamed in data/demo/retail.ts would render the key path
// itself as the pill's label, in both languages, with every gate green. So the
// group ids are read from the data and matched against the catalogue in both
// directions: no group without a label, no label without a group.
//
// The second, and the reason this file is longer than that: the page is an
// argument about the data. It says the competency gap between top performers
// and everyone else is small, that tenure buys results and not competency, and
// that competency does not predict conversion — with the two coefficients on
// screen rather than left out. If the extract is ever refreshed and the numbers
// move, that copy becomes a claim the page's own charts contradict, and nothing
// would say so. Each of those sentences is asserted against the figure it
// describes.
//
// Run: npm run check:demo-retail

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { retail } = await import(pathToFileURL(join(ROOT, 'data/demo/retail.ts')).href);

const catalogues = Object.fromEntries(
  ['en', 'it'].map((l) => [
    l,
    JSON.parse(readFileSync(join(ROOT, `messages/${l}.json`), 'utf8')).demo.retail,
  ]),
);

const at = (catalogue, path) =>
  path.split('.').reduce((node, seg) => (node == null ? undefined : node[seg]), catalogue);

const missing = [];
const label = (path) => {
  for (const locale of ['en', 'it']) {
    if (typeof at(catalogues[locale], path) !== 'string') {
      missing.push(`  ${locale}: demo.retail.${path}`);
    }
  }
};

// ── Every composed key the page builds ─────────────────────────────────────
// The ids come from the data, exactly as the page derives them at runtime.
const CUT_GROUPS = {
  channel: retail.context.channel,
  location: retail.context.location,
  tier: retail.context.tier,
  area: retail.areas,
};
const CUTS = Object.fromEntries(
  Object.entries(CUT_GROUPS).map(([cut, groups]) => [cut, Object.keys(groups)]),
);

for (const [cut, ids] of Object.entries(CUTS)) {
  label(`cuts.options.${cut}`);
  for (const id of ids) label(`cuts.groups.${cut}.${id}`);
}

// The five competency areas, named once per context group and once in
// topVsRest. All four lists must be the same five, or the radar draws a group
// against axes it has no point for.
const SKILLS = Object.keys(retail.topVsRest.areas);
for (const skill of SKILLS) label(`skills.${skill}`);

for (const segment of Object.keys(retail.segments)) {
  for (const part of ['name', 'description', 'action']) label(`segments.items.${segment}.${part}`);
}
for (const bucket of Object.keys(retail.seniority)) label(`seniority.buckets.${bucket}`);
// The two tenure charts pick their aria label and their axis title with a
// ternary inside t(), which check:i18n cannot read either.
for (const key of [
  'seniority.series.skill', 'seniority.series.relativeSph',
  'seniority.skillChart.ariaLabel', 'seniority.sphChart.ariaLabel',
  'seniority.axisSkill', 'seniority.axisSph',
]) label(key);
for (const band of ['top', 'rest']) label(`top.series.${band}`);
for (const stat of ['salesPerHour', 'aboveThreshold', 'relativeSph']) label(`top.stats.${stat}`);
for (const kpi of [
  'people', 'stores', 'skill', 'aboveThreshold', 'conversionRate',
  'unitsPerTicket', 'averageTicket', 'salesPerHour', 'visitsPerDay', 'turnover',
]) label(`cuts.labels.${kpi}`);
for (const card of ['advisors', 'stores', 'aboveThreshold', 'conversion']) {
  label(`population.${card}.label`);
  label(`population.${card}.note`);
}
for (const side of ['stores', 'people']) {
  label(`map.${side}.label`);
  label(`map.${side}.note`);
}

assert.deepEqual(
  missing,
  [],
  `${missing.length} label(s) the page composes have no message:\n${missing.join('\n')}\n` +
    'next-intl renders the key path when a key is missing, so this ships as literal ' +
    '"cuts.groups.channel.outlet" where the pill\'s name should be.',
);

// The other direction: copy for a group the data no longer holds is copy that
// renders nowhere and still asks to be translated.
const stale = [];
for (const [cut, ids] of Object.entries(CUTS)) {
  const declared = Object.keys(at(catalogues.en, `cuts.groups.${cut}`) ?? {});
  for (const id of declared) if (!ids.includes(id)) stale.push(`  cuts.groups.${cut}.${id}`);
}
for (const id of Object.keys(catalogues.en.skills)) {
  if (!SKILLS.includes(id)) stale.push(`  skills.${id}`);
}
assert.deepEqual(stale, [], `Labels with no group behind them:\n${stale.join('\n')}`);

// ── The shape the page's one conditional is built on ───────────────────────
// The radar is skipped for the area cut and `cuts.skills.unavailable` shown
// instead, because the areas ship as headcount and result only. If an extract
// ever carried a competency profile per area the fallback would be hiding a
// chart the data can draw.
for (const cut of ['channel', 'location', 'tier']) {
  for (const [id, group] of Object.entries(retail.context[cut])) {
    assert.deepEqual(
      Object.keys(group.areas).sort(),
      [...SKILLS].sort(),
      `context.${cut}.${id} does not carry the same five competency areas as topVsRest.`,
    );
  }
}
assert.ok(
  Object.values(retail.areas).every((a) => a.areas === undefined),
  'An area now carries a competency profile — the page skips the radar for the area cut ' +
    'and says so in cuts.skills.unavailable. Draw the chart instead of the fallback.',
);

// ── Shares are shares ──────────────────────────────────────────────────────
// Each is drawn on an axis fixed to 0-100 by the page, so one that no longer
// sums to a hundred is a bar that silently stops reaching the end of it.
const sums = (label, values) =>
  assert.ok(
    Math.abs(values.reduce((a, b) => a + b, 0) - 100) <= 0.5,
    `${label} sums to ${values.reduce((a, b) => a + b, 0)}, not 100.`,
  );

sums('skillDistribution.distribution', [...retail.skillDistribution.distribution]);
sums('segments', Object.values(retail.segments));
for (const [id, area] of Object.entries(retail.areas)) {
  sums(`areas.${id}.segments`, Object.values(area.segments));
}

// ── The headline figures the copy quotes ───────────────────────────────────
// population.stores.note says "of which {outlets} are outlets", which is only
// true while the estate is the two channels and nothing else.
assert.equal(
  retail.population.stores,
  retail.context.channel.fullPrice.stores + retail.context.channel.outlet.stores,
  'population.stores is no longer the two channels added up, but the copy still says it is.',
);
assert.equal(
  retail.population.outlets,
  retail.context.channel.outlet.stores,
  'population.outlets disagrees with the outlet channel.',
);

// ── The sentences the page argues, against the numbers it argues them from ──

// map.caption: "competency does not predict the till on its own".
for (const [key, r] of [
  ['storeSkillToConversion', retail.correlations.storeSkillToConversion],
  ['individualSkillToSales', retail.correlations.individualSkillToSales],
]) {
  assert.ok(
    Math.abs(r) < 0.2,
    `correlations.${key} is ${r}. The page is written around this being ~0 — it prints both ` +
      'coefficients and says they do not line up. Rewrite map.caption before shipping a ' +
      'correlation that does.',
  );
}

// cuts.results.caption names which cuts have one group leading both bars and
// which does not. The first version of that caption said the two rankings
// rarely agree, which was false on three of the four cuts and visibly false to
// anyone clicking the pills — overselling the *absence* of a link, which on
// this page costs as much as overselling the link. This is the assertion that
// was missing when it shipped.
const leaderOf = (groups, key) =>
  Object.entries(groups).reduce((a, b) => (b[1][key] > a[1][key] ? b : a))[0];
const diverging = Object.entries(CUT_GROUPS)
  .filter(([, g]) => leaderOf(g, 'aboveThresholdPct') !== leaderOf(g, 'conversionRate'))
  .map(([cut]) => cut);
assert.deepEqual(
  diverging,
  ['tier'],
  `cuts.results.caption names store tier as the one cut whose two rankings disagree. ` +
    `The cuts that now disagree are: ${diverging.join(', ') || 'none'}.`,
);

// seniority.heading: "tenure buys results, not competency".
const bands = Object.values(retail.seniority);
const sph = bands.map((b) => b.relativeSph);
const skills = bands.map((b) => b.skill);
// "climbs steadily" is a claim about every step, not about the two ends: with
// only the endpoints compared, any middle band could be moved anywhere and the
// chart would still be captioned as a steady climb (reviewer's mutation test —
// this was the one surviving mutation of nineteen).
const dips = sph.flatMap((v, i) => (i > 0 && v < sph[i - 1] ? [`${i - 1}->${i}`] : []));
assert.deepEqual(
  dips,
  [],
  `Relative sales per hour falls between tenure bands (${dips.join(', ')}). ` +
    'seniority.body says it climbs steadily.',
);
assert.ok(
  sph.at(-1) - sph[0] >= 0.1,
  `Relative sales per hour rises by ${(sph.at(-1) - sph[0]).toFixed(2)} across the tenure bands. ` +
    'seniority.heading claims tenure buys results.',
);
assert.ok(
  Math.max(...skills) - Math.min(...skills) < 6 &&
    Math.abs(retail.correlations.seniorityToSkill) < 0.1,
  'The competency score now moves with tenure. seniority.heading says it does not.',
);

// top.body: "on one of the five it runs the other way", and top.caveat quotes
// the p-value as the reason the overall gap is not called a finding.
const reversed = Object.entries(retail.topVsRest.areas).filter(([, a]) => a.top < a.rest);
assert.equal(
  reversed.length,
  1,
  `${reversed.length} competency areas run against the top performers, not 1 ` +
    `(${reversed.map(([k]) => k).join(', ')}). top.body says one.`,
);
assert.ok(
  retail.topVsRest.skillPValue > 0.05,
  `skillPValue is ${retail.topVsRest.skillPValue}. top.caveat says the overall competency gap ` +
    'does not clear significance; at this value it does.',
);
assert.ok(
  retail.topVsRest.salesPerHour.top > retail.topVsRest.salesPerHour.rest,
  'top.caption says the commercial gap is real and large.',
);

// segments.chart.caption: one area is more than half result-without-method, and
// one carries the largest priority-development share — of all five, uniquely.
const areas = Object.values(retail.areas);
assert.ok(
  Math.max(...areas.map((a) => a.segments.resultWithoutMethod)) > 50,
  'No area is more than half result-without-method any more; segments.chart.caption says one is.',
);
const priority = areas.map((a) => a.segments.priorityDevelopment);
assert.equal(
  priority.filter((p) => p === Math.max(...priority)).length,
  1,
  'Two areas tie on the largest priority-development share; segments.chart.caption names one.',
);

console.log(
  `[OK] demo retail: ${Object.values(CUTS).flat().length} group labels across ` +
    `${Object.keys(CUTS).length} cuts, and every copy claim still true of the data`,
);
