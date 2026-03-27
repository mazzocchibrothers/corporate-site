// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Plane, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle, Wrench } from 'lucide-react';
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
      before: 'Come Aeroporti di Roma ha ',
      highlight1: 'democratizzato',
      middle: " l'accesso allo sviluppo per ",
      highlight2: '5.000 persone',
      after: '',
    },
    subtitle: "Con Skillvue, ADR ha incrementato la velocità di assessment delle risorse interne e trasformato lo sviluppo del talento in vera e propria leva strategica.",
    heroMetrics: [
      { value: '-97%', label: 'time-to-process' },
      { value: '3-4 giorni', label: 'tempo attuale' },
      { value: '3-4 mesi', label: 'tempo precedente' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Dipendenti', value: '5.000' },
        { label: 'Aeroporti', value: 'Fiumicino e Ciampino' },
        { label: 'Gruppo', value: 'Mundys' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Aeroporti di Roma (ADR) gestisce tra Fiumicino e Ciampino circa <strong className="text-[#1A1A2E]/80 font-semibold">5.000 dipendenti</strong>, di cui 4.000 operativi. Il rimbalzo post-COVID ha imposto una velocità senza precedenti di assunzioni: <strong className="text-[#1A1A2E]/80 font-semibold">oltre 2.000 contratti a tempo determinato nel solo 2023</strong>, con una conseguente crescita dell'organico proseguita a ritmi sostenuti fino ai giorni recenti. Il team HR, davanti a questa popolazione aziendale così ampia, aveva un obiettivo chiaro: identificare e sviluppare i profili ad alto potenziale, garantendo opportunità di valorizzazione e crescita eque per tutti. Il modello di valutazione utilizzato fino a quel momento non riusciva a intercettare tutti i talenti con chiarezza: l'accesso alle opportunità di sviluppo interno era infatti guidato dalle segnalazioni dei responsabili.
      </>,
      summary: "Il progetto ha trasformato l'assessment da strumento necessariamente riservato a pochi a un sistema scalabile e democratico, estendendo per la prima volta percorsi di sviluppo strutturati all'intera popolazione aziendale, inclusi i dipendenti operativi precedentemente esclusi.",
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: 'Garantire a tutta la popolazione aziendale, non solo ai ruoli corporate, pari accesso a percorsi di sviluppo e valutazione non era facile, soprattutto mantenendo la qualità e il rigore che una realtà pubblica richiede. Il modello precedente non era scalabile e lasciava invisibili le competenze di migliaia di dipendenti.',
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Users,
          title: 'Talento invisibile, sviluppo accessibile solo a pochi',
          text: "Su 5.000 dipendenti, solo 1.000 corporate avevano accesso a percorsi strutturati di assessment e crescita. I 4.000 operativi non potevano essere ugualmente valutati, lasciando ADR senza visibilità sul potenziale interno.",
        },
        {
          icon: Scale,
          title: 'Vincolo regolatorio e domanda di trasparenza',
          text: "Ogni processo di valutazione deve anche reggere allo scrutinio del regolatore: servivano fondamenta psicometriche solide e garanzia di trasparenza nei criteri di selezione e nei feedback per i percorsi di crescita.",
        },
        {
          icon: TrendingUp,
          title: 'Rischio turnover legato alla mancanza di prospettive',
          text: "Senza percorsi di sviluppo chiari e accessibili, i profili più motivati erano i primi a rischio di ricerca di nuove opportunità altrove, con un potenziale impatto negativo sulla retention.",
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: 'Sviluppo guidato dalle segnalazioni dei responsabili',
          text: 'Le decisioni su chi sviluppare e promuovere dipendevano dalle indicazioni del manager diretto, senza dati oggettivi a supporto. Il potenziale non segnalato restava invisibile.',
        },
        {
          icon: BarChart3,
          title: 'Assessment non accessibili a tutta la popolazione',
          text: 'I percorsi di valutazione strutturata erano riservati ai ruoli corporate. I dipendenti operativi non avevano mai avuto accesso a strumenti formali di assessment.',
        },
        {
          icon: Layers,
          title: 'Assessment non scalabili e troppo lenti',
          text: 'Ogni processo richiedeva test in presenza, colloqui individuali e fino a 3-4 mesi di gestione — tempi incompatibili con le esigenze di business, in particolare per le selezioni interne.',
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Users, text: "Democratizzare l'accesso all'assessment: garantire a tutti i 5.000 dipendenti pari opportunità di sviluppo, non solo al personale corporate" },
        { icon: Target, text: 'Oggettivare la valutazione: passare dal giudizio soggettivo del singolo responsabile a un assessment strutturato e data-driven sulle competenze, incluse le soft skill per i ruoli operativi' },
        { icon: Zap, text: 'Scalare senza sacrificare la qualità: processare le candidature interne in giorni anziché mesi, preservando il rigore psicometrico' },
        { icon: Layers, text: 'Costruire un modello human-in-the-loop: lo strumento deve supportare le decisioni manageriali con dati, non sostituirle — intelligenza aumentata, non automazione del giudizio' },
        { icon: Shield, text: 'Rispondere alla domanda di trasparenza: fornire a ogni dipendente criteri chiari e feedback strutturati sui percorsi di crescita, rafforzando la fiducia nel processo di sviluppo interno' },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Skillvue è stato integrato nella People Strategy esistente di ADR, che già includeva un modello di leadership e percorsi di crescita strutturati Il team People Science di Skillvue ha lavorato con ADR per allineare la piattaforma al modello di competenze aziendale.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Wrench, label: 'Competenze tecniche (role-specific, adattate al modello di competenze di ADR)' },
        { icon: CheckCircle, label: 'Lingua inglese (come competenza tecnica)' },
        { icon: Heart, label: 'Soft skills' },
      ],
      methodologyLabel: 'METODOLOGIA',
      methodology: [
        {
          title: 'Assessment multi-step strutturato',
          text: 'Un percorso a più fasi: filtro dei prerequisiti, test di inglese, test tecnico, assessment delle soft skill, assessment center in presenza per i top-ranked, decisione finale manageriale.',
        },
        {
          title: 'Invito aperto e inclusivo',
          text: 'Tutti i dipendenti eleggibili sono invitati a partecipare, senza pre-selezione da parte dei responsabili. Una scelta per garantire equità di accesso e far emergere talento nascosto.',
        },
        {
          title: 'Change management sul campo',
          text: "Per i ruoli corporate l'adozione è stata immediata. Per i ruoli operativi è stato scelto un accompagnamento strutturato: sessioni guidate in sede e supporto on-site nelle prime fasi di assessment.",
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: 'I risultati misurabili ottenuti da ADR attraverso l\'adozione di Skillvue per la gestione dei processi di sviluppo interno.',
      metrics: [
        { value: '-97%', label: 'Time-to-process' },
        { value: '4.000', label: 'Operativi inclusi per la prima volta' },
        { value: 'Giorni, non settimane', label: 'lunghezza del processo di selezione interna' },
      ],
      qualitative: [
        { icon: Users, title: 'Democratizzazione dello sviluppo', text: 'Ogni dipendente può ora partecipare alle selezioni interne con pari opportunità. Per la prima volta, lo sviluppo professionale è un diritto accessibile a tutti i 5.000 dipendenti, non un privilegio riservato ai ruoli corporate.' },
        { icon: Eye, title: 'Talento nascosto scoperto', text: 'ADR ha individuato profili ad alto potenziale in ruoli operativi dove prima non esisteva alcuna visibilità. Persone di valore che sarebbero rimaste invisibili con il vecchio approccio basato sul solo giudizio del responsabile.' },
        { icon: Scale, title: 'Valutazione oggettivata e difendibile', text: 'Le decisioni sono ora supportate da dati strutturati sulle competenze, non più da sole opinioni soggettive. Un aspetto cruciale per un concessionario pubblico che deve poter giustificare ogni processo davanti al regolatore.' },
        { icon: Layers, title: 'Primo vero modello human-in-the-loop', text: "L'assessment non produce un verdetto ma informazioni che alimentano un processo decisionale manageriale consapevole. Lo sforzo cognitivo per i manager aumenta, perché ora hanno dati su cui decidere - nessun assessore esterno a cui delegare la responsabilità." },
        { icon: TrendingUp, title: 'Risposta concreta alla domanda di trasparenza', text: "I dipendenti hanno ora visibilità su criteri di selezione chiari e ricevono feedback strutturati sul proprio percorso professionale — con un impatto percepito e concreto sulla employee experience." },
      ],
    },
    vision: {
      badge: 'EVOLUZIONE 2026',
      title: 'Da sviluppo interno a talent strategy integrata su tutta la workforce',
      intro: "Quando l'assessment sullo sviluppo interno ha dimostrato di essere scalabile e rigoroso, il passo naturale è stato estenderlo anche alla selezione esterna, eliminando la discontinuità tra come si valuta chi è già in azienda e come si seleziona chi entra.",
      objective: 'Costruire un unico ciclo coerente in cui selezione e sviluppo seguono la stessa logica, per tutta la popolazione aziendale.',
      bullets: [
        'Estensione di Skillvue a tutte le selezioni interne nel 2026',
        'Integrazione nel Talent Acquisition per creare continuità tra selezione esterna e sviluppo interno',
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO · Mobilità Interna', headline: "~900 persone valutate. Una pipeline di Store Manager costruita dall'interno." },
        { id: 'credem', company: 'Credem', tag: 'Banking & Finance · Sviluppo', headline: 'Competenze e sviluppo del talento nel settore bancario.' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'How Aeroporti di Roma ',
      highlight1: 'democratized',
      middle: ' access to development for ',
      highlight2: '5,000 people',
      after: '',
    },
    subtitle: 'With Skillvue, ADR transformed talent development into a true strategic lever.',
    heroMetrics: [
      { value: '-97%', label: 'time-to-process' },
      { value: '3–4 days', label: 'current time' },
      { value: '3–4 months', label: 'previous time' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Employees', value: '5,000' },
        { label: 'Airports', value: 'Fiumicino and Ciampino' },
        { label: 'Group', value: 'Mundys' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Aeroporti di Roma (ADR) manages Fiumicino and Ciampino with approximately <strong className="text-[#1A1A2E]/80 font-semibold">5,000 employees</strong>, of which 4,000 operational. The post-COVID traffic rebound imposed unprecedented hiring speed: <strong className="text-[#1A1A2E]/80 font-semibold">over 2,000 fixed-term contracts in 2023 alone</strong>, with sustained headcount growth continuing to the present day. The HR team, faced with this large workforce, had a clear objective: identify and develop high-potential profiles, ensuring fair opportunities for growth and recognition for all. The assessment model in use at the time could not identify all talent with clarity: access to internal development opportunities was driven by manager nominations.
      </>,
      summary: 'The project transformed the assessment from a tool necessarily reserved for the few into a scalable and democratic system, extending structured development paths for the first time to the entire workforce, including operational employees who had previously been excluded.',
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: 'Guaranteeing the entire workforce — not just corporate roles — equal access to development and assessment pathways was no easy task, especially while maintaining the quality and rigour that a public entity requires. The previous model was not scalable and left the competencies of thousands of employees invisible.',
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Users,
          title: 'Invisible talent, development accessible only to a few',
          text: 'Out of 5,000 employees, only 1,000 corporate staff had access to structured assessment and growth paths. The 4,000 operational employees had never been assessed, leaving ADR with no visibility on internal potential.',
        },
        {
          icon: Scale,
          title: 'Regulatory constraints and demand for transparency',
          text: 'Every assessment process must also withstand regulatory scrutiny: solid psychometric foundations were required, along with guaranteed transparency in selection criteria and feedback for career development paths.',
        },
        {
          icon: TrendingUp,
          title: 'Turnover risk tied to lack of clear career paths',
          text: 'Without clear and accessible development paths, the most motivated employees were the first at risk of seeking new opportunities elsewhere — with a potential negative impact on retention.',
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: 'Development driven by manager nominations',
          text: 'Decisions on who to develop and promote depended on direct manager signals, without objective data to support them. Unrecognised potential remained invisible.',
        },
        {
          icon: BarChart3,
          title: 'Assessments not accessible to the entire workforce',
          text: 'Structured assessment paths were reserved for corporate roles. Operational employees had never had access to formal assessment tools.',
        },
        {
          icon: Layers,
          title: 'Assessments not scalable and too slow',
          text: 'Every process required in-person tests, individual interviews, and up to 3–4 months of management — timelines incompatible with business needs, especially for internal selections.',
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Users, text: 'Democratize access to assessment: guarantee all 5,000 employees equal development opportunities, not just corporate staff' },
        { icon: Target, text: 'Objectify evaluation: move from subjective individual manager judgment to a structured, data-driven competency assessment, including soft skills for operational roles' },
        { icon: Zap, text: 'Scale without sacrificing quality: process internal applications in days instead of months, while preserving psychometric rigour' },
        { icon: Layers, text: 'Build a human-in-the-loop model: the tool must support managerial decisions with data, not replace them — augmented intelligence, not automation of judgment' },
        { icon: Shield, text: 'Respond to the demand for transparency: give every employee clear criteria and structured feedback on career growth paths, strengthening trust in the internal development process' },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "Skillvue's People Science team worked with ADR to align the platform with the company's competency model.",
      streamsLabel: 'TWO PROJECT STREAMS',
      streams: [
        {
          title: 'Internal Job Posting',
          text: "For the roughly 20 annual internal selections, each drawing over 25 applications, Skillvue introduced an objective first filter based on technical competencies and role-relevant soft skills. The standardised assessment rapidly identifies suitable candidates, removing subjectivity from pre-selection and ensuring uniform, fair, merit-based criteria.",
        },
        {
          title: 'Career Growth — Vertical Progression',
          text: "For the roughly 30 annual opportunities to move into higher-responsibility roles — each generating hundreds of applications — Skillvue evaluates the full set of required competencies, from soft skills to technical knowledge. The system returns detailed reports to both managers and candidates, making the process transparent and data-driven rather than opinion-based.",
        },
      ],
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Wrench, label: 'Technical competencies (role-specific, adapted to ADR\'s competency model)' },
        { icon: CheckCircle, label: 'English language (as a technical competency)' },
        { icon: Heart, label: 'Soft skills' },
      ],
      methodologyLabel: 'METHODOLOGY',
      methodology: [
        {
          title: 'Structured multi-step assessment',
          text: 'A multi-phase process: prerequisite filtering, English language test, technical test, soft skills assessment, in-person assessment center for top-ranked candidates, final managerial decision.',
        },
        {
          title: 'Open and inclusive invitation',
          text: 'All eligible employees are invited to participate, with no pre-selection by line managers. A deliberate choice to guarantee equal access and surface hidden talent.',
        },
        {
          title: 'On-the-ground change management',
          text: 'For corporate roles, adoption was immediate. For operational roles, a structured accompaniment was chosen: guided on-site sessions and on-site support during the early assessment phases.',
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The measurable outcomes ADR achieved through Skillvue across its internal development processes.',
      metrics: [
        { value: '-97%', label: 'Time-to-process' },
        { value: '4,000', label: 'Operational staff included for the first time' },
        { value: 'Days, not weeks', label: 'length of the internal selection process' },
      ],
      qualitative: [
        { icon: Users, title: 'Democratization of development', text: 'Every employee can now participate in internal selections with equal opportunity. For the first time, professional development is a right accessible to all 5,000 employees, not a privilege reserved for corporate roles.' },
        { icon: Eye, title: 'Hidden talent discovered', text: "ADR identified high-potential profiles in operational roles where no visibility previously existed. Valuable people who would have remained invisible under the old approach based solely on manager judgment." },
        { icon: Scale, title: 'Objectified and defensible evaluation', text: 'Decisions are now supported by structured competency data, no longer by subjective opinions alone. A crucial aspect for a public concession holder that must be able to justify every process before the regulator.' },
        { icon: Layers, title: 'First true human-in-the-loop model', text: 'The assessment does not produce a verdict but information that feeds a conscious managerial decision-making process. The cognitive effort for managers increases, because they now have data to decide on — no external assessor to delegate responsibility to.' },
        { icon: TrendingUp, title: 'A concrete answer to the demand for transparency', text: "Employees now have visibility into clear selection criteria and receive structured feedback on their professional trajectory — with a perceived and concrete impact on employee experience." },
      ],
    },
    vision: {
      badge: 'EVOLUTION 2026',
      title: 'From internal development to an integrated talent strategy across the entire workforce',
      intro: 'When the internal development assessment proved to be scalable and rigorous, the natural step was to extend it to external recruitment as well, eliminating the disconnect between how existing employees are evaluated and how new hires are selected.',
      objective: 'Build a single coherent cycle in which selection and development follow the same logic, for the entire workforce.',
      bullets: [
        'Extension of Skillvue to all internal selections in 2026',
        'Integration into Talent Acquisition to create continuity between external selection and internal development',
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO · Internal Mobility', headline: '~900 people assessed. A Store Manager pipeline built from within.' },
        { id: 'credem', company: 'Credem', tag: 'Banking & Finance · Development', headline: 'Skills and talent development in the banking sector.' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function ADRStoryPage() {
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
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #111128 50%, #0d0d1f 100%)' }} />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #4b4df7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b3be0 0%, transparent 40%)' }} />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Aeroporti di Roma</span>
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
                      <img src="/logos/adr-logo.jpg" alt="ADR logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Aeroporti di Roma</p>
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
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/[0.12]">
                      <img src="/logos/adr-alberto.jpg" alt="Alberto Valenza" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">Alberto Valenza</p>
                      <p className="text-[12px] text-white/40 leading-[1.5]">SVP Human Capital, Organization & Procurement</p>
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

              {c.solution.streams && (
                <div className="mb-12">
                  <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.streamsLabel}</span>
                  <div className="grid md:grid-cols-2 gap-5">
                    {c.solution.streams.map((s, i) => (
                      <div key={s.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm relative overflow-hidden">
                        <span className="absolute top-5 right-6 text-[3rem] font-black leading-none select-none" style={{ color: 'rgba(75,77,247,0.04)' }}>0{i + 1}</span>
                        <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4] relative">{s.title}</h4>
                        <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65] relative">{s.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
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
