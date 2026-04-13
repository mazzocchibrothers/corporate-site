// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Target, TrendingUp, Layers, Eye, Scale, Zap, Heart, Users, Shield, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { useLanguage } from '@/i18n/LanguageContext';
import Head from 'next/head';

const skills = [
  { icon: Heart, en: 'Customer Orientation', it: 'Orientamento all\'altro' },
  { icon: Users, en: 'Leadership', it: 'Leadership' },
  { icon: Shield, en: 'Resilience', it: 'Resilienza' },
  { icon: Layers, en: 'Organization & Planning', it: 'Organizzazione e Pianificazione' },
  { icon: Zap, en: 'Cognitive Flexibility', it: 'Flessibilità cognitiva' },
  { icon: Target, en: 'Goal Orientation', it: 'Orientamento agli obiettivi' },
];

const businessPains = [
  {
    icon: Target,
    en: { title: 'Expansion held back by Store Manager shortage', desc: 'An active new opening plan, but without qualified, ready, and culturally aligned managerial talent, every new store risks underperforming.' },
    it: { title: 'Espansione frenata dalla mancanza di Store Manager', desc: 'Un piano di nuove aperture attivo, ma senza figure manageriali qualificate, pronte e allineate alla cultura aziendale, ogni nuovo punto vendita rischia di sottoperformare.' },
  },
  {
    icon: TrendingUp,
    en: { title: 'Store performance and return on investment', desc: "Every new opening is a significant investment: without the right Store Manager to lead it, that store doesn't reach its potential. Failing to identify high-value people in time means compromising profitability." },
    it: { title: 'Performance degli store e ritorno sugli investimenti', desc: 'Ogni nuova apertura è un investimento significativo: senza lo Store Manager giusto a presidiarla, quel punto vendita non esprime il suo potenziale. Perdere persone di valore non intercettate in tempo significa compromettere la redditività.' },
  },
  {
    icon: Layers,
    en: { title: 'Dependence on external hiring', desc: "Chasing demand through external recruitment means higher costs, longer onboarding times, and a real risk of cultural mismatch, in a sector where finding experienced profiles is increasingly difficult." },
    it: { title: 'Dipendenza dal mercato esterno', desc: 'Rincorrere il fabbisogno con selezione esterna significa costi più alti, tempi di inserimento più lunghi e un rischio concreto di mismatch culturale, in un settore dove trovare profili formati è sempre più difficile.' },
  },
];

const hrPains = [
  {
    icon: Eye,
    en: { title: 'Invisible talent across the network', desc: 'No objective visibility into the skills of thousands of sales associates distributed across 570+ stores: decisions on potential were based on sales numbers and subjective perceptions.' },
    it: { title: 'Invisibilità del talento in rete', desc: 'Nessuna visibilità oggettiva sulle competenze di migliaia di addetti vendita distribuiti su oltre 570 punti vendita: le decisioni sul potenziale si basavano su numeri di vendita e percezioni soggettive.' },
  },
  {
    icon: Scale,
    en: { title: 'Fragmented and non-comparable evaluations', desc: 'Each store manager assessed with their own criteria, each area operated with different standards: two people with the same potential could have completely different career paths — not based on merit, but on geographic luck.' },
    it: { title: 'Valutazioni frammentate e non confrontabili', desc: 'Ogni manager di negozio valutava con criteri propri, ogni area funzionava con logiche diverse: due persone con lo stesso potenziale potevano avere percorsi completamente diversi, non per merito ma per fortuna geografica.' },
  },
  {
    icon: Zap,
    en: { title: 'Reactive, not predictive talent management', desc: 'Without structured visibility on internal potential, every key position to fill turned into an external recruitment process. A double cost: time and investment to recruit, plus the risk of losing unrecognized talent already in the company.' },
    it: { title: 'Gestione reattiva del talento, non predittiva', desc: 'Senza visibilità strutturata sul potenziale interno, ogni posizione chiave da coprire si trasformava in un processo di selezione esterna. Un doppio costo: tempi e investimenti per reclutare, più il rischio di perdere talenti già in azienda non valorizzati.' },
  },
];

