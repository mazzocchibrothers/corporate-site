// The logic behind /lp/safety-behaviour-assessment: the figures that count up
// and the report read against a role. Both are illustrations a visitor reads
// as fact, so a wrong separator or a miscounted "8/9" is a visible error.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { groupFigure, splitFigure } from '../components/landing/sba/count-up.ts';
import { EXPECTED, KINDS, MEASURED, inLine } from '../components/landing/sba/role-report.ts';

// ── Figures: each locale keeps its own thousands separator ──
assert.deepEqual(splitFigure('416.000'), { n: 416000, rest: '', sep: '.' });
assert.deepEqual(splitFigure('416,000'), { n: 416000, rest: '', sep: ',' });
assert.deepEqual(splitFigure('4.000 miliardi'), { n: 4000, rest: ' miliardi', sep: '.' });
assert.deepEqual(splitFigure('4,000 billion'), { n: 4000, rest: ' billion', sep: ',' });
assert.deepEqual(splitFigure('255'), { n: 255, rest: '', sep: '.' });
assert.equal(groupFigure(416000, '.'), '416.000');
assert.equal(groupFigure(1085, ','), '1,085');
assert.equal(groupFigure(45, '.'), '45');
// Degradation: a value with no leading number is shown as it is.
assert.deepEqual(splitFigure('n/d'), { n: 0, rest: 'n/d', sep: '.' });

// Every figure in both catalogues round-trips to itself once the count ends.
for (const locale of ['it', 'en']) {
  const impact = JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8')).lp['safety-behaviour-assessment'].impact;
  for (const { value } of [...impact.italy, ...impact.cost]) {
    const { n, rest, sep } = splitFigure(value);
    assert.ok(n > 0, `${locale}: "${value}" has no number to count`);
    assert.equal(groupFigure(n, sep) + rest, value, `${locale}: "${value}" does not land on itself`);
  }
}

// ── The role report: a floor for enablers and the accelerator, a ceiling for drifts ──
assert.equal(inLine('enabler', 3, 3), true);
assert.equal(inLine('enabler', 2, 3), false);
assert.equal(inLine('drift', 2, 3), true, 'less of a drift is better');
assert.equal(inLine('drift', 4, 3), false);

const count = (role) => KINDS.filter((k, i) => inLine(k, MEASURED[i], EXPECTED[role][i])).length;
assert.equal(count(0), 8, 'line operator: 8 of 9 in line');
assert.equal(count(1), 6, 'shift supervisor: 6 of 9 in line');

// One level per behaviour, for the person and for every role, in both locales.
for (const locale of ['it', 'en']) {
  const ns = JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8')).lp['safety-behaviour-assessment'];
  const behaviours = ns.framework.columns.flatMap((c) => c.items).length;
  assert.equal(KINDS.length, behaviours, `${locale}: a kind per behaviour`);
  assert.equal(MEASURED.length, behaviours, `${locale}: a measured level per behaviour`);
  assert.equal(EXPECTED.length, ns.reporting.individual.roles.length, `${locale}: a profile per role`);
  for (const row of EXPECTED) assert.equal(row.length, behaviours, `${locale}: an expected level per behaviour`);
}
for (const v of [...MEASURED, ...EXPECTED.flat()]) assert.ok(v >= 1 && v <= 5, `level ${v} is off the 1–5 scale`);

console.log('[OK] Safety Behaviour Assessment: figures count in both locales, role report reads 8/9 and 6/9');
