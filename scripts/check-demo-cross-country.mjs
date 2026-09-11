// check-demo-cross-country — the cross-country dashboard's labels exist, and
// its copy still describes the data underneath it.
//
// Same two gaps as the other two demo gates. Every label is fetched with a
// composed key — t(`framework.${id}`), t(`drivers.names.${d}`) — which
// check:i18n cannot read, so the ids come from the data and are matched against
// both catalogues in both directions.
//
// The claims are the longer half, and this page has more of them than the other
// two because more of its numbers are easy to read wrongly. Three in particular
// are asserted as the *shape* of the reading, not as a value: the preferred
// areas sum past 100 because the question was multi-select, `openToConsidering`
// is not a yes, and the three country groups differ in size by a factor the
// copy names. Each of those is a sentence on the page that a refreshed extract
// could silently falsify.
//
// Run: npm run check:demo-cross-country

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { crossCountry: cc } = await import(
  pathToFileURL(join(ROOT, 'data/demo/cross-country.ts')).href
);

const catalogues = Object.fromEntries(
  ['en', 'it'].map((l) => [
    l,
    JSON.parse(readFileSync(join(ROOT, `messages/${l}.json`), 'utf8')).demo['cross-country'],
  ]),
);

const at = (catalogue, path) =>
  path.split('.').reduce((node, seg) => (node == null ? undefined : node[seg]), catalogue);

const missing = [];
const label = (path) => {
  for (const locale of ['en', 'it']) {
    if (typeof at(catalogues[locale], path) !== 'string') {
      missing.push(`  ${locale}: demo.cross-country.${path}`);
    }
  }
};

const sum = (values) => values.reduce((a, b) => a + b, 0);
const mean = (values) => sum(values) / values.length;

const COMPETENCIES = Object.keys(cc.competencies);
const FRAMEWORK = Object.keys(cc.framework);
const BANDS = Object.keys(cc.competencies.vision.bands);
const GROUPS = Object.keys(cc.countryGroups);
const DRIVERS = [...new Set(Object.values(cc.drivers).flatMap((d) => Object.keys(d)))];

// ── Every composed key the page builds ─────────────────────────────────────
for (const c of COMPETENCIES) label(`competencies.${c}`);
for (const f of FRAMEWORK) label(`framework.${f}`);
for (const b of BANDS) label(`bands.${b}`);
for (const g of GROUPS) label(`groups.names.${g}`);
for (const d of DRIVERS) label(`drivers.names.${d}`);
for (const m of Object.keys(cc.mobility)) label(`mobility.items.${m}`);
for (const a of Object.keys(cc.preferredAreas)) label(`areas.items.${a}`);
for (const g of Object.keys(cc.growth)) label(`growth.items.${g}`);
for (const card of ['invited', 'evaluated', 'completion']) {
  label(`population.${card}.label`);
  label(`population.${card}.note`);
}
// The frame selector names its two options and picks its item labels from
// whichever frame is open, both through composed keys.
for (const frame of ['competencies', 'framework']) label(`frames.options.${frame}`);
// "How to read the results" is the section that makes the rest legible, so a
// missing entry there is the one gap that would not look like a bug.
for (const item of ['matching', 'scale', 'groups', 'areas', 'mobility', 'counts']) {
  label(`howToRead.items.${item}.question`);
  label(`howToRead.items.${item}.answer`);
}

assert.deepEqual(
  missing,
  [],
  `${missing.length} label(s) the page composes have no message:\n${missing.join('\n')}\n` +
    'next-intl renders the key path when a key is missing, so this ships as literal ' +
    '"framework.negotiation" where the bar\'s name should be.',
);

// The other direction: a label with nothing behind it renders nowhere and still
// asks to be translated.
const stale = [
  ...Object.keys(catalogues.en.competencies).filter((k) => !COMPETENCIES.includes(k)).map((k) => `  competencies.${k}`),
  ...Object.keys(catalogues.en.framework).filter((k) => !FRAMEWORK.includes(k)).map((k) => `  framework.${k}`),
  ...Object.keys(catalogues.en.drivers.names).filter((k) => !DRIVERS.includes(k)).map((k) => `  drivers.names.${k}`),
  ...Object.keys(catalogues.en.bands).filter((k) => !BANDS.includes(k)).map((k) => `  bands.${k}`),
];
assert.deepEqual(stale, [], `Labels with nothing behind them:\n${stale.join('\n')}`);

// The Italian article welded in front of an interpolated value used to be
// checked here, scoped to `demo` because `demo` was what had been audited. It
// lives in check:messages now (#182): the rule is Italian's, not this
// dashboard's, and the whole catalogue is swept instead of one namespace.

