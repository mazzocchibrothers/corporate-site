// @ts-nocheck
'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HUBSPOT_PORTAL_ID = '48438018';
const HUBSPOT_FORM_ID = 'YOUR_WP_B2_FORM_ID'; // TODO: replace with real form ID

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
  { value: '39%', label: 'dei ruoli bancari richiederà reskilling entro il 2030' },
  { value: '<1-2 anni', label: 'ciclo di vita medio di una competenza tecnica nel banking' },
  { value: '28%', label: 'riduzione nei tempi di talent deployment con intelligence strutturata' },
  { value: '0,54', label: 'validità predittiva della valutazione comportamentale strutturata' },
];

const featureCards = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Il problema delle competenze obsolete',
    desc: 'Entro il 2030, il 39% dei ruoli nel settore bancario europeo richiederà un reskilling. Il ciclo di vita medio di una competenza tecnica è ormai inferiore ai due anni, ma la maggior parte delle banche opera con sistemi di talent management episodici.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Perché i sistemi tradizionali non bastano',
    desc: 'Valutazioni annuali e monitoraggio della formazione guardano al passato e non comunicano tra loro. Il CHRO di una banca con diecimila dipendenti non riesce a rispondere in tempo reale a domande strategiche sul proprio capitale umano.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Compliance AI Act e talent intelligence',
    desc: "L'EU AI Act classifica i sistemi AI per talent management come ad alto rischio. I tre criteri per un sistema conforme — explainability, gestione dell'incertezza e audit trail — coincidono con i requisiti di qualità della decisione sul capitale umano.",
  },
];

