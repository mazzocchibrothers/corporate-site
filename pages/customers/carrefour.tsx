// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle, Wrench } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { useLanguage } from '@/i18n/LanguageContext';

const metrics = [
  { value: '-35%', label: 'time-to-hire' },
  { value: '+30%', label: 'new hire success rate' },
  { value: '30K', label: 'CVs/year managed' },
];

const sidebar = [
  { label: 'Industry', value: 'Large-Scale Retail (GDO)' },
  { label: 'Employees', value: '18,000+' },
  { label: 'Region', value: 'Italy' },
  { label: 'Use Cases', value: 'Hiring & Screening, Internal Skills Mapping' },
  { label: 'Customer Since', value: '2024' },
];

const beforeItems = [
  '30,000 CVs/year with no objective competency layer at screening',
  'Video interviews in use, but no automated scoring output',
  'Team split across 3 sales channels + HQ: bandwidth at the limit',
  'Employer Branding and data analysis sacrificed to manage volume',
];

const afterItems = [
  'AI pre-screening for all candidatures with deep competency evaluation',
  "Carrefour's '4C' values model mapped onto Skillvue assessments",
  'HR team freed to focus on nurturing, data analysis, and Employer Branding',
  'Same framework extended to internal skills mapping',
];

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
      before: 'Come Carrefour Italia ha trasformato la selezione di ',
      highlight1: '30.000 candidature',
      middle: ' l\u2019anno con soli ',
      highlight2: '3 recruiter',
      after: '',
    },
    subtitle: '1.200 punti vendita, 3 canali commerciali, 13.000 dipendenti e un volume di CV che nessun team poteva gestire manualmente. Con Skillvue, Carrefour ha ridotto il time-to-hire del 35%, aumentato il tasso di successo degli hiring manager dal 65% all\u201985% e costruito le basi per un modello di competenze unificato dalla selezione allo sviluppo interno.',
    heroMetrics: [
      { value: '-35%', label: 'time-to-hire' },
      { value: '+30%', label: 'qualità delle assunzioni' },
      { value: '13.000+', label: 'persone incluse nei processi' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Punti vendita', value: '1.200 (di cui 900+ in franchising)' },
        { label: 'Canali', value: 'Ipermercati, Market, Express, Cash & Carry + HQ' },
        { label: 'Gruppo', value: 'Princes Retail S.p.A.' },
        { label: 'HQ', value: 'Milano' },
        { label: 'CV ricevuti/anno', value: '30.000' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Carrefour Italia (oggi <strong className="text-[#1A1A2E]/80 font-semibold">Princes Retail S.p.A.</strong>) è una delle principali realtà della GDO italiana, con circa <strong className="text-[#1A1A2E]/80 font-semibold">1.200 punti vendita</strong>, <strong className="text-[#1A1A2E]/80 font-semibold">13.000 dipendenti diretti</strong> e una rete franchising di 8.000 persone. L’azienda riceve circa <strong className="text-[#1A1A2E]/80 font-semibold">30.000 CV all’anno</strong> e gestisce <strong className="text-[#1A1A2E]/80 font-semibold">800 colloqui con soli 3 recruiter</strong>. Il processo pre-Skillvue era parzialmente digitalizzato — ATS e video-interviste asincrone — ma mancava qualsiasi analisi strutturata delle competenze. La domanda strategica era chiara: riempire posizioni, o trovare la persona giusta per il ruolo giusto?
      </>,
      summary: "Il progetto ha trasformato il pre-screening da attività manuale a processo AI-driven con output strutturato su ogni candidato, riducendo drasticamente i tempi e aumentando la qualità delle shortlist. Il valore dimostrato nella selezione ha portato all\u2019estensione del modello anche alla mappatura delle competenze interne su 6.000 dipendenti della rete.",
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: "Con 30.000 CV l\u2019anno e soli 3 recruiter su 1.200 punti vendita, Carrefour Italia aveva un vincolo operativo chiaro: scalare la qualità della selezione senza moltiplicare le risorse. Il tutto integrando il framework proprietario \u201c4C\u201d e mantenendo un\u2019esperienza candidato all\u2019altezza di un brand Top Employer.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Target,
          title: 'Trovare la persona giusta, non solo riempire il ruolo',
          text: "Con turnover elevato e margini in contrazione, il modello precedente era orientato alla sopravvivenza: coprire posizioni il più rapidamente possibile. Serviva un cambio di paradigma verso la persona giusta per il ruolo giusto, supportato da dati oggettivi sulle competenze.",
        },
        {
          icon: Layers,
          title: "Organizzazione multi-canale, un solo team",
          text: "3 canali retail, Cash & Carry e HQ corporate, ciascuno con profili e volumi diversi. Un team di 3 recruiter gestiva 800 colloqui l\u2019anno su tutti i canali, con forte dipendenza da headhunter esterni. Serviva uno strumento flessibile che non moltiplicasse le risorse.",
        },
        {
          icon: Eye,
          title: 'Il CV non racconta le competenze',
          text: "Per profili junior e operativi, i CV sono sostanzialmente identici. Le competenze trasversali — problem solving, orientamento al cliente, adattamento — sono il primo predittore di successo ma completamente invisibili sulla carta.",
        },
      ],
      hrChallenges: [
        {
          icon: BarChart3,
          title: 'Nessun output strutturato prima del colloquio',
          text: "Nonostante le video-interviste asincrone, il processo non produceva alcuna valutazione specifica per candidato. Le decisioni di pre-screening si basavano sull\u2019intuizione, senza dati strutturati sulle competenze.",
        },
        {
          icon: Wrench,
          title: 'Modello di competenze proprietario da integrare',
          text: "Carrefour opera con il modello \u20184C\u2019 (Collaborazione, Coraggio, Cambiamento, Cliente). La soluzione doveva integrarsi con questo framework, replicando il comportamento di valutazione del recruiter e allineando i test ai comportamenti tipici del modello.",
        },
        {
          icon: Users,
          title: 'Competenze della rete vendita mai mappate',
          text: "Per migliaia di persone nella rete vendita non esisteva alcuna mappatura strutturata delle competenze. Le valutazioni avvenivano tramite osservazione in presenza, con tempi lunghi, costi elevati e risultati disomogenei tra sedi.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: "Scalare il pre-screening senza sacrificare la qualità: gestire 30.000 CV/anno e 800 colloqui con 3 recruiter, riducendo la dipendenza da headhunter esterni e liberando tempo per valutazione approfondita ed employer branding" },
        { icon: CheckCircle, text: "Integrare il modello di competenze 4C nella selezione: valutare prima le hard skill, poi le soft skill allineate al framework proprietario (Collaborazione, Coraggio, Cambiamento, Cliente), con output strutturato su ogni candidato" },
        { icon: Layers, text: "Coprire un\u2019organizzazione multi-canale: uno strumento unico adattabile a profili diversi — stage HQ, ruoli operativi su più formati di punto vendita, profili di leadership — ciascuno con un mix specifico di competenze" },
        { icon: TrendingUp, text: "Costruire un ponte tra selezione e sviluppo: allineare le competenze misurate in fase di hiring con quelle sviluppate internamente, creando le basi per un modello skills-based che copra l\u2019intero ciclo del talento" },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Skillvue è stato integrato nel processo di selezione di Carrefour Italia con un onboarding di circa 1 mese dal kick-off al go-live. Il framework \u20184C\u2019 è stato mappato sulla Skill Library, allineando competenze e comportamenti tipici — poi esteso alla mappatura interna della rete vendita.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Heart, label: "Soft skill allineate al modello 4C (Collaborazione, Coraggio, Cambiamento, Cliente)" },
        { icon: Wrench, label: "Hard skill tecniche per ruoli store (co-sviluppate sul modello Carrefour)" },
        { icon: CheckCircle, label: "Hard skill per profili stage/tirocinio (da libreria Skillvue)" },
      ],
      methodologyLabel: 'METODOLOGIA',
      methodology: [
        {
          title: "Integrazione profonda con il modello 4C",
          text: "I team hanno mappato il framework 4C sulla Skill Library, calibrando contenuti e comportamenti tipici. La calibrazione congiunta garantisce che l\u2019AI replichi il comportamento di valutazione del recruiter rispetto ai valori aziendali.",
        },
        {
          title: "Architettura multi-canale, un unico processo",
          text: "Assessment configurati per profili diversi — stage HQ, ruoli operativi, leadership — ciascuno con mix specifico di soft e hard skill. Il recruiter riceve un report strutturato con profilo di competenze e matching rispetto al ruolo.",
        },
        {
          title: "Dal hiring alla mappatura interna",
          text: "Il successo nel hiring ha portato all\u2019estensione alla rete vendita: 6.000 dipendenti mappati in un mese, sostituendo l\u2019osservazione in presenza. Un unico standard dalla selezione allo sviluppo.",
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: "I risultati misurabili ottenuti da Carrefour Italia attraverso l\u2019adozione di Skillvue nei processi di selezione e mappatura interna.",
      metrics: [
        { value: '-35%', label: 'Time-to-hire', sublabel: 'Riduzione del tempo dal CV al colloquio' },
        { value: '+30%', label: 'Qualità delle assunzioni', sublabel: 'Tasso successo hiring manager: 65% → 85%' },
        { value: '13.000+', label: 'Persone nei processi di assessment', sublabel: 'Su 4 progetti paralleli (hiring + mappatura interna)' },
        { value: '6.000', label: 'Dipendenti mappati in 1 mese', sublabel: 'Competenze della rete vendita — prima mai rilevate' },
        { value: '3 FTE', label: 'Team recruiting invariato', sublabel: 'Stesse risorse, risultati esponenzialmente migliori' },
      ],
      qualitative: [
        { icon: BarChart3, title: 'Pre-screening con output strutturato', text: "Per la prima volta ogni video-assessment produce una valutazione specifica delle competenze. Il report combina matching AI e valutazione del recruiter, diventando la parte fondamentale della shortlist." },
        { icon: Zap, title: "Tempo liberato per attività ad alto valore", text: "La riduzione del tempo su screening CV e telefonate ha liberato il team per employer branding, analisi dati e nurturing — attività prima impossibili con i volumi gestiti." },
        { icon: CheckCircle, title: 'Shortlist radicalmente più qualificate', text: "Il tasso di successo degli hiring manager è salito dal 65% all\u201985%: candidati più allineati al framework 4C, con riduzione diretta dei colloqui inutili." },
        { icon: Eye, title: 'Talento nascosto scoperto nella rete', text: "La mappatura di 6.000 dipendenti ha fatto emergere profili ad alto potenziale dove prima non esisteva alcuna visibilità, orientando gli sforzi formativi." },
        { icon: TrendingUp, title: 'Allineamento tra selezione e sviluppo', text: "Lo stesso standard di competenze è applicato a hiring e sviluppo interno, anticipando i bisogni formativi dall\u2019assunzione e abilitando la mobilità basata sui dati." },
      ],
    },
    vision: {
      badge: 'EVOLUZIONE',
      title: 'Verso un modello skills-based integrato su tutta l\u2019organizzazione',
      intro: "Con i risultati dimostrati sia sulla selezione che sulla mappatura interna, il passo naturale è consolidare il modello skills-based come standard unico per tutte le decisioni sulle persone, dalla selezione alla mobilità interna allo sviluppo.",
      objective: "Un framework di competenze unificato in cui ogni persona viene valutata con la stessa logica — dalla selezione alla pianificazione della crescita, su tutti i canali della rete.",
      bullets: [
        "Estensione progressiva del modello di selezione AI a tutta la rete di punti vendita",
        "Consolidamento della mappatura interna come base per mobilità, formazione e succession planning",
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Insurance · Hiring at Scale', headline: 'Come Europ Assistance ha assunto il 24% in più con il 18% di colloqui in meno.' },
        { id: 'subdued', company: 'Subdued', tag: 'Retail Fashion · Hiring', headline: 'Vincere la guerra per il talento Gen Z senza annegare nei colloqui.' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'How Carrefour Italia transformed the screening of ',
      highlight1: '30,000 applications',
      middle: ' a year with just ',
      highlight2: '3 recruiters',
      after: '',
    },
    subtitle: '1,200 stores, 3 sales channels, 13,000 employees and a CV volume no team could handle manually. With Skillvue, Carrefour cut time-to-hire by 35%, raised hiring manager success rate from 65% to 85%, and built the foundation for a unified competency model from selection to internal development.',
    heroMetrics: [
      { value: '-35%', label: 'time-to-hire' },
      { value: '+30%', label: 'hiring quality' },
      { value: '13,000+', label: 'people in assessment processes' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Stores', value: '1,200 (900+ franchised)' },
        { label: 'Channels', value: 'Hypermarkets, Market, Express, Cash & Carry + HQ' },
        { label: 'Group', value: 'Princes Retail S.p.A.' },
        { label: 'HQ', value: 'Milan' },
        { label: 'CVs received/year', value: '30,000' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Carrefour Italia, now <strong className="text-[#1A1A2E]/80 font-semibold">Princes Retail S.p.A.</strong> within the NewPrinces group, has been one of Italy\u2019s leading organized retail players since 1972, with approximately <strong className="text-[#1A1A2E]/80 font-semibold">1,200 stores</strong> (over 900 franchised), <strong className="text-[#1A1A2E]/80 font-semibold">13,000 direct employees</strong> and around <strong className="text-[#1A1A2E]/80 font-semibold">8,000 people in the franchise network</strong>. The organization operates across <strong className="text-[#1A1A2E]/80 font-semibold">3 sales channels</strong> (Hypermarkets, Market, Express), Cash &amp; Carry and corporate HQ, each with different profiles and requirements. The company receives approximately <strong className="text-[#1A1A2E]/80 font-semibold">30,000 CVs per year</strong> and manages <strong className="text-[#1A1A2E]/80 font-semibold">800 interviews annually with just 3 recruiters</strong> — an extreme volume-to-resource ratio. The pre-Skillvue selection process was only partially digitized: the team had introduced an ATS (SAP) and async video interviews without AI, but lacked any structured competency analysis before the interview stage. The strategic question was clear: fill positions, or find the right person for the right role?
      </>,
      summary: "The project transformed pre-screening from a manual activity into an AI-driven process with structured output on every candidate, drastically reducing time-to-hire and improving shortlist quality. The value demonstrated in selection led to extending the model to internal competency mapping across 6,000 employees in the store network.",
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: "With 30,000 CVs per year and only 3 recruiters across 1,200 stores, Carrefour Italia had a clear operational constraint: scale selection quality without multiplying resources. All while integrating the proprietary '4C' framework and maintaining a candidate experience worthy of a Top Employer brand.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Target,
          title: 'Find the right person, not just fill the role',
          text: "With high turnover and shrinking margins, the previous model was survival-oriented: cover positions as quickly as possible. A paradigm shift was needed toward finding the right person for the right role, backed by objective competency data.",
        },
        {
          icon: Layers,
          title: 'Multi-channel organization, one team',
          text: "3 retail channels, Cash & Carry and corporate HQ, each with different profiles and volumes. A team of 3 recruiters managed 800 interviews a year across all channels, with strong reliance on external headhunters. A flexible tool was needed that would not multiply resources.",
        },
        {
          icon: Eye,
          title: "CVs don't reveal competencies",
          text: "For junior and operational profiles, CVs are essentially identical. Cross-functional competencies — problem solving, customer orientation, adaptability — are the top predictor of success but completely invisible on paper.",
        },
      ],
      hrChallenges: [
        {
          icon: BarChart3,
          title: 'No structured output before the interview',
          text: "Despite async video interviews, the process produced no specific competency assessment per candidate. Pre-screening decisions were based on intuition, without structured data.",
        },
        {
          icon: Wrench,
          title: 'Proprietary competency model to integrate',
          text: "Carrefour operates with the '4C' model (Collaboration, Courage, Change, Customer). The solution had to integrate with this framework, replicating the recruiter's evaluation behaviour and aligning tests to the typical behaviours of the company model.",
        },
        {
          icon: Users,
          title: 'Store network competencies never mapped',
          text: "For thousands of people in the store network, no structured competency mapping existed. Assessments were done through in-person observation, with long timelines, high costs and inconsistent results across locations.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Zap, text: "Scale pre-screening without sacrificing quality: handle 30,000 CVs/year and 800 interviews with 3 recruiters, reducing reliance on external headhunters and freeing time for in-depth evaluation and employer branding" },
        { icon: CheckCircle, text: "Integrate the 4C competency model into selection: assess hard skills first, then soft skills aligned to the proprietary framework (Collaboration, Courage, Change, Customer), with structured output on every candidate" },
        { icon: Layers, text: "Cover a multi-channel organization: a single adaptable tool for different profiles — HQ internships, operational roles across multiple store formats, leadership profiles — each with a specific competency mix" },
        { icon: TrendingUp, text: "Build a bridge between selection and development: align competencies measured at hiring with those developed internally, creating the foundation for a skills-based model covering the entire talent lifecycle" },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "Skillvue was integrated into Carrefour Italia's selection process with an onboarding of approximately one month from kick-off to go-live. The '4C' framework was mapped onto the Skill Library, aligning competencies and typical behaviours — then extended to internal mapping of the store network.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Heart, label: "Soft skills aligned to the 4C model (Collaboration, Courage, Change, Customer)" },
        { icon: Wrench, label: "Technical hard skills for store roles (co-developed on the Carrefour model)" },
        { icon: CheckCircle, label: "Hard skills for internship/traineeship profiles (from Skillvue library)" },
      ],
      methodologyLabel: 'METHODOLOGY',
      methodology: [
        {
          title: "Deep integration with the 4C model",
          text: "The teams mapped the 4C framework onto the Skill Library, calibrating content and typical behaviours. Joint calibration ensures the AI replicates the recruiter's evaluation behaviour relative to company values.",
        },
        {
          title: "Multi-channel architecture, one process",
          text: "Assessments configured for different profiles — HQ internships, operational roles, leadership — each with a specific mix of soft and hard skills. The recruiter receives a structured report with competency profile and role matching.",
        },
        {
          title: "From hiring to internal mapping",
          text: "The success in hiring led to extending the model to the store network: 6,000 employees mapped in one month, replacing in-person observation. One single standard from selection to development.",
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The measurable outcomes Carrefour Italia achieved through Skillvue across selection and internal skills mapping.',
      metrics: [
        { value: '-35%', label: 'Time-to-hire', sublabel: 'Reduction in time from CV to interview' },
        { value: '+30%', label: 'Hiring quality', sublabel: 'Hiring manager success rate: 65% → 85%' },
        { value: '13,000+', label: 'People in assessment processes', sublabel: 'Across 4 parallel projects (hiring + internal mapping)' },
        { value: '6,000', label: 'Employees mapped in 1 month', sublabel: 'Store network competencies — never previously measured' },
        { value: '3 FTE', label: 'Recruiting team unchanged', sublabel: 'Same resources, exponentially better results' },
      ],
      qualitative: [
        { icon: BarChart3, title: 'Pre-screening with structured output', text: "For the first time, every video-assessment produces a specific competency evaluation. The report combines AI matching and the recruiter's assessment, becoming the fundamental part of the shortlist." },
        { icon: Zap, title: 'Time freed for high-value activities', text: "The reduction in time spent on CV screening and phone calls freed the team for employer branding, data analysis and nurturing — activities previously impossible given the volumes." },
        { icon: CheckCircle, title: 'Radically more qualified shortlists', text: "The hiring manager success rate rose from 65% to 85%: candidates more aligned with the 4C framework, with a direct reduction in wasted interviews." },
        { icon: Eye, title: 'Hidden talent discovered in the network', text: "The mapping of 6,000 employees surfaced high-potential profiles where no visibility previously existed, guiding training efforts." },
        { icon: TrendingUp, title: 'Alignment between selection and development', text: "The same competency standard is applied to hiring and internal development, anticipating training needs from the hiring stage and enabling data-driven internal mobility." },
      ],
    },
    vision: {
      badge: 'EVOLUTION',
      title: 'Towards an integrated skills-based model across the entire organization',
      intro: "With results proven both in selection and internal mapping, the natural step is to consolidate the skills-based model as the single standard for all people decisions — from selection to internal mobility to development.",
      objective: "A unified competency framework where every person is assessed with the same logic — from selection to career planning, across all channels in the network.",
      bullets: [
        "Progressive extension of the AI selection model to the entire store network",
        "Consolidation of internal competency mapping as the basis for mobility, training and succession planning",
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Insurance · Hiring at Scale', headline: 'How Europ Assistance hired 24% more with 18% fewer interviews.' },
        { id: 'subdued', company: 'Subdued', tag: 'Retail Fashion · Hiring', headline: 'Winning Gen Z Talent Without Drowning in Interviews.' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function CarrefourStoryPage() {
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
            <img src="/logos/carrefour-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Carrefour</span>
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
                      <img src="/logos/carrefour.png" alt="Carrefour logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Carrefour Italia</p>
                    </div>
                  </div>
                  <div className="divide-y divide-white/[0.08]">
                    {c.clientCard.facts.map(s => (
                      <div key={s.label} className="py-4 first:pt-0 last:pb-0">
                        <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{t(s.label)}</span>
                        <p className="text-[14px] text-white/[0.65] leading-[1.6]">{t(s.value)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/[0.08] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/[0.12] bg-white/[0.08]">
                      <img src="/logos/carrefour-francesca.jpg" alt="Francesca Caldi" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">Francesca Caldi</p>
                      <p className="text-[12px] text-white/40 leading-[1.5]">Talent Acquisition Manager</p>
                    </div>
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
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                  {c.results.metrics.map(m => (
                    <div key={m.label} className="text-center">
                      <span className="block text-white" style={{ fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{m.value}</span>
                      <span className="text-[13px] text-white/[0.65] mt-3 block leading-[1.4]">{m.label}</span>
                      {m.sublabel && <span className="text-[11px] text-white/30 mt-1 block leading-[1.4]">{m.sublabel}</span>}
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
                  <p className="text-[16px] text-white/[0.65] leading-[1.7] mb-8">{t(s.headline)}</p>
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
