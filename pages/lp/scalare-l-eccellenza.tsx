// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

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
    title: 'La promessa dell\'assessment intelligente',
    desc: 'Come processare centinaia di candidature stagionali senza abbassare la soglia di eccellenza del brand: la distinzione tra automazione e augmentation, e perché l\'assessment comportamentale strutturato (0,58 di validità predittiva) è l\'unico strumento scalabile.',
  },
];

function VetrinaLayer({ onUnlock }: { onUnlock: () => void }) {
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
          <span className="font-bold text-[15px] text-[#0D0D0D] tracking-[-0.01em]">Skillvue</span>
        </div>
        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}
        >
          Scarica il Report
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </nav>

      {/* HERO */}
      <section className="pt-[88px] pb-16 px-6 lg:px-10">
        <div className="max-w-[760px] mx-auto text-center pt-16">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase text-white mb-8"
              style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}
            >
              Retail Lusso · 2026
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-[-0.03em] text-[#0D0D0D] leading-[1.1] mb-6"
          >
            Scalare l'eccellenza{' '}
            <span
              className="block"
              style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              senza perdere l'esclusività
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
            className="text-[17px] text-[#0D0D0D]/55 leading-[1.7] mb-4"
            style={{ fontWeight: 300 }}
          >
            AI assessment per la selezione stagionale ad alto volume nel lusso
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.24}
            className="flex items-center justify-center gap-6 text-[12px] text-[#0D0D0D]/35 mb-12"
          >
            <span>A cura di <strong className="text-[#0D0D0D]/55">Skillvue</strong></span>
            <span className="w-px h-3 bg-[#0D0D0D]/15" />
            <span>~6 min read</span>
          </motion.div>

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
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[15px] font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)', boxShadow: '0 8px 24px rgba(75,77,247,0.25)' }}
            >
              Scarica il Report Completo
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
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
                  className="text-[2rem] font-bold tracking-[-0.03em] mb-1.5"
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
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.025em] text-[#0D0D0D] mb-3">
              Cosa troverai nel report
            </h2>
            <p className="text-[16px] text-[#0D0D0D]/45 max-w-[580px] mx-auto leading-[1.65]" style={{ fontWeight: 300 }}>
              Un'analisi operativa per chi guida la strategia di hiring nelle maison del lusso e deve gestire volumi stagionali senza compromettere i propri standard.
            </p>
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
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-bold tracking-[-0.025em] text-[#0D0D0D] leading-[1.15] mb-6">
                Scarica il report completo
              </h2>
              <ul className="space-y-3 mb-8">
                {[
                  'Il paradosso tra volume di hiring e identità di brand nel luxury retail',
                  'Perché il 68% dei VIC seguirebbe il proprio advisor presso la concorrenza',
                  'L\'equazione impossibile: velocità, scala e sensibilità del brand',
                  'Come l\'AI assessment garantisce standard uniformi dal primo al millesimo candidato',
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
                I tuoi dati sono al sicuro. Niente spam.
              </p>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              ref={formRef}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
              className="rounded-2xl bg-white border border-black/[0.08] p-8 lg:p-10"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
            >
              <h3 className="text-[17px] font-bold text-[#0D0D0D] mb-1">Compila per scaricare il PDF</h3>
              <p className="text-[13px] text-[#0D0D0D]/35 mb-7">Gratuito · Accesso immediato</p>

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
                    <p className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Il whitepaper si è aperto in una nuova scheda.</p>
                    <p className="text-[13px] text-[#0D0D0D]/40">Controlla il tuo browser se non lo vedi subito.</p>
                  </div>
                  <button
                    onClick={() => window.open('/lp/scalare-l-eccellenza?access=true', '_blank')}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold border transition-all hover:opacity-70"
                    style={{ borderColor: 'rgba(75,77,247,0.3)', color: '#4B4DF7' }}
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Apri di nuovo
                  </button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-medium text-[#0D0D0D]/60 mb-1.5">
                    Nome <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Il tuo nome"
                    value={form.nome}
                    onChange={e => { setForm(f => ({ ...f, nome: e.target.value })); setErrors(er => ({ ...er, nome: '' })); }}
                    className="w-full px-4 py-2.5 rounded-lg border text-[14px] text-[#0D0D0D] outline-none transition-all"
                    style={{ borderColor: errors.nome ? '#EF4444' : 'rgba(0,0,0,0.12)', background: '#FAFAFA' }}
                  />
                  {errors.nome && <p className="text-[11px] text-red-500 mt-1">{errors.nome}</p>}
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#0D0D0D]/60 mb-1.5">
                    Cognome <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Il tuo cognome"
                    value={form.cognome}
                    onChange={e => { setForm(f => ({ ...f, cognome: e.target.value })); setErrors(er => ({ ...er, cognome: '' })); }}
                    className="w-full px-4 py-2.5 rounded-lg border text-[14px] text-[#0D0D0D] outline-none transition-all"
                    style={{ borderColor: errors.cognome ? '#EF4444' : 'rgba(0,0,0,0.12)', background: '#FAFAFA' }}
                  />
                  {errors.cognome && <p className="text-[11px] text-red-500 mt-1">{errors.cognome}</p>}
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#0D0D0D]/60 mb-1.5">
                    Email Lavorativa <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="nome@azienda.com"
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }}
                    className="w-full px-4 py-2.5 rounded-lg border text-[14px] text-[#0D0D0D] outline-none transition-all"
                    style={{ borderColor: errors.email ? '#EF4444' : 'rgba(0,0,0,0.12)', background: '#FAFAFA' }}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                  {!errors.email && <p className="text-[11px] text-[#0D0D0D]/25 mt-1">Richiesta email aziendale (non personale)</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)', marginTop: '8px' }}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Caricamento…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Scarica il Report
                    </>
                  )}
                </button>
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
            <span className="text-[12px] text-[#0D0D0D]/30">© {new Date().getFullYear()} Skillvue S.r.l. — Tutti i diritti riservati.</span>
          </div>
          <div className="flex items-center gap-5 text-[12px] text-[#0D0D0D]/25">
            <a href="https://www.skillvue.ai/privacy-policy" className="hover:text-[#4B4DF7] transition-colors">Privacy Policy</a>
            <a href="https://www.skillvue.ai" className="hover:text-[#4B4DF7] transition-colors">skillvue.ai</a>
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
        className="text-[1.9rem] font-bold tracking-[-0.02em] mb-1"
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
      <h2 className="text-[1.5rem] font-bold tracking-[-0.02em] text-[#0D0D0D]">
        {num && <span className="mr-1">{num}.</span>}{title}
      </h2>
    </div>
  );
}

