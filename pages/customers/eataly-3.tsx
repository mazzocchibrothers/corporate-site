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
      before: 'Eataly: come Integrare ',
      highlight1: 'Intelligenza Artificiale e Human Touch',
      middle: ' per costruire processi di selezione più efficaci, inclusivi e consapevoli',
      highlight2: '',
      after: '',
    },
    subtitle: "Con il supporto di Skillvue, Eataly ha ottimizzato la valutazione delle competenze in fase di pre-screening, gestendo oltre 1.000 candidature senza rinunciare alla qualità di valutazione, alla vicinanza alla persona e all'autenticità del brand in ogni fase del processo.",
    heroMetrics: [
      { value: '1.000+', label: 'candidature processate' },
      { value: '50', label: 'punti vendita diretti' },
      { value: '15', label: 'Paesi' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Food Retail' },
        { label: 'Dipendenti', value: 'Oltre 5.300' },
        { label: 'Fatturato', value: '684 mln €' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: "Crescere senza perdere l'anima del brand",
      paragraph: <>
        Eataly non è un operatore qualsiasi del food italiano. Con una <strong className="text-[#121212]/80 font-semibold">crescita del 47% in tre anni</strong> e una presenza internazionale reale in <strong className="text-[#121212]/80 font-semibold">15 Paesi</strong>, è l'unico brand del food Made in Italy a operare su scala globale. Dal 2022 sta accelerando su tutti i fronti: <strong className="text-[#121212]/80 font-semibold">nuovi flagship in Nord America</strong>, nuovi format compatti in hub urbani e aeroporti e un piano di espansione in <strong className="text-[#121212]/80 font-semibold">Medio Oriente</strong>.<br /><br />
        Questa crescita richiede figure professionali capaci di incamerare i valori del brand in contesti multiculturali — dai profili manageriali come <strong className="text-[#121212]/80 font-semibold">Head Chef, Director of Store Operations e General Manager</strong>, fino ai profili più junior che rappresentano la <strong className="text-[#121212]/80 font-semibold">prossima generazione di talento Eataly</strong>. In uno scenario in cui il mondo del lavoro è diventato più <strong className="text-[#121212]/80 font-semibold">dinamico, digitale e in continua trasformazione</strong>, l'obiettivo era chiaro: semplificare e rendere più efficienti i processi di recruiting, senza perdere la <strong className="text-[#121212]/80 font-semibold">qualità, l'autenticità e l'attenzione alla persona</strong> che da sempre contraddistinguono il brand. Nasce da qui il <strong className="text-[#121212]/80 font-semibold">Progetto Eataly Career Passport</strong>, primo capitolo per la costruzione di una <strong className="text-[#121212]/80 font-semibold">talent strategy</strong> sempre più solida e innovativa, orientata a rendere Eataly un riferimento globale del Made in Italy.
      </>,
      summary: '',
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Crescere a questa velocità significa ripensare il modo di lavorare',
      intro: "La campagna Eataly Career Passport ha generato oltre mille candidature per 3 posizioni chiave. Un volume che, per essere gestito, richiedeva non solo nuovi strumenti, ma anche un nuovo approccio.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Zap,
          title: 'La velocità di espansione richiedeva nuove strategie nel processo di selezione',
          text: '10+ nuovi store in pipeline in Nord America, aperture simultanee su più mercati, date fissate. Andava potenziato lo screening per coniugare alti volumi e maggiore profondità di analisi.',
        },
        {
          icon: Layers,
          title: 'La ricerca era sfidante: competenze operative, visione manageriale e respiro internazionale',
          text: "Eataly cerca chi sa replicare l'autenticità della cultura enogastronomica italiana su scala globale: un profilo che combina leadership, gestione dei team, inglese fluente e mobilità internazionale.",
        },
        {
          icon: TrendingUp,
          title: 'La crescita richiedeva un impegno ancora maggiore rispetto a prima nella selezione',
          text: "In un contesto di forte crescita, ogni inserimento ha un impatto diretto su operatività e costi: per questo la qualità della selezione diventa ancora più strategica.",
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: 'Serviva un nuovo modo di lavorare, più data-driven',
          text: "La gestione di questi volumi ha spinto il team HR a evolvere verso un approccio agile, guidato dai dati e allineato alla dinamicità del business.",
        },
        {
          icon: CheckCircle,
          title: 'Andava acceso il riflettore sulle soft skill fin da prima del colloquio',
          text: "Proprio in virtù della specificità dei ruoli ricercati, l'analisi delle soft skill più rilevanti non poteva essere rimandata a una fase successiva.",
        },
        {
          icon: Heart,
          title: 'Nonostante la velocità, andava preservato il momento di feedback ai candidati',
          text: "Era fondamentale poter restituire a ciascun candidato un'analisi dettagliata rispetto al possesso di competenze chiave per il ruolo dopo il primo screening.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Obiettivi di collaborazione',
      items: [
        { icon: Eye, text: "Mappare fin dal pre-screening tutti i fattori chiave: leadership, gestione del personale, conoscenza dell'inglese e disponibilità alla mobilità internazionale, per arrivare al colloquio con informazioni già strutturate e concentrare il tempo su una conversazione più mirata, personalizzata e di valore." },
        { icon: Scale, text: "Mantenere alto lo standard di equità: l'equità per Eataly non è un obiettivo, è una garanzia. Ogni candidato doveva essere valutato attraverso strumenti psicometricamente validati, così da rendere il processo di selezione trasparente e libero da bias strutturali." },
        { icon: Heart, text: "Integrare AI e human touch senza mai perdere l'autenticità del brand: usare la tecnologia come abilitatore — non come sostituzione del valore umano che da sempre contraddistingue Eataly, per processi più efficaci, inclusivi e consapevoli." },
        { icon: Zap, text: "Processare le candidature in minor tempo senza comprimere la qualità: la velocità non deve essere il risultato di una semplificazione, ma di un'architettura progettata per scalare e mantenere al contempo profondità e qualità di analisi." },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue per il progetto Career Passport',
      intro: <>Skillvue è stato integrato nel processo di selezione di <strong className="text-[#121212]/80 font-semibold">Eataly Career Passport</strong>, il programma di global mobility lanciato per supportare l'<strong className="text-[#121212]/80 font-semibold">espansione in Nord America</strong>. Dopo una campagna omnichannel che <strong className="text-[#121212]/80 font-semibold">ha raccolto oltre 1.000 candidature</strong>, Skillvue ha gestito il pre-screening con un assessment basato su <strong className="text-[#121212]/80 font-semibold">domande filtro e domande situazionali</strong> calibrate sui ruoli specifici (<strong className="text-[#121212]/80 font-semibold">Head Chef, Director of Store Operations, General Manager of Restaurant</strong>).</>,
      intro2: <>L'obiettivo non era <strong className="text-[#121212]/80 font-semibold">sostituire il giudizio umano, ma liberarlo</strong>. All'AI il lavoro di standardizzazione su larga scala; al team HR i dati per concentrarsi su ciò che <strong className="text-[#121212]/80 font-semibold">nessun algoritmo può sostituire</strong>: la valutazione umana che segue.</>,
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Users, label: 'Leadership' },
        { icon: Shield, label: 'Gestione del personale' },
        { icon: Target, label: 'Predisposizione alla mobilità internazionale' },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Cosa è cambiato e perché conta.',
      subtitle: 'I risultati del progetto Skillvue × Eataly Career Passport.',
      metrics: [
        { value: '1.000+', label: 'candidature processate in poche settimane' },
        { value: 'Time‑to‑hire ridotto', label: 'nonostante gli alti volumi' },
        { value: 'Più dati a disposizione', label: 'per le decisioni che contano davvero' },
      ],
      qualitative: [
        { icon: TrendingUp, title: 'Produttività del team HR aumentata', text: "Liberato dallo screening manuale, il team Talent Acquisition ha dedicato più tempo alle fasi ad alto valore: colloqui, valutazioni finali, relazione con i candidati." },
        { icon: Scale, title: 'Riduzione significativa dei bias nella selezione', text: "Gli strumenti psicometricamente validati hanno ridotto il peso dei bias cognitivi, garantendo standard di valutazione coerenti su tutti i candidati, indipendentemente dal valutatore." },
        { icon: Heart, title: "L'autenticità del tocco umano è rimasta intatta", text: "L'AI ha gestito standardizzazione e scala; le persone hanno gestito relazione, contesto e lettura del potenziale. Un processo più efficiente, ma mai impersonale." },
      ],
    },
    vision: {
      badge: 'EVOLUZIONE 2026',
      title: 'Una collaborazione che cresce',
      intro: <>Il programma <strong className="text-[#121212]/80 font-semibold">Eataly Career Passport</strong> ha rappresentato il primo tassello di un <strong className="text-[#121212]/80 font-semibold">percorso di mobilità internazionale</strong> dedicato ai profili manageriali. Nel 2026, la collaborazione si estende con <strong className="text-[#121212]/80 font-semibold">Eataly NextGen</strong>, rivolto ai profili junior: <strong className="text-[#121212]/80 font-semibold">270+ candidati</strong> valutati in un assessment strutturato di <strong className="text-[#121212]/80 font-semibold">lingua inglese (livello B2) e soft skill</strong>. Un segnale concreto della volontà di Eataly di consolidare l'integrazione tra <strong className="text-[#121212]/80 font-semibold">AI e human touch</strong> come fondamento di una <strong className="text-[#121212]/80 font-semibold">talent strategy inclusiva e scalabile</strong>.</>,
      nextGen: '',
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Mobilità Interna', headline: "Aeroporti di Roma: come sviluppare un'organizzazione da quasi 5.000 persone per eseguire un piano da 9 miliardi" },
        { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO · Mobilità Interna', headline: "In's Mercato: come ha costruito una pipeline interna di Store Manager" },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'Eataly: how to integrate ',
      highlight1: 'Artificial Intelligence and Human Touch',
      middle: ' to build more effective, inclusive and conscious hiring processes',
      highlight2: '',
      after: '',
    },
    subtitle: "With Skillvue's support, Eataly optimised skills assessment at the pre-screening stage, managing over 1,000 applications without compromising on evaluation quality, closeness to candidates, or brand authenticity at any stage of the process.",
    heroMetrics: [
      { value: '1,000+', label: 'applications processed' },
      { value: '50', label: 'direct stores' },
      { value: '15', label: 'countries' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Food Retail' },
        { label: 'Employees', value: '5,300+' },
        { label: 'Revenue', value: '€684M' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: "Growing without losing the soul of the brand",
      paragraph: <>
        Eataly is no ordinary player in Italian food. With <strong className="text-[#121212]/80 font-semibold">47% growth over three years</strong> and a truly international presence across <strong className="text-[#121212]/80 font-semibold">15 countries</strong>, it is the only Italian food brand operating at global scale. Since 2022 it has been accelerating on all fronts: <strong className="text-[#121212]/80 font-semibold">new flagships in North America</strong>, new compact formats in urban hubs and airports, and an expansion plan in the <strong className="text-[#121212]/80 font-semibold">Middle East</strong>.<br /><br />
        This growth requires talent capable of embodying the brand's values in multicultural contexts — from managerial profiles like <strong className="text-[#121212]/80 font-semibold">Head Chef, Director of Store Operations and General Manager</strong>, to more junior profiles representing the <strong className="text-[#121212]/80 font-semibold">next generation of Eataly talent</strong>. In a world of work that has become more <strong className="text-[#121212]/80 font-semibold">dynamic, digital and constantly evolving</strong>, the goal was clear: simplify and make recruiting processes more efficient, without losing the <strong className="text-[#121212]/80 font-semibold">quality, authenticity and care for people</strong> that have always defined the brand. This is the origin of the <strong className="text-[#121212]/80 font-semibold">Eataly Career Passport Project</strong> — the first chapter in building an increasingly solid, innovative <strong className="text-[#121212]/80 font-semibold">talent strategy</strong> oriented towards making Eataly a global benchmark for Made in Italy.
      </>,
      summary: '',
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'Growing at this pace means rethinking the way we work',
      intro: "The Eataly Career Passport campaign generated over a thousand applications for 3 key roles. A volume that required not just new tools, but also a new approach.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Zap,
          title: 'The pace of expansion demanded new strategies in the hiring process',
          text: "10+ new stores in the pipeline in North America, simultaneous openings across multiple markets, fixed dates. Screening needed to be enhanced to combine high volumes with greater depth of analysis.",
        },
        {
          icon: Layers,
          title: 'The search was challenging: operational skills, managerial vision, international mindset',
          text: "Eataly looks for people who can replicate the authenticity of Italian food and wine culture at global scale: a profile combining leadership, team management, fluent English and international mobility.",
        },
        {
          icon: TrendingUp,
          title: 'Growth demanded an even greater commitment to hiring than before',
          text: "In a context of strong growth, every hire has a direct impact on operations and costs — which is why hiring quality becomes even more strategic.",
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: 'A new, more data-driven way of working was needed',
          text: "Managing these volumes pushed the HR team to evolve towards an agile, data-driven approach aligned to the pace of the business.",
        },
        {
          icon: CheckCircle,
          title: 'Soft skills had to be in the spotlight before the interview',
          text: "Given the specificity of the roles involved, analysing the most relevant soft skills for each role could not be deferred to a later stage.",
        },
        {
          icon: Heart,
          title: 'Despite the pace, the feedback moment with candidates had to be preserved',
          text: "Being able to provide each candidate with detailed analysis of their possession of key role competencies after the first screening was fundamental.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'Collaboration objectives',
      items: [
        { icon: Eye, text: "Map all key factors at the pre-screening stage: leadership, people management, English proficiency and openness to international mobility — arriving at the interview with structured data to focus time on a more targeted, personalised and valuable conversation." },
        { icon: Scale, text: "Maintaining a high standard of fairness: for Eataly, fairness is not a goal — it is a guarantee. Every candidate had to be assessed using psychometrically validated tools, making the hiring process transparent and free from structural bias." },
        { icon: Heart, text: "Integrate AI and human touch without ever losing the brand's authenticity: use technology as an enabler — not a replacement — of the human value that has always defined Eataly, for more effective, inclusive and conscious processes." },
        { icon: Zap, text: "Process applications in less time without compromising evaluation quality: speed should not be the result of simplification, but of an architecture designed to scale while maintaining depth and quality of analysis." },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue for the Career Passport project',
      intro: <>Skillvue was integrated into the hiring process as part of <strong className="text-[#121212]/80 font-semibold">Eataly Career Passport</strong>, the global mobility programme launched to support expansion in <strong className="text-[#121212]/80 font-semibold">North America</strong>. After an omnichannel campaign that <strong className="text-[#121212]/80 font-semibold">collected over 1,000 applications</strong>, Skillvue managed the pre-screening with an assessment combining <strong className="text-[#121212]/80 font-semibold">filter questions and situational questions</strong> calibrated to specific roles (<strong className="text-[#121212]/80 font-semibold">Head Chef, Director of Store Operations, General Manager of Restaurant</strong>).</>,
      intro2: <>The goal was not to <strong className="text-[#121212]/80 font-semibold">replace human judgement, but to free it</strong>. AI handled standardisation at scale; the HR team received the data to focus on what <strong className="text-[#121212]/80 font-semibold">no algorithm can replace</strong>: the human evaluation that follows.</>,
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Users, label: 'Leadership' },
        { icon: Shield, label: 'People management' },
        { icon: Target, label: 'Openness to international mobility' },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'What changed and why it matters.',
      subtitle: 'Outcomes of the Skillvue \u00d7 Eataly Career Passport project.',
      metrics: [
        { value: '1,000+', label: 'applications processed in a few weeks' },
        { value: 'Time‑to‑hire reduced', label: 'despite high volumes' },
        { value: 'More data available', label: 'for the decisions that matter most' },
      ],
      qualitative: [
        { icon: TrendingUp, title: 'HR team productivity increased', text: "Freed from manual screening, the Talent Acquisition team dedicated more time to high-value stages: interviews, final assessments, and candidate relationships." },
        { icon: Scale, title: 'Significant reduction in hiring bias', text: "Psychometrically validated tools reduced the weight of cognitive bias, ensuring consistent assessment standards across all candidates regardless of evaluator." },
        { icon: Heart, title: 'The authenticity of the human touch remained intact', text: "AI handled standardisation and scale; people managed relationship, context and reading of potential. A more efficient process that never felt impersonal." },
      ],
    },
    vision: {
      badge: 'EVOLUTION 2026',
      title: 'A collaboration that grows',
      intro: <>The <strong className="text-[#121212]/80 font-semibold">Eataly Career Passport</strong> programme was the first step in an <strong className="text-[#121212]/80 font-semibold">international mobility journey</strong> dedicated to managerial profiles. In 2026, the collaboration expands with <strong className="text-[#121212]/80 font-semibold">Eataly NextGen</strong>, focused on junior profiles: <strong className="text-[#121212]/80 font-semibold">270+ candidates</strong> assessed in a structured <strong className="text-[#121212]/80 font-semibold">English language (B2 level) and soft skills</strong> assessment. A clear signal of Eataly's commitment to consolidating the integration of <strong className="text-[#121212]/80 font-semibold">AI and human touch</strong> as the foundation of an <strong className="text-[#121212]/80 font-semibold">inclusive and scalable talent strategy</strong>.</>,
      nextGen: '',
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation \u00b7 Internal Mobility', headline: 'Aeroporti di Roma: how to develop an organisation of nearly 5,000 people to execute a \u20ac9 billion plan' },
        { id: 'ins-mercato', company: "In's Mercato", tag: 'Large-scale distribution \u00b7 Internal Mobility', headline: "In's Mercato: how it built an internal pipeline of Store Managers" },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function EatalyStoryPage() {
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
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
      </Head>
      <Navbar />
      <main>

        {/* ===== HERO ===== */}
        <section className="relative pt-[80px]">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/eataly-explore-stories.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push(lang === 'it' ? '/clienti' : '/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Eataly</span>
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
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4">
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
                      <img src="/logos/Eataly-logo.png" alt="Eataly logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Eataly</p>
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
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-4">{c.solution.intro}</p>
              {c.solution.intro2 && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{c.solution.intro2}</p>}
              <div>
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.skillsLabel}</span>
                <div className="flex flex-wrap gap-3">
                  {c.solution.skills.map((s) => (
                    <div key={s.label} className="inline-flex items-center gap-3 px-5 py-4 rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
                      <s.icon className="h-5 w-5 shrink-0" style={{ color: '#4b4df7' }} />
                      <span className="text-[14px] font-semibold text-[#121212]/70">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#121212] leading-[1.4] mb-4">{c.results.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{c.results.subtitle}</p>

              {/* Key metrics */}
              <div className="rounded-2xl bg-[#0E0E0E] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
                  {/* 1.000+ — stacked documents */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-center justify-center">
                      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
                        <rect x="4" y="44" width="56" height="5" rx="2.5" fill="rgba(75,77,247,0.25)" />
                        <rect x="4" y="34" width="56" height="5" rx="2.5" fill="rgba(75,77,247,0.45)" />
                        <rect x="4" y="12" width="56" height="26" rx="3" fill="rgba(75,77,247,0.12)" stroke="#4b4df7" strokeWidth="2" />
                        <line x1="12" y1="20" x2="52" y2="20" stroke="#4b4df7" strokeWidth="1.8" strokeLinecap="round" />
                        <line x1="12" y1="26" x2="46" y2="26" stroke="#4b4df7" strokeWidth="1.8" strokeLinecap="round" />
                        <line x1="12" y1="32" x2="38" y2="32" stroke="#4b4df7" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[0].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[0].label}</span>
                  </div>
                  {/* Poche settimane — clock with down arrow */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-center justify-center">
                      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
                        <circle cx="32" cy="26" r="18" stroke="#4b4df7" strokeWidth="2" fill="rgba(75,77,247,0.1)" />
                        <line x1="32" y1="26" x2="32" y2="16" stroke="#4b4df7" strokeWidth="2.2" strokeLinecap="round" />
                        <line x1="32" y1="26" x2="41" y2="32" stroke="#4b4df7" strokeWidth="2.2" strokeLinecap="round" />
                        <circle cx="32" cy="26" r="2.5" fill="#4b4df7" />
                        <line x1="32" y1="48" x2="32" y2="57" stroke="#4b4df7" strokeWidth="2" strokeLinecap="round" />
                        <path d="M26 53l6 6 6-6" stroke="#4b4df7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1 leading-tight" style={{ fontSize: 'clamp(1.2rem,2vw,1.6rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[1].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[1].label}</span>
                  </div>
                  {/* Più dati, più velocità — bars + lightning */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-center justify-center">
                      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
                        <rect x="6" y="42" width="12" height="16" rx="2" fill="rgba(75,77,247,0.3)" />
                        <rect x="22" y="30" width="12" height="28" rx="2" fill="rgba(75,77,247,0.5)" />
                        <rect x="38" y="16" width="12" height="42" rx="2" fill="#4b4df7" />
                        <path d="M44 6l-5 10h7l-7 14" stroke="#7b7df9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1 leading-tight" style={{ fontSize: 'clamp(1.1rem,1.8vw,1.4rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[2].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[2].label}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
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

            {/* EVOLUTION */}
            <Section>
              <div className="rounded-2xl border border-[#4b4df7]/[0.12] bg-gradient-to-br from-[#4b4df7]/[0.04] to-transparent p-10 lg:p-14">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-6 block w-fit" style={{ background: 'rgba(75,77,247,0.1)', color: '#4b4df7', border: '1px solid rgba(75,77,247,0.2)' }}>
                  {c.vision.badge}
                </span>
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#121212] leading-[1.4] mb-4">{c.vision.title}</h2>
                <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8]">{c.vision.intro}</p>
                {c.vision.nextGen && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mt-4">{c.vision.nextGen}</p>}
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
