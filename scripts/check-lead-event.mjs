// check-lead-event — every HubSpot form tells GA it produced a lead.
//
// A form that submits without trackLead() still works: HubSpot gets the
// contact, the visitor sees the thank-you. Only the conversion is missing, and
// nothing on the page says so — which is how the whole site came to report no
// leads to GA at all.
//
// Run: npm run check:lead-event

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

// Not lead forms: they log a download against a contact already known from a
// newsletter link, and track it themselves as `lp_download`.
const NOT_LEADS = new Set([
  'app/[locale]/lp/supermarkets/body.tsx',
  'app/[locale]/lp/ai-competency-newsletter/body.tsx',
]);

const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : /\.tsx?$/.test(e.name) ? [join(dir, e.name)] : [],
  );

const forms = [...files('app'), ...files('components')].filter(
  (f) => !NOT_LEADS.has(f) && /hbspt\)?\.forms\.create\(|submissions\/v3\/integration\/submit/.test(readFileSync(f, 'utf8')),
);
const untracked = forms.filter((f) => !readFileSync(f, 'utf8').includes('trackLead('));

assert.deepEqual(
  untracked,
  [],
  `${untracked.length} HubSpot form(s) never call trackLead():\n${untracked.map((f) => '  ' + f).join('\n')}\n` +
    'Call it from onFormSubmitted, or after the submit request succeeds.',
);

console.log(`[OK] lead event: ${forms.length} HubSpot forms push generate_lead`);
