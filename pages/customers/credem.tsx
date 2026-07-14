// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { Button } from '@/components/ui/button';
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
      middle: ' per seguire la ',
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
        Gruppo Credem (Credito Emiliano) è uno dei gruppi bancari privati più accreditati d'Italia e d'Europa. Con un utile netto di <strong className="text-[#121212]/80 font-semibold">+620 milioni di euro nel 2025</strong>, è riconosciuta come una delle realtà più solide per qualità degli attivi e gestione del rischio. Al tempo stesso è anche, e soprattutto, una banca che cresce: mentre il settore bancario italiano chiude sportelli e riduce l'organico, Credem fa il contrario: dal 2020 ha creato oltre <strong className="text-[#121212]/80 font-semibold">1.400 nuovi posti di lavoro</strong>.
        <br /><br />
        Questa crescita genera un nodo cruciale per HR: ogni anno Credem riceve e si ritrova a gestire circa <strong className="text-[#121212]/80 font-semibold">30.000 candidature</strong>, in larga parte da profili junior, diplomati e neolaureati che si candidano attraverso il <strong className="text-[#121212]/80 font-semibold">Progetto Giovani</strong>, il principale canale di ingresso del gruppo. In un settore dove l'età media dei dipendenti è di oltre <strong className="text-[#121212]/80 font-semibold">48 anni</strong> e il <strong className="text-[#121212]/80 font-semibold">20-25%</strong> della forza lavoro raggiungerà il pensionamento entro il 2035, la capacità di <strong className="text-[#121212]/80 font-semibold">identificare e inserire velocemente giovani ad alto potenziale</strong> è fondamentale per poter supportare la crescita del business.
      </>,
    },
    challenge: {
      badge: 'LA SFIDA',
      title: '30.000 candidature e tanti profili junior poco valorizzati dal semplice CV',
      intro: "In un mercato dove banche, fintech e tech company spesso competono per gli stessi profili junior, la velocità e la qualità del processo di selezione sono diventate leve competitive ed elementi imprescindibili per l'ottenimento di una Candidate Experience all'altezza delle aspettative.",
      businessLabel: 'BUSINESS CHALLENGES',
      hrLabel: 'HR & PEOPLE CHALLENGES',
      businessChallenges: [
        {
          icon: Zap,
          title: "Serviva un'infrastruttura capace di lavorare su grandi volumi per seguire la crescita del Gruppo",
          text: "Gestire 30.000 candidature senza un supporto tecnologico non era più possibile. Era necessario potenziare il processo accelerando le fasi operative e mantenendo il giudizio umano al centro delle decisioni.",
        },
        {
          icon: Heart,
          title: "L'esperienza candidato doveva essere all'altezza del brand di Gruppo Credem",
          text: "Per una banca certificata Top Employer per 10 anni consecutivi ed Equal Salary per 5, ogni punto di contatto con i candidati è fondamentale. Un processo di selezione moderno e allineato ai valori del Gruppo era fondamentale.",
        },
        {
          icon: TrendingUp,
          title: 'Intercettare il potenziale inespresso era tanto importante per HR quanto per il business',
          text: "Su profili così junior, lo screening basato sul CV non permetteva di differenziare i profili: le soft skill decisive per lo sviluppo di queste figure erano invisibili su carta, e il rischio era quello di non riuscire a intercettare talenti in linea con Gruppo Credem.",
        },
      ],
      hrChallenges: [
        {
          icon: BarChart3,
          title: 'Bisognava ampliare la Talent Pool e dare a ogni candidato la possibilità di farsi conoscere',
          text: "Con 30.000 candidature l'anno e strumenti di selezione tradizionali, non è possibile dare a tutti uno spazio autentico per esprimersi. Senza un supporto tecnologico, i profili più motivati e ad alto potenziale rischiavano di restare invisibili.",
        },
        {
          icon: Users,
          title: 'Il time-to-hire andava ottimizzato per non perdere i candidati migliori',
          text: "La velocità del processo era una delle leve competitive più importanti sulle quali lavorare per assicurarsi di garantire un'esperienza di selezione ottimale e di non perdere nessuno dei candidati più promettenti.",
        },
        {
          icon: Target,
          title: 'La qualità della selezione doveva essere il più possibile omogenea per tutto il Gruppo',
          text: "Garantire standard di screening uniformi per un Gruppo che è distribuito su oltre 600 filiali in 19 regioni era una sfida operativa e di equità. Senza un filtro centralizzato e strutturato, la qualità della selezione rischiava di variare.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Target, text: "Rendere il primo filtro più selettivo e predittivo: intercettare i profili ad alto potenziale nascosti nelle 30.000 candidature ricevute annualmente, riducendo il margine di errore." },
        { icon: Zap, text: "Ridurre il time-to-hire e ottimizzare le shortlist: rispondere più rapidamente ai candidati che risultano in linea con i valori del Gruppo e con le posizioni aperte per portarli a colloquio." },
        { icon: Layers, text: "Garantire standard di selezione omogenei: mantenere lo stesso livello di profondità e qualità della valutazione per tutti i candidati a prescindere dal momento o dal luogo di candidatura." },
        { icon: Heart, text: "Migliorare la Candidate Experience: rendere l'intero processo accessibile, rapido ed equo - un'opportunità autentica di farsi conoscere, coerente con il posizionamento Top Employer di Gruppo Credem." },
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
        { icon: Eye, title: 'Più candidati dimostrano il proprio valore', text: "L'assessment ha dato a più persone la possibilità di far emergere competenze reali oltre i limiti del CV. Profili ad alto potenziale che prima rischiavano di perdersi nel volume ora vengono intercettati efficacemente e rapidamente." },
        { icon: CheckCircle, title: 'Qualità dei colloqui radicalmente migliorata', text: "Il +50% di fit-to-hire significa che il secondo step del processo è diventato più efficiente: meno tempo speso in interviste a basso rendimento, più decisioni consapevoli, cicli di feedback più rapidi." },
        { icon: Layers, title: 'Human-in-the-loop, sempre', text: "L'assessment produce informazioni utili a rendere il decision-making più consapevole ed efficace. I dati prodotti dall'AI di Skillvue alimentano la decisione, che rimane però sempre in mano ai recruiter." },
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
      middle: ' to support ',
      highlight2: 'business growth',
      after: '',
    },
    subtitle: "With Skillvue, Gruppo Credem halved time-to-hire and doubled the quality of candidates in interviews, managing tens of thousands of junior profile applications received every year.",
    heroMetrics: [
      { value: '-50%', label: 'Time-to-hire' },
      { value: '+50%', label: 'Fit-to-hire in interviews' },
      { value: '-15%', label: 'Reduction in unsuccessful interviews' },
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
        Gruppo Credem (Credito Emiliano) is one of Italy's and Europe's most respected private banking groups. With a net profit of <strong className="text-[#121212]/80 font-semibold">+620 million euros in 2025</strong>, it is recognised as one of the most solid institutions for asset quality and risk management. It is also, and above all, a bank that grows: while the Italian banking sector closes branches and reduces headcount, Credem does the opposite: since 2020 it has created over <strong className="text-[#121212]/80 font-semibold">1,400 new jobs</strong>.
        <br /><br />
        This growth creates a critical challenge for HR: every year Credem receives and manages around <strong className="text-[#121212]/80 font-semibold">30,000 applications</strong>, largely from junior profiles, school leavers and recent graduates applying through the <strong className="text-[#121212]/80 font-semibold">Progetto Giovani</strong>, the group's main entry channel. In a sector where the average employee age exceeds <strong className="text-[#121212]/80 font-semibold">48</strong> and <strong className="text-[#121212]/80 font-semibold">20–25%</strong> of the workforce will reach retirement by 2035, the ability to <strong className="text-[#121212]/80 font-semibold">quickly identify and onboard high-potential young talent</strong> is fundamental to supporting the growth of the business.
      </>,
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: '30,000 applications and many junior profiles the CV could not really depict',
      intro: "In a market where banks, fintechs and tech companies often compete for the same junior profiles, the speed and quality of the hiring process have become competitive levers and essential elements in delivering a Candidate Experience that meets expectations.",
      businessLabel: 'BUSINESS CHALLENGES',
      hrLabel: 'HR & PEOPLE CHALLENGES',
      businessChallenges: [
        {
          icon: Zap,
          title: 'An infrastructure capable of handling high volumes to support the Group\'s growth',
          text: "Managing 30,000 applications without technological support was no longer possible. It was necessary to strengthen the process by accelerating operational steps while keeping human judgement at the centre of every decision.",
        },
        {
          icon: Heart,
          title: "The candidate experience had to match the Gruppo Credem brand",
          text: "For a bank certified as Top Employer for 10 consecutive years and Equal Salary for 5, every candidate touchpoint is fundamental. A modern hiring process, aligned with the Group's values, was essential.",
        },
        {
          icon: TrendingUp,
          title: 'Identifying unexpressed potential was as important for HR as for the business',
          text: "At such a junior level, CV-based screening could not truly differentiate profiles: the soft skills decisive for the development of these roles were invisible on paper, and the risk was failing to identify talent aligned with Gruppo Credem.",
        },
      ],
      hrChallenges: [
        {
          icon: BarChart3,
          title: 'The Talent Pool needed to be expanded and every candidate given a real chance to be heard',
          text: "With 30,000 applications a year and traditional hiring tools, it is not possible to give everyone an authentic space to express themselves. Without technological support, the most motivated and high-potential profiles risked going unnoticed.",
        },
        {
          icon: Users,
          title: 'Time-to-hire needed to be optimised to avoid losing the best candidates',
          text: "Process speed was one of the most important competitive levers to work on to ensure an optimal hiring experience and avoid losing any of the most promising candidates.",
        },
        {
          icon: Target,
          title: 'Selection quality needed to be as consistent as possible across the Group',
          text: "Guaranteeing uniform screening standards for a Group distributed across 600+ branches in 19 regions was both an operational and a fairness challenge. Without a centralised, structured filter, hiring quality risked becoming inconsistent.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change',
      items: [
        { icon: Target, text: "Make the first filter more selective and predictive: identify high-potential profiles hidden among the 30,000 applications received annually, reducing the margin of error." },
        { icon: Zap, text: "Reduce time-to-hire and optimise shortlists: respond more quickly to candidates aligned with the Group's values and open roles to bring them to interview." },
        { icon: Layers, text: "Guarantee consistent hiring standards: maintain the same depth and quality of evaluation for all candidates regardless of when or where they applied." },
        { icon: Heart, text: "Improve the Candidate Experience: make the entire process accessible, fast and fair - a genuine opportunity to be heard, consistent with Gruppo Credem's Top Employer positioning." },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI-scaled Assessment with Skillvue',
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
        { value: '-15%', label: 'Unsuccessful interviews' },
      ],
      qualitative: [
        { icon: Eye, title: 'More candidates get to demonstrate their value', text: "The assessment gave more people the opportunity to surface real skills beyond the CV. High-potential profiles that previously risked getting lost in the volume are now identified effectively and quickly." },
        { icon: CheckCircle, title: 'Radically improved interview quality', text: "The +50% fit-to-hire means the second step of the process has become more efficient: less time spent on low-yield interviews, more informed decisions, faster feedback cycles." },
        { icon: Layers, title: 'Human-in-the-loop, always', text: "The assessment produces information that makes decision-making more informed and effective. The data produced by Skillvue's AI feeds the decision, which always remains in the hands of the recruiters." },
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
        <section className="relative pt-[80px] min-h-screen flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/credem-background-explore-stories.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-10">
            {/* Breadcrumb */}
            <motion.div className="mb-5 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Button variant="tertiary" mode="dark" icon={null} onClick={() => { router.push(lang === 'it' ? '/clienti' : '/customers'); window.scrollTo(0, 0); }}>{c.breadcrumb}</Button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Gruppo Credem</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main content */}
              <div className="lg:col-span-7 flex flex-col">
                <motion.div className="flex flex-col flex-1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium tracking-[0.08em] uppercase mb-4 block w-fit text-white/85 border border-white/15" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[48px] md:text-[44px] font-semibold tracking-[-0.02em] text-white/95 mb-4" style={{ lineHeight: 1.2 }}>
                    {c.headline.before}<span style={{ color: '#7b7df9' }}>{c.headline.highlight1}</span>{c.headline.middle}<span style={{ color: '#7b7df9' }}>{c.headline.highlight2}</span>{c.headline.after}
                  </h1>
                  <p className="text-[15px] text-white/[0.60] leading-[1.65] mb-6 max-w-2xl">{c.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" mode="dark" onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}>
                      {c.ctaPrimary}
                    </Button>
                    <Button variant="secondary" mode="dark" onClick={() => document.getElementById('context-section')?.scrollIntoView({ behavior: 'smooth' })}>
                      {c.ctaSecondary}
                    </Button>
                  </div>
                    {/* Metrics — pinned to bottom, aligned with client card */}
                    <div className="mt-auto pt-6 grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
                      {c.heroMetrics.map(m => (
                      <div key={m.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-3 md:px-6 md:py-4">
                      <span className="block text-white text-[19px] break-words stat-value md:text-[clamp(1.4rem,2.4vw,1.9rem)]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                      <span className="text-[13px] text-white/[0.55] mt-1.5 block leading-[1.4]">{m.label}</span>
                      </div>
                      ))}
                    </div>
                </motion.div>
              </div>

              {/* Client card + video */}
              <motion.div className="lg:col-span-5 flex flex-col gap-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/[0.08]">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white flex items-center justify-center">
                      <img src="/logos/credem-logo (2).png" alt="Gruppo Credem logo" className="w-full h-full object-contain " />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-0.5">{c.clientCard.label}</span>
                      <p className="text-[16px] font-bold text-white/90">Gruppo Credem</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {c.clientCard.facts.map(s => (
                      <div key={s.label}>
                        <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-0.5">{s.label}</span>
                        <p className="text-[13px] text-white/[0.65] leading-[1.4]">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Video */}
                <div className="rounded-2xl border border-white/[0.08] overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    className="w-full h-full"
                    style={{ border: 0 }}
                    src={lang === 'it' ? 'https://www.youtube.com/embed/sy7ycBPP-XM?autoplay=1&mute=1&rel=0&modestbranding=1' : 'https://www.youtube.com/embed/nWCKHRa9cig?autoplay=1&mute=1&rel=0&modestbranding=1'}
                    title="Gruppo Credem – Skillvue"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-6">{c.context.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.85] mb-8">{c.context.paragraph}</p>
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#ea580c' }}>{c.challenge.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{c.challenge.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-14">{c.challenge.intro}</p>

              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.challenge.businessLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.challenge.businessChallenges.map((ch) => (
                    <div key={ch.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(234,88,12,0.1)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#ea580c' }} />
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
                    <div key={ch.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(234,88,12,0.1)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#ea580c' }} />
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
                {c.objectives.items.map((o, i) => {
                  const [title, ...rest] = o.text.split(':');
                  const desc = rest.join(':').trim();
                  return (
                    <div key={i} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <o.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{title}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{desc}</p>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* SOLUTION */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.solution.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{c.solution.title}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{c.solution.intro}</p>

              <div className="mb-12">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.skillsLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.solution.skills.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <s.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] leading-[1.4]">{s.label}</h4>
                    </div>
                  ))}
                </div>
              </div>

            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#047857' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-10">{c.results.title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {c.results.metrics.map((m, i) => {
                  const Icon = [Clock, Target, CheckCircle][i] || Target;
                  return (
                    <div key={m.label} className="rounded-2xl border p-8" style={{ background: '#b7f5d8', borderColor: '#93e0bb' }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(6,78,59,0.14)' }}>
                        <Icon className="h-[22px] w-[22px]" style={{ color: '#064e3b' }} />
                      </div>
                      <h4 className="text-[32px] stat-value text-[#0b3b28] mb-3 leading-[1.3]">{m.value}</h4>
                      <p className="text-[15px] text-[#0b3b28]/60 leading-[1.55]">{m.label}</p>
                      {m.sublabel && <p className="text-[13px] text-[#0b3b28]/45 mt-1">{m.sublabel}</p>}
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {c.results.qualitative.map((q) => (
                  <div key={q.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-8">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#e3f9ec' }}>
                      <q.icon className="h-[22px] w-[22px]" style={{ color: '#10b981' }} />
                    </div>
                    <h4 className="text-[19px] font-bold text-[#121212] mb-3 leading-[1.3]">{q.title}</h4>
                    <p className="text-[15px] text-[#121212]/55 leading-[1.55]">{q.text}</p>
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
                <button key={s.id} onClick={() => { router.push(`${lang === 'it' ? '/clienti' : '/customers'}/${s.id}`); window.scrollTo(0, 0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 transition-all duration-500">
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
