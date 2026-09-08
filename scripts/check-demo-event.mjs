// check-demo-event — the GTM payload a demo page pushes when it opens.
//
// The `?c=<token>` in a demo link is the only thing that says which prospect
// opened which dashboard, and it fails quietly: a token dropped on the way
// into the dataLayer leaves a `demo_view` event that still fires, still counts,
// and no longer answers the one question the link exists to answer. Nothing on
// the page looks wrong either way.
//
// Node 24 runs the TypeScript directly, so this asserts against the function
// components/demo/DemoView.tsx pushes with — not a second copy of the rule.
//
// Run: npm run check:demo-event

import assert from 'node:assert/strict';
import { demoViewEvent } from '../components/demo/track.ts';

assert.deepEqual(
  demoViewEvent('retail', '?c=test-123'),
  { event: 'demo_view', demoSlug: 'retail', demoContact: 'test-123' },
  'the token rides along with the slug of the dashboard that was opened',
);

// The link shared in a deck, or forwarded by the prospect: no token, and the
// key is absent rather than empty. In GTM an empty string is a value, and a
// trigger conditioned on the token would fire for every anonymous visit.
assert.deepEqual(
  demoViewEvent('hub', ''),
  { event: 'demo_view', demoSlug: 'hub' },
  'no query string means no contact key at all',
);
assert.deepEqual(demoViewEvent('hub', '?c='), { event: 'demo_view', demoSlug: 'hub' }, 'an empty token is no token');
assert.deepEqual(demoViewEvent('hub', '?c=%20%20'), { event: 'demo_view', demoSlug: 'hub' }, 'a blank token is no token');
assert.deepEqual(
  demoViewEvent('hub', '?utm_source=nl'),
  { event: 'demo_view', demoSlug: 'hub' },
  'another parameter is not the token',
);

// The token travels through a mail client, so it arrives percent-encoded and
// in company of whatever the tracker appended.
assert.equal(
  demoViewEvent('retail', '?utm_source=nl&c=acme%20corp&utm_medium=email').demoContact,
  'acme corp',
  'the token is decoded, and found wherever in the query string it sits',
);

console.log('[OK] demo event: slug and ?c= token, present and absent');
