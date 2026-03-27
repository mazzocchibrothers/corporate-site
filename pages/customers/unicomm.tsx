// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle, Wrench } from 'lucide-react';
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
      before: 'Come Unicomm sta costruendo un ',
      highlight1: 'talent lifecycle skills-based',
      middle: ' su ',
      highlight2: '270+ punti vendita',
      after: '',
    },
    subtitle: "Una digitalizzazione HR ancora agli inizi, oltre 7.000 dipendenti su 7 regioni e la necessità di standardizzare selezione, conferme e sviluppo interno. Con Skillvue, Unicomm sta trasformando la gestione del talento in un sistema unico basato sulle competenze.",
    heroMetrics: [
      { value: '3', label: 'Filoni attivati in parallelo' },
      { value: '4', label: 'Livelli di ruolo coperti' },
      { value: 'End-to-end', label: 'Talent lifecycle in costruzione' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Dipendenti', value: '7.000+' },
        { label: 'Insegne', value: '7 (Emisfero, Famila, Mega, Emi, A&O, C+C Cash&Carry, Hurrà)' },
        { label: 'Punti vendita diretti', value: '270+' },
        { label: 'Regioni', value: '7' },
        { label: 'Gruppo commerciale', value: 'Selex (dal 1964)' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Unicomm è un gruppo della <strong className="text-[#1A1A2E]/80 font-semibold">Grande Distribuzione Organizzata</strong> con oltre <strong className="text-[#1A1A2E]/80 font-semibold">270 punti vendita</strong> in 7 regioni, <strong className="text-[#1A1A2E]/80 font-semibold">7.000 dipendenti</strong> e 7 insegne. Associato al Gruppo Commerciale Selex dal 1964, è una delle principali realtà della GDO italiana. L’azienda partiva da una digitalizzazione HR ancora agli inizi, con processi largamente manuali. La sfida non era ottimizzare un processo esistente, ma costruirne uno strutturato: standardizzare le valutazioni su tutta la rete e adottare un approccio oggettivo alle competenze — dagli addetti vendita ai gerenti.
      </>,
      summary: "Il progetto sta trasformando Unicomm da un’organizzazione con processi HR largamente manuali a una realtà in cui selezione, conferme e sviluppo interno vengono progressivamente gestiti con un unico sistema strutturato e basato sulle competenze — un percorso di trasformazione end-to-end avviato di recente e in fase di consolidamento.",
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: "Unicomm non doveva ottimizzare i propri processi HR: doveva ripensarli da zero. Con digitalizzazione agli inizi, nessuna valutazione strutturata e 270+ punti vendita su 7 regioni, il vincolo era operativo e culturale insieme.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Zap,
          title: 'Digitalizzazione HR ancora agli inizi',
          text: "Selezione, conferme e crescita erano gestiti in modo manuale e non standardizzato. Impossibile avere una visione d\u2019insieme sulla qualit\u00e0 del talento su 7.000 dipendenti senza un sistema integrato e tracciabile.",
        },
        {
          icon: Layers,
          title: 'Rete distribuita, poca standardizzazione',
          text: "Con 7 insegne su 7 regioni, ogni sede operava con criteri propri. Due candidati con lo stesso potenziale potevano avere percorsi completamente diversi, non per merito ma per mancanza di un framework comune.",
        },
        {
          icon: Target,
          title: 'Tre processi critici da coprire in parallelo',
          text: "Serviva coprire simultaneamente hiring su tutte le insegne, conferme dei neoassunti a tempo indeterminato e sviluppo interno tramite academy per capo reparto e store manager.",
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: 'Nessuna valutazione oggettiva delle competenze',
          text: "Assunzioni, conferme e promozioni si basavano esclusivamente sull\u2019esperienza e sulle impressioni dei responsabili. Nessun dato strutturato su competenze soft o hard.",
        },
        {
          icon: Heart,
          title: 'Change management su una cultura non digitale',
          text: "Introdurre assessment digitali senza precedenti tecnologici in HR significava resistenze culturali importanti. Serviva un partner capace di accompagnare il cambiamento a tutti i livelli, non solo un tool.",
        },
        {
          icon: Wrench,
          title: 'Competenze specifiche non mappate',
          text: "Il modello Unicomm includeva soft skill GDO specifiche non presenti nelle librerie standard. Serviva la capacit\u00e0 di sviluppare valutazioni ad hoc sulle matrici interne e sulle specificit\u00e0 dei diversi ruoli.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: "Strutturare l’intero talent lifecycle: selezione, conferme e sviluppo interno gestiti in un unico sistema integrato, superando processi manuali e non standardizzati" },
        { icon: Scale, text: "Standardizzare le valutazioni su tutta la rete: stessi criteri, stesso framework di competenze, indipendentemente dall’insegna, dal punto vendita o dal singolo responsabile" },
        { icon: CheckCircle, text: "Adottare un approccio skills-based completo: valutazioni calibrate per obiettivo (hiring, conferma, sviluppo) e per ruolo/reparto, con un mix personalizzato di soft e hard skill" },
        { icon: Users, text: "Guidare un change management significativo: trasformare la cultura HR dell’organizzazione, portandola verso un sistema strutturato con il supporto di un partner tecnologico a 360°" },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Skillvue \u00e8 stato adottato per costruire il talent lifecycle di Unicomm con tre filoni in parallelo: hiring, conferme e sviluppo interno. Gli assessment combinano obiettivo del processo e ruolo/reparto, con personalizzazioni ad hoc sul modello Unicomm.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Heart, label: 'Soft skill specifiche del modello Unicomm (sviluppate ad hoc)' },
        { icon: Wrench, label: 'Competenze tecniche GDO (adattate alle matrici di valutazione interne)' },
        { icon: Layers, label: 'Mix calibrato per ruolo (client-facing vs. non, addetto vendita vs. gerente)' },
      ],
      methodologyLabel: 'METODOLOGIA',
      methodology: [
        {
          title: 'Tre filoni in parallelo',
          text: "Hiring per le posizioni aperte, conferme per i neoassunti da portare a tempo indeterminato, sviluppo tramite academy con due momenti annuali per progressione a capo reparto o store manager. Un sistema, tre finalit\u00e0.",
        },
        {
          title: 'Assessment personalizzati per ruolo e obiettivo',
          text: "Calibrati sull\u2019obiettivo del processo (selezione, conferma, sviluppo misurano aspetti diversi) e sul ruolo specifico. Le competenze non presenti nella libreria sono state sviluppate ad hoc sulle matrici Unicomm.",
        },
        {
          title: 'Change management come pilastro del progetto',
          text: "Non solo implementazione tecnologica, ma trasformazione culturale. L\u2019onboarding ha coinvolto HR Manager, operativi e IT. Skillvue come people partner a 360\u00b0, non come semplice strumento.",
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: "I risultati ottenuti da Unicomm attraverso l’adozione di Skillvue per la costruzione del proprio talent lifecycle.",
      metrics: [
        { value: '3', label: 'Filoni attivati in parallelo', sublabel: 'Hiring, conferme, sviluppo interno' },
        { value: '4', label: 'Livelli di ruolo coperti', sublabel: 'Da addetto vendita a gerente' },
        { value: 'End-to-end', label: 'Talent lifecycle in costruzione', sublabel: 'Selezione, conferme e sviluppo in un unico sistema' },
        { value: '7 insegne', label: 'Rete distribuita in fase di standardizzazione', sublabel: '270+ punti vendita coperti' },
      ],
      qualitative: [
        { icon: TrendingUp, title: ‘Verso un talent lifecycle integrato’, text: "Selezione, conferme e sviluppo interno gestiti con un\u2019unica logica skills-based. Un percorso avviato di recente che produce gi\u00e0 i primi risultati concreti nella standardizzazione." },
        { icon: Scale, title: ‘Standardizzazione in corso su tutta la rete’, text: "Le 7 insegne su 270+ punti vendita stanno adottando gli stessi criteri e framework. L\u2019obiettivo: decisioni su assunzioni, conferme e promozioni basate su dati oggettivi." },
      ],
    },
    vision: {
      badge: 'LA VISIONE',
      title: "Verso un’organizzazione completamente skills-based",
      intro: "Con i tre filoni del talent lifecycle avviati in parallelo, la visione di Unicomm è consolidare il modello skills-based come spina dorsale di tutte le decisioni sulle persone.",
      objective: "Ogni persona valutata, sviluppata e accompagnata con la stessa logica skills-based, dal primo giorno, indipendentemente dall\u2019insegna, dal ruolo o dal territorio.",
      bullets: [
        "Consolidamento dei tre filoni (hiring, conferme, sviluppo) in un modello operativo unico",
        "Evoluzione verso career path e succession planning guidati dai dati di competenza",
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'ins-mercato', company: "In’s Mercato", tag: 'Retail GDO · Mobilità Interna', headline: "~900 persone valutate. Una pipeline di Store Manager costruita dall’interno." },
        { id: 'adr', company: 'Aeroporti di Roma', industry: 'Aviation', tag: 'Aviation · Sviluppo Interno', headline: 'Come Aeroporti di Roma ha democratizzato l\'accesso allo sviluppo per 5.000 persone.' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'How Unicomm is building a ',
      highlight1: 'skills-based talent lifecycle',
      middle: ' across ',
      highlight2: '270+ stores',
      after: '',
    },
    subtitle: "HR digitization still in its early stages, over 7,000 employees across 7 regions and the need to standardize hiring, confirmations and internal development. With Skillvue, Unicomm is transforming talent management into a single skills-based system.",
    heroMetrics: [
      { value: '3', label: 'Streams activated in parallel' },
      { value: '4', label: 'Role levels covered' },
      { value: 'End-to-end', label: 'Talent lifecycle in progress' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Employees', value: '7,000+' },
        { label: 'Retail Brands', value: '7 (Emisfero, Famila, Mega, Emi, A&O, C+C Cash&Carry, Hurrà)' },
        { label: 'Direct Stores', value: '270+' },
        { label: 'Regions', value: '7' },
        { label: 'Commercial Group', value: 'Selex (since 1964)' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Unicomm is a <strong className="text-[#1A1A2E]/80 font-semibold">grocery and organized retail group</strong> headquartered in <strong className="text-[#1A1A2E]/80 font-semibold">Dueville (Vicenza), Italy</strong>, operating across <strong className="text-[#1A1A2E]/80 font-semibold">7 regions and 32 provinces</strong> with over <strong className="text-[#1A1A2E]/80 font-semibold">270 direct stores</strong> and <strong className="text-[#1A1A2E]/80 font-semibold">7 retail brands</strong> (Emisfero, Famila, Mega, Emi, A&O, C+C Cash&Carry, Hurrà). With over <strong className="text-[#1A1A2E]/80 font-semibold">7,000 employees</strong> and a historic association with the <strong className="text-[#1A1A2E]/80 font-semibold">Selex Commercial Group since 1964</strong>, it is one of Italy’s leading organized retail players. The company was starting from a position of <strong className="text-[#1A1A2E]/80 font-semibold">virtually zero HR digitization</strong> — largely manual, unstructured processes — with the ambition to make a qualitative leap. The challenge was not to optimize an existing process, but to build one from scratch: standardize assessments across a distributed network, centralize HR processes and adopt an objective competency-based approach at every level, from sales associates to store managers. A project of <strong className="text-[#1A1A2E]/80 font-semibold">radical change management</strong>, accompanied by the adoption of Skillvue as the technology partner to cover the entire talent lifecycle with a skills-based approach.
      </>,
      summary: "The project is transforming Unicomm from an organization with largely manual HR processes into a company where hiring, confirmations and internal development are progressively managed through a single structured, competency-based system — an end-to-end transformation journey recently launched and currently in its consolidation phase.",
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: "Unicomm didn’t need to optimize its HR processes: it needed to rethink them from scratch. With digitization still in its early stages, no structured assessment and 270+ stores across 7 regions, the constraint was both operational and cultural.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Zap,
          title: ‘HR digitization at zero’,
          text: "Hiring, confirmations and career growth paths were managed manually and without structure. Impossible to have any overview of talent quality across 7,000+ employees without an integrated, traceable system.",
        },
        {
          icon: Layers,
          title: ‘Distributed network, zero standardization’,
          text: "With 7 brands across 7 regions, each location operated with its own criteria. Two candidates with the same potential could have completely different paths — not by merit, but due to the lack of a common framework.",
        },
        {
          icon: Target,
          title: ‘Three critical processes to cover in parallel’,
          text: "The need was to cover simultaneously hiring across all brands, confirmations of new hires to permanent contract, and internal development through an academy for progression to department head and store manager.",
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: ‘No objective competency assessment’,
          text: "Hiring, confirmations and promotions were based exclusively on the experience and impressions of managers. No structured data on soft or hard skills.",
        },
        {
          icon: Heart,
          title: ‘Change management in a non-digital culture’,
          text: "Introducing digital assessments with no prior HR technology meant significant cultural resistance. The project needed a partner capable of guiding change at every level, not just a tool.",
        },
        {
          icon: Wrench,
          title: ‘Sector-specific competencies not mapped’,
          text: "The Unicomm model included soft skills specific to grocery retail not present in standard libraries. Bespoke assessments were needed, calibrated to internal evaluation matrices and the specifics of different roles.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Zap, text: "Digitize the entire talent lifecycle from scratch: hiring, confirmations and internal development managed in a single structured system, eliminating unstructured and untraceable processes" },
        { icon: Scale, text: "Standardize assessments across the entire network: same criteria, same competency framework, regardless of brand, store or individual manager" },
        { icon: CheckCircle, text: "Adopt a complete skills-based approach: assessments calibrated by objective (hiring, confirmation, development) and by role/department, with a customized mix of soft and hard skills" },
        { icon: Users, text: "Lead radical change management: transform the organization’s HR culture, moving from scratch with zero digitization to a structured system with the support of a 360° technology partner" },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "Skillvue was adopted to build Unicomm’s talent lifecycle with three parallel streams: hiring, confirmations and internal development. Assessments combine the process objective and the role/department, with bespoke customizations on the Unicomm model.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Heart, label: 'Unicomm-specific soft skills (developed bespoke)' },
        { icon: Wrench, label: 'Grocery retail technical competencies (adapted to internal evaluation matrices)' },
        { icon: Layers, label: 'Role-calibrated mix (client-facing vs. non, sales associate vs. store manager)' },
      ],
      methodologyLabel: 'METHODOLOGY',
      methodology: [
        {
          title: ‘Three streams in parallel’,
          text: "Hiring for open positions, confirmations for new hires to be converted to permanent contract, internal development through an academy with two annual milestones for progression to department head or store manager. One system, three objectives.",
        },
        {
          title: ‘Assessments customized by role and objective’,
          text: "Calibrated on two dimensions: process objective (hiring, confirmation and development measure different aspects) and specific role/department. Competencies not in the standard library were developed bespoke on Unicomm’s evaluation matrices.",
        },
        {
          title: ‘Change management as a project pillar’,
          text: "Not just a technology implementation, but a cultural transformation. Onboarding involved HR Manager, operatives and IT. Skillvue as a 360° people partner, not a simple tool.",
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The outcomes Unicomm achieved through Skillvue in building its talent lifecycle from scratch.',
      metrics: [
        { value: '3', label: 'Streams activated in parallel', sublabel: 'Hiring, confirmations, internal development' },
        { value: '4', label: 'Role levels covered', sublabel: 'From sales associate to store manager' },
        { value: 'End-to-end', label: 'Talent lifecycle in progress', sublabel: 'Hiring, confirmations and development in one system' },
        { value: '7 brands', label: 'Distributed network in standardization', sublabel: '270+ stores covered' },
      ],
      qualitative: [
        { icon: TrendingUp, title: 'Towards an integrated talent lifecycle', text: "Hiring, confirmations and internal development managed with a single skills-based logic. A recently launched path that is already producing concrete results in standardization." },
        { icon: Scale, title: 'Standardization in progress across the entire network', text: "The 7 brands across 270+ stores are adopting the same criteria and framework. The goal: decisions on hiring, confirmations and promotions based on objective data." },
      ],
    },
    vision: {
      badge: 'THE VISION',
      title: 'Towards a fully skills-based organization',
      intro: "With the coverage of the entire talent lifecycle underway, the natural step for Unicomm is to consolidate the skills-based model as the backbone of all people decisions.",
      objective: "Every person assessed, developed and supported with the same skills-based logic, from day one, regardless of brand, role or territory.",
      bullets: [
        "Consolidation of the three streams (hiring, confirmations, development) into a single operating model",
        "Evolution towards career paths and succession planning driven by competency data",
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'ins-mercato', company: "In’s Mercato", tag: "Retail GDO · Internal Mobility", headline: "~900 people assessed. A Store Manager pipeline built from within." },
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Internal Development', headline: 'How Aeroporti di Roma democratized access to development for 5,000 people.' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function UnicommStoryPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const c = lang === 'it' ? content.it : content.en;

  return (
    <>
      <Navbar />
      <main>

        {/* ===== HERO ===== */}
        <section className="relative pt-[80px]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #111128 50%, #0d0d1f 100%)' }} />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #4b4df7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b3be0 0%, transparent 40%)' }} />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Unicomm</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase mb-8 block w-fit" style={{ background: 'rgba(75,77,247,0.15)', color: '#7b7df9', border: '1px solid rgba(75,77,247,0.2)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.12 }}>
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
                      <img src="/logos/unicomm-logo.jpg" alt="Unicomm logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Unicomm</p>
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
                  <div className="mt-6 pt-6 border-t border-white/[0.08] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/[0.12] bg-white/[0.08] flex items-center justify-center">
                      <Users className="h-5 w-5 text-white/30" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">Giuseppe Curci</p>
                      <p className="text-[12px] text-white/40 leading-[1.5]">{lang === 'it' ? 'Direttore Risorse Umane di Gruppo' : 'Group Human Resources Director'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Video interview */}
            <motion.div className="mt-16 px-8 lg:px-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
              <video
                className="w-full rounded-2xl border border-white/[0.08]"
                src={lang === 'it' ? '/videos/unicomm-interview-it.mp4' : '/videos/unicomm-interview-en.mp4'}
                autoPlay
                muted
                controls
              />
            </motion.div>
          </div>
        </section>

        {/* ===== CONTENT SECTIONS ===== */}
        <section id="context-section" className="section-breathe relative py-16 lg:py-20" style={{ background: '#f8fafc' }}>
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* CONTEXT */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.context.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-6 max-w-3xl">{c.context.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.85] mb-8 max-w-3xl">{c.context.paragraph}</p>
              <p className="text-[15px] text-[#1A1A2E]/40 italic leading-[1.75] max-w-2xl border-l-2 border-[#4b4df7]/20 pl-5">
                {c.context.summary}
              </p>
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.challenge.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{c.challenge.title}</h2>
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{c.objectives.title}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {c.objectives.items.map((o, i) => (
                  <div key={i} className="flex items-start gap-5 rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <o.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <p className="text-[15px] text-[#1A1A2E]/70 leading-[1.65] pt-1.5">{o.text}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* SOLUTION */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.solution.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{c.solution.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12 max-w-3xl">{c.solution.intro}</p>

              <div className="mb-12">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.skillsLabel}</span>
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
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
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4] relative">{m.title}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65] relative">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{c.results.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12 max-w-3xl">{c.results.subtitle}</p>

              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {c.results.metrics.map(m => (
                    <div key={m.label} className="text-center">
                      <span className="block text-white" style={{ fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{m.value}</span>
                      <span className="text-[13px] text-white/[0.65] mt-3 block leading-[1.4]">{m.label}</span>
                      {m.sublabel && <span className="text-[11px] text-white/30 mt-1 block leading-[1.4]">{m.sublabel}</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
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

            {/* FUTURE VISION */}
            <Section>
              <div className="rounded-2xl border border-[#4b4df7]/[0.12] bg-gradient-to-br from-[#4b4df7]/[0.04] to-transparent p-10 lg:p-14">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-6 block w-fit" style={{ background: 'rgba(75,77,247,0.1)', color: '#4b4df7', border: '1px solid rgba(75,77,247,0.2)' }}>
                  {c.vision.badge}
                </span>
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4 leading-[1.3]">{c.vision.title}</h2>
                <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-8 max-w-3xl">{c.vision.intro}</p>
                <div className="rounded-xl border border-[#4b4df7]/[0.15] bg-[#4b4df7]/[0.05] p-6 mb-8 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.12)' }}>
                    <Target className="h-5 w-5" style={{ color: '#4b4df7' }} />
                  </div>
                  <p className="text-[15px] text-[#1A1A2E]/75 leading-[1.7]">{c.vision.objective}</p>
                </div>
                <div className="space-y-4">
                  {c.vision.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <ArrowRight className="h-4 w-4 mt-1 shrink-0" style={{ color: '#4b4df7' }} />
                      <p className="text-[15px] text-[#1A1A2E]/65 leading-[1.65]">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

          </div>
        </section>

        <div className="fade-into-dark" />

        {/* RELATED STORIES */}
        <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white/90 mb-12">{c.related.title}</h3>
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
