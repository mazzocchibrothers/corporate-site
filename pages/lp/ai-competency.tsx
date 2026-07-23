// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';
import { useLanguage } from '@/i18n/LanguageContext';
import { Download, Lock, Check, ChevronDown } from 'lucide-react';

const TITLE = 'Skillvue — AI Competency One-Pager';

const HS_PORTAL_ID = '48438018';
const HS_REGION = 'na1';

const ASSETS = {
  en: {
    formId: '313b9013-e406-4914-9a18-7870fb99957f',
    pdf: '/skillvue-ai-competency-one-pager.pdf',
    downloadName: 'Skillvue-AI-Competency-One-Pager.pdf',
    page1: '/ai-competency-page-1.png',
    page2: '/ai-competency-page-2.png',
  },
  it: {
    formId: '3f50c248-96fa-4b8c-a7dd-893264f65d6e',
    pdf: '/skillvue-ai-competency-one-pager-it.pdf',
    downloadName: 'Skillvue-AI-Competency-One-Pager-IT.pdf',
    page1: '/ai-competency-page-it-1.png',
    page2: '/ai-competency-page-it-2.png',
  },
};

const COPY = {
  en: {
    badge: 'AI COMPETENCY ASSESSMENT',
    titleLead: "AI won't replace you. Only its ",
    titleHighlight: 'smarter users',
    titleTail: ' will.',
    intro:
      "In page 2 you unlock: the verification framework, the 5-level competency scale and what you get.",
    unlockLead: 'Complete the form to unlock page 2 and download the PDF.',
    download: 'Download PDF',
    lockedTitle: 'Page 2 locked',
    lockedHint: 'Fill in the form to unlock',
    unlockedMsg: 'Unlocked. Scroll to read page 2.',
    scrollHint: 'Scroll — page 2 of 2',
  },
  it: {
    badge: 'AI COMPETENCY ASSESSMENT',
    titleLead: "L'AI non ti sostituirà, ma chi saprà usarla in ",
    titleHighlight: 'modo intelligente',
    titleTail: ' sì.',
    intro:
      "Nella pagina 2 sblocchi: il framework di verifica, la scala di competenza a 5 livelli e cosa ottieni.",
    unlockLead: 'Compila il modulo per sbloccare la pagina 2 e scaricare il PDF.',
    download: 'Scarica il PDF',
    lockedTitle: 'Pagina 2 bloccata',
    lockedHint: 'Compila il modulo per sbloccare',
    unlockedMsg: 'Sbloccato. Scorri per leggere la pagina 2.',
    scrollHint: 'Scorri — pagina 2 di 2',
  },
};

