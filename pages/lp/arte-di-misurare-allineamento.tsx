// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

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
  { value: '0,58', label: 'Validità predittiva dell\'assessment comportamentale' },
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
    desc: 'Il colloquio strutturato raggiunge una validità di 0,51. L\'assessment comportamentale situazionale arriva a 0,58 per i ruoli ad alta componente relazionale. Nel lusso, dove il costo del falso positivo è strutturalmente più alto, il margine conta.',
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
              WP-L1 · Retail Lusso · 2026
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-[-0.03em] text-[#0D0D0D] leading-[1.1] mb-6"
          >
            L'arte di misurare{' '}
            <span
              className="block"
              style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              l'allineamento al brand
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
            className="text-[17px] text-[#0D0D0D]/55 leading-[1.7] mb-4"
            style={{ fontWeight: 300 }}
          >
            La valutazione comportamentale nella selezione del personale nel lusso
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.24}
            className="flex items-center justify-center gap-6 text-[12px] text-[#0D0D0D]/35 mb-12"
          >
            <span>A cura di <strong className="text-[#0D0D0D]/55">Skillvue</strong></span>
            <span className="w-px h-3 bg-[#0D0D0D]/15" />
            <span>~5 min read</span>
            <span className="w-px h-3 bg-[#0D0D0D]/15" />
            <span>CHRO · HR Director · Chief People Officer</span>
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
              Un'analisi operativa per chi guida la Talent Strategy nelle maison del lusso e deve capire dove il processo di selezione lascia scoperto il brand.
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
                    onClick={() => window.open('/lp/arte-di-misurare-allineamento?access=true', '_blank')}
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
            href="/WP-L1-ITA.pdf"
            download="Arte-Misurare-Allineamento-Brand-Skillvue.pdf"
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
              WP-L1 · RETAIL LUSSO · 2026
            </span>
            <h1 className="text-[2rem] font-bold tracking-[-0.025em] text-[#0D0D0D] leading-[1.2] mb-2">
              L'arte di misurare
              <span
                className="block"
                style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                l'allineamento al brand
              </span>
            </h1>
            <p className="text-[15px] text-[#0D0D0D]/45 italic mt-3 mb-6">
              La valutazione comportamentale nella selezione del personale nel lusso
            </p>
            <div className="w-10 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
            <p className="text-[13px] text-[#0D0D0D]/40">
              <em>Settore:</em> Retail Lusso · <em>Destinatari:</em> CHRO, HR Director, Chief People Officer
            </p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1"><em>Lettura:</em> circa 5 minuti</p>
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
                Nei flagship store delle principali maison europee, una quota compresa tra il{' '}
                <strong className="text-[#0D0D0D]/80">30% e il 40%</strong> del personale di front line abbandona
                l'organizzazione entro appena <strong className="text-[#0D0D0D]/80">12 mesi</strong> dall'assunzione.
                Il fenomeno si polarizza su quei profili selezionati attraverso{' '}
                <strong className="text-[#0D0D0D]/80">metodologie tradizionali</strong>, specialmente nei mercati ad alta crescita
                dove la pressione sull'hiring sacrifica la profondità della valutazione sull'altare della velocità.
                La causa principale di questa emorragia rimane un{' '}
                <strong className="text-[#0D0D0D]/80">punto cieco</strong>, raramente misurata nell'unico momento
                in cui potrebbe essere prevenuta: <strong className="text-[#0D0D0D]/80">la fase di selezione</strong>.
              </p>
            </InfoBox>

            {/* Cover stats */}
            <div className="grid grid-cols-3 gap-4 my-8">
              <StatBox value="30-40%" label="Turnover entro 12 mesi" />
              <StatBox value="€358 mld" label="Mercato globale lusso 2025" />
              <StatBox value="0,51" label="Validità colloquio strutturato" />
            </div>

            {/* Turnover cost breakdown */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Anatomia del costo di turnover nel lusso</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">Il costo per sostituzione di un front-liner supera tipicamente 1,5x lo stipendio annuo</p>
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
                Fonte: Society for Human Resource Management (SHRM), analisi settore retail premium. Il moltiplicatore 1,5x sale fino a 2x per profili di fascia senior.
              </p>
            </div>

            <Para>
              Quando si analizzano i motivi di uscita, emergono due pattern ricorrenti: il{' '}
              <strong className="text-[#0D0D0D]/80">mismatch culturale</strong> — quando la persona non si identifica
              nei valori del brand — e la difficoltà nella{' '}
              <strong className="text-[#0D0D0D]/80">gestione relazionale della clientela di fascia alta</strong>,
              un ambito che richiede un registro comportamentale estremamente sofisticato, quasi impossibile da
              intercettare attraverso un semplice colloquio strutturato tradizionale.
            </Para>

            <Quote>
              Entrambi questi fenomeni sollevano un interrogativo cruciale: quanto di ciò che determina
              il disallineamento era già osservabile prima della firma del contratto?
            </Quote>

            <Para>
              La risposta, supportata da oltre trent'anni di ricerca scientifica, è netta: molto più di quanto le
              organizzazioni siano attualmente attrezzate a decodificare. Il limite non risiede nel talento dei candidati,
              ma nella <strong className="text-[#0D0D0D]/80">capacità di misurazione predittiva</strong> dei processi
              di selezione attuali.
            </Para>

            {/* Section 1 */}
            <SectionHeading num="1" title="Il paradosso dell'identità di brand" />
            <Para>
              Il settore del lusso ha costruito nel corso di decenni un'<strong className="text-[#0D0D0D]/80">identità di brand
              tra le più solide e riconoscibili</strong> del panorama industriale globale. Eppure, paradossalmente, questa
              solidità convive con una <strong className="text-[#0D0D0D]/80">fragilità strutturale</strong>: più il brand cresce,
              più dipende da un numero crescente di persone che ne incarnano i valori ogni giorno, e meno riesce a garantire
              che queste persone siano state selezionate con criteri all'altezza di quella stessa identità.
            </Para>
            <Para>
              L'espansione geografica, in particolare nei mercati asiatici e mediorientali, ha accelerato un fenomeno di{' '}
              <strong className="text-[#0D0D0D]/80">hiring ad alta intensità</strong> senza precedenti nella storia di questi brand.
              Un client advisor a Chengdu o a Dubai rappresenta il brand esattamente come uno a Via Montenapoleone. La differenza
              è che a Chengdu e a Dubai il processo di selezione è esposto a{' '}
              <strong className="text-[#0D0D0D]/80">pressioni di volume, scarsità di profili qualificati e minore presidio diretto</strong>{' '}
              da parte del management centrale.
            </Para>

            {/* Value chain gap chart */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Il punto di frattura della catena del valore</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">Coerenza tra l'identità di brand dichiarata e i criteri effettivi applicati per area operativa</p>
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
                      {item.critical && <span className="font-bold text-[#EF4444] text-[11px]">GAP CRITICO</span>}
                    </div>
                    <div className="relative h-2 rounded-full bg-black/[0.06]">
                      <div className="absolute h-full rounded-full opacity-20" style={{ width: `${item.stdPct}%`, background: '#4B4DF7' }} />
                      <div className="absolute h-full rounded-full" style={{ width: `${item.actualPct}%`, background: item.critical ? '#EF4444' : '#4B4DF7' }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">
                Rappresentazione qualitativa basata su benchmark settoriali.
              </p>
            </div>

            {/* Section 2 */}
            <SectionHeading num="2" title="Cosa rende la selezione nel lusso strutturalmente diversa" />
            <Para>
              Nel luxury retail, la dinamica è profondamente diversa rispetto ad altri settori. Il personale di front line non
              solo eroga un servizio al cliente, ma <strong className="text-[#0D0D0D]/80">incarna una vera e propria in-store
              experience</strong>. L'ultimo report <em>Global Powers of Luxury Goods</em> di Deloitte conferma come la{' '}
              <strong className="text-[#0D0D0D]/80">customer experience</strong> sia ormai il fattore competitivo determinante
              per il segmento UHNWI, superando persino il valore intrinseco del prodotto.
            </Para>
            <Para>
              In questo ecosistema, un'interazione mal gestita, un tono di voce fuori registro o una minima disattenzione verso
              un cliente ad alto potenziale non rappresentano semplici inefficienze:{' '}
              <strong className="text-[#0D0D0D]/80">sono un colpo diretto alla brand equity</strong>.
            </Para>
            <Para>
              Il costo di un <strong className="text-[#0D0D0D]/80">falso positivo</strong> — un candidato inserito che si rivela
              inadatto — è strutturalmente più elevato nel lusso rispetto a qualunque altro comparto del retail. L'impatto di
              una risorsa non allineata{' '}
              <strong className="text-[#0D0D0D]/80">erode l'esperienza del cliente molto prima di tradursi in un calo visibile
              dei KPI di performance</strong>.
            </Para>
            <Para>
              L'<strong className="text-[#0D0D0D]/80">eleganza relazionale</strong>, la discrezione intesa come postura naturale
              e la capacità di gestire la prossimità con una clientela d'élite sono qualità che la ricerca scientifica classifica
              come <strong className="text-[#0D0D0D]/80">tratti stabili</strong> — predisposizioni modificabili solo in minima
              parte dagli interventi formativi post assunzione.
            </Para>

            <Quote>
              "In questo contesto, la vera sfida per le Maison non è accertare l'esistenza di tali dimensioni, quanto
              piuttosto dotarsi di strumenti capaci di misurarle oggettivamente prima dell'inserimento in organico."
            </Quote>

            {/* Section 3 */}
            <SectionHeading num="3" title="Il rischio che la maggior parte delle organizzazioni non sta misurando" />
            <Para>
              Esiste un bias cognitivo profondamente radicato nelle funzioni HR del lusso: il{' '}
              <strong className="text-[#0D0D0D]/80">bias da esperienza settoriale</strong> — la tendenza a utilizzare il
              background pregresso in una Maison come unico proxy dell'allineamento comportamentale al brand. Tale euristica
              nasconde un errore strutturale che diventa sempre più oneroso con l'evolversi del mercato.
            </Para>

            <div className="space-y-0 my-8">
              <NumberedItem n={1} title="Conformità vs predisposizione naturale">
                L'esperienza misura la conformità ai codici appresi, non la predisposizione naturale. Un candidato reduce da anni
                in una boutique concorrente può replicare certi comportamenti in superficie, ma non necessariamente possiede i
                tratti che rendono tale postura autentica e duratura. I clienti di fascia alta percepiscono la differenza tra un
                protocollo recitato e una reale attitudine relazionale.
              </NumberedItem>
              <NumberedItem n={2} title="Pool demografico limitato">
                Il pool di talenti con esperienza diretta nel lusso è fisiologicamente limitato e sempre più conteso. Un modello
                di selezione focalizzato esclusivamente sul settore esclude profili d'eccellenza provenienti dall'hospitality di
                alto livello, dal private banking o dalle arti performative — figure che spesso vantano predisposizioni
                comportamentali superiori pur non avendo mai gestito la vendita di un prodotto fisico.
              </NumberedItem>
              <NumberedItem n={3} title="Rischio di omologazione culturale">
                Reclutare sistematicamente per somiglianza con i profili esistenti porta alla creazione di workforce che replicano
                pattern identici nel tempo. Questo immobilismo culturale impedisce di intercettare efficacemente le nuove
                sensibilità dei mercati emergenti e le aspettative delle nuove generazioni di consumatori, per i quali
                l'autenticità conta molto più della pura forma.
              </NumberedItem>
              <NumberedItem n={4} title="Rischio regolatorio (EU AI Act)">
                L'EU AI Act (Regolamento UE 2024/1689) classifica i sistemi di AI per la selezione del personale come applicazioni
                ad alto rischio. Ma il rischio non riguarda solo chi usa AI: coinvolge ogni processo di recruiting che non sia
                documentabile, auditabile e coerente nei criteri applicati. Le organizzazioni prive di una metodologia strutturata
                si troveranno esposte a un rischio di compliance oggi non ancora percepito come prioritario nel lusso.
              </NumberedItem>
            </div>

            {/* Section 4 */}
            <SectionHeading num="4" title="Perché il colloquio, anche ben condotto, non è sufficiente" />
            <Para>
              Il colloquio di selezione non è uno strumento sbagliato. È uno strumento con una{' '}
              <strong className="text-[#0D0D0D]/80">validità predittiva nota</strong>, che la ricerca ha quantificato
              con precisione, e che viene sistematicamente sovrastimata dalle organizzazioni che lo usano come strumento
              primario o esclusivo.
            </Para>
            <Para>
              La meta-analisi di <strong className="text-[#0D0D0D]/80">Schmidt e Hunter</strong> attribuisce al colloquio
              non strutturato una validità di appena <strong className="text-[#0D0D0D]/80">0,38</strong>. Il colloquio
              strutturato eleva il parametro a <strong className="text-[#0D0D0D]/80">0,51</strong>, mentre gli{' '}
              <strong className="text-[#0D0D0D]/80">assessment comportamentali situazionali</strong> raggiungono picchi tra{' '}
              <strong className="text-[#0D0D0D]/80">0,40 e 0,58</strong> per le posizioni ad alta componente relazionale.
            </Para>

            {/* Predictive validity chart */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
              <p className="text-[12px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Validità predittiva a confronto</p>
              <p className="text-[11px] text-[#0D0D0D]/35 italic mb-5">Scala 0–1 · Correlazione con la performance lavorativa futura</p>
              <div className="space-y-4">
                {[
                  { label: 'Colloquio non strutturato', value: 0.38, pct: 38, color: '#EF4444' },
                  { label: 'Colloquio strutturato', value: 0.51, pct: 51, color: '#FF8C00' },
                  { label: 'Assessment comportamentale', value: 0.58, pct: 58, gradStart: '#4B4DF7', gradEnd: '#FF5F24' },
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
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">Fonte: Schmidt & Hunter, 1998; Campion et al., 1997</p>
            </div>

            <Para>
              Il quadro è ulteriormente complicato dal <strong className="text-[#0D0D0D]/80">faking behavior</strong>:
              Levashina e Campion (2007) hanno dimostrato che nei colloqui la tendenza a fornire{' '}
              <strong className="text-[#0D0D0D]/80">risposte socialmente desiderabili</strong> è sistematica e difficilmente
              intercettabile. Nel lusso, dove i candidati padroneggiano i codici del settore e arrivano estremamente preparati,
              questo rischio è massimo.
            </Para>
            <Para>
              Gli <strong className="text-[#0D0D0D]/80">assessment comportamentali strutturati</strong>, basati su scenari
              situazionali ancorati a comportamenti passati verificabili, riducono drasticamente lo spazio per la simulazione
              strategica, rendendo estremamente complesso costruire una maschera professionale non autentica.
            </Para>

            <Quote>
              "Selezionare per esperienza settoriale misura la conformità ai codici appresi. Non la predisposizione
              comportamentale che li rende autentici."
            </Quote>

            {/* Section 5 */}
            <SectionHeading num="5" title="Tre implicazioni operative per la Talent Strategy" />

            <SubHeading title="1. Il profilo comportamentale target va costruito, non adottato" />
            <Para>
              Il primo passo verso una selezione realmente predittiva non è l'adozione di un software, ma la{' '}
              <strong className="text-[#0D0D0D]/80">costruzione di un profilo comportamentale target</strong> calibrato
              empiricamente. Invece di basarsi su job description standard o sull'intuizione del Retail Manager, occorre{' '}
              <strong className="text-[#0D0D0D]/80">mappare i top performer attuali</strong> per isolare i pattern che
              garantiscono l'eccellenza. I tratti percepiti come "distintivi" del brand raramente coincidono con quelli che
              predicono statisticamente la performance sul campo.
            </Para>

            <SubHeading title="2. Il colloquio come fase finale, non come filtro iniziale" />
            <Para>
              Invertire la sequenza del processo di selezione ottimizza la qualità dell'output.{' '}
              <strong className="text-[#0D0D0D]/80">Utilizzare l'assessment comportamentale come screening iniziale</strong>{' '}
              permette di riservare il colloquio ai soli candidati già profilati. Il giudizio umano si concentra dove è più
              prezioso: la valutazione delle sfumature relazionali su una{' '}
              <strong className="text-[#0D0D0D]/80">short list qualificata</strong>. Il responsabile di store cessa di essere
              un filtro amministrativo per diventare un decision maker informato.
            </Para>

            <SubHeading title="3. La selezione come touch point strategico del brand" />
            <Para>
              Ogni candidato vive il processo di recruiting come un'anticipazione della cultura aziendale. Un iter rigoroso,
              coerente e rispettoso dei valori della Maison modella l'approccio che il futuro collaboratore avrà verso il
              cliente finale. La <strong className="text-[#0D0D0D]/80">candidate experience</strong> non è un semplice
              esercizio di employer branding, ma una leva che impatta direttamente sulla qualità dell'onboarding.
            </Para>

            <Quote>
              "La qualità della selezione è diventata un fattore competitivo di primo piano: non solo per la funzione HR,
              ma per il business nel suo complesso."
            </Quote>

            {/* Risks summary grid */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-5">Rischi non misurati</p>
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
                Next Step
              </p>
              <p className="text-[14px] text-[#0D0D0D]/65 leading-[1.7] mb-4">
                Se la tua organizzazione sta ripensando il modello di selezione per ruoli retail o sta affrontando sfide di
                brand alignment in mercati in crescita, il punto di partenza più utile è una conversazione basata sui dati
                che già possedete: quanto incide oggi il turnover del primo anno? Qual è il tasso reale di mismatch nei mercati
                in cui il presidio diretto è più complesso? Quali sono i comportamenti che distinguono davvero i tuoi top performer?
              </p>
              <p className="text-[14px] text-[#0D0D0D]/65 leading-[1.7] mb-5">
                Skillvue può supportarti con gli{' '}
                <strong className="text-[#0D0D0D]/80">assessment comportamentali predittivi e scalabili</strong>, pienamente
                conformi all'EU AI Act, personalizzati sulle specificità del contesto del tuo brand.
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

            {/* References */}
            <div className="mt-10 pt-8 border-t border-black/[0.06]">
              <p className="text-[11px] font-bold text-[#0D0D0D]/40 uppercase tracking-[0.18em] mb-4">Fonti e riferimenti</p>
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
      <Head>
        <title>L'arte di misurare l'allineamento al brand — Skillvue</title>
        <meta
          name="description"
          content="La valutazione comportamentale nella selezione del personale nel lusso. Perché il 30-40% del front-line abbandona entro 12 mesi e come misurare l'allineamento al brand prima dell'assunzione."
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
