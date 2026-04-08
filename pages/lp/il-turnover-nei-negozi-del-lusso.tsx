// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

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
  { value: '0,58', label: "Validità predittiva dell'assessment comportamentale" },
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
    desc: "Il colloquio non strutturato ha una validità di 0,38. L'assessment comportamentale arriva a 0,58. Le aziende che lo adottano registrano un turnover inferiore del 39%. Il massimo ROI si colloca prima della firma del contratto.",
  },
];

function VetrinaLayer({ onUnlock }: { onUnlock: () => void }) {
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
          <span className="font-bold text-[15px] text-[#0D0D0D] tracking-[-0.01em]">Skillvue</span>
        </div>
        <button onClick={scrollToForm}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}>
          Scarica il Report
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        </button>
      </nav>

      <section className="pt-[88px] pb-16 px-6 lg:px-10">
        <div className="max-w-[760px] mx-auto text-center pt-16">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase text-white mb-8"
              style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}>
              Retail Lusso · 2026
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-[-0.03em] text-[#0D0D0D] leading-[1.1] mb-6">
            Il turnover nei negozi del lusso:{' '}
            <span className="block" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              il costo nascosto
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
            className="text-[17px] text-[#0D0D0D]/55 leading-[1.7] mb-4" style={{ fontWeight: 300 }}>
            La selezione non efficace nei flagship store e il suo impatto sul business
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.24}
            className="flex items-center justify-center gap-6 text-[12px] text-[#0D0D0D]/35 mb-12">
            <span>A cura di <strong className="text-[#0D0D0D]/55">Skillvue</strong></span>
            <span className="w-px h-3 bg-[#0D0D0D]/15" />
            <span>~8 min read</span>
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
            <button onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[15px] font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)', boxShadow: '0 8px 24px rgba(75,77,247,0.25)' }}>
              Scarica il Report Completo
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
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
                <div className="text-[2rem] font-bold tracking-[-0.03em] mb-1.5"
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
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.025em] text-[#0D0D0D] mb-3">Cosa troverai nel report</h2>
            <p className="text-[16px] text-[#0D0D0D]/45 max-w-[580px] mx-auto leading-[1.65]" style={{ fontWeight: 300 }}>
              Un'analisi operativa della struttura economica del turnover nei flagship store e degli strumenti predittivi per ridurre l'errore di hiring nella sua fase più critica.
            </p>
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
              <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-bold tracking-[-0.025em] text-[#0D0D0D] leading-[1.15] mb-6">
                Scarica il report completo
              </h2>
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
                I tuoi dati sono al sicuro. Niente spam.
              </p>
            </motion.div>

            <motion.div ref={formRef} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1}
              className="rounded-2xl bg-white border border-black/[0.08] p-8 lg:p-10"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
              <h3 className="text-[17px] font-bold text-[#0D0D0D] mb-1">Compila per scaricare il PDF</h3>
              <p className="text-[13px] text-[#0D0D0D]/35 mb-7">Gratuito · Accesso immediato</p>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #4B4DF7, #FF5F24)' }}>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#0D0D0D] mb-1">Il whitepaper si è aperto in una nuova scheda.</p>
                    <p className="text-[13px] text-[#0D0D0D]/40">Controlla il tuo browser se non lo vedi subito.</p>
                  </div>
                  <button onClick={() => window.open('/lp/il-turnover-nei-negozi-del-lusso?access=true', '_blank')}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold border transition-all hover:opacity-70"
                    style={{ borderColor: 'rgba(75,77,247,0.3)', color: '#4B4DF7' }}>
                    Apri di nuovo
                  </button>
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
                        className="w-full px-4 py-2.5 rounded-lg border text-[14px] text-[#0D0D0D] outline-none transition-all"
                        style={{ borderColor: errors[key] ? '#EF4444' : 'rgba(0,0,0,0.12)', background: '#FAFAFA' }} />
                      {errors[key] && <p className="text-[11px] text-red-500 mt-1">{errors[key]}</p>}
                      {key === 'email' && !errors.email && <p className="text-[11px] text-[#0D0D0D]/25 mt-1">Richiesta email aziendale (non personale)</p>}
                    </div>
                  ))}
                  <button type="submit" disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)', marginTop: '8px' }}>
                    {submitting ? (
                      <><svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Caricamento…</>
                    ) : (
                      <><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Scarica il Report</>
                    )}
                  </button>
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

