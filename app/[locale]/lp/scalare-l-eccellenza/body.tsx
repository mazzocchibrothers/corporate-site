// @ts-nocheck
'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HUBSPOT_PORTAL_ID = '48438018';
const HUBSPOT_FORM_ID = 'YOUR_WP_L3_FORM_ID'; // TODO: replace with real form ID

function SkillvueIcon({ size = 24 }: { size?: number }) {
  return (
    <img
      src="/skillvue-logomark.svg"
      alt="Skillvue"
      width={size}
      height={size}
      style={{ display: 'inline-block', flexShrink: 0 }}
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── LAYER 1: VETRINA ──────────────────────────────────────────────────────────

const heroStats = [
  { value: '51%', label: 'dei Client Advisor dichiara l\'intenzione di cambiare datore di lavoro (CXG, 2024)' },
  { value: '68%', label: 'dei VIC seguirebbe il proprio advisor presso un competitor (Bain, 2024)' },
  { value: '87%', label: 'delle maison non ha ancora integrato l\'AI nel recruiting (Comité Colbert/MAD, 2025)' },
  { value: '€358 mld', label: 'Mercato globale dei beni di lusso personali nel 2025 (Bain/Altagamma)' },
];

const featureCards = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Il paradosso della crescita nel lusso',
    desc: 'L\'apertura di nuovi flagship, il lancio di collezioni cruise, la campagna natalizia: tutti eventi che generano un fabbisogno di talento impossibile da soddisfare con i metodi tradizionali del recruiting del lusso, mettendo a rischio l\'identità di brand.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'L\'anatomia del costo invisibile',
    desc: 'Il 78% dei clienti del lusso abbandona un acquisto dopo una singola interazione negativa con un advisor. Ogni assunzione sbagliata non è più solo un costo operativo: è un danno reputazionale misurabile che i sistemi di reporting tradizionali non catturano.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'La promessa dell\'verification intelligente',
    desc: 'Come processare centinaia di candidature stagionali senza abbassare la soglia di eccellenza del brand: la distinzione tra automazione e augmentation, e perché l\'verification comportamentale strutturato (0,58 di validità predittiva) è l\'unico strumento scalabile.',
  },
];