// ── The shape the page's controls are built on ─────────────────────────────
// Both frames are drawn by one pair of charts, so every item in either has to
// carry the same fields, and every band has to exist in every item — a stacked
// bar with a hole in it is a bar that silently stops at 80%.
for (const [frame, items] of [['competencies', cc.competencies], ['framework', cc.framework]]) {
  for (const [id, item] of Object.entries(items)) {
    assert.equal(typeof item.mean, 'number', `${frame}.${id} has no mean.`);
    assert.deepEqual(
      Object.keys(item.bands).sort(),
      [...BANDS].sort(),
      `${frame}.${id} does not carry the same five bands as the rest.`,
    );
  }
}
// frames.options names the two frames by their size — "Four competencies",
// "Nine detailed areas" — and frames.body repeats both counts.
assert.equal(COMPETENCIES.length, 4, `${COMPETENCIES.length} competencies; the copy says four.`);
assert.equal(FRAMEWORK.length, 9, `${FRAMEWORK.length} detailed areas; the copy says nine.`);

// Every competency in the pills must have behaviours to draw.
for (const c of COMPETENCIES) {
  assert.ok(
    Object.keys(cc.drivers[c] ?? {}).length > 0,
    `${c} is selectable in the competency pills but has no behaviours under it.`,
  );
}

// ── Shares are shares ──────────────────────────────────────────────────────
const sums = (name, values) => {
  const total = sum(values);
  assert.ok(Math.abs(total - 100) <= 0.5, `${name} sums to ${total.toFixed(1)}, not 100.`);
};
sums('skillMatching.distribution', [...cc.skillMatching.distribution]);
sums('mobility', Object.values(cc.mobility));
sums('growth', Object.values(cc.growth));
for (const [frame, items] of [['competencies', cc.competencies], ['framework', cc.framework]]) {
  for (const [id, item] of Object.entries(items)) sums(`${frame}.${id}.bands`, Object.values(item.bands));
}

// preferredAreas is the exception, and the page says so twice — in `areas.body`
// and in the how-to-read entry. If it ever did sum to 100 those two paragraphs
// would be explaining something that is no longer true.
const areasTotal = sum(Object.values(cc.preferredAreas));
assert.ok(
  areasTotal > 110,
  `preferredAreas sums to ${areasTotal.toFixed(1)}. The page explains at length why it is not a ` +
    'split of the population; at this total it reads as one.',
);

// ── The extract is frozen ──────────────────────────────────────────────────
// Same call as check-demo-sales-network, on the same criterion: this page
// renders numbers it says nothing about. Fifty-eight framework means, band
// shares and behaviour scores are drawn and never named, so no rule derived
// from the copy can pin them. On a legitimate refresh, update the digest — and
// re-read the copy, because the assertions below are what say which sentences
// the new numbers broke.
const DIGEST = 'cff005ddb997e69c730b90ecd579613a125f4cb2dedaf0775030b7ed920103a8';
const digest = createHash('sha256').update(JSON.stringify(cc)).digest('hex');
assert.equal(
  digest,
  DIGEST,
  'data/demo/cross-country.ts has changed. If that was deliberate, put the new digest in this ' +
    `file (${digest}) and check every claim below against the new numbers.`,
);

// ── The scales hold ────────────────────────────────────────────────────────
for (const [name, value] of [
  ['population.evaluatedPct', cc.population.evaluatedPct],
  ...Object.entries(cc.mobility).map(([k, v]) => [`mobility.${k}`, v]),
  ...Object.entries(cc.growth).map(([k, v]) => [`growth.${k}`, v]),
  ...Object.entries(cc.preferredAreas).map(([k, v]) => [`preferredAreas.${k}`, v]),
  ...cc.skillMatching.distribution.map((v, i) => [`skillMatching.distribution[${i}]`, v]),
]) {
  assert.ok(value >= 0 && value <= 100, `${name} is ${value}, which the page prints as a percent.`);
}

// A competency's score is the mean of its behaviours. Not "inside their range":
// that only catches a behaviour moving inward, which is the half that distorts
// nothing (#170). Here the two agree to two decimals, so the tolerance is tight.
for (const [c, behaviours] of Object.entries(cc.drivers)) {
  const computed = mean(Object.values(behaviours));
  assert.ok(
    Math.abs(computed - cc.competencies[c].mean) <= 0.01,
    `${c} scores ${cc.competencies[c].mean} but its behaviours average ${computed.toFixed(3)}. ` +
      'drivers.body tells the reader the second is the first.',
  );
}

// ── The headline figures the copy quotes ───────────────────────────────────
// The three groups are the whole evaluated population, split.
assert.equal(
  sum(GROUPS.map((g) => cc.countryGroups[g].n)),
  cc.population.evaluated,
  'The country groups no longer add up to the evaluated population.',
);
assert.ok(
  cc.population.evaluated < cc.population.invited,
  'Everyone invited completed the assessment; population.completion describes a gap that is gone.',
);

