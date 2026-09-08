// check-demo-sales-network — the sales network dashboard's labels exist, and
// its copy still describes the data underneath it.
//
// Same two gaps as check-demo-retail, and the same reason for closing them.
//
// Every label on that page is fetched with a composed key — t(`skills.${k}`),
// t(`drivers.${d}`), t(`quadrants.items.${q}.name`) — and check:i18n only reads
// string literals, so none of them is checked by anything else. The ids come
// from the data and are matched against both catalogues in both directions.
//
// And the page argues about its own numbers: that more than nine in ten sit at
// base or above, that one soft skill and two knowledge areas are shared between
// the families, that a family's soft score is the average of its own
// competencies, that the behaviours inside one competency spread more than a
// point. Each of those is asserted against the figure it describes, derived
// from the data rather than copied out of it, so a refreshed extract cannot
// leave a sentence on the page mentioning a number that has moved.
//
// Run: npm run check:demo-sales-network

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { salesNetwork: sn } = await import(
  pathToFileURL(join(ROOT, 'data/demo/sales-network.ts')).href
);

const catalogues = Object.fromEntries(
  ['en', 'it'].map((l) => [
    l,
    JSON.parse(readFileSync(join(ROOT, `messages/${l}.json`), 'utf8')).demo['sales-network'],
  ]),
);

const at = (catalogue, path) =>
  path.split('.').reduce((node, seg) => (node == null ? undefined : node[seg]), catalogue);

const missing = [];
const label = (path) => {
  for (const locale of ['en', 'it']) {
    if (typeof at(catalogues[locale], path) !== 'string') {
      missing.push(`  ${locale}: demo.sales-network.${path}`);
    }
  }
};

const FAMILIES = Object.keys(sn.families);
const SOFT = Object.keys(sn.soft);
const HARD = Object.keys(sn.hard);
const DRIVERS = [...new Set(Object.values(sn.drivers).flatMap((d) => Object.keys(d)))];

// ── Every composed key the page builds ─────────────────────────────────────
for (const f of FAMILIES) label(`families.names.${f}`);
for (const row of ['people', 'skillMatching', 'soft', 'hard']) label(`families.labels.${row}`);
for (const b of Object.keys(sn.bands)) label(`bands.items.${b}`);
for (const s of SOFT) label(`skills.${s}`);
for (const h of HARD) label(`knowledge.${h}`);
for (const d of DRIVERS) label(`drivers.${d}`);
for (const q of Object.keys(sn.quadrants)) {
  label(`quadrants.items.${q}.name`);
  label(`quadrants.items.${q}.description`);
}
for (const card of ['assessed', 'conversion', 'matchingMean', 'matchingMedian']) {
  label(`population.${card}.label`);
  label(`population.${card}.note`);
}
// The quadrant cells pick their side of each threshold with a ternary inside
// t(), which check:i18n cannot read either.
for (const key of ['quadrants.high', 'quadrants.low', 'quadrants.axisSoft', 'quadrants.axisHard']) {
  label(key);
}
for (const panel of ['soft', 'hard', 'drivers']) {
  label(`profile.${panel}.series`);
  label(`profile.${panel}.ariaLabel`);
}

assert.deepEqual(
  missing,
  [],
  `${missing.length} label(s) the page composes have no message:\n${missing.join('\n')}\n` +
    'next-intl renders the key path when a key is missing, so this ships as literal ' +
    '"skills.strategicThinking" where the bar\'s name should be.',
);

// The other direction: a label for a competency, area or behaviour the extract
// no longer holds is copy that renders nowhere and still asks to be translated.
const stale = [
  ...Object.keys(catalogues.en.skills).filter((k) => !SOFT.includes(k)).map((k) => `  skills.${k}`),
  ...Object.keys(catalogues.en.knowledge).filter((k) => !HARD.includes(k)).map((k) => `  knowledge.${k}`),
  ...Object.keys(catalogues.en.drivers).filter((k) => !DRIVERS.includes(k)).map((k) => `  drivers.${k}`),
];
assert.deepEqual(stale, [], `Labels with nothing behind them:\n${stale.join('\n')}`);

// ── The shape the page's controls are built on ─────────────────────────────
// The family selector redraws three panels from per-family lists. A family with
// no competencies, or a competency with no behaviours under it, is an empty
// chart rather than a missing one — nothing else would say so.
const keysFor = (source, family) => Object.keys(source).filter((k) => source[k][family] !== undefined);
for (const family of FAMILIES) {
  const soft = keysFor(sn.soft, family);
  const hard = keysFor(sn.hard, family);
  assert.ok(soft.length > 0, `family ${family} has no soft skills — the panel would draw empty.`);
  assert.ok(hard.length > 0, `family ${family} has no knowledge areas.`);
  for (const skill of soft) {
    const drivers = Object.keys(sn.drivers[skill] ?? {}).filter((d) => sn.drivers[skill][d][family] !== undefined);
    assert.ok(
      drivers.length > 0,
      `${family}/${skill} is selectable in the competency pills but has no behaviours under it.`,
    );
  }
}

