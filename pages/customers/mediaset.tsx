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
      before: 'Come Mediaset ha gestito ',
      highlight1: '3.000 candidature',
      middle: ' in ',
      highlight2: '5 settimane',
      after: ' con 3 persone',
    },
    subtitle: 'Un graduate program su scala nazionale, profili junior indistinguibili da CV e un ritmo di 80 candidati pre-screenati a settimana da passare alle fasi successive. Con Skillvue, Mediaset ha trasformato le soft skill nel primo filtro di selezione.',
    heroMetrics: [
      { value: '3.000+', label: 'candidature gestite' },
      { value: '5 settimane', label: 'finestra temporale' },
      { value: '3 FTE', label: 'team HR' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Gruppo', value: 'MFE – MediaForEurope' },
        { label: 'HQ', value: 'Cologno Monzese (MI)' },
        { label: 'Team HR', value: '3 FTE' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Mediaset, parte del gruppo <strong className="text-[#1A1A2E]/80 font-semibold">MFE (MediaForEurope)</strong>, è una delle principali media company italiane con sede a <strong className="text-[#1A1A2E]/80 font-semibold">Cologno Monzese (Milano)</strong>. L’azienda ha lanciato il <strong className="text-[#1A1A2E]/80 font-semibold">"Progetto GRAPE"</strong> (Graduate Program), un percorso di selezione per stagisti e profili junior da inserire in diverse funzioni aziendali. Il programma ha generato quasi <strong className="text-[#1A1A2E]/80 font-semibold">3.000 candidature da gestire in sole 5 settimane</strong>, con un team HR di <strong className="text-[#1A1A2E]/80 font-semibold">3 persone</strong> (1 manager + 2 operative) e l’obiettivo di passare <strong className="text-[#1A1A2E]/80 font-semibold">80 candidati pre-screenati a settimana</strong> alle fasi successive della selezione. Per profili junior e neolaureati, il CV non offre elementi differenzianti: le soft skill diventano l’unico vero filtro per identificare l’alto potenziale.
      </>,
      summary: 'Il progetto ha trasformato la selezione da un processo manuale impossibile da scalare a un sistema di pre-screening basato sulle competenze, dando al team HR dati oggettivi su ogni candidato — come se avessero condotto un primo colloquio con ognuno dei 3.000 candidati.',
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema operativo',
      intro: 'Mediaset è un brand con standard reputazionali elevati. Con oltre 3.000 candidature per un graduate program, un team di 3 persone e una finestra di 5 settimane, il business aveva un vincolo operativo chiaro: valutare tutte le application con velocità senza sacrificare la qualità della selezione né l’esperienza del candidato.',
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Zap,
          title: 'Volumi estremi in tempi compressi',
          text: 'Oltre 3.000 candidature in 5 settimane, con l’obiettivo di passare 80 profili pre-screenati a settimana alle fasi successive della selezione. Con un team di 3 persone, lo screening telefonico individuale era fisicamente impossibile — serviva un filtro scalabile senza compromessi sulla qualità.',
        },
        {
          icon: Users,
          title: 'Il CV non differenzia i profili junior',
          text: 'Stagisti e neolaureati hanno CV sostanzialmente identici: poca esperienza, qualifiche simili. Le soft skill — problem solving, ragionamento logico, motivazione — sono l’unico vero differenziatore per identificare l’alto potenziale, ma sono completamente invisibili sulla carta.',
        },
        {
          icon: Shield,
          title: 'Standard reputazionali di un brand Tier-1',
          text: 'Mediaset è uno dei brand più riconoscibili d’Italia. Il primo contatto con i candidati deve essere all’altezza delle aspettative reputazionali dell’azienda. Un processo di selezione che perde talento nella massa o offre un’esperienza scadente non è accettabile.',
        },
      ],
      hrChallenges: [
        {
          icon: Wrench,
          title: 'Pre-screening manuale insostenibile',
          text: 'Con 3.000+ candidature e 3 persone, non c’è tempo per screening telefonici individuali. Il team HR aveva bisogno di un filtro strutturato che producesse un ranking comparabile e oggettivo come primo step del funnel, non una semplice scrematura per parole chiave.',
        },
        {
          icon: Eye,
          title: 'Nessun dato sulle competenze prima del colloquio',
          text: 'Prima di Skillvue, i candidati passavano alle fasi successive senza alcun dato strutturato sulle competenze. Le decisioni di pre-screening si basavano sull’intuizione, non su una valutazione oggettiva — rendendo impossibile distinguere il potenziale in un mare di profili simili.',
        },
        {
          icon: Layers,
          title: 'Processo di selezione multi-fase da integrare',
          text: 'Il processo di selezione prevede più fasi — dal pre-screening iniziale ai colloqui individuali fino agli assessment di gruppo in sede. Serviva uno strumento che si integrasse in questo ecosistema, producendo output validabili dal team HR e direttamente utilizzabili nelle fasi successive.',
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: 'Gestire 3.000+ candidature in 5 settimane con un team di 3 persone, mantenendo un ritmo costante di 80 candidati pre-screenati a settimana per le fasi successive della selezione' },
        { icon: Eye, text: 'Rendere visibili le soft skill dal primo step: creare un ranking basato su competenze reali, non su CV, dando al team HR dati paragonabili a un primo colloquio con ogni candidato' },
        { icon: Target, text: 'Costruire un filtro oggettivo e difendibile: valutazione basata su soft skill, test logici e domande di conoscenza, con ranking finale validato sul modello di competenze di Mediaset' },
        { icon: Shield, text: 'Garantire un’esperienza candidato all’altezza del brand: il primo contatto con Mediaset deve essere positivo, intuitivo e accessibile anche per chi non ha mai usato questo formato' },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'AI Pre-screening con Skillvue',
      intro: 'Skillvue è stato integrato come primo filtro di pre-screening nel Progetto GRAPE, combinando assessment su soft skill, test logici e domande di conoscenza. Il ranking finale viene rivisto e validato dal team HR su un file esterno, integrandolo con il modello di competenze proprietario di Mediaset. I profili pre-screenati avanzano poi nelle fasi successive della selezione.',
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Target, label: 'Problem Solving' },
        { icon: BarChart3, label: 'Ragionamento logico' },
        { icon: CheckCircle, label: 'Soft skill trasversali (calibrate sul modello di competenze Mediaset)' },
        { icon: Wrench, label: 'Test di conoscenza (knowledge-based)' },
      ],
      methodologyLabel: 'METODOLOGIA',
      methodology: [
        {
          title: 'Pre-screening AI come primo filtro del funnel',
          text: 'Skillvue è stato utilizzato come strumento di valutazione oggettiva e ranking. Ogni candidato viene valutato su soft skill, logica e conoscenze, producendo un punteggio comparabile che il team HR utilizza per costruire le shortlist settimanali da passare alle fasi successive.',
        },
        {
          title: 'Ranking validato sul modello Mediaset',
          text: 'Il ranking prodotto da Skillvue viene rivisto e validato dal team HR su un file esterno, integrandolo con il modello di competenze proprietario di Mediaset. L’AI supporta, il recruiter decide — un approccio human-in-the-loop che garantisce controllo e personalizzazione.',
        },
        {
          title: 'Integrato in un processo multi-fase',
          text: 'Skillvue si inserisce come primo step di un processo di selezione a più fasi: dal pre-screening AI ai colloqui individuali, fino agli assessment di gruppo in sede Mediaset. Un modello che dimostra l’integrabilità della piattaforma in ecosistemi di recruiting strutturati e complessi.',
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: 'I risultati misurabili ottenuti da Mediaset attraverso Skillvue nel Progetto GRAPE.',
      metrics: [
        { value: '3.000+', label: 'Candidature gestite', sublabel: 'Progetto GRAPE — in sole 5 settimane' },
        { value: '80/sett.', label: 'Candidati pre-screenati', sublabel: 'Ritmo costante verso le fasi successive' },
        { value: '4.1/5', label: 'Soddisfazione candidati', sublabel: '77% ha dato 4 o 5 su 5 (401 risposte)' },
        { value: '79%', label: 'Conversion rate assessment', sublabel: '1.917 valutati su 2.436 invitati' },
      ],
      pipeline: {
        label: 'FUNNEL PROGETTO GRAPE',
        steps: [
          { label: 'Candidature totali', value: '~3.000' },
          { label: 'Invitati all’assessment', value: '2.436' },
          { label: 'Valutati con Skillvue', value: '~2.000' },
          { label: 'Colloqui individuali', value: '~400' },
          { label: 'Assessment di gruppo', value: '~80' },
          { label: 'Assunti', value: '15' },
        ],
      },
      qualitative: [
        { icon: Eye, title: 'Dati sulle competenze per la prima volta', text: 'Per la prima volta, il team HR ha avuto dati strutturati sulle competenze di ogni candidato prima del colloquio — come se avessero condotto un primo colloquio con ognuno dei 3.000 candidati, qualcosa di impossibile manualmente.' },
        { icon: Target, title: 'Shortlist qualificate per le fasi successive', text: 'Le fasi successive della selezione hanno ricevuto profili pre-validati e ranked per competenze, non una lista generica di CV. Il risultato: colloqui più mirati, assessment di gruppo più efficaci, e un funnel che ha portato a 15 assunzioni.' },
        { icon: Shield, title: 'Candidate experience all’altezza del brand', text: 'Il 77% dei candidati ha valutato l’esperienza 4 o 5 su 5, con l’84% che non ha riscontrato problemi tecnici — nonostante il 76% non avesse mai usato questo formato. Un primo contatto con Mediaset che rispetta gli standard reputazionali del brand.' },
        { icon: TrendingUp, title: 'Da progetto a metodo', text: 'Il valore dimostrato nel Progetto GRAPE ha portato Mediaset ad espandere spontaneamente Skillvue al Talent Acquisition più ampio, con la selezione di Junior HR Business Partner (1.500+ candidature). Un segnale forte di fiducia e scalabilità percepita.' },
      ],
    },
    vision: {
      badge: 'EVOLUZIONE 2026',
      title: 'Da graduate program a Talent Acquisition strategy',
      intro: 'Quando il Progetto GRAPE ha dimostrato che Skillvue poteva gestire 3.000 candidature in 5 settimane con 3 persone e un’esperienza candidato positiva, l’espansione al Talent Acquisition più ampio è stata la conseguenza naturale.',
      objective: 'Estendere il modello di pre-screening basato sulle competenze a tutti i processi di Talent Acquisition di Mediaset, trasformando un progetto pilota in un metodo strutturale di selezione.',
      bullets: [
        'Selezione Junior HR Business Partner già avviata con 1.500+ candidature e 523 candidati valutati su 1.190 invitati',
        'Verso un modello in cui ogni processo di selezione Mediaset parte da dati oggettivi sulle competenze, non da CV',
        'Transizione da progetto pilota (graduate program) a metodo strutturale per l’intero Talent Acquisition',
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail · Hiring & Screening', headline: 'Come Carrefour Italia assume meglio, più velocemente e su scala. Senza aggiungere una sola persona al team.' },
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Internal Mobility', headline: 'Come ADR ha democratizzato l’accesso allo sviluppo per 5.000 persone con Skillvue.' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'How Mediaset managed ',
      highlight1: '3,000 applications',
      middle: ' in ',
      highlight2: '5 weeks',
      after: ' with 3 people',
    },
    subtitle: 'A nationwide graduate program, junior profiles indistinguishable by CV and a pace of 80 pre-screened candidates per week to pass to the next stages. With Skillvue, Mediaset turned soft skills into the first selection filter.',
    heroMetrics: [
      { value: '3,000+', label: 'applications managed' },
      { value: '5 weeks', label: 'time window' },
      { value: '3 FTE', label: 'HR team' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Group', value: 'MFE – MediaForEurope' },
        { label: 'HQ', value: 'Cologno Monzese (MI)' },
        { label: 'HR Team', value: '3 FTE' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Mediaset, part of the <strong className="text-[#1A1A2E]/80 font-semibold">MFE – MediaForEurope</strong> group (listed on Borsa Italiana and Euronext Amsterdam), is one of Italy’s leading media companies headquartered in <strong className="text-[#1A1A2E]/80 font-semibold">Cologno Monzese (Milan)</strong>. The company launched <strong className="text-[#1A1A2E]/80 font-semibold">"Progetto GRAPE"</strong> (Graduate Program), a selection pathway for interns and junior profiles to be placed across various corporate departments. The program generated over <strong className="text-[#1A1A2E]/80 font-semibold">3,000 applications to be managed in just 5 weeks</strong>, with an HR team of <strong className="text-[#1A1A2E]/80 font-semibold">3 people</strong> (1 manager + 2 operatives) and the target of passing <strong className="text-[#1A1A2E]/80 font-semibold">80 pre-screened candidates per week</strong> to the next stages of selection. For junior and recent graduate profiles, the CV offers no differentiating elements: soft skills become the only real filter to identify high potential.
      </>,
      summary: 'The project transformed selection from a manual process impossible to scale into a competency-based pre-screening system, giving the HR team objective data on every candidate — as if they had conducted a first interview with each of the 3,000 candidates.',
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Operational Problem',
      intro: 'Mediaset is a top-tier brand with high reputational standards. With over 3,000 applications for a graduate program, a 3-person team and a 5-week window, the business had a clear operational constraint: screen at industrial volumes without sacrificing selection quality or candidate experience.',
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Zap,
          title: 'Extreme volumes in a compressed timeframe',
          text: 'Over 3,000 applications in 5 weeks, with the target of passing 80 pre-screened profiles per week to the next stages of selection. With a 3-person team, individual phone screening was physically impossible — a scalable filter was needed without compromising quality.',
        },
        {
          icon: Users,
          title: 'CVs don’t differentiate junior profiles',
          text: 'Interns and recent graduates have essentially identical CVs: limited experience, similar qualifications. Soft skills — problem solving, logical reasoning, motivation — are the only real differentiator for identifying high potential, but they are completely invisible on paper.',
        },
        {
          icon: Shield,
          title: 'Reputational standards of a Tier-1 brand',
          text: 'Mediaset is one of Italy’s most recognizable brands. The first point of contact with candidates must meet the company’s reputational expectations. A selection process that loses talent in the crowd or delivers a poor experience is unacceptable.',
        },
      ],
      hrChallenges: [
        {
          icon: Wrench,
          title: 'Unsustainable manual pre-screening',
          text: 'With 3,000+ applications and 3 people, there is no time for individual phone screens. The HR team needed a structured filter that could produce a comparable and objective ranking as the first funnel step, not a simple keyword-based cull.',
        },
        {
          icon: Eye,
          title: 'No competency data before the interview',
          text: 'Before Skillvue, candidates advanced to the next stages without any structured competency data. Pre-screening decisions were based on intuition, not objective evaluation — making it impossible to distinguish potential in a sea of similar profiles.',
        },
        {
          icon: Layers,
          title: 'Multi-phase selection process to integrate',
          text: 'The selection process involves multiple phases — from initial pre-screening to individual interviews to on-site group assessments. A tool was needed that could integrate into this ecosystem, producing outputs validatable by the HR team and directly usable in subsequent stages.',
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Zap, text: 'Manage 3,000+ applications in 5 weeks with a 3-person team, maintaining a steady pace of 80 pre-screened candidates per week for the next stages of selection' },
        { icon: Eye, text: 'Make soft skills visible from the first step: create a ranking based on real competencies, not CVs, giving the HR team data comparable to a first interview with every candidate' },
        { icon: Target, text: 'Build an objective and defensible filter: evaluation based on soft skills, logic tests and knowledge questions, with the final ranking validated against Mediaset’s competency model' },
        { icon: Shield, text: 'Ensure a candidate experience worthy of the brand: the first contact with Mediaset must be positive, intuitive and accessible even for those who have never used this format' },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Pre-screening with Skillvue',
      intro: 'Skillvue was integrated as the first pre-screening filter in Progetto GRAPE, combining assessments on soft skills, logic tests and knowledge questions. The final ranking is reviewed and validated by the HR team on an external file, integrating it with Mediaset’s proprietary competency model. Pre-screened profiles then advance to the next stages of selection.',
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Target, label: 'Problem Solving' },
        { icon: BarChart3, label: 'Logical Reasoning' },
        { icon: CheckCircle, label: 'Cross-functional soft skills (calibrated to Mediaset’s competency model)' },
        { icon: Wrench, label: 'Knowledge tests (knowledge-based)' },
      ],
      methodologyLabel: 'METHODOLOGY',
      methodology: [
        {
          title: 'AI pre-screening as the first funnel filter',
          text: 'Skillvue was used as an objective evaluation and ranking tool. Every candidate is assessed on soft skills, logic and knowledge, producing a comparable score that the HR team uses to build weekly shortlists to pass to the next stages.',
        },
        {
          title: 'Ranking validated against the Mediaset model',
          text: 'The ranking produced by Skillvue is reviewed and validated by the HR team on an external file, integrating it with Mediaset’s proprietary competency model. AI supports, the recruiter decides — a human-in-the-loop approach that ensures control and customization.',
        },
        {
          title: 'Integrated into a multi-phase process',
          text: 'Skillvue is inserted as the first step of a multi-phase selection process: from AI pre-screening to individual interviews to on-site group assessments at Mediaset. A model that demonstrates the platform’s integrability into structured and complex recruiting ecosystems.',
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The measurable outcomes Mediaset achieved through Skillvue across Progetto GRAPE.',
      metrics: [
        { value: '3,000+', label: 'Applications managed', sublabel: 'Progetto GRAPE — in just 5 weeks' },
        { value: '80/week', label: 'Candidates pre-screened', sublabel: 'Steady pace towards the next stages' },
        { value: '4.1/5', label: 'Candidate satisfaction', sublabel: '77% rated 4 or 5 out of 5 (401 responses)' },
        { value: '79%', label: 'Assessment conversion rate', sublabel: '1,917 assessed out of 2,436 invited' },
      ],
      pipeline: {
        label: 'PROGETTO GRAPE FUNNEL',
        steps: [
          { label: 'Total applications', value: '~3,000' },
          { label: 'Invited to assessment', value: '2,436' },
          { label: 'Assessed with Skillvue', value: '~2,000' },
          { label: 'Individual interviews', value: '~400' },
          { label: 'Group assessments', value: '~80' },
          { label: 'Hired', value: '15' },
        ],
      },
      qualitative: [
        { icon: Eye, title: 'Competency data for the first time', text: 'For the first time, the HR team had structured competency data on every candidate before the interview — as if they had conducted a first interview with each of the 3,000 candidates, something impossible to do manually.' },
        { icon: Target, title: 'Qualified shortlists for the next stages', text: 'The subsequent selection stages received pre-validated profiles ranked by competencies, not a generic list of CVs. The result: more targeted interviews, more effective group assessments, and a funnel that led to 15 hires.' },
        { icon: Shield, title: 'Candidate experience worthy of the brand', text: '77% of candidates rated the experience 4 or 5 out of 5, with 84% reporting no technical issues — despite 76% having never used this format before. A first contact with Mediaset that meets the reputational standards of the brand.' },
        { icon: TrendingUp, title: 'From project to method', text: 'The value demonstrated in Progetto GRAPE led Mediaset to spontaneously expand Skillvue to broader Talent Acquisition, with the Junior HR Business Partner selection (1,500+ applications). A strong signal of trust and perceived scalability.' },
      ],
    },
    vision: {
      badge: 'EVOLUTION 2026',
      title: 'From graduate program to Talent Acquisition strategy',
      intro: 'When Progetto GRAPE demonstrated that Skillvue could manage 3,000 applications in 5 weeks with 3 people and a positive candidate experience, the expansion to broader Talent Acquisition was the natural consequence.',
      objective: 'Extend the competency-based pre-screening model to all Mediaset Talent Acquisition processes, transforming a pilot project into a structural selection method.',
      bullets: [
        'Junior HR Business Partner selection already underway with 1,500+ applications',
        'Towards a model where every Mediaset selection process starts from objective competency data, not CVs',
        'Transition from pilot project (graduate program) to structural method for the entire Talent Acquisition',
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail · Hiring & Screening', headline: 'How Carrefour Italia is Hiring Better, Faster, and at Scale. Without Adding a Single Person to the Team.' },
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Internal Mobility', headline: 'How ADR democratized access to development for 5,000 people with Skillvue.' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function MediasetStoryPage() {
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
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #111128 50%, #0d0d1f 100%)' }} />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #4b4df7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b3be0 0%, transparent 40%)' }} />
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
                      <img src="/logos/mediaset-logo.png" alt="Mediaset logo" className="w-full h-full object-contain" />
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
                  <div className="mt-6 pt-6 border-t border-white/[0.08] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/[0.12] bg-white/[0.08] flex items-center justify-center">
                      <Users className="h-5 w-5 text-white/40" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">Luca Villari</p>
                      <p className="text-[12px] text-white/40 leading-[1.5]">HR / People Development Lead</p>
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
                <div className="flex flex-wrap gap-3">
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

              {/* Key metrics */}
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

              {/* Talent pipeline funnel */}
              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-6 block">{c.results.pipeline.label}</span>
                <div className="flex flex-col sm:flex-row items-stretch gap-0">
                  {c.results.pipeline.steps.map((step, i) => (
                    <div key={step.label} className="flex flex-col sm:flex-row items-center flex-1">
                      <div className="flex-1 rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm text-center">
                        <span className="block text-[1.4rem] font-black text-[#1A1A2E] leading-none tracking-tight mb-2">{step.value}</span>
                        <span className="text-[12px] text-[#1A1A2E]/50 leading-[1.4]">{step.label}</span>
                      </div>
                      {i < c.results.pipeline.steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-[#4b4df7]/40 shrink-0 mx-2 my-2 sm:my-0 rotate-90 sm:rotate-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualitative impact */}
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