function VetrinaLayer({ onUnlock }: { onUnlock: () => void }) {
  const t = useTranslations('lp.la-crisi-delle-competenze');
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
              pageName: 'La crisi delle competenze obsolete nelle banche europee - WP-B2',
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
      window.open('/lp/la-crisi-delle-competenze?access=true', '_blank');
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
                { src: '/logos/intesa-sanpaolo.png', alt: 'Intesa Sanpaolo', w: 150, h: 40 },
                { src: '/logos/webuild.svg', alt: 'Webuild', w: 120, h: 40 },
                { src: '/logos/aeroporti-di-roma.svg', alt: 'Aeroporti di Roma', w: 140, h: 40 },
                { src: '/logos/banca-di-asti.svg', alt: 'Banca di Asti', w: 140, h: 40 },
                { src: '/logos/monte-paschi.png', alt: 'Monte dei Paschi di Siena', keepColor: true, w: 120, h: 52 },
                { src: '/logos/unicredit.png', alt: 'UniCredit', keepColor: true, w: 150, h: 40 },
              ];
              const bwStyle = { filter: 'brightness(0)', opacity: 0.55 } as const;
              const colorStyle = { filter: 'grayscale(1)', opacity: 0.55 } as const;
              const LogoSet = ({ ariaHidden }: { ariaHidden?: boolean }) => (
                <div className="shrink-0 flex items-center gap-12" aria-hidden={ariaHidden || undefined}>
                  {logos.map((logo, i) => (
                    <div key={i} className="shrink-0 flex items-center justify-center" style={{ width: logo.w, height: logo.h }}>
                      <img src={logo.src} alt={ariaHidden ? '' : logo.alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', ...(logo.keepColor ? colorStyle : bwStyle) }} />
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
                  'Perché il 59% della forza lavoro bancaria ha bisogno di reskilling immediato o profondo',
                  'Come le competenze comportamentali (learning agility, gestione dell\'incertezza) predicono il valore futuro',
                  'Verification episodico vs. talent intelligence ricorrente: le 6 dimensioni a confronto',
                  'I requisiti EU AI Act per i sistemi HR ad alto rischio nel banking',
                  '3 domande strategiche per il tuo comitato di direzione',
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
                    onClick={() => window.open('/lp/la-crisi-delle-competenze?access=true', '_blank')}
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
  const t = useTranslations('lp.la-crisi-delle-competenze');
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
              href="/WP-B2-ITA.pdf"
              download="La-Crisi-Competenze-Obsolete-Banche-Europee-Skillvue.pdf"
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

            {/* Problem box */}
            <InfoBox title={t('heading8')}>
              <p>
                {t.rich('body10', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b5: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b6: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </InfoBox>

            {/* Cover stats */}
            <div className="grid grid-cols-2 gap-4 my-8">
              <StatBox value="39%" label={t('label7')} />
              <StatBox value="<1-2 anni" label={t('label8')} />
              <StatBox value="28%" label={t('label9')} />
              <StatBox value="0,38" label={t('label10')} />
            </div>

            {/* Reskilling urgency visual */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body11')}</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">
                {t('body12')}</p>
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="3.5" />
                    <circle
                      cx="18" cy="18" r="15.915" fill="none"
                      stroke="url(#donutGrad)" strokeWidth="3.5"
                      strokeDasharray="59 41" strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4B4DF7" />
                        <stop offset="100%" stopColor="#FF5F24" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {t.rich('text13', {
          s: (chunks) => <span className="text-[1.1rem] font-bold" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{chunks}</span>,
        })}</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }} />
                    <span className="text-[12px] text-[#0D0D0D]/60">{t.rich('text14', {
          b: (chunks) => <strong>{chunks}</strong>,
        })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 bg-black/[0.1]" />
                    <span className="text-[12px] text-[#0D0D0D]/60">{t.rich('text15', {
          b: (chunks) => <strong>{chunks}</strong>,
        })}</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#0D0D0D]/25 mt-4 italic">{t('body13')}</p>
            </div>

            <Para>
              {t.rich('text16', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t('text17')}</Para>

            {/* Section 1 */}
            <SectionHeading num="1" title={t('heading9')} />

            <Para>
              {t.rich('text18', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text19', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text20', {
          i: (chunks) => <em>{chunks}</em>,
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text21', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text22', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Quote source="World Economic Forum. (2025). The Future of Jobs Report 2025.">
              {t('text23')}</Quote>

            {/* Section 2 */}
            <SectionHeading num="2" title={t('heading10')} />

            <Para>
              {t.rich('text24', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text25', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text26', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b5: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <InfoBox title={t('heading11')}>
              <p>
                {t.rich('body14', {
          b: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
        })}</p>
            </InfoBox>

            {/* Section 3 */}
            <SectionHeading num="3" title={t('heading12')} />

            <Quote source="BCG, How to Build Organizational Resilience, 2022">
              {t('text27')}</Quote>

            <Para>
              {t.rich('text28', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text29', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* 3 critical capabilities */}
            <div className="grid grid-cols-3 gap-4 my-8">
              {[
                { num: '01', label: 'Learning Agility', color: 'rgba(75,77,247,0.08)', border: 'rgba(75,77,247,0.15)' },
                { num: '02', label: 'Gestione dell\'Incertezza', color: 'rgba(130,77,247,0.08)', border: 'rgba(130,77,247,0.15)' },
                { num: '03', label: 'Monitoraggio Normativo', color: 'rgba(255,95,36,0.06)', border: 'rgba(255,95,36,0.15)' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-5 text-center" style={{ background: item.color, border: `1px solid ${item.border}` }}>
                  <div
                    className="text-[2rem] font-semibold md:font-bold mb-2"
                    style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {item.num}
                  </div>
                  <p className="text-[12px] font-bold text-[#0D0D0D]/70 uppercase tracking-[0.08em] leading-snug">{item.label}</p>
                </div>
              ))}
            </div>

            <Para>
              {t.rich('text30', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Section 4 */}
            <SectionHeading num="4" title={t('heading13')} />

            <Para>
              {t.rich('text31', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text32', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Predictive validity comparison */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
              <p className="text-[12px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body15')}</p>
              <p className="text-[11px] text-[#0D0D0D]/35 italic mb-5">{t('body16')}</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[12px] mb-1.5">
                    {t.rich('text33', {
          s: (chunks) => <span className="text-[#0D0D0D]/55">{chunks}</span>,
          s2: (chunks) => <span className="font-bold text-[#EF4444]">{chunks}</span>,
        })}</div>
                  <div className="h-6 rounded-lg bg-black/[0.05] overflow-hidden">
                    <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: '38%', background: '#EF4444' }}>
                      {t.rich('text34', {
          s: (chunks) => <span className="text-white text-[11px] font-bold">{chunks}</span>,
        })}</div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[12px] mb-1.5">
                    {t.rich('text35', {
          s: (chunks) => <span className="text-[#0D0D0D]/55">{chunks}</span>,
          s2: (chunks) => <span className="font-bold text-[#4B4DF7]">{chunks}</span>,
        })}</div>
                  <div className="h-6 rounded-lg bg-black/[0.05] overflow-hidden">
                    <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: '54%', background: 'linear-gradient(90deg, #4B4DF7, #7B4DFF)' }}>
                      {t.rich('text36', {
          s: (chunks) => <span className="text-white text-[11px] font-bold">{chunks}</span>,
        })}</div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#0D0D0D]/25 mt-4 italic">{t('body17')}</p>
            </div>

            {/* Episodic vs Recurrent table */}
            <InfoBox title={t('heading14')}>
              <p className="text-[12px] text-[#0D0D0D]/45 mb-4">{t('body18')}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-black/[0.08]">
                      <th className="text-left py-2 pr-4 text-[#0D0D0D]/60 font-semibold">{t('columnHeader')}</th>
                      <th className="text-left py-2 pr-4 font-semibold" style={{ color: '#FF5F24' }}>{t('columnHeader2')}</th>
                      <th className="text-left py-2 font-semibold" style={{ color: '#4B4DF7' }}>{t('columnHeader3')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.05]">
                    {[
                      ['Frequenza di rilevazione', 'Annuale o per evento', 'Continua e strutturata'],
                      ['Orientamento temporale', 'Guarda al passato', 'Anticipa il futuro'],
                      ['Dati comportamentali', 'Assenti o non strutturati', 'Rilevati e aggiornati'],
                      ['Integrazione sistemi HR', 'Frammentata / manuale', 'Integrata e azionabile'],
                      ['Capacità predittiva', 'Minima', 'Alta (turnover, gap, potenziale)'],
                      ['Supporto decisioni strategiche', 'Reattivo', 'Proattivo e documentato'],
                    ].map(([dim, ep, ti], i) => (
                      <tr key={i}>
                        <td className="py-2.5 pr-4 text-[#0D0D0D]/60">{dim}</td>
                        <td className="py-2.5 pr-4" style={{ color: '#FF5F24' }}>{ep}</td>
                        <td className="py-2.5 text-[#0D0D0D]/65">{ti}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </InfoBox>

            <Para>
              {t.rich('text37', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Section 5 */}
            <SectionHeading num="5" title={t('heading15')} />

            <Para>
              {t.rich('text38', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Para>
              {t.rich('text39', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <InfoBox title={t('heading16')} accent>
              <p>
                {t.rich('body19', {
          b: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
        })}</p>
            </InfoBox>

            <Para>
              {t.rich('text40', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Section 6 */}
            <SectionHeading num="6" title={t('heading17')} />

            <Para>
              {t('text41')}</Para>

            <NumberedItem n={1} title={t('heading18')}>
              {t.rich('text42', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <NumberedItem n={2} title={t('heading19')}>
              {t.rich('text43', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <NumberedItem n={3} title={t('heading20')}>
              {t.rich('text44', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <InfoBox title={t('heading21')}>
              <p>
                {t.rich('body20', {
          b: (chunks) => <strong className="text-[#0D0D0D]/75">{chunks}</strong>,
        })}</p>
            </InfoBox>

            {/* 3 Strategic Questions */}
            <SectionHeading title={t('heading22')} />

            <Para>
              {t.rich('text45', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <div className="space-y-5 my-8">
              {[
                {
                  n: 1,
                  q: 'Hai davvero una visione chiara e aggiornata delle competenze chiave presenti?',
                  body: 'Il CHRO della tua organizzazione potrebbe rispondere oggi, con dati affidabili, a domande come: quanti collaboratori in area risk management hanno competenze aggiornate in materia di DORA? Qual è il tasso di obsolescenza delle competenze data analytics nelle funzioni di credito? Se la risposta richiede settimane di ricerca interna, il sistema non è adeguato al ritmo della trasformazione.',
                },
                {
                  n: 2,
                  q: 'La banca sta misurando solo la performance attuale o anche il potenziale di adattamento delle persone?',
                  body: 'I KPI tradizionali misurano soprattutto gli output: obiettivi raggiunti, formazione completata, valutazioni annuali. Ma difficilmente indicano quanto una persona sia pronta ad adattarsi a contesti che evolvono rapidamente. Senza questi dati, le decisioni sul capitale umano restano esposte ai bias dell\'osservazione diretta.',
                },
                {
                  n: 3,
                  q: 'I tuoi sistemi di valutazione reggerebbero una verifica delle autorità di vigilanza?',
                  body: "L'EU AI Act non è una questione futura per le banche europee: è già in vigore. I sistemi di AI utilizzati per valutare e sviluppare il personale sono classificati come ad alto rischio. Chi governa internamente il monitoraggio di questi sistemi? Chi valida i report di bias testing? La chiarezza su questi aspetti è un prerequisito della compliance, non una sua conseguenza.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6"
                  style={{ border: '1px solid rgba(75,77,247,0.12)', background: 'rgba(75,77,247,0.02)' }}
                >
                  <div className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[13px] font-bold"
                      style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}
                    >
                      {item.n}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#0D0D0D]/80 mb-2 leading-snug">{item.q}</p>
                      <p className="text-[13px] text-[#0D0D0D]/55 leading-[1.65]">{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Retention impact */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body21')}</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-6">{t('body22')}</p>
              <div className="flex items-end gap-6 justify-center">
                <div className="text-center">
                  <div className="text-[2rem] font-semibold md:font-bold mb-2" style={{ color: '#EF4444' }}>62%</div>
                  <div className="w-16 bg-red-100 rounded-t-lg mx-auto" style={{ height: '80px' }}>
                    <div className="w-full h-full rounded-t-lg" style={{ background: 'rgba(239,68,68,0.3)' }} />
                  </div>
                  <p className="text-[11px] text-[#0D0D0D]/40 mt-2">{t('body23')}</p>
                </div>
                <div className="text-center">
                  <div className="text-[2rem] font-semibold md:font-bold mb-2" style={{ background: 'linear-gradient(135deg, #4B4DF7, #22C55E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>85%</div>
                  <div className="w-16 rounded-t-lg mx-auto" style={{ height: '110px', background: 'rgba(34,197,94,0.25)' }} />
                  <p className="text-[11px] text-[#0D0D0D]/40 mt-2">{t('body24')}</p>
                </div>
              </div>
              <p className="text-[11px] text-[#0D0D0D]/25 mt-5 italic text-center">{t('body25')}</p>
            </div>

            {/* Next step */}
            <div
              className="rounded-2xl p-8 my-10 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(75,77,247,0.06), rgba(255,95,36,0.06))', border: '1px solid rgba(75,77,247,0.12)' }}
            >
              <h3 className="text-[1.1rem] font-semibold text-[#0D0D0D] mb-3">{t('heading5')}</h3>
              <p className="text-[14px] text-[#0D0D0D]/60 leading-[1.7] mb-6 max-w-[500px] mx-auto">
                {t('body26')}</p>
              <Button asChild variant="primary" mode="light">
                <a
                  href="https://www.skillvue.ai/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tl('exploratoryCall')}
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </div>

            {/* About Skillvue */}
            <div className="border-t border-black/[0.07] pt-8 mt-8">
              <h3 className="text-[1.1rem] font-semibold text-[#0D0D0D] mb-4">{t('heading6')}</h3>
              <Para>
                {t.rich('text46', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Para>
                {t.rich('text47', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            </div>

            {/* References */}
            <div className="border-t border-black/[0.07] pt-8 mt-8">
              <h3 className="text-[1rem] font-semibold text-[#0D0D0D] mb-4">{t('heading7')}</h3>
              <ul className="space-y-2">
                {[
                  'BCE — Supervisory Priorities 2024–2026. Banca Centrale Europea, dicembre 2023.',
                  'BCG — The Adaptive Organization: How to Build Enduring Resilience (2023).',
                  'Deloitte — Global Human Capital Trends 2025. Deloitte Insights, 2025.',
                  'DORA — Digital Operational Resilience Act (Reg. UE 2022/2554).',
                  'EU AI Act — Regolamento UE 2024/1689. In vigore dal 1° agosto 2024; applicazione progressiva fino al 2 agosto 2026 per i sistemi ad alto rischio (Allegato III).',
                  'McKinsey Global Institute — The State of AI in 2024: Generative AI\'s Breakout Year. McKinsey & Company, 2024.',
                  'EBA — Guidelines on the verification of the suitability of members of the management body and key function holders (EBA/GL/2021/06). European Banking Authority, 2021.',
                  'Schmidt, F.L. & Hunter, J.E. (1998, aggiornata 2016). The validity and utility of selection methods in personnel psychology. Psychological Bulletin.',
                  'World Economic Forum — Future of Jobs Report 2023 e 2025.',
                ].map((ref, i) => (
                  <li key={i} className="text-[12px] text-[#0D0D0D]/40 italic leading-[1.6]">{ref}</li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-black/[0.07] pt-6 mt-8 flex items-center justify-between">
              <span className="text-[11px] text-[#0D0D0D]/25">{t('text48')}</span>
              <div className="flex items-center gap-2">
                <SkillvueIcon size={16} />
                <span className="text-[11px] text-[#0D0D0D]/25">{t('text49')}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Page footer */}
      <div className="py-6 px-6 text-center">
        <p className="text-[12px] text-[#0D0D0D]/30">
          {tl('copyright', { year: new Date().getFullYear() })} ·{' '}
          <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
            {t.rich('text50', {
          a: (chunks) => <a href="https://www.skillvue.ai/privacy-policy">{chunks}</a>,
        })}</Button>
          {' '}·{' '}
          <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
            {t.rich('text51', {
          a: (chunks) => <a href="https://www.skillvue.ai">{chunks}</a>,
        })}</Button>
        </p>
      </div>
    </div>
  );
}


export default function LaCrisiDelleCompetenze() {
  const [showWhitepaper, setShowWhitepaper] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('access') === 'true') setShowWhitepaper(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <>

      <AnimatePresence mode="wait">
        {!showWhitepaper ? (
          <motion.div
            key="vetrina"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <VetrinaLayer onUnlock={() => setShowWhitepaper(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="whitepaper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <WhitepaperLayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
