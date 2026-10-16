// check-booking-link — the campaign CTA carries the visitor's `v` through.
//
// The `v` in the landing-page URL is the only record of which email list a
// visitor came from. Dropped on the way to the booking page, the meeting still
// gets booked and the campaign report silently loses its source.
//
// Run: npm run check:booking-link

import assert from 'node:assert/strict';
import { bookingHref } from '../components/landing/booking-link.ts';

const BASE = 'https://meetings.example.com/skillvue/intro';

assert.equal(bookingHref(BASE, ''), BASE, 'no v, no change');
assert.equal(bookingHref(BASE, '?utm_source=x'), BASE, 'other params are not forwarded');
assert.equal(bookingHref(BASE, '?v=hr-list-2'), `${BASE}?v=hr-list-2`);
assert.equal(bookingHref(`${BASE}?embed=1`, '?v=a'), `${BASE}?embed=1&v=a`, 'appends to an existing query');
assert.equal(bookingHref(`${BASE}#book`, '?v=a'), `${BASE}?v=a#book`, 'the param goes before the hash');
assert.equal(bookingHref(BASE, '?v=a%20b%26c'), `${BASE}?v=a%20b%26c`, 'the value stays encoded');
assert.equal(bookingHref('{{BOOKING_URL}}', '?v=a'), '{{BOOKING_URL}}?v=a', 'a placeholder base does not throw');

console.log('[OK] booking link forwards v');
