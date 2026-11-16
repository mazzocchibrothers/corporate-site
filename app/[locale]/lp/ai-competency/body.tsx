'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';
import { Download, Lock, Check, ChevronDown } from 'lucide-react';
import { trackLead } from '@/components/shared/track-lead';
import { PHONE_COUNTRY, setPhoneCountry, styleHubspotForm } from '@/components/shared/hubspot-form-theme';
import { HeroCopy } from '@/components/ui/hero-copy';

const HS_PORTAL_ID = '48438018';
const HS_REGION = 'na1';

// The two HubSpot forms ask different questions, so the id is data. The
// per-language files are translations and live in the catalogue with the
// words they belong to.
const FORM_IDS = { en: '313b9013-e406-4914-9a18-7870fb99957f', it: '3f50c248-96fa-4b8c-a7dd-893264f65d6e' };




export default function AiCompetencyPage() {
  const lang = useLocale();
  const t = useTranslations('lp.ai-competency');

  const [unlocked, setUnlocked] = useState(false);
  const [showLock, setShowLock] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLImageElement>(null);

  const handleDocScroll = () => {
    const el = scrollRef.current;
    const p1 = page1Ref.current;
    if (!el || !p1) return;
    const viewportCenter = el.scrollTop + el.clientHeight / 2;
    setShowLock(viewportCenter > p1.offsetHeight);
  };

  useEffect(() => {
    if (unlocked) return;

    const formId = FORM_IDS[lang] ?? FORM_IDS.en;

    const createForm = () => {
      if (window.hbspt && formRef.current) {
        formRef.current.innerHTML = '';
        window.hbspt.forms.create({
          portalId: HS_PORTAL_ID,
          formId,
          region: HS_REGION,
          target: '#lead-form',
          onFormReady: () => {
            styleHubspotForm(formRef.current);
            setPhoneCountry(formRef.current, PHONE_COUNTRY[lang]);
          },
          onFormSubmitted: () => {
            trackLead('lp/ai-competency');
            setUnlocked(true);
          },
        });
      }
    };

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
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [unlocked, lang]);

  return (
    <>
      <style jsx global>{`
        /* Slightly smaller client-logo bar — scoped to this landing only */
        .compact-logos [class*="h-[60px]"] { height: 60px !important; }
        .compact-logos img { height: 18px !important; }
      `}</style>

      <Navbar />

      <div className="relative flex flex-col min-h-screen lg:h-screen lg:overflow-hidden pt-[80px]" style={{ background: '#08080c' }}>
        {/* Branded background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(75,77,247,0.18) 0%, rgba(75,77,247,0) 60%)' }} />
          <div className="absolute top-1/3 right-[-200px] w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,86,86,0.10) 0%, rgba(255,86,86,0) 60%)' }} />
        </div>

        <section className="relative z-10 flex-1 flex items-center min-h-0">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 w-full py-6 lg:py-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">

              {/* LEFT — description + HubSpot form */}
              <div className="lg:col-span-5">
                <span className="type-eyebrow inline-block mb-3" style={{ color: '#6b7dff' }}>
                  {t('badge')}
                </span>
                <HeroCopy>
                  <h1 className="text-[23px] font-semibold md:text-[58px] md:font-bold tracking-[-0.02em] text-white/95 mb-2.5" style={{ lineHeight: 1.1 }}>
                    {t('titleLead')}
                    <span className="font-semibold md:font-bold gradient-text" style={{ display: 'inline', backgroundImage: 'linear-gradient(135deg, #FFAF64 0%, #FF5656 62%, #4B4DF7 128%)' }}>
                      {t('titleHighlight')}
                    </span>
                    {t('titleTail')}
                  </h1>
                  <p className="type-body-sm hero-subtitle text-white/65 mb-4">{t('intro')}</p>
                </HeroCopy>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 max-w-[560px]">
                  {unlocked ? (
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.15)' }}>
                        <Check className="h-4 w-4" style={{ color: '#7b7df9' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="type-body-sm text-white/80 mb-2.5">{t('unlockedMsg')}</p>
                        <a href={t('assets.pdf')} download={t('assets.downloadName')} className="type-button inline-flex items-center gap-2 px-4 py-3.5 rounded-full font-medium text-white transition-all duration-300 hover:opacity-90" style={{ background: '#4b4df7' }}>
                          <Download className="h-4 w-4" /> {t('download')}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="type-caption font-semibold text-white/80 mb-3 flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5" style={{ color: '#7b7df9' }} /> {t('unlockLead')}
                      </p>
                      <div id="lead-form" ref={formRef} data-testid="lead-form" style={{ minHeight: '220px' }} />
                    </>
                  )}
                </div>
              </div>

              {/* RIGHT — scrollable document; page 2 obscured until unlocked */}
              <div className="lg:col-span-7 flex justify-center">
                <div
                  className="relative w-full max-w-[720px] rounded-2xl overflow-hidden shadow-2xl bg-white"
                  style={{ height: 'min(calc(100vh - 200px), 80vh)' }}
                >
                  {/* Scrolling content */}
                  <div ref={scrollRef} onScroll={handleDocScroll} className="absolute inset-0 overflow-y-auto overflow-x-hidden">
                    {/* Page 1 — free */}
                    <img ref={page1Ref} src={t('assets.page1')} alt={t('altPage1')} className="block w-full select-none" draggable={false} />

                    {/* Page 2 — scrollable but obscured until unlocked */}
                    <div className="relative">
                      <img loading="lazy" decoding="async"
                        src={t('assets.page2')}
                        alt={t('altPage2')}
                        className="block w-full transition-[filter] duration-500"
                        style={unlocked ? {} : { filter: 'blur(6px)', userSelect: 'none', pointerEvents: 'none' }}
                        draggable={false}
                      />
                      {!unlocked && <div className="absolute inset-0" style={{ background: 'rgba(8,8,12,0.62)' }} />}
                    </div>
                  </div>

                  {/* Fixed-centered lock — always centered, fades in smoothly (never moves) */}
                  {!unlocked && (
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500"
                      style={{ opacity: showLock ? 1 : 0 }}
                    >
                      <div className="flex flex-col items-center text-center px-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' }}>
                          <Lock className="h-6 w-6 text-white" />
                        </div>
                        <p className="type-body-bold text-white">{t('lockedTitle')}</p>
                        <p className="type-body-sm text-white/75 mt-1">{t('lockedHint')}</p>
                      </div>
                    </div>
                  )}

                  {/* Scroll affordance — fades out once you reach page 2 */}
                  {!unlocked && (
                    <div
                      className="type-body-sm absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-3 font-semibold text-white pointer-events-none transition-opacity duration-500"
                      style={{ opacity: showLock ? 0 : 1, background: 'linear-gradient(180deg, rgba(8,8,12,0) 0%, rgba(8,8,12,0.92) 55%)' }}
                    >
                      <ChevronDown className="h-4 w-4 animate-bounce" /> {t('scrollHint')}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        <div className="compact-logos">
          <TrustLogosBar />
        </div>
      </div>

      <Footer />
    </>
  );
}
