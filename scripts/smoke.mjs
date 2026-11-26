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
    assert.match(await credem.locator('p').innerText(), headline, `${path} should show the Credem headline from the catalogue`);
  }

  // Still on the Italian listing, so the card has to reach the Italian story.
  await Promise.all([
    listing.waitForURL('**/clienti/credem'),
    listing.getByTestId('story-credem').click(),
  ]);
  assert.match(await listing.locator('h1').innerText(), /^Gruppo Credem/, 'the Credem card should open the Italian story');
  await listing.close();

  const roi = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const submissions = [];
  let rejectSubmission = true;
  // BotID's challenge script only exists on Vercel; without it the form's fetch waits forever.
  await roi.route('**/a-4-a/c.js*', (route) => route.fulfill({ contentType: 'text/javascript', body: 'window.V_C.push({ b: 1 })' }));
  await roi.route('**/api/roi-report', async (route) => {
    submissions.push(route.request().postDataJSON());
    await route.fulfill({ status: rejectSubmission ? 400 : 200, contentType: 'application/json', body: '{}' });
  });
  for (const [path, label, report, heading] of [
    ['/resources/roi-calculator', 'ROI Calculator', 'Download the report', 'Get your personalised report'],
    ['/it/resources/roi-calculator', 'Calcolatore ROI', 'Scarica il report', 'Ricevi il tuo report personalizzato'],
  ]) {
    const it = path.startsWith('/it/');
    await visit(roi, path);
    const conservative = it ? 'Prudente' : 'Conservative';
    await roi.getByRole('button', { name: conservative, exact: true, pressed: true }).waitFor();
    await roi.getByRole('button', { name: 'Base', exact: true }).click();
    await roi.getByRole('button', { name: 'Base', exact: true, pressed: true }).waitFor();
    await roi.getByRole('button', { name: conservative, exact: true }).click();
    await roi.getByRole('button', { name: conservative, exact: true, pressed: true }).waitFor();
    const hiring = it ? 'Assunzioni' : 'Hiring';
    const promotion = it ? 'Promozioni' : 'Promotion';
    await roi.locator('#roi-input-0').focus();
    await roi.locator('#roi-input-0').fill('350');
    await roi.getByRole('button', { name: promotion, exact: true }).click();
    await roi.locator('#roi-input-0').focus();
    await roi.locator('#roi-input-0').fill('5000');
    await roi.getByRole('button', { name: hiring, exact: true }).click();
    await roi.locator('#roi-input-0').focus();
    assert.equal(await roi.locator('#roi-input-0').inputValue(), '350', 'switching modules retains customised inputs');
    await roi.getByRole('button', { name: promotion, exact: true }).click();
    await roi.locator('#roi-input-0').focus();
    assert.equal(await roi.locator('#roi-input-0').inputValue(), '5000');
    assert.equal(await roi.locator('main details').count(), 0, 'assumptions are in the PDF, not on the calculator page');
    await roi.locator('#desktop-trigger-resources').focus();
    const calculatorLink = roi.getByTestId('mega-roiCalculator');
    await calculatorLink.waitFor({ state: 'visible' });
    assert.equal(await calculatorLink.innerText(), label);
    assert.equal(await calculatorLink.getAttribute('href'), path);
    await roi.keyboard.press('Escape');
    // The button under the calculator goes to the inline form and into its first field.
    await roi.getByRole('link', { name: report }).click();
    const form = roi.locator('#report');
    await form.getByRole('heading', { name: heading, exact: true }).waitFor();
    const nameInput = form.locator('input[name=name]');
    await roi.waitForFunction(() => document.activeElement?.getAttribute('name') === 'name');
    assert.equal(await form.locator('iframe').count(), 0, 'the report form uses native fields');
    // Empty submit: every message, focus on the first field, nothing sent.
    const before = submissions.length;
    await form.locator('button[type=submit]').click();
    assert.equal(await form.locator('[id$=-error]').count(), 5, 'each missing field says what it needs');
    assert.equal(await nameInput.getAttribute('aria-invalid'), 'true');
    assert.equal(await nameInput.getAttribute('aria-describedby'), 'roi-name-error');
    await roi.waitForFunction(() => document.activeElement?.getAttribute('name') === 'name');
    assert.equal(submissions.length, before, 'an incomplete form is not submitted');
    await nameInput.fill('Test Name');
    await form.locator('input[name=email]').fill('test@example.invalid');
    await form.locator('input[name=company]').fill('Test Company');
    await form.locator('select[name=industry]').selectOption('retail');
    await form.locator('button[type=submit]').click();
    assert.equal(submissions.length, before, 'unchecked consent prevents submission');
    assert.equal(await form.locator('[id$=-error]').count(), 1);
    assert.equal(await form.locator('input[name=marketing]').count(), 0, 'one consent only: no marketing opt-in');
    await form.locator('input[name=consent]').check();
    rejectSubmission = true;
    await form.locator('button[type=submit]').click();
    await form.getByRole('alert').waitFor({ state: 'visible' });
    assert.equal(await form.locator('input[name=email]').inputValue(), 'test@example.invalid', 'retry keeps the entered details');
    assert.equal(await roi.evaluate(() => (window.dataLayer ?? []).filter((event) => event.form === 'roi-calculator').length), 0);
    rejectSubmission = false;
    const [download] = await Promise.all([
      roi.waitForEvent('download'),
      form.locator('button[type=submit]').click(),
    ]);
    await form.getByRole('status').waitFor({ state: 'visible' });
    assert.equal(await form.getByRole('status').innerText(), it ? 'Il tuo report è pronto' : 'Your report is ready');
    assert.equal(await form.locator('form').count(), 0, 'confirmation replaces the form');
    const payload = submissions.at(-1);
    assert.ok(payload.fields.some((field) => field.name === 'company' && field.value === 'Test Company'));
    assert.ok(payload.fields.some((field) => field.name === '0-2/industry' && field.value === 'RETAIL'));
    assert.equal(payload.legalConsentOptions.consent.consentToProcess, true);
    assert.ok(payload.legalConsentOptions.consent.text.length > 20, 'the consent sentence the visitor ticked is sent');
    assert.equal('communications' in payload.legalConsentOptions.consent, false, 'no marketing subscription is sent');
    assert.equal(download.suggestedFilename(), 'skillvue-roi-report.pdf');
    const stream = await download.createReadStream();
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const document = Buffer.concat(chunks);
    assert.equal(document.subarray(0, 5).toString(), '%PDF-');
    assert.ok(document.length > 10000, 'PDF includes its fonts and logo');
    assert.equal((document.toString('latin1').match(/\/Type\s*\/Page\b/g) ?? []).length, 1, 'the report includes only the selected module on one A4 page');
    if (!it) {
      await roi.evaluate(() => {
        const createObjectURL = URL.createObjectURL;
        URL.createObjectURL = (...args) => {
          URL.createObjectURL = createObjectURL;
          throw new Error('Simulated download failure');
        };
      });
      const submittedCount = submissions.length;
      await form.getByRole('button', { name: 'Download again', exact: true }).click();
      await form.getByRole('alert').waitFor({ state: 'visible' });
      await Promise.all([
        roi.waitForEvent('download'),
        form.getByRole('button', { name: 'Download again', exact: true }).click(),
      ]);
      assert.equal(submissions.length, submittedCount, 'download retry must not resubmit the contact');
    }
    assert.deepEqual(await roi.evaluate(() => window.dataLayer.filter((event) => event.form === 'roi-calculator').map(({ event, form }) => ({ event, form }))),
      [{ event: 'generate_lead', form: 'roi-calculator' }]);
  }

  await roi.close();

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

console.log('[OK] browser smoke: navigation, locale, customer listing, mobile menu and ROI report form');