// ── The sentences the page argues, against the numbers it argues them from ──

// matching.body: the bar "falls almost exactly in the middle of this
// population". This is the page refusing both overclaims — neither "the
// population is below the bar" nor the reverse.
const { distribution, threshold, binWidth } = cc.skillMatching;
const below = sum(distribution.slice(0, threshold / binWidth));
assert.ok(
  below > 40 && below < 60,
  `${below.toFixed(1)}% sit below the bar. matching.body says it falls almost exactly in the ` +
    'middle, which at this split it does not.',
);
// matching.mean and .median are printed side by side as if they agree.
assert.ok(
  Math.abs(cc.skillMatching.mean - cc.skillMatching.median) <= 1,
  'The mean and the median have separated; the page shows them together without comment.',
);

// The three headline figures in .stat-value are the first numbers a reader
// sees, so they get rules rather than only the digest: "the page draws it and
// never names it" is the case for pinning a value, and it does not apply to
// something printed at 44px with a label under it.
//
// The completion rate against its own two headcounts — inside the window the
// rounding can produce, not to two decimal places.
//
// The headcounts are rounded to the nearest five and the percentage is computed
// on the true figures, which is what `population.rounding` spends a paragraph
// telling the reader. A rule demanding the two divide exactly would contradict
// that paragraph, and would go red on a refresh with a message the page itself
// disproves — teaching whoever meets it that the gate is the thing that is
// wrong. So the bound is derived from the rounding rather than picked: the true
// ratio cannot be outside what these two counts allow.
const ROUNDING = 5;
const widest = ((cc.population.evaluated + ROUNDING / 2) / (cc.population.invited - ROUNDING / 2)) * 100;
const narrowest = ((cc.population.evaluated - ROUNDING / 2) / (cc.population.invited + ROUNDING / 2)) * 100;
assert.ok(
  cc.population.evaluatedPct >= narrowest && cc.population.evaluatedPct <= widest,
  `population.evaluatedPct is ${cc.population.evaluatedPct}, outside the ` +
    `${narrowest.toFixed(1)}-${widest.toFixed(1)} the two headcounts allow once their rounding to ` +
    `the nearest ${ROUNDING} is taken into account. All three figures are on screen together.`,
);
// The mean against the distribution drawn under it, from the bin midpoints.
const binMean =
  sum(
    distribution.map((share, i) => share * (i * binWidth + binWidth / 2)),
  ) / 100;
assert.ok(
  Math.abs(binMean - cc.skillMatching.mean) <= 0.5,
  `The distribution averages ${binMean.toFixed(2)} but skillMatching.mean says ` +
    `${cc.skillMatching.mean}. The chart and the number above it disagree.`,
);
// And the median inside the band where the distribution crosses halfway.
let cumulative = 0;
const medianBin = distribution.findIndex((share) => (cumulative += share) >= 50);
assert.ok(
  cc.skillMatching.median >= medianBin * binWidth &&
    cc.skillMatching.median <= (medianBin + 1) * binWidth,
  `skillMatching.median is ${cc.skillMatching.median}, outside the ` +
    `${medianBin * binWidth}-${(medianBin + 1) * binWidth} band where the distribution crosses half.`,
);

// groups.caption: the three means are within a few points, and the highest
// scoring group is also the smallest.
const matchings = GROUPS.map((g) => cc.countryGroups[g].skillMatching);
const spread = Math.max(...matchings) - Math.min(...matchings);
assert.ok(
  spread < 10,
  `The group means spread over ${spread.toFixed(1)} points. groups.caption calls that narrow.`,
);
// "the group scoring highest is also the smallest" — assert that, not the
// weaker "highest is not the largest" it used to say. With three groups those
// come apart on the middle one: moving `others` up by 3.7, less than the 5.2
// spread the page prints itself, made the sentence false and left this green.
const best = GROUPS.reduce((a, b) =>
  cc.countryGroups[b].skillMatching > cc.countryGroups[a].skillMatching ? b : a,
);
const smallest = GROUPS.reduce((a, b) => (cc.countryGroups[b].n < cc.countryGroups[a].n ? b : a));
assert.equal(
  best,
  smallest,
  `The highest-scoring group is '${best}' and the smallest is '${smallest}'; groups.caption says ` +
    'they are the same one.',
);
// howToRead.groups: "they differ in size by a factor of eight".
const sizeRatio =
  Math.max(...GROUPS.map((g) => cc.countryGroups[g].n)) /
  Math.min(...GROUPS.map((g) => cc.countryGroups[g].n));
