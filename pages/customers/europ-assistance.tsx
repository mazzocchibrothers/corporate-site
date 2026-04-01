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
      before: 'Come Europ Assistance ha assunto il ',
      highlight1: '24% in più',
      middle: ' con il ',
      highlight2: '18% di colloqui in meno',
      after: '',
    },
    subtitle: "Un team HR di 3 persone, migliaia di candidature ricevute, quasi 2.000 candidati valutati per coprire posizioni vacanti su più sedi. Con Skillvue, Europ Assistance ha trasformato lo screening da collo di bottiglia a vantaggio competitivo e ora estende il modello allo sviluppo interno.",
    heroMetrics: [
      { value: '+24%', label: 'assunzioni anno su anno' },
      { value: '-18%', label: 'colloqui necessari' },
      { value: '76%', label: 'tasso colloquio-assunzione' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Gruppo', value: 'Generali' },
        { label: 'Sedi', value: 'Assago (MI) e Rende (CS)' },
        { label: 'Team HR', value: '3 FTE' },
        { label: 'Settore', value: 'Assicurazioni' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Europ Assistance, parte del <strong className="text-[#1A1A2E]/80 font-semibold">Gruppo Generali</strong>, affronta <strong className="text-[#1A1A2E]/80 font-semibold">due picchi stagionali di assunzioni all’anno</strong>, generando volumi di candidature nell’ordine delle migliaia. Un team HR di sole <strong className="text-[#1A1A2E]/80 font-semibold">3 persone</strong> gestisce l’intero ciclo di selezione su più sedi. I ruoli richiedono soft skill fondamentali — problem solving, orientamento al cliente, comunicazione — impossibili da rilevare dal CV. Europ Assistance cercava non solo efficienza, ma un cambio di paradigma: <strong className="text-[#1A1A2E]/80 font-semibold">selezionare per il potenziale, non solo per il fit immediato.</strong>
      </>,
      summary: "Il progetto ha trasformato il pre-screening da attività manuale che assorbiva il tempo dei recruiter a un processo AI-driven che filtra il 96% delle candidature prima del colloquio, liberando il team per concentrarsi su valutazione approfondita e analisi del potenziale. Il valore dimostrato nella selezione ha portato all’espansione verso la mappatura delle competenze interne.",
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: "Con picchi stagionali di migliaia di candidature e soli 3 FTE nel team HR, il vincolo era chiaro: scalare la qualità della selezione senza moltiplicare le risorse. Ogni ruolo richiedeva soft skill invisibili dal CV, decisive per il successo nel customer care.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Users,
          title: 'Volumi massivi con team minimo',
          text: "Migliaia di candidature con picchi stagionali concentrati in 3-4 mesi, gestite da 3 persone. Il tempo dei recruiter era assorbito dallo screening iniziale invece di colloqui e valutazione del potenziale.",
        },
        {
          icon: Eye,
          title: 'Le soft skill decisive sono invisibili nel CV',
          text: "Problem solving, orientamento al cliente e gestione dello stress sono il primo predittore di successo nei ruoli di assistenza, ma impossibili da rilevare da CV o screening telefonico.",
        },
        {
          icon: TrendingUp,
          title: 'Bacino di candidati in contrazione',
          text: "Il calo demografico restringe il pool disponibile, alzando il rischio di ogni assunzione. Non basta trovare candidati: serve identificare chi ha il potenziale per crescere, non solo coprire il ruolo oggi.",
        },
      ],
      hrChallenges: [
        {
          icon: Layers,
          title: 'Processo di screening non scalabile',
          text: "Nessun modo strutturato per valutare in profondità migliaia di candidati prima del colloquio. Il trade-off tra qualità e velocità era insostenibile con picchi stagionali ricorrenti.",
        },
        {
          icon: Scale,
          title: 'Valutazione soggettiva e rischio bias',
          text: "Il processo si basava sul giudizio soggettivo del recruiter, senza dati strutturati. L\u2019obiettivo: un processo equo, skills-based, meno condizionato da stereotipi e pregiudizi inconsci.",
        },
        {
          icon: BarChart3,
          title: 'Nessuna visibilità sul potenziale di crescita',
          text: "La selezione valutava solo il fit immediato. Mancava la capacit\u00e0 di identificare soft skill predittive di crescita futura — un dato che i line manager chiedevano per pianificare lo sviluppo dei team.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: "Scalare il pre-screening senza sacrificare la qualità: gestire migliaia di candidature con un team di 3 persone, liberando i recruiter dallo screening per concentrarli su colloqui e valutazione del potenziale" },
        { icon: Eye, text: "Rendere visibili le soft skill dal primo step del funnel: testare competenze trasversali e lingua inglese prima del colloquio, con dati oggettivi e misurabili su ogni candidato" },
        { icon: Shield, text: "Ridurre il bias e oggettivare la selezione: costruire un processo equo e skills-based, meno condizionato dal giudizio soggettivo, con AI come supporto e non sostituto del recruiter (human-in-the-loop)" },
        { icon: Target, text: "Selezionare per il potenziale, non solo per il fit immediato: identificare candidati con competenze trasversali che li rendano impiegabili per crescita interna e ruoli futuri, fornendo ai line manager visibilità sul potenziale di sviluppo" },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Skillvue \u00e8 integrato nel pre-screening di Europ Assistance su 7 profili di ruolo e 2 sedi, combinando soft skill, test di inglese e hard skill specifiche. Il deployment \u00e8 ricorrente, legato ai 2 picchi stagionali annuali.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Heart, label: 'Problem Solving' },
        { icon: Target, label: 'Orientamento al cliente' },
        { icon: CheckCircle, label: 'Orientamento agli obiettivi' },
        { icon: Users, label: 'Teamworking' },
        { icon: Wrench, label: 'Lingua inglese (B1/B2/C1)' },
        { icon: Layers, label: 'Compensation & Benefit (competenza tecnica per ruoli HR)' },
      ],
      methodologyLabel: 'METODOLOGIA',
      methodology: [
        {
          title: '7 profili, 2 sedi, un unico processo',
          text: "Assessment configurati per 7 ruoli distinti — dall\u2019assistenza (mobilit\u00e0, casa, viaggi, sanitario) al customer care fino ai ruoli HR — su 2 sedi. Ogni profilo ha un set di competenze specifico.",
        },
        {
          title: 'Pre-screening AI integrato nel funnel',
          text: "Primo step di valutazione dopo la candidatura: i candidati completano l\u2019assessment in autonomia. Solo i profili idonei avanzano al colloquio, liberando i recruiter per interviste ad alto valore.",
        },
        {
          title: 'Human-in-the-loop a ogni fase',
          text: "L\u2019AI potenzia il recruiter, non lo sostituisce. Ogni candidato al colloquio arriva con un profilo strutturato; il team HR mantiene pieno controllo decisionale sui dati Skillvue.",
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: 'I risultati misurabili ottenuti da Europ Assistance attraverso l\'adozione di Skillvue nei processi di selezione.',
      pipelineLabel: 'IL FUNNEL DI SELEZIONE',
      pipeline: [
        { number: 'Oltre 3.000', label: 'Candidature ricevute', sublabel: 'Su più campagne stagionali' },
        { number: '1.820', label: 'Candidati valutati con Skillvue', sublabel: 'Su 7 profili di ruolo e 2 sedi (a fine 2025)' },
      ],
      pipelineReady: { percent: '76%', label: 'candidati idonei' },
      pipelineNotReady: { percent: '24%', label: 'candidati non idonei' },
      completionNote: "Tasso di completamento dell’assessment: 23% sul totale degli invitati (su 5.116 invitati complessivi fino a marzo 2026). Il dato riflette l’autoselezione tipica dei funnel di recruiting ad alto volume con candidati esterni.",
      metrics: [
        { value: '+24%', label: 'Assunzioni anno su anno', sublabel: 'Da 92 a 114, stesso team di 3 persone' },
        { value: '-18%', label: 'Colloqui necessari', sublabel: 'Da 457 a 376 — shortlist più qualificate' },
        { value: '76%', label: 'Tasso colloquio-assunzione', sublabel: '3 candidati su 4 al colloquio vengono assunti' },
        { value: '3 FTE', label: 'Team HR invariato', sublabel: 'Stesse risorse, risultati esponenzialmente migliori' },
        { value: '4.0–4.7/5', label: 'Soddisfazione candidati', sublabel: 'Su esperienza, usabilità e comunicazione' },
        { value: '7', label: 'Profili di ruolo coperti', sublabel: 'Assistenza, customer care e ruoli HR' },
      ],
      qualitative: [
        { icon: Zap, title: "Recruiter liberati dallo screening", text: "Il pre-screening gestito da Skillvue libera il team di 3 persone per colloqui approfonditi e analisi del potenziale. Il tempo del recruiter torna ad alto valore aggiunto." },
        { icon: CheckCircle, title: "Shortlist radicalmente più qualificate", text: "I line manager ricevono candidati pre-valutati con profilo strutturato allegato. Il tasso colloquio-assunzione del 76% dimostra la qualità: 3 candidati su 4 vengono assunti." },
        { icon: Shield, title: "Riduzione del bias nella selezione", text: "La valutazione su competenze strutturate riduce la dipendenza dal giudizio soggettivo, costruendo un processo più equo e meno condizionato da pregiudizi inconsci." },
        { icon: Heart, title: "Candidate experience positiva", text: "Punteggi tra 4.0 e 4.7 su 5 su tutte le fasce d\u2019et\u00e0 per esperienza, usabilit\u00e0 e comunicazione." },
        { icon: BarChart3, title: "Visibilità sul potenziale di crescita", text: "Per la prima volta HR e line manager hanno dati sulle soft skill fin dal primo step, abilitando decisioni migliori e visibilit\u00e0 su come le persone potranno crescere nel tempo." },
      ],
    },
    vision: {
      badge: 'EVOLUZIONE 2026',
      title: 'Da hiring tool a talent intelligence partner',
      intro: "Quando i risultati sul recruiting hanno dimostrato che Skillvue poteva scalare qualità e velocità contemporaneamente, il passo naturale è stato estendere la piattaforma allo sviluppo interno, eliminando la discontinuità tra come si seleziona chi entra e come si fa crescere chi è già in azienda.",
      objective: "Mappatura strategica delle competenze sull\u2019intera workforce, allineata al modello di leadership \u201cWe IMPACT\u201d, per percorsi di sviluppo individuali, career planning e succession readiness.",
      bullets: [
        "Mappatura su 5 competenze di leadership e 3 livelli di seniority (Line Manager, Manager of Managers, Senior Leader)",
        "Verso un\u2019organizzazione skills-based: dati sulle competenze dalla selezione fino alla pianificazione della successione",
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail · Hiring at Scale', headline: 'Come Carrefour Italia assume meglio, più velocemente e su larga scala senza aggiungere una singola persona al team.' },
        { id: 'mediaset', company: 'Mediaset', tag: 'Media & Telecom · Hiring', headline: 'Come Mediaset ha gestito 3.000 candidature in 5 settimane con 3 persone.' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'How Europ Assistance hired ',
      highlight1: '24% more',
      middle: ' with ',
      highlight2: '18% fewer interviews',
      after: '',
    },
    subtitle: "A 3-person HR team, thousands of applications received, nearly 2,000 candidates assessed to fill open positions across multiple locations. With Skillvue, Europ Assistance transformed screening from a bottleneck into a competitive advantage, and is now extending the model to internal development.",
    heroMetrics: [
      { value: '+24%', label: 'year-over-year hires' },
      { value: '-18%', label: 'interviews required' },
      { value: '76%', label: 'interview-to-hire rate' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Group', value: 'Generali' },
        { label: 'Locations', value: 'Assago (MI) and Rende (CS)' },
        { label: 'HR Team', value: '3 FTE' },
        { label: 'Industry', value: 'Insurance' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Europ Assistance, part of the <strong className="text-[#1A1A2E]/80 font-semibold">Generali Group</strong>, operates in the insurance sector with a focus on assistance and customer care. The company faces <strong className="text-[#1A1A2E]/80 font-semibold">two seasonal hiring peaks per year</strong> for call center and assistance staff, generating massive application volumes in the order of thousands. The HR team consists of just <strong className="text-[#1A1A2E]/80 font-semibold">3 people</strong> who must manage the entire selection cycle across <strong className="text-[#1A1A2E]/80 font-semibold">multiple locations</strong>. The roles require fundamental cross-functional soft skills for success — problem solving, customer orientation, communication — impossible to detect from a CV or a brief phone screen. The demographic decline is also shrinking the available candidate pool, making every hiring decision more critical. In this context, Europ Assistance was seeking not just efficiency, but a paradigm shift: <strong className="text-[#1A1A2E]/80 font-semibold">selecting for potential, not just immediate fit.</strong>
      </>,
      summary: "The project transformed pre-screening from a manual activity that consumed recruiter time into an AI-driven process that filters 96% of applications before the interview stage, freeing the team to focus on in-depth evaluation and potential analysis. The value demonstrated in hiring led to expansion into internal competency mapping.",
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: "With seasonal peaks of thousands of applications and only 3 FTE in the HR team, the constraint was clear: scale selection quality without multiplying resources. Every role required soft skills invisible from a CV, decisive for success in customer care.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Users,
          title: "Massive volumes with a minimal team",
          text: "Thousands of applications with seasonal peaks concentrated in 3–4 months, managed by a team of 3 people. Recruiter time was absorbed by initial screening instead of interviews and potential evaluation.",
        },
        {
          icon: Eye,
          title: "The decisive soft skills are invisible in the CV",
          text: "Problem solving, customer orientation and stress management are the top predictor of success in assistance roles, but impossible to detect from a CV or phone screen.",
        },
        {
          icon: TrendingUp,
          title: "Shrinking candidate pool",
          text: "The demographic decline is shrinking the available pool, raising the risk of every hire. Finding candidates is not enough: identifying those with the potential to grow, not just to fill the role today, is essential.",
        },
      ],
      hrChallenges: [
        {
          icon: Layers,
          title: "Non-scalable screening process",
          text: "No structured way to evaluate thousands of candidates in depth before the interview. The trade-off between quality and speed was unsustainable with recurring seasonal peaks.",
        },
        {
          icon: Scale,
          title: "Subjective evaluation and bias risk",
          text: "The process relied on the recruiter’s subjective judgment, without structured data. The goal was to build a fair, skills-based process less influenced by stereotypes and unconscious biases.",
        },
        {
          icon: BarChart3,
          title: "No visibility on growth potential",
          text: "Selection only assessed immediate role fit. The ability to identify soft skills predictive of future growth was entirely missing — data line managers were requesting to plan team development.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Zap, text: "Scale pre-screening without sacrificing quality: manage thousands of applications with a 3-person team, freeing recruiters from screening to focus on interviews and potential evaluation" },
        { icon: Eye, text: "Make soft skills visible from the first funnel step: test cross-functional competencies and English language before the interview, with objective and measurable data on every candidate" },
        { icon: Shield, text: "Reduce bias and objectify selection: build a fair, skills-based process less influenced by subjective judgment, with AI as support and not a substitute for the recruiter (human-in-the-loop)" },
        { icon: Target, text: "Select for potential, not just immediate fit: identify candidates with cross-functional competencies that make them employable for internal growth and future roles, giving line managers visibility on development potential" },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "Skillvue is integrated into Europ Assistance’s pre-screening across 7 role profiles and 2 locations, combining soft skills, English tests and specific hard skills. Deployment is recurring, tied to the 2 seasonal hiring peaks per year.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Heart, label: 'Problem Solving' },
        { icon: Target, label: 'Customer Orientation' },
        { icon: CheckCircle, label: 'Goal Orientation' },
        { icon: Users, label: 'Teamworking' },
        { icon: Wrench, label: 'English Language (B1/B2/C1)' },
        { icon: Layers, label: 'Compensation & Benefits (technical competency for HR roles)' },
      ],
      methodologyLabel: 'METHODOLOGY',
      methodology: [
        {
          title: "7 roles, 2 locations, one single process",
          text: "Assessments configured for 7 distinct roles — from assistance (mobility, home, travel, healthcare) to customer care to HR roles — across 2 locations. Each profile has a specific competency set.",
        },
        {
          title: "AI pre-screening integrated into the funnel",
          text: "First evaluation step after the application: candidates complete the assessment independently. Only suitable profiles advance to the interview, freeing recruiters for high-value interviews and potential analysis.",
        },
        {
          title: "Human-in-the-loop at every stage",
          text: "The AI empowers the recruiter, not replaces them. Every candidate at interview arrives with a structured profile; the HR team maintains full decision-making control over Skillvue data.",
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The measurable outcomes Europ Assistance achieved through Skillvue across its hiring processes.',
      pipelineLabel: 'THE SELECTION FUNNEL',
      pipeline: [
        { number: 'Over 3,000', label: 'Applications received', sublabel: 'Across multiple seasonal campaigns' },
        { number: '1,820', label: 'Candidates assessed with Skillvue', sublabel: 'Across 7 role profiles and 2 locations (by end of 2025)' },
      ],
      pipelineReady: { percent: '76%', label: 'suitable candidates' },
      pipelineNotReady: { percent: '24%', label: 'unsuitable candidates' },
      completionNote: "Assessment completion rate: 23% of total invitees (across 5,116 total invitees through March 2026). This reflects the typical self-selection of high-volume recruiting funnels with external candidates.",
      metrics: [
        { value: '+24%', label: 'Year-over-year hires', sublabel: 'From 92 to 114, same 3-person team' },
        { value: '-18%', label: 'Interviews required', sublabel: 'From 457 to 376 — more qualified shortlists' },
        { value: '76%', label: 'Interview-to-hire rate', sublabel: '3 out of 4 interviewed candidates are hired' },
        { value: '3 FTE', label: 'HR team unchanged', sublabel: 'Same resources, exponentially better results' },
        { value: '4.0–4.7/5', label: 'Candidate satisfaction', sublabel: 'On experience, usability and communication' },
        { value: '7', label: 'Role profiles covered', sublabel: 'Assistance, customer care and HR roles' },
      ],
      qualitative: [
        { icon: Zap, title: "Recruiters freed from screening", text: "Pre-screening handled by Skillvue frees the 3-person team for in-depth interviews and potential analysis. Recruiter time returns to high-value activities." },
        { icon: CheckCircle, title: "Radically more qualified shortlists", text: "Line managers receive candidates pre-evaluated with a structured profile attached. The 76% interview-to-hire rate proves the quality: 3 out of 4 candidates are hired." },
        { icon: Shield, title: "Bias reduction in selection", text: "Evaluation based on structured competencies reduces reliance on subjective judgment, building a fairer process less influenced by unconscious biases." },
        { icon: Heart, title: "Positive candidate experience", text: "Satisfaction scores between 4.0 and 4.7 out of 5 across all age groups for experience, usability and communication." },
        { icon: BarChart3, title: "Visibility on growth potential", text: "For the first time HR and line managers have soft skill data from the very first step, enabling better hiring decisions and visibility on how people can grow over time." },
      ],
    },
    vision: {
      badge: 'EVOLUTION 2026',
      title: 'From hiring tool to talent intelligence partner',
      intro: "When the recruiting results proved that Skillvue could scale quality and speed simultaneously, the natural step was to extend the platform to internal development, eliminating the disconnect between how new hires are selected and how existing employees are developed.",
      objective: "Strategic competency mapping of the entire workforce, aligned to the \"We IMPACT\" leadership model, for individual development paths, career planning and succession readiness.",
      bullets: [
        "Mapping across 5 leadership competencies and 3 seniority levels (Line Manager, Manager of Managers, Senior Leader)",
        "Towards a skills-based organization: competency data from selection through to succession planning",
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail · Hiring at Scale', headline: 'How Carrefour Italia is Hiring Better, Faster, and at Scale — Without Adding a Single Person to the Team.' },
        { id: 'mediaset', company: 'Mediaset', tag: 'Media & Telecom · Hiring', headline: 'How Mediaset managed 3,000 applications in 5 weeks with 3 people.' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function EuropAssistanceStoryPage() {
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
              <span className="text-[13px] text-white/[0.65]">Europ Assistance</span>
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
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white flex items-center justify-center p-1.5">
                      <img src="/logos/europ-assistance-logo.png" alt="Europ Assistance logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Europ Assistance</p>
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-6 max-w-3xl">{c.context.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.85] mb-8 max-w-3xl">{c.context.paragraph}</p>
              <p className="text-[15px] text-[#1A1A2E]/40 italic leading-[1.75] max-w-2xl border-l-2 border-[#4b4df7]/20 pl-5">
                {c.context.summary}
              </p>
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.challenge.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{c.challenge.title}</h2>
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
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4] relative">{m.title.replace(/^\d+\s*[—\-]+\s*/, '')}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65] relative">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{c.results.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12 max-w-3xl">{c.results.subtitle}</p>

              {/* Selection funnel */}
              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.results.pipelineLabel}</span>
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm">
                  <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                    {c.results.pipeline.map((step, i) => (
                      <React.Fragment key={step.label}>
                        <div className="flex-1 text-center rounded-xl border border-[#4b4df7]/[0.12] bg-[#4b4df7]/[0.03] px-6 py-5">
                          <span className="block text-[#1A1A2E]" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{step.number}</span>
                          <span className="text-[13px] font-semibold text-[#1A1A2E]/70 mt-2 block">{step.label}</span>
                          <span className="text-[11px] text-[#1A1A2E]/35 mt-1 block">{step.sublabel}</span>
                        </div>
                        {i < c.results.pipeline.length - 1 && (
                          <ArrowRight className="h-5 w-5 shrink-0 text-[#4b4df7]/40 rotate-0 md:rotate-0" />
                        )}
                      </React.Fragment>
                    ))}
                    <ArrowRight className="h-5 w-5 shrink-0 text-[#4b4df7]/40" />
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-center">
                        <span className="block text-emerald-700" style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>{c.results.pipelineReady.percent}</span>
                        <span className="text-[12px] font-semibold text-emerald-600 mt-1 block">{c.results.pipelineReady.label}</span>
                      </div>
                      <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-6 py-4 text-center">
                        <span className="block text-[#1A1A2E]/50" style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>{c.results.pipelineNotReady.percent}</span>
                        <span className="text-[12px] font-semibold text-[#1A1A2E]/40 mt-1 block">{c.results.pipelineNotReady.label}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#1A1A2E]/35 leading-[1.6] italic">{c.results.completionNote}</p>
                </div>
              </div>

              {/* Key metrics */}
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
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4 leading-[1.3]">{c.vision.title}</h2>
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