export default function AiCompetencyPage() {
  const { lang } = useLanguage();
  const isIt = lang === 'it';
  const c = isIt ? COPY.it : COPY.en;
  const a = isIt ? ASSETS.it : ASSETS.en;

  const [unlocked, setUnlocked] = useState(false);
  const [showLock, setShowLock] = useState(false);
  const formRef = useRef(null);
  const scrollRef = useRef(null);
  const page1Ref = useRef(null);

  const handleDocScroll = () => {
    const el = scrollRef.current;
    const p1 = page1Ref.current;
    if (!el || !p1) return;
    const viewportCenter = el.scrollTop + el.clientHeight / 2;
    setShowLock(viewportCenter > p1.offsetHeight);
  };

  useEffect(() => {
    if (unlocked) return;

    const formId = isIt ? ASSETS.it.formId : ASSETS.en.formId;

    const createForm = () => {
      if (window.hbspt && formRef.current) {
        formRef.current.innerHTML = '';
        window.hbspt.forms.create({
          portalId: HS_PORTAL_ID,
          formId,
          region: HS_REGION,
          target: '#lead-form',
          onFormSubmitted: () => setUnlocked(true),
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
  }, [unlocked, isIt]);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="Skillvue AI Competency One-Pager" />
        <meta name="robots" content="noindex" />
      </Head>

      {/* Brand styling for the embedded HubSpot form */}
      <style jsx global>{`
        /* Two-column, horizontal layout */
        #lead-form form { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; align-items: start; }
        #lead-form form > .hs_submit,
        #lead-form form > .hs-richtext,
        #lead-form form > .legal-consent-container,
        #lead-form form > .hs_error_rollup { grid-column: 1 / -1; }
        #lead-form fieldset { max-width: none !important; width: 100% !important; }
        #lead-form fieldset .input { margin-right: 0 !important; }
        #lead-form fieldset .hs-form-field { width: 100% !important; float: none !important; }
        #lead-form .hs-form-field { margin-bottom: 8px; }
        #lead-form .hs-form-field > label { color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 600; display: block; margin-bottom: 5px; }
        #lead-form .hs-form-field > label .hs-form-required { color: #ff8a8a; margin-left: 2px; }
        #lead-form .hs-input {
          width: 100% !important; box-sizing: border-box;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.14);
          color: #fff; border-radius: 8px; padding: 10px 14px; font-size: 14px; outline: none;
        }
        #lead-form .hs-input:focus { border-color: #7b7df9; }
        #lead-form .hs-input::placeholder { color: rgba(255,255,255,0.4); }
        #lead-form select.hs-input { color: #fff; }
        #lead-form select.hs-input option { color: #111; }
        #lead-form .hs-fieldtype-checkbox .hs-input,
        #lead-form .hs-fieldtype-booleancheckbox .hs-input { width: auto !important; margin-right: 8px; }
        #lead-form .hs-form-booleancheckbox-display, #lead-form .inputs-list label { color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 400; }
        #lead-form ul.inputs-list { list-style: none; margin: 0; padding: 0; }
        #lead-form .hs-error-msgs { list-style: none; margin: 6px 0 0; padding: 0; }
        #lead-form .hs-error-msgs label { color: #ff9a9a; font-size: 12px; }
        #lead-form .hs_submit { margin-top: 14px; }
        #lead-form .hs-button {
          width: 100%; background: #4b4df7; color: #fff; border: none;
          border-radius: 9999px; padding: 13px 24px; font-size: 15px; font-weight: 600;
          cursor: pointer; transition: opacity .3s ease;
        }
        #lead-form .hs-button:hover { opacity: 0.9; }
        #lead-form .submitted-message { color: rgba(255,255,255,0.8); font-size: 14px; }

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
                <span className="inline-block text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: '#7b7df9' }}>
                  {c.badge}
                </span>
                <h1 className="text-[23px] font-semibold md:text-[30px] md:font-bold tracking-[-0.02em] text-white/95 mb-2.5" style={{ lineHeight: 1.12 }}>
                  {c.titleLead}
                  <span className="font-bold gradient-text" style={{ display: 'inline', backgroundImage: 'linear-gradient(135deg, #FFAF64 0%, #FF5656 62%, #4B4DF7 128%)' }}>
                    {c.titleHighlight}
                  </span>
                  {c.titleTail}
                </h1>
                <p className="text-[13px] text-white/65 leading-[1.5] mb-4 max-w-md">{c.intro}</p>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 max-w-[560px]">
                  {unlocked ? (
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.15)' }}>
                        <Check className="h-4 w-4" style={{ color: '#7b7df9' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-white/80 mb-2.5">{c.unlockedMsg}</p>
                        <a href={a.pdf} download={a.downloadName} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold text-white transition-all duration-300 hover:opacity-90" style={{ background: '#4b4df7' }}>
                          <Download className="h-4 w-4" /> {c.download}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-[12px] font-semibold text-white/80 mb-3 flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5" style={{ color: '#7b7df9' }} /> {c.unlockLead}
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
                    <img ref={page1Ref} src={a.page1} alt="AI Competency One-Pager — page 1" className="block w-full select-none" draggable={false} />

                    {/* Page 2 — scrollable but obscured until unlocked */}
                    <div className="relative">
                      <img
                        src={a.page2}
                        alt="AI Competency One-Pager — page 2"
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
                        <p className="text-[16px] font-bold text-white">{c.lockedTitle}</p>
                        <p className="text-[13px] text-white/75 mt-1">{c.lockedHint}</p>
                      </div>
                    </div>
                  )}

                  {/* Scroll affordance — fades out once you reach page 2 */}
                  {!unlocked && (
                    <div
                      className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-3 text-[13px] font-semibold text-white pointer-events-none transition-opacity duration-500"
                      style={{ opacity: showLock ? 0 : 1, background: 'linear-gradient(180deg, rgba(8,8,12,0) 0%, rgba(8,8,12,0.92) 55%)' }}
                    >
                      <ChevronDown className="h-4 w-4 animate-bounce" /> {c.scrollHint}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        <div className="compact-logos">
          <TrustLogosBar lang={isIt ? 'it' : 'en'} />
        </div>
      </div>

      <Footer />
    </>
  );
}
