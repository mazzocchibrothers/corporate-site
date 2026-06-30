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
  const titleLead = t('Get the one-pager for');
  const titleHighlight = t('food retail HR.');

  // IT is laid out on three fixed lines; EN wraps naturally on one line.
  const renderTitle = () => {
    if (!isIt) {
      return (
        <>
          {titleLead}{' '}
          <span className="font-bold gradient-text">{titleHighlight}</span>
        </>
      );
    }

    const leadWords = titleLead.split(' ');
    const leadFirst = leadWords.slice(0, -1).join(' ');
    const leadLast = leadWords[leadWords.length - 1];
    const hlWords = titleHighlight.split(' ');
    const hlFirst = hlWords[0];
    const hlRest = hlWords.slice(1).join(' ');

    return (
      <>
        <span className="block whitespace-nowrap">{leadFirst}</span>
        <span className="block whitespace-nowrap">
          {leadLast}{' '}
          <span className="font-bold gradient-text">{hlFirst}</span>
        </span>
        <span className="block whitespace-nowrap font-bold gradient-text">{hlRest}</span>
      </>
    );
  };

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
                  className="text-[clamp(1.75rem,4.2vw,3.5rem)] font-bold tracking-[-0.03em] text-white/95 mb-4"
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