// ── Shares are shares ──────────────────────────────────────────────────────
const sums = (name, values) => {
  const total = values.reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(total - 100) <= 0.5, `${name} sums to ${total}, not 100.`);
};
sums('bands', Object.values(sn.bands));
sums('quadrants', Object.values(sn.quadrants));

// ── The scales hold ────────────────────────────────────────────────────────
// Four structural rules, all of them things the page draws rather than says.
// They exist because a mutation test over every number in the extract found
// them uncovered: 37 of 76 single-number mutations left the gate green, and
// most of them were a bar drawn three times the height of its neighbours.

// A percentage is a percentage. `conversionPct` in particular is asserted
// nowhere else, on purpose — it is not the ratio of the rounded headcounts
// beside it — but it is still printed with a % sign after it.
for (const [name, value] of [
  ['funnel.conversionPct', sn.funnel.conversionPct],
  ['overview.aboveBothPct', sn.overview.aboveBothPct],
  ...Object.entries(sn.bands).map(([k, v]) => [`bands.${k}`, v]),
  ...Object.entries(sn.quadrants).map(([k, v]) => [`quadrants.${k}`, v]),
]) {
  assert.ok(value >= 0 && value <= 100, `${name} is ${value}, which the page prints as a percent.`);
}

// Skill matching is a 0-100 score, printed bare rather than with a % sign, and
// the network mean is bracketed by the families below — so raising one family
// on its own only widens the bracket and slips through that check.
for (const [name, value] of [
  ['overview.skillMatchingMean', sn.overview.skillMatchingMean],
  ['overview.skillMatchingMedian', sn.overview.skillMatchingMedian],
  ...FAMILIES.map((f) => [`families.${f}.skillMatching`, sn.families[f].skillMatching]),
]) {
  assert.ok(value >= 0 && value <= 100, `${name} is ${value}, off the 0-100 skill matching scale.`);
}

// A competency's score is an aggregate of its own behaviours, so it tracks
// their mean. Not equal to it — the aggregate is weighted, and across the eight
// competencies here the score runs up to 0.23 under the plain mean — but a
// behaviour that wanders off the scale drags the mean away from the score it
// belongs to, and that is what keeps one bar from being drawn three times the
// height of the chart it shares. Asserting the range instead would only catch
// a behaviour moving inward, which is the half that does not distort anything.
const DRIVER_TOLERANCE = 0.3;
for (const [skill, behaviours] of Object.entries(sn.drivers)) {
  for (const family of FAMILIES) {
    const scores = Object.values(behaviours).map((b) => b[family]).filter((v) => v !== undefined);
    if (scores.length === 0) continue;
    const score = sn.soft[skill][family];
    const driverMean = scores.reduce((a, b) => a + b, 0) / scores.length;
    assert.ok(
      Math.abs(score - driverMean) <= DRIVER_TOLERANCE,
      `${family}/${skill} scores ${score} but its behaviours average ` +
        `${driverMean.toFixed(2)}. One of the two is on a different scale from the other.`,
    );
  }
}

// A network mean sits between the family means it is made of.
for (const [name, network, field] of [
  ['softMean', sn.overview.softMean, 'soft'],
  ['hardMean', sn.overview.hardMean, 'hard'],
  ['skillMatchingMean', sn.overview.skillMatchingMean, 'skillMatching'],
]) {
  const perFamily = FAMILIES.map((f) => sn.families[f][field]);
  assert.ok(
    network >= Math.min(...perFamily) - 0.5 && network <= Math.max(...perFamily) + 0.5,
    `overview.${name} is ${network}, outside the family range ` +
      `(${Math.min(...perFamily)}-${Math.max(...perFamily)}).`,
  );
}

// A threshold has to fall somewhere the scores actually are, or the quadrant
// shares below it describe a population that cannot exist. The soft bar sits
// inside the observed soft scores; the hard bar is under every family's mean,
// which is what makes nine in ten of them clear it.
const softScores = SOFT.flatMap((k) => FAMILIES.map((f) => sn.soft[k][f]).filter((v) => v !== undefined));
assert.ok(
  sn.overview.softThreshold > Math.min(...softScores) &&
    sn.overview.softThreshold < Math.max(...softScores),
  `softThreshold ${sn.overview.softThreshold} is outside the observed soft scores ` +
    `(${Math.min(...softScores)}-${Math.max(...softScores)}), so no one would fall either side of it.`,
);
assert.ok(
  FAMILIES.every((f) => sn.families[f].hard > sn.overview.hardThreshold),
  `hardThreshold ${sn.overview.hardThreshold} is above a family mean, which contradicts the ` +
    `${(sn.quadrants.softHighHardHigh + sn.quadrants.softLowHardHigh).toFixed(1)}% the quadrants ` +
    'put above it.',
);

// ── The headline figures the copy quotes ───────────────────────────────────
// population.assessed.note says "out of {candidates} in scope, the remaining
// {notAssessed} did not complete".
assert.equal(
  sn.funnel.candidates,
  sn.funnel.assessed + sn.funnel.notAssessed,
  'candidates is no longer assessed + notAssessed, but population.assessed.note still says it is.',
);

