// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle, Wrench } from 'lucide-react';
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
      before: 'Europ Assistance: come riconoscere il ',
      highlight1: 'potenziale che resiste alla prova del tempo',
      middle: ' in un business fondato sulla ',
      highlight2: 'componente umana',
      after: '',
    },
    subtitle: "Con Skillvue, Europ Assistance ha trasformato il pre-screening dei candidati in un processo scalabile e strategico per l'intero talent lifecycle, lavorando sulla valorizzazione delle competenze trasversali fin dal primo step della selezione.",
    heroMetrics: [
      { value: '10.000', label: 'centri nella rete in Italia' },
      { value: '900+', label: 'dipendenti' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Financial Services' },
        { label: 'Gruppo', value: 'Generali' },
        { label: 'Centri nella rete in Italia', value: '10.000' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'In un business fondato sull\'interazione umana, la qualità della selezione non può accettare compromessi.',
      paragraph: <>
        Europ Assistance, parte del <strong className="text-[#121212]/80 font-semibold">Gruppo Generali</strong>, è uno dei leader mondiali nei servizi di assistenza e assicurazione viaggi. La sua è una crescita costante: è in corso infatti l'espansione delle operazioni in nuovi mercati e la convergenza con Generali Care in un <strong className="text-[#121212]/80 font-semibold">hub integrato di assistenza</strong>.<br /><br />In Italia, opera con un modello di business fondato sulla qualità dell'interazione umana: <strong className="text-[#121212]/80 font-semibold">assistenza 24/7, gestione sinistri, customer care multilingue</strong>. <strong className="text-[#121212]/80 font-semibold">La scelta e la crescita delle persone</strong> rappresenta un punto chiave per il corretto funzionamento e l'espansione del business, soprattutto vista l'instabilità del settore assicurativo, che <strong className="text-[#121212]/80 font-semibold">non sempre riesce ad attrarre i profili più qualificati</strong> e al tempo stesso richiede <strong className="text-[#121212]/80 font-semibold">profili professionali molto specifici e capaci di evolvere nel tempo</strong>. In questo contesto, ogni assunzione sbagliata costa di più e ogni persona giusta che resta vale ancora di più.
      </>,
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Migliaia di candidature, 2 picchi stagionali, 3 persone nel team recruiting.',
      intro: 'Le assunzioni di Europ Assistance Italia si concentrano in due picchi stagionali l\'anno, generando volumi nell\'ordine delle migliaia di candidature in pochi mesi. Per i ruoli di assistenza e customer care, le soft skill sono il primo predittore di successo — problem solving, orientamento al cliente, gestione dello stress — ma sono completamente invisibili nel CV.',
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: 'Necessità di crescere al ritmo del business',
          text: 'Le esigenze crescevano costantemente e la velocità di risposta richiesta aumentava. Essere più veloci ed efficaci per HR nel raggiungere i risultati attesi era diventata una necessità operativa.',
        },
        {
          icon: Users,
          title: 'Gestione complessa nei picchi stagionali',
          text: 'Con volumi elevati concentrati in finestre temporali ristrette, non c\'era margine per processi lenti. Ogni ritardo si traduceva in posizioni scoperte nel momento in cui il business ne aveva più bisogno.',
        },
        {
          icon: BarChart3,
          title: 'Richiesta di maggiore anticipo sui need futuri',
          text: 'Identificare già nel pre-screening le competenze predittive di crescita era fondamentale per portarsi a casa informazioni utili alla costruzione di una pipeline di talento interna.',
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: 'Troppo tempo intrappolato nello screening',
          text: 'Con migliaia di candidature da gestire, lo screening manuale assorbiva la maggior parte delle risorse disponibili, lasciando poco spazio all\'analisi approfondita e alla relazione con i candidati.',
        },
        {
          icon: CheckCircle,
          title: 'Difficoltà di individuazione del potenziale futuro',
          text: 'Portare in azienda persone con il potenziale giusto per percorsi di sviluppo interno richiedeva dati strutturati che il CV da solo non era in grado di fornire.',
        },
        {
          icon: Target,
          title: 'Profili di nicchia difficili da intercettare',
          text: 'Alcuni ruoli strategici richiedevano competenze molto specifiche, difficili da rilevare tramite CV. Senza strumenti di valutazione oggettivi, il processo si allungava e il rischio di mancato match aumentava.',
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: 'Scalare il pre-screening senza scalare il team: gestire migliaia di candidature con 3 FTE, liberando i recruiter dallo screening per concentrarli su colloqui e valutazione del potenziale' },
        { icon: Eye, text: 'Rendere visibili le soft skill dal primo step: dati oggettivi su competenze trasversali e lingua inglese prima di impegnare ore di tempo del team recruiting' },
        { icon: Shield, text: 'Sfruttare l\'AI come supporto al recruiter: garantendo maggiore velocità ed efficacia decisionale e mantenendo pieno controllo decisionale in ogni step' },
        { icon: Target, text: 'Selezionare per il potenziale, non solo per la performance immediata: identificare candidati con competenze promettenti e indicative di una futura crescita all\'interno dell\'organizzazione' },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Skillvue è stato integrato nel processo di selezione di Europ Assistance Italia come primo step strutturato del funnel, gestendo il pre-screening su più profili e su più sedi geografiche. Il deployment è ricorrente, legato soprattutto ai due picchi stagionali annuali.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Heart, label: 'Soft skill — problem solving, orientamento al cliente, orientamento agli obiettivi, teamworking' },
        { icon: Wrench, label: 'Lingua inglese — test B1/B2/C1, competenza critica per un\'azienda che opera in 39 paesi e gestisce assistenza multilingue' },
        { icon: Layers, label: 'Hard skill role-specific — es. Compensation & Benefits sui ruoli HR' },
      ],
      methodologyLabel: 'COME È STATO COSTRUITO',
      methodology: [
        {
          title: 'Assessment in autonomia come primo step',
          text: 'Dopo la candidatura, ogni candidato completa l\'assessment in autonomia da qualsiasi dispositivo — telefono, tablet o laptop.',
        },
        {
          title: 'Report strutturato per il recruiter',
          text: 'Il team HR riceve una prima analisi oggettiva e approfondita delle competenze. Il primo colloquio è basato sui dati, non su impressioni.',
        },
        {
          title: 'Human-in-the-loop a ogni fase',
          text: 'Il team HR mantiene pieno controllo decisionale in ogni fase. I dati Skillvue strutturano e informano il giudizio, senza mai sostituire la valutazione del recruiter.',
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Cosa sta cambiando.',
      pillars: [
        { icon: Target, value: <>Candidati<br />più qualificati</>, label: 'meno rumore, più segnali concreti per il team HR' },
        { icon: Zap, value: <>Più tempo<br />per ciò che conta</>, label: 'colloqui più personalizzati e mirati, basati su dati reali' },
        { icon: TrendingUp, value: <>Pipeline di talento<br />per il futuro</>, label: 'si seleziona guardando già al domani, non solo al fit immediato' },
      ],
      qualitative: [
        { icon: BarChart3, title: 'Visibilità sul potenziale fin dal primo step', text: 'HR e line manager dispongono di dati strutturati sulle soft skill di ogni candidato già prima del colloquio — non solo fit immediato, ma segnali concreti di crescita nel tempo.' },
        { icon: Scale, title: 'Recruiter liberati per il lavoro ad alto valore', text: 'Il tempo recuperato è reinvestito in colloqui più approfonditi e analisi del potenziale — attività che incidono direttamente sulla qualità delle assunzioni e sulla retention.' },
        { icon: Heart, title: 'Candidate experience ottimizzata', text: 'L\'assessment pre-colloquio offre un momento di maggiore espressione personale rispetto al solo invio di CV: quando viene data la possibilità di mettersi alla prova, i candidati rispondono positivamente.' },
      ],
    },
    quote: {
      text: 'Credo che selezione e sviluppo debbano parlare la stessa lingua: il dato raccolto oggi diventa la base per lo sviluppo di domani.',
      author: 'Nicole Cerruti',
      role: 'Recruitment Manager, Europ Assistance Italia',
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring at Scale', headline: 'Carrefour: come proteggere i margini su 1.200 punti vendita ottimizzando il KPI chiave del processo di selezione' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'Europ Assistance: how to recognise the ',
      highlight1: 'potential that stands the test of time',
      middle: ' in a business built on ',
      highlight2: 'human interaction',
      after: '',
    },
    subtitle: "With Skillvue, Europ Assistance transformed candidate pre-screening into a scalable, strategic process for the entire talent lifecycle — developing cross-functional skills from the very first step of the recruitment journey.",
    heroMetrics: [
      { value: '10,000', label: 'centres in Italy\'s network' },
      { value: '900+', label: 'employees' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Financial Services' },
        { label: 'Group', value: 'Generali' },
        { label: 'Centres in Italy\'s network', value: '10,000' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'In a business built on human interaction, the quality of hiring cannot afford to compromise.',
      paragraph: <>
        Europ Assistance, part of the <strong className="text-[#121212]/80 font-semibold">Generali Group</strong>, is one of the world's leading providers of assistance and travel insurance services. Its growth is constant: operations are expanding into new markets and converging with Generali Care into an <strong className="text-[#121212]/80 font-semibold">integrated assistance hub</strong>.<br /><br />In Italy, it operates with a business model built on the quality of human interaction: <strong className="text-[#121212]/80 font-semibold">24/7 assistance, claims management, multilingual customer care</strong>. <strong className="text-[#121212]/80 font-semibold">Hiring and developing the right people</strong> is a critical lever for the business to function and grow, especially given the instability of the insurance sector — which <strong className="text-[#121212]/80 font-semibold">doesn't always attract top talent</strong> and at the same time demands <strong className="text-[#121212]/80 font-semibold">very specific professional profiles capable of evolving over time</strong>. In this context, every wrong hire costs more and every right person who stays is worth even more.
      </>,
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'Thousands of applications, 2 seasonal peaks, 3 people in the recruiting team.',
      intro: "Europ Assistance Italia's hires are concentrated in 2 seasonal peaks per year, generating volumes in the order of thousands of applications in just a few months. For assistance and customer care roles, soft skills are the top predictor of success — problem solving, customer orientation, stress management — but are completely invisible in a CV.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: 'Need to grow at the pace the business demands',
          text: "Business needs were constantly increasing and the speed of response required was always higher. Being faster and more effective for HR in delivering expected results had become an operational necessity.",
        },
        {
          icon: Users,
          title: 'Managing complexity at seasonal peaks',
          text: "With high volumes concentrated in narrow time windows, there was no room for slow processes. Every delay meant open positions at precisely the moment the business needed them filled.",
        },
        {
          icon: BarChart3,
          title: 'Need for greater foresight on future needs',
          text: "Identifying predictive growth skills already at the pre-screening stage was key to building useful information for an internal talent pipeline.",
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: 'Too much time trapped in screening',
          text: "With thousands of applications to manage, manual screening absorbed most of the available resources, leaving little room for in-depth analysis and candidate relationship building.",
        },
        {
          icon: CheckCircle,
          title: 'Difficulty identifying future potential',
          text: "Bringing in people with the right potential for internal development paths required structured data that a CV alone was not able to provide.",
        },
        {
          icon: Target,
          title: 'Niche profiles hard to identify',
          text: "Some strategic roles required very specific skills, difficult to assess from a CV. Without objective evaluation tools, the process slowed down and the risk of a poor match increased.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change',
      items: [
        { icon: Zap, text: 'Scale pre-screening without scaling the team: manage thousands of applications with 3 FTE, freeing recruiters from screening to focus on interviews and potential evaluation' },
        { icon: Eye, text: 'Make soft skills visible from the first step: objective data on cross-functional skills and English language needed to be available before committing hours of the recruiting team\'s time' },
        { icon: Shield, text: 'Leverage AI as support to the recruiter: ensuring greater speed and decision-making effectiveness while maintaining full decision-making control at every step' },
        { icon: Target, text: 'Select for potential, not just immediate performance: identify candidates with promising skills indicative of future growth within the organisation' },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "Skillvue was integrated into Europ Assistance Italia's hiring process as the first structured step of the funnel, managing pre-screening across multiple profiles and geographic locations. Deployment is recurring, tied primarily to the two annual seasonal peaks.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Heart, label: 'Soft skills — problem solving, customer orientation, goal orientation, teamworking' },
        { icon: Wrench, label: 'English language — B1/B2/C1 tests, a critical skill for a company operating in 39 countries with multilingual customer care' },
        { icon: Layers, label: 'Role-specific hard skills — e.g. Compensation & Benefits for HR roles' },
      ],
      methodologyLabel: 'HOW IT WAS BUILT',
      methodology: [
        {
          title: 'Assessment is done independently as first step',
          text: "After applying, every candidate completes the assessment independently from any device — phone, tablet or laptop.",
        },
        {
          title: 'Structured report for the recruiter',
          text: "The HR team receives an objective, in-depth skills analysis. The first interview is based on data, not impressions.",
        },
        {
          title: 'Human-in-the-loop at every stage',
          text: "The HR team maintains full decision-making control throughout. Skillvue data structures and informs the judgement, without ever replacing the recruiter's evaluation.",
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'What is changing.',
      pillars: [
        { icon: Target, value: <>Higher-quality<br />candidates</>, label: 'less noise, more concrete signals for the HR team' },
        { icon: Zap, value: <>More time<br />for what matters</>, label: 'more personalised and targeted interviews, based on real data' },
        { icon: TrendingUp, value: <>Talent pipeline<br />for the future</>, label: 'hiring with tomorrow already in mind, not just immediate fit' },
      ],
      qualitative: [
        { icon: BarChart3, title: 'Visibility on true potential from the first step', text: 'HR and line managers have structured soft skill data on every candidate before the interview — not just immediate fit, but concrete signals of growth over time.' },
        { icon: Scale, title: 'Recruiters free to do high-value work', text: 'Time saved in pre-screening is reinvested in more in-depth interviews and potential analysis — activities that directly impact hiring quality and retention.' },
        { icon: Heart, title: 'Enhanced candidate experience', text: 'More room for self-expression: when given the chance to prove themselves, candidates respond positively and enthusiastically.' },
      ],
    },
    quote: {
      text: 'I believe hiring and development must speak the same language: the data collected today becomes the foundation for tomorrow\'s growth.',
      author: 'Nicole Cerruti',
      role: 'Recruitment Manager, Europ Assistance Italia',
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Large-scale distribution · Hiring at Scale', headline: 'Carrefour: how to protect margins across 1,200 stores by optimising the key hiring KPI' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function EuropAssistance2StoryPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
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
            <img src="/logos/europ-assistance-background-explore-stories.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push(lang === 'it' ? '/clienti' : '/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Europ Assistance</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-7 flex flex-col">
                <motion.div className="flex flex-col flex-1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase mb-8 block w-fit" style={{ background: 'rgba(75,77,247,0.15)', color: '#7b7df9', border: '1px solid rgba(75,77,247,0.2)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.25 }}>
                    {c.headline.before}<span style={{ color: '#7b7df9' }}>{c.headline.highlight1}</span>{c.headline.middle}<span style={{ color: '#7b7df9' }}>{c.headline.highlight2}</span>{c.headline.after}
                  </h1>
                  <p className="text-[17px] text-white/[0.60] leading-[1.75] mb-10 max-w-2xl">{c.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-300" style={{ background: '#4b4df7' }}>
                      {c.ctaPrimary} <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => document.getElementById('context-section')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white/70 border border-white/[0.15] hover:border-white/[0.25] hover:text-white transition-all duration-300">
                      {c.ctaSecondary} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  {/* Metrics — pinned to bottom, aligned with video */}
                  <div className="mt-auto pt-10 grid grid-cols-2 gap-4">
                    {c.heroMetrics.map(m => (
                      <div key={m.value} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-8 py-7">
                        <span className="block text-white" style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[14px] text-white/[0.55] mt-2.5 block leading-[1.4]">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Client card + video */}
              <motion.div className="lg:col-span-5 flex flex-col" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.08]">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white flex items-center justify-center">
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
                {/* Video */}
                <div className="mt-4 rounded-2xl border border-white/[0.08] overflow-hidden flex-1 min-h-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${lang === 'it' ? 'sPkKN_MED1c' : 'OYb81Qw3_IM'}?autoplay=1&mute=1`}
                    title="Europ Assistance – Skillvue"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    style={{ border: 0 }}
                  />
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.objectives.badge}</span>
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
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{c.solution.intro}</p>

              <div className="mb-12">
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

              <div>
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.methodologyLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.solution.methodology.map((m, i) => (
                    <div key={m.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm relative overflow-hidden">
                      <span className="absolute top-5 right-6 text-[3rem] font-black leading-none select-none" style={{ color: 'rgba(75,77,247,0.04)' }}>0{i + 1}</span>
                      <h4 className="text-[15px] font-bold text-[#121212] mb-3 leading-[1.4] relative">{m.title}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65] relative">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#121212] leading-[1.4] mb-10">{c.results.title}</h2>

              {/* Qualitative pillars */}
              <div className="rounded-2xl bg-[#0E0E0E] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
                  {c.results.pillars.map(({ icon: Icon, value, label }) => (
                    <div key={value} className="text-center flex flex-col items-center">
                      <div className="w-16 h-16 mb-5 flex items-center justify-center rounded-2xl" style={{ background: 'rgba(75,77,247,0.12)' }}>
                        <Icon className="h-8 w-8" style={{ color: '#4b4df7' }} />
                      </div>
                      <span className="block text-white font-bold mb-2 leading-tight" style={{ fontSize: 'clamp(0.95rem,1.8vw,1.15rem)', letterSpacing: '-0.02em' }}>{value}</span>
                      <span className="text-[13px] text-white/[0.55] leading-[1.4]">{label}</span>
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
                    <h4 className="text-[15px] font-bold text-[#121212] mb-3 leading-[1.4]">{q.title}</h4>
                    <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{q.text}</p>
                  </div>
                ))}
              </div>

            </Section>

            {/* QUOTE */}
            <Section>
              <div className="rounded-2xl border border-[#4b4df7]/[0.12] bg-gradient-to-br from-[#4b4df7]/[0.04] to-transparent p-8 lg:p-10">
                <p className="text-[17px] text-[#121212]/75 leading-[1.75] italic mb-6">"{c.quote.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#4b4df7]/[0.15]">
                    <img src="/logos/europ-assistance-nicole.jpg" alt={c.quote.author} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#121212]/80">{c.quote.author}</p>
                    <p className="text-[12px] text-[#121212]/40 leading-[1.5]">{c.quote.role}</p>
                  </div>
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
