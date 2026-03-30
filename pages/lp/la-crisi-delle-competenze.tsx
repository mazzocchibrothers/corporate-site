// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

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
              WP-B2 · Banking · 2026
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-[-0.03em] text-[#0D0D0D] leading-[1.1] mb-6"
          >
            La crisi delle competenze obsolete{' '}
            <span
              className="block"
              style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              nelle banche europee
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
            className="text-[17px] text-[#0D0D0D]/55 leading-[1.7] mb-4"
            style={{ fontWeight: 300 }}
          >
            Come costruire un sistema di talent intelligence continua nel settore bancario
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.24}
            className="flex items-center justify-center gap-6 text-[12px] text-[#0D0D0D]/35 mb-12"
          >
            <span>A cura di <strong className="text-[#0D0D0D]/55">Skillvue</strong></span>
            <span className="w-px h-3 bg-[#0D0D0D]/15" />
            <span>~8 min read</span>
            <span className="w-px h-3 bg-[#0D0D0D]/15" />
            <span>CHRO · Head of L&D · Chief Talent Officer</span>
          </motion.div>

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
              Una guida strategica per i leader HR del settore bancario che vogliono costruire un sistema di talent intelligence realmente continuo e conforme all'AI Act.
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
                  'Perché il 59% della forza lavoro bancaria ha bisogno di reskilling immediato o profondo',
                  'Come le competenze comportamentali (learning agility, gestione dell\'incertezza) predicono il valore futuro',
                  'Assessment episodico vs. talent intelligence ricorrente: le 6 dimensioni a confronto',
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
                    onClick={() => window.open('/lp/la-crisi-delle-competenze?access=true', '_blank')}
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
            href="/WP-B2-ITA.pdf"
            download="La-Crisi-Competenze-Obsolete-Banche-Europee-Skillvue.pdf"
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
              WP-B2 · BANKING · 2026
            </span>
            <h1 className="text-[2rem] font-bold tracking-[-0.025em] text-[#0D0D0D] leading-[1.2] mb-2">
              La crisi delle competenze obsolete nelle banche europee:
              <span
                className="block"
                style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                costruire un sistema di talent intelligence continua
              </span>
            </h1>
            <p className="text-[15px] text-[#0D0D0D]/45 italic mt-3 mb-6">
              Come costruire un sistema di talent intelligence continua nel settore bancario
            </p>
            <div className="w-10 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
            <p className="text-[13px] text-[#0D0D0D]/40">
              <em>Settore:</em> Banking · <em>Destinatari:</em> CHRO, Head of L&D, Chief Talent Officer
            </p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1"><em>Lettura:</em> circa 8 minuti</p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1">
              A cura di{' '}
              <span style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>
                Skillvue
              </span>
            </p>
          </div>

          {/* Document Body */}
          <div className="px-10 py-10">

            {/* Problem box */}
            <InfoBox title="Il problema in numeri">
              <p>
                Entro il 2030, il <strong className="text-[#0D0D0D]/80">39%</strong> dei ruoli nel settore bancario europeo richiederà un{' '}
                <strong className="text-[#0D0D0D]/80">reskilling</strong>. Il <strong className="text-[#0D0D0D]/80">ciclo di vita</strong>{' '}
                medio di una competenza tecnica è ormai <strong className="text-[#0D0D0D]/80">inferiore ai tre anni</strong>. Eppure, la
                maggior parte delle organizzazioni bancarie continua a operare con{' '}
                <strong className="text-[#0D0D0D]/80">sistemi di gestione dei talenti frammentati</strong>, spesso non in grado di
                rilevare questi cambiamenti in tempo reale. Il <strong className="text-[#0D0D0D]/80">costo</strong> non è solo
                operativo, è strategico.
              </p>
            </InfoBox>

            {/* Cover stats */}
            <div className="grid grid-cols-2 gap-4 my-8">
              <StatBox value="39%" label="dei ruoli bancari richiederà reskilling" />
              <StatBox value="<1-2 anni" label="ciclo di vita medio competenza tecnica" />
              <StatBox value="28%" label="riduzione tempi di talent deployment" />
              <StatBox value="0,38" label="validità predittiva colloquio non strutturato" />
            </div>

            {/* Reskilling urgency visual */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Urgenza del reskilling nel settore bancario</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">
                Quota della forza lavoro che avrà bisogno di percorsi di formazione strutturati per far fronte all'evoluzione tecnologica e normativa
              </p>
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
                    <span className="text-[1.1rem] font-bold" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>59%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }} />
                    <span className="text-[12px] text-[#0D0D0D]/60">Lavoratori che necessitano di aggiornamento immediato o profondo (<strong>59%</strong>)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 bg-black/[0.1]" />
                    <span className="text-[12px] text-[#0D0D0D]/60">Lavoratori con skill attualmente allineate (<strong>41%</strong>)</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#0D0D0D]/25 mt-4 italic">Fonte: World Economic Forum (WEF), "The Future of Jobs Report 2025"</p>
            </div>

            <Para>
              Nel banking europeo, i processi di talent management hanno accumulato negli anni strumenti, certificazioni e
              cicli valutativi. Il problema non è la quantità di dati disponibili, ma il fatto che{' '}
              <strong className="text-[#0D0D0D]/80">guardano sempre al passato, vengono aggiornati raramente e non
              comunicano tra loro</strong>. Nel frattempo, la trasformazione digitale e la pressione del quadro normativo ha
              ridisegnato i profili professionali critici a una velocità che nessun sistema episodico riesce a seguire.
            </Para>

            <Para>
              Questo documento indica come colmare il divario: quali limiti strutturali rendono i sistemi attuali inadeguati,
              quali requisiti deve soddisfare un sistema di talent intelligence realmente continuo e con quali criteri valutare
              se gli strumenti oggi in uso sono all'altezza della sfida.
            </Para>

            {/* Section 1 */}
            <SectionHeading num="1" title="Quando il reskilling diventa una questione di sopravvivenza" />

            <Para>
              L'industria bancaria europea sta affrontando una{' '}
              <strong className="text-[#0D0D0D]/80">trasformazione profonda del capitale umano</strong>. Secondo l'OCSE,
              la vita media di una skill tecnica si aggira ormai tra i{' '}
              <strong className="text-[#0D0D0D]/80">12 e i 18 mesi</strong>: ciò che impariamo oggi rischia di diventare
              obsoleto in meno di due anni. Nel settore bancario, dove le piattaforme tecnologiche evolvono rapidamente e le
              aspettative normative cambiano di continuo, questo orizzonte è spesso ancora più breve.
            </Para>

            <Para>
              Tre dinamiche stanno accelerando questo processo: la <strong className="text-[#0D0D0D]/80">digitalizzazione dei
              servizi</strong>, la <strong className="text-[#0D0D0D]/80">crescente pressione regolatoria</strong> e l'
              <strong className="text-[#0D0D0D]/80">ingresso dell'AI nei processi operativi</strong>. Il risultato è che
              competenze consolidate diventano obsolete più rapidamente di quanto le organizzazioni riescano a rilevare. In
              questo contesto, garantire la conformità alla{' '}
              <strong className="text-[#0D0D0D]/80">normativa europea sull'AI (EU AI Act)</strong> diventa parte integrante
              della gestione del talento, non solo un requisito legale.
            </Para>

            <Para>
              Il <em>Future of Jobs Report 2025</em> del World Economic Forum stima che entro il 2030 il{' '}
              <strong className="text-[#0D0D0D]/80">39% delle competenze attuali sarà superato</strong> e che oltre un miliardo
              di persone dovranno aggiornare le proprie skill per restare competitive. Per i gruppi bancari europei, questo
              implica una ricalibratura significativa delle competenze. Non si tratta semplicemente di formazione continua, ma
              di un cambiamento strutturale nel modo in cui il lavoro bancario viene progettato e svolto.
            </Para>

            <Para>
              La pressione proviene da più fronti. Da un lato, cloud, automazione dei processi e modelli di credit scoring
              basati su machine learning stanno ridefinendo i profili tecnici. Dall'altro, l'evoluzione del quadro regolatorio,
              dall'EU AI Act alla normativa <strong className="text-[#0D0D0D]/80">EBA sul Fit & Proper</strong> fino ai
              requisiti DORA sulla resilienza operativa, richiede competenze di compliance e gestione del rischio sempre più
              centrali nel funzionamento delle banche.
            </Para>

            <Para>
              La risposta più diffusa è investire nella formazione. È necessario, ma{' '}
              <strong className="text-[#0D0D0D]/80">non sufficiente</strong>. La formazione interviene su ciò che è già noto
              essere carente. La domanda strategica è un'altra: come possono sapere le banche in tempo reale quale parte del
              loro capitale umano è ancora allineata alle esigenze operative e strategiche? Prima ancora che di sviluppo, è un
              problema di intelligence.
            </Para>

            <Quote source="World Economic Forum. (2025). The Future of Jobs Report 2025.">
              "La vita media di una skill tecnica si aggira addirittura intorno ai 12-18 mesi. Entro il 2030 il 39% delle
              competenze attuali sarà superato e che oltre un miliardo di persone dovranno aggiornare le proprie skill per
              restare competitive."
            </Quote>

            {/* Section 2 */}
            <SectionHeading num="2" title="Perché i sistemi tradizionali non vedono il problema" />

            <Para>
              Per decenni, la fotografia del capitale umano bancario{' '}
              <strong className="text-[#0D0D0D]/80">si è fondata principalmente su due strumenti</strong>: la valutazione
              annuale della performance e la misurazione dell'output formativo. Entrambi sono{' '}
              <strong className="text-[#0D0D0D]/80">per loro natura episodici</strong>, strutturati per guardare indietro,
              progettati per misurare ciò che è già stato fatto{' '}
              <strong className="text-[#0D0D0D]/80">piuttosto che anticipare ciò che sarà necessario</strong>.
            </Para>

            <Para>
              Le valutazioni annuali della performance{' '}
              <strong className="text-[#0D0D0D]/80">riflettono inevitabilmente il bias del momento in cui i target vengono
              definiti</strong>. Non sono progettate per segnalare quando un profilo professionale sta progressivamente
              diventando ridondante rispetto alle esigenze dell'organizzazione, né per rilevare l'emergere di gap
              comportamentali e cognitivi che influenzeranno la capacità di adattarsi a nuovi contesti operativi.
            </Para>

            <Para>
              Il monitoraggio della formazione, dal canto suo,{' '}
              <strong className="text-[#0D0D0D]/80">misura tipicamente l'erogazione</strong> (ore erogate, moduli completati,
              certificazioni acquisite) ma raramente l'<strong className="text-[#0D0D0D]/80">apprendimento reale</strong> o la{' '}
              <strong className="text-[#0D0D0D]/80">trasferibilità operativa delle competenze</strong>. La{' '}
              <strong className="text-[#0D0D0D]/80">distanza</strong> tra sapere dichiarato e competenza effettivamente
              applicata è <strong className="text-[#0D0D0D]/80">una delle lacune più costose</strong> e meno presidiate dei
              sistemi HR tradizionali.
            </Para>

            <InfoBox title="Il dato di Deloitte">
              <p>
                Deloitte ha documentato in diversi rapporti (2022–2024) come la maggior parte delle grandi organizzazioni
                bancarie europee operi ancora con <strong className="text-[#0D0D0D]/75">sistemi di talent data disomogenei</strong>:
                informazioni sulle competenze disperse tra HRIS, LMS, sistemi di performance management e database manuali non
                integrati. Il risultato è che il CHRO di un gruppo con diecimila dipendenti non è in grado di rispondere con
                precisione a domande come: quanti collaboratori in area corporate banking hanno competenze aggiornate in materia
                di IFRS 17? Qual è il tasso di obsolescenza delle competenze data analytics nelle funzioni di risk management?
              </p>
            </InfoBox>

            {/* Section 3 */}
            <SectionHeading num="3" title="La componente comportamentale: la più difficile da misurare, la più decisiva" />

            <Quote source="BCG, How to Build Organizational Resilience, 2022">
              "Il vantaggio competitivo delle organizzazioni adattive non risiede più nello stock di competenze statiche, ma
              nella velocità di apprendimento continuo del proprio capitale umano in scenari volatili."
            </Quote>

            <Para>
              La discussione sul reskilling bancario tende a concentrarsi sulle{' '}
              <strong className="text-[#0D0D0D]/80">competenze tecniche</strong>: data literacy, conoscenza normativa, utilizzo
              di piattaforme digitali. È una prospettiva necessaria ma parziale. Le organizzazioni che stanno navigando con
              maggiore efficacia la trasformazione non sono quelle con il maggior numero di certificati interni: sono quelle in
              grado di identificare collaboratori con profili comportamentali capaci di apprendere in contesti ambigui,
              adattarsi rapidamente al cambiamento di priorità, gestire la complessità normativa senza paralisi decisionale.
            </Para>

            <Para>
              BCG identifica come fattore discriminante non tanto il numero di competenze tecnico-specifiche possedute dai
              collaboratori, quanto la presenza di quelle che definisce{' '}
              <strong className="text-[#0D0D0D]/80">"adjacent capabilities"</strong>: capacità cognitivo-comportamentali
              trasversali che abilitano il trasferimento di expertise tra contesti diversi. La{' '}
              <strong className="text-[#0D0D0D]/80">learning agility</strong>, la{' '}
              <strong className="text-[#0D0D0D]/80">capacità di gestire l'incertezza</strong>, la{' '}
              <strong className="text-[#0D0D0D]/80">proattività nel presidio informativo</strong> del contesto regolatorio:
              sono queste le competenze che differenzieranno chi sarà ancora ad alto valore nel 2028 da chi vedrà il proprio
              profilo svuotarsi di rilevanza.
            </Para>

            {/* 3 critical capabilities */}
            <div className="grid grid-cols-3 gap-4 my-8">
              {[
                { num: '01', label: 'Learning Agility', color: 'rgba(75,77,247,0.08)', border: 'rgba(75,77,247,0.15)' },
                { num: '02', label: 'Gestione dell\'Incertezza', color: 'rgba(130,77,247,0.08)', border: 'rgba(130,77,247,0.15)' },
                { num: '03', label: 'Monitoraggio Normativo', color: 'rgba(255,95,36,0.06)', border: 'rgba(255,95,36,0.15)' },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-5 text-center" style={{ background: item.color, border: `1px solid ${item.border}` }}>
                  <div
                    className="text-[2rem] font-bold mb-2"
                    style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {item.num}
                  </div>
                  <p className="text-[12px] font-bold text-[#0D0D0D]/70 uppercase tracking-[0.08em] leading-snug">{item.label}</p>
                </div>
              ))}
            </div>

            <Para>
              Il problema è che queste competenze sono notoriamente difficili da misurare con gli strumenti convenzionali.
              Il{' '}
              <strong className="text-[#0D0D0D]/80">colloquio strutturato tradizionale ha limiti documentati</strong> nella
              valutazione della learning agility e della resilienza cognitiva. I test di personalità standardizzati misurano
              tratti stabili, <strong className="text-[#0D0D0D]/80">non comportamenti adattativi</strong> in contesto.
              L'osservazione manageriale diretta è{' '}
              <strong className="text-[#0D0D0D]/80">soggetta a bias</strong> di affinità e presenta varianza significativa
              tra valutatori diversi.
            </Para>

            {/* Section 4 */}
            <SectionHeading num="4" title="Verso una talent intelligence ricorrente: cosa significa in pratica" />

            <Para>
              L'approccio che si sta affermando tra i grandi gruppi bancari internazionali non consiste nel fare assessment
              più frequenti o formare di più:{' '}
              <strong className="text-[#0D0D0D]/80">consiste nel costruire un sistema di intelligence sul capitale umano</strong>{' '}
              che sia continuo, integrato e azionabile.
            </Para>

            <Para>
              Gartner ha introdotto in questo ambito il concetto di "talent intelligence platform", un'infrastruttura che{' '}
              <strong className="text-[#0D0D0D]/80">aggrega dati su competenze, performance, aspirazioni professionali e
              comportamenti osservati</strong> per produrre una visione chiara e dinamica del capitale umano disponibile.
              Secondo l'analisi Gartner del 2024, le organizzazioni che adottano approcci di questo tipo riportano una{' '}
              <strong className="text-[#0D0D0D]/80">riduzione media del 28% nei tempi di talent deployment</strong> e una
              migliore capacità predittiva rispetto al turnover volontario qualificato.
            </Para>

            {/* Predictive validity comparison */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
              <p className="text-[12px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Validità predittiva a confronto</p>
              <p className="text-[11px] text-[#0D0D0D]/35 italic mb-5">Correlazione con il potenziale delle persone e la loro performance lavorativa futura</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[12px] mb-1.5">
                    <span className="text-[#0D0D0D]/55">Valutazione tradizionale non strutturata</span>
                    <span className="font-bold text-[#EF4444]">0.38</span>
                  </div>
                  <div className="h-6 rounded-lg bg-black/[0.05] overflow-hidden">
                    <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: '38%', background: '#EF4444' }}>
                      <span className="text-white text-[11px] font-bold">0.38</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[12px] mb-1.5">
                    <span className="text-[#0D0D0D]/55">Valutazione comportamentale strutturata</span>
                    <span className="font-bold text-[#4B4DF7]">0.54</span>
                  </div>
                  <div className="h-6 rounded-lg bg-black/[0.05] overflow-hidden">
                    <div className="h-full rounded-lg flex items-center justify-end pr-2" style={{ width: '54%', background: 'linear-gradient(90deg, #4B4DF7, #7B4DFF)' }}>
                      <span className="text-white text-[11px] font-bold">0.54</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#0D0D0D]/25 mt-4 italic">Fonte: Schmidt & Hunter (1998, aggiornata nel 2016).</p>
            </div>

            {/* Episodic vs Recurrent table */}
            <InfoBox title="Assessment episodico vs. Talent Intelligence Ricorrente">
              <p className="text-[12px] text-[#0D0D0D]/45 mb-4">Confronto su dimensioni operative chiave</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-black/[0.08]">
                      <th className="text-left py-2 pr-4 text-[#0D0D0D]/60 font-semibold">Dimensione</th>
                      <th className="text-left py-2 pr-4 font-semibold" style={{ color: '#FF5F24' }}>Approccio episodico</th>
                      <th className="text-left py-2 font-semibold" style={{ color: '#4B4DF7' }}>Talent Intelligence Ricorrente</th>
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
              Questo trasforma radicalmente il ruolo della{' '}
              <strong className="text-[#0D0D0D]/80">funzione People nelle banche</strong>: da gestore di processi
              amministrativi di performance a{' '}
              <strong className="text-[#0D0D0D]/80">provider di intelligenza organizzativa</strong>, capace di guidare le
              decisioni strategiche del top management. Molti responsabili HR dichiarano di voler compiere questa transizione,
              ma pochi ci riescono davvero, principalmente{' '}
              <strong className="text-[#0D0D0D]/80">a causa della mancanza di tecnologie e metodologie adeguate</strong>.
            </Para>

            {/* Section 5 */}
            <SectionHeading num="5" title="Il vincolo della compliance e l'explainability come requisito non negoziabile" />

            <Para>
              Qualsiasi sistema di talent intelligence che{' '}
              <strong className="text-[#0D0D0D]/80">utilizzi componenti di intelligenza artificiale</strong> nel contesto
              bancario europeo si confronta oggi con un quadro normativo particolarmente esigente. L'EU AI Act classifica i
              sistemi AI utilizzati per decisioni relative al{' '}
              <strong className="text-[#0D0D0D]/80">talent management</strong>, inclusi assessment, scoring di competenze e
              sistemi di valutazione del potenziale, come{' '}
              <strong className="text-[#0D0D0D]/80">sistemi ad alto rischio</strong> (Articolo 6, Allegato III).
            </Para>

            <Para>
              Questo implica obblighi precisi:{' '}
              <strong className="text-[#0D0D0D]/80">trasparenza sulle logiche algoritmiche, documentazione tecnica robusta,
              supervisione umana garantita nelle fasi decisionali critiche, monitoraggio continuativo dei rischi di bias</strong>.
              Per le banche, già abituate a operare in contesti di elevata pressione regolatoria, questi requisiti non sono una
              novità concettuale, ma implicano una scelta consapevole dei sistemi HR adottati.
            </Para>

            <InfoBox title="Implicazione operativa diretta" accent>
              <p>
                Soluzioni di assessment che operano come black box, producono score ma non forniscono giustificazioni
                comprensibili per ogni valutazione individuale, e di conseguenza{' '}
                <strong className="text-[#0D0D0D]/75">non sono compatibili con il contesto regolatorio europeo</strong>. Sono
                esposte a rischi di contestazione da parte sia dei collaboratori che degli organi di supervisione.{' '}
                <strong className="text-[#0D0D0D]/75">L'explainability non è una feature desiderabile: è un requisito di
                sistema.</strong>
              </p>
            </InfoBox>

            <Para>
              Allo stesso modo, la capacità di garantire l'intervento umano nelle fasi conclusive del processo valutativo, il
              cosiddetto <strong className="text-[#0D0D0D]/80">Human in the Loop</strong>, non può essere simulata attraverso
              procedure formali di approvazione che in pratica ratificano sistematicamente le raccomandazioni algoritmiche.
              Richiede che il sistema sia progettato per riconoscere le situazioni in cui il giudizio umano deve prevalere,
              e per{' '}
              <strong className="text-[#0D0D0D]/80">rendere trasparente il contesto informativo entro cui tale giudizio è
              esercitato</strong>.
            </Para>

            {/* Section 6 */}
            <SectionHeading num="6" title="Tre criteri per valutare un sistema di talent intelligence nel banking" />

            <Para>
              Quando si valuta un sistema di assessment AI per contesti bancari, tre dimensioni si rivelano determinanti sia
              rispetto ai requisiti dell'AI Act sia rispetto alla qualità delle decisioni sul capitale umano:
            </Para>

            <NumberedItem n={1} title="Giustificazione per competenza, non per punteggio aggregato">
              Un sistema maturo produce, per ogni profilo valutato, una{' '}
              <strong className="text-[#0D0D0D]/80">spiegazione strutturata degli elementi rilevati</strong>: non uno score
              finale, ma un'evidenza competenza per competenza, con indicazione dell'intensità del segnale e della sua origine.
              Questa granularità è il requisito legale e, al tempo stesso, lo strumento di lavoro più utile per chi prende
              decisioni sul capitale umano. Se il sistema non sa spiegare il proprio output, non è né conforme né utile.
            </NumberedItem>

            <NumberedItem n={2} title="Gestione trasparente dell'incertezza">
              Non tutti i profili possono essere valutati con lo stesso grado di affidabilità. I segnali possono essere
              ambigui, le risposte insufficienti, il contesto non adatto.{' '}
              <strong className="text-[#0D0D0D]/80">Un sistema di qualità non forza una valutazione</strong> quando i dati
              disponibili non la supportano: segnala l'ambiguità e restituisce la decisione al giudizio umano. Questo non è
              un limite del sistema, ma la sua{' '}
              <strong className="text-[#0D0D0D]/80">garanzia strutturale di correttezza</strong>.
            </NumberedItem>

            <NumberedItem n={3} title="Audit trail completo e verificabile">
              Ogni assessment deve produrre un log verificabile: quando è stato condotto, su quale versione del sistema, con
              quali parametri, con quale output, con quale eventuale attivazione della soglia di incertezza e con quale
              conferma di supervisione umana. Questo log serve per rispondere a un audit esterno, ma soprattutto per{' '}
              <strong className="text-[#0D0D0D]/80">monitorare la consistenza del sistema nel tempo</strong> e documentare
              che il processo è sotto controllo.
            </NumberedItem>

            <InfoBox title="In sintesi">
              <p>
                Explainability delle decisioni, gestione trasparente dell'incertezza e audit trail completo non sono requisiti
                aggiuntivi rispetto alla funzionalità del sistema: sono indicatori della sua maturità tecnica. Un sistema che
                li soddisfa fa anche selezione e sviluppo migliori.{' '}
                <strong className="text-[#0D0D0D]/75">Conformità normativa e qualità della decisione tendono a coincidere.</strong>
              </p>
            </InfoBox>

            {/* 3 Strategic Questions */}
            <SectionHeading title="3 domande per il tuo comitato di direzione" />

            <Para>
              Prima ancora di scegliere gli strumenti, le banche sono chiamate a{' '}
              <strong className="text-[#0D0D0D]/80">rispondere a quesiti strategici</strong> che definiscono il perimetro del
              problema. Questo framework nasce come <strong className="text-[#0D0D0D]/80">punto di partenza</strong> per una
              riflessione interna profonda.
            </Para>

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
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Impatto sulla retention</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-6">Retention a 18 mesi dall'inserimento</p>
              <div className="flex items-end gap-6 justify-center">
                <div className="text-center">
                  <div className="text-[2rem] font-bold mb-2" style={{ color: '#EF4444' }}>62%</div>
                  <div className="w-16 bg-red-100 rounded-t-lg mx-auto" style={{ height: '80px' }}>
                    <div className="w-full h-full rounded-t-lg" style={{ background: 'rgba(239,68,68,0.3)' }} />
                  </div>
                  <p className="text-[11px] text-[#0D0D0D]/40 mt-2">Approccio tradizionale</p>
                </div>
                <div className="text-center">
                  <div className="text-[2rem] font-bold mb-2" style={{ background: 'linear-gradient(135deg, #4B4DF7, #22C55E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>85%</div>
                  <div className="w-16 rounded-t-lg mx-auto" style={{ height: '110px', background: 'rgba(34,197,94,0.25)' }} />
                  <p className="text-[11px] text-[#0D0D0D]/40 mt-2">Con talent intelligence strutturata</p>
                </div>
              </div>
              <p className="text-[11px] text-[#0D0D0D]/25 mt-5 italic text-center">Fonte: McKinsey Global Institute, 2024</p>
            </div>

            {/* Next step */}
            <div
              className="rounded-2xl p-8 my-10 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(75,77,247,0.06), rgba(255,95,36,0.06))', border: '1px solid rgba(75,77,247,0.12)' }}
            >
              <h3 className="text-[1.1rem] font-bold text-[#0D0D0D] mb-3">Next step</h3>
              <p className="text-[14px] text-[#0D0D0D]/60 leading-[1.7] mb-6 max-w-[500px] mx-auto">
                Se la tua organizzazione sta valutando come strutturare un sistema di talent intelligence continua, conforme
                all'AI Act e calibrato sulle specificità del settore bancario, Skillvue può supportarti con skill assessment
                predittivi, scalabili e certificati, conformi alla normativa, al GDPR e allo standard ISO 27001,
                personalizzati sulle specificità del tuo contesto bancario.
              </p>
              <a
                href="https://www.skillvue.ai/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-[14px] font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)', boxShadow: '0 6px 20px rgba(75,77,247,0.25)' }}
              >
                Contattaci per una conversazione esplorativa
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* About Skillvue */}
            <div className="border-t border-black/[0.07] pt-8 mt-8">
              <h3 className="text-[1.1rem] font-bold text-[#0D0D0D] mb-4">About Skillvue</h3>
              <Para>
                Skillvue dà vita ai processi di gestione delle persone. Siamo una piattaforma di{' '}
                <strong className="text-[#0D0D0D]/80">talent intelligence</strong> basata sull'AI che aggiunge una dimensione
                dinamica e oggettiva ai dati HR: trasformiamo informazioni statiche in{' '}
                <strong className="text-[#0D0D0D]/80">insight predittivi</strong> che permettono di prendere decisioni migliori
                nel recruiting, nel performance management, nella mobilità interna e nella formazione e sviluppo.
              </Para>
              <Para>
                A differenza delle suite HR generiche o degli strumenti di assessment unidimensionali, Skillvue{' '}
                <strong className="text-[#0D0D0D]/80">combina la solidità della scienza psicometrica con la potenza dei moderni
                LLM</strong> per creare un <strong className="text-[#0D0D0D]/80">copilota AI scientificamente fondato</strong>,
                allineato al modello di leadership e al quadro di competenze specifico di ciascuna azienda.
              </Para>
            </div>

            {/* References */}
            <div className="border-t border-black/[0.07] pt-8 mt-8">
              <h3 className="text-[1rem] font-bold text-[#0D0D0D] mb-4">Fonti e riferimenti</h3>
              <ul className="space-y-2">
                {[
                  'BCE — Supervisory Priorities 2024–2026. Banca Centrale Europea, dicembre 2023.',
                  'BCG — The Adaptive Organization: How to Build Enduring Resilience (2023).',
                  'Deloitte — Global Human Capital Trends 2025. Deloitte Insights, 2025.',
                  'DORA — Digital Operational Resilience Act (Reg. UE 2022/2554).',
                  'EU AI Act — Regolamento UE 2024/1689. In vigore dal 1° agosto 2024; applicazione progressiva fino al 2 agosto 2026 per i sistemi ad alto rischio (Allegato III).',
                  'McKinsey Global Institute — The State of AI in 2024: Generative AI\'s Breakout Year. McKinsey & Company, 2024.',
                  'EBA — Guidelines on the assessment of the suitability of members of the management body and key function holders (EBA/GL/2021/06). European Banking Authority, 2021.',
                  'Schmidt, F.L. & Hunter, J.E. (1998, aggiornata 2016). The validity and utility of selection methods in personnel psychology. Psychological Bulletin.',
                  'World Economic Forum — Future of Jobs Report 2023 e 2025.',
                ].map((ref, i) => (
                  <li key={i} className="text-[12px] text-[#0D0D0D]/40 italic leading-[1.6]">{ref}</li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-black/[0.07] pt-6 mt-8 flex items-center justify-between">
              <span className="text-[11px] text-[#0D0D0D]/25">WP-B2 · Banking · 2026</span>
              <div className="flex items-center gap-2">
                <SkillvueIcon size={16} />
                <span className="text-[11px] text-[#0D0D0D]/25">Skillvue</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Page footer */}
      <div className="py-6 px-6 text-center">
        <p className="text-[12px] text-[#0D0D0D]/30">
          © {new Date().getFullYear()} Skillvue S.r.l. — Tutti i diritti riservati. ·{' '}
          <a href="https://www.skillvue.ai/privacy-policy" className="hover:text-[#4B4DF7] transition-colors">Privacy Policy</a>
          {' '}·{' '}
          <a href="https://www.skillvue.ai" className="hover:text-[#4B4DF7] transition-colors">skillvue.ai</a>
        </p>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

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
      <Head>
        <title>La crisi delle competenze obsolete nelle banche europee | Skillvue</title>
        <meta
          name="description"
          content="Come costruire un sistema di talent intelligence continua nel settore bancario europeo. Whitepaper gratuito di Skillvue per CHRO, Head of L&D e Chief Talent Officer."
        />
      </Head>

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