const objectives = [
  {
    icon: Eye,
    en: 'Gain a shared, objective reading of potential across the entire network: same criteria, same language, regardless of territory or individual manager',
    it: 'Ottenere una lettura comune e oggettiva del potenziale su tutta la rete: stessi criteri, stesso linguaggio, indipendentemente dal territorio o dal singolo responsabile',
  },
  {
    icon: Users,
    en: 'Build an internal pipeline of ready Store Managers: to support the opening plan without depending on an increasingly competitive and costly external market',
    it: 'Costruire una pipeline interna di Store Manager pronti: per sostenere il piano di aperture senza dipendere da un mercato esterno sempre più competitivo e costoso',
  },
  {
    icon: TrendingUp,
    en: 'Maximize store performance and return on investment in new openings: ensuring every store is led by a qualified, culturally aligned Store Manager',
    it: 'Massimizzare la performance dei punti vendita e il ritorno sugli investimenti in nuove aperture: garantendo che ogni store sia presidiato da uno Store Manager qualificato e allineato alla cultura aziendale',
  },
  {
    icon: Target,
    en: 'Anticipate key role needs months in advance: moving from an emergency-driven logic to a predictive talent planning capability',
    it: 'Anticipare il fabbisogno di ruoli chiave con mesi di anticipo: passando da una logica emergenziale a una capacità predittiva di pianificazione del talento',
  },
];

const methodologyCards = [
  {
    en: { title: 'Mobile-first assessment', text: '~30 minutes from a smartphone, completed during paid working hours. 1,000 people involved across 570 stores.' },
    it: { title: 'Assessment da mobile', text: '~30 minuti da cellulare, svolto durante l\'orario di lavoro come attività retribuita. 1.000 persone coinvolte su 570 punti vendita.' },
  },
  {
    en: { title: 'Neutral baseline', text: 'Target population selected without prior high-potential nominations: sales associates with 18–48 months of tenure. An objective snapshot of real talent, not a confirmation of existing impressions.' },
    it: { title: 'Base neutra', text: 'Popolazione target scelta senza segnalazioni pregresse di alto potenziale: addetti vendita con 18-48 mesi di anzianità. Una fotografia oggettiva del talento reale, non una conferma delle impressioni esistenti.' },
  },
  {
    en: { title: 'Communication as an engagement lever', text: 'A paid activity, completed during working hours, and positioned as an investment in professional development. Not an exam, but an opportunity — with a direct impact on participation rates and positive perception of the entire project.' },
    it: { title: 'Comunicazione come leva di engagement', text: 'Attività retribuita, svolta in orario di lavoro e posizionata come investimento sullo sviluppo professionale. Non un esame, ma un\'opportunità con un impatto diretto sulla partecipazione e sulla percezione positiva dell\'intero progetto.' },
  },
];

const impactCards = [
  {
    icon: Users,
    en: { title: 'Construction of internal talent pipeline', text: "For the first time, In's has an objective map of potential across the network and can plan openings with the certainty of having qualified talent available." },
    it: { title: 'Costruzione pipeline interna', text: "Per la prima volta, In's dispone di una mappatura oggettiva del potenziale sulla rete e può pianificare le aperture con la certezza di avere figure qualificate disponibili." },
  },
  {
    icon: TrendingUp,
    en: { title: 'From reactive to predictive', text: "People development has been directly linked to the real estate expansion plan: the internal pipeline becomes a business asset that enables growth." },
    it: { title: 'Da logica reattiva a predittiva', text: "Lo sviluppo delle persone è stato collegato direttamente al piano di espansione immobiliare: la pipeline interna diventa un asset di business che abilita la crescita." },
  },
  {
    icon: Heart,
    en: { title: 'Significant cultural impact', text: "Participants who attended in-person sessions returned to their stores sharing the experience, generating a positive ripple effect and a perception of meritocracy." },
    it: { title: 'Impatto culturale significativo', text: "I partecipanti alle giornate in presenza sono tornati nei punti vendita raccontando l'esperienza, generando un effetto di contaminazione positiva e percezione di meritocrazia." },
  },
  {
    icon: Layers,
    en: { title: 'Internal mobility unlocked', text: "The project opened not only vertical opportunities (sales associate → Store Manager) but also lateral moves across divisions, for example into logistics roles at distribution centers." },
    it: { title: 'Mobilità interna facilitata', text: "Il progetto ha aperto opportunità non solo verticali (addetto vendita → Store Manager) ma anche trasversali tra divisioni, ad esempio verso ruoli logistici nei depositi." },
  },
];

