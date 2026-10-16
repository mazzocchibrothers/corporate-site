import assert from 'node:assert/strict';
import { MODULES, SCENARIOS, LICENSE, calculate, normalizeInput } from '../app/[locale]/resources/roi-calculator/model.ts';

const expected = { hiring: 275_000, promote: 640_000, develop: 270_000, derisk: 260_000 };
for (const [module, config] of Object.entries(MODULES)) {
  const inputs = config.inputs.map((input) => input.initial);
  for (const [scenario, multiplier] of Object.entries(SCENARIOS)) {
    const result = calculate(module, ...inputs, scenario);
    assert.ok(Math.abs(result.total - expected[module] * multiplier) < 1e-6, `${module}/${scenario}: prototype parity`);
    assert.equal(result.total, result.hard + result.soft);
    assert.equal(result.roi, (result.total - LICENSE) / LICENSE * 100);
    assert.ok(Math.abs(result.payback - LICENSE * 12 / result.total) < 1e-9);
  }
  const minimum = calculate(module, ...config.inputs.map((input) => input.min), 'base');
  assert.ok(minimum.total < LICENSE, `${module}: low-volume fit message must be reachable`);
  for (const input of config.inputs) {
    assert.equal(normalizeInput(-1, input), input.min);
    assert.equal(normalizeInput(input.max * 2, input), input.max);
    assert.equal(normalizeInput(NaN, input), input.initial);
    assert.equal(normalizeInput(input.min + input.step * 0.6, input), input.min + input.step);
  }
}
assert.equal(calculate('hiring', 300, 50_000, 'base').hard, 225_000,
  'Hiring failure reduction is relative to a 15% baseline, not ten percentage points');
console.log('[OK] ROI calculator: all modules/scenarios match prototype; inputs clamp and snap');

const { reportSubmission } = await import('../app/[locale]/resources/roi-calculator/report-submission.ts');
const details = { name: ' Test Name ', email: ' test@example.invalid ', message: 'Company: Test Co\nIndustry: Retail', consent: true,
  consentText: 'Marketing consent', processingText: 'Processing consent', pageUri: 'https://www.skillvue.ai/resources/roi-calculator', pageName: 'ROI' };
assert.throws(() => reportSubmission({ ...details, consent: false }), /Consent required/);
const submission = reportSubmission(details);
assert.deepEqual(submission.fields, [
  { name: 'firstname', value: 'Test Name' },
  { name: 'email', value: 'test@example.invalid' },
  { name: 'message', value: details.message },
]);
assert.deepEqual(submission.legalConsentOptions, { consent: {
  consentToProcess: true, text: details.processingText,
  communications: [{ value: true, subscriptionTypeId: 527104760, text: details.consentText }],
} });
assert.equal(submission.context.pageUri, details.pageUri);
assert.equal('skipValidation' in submission, false);
console.log('[OK] ROI form: consent required, existing HubSpot fields, correct subscription, no skipped validation');
