// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle } from 'lucide-react';
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
      before: 'Gruppo Credem: come scovare i migliori talenti tra ',
      highlight1: '30.000 candidature',
      middle: ' per nutrire la ',
      highlight2: 'crescita del business',
      after: '',
    },
    subtitle: "Con Skillvue, Gruppo Credem ha dimezzato il time-to-hire e raddoppiato la qualità dei candidati in colloquio davanti a decine di migliaia di application di profili junior ricevuti ogni anno.",
    heroMetrics: [
      { value: '-50%', label: 'Time-to-hire' },
      { value: '+50%', label: 'Fit-to-hire al colloquio' },
      { value: '-15%', label: 'Riduzione colloqui non in linea' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Financial Services' },
        { label: 'Gruppo', value: 'Credito Emiliano' },
        { label: 'Utile netto', value: '+620M€' },
        { label: 'Dipendenti', value: '5.000+' },
        { label: 'Filiali', value: '600+' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Una banca in crescita costante ha bisogno di selezionare talento alla velocità del business',
      paragraph: <>
        Gruppo Credem (Credito Emiliano) è uno dei gruppi bancari privati più accreditati d'Italia e d'Europa. Con un utile netto di <strong className="text-[#121212]/80 font-semibold">€620 milioni nel 2025</strong>, è riconosciuta come una delle realtà più solide per qualità degli attivi e gestione del rischio. Al tempo stesso è anche, e soprattutto, una banca che cresce: mentre il settore bancario italiano chiude sportelli e riduce l'organico, Credem fa il contrario: dal 2020 ha creato oltre <strong className="text-[#121212]/80 font-semibold">1.400 nuovi posti di lavoro</strong>.
        <br /><br />
        Questa crescita genera un nodo cruciale per HR: ogni anno Credem riceve e si ritrova a gestire circa <strong className="text-[#121212]/80 font-semibold">30.000 candidature</strong>, in larga parte da profili junior, diplomati e neolaureati che si candidano attraverso il <strong className="text-[#121212]/80 font-semibold">Progetto Giovani</strong>, il principale canale di ingresso del gruppo. In un settore dove l'età media dei dipendenti è di oltre <strong className="text-[#121212]/80 font-semibold">48 anni</strong> e il <strong className="text-[#121212]/80 font-semibold">20-25%</strong> della forza lavoro raggiungerà il pensionamento entro il 2035, la capacità di identificare e inserire giovani ad alto potenziale è fondamentale per poter supportare la crescita del business.
      </>,
    },
    challenge: {
      badge: 'LA SFIDA',
      title: '30.000 candidature e tanti profili junior poco valorizzati dal semplice CV',
      intro: "In un mercato dove banche, fintech e tech company competono per gli stessi profili junior, la velocità e la qualità del processo di selezione sono diventate leve competitive ed elementi imprescindibili per l'ottenimento di una Candidate Experience all'altezza delle aspettative.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Zap,
          title: "Serviva un'infrastruttura capace di lavorare su grandi volumi per seguire la crescita del Gruppo",
          text: "Gestire 30.000 candidature con strumenti tradizionali significava dover scegliere tra velocità e qualità. Era necessario potenziare il processo accelerando le fasi operative e mantenendo il giudizio umano al centro delle decisioni.",
        },
        {
          icon: Heart,
          title: "L'esperienza candidato doveva essere all'altezza del brand",
          text: "Per una banca certificata Top Employer per 10 anni consecutivi ed Equal Salary per 5, ogni punto di contatto con i candidati è fondamentale. Un processo di selezione moderno, rapido, inclusivo e allineato ai valori del Gruppo era fondamentale.",
        },
        {
          icon: TrendingUp,
          title: 'I giovani ad alto potenziale dovevano aver modo di emergere ed essere inseriti',
          text: "Lo screening basato sul CV non riusciva a differenziare i profili junior: le soft skill decisive per questi ruoli erano invisibili nel primo step. Il risultato erano troppi falsi positivi in colloquio e troppi talenti non intercettati.",
        },
      ],
      hrChallenges: [
        {
          icon: BarChart3,
          title: 'Bisognava dare a ogni candidato la possibilità di farsi conoscere',
          text: "Con 30.000 candidature l'anno, non è fisicamente possibile dare a ogni candidato uno spazio autentico per esprimersi con gli strumenti tradizionali. Senza un canale strutturato, i profili più motivati e ad alto potenziale rischiavano di restare invisibili.",
        },
        {
          icon: Users,
          title: 'Il time-to-hire andava ottimizzato per non perdere i candidati migliori',
          text: "La velocità del processo era una delle leve competitive più importanti sulle quali lavorare per assicurarsi di garantire un'esperienza di selezione ottimale e di non perdere nessuno dei candidati più promettenti.",
        },
        {
          icon: Target,
          title: 'La qualità della selezione doveva essere il più possibile omogenea per tutto il Gruppo',
          text: "Garantire standard di screening uniformi per un Gruppo che è distribuito su oltre 600 filiali in 19 regioni era una sfida operativa e di equità. Senza un filtro centralizzato e strutturato, la qualità della selezione poteva variare molto.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Target, text: "Rendere il primo filtro più selettivo e predittivo: intercettare i profili ad alto potenziale nascosti nelle 30.000 candidature ricevute annualmente, riducendo il margine di errore" },
        { icon: Zap, text: "Ridurre il time-to-hire e ottimizzare le shortlist: rispondere più rapidamente ai candidati che risultano in linea con i valori del Gruppo e con le posizioni aperte per portarli a colloquio" },
        { icon: Layers, text: "Garantire standard di selezione omogenei: mantenere lo stesso livello di profondità e qualità della valutazione per tutti i candidati a prescindere dal momento o dal luogo di candidatura." },
        { icon: Heart, text: "Migliorare la Candidate Experience: rendere l'intero processo accessibile, rapido ed equo - un'opportunità autentica di farsi conoscere, coerente con il posizionamento Top Employer di Gruppo Credem" },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Skillvue è stato integrato nel processo di selezione del Progetto Giovani con un approccio graduale e data-driven: prima la validazione su un perimetro iniziale, poi l'estensione progressiva.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Target, label: 'Resilienza' },
        { icon: Users, label: 'Intelligenza emotiva' },
        { icon: Layers, label: 'Orientamento agli obiettivi' },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Cosa è cambiato e perché conta',
      metrics: [
        { value: '-50%', label: 'Time-to-hire' },
        { value: '+50%', label: 'Fit-to-hire al colloquio' },
        { value: '-15%', label: 'Colloqui non in linea' },
      ],
      qualitative: [
        { icon: Eye, title: 'Più candidati dimostrano il proprio valore', text: "L'assessment ha dato a più persone la possibilità di far emergere competenze reali oltre i limiti del CV. Profili ad alto potenziale che prima si perdevano nel volume ora vengono intercettati efficacemente e rapidamente." },
        { icon: CheckCircle, title: 'Qualità dei colloqui radicalmente migliorata', text: "Il +50% di fit-to-hire significa che il secondo step del processo è diventato più efficiente: meno tempo speso in interviste a basso rendimento, più decisioni consapevoli, cicli di feedback più rapidi." },
        { icon: Layers, title: 'Human-in-the-loop, sempre', text: "L'assessment non produce un verdetto: produce informazioni utili a rendere il decision-making più consapevole ed efficace. I dati prodotti dall'AI di Skillvue alimentano la decisione che rimane però sempre in mano ai recruiter." },
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring at Scale', headline: 'Carrefour: come proteggere i margini su 1.200 punti vendita ottimizzando il KPI chiave del processo di selezione' },
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Insurance · Hiring', headline: 'Europ Assistance: come riconoscere il potenziale che resiste alla prova del tempo in un business fondato sulla componente umana' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'Gruppo Credem: how to find the best talent among ',
      highlight1: '30,000 applications',
      middle: ' to fuel ',
      highlight2: 'business growth',
      after: '',
    },
    subtitle: "With Skillvue, Gruppo Credem halved time-to-hire and doubled the quality of candidates in interviews, managing tens of thousands of junior profile applications received every year.",
    heroMetrics: [
      { value: '-50%', label: 'Time-to-hire' },
      { value: '+50%', label: 'Fit-to-hire in interviews' },
      { value: '-15%', label: 'Reduction in misaligned interviews' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Financial Services' },
        { label: 'Group', value: 'Credito Emiliano' },
        { label: 'Net profit', value: '+€620M' },
        { label: 'Employees', value: '5,000+' },
        { label: 'Branches', value: '600+' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'A bank in sustained growth needs to hire talent at the speed of the business',
      paragraph: <>
        Gruppo Credem (Credito Emiliano) is one of Italy's and Europe's most respected private banking groups. With a net profit of <strong className="text-[#121212]/80 font-semibold">€620 million in 2025</strong>, it is recognised as one of the most solid institutions for asset quality and risk management. It is also, and above all, a bank that grows: while the Italian banking sector closes branches and reduces headcount, Credem does the opposite: since 2020 it has created over <strong className="text-[#121212]/80 font-semibold">1,400 new jobs</strong>.
        <br /><br />
        This growth creates a critical challenge for HR: every year Credem receives and manages around <strong className="text-[#121212]/80 font-semibold">30,000 applications</strong>, largely from junior profiles, school leavers and recent graduates applying through the <strong className="text-[#121212]/80 font-semibold">Progetto Giovani</strong>, the group's main entry channel. In a sector where the average employee age exceeds <strong className="text-[#121212]/80 font-semibold">48</strong> and <strong className="text-[#121212]/80 font-semibold">20–25%</strong> of the workforce will reach retirement by 2035, the ability to identify and onboard high-potential young talent is fundamental to supporting the growth of the business.
      </>,
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: '30,000 applications and many junior profiles underserved by a simple CV',
      intro: "In a market where banks, fintechs and tech companies compete for the same junior profiles, the speed and quality of the selection process have become competitive levers and essential elements in delivering a Candidate Experience that meets expectations.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Zap,
          title: 'An infrastructure capable of handling high volumes to support the Group\'s growth',
          text: "Managing 30,000 applications with traditional tools meant having to choose between speed and quality. It was necessary to strengthen the process by accelerating operational steps while keeping human judgement at the centre of every decision.",
        },
        {
          icon: Heart,
          title: "The candidate experience had to match the brand",
          text: "For a bank certified Top Employer for 10 consecutive years and Equal Salary for 5, every candidate touchpoint is fundamental. A modern, fast, inclusive hiring process aligned with the Group's values was essential.",
        },
        {
          icon: TrendingUp,
          title: 'High-potential young talent needed a way to stand out and be hired',
          text: "CV-based screening could not differentiate junior profiles: the soft skills that truly matter for these roles were invisible at the first step. The result was too many false positives in interviews and too many talented candidates missed.",
        },
      ],
      hrChallenges: [
        {
          icon: BarChart3,
          title: 'Every candidate needed a real chance to be heard',
          text: "At 30,000 applications a year, it is not physically possible to give every candidate an authentic space to demonstrate who they are using traditional tools. Without a structured channel, the most motivated and high-potential profiles risked going unheard.",
        },
        {
          icon: Users,
          title: 'Time-to-hire needed to be optimised to avoid losing the best candidates',
          text: "Process speed was one of the most important competitive levers to work on to ensure an optimal selection experience and avoid losing any of the most promising candidates.",
        },
        {
          icon: Target,
          title: 'Selection quality needed to be as consistent as possible across the Group',
          text: "Guaranteeing uniform screening standards for a Group distributed across 600+ branches in 19 regions was both an operational and a fairness challenge. Without a centralised, structured filter, hiring quality could vary significantly.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change',
      items: [
        { icon: Target, text: "Make the first filter more selective and predictive: identify high-potential profiles hidden among the 30,000 applications received annually, reducing the margin of error" },
        { icon: Zap, text: "Reduce time-to-hire and optimise shortlists: respond more quickly to candidates aligned with the Group's values and open roles to bring them to interview" },
        { icon: Layers, text: "Guarantee consistent selection standards: maintain the same depth and quality of evaluation for all candidates regardless of when or where they applied." },
        { icon: Heart, text: "Improve the Candidate Experience: make the entire process accessible, fast and fair - a genuine opportunity to be heard, consistent with Gruppo Credem's Top Employer positioning" },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "Skillvue was integrated into the Progetto Giovani hiring process with a gradual, data-driven approach: first validation on an initial perimeter, then progressive extension.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Target, label: 'Resilienza' },
        { icon: Users, label: 'Intelligenza emotiva' },
        { icon: Layers, label: 'Orientamento agli obiettivi' },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: "What changed and why it matters",
      metrics: [
        { value: '-50%', label: 'Time-to-hire' },
        { value: '+50%', label: 'Fit-to-hire in interviews' },
        { value: '-15%', label: 'Misaligned interviews' },
      ],
      qualitative: [
        { icon: Eye, title: 'More candidates get to demonstrate their value', text: "The assessment gave more people the opportunity to surface real skills beyond the CV. High-potential profiles that previously got lost in the volume are now identified effectively and quickly." },
        { icon: CheckCircle, title: 'Radically improved interview quality', text: "The +50% fit-to-hire means the second step of the process has become more efficient: less time spent on low-yield interviews, more informed decisions, faster feedback cycles." },
        { icon: Layers, title: 'Human-in-the-loop, always', text: "The assessment doesn't produce a verdict: it produces information that makes decision-making more informed and effective. The data produced by Skillvue's AI feeds the decision, which always remains in the hands of the recruiters." },
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Large-scale distribution · Hiring at Scale', headline: 'Carrefour: how to protect margins across 1,200 stores by optimising the key hiring KPI' },
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Insurance · Hiring', headline: 'Europ Assistance: how to recognise the potential that stands the test of time in a business built on human interaction' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function CredemStoryPage() {
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
            <img src="/logos/credem-background-explore-stories.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push(lang === 'it' ? '/clienti' : '/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Gruppo Credem</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium tracking-[0.08em] uppercase mb-8 block w-fit text-white/85 border border-white/15" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-semibold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.25 }}>
                    {c.headline.before}<span style={{ color: '#7b7df9' }}>{c.headline.highlight1}</span>{c.headline.middle}<span style={{ color: '#7b7df9' }}>{c.headline.highlight2}</span>{c.headline.after}
                  </h1>
                  <p className="text-[17px] text-white/[0.60] leading-[1.75] mb-12 max-w-2xl">{c.subtitle}</p>
                  <div className="flex flex-wrap gap-4 mb-12">
                    {c.heroMetrics.map(m => (
                      <div key={m.label} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-4">
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
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                      <img src="/logos/credem-logo (2).png" alt="Gruppo Credem logo" className="w-full h-full object-contain " />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Gruppo Credem</p>
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-6">{c.context.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.85] mb-8">{c.context.paragraph}</p>
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.challenge.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{c.challenge.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-14">{c.challenge.intro}</p>

              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.challenge.businessLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.challenge.businessChallenges.map((ch) => (
                    <div key={ch.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
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
                    <div key={ch.title} className="rounded-2xl border border-[#4b4df7]/[0.1] bg-[#4b4df7]/[0.02] p-7">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.1)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
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
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.objectives.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-10">{c.objectives.title}</h2>
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{c.solution.title}</h2>
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
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4] relative">{m.title.replace(/^\d+\s*[—\-]+\s*/, '')}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65] relative">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-12">{c.results.title}</h2>

              <div className="rounded-2xl bg-[#0E0E0E] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
                  {/* -50% circular progress */}
                  <div className="text-center flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-5">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#4b4df7" strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40 * 0.50} ${2 * Math.PI * 40}`} />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[0].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[0].label}</span>
                    {c.results.metrics[0].sublabel && <span className="text-[11px] text-white/30 mt-1 block">{c.results.metrics[0].sublabel}</span>}
                  </div>
                  {/* +50% upward bar chart */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-end justify-center gap-1.5 pb-2">
                      <div className="rounded-sm bg-white/20" style={{ width: 14, height: 30 }} />
                      <div className="rounded-sm bg-white/35" style={{ width: 14, height: 44 }} />
                      <div className="rounded-sm bg-white/55" style={{ width: 14, height: 58 }} />
                      <div className="rounded-sm bg-[#4b4df7]" style={{ width: 14, height: 76 }} />
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[1].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[1].label}</span>
                    {c.results.metrics[1].sublabel && <span className="text-[11px] text-white/30 mt-1 block">{c.results.metrics[1].sublabel}</span>}
                  </div>
                  {/* -15% circular progress */}
                  <div className="text-center flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-5">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#4b4df7" strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40 * 0.15} ${2 * Math.PI * 40}`} />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[2].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[2].label}</span>
                    {c.results.metrics[2].sublabel && <span className="text-[11px] text-white/30 mt-1 block">{c.results.metrics[2].sublabel}</span>}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {c.results.qualitative.map((q) => (
                  <div key={q.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <q.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{q.title}</h4>
                    <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{q.text}</p>
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
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-white/90 leading-[1.4] mb-12">{c.related.title}</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {c.related.stories.map(s => (
                <button key={s.id} onClick={() => { router.push(`${lang === 'it' ? '/clienti' : '/customers'}/${s.id}`); window.scrollTo(0, 0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 lg:p-14 transition-all duration-500">
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
