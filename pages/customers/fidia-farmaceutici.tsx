// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, Heart, CheckCircle } from 'lucide-react';
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
      before: 'Fidia Farmaceutici: come fotografare su scala globale le ',
      highlight1: 'reali competenze della rete vendita',
      middle: ' per supportare la ',
      highlight2: 'crescita futura',
      after: '',
    },
    subtitle: "Con Skillvue, Fidia sta trasformando la propria infrastruttura HR in un sistema di talent intelligence globale, capace di mappare le competenze di centinaia di Medical Representative e tradurle in piani di sviluppo e decisioni di talent management basate sui dati.",
    heroMetrics: [
      { value: '1.700', label: 'dipendenti' },
      { value: '120+', label: 'Paesi' },
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
        { label: 'Paesi', value: '120+' },
        { label: 'Filiali', value: '17' },
        { label: 'Use Case', value: 'Learning & Development' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: "Un leader mondiale dell'innovazione farmaceutica con una rete vendita da conoscere a fondo",
      paragraph: <>
        Fidia Farmaceutici è un&apos;azienda italiana con <strong className="text-[#121212]/80 font-semibold">80 anni di competenza scientifica</strong>, leader mondiale nella ricerca, sviluppo, produzione e commercializzazione di prodotti innovativi a base di <strong className="text-[#121212]/80 font-semibold">acido ialuronico e suoi derivati</strong> (<strong className="text-[#121212]/80 font-semibold">1.250+ brevetti</strong>) in aree strategiche quali joint care, skin care, eye care, specialty care e health&amp;wellness care. Fidia distribuisce i propri prodotti in <strong className="text-[#121212]/80 font-semibold">120+ paesi nel mondo</strong>, grazie a un consolidato network di partner e distributori e filiali commerciali in mercati strategici.<br /><br />
        La sua rete commerciale è altrettanto articolata: è infatti composta da centinaia di <strong className="text-[#121212]/80 font-semibold">Medical Representative</strong> distribuiti non solo al di fuori dei confini nazionali, in <strong className="text-[#121212]/80 font-semibold">Europa</strong>, ma anche in <strong className="text-[#121212]/80 font-semibold">USA e Medio Oriente</strong>. Questi professionisti sono il punto di contatto tra la scienza di Fidia e l'utenza finale, e in un momento caratterizzato da una parte dalla <strong className="text-[#121212]/80 font-semibold">forte crescita ed espansione internazionale</strong> dell'organizzazione e dall'altra dall'<strong className="text-[#121212]/80 font-semibold">evoluzione delle competenze</strong> richieste dal mercato del lavoro, conoscerne le capacità in modo strutturato diventava sempre più un <strong className="text-[#121212]/80 font-semibold">prerequisito strategico</strong> per poter direzionare al meglio le evoluzioni del modello commerciale.
      </>,
      summary: '',
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'La transizione commerciale doveva andare di pari passo con una trasformazione in ottica skills-based',
      intro: "Fidia partiva da una realtà comune a molte multinazionali: una rete vendita capace e distribuita, ma valutata per forza di cose in modo frammentato, e molto complicata da gestire nel momento in cui erano necessari aggiornamenti radicali nel modello di vendita. Serviva uno shift nell'approccio alla gestione delle competenze, che permettesse di creare una base dati utile a prendere decisioni di talent management strategiche per il futuro su scala globale.",
      businessLabel: 'BUSINESS CHALLENGES',
      hrLabel: 'HR & PEOPLE CHALLENGES',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: "Lo sviluppo della rete richiedeva più dati",
          text: "Accompagnare la rete verso una reale crescita personale, cruciale per l'evoluzione del modello commerciale e per l'employability futura, richiedeva dati strutturati sulle competenze reali di ogni professionista.",
        },
        {
          icon: Layers,
          title: 'Mancava un sistema di gestione cross-country',
          text: "Valutare senza distorsioni una rete multilingue può essere complesso. Bisognava garantire la stessa qualità di misurazione in ogni mercato, con criteri uniformi e risultati confrontabili.",
        },
        {
          icon: Shield,
          title: "Serviva un'infrastruttura scalabile",
          text: "Serviva un sistema di valutazione replicabile su ruoli e regioni diverse, per porre le basi per un'estensione del progetto a tutta la popolazione di Fidia e ad altre fasi del talent lifecycle, senza dover ripartire da zero.",
        },
      ],
      hrChallenges: [
        {
          icon: Target,
          title: 'La retention andava ottimizzata',
          text: "Servivano modelli psicometrici avanzati per riconoscere i profili ad alto potenziale, predire con accuratezza e oggettività i loro need futuri e garantirne una reale crescita all'interno dell'azienda.",
        },
        {
          icon: CheckCircle,
          title: 'Valutazione e formazione andavano integrate',
          text: "I risultati dell'assessment dovevano alimentare i sistemi di formazione interni. Ogni gap andava tradotto in un'azione formativa concreta, misurabile e allineata alle priorità di sviluppo.",
        },
        {
          icon: Zap,
          title: "Bisognava lavorare d'anticipo sul mercato",
          text: "La funzione HR doveva lavorare proattivamente per prepararsi alle trasformazioni in corso nel mercato del lavoro, assicurando che l'organizzazione disponesse di tutte le competenze necessarie allo sviluppo futuro.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Gli obiettivi della collaborazione',
      items: [
        { icon: Eye, text: <><strong className="font-bold text-[#121212]/90">Ottenere</strong> una fotografia oggettiva, standardizzata e confrontabile delle competenze di tutti i MR, indipendentemente dal Paese.</> },
        { icon: Target, text: <><strong className="font-bold text-[#121212]/90">Identificare</strong> i profili ad alto potenziale da inserire in percorsi di crescita e sviluppo.</> },
        { icon: Layers, text: <><strong className="font-bold text-[#121212]/90">Gestire</strong> la complessità dell'assessment multilingue garantendo equità e comparabilità dei risultati senza sacrificare l'autenticità delle risposte.</> },
        { icon: CheckCircle, text: <><strong className="font-bold text-[#121212]/90">Creare</strong> un collegamento diretto tra i risultati dell'assessment e i piani formativi individuali portati avanti da Fidia.</> },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI costruito ad hoc sul modello Fidia',
      intro: <>Il team di Fidia e quello di Skillvue hanno lavorato insieme per costruire un sistema di assessment che partisse dal business reale: le situazioni concrete che un MR Fidia affronta ogni giorno, in ogni mercato.</>,
      solutionObjectives: [],
      skillsLabel: 'COMPETENZE VALUTATE',
      skillsNote: "Il modello è strutturato su tre layer sovrapposti, dal più trasversale al più specifico per ruolo, ancorato al framework VOLA (Vision, Ownership, Leadership, Accountability) già in uso in Fidia.",
      skills: [
        { icon: Users, label: 'Foundation Behavioral Layer', sublabel: 'Layer 1 — Base comportamentale trasversale, framework VOLA' },
        { icon: Shield, label: 'Medical Scientific Skills', sublabel: 'Layer 2 — Competenze scientifico-mediche per MR in specialty pharma' },
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
        { icon: Eye, title: 'La prima fotografia oggettiva della rete vendita globale in 12 lingue', text: "Per la prima volta, Fidia avrà una visione strutturata e confrontabile delle competenze di tutti i suoi MR nel mondo — costruita con gli stessi criteri in ogni Paese, indipendentemente dalla lingua o dalla cultura commerciale locale." },
        { icon: TrendingUp, title: 'Una transizione supportata dai dati', text: "Fidia saprà su quali figure lavorare, con quali percorsi e con quali priorità per assicurare che l'evoluzione del business e del modello commerciale siano supportate dalla presenza in azienda dei migliori professionisti." },
        { icon: CheckCircle, title: 'Sviluppo e formazione finalmente collegati', text: "I gap rilevati dall'assessment dialogheranno direttamente con i sistemi di formazione interni. La connessione tra valutazione e percorso formativo chiuderà un loop che prima restava aperto." },
        { icon: Layers, title: 'Preparazione al futuro, per le persone e per l\'azienda', text: "Il lavoro avviato costruirà le basi per l'impostazione di un modello di sviluppo costante del talento, orientato a garantire una piena realizzazione di ogni persona, maggiore employability e maggiore responsività alle trasformazioni del mercato." },
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
      highlight1: 'real skills of the sales network',
      middle: ' to drive ',
      highlight2: 'future growth',
      after: '',
    },
    subtitle: "With Skillvue, Fidia is transforming its HR infrastructure into a global talent intelligence system, capable of mapping the skills of hundreds of Medical Representatives in 12 languages and translating them into development plans and data-driven talent management decisions.",
    heroMetrics: [
      { value: '1,700', label: 'employees' },
      { value: '120+', label: 'countries' },
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
        { label: 'Countries', value: '120+' },
        { label: 'Subsidiaries', value: '17' },
        { label: 'Use Case', value: 'Learning & Development' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: "A world leader in pharmaceutical innovation, with a sales network to know in depth",
      paragraph: <>
        Italian multinational company with <strong className="text-[#121212]/80 font-semibold">80 years of scientific expertise</strong>, with R&amp;D, manufacturing and sales capabilities, and an extensive product portfolio mainly based on natural and functionalized <strong className="text-[#121212]/80 font-semibold">hyaluronic acid</strong> (<strong className="text-[#121212]/80 font-semibold">1,250+ patents</strong>), in joint care, skin care, eye care, care, specialty care and health&amp;wellness care. With research and development laboratories located in Italy, the company extends its global reach through wholly owned subsidiaries and commercial partners in <strong className="text-[#121212]/80 font-semibold">120+ countries worldwide</strong>.<br /><br />
        Its commercial network is equally extensive: it is made up of hundreds of <strong className="text-[#121212]/80 font-semibold">Medical Representatives</strong> distributed not only beyond national borders, across <strong className="text-[#121212]/80 font-semibold">Europe</strong>, but also in the <strong className="text-[#121212]/80 font-semibold">USA and Middle East</strong>. These professionals are the point of contact between Fidia's science and end users, and in a period characterised on one hand by <strong className="text-[#121212]/80 font-semibold">strong growth and international expansion</strong> and on the other by the <strong className="text-[#121212]/80 font-semibold">evolution of skills</strong> demanded by the labour market, understanding their capabilities in a structured way was becoming an increasingly <strong className="text-[#121212]/80 font-semibold">strategic prerequisite</strong>.
      </>,
      summary: '',
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: "The commercial transition needed to go hand in hand with a skills-based transformation",
      intro: "Fidia was starting from a reality common to many fast-growing multinationals: a capable, distributed sales network, but one evaluated in a fragmented way, very difficult to manage when radical updates to the commercial model were needed. A shift in the approach to skills management was needed — one that could create a data foundation for making strategic, future-focused talent management decisions at global scale.",
      businessLabel: 'BUSINESS CHALLENGES',
      hrLabel: 'HR & PEOPLE CHALLENGES',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: 'Network development required more data',
          text: "Supporting the network towards real personal growth — crucial for the evolution of the commercial model and for future employability — required structured data on each professional's real skills.",
        },
        {
          icon: Layers,
          title: 'There was no cross-country management system',
          text: "Evaluating a multilingual network without bias can be complex. The same measurement quality had to be guaranteed across every market, with uniform criteria and comparable results.",
        },
        {
          icon: Shield,
          title: 'A scalable infrastructure was needed',
          text: "A scalable assessment system, replicable across roles and regions, was needed to lay the foundations for extending the project to Fidia's entire workforce and other phases of the talent lifecycle, without starting from scratch each time.",
        },
      ],
      hrChallenges: [
        {
          icon: Target,
          title: 'Retention needed to be optimised',
          text: "Advanced psychometric models were needed to identify high-potential profiles, predict their future needs with accuracy and objectivity, and ensure their real growth within the organisation.",
        },
        {
          icon: CheckCircle,
          title: 'Assessment and training needed to be connected',
          text: "Assessment results had to feed internal training systems. Every gap needed to be translated into a concrete, measurable development action aligned with the organisation's priorities.",
        },
        {
          icon: Zap,
          title: 'Getting ahead of the market',
          text: "The HR function needed to work proactively to prepare for the ongoing transformations in the labour market, ensuring the organisation already had all the capabilities needed for its future development.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change',
      items: [
        { icon: Eye, text: <><strong className="font-bold text-[#121212]/90">Obtain</strong> an objective, standardised and comparable picture of all global MRs' skills, applying the same criteria regardless of country.</> },
        { icon: Target, text: <><strong className="font-bold text-[#121212]/90">Identify</strong> high-potential profiles to place in growth and development pathways — a scalable alternative to external assessments.</> },
        { icon: Layers, text: <><strong className="font-bold text-[#121212]/90">Manage</strong> multilingual complexity (12+ languages), ensuring fairness and comparability of results without sacrificing authenticity of responses.</> },
        { icon: CheckCircle, text: <><strong className="font-bold text-[#121212]/90">Create</strong> a direct link between assessment results and individual development plans within internal training systems.</> },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment built ad hoc on the Fidia model',
      intro: <>The Fidia and Skillvue teams worked together to build an assessment system rooted in real business situations: the concrete scenarios a Fidia MR faces every day, in every market.</>,
      solutionObjectives: [],
      skillsLabel: 'SKILLS ASSESSED',
      skillsNote: "The skill model is structured across three overlapping layers, from the most transversal to the most role-specific, anchored to the VOLA framework (Vision, Ownership, Leadership, Accountability) already in use at Fidia.",
      skills: [
        { icon: Users, label: 'Foundation Behavioral Layer', sublabel: 'Layer 1 — Transversal behavioural foundation, VOLA framework' },
        { icon: Shield, label: 'Medical Scientific Skills', sublabel: 'Layer 2 — Scientific-medical skills specific to the MR role in specialty pharma' },
        { icon: Target, label: 'Sales System Skills', sublabel: 'Layer 3 — Fidia-specific commercial system skills' },
      ],
      multilingualLabel: '',
      multilingualItems: [],
    },
    results: {
      badge: 'RESULTS',
      title: 'Where we are headed',
      subtitle: 'Expected outcomes of the Skillvue × Fidia Farmaceutici project.',
      metrics: [],
      qualitative: [
        { icon: Eye, title: 'The first objective picture of the global sales network, in 12 languages', text: "For the first time, Fidia will have a structured, comparable view of all its MRs' skills worldwide, built with the same criteria in every country, regardless of language or local commercial culture." },
        { icon: TrendingUp, title: 'A transition supported by data', text: "Fidia will know which profiles to develop, how and with which priority, to ensure that the evolution of the business and commercial model is backed by the right people in the organisation." },
        { icon: CheckCircle, title: 'Development and training finally connected', text: "The gaps identified by the assessment connect directly with internal training systems. The link between evaluation and development path closes a loop that was previously left open." },
        { icon: Layers, title: 'Building for the future both for people and for the organisation', text: "This project will lay the foundations for a continuous talent development model, designed to ensure the full realisation of every person, greater employability and greater responsiveness to labour market transformations." },
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
        <section className="relative pt-[80px] min-h-screen flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/fidia-farmaceutici explore stories.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-10">
            {/* Breadcrumb */}
            <motion.div className="mb-5 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Button variant="tertiary" mode="dark" icon={null} onClick={() => { router.push(lang === 'it' ? '/clienti' : '/customers'); window.scrollTo(0, 0); }}>{c.breadcrumb}</Button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Fidia Farmaceutici</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main content */}
              <div className="lg:col-span-7 flex flex-col">
                <motion.div className="flex flex-col flex-1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium tracking-[0.08em] uppercase mb-4 block w-fit text-white/85 border border-white/15" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[48px] md:text-[44px] font-semibold tracking-[-0.02em] text-white/95 mb-4" style={{ lineHeight: 1.2 }}>
                    {c.headline.before}<span style={{ color: '#7b7df9' }}>{c.headline.highlight1}</span>{c.headline.middle}{c.headline.highlight2 && <span style={{ color: '#7b7df9' }}>{c.headline.highlight2}</span>}{c.headline.after}
                  </h1>
                  <p className="text-[15px] text-white/[0.60] leading-[1.65] mb-6 max-w-2xl">{c.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" mode="dark" onClick={() => { router.push(lang === 'it' ? '/prenota-incontro' : '/book-meeting'); window.scrollTo(0, 0); }}>
                      {c.ctaPrimary}
                    </Button>
                    <Button variant="secondary" mode="dark" onClick={() => document.getElementById('context-section')?.scrollIntoView({ behavior: 'smooth' })}>
                      {c.ctaSecondary}
                    </Button>
                  </div>
                    {/* Metrics — pinned to bottom, aligned with client card */}
                    <div className="mt-auto pt-6 grid grid-cols-3 gap-2 md:gap-4">
                      {c.heroMetrics.map(m => (
                      <div key={m.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-3 md:px-6 md:py-4">
                      <span className="block text-white text-[19px] break-words stat-value md:text-[clamp(1.4rem,2.4vw,1.9rem)]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                      <span className="text-[13px] text-white/[0.55] mt-1.5 block leading-[1.4]">{m.label}</span>
                      </div>
                      ))}
                    </div>
                </motion.div>
              </div>

              {/* Client card + video */}
              <motion.div className="lg:col-span-5 flex flex-col gap-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/[0.08]">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-white">
                      <img src="/logos/fidia_fixed.png" alt="Fidia Farmaceutici logo" className="w-full h-full object-contain p-1" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-0.5">{c.clientCard.label}</span>
                      <p className="text-[16px] font-bold text-white/90">Fidia Farmaceutici</p>
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
                <div className="rounded-2xl border border-white/[0.08] overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    className="w-full h-full"
                    src={lang === 'it' ? 'https://www.youtube.com/embed/f7brVQWvq7k?autoplay=1&mute=1&rel=0&modestbranding=1' : 'https://www.youtube.com/embed/CHtwumG0CjY?autoplay=1&mute=1&rel=0&modestbranding=1'}
                    title="Fidia Farmaceutici interview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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
              {c.context.summary && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.85]">{c.context.summary}</p>}
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
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-10">{c.solution.intro}</p>

              {/* Two parallel objectives */}
              {c.solution.solutionObjectives.length > 0 && (
                <div className="grid md:grid-cols-2 gap-5 mb-12">
                  {c.solution.solutionObjectives.map((obj) => (
                    <div key={obj.number} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-3" style={{ color: '#4b4df7' }}>{obj.number}</span>
                      <h4 className="text-[16px] font-semibold text-[#121212] mb-3 leading-[1.4]">{obj.label}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{obj.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Competency layers */}
              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-4 block">{c.solution.skillsLabel}</span>
                {c.solution.skillsNote && <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7] mb-5">{c.solution.skillsNote}</p>}
                <div className="grid md:grid-cols-3 gap-5">
                  {c.solution.skills.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <s.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{s.label}</h4>
                      {s.sublabel && <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{s.sublabel}</p>}
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
                        <h4 className="text-[15px] font-semibold text-[#121212] mb-2 leading-[1.4]">{item.title}</h4>
                        <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#047857' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{c.results.title}</h2>
              {c.results.subtitle && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{c.results.subtitle}</p>}

              {c.results.metrics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                  {c.results.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border p-8" style={{ background: '#b7f5d8', borderColor: '#93e0bb' }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(6,78,59,0.14)' }}>
                        <TrendingUp className="h-[22px] w-[22px]" style={{ color: '#064e3b' }} />
                      </div>
                      <h4 className="text-[32px] stat-value text-[#0b3b28] mb-3 leading-[1.3]">{m.value}</h4>
                      <p className="text-[15px] text-[#0b3b28]/60 leading-[1.55]">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
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
