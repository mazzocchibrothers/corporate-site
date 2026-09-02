// @ts-nocheck
'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HUBSPOT_PORTAL_ID = '48438018';
const HUBSPOT_FORM_ID = 'YOUR_WP_L1_FORM_ID'; // TODO: replace with real form ID

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
  { value: '30-40%', label: 'Turnover front-line entro 12 mesi nei flagship store europei' },
  { value: '€358 mld', label: 'Mercato globale lusso 2025' },
  { value: '0,58', label: 'Validità predittiva dell\'verification comportamentale' },
  { value: '1,5x', label: 'Costo di sostituzione di un front-liner rispetto allo stipendio annuo' },
];

const featureCards = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Il paradosso dell\'identità di brand',
    desc: 'Le maison del lusso sono tra le organizzazioni più attente al dettaglio al mondo. Eppure il processo con cui selezionano le persone che incarnano il brand rimane il meno strutturato dell\'intera catena del valore.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Perché il colloquio non basta',
    desc: 'Il colloquio strutturato raggiunge una validità di 0,51. L\'verification comportamentale situazionale arriva a 0,58 per i ruoli ad alta componente relazionale. Nel lusso, dove il costo del falso positivo è strutturalmente più alto, il margine conta.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'I rischi non misurati',
    desc: 'Quattro rischi strutturali che la maggior parte delle maison non sta misurando: dal bias da esperienza settoriale al rischio regolatorio EU AI Act, fino all\'omologazione culturale che blocca l\'adattamento ai nuovi mercati.',
  },
];

