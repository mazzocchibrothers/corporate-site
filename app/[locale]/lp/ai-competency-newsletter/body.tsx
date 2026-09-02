// @ts-nocheck
'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';
import { Download, ArrowRight, ArrowDown, Check } from 'lucide-react';
import { href } from '@/i18n/routes';

const TITLE = 'Skillvue — AI Competency One-Pager';
const GRAD = 'linear-gradient(135deg, #FFAF64 0%, #FF5656 62%, #4B4DF7 128%)';

// --- HubSpot download tracking (Option A: silent Forms Submission on download) ---
const HS_PORTAL_ID = '48438018';
// One HubSpot form per language (each only needs the standard `email` field, no
// custom property). Which form is submitted tells you whether the EN or IT PDF
// was downloaded. Paste each form's GUID below.
const HS_DOWNLOAD_FORM_GUID = {
  en: '03924422-772e-4a9c-8b1f-b482f11e2772', // "AI Competency Download – EN"
  it: 'c325222b-2a19-4014-8261-31af82b84d9c', // "AI Competency Download – IT"
};

// The per-language one-pagers are translations, not configuration: they live
// in the catalogue with the words they belong to. The booking link comes
// from the registry, which is what removes the /it prefix question.


const SectionHead = ({ n, label }) => (
  <div className="flex items-baseline gap-4 mb-5">
    <span className="text-[34px] md:text-[40px] font-extrabold leading-none gradient-text" style={{ backgroundImage: GRAD }}>{n}</span>
    <span className="text-[12px] md:text-[13px] font-bold tracking-[0.16em] uppercase text-white/70">{label}</span>
  </div>
);

// Increasing 5-bar glyph for the competency scale
const Bars = ({ active }) => (
  <div className="flex items-end gap-[3px] h-4 w-6 shrink-0">
    {[0.4, 0.6, 0.8, 1].map((h, i) => (
      <div key={i} className="flex-1 rounded-[1px]" style={{ height: `${h * 100}%`, background: active ? '#ffffff' : '#4b4df7', opacity: active ? 1 : 0.35 + i * 0.18 }} />
    ))}
  </div>
);



