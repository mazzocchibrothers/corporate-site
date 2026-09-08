import assert from 'node:assert/strict';
import {
  CAROUSEL_CLICK_SUPPRESS_THRESHOLD,
  shouldSuppressCarouselClick,
  wrapCarouselOffset,
} from '../components/customers/talent-pioneers-carousel.ts';

assert.equal(wrapCarouselOffset(345, 340), 5);
assert.equal(wrapCarouselOffset(-5, 340), 335);
assert.equal(wrapCarouselOffset(12, 0), 12, 'an unmeasured track must not jump');
assert.equal(shouldSuppressCarouselClick(CAROUSEL_CLICK_SUPPRESS_THRESHOLD), false);
assert.equal(shouldSuppressCarouselClick(CAROUSEL_CLICK_SUPPRESS_THRESHOLD + 1), true);

console.log('[OK] Talent Pioneers carousel offset and drag threshold');
