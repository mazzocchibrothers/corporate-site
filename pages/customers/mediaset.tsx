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
      before: 'Come selezionare e far crescere il talento su scala in un gruppo che ',
      highlight1: 'sta triplicando',
      middle: ' ',
      highlight2: 'le dimensioni',
      after: '',
    },
    subtitle: 'Con Skillvue, Mediaset ha trasformato 3.000 candidature in 15 assunzioni mirate di neolaureati e figure junior in sole 5 settimane. Le soft skill sono diventate il primo filtro di selezione e la loro oggettivizzazione ha permesso al team HR di avere a disposizione dati strutturati su ogni persona, utili per accompagnarne la crescita professionale all\'interno di una realtà in espansione.',
    heroMetrics: [
      { value: '3.000+', label: 'candidature processate' },
      { value: '5 settimane', label: 'gestione end-to-end' },
      { value: '4/5', label: 'candidate satisfaction' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Media & Telecom' },
        { label: 'Gruppo', value: 'MFE – MediaForEurope' },
        { label: 'Fatturato', value: '~2,5 mld €' },
        { label: 'Dipendenti', value: '~5.000' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Mediaset, parte del gruppo <strong className="text-[#1A1A2E]/80 font-semibold">MFE (MediaForEurope)</strong>, è il principale broadcaster commerciale privato in Italia e sta vivendo una fase di evoluzione senza precedenti: con l'acquisizione di ProSiebenSat.1 e la partecipazione in Impresa, MFE è diventato il primo broadcaster privato free-to-air a controllare operazioni in tre grandi mercati europei, raggiungendo <strong className="text-[#1A1A2E]/80 font-semibold">oltre 220 milioni di persone in sei paesi</strong>. In termini organizzativi, il salto è enorme: la forza lavoro passa da circa <strong className="text-[#1A1A2E]/80 font-semibold">5.200 a oltre 12.000 persone</strong>. È in questo contesto che nasce il <strong className="text-[#1A1A2E]/80 font-semibold">Progetto GRAPE</strong> (Graduate Program): il programma di selezione di stagisti e profili junior da inserire in diverse funzioni aziendali della sede di Cologno Monzese. In uno scenario di espansione senza precedenti, la capacità di identificare e attrarre talento — soprattutto profili junior ad alto potenziale — diventa una leva strategica irrinunciabile.
      </>,
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Migliaia di candidati, un team HR di piccole dimensioni e tanti CV troppo uguali tra di loro.',
      intro: 'Il Progetto GRAPE ha generato oltre 3.000 candidature. Il team HR dedicato (1 manager + 2 figure operative) si è posto l\'obiettivo di raggiungere 80 candidati qualificati a settimana da portare avanti nelle fasi successive del processo.',
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Zap,
          title: 'Il volume rendeva impossibile lo screening manuale',
          text: 'Per rispettare il ritmo desiderato dal business serviva un filtro strutturato capace di operare su scala senza sacrificare la qualità della valutazione o far passare sotto traccia profili ad alto potenziale.',
        },
        {
          icon: Shield,
          title: 'Il primo contatto con il brand doveva essere all\'altezza',
          text: 'Mediaset è uno dei brand più riconoscibili d\'Italia e compete con tech company e piattaforme digitali per gli stessi profili. La fluidità del processo di selezione non va sottovalutata.',
        },
      ],
      hrChallenges: [
        {
          icon: Users,
          title: 'Per i profili junior, il CV è poco parlante',
          text: 'Stagisti e neolaureati hanno curriculum poco differenzianti. Soft skill come problem solving, ragionamento logico e motivazione — le variabili che predicono il potenziale — sono invisibili sulla carta.',
        },
        {
          icon: Layers,
          title: 'Serviva un modello integrabile in un ecosistema multi-fase',
          text: 'Dal pre-screening a colloqui individuali ad assessment di gruppo in sede. Lo strumento di valutazione iniziale doveva produrre output auditabili, comparabili e utilizzabili nelle fasi successive.',
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: <><strong>Gestire il volume di candidature nei tempi dettati dal business</strong> — Selezione di 80 candidati ad alto potenziale a settimana per dare linfa costante al processo di selezione</> },
        { icon: Eye, text: <><strong>Rendere visibili le soft skill dal primo step</strong> — creare un ranking basato su competenze reali, producendo dati oggettivi e validato sul modello Mediaset</> },
        { icon: Shield, text: <><strong>Garantire un&apos;esperienza candidato all&apos;altezza del brand</strong> — primo contatto con Mediaset positivo, intuitivo e accessibile anche per chi non ha mai usato questo formato</> },
        { icon: Layers, text: <><strong>Integrare lo strumento nel processo esistente</strong> — output compatibili con il flusso multi-fase e utilizzabili come benchmark per sviluppi futuri nell&apos;utilizzo dello strumento</> },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'AI Pre-screening con Skillvue',
      intro: 'Skillvue \u00e8 stato integrato come primo filtro del Progetto GRAPE, combinando soft skill, test logici e domande di conoscenza. Il ranking viene validato dal team HR sul modello di competenze Mediaset; i profili idonei avanzano alle fasi successive.',
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: CheckCircle, label: 'Soft skill — calibrate sul modello Mediaset' },
        { icon: BarChart3, label: 'Ragionamento logico — test strutturati' },
        { icon: Wrench, label: 'Domande di conoscenza — role-relevant' },
      ],
      methodologyLabel: 'COME È STATO COSTRUITO',
      methodology: [
        {
          title: 'Pre-screening AI come primo filtro',
          text: 'Ogni candidato viene valutato su soft skill, logica e conoscenze. Il punteggio prodotto permette al team HR di costruire shortlist settimanali comparabili.',
        },
        {
          title: 'Ranking validato sul modello Mediaset',
          text: "Il ranking viene rivisto e integrato col modello di competenze Mediaset. L'AI supporta, il recruiter decide.",
        },
        {
          title: 'Integrato in un processo multi-fase',
          text: 'Primo step di un processo a più fasi: pre-screening AI, colloqui individuali, assessment di gruppo in sede.',
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: 'I risultati misurabili ottenuti da Mediaset attraverso Skillvue nel Progetto GRAPE.',
      metrics: [
        { value: '79%', label: 'Conversion rate assessment' },
        { value: '4.1/5', label: 'Soddisfazione candidati' },
        { value: '15', label: 'Assunzioni finali' },
      ],
      qualitative: [
        { icon: Eye, title: 'Per la prima volta, Mediaset ha visibilità sul suo skills database', text: 'Prima di Skillvue, le decisioni fatte sulla base della valutazione soggettiva dei singoli rimanevano una conoscenza dei singoli recruiter; ora si ragiona in ottica condivisa e con parametri comuni e standardizzati.' },
        { icon: Target, title: 'Shortlist qualificate, con risparmio immediato di risorse', text: 'I colloqui individuali sono partiti da una base informativa solida, non da un foglio bianco. Il risultato: un funnel più efficiente e decisioni più consapevoli a ogni step.' },
        { icon: Users, title: 'Human-in-the-loop, sempre', text: "Il ranking prodotto da Skillvue è stato rivisto e validato dal team HR di Mediaset sul modello di competenze aziendale. L'AI ha prodotto i dati; le persone hanno preso le decisioni." },
      ],
    },
    vision: {
      badge: 'EVOLUZIONE 2026',
      title: 'Da graduate program a Talent Acquisition strategy',
      intro: 'Quando il Progetto GRAPE ha dimostrato che grazie al supporto di Skillvue era possibile gestire anche alti volumi di candidature in tempi ridotti con un\'esperienza candidato positiva, il passo successivo è diventato quasi naturale.',
      objective: 'Estendere il pre-screening AI ai processi di Talent Acquisition di Mediaset, in un gruppo che sta crescendo vertiginosamente in sei paesi con la sfida strutturale di attrarre competenze digitali in un mercato del lavoro in contrazione demografica.',
      bullets: [
        'Mediaset ha già esteso Skillvue alla selezione di un Junior HR Business Partner per la sede centrale (1.500+ candidature)',
        'Obiettivo 2026: estendere il pre-screening AI ai processi di Talent Acquisition',
        'In un gruppo che sta crescendo su 6 paesi, identificare talento su scala non è un nice-to-have: è la base per costruire una forza lavoro a prova di futuro',
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail · Hiring & Screening', headline: 'Carrefour: come proteggere i margini su 1.200 punti vendita ottimizzando il KPI chiave del processo di selezione' },
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Internal Mobility', headline: "Aeroporti di Roma: come sviluppare un'organizzazione da quasi 5.000 persone per eseguire un piano da 9 miliardi." },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'How to select and develop talent at scale in a group that is ',
      highlight1: 'tripling',
      middle: ' ',
      highlight2: 'in size',
      after: '',
    },
    subtitle: 'With Skillvue, Mediaset turned 3,000 applications into 15 targeted hires of graduates and junior profiles in just 5 weeks. Soft skills became the first hiring filter, and their objectification gave the HR team structured data on every person to support their professional growth within a rapidly expanding organisation.',
    heroMetrics: [
      { value: '3,000+', label: 'applications processed' },
      { value: '5 weeks', label: 'end-to-end management' },
      { value: '4/5', label: 'candidate satisfaction' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Media & Telecom' },
        { label: 'Group', value: 'MFE – MediaForEurope' },
        { label: 'Revenue', value: '~€2.5B' },
        { label: 'Employees', value: '~5,000' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Company and The Context',
      paragraph: <>
        Mediaset, part of the <strong className="text-[#1A1A2E]/80 font-semibold">MFE – MediaForEurope</strong> group, is Italy's leading private commercial broadcaster and is undergoing an unprecedented phase of evolution: with the acquisition of ProSiebenSat.1 and a stake in Impresa, MFE has become the first private free-to-air broadcaster to control operations across three major European markets, reaching <strong className="text-[#1A1A2E]/80 font-semibold">over 220 million people in six countries</strong>. The organisational leap is enormous: the workforce is growing from around <strong className="text-[#1A1A2E]/80 font-semibold">5,200 to over 12,000 people</strong>. It is in this context that <strong className="text-[#1A1A2E]/80 font-semibold">Progetto GRAPE</strong> (Graduate Program) was born: a hiring programme for interns and junior profiles to be placed across various departments at Mediaset's Cologno Monzese headquarters. In a scenario of unprecedented expansion, <strong className="text-[#1A1A2E]/80 font-semibold">the ability to identify and attract talent</strong> — especially high-potential junior profiles — becomes an indispensable strategic lever.
      </>,
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'Thousands of candidates, a small HR team and CVs that all look the same.',
      intro: 'Progetto GRAPE generated over 3,000 applications. The dedicated HR team (1 manager + 2 operatives) set a target of 80 qualified candidates per week to advance to the next stages of the process.',
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Zap,
          title: 'Volume made manual screening impossible',
          text: 'To maintain the target pace, a structured filter was needed — capable of operating at scale without sacrificing evaluation quality or letting high-potential profiles slip through unnoticed.',
        },
        {
          icon: Shield,
          title: 'The first brand touchpoint had to be worthy of Mediaset',
          text: 'Mediaset is one of Italy\'s most recognisable brands and competes with tech companies and digital platforms for the same profiles. The smoothness of the hiring process cannot be underestimated.',
        },
      ],
      hrChallenges: [
        {
          icon: Users,
          title: 'For junior profiles, the CV says very little',
          text: 'Interns and recent graduates have largely undifferentiated CVs. Soft skills like problem solving, logical reasoning and motivation — the variables that actually predict potential — are invisible on paper.',
        },
        {
          icon: Layers,
          title: 'A model integrable into a multi-phase ecosystem was needed',
          text: 'From pre-screening to individual interviews to on-site group assessments. The initial evaluation tool had to produce auditable, comparable outputs to be used in the subsequent stages.',
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change',
      items: [
        { icon: Zap, text: <><strong>Manage application volumes within business timelines</strong> — 80 high-potential candidates pre-screened per week to keep the hiring process moving at pace</> },
        { icon: Eye, text: <><strong>Make soft skills visible from the first step</strong> — create a ranking based on real skills, producing objective data validated against the Mediaset model</> },
        { icon: Shield, text: <><strong>Ensure a candidate experience worthy of the brand</strong> — first touchpoint with Mediaset had to be positive, intuitive and accessible even for those who have never tried this assessment format</> },
        { icon: Layers, text: <><strong>Integrate the tool into the existing process</strong> — outputs compatible with the multi-phase flow and to be used as a benchmark for future development of the tool</> },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Pre-screening with Skillvue',
      intro: "Skillvue was integrated as the first filter of Progetto GRAPE, combining soft skills, logic tests and knowledge questions. The ranking is validated by the HR team on Mediaset\u2019s leadership model; suitable profiles advance to the next stages.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: CheckCircle, label: 'Soft skills — calibrated to Mediaset model' },
        { icon: BarChart3, label: 'Logical reasoning — structured tests' },
        { icon: Wrench, label: 'Knowledge questions — role-relevant' },
      ],
      methodologyLabel: 'HOW IT WAS BUILT',
      methodology: [
        {
          title: 'AI pre-screening as the first filter',
          text: 'Every candidate is assessed on soft skills, logic and knowledge. The score lets the HR team build comparable weekly shortlists.',
        },
        {
          title: 'Ranking validated against the Mediaset model',
          text: "The ranking is reviewed and integrated with Mediaset's leadership model. AI supports, the recruiter decides.",
        },
        {
          title: 'Integrated into a multi-phase process',
          text: 'First step of a multi-phase process: AI pre-screening, individual interviews, on-site group assessments.',
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The measurable outcomes Mediaset achieved through Skillvue across Progetto GRAPE.',
      metrics: [
        { value: '79%', label: 'Assessment conversion rate' },
        { value: '4.1/5', label: 'Candidate satisfaction' },
        { value: '15', label: 'Final hires' },
      ],
      qualitative: [
        { icon: Eye, title: 'For the first time, Mediaset has visibility into its skills database', text: 'Before Skillvue, decisions based on individual subjective assessment remained personal knowledge. Now the team works with shared, standardised parameters.' },
        { icon: Target, title: 'Qualified shortlists, with immediate resource savings', text: 'Individual interviews started from a solid information base, not a blank page. A more efficient funnel and more informed decisions at every step.' },
        { icon: Users, title: 'Human-in-the-loop, always', text: 'The ranking produced by Skillvue was reviewed and validated by the Mediaset HR team against the company leadership model. AI produced the data; people made the decisions.' },
      ],
    },
    vision: {
      badge: 'EVOLUTION 2026',
      title: 'From graduate program to Talent Acquisition strategy',
      intro: 'Once Progetto GRAPE demonstrated that Skillvue could handle high application volumes in compressed timelines with a positive candidate experience, the next step became quite natural.',
      objective: 'Extend AI pre-screening to Mediaset Talent Acquisition processes — in a group growing rapidly across six countries, with the structural challenge of attracting digital talent in a demographically contracting labour market.',
      bullets: [
        'Mediaset has already extended Skillvue to a Junior HR Business Partner hire at HQ (1,500+ applications)',
        '2026 target: extend AI pre-screening to Talent Acquisition processes',
        'In a group expanding across 6 countries, identifying talent at scale is not a nice-to-have — it is the foundation for building a future-proof workforce',
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail · Hiring & Screening', headline: 'Carrefour: how to protect margins across 1,200 stores by optimising the key hiring KPI' },
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Internal Mobility', headline: 'Aeroporti di Roma: how to develop an organisation of nearly 5,000 people to execute a €9 billion plan.' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function MediasetStoryPage() {
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
            <img src="/logos/mediaset-background-explore-stories (2).jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Mediaset</span>
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
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                      <img src="/logos/mediaset-logo.png" alt="Mediaset logo" className="w-full h-full object-contain " />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Mediaset</p>
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-6">{c.context.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.85] mb-8">{c.context.paragraph}</p>
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.challenge.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{c.challenge.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-14">{c.challenge.intro}</p>

              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.challenge.businessLabel}</span>
                <div className="grid md:grid-cols-2 gap-5">
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
                <div className="grid md:grid-cols-2 gap-5">
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
                      {typeof o.text === 'string' && o.text.includes(':') ? <><strong className="font-bold text-[#1A1A2E]/90">{o.text.split(':')[0]}</strong>:{o.text.split(':').slice(1).join(':')}</> : o.text}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* SOLUTION */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.solution.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{c.solution.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12">{c.solution.intro}</p>

              <div className="mb-12">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.skillsLabel}</span>
                <div className="grid grid-cols-3 gap-3">
                  {c.solution.skills.map((s) => (
                    <div key={s.label} className="inline-flex items-center gap-3 px-5 py-4 rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
                      <s.icon className="h-5 w-5 shrink-0" style={{ color: '#4b4df7' }} />
                      <span className="text-[14px] font-semibold text-[#1A1A2E]/70 whitespace-nowrap">{s.label}</span>
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
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12">{c.results.subtitle}</p>

              {/* Key metrics */}
              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
                  {/* 79% circular progress */}
                  <div className="text-center flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-5">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#4b4df7" strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40 * 0.79} ${2 * Math.PI * 40}`} />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[0].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[0].label}</span>
                  </div>
                  {/* 4.1/5 — 5 columns, 4 filled */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-end justify-center gap-2 pb-2">
                      <div className="rounded-sm bg-[#4b4df7]" style={{ width: 12, height: 56 }} />
                      <div className="rounded-sm bg-[#4b4df7]" style={{ width: 12, height: 56 }} />
                      <div className="rounded-sm bg-[#4b4df7]" style={{ width: 12, height: 56 }} />
                      <div className="rounded-sm bg-[#4b4df7]" style={{ width: 12, height: 56 }} />
                      <div className="rounded-sm bg-white/15" style={{ width: 12, height: 56 }} />
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[1].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[1].label}</span>
                  </div>
                  {/* 15 — target/bullseye icon */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-center justify-center">
                      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
                        <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
                        <circle cx="32" cy="32" r="18" stroke="rgba(75,77,247,0.4)" strokeWidth="2.5"/>
                        <circle cx="32" cy="32" r="8" fill="#4b4df7" opacity="0.8"/>
                        <line x1="32" y1="4" x2="32" y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="60" y1="32" x2="50" y2="32" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[2].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[2].label}</span>
                  </div>
                </div>
              </div>


              {/* Qualitative impact */}
              <div className="grid md:grid-cols-3 gap-5">
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
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4 leading-[1.3]">{c.vision.title}</h2>
                <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-8">{c.vision.intro}</p>
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
