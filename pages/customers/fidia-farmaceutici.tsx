// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, Heart, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
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
      before: 'Fidia Farmaceutici: ',
      highlight1: 'come fotografare su scala globale',
      middle: ' le reali competenze della rete vendita per ',
      highlight2: 'supportare la crescita',
      after: '',
    },
    subtitle: "Con Skillvue, Fidia sta trasformando la propria infrastruttura HR in un sistema di talent intelligence globale, capace di mappare le competenze di centinaia di Medical Sales Representative in 12 lingue e tradurle in piani di sviluppo e decisioni di talent management basate sui dati.",
    heroMetrics: [
      { value: '1.700', label: 'dipendenti' },
      { value: '12', label: 'Paesi' },
      { value: '400+', label: 'dipendenti già inclusi in assessment' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Farmaceutico' },
        { label: 'Fatturato', value: '>500M€' },
        { label: 'Dipendenti', value: '1.700' },
        { label: 'Paesi', value: '120' },
        { label: 'Use Case', value: 'Learning & Development' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: "Un leader mondiale dell'innovazione farmaceutica con una rete vendita da conoscere a fondo",
      paragraph: <>
        Fidia Farmaceutici è la multinazionale italiana che si distingue a livello mondiale per la qualità dei suoi <strong className="text-[#121212]/80 font-semibold">prodotti a base di acido ialuronico</strong>, realizzati <strong className="text-[#121212]/80 font-semibold">al 100% in Italia</strong>. Fondata ad Abano Terme, ha costruito <strong className="text-[#121212]/80 font-semibold">fin dagli anni '50</strong> una posizione unica in questo campo, diventando una <strong className="text-[#121212]/80 font-semibold">"fully integrated company"</strong> che si occupa di ogni fase di vita del prodotto, dalla ricerca alla commercializzazione, e arrivando a produrre <strong className="text-[#121212]/80 font-semibold">oltre 1.500 brevetti globali</strong>.<br /><br />
        La sua rete commerciale è altrettanto articolata: è infatti composta da centinaia di <strong className="text-[#121212]/80 font-semibold">Medical Sales Representative</strong> distribuiti non solo al di fuori dei confini nazionali, in <strong className="text-[#121212]/80 font-semibold">Europa</strong>, ma anche in <strong className="text-[#121212]/80 font-semibold">USA e Medio Oriente</strong>. Questi professionisti sono il punto di contatto tra la scienza di Fidia e l'utenza finale, e in un momento di <strong className="text-[#121212]/80 font-semibold">forte crescita ed espansione internazionale</strong> dell'organizzazione, conoscerne le competenze in modo strutturato diventava sempre più un <strong className="text-[#121212]/80 font-semibold">prerequisito strategico</strong> per poter direzionare al meglio le evoluzioni del modello commerciale.
      </>,
      summary: '',
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'La transizione commerciale doveva andare di pari passo con una trasformazione in ottica skills-based',
      intro: "Fidia partiva da una realtà comune a molte multinazionali: una rete vendita capace e distribuita, ma valutata per forza di cose in modo frammentato, e molto complicata da gestire nel momento in cui erano necessari aggiornamenti radicali nel modello di vendita. Serviva uno shift nell'approccio alla gestione delle competenze, che permettesse di creare una base dati utile a prendere decisioni di talent management su scala globale.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: "Lo sviluppo della rete richiedeva più dati",
          text: "Accompagnare la rete verso una crescita delle proprie capacità, cruciali per un aggiornamento del modello commerciale, richiedeva dati strutturati sulle competenze reali di ogni professionista.",
        },
        {
          icon: Layers,
          title: 'Mancava un sistema di gestione cross-country',
          text: "Valutare una rete in 12 lingue senza distorsioni richiedeva più di strumenti condivisi. Bisognava garantire la stessa qualità di misurazione in ogni mercato, con criteri uniformi e risultati confrontabili.",
        },
        {
          icon: Shield,
          title: "Serviva un'infrastruttura scalabile",
          text: "Era importante instaurare un sistema di misurazione e valorizzazione del capitale umano replicabile su ruoli e regioni diverse, senza dover ripartire da zero ogni volta.",
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: 'Le skill andavano misurate con oggettività',
          text: "In una realtà delle dimensioni di Fidia era fondamentale sfruttare la tecnologia per raggiungere ogni persona con uguale rigore. Servivano dati strutturati, confrontabili e scalabili su tutta la rete.",
        },
        {
          icon: Target,
          title: "La predittività era diventata centrale",
          text: "Riconoscere i profili ad alto potenziale non poteva dipendere dai singoli responsabili. Servivano modelli psicometrici avanzati per predire con accuratezza le future performance di ciascuna persona.",
        },
        {
          icon: CheckCircle,
          title: 'Valutazione e formazione andavano integrate',
          text: "I risultati dell'assessment dovevano alimentare i sistemi di formazione interni. Ogni gap andava tradotto in un'azione formativa concreta, misurabile e allineata alle priorità di sviluppo.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Gli obiettivi della collaborazione',
      items: [
        { icon: Eye, text: <><strong className="font-bold text-[#121212]/90">Ottenere</strong> una fotografia oggettiva, standardizzata e confrontabile delle competenze di tutti gli MSR, indipendentemente dal Paese.</> },
        { icon: Target, text: <><strong className="font-bold text-[#121212]/90">Identificare</strong> i profili ad alto potenziale da inserire in percorsi di talent management e mobilità interna.</> },
        { icon: Layers, text: <><strong className="font-bold text-[#121212]/90">Gestire</strong> la complessità dell'assessment multilingue garantendo equità e comparabilità dei risultati senza sacrificare l'autenticità delle risposte.</> },
        { icon: CheckCircle, text: <><strong className="font-bold text-[#121212]/90">Creare</strong> un collegamento diretto tra i risultati dell'assessment e i piani formativi individuali portati avanti da Fidia.</> },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI per la formazione e lo sviluppo, costruito ad hoc sul modello Fidia',
      intro: <>Il team di Fidia e quello di Skillvue hanno lavorato insieme per costruire un sistema di assessment che partisse dal business reale: le situazioni concrete che un MSR Fidia affronta ogni giorno, in ogni mercato.</>,
      solutionObjectives: [],
      skillsLabel: 'COMPETENZE VALUTATE',
      skillsNote: "Il modello è strutturato su tre layer sovrapposti, dal più trasversale al più specifico per ruolo — ancorato al framework VOLA (Vision, Ownership, Leadership, Accountability) già in uso in Fidia.",
      skills: [
        { icon: Users, label: 'Foundation Behavioral Layer', sublabel: 'Layer 1 — Base comportamentale trasversale, framework VOLA' },
        { icon: Shield, label: 'Medical Scientific Competencies', sublabel: 'Layer 2 — Competenze scientifico-mediche per MSR in specialty pharma' },
        { icon: Target, label: 'Sales System Skills', sublabel: 'Layer 3 — Competenze di sistema commerciale su misura Fidia' },
      ],
      multilingualLabel: '',
      multilingualItems: [],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Dove stiamo andando',
      subtitle: 'I risultati attesi del progetto Skillvue × Fidia Farmaceutici.',
      metrics: [],
      qualitative: [
        { icon: Eye, title: 'La prima fotografia oggettiva della rete vendita globale', text: "Per la prima volta, Fidia avrà una visione strutturata e confrontabile delle competenze di tutti i suoi MSR nel mondo — costruita con gli stessi criteri in ogni Paese, indipendentemente dalla lingua o dalla cultura commerciale locale." },
        { icon: Layers, title: 'Competenze MSR finalmente misurabili in 12 lingue', text: "Le competenze comportamentali emergeranno nella lingua più autentica per ogni individuo. Il dato prodotto sarà comparabile su tutta la rete e diventerà input diretto per i piani di sviluppo sui sistemi di formazione interni." },
        { icon: TrendingUp, title: 'Una transizione verso il valore supportata dai dati', text: "L'evoluzione del business e del modello commerciale, per potersi realizzare appieno, richiederà persone con competenze specifiche. Fidia saprà dove lavorare, su chi, e con quali priorità." },
        { icon: CheckCircle, title: 'Sviluppo e formazione finalmente collegati', text: "I gap rilevati dall'assessment dialogheranno direttamente con i sistemi di formazione interni. La connessione tra valutazione e percorso formativo chiuderà un loop che prima restava aperto." },
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Mobilità Interna', headline: "Aeroporti di Roma: come sviluppare un'organizzazione da quasi 5.000 persone ripartendo dal potenziale interno" },
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Financial Services · Hiring', headline: 'Europ Assistance: come riconoscere il potenziale che resiste alla prova del tempo in un business fondato sulla componente umana' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'Fidia Farmaceutici: how to map the ',
      highlight1: 'real competencies of a global sales network',
      middle: '',
      highlight2: '',
      after: ' to drive growth',
    },
    subtitle: "With Skillvue, Fidia is transforming its HR infrastructure into a global talent intelligence system, capable of mapping the competencies of hundreds of Medical Sales Representatives in 12 languages and translating them into development plans and data-driven talent management decisions.",
    heroMetrics: [
      { value: '1,700', label: 'employees' },
      { value: '12', label: 'countries' },
      { value: '400+', label: 'employees already included in assessment' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Pharmaceutical' },
        { label: 'Revenue', value: '>500M€' },
        { label: 'Employees', value: '1,700' },
        { label: 'Countries', value: '120' },
        { label: 'Use Case', value: 'Learning & Development' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: "A world leader in pharmaceutical innovation, with a sales network to understand in depth",
      paragraph: <>
        Fidia Farmaceutici is the Italian multinational that stands out worldwide for the quality of its <strong className="text-[#121212]/80 font-semibold">hyaluronic acid-based products</strong>, manufactured <strong className="text-[#121212]/80 font-semibold">100% in Italy</strong>. Founded in Abano Terme, it has built a unique position in this field <strong className="text-[#121212]/80 font-semibold">since the 1950s</strong>, becoming a <strong className="text-[#121212]/80 font-semibold">"fully integrated company"</strong> that handles every stage of the product lifecycle, from research to commercialisation, producing <strong className="text-[#121212]/80 font-semibold">over 1,500 global patents</strong>.<br /><br />
        Its commercial network is equally extensive: it is made up of hundreds of <strong className="text-[#121212]/80 font-semibold">Medical Sales Representatives</strong> distributed not only beyond national borders, across <strong className="text-[#121212]/80 font-semibold">Europe</strong>, but also in the <strong className="text-[#121212]/80 font-semibold">USA and Middle East</strong>. These professionals are the point of contact between Fidia's science and end users, and in a period of strong growth and international expansion, understanding their competencies in a structured way was becoming an increasingly <strong className="text-[#121212]/80 font-semibold">strategic prerequisite</strong>.
      </>,
      summary: '',
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: "Better evaluation wasn't enough — a tool that simply didn't exist before was needed",
      intro: "Fidia was starting from a reality common to many fast-growing multinationals: a capable, distributed sales network, but one evaluated in a fragmented way, without a shared framework and without the data to make talent management decisions at global scale.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Eye,
          title: 'A network without an objective picture',
          text: "With hundreds of MSRs across 12+ countries, assessments were left to individual area managers — useful, but not comparable across markets and not anchored to a common framework.",
        },
        {
          icon: Target,
          title: 'No data to drive talent management decisions',
          text: "Identifying high-potential profiles for area manager roles or international mobility required a tool that didn't exist. External alternatives were economically unsustainable at this scale.",
        },
        {
          icon: TrendingUp,
          title: 'A transition without an objective baseline',
          text: "The shift towards a value-based, scientifically-driven approach requires specific competencies. Without a shared baseline, building targeted development plans at global scale was impossible.",
        },
      ],
      hrChallenges: [
        {
          icon: Layers,
          title: 'Language as a systematic distortion',
          text: "An English-only assessment for a network speaking 12 languages would have skewed results by language proficiency, not professional competence. The concrete risk was measuring language, not the person.",
        },
        {
          icon: CheckCircle,
          title: 'Development and training not connected',
          text: "Existing assessment results didn't connect with internal training systems, making it impossible to translate competency gaps into coherent individual development paths across the global network.",
        },
        {
          icon: Shield,
          title: 'Fragmented governance, no shared talent view',
          text: "Area managers, Country Managers, HRBPs and central HR all operated on different information bases, with no shared framework or dashboard to read the network's talent.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change',
      items: [
        { icon: Eye, text: "Obtain an objective, standardised and comparable picture of all global MSRs' competencies, applying the same criteria regardless of country." },
        { icon: Target, text: "Identify high-potential profiles for talent management and internal mobility pathways — a scalable alternative to external assessments." },
        { icon: Layers, text: "Manage multilingual complexity (12+ languages), ensuring fairness and comparability of results without sacrificing authenticity of responses." },
        { icon: CheckCircle, text: "Create a direct link between assessment results and individual development plans within internal training systems." },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment for learning and development, built ad hoc on the Fidia model',
      intro: <>The Fidia and Skillvue teams worked together to build an assessment system rooted in real business situations: the concrete scenarios an MSR faces every day, in every market. The result is an <strong className="text-[#121212]/80 font-semibold">asynchronous structured behavioural interview (BEI)</strong> lasting approximately <strong className="text-[#121212]/80 font-semibold">25 minutes</strong>. Audio responses are transcribed and evaluated by <strong className="text-[#121212]/80 font-semibold">Skillvue's AI</strong> against a <strong className="text-[#121212]/80 font-semibold">bespoke competency model</strong>.</>,
      solutionObjectives: [],
      skillsLabel: 'SKILLS ASSESSED',
      skillsNote: "The competency model is structured across three overlapping layers, from the most transversal to the most role-specific — anchored to the VOLA framework (Vision, Ownership, Leadership, Accountability) already in use at Fidia.",
      skills: [
        { icon: Users, label: 'Foundation Behavioral Layer', sublabel: 'Layer 1 — Transversal behavioural foundation, VOLA framework' },
        { icon: Shield, label: 'Medical Scientific Competencies', sublabel: 'Layer 2 — Scientific-medical skills specific to the MSR role in specialty pharma' },
        { icon: Target, label: 'Sales System Skills', sublabel: 'Layer 3 — Fidia-specific commercial system competencies' },
      ],
      multilingualLabel: 'MULTILINGUAL: 12 LANGUAGES',
      multilingualItems: [
        {
          title: 'Respond in your native language, report in English',
          text: "Every participant answers in their own language — Italian, German, Spanish, French, Polish, Czech, Romanian, Bulgarian, Russian, Turkish or Arabic. Responses are translated into English for management reporting.",
        },
        {
          title: 'English as an international readiness signal',
          text: "Every participant may choose to respond in English rather than their native language. Those who do provide a concrete signal of international readiness, which the system records as an additional talent intelligence data point.",
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'The vision and the impact',
      subtitle: 'Expected outcomes of the Skillvue × Fidia Farmaceutici project.',
      metrics: [],
      qualitative: [
        { icon: Eye, title: 'The first objective picture of the global sales network', text: "For the first time, Fidia will have a structured, comparable view of all its MSRs' competencies worldwide — built with the same criteria in every country, regardless of language or local commercial culture." },
        { icon: Layers, title: 'MSR competencies now measurable in 12 languages', text: "Behavioural competencies emerge in the most authentic language for each individual. The data produced is comparable across the entire network and becomes a direct input to development plans within internal training systems." },
        { icon: TrendingUp, title: 'A value-based transition supported by data', text: "The shift from a discount-driven approach to a consultative model based on scientific product value requires specific competencies. Now Fidia knows where to focus, on whom, and with what priorities." },
        { icon: CheckCircle, title: 'Development and training finally connected', text: "The gaps identified by the assessment connect directly with internal training systems. The link between evaluation and development path closes a loop that was previously left open." },
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Internal Mobility', headline: 'Aeroporti di Roma: how to develop an organisation of nearly 5,000 people starting from internal potential' },
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Financial Services · Hiring', headline: 'Europ Assistance: how to recognise the potential that stands the test of time in a business built on human interaction' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function FidiaFarmaceuticiStoryPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const c = lang === 'it' ? content.it : content.en;
  const metaTitle = `${c.headline.before}${c.headline.highlight1}${c.headline.middle || ''}${c.headline.highlight2 || ''}${c.headline.after || ''} | Skillvue`;
  const metaDesc = c.subtitle.length > 160 ? c.subtitle.substring(0, 157) + '...' : c.subtitle;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="robots" content="noindex" />
      </Head>
      <Navbar />
      <main>

        {/* ===== HERO ===== */}
        <section className="relative pt-[80px]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#0E0E0E]" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push(lang === 'it' ? '/clienti' : '/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Fidia Farmaceutici</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-7 flex flex-col">
                <motion.div className="flex flex-col flex-1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase mb-8 block w-fit" style={{ background: 'rgba(75,77,247,0.15)', color: '#7b7df9', border: '1px solid rgba(75,77,247,0.2)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.25 }}>
                    {c.headline.before}<span style={{ color: '#7b7df9' }}>{c.headline.highlight1}</span>{c.headline.middle}{c.headline.highlight2 && <span style={{ color: '#7b7df9' }}>{c.headline.highlight2}</span>}{c.headline.after}
                  </h1>
                  <p className="text-[17px] text-white/[0.60] leading-[1.75] mb-10 max-w-2xl">{c.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => { router.push(lang === 'it' ? '/prenota-incontro' : '/book-meeting'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-300" style={{ background: '#4b4df7' }}>
                      {c.ctaPrimary} <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => document.getElementById('context-section')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white/70 border border-white/[0.15] hover:border-white/[0.25] hover:text-white transition-all duration-300">
                      {c.ctaSecondary} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  {/* Metrics — pinned to bottom */}
                  <div className="mt-auto pt-10 grid grid-cols-3 gap-4">
                    {c.heroMetrics.map(m => (
                      <div key={m.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-6">
                        <span className="block text-white" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[13px] text-white/[0.55] mt-2 block leading-[1.4]">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Client card + video placeholder */}
              <motion.div className="lg:col-span-5 flex flex-col" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.08]">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-white">
                      <img src="/logos/fidia_fixed.png" alt="Fidia Farmaceutici logo" className="w-full h-full object-contain p-1" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Fidia Farmaceutici</p>
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
                {/* Video placeholder */}
                <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] flex-1 min-h-0" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CONTENT SECTIONS ===== */}
        <section id="context-section" className="section-breathe relative py-16 lg:py-20" style={{ background: '#F7F7F7' }}>
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* CONTEXT */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.context.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#121212] leading-[1.4] mb-6">{c.context.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.85] mb-8">{c.context.paragraph}</p>
              {c.context.summary && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.85]">{c.context.summary}</p>}
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.challenge.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#121212] leading-[1.4] mb-4">{c.challenge.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-14">{c.challenge.intro}</p>

              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.challenge.businessLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.challenge.businessChallenges.map((ch) => (
                    <div key={ch.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#121212] mb-3 leading-[1.4]">{ch.title}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{ch.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.challenge.hrLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.challenge.hrChallenges.map((ch) => (
                    <div key={ch.title} className="rounded-2xl border border-[#4b4df7]/[0.1] bg-[#4b4df7]/[0.02] p-7">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.1)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#121212] mb-3 leading-[1.4]">{ch.title}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{ch.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* OBJECTIVES */}
            <Section className="mb-24">
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#121212] leading-[1.4] mb-10">{c.objectives.title}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {c.objectives.items.map((o, i) => (
                  <div key={i} className="flex items-start gap-5 rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <o.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <p className="text-[15px] text-[#121212]/70 leading-[1.65] pt-1.5">
                      {typeof o.text === 'string' && o.text.includes(':') ? <><strong className="font-bold text-[#121212]/90">{o.text.split(':')[0]}</strong>:{o.text.split(':').slice(1).join(':')}</> : o.text}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* SOLUTION */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.solution.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#121212] leading-[1.4] mb-4">{c.solution.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-10">{c.solution.intro}</p>

              {/* Two parallel objectives */}
              {c.solution.solutionObjectives.length > 0 && (
                <div className="grid md:grid-cols-2 gap-5 mb-12">
                  {c.solution.solutionObjectives.map((obj) => (
                    <div key={obj.number} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-3" style={{ color: '#4b4df7' }}>{obj.number}</span>
                      <h4 className="text-[16px] font-bold text-[#121212] mb-3 leading-[1.4]">{obj.label}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{obj.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Competency layers */}
              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-4 block">{c.solution.skillsLabel}</span>
                {c.solution.skillsNote && <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7] mb-5">{c.solution.skillsNote}</p>}
                <div className="flex flex-col gap-3">
                  {c.solution.skills.map((s) => (
                    <div key={s.label} className="inline-flex items-start gap-4 px-5 py-4 rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
                      <s.icon className="h-5 w-5 shrink-0 mt-0.5" style={{ color: '#4b4df7' }} />
                      <div>
                        <span className="text-[14px] font-semibold text-[#121212]/80 block">{s.label}</span>
                        {s.sublabel && <span className="text-[12px] text-[#121212]/40 mt-0.5 block">{s.sublabel}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multilingual */}
              {c.solution.multilingualLabel && (
                <div className="rounded-2xl border border-[#4b4df7]/[0.1] bg-[#4b4df7]/[0.02] p-7">
                  <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.multilingualLabel}</span>
                  <div className="grid md:grid-cols-2 gap-6">
                    {c.solution.multilingualItems.map((item) => (
                      <div key={item.title}>
                        <h4 className="text-[15px] font-bold text-[#121212] mb-2 leading-[1.4]">{item.title}</h4>
                        <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#121212] leading-[1.4] mb-4">{c.results.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{c.results.subtitle}</p>

              {c.results.metrics.length > 0 && (
                <div className="rounded-2xl bg-[#0E0E0E] p-10 lg:p-14 mb-10">
                  <div className="grid grid-cols-3 gap-10 max-w-2xl mx-auto">
                    {c.results.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[12px] text-white/[0.55] leading-[1.4]">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                {c.results.qualitative.map((q) => (
                  <div key={q.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <q.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <h4 className="text-[15px] font-bold text-[#121212] mb-3 leading-[1.4]">{q.title}</h4>
                    <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{q.text}</p>
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
                <button key={s.id} onClick={() => { router.push(`${lang === 'it' ? '/clienti' : '/customers'}/${s.id}`); window.scrollTo(0, 0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 lg:p-14 transition-all duration-500">
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