const quote = {
  it: {
    text: "Il progetto ha trasformato la gestione del talento da reattiva a predittiva, collegando direttamente la people strategy al piano di espansione: ogni nuova apertura può ora contare su una pipeline interna di figure pronte, invece di rincorrere il fabbisogno sul mercato esterno.",
    author: 'Mirko Tortolano',
    role: 'HR Director — In\'s Mercato',
  },
  en: {
    text: "The project transformed talent management from reactive to predictive, directly linking people strategy to the expansion plan: every new opening can now count on an internal pipeline of ready candidates, rather than chasing demand in the external market.",
    author: 'Mirko Tortolano',
    role: 'HR Director — In\'s Mercato',
  },
};

const visionBullets = {
  en: [
    'Same criteria and skills framework from hiring to development: new hires are assessed from day one with the same logic used to develop them',
    'Assessment via WhatsApp: in grocery retail this isn\'t a convenience choice, it\'s a strategic one. It removes every barrier to access and drives completion rates that other tools can\'t match',
    'Extending assessment to current Store Managers to identify profiles ready for the Area Manager role',
    'Hiring, development, and training integrated into one continuous system. No longer separate processes, but a single talent strategy that works as a business asset',
  ],
  it: [
    'Stessi criteri e stesso framework di competenze dalla selezione allo sviluppo: chi entra viene già valutato con la logica con cui verrà accompagnato domani',
    'Assessment via WhatsApp: nella GDO non è una scelta di comodo, è una scelta strategica. Abbatte ogni barriera di accesso e porta i tassi di completamento a livelli che altri strumenti non raggiungono',
    'Estensione della valutazione agli Store Manager in carica, per identificare i profili pronti al ruolo di Area Manager',
    'Selezione, sviluppo e formazione integrati in un sistema continuo. Non più processi separati, ma un\'unica talent strategy che funziona come asset di business',
  ],
};

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}

