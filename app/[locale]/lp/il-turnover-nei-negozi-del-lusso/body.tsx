// @ts-nocheck
'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HUBSPOT_PORTAL_ID = '48438018';
const HUBSPOT_FORM_ID = 'YOUR_WP_L2_FORM_ID'; // TODO: replace with real form ID

function SkillvueIcon({ size = 24 }: { size?: number }) {
  return (
    <img src="/skillvue-logomark.svg" alt="Skillvue" width={size} height={size}
      style={{ display: 'inline-block', flexShrink: 0 }} />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const heroStats = [
  { value: '30–40%', label: 'Turnover del personale di front line entro 12 mesi' },
  { value: '1,5–2x', label: 'Costo di sostituzione rispetto allo stipendio annuo' },
  { value: '51%', label: 'Advisor che considera di lasciare il lavoro (CXG, 2024)' },
  { value: '0,58', label: "Validità predittiva dell'verification comportamentale" },
];

const featureCards = [
  {
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: 'La relazione advisor-cliente come asset strategico',
    desc: "Meno dell'1% dei clienti genera oltre il 20% della spesa nel lusso. Un advisor eccezionale moltiplica l'intenzione d'acquisto di 5 volte. Il turnover non è un problema HR: è un rischio commerciale di primo ordine.",
  },
  {
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Il costo che nessuno sta calcolando',
    desc: 'Il costo diretto supera 1,5 volte lo stipendio annuo. Ma la voce più pesante — la perdita delle relazioni con clienti VIP il cui lifetime value può superare le centinaia di migliaia di euro — non appare in nessun bilancio.',
  },
  {
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    title: 'Selezione predittiva e retention',
    desc: "Il colloquio non strutturato ha una validità di 0,38. L'verification comportamentale arriva a 0,58. Le aziende che lo adottano registrano un turnover inferiore del 39%. Il massimo ROI si colloca prima della firma del contratto.",
  },
];

function VetrinaLayer({ onUnlock }: { onUnlock: () => void }) {
  const t = useTranslations('lp.il-turnover-nei-negozi-del-lusso');
  const tl = useTranslations('shared.lp');
  const [form, setForm] = useState({ nome: '', cognome: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

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
      await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`, {
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
            pageName: 'Il Turnover nei Negozi del Lusso - WP-L2',
          },
        }),
      });
    } catch (_) {}
    setSubmitting(false);
    setSubmitted(true);
    if (typeof window !== 'undefined') {
      window.open('/lp/il-turnover-nei-negozi-del-lusso?access=true', '_blank');
    }
  };

  return (
    <div style={{ background: '#F8F8FA', minHeight: '100vh', fontFamily: 'inherit' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-4 bg-white"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 12px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <SkillvueIcon size={26} />
          <span className="font-bold text-[15px] text-[#0D0D0D] tracking-[-0.03em]">{t('text')}</span>
        </div>
        <Button variant="primary" mode="light" onClick={scrollToForm}>
          {t('text2')}</Button>
      </nav>

      <section className="pt-[88px] pb-16 px-6 lg:px-10">
        <div className="max-w-[760px] mx-auto text-center pt-16">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
            {t.rich('text3', {
          s: (chunks) => <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase text-white mb-8" style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}>{chunks}</span>,
        })}</motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-[#0D0D0D] leading-[1.1] mb-6">
            {t.rich('text4', {
          s: (chunks) => <span className="block" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{chunks}</span>,
        })}</motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
            className="text-[17px] text-[#0D0D0D]/55 leading-[1.7] mb-4" style={{ fontWeight: 300 }}>
            {t('text5')}</motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.24}
            className="flex items-center justify-center gap-6 text-[12px] text-[#0D0D0D]/35 mb-12">
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

      <section className="pb-16 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {heroStats.map((s, i) => (
              <div key={i} className="rounded-2xl bg-white border border-black/[0.06] p-6 text-center"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div className="text-[2rem] font-semibold md:font-bold tracking-[-0.03em] mb-1.5"
                  style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.value}
                </div>
                <div className="text-[12px] text-[#0D0D0D]/45 leading-snug">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.03em] text-[#0D0D0D] mb-3">{t('heading')}</h2>
            <p className="text-[16px] text-[#0D0D0D]/45 max-w-[580px] mx-auto leading-[1.65]" style={{ fontWeight: 300 }}>
              {t('body')}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {featureCards.map((f, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08}
                className="rounded-2xl border border-black/[0.07] bg-[#F8F8FA] p-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-white"
                  style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}>{f.icon}</div>
                <h3 className="text-[15px] font-semibold text-[#0D0D0D] mb-2 leading-snug">{f.title}</h3>
                <p className="text-[13px] text-[#0D0D0D]/50 leading-[1.65]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 bg-[#F8F8FA]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-[#0D0D0D] leading-[1.15] mb-6">
                {t('heading2')}</h2>
              <ul className="space-y-3 mb-8">
                {[
                  'La struttura economica del turnover nei flagship store europei',
                  'Perché il colloquio non strutturato ha una validità predittiva di appena 0,38',
                  'I 4 rischi strutturali che il turnover amplifica nelle maison',
                  'Come la selezione predittiva riduce il turnover del 39–61%',
                  '3 domande strategiche per il tuo comitato di direzione',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#0D0D0D]/60 leading-snug">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}>
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2 text-[12px] text-[#0D0D0D]/30">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                {tl('dataSafe')}
              </p>
            </motion.div>

            <motion.div ref={formRef} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
              className="rounded-2xl bg-white border border-black/[0.08] p-8 lg:p-10"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
              <h3 className="text-[17px] font-semibold text-[#0D0D0D] mb-1">{t('heading3')}</h3>
              <p className="text-[13px] text-[#0D0D0D]/35 mb-7">{t('body2')}</p>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#0D0D0D] mb-1">{t('body3')}</p>
                    <p className="text-[13px] text-[#0D0D0D]/40">{t('body4')}</p>
                  </div>
                  <Button
                    variant="secondary"
                    mode="light"
                    onClick={() => window.open('/lp/il-turnover-nei-negozi-del-lusso?access=true', '_blank')}
                  >
                    {t('text8')}</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'nome', label: 'Nome', placeholder: 'Il tuo nome', type: 'text' },
                    { key: 'cognome', label: 'Cognome', placeholder: 'Il tuo cognome', type: 'text' },
                    { key: 'email', label: 'Email Lavorativa', placeholder: 'nome@azienda.com', type: 'email' },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-[12px] font-medium text-[#0D0D0D]/60 mb-1.5">
                        {label} <span className="text-red-400">*</span>
                      </label>
                      <input type={type} placeholder={placeholder} value={form[key]}
                        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: '' })); }}
                        className="w-full px-4 py-2.5 rounded-lg border text-[14px] text-[#0D0D0D] outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DF7]/60 focus-visible:border-[#4B4DF7] transition-all"
                        style={{ borderColor: errors[key] ? '#EF4444' : 'rgba(0,0,0,0.12)', background: '#FAFAFA' }} />
                      {errors[key] && <p className="text-[11px] text-red-500 mt-1">{errors[key]}</p>}
                      {key === 'email' && !errors.email && <p className="text-[11px] text-[#0D0D0D]/25 mt-1">{t('body5')}</p>}
                    </div>
                  ))}
                  <Button
                    type="submit"
                    variant="primary"
                    mode="light"
                    disabled={submitting}
                    className="w-full"
                    icon={submitting ? null : undefined}
                  >
                    {submitting ? (
                      <><svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>{tl('loading')}</>
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

// ─── LAYER 2: WHITEPAPER ───────────────────────────────────────────────────────

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-black/[0.08] bg-white p-5 text-center">
      <div className="text-[1.9rem] font-bold tracking-[-0.03em] mb-1"
        style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {value}
      </div>
      <div className="text-[12px] text-[#0D0D0D]/45 leading-snug">{label}</div>
    </div>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-6 my-8"
      style={{ borderLeft: '3px solid', borderImage: 'linear-gradient(180deg, #4B4DF7, #FF5F24) 1', background: 'rgba(75,77,247,0.03)' }}>
      <p className="text-[15px] text-[#0D0D0D]/60 italic leading-[1.7]">{children}</p>
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

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[14.5px] text-[#0D0D0D]/70 leading-[1.75] mb-4">{children}</p>;
}

function InfoBox({ title, children, accent = false }: { title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="rounded-xl p-6 my-6"
      style={{ border: `1px solid ${accent ? 'rgba(255,85,36,0.2)' : 'rgba(75,77,247,0.2)'}`, background: accent ? 'rgba(255,85,36,0.03)' : 'rgba(75,77,247,0.04)' }}>
      <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
        style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {title}
      </p>
      <div className="text-[14px] text-[#0D0D0D]/65 leading-[1.7]">{children}</div>
    </div>
  );
}

function NumberedItem({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-5">
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-[12px] font-bold"
        style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}>{n}</div>
      <div>
        <p className="text-[13px] font-bold mb-1"
          style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {title}
        </p>
        <p className="text-[13.5px] text-[#0D0D0D]/65 leading-[1.65]">{children}</p>
      </div>
    </div>
  );
}

function WhitepaperLayer() {
  const t = useTranslations('lp.il-turnover-nei-negozi-del-lusso');
  const tl = useTranslations('shared.lp');
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: '#F5F5F7', minHeight: '100vh' }}>
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #4B4DF7 0%, #FF5F24 100%)' }} />

      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10 py-3.5 bg-white"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center gap-2.5">
          <SkillvueIcon size={24} />
          <span className="font-bold text-[14px] text-[#0D0D0D] tracking-[-0.03em]">{t('text11')}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="secondary" mode="light">
            <a href="/WP-L2-ITA.pdf" download="Il-Turnover-Negozi-Lusso-Skillvue.pdf">
              <Download aria-hidden="true" />{tl('downloadPdf')}</a>
          </Button>
          <Button asChild variant="primary" mode="light">
            <a href="https://www.skillvue.ai/contact-us" target="_blank" rel="noopener noreferrer">
              {tl('contact')}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </nav>

      <div className="max-w-[760px] mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>

          {/* Cover */}
          <div className="px-10 pt-12 pb-8 text-center border-b border-black/[0.06]">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase text-white mb-7"
              style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}>
              {t('text12')}</span>
            <h1 className="text-[48px] md:text-[2rem] font-semibold tracking-[-0.03em] text-[#0D0D0D] leading-[1.2] mb-2">
              {t.rich('heading4', {
          s: (chunks) => <span className="block" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{chunks}</span>,
        })}</h1>
            <p className="text-[15px] text-[#0D0D0D]/45 italic mt-3 mb-6">{t('body6')}</p>
            <div className="w-10 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
            <p className="text-[13px] text-[#0D0D0D]/40">{t.rich('body7', {
          i: (chunks) => <em>{chunks}</em>,
          i2: (chunks) => <em>{chunks}</em>,
        })}</p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1">{t.rich('body8', {
          i: (chunks) => <em>{chunks}</em>,
        })}</p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1">{t.rich('body9', {
          s: (chunks) => <span style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>{chunks}</span>,
        })}</p>
          </div>

          {/* Body */}
          <div className="px-10 py-10">

            <InfoBox title={t('heading8')}>
              <p>{t.rich('body10', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
              <p className="mt-3">{t.rich('body11', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </InfoBox>

            <div className="grid grid-cols-3 gap-4 my-8">
              <StatBox value="30–40%" label={t('label')} />
              <StatBox value="1,5–2x" label={t('label2')} />
              <StatBox value="51%" label={t('label3')} />
            </div>

            <SectionHeading num="1" title={t('heading9')} />
            <Para>{t.rich('text13', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>{t.rich('text14', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>{t.rich('text15', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Quote>{t('text16')}</Quote>

            <Para>{t.rich('text17', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body12')}</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">{t('body13')}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: '<1%', label: 'dei clienti genera il 20% della spesa globale nel lusso personale', color: '#4B4DF7' },
                  { value: '5x', label: "moltiplicatore dell'intenzione d'acquisto con un advisor eccezionale (CXG)", color: '#FF5F24' },
                  { value: '78%', label: "dei clienti abbandona l'acquisto dopo un'interazione negativa", color: '#4B4DF7' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-[2rem] font-semibold md:font-bold tracking-[-0.03em] mb-1" style={{ color: item.color }}>{item.value}</div>
                    <div className="text-[11px] text-[#0D0D0D]/45 leading-snug">{item.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">{t('body14')}</p>
            </div>

            <SectionHeading num="2" title={t('heading10')} />
            <Para>{t.rich('text18', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>{t.rich('text19', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body15')}</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">{t('body16')}</p>
              <div className="space-y-3">
                {[
                  { label: 'Formazione e onboarding', pct: 35, color: '#FF6550' },
                  { label: 'Recruiting e selezione', pct: 25, color: '#9B59B6' },
                  { label: 'Perdita produttività', pct: 25, color: '#4B4DF7' },
                  { label: 'Erosione relazioni clienti VIP', pct: 15, color: '#FFB74B' },
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
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">{t('body17')}</p>
            </div>

            <Para>{t.rich('text20', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <Quote>{t('text21')}</Quote>

            <SectionHeading num="3" title={t('heading11')} />
            <Para>{t.rich('text22', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            <Para>{t.rich('text23', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
              <p className="text-[12px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">{t('body18')}</p>
              <p className="text-[11px] text-[#0D0D0D]/35 italic mb-5">{t('body19')}</p>
              <div className="space-y-4">
                {[
                  { label: 'Colloquio non strutturato', val: 0.38, pct: 38, color: '#EF4444' },
                  { label: 'Colloquio strutturato', val: 0.51, pct: 51, color: '#FFB74B' },
                  { label: 'Verification comportamentale', val: 0.58, pct: 58, gradient: 'linear-gradient(90deg, #4B4DF7, #7B4DFF)', color: '#4B4DF7' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[12px] mb-1.5">
                      <span className="text-[#0D0D0D]/55">{item.label}</span>
                      <span className="font-bold" style={{ color: item.color }}>{item.val}</span>
                    </div>
                    <div className="h-6 rounded-lg bg-black/[0.05] overflow-hidden">
                      <div className="h-full rounded-lg flex items-center justify-end pr-2"
                        style={{ width: `${item.pct}%`, background: item.gradient || item.color }}>
                        <span className="text-white text-[11px] font-bold">{item.val}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">{t('body20')}</p>
            </div>

            <Para>{t.rich('text24', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <InfoBox title={t('heading12')} accent>
              <p>{t.rich('body21', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b5: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b6: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</p>
            </InfoBox>

            <SectionHeading num="4" title={t('heading13')} />
            <Para>{t.rich('text25', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <div className="grid grid-cols-2 gap-4 my-6">
              {[
                { n: '01', title: 'Erosione del patrimonio relazionale', body: 'Quando un advisor esperto lascia il brand, le relazioni con clienti VIP non vengono trasferite. Si interrompono. Il tempo medio per ricostruirle supera i 12 mesi.' },
                { n: '02', title: 'Perdita di conoscenza tacita', body: 'La padronanza dei codici del brand, delle preferenze individuali dei clienti, delle dinamiche interne al team non è documentabile. Esce con la persona.' },
                { n: '03', title: 'Effetto domino sul team', body: 'Il turnover genera turnover. Uno studio CXG rileva che il 51% dei dipendenti nel luxury retail sta considerando di lasciare il lavoro, in aumento dal 30% di 2 anni prima.' },
                { n: '04', title: 'Esposizione normativa crescente', body: "L'EU AI Act, la Direttiva sulla Trasparenza Retributiva e la CSRD convergono nel 2026–2027. I processi di selezione non strutturati diventano un rischio di compliance." },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[1.1rem] font-bold"
                      style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {item.n}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0D0D0D]/35">{t('text26')}</span>
                  </div>
                  <p className="text-[13px] font-semibold text-[#0D0D0D]/80 mb-2">{item.title}</p>
                  <p className="text-[12.5px] text-[#0D0D0D]/55 leading-[1.65]">{item.body}</p>
                </div>
              ))}
            </div>

            <Para>{t.rich('text27', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b4: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b5: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>

            <SectionHeading num="5" title={t('heading14')} />

            <NumberedItem n={1} title={t('heading15')}>
              {t.rich('text28', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>
            <NumberedItem n={2} title={t('heading16')}>
              {t.rich('text29', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>
            <NumberedItem n={3} title={t('heading17')}>
              {t.rich('text30', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</NumberedItem>

            <Quote>{t('text31')}</Quote>

            <SectionHeading title={t('heading18')} />
            {[
              { n: '1', title: 'Quanto costa realmente il turnover nei tuoi flagship store?', body: 'Non il costo medio di settore, ma il costo specifico della tua organizzazione. Includi il recruiting, la formazione, il ramp-up di produttività e la perdita stimata di fatturato legata alla discontinuità relazionale con i clienti VIP. Se la tua funzione HR non è in grado di rispondere a questa domanda con un numero, è probabile che il problema sia più grande di quanto il management attualmente percepisce.' },
              { n: '2', title: 'Il tuo processo di selezione è in grado di distinguere chi resterà da chi se ne andrà?', body: 'Se il turnover del primo anno nei tuoi negozi supera il 25%, il problema non è la retention. È la selezione. Chiedi alla tua funzione Talent Acquisition quale sia la validità predittiva degli strumenti che utilizza. Se la risposta è un colloquio non strutturato, la ricerca scientifica indica che stai operando con un margine di errore del 62%.' },
              { n: '3', title: 'La tua organizzazione è pronta per la convergenza normativa del 2026–2027?', body: 'Pay Transparency Directive, EU AI Act e CSRD richiederanno entro il prossimo anno processi di selezione documentabili, auditabili e coerenti nei criteri applicati. I tassi di turnover, il gender pay gap e gli investimenti in formazione diventeranno metriche ESG visibili agli investitori.' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-6 mb-4"
                style={{ border: '1px solid rgba(75,77,247,0.12)', background: i % 2 === 0 ? 'rgba(75,77,247,0.03)' : 'rgba(255,95,36,0.03)' }}>
                <span className="text-[1.5rem] font-bold"
                  style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {item.n}
                </span>
                <p className="text-[14px] font-bold text-[#0D0D0D]/80 mt-1 mb-2">{item.title}</p>
                <p className="text-[13px] text-[#0D0D0D]/60 leading-[1.7]">{item.body}</p>
              </div>
            ))}

            <Quote>{t('text32')}</Quote>

            <div className="border-t border-black/[0.07] pt-8 mt-8">
              <h3 className="text-[1.1rem] font-semibold text-[#0D0D0D] mb-4">{t('heading5')}</h3>
              <Para>{t.rich('text33', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b3: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Button asChild variant="primary" mode="light" className="mt-2">
                <a href="https://www.skillvue.ai/contact-us" target="_blank" rel="noopener noreferrer">
                  {tl('exploratoryCall')}
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </div>

            <div className="border-t border-black/[0.07] pt-8 mt-8">
              <h3 className="text-[1.1rem] font-semibold text-[#0D0D0D] mb-4">{t('heading6')}</h3>
              <Para>{t.rich('text34', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
              <Para>{t.rich('text35', {
          b: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
          b2: (chunks) => <strong className="text-[#0D0D0D]/80">{chunks}</strong>,
        })}</Para>
            </div>

            <div className="border-t border-black/[0.07] pt-8 mt-8">
              <h3 className="text-[1rem] font-semibold text-[#0D0D0D] mb-4">{t('heading7')}</h3>
              <ul className="space-y-2">
                {[
                  'Bain & Company / Altagamma, Luxury Study 2024 e 2025: "Finding a New Longevity for Luxury".',
                  'Bain & Company / Altagamma, True-Luxury Global Consumer Insight 2024.',
                  'McKinsey & Company, The State of Fashion 2025 e 2026; The State of Luxury 2025.',
                  'Deloitte, Global Powers of Luxury Goods 2024.',
                  'CXG, "The Advisor Effect" (2024), studio su 12.000 survey in 12 brand del lusso.',
                  'MAD Consultancy (Delphine Vitry, Jean Revis), via WWD (2023) e FashionNetwork (2025).',
                  'Gallup, "This Fixable Problem Costs U.S. Businesses $1 Trillion" (2019).',
                  'Work Institute, Retention Report 2024.',
                  'SHRM, Human Capital Benchmarking Report 2023.',
                  'Schmidt F.L., Oh I-S., The Validity and Utility of Selection Methods: 100 Years of Research. Working Paper, 2016.',
                  'Hogan Verifications, Retail Personality Verifications e Success Stories (2021).',
                  'Regolamento (UE) 2024/1689, Artificial Intelligence Act, luglio 2024.',
                  'Direttiva (UE) 2023/970, Trasparenza Retributiva, maggio 2023.',
                ].map((ref, i) => (
                  <li key={i} className="text-[12px] text-[#0D0D0D]/40 italic leading-[1.6]">{ref}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-black/[0.07] pt-6 mt-8 flex items-center justify-between">
              <span className="text-[11px] text-[#0D0D0D]/25">{t('text36')}</span>
              <div className="flex items-center gap-2">
                <SkillvueIcon size={16} />
                <span className="text-[11px] text-[#0D0D0D]/25">{t('text37')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 px-6 text-center">
        <p className="text-[12px] text-[#0D0D0D]/30">
          {tl('copyright', { year: new Date().getFullYear() })} ·{' '}
          <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
            {t.rich('text38', {
          a: (chunks) => <a href="https://www.skillvue.ai/privacy-policy">{chunks}</a>,
        })}</Button>
          {' '}·{' '}
          <Button asChild variant="tertiary" mode="light" icon={null} className="text-[12px]">
            {t.rich('text39', {
          a: (chunks) => <a href="https://www.skillvue.ai">{chunks}</a>,
        })}</Button>
        </p>
      </div>
    </div>
  );
}


export default function IlTurnoverNeiNegoziDelLusso() {
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
          <motion.div key="vetrina" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <VetrinaLayer onUnlock={() => setShowWhitepaper(true)} />
          </motion.div>
        ) : (
          <motion.div key="whitepaper" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <WhitepaperLayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
