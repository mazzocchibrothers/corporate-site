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
  const formRef = useRef(null);
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
      <div className="relative flex flex-col min-h-screen lg:h-screen pt-[80px]">
      <section className="relative flex-1 flex items-center min-h-0">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-6 lg:py-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left. Text */}
            <div className="lg:col-span-5">
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

              <h1
                className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95 mb-4"
                style={{ lineHeight: 1.05 }}
              >{t.rich('heading', {
                span: (chunks) => <span className="font-semibold gradient-text">{chunks}</span>,
              })}</h1>

              <p className="text-[16px] text-white/[0.55] leading-[1.65] max-w-md" style={{ fontWeight: 300 }}>
                {t('body')}
              </p>
            </div>

            {/* Right. HubSpot Form */}
            <div className="lg:col-span-7">
              <div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 lg:p-6"
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
                    <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-white/95" style={{ lineHeight: 1.1 }}>
                      {t('thankYou.heading')}
                    </h2>
                    <p className="text-[16px] text-white/[0.55] leading-[1.65] max-w-md" style={{ fontWeight: 300 }}>
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
