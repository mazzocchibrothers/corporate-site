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
    badge: 'CASE STUDY',
    headline: {
      before: 'Come Douglas ha mappato le competenze di ',
      highlight1: '2.200 persone',
      middle: ' su 370 store in sole ',
      highlight2: '5 settimane',
      after: '',
    },
    subtitle: "Una rete vendita di 2.500 dipendenti distribuita su quasi 400 punti vendita, nessuna visibilità sulle competenze e un turnover elevato tipico del retail. Con Skillvue, Douglas ha creato per la prima volta un database completo di competenze dell'intera forza lavoro, accorciando la distanza tra HQ e rete vendita e abilitando percorsi di crescita basati sui dati.",
    heroMetrics: [
      { value: '2.200', label: 'persone mappate' },
      { value: '5 sett.', label: 'tempo di mappatura' },
      { value: '88%', label: 'tasso di completion' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Dipendenti', value: '2.500 (rete vendita Southern Europe)' },
        { label: 'Punti vendita', value: '370+' },
        { label: 'Gruppo', value: 'Douglas Group' },
        { label: 'Paesi', value: '19' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Il Gruppo Douglas, con oltre <strong className="text-[#1A1A2E]/80 font-semibold">1.800 profumerie in 19 paesi europei</strong>, è uno dei player più importanti nel mercato europeo del beauty e della cosmetica. Presente in Italia dal <strong className="text-[#1A1A2E]/80 font-semibold">2017</strong> con l'acquisizione del Gruppo LLG Limoni La Gardenia, Douglas è stata la prima realtà del settore a istituire una catena di profumerie sul territorio nazionale, con oltre <strong className="text-[#1A1A2E]/80 font-semibold">370 punti vendita</strong> inseriti dal 2021 nella Southern Europe Region del Gruppo. L'azienda opera con una rete vendita di circa <strong className="text-[#1A1A2E]/80 font-semibold">2.500 persone</strong> distribuite su quasi <strong className="text-[#1A1A2E]/80 font-semibold">400 store</strong>, con la frequente percezione di distanza dalla sede centrale. L'HQ non disponeva di <strong className="text-[#1A1A2E]/80 font-semibold">alcun dato oggettivo sulle competenze</strong> della forza lavoro nei punti vendita: l'unica fonte erano i feedback soggettivi dei responsabili di negozio o di area. In un contesto caratterizzato da <strong className="text-[#1A1A2E]/80 font-semibold">alti tassi di turnover</strong>, soprattutto nelle fasce più giovani, e da una crescente talent scarcity nel settore beauty/retail, il team HR ha riconosciuto nella tecnologia di Skillvue il giusto alleato per adottare un approccio smart e data-driven alla gestione del talento.      </>,
      summary: "Il progetto ha trasformato la gestione del talento da un modello basato su feedback soggettivi e osservazione in presenza a un sistema scalabile e data-driven, creando per la prima volta una fotografia completa e oggettiva delle competenze dell'intera rete vendita — soft skill e hard skill — e abilitando percorsi di crescita, mobilità interna e formazione customizzata basati su dati reali.",
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: "Con 2.500 dipendenti distribuiti su quasi 400 punti vendita e un team HR di sole 3 persone operative, Douglas si trovava davanti a un problema strutturale: l'HQ non sapeva nulla sulle competenze della propria forza lavoro. In un settore con turnover elevato e percorsi di carriera in rapida evoluzione, l'assenza di dati significava perdere talento, non investire sulla formazione giusta e non riuscire a pianificare la mobilità interna. Il modello precedente, basato sull'osservazione in presenza e sui feedback dei manager, non era sostenibile né scalabile.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Eye,
          title: 'Zero visibilità sulle competenze della rete vendita',
          text: "Su 2.500 dipendenti distribuiti in quasi 400 punti vendita, l'HQ non disponeva di alcun dato strutturato sulle competenze e il potenziale della forza lavoro. Le uniche informazioni provenivano dai feedback soggettivi dei responsabili di negozio o di area, con risultati disomogenei tra le sedi e nessuna possibilità di confronto oggettivo. Senza dati, ogni decisione su crescita, formazione e mobilità interna era basata su impressioni, non su evidenze.",
        },
        {
          icon: Users,
          title: 'Forte distanza tra HQ e rete vendita',
          text: "La rete vendita percepiva una forte disconnessione dalla sede centrale. I dipendenti nei punti vendita non avevano opportunità strutturate per far emergere le proprie competenze e aspirazioni di crescita. Il talento restava invisibile e non valorizzato, con un impatto diretto sull'engagement e sulla retention in un settore già caratterizzato da alta rotazione.",
        },
        {
          icon: TrendingUp,
          title: 'Turnover elevato e talent scarcity crescente',
          text: "Il settore beauty/retail soffre di tassi di turnover elevati, soprattutto tra le fasce più giovani, e di una crescente scarsità di talento. Ogni perdita di una persona di valore rappresentava un costo diretto e indiretto significativo. Senza la capacità di identificare e valorizzare proattivamente i talenti interni, il rischio di perdere le persone migliori era costante e crescente.",
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: 'Analisi delle competenze non sostenibile',
          text: "Il modello precedente prevedeva l'osservazione in presenza da parte di responsabili di negozio o di area, con tempi lunghi, costi elevati e risultati disomogenei tra le sedi. Con 2.500 persone sul territorio, raccogliere informazioni sulle competenze come in passato non era più pensabile. Serviva un approccio data-driven e altamente scalabile, sostenibile sia dal punto di vista economico che delle tempistiche.",
        },
        {
          icon: Layers,
          title: 'Sviluppo riservato al 5-10% della popolazione',
          text: "Il concetto di talento era ancora legato al tradizionale 5-10% della popolazione aziendale proiettato verso una crescita verticale. Mancava la capacità di lavorare su scala, partendo da un'analisi dell'intera popolazione aziendale — per quanto ampia e frammentata sul territorio — per offrire opportunità di crescita a tutti i talenti in azienda, non solo ai pochi già identificati.",
        },
        {
          icon: BarChart3,
          title: 'Nessun feedback strutturato ai dipendenti',
          text: "I dipendenti della rete vendita non ricevevano alcun feedback oggettivo sulle proprie competenze. L'assenza di una restituzione strutturata limitava la possibilità di lavorare preventivamente sui bisogni formativi e sulle aspirazioni di crescita, lasciando l'iniziativa di sviluppo interamente nelle mani del singolo responsabile.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Eye, text: "Fotografare in maniera oggettiva e immediata le competenze dell'intera rete vendita: un'analisi standardizzata su tutti i 2.500 dipendenti, su tutti i ruoli (Beauty Advisor, Sales Assistant, Store Manager) e su tutte le seniority" },
        { icon: Zap, text: "Ottimizzare tempi e costi dell'analisi delle competenze interne: renderli sostenibili per i tassi di turnover e la velocità del mercato del lavoro, sostituendo l'osservazione in presenza con un sistema scalabile" },
        { icon: TrendingUp, text: "Promuovere percorsi di crescita interna e ridurre il turnover: identificare persone ad alto potenziale e propensioni a ruoli diversi per agevolare spostamenti interni orizzontali e verticali, riducendo gli effort di selezione dall'esterno" },
        { icon: Target, text: "Lavorare preventivamente su formazione e sviluppo: costruire un database di competenze condiviso che permetta di attivare percorsi formativi customizzati per colmare i gap esistenti e pianificare lo sviluppo della forza lavoro" },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Skillvue è stato adottato direttamente con un contratto full, senza pilota preliminare — una scelta che testimonia la fiducia immediata nella soluzione. Il team People Science di Skillvue ha lavorato con l'HR di Douglas per allineare la piattaforma al modello di competenze aziendale e creare assessment calati sulle reali situazioni lavorative affrontate quotidianamente dai dipendenti nei punti vendita.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Wrench, label: 'Hard Skill Make-up & Skincare (personalizzate)' },
        { icon: Heart, label: 'Soft Skill trasversali' },
        { icon: Target, label: 'Competenze di vendita' },
        { icon: Users, label: 'Mix calibrato per ruolo' },
      ],
      methodologyLabel: 'METODOLOGIA',
      methodology: [
        {
          title: 'Hard Skill Test verticali per il beauty',
          text: "Per ottenere il massimo livello di predittività, sono stati creati Hard Skill Test personalizzati sulle competenze di vendita dell'area Make-up & Skincare, calati sulle reali situazioni lavorative quotidiane. Questi test verticali sono stati poi combinati con i Soft Skill Test della libreria Skillvue per costruire assessment completi e specifici per ciascun ruolo.",
        },
        {
          title: 'Assessment differenziati per ruolo',
          text: "Ogni ruolo — Beauty Advisor, Sales Assistant, Store Manager — ha ricevuto un assessment specifico con il mix più indicato di hard e soft skill, rispettando le specificità del modello di competenze aziendale Douglas. Un unico standard di misurazione, declinato sulle diverse responsabilità e competenze richieste.",
        },
        {
          title: 'Deployment diretto, senza pilota',
          text: "Nessun test preliminare su singole posizioni o ruoli: gli assessment sono stati erogati direttamente a tutti i 2.500 dipendenti sul territorio. Un approccio che ha permesso di ottenere una fotografia completa in tempi rapidi, con raccolta dell'output in sole 5 settimane. Il primo progetto di queste dimensioni nel portfolio Skillvue realizzato senza alcuna integrazione tecnica.",
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: "I risultati misurabili ottenuti da Douglas attraverso la mappatura delle competenze dell'intera rete vendita con Skillvue.",
      metrics: [
        { value: '2.200', label: 'Persone mappate', sublabel: 'Su una rete di 2.500 dipendenti (88% di completion rate)' },
        { value: '5 sett.', label: 'Tempo di mappatura', sublabel: "Per l'intera rete vendita su tutto il territorio nazionale" },
        { value: '370+', label: 'Punti vendita coinvolti', sublabel: 'Per copertura totale della rete' },
        { value: '3 ruoli', label: 'Profili analizzati', sublabel: 'Beauty Advisor, Sales Assistant, Store Manager' },
      ],
      qualitative: [
        { icon: Eye, title: 'Prima fotografia oggettiva delle competenze', text: "Per la prima volta, l'HQ dispone di una visione chiara e oggettiva dello skill set di ogni persona della rete vendita, sia sulle competenze tecniche del beauty che sulle soft skill trasversali. Un quadro direttamente fruibile dal team HR per effettuare analisi più rapide e consapevoli sulle aree di intervento." },
        { icon: Target, title: 'Talento nascosto e potenziale predittivo', text: "L'analisi ha portato un doppio risultato: da una parte fotografare lo skill set attuale di ogni persona, dall'altra individuare in maniera predittiva propensioni a ruoli diversi per il futuro. Questo ha agevolato la previsione di possibili spostamenti interni sia orizzontali che verticali, scoprendo talento dove prima non esisteva visibilità." },
        { icon: CheckCircle, title: 'Formazione customizzata e skill gap colmati', text: "Con i dati raccolti è stato possibile attivare percorsi di formazione customizzati per colmare gli skill gap esistenti e definire più rapidamente le ricollocazioni interne dei talenti. Il tempo e le risorse recuperate dall'efficientamento del processo sono stati reinvestiti in attività di sviluppo a maggior valore aggiunto." },
        { icon: Heart, title: 'Distanza HQ-rete vendita accorciata', text: "Ogni dipendente ha avuto per la prima volta l'opportunità di far emergere le proprie competenze e potenzialità direttamente verso l'HQ, senza la mediazione del solo feedback del responsabile. Un segnale concreto di attenzione e valorizzazione che ha contribuito a ridurre la percezione di distanza dalla sede centrale." },
        { icon: Zap, title: 'Ottimizzazione di tempi e costi', text: "L'inserimento degli Skill Assessment Agent di Skillvue ha permesso di ottimizzare i tempi e i costi della selezione dall'esterno e di limitare l'impegno di tempo dei responsabili di negozio o di area nel fornire feedback sul personale. Decisioni più informate su percorsi di crescita, mobilità e formazione." },
      ],
    },
    vision: {
      badge: 'EVOLUZIONE',
      title: 'Da mappatura una tantum a people strategy skills-based continua',
      intro: "La mappatura ha dimostrato che un approccio scalabile e data-driven alla gestione del talento è possibile anche su una rete frammentata di 2.500 persone. Il passo naturale è consolidare questo modello come standard continuo per tutte le decisioni sulle persone.",
      objective: "Trasformare la fotografia una tantum delle competenze in un sistema ricorrente e integrato, in cui ogni persona viene valutata, orientata e accompagnata con la stessa logica skills-based — dalla selezione alla mobilità interna allo sviluppo.",
      bullets: [
        "Consolidamento della mappatura competenze come processo ricorrente, non più one-shot, per mantenere il database sempre aggiornato rispetto al turnover e all'evoluzione dei ruoli",
        "Estensione del modello skills-based alla selezione dall'esterno, per allineare le competenze misurate in fase di hiring con quelle sviluppate internamente",
        "Verso un'organizzazione in cui le decisioni su crescita, mobilità e formazione si basano su dati oggettivi sulle competenze, su tutta la rete e su tutti i livelli",
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'unicomm', company: 'Unicomm', tag: 'Retail GDO · Sviluppo interno', headline: 'Come Unicomm sta costruendo un talent lifecycle skills-based su 270+ punti vendita.' },
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring at Scale', headline: 'Come Carrefour Italia ha trasformato la selezione di 30.000 candidature l\'anno con soli 3 recruiter.' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CASE STUDY',
    headline: {
      before: 'How Douglas mapped the skills of ',
      highlight1: '2,200 people',
      middle: ' across 370 stores in just ',
      highlight2: '5 weeks',
      after: '',
    },
    subtitle: "A retail network of 2,500 employees spread across nearly 400 stores, zero visibility on competencies, and the high turnover typical of retail. With Skillvue, Douglas created the first-ever complete skills database of its entire workforce, closing the gap between HQ and the sales network and enabling data-driven career development.",
    heroMetrics: [
      { value: '2,200', label: 'people mapped' },
      { value: '5 weeks', label: 'mapping timeframe' },
      { value: '88%', label: 'completion rate' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Employees', value: '2,500 (Southern Europe retail network)' },
        { label: 'Stores', value: '370+' },
        { label: 'Group', value: 'Douglas Group' },
        { label: 'Countries', value: '19' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Douglas Group, with over <strong className="text-[#1A1A2E]/80 font-semibold">1,800 perfumeries across 19 European countries</strong>, is one of the most important players in the European beauty and cosmetics market. Present in Italy since <strong className="text-[#1A1A2E]/80 font-semibold">2017</strong> following the acquisition of the LLG Limoni La Gardenia Group, Douglas was the first company in the sector to establish a perfumery chain across the country, with over <strong className="text-[#1A1A2E]/80 font-semibold">370 stores</strong> incorporated into the Group's Southern Europe Region since 2021. The company operates a retail network of approximately <strong className="text-[#1A1A2E]/80 font-semibold">2,500 people</strong> distributed across nearly <strong className="text-[#1A1A2E]/80 font-semibold">400 stores</strong>, with a frequent perception of distance from the central HQ. The HQ had <strong className="text-[#1A1A2E]/80 font-semibold">no objective competency data</strong> on its sales force: the only source was the subjective feedback of store or area managers. In a context characterised by <strong className="text-[#1A1A2E]/80 font-semibold">high turnover rates</strong>, especially among younger cohorts, and growing talent scarcity in the beauty/retail sector, the HR team identified Skillvue's technology as the right partner to adopt a smart, data-driven approach to talent management.      </>,
      summary: "The project transformed talent management from a model based on subjective feedback and in-person observation to a scalable, data-driven system — creating for the first time a complete and objective picture of skills across the entire sales network, both soft and hard skills, and enabling career development, internal mobility and customised training based on real data.",
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: "With 2,500 employees spread across nearly 400 stores and an HR team of just 3 operational people, Douglas faced a structural problem: the HQ knew nothing about the competencies of its workforce. In a sector with high turnover and fast-evolving career paths, the absence of data meant losing talent, misallocating training investment, and being unable to plan internal mobility. The previous model — based on in-person observation and manager feedback — was neither sustainable nor scalable.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Eye,
          title: 'Zero visibility on sales force competencies',
          text: "Across 2,500 employees in nearly 400 stores, the HQ had no structured data on the competencies and potential of the workforce. The only information came from the subjective feedback of store or area managers, with inconsistent results across locations and no possibility of objective comparison. Without data, every decision on growth, training and internal mobility was based on impressions, not evidence.",
        },
        {
          icon: Users,
          title: 'A strong gap between HQ and the retail network',
          text: "The retail network felt a strong disconnect from the central office. Employees in stores had no structured opportunities to surface their competencies and growth aspirations. Talent remained invisible and undervalued, with a direct impact on engagement and retention in a sector already characterised by high rotation.",
        },
        {
          icon: TrendingUp,
          title: 'High turnover and growing talent scarcity',
          text: "The beauty/retail sector suffers from high turnover rates, especially among younger cohorts, and growing talent scarcity. Every loss of a valuable person represented a significant direct and indirect cost. Without the ability to proactively identify and develop internal talent, the risk of losing the best people was constant and increasing.",
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: 'Unsustainable competency analysis model',
          text: "The previous model involved in-person observation by store or area managers, with long lead times, high costs and inconsistent results across locations. With 2,500 people spread across the territory, gathering competency information the old way was no longer feasible. A data-driven and highly scalable approach was needed — sustainable both economically and in terms of speed.",
        },
        {
          icon: Layers,
          title: 'Development reserved for only 5–10% of the workforce',
          text: "The concept of talent was still tied to the traditional 5–10% of the organisation projected towards vertical growth. There was no capability to work at scale — starting from an analysis of the entire workforce, however large and geographically fragmented — to offer growth opportunities to all talent in the company, not just the few already identified.",
        },
        {
          icon: BarChart3,
          title: 'No structured feedback to employees',
          text: "Sales network employees received no objective feedback on their own competencies. The absence of structured feedback limited the ability to proactively address training needs and growth aspirations, leaving development entirely at the discretion of each individual line manager.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Eye, text: "Map the competencies of the entire retail network in an objective, immediate way: a standardised assessment across all 2,500 employees, all roles (Beauty Advisor, Sales Assistant, Store Manager) and all seniority levels" },
        { icon: Zap, text: "Optimise the time and cost of internal competency analysis: make it sustainable given turnover rates and the pace of the labour market, replacing in-person observation with a scalable system" },
        { icon: TrendingUp, text: "Promote internal career paths and reduce turnover: identify high-potential people and propensities for different roles to facilitate horizontal and vertical internal moves, reducing the need for external hiring" },
        { icon: Target, text: "Work proactively on training and development: build a shared competency database to activate customised learning paths that close existing skill gaps and plan workforce development" },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "Skillvue was adopted directly on a full contract, with no preliminary pilot — a choice that reflects immediate trust in the solution. Skillvue's People Science team worked with Douglas's HR team to align the platform to the company's competency model and build assessments grounded in the real daily work situations faced by employees in the stores.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Wrench, label: 'Make-up & Skincare Hard Skills (custom)' },
        { icon: Heart, label: 'Cross-functional Soft Skills' },
        { icon: Target, label: 'Sales competencies' },
        { icon: Users, label: 'Role-calibrated mix' },
      ],
      methodologyLabel: 'METHODOLOGY',
      methodology: [
        {
          title: 'Vertical Hard Skill Tests for beauty',
          text: "To achieve the highest level of predictivity, custom Hard Skill Tests were created for Make-up & Skincare sales competencies, grounded in the real daily work situations. These vertical tests were then combined with Soft Skill Tests from the Skillvue library to build complete, role-specific assessments.",
        },
        {
          title: 'Role-differentiated assessments',
          text: "Each role — Beauty Advisor, Sales Assistant, Store Manager — received a specific assessment with the most appropriate mix of hard and soft skills, respecting the specificities of Douglas's competency model. One measurement standard, adapted to the different responsibilities and competencies required.",
        },
        {
          title: 'Direct deployment, no pilot',
          text: "No preliminary testing on individual positions or roles: assessments were deployed directly to all 2,500 employees across the territory. An approach that delivered a complete skills picture in record time, with all output collected in just 5 weeks — the first project of this scale in Skillvue's portfolio completed without any technical integration.",
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The measurable outcomes Douglas achieved through the competency mapping of its entire retail network with Skillvue.',
      metrics: [
        { value: '2,200', label: 'People mapped', sublabel: 'Across a network of 2,500 employees (88% completion rate)' },
        { value: '5 weeks', label: 'Mapping timeframe', sublabel: 'For the entire national retail network' },
        { value: '370+', label: 'Stores involved', sublabel: 'Full network coverage' },
        { value: '3 roles', label: 'Profiles assessed', sublabel: 'Beauty Advisor, Sales Assistant, Store Manager' },
      ],
      qualitative: [
        { icon: Eye, title: 'First objective picture of competencies', text: "For the first time, the HQ has a clear, objective view of every person's skill set across the retail network — both technical beauty competencies and cross-functional soft skills. A picture directly usable by the HR team for faster, more informed analyses of where to intervene." },
        { icon: Target, title: 'Hidden talent and predictive potential', text: "The analysis delivered a dual result: capturing each person's current skill set, while also predictively identifying propensities for different roles in the future. This facilitated the anticipation of possible internal moves — both horizontal and vertical — revealing talent where no visibility previously existed." },
        { icon: CheckCircle, title: 'Customised training and skill gaps closed', text: "With the collected data it was possible to activate customised training paths to close existing skill gaps and define internal talent redeployments more quickly. The time and resources freed by streamlining the process were reinvested in higher-value development activities." },
        { icon: Heart, title: 'HQ-to-network distance closed', text: "Every employee had the opportunity, for the first time, to surface their competencies and potential directly to the HQ — without the sole mediation of their line manager's feedback. A concrete signal of recognition and development focus that contributed to reducing the perceived distance from the central office." },
        { icon: Zap, title: 'Time and cost optimisation', text: "Deploying Skillvue's Skill Assessment Agents optimised the time and cost of external hiring and reduced the time burden on store and area managers for providing staff feedback. More informed decisions on career paths, mobility and training." },
      ],
    },
    vision: {
      badge: 'EVOLUTION',
      title: 'From a one-off mapping to a continuous skills-based people strategy',
      intro: "The mapping demonstrated that a scalable, data-driven approach to talent management is possible even across a fragmented network of 2,500 people. The natural next step is to consolidate this model as the ongoing standard for all people decisions.",
      objective: "Transform the one-off competency snapshot into a recurring, integrated system in which every person is assessed, guided and supported with the same skills-based logic — from hiring through to internal mobility and development.",
      bullets: [
        "Consolidation of competency mapping as a recurring process — not one-shot — to keep the database continuously updated as turnover and role evolution happen",
        "Extension of the skills-based model to external hiring, aligning the competencies measured during the hiring process with those developed internally",
        "Towards an organisation where decisions on growth, mobility and training are based on objective competency data, across the entire network and at every level",
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'unicomm', company: 'Unicomm', tag: 'GDO Retail · Internal Development', headline: 'How Unicomm is building a skills-based talent lifecycle across 270+ stores.' },
        { id: 'carrefour', company: 'Carrefour', tag: 'GDO Retail · Hiring at Scale', headline: 'How Carrefour Italia transformed the screening of 30,000 applications a year with just 3 recruiters.' },
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
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #111128 50%, #0d0d1f 100%)' }} />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #4b4df7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b3be0 0%, transparent 40%)' }} />
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
                      <img src="/logos/douglas-logo.png" alt="Douglas logo" className="w-full h-full object-contain" />
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
                  <div className="mt-6 pt-6 border-t border-white/[0.08] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/[0.12] bg-white/[0.08] flex items-center justify-center">
                      <Users className="h-5 w-5 text-white/30" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">Stefania de Martino</p>
                      <p className="text-[12px] text-white/40 leading-[1.5]">Head of Talent Acquisition, L&D, Product Training, Employer Branding</p>
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