export default function AiCompetencyNewsletterPage() {
  const lang = useLocale();
  const t = useTranslations('lp.ai-competency-newsletter');

  const track = (action) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: `lp_${action}`, lp: 'ai-competency-newsletter', language: lang });
    }
  };

  const readParam = (name) => (typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get(name) || '');
  const readCookie = (name) => {
    if (typeof document === 'undefined') return '';
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  };

  // Attribute the download to the known HubSpot contact (identity comes from the
  // personalized newsletter link, e.g. ...?e={{contact.email}}). No gate, non-blocking.
  const logDownloadToHubSpot = () => {
    const email = readParam('e') || readParam('email');
    const formGuid = HS_DOWNLOAD_FORM_GUID[lang];
    if (!formGuid || !email) return; // unknown visitor → stays anonymous
    const hutk = readCookie('hubspotutk');
    try {
      fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${formGuid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          fields: [
            { name: 'email', value: email },
          ],
          context: {
            ...(hutk ? { hutk } : {}),
            pageUri: typeof window !== 'undefined' ? window.location.href : '',
            pageName: 'AI Competency One-Pager (newsletter)',
          },
        }),
      }).catch(() => {});
    } catch (e) { /* non-blocking */ }
  };

  const handleDownload = (placement) => {
    track(placement);          // GTM aggregate event (with language)
    logDownloadToHubSpot();     // HubSpot: log the download on the contact
  };

  return (
    <>
      <>
        <meta name="robots" content="noindex" />
      </>

      <Navbar />

      <main className="relative" style={{ background: '#08080c' }}>
        {/* Branded background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(75,77,247,0.18) 0%, rgba(75,77,247,0) 60%)' }} />
          <div className="absolute top-[900px] right-[-200px] w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,86,86,0.10) 0%, rgba(255,86,86,0) 60%)' }} />
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-8 pt-[120px] md:pt-[140px] pb-20">

          {/* HERO */}
          <header className="mb-14 md:mb-20">
            <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: '#7b7df9' }}>{t('badge')}</span>
            <h1 className="text-[32px] md:text-[52px] font-bold tracking-[-0.02em] text-white/95" style={{ lineHeight: 1.08 }}>
              {t('titleLead')}
              <span className="gradient-text" style={{ backgroundImage: GRAD }}>{t('titleHighlight')}</span>
              {t('titleTail')}
            </h1>
            <p className="text-[16px] md:text-[18px] text-white/65 leading-[1.55] mt-5 max-w-2xl">{t('subhead')}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href={t('assets.pdf')} download onClick={() => handleDownload('download')} data-testid="download-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-300 hover:opacity-90" style={{ background: '#4b4df7' }}>
                <Download className="h-[18px] w-[18px]" /> {t('download')}
              </a>
            </div>
          </header>

          {/* INTRO strip */}
          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8 mb-16 flex flex-col md:flex-row md:items-center gap-6">
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.6] flex-1">
              {t('introBody')} <span className="font-semibold" style={{ color: '#8a8cff' }}>{t('introPunch')}</span>
            </p>
            <div className="flex items-center gap-3 shrink-0 md:pl-8 md:border-l md:border-white/10">
              <span className="text-[15px] font-bold tracking-[0.06em] text-white/25 uppercase line-through decoration-white/25">{t('pillFrom')}</span>
              <ArrowRight className="h-4 w-4 text-white/40" />
              <span className="text-[15px] font-extrabold tracking-[0.06em] uppercase gradient-text" style={{ backgroundImage: GRAD }}>{t('pillTo')}</span>
            </div>
          </section>

          {/* 01 THE PROBLEM */}
          <section className="mb-16">
            <SectionHead n={t('s1.n')} label={t('s1.label')} />
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.6] mb-8 max-w-3xl">{t('s1.body')}</p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {t.raw('s1.bullets').map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] w-2 h-2 rotate-45 shrink-0 rounded-[1px]" style={{ background: i % 2 === 0 ? '#FF5656' : '#7b7df9' }} />
                  <p className="text-[14px] md:text-[15px] text-white/75 leading-[1.5]">{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 HOW WE VERIFY IT */}
          <section className="mb-16">
            <SectionHead n={t('s2.n')} label={t('s2.label')} />
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.6] mb-8 max-w-3xl">{t('s2.body')}</p>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-7">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-3">
                {/* INPUT */}
                <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/40">{t('s2.inputLabel')}</span>
                  <p className="text-[14px] font-semibold text-white/90 mt-1.5 leading-[1.35]">{t('s2.input')}</p>
                </div>

                <ArrowRight className="hidden md:block h-5 w-5 text-[#7b7df9] shrink-0" />
                <ArrowDown className="md:hidden h-5 w-5 text-[#7b7df9] self-center" />

                {/* SIGNALS + integrated */}
                <div className="flex-[1.3]">
                  <div className="grid grid-cols-2 gap-3">
                    {[[t('s2.sig1Label'), t('s2.sig1')], [t('s2.sig2Label'), t('s2.sig2')]].map(([l, v], i) => (
                      <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/40">{l}</span>
                        <p className="text-[14px] font-semibold text-white/90 mt-1.5">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-16 my-2 text-[#7b7df9]"><ArrowDown className="h-4 w-4" /><ArrowDown className="h-4 w-4" /></div>
                  <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(75,77,247,0.12)', border: '1px solid rgba(123,125,249,0.25)' }}>
                    <p className="text-[13px] font-semibold" style={{ color: '#a9aaff' }}>{t('s2.integrated')}</p>
                  </div>
                </div>

                <ArrowRight className="hidden md:block h-5 w-5 text-[#7b7df9] shrink-0" />
                <ArrowDown className="md:hidden h-5 w-5 text-[#7b7df9] self-center" />

                {/* OUTPUT */}
                <div className="flex-1 rounded-xl p-4" style={{ background: 'linear-gradient(160deg, #23234d 0%, #16163a 100%)', border: '1px solid rgba(123,125,249,0.3)' }}>
                  <span className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: '#8a8cff' }}>{t('s2.outputLabel')}</span>
                  <p className="text-[14px] font-semibold text-white mt-1.5 leading-[1.35]">{t('s2.output')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* 03 WHY OURS IS DIFFERENT */}
          <section className="mb-16">
            <SectionHead n={t('s3.n')} label={t('s3.label')} />
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.6] mb-8 max-w-3xl">{t('s3.body')}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.raw('s3.cards').map((card, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <h3 className="text-[16px] font-bold text-white/95 mb-2">{card.t}</h3>
                  <p className="text-[14px] text-white/60 leading-[1.55]">{card.b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 04 WHAT YOU GET */}
          <section className="mb-16">
            <SectionHead n={t('s4.n')} label={t('s4.label')} />
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.6] mb-8 max-w-3xl">{t('s4.body')}</p>
            <div className="space-y-2.5">
              {t.raw('s4.levels').map((lvl, i) => {
                const top = i === t.raw('s4.levels').length - 1;
                return (
                  <div key={i} className="flex items-center gap-4 rounded-xl px-5 py-4"
                    style={top
                      ? { background: 'linear-gradient(120deg, #23234d 0%, #16163a 100%)', border: '1px solid rgba(123,125,249,0.35)' }
                      : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <Bars active={top} />
                    <span className={`text-[15px] font-bold w-[110px] shrink-0 ${top ? 'text-white' : 'text-white/90'}`}>{lvl.t}</span>
                    <span className={`text-[14px] leading-[1.45] ${top ? 'text-white/85' : 'text-white/55'}`}>{lvl.b}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA banner */}
          <section className="relative overflow-hidden rounded-3xl px-6 py-12 md:px-12 md:py-16 text-center"
            style={{ background: 'linear-gradient(120deg, #1a1a3f 0%, #201436 45%, #3a1730 100%)' }}>
            <div className="pointer-events-none absolute -top-24 right-[-80px] w-[420px] h-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,86,86,0.22) 0%, rgba(255,86,86,0) 65%)' }} />
            <div className="relative">
              <h2 className="text-[26px] md:text-[38px] font-bold text-white tracking-[-0.02em] mb-3">{t('cta.title')}</h2>
              <p className="text-[15px] md:text-[16px] text-white/65 mb-8 max-w-xl mx-auto">{t('cta.body')}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={href('book-meeting', lang)} onClick={() => track('book_bottom')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold text-[#1a1a3f] bg-white hover:opacity-90 transition-all duration-300">
                  {t('cta.button')} <ArrowRight className="h-4 w-4" />
                </a>
                <a href={t('assets.pdf')} download onClick={() => handleDownload('download_bottom')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold text-white border border-white/20 hover:bg-white/[0.08] transition-all duration-300">
                  <Download className="h-[18px] w-[18px]" /> {t('download')}
                </a>
              </div>
            </div>
          </section>

          <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/25 mt-10 text-center">{t('footNote')}</p>
        </div>

        <TrustLogosBar />
      </main>

      <Footer />
    </>
  );
}
