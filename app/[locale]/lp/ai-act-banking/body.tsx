// @ts-nocheck
'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HUBSPOT_PORTAL_ID = '48438018';
const HUBSPOT_FORM_ID = 'YOUR_WP_B1_FORM_ID'; // TODO: replace with real form ID

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
  { value: '2026', label: 'Scadenza AI Act per sistemi ad alto rischio' },
  { value: '68%', label: 'dei CHRO europei: AI governance HR è priorità strategica' },
  { value: '3%', label: 'del fatturato globale — sanzione massima per deployer non conformi' },
  { value: '0,38', label: 'Validità predittiva del colloquio non strutturato' },
];

const featureCards = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'La classificazione che cambia tutto',
    desc: "L'AI Act classifica i sistemi di screening, ranking e assunzione come applicazioni ad alto rischio (Allegato III, punto 4). Le banche che li utilizzano sono deployer responsabili — la responsabilità non è delegabile al fornitore.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Il rischio oltre la sanzione',
    desc: 'Il 3% del fatturato è la parte visibile. Il rischio reputazionale, in un settore regolato come il banking — con vigilanza BCE, linee guida EBA e audit regolatori — pesa di più. E i candidati qualificati scelgono chi è trasparente.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'I tre criteri per valutare un fornitore AI',
    desc: "Explainability per decisione, gestione trasparente dell'incertezza, audit trail completo. Non sono requisiti aggiuntivi: sono indicatori della maturità tecnica del sistema. Conformità e qualità tendono a coincidere.",
  },
];