export default function InsMercatoStoryPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const l = lang === 'it' ? 'it' : 'en';
  const metaTitle = lang === 'it'
    ? "Come In's Mercato ha costruito una pipeline interna di Store Manager | Skillvue"
    : "How In's Mercato built an internal pipeline of Store Managers | Skillvue";
  const metaDesc = lang === 'it'
    ? "La crescita della rete dipende dalla capacità di avere figure manageriali formate nel momento in cui servono. Con Skillvue, In's ha trasformato la gestione del talento da reattiva a predittiva."
    : "Network growth depends on having trained managerial talent ready when it's needed. With Skillvue, In's Mercato transformed talent management from reactive to predictive.";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
      </Head>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/insmercato-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push(lang === 'it' ? '/clienti' : '/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">
                {lang === 'it' ? 'Clienti' : 'Customers'}
              </button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">In's Mercato</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase mb-8 block w-fit" style={{ background: 'rgba(75,77,247,0.15)', color: '#7b7df9', border: '1px solid rgba(75,77,247,0.2)' }}>
                    CUSTOMER STORY
                  </span>
                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.25 }}>
                    {lang === 'it'
                      ? <>Come In's Mercato ha costruito una <span style={{ color: '#7b7df9' }}>pipeline interna</span> di Store Manager</>
                      : <>How In's Mercato built an <span style={{ color: '#7b7df9' }}>internal pipeline</span> of Store Managers</>
                    }
                  </h1>
                  <p className="text-[17px] text-white/[0.60] leading-[1.75] mb-12 max-w-2xl">
                    {lang === 'it'
                      ? "La crescita della rete dipende dalla capacità di avere figure manageriali formate nel momento in cui servono. Con Skillvue, In's ha trasformato la gestione del talento da reattiva a predittiva."
                      : "Network growth depends on having trained managerial talent ready when it's needed. With Skillvue, In's Mercato transformed talent management from reactive to predictive."
                    }
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => { router.push(lang === 'it' ? '/prenota-incontro' : '/book-meeting'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-300" style={{ background: '#4b4df7' }}>
                      {lang === 'it' ? 'Contattaci' : 'Contact us'} <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => document.getElementById('context-section')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white/70 border border-white/[0.15] hover:border-white/[0.25] hover:text-white transition-all duration-300">
                      {lang === 'it' ? 'Scopri di più' : 'Learn more'} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Client card + video */}
              <motion.div className="lg:col-span-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-6">
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/[0.08]">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                      <img src="/logos/ins-mercato-logo.png" alt="In's Mercato logo" className="w-full h-full object-contain " />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">
                        {lang === 'it' ? 'SCHEDA CLIENTE' : 'CLIENT PROFILE'}
                      </span>
                      <p className="text-[16px] font-bold text-white/90">In's Mercato</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {(lang === 'it' ? [
                      { label: 'Settore', value: 'GDO - Hard Discount' },
                      { label: 'Fatturato', value: '1,5 mld €' },
                      { label: 'Dipendenti', value: '4.200' },
                      { label: 'Punti vendita', value: '+570' },
                      { label: 'Use Case', value: 'Internal Mobility' },
                    ] : [
                      { label: 'Industry', value: 'Large-scale distribution - Hard Discount' },
                      { label: 'Revenue', value: '€1.5B' },
                      { label: 'Employees', value: '4,200+' },
                      { label: 'Stores', value: '570+' },
                      { label: 'Use Case', value: 'Internal Mobility' },
                    ]).map(s => (
                      <div key={s.label}>
                        <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{s.label}</span>
                        <p className="text-[13px] text-white/[0.65] leading-[1.5]">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    className="w-full h-full"
                    src={lang === 'it' ? 'https://www.youtube.com/embed/GE_fLi5IeyU?autoplay=1&mute=1' : 'https://www.youtube.com/embed/nQhV9xScwOg?autoplay=1&mute=1'}
                    title="In's Mercato interview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Content */}
        <section id="context-section" className="section-breathe relative py-16 lg:py-20" style={{ background: '#f8fafc' }}>
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* Context */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{lang === 'it' ? 'CONTESTO' : 'CONTEXT'}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{lang === 'it' ? 'Il contesto del progetto' : 'The Company and The Context'}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-6">
                {lang === 'it'
                  ? <>In's Mercato è una delle principali insegne hard discount italiane, con un fatturato di <strong className="text-[#1A1A2E]/80 font-semibold">1,5 miliardi di euro</strong>, oltre <strong className="text-[#1A1A2E]/80 font-semibold">4.200 dipendenti</strong> e una rete di più di <strong className="text-[#1A1A2E]/80 font-semibold">570 punti vendita</strong>. L'azienda è in una fase di forte <strong className="text-[#1A1A2E]/80 font-semibold">espansione immobiliare</strong>, con un piano di nuove aperture che pone un <strong className="text-[#1A1A2E]/80 font-semibold">vincolo operativo preciso</strong>: senza Store Manager qualificati, pronti e pienamente allineati alla cultura aziendale, i nuovi negozi rischiano di sottoperformare. La crescita della rete dipende direttamente dalla capacità di avere figure manageriali formate nel momento in cui servono.</>
                  : <>In's Mercato is one of Italy's leading hard discount grocery chains, with <strong className="text-[#1A1A2E]/80 font-semibold">€1.5 billion in revenue</strong>, over <strong className="text-[#1A1A2E]/80 font-semibold">4,200 employees</strong>, and a network of more than <strong className="text-[#1A1A2E]/80 font-semibold">570 stores</strong>. The company is in a phase of aggressive <strong className="text-[#1A1A2E]/80 font-semibold">real estate expansion</strong>, with a new store opening plan that creates a clear <strong className="text-[#1A1A2E]/80 font-semibold">operational constraint</strong>: without qualified Store Managers who are ready and fully aligned with the company culture, new stores risk underperforming. Network growth depends directly on having trained managerial talent available when it's needed.</>
                }
              </p>
            </Section>

            {/* Challenge */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{lang === 'it' ? 'LA SFIDA' : 'THE CHALLENGE'}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{lang === 'it' ? 'Il problema strutturale' : 'The Structural Problem'}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-14">
                {lang === 'it'
                  ? "In's Mercato è un'azienda in forte crescita. Con oltre 570 punti vendita e un piano di sviluppo immobiliare attivo, il business aveva un vincolo operativo che precedeva qualsiasi considerazione HR."
                  : "In's Mercato is a fast-growing company. With over 570 stores and an active real estate development plan, the business faced an operational constraint that preceded any HR consideration."
                }
              </p>
              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{lang === 'it' ? 'IMPATTO SUL BUSINESS' : 'BUSINESS IMPACT'}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {businessPains.map(p => (
                    <div key={p.en.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <p.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4]">{p[l].title}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{p[l].desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{lang === 'it' ? 'IMPATTO SU HR & PEOPLE' : 'HR & PEOPLE IMPACT'}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {hrPains.map(p => (
                    <div key={p.en.title} className="rounded-2xl border border-[#4b4df7]/[0.1] bg-[#4b4df7]/[0.02] p-7">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.1)' }}>
                        <p.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4]">{p[l].title}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{p[l].desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Objectives */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{lang === 'it' ? 'OBIETTIVI DI COLLABORAZIONE' : 'COLLABORATION OBJECTIVES'}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-10">{lang === 'it' ? 'Cosa doveva cambiare' : 'What needed to change'}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {objectives.map((o, i) => (
                  <div key={i} className="flex items-start gap-5 rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <o.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <p className="text-[15px] text-[#1A1A2E]/70 leading-[1.65] pt-1.5">
                      {o[l].includes(':') ? <><strong className="font-bold text-[#1A1A2E]/90">{o[l].split(':')[0]}</strong>:{o[l].split(':').slice(1).join(':')}</> : o[l]}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Solution */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{lang === 'it' ? 'LA SOLUZIONE' : 'THE SOLUTION'}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{lang === 'it' ? 'Assessment AI con Skillvue' : 'AI Assessment with Skillvue'}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12">
                {lang === 'it'
                  ? "Skillvue ha abilitato un assessment strutturato, basato sul framework di soft skill che In's aveva già costruito internamente per il profilo di Store Manager."
                  : "Skillvue enabled a structured assessment based on the soft skill framework that In's had already built internally for the Store Manager profile."
                }
              </p>
              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{lang === 'it' ? 'COMPETENZE VALUTATE' : 'SKILLS ASSESSED'}</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skills.map(s => (
                    <div key={s.en} className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <s.icon className="h-4 w-4" style={{ color: '#4b4df7' }} />
                      </div>
                      <span className="text-[13px] text-[#1A1A2E]/70 font-medium">{s[l]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{lang === 'it' ? 'COME È STATO COSTRUITO' : 'HOW IT WAS BUILT'}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {methodologyCards.map((card, i) => (
                    <div key={card.en.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <span className="text-[12px] font-bold" style={{ color: '#4b4df7' }}>{i + 1}</span>
                      </div>
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-2 leading-[1.4]">{card[l].title}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{card[l].text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Results */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{lang === 'it' ? 'RISULTATI' : 'RESULTS'}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">
                {lang === 'it' ? 'Key Metrics & Impatto' : 'Key Metrics & Impact'}
              </h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12">
                {lang === 'it'
                  ? "I risultati quantitativi e qualitativi del progetto Skillvue x In's Mercato."
                  : "Quantitative and qualitative outcomes of the Skillvue x In's Mercato project."
                }
              </p>
              {/* ── DASHBOARD ── */}
              <div className="mb-10 space-y-4">

                {/* Talent Pipeline card */}
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="h-4 w-4" style={{ color: '#4b4df7' }} />
                    <span className="text-[15px] font-bold text-[#1A1A2E]">Talent Pipeline</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_40px_1fr_40px_1fr] gap-3 items-center mb-5">
                    {/* Step 1 */}
                    <div className="rounded-xl p-5" style={{ background: '#f1f5f9' }}>
                      <span className="text-[10px] font-bold tracking-[0.12em] text-[#1A1A2E]/30 block mb-2">STEP 1</span>
                      <span className="block font-black text-[#1A1A2E] leading-none mb-2" style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', letterSpacing: '-0.03em' }}>900</span>
                      <p className="text-[13px] font-semibold text-[#1A1A2E]/70 leading-[1.4]">{lang === 'it' ? 'Assessment AI completati' : 'AI Assessments completed'}</p>
                      <p className="text-[12px] text-[#1A1A2E]/35 mt-1">{lang === 'it' ? 'su ~1.000 collaboratori coinvolti' : 'across ~1,000 employees involved'}</p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full border border-[#e2e8f0] bg-white flex items-center justify-center">
                        <ArrowRight className="h-3 w-3 text-[#1A1A2E]/25" />
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="rounded-xl p-5" style={{ background: 'rgba(75,77,247,0.06)' }}>
                      <span className="text-[10px] font-bold tracking-[0.12em] block mb-2" style={{ color: 'rgba(75,77,247,0.45)' }}>STEP 2</span>
                      <span className="block font-black leading-none mb-2" style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', letterSpacing: '-0.03em', color: '#4b4df7' }}>90</span>
                      <p className="text-[13px] font-semibold text-[#1A1A2E]/70 leading-[1.4]">{lang === 'it' ? 'Top Talent identificati' : 'Top Talent identified'}</p>
                      <p className="text-[12px] text-[#1A1A2E]/35 mt-1">{lang === 'it' ? "Top 10% emerso dall'assessment" : 'Top 10% emerging from assessment'}</p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full border border-[#e2e8f0] bg-white flex items-center justify-center">
                        <ArrowRight className="h-3 w-3 text-[#1A1A2E]/25" />
                      </div>
                    </div>

                    {/* Outcome split */}
                    <div className="space-y-3">
                      <div className="rounded-xl p-4 flex items-start justify-between gap-3" style={{ background: 'rgba(5,150,105,0.07)' }}>
                        <div>
                          <span className="block font-black leading-none mb-1" style={{ fontSize: '1.7rem', color: '#059669', letterSpacing: '-0.02em' }}>47%</span>
                          <p className="text-[13px] font-semibold text-[#1A1A2E]/80">Role-Ready</p>
                          <p className="text-[11px] text-[#1A1A2E]/35 mt-0.5">{lang === 'it' ? '~42 profili pronti al ruolo' : '~42 profiles ready for the role'}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 mt-0.5" style={{ background: 'rgba(5,150,105,0.15)', color: '#059669' }}>
                          ✓ READY
                        </span>
                      </div>
                      <div className="rounded-xl p-4 flex items-start justify-between gap-3" style={{ background: 'rgba(217,119,6,0.07)' }}>
                        <div>
                          <span className="block font-black leading-none mb-1" style={{ fontSize: '1.7rem', color: '#d97706', letterSpacing: '-0.02em' }}>53%</span>
                          <p className="text-[13px] font-semibold text-[#1A1A2E]/80">In Development</p>
                          <p className="text-[11px] text-[#1A1A2E]/35 mt-0.5">{lang === 'it' ? '~48 profili in upskilling' : '~48 profiles in upskilling'}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 mt-0.5" style={{ background: 'rgba(217,119,6,0.15)', color: '#d97706' }}>
                          ↗ GROWING
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footnote */}
                  <p className="text-[11px] text-[#1A1A2E]/30 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    {lang === 'it' ? 'Il 47% e 53% si riferiscono ai 90 Top Talent identificati' : '47% and 53% refer to the 90 Top Talent identified'}
                  </p>
                </div>

                {/* Bottom row: Completion Rate + Funnel */}
                <div className="grid md:grid-cols-2 gap-4">

                  {/* Completion Rate */}
                  <div className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <p className="text-[14px] font-bold text-[#1A1A2E] mb-7">{lang === 'it' ? 'Tasso di completamento' : 'Completion Rate'}</p>
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-32 h-32 mb-5">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(75,77,247,0.1)" strokeWidth="9" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#4b4df7" strokeWidth="9" strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40 * 0.95} ${2 * Math.PI * 40}`} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[1.6rem] font-black text-[#1A1A2E]" style={{ letterSpacing: '-0.03em' }}>95%</span>
                        </div>
                      </div>
                      <p className="text-[13px] text-[#1A1A2E]/50 text-center leading-[1.6]">
                        {lang === 'it' ? 'Completamento al netto delle cause esterne (dimissioni, malattia)' : 'Completion rate net of external causes (resignations, sick leave)'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]" style={{ color: '#059669' }}>
                      <CheckCircle className="h-4 w-4 shrink-0" />
                      <span>{lang === 'it' ? '48 non terminate per cause esterne' : '48 not completed due to external causes'}</span>
                    </div>
                  </div>

                  {/* Selection Funnel */}
                  <div className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <p className="text-[14px] font-bold text-[#1A1A2E] mb-6">{lang === 'it' ? 'Il funnel di selezione' : 'The Selection Funnel'}</p>
                    <div className="space-y-4">
                      {[
                        { labelIt: 'Coinvolti', labelEn: 'Involved', value: '~1000', pct: '100%', color: 'rgba(75,77,247,0.18)' },
                        { labelIt: 'Assessment completati', labelEn: 'Assessments completed', value: '~900', pct: '90%', color: 'rgba(75,77,247,0.3)' },
                        { labelIt: 'Top Talent identificati', labelEn: 'Top Talent identified', value: '~90', pct: '60%', color: 'rgba(75,77,247,0.55)' },
                        { labelIt: 'Role-Ready (47%)', labelEn: 'Role-Ready (47%)', value: '~42', pct: '30%', color: '#4b4df7' },
                        { labelIt: 'In Development (53%)', labelEn: 'In Development (53%)', value: '~48', pct: '34%', color: '#4b4df7' },
                      ].map(item => (
                        <div key={item.labelEn}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[12px] text-[#1A1A2E]/50">{lang === 'it' ? item.labelIt : item.labelEn}</span>
                            <span className="text-[12px] font-semibold text-[#1A1A2E]/65">{item.value}</span>
                          </div>
                          <div className="h-[18px] rounded-full overflow-hidden" style={{ background: 'rgba(75,77,247,0.06)' }}>
                            <div className="h-full rounded-full" style={{ width: item.pct, background: item.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
              {/* ── END DASHBOARD ── */}

              {/* Quote */}
              <div className="rounded-2xl border border-[#4b4df7]/[0.12] bg-gradient-to-br from-[#4b4df7]/[0.04] to-transparent p-8 lg:p-10 mb-10">
                <p className="text-[17px] text-[#1A1A2E]/75 leading-[1.75] italic mb-6">"{quote[l].text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#4b4df7]/[0.15]">
                    <img src="/logos/mirko%20tortolano.png" alt={quote[l].author} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#1A1A2E]/80">{quote[l].author}</p>
                    <p className="text-[12px] text-[#1A1A2E]/40 leading-[1.5]">{quote[l].role}</p>
                  </div>
                </div>
              </div>

              {/* Impact cards */}
              <div className="grid md:grid-cols-2 gap-5">
                {impactCards.map(card => (
                  <div key={card.en.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <card.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4]">{card[l].title}</h4>
                    <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{card[l].text}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Future Vision */}
            <Section>
              <div className="rounded-2xl border border-[#4b4df7]/[0.12] bg-gradient-to-br from-[#4b4df7]/[0.04] to-transparent p-10 lg:p-14">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-6 block w-fit" style={{ background: 'rgba(75,77,247,0.1)', color: '#4b4df7', border: '1px solid rgba(75,77,247,0.2)' }}>
                  {lang === 'it' ? 'EVOLUZIONE 2026' : 'EVOLUTION 2026'}
                </span>
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">
                  {lang === 'it' ? 'Da sviluppo interno a talent strategy integrata' : 'From internal development to integrated talent strategy'}
                </h2>
                <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-8">
                  {lang === 'it'
                    ? "Quando l'assessment sullo sviluppo interno ha iniziato a produrre risultati concreti e scalabili, la scelta naturale è stata estenderlo anche alla selezione esterna, eliminando la discontinuità tra \"chi cerchiamo\" e \"come lo facciamo crescere\"."
                    : "When the internal development assessment began delivering concrete, scalable results, the natural next step was extending it to external hiring — eliminating the gap between \"who we're looking for\" and \"how we develop them.\""
                  }
                </p>
                <div className="rounded-xl border border-[#4b4df7]/[0.15] bg-[#4b4df7]/[0.05] p-6 mb-8 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.12)' }}>
                    <Target className="h-5 w-5" style={{ color: '#4b4df7' }} />
                  </div>
                  <p className="text-[15px] text-[#1A1A2E]/75 leading-[1.7]">
                    {lang === 'it'
                      ? "Costruire un ciclo unico e coerente in cui ogni persona, dal primo giorno, viene valutata, orientata e accompagnata con la stessa logica."
                      : "Build a single, coherent cycle where every person, from day one, is assessed, guided, and developed with the same logic."
                    }
                  </p>
                </div>
                <div className="space-y-4">
                  {visionBullets[l].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <ArrowRight className="h-4 w-4 mt-1 shrink-0" style={{ color: '#4b4df7' }} />
                      <p className="text-[15px] text-[#1A1A2E]/65 leading-[1.65]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Science Note */}
            <Section>
              <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8 lg:p-10">
                <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] tracking-[0.1em] uppercase mb-6 block">{t('The Science Behind It')}</span>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="rounded-xl bg-black/[0.03] p-6 text-center">
                    <span className="block text-[#1A1A2E]/30" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>14%</span>
                    <span className="text-[13px] text-[#1A1A2E]/40 mt-2 block">{t('Unstructured interviews')}<br />{t('predictive accuracy')}</span>
                  </div>
                  <div className="rounded-xl bg-[#4B4DF7]/[0.06] p-6 text-center">
                    <span className="block text-[#1A1A2E]" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}>51%+</span>
                    <span className="text-[13px] text-[#1A1A2E]/[0.65] mt-2 block">{t('Structured skills assessment')}<br />{t('predictive validity')}</span>
                  </div>
                </div>
                <button onClick={() => { router.push('/science'); window.scrollTo(0,0); }} className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#4B4DF7] hover:text-[#3A3BD6] transition-colors duration-300">
                  {t('Discover the Science')} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </Section>

          </div>
        </section>

        <div className="fade-into-dark" />

        {/* Related Stories */}
        <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white/90 leading-[1.4] mb-12">{t('Related Stories')}</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { id: 'carrefour', company: 'Carrefour', tag: 'Large-scale distribution · Hiring at Scale', headline: 'Carrefour: how to protect margins across 1,200 stores by optimising the key hiring KPI' },
                { id: 'subdued', company: 'Subdued', tag: 'Fashion Retail · Hiring', headline: 'Subdued: building a single scalable hiring standard for a network of 130+ stores' },
              ].map(s => (
                <button key={s.id} onClick={() => { router.push(`/customers/${s.id}`); window.scrollTo(0,0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 lg:p-14 transition-all duration-500">
                  <span className="text-[14px] text-white/40 mb-4 block">{t(s.tag)}</span>
                  <h4 className="text-[24px] font-bold text-white/90 mb-4">{s.company}</h4>
                  <p className="text-[16px] text-white/[0.65] leading-[1.7] mb-8">{t(s.headline)}</p>
                  <span className="inline-flex items-center gap-2 text-[15px] text-white/50 group-hover:text-white/80 font-semibold transition-colors duration-300">
                    {t('Read the story')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <SolutionFinalCTA headline={t("Ready to see what Skillvue can do for your")} accentWord={t("organization?")} />
        <Footer />
      </main>
    </>
  );
}