function VetrinaLayer({ onUnlock }: { onUnlock: () => void }) {
  const t = useTranslations('lp.scalare-l-eccellenza');
  const tl = useTranslations('shared.lp');
  const [form, setForm] = useState({ nome: '', cognome: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = 'Campo obbligatorio';
    if (!form.cognome.trim()) e.cognome = 'Campo obbligatorio';
    if (!form.email.trim()) e.email = 'Campo obbligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email non valida';
    else if (/gmail|yahoo|hotmail|outlook|icloud|libero|virgilio/i.test(form.email))
      e.email = 'Inserisci un indirizzo email aziendale';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'firstname', value: form.nome },
              { name: 'lastname', value: form.cognome },
              { name: 'email', value: form.email },
            ],
            context: {
              pageUri: typeof window !== 'undefined' ? window.location.href : '',
              pageName: 'Scalare l\'eccellenza senza perdere l\'esclusività - WP-L3',
            },
          }),
        }
      );
    } catch (_) {
      // fail silently — still grant access
    }
    setSubmitting(false);
    setSubmitted(true);
    if (typeof window !== 'undefined') {
      window.open('/lp/scalare-l-eccellenza?access=true', '_blank');
    }
  };

  return (
    <div style={{ background: '#F8F8FA', minHeight: '100vh', fontFamily: 'inherit' }}>
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-4 bg-white"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 12px rgba(0,0,0,0.05)' }}
      >
        <div className="flex items-center gap-2.5">
          <SkillvueIcon size={26} />
          <span className="font-bold text-[15px] text-[#0D0D0D] tracking-[-0.03em]">{t('text')}</span>
        </div>
        <Button variant="primary" mode="light" onClick={scrollToForm}>
          {t('text2')}</Button>
      </nav>

      {/* HERO */}
      <section className="pt-[88px] pb-16 px-6 lg:px-10">
        <div className="max-w-[760px] mx-auto text-center pt-16">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
            {t.rich('text3', {
          s: (chunks) => <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase text-white mb-8" style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}>{chunks}</span>,
        })}</motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-[#0D0D0D] leading-[1.1] mb-6"
          >
            {t.rich('text4', {
          s: (chunks) => <span className="block" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{chunks}</span>,
        })}</motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
            className="text-[17px] text-[#0D0D0D]/55 leading-[1.7] mb-4"
            style={{ fontWeight: 300 }}
          >
            {t('text5')}</motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.24}
            className="flex items-center justify-center gap-6 text-[12px] text-[#0D0D0D]/35 mb-12"
          >
            {t.rich('text6', {
          s: (chunks) => <span>{chunks}</span>,
          b: (chunks) => <strong className="text-[#0D0D0D]/55">{chunks}</strong>,
          s2: (chunks) => <span className="w-px h-3 bg-[#0D0D0D]/15">{chunks}</span>,
          s3: (chunks) => <span>{chunks}</span>,
        })}</motion.div>

            {/* Logo marquee */}
            {(() => {
              const logos: { src: string; alt: string; keepColor?: boolean; w?: number; h?: number }[] = [
                { src: '/logos/essilorluxottica.png', alt: 'EssilorLuxottica', w: 150, h: 40 },
                { src: '/logos/eataly.png', alt: 'Eataly', w: 100, h: 40 },
                { src: '/logos/nespresso.png', alt: 'Nespresso', w: 100, h: 52 },
                { src: '/logos/miroglio.png', alt: 'Miroglio Group', keepColor: true, w: 130, h: 40 },
                { src: '/logos/subdued-logo.png', alt: 'Subdued', w: 100, h: 40 },
                { src: '/logos/douglas-logo.png', alt: 'Douglas', w: 130, h: 40 },
              ];
              const bwStyle = { filter: 'brightness(0)', opacity: 0.55 } as const;
              const colorStyle = { filter: 'grayscale(1)', opacity: 0.55 } as const;
              const LogoSet = ({ ariaHidden }: { ariaHidden?: boolean }) => (
                <div className="shrink-0 flex items-center gap-12" aria-hidden={ariaHidden || undefined}>
                  {logos.map((logo, i) => (
                    <div key={i} className="shrink-0 flex items-center justify-center" style={{ width: logo.w, height: logo.h }}>
                      <img loading="lazy" decoding="async" src={logo.src} alt={ariaHidden ? '' : logo.alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', ...(logo.keepColor ? colorStyle : bwStyle) }} />
                    </div>
                  ))}
                </div>
              );
              return (
                <motion.div
                  variants={fadeUp} initial="hidden" animate="visible" custom={0.27}
                  className="relative overflow-hidden mb-10 mx-auto"
                  style={{
                    maxWidth: 700,
                    maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                  }}
                >
                  <div className="lp-marquee flex items-center gap-12" style={{ width: 'max-content' }}>
                    <LogoSet />
                    <LogoSet ariaHidden />
                  </div>
                </motion.div>
              );
            })()}

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}>
            <Button variant="primary" mode="light" onClick={scrollToForm}>
              {t('text7')}</Button>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="pb-16 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {heroStats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-black/[0.06] p-6 text-center"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
              >
                <div
                  className="text-[2rem] font-semibold md:font-bold tracking-[-0.03em] mb-1.5"
                  style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {s.value}
                </div>
                <div className="text-[12px] text-[#0D0D0D]/45 leading-snug">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.03em] text-[#0D0D0D] mb-3">
              {t('heading')}</h2>
            <p className="text-[16px] text-[#0D0D0D]/45 max-w-[580px] mx-auto leading-[1.65]" style={{ fontWeight: 300 }}>
              {t('body')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {featureCards.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}
                className="rounded-2xl border border-black/[0.07] bg-[#F8F8FA] p-7"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-white"
                  style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}
                >
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-semibold text-[#0D0D0D] mb-2 leading-snug">{f.title}</h3>
                <p className="text-[13px] text-[#0D0D0D]/50 leading-[1.65]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-20 px-6 lg:px-10 bg-[#F8F8FA]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-[#0D0D0D] leading-[1.15] mb-6">
                {t('heading2')}</h2>
              <ul className="space-y-3 mb-8">
                {[
                  'Il paradosso tra volume di hiring e identità di brand nel luxury retail',
                  'Perché il 68% dei VIC seguirebbe il proprio advisor presso la concorrenza',
                  'L\'equazione impossibile: velocità, scala e sensibilità del brand',
                  'Come l\'AI verification garantisce standard uniformi dal primo al millesimo candidato',
                  'Tre implicazioni operative per la strategia di selezione ad alto volume',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#0D0D0D]/60 leading-snug">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}
                    >
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2 text-[12px] text-[#0D0D0D]/30">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {tl('dataSafe')}
              </p>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              ref={formRef}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
              className="rounded-2xl bg-white border border-black/[0.08] p-8 lg:p-10"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
            >
              <h3 className="text-[17px] font-semibold text-[#0D0D0D] mb-1">{t('heading3')}</h3>
              <p className="text-[13px] text-[#0D0D0D]/35 mb-7">{t('body2')}</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}
                  >
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#0D0D0D] mb-1">{t('body3')}</p>
                    <p className="text-[13px] text-[#0D0D0D]/40">{t('body4')}</p>
                  </div>
                  <Button
                    variant="secondary"
                    mode="light"
                    onClick={() => window.open('/lp/scalare-l-eccellenza?access=true', '_blank')}
                  >
                    {t('text8')}</Button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-medium text-[#0D0D0D]/60 mb-1.5">
                    {t.rich('label', {
          s: (chunks) => <span className="text-red-400">{chunks}</span>,
        })}</label>
                  <input
                    type="text"
                    placeholder={t('label4')}
                    value={form.nome}
                    onChange={e => { setForm(f => ({ ...f, nome: e.target.value })); setErrors(er => ({ ...er, nome: '' })); }}
                    className="w-full px-4 py-2.5 rounded-lg border text-[14px] text-[#0D0D0D] outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DF7]/60 focus-visible:border-[#4B4DF7] transition-all"
                    style={{ borderColor: errors.nome ? '#EF4444' : 'rgba(0,0,0,0.12)', background: '#FAFAFA' }}
                  />
                  {errors.nome && <p className="text-[11px] text-red-500 mt-1">{errors.nome}</p>}
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#0D0D0D]/60 mb-1.5">
                    {t.rich('label2', {
          s: (chunks) => <span className="text-red-400">{chunks}</span>,
        })}</label>
                  <input
                    type="text"
                    placeholder={t('label5')}
                    value={form.cognome}
                    onChange={e => { setForm(f => ({ ...f, cognome: e.target.value })); setErrors(er => ({ ...er, cognome: '' })); }}
                    className="w-full px-4 py-2.5 rounded-lg border text-[14px] text-[#0D0D0D] outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DF7]/60 focus-visible:border-[#4B4DF7] transition-all"
                    style={{ borderColor: errors.cognome ? '#EF4444' : 'rgba(0,0,0,0.12)', background: '#FAFAFA' }}
                  />
                  {errors.cognome && <p className="text-[11px] text-red-500 mt-1">{errors.cognome}</p>}
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#0D0D0D]/60 mb-1.5">
                    {t.rich('label3', {
          s: (chunks) => <span className="text-red-400">{chunks}</span>,
        })}</label>
                  <input
                    type="email"
                    placeholder={t('label6')}
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }}
                    className="w-full px-4 py-2.5 rounded-lg border text-[14px] text-[#0D0D0D] outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DF7]/60 focus-visible:border-[#4B4DF7] transition-all"
                    style={{ borderColor: errors.email ? '#EF4444' : 'rgba(0,0,0,0.12)', background: '#FAFAFA' }}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  {!errors.email && <p className="text-[11px] text-[#0D0D0D]/25 mt-1">{t('body5')}</p>}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  mode="light"
                  disabled={submitting}
                  className="w-full"
                  icon={submitting ? null : undefined}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>{tl('loading')}</>
                  ) : (
                    'Scarica il Report'
                  )}
                </Button>
              </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 px-6 lg:px-10 bg-white border-t border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <SkillvueIcon size={20} />
            <span className="text-[12px] text-[#0D0D0D]/30">{tl('copyright', { year: new Date().getFullYear() })}</span>
          </div>
          <div className="flex items-center gap-5 text-[12px]">
            <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
              {t.rich('text9', {
          a: (chunks) => <a href="https://www.skillvue.ai/privacy-policy">{chunks}</a>,
        })}</Button>
            <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
              {t.rich('text10', {
          a: (chunks) => <a href="https://www.skillvue.ai">{chunks}</a>,
        })}</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── LAYER 2: WHITEPAPER DOCUMENT ─────────────────────────────────────────────

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-black/[0.08] bg-white p-5 text-center">
      <div
        className="text-[1.9rem] font-bold tracking-[-0.03em] mb-1"
        style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {value}
      </div>
      <div className="text-[12px] text-[#0D0D0D]/45 leading-snug">{label}</div>
    </div>
  );
}