// ─── LAYER 2: WHITEPAPER ───────────────────────────────────────────────────────

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-black/[0.08] bg-white p-5 text-center">
      <div className="text-[1.9rem] font-bold tracking-[-0.02em] mb-1"
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
      <h2 className="text-[1.5rem] font-bold tracking-[-0.02em] text-[#0D0D0D]">
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
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: '#F5F5F7', minHeight: '100vh' }}>
      <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #4B4DF7 0%, #FF5F24 100%)' }} />

      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10 py-3.5 bg-white"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center gap-2.5">
          <SkillvueIcon size={24} />
          <span className="font-bold text-[14px] text-[#0D0D0D] tracking-[-0.01em]">Skillvue</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/WP-L2-ITA.pdf" download="Il-Turnover-Negozi-Lusso-Skillvue.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all hover:opacity-80 border"
            style={{ borderColor: 'rgba(75,77,247,0.3)', color: '#4B4DF7', background: 'rgba(75,77,247,0.05)' }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Scarica PDF
          </a>
          <a href="https://www.skillvue.ai/contact-us" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}>
            Contattaci
          </a>
        </div>
      </nav>

      <div className="max-w-[760px] mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>

          {/* Cover */}
          <div className="px-10 pt-12 pb-8 text-center border-b border-black/[0.06]">
            <span className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase text-white mb-7"
              style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}>
              RETAIL LUSSO · 2026
            </span>
            <h1 className="text-[2rem] font-bold tracking-[-0.025em] text-[#0D0D0D] leading-[1.2] mb-2">
              Il turnover nei negozi del lusso:
              <span className="block" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                il costo nascosto
              </span>
            </h1>
            <p className="text-[15px] text-[#0D0D0D]/45 italic mt-3 mb-6">La selezione non efficace nei flagship store e il suo impatto sul business</p>
            <div className="w-10 h-px mx-auto mb-5" style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)' }} />
            <p className="text-[13px] text-[#0D0D0D]/40"><em>Settore:</em> Retail Lusso · <em>Destinatari:</em> CHRO, Head of Retail Operations, CFO</p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1"><em>Lettura:</em> circa 8 minuti</p>
            <p className="text-[13px] text-[#0D0D0D]/40 mt-1">A cura di{' '}
              <span style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600 }}>Skillvue</span>
            </p>
          </div>

          {/* Body */}
          <div className="px-10 py-10">

            <InfoBox title="Executive Summary">
              <p>Nel retail del lusso, un flagship store non è un punto vendita. È una <strong className="text-[#0D0D0D]/80">dichiarazione di identità</strong>. Nei principali flagship europei, tra il <strong className="text-[#0D0D0D]/80">30% e il 40%</strong> del personale di front line <strong className="text-[#0D0D0D]/80">lascia l'organizzazione entro 12 mesi</strong> dall'assunzione.</p>
              <p className="mt-3">Il costo diretto è almeno <strong className="text-[#0D0D0D]/80">1,5 volte lo stipendio annuo per ogni sostituzione</strong>. Ma il costo reale è altrove: nelle relazioni personali con una clientela il cui <strong className="text-[#0D0D0D]/80">lifetime value può superare le centinaia di migliaia di euro</strong>. In un settore dove meno dell'1% dei clienti genera oltre il 20% del fatturato, ogni uscita è una discontinuità che il business non può permettersi di non quantificare.</p>
            </InfoBox>

            <div className="grid grid-cols-3 gap-4 my-8">
              <StatBox value="30–40%" label="Turnover entro 12 mesi" />
              <StatBox value="1,5–2x" label="Costo di sostituzione" />
              <StatBox value="51%" label="Advisor che valuta l'uscita (CXG)" />
            </div>

            <SectionHeading num="1" title="Dove si costruisce e si perde il valore" />
            <Para>Il mercato globale dei beni di lusso personali ha raggiunto i <strong className="text-[#0D0D0D]/80">358 miliardi di euro nel 2025</strong>, secondo il Bain Luxury Study, con il <strong className="text-[#0D0D0D]/80">canale fisico che continua a rappresentare circa l'80% delle transazioni</strong>. Le maison stanno concentrando gli investimenti su un numero minore di flagship di dimensioni maggiori: la superficie media dei monobrand store è cresciuta del 30% negli ultimi anni.</Para>
            <Para>Un flagship non è un negozio. È <strong className="text-[#0D0D0D]/80">l'espressione fisica del posizionamento del brand</strong>, il luogo dove si concretizzano le relazioni con la clientela più strategica. Il client advisor, in questo modello, non è un addetto alla vendita. È il <strong className="text-[#0D0D0D]/80">depositario di un patrimonio relazionale</strong> che rappresenta una quota crescente del valore di ogni singolo punto vendita.</Para>
            <Para>La tensione di fondo è evidente: mentre il settore investe risorse senza precedenti nella creazione di esperienze fisiche d'eccellenza, <strong className="text-[#0D0D0D]/80">il processo con cui seleziona le persone che dovranno incarnare quella stessa eccellenza rimane il meno strutturato dell'intera catena del valore</strong>. Le maison controllano il design degli interni con una precisione millimetrica, ma affidano la scelta di chi abiterà quegli spazi <strong className="text-[#0D0D0D]/80">a colloqui non strutturati e alla percezione soggettiva di un Retail Manager</strong>.</Para>

            <Quote>"Selezionare per esperienza settoriale misura la conformità ai codici appresi. Non la predisposizione comportamentale che li rende autentici".</Quote>

            <Para>Esiste poi un <strong className="text-[#0D0D0D]/80">bias cognitivo</strong> raramente esplicitato: la tendenza a utilizzare il background pregresso in una maison come unico proxy dell'allineamento comportamentale al brand. Un candidato proveniente da una boutique concorrente può replicare certi comportamenti in superficie, <strong className="text-[#0D0D0D]/80">senza necessariamente possedere i tratti che rendono quella postura autentica e duratura</strong>. I clienti di fascia alta percepiscono la differenza tra un protocollo recitato e una reale attitudine relazionale.</Para>

            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">La concentrazione del valore nei flagship store</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">La relazione advisor-cliente nel lusso è un asset strategico con un valore economico concentrato</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { value: '<1%', label: 'dei clienti genera il 20% della spesa globale nel lusso personale', color: '#4B4DF7' },
                  { value: '5x', label: "moltiplicatore dell'intenzione d'acquisto con un advisor eccezionale (CXG)", color: '#FF5F24' },
                  { value: '78%', label: "dei clienti abbandona l'acquisto dopo un'interazione negativa", color: '#4B4DF7' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-[2rem] font-bold tracking-[-0.03em] mb-1" style={{ color: item.color }}>{item.value}</div>
                    <div className="text-[11px] text-[#0D0D0D]/45 leading-snug">{item.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">Fonti: Bain & Company / Altagamma, 2024–2025; CXG, "The Advisor Effect", 2024.</p>
            </div>

            <SectionHeading num="2" title="Il costo che nessuno sta calcolando" />
            <Para>Le stime più citate nella letteratura HR collocano il costo di sostituzione di un dipendente tra il <strong className="text-[#0D0D0D]/80">50% e il 200% dello stipendio annuo</strong>, a seconda della seniority. Nel <strong className="text-[#0D0D0D]/80">luxury retail il moltiplicatore è strutturalmente più elevato</strong>, per ragioni che non hanno a che fare con il livello retributivo in sé, ma con la natura del ruolo.</Para>
            <Para>Un client advisor in un flagship non può essere considerato intercambiabile. La sua formazione richiede mesi, non settimane. I programmi di onboarding dei principali gruppi del lusso prevedono <strong className="text-[#0D0D0D]/80">dalle 8 alle 10 settimane di formazione iniziale</strong>, seguiti da periodi di mentorship di 6 mesi o più. La conoscenza del prodotto, della storia del brand, dei codici relazionali, delle dinamiche di clienteling <strong className="text-[#0D0D0D]/80">non si acquisisce con un manuale</strong>.</Para>

            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-8">
              <p className="text-[13px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Impatto sui costi dell'abbandono di un client advisor in flagship</p>
              <p className="text-[12px] text-[#0D0D0D]/35 italic mb-5">Il costo complessivo supera tipicamente 1,5 volte lo stipendio annuo lordo</p>
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
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">Fonte: SHRM; Gallup, 2019; Work Institute, 2024. Il moltiplicatore sale fino a 2x per profili senior con portafoglio clienti consolidato.</p>
            </div>

            <Para>La voce più sottovalutata riguarda la <strong className="text-[#0D0D0D]/80">produttività</strong>. Un nuovo assunto nel retail impiega mediamente <strong className="text-[#0D0D0D]/80">28 settimane per raggiungere la piena produttività</strong>. Nel lusso, questo ciclo si allunga ulteriormente: un advisor appena inserito può padroneggiare il prodotto in tre mesi, ma non avrà un <strong className="text-[#0D0D0D]/80">portafoglio clienti consolidato prima di due anni</strong>.</Para>

            <Quote>"Il costo reale del turnover nel lusso non è la sostituzione. È la discontinuità relazionale con una clientela che non perdona le interruzioni".</Quote>

            <SectionHeading num="3" title="L'equazione nascosta: selezione predittiva e retention" />
            <Para>La maggior parte delle strategie di retention nel luxury retail si concentra a valle del problema: programmi di engagement, percorsi di carriera, incentivi economici. Interventi necessari, ma che agiscono su un bacino già contaminato da <strong className="text-[#0D0D0D]/80">errori di selezione che avrebbero potuto essere evitati</strong> con sistemi di valutazione strutturati.</Para>
            <Para>La meta-analisi di Schmidt e Hunter quantifica la capacità predittiva di ciascun metodo. Il <strong className="text-[#0D0D0D]/80">colloquio non strutturato</strong> — ancora lo strumento dominante nella selezione del lusso — ha una <strong className="text-[#0D0D0D]/80">validità di 0,38 su una scala da 0 a 1</strong>. Il colloquio strutturato migliora a 0,51. Ma è la combinazione di <strong className="text-[#0D0D0D]/80">assessment comportamentali e colloquio strutturato</strong> a raggiungere valori compositi che <strong className="text-[#0D0D0D]/80">superano 0,58</strong>.</Para>

            <div className="rounded-xl border border-black/[0.08] bg-[#F8F8FA] p-6 my-6">
              <p className="text-[12px] font-bold text-[#0D0D0D]/60 uppercase tracking-[0.15em] mb-1">Validità predittiva</p>
              <p className="text-[11px] text-[#0D0D0D]/35 italic mb-5">Scala 0–1</p>
              <div className="space-y-4">
                {[
                  { label: 'Colloquio non strutturato', val: 0.38, pct: 38, color: '#EF4444' },
                  { label: 'Colloquio strutturato', val: 0.51, pct: 51, color: '#FFB74B' },
                  { label: 'Assessment comportamentale', val: 0.58, pct: 58, gradient: 'linear-gradient(90deg, #4B4DF7, #7B4DFF)', color: '#4B4DF7' },
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
              <p className="text-[11px] text-[#0D0D0D]/30 italic mt-4">Fonte: Schmidt & Hunter, 1998; Campion et al., 1997</p>
            </div>

            <Para>I dati sul campo confermano la teoria. Le aziende che utilizzano assessment comportamentale strutturato pre-assunzione registrano un <strong className="text-[#0D0D0D]/80">turnover inferiore del 39%</strong> rispetto a quelle che non li adottano. Hogan Assessments documenta riduzioni del turnover nel retail <strong className="text-[#0D0D0D]/80">fino al 61%</strong> con l'introduzione di assessment strutturati. Il colloquio, anche ben condotto, è vulnerabile al <strong className="text-[#0D0D0D]/80">faking behavior</strong>: nel lusso, dove i candidati conoscono perfettamente i codici del settore, questo rischio è massimo.</Para>

            <InfoBox title="Caso anonimo: chi investe in formazione dimezza il turnover" accent>
              <p>Un <strong className="text-[#0D0D0D]/80">gruppo del lusso europeo</strong> con oltre <strong className="text-[#0D0D0D]/80">8.000 dipendenti</strong> e circa <strong className="text-[#0D0D0D]/80">280 negozi diretti</strong> ha ridotto il turnover volontario dal <strong className="text-[#0D0D0D]/80">13,4% al 10,1% in due anni</strong>, portandolo a meno di un terzo della media di settore (30–35%). Il programma interno di brand academy — che combina formazione sul prodotto, coaching sul clienteling e mentorship con advisor senior — ha prodotto un <strong className="text-[#0D0D0D]/80">tasso di uscita inferiore di 8 punti percentuali</strong> tra chi vi ha partecipato. L'investimento in formazione è cresciuto del <strong className="text-[#0D0D0D]/80">48% in un solo anno</strong>, con oltre 35 ore medie erogate per persona.</p>
            </InfoBox>

            <SectionHeading num="4" title="I quattro rischi che il turnover amplifica" />
            <Para>Il turnover nei flagship store non è solo un costo di sostituzione. È un <strong className="text-[#0D0D0D]/80">moltiplicatore di rischi</strong> che agiscono su dimensioni diverse e che, combinati, possono erodere il vantaggio competitivo di una maison in modo silenzioso ma sistematico.</Para>

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
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0D0D0D]/35">Impatto</span>
                  </div>
                  <p className="text-[13px] font-semibold text-[#0D0D0D]/80 mb-2">{item.title}</p>
                  <p className="text-[12.5px] text-[#0D0D0D]/55 leading-[1.65]">{item.body}</p>
                </div>
              ))}
            </div>

            <Para>La <strong className="text-[#0D0D0D]/80">Direttiva UE sulla Trasparenza Retributiva (2023/970)</strong>, da recepire entro il <strong className="text-[#0D0D0D]/80">7 giugno 2026</strong>, impone la pubblicazione dei range salariali negli annunci e il reporting del gender pay gap. L'<strong className="text-[#0D0D0D]/80">EU AI Act (Regolamento 2024/1689)</strong> classifica i sistemi di selezione come ad alto rischio, richiedendo supervisione umana, trasparenza e test anti-bias da agosto 2026. La <strong className="text-[#0D0D0D]/80">CSRD</strong> obbliga a seguire lo standard <strong className="text-[#0D0D0D]/80">ESRS S1 (Own Workforce)</strong>, con oltre 30 metriche sul personale, inclusi i tassi di turnover.</Para>

            <SectionHeading num="5" title="Tre implicazioni per la strategia di retention" />

            <NumberedItem n={1} title="Spostare l'investimento a monte: dalla retention alla selezione predittiva">
              La maggior parte dei budget destinati alla retention viene investita dopo l'assunzione. Queste iniziative sono necessarie, ma intervengono quando l'errore di selezione è già stato commesso. Il punto di massimo ROI, nel ciclo di vita del dipendente, <strong className="text-[#0D0D0D]/80">si colloca prima della firma del contratto</strong>.
            </NumberedItem>
            <NumberedItem n={2} title="Costruire il profilo comportamentale sui top performer, non sulle job description">
              <strong className="text-[#0D0D0D]/80">Mappare empiricamente i top performer attuali</strong> per isolare i pattern comportamentali che distinguono chi resta e performa da chi abbandona produce risultati spesso controintuitivi. L'esperienza settoriale misura la conformità ai codici appresi, non la predisposizione naturale.
            </NumberedItem>
            <NumberedItem n={3} title="Quantificare il costo del turnover come KPI di business, non come metrica HR">
              Tradurre il tasso di turnover in <strong className="text-[#0D0D0D]/80">costo per punto vendita, in perdita stimata di fatturato VIP</strong>, in incremento del costo medio per transazione consente di spostare la conversazione dalla funzione HR al tavolo del CFO.
            </NumberedItem>

            <Quote>"La qualità della selezione è diventata un fattore competitivo di primo piano: non solo per la funzione HR, ma per il business nel suo complesso".</Quote>

            <SectionHeading title="3 domande per il tuo comitato di direzione" />
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

            <Quote>"La domanda non è se la scienza supportata dall'AI cambierà il modo in cui selezioniamo le persone. La domanda è chi sarà in grado di usarla per prendere decisioni migliori di quelle che prenderebbe senza di essa".</Quote>

            <div className="border-t border-black/[0.07] pt-8 mt-8">
              <h3 className="text-[1.1rem] font-bold text-[#0D0D0D] mb-4">Next step</h3>
              <Para>Se la tua organizzazione sta affrontando <strong className="text-[#0D0D0D]/80">tassi di turnover elevati nei flagship store</strong> o sta ripensando il modello di selezione per i ruoli retail, il punto di partenza più utile è una conversazione basata sui dati che già possiedi: quanto incide oggi il turnover del primo anno? Qual è il <strong className="text-[#0D0D0D]/80">costo reale per sostituzione</strong>, includendo la perdita di relazioni con i clienti VIP? Quali sono i comportamenti misurabili che distinguono <strong className="text-[#0D0D0D]/80">i tuoi top performer</strong> da chi abbandona entro 12 mesi?</Para>
              <a href="https://www.skillvue.ai/contact-us" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all hover:opacity-90 mt-2"
                style={{ background: 'linear-gradient(135deg, #4B4DF7 0%, #FF5F24 100%)' }}>
                Contattaci per una conversazione esplorativa
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>

            <div className="border-t border-black/[0.07] pt-8 mt-8">
              <h3 className="text-[1.1rem] font-bold text-[#0D0D0D] mb-4">About Skillvue</h3>
              <Para>Skillvue dà vita ai processi di gestione delle persone. Siamo una piattaforma di <strong className="text-[#0D0D0D]/80">talent intelligence</strong> basata sull'AI che aggiunge una dimensione dinamica e oggettiva ai dati HR: trasformiamo informazioni statiche in <strong className="text-[#0D0D0D]/80">insight predittivi</strong> che permettono di prendere decisioni migliori nel recruiting, nel performance management, nella mobilità interna e nella formazione e sviluppo.</Para>
              <Para>A differenza delle suite HR generiche o degli strumenti di assessment unidimensionali, Skillvue <strong className="text-[#0D0D0D]/80">combina la solidità della scienza psicometrica con la potenza dei moderni LLM</strong> per creare un <strong className="text-[#0D0D0D]/80">co-pilota AI scientificamente fondato</strong>, allineato al modello di leadership e al quadro di competenze specifico di ciascuna azienda.</Para>
            </div>

            <div className="border-t border-black/[0.07] pt-8 mt-8">
              <h3 className="text-[1rem] font-bold text-[#0D0D0D] mb-4">Fonti e riferimenti</h3>
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
                  'Hogan Assessments, Retail Personality Assessments e Success Stories (2021).',
                  'Regolamento (UE) 2024/1689, Artificial Intelligence Act, luglio 2024.',
                  'Direttiva (UE) 2023/970, Trasparenza Retributiva, maggio 2023.',
                ].map((ref, i) => (
                  <li key={i} className="text-[12px] text-[#0D0D0D]/40 italic leading-[1.6]">{ref}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-black/[0.07] pt-6 mt-8 flex items-center justify-between">
              <span className="text-[11px] text-[#0D0D0D]/25">Retail Lusso · 2026</span>
              <div className="flex items-center gap-2">
                <SkillvueIcon size={16} />
                <span className="text-[11px] text-[#0D0D0D]/25">Skillvue</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      <Head>
        <title>Il turnover nei negozi del lusso: il costo nascosto | Skillvue</title>
        <meta name="description" content="La selezione non efficace nei flagship store e il suo impatto sul business. Analisi della struttura economica del turnover e degli strumenti predittivi per ridurlo. Whitepaper gratuito di Skillvue." />
      </Head>
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
