import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const baseURL = process.env.SMOKE_BASE_URL ?? 'http://localhost:3000';
const browser = await chromium.launch({ headless: true });
const visit = (page, path) => page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });

try {
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  desktop.setDefaultNavigationTimeout(10_000);
  for (const path of ['/', '/blog/social-skills', '/it/clienti/adr']) {
    const response = await visit(desktop, path);
    assert.equal(response?.status(), 200, `${path} should render`);
  }

  await desktop.context().clearCookies();
  await visit(desktop, '/');
  await desktop.waitForTimeout(1_000);
  const solutions = desktop.locator('#desktop-trigger-solutions');
  await solutions.focus();
  await desktop.waitForFunction(() => document.querySelector('#desktop-trigger-solutions')?.getAttribute('aria-expanded') === 'true', undefined, { timeout: 10_000 });
  const destination = desktop.locator('[data-testid="mega-talentAcquisition"]');
  await destination.focus();
  await Promise.all([
    desktop.waitForURL('**/solutions/talent-acquisition'),
    desktop.keyboard.press('Enter'),
  ]);

  await desktop.getByRole('button', { name: 'IT', exact: true }).click();
  await desktop.waitForURL(/\/it\//);
  await desktop.getByRole('button', { name: 'EN', exact: true }).click();
  await desktop.waitForURL('**/solutions/talent-acquisition');

  // The homepage specifically, landed on directly — a shared /it link, not a
  // client-side switch into it. proxy.ts runs locale detection only on '/',
  // reading the NEXT_LOCALE cookie next-intl's middleware sets on every visit;
  // arriving straight at /it leaves that cookie at 'it'. Switching to English
  // then pushes to '/', which is the one path detection still applies to:
  // without the switcher syncing the cookie itself, detection reads the stale
  // 'it' value and immediately redirects back to /it, and the button does
  // nothing. A prior client-side visit to '/' would prefetch it and mask this
  // — the RSC cache serves the switch without a live request through the
  // middleware — so this needs a fresh page landing on /it as its first hit.
  const italian = await browser.newPage();
  await visit(italian, '/it');
  await italian.getByRole('button', { name: 'EN', exact: true }).click();
  await italian.waitForFunction(() => location.pathname === '/', undefined, { timeout: 5_000 });
  await italian.close();

  // The Credem card in the customer listing. Two things can break here without
  // a single request going red: the card's headline is a catalogue key of its
  // own (customers.explore.stories.credem), separate from the story page's
  // copy, so a missing one renders the key path as visible text; and the card
  // builds its href from the active locale, so an English path on the Italian
  // listing still navigates — to a URL with no Italian page behind it.
  const listing = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  listing.setDefaultNavigationTimeout(10_000);

  for (const [path, headline] of [
    ['/customers', /^Gruppo Credem: how to find the best talent among 30,000 applications/],
    ['/it/clienti', /^Gruppo Credem: come trovare i migliori talenti tra 30\.000 candidature/],
  ]) {
    const response = await visit(listing, path);
    assert.equal(response?.status(), 200, `${path} should render`);
    const credem = listing.getByTestId('story-credem');
    await credem.scrollIntoViewIfNeeded({ timeout: 10_000 });
    // <Reveal> renders at opacity 0 and flips it in a useEffect, so an opaque
    // card is both the visibility assertion and the proof that the component
    // hydrated — which is what attached the onClick the click below needs.
    await listing.waitForFunction(
      () => getComputedStyle(document.querySelector('[data-testid="story-credem"]')).opacity === '1',
      undefined,
      { timeout: 10_000 },
    );
    assert.match(await credem.locator('h3').innerText(), headline, `${path} should show the Credem headline from the catalogue`);
  }

  // Still on the Italian listing, so the card has to reach the Italian story.
  await Promise.all([
    listing.waitForURL('**/clienti/credem'),
    listing.getByTestId('story-credem').click(),
  ]);
  assert.match(await listing.locator('h1').innerText(), /^Gruppo Credem/, 'the Credem card should open the Italian story');
  await listing.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.setDefaultNavigationTimeout(10_000);
  await visit(mobile, '/');
  const toggle = mobile.getByTestId('mobile-menu-toggle');
  await toggle.click();
  await mobile.getByRole('dialog', { name: 'Menu' }).waitFor();
  await mobile.keyboard.press('Escape');
  await mobile.getByRole('dialog', { name: 'Menu' }).waitFor({ state: 'detached' });
  assert.equal(await mobile.evaluate(() => document.activeElement?.getAttribute('data-testid')), 'mobile-menu-toggle');
} finally {
  await browser.close();
}

console.log('[OK] browser smoke: navigation, locale, customer listing and mobile menu');