function Quote({ children, source }: { children: React.ReactNode; source?: string }) {
  return (
    <div
      className="rounded-xl p-6 my-8"
      style={{ borderLeft: '3px solid', borderImage: 'linear-gradient(180deg, #4B4DF7, #FF5F24) 1', background: 'rgba(75,77,247,0.03)' }}
    >
      <p className="text-[15px] text-[#0D0D0D]/60 italic leading-[1.7] mb-2">{children}</p>
      {source && <p className="text-[12px] text-[#0D0D0D]/35">— {source}</p>}
    </div>
  );
}

function SectionHeading({ num, title }: { num?: string; title: string }) {
  return (
    <div className="mt-12 mb-5">
      <div className="w-8 h-0.5 rounded mb-3" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
      <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-[#0D0D0D]">
        {num && <span className="mr-1">{num}.</span>}{title}
      </h2>
    </div>
  );
}

function SubHeading({ title }: { title: string }) {
  return (
    <h3
      className="text-[14px] font-semibold mb-2 mt-6 flex items-center gap-2"
      style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
    >
      {title}
    </h3>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[14.5px] text-[#0D0D0D]/70 leading-[1.75] mb-4">{children}</p>;
}

function InfoBox({ title, children, accent = false }: { title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div
      className="rounded-xl p-6 my-6"
      style={{ border: `1px solid ${accent ? 'rgba(255,85,36,0.2)' : 'rgba(75,77,247,0.2)'}`, background: accent ? 'rgba(255,85,36,0.03)' : 'rgba(75,77,247,0.04)' }}
    >
      <p
        className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
        style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {title}
      </p>
      <div className="text-[14px] text-[#0D0D0D]/65 leading-[1.7]">{children}</div>
    </div>
  );
}

function NumberedItem({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-5">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-[12px] font-bold"
        style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}
      >
        {n}
      </div>
      <div>
        <p
          className="text-[13px] font-bold mb-1"
          style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {title}
        </p>
        <p className="text-[13.5px] text-[#0D0D0D]/65 leading-[1.65]">{children}</p>
      </div>
    </div>
  );
}

function WhitepaperLayer() {
  const t = useTranslations('lp.scalare-l-eccellenza');
  const tl = useTranslations('shared.lp');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#F5F5F7', minHeight: '100vh' }}>
      {/* Top gradient bar */}
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #4B4DF7 0%, #FF5F24 100%)' }} />

      {/* Navbar */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10 py-3.5 bg-white"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center gap-2.5">
          <SkillvueIcon size={24} />
          <span className="font-bold text-[14px] text-[#0D0D0D] tracking-[-0.03em]">{t('text11')}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="secondary" mode="light">
            <a
              href="/WP-L3-ITA.pdf"
              download="Scalare-Eccellenza-Retail-Lusso-Skillvue.pdf"
            >
              <Download aria-hidden="true" />{tl('downloadPdf')}</a>
          </Button>
          <Button asChild variant="primary" mode="light">
            <a
              href="https://www.skillvue.ai/contact-us"
              target="_blank"
              rel="noopener noreferrer"
            >
              {tl('contact')}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </nav>

      {/* Document */}
      <div className="max-w-[760px] mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>

          {/* Document Cover */}
          <div className="px-10 pt-12 pb-8 text-center border-b border-black/[0.06]">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase text-white mb-7"
              style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}
            >
              {t('text12')}</span>
            <h1 className="text-[48px] md:text-[2rem] font-semibold tracking-[-0.03em] text-[#0D0D0D] leading-[1.2] mb-2">
              {t.rich('heading4', {
          s: (chunks) => <span className="block" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{chunks}</span>,
        })}</h1>
            <p className="text-[15px] text-[#0D0D0D]/45 italic mt-3 mb-6">
              {t('body6')}</p>
            <div className="w-10 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
            <p className="text-[13px] text-[#0D0D0D]/40">
              {t.rich('body7', {
          i: (chunks) => <em>{chunks}</em>,
          i2: (chunks) => <em>{chunks}</em>,
        })}</p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1">{t.rich('body8', {
          i: (chunks) => <em>{chunks}</em>,
        })}</p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1">
              {t.rich('body9', {
          s: (chunks) => <span style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>{chunks}</span>,
        })}</p>
          </div>

          {/* Document Body */}
          <div className="px-10 py-10">

            {/* Executive Summary */}
            <InfoBox title={t('heading6')}>
              <p>
                {t.rich('body10', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
              <p className="mt-3">
                {t.rich('body11', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </InfoBox>

            {/* Cover stats */}
            <div className="grid grid-cols-3 gap-4 my-8">
              <StatBox value="51%" label={t('label7')} />
              <StatBox value="68%" label={t('label8')} />
              <StatBox value="87%" label={t('label9')} />
            </div>

            {/* Section 1 */}
            <SectionHeading num="1" title={t('heading7')} />

            <Para>
              {t.rich('text13', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text14', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text15', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <InfoBox title={t('heading8')}>
              <p>
                {t.rich('body12', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
              <p className="mt-2 text-[12px] text-[#0D0D0D]/40 italic">
                {t('body13')}</p>
            </InfoBox>

            <Para>
              {t.rich('text16', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Section 2 */}
            <SectionHeading num="2" title={t('heading9')} />

            <Para>
              {t.rich('text17', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text18', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Bar chart visual */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body14')}</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">{t('body15')}</p>
              <div className="space-y-3">
                {[
                  { label: 'Difficoltà recruiting store manager', pct: 93, color: '#FF5F24' },
                  { label: 'AI non ancora integrata nel recruiting', pct: 87, color: '#4B4DF7' },
                  { label: 'Difficoltà attrarre talenti in boutique', pct: 60, color: '#FF8C42' },
                  { label: 'Advisor insoddisfatti e pronti a lasciare', pct: 51, color: '#9B59B6' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-[#0D0D0D]/55">{item.label}</span>
                      <span className="font-semibold" style={{ color: item.color }}>{item.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.pct}%`, background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">{t('body16')}</p>
            </div>

            <Para>
              {t.rich('text19', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text20', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Section 3 */}
            <SectionHeading num="3" title={t('heading10')} />

            <InfoBox title={t('heading11')} accent>
              <p>
                {t.rich('body17', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </InfoBox>

            <Para>
              {t.rich('text21', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text22', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text23', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Section 4 */}
            <SectionHeading num="4" title={t('heading12')} />

            <Para>
              {t.rich('text24', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <div className="grid grid-cols-2 gap-4 my-8">
              <StatBox value="0,38" label={t('label10')} />
              <StatBox value="0,58" label={t('label11')} />
            </div>

            <Para>
              {t.rich('text25', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Section 5 */}
            <SectionHeading num="5" title={t('heading13')} />

            <Para>
              {t.rich('text26', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text27', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <InfoBox title={t('heading14')}>
              <p>
                {t.rich('body18', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
              <p className="mt-3 text-[12px] text-[#0D0D0D]/40 italic">
                {t('body19')}</p>
            </InfoBox>

            <Para>
              {t.rich('text28', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Quote source="Claudia D'Arpizio, Senior Partner Bain & Company, Bain-Altagamma Luxury Study, novembre 2025">
              {t('text29')}</Quote>

            {/* Section 6 */}
            <SectionHeading num="6" title={t('heading15')} />

            <Para>
              {t('text30')}</Para>

            <NumberedItem n={1} title={t('heading16')}>
              {t.rich('text31', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <NumberedItem n={2} title={t('heading17')}>
              {t.rich('text32', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <NumberedItem n={3} title={t('heading18')}>
              {t.rich('text33', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            {/* 3 domande */}
            <div className="mt-10 mb-8">
              <div className="w-8 h-0.5 rounded mb-3" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
              <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-[#0D0D0D] mb-2">{t('heading5')}</h2>
              <p className="text-[14px] text-[#0D0D0D]/55 leading-[1.7]">
                {t('body20')}</p>
            </div>

            <div className="space-y-4 my-8">
              {[
                {
                  n: '1',
                  q: 'Quante candidature stagionali ha processato la tua organizzazione durante l\'ultimo picco, e quante di queste hanno ricevuto una valutazione comportamentale strutturata?',
                  a: 'In assenza di verification strutturati, la decisione finale ricade sugli store manager, che nel lusso sono già sovraccarichi: il 93% delle maison riporta difficoltà nel trovare profili manageriali adeguati. In un contesto di forte pressione operativa, quali criteri stanno guidando realmente le tue assunzioni ad alto volume?',
                },
                {
                  n: '2',
                  q: 'Qual è il tasso di retention a 6 mesi dei vostri stagionali e come influisce sul Net Promoter Score dei flagship durante i picchi di vendita?',
                  a: 'Il 78% dei clienti del lusso afferma che una singola interazione negativa è sufficiente per abbandonare un acquisto (CXG, 2024). Con il canale direct-to-consumer che genera ormai oltre il 53% dei ricavi globali (Bain, 2024), il costo del turnover non può essere ridotto a una semplice metrica HR. Se il tuo CFO calcola il costo del turnover stagionale solo come costo di sostituzione (30% del salario annuo secondo il U.S. DoL), sta probabilmente sottostimando il costo reale di ordini di grandezza.',
                },
                {
                  n: '3',
                  q: 'Il tuo processo di selezione stagionale garantisce gli stessi standard qualitativi dal primo al millesimo candidato, senza alcuna variazione?',
                  a: 'Se la selezione ad alto volume dipende dal giudizio individuale, la coerenza del tuo brand è a rischio. La scienza (Schmidt & Hunter) parla chiaro: il colloquio non strutturato è un predittore di performance debole (0,38) rispetto ai test strutturati. Quando i volumi crescono e il tempo stringe, la stanchezza decisionale trasforma la selezione in una lotteria. Un sistema automatizzato non è solo più equo: è l\'unico modo per proteggere i tuoi standard su larga scala.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6 border"
                  style={{ borderColor: i === 2 ? 'rgba(75,77,247,0.15)' : 'rgba(0,0,0,0.07)', background: i === 2 ? 'rgba(75,77,247,0.02)' : 'white' }}
                >
                  <div
                    className="text-[1.4rem] font-bold mb-3"
                    style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {item.n}
                  </div>
                  <p className="text-[14px] font-semibold text-[#0D0D0D]/80 leading-snug mb-3">{item.q}</p>
                  <p className="text-[13.5px] text-[#0D0D0D]/55 leading-[1.65]">{item.a}</p>
                </div>
              ))}
            </div>

            {/* Next step */}
            <div
              className="rounded-xl p-6 my-8"
              style={{ background: 'linear-gradient(135deg, rgba(75,77,247,0.05) 0%, rgba(255,95,36,0.05) 100%)', border: '1px solid rgba(75,77,247,0.15)' }}
            >
              <p
                className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
                style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {t('body21')}</p>
              <p className="text-[14px] text-[#0D0D0D]/65 leading-[1.7] mb-4">
                {t.rich('body22', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
              <Button asChild variant="primary" mode="light">
                <a
                  href="https://www.skillvue.ai/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tl('requestCall')}
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </div>

            <Quote>
              {t('text34')}</Quote>

            {/* About Skillvue */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-3">{t('body23')}</p>
              <p className="text-[13.5px] text-[#0D0D0D]/60 leading-[1.7] mb-3">
                {t.rich('body24', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
              <p className="text-[13.5px] text-[#0D0D0D]/60 leading-[1.7]">
                {t.rich('body25', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </div>

            {/* References */}
            <div className="mt-10 pt-8 border-t border-black/[0.06]">
              <p className="text-[11px] font-bold text-[#0D0D0D]/40 uppercase tracking-[0.18em] mb-4">{t('body26')}</p>
              <ul className="space-y-2">
                {[
                  'Bain & Company / Altagamma, "Luxury Report 2024: Rebuilding the Foundations of Luxury", novembre 2024.',
                  'Bain & Company / Altagamma, "Finding a New Longevity for Luxury", Luxury Goods Worldwide Market Study, 24th edition, novembre 2025.',
                  'BCG / Altagamma, "True-Luxury Global Consumer Insights", 2024.',
                  'CXG, "The Advisor Effect: Driving Retail Success by Re-Imagining the Role of the Client Advisor", ottobre 2024. Basato su 12.000 survey e 27 interviste con senior professional del lusso (2022–2024).',
                  'Comité Colbert / MAD, Studio su talent acquisition e retention nel lusso, condotto aprile–giugno 2025.',
                  'Bain & Company / Comité Colbert, "Luxury and Technology: Artificial Intelligence, the Quiet Revolution", 4th edition, settembre 2024–2025.',
                  'LVMH, Risultati annuali 2024, comunicato stampa, gennaio 2025. 215.000+ dipendenti, ricavi €84,7 miliardi.',
                  'Schmidt, F.L. & Hunter, J.E., "The Validity and Utility of Selection Methods in Personnel Psychology: Practical and Theoretical Implications of 85 Years of Research Findings", Psychological Bulletin, 1998, Vol. 124, No. 2, pp. 262–274.',
                  'U.S. Bureau of Labor Statistics, "Job Openings and Labor Turnover Survey (JOLTS)", dati aggiornati al 2025–2026.',
                  'U.S. Department of Labor, "The Cost of a Bad Hire", come riportato da Forbes.',
                  'Regolamento (UE) 2024/1689 del Parlamento europeo e del Consiglio del 13 giugno 2024, che stabilisce regole armonizzate sull\'intelligenza artificiale (AI Act). Gazzetta ufficiale dell\'Unione europea, L 2024/1689.',
                ].map((ref, i) => (
                  <li key={i} className="text-[12px] text-[#0D0D0D]/35 italic leading-snug">{ref}</li>
                ))}
              </ul>
            </div>

            {/* Footer brand */}
            <div className="mt-10 pt-6 border-t border-black/[0.06] text-center">
              <p className="text-[12px] text-[#0D0D0D]/30 mb-2">{t('body27')}</p>
              <div className="flex items-center justify-center gap-2">
                <SkillvueIcon size={22} />
                <span className="font-bold text-[16px] text-[#0D0D0D]/70 tracking-[-0.03em]">{t('text35')}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 lg:px-10">
        <div className="max-w-[760px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[12px] text-[#0D0D0D]/25">{tl('copyright', { year: new Date().getFullYear() })}</span>
          <div className="flex items-center gap-5 text-[12px]">
            <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
              {t.rich('text36', {
          a: (chunks) => <a href="https://www.skillvue.ai/privacy-policy">{chunks}</a>,
        })}</Button>
            <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
              {t.rich('text37', {
          a: (chunks) => <a href="https://www.skillvue.ai">{chunks}</a>,
        })}</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default function ScalareEccellenzaPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('access') === 'true') {
        setUnlocked(true);
      }
    }
  }, []);

  return (
    <>
      <>
        <meta name="robots" content="noindex, nofollow" />
      </>
      <AnimatePresence mode="wait">
        {unlocked ? (
          <motion.div key="wp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <WhitepaperLayer />
          </motion.div>
        ) : (
          <motion.div key="vetrina" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <VetrinaLayer onUnlock={() => setUnlocked(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
