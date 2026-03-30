// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

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
    desc: 'L'AI Act classifica i sistemi di screening, ranking e assunzione come applicazioni ad alto rischio (Allegato III, punto 4). Le banche che li utilizzano sono deployer responsabili — la responsabilità non è delegabile al fornitore.',
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
    desc: 'Explainability per decisione, gestione trasparente dell'incertezza, audit trail completo. Non sono requisiti aggiuntivi: sono indicatori della maturità tecnica del sistema. Conformità e qualità tendono a coincidere.',
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
              WP-B1 · Banking · 2026
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-[-0.03em] text-[#0D0D0D] leading-[1.1] mb-6"
          >
            AI Act-compliant nel Banking:{' '}
            <span
              className="block"
              style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              da obbligo regolatorio a vantaggio competitivo
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
            className="text-[17px] text-[#0D0D0D]/55 leading-[1.7] mb-4"
            style={{ fontWeight: 300 }}
          >
            Come trasformare la scadenza del 2 agosto 2026 in una decisione strategica concreta per CHRO e Chief Compliance Officer
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0.24}
            className="flex items-center justify-center gap-6 text-[12px] text-[#0D0D0D]/35 mb-12"
          >
            <span>A cura di <strong className="text-[#0D0D0D]/55">Skillvue</strong></span>
            <span className="w-px h-3 bg-[#0D0D0D]/15" />
            <span>~5 min read</span>
            <span className="w-px h-3 bg-[#0D0D0D]/15" />
            <span>CHRO · Chief Compliance Officer</span>
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
              Una guida operativa per CHRO e Chief Compliance Officer che devono trasformare una scadenza regolamentare in una decisione strategica concreta.
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
                  'La classificazione AI Act e gli obblighi reali per le banche deployer',
                  'Perché il rischio reputazionale pesa più della sanzione del 3%',
                  'I 3 criteri per valutare se un sistema AI è davvero conforme',
                  'Come CHRO e Chief Compliance Officer devono collaborare',
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
                    onClick={() => window.open('/lp/ai-act-banking?access=true', '_blank')}
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
      className="text-[14px] font-bold mb-2 mt-6"
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
            href="/WP-B1-ITA.pdf"
            download="AI-Act-compliant-Banking-Skillvue.pdf"
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
              WP-B1 · BANKING · 2026
            </span>
            <h1 className="text-[2rem] font-bold tracking-[-0.025em] text-[#0D0D0D] leading-[1.2] mb-2">
              AI Act-compliant nel Banking:
              <span
                className="block"
                style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                da obbligo regolatorio a vantaggio competitivo
              </span>
            </h1>
            <div className="w-10 h-px mx-auto mb-5 mt-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
            <p className="text-[13px] text-[#0D0D0D]/40">
              <em>Settore:</em> Banking · <em>Destinatari:</em> CHRO, Chief Compliance Officer
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

            <InfoBox title="Il problema in numeri">
              <p>
                Entro il <strong className="text-[#0D0D0D]/80">2 agosto 2026</strong>, tutti i sistemi AI utilizzati per screening, ranking e
                decisioni di assunzione dovranno essere <strong className="text-[#0D0D0D]/80">conformi all'EU AI Act</strong>. Le banche
                europee che oggi li utilizzano senza aver avviato un processo strutturato di adeguamento
                operano con un rischio sanzionatorio che può arrivare al{' '}
                <strong className="text-[#0D0D0D]/80">3% del fatturato globale annuo</strong> (art. 99, c. 3, Regolamento UE 2024/1689).
                Ma la sanzione è la parte più visibile del problema. Il rischio reputazionale, in un settore
                come il banking, pesa di più.
              </p>
            </InfoBox>

            <div className="grid grid-cols-2 gap-4 my-8">
              <StatBox value="2026" label="Scadenza AI Act sistemi ad alto rischio" />
              <StatBox value="68%" label="dei CHRO europei: priorità AI governance HR (Deloitte 2025)" />
              <StatBox value="3%" label="Fatturato globale — sanzione massima per deployer" />
              <StatBox value="0,38" label="Validità predittiva colloquio non strutturato" />
            </div>

            {/* Systems exposure chart */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">
                Sistemi di AI coinvolti nel processo di selezione bancario
              </p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">Livello di esposizione ai requisiti AI Act</p>
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

            <SectionHeading num="1" title="La classificazione che cambia tutto" />
            <Para>
              Il Regolamento UE 2024/1689, pubblicato in Gazzetta Ufficiale il 12 luglio 2024 ed entrato
              in vigore il 1° agosto 2024, ha costruito un sistema di classificazione del rischio per i sistemi
              AI. La categoria ad alto rischio comprende esplicitamente, all'Allegato III punto 4,{' '}
              <strong className="text-[#0D0D0D]/80">i sistemi impiegati per valutare candidati e lavoratori in processi di screening,
              ranking e assunzione.</strong>
            </Para>
            <Para>
              Questa classificazione non è neutra. Comporta una serie di{' '}
              <strong className="text-[#0D0D0D]/80">obblighi</strong> che vanno ben oltre la gestione dei dati personali già prevista dal
              GDPR: documentazione tecnica approfondita del sistema, registri di log per garantire la
              tracciabilità di ogni decisione, valutazione della conformità prima della messa in servizio,
              supervisione umana garantita per legge, trasparenza verso i soggetti che interagiscono con
              il sistema, monitoraggio post-mercato continuativo.
            </Para>

            <InfoBox title="Nota regolamentare">
              <p>
                I provider di sistemi AI ad alto rischio devono essere registrati nella banca dati EU prima
                della messa in servizio. Le banche, in quanto deployer,{' '}
                <strong className="text-[#0D0D0D]/80">sono responsabili dell'uso corretto e devono verificare che i sistemi che
                impiegano siano conformi</strong>. La catena della responsabilità è condivisa ma non delegabile.
              </p>
            </InfoBox>

            <SectionHeading num="2" title="Il rischio più rilevante non è solo la sanzione" />
            <Para>
              Le sanzioni previste dall'AI Act per l'utilizzo di sistemi non conformi possono arrivare fino
              al <strong className="text-[#0D0D0D]/80">3% del fatturato globale annuo</strong> per le violazioni degli obblighi applicabili agli
              utilizzatori (Regolamento UE 2024/1689, art. 99, c. 3). Ma concentrarsi esclusivamente sulla
              componente sanzionatoria rischia di oscurare una dimensione più rilevante per le funzioni
              HR e per il management strategico delle banche europee.
            </Para>
            <Para>
              Il <strong className="text-[#0D0D0D]/80">rischio reputazionale</strong> associato a un{' '}
              <strong className="text-[#0D0D0D]/80">processo di selezione non trasparente o non spiegabile</strong> è, in un settore come
              il banking, potenzialmente più costoso di qualsiasi multa. Le banche operano in un
              ecosistema di fiducia regolato: la vigilanza BCE, le linee guida EBA sul{' '}
              <strong className="text-[#0D0D0D]/80">Fit & Proper</strong> e i requisiti di idoneità per le figure chiave presuppongono tutti
              che i processi di valutazione delle persone siano{' '}
              <strong className="text-[#0D0D0D]/80">documentabili, giustificabili e privi di bias sistematici</strong>.
            </Para>
            <Para>
              C'è poi una <strong className="text-[#0D0D0D]/80">dimensione competitiva</strong> che riguarda direttamente il{' '}
              <strong className="text-[#0D0D0D]/80">mercato del lavoro</strong>. I candidati qualificati, in particolare nella fascia 25–35 anni
              che le banche europee cercano di attrarre con crescente urgenza, sono sempre più attenti
              a come le organizzazioni gestiscono i loro dati e a quanto siano trasparenti nei processi di
              valutazione. Un'organizzazione che sa comunicare chiaramente come funziona il suo
              sistema di assessment AI, perché prende certe decisioni e come garantisce equità,{' '}
              <strong className="text-[#0D0D0D]/80">costruisce un vantaggio nella talent attraction</strong> che non è facilmente
              quantificabile ma è reale e persistente.
            </Para>

            {/* Predictive validity chart */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">
                Validità predittiva a confronto
              </p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">
                Correlazione con la performance lavorativa futura · Fonte: Schmidt &amp; Hunter (1998, aggiornata nel 2016)
              </p>
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
              "Le organizzazioni che investono in processi di selezione strutturati e trasparenti
              registrano tassi di retention dei neoassunti superiori del 23% rispetto alla media di
              settore".
            </Quote>

            <Para>
              Semplificare la compliance AI Act a una checklist di documenti da produrre è l'errore più
              diffuso nelle organizzazioni che si stanno avvicinando alla scadenza. L'AI Act richiede
              qualcosa di strutturalmente diverso: che i sistemi ad alto rischio siano progettati e utilizzati
              in modo da garantire una{' '}
              <strong className="text-[#0D0D0D]/80">supervisione umana non formale, lungo tutto il processo decisionale.</strong>
            </Para>

            <SubHeading title="Spiegabilità delle singole decisioni" />
            <Para>
              Ogni decisione o raccomandazione generata da un sistema AI nella selezione del personale
              deve essere spiegabile in termini comprensibili. Non è sufficiente che il sistema funzioni
              bene in media: deve essere possibile spiegare{' '}
              <strong className="text-[#0D0D0D]/80">perché uno specifico candidato ha ricevuto un determinato punteggio, quali
              competenze sono state rilevate e con quale logica</strong>. Nelle banche, questa trasparenza è
              anche un prerequisito per la tenuta in caso di audit regolatorio. Un responsabile HR che
              non sa spiegare perché un candidato è stato escluso non ha un problema di sistema: ha un
              problema di governance.
            </Para>

            <SubHeading title="Supervisione umana come requisito strutturale" />
            <Para>
              L'AI Act richiede che i sistemi ad alto rischio{' '}
              <strong className="text-[#0D0D0D]/80">permettano all'operatore umano di intervenire, correggere o bloccare una
              decisione automatizzata</strong>. Per la selezione del personale, questo significa che nessuna
              esclusione può avvenire senza una validazione umana documentata. I sistemi che operano
              come black box, generando un output finale senza possibilità di intervento, non
              soddisfano questo requisito nella sua sostanza.
            </Para>
            <Para>
              La gestione dell'incertezza è parte integrante di questo pilastro. Quando il sistema rileva
              che i segnali disponibili non sono sufficienti per una valutazione affidabile, la risposta
              corretta non è produrre comunque uno score: è{' '}
              <strong className="text-[#0D0D0D]/80">segnalare l'ambiguità e restituire la decisione al giudizio umano</strong>. Questo
              meccanismo, spesso chiamato in letteratura tecnica{' '}
              <strong className="text-[#0D0D0D]/80">soglia di non-applicabilità</strong>, è al tempo stesso un requisito normativo e un
              indicatore della maturità del sistema.
            </Para>

            <SubHeading title="Bias testing documentato" />
            <Para>
              L'AI Act richiede che i sistemi ad alto rischio siano testati per{' '}
              <strong className="text-[#0D0D0D]/80">rilevare discriminazioni sistematiche</strong>, con documentazione dei risultati e
              meccanismi di correzione. Per un sistema di selezione, questo significa test di bias su
              variabili protette: genere, età, nazionalità, origine etnica. Le banche europee, già soggette
              a vincoli stringenti di non-discriminazione nell'accesso al credito, hanno la cultura per
              ragionare in questi termini. Manca spesso l'applicazione ai processi HR.
            </Para>

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

            <InfoBox title="Esempio operativo" accent>
              <p>
                Un sistema che genera uno score complessivo di selezione senza{' '}
                <strong className="text-[#0D0D0D]/80">produrre una giustificazione per competenza</strong>, senza meccanismi per
                gestire valutazioni incerte, e senza log verificabili{' '}
                <strong className="text-[#0D0D0D]/80">non è AI Act-compliant</strong>. Molti sistemi oggi in uso nelle banche europee
                non soddisfano questi requisiti nella loro configurazione standard. La differenza tra un
                sistema conforme e uno non conforme non è nella qualità dei risultati, ma in{' '}
                <strong className="text-[#0D0D0D]/80">come il processo è governato, controllato e documentato</strong>.
              </p>
            </InfoBox>

            <SectionHeading num="4" title="CHRO e Chief Compliance Officer: perché la sfida coinvolge entrambi" />
            <Para>
              In molte banche europee, il progetto di adeguamento all'AI Act è partito dalla funzione
              Legal o Compliance, con il CHRO coinvolto in una fase successiva. Questo approccio ha
              generato, in diversi casi, soluzioni tecnicamente corrette ma poco integrate con le esigenze
              operative dell'HR: sistemi conformi sulla carta, ma difficili da usare o che rallentano i
              processi selettivi.
            </Para>
            <Para>
              Il modello che si sta affermando nelle organizzazioni più avanzate prevede una{' '}
              <strong className="text-[#0D0D0D]/80">co-governance strutturata tra le due funzioni</strong>. Il Chief Compliance Officer
              garantisce la tenuta legale del processo e la gestione del rischio regolatorio. Il CHRO
              garantisce che le misure di compliance non compromettano l'efficacia della selezione, anzi
              le utilizzi come leva per innalzarne la qualità complessiva.
            </Para>
            <Para>
              Il concetto di <strong className="text-[#0D0D0D]/80">compliance by design</strong>, già familiare nel banking per GDPR e
              cybersecurity, si applica oggi ai sistemi AI per la gestione del capitale umano con la stessa
              logica.
            </Para>

            <Quote source="Deloitte, Global Human Capital Trends 2025">
              "Il 68% dei CHRO europei considera la governance dei sistemi AI in HR come una
              priorità strategica per il biennio 2025–2026. Non è solo compliance: è la consapevolezza
              che la qualità delle decisioni sul capitale umano dipende sempre più dalla qualità degli
              strumenti utilizzati per supportarle, e che quella qualità deve essere dimostrabile".
            </Quote>

            <SectionHeading num="5" title="Tre criteri per valutare un sistema di selezione AI nel banking" />
            <Para>
              Quando si valuta un fornitore di assessment AI per contesti bancari, tre dimensioni si
              rivelano determinanti sia rispetto ai requisiti dell'AI Act sia rispetto alla qualità delle
              decisioni di selezione:
            </Para>

            <NumberedItem n={1} title="Giustificazione per competenza, non per punteggio aggregato">
              Un sistema maturo produce, per ogni candidato valutato, una{' '}
              <strong className="text-[#0D0D0D]/80">spiegazione strutturata degli elementi rilevati</strong>: non uno score finale, ma
              un'evidenza competenza per competenza, con indicazione dell'intensità del segnale e della
              sua origine nell'interazione. Se il sistema non sa spiegare il proprio output a chi lo usa,{' '}
              <strong className="text-[#0D0D0D]/80">non è né conforme né utile</strong>.
            </NumberedItem>

            <NumberedItem n={2} title="Gestione trasparente dell'incertezza">
              Un sistema di qualità non forza una valutazione quando i dati disponibili non la supportano:
              segnala l'ambiguità e restituisce la decisione al selezionatore umano. Questo non è un
              limite del sistema ma la sua{' '}
              <strong className="text-[#0D0D0D]/80">garanzia strutturale di correttezza</strong>. È anche la forma più concreta di
              Human-in-the-Loop richiesta dall'AI Act.
            </NumberedItem>

            <NumberedItem n={3} title="Audit trail completo e verificabile">
              Ogni assessment deve produrre un log verificabile:{' '}
              <strong className="text-[#0D0D0D]/80">quando è stato condotto, su quale versione del sistema, con quali parametri,
              con quale output, con quale eventuale attivazione della soglia di incertezza e con quale
              conferma di supervisione umana</strong>. Un sistema che non lo produce non può essere
              considerato conforme.
            </NumberedItem>

            {/* Retention chart */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">
                Impatto sulla retention
              </p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-6">
                Retention del primo anno dei neoassunti · Fonte: McKinsey Global Institute, 2024
              </p>
              <div className="flex items-end justify-center gap-12">
                <div className="text-center">
                  <div className="w-20 mx-auto rounded-t-lg mb-2" style={{ height: '88px', background: '#FF6550' }} />
                  <div className="text-[1.6rem] font-bold text-[#FF6550]">62%</div>
                  <div className="text-[11px] text-[#0D0D0D]/40 mt-1 leading-snug">Selezione<br />tradizionale</div>
                </div>
                <div className="text-center">
                  <div className="w-20 mx-auto rounded-t-lg mb-2" style={{ height: '121px', background: '#4B4DF7' }} />
                  <div className="text-[1.6rem] font-bold text-[#4B4DF7]">85%</div>
                  <div className="text-[11px] text-[#0D0D0D]/40 mt-1 leading-snug">Selezione strutturata<br />con strumenti AI</div>
                </div>
              </div>
            </div>

            <InfoBox title="In sintesi">
              <p>
                Explainability delle decisioni, gestione trasparente dell'incertezza e audit trail completo
                non sono requisiti aggiuntivi rispetto alla funzionalità del sistema:{' '}
                <strong className="text-[#0D0D0D]/80">sono indicatori della sua maturità tecnica</strong>. Un sistema che li soddisfa fa
                anche selezione migliore. La conformità normativa e la qualità della decisione tendono a
                coincidere.
              </p>
            </InfoBox>

            <SectionHeading num="6" title="Tra scadenza normativa e opportunità strategica" />
            <Para>
              Le banche europee non partono da zero rispetto a questa sfida. Il settore ha una lunga
              esperienza di adeguamento normativo complesso, da MiFID II a Basilea III fino a DORA, e
              ha sviluppato internamente competenze di compliance management che poche altre industry
              possono vantare.
            </Para>
            <Para>
              Il <strong className="text-[#0D0D0D]/80">paradosso</strong> dell'AI Act nel banking è che{' '}
              <strong className="text-[#0D0D0D]/80">le organizzazioni con la maggiore esposizione al rischio di non-conformità sono
              spesso quelle che hanno investito di più nell'automazione dei processi HR negli ultimi
              anni</strong>. Chi ha adottato soluzioni early-stage, quando il quadro normativo era ancora in
              formazione, si trova oggi a dover rivalutare quei sistemi alla luce di requisiti che non erano
              contemplati al momento dell'acquisto.
            </Para>
            <Para>
              La scadenza normativa <strong className="text-[#0D0D0D]/80">crea però una finestra di riflessione strategica</strong> che
              raramente si apre nel ciclo ordinario dell'HR management. Le banche che stanno
              affrontando la compliance AI Act come un progetto strutturato, non come una risposta
              reattiva a un audit,{' '}
              <strong className="text-[#0D0D0D]/80">stanno compiendo una ricognizione approfondita dei propri processi di
              valutazione del talento</strong>. E in molti casi stanno scoprendo gap che avevano già un impatto
              sulla qualità delle decisioni di selezione, indipendentemente dalla normativa.
            </Para>

            <div className="rounded-xl border border-black/[0.08] p-6 my-8 text-center">
              <div className="flex items-center justify-center gap-6">
                <p className="text-[1.15rem] font-bold italic" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Conformità<br />AI Act
                </p>
                <span className="text-[1.5rem] font-bold" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>=</span>
                <p className="text-[1.15rem] font-bold italic" style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Qualità<br />decisionale
                </p>
              </div>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mt-3">
                Conformità normativa e qualità delle decisioni si rafforzano a vicenda.
              </p>
            </div>

            <Para>
              <strong className="text-[#0D0D0D]/80">La conformità normativa diventa così il punto di ingresso verso una domanda più
              profonda:</strong> i nostri strumenti di assessment sono in grado di misurare ciò che conta
              davvero, in modo oggettivo, spiegabile e ripetibile?
            </Para>
            <Para>
              La differenza tra le banche che trasformeranno questa scadenza in vantaggio competitivo e
              quelle che la gestiranno come un costo è, in buona misura, una differenza di approccio. Le
              prime stanno connettendo il progetto di adeguamento all'AI Act con la trasformazione più
              ampia dei processi di talent acquisition, adottando criteri di acquisto più esigenti e
              costruendo verso candidati, regolatori e investitori una narrazione che valorizza la
              trasparenza come elemento di differenziazione.
            </Para>

            {/* Economics summary */}
            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Gli economics in sintesi
              </p>
              <ul className="space-y-2 text-[13.5px] text-[#0D0D0D]/65 leading-snug">
                <li><strong className="text-[#0D0D0D]/80">Differenziale di retention con selezione strutturata AI:</strong>{' '}<span style={{ color: '#4B4DF7', fontWeight: 700 }}>+23%</span></li>
                <li><strong className="text-[#0D0D0D]/80">Priorità strategica AI governance HR per CHRO europei:</strong>{' '}<span style={{ color: '#4B4DF7', fontWeight: 700 }}>68%</span></li>
                <li><strong className="text-[#0D0D0D]/80">Sanzione massima per deployer non conformi:</strong>{' '}<span style={{ color: '#FF6550', fontWeight: 700 }}>fino al 3%</span> (del fatturato globale annuo o 15 milioni di euro, il maggiore tra i due)</li>
                <li><strong className="text-[#0D0D0D]/80">Scadenza sistemi ad alto rischio (Allegato III):</strong>{' '}<span style={{ color: '#FF6550', fontWeight: 700 }}>2 agosto 2026</span></li>
                <li><strong className="text-[#0D0D0D]/80">Validità predittiva del colloquio non strutturato:</strong>{' '}<span style={{ color: '#FF6550', fontWeight: 700 }}>0,38</span> (su scala 0-1) vs. assessment comportamentali strutturati con validità 0,54</li>
              </ul>
            </div>

            <SectionHeading title="3 domande per il tuo comitato di direzione" />
            <Para>
              Prima ancora di scegliere gli strumenti, le banche sono chiamate a{' '}
              <strong className="text-[#0D0D0D]/80">rispondere a quesiti strategici</strong> che definiscono il perimetro del problema.
              Questo framework nasce come <strong className="text-[#0D0D0D]/80">punto di partenza</strong> per una riflessione interna
              profonda.
            </Para>

            <NumberedItem n={1} title="I sistemi AI che sta usando la tua banca oggi sopravviverebbero a un audit?">
              Non un audit ipotetico, ma una{' '}
              <strong className="text-[#0D0D0D]/80">richiesta concreta di documentazione da parte dell'autorità di vigilanza
              nazionale</strong>. Cosa produrrebbe il tuo team domani mattina? Il log di ogni assessment
              condotto, la versione del modello usata, la giustificazione per ogni candidato escluso, la
              conferma della supervisione umana.{' '}
              <strong className="text-[#0D0D0D]/80">Se la risposta a questa domanda richiede più di 24 ore di ricerca interna</strong>, il
              sistema non è conforme nel senso che l'AI Act intende.
            </NumberedItem>

            <NumberedItem n={2} title="La qualità della tua selezione è misurabile e migliorabile?">
              I <strong className="text-[#0D0D0D]/80">KPI tradizionali</strong> misurano output: posizioni coperte, tempo alla copertura,
              costo per assunzione. Non misurano la qualità predittiva del processo. Quanti candidati
              selezionati negli ultimi tre anni sono ancora in azienda a 18 mesi? Qual è il tasso di
              mis-hire nelle posizioni critiche? Senza questi dati,{' '}
              <strong className="text-[#0D0D0D]/80">è impossibile valutare se un investimento in assessment AI stia producendo
              valore reale</strong> o semplicemente velocità.
            </NumberedItem>

            <NumberedItem n={3} title="Chi governa internamente questo processo?">
              L'adeguamento all'AI Act richiede una <strong className="text-[#0D0D0D]/80">governance</strong> che nella maggior parte delle
              banche europee non esiste ancora per i sistemi HR. Non si tratta di creare una nuova
              funzione, ma di{' '}
              <strong className="text-[#0D0D0D]/80">chiarire chi ha la responsabilità del monitoraggio dei sistemi AI in uso</strong>, chi
              valida i report di bias testing, chi può bloccare un sistema che mostra segnali di deriva.
              Questa chiarezza è un prerequisito della compliance, non una sua conseguenza.
            </NumberedItem>

            <Quote>
              "La compliance normativa, quando affrontata con rigore metodologico, ha spesso il
              valore secondario di migliorare la qualità dei processi che norma. Non è un effetto
              collaterale: è una conseguenza strutturale del fatto che le buone pratiche di trasparenza
              e accountability sono anche buone pratiche di management".
            </Quote>

            {/* Next step */}
            <div className="mt-10 pt-8 border-t border-black/[0.07]">
              <h3 className="text-[1rem] font-bold text-[#0D0D0D] mb-3">Next step</h3>
              <Para>
                Se la tua organizzazione sta valutando come adeguare i processi di selezione e talent
                management all'AI Act, Skillvue può supportarti con skill assessment predittivi, scalabili e
                certificati, conformi alla normativa, al GDPR e allo standard internazionale ISO 27001,
                personalizzati sulle specificità del tuo contesto bancario.
              </Para>
              <a
                href="https://www.skillvue.ai/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)', boxShadow: '0 6px 20px rgba(75,77,247,0.2)' }}
              >
                Contattaci per una conversazione esplorativa
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Sources */}
            <div className="mt-10 pt-6 border-t border-black/[0.07]">
              <p className="text-[11px] font-bold text-[#0D0D0D]/30 uppercase tracking-[0.18em] mb-3">Fonti e riferimenti</p>
              <ul className="space-y-1.5 text-[11.5px] text-[#0D0D0D]/35 italic leading-snug">
                <li>EU AI Act — Regolamento UE 2024/1689. Gazzetta Ufficiale UE, 12 luglio 2024. In vigore dal 1° agosto 2024; applicazione progressiva fino al 2 agosto 2026 per i sistemi ad alto rischio (Allegato III). Sanzioni art. 99, c. 3.</li>
                <li>McKinsey Global Institute — The State of AI in 2024: Generative AI's Breakout Year. McKinsey & Company, 2024.</li>
                <li>Deloitte — Global Human Capital Trends 2025. Deloitte Insights, 2025.</li>
                <li>EBA — Guidelines on the assessment of the suitability of members of the management body and key function holders (EBA/GL/2021/06). European Banking Authority, 2021.</li>
                <li>BCE — Supervisory Priorities 2024–2026. Banca Centrale Europea, dicembre 2023.</li>
                <li>Schmidt, F.L. & Hunter, J.E. (1998, aggiornata 2016). The validity and utility of selection methods in personnel psychology. Psychological Bulletin.</li>
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

// ─── ROOT COMPONENT ────────────────────────────────────────────────────────────

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
      <Head>
        <title>AI Act-compliant nel Banking: da obbligo regolatorio a vantaggio competitivo | Skillvue</title>
        <meta
          name="description"
          content="Come trasformare la scadenza del 2 agosto 2026 in una decisione strategica per CHRO e Chief Compliance Officer. Report gratuito di Skillvue."
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
