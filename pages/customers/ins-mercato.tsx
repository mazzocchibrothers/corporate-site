// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { useLanguage } from '@/i18n/LanguageContext';

const heroMetrics = [
  { value: '~1,000', label: { en: 'Employees involved', it: 'Collaboratori coinvolti' } },
  { value: '95%', label: { en: 'Completion rate', it: 'Tasso di completamento' } },
  { value: '~90', label: { en: 'Top Talent identified', it: 'Top Talent identificati' } },
  { value: '47%', label: { en: 'Role-Ready', it: 'Role-Ready' } },
  { value: '6', label: { en: 'Soft skills assessed', it: 'Soft skill valutate' } },
];

const sidebar = [
  { label: { en: 'Industry', it: 'Settore' }, value: { en: 'GDO - Hard Discount', it: 'GDO - Hard Discount' } },
  { label: { en: 'Revenue', it: 'Fatturato' }, value: { en: '€1.5B', it: '1,5 mld €' } },
  { label: { en: 'Employees', it: 'Dipendenti' }, value: { en: '4,200+', it: '4.200' } },
  { label: { en: 'Stores', it: 'Punti vendita' }, value: { en: '570+', it: '+570' } },
  { label: { en: 'Region', it: 'Regione' }, value: { en: 'Italy', it: 'Italia' } },
  { label: { en: 'Use Cases', it: 'Use Cases' }, value: { en: 'Internal Mobility, Succession Planning', it: 'Internal Mobility, Succession Planning' } },
];

const skills = {
  en: ['Customer Orientation', 'Leadership', 'Resilience', 'Organization & Planning', 'Cognitive Flexibility', 'Goal Orientation'],
  it: ['Orientamento all\'altro', 'Leadership', 'Resilienza', 'Organizzazione e Pianificazione', 'Flessibilità cognitiva', 'Orientamento agli obiettivi'],
};

const businessPains = [
  {
    en: { title: 'Expansion held back by Store Manager shortage', desc: 'An active new opening plan, but without qualified, ready, and culturally aligned managerial talent, every new store risks underperforming.' },
    it: { title: 'Espansione frenata dalla mancanza di Store Manager', desc: 'Un piano di nuove aperture attivo, ma senza figure manageriali qualificate, pronte e allineate alla cultura aziendale, ogni nuovo punto vendita rischia di sottoperformare.' },
  },
  {
    en: { title: 'Store performance and return on investment', desc: "Every new opening is a significant investment: without the right Store Manager to lead it, that store doesn't reach its potential. Failing to identify high-value people in time means compromising profitability." },
    it: { title: 'Performance degli store e ritorno sugli investimenti', desc: 'Ogni nuova apertura è un investimento significativo: senza lo Store Manager giusto a presidiarla, quel punto vendita non esprime il suo potenziale. Perdere persone di valore non intercettate in tempo significa compromettere la redditività.' },
  },
  {
    en: { title: 'Dependence on external hiring', desc: "Chasing demand through external recruitment means higher costs, longer onboarding times, and a real risk of cultural mismatch — in a sector where finding experienced profiles is increasingly difficult." },
    it: { title: 'Dipendenza dal mercato esterno', desc: 'Rincorrere il fabbisogno con selezione esterna significa costi più alti, tempi di inserimento più lunghi e un rischio concreto di mismatch culturale, in un settore dove trovare profili formati è sempre più difficile.' },
  },
];

const hrPains = [
  {
    en: { title: 'Invisible talent across the network', desc: 'No objective visibility into the competencies of thousands of sales associates distributed across 570+ stores: decisions on potential were based on sales numbers and subjective perceptions.' },
    it: { title: 'Invisibilità del talento in rete', desc: 'Nessuna visibilità oggettiva sulle competenze di migliaia di addetti vendita distribuiti su oltre 570 punti vendita: le decisioni sul potenziale si basavano su numeri di vendita e percezioni soggettive.' },
  },
  {
    en: { title: 'Fragmented and non-comparable evaluations', desc: 'Each store manager assessed with their own criteria, each area operated with different standards: two people with the same potential could have completely different career paths — not based on merit, but on geographic luck.' },
    it: { title: 'Valutazioni frammentate e non confrontabili', desc: 'Ogni manager di negozio valutava con criteri propri, ogni area funzionava con logiche diverse: due persone con lo stesso potenziale potevano avere percorsi completamente diversi, non per merito ma per fortuna geografica.' },
  },
  {
    en: { title: 'Reactive talent management, not predictive', desc: 'Without structured visibility on internal potential, every key position to fill turned into an external recruitment process. A double cost: time and investment to recruit, plus the risk of losing unrecognized talent already in the company.' },
    it: { title: 'Gestione reattiva del talento, non predittiva', desc: 'Senza visibilità strutturata sul potenziale interno, ogni posizione chiave da coprire si trasformava in un processo di selezione esterna. Un doppio costo: tempi e investimenti per reclutare, più il rischio di perdere talenti già in azienda non valorizzati.' },
  },
];

