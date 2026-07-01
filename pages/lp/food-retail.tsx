// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';
import { useLanguage } from '@/i18n/LanguageContext';

const FORM_IDS = {
  en: '824a40f6-57e6-46eb-bada-ca5d6f8122ea',
  it: '174b15c8-58eb-497d-bed1-0506bcbfda5c',
};

const PARAGRAPHS = [
  'How an objective read of skills sharpens hiring, promotion, and development decisions.',
  'One standard across every store, the same for new hires and the people you grow from within.',
  'Fill in the form to download it.',
];

export default function FoodRetailPage() {
  const { t, lang } = useLanguage();
  const formRef = useRef(null);
  const isIt = lang === 'it';

  useEffect(() => {
    const formId = isIt ? FORM_IDS.it : FORM_IDS.en;

    const createForm = () => {
      if (window.hbspt && formRef.current) {
        formRef.current.innerHTML = '';
        window.hbspt.forms.create({
          portalId: '48438018',
          formId,
          region: 'na1',
          target: '#lead-form',
        });
      }
    };

    // Script already loaded (e.g. on language switch): just re-create the form.
    if (window.hbspt) {
      createForm();
      return;
    }

    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = createForm;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isIt]);

  // Title strings come from the shared translation dictionary.
  const titleLead = t('Your next store manager is');
  const titleHighlight = t('already in your stores.');

  const renderTitle = () => (
    <>
      {titleLead}{' '}
      {/* Inline so the highlight flows with the lead ("already" stays next to "is") and wraps naturally.
          Local gradient override pushes the purple further out so less of it shows. */}
      <span
        className="font-bold gradient-text"
        style={{
          display: 'inline',
          backgroundImage: 'linear-gradient(135deg, #FFAF64 0%, #FF5656 62%, #4B4DF7 128%)',
        }}
      >
        {titleHighlight}
      </span>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col min-h-screen lg:h-screen pt-[80px]">
        <section className="relative flex-1 flex items-center min-h-0">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-6 lg:py-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left. Text */}
              <div className="lg:col-span-5">
                <h1
                  className="text-[clamp(1.5rem,3.6vw,2.75rem)] font-bold tracking-[-0.03em] text-white/95 mb-4"
                  style={{ lineHeight: 1.1 }}
                >
                  {renderTitle()}
                </h1>

                {PARAGRAPHS.map((text, i) => (
                  <p
                    key={i}
                    className={`text-[18px] text-white/95 leading-[1.65] max-w-md${i > 0 ? ' mt-4' : ''}`}
                    style={{ fontWeight: 300 }}
                  >
                    {t(text)}
                  </p>
                ))}
              </div>

              {/* Right. Form */}
              <div className="lg:col-span-7">
                <div
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 lg:p-6"
                >
                  <div
                    id="lead-form"
                    ref={formRef}
                    data-testid="lead-form"
                    style={{ minHeight: '400px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <TrustLogosBar lang={isIt ? 'it' : 'en'} />
      </div>
      <Footer />
    </>
  );
}
