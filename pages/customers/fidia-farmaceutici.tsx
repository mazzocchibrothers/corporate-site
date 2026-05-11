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
      before: 'Fidia Farmaceutici: come fotografare su scala globale le ',
      highlight1: 'reali competenze della rete vendita',
      middle: '',
      highlight2: '',
      after: '',
    },
    subtitle: "Con Skillvue, Fidia sta trasformando la propria infrastruttura HR in un sistema di talent intelligence globale, capace di mappare le competenze di centinaia di Medical Sales Representative in 12 lingue e tradurle in piani di sviluppo e decisioni di talent management basate sui dati.",
    heroMetrics: [
      { value: '12+', label: 'lingue di assessment' },
      { value: '120+', label: 'Paesi coperti' },
      { value: '400+', label: 'MSR solo in Italia' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Farmaceutico — Specialty Pharma' },
        { label: 'Fatturato', value: '€538M (FY2025)' },
        { label: 'Dipendenti', value: '1.708' },
        { label: 'Paesi', value: '120+' },
        { label: 'Use Case', value: 'Learning & Development, Internal Mobility' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: "Un leader mondiale dell'innovazione farmaceutica con una rete vendita da conoscere a fondo.",
      paragraph: <>
        Fidia Farmaceutici è la multinazionale italiana <strong className="text-[#121212]/80 font-semibold">leader mondiale nella viscosupplementazione con acido ialuronico</strong>. Fondata ad Abano Terme, ha costruito in oltre sessant'anni di ricerca una posizione unica nella riparazione tissutale e nel trattamento dell'osteoartrosi — con <strong className="text-[#121212]/80 font-semibold">€538 milioni di ricavi nel 2025</strong>, un <strong className="text-[#121212]/80 font-semibold">CAGR dell'11%</strong> nel quinquennio precedente, <strong className="text-[#121212]/80 font-semibold">1.522 brevetti globali</strong> e <strong className="text-[#121212]/80 font-semibold">produzione 100% in Italia</strong> su quattro stabilimenti.<br /><br />
        La sua rete commerciale è altrettanto articolata: centinaia di Medical Sales Representative distribuiti in <strong className="text-[#121212]/80 font-semibold">120+ Paesi</strong>, dall'Italia all'Europa, dagli USA al Medio Oriente, operativi in <strong className="text-[#121212]/80 font-semibold">dodici lingue diverse</strong>. Sono il punto di contatto tra la scienza di Fidia e il medico prescrittore. In un momento di forte espansione internazionale — <strong className="text-[#121212]/80 font-semibold">acquisizioni, approvazione FDA, avanzamento del programma oncologico</strong> — conoscere le competenze di questa rete in modo strutturato è diventato un <strong className="text-[#121212]/80 font-semibold">prerequisito strategico</strong>.
      </>,
      summary: '',
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Non bastava valutare meglio: serviva uno strumento che prima non esisteva.',
      intro: "Fidia partiva da una realtà comune a molte multinazionali in forte crescita: una rete vendita capace e distribuita, ma valutata in modo frammentato, senza un framework condiviso e senza i dati per prendere decisioni di talent management su scala globale.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Eye,
          title: 'Una rete senza fotografia oggettiva',
          text: "Con centinaia di MSR distribuiti in 12+ Paesi, le valutazioni erano affidate ai singoli manager di zona — utili, ma non confrontabili tra mercati diversi e non ancorate a un framework comune.",
        },
        {
          icon: Target,
          title: 'Talent management impossibile senza dati strutturati',
          text: "Identificare i profili ad alto potenziale per ruoli di area manager, mobilità internazionale o crescita interna richiedeva uno strumento che non esisteva. L'alternativa esterna era economicamente insostenibile su questa scala.",
        },
        {
          icon: TrendingUp,
          title: 'Una transizione commerciale da supportare con i dati',
          text: "Il passaggio verso un approccio sempre più orientato al valore scientifico del prodotto richiede rappresentanti con competenze consultive solide. Senza una baseline oggettiva, costruire piani di sviluppo mirati era impossibile.",
        },
      ],
      hrChallenges: [
        {
          icon: Layers,
          title: 'La barriera linguistica come distorsione sistematica',
          text: "Un assessment in inglese su una rete che parla 12 lingue avrebbe prodotto dati falsati dalla competenza linguistica, non dalla competenza professionale. Il rischio era misurare la lingua, non la persona.",
        },
        {
          icon: CheckCircle,
          title: 'Sviluppo e formazione non collegati',
          text: "I risultati delle valutazioni esistenti non dialogavano con la piattaforma formativa Learning Lab, rendendo impossibile tradurre i gap di competenza in percorsi di sviluppo individuali coerenti.",
        },
        {
          icon: Shield,
          title: 'Governance multilivello senza una visione condivisa',
          text: "Manager di zona, Country Manager, HRBP e HR centrale operavano su basi informative diverse, senza un framework condiviso né una dashboard comune per leggere il talento della rete.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare.',
      items: [
        { icon: Eye, text: "Ottenere una fotografia oggettiva, standardizzata e confrontabile delle competenze di tutti gli MSR globali, con gli stessi criteri indipendentemente dal Paese." },
        { icon: Target, text: "Identificare i profili ad alto potenziale da inserire in percorsi di talent management e mobilità interna — alternativa scalabile alle valutazioni esterne." },
        { icon: Layers, text: "Gestire la complessità multilingue (12+ lingue) garantendo equità e comparabilità dei risultati senza sacrificare l'autenticità delle risposte." },
        { icon: CheckCircle, text: "Creare un collegamento diretto tra i risultati dell'assessment e i piani formativi individuali su Fidia Learning Lab." },
        { icon: Zap, text: "Costruire un'infrastruttura scalabile che si estenda, dopo il roll-out MSR, ad altri ruoli e alla funzione Hiring." },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI su due obiettivi in parallelo, costruito sul modello Fidia.',
      intro: <>Skillvue ha lavorato con il team HR di Fidia — guidato da <strong className="text-[#121212]/80 font-semibold">Gianluca Magnani, Corporate HRD</strong> — per costruire un sistema di assessment che partisse dal business reale: le situazioni concrete che un MSR Fidia affronta ogni giorno, in ogni mercato. Il risultato è un'<strong className="text-[#121212]/80 font-semibold">intervista comportamentale strutturata (BEI) asincrona</strong>, da mobile/PC/tablet, di circa <strong className="text-[#121212]/80 font-semibold">25 minuti</strong>. Le risposte audio vengono trascritte e valutate dall'AI di Skillvue su un <strong className="text-[#121212]/80 font-semibold">modello di competenze costruito su misura</strong>.</>,
      solutionObjectives: [
        {
          number: '01',
          label: 'Learning & Development',
          text: "Valutazione delle competenze attuali di ogni MSR come base per piani di sviluppo individuali mirati, collegati alla piattaforma Fidia Learning Lab. Per ogni profilo: dove si è forti, dove c'è spazio di crescita, su cosa lavorare.",
        },
        {
          number: '02',
          label: 'Talent Management',
          text: "Identificazione dei profili ad alto potenziale da considerare per percorsi di crescita interna, ruoli di area e district manager, e mobilità internazionale. Un sistema scalabile che sostituisce i processi di assessment esterni su tutta la rete globale.",
        },
      ],
      skillsLabel: 'COMPETENZE VALUTATE',
      skillsNote: "Il modello è strutturato su tre layer sovrapposti, dal più trasversale al più specifico per ruolo — ancorato al framework VOLA (Vision, Ownership, Leadership, Accountability) già in uso in Fidia.",
      skills: [
        { icon: Users, label: 'Foundation Behavioral Layer', sublabel: 'Layer 1 — Base comportamentale trasversale, framework VOLA' },
        { icon: Shield, label: 'Medical Scientific Competencies', sublabel: 'Layer 2 — Competenze scientifico-mediche per MSR in specialty pharma' },
        { icon: Target, label: 'Sales System Skills', sublabel: 'Layer 3 — Competenze di sistema commerciale su misura Fidia' },
      ],
      multilingualLabel: 'MULTILINGUA: 12 LINGUE',
      multilingualItems: [
        {
          title: 'Risposta nella lingua madre, report in inglese',
          text: "Ogni partecipante risponde nella propria lingua — italiano, tedesco, spagnolo, francese, polacco, ceco, rumeno, bulgaro, russo, turco o arabo. Le risposte vengono tradotte in inglese per il reporting del management.",
        },
        {
          title: "L'inglese come segnale di readiness internazionale",
          text: "Ogni partecipante può scegliere di rispondere in inglese invece che nella propria lingua madre. Chi lo fa fornisce un segnale concreto di international readiness, registrato dal sistema come dato aggiuntivo di talent intelligence.",
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Cosa sta cambiando.',
      subtitle: 'I risultati del progetto Skillvue × Fidia Farmaceutici.',
      metrics: [
        { value: '12+', label: 'lingue di assessment' },
        { value: '120+', label: 'Paesi coperti' },
        { value: '400+', label: 'MSR solo in Italia' },
      ],
      qualitative: [
        { icon: Eye, title: 'La prima fotografia oggettiva della rete vendita globale', text: "Per la prima volta, Fidia avrà una visione strutturata e confrontabile delle competenze di tutti i suoi MSR nel mondo — costruita con gli stessi criteri in ogni Paese, indipendentemente dalla lingua o dalla cultura commerciale locale." },
        { icon: Target, title: 'Talent management scalabile senza dipendere da esterni', text: "I profili ad alto potenziale emergono dai dati, non dal giudizio soggettivo di singoli manager o da costose valutazioni individuali affidate a società esterne. Un sistema che scala con la rete." },
        { icon: Layers, title: 'Competenze MSR finalmente misurabili in 12 lingue', text: "Le competenze comportamentali emergono nella lingua più autentica per ogni individuo. Il dato prodotto è comparabile su tutta la rete e diventa input diretto per i piani di sviluppo su Learning Lab." },
        { icon: TrendingUp, title: 'Una transizione verso il valore supportata dai dati', text: "Il passaggio da un approccio orientato allo sconto a un modello consultivo basato sul valore scientifico del prodotto richiede competenze specifiche. Ora Fidia sa dove lavorare, su chi, e con quali priorità." },
        { icon: CheckCircle, title: 'Sviluppo e formazione finalmente collegati', text: "I gap rilevati dall'assessment dialogano direttamente con Fidia Learning Lab. La connessione tra valutazione e percorso formativo chiude un loop che prima restava aperto." },
        { icon: Zap, title: 'Le fondamenta per una people strategy verso il miliardo', text: "Il mapping MSR è il primo capitolo. Il progetto Hiring e l'espansione ad altri ruoli — Area Manager, KAM, Marketing — costruiranno su questa infrastruttura una people strategy integrata per accompagnare Fidia nella sua crescita globale." },
      ],
    },
    vision: {
      badge: 'PROSSIMI PASSI',
      title: 'Le fondamenta per una people strategy verso il miliardo.',
      intro: <>Il mapping MSR è il primo capitolo. Il <strong className="text-[#121212]/80 font-semibold">progetto Hiring</strong> e l'espansione ad altri ruoli — <strong className="text-[#121212]/80 font-semibold">Area Manager, KAM, Marketing</strong> — costruiranno su questa infrastruttura una <strong className="text-[#121212]/80 font-semibold">people strategy integrata</strong> per accompagnare Fidia nella sua crescita globale. Un sistema pensato per scalare insieme al business, capitolo dopo capitolo.</>,
      nextGen: '',
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
      before: 'Fidia Farmaceutici: how to map, at global scale, the ',
      highlight1: 'real competencies of the sales network',
      middle: '',
      highlight2: '',
      after: '',
    },
    subtitle: "With Skillvue, Fidia is transforming its HR infrastructure into a global talent intelligence system, capable of mapping the competencies of hundreds of Medical Sales Representatives in 12 languages and translating them into development plans and data-driven talent management decisions.",
    heroMetrics: [
      { value: '12+', label: 'assessment languages' },
      { value: '120+', label: 'countries covered' },
      { value: '400+', label: 'MSRs in Italy alone' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Pharmaceutical — Specialty Pharma' },
        { label: 'Revenue', value: '€538M (FY2025)' },
        { label: 'Employees', value: '1,708' },
        { label: 'Countries', value: '120+' },
        { label: 'Use Case', value: 'Learning & Development, Internal Mobility' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: "A world leader in pharmaceutical innovation, with a sales network to understand in depth.",
      paragraph: <>
        Fidia Farmaceutici is the Italian multinational and <strong className="text-[#121212]/80 font-semibold">world leader in viscosupplementation with hyaluronic acid</strong>. Founded in Abano Terme, over more than sixty years of research it has built a unique position in tissue repair and osteoarthritis treatment — with <strong className="text-[#121212]/80 font-semibold">€538 million in revenues in 2025</strong>, an <strong className="text-[#121212]/80 font-semibold">11% CAGR</strong> over the preceding five years, <strong className="text-[#121212]/80 font-semibold">1,522 global patents</strong> and <strong className="text-[#121212]/80 font-semibold">100% Italian production</strong> across four plants.<br /><br />
        Its commercial network is equally extensive: hundreds of Medical Sales Representatives distributed across <strong className="text-[#121212]/80 font-semibold">120+ countries</strong>, from Italy to Europe, from the USA to the Middle East, operating in <strong className="text-[#121212]/80 font-semibold">twelve different languages</strong>. They are the point of contact between Fidia's science and the prescribing physician. At a time of strong international expansion — <strong className="text-[#121212]/80 font-semibold">acquisitions, FDA approval, advancement of the oncology programme</strong> — understanding the competencies of this network in a structured way has become a <strong className="text-[#121212]/80 font-semibold">strategic prerequisite</strong>.
      </>,
      summary: '',
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: "Better evaluation wasn't enough — a tool that simply didn't exist before was needed.",
      intro: "Fidia was starting from a reality common to many fast-growing multinationals: a capable, distributed sales network, but one evaluated in a fragmented way, without a shared framework and without the data to make talent management decisions at global scale.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Eye,
          title: 'A network without an objective picture',
          text: "With hundreds of MSRs distributed across 12+ countries, assessments were left to individual area managers — useful, but not comparable across markets and not anchored to a common framework.",
        },
        {
          icon: Target,
          title: 'Talent management impossible without structured data',
          text: "Identifying high-potential profiles for area manager roles, international mobility or internal growth required a tool that simply didn't exist. External alternatives were economically unsustainable at this scale.",
        },
        {
          icon: TrendingUp,
          title: 'A commercial transition that needed data support',
          text: "The shift towards an increasingly value-based, scientifically-driven approach requires representatives with solid consultative skills. Without an objective baseline, building targeted development plans was impossible.",
        },
      ],
      hrChallenges: [
        {
          icon: Layers,
          title: 'The language barrier as a systematic distortion',
          text: "An English-only assessment for a network speaking 12 languages would have produced data skewed by language proficiency, not professional competence. The risk was measuring language, not the person.",
        },
        {
          icon: CheckCircle,
          title: 'Development and training not connected',
          text: "The results of existing assessments didn't connect with the Learning Lab training platform, making it impossible to translate competency gaps into coherent individual development paths.",
        },
        {
          icon: Shield,
          title: 'Multi-level governance without a shared view',
          text: "Area managers, Country Managers, HRBPs and central HR operated on different information bases, with no shared framework or common dashboard to read the network's talent.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change.',
      items: [
        { icon: Eye, text: "Obtain an objective, standardised and comparable picture of all global MSRs' competencies, applying the same criteria regardless of country." },
        { icon: Target, text: "Identify high-potential profiles for talent management and internal mobility pathways — a scalable alternative to external assessments." },
        { icon: Layers, text: "Manage multilingual complexity (12+ languages), ensuring fairness and comparability of results without sacrificing authenticity of responses." },
        { icon: CheckCircle, text: "Create a direct link between assessment results and individual development plans on Fidia Learning Lab." },
        { icon: Zap, text: "Build a scalable infrastructure that extends, after the MSR roll-out, to other roles and to the Hiring function." },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment against two parallel objectives, built on the Fidia model.',
      intro: <>Skillvue worked with Fidia's HR team — led by <strong className="text-[#121212]/80 font-semibold">Gianluca Magnani, Corporate HRD</strong> — to build an assessment system rooted in real business situations: the concrete scenarios an MSR faces every day, in every market. The result is an <strong className="text-[#121212]/80 font-semibold">asynchronous structured behavioural interview (BEI)</strong>, accessible from mobile/PC/tablet, lasting approximately <strong className="text-[#121212]/80 font-semibold">25 minutes</strong>. Audio responses are transcribed and evaluated by Skillvue's AI against a <strong className="text-[#121212]/80 font-semibold">bespoke competency model</strong>.</>,
      solutionObjectives: [
        {
          number: '01',
          label: 'Learning & Development',
          text: "Assessment of each MSR's current competencies as the basis for targeted individual development plans, linked to the Fidia Learning Lab platform. For every profile: strengths, areas for growth, and what to focus on.",
        },
        {
          number: '02',
          label: 'Talent Management',
          text: "Identification of high-potential profiles to be considered for internal growth paths, area and district manager roles, and international mobility. A scalable system that replaces external assessment processes across the entire global network.",
        },
      ],
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
      title: 'What is changing.',
      subtitle: 'Outcomes of the Skillvue × Fidia Farmaceutici project.',
      metrics: [
        { value: '12+', label: 'assessment languages' },
        { value: '120+', label: 'countries covered' },
        { value: '400+', label: 'MSRs in Italy alone' },
      ],
      qualitative: [
        { icon: Eye, title: 'The first objective picture of the global sales network', text: "For the first time, Fidia will have a structured, comparable view of all its MSRs' competencies worldwide — built with the same criteria in every country, regardless of language or local commercial culture." },
        { icon: Target, title: 'Scalable talent management without depending on external providers', text: "High-potential profiles emerge from data, not from the subjective judgement of individual managers or costly individual assessments outsourced to external firms. A system that scales with the network." },
        { icon: Layers, title: 'MSR competencies now measurable in 12 languages', text: "Behavioural competencies emerge in the most authentic language for each individual. The data produced is comparable across the entire network and becomes a direct input to development plans on Learning Lab." },
        { icon: TrendingUp, title: 'A value-based transition supported by data', text: "The shift from a discount-driven approach to a consultative model based on scientific product value requires specific competencies. Now Fidia knows where to focus, on whom, and with what priorities." },
        { icon: CheckCircle, title: 'Development and training finally connected', text: "The gaps identified by the assessment connect directly with Fidia Learning Lab. The link between evaluation and development path closes a loop that was previously left open." },
        { icon: Zap, title: 'The foundations for a people strategy towards one billion', text: "The MSR mapping is the first chapter. The Hiring project and expansion to other roles — Area Manager, KAM, Marketing — will build on this infrastructure an integrated people strategy to accompany Fidia's global growth." },
      ],
    },
    vision: {
      badge: 'NEXT STEPS',
      title: 'The foundations for a people strategy towards one billion.',
      intro: <>The MSR mapping is the first chapter. The <strong className="text-[#121212]/80 font-semibold">Hiring project</strong> and expansion to other roles — <strong className="text-[#121212]/80 font-semibold">Area Manager, KAM, Marketing</strong> — will build on this infrastructure an <strong className="text-[#121212]/80 font-semibold">integrated people strategy</strong> to accompany Fidia in its global growth journey. A system designed to scale with the business, chapter by chapter.</>,
      nextGen: '',
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
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase mb-6 block w-fit" style={{ background: 'rgba(75,77,247,0.15)', color: '#7b7df9', border: '1px solid rgba(75,77,247,0.2)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[clamp(1.6rem,2.8vw,2.5rem)] font-bold tracking-[-0.03em] text-white/95 mb-6" style={{ lineHeight: 1.3 }}>
                    {c.headline.before}<span style={{ color: '#7b7df9' }}>{c.headline.highlight1}</span>{c.headline.middle}{c.headline.highlight2 && <span style={{ color: '#7b7df9' }}>{c.headline.highlight2}</span>}{c.headline.after}
                  </h1>
                  <p className="text-[16px] text-white/[0.60] leading-[1.75] mb-10 max-w-2xl">{c.subtitle}</p>
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    {c.heroMetrics.map(m => (
                      <div key={m.label} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4">
                        <span className="block text-white" style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[12px] text-white/[0.55] mt-1.5 block leading-[1.35]">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => { router.push(lang === 'it' ? '/prenota-incontro' : '/book-meeting'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-300" style={{ background: '#4b4df7' }}>
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
                      {o.text.includes(':') ? <><strong className="font-bold text-[#121212]/90">{o.text.split(':')[0]}</strong>:{o.text.split(':').slice(1).join(':')}</> : o.text}
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
              <div className="grid md:grid-cols-2 gap-5 mb-12">
                {c.solution.solutionObjectives.map((obj) => (
                  <div key={obj.number} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-3" style={{ color: '#4b4df7' }}>{obj.number}</span>
                    <h4 className="text-[16px] font-bold text-[#121212] mb-3 leading-[1.4]">{obj.label}</h4>
                    <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{obj.text}</p>
                  </div>
                ))}
              </div>

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

            {/* NEXT STEPS */}
            <Section>
              <div className="rounded-2xl border border-[#4b4df7]/[0.12] bg-gradient-to-br from-[#4b4df7]/[0.04] to-transparent p-10 lg:p-14">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-6 block w-fit" style={{ background: 'rgba(75,77,247,0.1)', color: '#4b4df7', border: '1px solid rgba(75,77,247,0.2)' }}>
                  {c.vision.badge}
                </span>
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#121212] leading-[1.4] mb-4">{c.vision.title}</h2>
                <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8]">{c.vision.intro}</p>
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