const objectives = {
  en: [
    'Gain a shared, objective reading of potential across the entire network: same criteria, same language, regardless of territory or individual manager',
    'Build an internal pipeline of ready Store Managers to support the opening plan without depending on an increasingly competitive and costly external market',
    'Maximize store performance and return on investment in new openings, ensuring every store is led by a qualified, culturally aligned Store Manager',
    'Anticipate key role needs months in advance, moving from an emergency-driven logic to a predictive talent planning capability',
  ],
  it: [
    'Ottenere una lettura comune e oggettiva del potenziale su tutta la rete: stessi criteri, stesso linguaggio, indipendentemente dal territorio o dal singolo responsabile',
    'Costruire una pipeline interna di Store Manager pronti, per sostenere il piano di aperture senza dipendere da un mercato esterno sempre più competitivo e costoso',
    'Massimizzare la performance dei punti vendita e il ritorno sugli investimenti in nuove aperture, garantendo che ogni store sia presidiato da uno Store Manager qualificato e allineato alla cultura aziendale',
    'Anticipare il fabbisogno di ruoli chiave con mesi di anticipo, passando da una logica emergenziale a una capacità predittiva di pianificazione del talento',
  ],
};

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

const funnel = [
  { label: { en: 'Involved', it: 'Coinvolti' }, value: '~1,000' },
  { label: { en: 'Assessments completed', it: 'Assessment completati' }, value: '~900' },
  { label: { en: 'Top Talent identified', it: 'Top Talent identificati' }, value: '~90' },
  { label: { en: 'Role-Ready (47%)', it: 'Role-Ready (47%)' }, value: '~42' },
  { label: { en: 'In Development (53%)', it: 'In Development (53%)' }, value: '~48' },
];

const impactCards = [
  {
    en: { title: 'Internal pipeline built', text: "For the first time, In's has an objective map of potential across the network and can plan openings with the certainty of having qualified talent available." },
    it: { title: 'Costruzione pipeline interna', text: "Per la prima volta, In's dispone di una mappatura oggettiva del potenziale sulla rete e può pianificare le aperture con la certezza di avere figure qualificate disponibili." },
  },
  {
    en: { title: 'From reactive to predictive', text: "People development has been directly linked to the real estate expansion plan: the internal pipeline becomes a business asset that enables growth." },
    it: { title: 'Da logica reattiva a predittiva', text: "Lo sviluppo delle persone è stato collegato direttamente al piano di espansione immobiliare: la pipeline interna diventa un asset di business che abilita la crescita." },
  },
  {
    en: { title: 'Significant cultural impact', text: "Participants who attended in-person sessions returned to their stores sharing the experience, generating a positive ripple effect and a perception of meritocracy." },
    it: { title: 'Impatto culturale significativo', text: "I partecipanti alle giornate in presenza sono tornati nei punti vendita raccontando l'esperienza, generando un effetto di contaminazione positiva e percezione di meritocrazia." },
  },
  {
    en: { title: 'Internal mobility unlocked', text: "The project opened not only vertical opportunities (sales associate → Store Manager) but also lateral moves across divisions, for example into logistics roles at distribution centers." },
    it: { title: 'Mobilità interna facilitata', text: "Il progetto ha aperto opportunità non solo verticali (addetto vendita → Store Manager) ma anche trasversali tra divisioni, ad esempio verso ruoli logistici nei depositi." },
  },
];