function VetrinaLayer({ onUnlock }: { onUnlock: () => void }) {
  const t = useTranslations('lp.arte-di-misurare-allineamento');
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
              pageName: 'L\'arte di misurare l\'allineamento al brand - WP-L1',
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
      window.open('/lp/arte-di-misurare-allineamento?access=true', '_blank');
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
                  'Il punto di frattura della catena del valore nel luxury retail',
                  'Perché il colloquio strutturato (0,51) non basta nei ruoli ad alta componente relazionale',
                  'I 4 rischi strutturali che la selezione tradizionale lascia scoperti',
                  'Come costruire un profilo comportamentale target calibrato empiricamente',
                  'Il quadro EU AI Act applicato ai processi di hiring nelle maison',
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
                    onClick={() => window.open('/lp/arte-di-misurare-allineamento?access=true', '_blank')}
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
  const t = useTranslations('lp.arte-di-misurare-allineamento');
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
              href="/WP-L1-ITA.pdf"
              download="Arte-Misurare-Allineamento-Brand-Skillvue.pdf"
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
            <InfoBox title={t('heading5')}>
              <p>
                {t.rich('body10', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b5: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </InfoBox>

            {/* Cover stats */}
            <div className="grid grid-cols-3 gap-4 my-8">
              <StatBox value="30-40%" label={t('label7')} />
              <StatBox value="€358 mld" label={t('label8')} />
              <StatBox value="0,51" label={t('label9')} />
            </div>

            {/* Turnover cost breakdown */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body11')}</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">{t('body12')}</p>
              <div className="space-y-3">
                {[
                  { label: 'Formazione e onboarding', pct: 32, color: '#FF6550' },
                  { label: 'Recruiting e selezione', pct: 28, color: '#9B59B6' },
                  { label: 'Perdita produttività', pct: 25, color: '#4B4DF7' },
                  { label: 'Gestione uscita', pct: 15, color: '#FFB74B' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-[#0D0D0D]/55">{item.label}</span>
                      <span className="font-semibold" style={{ color: item.color }}>{item.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-black/[0.06]">
                      <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">
                {t('body13')}</p>
            </div>

            <Para>
              {t.rich('text13', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Quote>
              {t('text14')}</Quote>

            <Para>
              {t.rich('text15', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Section 1 */}
            <SectionHeading num="1" title={t('heading6')} />
            <Para>
              {t.rich('text16', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text17', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Value chain gap chart */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body14')}</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">{t('body15')}</p>
              <div className="space-y-3">
                {[
                  { label: 'Identità visiva', stdPct: 98, actualPct: 90 },
                  { label: 'Posizionamento di prezzo', stdPct: 95, actualPct: 82 },
                  { label: 'Qualità del prodotto', stdPct: 97, actualPct: 88 },
                  { label: 'In-store experience', stdPct: 92, actualPct: 75 },
                  { label: 'Comunicazione esterna', stdPct: 90, actualPct: 72 },
                  { label: 'Selezione del personale', stdPct: 90, actualPct: 28, critical: true },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-[#0D0D0D]/55">{item.label}</span>
                      {item.critical && <span className="font-bold text-[#EF4444] text-[11px]">{t('text18')}</span>}
                    </div>
                    <div className="relative h-2 rounded-full bg-black/[0.06]">
                      <div className="absolute h-full rounded-full opacity-20" style={{ width: `${item.stdPct}%`, background: '#4B4DF7' }} />
                      <div className="absolute h-full rounded-full" style={{ width: `${item.actualPct}%`, background: item.critical ? '#EF4444' : '#4B4DF7' }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">
                {t('body16')}</p>
            </div>

            {/* Section 2 */}
            <SectionHeading num="2" title={t('heading7')} />
            <Para>
              {t.rich('text19', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          i: (chunks) => <em>{chunks}</em>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text20', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text21', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text22', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Quote>
              {t('text23')}</Quote>

            {/* Section 3 */}
            <SectionHeading num="3" title={t('heading8')} />
            <Para>
              {t.rich('text24', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <div className="space-y-0 my-8">
              <NumberedItem n={1} title={t('heading9')}>
                {t('text25')}</NumberedItem>
              <NumberedItem n={2} title={t('heading10')}>
                {t('text26')}</NumberedItem>
              <NumberedItem n={3} title={t('heading11')}>
                {t('text27')}</NumberedItem>
              <NumberedItem n={4} title={t('heading12')}>
                {t('text28')}</NumberedItem>
            </div>

            {/* Section 4 */}
            <SectionHeading num="4" title={t('heading13')} />
            <Para>
              {t.rich('text29', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text30', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b5: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Predictive validity chart */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
              <p className="text-[12px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body17')}</p>
              <p className="text-[11px] text-[#0D0D0D]/35 italic mb-5">{t('body18')}</p>
              <div className="space-y-4">
                {[
                  { label: 'Colloquio non strutturato', value: 0.38, pct: 38, color: '#EF4444' },
                  { label: 'Colloquio strutturato', value: 0.51, pct: 51, color: '#FF8C00' },
                  { label: 'Verification comportamentale', value: 0.58, pct: 58, gradStart: '#4B4DF7', gradEnd: '#FF5F24' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[12px] mb-1.5">
                      <span className="text-[#0D0D0D]/55">{item.label}</span>
                      <span className="font-bold" style={{ color: item.gradStart || item.color }}>{item.value}</span>
                    </div>
                    <div className="h-6 rounded-lg bg-black/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-lg flex items-center justify-end pr-2"
                        style={{
                          width: `${item.pct}%`,
                          background: item.gradStart
                            ? `linear-gradient(90deg, ${item.gradStart}, ${item.gradEnd})`
                            : item.color,
                        }}
                      >
                        <span className="text-white text-[11px] font-bold">{item.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">{t('body19')}</p>
            </div>

            <Para>
              {t.rich('text31', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text32', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Quote>
              {t('text33')}</Quote>

            {/* Section 5 */}
            <SectionHeading num="5" title={t('heading14')} />

            <SubHeading title={t('heading15')} />
            <Para>
              {t.rich('text34', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <SubHeading title={t('heading16')} />
            <Para>
              {t.rich('text35', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <SubHeading title={t('heading17')} />
            <Para>
              {t.rich('text36', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Quote>
              {t('text37')}</Quote>

            {/* Risks summary grid */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-5">{t('body20')}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: '01', title: 'Conformità vs. predisposizione', desc: 'L\'esperienza settoriale viene usata come proxy dell\'allineamento comportamentale, senza misurare le predisposizioni sottostanti.' },
                  { n: '02', title: 'Pool demografico limitato', desc: 'Il 70% del bacino di talento disponibile viene escluso sistematicamente dai processi focalizzati sul solo settore lusso.' },
                  { n: '03', title: 'Omologazione culturale', desc: 'Assumere per somiglianza riduce progressivamente la capacità di adattamento ai nuovi mercati e consumatori.' },
                  { n: '04', title: 'Rischio regolatorio EU AI Act', desc: 'Processi non documentabili e non auditabili espongono le maison a rischi di compliance in rapida crescita.' },
                ].map((item, i) => (
                  <div key={i} className="rounded-lg bg-white border border-black/[0.07] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[11px] font-bold"
                        style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                      >
                        {item.n}
                      </span>
                      <div className="h-px flex-1 bg-black/[0.06]" />
                    </div>
                    <p className="text-[12px] font-semibold text-[#0D0D0D]/75 mb-1">{item.title}</p>
                    <p className="text-[11.5px] text-[#0D0D0D]/50 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
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
                {t('body22')}</p>
              <p className="text-[14px] text-[#0D0D0D]/65 leading-[1.7] mb-5">
                {t.rich('body23', {
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

            {/* References */}
            <div className="mt-10 pt-8 border-t border-black/[0.06]">
              <p className="text-[11px] font-bold text-[#0D0D0D]/40 uppercase tracking-[0.18em] mb-4">{t('body24')}</p>
              <ul className="space-y-2">
                {[
                  'Bain & Company, True-Luxury Global Consumer Insight 2024 e Bain Luxury Study 2024.',
                  'Deloitte, Global Powers of Luxury Goods 2024.',
                  'McKinsey & Company, The State of Fashion 2024; The War for Talent: HR analytics in practice, 2023.',
                  'LVMH Group, Annual Report 2023.',
                  'Schmidt F.L., Hunter J.E., The Validity and Utility of Selection Methods in Personnel Psychology. Psychological Bulletin, 124(2), 1998.',
                  'Campion M.A., Palmer D.K., Campion J.E., A Review of Structure in the Selection Interview. Personnel Psychology, 50(3), 1997.',
                  'Ones D.S., Viswesvaran C., Schmidt F.L., Comprehensive Meta-Analysis of Integrity Test Validities. Journal of Applied Psychology, 78(4), 1993.',
                  'Levashina J., Campion M.A., Measuring Faking in the Employment Interview. Journal of Applied Psychology, 92(6), 2007.',
                  'Regolamento (UE) 2024/1689 del Parlamento Europeo e del Consiglio — Artificial Intelligence Act, luglio 2024.',
                ].map((ref, i) => (
                  <li key={i} className="text-[12px] text-[#0D0D0D]/35 italic leading-snug">{ref}</li>
                ))}
              </ul>
            </div>

            {/* Footer brand */}
            <div className="mt-10 pt-6 border-t border-black/[0.06] text-center">
              <p className="text-[12px] text-[#0D0D0D]/30 mb-2">{t('body25')}</p>
              <div className="flex items-center justify-center gap-2">
                <SkillvueIcon size={22} />
                <span className="font-bold text-[16px] text-[#0D0D0D]/70 tracking-[-0.03em]">{t('text38')}</span>
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
              {t.rich('text39', {
          a: (chunks) => <a href="https://www.skillvue.ai/privacy-policy">{chunks}</a>,
        })}</Button>
            <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
              {t.rich('text40', {
          a: (chunks) => <a href="https://www.skillvue.ai">{chunks}</a>,
        })}</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default function ArteAllineamentoPage() {
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
