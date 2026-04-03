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
      before: 'Carrefour: come proteggere i margini su ',
      highlight1: '1.200 punti vendita',
      middle: ' ottimizzando il ',
      highlight2: 'KPI chiave del processo di selezione',
      after: '',
    },
    subtitle: "In un settore dove il costo del lavoro è 3.4x l'utile operativo, Carrefour Italia ha trasformato la selezione in una vera e propria leva di profittabilità, grazie a dati chiari sulle persone e sulle loro competenze.",
    heroMetrics: [
      { value: '-35%', label: 'Time-to-Hire' },
      { value: '+20%', label: 'Successo assunzioni' },
      { value: 'Fino a 6.000', label: 'Persone valutate in 1 mese' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'GDO' },
        { label: 'Gruppo', value: 'Carrefour Group' },
        { label: 'Fatturato', value: '~4,5 mld €' },
        { label: 'Dipendenti', value: '13.000+ diretti + 8.000 rete franchising' },
        { label: 'Punti vendita', value: '~1.200' },
        { label: 'Use Case', value: 'Hiring, Learning & Development' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Carrefour Italia (oggi <strong className="text-[#1A1A2E]/80 font-semibold">Princes Retail S.p.A.</strong>) gestisce circa <strong className="text-[#1A1A2E]/80 font-semibold">1.200 punti vendita</strong> su 4 formati — Ipermercati, Market, Express, Cash &amp; Carry — con <strong className="text-[#1A1A2E]/80 font-semibold">13.000 dipendenti diretti</strong> e una rete franchising di 8.000 persone.
        <br /><br />
        In un settore dove il costo del lavoro pesa per il <strong className="text-[#1A1A2E]/80 font-semibold">9.8% del fatturato</strong> (3.4 volte l'utile operativo), ogni decisione sulle persone diventa necessariamente anche una decisione sui margini. In questo scenario, la capacità di mettere la persona giusta nel ruolo giusto — a scala, con dati — non era un tema HR: era un prerequisito per proteggere la profittabilità. Carrefour riceveva fino a <strong className="text-[#1A1A2E]/80 font-semibold">30.000 candidature l'anno</strong>, che dovevano essere gestite da soli <strong className="text-[#1A1A2E]/80 font-semibold">3 recruiter</strong>, senza alcuno strumento in grado di distinguere, su 1.200 punti vendita, chi avrebbe performato rispetto a chi sarebbe uscito entro pochi mesi.
      </>,
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: "Carrefour Italia aveva un vincolo operativo chiaro: scalare la qualità della selezione senza moltiplicare le risorse, in un settore dove ogni assunzione sbagliata erode direttamente i margini.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR REALITY',
      businessChallenges: [
        {
          icon: Target,
          title: 'Costo delle possibili assunzioni errate',
          text: "Il costo di sostituzione varia da €3.000 a €6.600 per un frontline, fino a €90.000 per uno store manager. Ogni assunzione sbagliata erode direttamente i margini.",
        },
        {
          icon: Layers,
          title: 'Contesto multi-formato',
          text: "4 formati retail, profili e competenze diverse. 3 recruiter non potevano garantire profondità di valutazione su 1.200 punti vendita senza impattare le performance di store.",
        },
        {
          icon: Eye,
          title: 'Competenze invisibili sulla rete vendita',
          text: "Per migliaia di dipendenti non esisteva alcuna mappatura strutturata. Promozioni, formazione, mobilità interna: tutte decisioni senza dati.",
        },
      ],
      hrChallenges: [
        {
          icon: BarChart3,
          title: 'Il CV non prediceva la performance',
          text: "Per profili junior e operativi — la maggioranza delle 30.000 candidature — i CV sono un indicatore inefficace. Orientamento al cliente, problem solving, adattamento: invisibili sulla carta.",
        },
        {
          icon: Wrench,
          title: 'Pre-screening senza output strutturato',
          text: "Decisioni basate sul giudizio del recruiter e colloqui non strutturati, con un calo dell'accuratezza predittiva del 14%. Nessun dato sulle competenze prima del colloquio.",
        },
        {
          icon: Users,
          title: 'Il modello di competenze esisteva sulla carta, non nel processo',
          text: "Il modello di competenze era definito per ogni ruolo, ma le assunzioni non avvenivano con valutazione sistematica rispetto ad esso.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: "Scalare il pre-screening senza sacrificare la qualità: gestire 30.000 candidature/anno con 3 recruiter, riducendo la dipendenza da headhunter esterni e liberando tempo per valutazione approfondita ed employer branding" },
        { icon: CheckCircle, text: "Integrare il modello di leadership proprietario nella selezione: valutare soft e hard skill allineate al framework Carrefour, con output strutturato su ogni candidato prima del primo colloquio" },
        { icon: Layers, text: "Coprire un'organizzazione multi-formato: uno strumento unico adattabile a profili diversi — stage HQ, ruoli operativi su più formati, profili di leadership — ciascuno con un mix specifico di competenze" },
        { icon: TrendingUp, text: "Costruire un ponte tra selezione e sviluppo: allineare le competenze misurate in fase di hiring con quelle sviluppate internamente, creando le basi per un modello skills-based che copra l'intero ciclo del talento" },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Skillvue è stato integrato come prima cosa nel processo di selezione dei profili junior, per poi essere progressivamente esteso anche alla popolazione interna.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Heart, label: "Soft skill allineate al modello di leadership proprietario" },
        { icon: Wrench, label: "Hard skill per ruoli store (co-sviluppate sul modello Carrefour)" },
      ],
      methodologyLabel: 'COME È STATO COSTRUITO',
      methodology: [
        {
          title: "01 — Integrazione con il modello di leadership proprietario",
          text: "Il modello di leadership Carrefour è stato integrato negli assessment Skillvue, calibrando contenuti e comportamenti osservabili. Ogni candidato riceve una valutazione strutturata prima ancora del primo colloquio, con la scalabilità e l'oggettività che solo un assessment science-backed può garantire.",
        },
        {
          title: "02 — Architettura multi-canale, processo unico",
          text: "Assessment configurati per profili diversi — stage HQ, ruoli operativi, leadership — ciascuno con mix specifico di soft e hard skill. Il recruiter riceve un report strutturato con profilo di competenze e matching rispetto al ruolo. Un unico standard su 4 formati e 1.200 punti vendita.",
        },
        {
          title: "03 — Da hiring alla mappatura della rete vendita",
          text: "Il valore dimostrato nella selezione ha portato all'estensione alla rete vendita: 6.000 dipendenti mappati sulle competenze in 1 mese, sostituendo l'osservazione in presenza. Per la prima volta, un unico linguaggio dalla selezione allo sviluppo.",
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: "I risultati misurabili ottenuti da Carrefour Italia attraverso l'adozione di Skillvue nei processi di selezione e mappatura interna.",
      metrics: [
        { value: '-35%', label: 'Time-to-hire' },
        { value: '65% → 85%', label: 'Tasso successo selezioni portate avanti da Hiring Manager' },
        { value: '6.000', label: 'Dipendenti mappati in 1 mese' },
      ],
      qualitative: [
        { icon: CheckCircle, title: 'Shortlist radicalmente più qualificate', text: "I candidati portati avanti nel processo erano più allineati alle aspettative, con riduzione diretta dei colloqui senza esito. Su 30.000 candidature/anno, centinaia di errori evitati, ciascuno con un costo di €3.000–6.600." },
        { icon: Eye, title: 'Talento nascosto scoperto nella rete', text: "La mappatura di 6.000 dipendenti ha fatto emergere profili ad alto potenziale dove prima non esisteva alcuna visibilità. In un mercato dove formare internamente costa il 30–50% in meno rispetto a reclutare dall'esterno, sapere chi hai è il primo passo per smettere di rincorrere il fabbisogno sul mercato." },
        { icon: Wrench, title: 'Il modello di leadership ha preso davvero vita', text: "Il framework proprietario è diventato un criterio di selezione misurabile. Ogni candidato viene valutato con output strutturato: il modello informa le decisioni, non solo i valori dichiarati." },
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Insurance · Hiring at Scale', headline: 'Come Europ Assistance ha assunto il 24% in più con il 18% di colloqui in meno.' },
        { id: 'subdued', company: 'Subdued', tag: 'Retail Fashion · Hiring', headline: "Subdued: come creare uno standard di selezione unico e scalabile per l'espansione di una rete di 130+ negozi" },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'Carrefour: how to protect margins across ',
      highlight1: '1,200 stores',
      middle: ' by optimising the ',
      highlight2: 'key hiring KPI',
      after: '',
    },
    subtitle: "In a sector where labour cost is 3.4x operating profit, Carrefour Italia turned hiring into a real profitability lever — with clear data on people and their competencies.",
    heroMetrics: [
      { value: '-35%', label: 'Time-to-Hire' },
      { value: '+20%', label: 'Hiring success rate' },
      { value: 'Up to 6,000', label: 'People assessed in 1 month' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'GDO' },
        { label: 'Group', value: 'Carrefour Group' },
        { label: 'Revenue', value: '~€4.5B' },
        { label: 'Employees', value: '13,000+ direct + 8,000 franchise network' },
        { label: 'Stores', value: '~1,200' },
        { label: 'Use Case', value: 'Hiring, Learning & Development' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Carrefour Italia (now <strong className="text-[#1A1A2E]/80 font-semibold">Princes Retail S.p.A.</strong>) operates approximately <strong className="text-[#1A1A2E]/80 font-semibold">1,200 stores</strong> across 4 formats — Hypermarkets, Market, Express, Cash &amp; Carry — with <strong className="text-[#1A1A2E]/80 font-semibold">13,000 direct employees</strong> and a franchise network of 8,000 people.
        <br /><br />
        In a sector where labour cost accounts for <strong className="text-[#1A1A2E]/80 font-semibold">9.8% of revenue</strong> (3.4 times operating profit), every people decision is inevitably also a margin decision. In this context, the ability to put the right person in the right role — at scale, with data — was not an HR issue: it was a prerequisite for protecting profitability. Carrefour received up to <strong className="text-[#1A1A2E]/80 font-semibold">30,000 applications per year</strong>, managed by just <strong className="text-[#1A1A2E]/80 font-semibold">3 recruiters</strong>, with no tool capable of distinguishing — across 1,200 stores — who would perform from who would leave within months.
      </>,
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: "Carrefour Italia had a clear operational constraint: scale selection quality without multiplying resources — in a sector where every wrong hire directly erodes margins.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR REALITY',
      businessChallenges: [
        {
          icon: Target,
          title: 'Cost of potential wrong hires',
          text: "Frontline replacement costs €3,000–6,600; a store manager can reach €40,000–90,000. Keeping selection quality high and turnover low was a direct financial imperative.",
        },
        {
          icon: Layers,
          title: 'Multi-format complexity',
          text: "4 retail formats, each with different profiles and competencies. 3 recruiters could not guarantee evaluation depth across 1,200 stores without risking store performance.",
        },
        {
          icon: Eye,
          title: 'Competencies invisible across the store network',
          text: "For thousands of employees, no structured mapping existed. Decisions on who to promote, where to invest in training, who was ready for more responsibility had no data behind them.",
        },
      ],
      hrChallenges: [
        {
          icon: BarChart3,
          title: "CVs didn't predict performance",
          text: "For junior and operational profiles — most of the 30,000 annual applications — CVs are a poor predictor. Customer orientation, problem solving, adaptability: all invisible on paper.",
        },
        {
          icon: Wrench,
          title: 'Pre-screening with no structured output',
          text: "Decisions relied on individual judgment and unstructured interviews, reducing predictive accuracy by 14%. No competency data before the interview.",
        },
        {
          icon: Users,
          title: 'The competency model existed on paper, not in the process',
          text: "Carrefour had defined critical behaviours for each role, but hiring could not always happen with a systematic evaluation against that framework.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Zap, text: "Scale pre-screening without sacrificing quality: handle 30,000 applications/year with 3 recruiters, reducing reliance on external headhunters and freeing time for in-depth evaluation and employer branding" },
        { icon: CheckCircle, text: "Integrate the proprietary leadership model into selection: assess soft and hard skills aligned to the Carrefour framework, with structured output on every candidate before the first interview" },
        { icon: Layers, text: "Cover a multi-format organization: a single adaptable tool for different profiles — HQ internships, operational roles across multiple store formats, leadership profiles — each with a specific competency mix" },
        { icon: TrendingUp, text: "Build a bridge between selection and development: align competencies measured at hiring with those developed internally, creating the foundation for a skills-based model covering the entire talent lifecycle" },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "Skillvue was integrated first into the selection process for junior profiles, then progressively extended to the internal workforce.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Heart, label: "Soft skills aligned to the proprietary leadership model" },
        { icon: Wrench, label: "Hard skills for store roles (co-developed on the Carrefour model)" },
      ],
      methodologyLabel: 'HOW IT WAS BUILT',
      methodology: [
        {
          title: "01 — Integration with the proprietary leadership model",
          text: "Carrefour's leadership model was integrated into Skillvue assessments, calibrating content and observable behaviours. Every candidate receives a structured evaluation before their first interview, with the scalability and objectivity that only a science-backed assessment can guarantee.",
        },
        {
          title: "02 — Multi-channel architecture, one process",
          text: "Assessments configured for different profiles — HQ internships, operational roles, leadership — each with a specific mix of soft and hard skills. The recruiter receives a structured report with competency profile and role matching. One single standard across 4 formats and 1,200 stores.",
        },
        {
          title: "03 — From hiring to store network mapping",
          text: "The value demonstrated in selection led to extending the model to the store network: 6,000 employees mapped on competencies in 1 month, replacing in-person observation. For the first time, a single language from selection to development.",
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The measurable outcomes Carrefour Italia achieved through Skillvue across selection and internal skills mapping.',
      metrics: [
        { value: '-35%', label: 'Time-to-hire' },
        { value: '65% → 85%', label: 'Success rate of selections advanced by Hiring Managers' },
        { value: '6,000', label: 'Employees mapped in 1 month' },
      ],
      qualitative: [
        { icon: CheckCircle, title: 'Radically more qualified shortlists', text: "Candidates advanced in the process were more aligned to expectations, with a direct reduction in interviews that didn't lead to a hire. Across 30,000 applications/year, hundreds of mistakes avoided — each costing €3,000–6,600." },
        { icon: Eye, title: 'Hidden talent discovered in the network', text: "Mapping 6,000 employees surfaced high-potential profiles where no visibility previously existed. In a market where developing internally costs 30–50% less than external hiring, knowing who you have is the first step to stop chasing demand on the market." },
        { icon: Wrench, title: 'The leadership model came to life in practice', text: "The proprietary framework became a measurable selection criterion. Every candidate is evaluated with structured output: the model informs decisions, not just declared values." },
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Insurance · Hiring at Scale', headline: 'How Europ Assistance hired 24% more with 18% fewer interviews.' },
        { id: 'subdued', company: 'Subdued', tag: 'Retail Fashion · Hiring', headline: 'Subdued: building a single scalable selection standard for a network of 130+ stores' },
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
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                      <img src="/logos/carrefour.png" alt="Carrefour logo" className="w-full h-full object-contain " />
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-6">{c.context.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.85] mb-8">{c.context.paragraph}</p>
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.challenge.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{c.challenge.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-14">{c.challenge.intro}</p>

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
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12">{c.solution.intro}</p>

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

              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
                  {/* -35% circular progress */}
                  <div className="text-center flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-5">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#4b4df7" strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40 * 0.35} ${2 * Math.PI * 40}`} />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[0].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[0].label}</span>
                  </div>
                  {/* 65% → 85% — before/after bars */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-center justify-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <div className="rounded-sm bg-white/25" style={{ width: 18, height: 52 }} />
                        <span className="text-[9px] text-white/30 font-semibold">65%</span>
                      </div>
                      <svg viewBox="0 0 16 16" className="w-4 h-4 text-white/30" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="flex flex-col items-center gap-1">
                        <div className="rounded-sm bg-[#4b4df7]" style={{ width: 18, height: 68 }} />
                        <span className="text-[9px] text-white/50 font-semibold">85%</span>
                      </div>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[1].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[1].label}</span>
                  </div>
                  {/* 6.000 — people icon */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-center justify-center">
                      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
                        <circle cx="22" cy="22" r="10" fill="rgba(75,77,247,0.3)" stroke="#4b4df7" strokeWidth="2.5"/>
                        <circle cx="42" cy="22" r="10" fill="rgba(75,77,247,0.2)" stroke="rgba(75,77,247,0.5)" strokeWidth="2.5"/>
                        <path d="M4 52c0-10 8-18 18-18s18 8 18 18" stroke="#4b4df7" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M36 52c0-10 8-18 18-18" stroke="rgba(75,77,247,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[2].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[2].label}</span>
                  </div>
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