const visionBullets = {
  en: [
    'Same criteria and competency framework from hiring to development: new hires are assessed from day one with the same logic used to develop them',
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

  return (
    <>
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
              <button onClick={() => { router.push('/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">
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
                      : "Network growth depends on having trained managerial talent ready when it's needed. With Skillvue, In's transformed talent management from reactive to predictive."
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
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white flex items-center justify-center p-1.5">
                      <img src="/logos/insmercato-logo.png" alt="In's Mercato logo" className="w-full h-full object-contain" />
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
                    ] : [
                      { label: 'Industry', value: 'GDO - Hard Discount' },
                      { label: 'Revenue', value: '€1.5B' },
                      { label: 'Employees', value: '4,200+' },
                      { label: 'Stores', value: '570+' },
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

            {/* Hero metrics */}
            <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
              <div className="grid grid-cols-3 gap-5">
                {[
                  { value: '~1,000', label: lang === 'it' ? 'Collaboratori coinvolti' : 'Employees involved' },
                  { value: '95%', label: lang === 'it' ? 'Tasso di completamento' : 'Completion rate' },
                  { value: '~90', label: lang === 'it' ? 'Top Talent identificati' : 'Top Talent identified' },
                ].map(m => (
                  <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-5 text-center">
                    <span className="block text-white" style={{ fontSize: '1.7rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                    <span className="text-[13px] text-white/[0.55] mt-2 block leading-[1.4]">{m.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section id="context-section" className="section-breathe relative py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* Context */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-2">
                {lang === 'it' ? 'Contesto' : 'Context'}
              </h2>
              <p className="text-[14px] font-semibold text-[#1A1A2E]/40 uppercase tracking-[0.08em] mb-6">
                {lang === 'it' ? 'Il contesto del progetto' : 'Project Background'}
              </p>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-6">
                {lang === 'it'
                  ? <>In's Mercato è una delle principali insegne hard discount italiane, con un fatturato di <strong className="text-[#1A1A2E]/80 font-semibold">1,5 miliardi di euro</strong>, oltre <strong className="text-[#1A1A2E]/80 font-semibold">4.200 dipendenti</strong> e una rete di più di <strong className="text-[#1A1A2E]/80 font-semibold">570 punti vendita</strong>. L'azienda è in una fase di forte espansione immobiliare, con un piano di nuove aperture che pone un vincolo operativo preciso: senza Store Manager qualificati, pronti e pienamente allineati alla cultura aziendale, i nuovi negozi rischiano di sottoperformare. La crescita della rete dipende direttamente dalla capacità di avere figure manageriali formate nel momento in cui servono.</>
                  : <>In's Mercato is one of Italy's leading hard discount grocery chains, with <strong className="text-[#1A1A2E]/80 font-semibold">€1.5 billion in revenue</strong>, over <strong className="text-[#1A1A2E]/80 font-semibold">4,200 employees</strong>, and a network of more than <strong className="text-[#1A1A2E]/80 font-semibold">570 stores</strong>. The company is in a phase of aggressive real estate expansion, with a new store opening plan that creates a clear operational constraint: without qualified Store Managers who are ready and fully aligned with the company culture, new stores risk underperforming. Network growth depends directly on having trained managerial talent available when it's needed.</>
                }
              </p>
              <div className="rounded-xl border border-[#4B4DF7]/[0.1] bg-[#4B4DF7]/[0.03] px-8 py-6 max-w-3xl">
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.7] italic">
                  {lang === 'it'
                    ? "Il progetto ha trasformato la gestione del talento da reattiva a predittiva, collegando direttamente la people strategy al piano di espansione: ogni nuova apertura può ora contare su una pipeline interna di figure pronte, invece di rincorrere il fabbisogno sul mercato esterno."
                    : "The project transformed talent management from reactive to predictive, directly linking the people strategy to the expansion plan: every new opening can now count on an internal pipeline of ready talent, instead of chasing demand on the external market."
                  }
                </p>
              </div>
            </Section>

            {/* Challenge */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-2">
                {lang === 'it' ? 'La Sfida' : 'The Challenge'}
              </h2>
              <p className="text-[14px] font-semibold text-[#1A1A2E]/40 uppercase tracking-[0.08em] mb-6">
                {lang === 'it' ? 'Il problema strutturale' : 'The Structural Problem'}
              </p>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-10">
                {lang === 'it'
                  ? "In's Mercato è un'azienda in forte crescita. Con oltre 570 punti vendita e un piano di sviluppo immobiliare attivo, il business aveva un vincolo operativo che precedeva qualsiasi considerazione HR."
                  : "In's Mercato is a fast-growing company. With over 570 stores and an active real estate development plan, the business faced an operational constraint that preceded any HR consideration."
                }
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8">
                  <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-6 block">
                    {lang === 'it' ? 'Business' : 'Business Impact'}
                  </span>
                  <div className="space-y-6">
                    {businessPains.map(p => (
                      <div key={p.en.title}>
                        <h4 className="text-[15px] font-bold text-[#1A1A2E]/70 mb-1">{p[l].title}</h4>
                        <p className="text-[14px] text-[#1A1A2E]/50 leading-[1.6]">{p[l].desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-[#4B4DF7]/[0.15] bg-[#4B4DF7]/[0.03] p-8">
                  <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] tracking-[0.1em] uppercase mb-6 block">HR</span>
                  <div className="space-y-6">
                    {hrPains.map(p => (
                      <div key={p.en.title}>
                        <h4 className="text-[15px] font-bold text-[#1A1A2E]/70 mb-1">{p[l].title}</h4>
                        <p className="text-[14px] text-[#1A1A2E]/[0.65] leading-[1.6]">{p[l].desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Objectives */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-2">
                {lang === 'it' ? 'Obiettivi di Collaborazione' : 'Collaboration Objectives'}
              </h2>
              <p className="text-[14px] font-semibold text-[#1A1A2E]/40 uppercase tracking-[0.08em] mb-8">
                {lang === 'it' ? 'Cosa doveva cambiare' : 'What needed to change'}
              </p>
              <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8 lg:p-10 max-w-3xl">
                <div className="space-y-5">
                  {objectives[l].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#4B4DF7]/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[11px] font-bold text-[#4B4DF7]/70">{i + 1}</span>
                      </div>
                      <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.6]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Solution */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-2">
                {lang === 'it' ? 'La Soluzione' : 'The Solution'}
              </h2>
              <p className="text-[14px] font-semibold text-[#1A1A2E]/40 uppercase tracking-[0.08em] mb-6">
                {lang === 'it' ? 'Assessment AI con Skillvue' : 'AI Assessment with Skillvue'}
              </p>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-10">
                {lang === 'it'
                  ? "Skillvue ha abilitato un assessment strutturato, basato sul framework di soft skill che In's aveva già costruito internamente per il profilo di Store Manager."
                  : "Skillvue enabled a structured assessment based on the soft skill framework that In's had already built internally for the Store Manager profile."
                }
              </p>
              <div className="grid lg:grid-cols-2 gap-10 items-start mb-10">
                <div className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-8">
                  <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.1em] uppercase mb-5 block">
                    {lang === 'it' ? 'Le 6 soft skill valutate' : '6 Soft Skills Assessed'}
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {skills[l].map(s => (
                      <div key={s} className="rounded-lg bg-[#4B4DF7]/[0.04] px-4 py-3">
                        <span className="text-[13px] text-[#1A1A2E]/[0.65] font-medium">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {methodologyCards.map(card => (
                    <div key={card.en.title} className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/50 p-6">
                      <h4 className="text-[14px] font-bold text-[#1A1A2E]/70 mb-2">{card[l].title}</h4>
                      <p className="text-[13px] text-[#1A1A2E]/50 leading-[1.6]">{card[l].text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Results */}
            <Section className="mb-20">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-2">
                {lang === 'it' ? 'Risultati' : 'The Results'}
              </h2>
              <p className="text-[14px] font-semibold text-[#1A1A2E]/40 uppercase tracking-[0.08em] mb-10">
                {lang === 'it' ? 'Key Metrics & Impatto' : 'Key Metrics & Impact'}
              </p>
              <p className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.7] max-w-3xl mb-10">
                {lang === 'it'
                  ? "I risultati quantitativi e qualitativi del progetto Skillvue x In's Mercato."
                  : "Quantitative and qualitative outcomes of the Skillvue x In's Mercato project."
                }
              </p>
              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                {/* Funnel */}
                <div className="grid grid-cols-5 gap-3 mb-10">
                  {funnel.map((f, i) => (
                    <motion.div
                      key={f.label.en}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-5 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <span className="block text-white font-bold mb-2" style={{ fontSize: '1.5rem', letterSpacing: '-0.03em' }}>{f.value}</span>
                      <span className="text-[11px] text-white/40 leading-tight block">{f.label[l]}</span>
                    </motion.div>
                  ))}
                </div>
                {/* Role split */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-6 text-center">
                    <span className="block text-white" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>47%</span>
                    <span className="text-[13px] text-white/[0.55] mt-2 block">
                      Role-Ready <span className="text-white/30">(~42 {lang === 'it' ? 'profili' : 'profiles'})</span>
                    </span>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-6 text-center">
                    <span className="block text-white" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>53%</span>
                    <span className="text-[13px] text-white/[0.55] mt-2 block">
                      In Development <span className="text-white/30">(~48 {lang === 'it' ? 'profili' : 'profiles'})</span>
                    </span>
                  </div>
                </div>
                <p className="text-[12px] text-white/20 mt-4 text-center">
                  {lang === 'it'
                    ? 'Completamento al netto delle cause esterne (dimissioni, malattia). 48 non terminate per cause esterne.'
                    : 'Completion rate net of external causes (resignations, sick leave). 48 not completed due to external causes.'
                  }
                </p>
              </div>

              {/* Impact cards */}
              <div className="grid md:grid-cols-2 gap-5">
                {impactCards.map(card => (
                  <div key={card.en.title} className="rounded-xl border border-[#4B4DF7]/[0.08] bg-white/60 p-6">
                    <h4 className="text-[15px] font-bold text-[#1A1A2E]/70 mb-2">{card[l].title}</h4>
                    <p className="text-[14px] text-[#1A1A2E]/50 leading-[1.6]">{card[l].text}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Future Vision */}
            <Section className="mb-20">
              <div className="rounded-2xl border border-[#4B4DF7]/[0.1] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-10 lg:p-14">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-6 block w-fit" style={{ background: 'rgba(75,77,247,0.08)', color: '#4b4df7', border: '1px solid rgba(75,77,247,0.15)' }}>
                  {lang === 'it' ? 'EVOLUZIONE 2026' : 'EVOLUTION 2026'}
                </span>
                <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold text-[#1A1A2E] mb-4 leading-[1.2]">
                  {lang === 'it' ? 'Da sviluppo interno a talent strategy integrata' : 'From internal development to integrated talent strategy'}
                </h2>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.7] mb-4 max-w-2xl">
                  {lang === 'it'
                    ? "Quando l'assessment sullo sviluppo interno ha iniziato a produrre risultati concreti e scalabili, la scelta naturale è stata estenderlo anche alla selezione esterna, eliminando la discontinuità tra \"chi cerchiamo\" e \"come lo facciamo crescere\"."
                    : "When the internal development assessment began delivering concrete, scalable results, the natural next step was extending it to external hiring — eliminating the gap between \"who we're looking for\" and \"how we develop them.\""
                  }
                </p>
                <p className="text-[14px] font-semibold text-[#1A1A2E]/40 uppercase tracking-[0.08em] mb-6">
                  {lang === 'it' ? 'Obiettivo strategico' : 'Strategic Goal'}
                </p>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.7] mb-6 max-w-2xl">
                  {lang === 'it'
                    ? "Costruire un ciclo unico e coerente in cui ogni persona, dal primo giorno, viene valutata, orientata e accompagnata con la stessa logica."
                    : "Build a single, coherent cycle where every person, from day one, is assessed, guided, and developed with the same logic."
                  }
                </p>
                <div className="space-y-4">
                  {visionBullets[l].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4B4DF7]/40 mt-2 shrink-0" />
                      <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.6]">{item}</p>
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
                    <span className="text-[13px] text-[#1A1A2E]/[0.65] mt-2 block">{t('Structured competency assessment')}<br />{t('predictive validity')}</span>
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
                { id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring', headline: '35% fewer days to hire. 30% better hires.' },
                { id: 'subdued', company: 'Subdued', tag: 'Fashion Retail · Hiring', headline: 'Winning Gen Z Talent Without Drowning in Interviews.' },
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
