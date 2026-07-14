// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle, Wrench, Smile } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import Head from 'next/head';

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
      before: '',
      highlight1: 'GRAPE',
      middle: ', la Graduate Program Experience di Mediaset: come selezionare e accompagnare ',
      highlight2: 'giovani di valore',
      after: ' guardando al ',
      highlight3: 'potenziale futuro',
    },
    subtitle: "Con Skillvue Mediaset ha standardizzato lo step di pre-screening di migliaia di candidature di profili junior al progetto Grape, creando una base di dati strutturati sulle caratteristiche di ogni candidato per facilitare il processo di selezione.",
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
        { label: 'Gruppo', value: 'MFE-MEDIAFOREUROPE' },
        { label: 'Fatturato', value: 'circa 4,03 miliardi €' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Mediaset, parte del gruppo <strong className="text-[#121212]/80 font-semibold">MFE-MEDIAFOREUROPE</strong>, è il principale broadcaster commerciale privato in Italia e sta vivendo una fase di evoluzione senza precedenti. Con l&apos;acquisizione di ProSiebenSat.1 e la partecipazione in Impresa, <strong className="text-[#121212]/80 font-semibold">MFE-MEDIAFOREUROPE</strong> è diventato il primo broadcaster privato a controllare operazioni in tre grandi mercati europei, raggiungendo <strong className="text-[#121212]/80 font-semibold">oltre 220 milioni di persone in sei paesi</strong>.<br /><br />
        È in questo scenario di innovazione e crescita che nasce il <strong className="text-[#121212]/80 font-semibold">progetto Grape</strong>{' '}(Graduate Program Experience): il programma di selezione di neo laureati e profili junior da inserire in diverse funzioni aziendali. In contesti come questo, identificare in maniera predittiva il talento diventa una leva strategica davvero irrinunciabile per garantire una buona riuscita del progetto. Ma come farlo quando si ricevono migliaia di candidature?
      </>,
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Migliaia di candidati e tanti CV che da soli non rivelavano il potenziale nascosto',
      intro: 'Il Progetto Grape ha generato oltre 3.000 candidature. Il team HR dedicato si è posto l\'obiettivo di individuare in sei settimane un numero significativo di candidati qualificati da portare avanti nelle fasi successive del processo, mantenendo alto il livello della candidate experience e senza rinunciare alla profondità dell\'assessment.',
      businessLabel: 'BUSINESS CHALLENGES',
      hrLabel: 'HR & PEOPLE CHALLENGES',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: 'La crescita europea del Gruppo rende urgente costruire una pipeline di talento',
          text: "MFE-MEDIAFOREUROPE sta espandendo il proprio perimetro su scala europea. Grape non è solo un programma di assunzione: è un significativo tassello che intende contribuire all'identificazione di profili junior che possano crescere con il Gruppo rispondendo alle sue esigenze future.",
        },
        {
          icon: Zap,
          title: 'Le necessità di business rischiavano di scontrarsi con il carico operativo HR',
          text: 'Per rispettare il ritmo desiderato di profili valutati e tenere il passo con gli inserimenti serviva un filtro diverso da quello manuale, capace di operare su scala senza sacrificare la qualità o far passare sotto traccia profili ad alto potenziale.',
        },
        {
          icon: Layers,
          title: 'Lo strumento scelto doveva adattarsi a un ecosistema multi-fase',
          text: 'Lo strumento di valutazione scelto per la gestione della fase iniziale del progetto doveva produrre output auditabili, comparabili e utilizzabili anche nelle fasi successive del Progetto Grape.',
        },
      ],
      hrChallenges: [
        {
          icon: Scale,
          title: 'La nuova gestione della selezione rispondeva a un più ampio cambiamento culturale',
          text: "Il processo di trasformazione culturale in corso in Mediaset richiedeva a HR un cambio di passo già dalla fase di Talent Attraction e Acquisition: portare a bordo le persone giuste diventava una leva davvero strategica e una misura del successo di quel cambiamento.",
        },
        {
          icon: Users,
          title: 'Serviva un modello di valutazione incentrato sulla predittività',
          text: 'I profili junior che vengono inseriti in percorsi come questo hanno spesso curriculum poco differenzianti. Soft skill come problem solving, ragionamento logico e motivazione, le variabili che predicono il vero potenziale, dovevano emergere al di là del semplice CV.',
        },
        {
          icon: Shield,
          title: 'Il primo contatto con il brand doveva rispecchiarne identità e valori',
          text: 'Mediaset è uno dei brand più riconoscibili d\'Italia e, in un mercato caratterizzato dalla forte competizione con tech company e piattaforme digitali per gli stessi profili, pone molta attenzione agli aspetti di employer branding anche in fase di attrazione e selezione.',
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: <><strong>Gestire il volume di candidature nei tempi dettati dal business</strong> — l&apos;obiettivo era individuare ogni settimana un considerevole numero di candidati ad alto potenziale, senza perdere qualità nella valutazione.</> },
        { icon: Eye, text: <><strong>Rendere visibili le soft skill dal primo step</strong> — realizzare una mappatura affidabile dei profili dei candidati, con dati oggettivi prodotti dall&apos;AI e validati sul modello Mediaset.</> },
        { icon: Shield, text: <><strong>Garantire un&apos;esperienza candidato all&apos;altezza del brand</strong> — il primo contatto con Mediaset doveva essere positivo, intuitivo e accessibile anche per chi non aveva mai usato questo formato di assessment.</> },
        { icon: Layers, text: <><strong>Integrare lo strumento nel processo esistente</strong> — gli output dovevano essere compatibili con il flusso multi-fase e utilizzabili come benchmark per sviluppi futuri della strategia di selezione.</> },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'AI Pre-screening con Skillvue',
      intro: 'Skillvue è stato integrato come primo filtro del Progetto GRAPE, combinando l\'analisi di soft skill, ragionamento logico e domande di conoscenza generale. Il ranking viene validato dal team HR sul modello di competenze Mediaset; i profili idonei avanzano alle fasi successive.',
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: CheckCircle, label: 'Soft skill — calibrate sul modello Mediaset' },
        { icon: BarChart3, label: 'Ragionamento logico — test strutturati' },
        { icon: Wrench, label: 'Domande di conoscenza — role-relevant' },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: 'Skillvue è stato integrato come primo filtro del Progetto Grape, combinando l\'analisi di soft skill, ragionamento logico e domande di conoscenza generale. Il ranking viene validato dal team HR sul modello di competenze Mediaset; i profili idonei avanzano alle fasi successive.',
      metrics: [
        { value: '3.000+', label: 'candidature processate' },
        { value: '4/5', label: 'Soddisfazione candidati' },
        { value: '79%', label: 'Conversion rate assessment' },
      ],
      qualitative: [
        { icon: Eye, title: 'Visibilità sul potenziale dei profili junior in ingresso', text: 'Prima di Skillvue, le decisioni venivano prese sulla base della valutazione soggettiva dei singoli recruiter; ora si ragiona in ottica condivisa e con parametri comuni e standardizzati.' },
        { icon: Target, title: 'Un processo di selezione più efficiente, con shortlist qualificate', text: 'Le fasi successive del processo di selezione partono da una base informativa solida. Il risultato: un funnel più efficiente e decisioni più consapevoli e data-driven ad ogni step.' },
        { icon: Users, title: 'Assessment customizzati sulle reali esigenze di Mediaset', text: "Instaurando un rapporto collaborativo fin dall'inizio, Skillvue e Mediaset hanno proposto ai candidati degli assessment validati dal team HR e aderenti alle aspettative di Mediaset." },
      ],
    },
    quote: {
      text: 'Il supporto di Skillvue ci ha assicurato di poter raccogliere informazioni aggiuntive soprattutto sullo stile comportamentale, sul modo in cui le persone affrontano diversi tipi di situazioni.',
      author: 'Luca Villari',
      role: 'Head of Talent Acquisition and Talent Development, Mediaset',
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring at Scale', headline: 'Carrefour: come proteggere i margini su 1.200 punti vendita ottimizzando il KPI chiave del processo di selezione' },
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Mobilità Interna', headline: "Aeroporti di Roma: come sviluppare un'organizzazione da quasi 5.000 persone per eseguire un piano da 9 miliardi." },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: '',
      highlight1: 'GRAPE',
      middle: ', Mediaset\'s Graduate Program Experience: how to identify and develop ',
      highlight2: 'talented young people',
      after: ' with an eye on ',
      highlight3: 'future potential',
    },
    subtitle: "With Skillvue, Mediaset standardised the pre-screening step across thousands of applications from junior profiles applying to Progetto GRAPE, building a structured dataset on the characteristics of every candidate to streamline the hiring process.",
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
        { label: 'Group', value: 'MFE-MEDIAFOREUROPE' },
        { label: 'Revenue', value: '~€4.03B' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Company and The Context',
      paragraph: <>
        Mediaset, part of the <strong className="text-[#121212]/80 font-semibold">MFE-MEDIAFOREUROPE</strong> group, is Italy&apos;s leading private commercial broadcaster and is undergoing an unprecedented phase of evolution. With the acquisition of ProSiebenSat.1 and a stake in Impresa, <strong className="text-[#121212]/80 font-semibold">MFE-MEDIAFOREUROPE</strong> has become the first private broadcaster to control operations across three major European markets, reaching <strong className="text-[#121212]/80 font-semibold">over 220 million people in six countries</strong>.<br /><br />
        It is in this scenario of innovation and growth that <strong className="text-[#121212]/80 font-semibold">Progetto GRAPE</strong>{' '}(Graduate Program Experience) was born: a hiring programme for recent graduates and junior profiles to be placed across various departments. In contexts like this, identifying talent predictively becomes a truly indispensable strategic lever for ensuring the success of the programme. But how to do it when you&apos;re receiving thousands of applications?
      </>,
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'Thousands of candidates and CVs that alone revealed nothing about hidden potential',
      intro: 'Progetto GRAPE generated over 3,000 applications. The dedicated HR team set a target of identifying, within six weeks, a significant number of qualified candidates to advance to the next stages of the process, while maintaining a high level of candidate experience and without compromising the depth of the assessment.',
      businessLabel: 'BUSINESS CHALLENGES',
      hrLabel: 'HR & PEOPLE CHALLENGES',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: 'The group\'s expansion made building a talent pipeline urgent',
          text: "MFE-MEDIAFOREUROPE is expanding its footprint across Europe. GRAPE is more than a hiring programme: it is a significant building block intended to contribute to identifying junior profiles who can grow with the Group and respond to its future needs.",
        },
        {
          icon: Zap,
          title: 'Business needs were colliding with HR operational capacity',
          text: 'To maintain the target pace of evaluated profiles and keep up with onboarding timelines, a different type of filter, capable of operating at scale without sacrificing quality or letting high-potential profiles slip through unnoticed, was needed.',
        },
        {
          icon: Layers,
          title: 'The chosen tool had to fit into a multi-phase ecosystem',
          text: 'The evaluation tool chosen to manage the initial phase of the programme had to produce auditable, comparable outputs usable in the subsequent stages of Progetto GRAPE.',
        },
      ],
      hrChallenges: [
        {
          icon: Scale,
          title: 'The new approach to hiring was part of a wider cultural shift',
          text: "The cultural transformation underway at Mediaset required HR to step up from the very first phase — Talent Attraction and Acquisition. Bringing the right people on board was becoming a truly strategic lever and a concrete measure of that change's success.",
        },
        {
          icon: Users,
          title: 'An evaluation model built around predictiveness was needed',
          text: 'Junior profiles placed in programmes like this often have largely similar CVs. Soft skills like problem solving, logical reasoning and motivation — the variables that predict true potential — needed to surface beyond the CV alone.',
        },
        {
          icon: Shield,
          title: 'The first brand touchpoint had to reflect its identity and values',
          text: 'Mediaset is one of Italy\'s most recognisable brands and, in a market defined by intense competition with tech companies and digital platforms for the same profiles, places strong emphasis on employer branding throughout the attraction and hiring process.',
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change',
      items: [
        { icon: Zap, text: <><strong>Manage application volumes within business timelines</strong> — the goal was to identify, every week, a significant number of high-potential candidates, without losing quality in the evaluation.</> },
        { icon: Eye, text: <><strong>Make soft skills visible from the first step</strong> — build a reliable mapping of candidate profiles, with objective data produced by AI and validated against the Mediaset model.</> },
        { icon: Shield, text: <><strong>Ensure a candidate experience worthy of the brand</strong> — the first touchpoint with Mediaset had to be positive, intuitive and accessible, even for candidates who had never used this assessment format before.</> },
        { icon: Layers, text: <><strong>Integrate the tool into the existing process</strong> — outputs had to be compatible with the multi-phase flow and usable as a benchmark for future development of the hiring strategy.</> },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Pre-screening with Skillvue',
      intro: "Skillvue was integrated as the first filter of Progetto GRAPE, combining soft skill analysis, logical reasoning and general knowledge questions. The ranking is validated by the HR team on Mediaset's leadership model; suitable profiles advance to the next stages.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: CheckCircle, label: 'Soft skills — calibrated to Mediaset model' },
        { icon: BarChart3, label: 'Logical reasoning — structured tests' },
        { icon: Wrench, label: 'Knowledge questions — role-relevant' },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'Skillvue was integrated as the first filter of Progetto GRAPE, combining soft skill analysis, logical reasoning and general knowledge questions. The ranking is validated by the HR team against the Mediaset skills model; suitable profiles advance to the next stages.',
      metrics: [
        { value: '3,000+', label: 'applications processed' },
        { value: '4/5', label: 'Candidate satisfaction' },
        { value: '79%', label: 'Assessment conversion rate' },
      ],
      qualitative: [
        { icon: Eye, title: 'Visibility into the potential of incoming junior profiles', text: 'Before Skillvue, decisions were based on the subjective assessment of individual recruiters; now the team works with shared, standardised parameters.' },
        { icon: Target, title: 'A more efficient hiring process, with qualified shortlists', text: 'The subsequent stages of the hiring process start from a solid information base. The result: a more efficient funnel and more informed, data-driven decisions at every step.' },
        { icon: Users, title: 'Assessments customised to Mediaset\'s actual needs', text: 'By building a collaborative relationship from the outset, Skillvue and Mediaset offered candidates assessments validated by the HR team and aligned with Mediaset\'s expectations.' },
      ],
    },
    quote: {
      text: 'Skillvue\'s support ensured we could gather additional information, especially on behavioural style and the way people approach different types of situations.',
      author: 'Luca Villari',
      role: 'Head of Talent Acquisition and Talent Development, Mediaset',
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Large-scale distribution · Hiring at Scale', headline: 'Carrefour: how to protect margins across 1,200 stores by optimising the key hiring KPI' },
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Internal Mobility', headline: 'Aeroporti di Roma: how to develop an organisation of nearly 5,000 people to execute a €9 billion plan.' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function Mediaset2StoryPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const c = lang === 'it' ? content.it : content.en;
  const metaTitle = `${c.headline.before}${c.headline.highlight1}${c.headline.middle || ''}${c.headline.highlight2 || ''}${c.headline.after || ''}${c.headline.highlight3 || ''} | Skillvue`;
  const metaDesc = c.subtitle.length > 160 ? c.subtitle.substring(0, 157) + '...' : c.subtitle;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Navbar />
      <main>

        {/* ===== HERO ===== */}
        <section className="relative pt-[80px] min-h-screen flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/mediaset-background-explore-stories (2).jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-10">
            {/* Breadcrumb */}
            <motion.div className="mb-5 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Button variant="tertiary" mode="dark" icon={null} onClick={() => { router.push(lang === 'it' ? '/clienti' : '/customers'); window.scrollTo(0, 0); }}>{c.breadcrumb}</Button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Mediaset</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main content */}
              <div className="lg:col-span-8 flex flex-col">
                <motion.div className="flex flex-col flex-1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium tracking-[0.08em] uppercase mb-4 block w-fit text-white/85 border border-white/15" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[48px] md:text-[44px] font-semibold tracking-[-0.02em] text-white/95 mb-4" style={{ lineHeight: 1.2 }}>
                    {c.headline.before}<span style={{ color: '#7b7df9' }}>{c.headline.highlight1}</span>{c.headline.middle}<span style={{ color: '#7b7df9' }}>{c.headline.highlight2}</span>{c.headline.after}{c.headline.highlight3 && <span style={{ color: '#7b7df9' }}>{c.headline.highlight3}</span>}
                  </h1>
                  <p className="text-[15px] text-white/[0.60] leading-[1.65] mb-6 max-w-2xl">{c.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" mode="dark" onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}>
                      {c.ctaPrimary}
                    </Button>
                    <Button variant="secondary" mode="dark" onClick={() => document.getElementById('context-section')?.scrollIntoView({ behavior: 'smooth' })}>
                      {c.ctaSecondary}
                    </Button>
                  </div>
                    {/* Metrics — pinned to bottom, aligned with client card */}
                    <div className="mt-auto pt-6 grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
                      {c.heroMetrics.map(m => (
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-2.5 py-2 md:px-5 md:py-3.5 text-center">
                      <span className="block text-white text-[19px] break-words stat-value md:text-[clamp(1.3rem,2.2vw,1.5rem)]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                      <span className="text-[12px] text-white/[0.55] mt-1.5 block leading-[1.4]">{m.label}</span>
                      </div>
                      ))}
                    </div>
                </motion.div>
              </div>

              {/* Client card + quote — no video */}
              <motion.div className="lg:col-span-4 flex flex-col gap-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/[0.08]">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                      <img src="/logos/mediaset-logo.png" alt="Mediaset logo" className="w-full h-full object-contain " />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-0.5">{c.clientCard.label}</span>
                      <p className="text-[16px] font-bold text-white/90">Mediaset</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {c.clientCard.facts.map(s => (
                      <div key={s.label}>
                        <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-0.5">{s.label}</span>
                        <p className="text-[13px] text-white/[0.65] leading-[1.4]">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Quote */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm px-5 py-4">
                  <p className="text-[12px] text-white/[0.65] leading-[1.6] italic mb-3">"{c.quote.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full shrink-0 border border-white/[0.15] bg-white/[0.08] flex items-center justify-center">
                      <span className="text-[11px] font-bold text-white/60">LV</span>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-white/70">{c.quote.author}</p>
                      <p className="text-[11px] text-white/35 leading-[1.4]">{c.quote.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CONTENT SECTIONS ===== */}
        <section id="context-section" className="section-breathe relative py-16 lg:py-20" style={{ background: '#F7F7F7' }}>
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

            {/* CONTEXT */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.context.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-6">{c.context.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.85] mb-8">{c.context.paragraph}</p>
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#ea580c' }}>{c.challenge.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{c.challenge.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-14">{c.challenge.intro}</p>

              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.challenge.businessLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.challenge.businessChallenges.map((ch) => (
                    <div key={ch.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(234,88,12,0.1)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#ea580c' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{ch.title}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{ch.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.challenge.hrLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.challenge.hrChallenges.map((ch) => (
                    <div key={ch.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(234,88,12,0.1)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#ea580c' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{ch.title}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{ch.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* OBJECTIVES */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.objectives.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-10">{c.objectives.title}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {c.objectives.items.map((o, i) => (
                  <div key={i} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <o.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <p className="text-[15px] text-[#121212]/70 leading-[1.65]">
                      {typeof o.text === 'string' && o.text.includes(':') ? <><strong className="font-bold text-[#121212]/90">{o.text.split(':')[0]}</strong>:{o.text.split(':').slice(1).join(':')}</> : o.text}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* SOLUTION */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.solution.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{c.solution.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{c.solution.intro}</p>

              <div className="mb-12">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.skillsLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.solution.skills.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <s.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{s.label}</h4>
                    </div>
                  ))}
                </div>
              </div>

            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#047857' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{c.results.title}</h2>
              {c.results.subtitle && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{c.results.subtitle}</p>}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {[
                  { ...c.results.metrics[0], Icon: Users },
                  { ...c.results.metrics[1], Icon: Smile },
                  { ...c.results.metrics[2], Icon: TrendingUp },
                ].map((m) => (
                  <div key={m.label} className="rounded-2xl border p-8" style={{ background: '#b7f5d8', borderColor: '#93e0bb' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(6,78,59,0.14)' }}>
                      <m.Icon className="h-[22px] w-[22px]" style={{ color: '#064e3b' }} />
                    </div>
                    <h4 className="text-[32px] stat-value text-[#0b3b28] mb-3 leading-[1.3]">{m.value}</h4>
                    <p className="text-[15px] text-[#0b3b28]/60 leading-[1.55]">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {c.results.qualitative.map((q) => (
                  <div key={q.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-8">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#e3f9ec' }}>
                      <q.icon className="h-[22px] w-[22px]" style={{ color: '#10b981' }} />
                    </div>
                    <h4 className="text-[19px] font-bold text-[#121212] mb-3 leading-[1.3]">{q.title}</h4>
                    <p className="text-[15px] text-[#121212]/55 leading-[1.55]">{q.text}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* QUOTE */}
            <Section className="mt-10">
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-8">
                <p className="text-[24px] font-medium text-[#121212]/75 leading-[1.75] italic mb-6">"{c.quote.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full shrink-0 border border-[#4b4df7]/[0.15] bg-[#4b4df7]/[0.08] flex items-center justify-center">
                    <span className="text-[14px] font-bold text-[#4b4df7]">LV</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#121212]/80">{c.quote.author}</p>
                    <p className="text-[12px] text-[#121212]/40 leading-[1.5]">{c.quote.role}</p>
                  </div>
                </div>
              </div>
            </Section>

          </div>
        </section>

        <div className="fade-into-dark" />

        {/* RELATED STORIES */}
        <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-white/90 leading-[1.4] mb-12">{c.related.title}</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {c.related.stories.map(s => (
                <button key={s.id} onClick={() => { router.push(`${lang === 'it' ? '/clienti' : '/customers'}/${s.id}`); window.scrollTo(0, 0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 transition-all duration-500">
                  <span className="text-[14px] text-white/40 mb-4 block">{s.tag}</span>
                  <h4 className="text-[24px] font-semibold text-white/90 mb-4">{s.company}</h4>
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
