// @ts-nocheck
'use client';

import React, { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import { useRouter } from '@/i18n/navigation';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// One HubSpot form per language. This page replaced two twin files —
// book-meeting.tsx and prenota-incontro.tsx — which existed only because the
// Pages Router needed one file per URL; the App Router serves /book-meeting and
// /it/prenota-incontro from one directory. The form id was the only thing in
// them that was not copy, so it is the only thing left to branch on.
const FORM_IDS = {
  en: '950f4b2b-ed50-4ef7-94f9-2b34c4b19ecc',
  it: '174b15c8-58eb-497d-bed1-0506bcbfda5c',
};


export default function BookMeetingPage() {
  const lang = useLocale();
  const t = useTranslations('book-meeting');
  const formRef = useRef(null);

  const router = useRouter();

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
                onClick={() => { router.back(); }}
                variant="tertiary"
                mode="dark"
                icon={<ArrowLeft aria-hidden />}
                iconPosition="left"
                className="mb-6"
              >
                {t('back')}
              </Button>

              <h1
                className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95 mb-4"
                style={{ lineHeight: 1.1 }}
              >{t.rich('heading', {
                span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
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
