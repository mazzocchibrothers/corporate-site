'use client';

/**
 * The site's look for an embedded HubSpot form, shared by every page that
 * embeds one so they all match: call styleHubspotForm and setPhoneCountry
 * from the embed's onFormReady.
 */

/**
 * The form's look. HubSpot renders the form in a same-origin iframe with its
 * own form-specific theme, and page CSS cannot reach it; the embed's `css`
 * option is ignored for a form with its own style. So once the form is ready
 * this sheet is appended to the iframe's document, every declaration
 * !important to beat the theme's id-scoped selectors: on the dark card, white
 * labels and fields of black at 15% (the card showing through, darkened) with a
 * faint white border — the country list's open options stay solid #1A1A1A, as a
 * browser draws them on their own opaque panel — the site's blue pill button,
 * Geist like the rest of the body text. Only the look changes — fields,
 * validation and submission stay HubSpot's.
 */
const formCss = (origin: string) => `
@font-face { font-family: 'Geist'; src: url('${origin}/fonts/Geist-Variable.woff2') format('woff2'); font-weight: 100 900; font-display: swap; }
/* 4px of room each side: the iframe clips at its edges, and the focus ring is drawn 3px outside a field. */
body { padding: 0 4px !important; box-sizing: border-box !important; }
.hs-form { font-family: 'Geist', sans-serif !important; color: #ffffff !important; }
.hs-form fieldset { max-width: none !important; }
.hs-form-field { margin-bottom: 18px !important; }
.hs-form-field > label { display: block !important; margin-bottom: 6px !important; font-size: 14px !important; line-height: 20px !important; font-weight: 500 !important; color: #ffffff !important; }
.hs-form-required { color: #ff5656 !important; margin-left: 2px !important; }
.hs-input:not([type=checkbox]):not([type=radio]) { box-sizing: border-box !important; height: auto !important; width: 100% !important; padding: 8px 14px !important; font-family: inherit !important; font-size: 16px !important; line-height: 24px !important; color: #ffffff !important; background: rgba(0, 0, 0, 0.15) !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; border-radius: 12px !important; outline: none !important; transition: border-color .2s !important; }
.hs-input:not([type=checkbox]):not([type=radio])::placeholder { color: rgba(255, 255, 255, 0.4) !important; }
.hs-input:not([type=checkbox]):not([type=radio]):hover { border-color: rgba(255, 255, 255, 0.24) !important; }
.hs-input:focus { border-color: #4b4df7 !important; box-shadow: 0 0 0 3px rgba(75, 77, 247, 0.3) !important; }
select.hs-input option { background: #1a1a1a !important; color: #ffffff !important; }
textarea.hs-input { min-height: 80px !important; resize: vertical !important; }
.hs-form .hs-fieldtype-intl-phone.hs-input:not(input) { display: flex !important; gap: 0 !important; width: 100% !important; padding: 0 !important; border: 0 !important; background: transparent !important; box-shadow: none !important; }
.hs-fieldtype-intl-phone .hs-input { width: auto !important; flex: 1 !important; min-width: 0 !important; margin: 0 !important; float: none !important; }
.hs-fieldtype-intl-phone select.hs-input { flex: 0 0 38% !important; margin-right: 12px !important; }
/* The native arrow sits wherever the browser puts it, flush against the edge;
   our own chevron sits 14px in, matching the text's inset on the left. */
select.hs-input:not([type=checkbox]):not([type=radio]) { -webkit-appearance: none !important; appearance: none !important; padding-right: 40px !important; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-opacity='0.6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") !important; background-repeat: no-repeat !important; background-position: right 14px center !important; background-size: 16px !important; }
.legal-consent-container, .hs-richtext, .legal-consent-container p { font-size: 14px !important; line-height: 20px !important; color: rgba(255, 255, 255, 0.65) !important; }
.legal-consent-container a { color: #9395ff !important; }
.hs-form-booleancheckbox-display { display: flex !important; gap: 10px !important; align-items: flex-start !important; }
.hs-form-booleancheckbox-display input { margin-top: 3px !important; accent-color: #4b4df7 !important; }
.hs-form-booleancheckbox-display > span { margin-left: 0 !important; }
.inputs-list { list-style: none !important; padding-left: 0 !important; margin: 0 !important; }
.hs-error-msgs { list-style: none !important; padding: 0 !important; margin: 6px 0 0 !important; }
.hs-error-msgs label { font-size: 12px !important; line-height: 1.4 !important; color: #ff5656 !important; }
.hs_submit { margin-top: 8px !important; }
.hs-button { cursor: pointer !important; font-family: inherit !important; font-size: 16px !important; line-height: 1 !important; font-weight: 500 !important; color: #ffffff !important; background: #4b4df7 !important; border: 0 !important; border-radius: 9999px !important; padding: 16px 28px !important; transition: background .2s !important; }
.hs-button:hover { background: #3133e7 !important; }
`;

/**
 * The phone field's country, per page language. HubSpot's form starts on
 * Italy (+39) in both languages; an English visitor starts on the United
 * Kingdom (+44) instead. Italian keeps HubSpot's default, so it has no entry.
 */
export const PHONE_COUNTRY: Partial<Record<string, string>> = { en: 'GB' };

/**
 * Selects `country` in the HubSpot phone field inside `host`, the way a
 * visitor picking it would: a value set through the element's own setter and
 * a change event, which is what makes HubSpot switch the +prefix. Only while
 * the field still shows HubSpot's default, so a choice is never overridden.
 */
export function setPhoneCountry(host: HTMLElement | null, country: string | undefined) {
  const doc = host?.querySelector('iframe')?.contentDocument;
  const win = doc?.defaultView as (Window & typeof globalThis) | null;
  const select = doc?.querySelector<HTMLSelectElement>('.hs-fieldtype-intl-phone select');
  if (!country || !win || !select || select.value !== 'IT') return;
  if (![...select.options].some((o) => o.value === country)) return;
  Object.getOwnPropertyDescriptor(win.HTMLSelectElement.prototype, 'value')?.set?.call(select, country);
  select.dispatchEvent(new win.Event('change', { bubbles: true }));
}

/** Appends formCss to the HubSpot iframe inside `host`, once. */
export function styleHubspotForm(host: HTMLElement | null) {
  const doc = host?.querySelector('iframe')?.contentDocument;
  if (!doc || doc.getElementById('skillvue-form-theme')) return;
  const style = doc.createElement('style');
  style.id = 'skillvue-form-theme';
  style.textContent = formCss(window.location.origin);
  doc.head.appendChild(style);
}
