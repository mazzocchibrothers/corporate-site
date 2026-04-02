// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

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

const heroStats = [
  { value: '75%', label: 'del turnover è prevenibile con azioni mirate' },
  { value: '67%', label: 'dei CHRO indica la retention come priorità critica 2025–2026' },
  { value: '20-25%', label: 'turnover annuo rete agenziale' },
  { value: '1,5-2x', label: 'costo di sostituzione vs. retribuzione annua' },
];

const featureCards = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Il 75% del turnover è prevenibile',
    desc: 'La maggior parte delle uscite non è inevitabile: sono il risultato di un mismatch tra aspirazioni e opportunità percepite, intercettabile mesi prima dei segnali terminali.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'La variabile mancante nel talent management',
    desc: 'Le aspirazioni di carriera predicono chi rimane e chi eccelle, eppure sono sistematicamente assenti dai processi HR dei gruppi assicurativi europei.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: '5 dimensioni predittive misurabili',
    desc: 'Un approccio strutturato alle aspirazioni opera su 5 dimensioni distinte, ciascuna con diversa capacità predittiva rispetto ai comportamenti organizzativi futuri.',
  },
];

export default function CareerAspirationInsuranceVetrina() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.async = true;
    script.onload = () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          portalId: '48438018',
          formId: '0c51980d-9722-42e9-8807-ac011247ee3c',
          region: 'na1',
          target: '#hs-form-container',
          redirectUrl: window.location.origin + '/lp/career-aspiration-insurance/whitepaper',
        });
      }
    };
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  return (
    <>
      <Head>
        <title>Career Aspiration Intelligence nel settore assicurativo | Skillvue</title>
        <meta
          name="description"
          content="Perché misurare le aspirazioni aiuta a prevedere chi rimane e chi eccelle. Whitepaper gratuito di Skillvue per CHRO, Chief Talent Officer e Head of Leadership Development."
        />
      </Head>

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
                Insurance · 2026
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
              className="text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-[-0.03em] text-[#0D0D0D] leading-[1.1] mb-6"
            >
              Career Aspiration Intelligence{' '}
              <span
                className="block"
                style={{ background: 'linear-gradient(90deg, #4B4DF7, #FF5F24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                nel settore assicurativo
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
              className="text-[17px] text-[#0D0D0D]/55 leading-[1.7] mb-4"
              style={{ fontWeight: 300 }}
            >
              Perché misurare le aspirazioni aiuta a prevedere chi rimane e chi eccelle
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={0.24}
              className="flex items-center justify-center gap-6 text-[12px] text-[#0D0D0D]/35 mb-12"
            >
              <span>A cura di <strong className="text-[#0D0D0D]/55">Skillvue</strong></span>
              <span className="w-px h-3 bg-[#0D0D0D]/15" />
              <span>~6 min read</span>
              <span className="w-px h-3 bg-[#0D0D0D]/15" />
              <span>CHRO · Chief Talent Officer · Head of Leadership Development</span>
            </motion.div>

            {/* Logo marquee */}
            {(() => {
              const logos = [
                { src: '/logos/generali.png', alt: 'Generali' },
                { src: '/logos/reale-mutua.png', alt: 'Reale Mutua' },
                { src: '/logos/unipol.svg', alt: 'Unipol' },
                { src: '/logos/plenitude.png', alt: 'Plenitude', square: true },
                { src: '/logos/mediaset-logo.png', alt: 'Mediaset' },
                { src: '/logos/windtre.svg', alt: 'WindTre Business' },
              ];
              const logoStyle = { filter: 'brightness(0)', opacity: 0.55 } as const;
              const LogoSet = ({ ariaHidden }: { ariaHidden?: boolean }) => (
                <div className="shrink-0 flex items-center gap-10" aria-hidden={ariaHidden || undefined}>
                  {logos.map((logo, i) => (
                    <div key={i} className="shrink-0 flex items-center justify-center" style={{ width: 168, height: logo.square ? 80 : 48 }}>
                      <img src={logo.src} alt={ariaHidden ? '' : logo.alt} style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', ...logoStyle }} />
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
                  <div className="lp-marquee flex items-center" style={{ width: 'max-content' }}>
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
                Un'analisi completa su come il settore assicurativo può trasformare la retention del management misurando la variabile più predittiva: le aspirazioni di carriera.
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
                    'Perché il 75% del turnover è prevenibile e come agire in anticipo',
                    'I 5 indicatori della Career Aspiration Inventory e la loro validità predittiva',
                    'Come integrare le aspirazioni in talent review e succession planning',
                    'Il ciclo operativo dal dato aspirazionale all\'intervento HR mirato',
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

                <div id="hs-form-container" />
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
    </>
  );
}
