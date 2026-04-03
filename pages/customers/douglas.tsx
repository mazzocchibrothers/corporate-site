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
      before: 'Come il primo beauty retailer europeo ha reso visibili le competenze di ',
      highlight1: '2.200 persone',
      middle: ' su 370 store in ',
      highlight2: '5 settimane',
      after: '',
    },
    subtitle: "Una rete vendita di 2.500 dipendenti distribuita su quasi 400 punti vendita, nessuna visibilità sulle competenze e un turnover elevato tipico del beauty retail. Con Skillvue, Douglas ha creato per la prima volta un database completo di competenze dell'intera forza lavoro, accorciando la distanza tra HQ e rete vendita e abilitando percorsi di crescita basati sui dati.",
    heroMetrics: [
      { value: '2K', label: 'persone portate nel radar di HR' },
      { value: '5 sett.', label: 'tempo di mappatura' },
      { value: '88%', label: 'tasso di completion' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Retail' },
        { label: 'Gruppo', value: 'Douglas Group' },
        { label: 'Fatturato', value: '521,5 mln €' },
        { label: 'Dipendenti', value: '2.500' },
        { label: 'Punti vendita', value: '370+' },
        { label: 'Use Case', value: 'Learning & Development, Internal Mobility' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Douglas Group, con <strong className="text-[#1A1A2E]/80 font-semibold">1.972 punti vendita in 22 paesi</strong>, un fatturato di <strong className="text-[#1A1A2E]/80 font-semibold">€4,58 miliardi</strong> a livello europeo e un piano di espansione da <strong className="text-[#1A1A2E]/80 font-semibold">200 nuove aperture e 400 ristrutturazioni entro fine 2026</strong>, è il primo beauty retailer omnicanale in Europa. La qualità della consulenza in-store è il principale vantaggio competitivo del retail fisico rispetto all'e-commerce, ma è anche la variabile meno misurata e strutturata del settore. In Italia, Douglas opera con oltre <strong className="text-[#1A1A2E]/80 font-semibold">370 punti vendita</strong> e circa <strong className="text-[#1A1A2E]/80 font-semibold">2.500 persone</strong> nella rete commerciale, in un mercato beauty che traina i consumi interni per <strong className="text-[#1A1A2E]/80 font-semibold">€14,2 miliardi</strong>.<br /><br />Seppure in un contesto di crescita molto solida, dal punto di vista people emergevano delle lacune. L\u2019HQ italiano non disponeva di <strong className="text-[#1A1A2E]/80 font-semibold">alcun dato oggettivo sulle competenze</strong> distribuite nelle persone in rete vendita: l\u2019unica fonte erano i feedback dei responsabili di negozio o di area. In un settore dove il turnover del personale di vendita oscilla tra il <strong className="text-[#1A1A2E]/80 font-semibold">25% e il 35%</strong> annuo e può essere direttamente ricollegato alla possibilità di crescita e sviluppo all\u2019interno dell\u2019azienda, è diventata chiara la necessità di adottare un approccio più data-driven alla gestione del talento.
      </>,
      summary: "Il progetto ha trasformato la gestione del talento da un modello basato su feedback soggettivi e osservazione in presenza a un sistema scalabile e data-driven, creando per la prima volta una fotografia completa e oggettiva delle competenze dell'intera rete vendita — soft skill e hard skill — e abilitando percorsi di crescita, mobilità interna e formazione customizzata basati su dati reali.",
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: "Su 2.500 dipendenti in quasi 400 punti vendita, l\u2019HQ non disponeva di alcun dato strutturato sulle competenze. In un settore con turnover elevato, l\u2019assenza di dati significava perdere talento, formare male e non pianificare la mobilit\u00e0 interna.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Eye,
          title: 'Assenza di visibilità sulle figure ad alto potenziale',
          text: "Le uniche informazioni disponibili erano feedback soggettivi dei responsabili, disomogenei e non confrontabili tra sedi.",
        },
        {
          icon: Users,
          title: 'Forte distanza tra HQ e rete vendita',
          text: "I dipendenti non avevano modo di far emergere competenze e aspirazioni. Il talento restava invisibile, con impatto su engagement e retention.",
        },
        {
          icon: TrendingUp,
          title: 'Turnover elevato e consulenza in-store a rischio',
          text: "Con un turnover del 25-35% e la crescente complessit\u00e0 del prodotto beauty \u2013 skincare scientifica, fragranze di nicchia, clean beauty \u2013 trattenere e sviluppare i talenti interni \u00e8 un asset strategico non negoziabile.",
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: 'Analisi delle competenze necessaria ma insostenibile',
          text: "Su 2.500 persone distribuite sul territorio, l\u2019osservazione in presenza comportava tempi lunghi, costi elevati e risultati disomogenei.",
        },
        {
          icon: Layers,
          title: 'Sviluppo riservato al 5-10% della popolazione',
          text: "Mancava la capacit\u00e0 di offrire opportunit\u00e0 di crescita su scala, non solo ai pochi gi\u00e0 identificati.",
        },
        {
          icon: BarChart3,
          title: 'Nessun feedback strutturato ai dipendenti',
          text: "L\u2019assenza di una restituzione oggettiva lasciava l\u2019iniziativa di sviluppo nelle mani del singolo responsabile.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Eye, text: "Fotografare in maniera oggettiva e immediata le competenze dell'intera rete vendita: un\u2019analisi standardizzata su tutti i ruoli (Beauty Advisor, Sales Assistant, Store Manager) e su tutte le seniority." },
        { icon: Zap, text: "Ottimizzare tempi e costi dell\u2019analisi delle competenze interne: renderli sostenibili per i tassi di turnover e la velocit\u00e0 del mercato del lavoro, sostituendo l\u2019osservazione in presenza con un sistema scalabile." },
        { icon: TrendingUp, text: "Promuovere percorsi di crescita interna e ridurre il turnover: identificare persone ad alto potenziale e propensioni a ruoli diversi per agevolare spostamenti interni orizzontali e verticali, riducendo gli effort di selezione dall\u2019esterno." },
        { icon: Target, text: "Lavorare preventivamente su formazione e sviluppo: costruire un database di competenze condiviso che permetta di attivare percorsi formativi customizzati per colmare i gap esistenti e pianificare lo sviluppo della forza lavoro." },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Il team People Science Skillvue ha lavorato per allineare gli assessment costruiti in piattaforma con il modello di leadership aziendale e creato valutazioni calate sulle reali situazioni lavorative dei punti vendita.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Wrench, label: 'Hard Skill industry-specific' },
        { icon: Heart, label: 'Soft Skill chiave per la vendita' },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: "I risultati quantitativi e qualitativi del progetto Skillvue x Douglas.",
      metrics: [
        { value: '88%', label: 'Completion rate' },
        { value: '5 sett.', label: 'Tempo di mappatura' },
        { value: 'Solo 3', label: 'Persone nel team HR' },
      ],
      qualitative: [
        { icon: Eye, title: 'Competenze finalmente visibili', text: "Per la prima volta, una visione chiara e confrontabile delle competenze di oggi e di domani per ogni persona della rete vendita: un quadro direttamente azionabile per decisioni su crescita, mobilit\u00e0 e formazione." },
        { icon: Target, title: 'Talento nascosto e potenziale predittivo', text: "L\u2019analisi ha individuato propensioni predittive a ruoli diversi, agevolando spostamenti interni orizzontali e verticali e scoprendo talento dove prima non esisteva visibilit\u00e0." },
        { icon: CheckCircle, title: 'Formazione customizzata e skill gap colmati', text: "Con i dati raccolti sono stati attivati percorsi formativi customizzati per colmare i gap esistenti e definire pi\u00f9 rapidamente le ricollocazioni interne. Un altro punto cruciale per ottimizzare costi e performance." },
        { icon: Zap, title: 'Ottimizzazione di tempi e costi', text: "Tempi di analisi ottimizzati e impegno dei responsabili ridotto, liberando risorse per attivit\u00e0 di sviluppo a maggior valore." },
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'unicomm', company: 'Unicomm', tag: 'Retail GDO · Sviluppo interno', headline: 'Come Unicomm sta costruendo una nuova gestione del talento su una rete di 270 punti vendita in costante aumento' },
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring at Scale', headline: 'Carrefour: come proteggere i margini su 1.200 punti vendita ottimizzando il KPI chiave del processo di selezione' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'How Europe\u2019s leading beauty retailer made the skills of ',
      highlight1: '2,200 people',
      middle: ' across 370 stores visible in ',
      highlight2: '5 weeks',
      after: '',
    },
    subtitle: "A retail network of 2,500 employees spread across nearly 400 stores, zero visibility on competencies, and the high turnover typical of beauty retail. With Skillvue, Douglas created the first-ever complete skills database of its entire workforce, closing the gap between HQ and the sales network and enabling data-driven career development.",
    heroMetrics: [
      { value: '2K', label: 'people brought into HR\u2019s radar' },
      { value: '5 weeks', label: 'mapping timeframe' },
      { value: '88%', label: 'completion rate' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Retail' },
        { label: 'Group', value: 'Douglas Group' },
        { label: 'Revenue', value: '€521.5M (Italy)' },
        { label: 'Employees', value: '2,500' },
        { label: 'Stores', value: '370+' },
        { label: 'Use Case', value: 'Learning & Development, Internal Mobility' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Douglas Group, with <strong className="text-[#1A1A2E]/80 font-semibold">1,972 stores across 22 countries</strong>, a European revenue of <strong className="text-[#1A1A2E]/80 font-semibold">€4.58 billion</strong>, and an expansion plan of <strong className="text-[#1A1A2E]/80 font-semibold">200 new openings and 400 renovations by end of 2026</strong>, is Europe\u2019s leading omnichannel beauty retailer. The quality of in-store advisory is the primary competitive advantage of physical retail over e-commerce \u2014 yet it is also the least measured and structured variable in the sector. In Italy, Douglas operates with over <strong className="text-[#1A1A2E]/80 font-semibold">370 stores</strong> and approximately <strong className="text-[#1A1A2E]/80 font-semibold">2,500 people</strong> in the commercial network, in a beauty market worth <strong className="text-[#1A1A2E]/80 font-semibold">€14.2 billion</strong> in domestic consumption.<br /><br />Despite a context of very solid growth, people-side gaps were emerging. The Italian HQ had <strong className="text-[#1A1A2E]/80 font-semibold">no objective data on the competencies</strong> of its sales network: the only source was feedback from store or area managers. In a sector where sales staff turnover ranges between <strong className="text-[#1A1A2E]/80 font-semibold">25% and 35%</strong> annually \u2014 and can be directly linked to opportunities for growth and development within the company \u2014 the need to adopt a more data-driven approach to talent management became clear.
      </>,
      summary: "The project transformed talent management from a model based on subjective feedback and in-person observation to a scalable, data-driven system — creating for the first time a complete and objective picture of skills across the entire sales network, both soft and hard skills, and enabling career development, internal mobility and customised training based on real data.",
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: "Across 2,500 employees in nearly 400 stores, the HQ had no structured data on competencies. In a high-turnover sector, the absence of data meant losing talent, training poorly and being unable to plan internal mobility.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Eye,
          title: 'No visibility on high-potential profiles',
          text: "The only information available was subjective feedback from managers \u2014 inconsistent and not comparable across locations.",
        },
        {
          icon: Users,
          title: 'A wide gap between HQ and the retail network',
          text: "Employees had no way to surface their competencies and aspirations. Talent remained invisible, with direct impact on engagement and retention.",
        },
        {
          icon: TrendingUp,
          title: 'High turnover and in-store advisory at risk',
          text: "With 25\u201335% turnover and the growing complexity of beauty products \u2014 scientific skincare, niche fragrances, clean beauty \u2014 retaining and developing internal talent is a non-negotiable strategic asset.",
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: 'Competency analysis: necessary but unsustainable',
          text: "With 2,500 people distributed across the territory, in-person observation meant long timelines, high costs and inconsistent results.",
        },
        {
          icon: Layers,
          title: 'Development reserved for only 5\u201310% of the workforce',
          text: "There was no capability to offer growth opportunities at scale \u2014 only to the few already identified.",
        },
        {
          icon: BarChart3,
          title: 'No structured feedback to employees',
          text: "The absence of objective feedback left development initiatives entirely in the hands of each individual manager.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Eye, text: "Map the competencies of the entire retail network objectively and immediately: a standardised assessment across all roles (Beauty Advisor, Sales Assistant, Store Manager) and all seniority levels." },
        { icon: Zap, text: "Optimise the time and cost of internal competency analysis: make it sustainable given turnover rates and the pace of the labour market, replacing in-person observation with a scalable system." },
        { icon: TrendingUp, text: "Promote internal career paths and reduce turnover: identify high-potential people and propensities for different roles to facilitate horizontal and vertical internal moves, reducing the need for external hiring." },
        { icon: Target, text: "Work proactively on training and development: build a shared competency database to activate customised learning paths that close existing skill gaps and plan workforce development." },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "The Skillvue People Science team worked to align the assessments built on the platform with the company\u2019s leadership model, creating evaluations grounded in the real working situations of store employees.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Wrench, label: 'Industry-specific Hard Skills' },
        { icon: Heart, label: 'Key Soft Skills for sales' },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'Quantitative and qualitative outcomes of the Skillvue x Douglas project.',
      metrics: [
        { value: '88%', label: 'Completion rate' },
        { value: '5 weeks', label: 'Mapping timeframe' },
        { value: 'Only 3', label: 'People in the HR team' },
      ],
      qualitative: [
        { icon: Eye, title: 'Skills finally visible', text: "For the first time, a clear and comparable view of the competencies of every person across the retail network \u2014 a picture directly actionable for decisions on growth, mobility and training." },
        { icon: Target, title: 'Hidden talent and predictive potential', text: "The analysis identified predictive propensities for different roles, facilitating horizontal and vertical internal moves and revealing talent where no visibility previously existed." },
        { icon: CheckCircle, title: 'Customised training and skill gaps closed', text: "With the collected data, customised training paths were activated to close existing gaps and define internal redeployments more quickly. A key lever for optimising costs and performance." },
        { icon: Zap, title: 'Time and cost optimisation', text: "Analysis timelines optimised and the burden on managers reduced, freeing resources for higher-value development activities." },
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'unicomm', company: 'Unicomm', tag: 'GDO Retail · Internal Development', headline: 'How Unicomm is building a new talent management system across a network of 270 stores and growing' },
        { id: 'carrefour', company: 'Carrefour', tag: 'GDO Retail · Hiring at Scale', headline: 'Carrefour: how to protect margins across 1,200 stores by optimising the key hiring KPI' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function DouglasStoryPage() {
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
            <img src="/logos/douglas-background-explore-stories.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Douglas</span>
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
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-white">
                      <img src="/logos/douglas-logo.png" alt="Douglas logo" className="w-full h-full object-contain " />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Douglas</p>
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
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12">{c.solution.intro}</p>

              <div className="mb-12">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.skillsLabel}</span>
                <div className="flex flex-wrap gap-3">
                  {c.solution.skills.map((s) => (
                    <div key={s.label} className="inline-flex items-center gap-3 px-5 py-4 rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
                      <s.icon className="h-5 w-5 shrink-0" style={{ color: '#4b4df7' }} />
                      <span className="text-[14px] font-semibold text-[#1A1A2E]/70">{s.label}</span>
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
                  {/* 88% — circular ring */}
                  <div className="text-center flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-5">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#4b4df7" strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40 * 0.88} ${2 * Math.PI * 40}`} />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[0].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[0].label}</span>
                  </div>
                  {/* 5 weeks — 5 vertical bars */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-end justify-center gap-2">
                      {[1,1,1,1,1].map((_, i) => (
                        <div key={i} className="rounded-sm bg-[#4b4df7]" style={{ width: 10, height: `${50 + i * 6}%`, opacity: 0.5 + i * 0.12 }} />
                      ))}
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[1].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[1].label}</span>
                  </div>
                  {/* Only 3 — 3 people silhouettes */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-center justify-center">
                      <svg viewBox="0 0 64 48" className="w-20 h-16" fill="none">
                        <circle cx="12" cy="14" r="7" fill="#4b4df7" opacity="0.5" />
                        <path d="M0 38c0-6.627 5.373-10 12-10s12 3.373 12 10" stroke="#4b4df7" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                        <circle cx="32" cy="12" r="8" fill="#4b4df7" />
                        <path d="M18 38c0-7.732 6.268-12 14-12s14 4.268 14 12" stroke="#4b4df7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        <circle cx="52" cy="14" r="7" fill="#4b4df7" opacity="0.5" />
                        <path d="M40 38c0-6.627 5.373-10 12-10s12 3.373 12 10" stroke="#4b4df7" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[2].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[2].label}</span>
                  </div>
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
