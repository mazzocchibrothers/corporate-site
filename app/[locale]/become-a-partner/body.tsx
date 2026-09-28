'use client';

import React, { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';
import { trackLead } from '@/components/shared/track-lead';

// The "Partnership Request" HubSpot form, one per language.
const FORM_IDS = {
  en: '5c2f8d21-d740-4ccb-a8f3-55065dae4e3e',
  it: '798c1db1-1afe-45ca-989b-19bfce0a2ade',
};


export default function BecomeAPartnerPage() {
  const lang = useLocale();
  const t = useTranslations('become-a-partner');
  const formRef = useRef(null);

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
          formId: FORM_IDS[lang] ?? FORM_IDS.en,
          region: 'na1',
          target: '#hubspot-form',
          onFormSubmitted: () => trackLead('become-a-partner'),
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [lang]);

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col min-h-screen lg:h-screen pt-[80px]">
      <section className="relative flex-1 flex items-center min-h-0">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-6 lg:py-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left. Text */}
            <div className="lg:col-span-5">
              <Button
                asChild
                variant="tertiary"
                mode="dark"
                className="mb-6"
              >
                <a href={href('customers/partners', lang)}>
                  <ArrowLeft aria-hidden />
                  {t('back')}
                </a>
              </Button>

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
                <div
                  id="hubspot-form"
                  ref={formRef}
                  data-testid="hubspot-form"
                  style={{ minHeight: '400px' }}
                />
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