function SubHeading({ title }: { title: string }) {
  return (
    <h3
      className="text-[14px] font-bold mb-2 mt-6 flex items-center gap-2"
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
          <span className="font-bold text-[14px] text-[#0D0D0D] tracking-[-0.01em]">Skillvue</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/WP-L3-ITA.pdf"
            download="Scalare-Eccellenza-Retail-Lusso-Skillvue.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all hover:opacity-80 border"
            style={{ borderColor: 'rgba(75,77,247,0.3)', color: '#4B4DF7', background: 'rgba(75,77,247,0.05)' }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Scarica PDF
          </a>
          <a
            href="https://www.skillvue.ai/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}
          >
            Contattaci
          </a>
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
              RETAIL LUSSO · 2026
            </span>
            <h1 className="text-[2rem] font-bold tracking-[-0.025em] text-[#0D0D0D] leading-[1.2] mb-2">
              Scalare l'eccellenza
              <span
                className="block"
                style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                senza perdere l'esclusività
              </span>
            </h1>
            <p className="text-[15px] text-[#0D0D0D]/45 italic mt-3 mb-6">
              AI assessment per la selezione stagionale ad alto volume nel lusso
            </p>
            <div className="w-10 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
            <p className="text-[13px] text-[#0D0D0D]/40">
              <em>Settore:</em> Retail Lusso · <em>Destinatari:</em> Head of Talent Acquisition, CHRO, COO Retail
            </p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1"><em>Lettura:</em> circa 6 minuti</p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1">
              A cura di{' '}
              <span style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>
                Skillvue
              </span>
            </p>
          </div>

          {/* Document Body */}
          <div className="px-10 py-10">

            {/* Executive Summary */}
            <InfoBox title="Executive Summary">
              <p>
                Nel lusso, vendiamo tempo e attenzione: ogni interazione in boutique è{' '}
                <strong className="text-[#0D0D0D]/80">un atto di narrazione del brand</strong>. Eppure, quando i volumi
                di assunzione accelerano per l'apertura di nuovi flagship o per i picchi stagionali, le maison si trovano
                spesso davanti a un bivio: scegliere tra la velocità operativa e la qualità del talento. È un compromesso
                che <strong className="text-[#0D0D0D]/80">l'integrità del brand non può permettersi</strong>.
              </p>
              <p className="mt-3">
                Questo documento esplora come la tecnologia di assessment basata sulla scienza psicometrica e potenziata
                dall'intelligenza artificiale possa consentire alle maison di{' '}
                <strong className="text-[#0D0D0D]/80">processare volumi elevati di candidature senza mai abbassare
                la soglia di eccellenza</strong> che il brand richiede.
              </p>
            </InfoBox>

            {/* Cover stats */}
            <div className="grid grid-cols-3 gap-4 my-8">
              <StatBox value="51%" label="Client Advisor che valuta l'uscita (CXG, 2024)" />
              <StatBox value="68%" label="VIC che seguirebbe il proprio advisor (Bain, 2024)" />
              <StatBox value="87%" label="Maison senza AI nel recruiting (Comité Colbert/MAD, 2025)" />
            </div>

            {/* Section 1 */}
            <SectionHeading num="1" title="Il privilegio fragile: quando il volume mette alla prova l'identità del brand" />

            <Para>
              Esiste un paradosso poco discusso nei piani industriali delle maison: la crescita del network retail, che
              dovrebbe amplificare il racconto del brand, è spesso{' '}
              <strong className="text-[#0D0D0D]/80">il momento in cui quel racconto diventa più fragile</strong>.
              L'apertura di un nuovo flagship, il lancio di una collezione cruise in un mercato emergente, la campagna
              natalizia che richiede centinaia di figure stagionali in poche settimane: tutti eventi che generano un{' '}
              <strong className="text-[#0D0D0D]/80">fabbisogno di talento impossibile da soddisfare con i metodi
              tradizionali di recruiting del lusso</strong>.
            </Para>

            <Para>
              Il settore ha storicamente costruito le proprie squadre attraverso il passaparola e la cooptazione da
              brand concorrenti, una pratica che presuppone tempi lunghi e volumi contenuti. Ma{' '}
              <strong className="text-[#0D0D0D]/80">questa logica non regge</strong> quando un gruppo con oltre
              200.000 dipendenti a livello mondiale deve gestire simultaneamente espansioni retail in Medio Oriente,
              Sud-Est asiatico e America Latina, ciascuna con standard di servizio non negoziabili.
            </Para>

            <Para>
              La tensione è reale. Da un lato, il mercato dei beni di lusso personali ha raggiunto i 358 miliardi di
              euro nel 2025 secondo Bain e Altagamma, con i margini EBIT compressi al 15–16%, livelli che non si
              vedevano dal 2009. Dall'altro,{' '}
              <strong className="text-[#0D0D0D]/80">la base clienti si è contratta da 400 milioni a circa 340
              milioni di consumatori tra il 2022 e il 2025</strong>: meno clienti, spesa più concentrata in alto, e
              una tolleranza per le esperienze mediocri vicina allo zero.
            </Para>

            <InfoBox title="VIC: La concentrazione che rende ogni interazione decisiva">
              <p>
                I Very Important Client, che rappresentano appena il{' '}
                <strong className="text-[#0D0D0D]/80">2% della base consumatori</strong>, generano oggi il{' '}
                <strong className="text-[#0D0D0D]/80">45% degli acquisti globali nel lusso</strong>, in crescita dal
                35% nel 2021. Il 64% dei VIC dichiara che la relazione con il proprio client advisor è il fattore
                determinante per tornare in un brand. Il{' '}
                <strong className="text-[#0D0D0D]/80">68% cambierebbe maison</strong> se l'advisor si trasferisse a
                un concorrente.
              </p>
              <p className="mt-2 text-[12px] text-[#0D0D0D]/40 italic">
                Fonti: Bain &amp; Company / Altagamma, Luxury Report 2024; BCG / Altagamma, True-Luxury Global Consumer Insights 2024
              </p>
            </InfoBox>

            <Para>
              In questo contesto, la qualità del personale frontline{' '}
              <strong className="text-[#0D0D0D]/80">non è solo un problema del dipartimento HR: è un rischio
              strategico</strong>. Quando il volume di assunzioni cresce, la pressione si scarica sui processi di
              selezione, e la tentazione di abbassare i criteri per rispettare le timeline di apertura diventa quasi
              irresistibile. Il risultato è un effetto a catena:{' '}
              <strong className="text-[#0D0D0D]/80">profili meno allineati al brand, turnover più elevato, costi
              di sostituzione che si accumulano</strong>, e un'esperienza in boutique che non regge il confronto con
              la promessa che il brand fa al mercato.
            </Para>

            {/* Section 2 */}
            <SectionHeading num="2" title="L'equazione impossibile: velocità, scala e sensibilità del brand" />

            <Para>
              Un direttore HR nel lusso lo sa:{' '}
              <strong className="text-[#0D0D0D]/80">assumere un client advisor non è come assumere un addetto
              alla vendita nel mass market</strong>. Il profilo richiesto è ibrido, raro e difficile da valutare con
              gli strumenti tradizionali. Lo studio Comité Colbert e MAD del 2025 fotografa una realtà che pochi
              settori condividono: il{' '}
              <strong className="text-[#0D0D0D]/80">60% delle maison francesi dichiara difficoltà nel reperire
              candidati per i ruoli in boutique</strong>, e la percentuale sale al{' '}
              <strong className="text-[#0D0D0D]/80">93%</strong> quando si tratta di posizioni manageriali in store.
            </Para>

            <Para>
              Tuttavia, ad oggi le competenze richieste si sono moltiplicate. Un client advisor deve padroneggiare
              il digitale (clienteling via CRM, comunicazione via social, analisi dati delle preferenze del cliente),
              dimostrare <strong className="text-[#0D0D0D]/80">intelligenza emotiva elevata</strong> (empatia,
              capacità di adattamento, gestione del conflitto), e incarnare i codici culturali del brand in ogni
              micro-interazione. Le soft skill emotive distinguono un advisor "sufficiente" da uno "eccezionale",
              ma <strong className="text-[#0D0D0D]/80">sono le più difficili da misurare in fase di recruiting</strong>{' '}
              e le più costose da formare internamente.
            </Para>

            {/* Bar chart visual */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Criticità nel recruiting luxury retail</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">% delle maison intervistate</p>
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
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">Fonti: Comité Colbert / MAD, 2025; CXG, The Advisor Effect, 2024</p>
            </div>

            <Para>
              Il problema <strong className="text-[#0D0D0D]/80">si amplifica nelle fasi di alto volume</strong>.
              Quando una maison deve inserire 150 figure stagionali in sei settimane per la campagna natalizia,{' '}
              il team Talent Acquisition si trova davanti a migliaia di candidature da processare con risorse limitate.
              Il colloquio tradizionale, strumento principale della selezione nel lusso,{' '}
              <strong className="text-[#0D0D0D]/80">non scala</strong>. E lo store manager, già sovraccarico dalla
              gestione operativa del picco, viene coinvolto in sessioni di colloquio che sottraggono ore al floor e
              alla relazione con i clienti.
            </Para>

            <Para>
              Il U.S. Bureau of Labor Statistics riporta un tasso di turnover annuo nel retail superiore al 60%.
              Nel lusso europeo, il dato medio si attesta intorno al 15% secondo il Comité Colbert, ma raggiunge
              punte del 60% in mercati come il Sud-Est asiatico. Il costo di una sostituzione, secondo il U.S.
              Department of Labor,{' '}
              <strong className="text-[#0D0D0D]/80">equivale al 30% del salario annuo della posizione</strong>. Su
              scala, queste cifre trasformano il turnover da inevitabile a insostenibile.
            </Para>

            {/* Section 3 */}
            <SectionHeading num="3" title="Cosa si perde quando si assume in fretta: l'anatomia del costo invisibile" />

            <InfoBox title="L'effetto domino di un'assunzione stagionale non allineata" accent>
              <p>
                Quando un profilo stagionale non possiede le competenze comportamentali adeguate al brand, l'effetto
                non si limita alla singola interazione: compromette la percezione del servizio per i colleghi che
                compensano le lacune, riduce la conversion rate del punto vendita nei periodi di massimo traffico, e,
                in caso di interazione con un VIC, può generare una perdita di cliente che vale multipli dello
                scontrino singolo.{' '}
                <strong className="text-[#0D0D0D]/80">Il danno è tanto più grave quanto più è invisibile ai sistemi
                di reporting tradizionali.</strong>
              </p>
            </InfoBox>

            <Para>
              Il dato di CXG merita un approfondimento che ne riveli la portata strategica:{' '}
              <strong className="text-[#0D0D0D]/80">il 78% dei clienti del lusso dichiara che una singola
              interazione negativa con un advisor può portarli ad abbandonare un acquisto</strong>. Non a
              rimandarlo. Ad abbandonarlo. In un settore dove il canale direct-to-consumer rappresenta oltre il 53%
              dei ricavi secondo Bain, ogni interazione fallita ha un costo misurabile.
            </Para>

            <Para>
              L'indagine CXG su 12.000 dipendenti di 12 brand del lusso ha rivelato un ecosistema interno in
              tensione: solo il <strong className="text-[#0D0D0D]/80">38%</strong> dei collaboratori percepisce il
              proprio ambiente di lavoro come motivante; appena il{' '}
              <strong className="text-[#0D0D0D]/80">31%</strong> crede di avere prospettive di crescita all'interno
              del brand; oltre il <strong className="text-[#0D0D0D]/80">40%</strong> lamenta mancanza di
              empowerment. In USA e Francia, la percentuale di chi pianifica di lasciare sale al{' '}
              <strong className="text-[#0D0D0D]/80">60%</strong>.
            </Para>

            <Para>
              Il punto critico è che la selezione ad alto volume non è un problema di screening dei curriculum vitae.{' '}
              I CV, nel retail del lusso,{' '}
              <strong className="text-[#0D0D0D]/80">raccontano poco delle competenze che realmente predicono il
              successo in boutique</strong>. La letteratura scientifica sulla validità predittiva degli strumenti di
              selezione è chiara: Frank Schmidt e John Hunter, nella loro meta-analisi che ha sintetizzato 85 anni di
              ricerca, hanno dimostrato che il colloquio non strutturato ha una validità predittiva di 0,38, mentre
              gli assessment comportamentali strutturati 0,58. In un contesto dove le competenze da misurare sono
              prevalentemente comportamentali e relazionali,{' '}
              <strong className="text-[#0D0D0D]/80">l'assessment comportamentale strutturato diventa lo strumento
              più efficace che sia anche scalabile.</strong>
            </Para>

            {/* Section 4 */}
            <SectionHeading num="4" title="Scalare senza diluire: la promessa dell'assessment intelligente" />

            <Para>
              L'intelligenza artificiale applicata alla selezione non è una novità, ma il suo utilizzo nel lusso
              incontra resistenze specifiche. La preoccupazione è comprensibile: come può un algoritmo valutare
              l'eleganza relazionale, la sensibilità culturale, la capacità di leggere le emozioni inespresse di un
              cliente? La risposta sta nella{' '}
              <strong className="text-[#0D0D0D]/80">distinzione tra automazione e augmentation</strong>. I sistemi di
              assessment di nuova generazione basati su modelli linguistici di grandi dimensioni (LLM) non
              sostituiscono il giudizio umano, ma{' '}
              <strong className="text-[#0D0D0D]/80">lo informano restituendo gli insight oggettivi</strong>{' '}
              fondamentali per prendere le decisioni strategiche.
            </Para>

            <div className="grid grid-cols-2 gap-4 my-8">
              <StatBox value="0,38" label="Validità predittiva del colloquio non strutturato (Schmidt & Hunter)" />
              <StatBox value="0,58" label="Validità predittiva dell'assessment comportamentale strutturato" />
            </div>

            <Para>
              Il 77% delle maison prevede di integrare l'AI nel talent management entro tre anni, secondo lo studio
              Comité Colbert e MAD. Ma le organizzazioni che lo hanno già fatto riportano risultati misurabili:{' '}
              <strong className="text-[#0D0D0D]/80">volumi di recruiting più alti e turnover significativamente
              ridotto</strong>. La finestra temporale per chi vuole muoversi prima della concorrenza si sta chiudendo.
            </Para>

            {/* Section 5 */}
            <SectionHeading num="5" title="Oltre il picco: costruire un'infrastruttura di selezione permanente" />

            <Para>
              Sarebbe riduttivo inquadrare l'AI assessment come una soluzione per il picco stagionale. Il vero
              valore emerge quando lo strumento{' '}
              <strong className="text-[#0D0D0D]/80">diventa parte integrante dell'infrastruttura di selezione
              del brand</strong>, operativo 365 giorni l'anno. In questa configurazione, ogni candidatura, che
              arrivi a luglio per una posizione permanente o a ottobre per il rinforzo natalizio, viene processata
              con gli stessi criteri, la stessa velocità e la stessa qualità di analisi.
            </Para>

            <Para>
              I dati di Bain suggeriscono che il futuro del retail nel lusso è fatto di meno punti vendita ma{' '}
              <strong className="text-[#0D0D0D]/80">più grandi, più immersivi, più orientati all'esperienza</strong>.
              La riduzione della superficie retail totale di 25.000 metri quadri nei soli ultimi sei mesi del 2025
              segnala una razionalizzazione in corso. In questo scenario, ogni flagship diventa un asset critico, e{' '}
              <strong className="text-[#0D0D0D]/80">la qualità del team che lo anima è il primo differenziale
              competitivo</strong>.
            </Para>

            <InfoBox title="Caso anonimo: metriche di volume e qualità nel picco stagionale">
              <p>
                Un gruppo europeo del lusso con oltre 8.000 dipendenti ha introdotto un sistema di AI assessment per
                gestire le candidature stagionali. Il volume processato è cresciuto significativamente senza incremento
                proporzionale delle risorse HR dedicate, mentre gli indicatori di qualità delle assunzioni (retention
                a 6 mesi, valutazione del supervisore diretto, punteggio NPS interno) sono rimasti{' '}
                <strong className="text-[#0D0D0D]/80">stabili o in miglioramento</strong> rispetto ai cicli gestiti
                con metodo tradizionale.
              </p>
              <p className="mt-3 text-[12px] text-[#0D0D0D]/40 italic">
                Dati anonimizzati. I KPI specifici sono disponibili su richiesta direttamente da Skillvue.
              </p>
            </InfoBox>

            <Para>
              La normativa europea, peraltro, spinge nella stessa direzione. Il Regolamento UE 2024/1689 (AI Act),
              entrato in vigore nell'agosto 2024, classifica i sistemi di AI utilizzati nel recruiting tra i sistemi
              ad alto rischio, imponendo{' '}
              <strong className="text-[#0D0D0D]/80">requisiti di trasparenza, documentazione tecnica, supervisione
              umana e audit periodici</strong>. Questo significa che le maison che adottano strumenti di AI
              assessment devono scegliere piattaforme progettate per essere conformi by design:{' '}
              <strong className="text-[#0D0D0D]/80">un vincolo che, in realtà, è anche una garanzia di qualità
              del processo decisionale.</strong>
            </Para>

            <Quote source="Claudia D'Arpizio, Senior Partner Bain & Company, Bain-Altagamma Luxury Study, novembre 2025">
              "Il mercato rimane resiliente ma non immune alle complessità macroeconomiche. Le esperienze e le emozioni
              sono diventate il vero motore della crescita del lusso."
            </Quote>

            {/* Section 6 */}
            <SectionHeading num="6" title="Tre implicazioni per la strategia di selezione ad alto volume" />

            <Para>
              I dati raccolti in questo documento convergono su tre implicazioni operative che ogni organizzazione
              del lusso con fabbisogni di hiring stagionale dovrebbe considerare.
            </Para>

            <NumberedItem n={1} title="Il costo del mancato screening attitudinale supera di gran lunga l'investimento in tecnologie di valutazione">
              Il turnover nel lusso non è solo un costo amministrativo (pari al 30% della RAL secondo lo U.S. Dept.
              of Labor), ma un rischio reputazionale. Un Client Advisor stagionale privo del giusto DNA di brand
              mette a rischio il patrimonio più grande: la relazione con i VIC. Se il 68% dei clienti è pronto a
              seguire l'advisor presso la concorrenza, l'assessment comportamentale non è più un costo, ma{' '}
              <strong className="text-[#0D0D0D]/80">l'unica assicurazione sostenibile contro assunzioni errate</strong>.
            </NumberedItem>

            <NumberedItem n={2} title="La coerenza dei criteri di selezione è un vantaggio competitivo">
              Con il 93% delle maison che fatica a reperire profili manageriali (Comité Colbert/MAD, 2025), lo Store
              Manager sovraccarico rischia di scivolare verso criteri di selezione puramente discrezionali. Un sistema
              di assessment che garantisce standard oggettivi non è solo una scelta di equità, ma è{' '}
              <strong className="text-[#0D0D0D]/80">lo strumento per proteggere la promessa del brand durante
              l'espansione</strong>. Come confermato dalla meta-analisi di Schmidt e Hunter, gli strumenti strutturati
              hanno un potere predittivo sulla performance futura nettamente superiore ai colloqui informali.
            </NumberedItem>

            <NumberedItem n={3} title="Il margine di manovra strategica si restringe: l'innovazione nel recruiting non è più opzionale">
              Oggi è un'opportunità, domani sarà lo standard di mercato. Se l'87% delle maison non ha ancora
              integrato l'AI, il 77% si prepara a farlo a breve. Chi si muove ora non sta solo comprando software,
              sta costruendo{' '}
              <strong className="text-[#0D0D0D]/80">un vantaggio generazionale su due fronti</strong>: accesso
              prioritario ai profili migliori (grazie a una candidate experience più rapida e accessibile) e una
              curva di apprendimento organizzativo che i concorrenti dovranno percorrere con anni di ritardo.
            </NumberedItem>

            {/* 3 domande */}
            <div className="mt-10 mb-8">
              <div className="w-8 h-0.5 rounded mb-3" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
              <h2 className="text-[1.5rem] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-2">3 domande per il tuo comitato di direzione</h2>
              <p className="text-[14px] text-[#0D0D0D]/55 leading-[1.7]">
                Prima di avviare qualsiasi iniziativa di retention o di riprogettazione del processo di selezione,
                ci sono tre domande che vale la pena portare al tavolo del comitato di direzione.
              </p>
            </div>

            <div className="space-y-4 my-8">
              {[
                {
                  n: '1',
                  q: 'Quante candidature stagionali ha processato la tua organizzazione durante l\'ultimo picco, e quante di queste hanno ricevuto una valutazione comportamentale strutturata?',
                  a: 'In assenza di assessment strutturati, la decisione finale ricade sugli store manager, che nel lusso sono già sovraccarichi: il 93% delle maison riporta difficoltà nel trovare profili manageriali adeguati. In un contesto di forte pressione operativa, quali criteri stanno guidando realmente le tue assunzioni ad alto volume?',
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
                Next Step
              </p>
              <p className="text-[14px] text-[#0D0D0D]/65 leading-[1.7] mb-4">
                Se la tua organizzazione sta affrontando tassi di turnover elevati nei flagship store o sta ripensando
                il modello di selezione per i ruoli retail, e desidera esplorare come mantenere standard qualitativi
                costanti anche durante i picchi di hiring stagionale, Skillvue può supportarti con assessment
                comportamentali predittivi e scalabili,{' '}
                <strong className="text-[#0D0D0D]/80">pienamente conformi agli obblighi normativi e personalizzati
                sulle specificità del tuo brand</strong>, per identificare cosa sia realmente misurabile e dove il
                processo attuale presenti i margini di errore più elevati.
              </p>
              <a
                href="https://www.skillvue.ai/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}
              >
                Richiedi una conversazione esplorativa
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <Quote>
              "Nel lusso, ogni assunzione è una dichiarazione di intenti. Chi sceglie di scalare senza misurare, sta
              scommettendo il proprio brand su una variabile che non controlla. Chi sceglie di misurare prima di
              scalare, sta costruendo l'unico vantaggio competitivo che la concorrenza non può copiare: la coerenza."
            </Quote>

            {/* About Skillvue */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-3">About Skillvue</p>
              <p className="text-[13.5px] text-[#0D0D0D]/60 leading-[1.7] mb-3">
                Skillvue dà vita ai processi di gestione delle persone. Siamo una piattaforma di{' '}
                <strong className="text-[#0D0D0D]/80">talent intelligence</strong> basata sull'AI che aggiunge una
                dimensione dinamica e oggettiva ai dati HR: trasformiamo informazioni statiche in{' '}
                <strong className="text-[#0D0D0D]/80">insight predittivi</strong> che permettono di prendere
                decisioni migliori nel recruiting, nel performance management, nella mobilità interna e nella
                formazione e sviluppo.
              </p>
              <p className="text-[13.5px] text-[#0D0D0D]/60 leading-[1.7]">
                A differenza delle suite HR generiche o degli strumenti di assessment unidimensionali, Skillvue
                combina la solidità della scienza psicometrica con la potenza dei moderni LLM per creare un{' '}
                <strong className="text-[#0D0D0D]/80">co-pilota AI scientificamente fondato</strong>, in grado di
                fornire valutazioni personalizzate e scalabili, allineate al modello di leadership e al quadro di
                competenze specifico di ciascuna azienda.
              </p>
            </div>

            {/* References */}
            <div className="mt-10 pt-8 border-t border-black/[0.06]">
              <p className="text-[11px] font-bold text-[#0D0D0D]/40 uppercase tracking-[0.18em] mb-4">Fonti e riferimenti</p>
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
              <p className="text-[12px] text-[#0D0D0D]/30 mb-2">A cura di</p>
              <div className="flex items-center justify-center gap-2">
                <SkillvueIcon size={22} />
                <span className="font-bold text-[16px] text-[#0D0D0D]/70 tracking-[-0.01em]">Skillvue</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 lg:px-10">
        <div className="max-w-[760px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[12px] text-[#0D0D0D]/25">© {new Date().getFullYear()} Skillvue S.r.l. — Tutti i diritti riservati.</span>
          <div className="flex items-center gap-5 text-[12px] text-[#0D0D0D]/25">
            <a href="https://www.skillvue.ai/privacy-policy" className="hover:text-[#4B4DF7] transition-colors">Privacy Policy</a>
            <a href="https://www.skillvue.ai" className="hover:text-[#4B4DF7] transition-colors">skillvue.ai</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

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
      <Head>
        <title>Scalare l'eccellenza senza perdere l'esclusività — Skillvue</title>
        <meta
          name="description"
          content="AI assessment per la selezione stagionale ad alto volume nel lusso. Come processare centinaia di candidature senza abbassare la soglia di eccellenza del brand."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
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
