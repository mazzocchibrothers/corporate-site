// @ts-nocheck
'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';
import { Download, ArrowRight, AlertTriangle, Check } from 'lucide-react';
import { href } from '@/i18n/routes';

const TITLE = 'Skillvue — Supermarkets One-Pager';
const GRAD = 'linear-gradient(135deg, #FFAF64 0%, #FF5656 62%, #4B4DF7 128%)';

// --- HubSpot download tracking (same pattern as the AI Competency LP) ---
const HS_PORTAL_ID = '48438018';
// TODO: create one HubSpot form per language (standard `email` field only) and
// paste the GUIDs here. Until then the download stays untracked in HubSpot —
// the GTM dataLayer event below fires regardless.
const HS_DOWNLOAD_FORM_GUID = {
  en: '',
  it: '',
};

// The per-language one-pagers are translations, not configuration: they live
// in the catalogue with the words they belong to. The booking link comes
// from the registry, which is what removes the /it prefix question.


// Renders **bold** markers inside a plain string as <strong> spans.
function rich(text, cls = 'text-white/90') {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className={`font-semibold ${cls}`}>{part.slice(2, -2)}</strong>
      : part
  );
}

const SectionHead = ({ n, label }) => (
  <div className="flex items-baseline gap-4 mb-5">
    <span className="text-[34px] md:text-[40px] font-extrabold leading-none gradient-text" style={{ backgroundImage: GRAD }}>{n}</span>
    <span className="text-[12px] md:text-[13px] font-bold tracking-[0.16em] uppercase text-white/70">{label}</span>
  </div>
);



export default function SupermarketsPage() {
  const lang = useLocale();
  const t = useTranslations('lp.supermarkets');

  const track = (action) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: `lp_${action}`, lp: 'supermarkets', language: lang });
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
          fields: [{ name: 'email', value: email }],
          context: {
            ...(hutk ? { hutk } : {}),
            pageUri: typeof window !== 'undefined' ? window.location.href : '',
            pageName: 'Supermarkets One-Pager',
          },
        }),
      }).catch(() => {});
    } catch (e) { /* non-blocking */ }
  };

  const handleDownload = (placement) => {
    track(placement);
    logDownloadToHubSpot();
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
            <p className="text-[16px] md:text-[18px] text-white/65 leading-[1.55] mt-5 max-w-2xl">{rich(t('subhead'), 'text-white/85')}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href={t('assets.pdf')} download onClick={() => handleDownload('download')} data-testid="download-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-300 hover:opacity-90" style={{ background: '#4b4df7' }}>
                <Download className="h-[18px] w-[18px]" /> {t('download')}
              </a>
            </div>
          </header>

          {/* 01 — STATUS QUO / FACE / DO */}
          <section className="mb-16">
            <SectionHead n={t('s1.n')} label={t('s1.label')} />
            <div className="grid md:grid-cols-3 gap-4">
              {t.raw('s1.cards').map((card, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <h3 className="text-[17px] font-bold text-white/95 mb-3">{card.t}</h3>
                  <p className="text-[14px] text-white/60 leading-[1.6]">{rich(card.b)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — CHALLENGES VS SOLUTIONS */}
          <section className="mb-16">
            <SectionHead n={t('s2.n')} label={t('s2.label')} />
            <div className="space-y-4">
              {t.raw('s2.rows').map((row, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-7">
                  <div className="mb-5">
                    <h3 className="text-[18px] md:text-[19px] font-bold text-white/95">{row.t}</h3>
                    <p className="text-[13px] text-white/45 mt-1">{row.sub}</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-5 md:gap-6">
                    {/* Cost of inaction */}
                    <div className="md:pr-5 md:border-r md:border-white/[0.07]">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase mb-2.5" style={{ color: '#FF7A7A' }}>
                        <AlertTriangle className="h-3.5 w-3.5" /> {t('s2.costLabel')}
                      </span>
                      <p className="text-[14px] text-white/60 leading-[1.6]">{rich(row.cost, 'text-white/85')}</p>
                    </div>
                    {/* Skillvue value */}
                    <div className="md:pr-5 md:border-r md:border-white/[0.07]">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase mb-2.5" style={{ color: '#8a8cff' }}>
                        <Check className="h-3.5 w-3.5" /> {t('s2.valueLabel')}
                      </span>
                      <p className="text-[14px] text-white/60 leading-[1.6]">{rich(row.value, 'text-white/85')}</p>
                    </div>
                    {/* ROI chips */}
                    <div>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase mb-2.5" style={{ color: '#5ddba4' }}>
                        <Check className="h-3.5 w-3.5" /> {t('s2.roiLabel')}
                      </span>
                      <div className="space-y-2">
                        {row.roi.map((chip, j) => (
                          <div key={j} className="rounded-lg px-3 py-2 text-[13px] font-semibold leading-[1.4]"
                            style={{ background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(93,219,164,0.25)', color: '#a8ecca' }}>
                            {chip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 03 — FIRST-YEAR RETURN */}
          <section className="mb-16">
            <SectionHead n={t('s3.n')} label={t('s3.label')} />
            <p className="text-[15px] md:text-[16px] text-white/70 leading-[1.6] mb-8 max-w-3xl">{t('s3.body')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.raw('s3.stats').map((s, i) => (
                <div key={i} className="rounded-2xl p-5 text-center" style={{ background: 'linear-gradient(160deg, #23234d 0%, #16163a 100%)', border: '1px solid rgba(123,125,249,0.25)' }}>
                  <div className="text-[32px] md:text-[38px] font-extrabold leading-none gradient-text" style={{ backgroundImage: GRAD }}>{s.v}</div>
                  <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/35 mt-2">{t('s3.note')}</div>
                  <div className="text-[14px] font-semibold text-white/90 mt-3 leading-[1.35]">{s.l}</div>
                  <div className="text-[12px] text-white/45 mt-1">{s.s}</div>
                </div>
              ))}
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

        <TrustLogosBar lang={lang} />
      </main>

      <Footer />
    </>
  );
}