assert.ok(
  sizeRatio > 8,
  `The largest group is ${sizeRatio.toFixed(1)} times the smallest. Two paragraphs say more than ` +
    'eight — an earlier draft said "eight times", which at 8.67 was the sentence rounding in its ' +
    'own favour.',
);

// frames.means.caption: the four competencies land close together and the nine
// areas spread much wider. That contrast is the section's argument.
const narrow = spreadOf(cc.competencies);
const wide = spreadOf(cc.framework);
assert.ok(
  wide > narrow * 2,
  `The competencies spread over ${narrow.toFixed(2)} and the detailed areas over ` +
    `${wide.toFixed(2)}. frames.means.caption is written around the second being much wider.`,
);

// drivers.caption: the behaviours under one competency spread wider than the
// competencies spread among themselves.
// "The behaviours under one competency" is every competency, not the widest
// one, so every one of them has to clear it.
const tightest = Math.min(
  ...Object.values(cc.drivers).map((b) => {
    const values = Object.values(b);
    return Math.max(...values) - Math.min(...values);
  }),
);
assert.ok(
  tightest > narrow,
  `The tightest competency spreads its behaviours over ${tightest.toFixed(2)}, against ` +
    `${narrow.toFixed(2)} between the competencies. drivers.caption says that of any of them, ` +
    'not just of the widest.',
);

// mobility.body and mobility.caption: the outright yes is small, the middle is
// several times its size, and folding the two together is the overclaim the
// page refuses by name.
const yes = cc.mobility.veryWilling + cc.mobility.willing;
const maybe = cc.mobility.openToConsidering;
assert.ok(
  (yes + maybe) / yes > 4,
  `Folding the middle in would take ${yes.toFixed(1)}% to ${(yes + maybe).toFixed(1)}%, a factor ` +
    `of ${((yes + maybe) / yes).toFixed(1)}. mobility.caption says more than four.`,
);
assert.ok(
  yes < 25,
  `${yes.toFixed(1)}% say yes outright. The section is written around that being a small share.`,
);

// The same rule, in the other direction, and it is here because the page did
// not have it: `somewhatReluctant` was being added to `notInterested` and
// called the no — the identical aggregation the paragraph above refuses on the
// yes side, in the same sentence. Guarding one end and not the other is how it
// got through, so both ends are guarded now.
const no = cc.mobility.notInterested;
const reluctant = cc.mobility.somewhatReluctant;
// Two-sided, because "by half again" is a ratio and not a floor. One-sided at
// 1.4 this survived a constant-sum redistribution — notInterested 21.8 to 15.0
// and somewhatReluctant 11.0 to 17.8 gives 2.19 — and since these five shares
// must total 100, a constant-sum redistribution is the only shape a refresh of
// this field can take. The uncovered side was the only one that could happen.
const inflation = (no + reluctant) / no;
assert.ok(
  inflation > 1.4 && inflation < 1.6,
  `Folding reluctance into the no would take ${no}% to ${(no + reluctant).toFixed(1)}%, a factor ` +
    `of ${inflation.toFixed(2)}. mobility.caption says half again, which is 1.5.`,
);
// Neither end may claim the middle, because the middle is most of the
// population — which is the fact both halves of the caption rest on.
assert.ok(
  cc.mobility.openToConsidering + reluctant > 50,
  `The two middle answers hold ${(cc.mobility.openToConsidering + reluctant).toFixed(1)}%. The ` +
    'section is written around the middle being where most of the population is.',
);

// growth.caption: fewer than three in ten want to manage a team, and it is not
// the largest of the three real answers.
assert.ok(
  cc.growth.teamManagement < 30,
  `${cc.growth.teamManagement}% want to manage a team; growth.caption says fewer than three in ten.`,
);
const topGrowth = Object.entries(cc.growth)
  .filter(([k]) => k !== 'noPreference')
  .reduce((a, b) => (b[1] > a[1] ? b : a))[0];
assert.notEqual(
  topGrowth,
  'teamManagement',
  'Managing a team is now the most wanted direction; growth.body says the largest is not the one ' +
    'an org chart would predict.',
);

// areas.body: two areas are each named by more than half, which is only
// possible under a multi-select question.
const namedByHalf = Object.values(cc.preferredAreas).filter((v) => v > 50).length;
assert.equal(
  namedByHalf,
  2,
  `${namedByHalf} areas are named by more than half the population; areas.caption says two.`,
);

function spreadOf(frame) {
  const means = Object.values(frame).map((v) => v.mean);
  return Math.max(...means) - Math.min(...means);
}

console.log(`[OK] demo cross country: extract pinned by digest (every value, no meaning)`);
console.log(
  `[OK] demo cross country: ${COMPETENCIES.length + FRAMEWORK.length + DRIVERS.length} composed ` +
    'labels, and every claim the copy makes still true of the data',
);