function VetrinaLayer({ onUnlock }: { onUnlock: () => void }) {
  const t = useTranslations('lp.ai-act-banking');
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
              pageName: 'AI Act-compliant nel Banking - WP-B1',
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
      window.open('/lp/ai-act-banking?access=true', '_blank');
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
                  'La classificazione AI Act e gli obblighi reali per le banche deployer',
                  'Perché il rischio reputazionale pesa più della sanzione del 3%',
                  'I 3 criteri per valutare se un sistema AI è davvero conforme',
                  'Come HR e Compliance devono collaborare per essere conformi',
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
                    onClick={() => window.open('/lp/ai-act-banking?access=true', '_blank')}
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
      className="text-[14px] font-semibold mb-2 mt-6"
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
  const t = useTranslations('lp.ai-act-banking');
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
              href="/WP-B1-ITA.pdf"
              download="AI-Act-compliant-Banking-Skillvue.pdf"
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
            <div className="w-10 h-px mx-auto mb-5 mt-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
            <p className="text-[13px] text-[#0D0D0D]/40">
              {t.rich('body6', {
          i: (chunks) => <em>{chunks}</em>,
          i2: (chunks) => <em>{chunks}</em>,
        })}</p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1">{t.rich('body7', {
          i: (chunks) => <em>{chunks}</em>,
        })}</p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1">
              {t.rich('body8', {
          s: (chunks) => <span style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>{chunks}</span>,
        })}</p>
          </div>

          {/* Document Body */}
          <div className="px-10 py-10">

            <InfoBox title={t('heading6')}>
              <p>
                {t.rich('body9', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </InfoBox>

            <div className="grid grid-cols-2 gap-4 my-8">
              <StatBox value="2026" label={t('label7')} />
              <StatBox value="68%" label={t('label8')} />
              <StatBox value="3%" label={t('label9')} />
              <StatBox value="0,38" label={t('label10')} />
            </div>

            {/* Systems exposure chart */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">
                {t('body10')}</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">{t('body11')}</p>
              <div className="space-y-3">
                {[
                  { label: 'Tool di screening CV', pct: 90, color: '#FF6550' },
                  { label: 'Test attitudinali con AI scoring', pct: 85, color: '#4B4DF7' },
                  { label: 'Piattaforme video-intervista', pct: 75, color: '#9B59B6' },
                  { label: 'Chatbot di pre-screening', pct: 60, color: '#FFB74B' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-[#0D0D0D]/55">{item.label}</span>
                      <span className="font-semibold" style={{ color: item.color }}>{item.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/[0.06] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SectionHeading num="1" title={t('heading7')} />
            <Para>
              {t.rich('text13', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text14', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <InfoBox title={t('heading8')}>
              <p>
                {t.rich('body12', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </InfoBox>

            <SectionHeading num="2" title={t('heading9')} />
            <Para>
              {t.rich('text15', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text16', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text17', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Predictive validity chart */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">
                {t('body13')}</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">
                {t('body14')}</p>
              <div className="space-y-4">
                {[
                  { label: 'Colloquio non strutturato', val: 0.38, pct: 38, color: '#FF6550' },
                  { label: 'Valutazione comportamentale strutturata', val: 0.54, pct: 54, color: '#4B4DF7' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[13px] mb-1.5">
                      <span className="text-[#0D0D0D]/60">{item.label}</span>
                      <span className="font-bold" style={{ color: item.color }}>{item.val}</span>
                    </div>
                    <div className="h-8 rounded-lg bg-black/[0.05] overflow-hidden flex items-center">
                      <div
                        className="h-full rounded-lg flex items-center justify-center"
                        style={{ width: `${item.pct}%`, background: item.color }}
                      >
                        <span className="text-white text-[12px] font-bold">{item.val}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SectionHeading num="3" title={'Cosa significa davvero "high-risk AI compliance" per chi seleziona'} />

            <Quote source="McKinsey Global Institute, The State of AI in 2024">
              {t('text18')}</Quote>

            <Para>
              {t.rich('text19', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <SubHeading title={t('heading10')} />
            <Para>
              {t.rich('text20', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <SubHeading title={t('heading11')} />
            <Para>
              {t.rich('text21', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text22', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <SubHeading title={t('heading12')} />
            <Para>
              {t.rich('text23', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            {/* Three pillars */}
            <div className="grid grid-cols-3 gap-3 my-8">
              {[
                { n: '01', label: 'Explainability per decisioni', sub: 'Art. 13 · Trasparenza' },
                { n: '02', label: 'Human-in-the-loop', sub: 'Art. 14 · Supervisione umana' },
                { n: '03', label: 'Bias testing documentato', sub: 'Art. 9-10 · Rischi e Dati' },
              ].map((p, i) => (
                <div key={i} className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-4 text-center">
                  <div
                    className="text-[1.4rem] font-bold mb-1"
                    style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {p.n}
                  </div>
                  <p className="text-[12px] font-bold text-[#0D0D0D]/70 leading-snug mb-1">{p.label}</p>
                  <p className="text-[10px] text-[#0D0D0D]/35 uppercase tracking-wide">{p.sub}</p>
                </div>
              ))}
            </div>

            <InfoBox title={t('heading13')} accent>
              <p>
                {t.rich('body15', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </InfoBox>

            <SectionHeading num="4" title={t('heading14')} />
            <Para>
              {t('text24')}</Para>
            <Para>
              {t.rich('text25', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text26', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Quote source="Deloitte, Global Human Capital Trends 2025">
              {t('text27')}</Quote>

            <SectionHeading num="5" title={t('heading15')} />
            <Para>
              {t('text28')}</Para>

            <NumberedItem n={1} title={t('heading16')}>
              {t.rich('text29', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <NumberedItem n={2} title={t('heading17')}>
              {t.rich('text30', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <NumberedItem n={3} title={t('heading18')}>
              {t.rich('text31', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            {/* Retention chart */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">
                {t('body16')}</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-6">
                {t('body17')}</p>
              <div className="flex items-end justify-center gap-12">
                <div className="text-center">
                  <div className="w-20 mx-auto rounded-t-lg mb-2" style={{ height: '88px', background: '#FF6550' }} />
                  <div className="text-[1.6rem] font-bold text-[#FF6550]">62%</div>
                  <div className="text-[11px] text-[#0D0D0D]/40 mt-1 leading-snug">{t.rich('text32', {
          br: () => <br />,
        })}</div>
                </div>
                <div className="text-center">
                  <div className="w-20 mx-auto rounded-t-lg mb-2" style={{ height: '121px', background: '#4B4DF7' }} />
                  <div className="text-[1.6rem] font-bold text-[#4B4DF7]">85%</div>
                  <div className="text-[11px] text-[#0D0D0D]/40 mt-1 leading-snug">{t.rich('text33', {
          br: () => <br />,
        })}</div>
                </div>
              </div>
            </div>

            <InfoBox title={t('heading19')}>
              <p>
                {t.rich('body18', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </InfoBox>

            <SectionHeading num="6" title={t('heading20')} />
            <Para>
              {t('text34')}</Para>
            <Para>
              {t.rich('text35', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t.rich('text36', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <div className="rounded-xl border border-black/[0.08] p-6 my-8 text-center">
              <div className="flex items-center justify-center gap-6">
                <p className="text-[1.15rem] font-bold italic" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {t.rich('body19', {
          br: () => <br />,
        })}</p>
                <span className="text-[1.5rem] font-bold" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>=</span>
                <p className="text-[1.15rem] font-bold italic" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {t.rich('body20', {
          br: () => <br />,
        })}</p>
              </div>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mt-3">
                {t('body21')}</p>
            </div>

            <Para>
              {t.rich('text37', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>
              {t('text38')}</Para>

            {/* Economics summary */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t('body22')}</p>
              <ul className="space-y-2 text-[13.5px] text-[#0D0D0D]/65 leading-snug">
                <li>{t.rich('item', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          s: (chunks) => <span style={{ color: '#4B4DF7', fontWeight: 700 }}>{chunks}</span>,
        })}</li>
                <li>{t.rich('item2', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          s: (chunks) => <span style={{ color: '#4B4DF7', fontWeight: 700 }}>{chunks}</span>,
        })}</li>
                <li>{t.rich('item3', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          s: (chunks) => <span style={{ color: '#FF6550', fontWeight: 700 }}>{chunks}</span>,
        })}</li>
                <li>{t.rich('item4', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          s: (chunks) => <span style={{ color: '#FF6550', fontWeight: 700 }}>{chunks}</span>,
        })}</li>
                <li>{t.rich('item5', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          s: (chunks) => <span style={{ color: '#FF6550', fontWeight: 700 }}>{chunks}</span>,
        })}</li>
              </ul>
            </div>

            <SectionHeading title={t('heading21')} />
            <Para>
              {t.rich('text39', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <NumberedItem n={1} title={t('heading22')}>
              {t.rich('text40', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <NumberedItem n={2} title={t('heading23')}>
              {t.rich('text41', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <NumberedItem n={3} title={t('heading24')}>
              {t.rich('text42', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <Quote>
              {t('text43')}</Quote>

            {/* Next step */}
            <div className="mt-10 pt-8 border-t border-black/[0.07]">
              <h3 className="text-[1rem] font-semibold text-[#0D0D0D] mb-3">{t('heading5')}</h3>
              <Para>
                {t('text44')}</Para>
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

            {/* Sources */}
            <div className="mt-10 pt-6 border-t border-black/[0.07]">
              <p className="text-[11px] font-bold text-[#0D0D0D]/30 uppercase tracking-[0.18em] mb-3">{t('body23')}</p>
              <ul className="space-y-1.5 text-[11.5px] text-[#0D0D0D]/35 italic leading-snug">
                <li>{t('item6')}</li>
                <li>{t('item7')}</li>
                <li>{t('item8')}</li>
                <li>{t('item9')}</li>
                <li>{t('item10')}</li>
                <li>{t('item11')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 lg:px-10 border-t border-black/[0.06] bg-white mt-8">
        <div className="max-w-[760px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <SkillvueIcon size={20} />
            <span className="text-[12px] text-[#0D0D0D]/30">{tl('copyright', { year: new Date().getFullYear() })}</span>
          </div>
          <div className="flex items-center gap-5 text-[12px]">
            <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
              {t.rich('text45', {
          a: (chunks) => <a href="https://www.skillvue.ai/privacy-policy">{chunks}</a>,
        })}</Button>
            <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
              {t.rich('text46', {
          a: (chunks) => <a href="https://www.skillvue.ai">{chunks}</a>,
        })}</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default function AIActBankingPage() {
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
