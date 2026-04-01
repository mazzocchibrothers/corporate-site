// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { useLanguage } from '@/i18n/LanguageContext';

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}

// ─── BILINGUAL CONTENT ────────────────────────────────────────────────────────

const content = {
  it: {
    breadcrumb: 'Clienti',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'Subdued: come creare uno ',
      highlight1: 'standard di selezione unico',
      middle: ' e scalabile per l\'espansione di una rete di ',
      highlight2: '130+ negozi',
      after: '',
    },
    subtitle: 'Con Skillvue, Subdued ha costruito un processo di valutazione coerente e scalabile su più mercati, permettendo a un team HR di dimensioni ridotte di applicare lo stesso rigore di selezione su ogni paese e dimezzando il turnover.',
    heroMetrics: [
      { value: '-40%', label: 'Time-to-hire' },
      { value: '-50%', label: 'Turnover' },
      { value: '+20%', label: 'Retention nuovi assunti' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Fashion Retail' },
        { label: 'Dipendenti', value: '1.000+' },
        { label: 'Punti vendita', value: '130+ monomarca' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Subdued è un brand italiano di fashion retail. Fondato in Italia, oggi opera con oltre <strong className="text-[#1A1A2E]/80 font-semibold">130 negozi monomarca</strong> in continua espansione, <strong className="text-[#1A1A2E]/80 font-semibold">più di 1.000 dipendenti</strong> e una presenza in crescita su più continenti — inclusi USA, Medio Oriente, Sud-Est asiatico, Corea e Cina.
        <br /><br />
        In questo scenario, la capacità di selezionare le persone giuste al ritmo delle aperture diventa il vincolo operativo numero uno. Ogni nuovo negozio richiede un team capace di rappresentare il brand e il suo DNA italiano davanti a un pubblico Gen Z in mercati culturalmente diversi, ma il team HR è composto da sole <strong className="text-[#1A1A2E]/80 font-semibold">7 persone su 6 paesi</strong>. Con i metodi tradizionali, l'equazione non regge.
      </>,
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: 'Tante figure chiave da selezionare, turnover alto e un team HR snello che non poteva scalare con l\'espansione senza un sistema strutturato.',
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR REALITY',
      businessChallenges: [
        {
          icon: Eye,
          title: 'Andare oltre il CV per identificare le vere capacità di vendita',
          text: 'Il 50% dei candidati che superavano il primo screening si rivelava privo delle soft skill necessarie per il lavoro in store. Comunicazione, vendita e predisposizione al cliente: invisibili sulla carta.',
        },
        {
          icon: Scale,
          title: 'Nessuno standard cross-country',
          text: 'Ogni paese valutava con criteri diversi, in lingue diverse. Non esisteva un framework comune: "la persona giusta per Subdued" significava cose diverse a Milano e a Londra.',
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: '10-15 ore a settimana di telefonate introduttive',
          text: 'Senza un filtro strutturato, ogni candidato richiedeva un forte investimento di tempo anche solo per un pre-screening. 10-15 ore a settimana di screening telefonico e zero tempo per attività più strategiche.',
        },
        {
          icon: TrendingUp,
          title: 'Il turnover era strutturalmente alto',
          text: 'Nel fashion retail il turnover è fisiologicamente elevato. Per un brand dove l\'esperienza in negozio è parte della vendita, ogni assunzione sbagliata moltiplicava ulteriormente questo rischio.',
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: 'Rendere visibili le competenze invisibili: valutare comunicazione, vendita e teamworking prima del colloquio, con dati oggettivi su ogni candidato' },
        { icon: Target, text: 'Liberare il team dall\'operatività: ridurre le ore di screening per recuperare tempo per attività strategiche, employer branding e sviluppo' },
        { icon: Layers, text: 'Creare uno standard cross-country: stessi criteri di valutazione su tutti i mercati, adattati per lingua e ruolo, senza moltiplicare le risorse HR' },
        { icon: Heart, text: 'Scalare al ritmo dell\'espansione: un\'infrastruttura di selezione che accompagni ogni nuova apertura senza gravare sull\'operatività HR' },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: 'Il team HR di Subdued ha lavorato direttamente con Skillvue per selezionare le skill più rilevanti per i profili di store e costruire un assessment strutturato, erogato via WhatsApp — una scelta progettuale chiave per garantire un\'esperienza frictionless e un buon tasso di completamento.',
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: CheckCircle, label: 'Comunicazione' },
        { icon: TrendingUp, label: 'Capacità di vendita' },
        { icon: Users, label: 'Teamworking' },
      ],
      methodologyLabel: 'COME È STATO COSTRUITO',
      methodology: [
        {
          title: 'Candidatura ricevuta, assessment inviato via WhatsApp',
          text: 'La candidatura arriva nell\'ATS di Subdued. Il link all\'assessment Skillvue viene inviato via WhatsApp — mobile-first e allineato alle abitudini della Gen Z. Il candidato completa l\'assessment in massimo 15 minuti da qualunque device.',
        },
        {
          title: 'Assessment diversificati per ruolo e paese',
          text: 'Italia: video-presentazione + 2 soft skill (max 15 min). UK: killer question + video + 1 soft skill (max 10 min). Store Manager: comunicazione, vendita e teamworking. Stesso standard, adattato al contesto locale.',
        },
        {
          title: 'Report strutturato e colloquio mirato',
          text: 'Skillvue genera un report con punteggio per competenza, compatibilità complessiva, aree di forza e miglioramento. L\'HR utilizza il report per il colloquio in persona: più mirato, più personalizzato.',
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: 'I risultati misurabili ottenuti da Subdued attraverso l\'adozione di Skillvue nei processi di selezione su 6 paesi.',
      metrics: [
        { value: '-40%', label: 'Time-to-hire' },
        { value: '-50%', label: 'Turnover' },
        { value: '+20%', label: 'Retention nuovi assunti' },
        { value: '-70%', label: 'Ore di pre-screening' },
        { value: '80%', label: 'Candidati qualificati al 2° step' },
        { value: '6 paesi', label: 'Copertura internazionale' },
      ],
      qualitative: [
        { icon: Zap, title: 'Recruiter liberati dall\'operatività', text: 'Le ore di telefonate sono passate da 10-15 a 3-5 a settimana. Il team ha recuperato tempo per attività ad alto valore: employer branding, workforce planning, sviluppo.' },
        { icon: Target, title: 'Colloqui più mirati e personalizzati', text: 'Il primo colloquio è basato sul report Skillvue: il recruiter arriva preparato con dati sulle competenze. Solo profili pre-validati raggiungono il colloquio.' },
        { icon: Shield, title: 'Errori di assunzione drasticamente ridotti', text: 'Turnover dimezzato e retention in crescita del 20% dimostrano che i candidati assunti con Skillvue sono più adatti al ruolo. Meno costi di onboarding, meno impatto sulla performance di store.' },
        { icon: Heart, title: 'Employer branding inatteso', text: 'Il processo innovativo è diventato un elemento differenziante nell\'attrarre candidati Gen Z. Il processo di selezione stesso è diventato uno strumento di employer branding.' },
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring', headline: 'Come Carrefour Italia ha trasformato la selezione di 30.000 candidature l\'anno con soli 3 recruiter.' },
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Insurance · Hiring at Scale', headline: 'Come Europ Assistance ha assunto il 24% in più con il 18% di colloqui in meno.' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'Subdued: building a ',
      highlight1: 'single scalable selection standard',
      middle: ' for a network of ',
      highlight2: '130+ stores',
      after: '',
    },
    subtitle: 'With Skillvue, Subdued built a consistent, scalable evaluation process across multiple markets — allowing a lean HR team to apply the same selection rigour in every country while halving turnover.',
    heroMetrics: [
      { value: '-40%', label: 'Time-to-hire' },
      { value: '-50%', label: 'Turnover' },
      { value: '+20%', label: 'New hire retention' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Fashion Retail' },
        { label: 'Employees', value: '1,000+' },
        { label: 'Stores', value: '130+ mono-brand' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Subdued is an Italian fashion retail brand. Founded in Italy, it now operates over <strong className="text-[#1A1A2E]/80 font-semibold">130 mono-brand stores</strong> in continuous expansion, <strong className="text-[#1A1A2E]/80 font-semibold">1,000+ employees</strong> and a growing presence across multiple continents — including the US, Middle East, South-East Asia, Korea and China.
        <br /><br />
        In this context, the ability to hire the right people at the pace of new store openings becomes the number one operational constraint. Every new store requires a team capable of representing the brand and its Italian DNA to a Gen Z audience in culturally different markets — yet the HR team is just <strong className="text-[#1A1A2E]/80 font-semibold">7 people across 6 countries</strong>. With traditional methods, the equation simply does not work.
      </>,
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: 'Key store roles to fill, structurally high turnover, and a lean HR team that could not scale with global expansion without a structured system.',
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR REALITY',
      businessChallenges: [
        {
          icon: Eye,
          title: 'Going beyond the CV to identify true selling ability',
          text: '50% of candidates who passed initial screening lacked the soft skills for daily store work. Communication, selling ability and customer orientation: all invisible on paper.',
        },
        {
          icon: Scale,
          title: 'No cross-country evaluation standard',
          text: 'Each country used different criteria, different languages, different cultural sensitivities. No common framework existed to ensure "the right person for Subdued" meant the same thing in Milan and in London.',
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: '10–15 hours a week on introductory calls',
          text: 'Without a structured filter, every candidate required a significant time investment just for pre-screening. 10–15 hours a week on calls and zero time for anything more strategic.',
        },
        {
          icon: TrendingUp,
          title: 'Turnover was structurally high',
          text: 'Turnover in fashion retail is inherently elevated. For a brand where the in-store experience is a core part of the sale, every wrong hire amplified this risk further.',
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Zap, text: 'Make invisible competencies visible: assess communication, selling and teamworking before the interview, with objective data on every candidate' },
        { icon: Target, text: 'Free the team from operational work: reduce screening hours to recover time for strategic activities, employer branding and development' },
        { icon: Layers, text: 'Create a cross-country standard: the same evaluation criteria across all markets, adapted by language and role, without multiplying HR resources' },
        { icon: Heart, text: 'Scale at the pace of expansion: a hiring infrastructure that supports every new store opening without adding pressure to the HR team' },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: 'The Subdued HR team worked directly with Skillvue to select the most relevant skills for store profiles and build a structured assessment — delivered via WhatsApp, a deliberate design choice to ensure a frictionless experience and strong completion rates.',
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: CheckCircle, label: 'Communication' },
        { icon: TrendingUp, label: 'Selling ability' },
        { icon: Users, label: 'Teamworking' },
      ],
      methodologyLabel: 'HOW IT WAS BUILT',
      methodology: [
        {
          title: 'Application received, assessment sent via WhatsApp',
          text: 'The application arrives in Subdued\'s ATS. The Skillvue assessment link is sent via WhatsApp — mobile-first and aligned with Gen Z habits. Candidates complete it in max 15 minutes from any device.',
        },
        {
          title: 'Assessments tailored by role and country',
          text: 'Italy: video pitch + 2 soft skills (max 15 min). UK: killer question + video + 1 soft skill (max 10 min). Store Managers: communication, selling and teamworking. Same standard, adapted to local context.',
        },
        {
          title: 'Structured report and focused interview',
          text: 'Skillvue generates a report with score per competency, overall fit, strengths and areas for improvement. HR uses the report to run the in-person interview: more targeted, more personalised.',
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The measurable outcomes Subdued achieved through Skillvue across its hiring processes in 6 countries.',
      metrics: [
        { value: '-40%', label: 'Time-to-hire' },
        { value: '-50%', label: 'Turnover' },
        { value: '+20%', label: 'New hire retention' },
        { value: '-70%', label: 'Pre-screening hours' },
        { value: '80%', label: 'Qualified candidates at 2nd step' },
        { value: '6 countries', label: 'International coverage' },
      ],
      qualitative: [
        { icon: Zap, title: 'Recruiters freed from operations', text: 'Call hours dropped from 10–15 to 3–5 per week. The team recovered time for high-value activities: employer branding, workforce planning, development.' },
        { icon: Target, title: 'More focused and personalised interviews', text: 'The first interview is based on the Skillvue report: the recruiter arrives prepared with competency data. Only pre-validated profiles reach the interview stage.' },
        { icon: Shield, title: 'Hiring mistakes drastically reduced', text: 'Turnover halved and retention up 20% show that candidates hired with Skillvue are better suited to the role. Fewer onboarding costs, less impact on store performance.' },
        { icon: Heart, title: 'Unexpected employer branding effect', text: 'The innovative process became a differentiating element in attracting Gen Z candidates. The selection process itself turned into an employer branding asset.' },
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring', headline: 'How Carrefour Italia transformed the selection of 30,000 applications a year with just 3 recruiters.' },
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Insurance · Hiring at Scale', headline: 'How Europ Assistance hired 24% more with 18% fewer interviews.' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function SubduedStoryPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const c = lang === 'it' ? content.it : content.en;

  return (
    <>
      <Navbar />
      <main>

        {/* ===== HERO ===== */}
        <section className="relative pt-[80px]">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/subdued-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(6px) brightness(0.3)', transform: 'scale(1.05)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Subdued</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase mb-8 block w-fit" style={{ background: 'rgba(75,77,247,0.15)', color: '#7b7df9', border: '1px solid rgba(75,77,247,0.2)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.25 }}>
                    {c.headline.before}<span style={{ color: '#7b7df9' }}>{c.headline.highlight1}</span>{c.headline.middle}<span style={{ color: '#7b7df9' }}>{c.headline.highlight2}</span>{c.headline.after}
                  </h1>
                  <p className="text-[17px] text-white/[0.60] leading-[1.75] mb-12 max-w-2xl">{c.subtitle}</p>
                  <div className="flex flex-wrap gap-4 mb-12">
                    {c.heroMetrics.map(m => (
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-4">
                        <span className="block text-white" style={{ fontSize: '1.7rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[13px] text-white/[0.55] mt-1 block">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-300" style={{ background: '#4b4df7' }}>
                      {c.ctaPrimary} <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => document.getElementById('context-section')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white/70 border border-white/[0.15] hover:border-white/[0.25] hover:text-white transition-all duration-300">
                      {c.ctaSecondary} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Client card */}
              <motion.div className="lg:col-span-5 lg:sticky lg:top-[100px] self-start" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.08]">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white flex items-center justify-center p-1.5">
                      <img src="/logos/subdued-logo.png" alt="Subdued logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Subdued</p>
                    </div>
                  </div>
                  <div className="divide-y divide-white/[0.08]">
                    {c.clientCard.facts.map(s => (
                      <div key={s.label} className="py-4 first:pt-0 last:pb-0">
                        <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{s.label}</span>
                        <p className="text-[14px] text-white/[0.65] leading-[1.6]">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CONTENT SECTIONS ===== */}
        <section id="context-section" className="section-breathe relative py-16 lg:py-20" style={{ background: '#f8fafc' }}>
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* CONTEXT */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.context.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-6 max-w-3xl">{c.context.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.85] mb-8 max-w-3xl">{c.context.paragraph}</p>
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.challenge.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{c.challenge.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-14 max-w-3xl">{c.challenge.intro}</p>

              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.challenge.businessLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.challenge.businessChallenges.map((ch) => (
                    <div key={ch.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4]">{ch.title}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{ch.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.challenge.hrLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.challenge.hrChallenges.map((ch) => (
                    <div key={ch.title} className="rounded-2xl border border-[#4b4df7]/[0.1] bg-[#4b4df7]/[0.02] p-7">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.1)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4]">{ch.title}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{ch.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* OBJECTIVES */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.objectives.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-10">{c.objectives.title}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {c.objectives.items.map((o, i) => (
                  <div key={i} className="flex items-start gap-5 rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <o.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <p className="text-[15px] text-[#1A1A2E]/70 leading-[1.65] pt-1.5">
                      {o.text.includes(':') ? <><strong className="font-bold text-[#1A1A2E]/90">{o.text.split(':')[0]}</strong>:{o.text.split(':').slice(1).join(':')}</> : o.text}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* SOLUTION */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.solution.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{c.solution.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12 max-w-3xl">{c.solution.intro}</p>

              <div className="mb-12">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.skillsLabel}</span>
                <div className="flex flex-col sm:flex-row gap-3">
                  {c.solution.skills.map((s) => (
                    <div key={s.label} className="inline-flex items-center gap-3 px-5 py-4 rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
                      <s.icon className="h-5 w-5 shrink-0" style={{ color: '#4b4df7' }} />
                      <span className="text-[14px] font-semibold text-[#1A1A2E]/70">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.methodologyLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.solution.methodology.map((m, i) => (
                    <div key={m.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm relative overflow-hidden">
                      <span className="absolute top-5 right-6 text-[3rem] font-black leading-none select-none" style={{ color: 'rgba(75,77,247,0.04)' }}>0{i + 1}</span>
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4] relative">{m.title.replace(/^\d+\s*[—\-]+\s*/, '')}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65] relative">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{c.results.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12 max-w-3xl">{c.results.subtitle}</p>

              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                  {c.results.metrics.map(m => (
                    <div key={m.label} className="text-center">
                      <span className="block text-white" style={{ fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{m.value}</span>
                      <span className="text-[13px] text-white/[0.65] mt-3 block leading-[1.4]">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {c.results.qualitative.map((q) => (
                  <div key={q.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <q.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4]">{q.title}</h4>
                    <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{q.text}</p>
                  </div>
                ))}
              </div>
            </Section>

          </div>
        </section>

        <div className="fade-into-dark" />

        {/* RELATED STORIES */}
        <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white/90 leading-[1.4] mb-12">{c.related.title}</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {c.related.stories.map(s => (
                <button key={s.id} onClick={() => { router.push(`/customers/${s.id}`); window.scrollTo(0, 0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 lg:p-14 transition-all duration-500">
                  <span className="text-[14px] text-white/40 mb-4 block">{s.tag}</span>
                  <h4 className="text-[24px] font-bold text-white/90 mb-4">{s.company}</h4>
                  <p className="text-[16px] text-white/[0.65] leading-[1.7] mb-8">{s.headline}</p>
                  <span className="inline-flex items-center gap-2 text-[15px] text-white/50 group-hover:text-white/80 font-semibold transition-colors duration-300">
                    {c.related.cta} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <SolutionFinalCTA headline={c.finalCta.headline} accentWord={c.finalCta.accent} />
        <Footer />
      </main>
    </>
  );
}