// The page shows `interviews` nowhere, on purpose: it sits above `assessed`, so
// any funnel drawn from these three widens in the middle. This is the assertion
// that tells whoever refreshes the extract that the omission was a decision.
assert.ok(
  sn.funnel.interviews < sn.funnel.assessed,
  'interviews is no longer below assessed. The funnel was left off the page because it was — ' +
    'if the extract now descends, body.tsx can draw one and this assertion should go.',
);

// aboveBothPct and the top-right quadrant are the same population read twice.
assert.equal(
  sn.overview.aboveBothPct,
  sn.quadrants.softHighHardHigh,
  'overview.aboveBothPct and quadrants.softHighHardHigh disagree — the page presents them as ' +
    'the same group.',
);

// population.matchingMedian.note: "within half a point of the mean".
assert.ok(
  Math.abs(sn.overview.skillMatchingMedian - sn.overview.skillMatchingMean) <= 0.5,
  `The median is ${Math.abs(sn.overview.skillMatchingMedian - sn.overview.skillMatchingMean).toFixed(1)} ` +
    'from the mean. population.matchingMedian.note says half a point.',
);

// ── The sentences the page argues, against the numbers it argues them from ──

// bands.body: "more than nine in ten sit at base or above".
const atBaseOrAbove = sn.bands.base + sn.bands.good + sn.bands.high;
assert.ok(
  atBaseOrAbove > 90,
  `${atBaseOrAbove.toFixed(1)}% sit at base or above. bands.body says more than nine in ten.`,
);
// bands.caption: "the two middle bands hold most of the network".
assert.ok(
  sn.bands.base + sn.bands.good > 50,
  'The two middle bands no longer hold most of the network; bands.caption says they do.',
);

// families.coverage: the two published families do not cover the assessed total.
const covered = FAMILIES.reduce((sum, f) => sum + sn.families[f].n, 0);
assert.ok(
  covered < sn.funnel.assessed,
  'The published families now cover the whole assessed population. families.coverage explains ' +
    'a gap that would no longer exist.',
);

// families.overlap: "exactly one soft skill … and two of the knowledge areas".
const sharedSoft = SOFT.filter((k) => FAMILIES.every((f) => sn.soft[k][f] !== undefined));
const sharedHard = HARD.filter((k) => FAMILIES.every((f) => sn.hard[k][f] !== undefined));
assert.equal(sharedSoft.length, 1, `${sharedSoft.length} soft skills are shared, not 1 (${sharedSoft}).`);
assert.equal(sharedHard.length, 2, `${sharedHard.length} knowledge areas are shared, not 2 (${sharedHard}).`);

// profile.soft.caption: "the average of these is the family's soft skill score
// in the table above" — and the same for the knowledge areas.
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
for (const family of FAMILIES) {
  for (const [source, keys, field] of [
    [sn.soft, keysFor(sn.soft, family), 'soft'],
    [sn.hard, keysFor(sn.hard, family), 'hard'],
  ]) {
    const computed = mean(keys.map((k) => source[k][family]));
    assert.ok(
      Math.abs(computed - sn.families[family][field]) <= 0.05,
      `${family}.${field} is ${sn.families[family][field]} but its own areas average ` +
        `${computed.toFixed(2)}. profile.${field}.caption says the second is the first.`,
    );
  }
}

// profile.drivers.caption: "inside a single competency the behaviours can sit
// more than a point apart". `can`, so at least one must.
const spreads = Object.entries(sn.drivers).flatMap(([skill, behaviours]) =>
  FAMILIES.map((family) => {
    const scores = Object.values(behaviours).map((b) => b[family]).filter((v) => v !== undefined);
    return scores.length > 1 ? [`${family}/${skill}`, Math.max(...scores) - Math.min(...scores)] : null;
  }).filter(Boolean),
);
assert.ok(
  spreads.some(([, spread]) => spread > 1),
  'No competency has behaviours more than a point apart any more; profile.drivers.caption says ' +
    'they can be. Widest is ' + Math.max(...spreads.map(([, s]) => s)).toFixed(1) + '.',
);

// The quadrant descriptions name their groups by size: "half the network" on
// ready-on-both, "the smallest group" on behaviour-ahead, "the large group" on
// knowledge-ahead.
const bySize = Object.entries(sn.quadrants).sort((a, b) => b[1] - a[1]).map(([q]) => q);
assert.deepEqual(
  bySize,
  ['softHighHardHigh', 'softLowHardHigh', 'softLowHardLow', 'softHighHardLow'],
  'The quadrants have changed order by size, and quadrants.items.*.description names them by ' +
    `size: ${bySize.join(' > ')}.`,
);
assert.ok(
  sn.quadrants.softHighHardHigh >= 45 && sn.quadrants.softHighHardHigh <= 55,
  `Ready-on-both is ${sn.quadrants.softHighHardHigh}%; its description calls it half the network.`,
);

console.log(
  `[OK] demo sales network: ${SOFT.length + HARD.length + DRIVERS.length} composed labels across ` +
    `${FAMILIES.length} families, and every copy claim still true of the data`,
);
