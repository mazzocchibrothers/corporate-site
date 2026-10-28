'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import { useRouter } from '@/i18n/navigation';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconTile } from '@/components/ui/icon-tile';
import { href } from '@/i18n/routes';
import { trackLead } from '@/components/shared/track-lead';
import { HeroCopy } from '@/components/ui/hero-copy';

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
const PHONE_COUNTRY: Partial<Record<string, string>> = { en: 'GB' };

/**
 * Selects `country` in the HubSpot phone field inside `host`, the way a
 * visitor picking it would: a value set through the element's own setter and
 * a change event, which is what makes HubSpot switch the +prefix. Only while
 * the field still shows HubSpot's default, so a choice is never overridden.
 */
function setPhoneCountry(host: HTMLElement | null, country: string | undefined) {
  const doc = host?.querySelector('iframe')?.contentDocument;
  const win = doc?.defaultView as (Window & typeof globalThis) | null;
  const select = doc?.querySelector<HTMLSelectElement>('.hs-fieldtype-intl-phone select');
  if (!country || !win || !select || select.value !== 'IT') return;
  if (![...select.options].some((o) => o.value === country)) return;
  Object.getOwnPropertyDescriptor(win.HTMLSelectElement.prototype, 'value')?.set?.call(select, country);
  select.dispatchEvent(new win.Event('change', { bubbles: true }));
}

/** Appends formCss to the HubSpot iframe inside `host`, once. */
function styleHubspotForm(host: HTMLElement | null) {
  const doc = host?.querySelector('iframe')?.contentDocument;
  if (!doc || doc.getElementById('skillvue-form-theme')) return;
  const style = doc.createElement('style');
  style.id = 'skillvue-form-theme';
  style.textContent = formCss(window.location.origin);
  doc.head.appendChild(style);
}

/**
 * The shape shared by every page that is just "headline + copy + a HubSpot
 * form, full height" — book-meeting and become-a-partner today. Copy and the
 * form id are the only things that differ between them, so those are the
 * only two things a page passes in.
 */
export default function HubspotLandingPage({
  namespace,
  formIds,
  leadSource,
  backRouteId,
  thankYou,
}: {
  /** The route's own message namespace, e.g. 'book-meeting'. */
  namespace: string;
  /** One HubSpot form id per language. */
  formIds: { en: string; it: string };
  /** The `form` value trackLead() reports to GA — see components/shared/track-lead.ts. */
  leadSource: string;
  /** Route id the back button links to. Omit to fall back to browser history. */
  backRouteId?: string;
  /**
   * Replace the form with the route's own `thankYou` copy once it is
   * submitted, whatever the HubSpot form is set to do after submit — a form
   * configured to redirect cannot send the visitor somewhere else.
   */
  thankYou?: boolean;
}) {
  const lang = useLocale();
  const t = useTranslations(namespace);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  // A string, not `t`, in the effect's dependencies: the submit re-renders the
  // page, and that must not tear the form down and build it again.
  const inlineMessage = thankYou ? t('thankYou.heading') : undefined;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      if (window.hbspt && formRef.current) {
        window.hbspt.forms.create({
          portalId: '48438018',
          formId: formIds[lang as 'en' | 'it'] ?? formIds.en,
          region: 'na1',
          target: '#hubspot-form',
          onFormReady: () => {
            styleHubspotForm(formRef.current);
            setPhoneCountry(formRef.current, PHONE_COUNTRY[lang]);
          },
          onFormSubmitted: () => {
            trackLead(leadSource);
            if (thankYou) setSubmitted(true);
          },
          // Any non-empty message stops HubSpot following the form's redirect;
          // the visitor sees the panel below, not this.
          ...(inlineMessage && { inlineMessage }),
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [lang, formIds, leadSource, thankYou, inlineMessage]);

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col min-h-screen pt-[80px]">
      <section className="relative flex-1 flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-6 lg:py-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left. Text */}
            <div className="lg:col-span-6">
              {backRouteId ? (
                <Button asChild variant="tertiary" mode="dark" className="mb-6">
                  <a href={href(backRouteId, lang)}>
                    <ArrowLeft aria-hidden />
                    {t('back')}
                  </a>
                </Button>
              ) : (
                <Button
                  onClick={() => { router.back(); }}
                  variant="tertiary"
                  mode="dark"
                  icon={<ArrowLeft aria-hidden />}
                  iconPosition="left"
                  className="mb-6"
                >
                  {t('back')}
                </Button>
              )}

              <HeroCopy>
                <h1
                  className="text-[48px] md:text-[58px] font-semibold tracking-[-0.02em] text-white/95 mb-4"
                  style={{ lineHeight: 1.1 }}
                >{t.rich('heading', {
                  span: (chunks) => <span className="font-semibold gradient-text">{chunks}</span>,
                  br: () => <br />,
                })}</h1>

                <p className="type-body hero-subtitle text-white/[0.55]">
                  {t('body')}
                </p>
              </HeroCopy>
            </div>

            {/* Right. HubSpot Form */}
            <div className="lg:col-span-6">
              <div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 lg:p-8"
              >
                {/* Hidden, not unmounted: HubSpot owns the nodes inside it. */}
                <div
                  id="hubspot-form"
                  ref={formRef}
                  data-testid="hubspot-form"
                  className={submitted ? 'hidden' : undefined}
                  style={{ minHeight: '400px' }}
                />
                {submitted && (
                  <div
                    role="status"
                    data-testid="hubspot-form-thank-you"
                    className="flex flex-col items-start justify-center gap-4 p-3"
                    style={{ minHeight: '400px' }}
                  >
                    <IconTile icon={CheckCircle} />
                    <h2 className="max-w-[880px] text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-white/95" style={{ lineHeight: 1.1 }}>
                      {t('thankYou.heading')}
                    </h2>
                    <p className="max-w-[880px] type-body text-white/[0.55]">
                      {t('thankYou.body')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
        <TrustLogosBar />
      </div>
      <Footer />
    </>
  );
}
