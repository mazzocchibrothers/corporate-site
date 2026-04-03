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
      before: 'Aeroporti di Roma: come sviluppare un\'organizzazione da quasi 5.000 persone per eseguire un piano da 9 miliardi',
      highlight1: '',
      middle: '',
      highlight2: '',
      after: '',
    },
    subtitle: "Con Skillvue, ADR ha trovato la chiave per rendere visibile il potenziale di quasi 5.000 persone, operativi inclusi, trasformando lo sviluppo del talento in leva strategica per la crescita.",
    heroMetrics: [
      { value: '-97%', label: 'Time-to-Process' },
      { value: 'fino a 4.000', label: 'operativi inclusi per la prima volta' },
      { value: '10+', label: 'dimensioni mappate' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Transportation & Logistics' },
        { label: 'Fatturato', value: '>1B€' },
        { label: 'Dipendenti', value: 'Oltre 4.500' },
        { label: 'Passeggeri gestiti annualmente', value: '>55 milioni' },
        { label: 'Use Case', value: 'Internal Mobility, Learning & Development' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: "Un aeroporto che raddoppia ha bisogno di una people strategy che regga su scala",
      paragraph: <>
        Aeroporti di Roma (ADR), parte del Gruppo Mundys, gestisce e sviluppa gli aeroporti di Fiumicino e Ciampino con oltre <strong className="text-[#1A1A2E]/80 font-semibold">4.500 dipendenti</strong> e con l'obiettivo di costruire "l'aeroporto del futuro" sulla base di un nuovo modello inclusivo.
        <br /><br />
        Al tempo stesso ADR è oggi al centro di un piano di trasformazione infrastrutturale senza precedenti. Il <strong className="text-[#1A1A2E]/80 font-semibold">Masterplan Fiumicino 2046</strong> prevede €9 miliardi di investimenti per portare la capacità dello scalo da 50 a 100 milioni di passeggeri l'anno, richiedendo una crescita organizzativa in grado di sostenere questa espansione.
        <br /><br />
        In questo scenario, la capacità dell'organizzazione di crescere alla velocità del business diventa una priorità strategica. Per ADR, sviluppare e mobilizzare il capitale umano interno significa poter pianificare con precisione la copertura dei ruoli critici, <strong className="text-[#1A1A2E]/80 font-semibold">accelerare la crescita verticale e orizzontale delle persone, e costruire una pipeline di talento visibile e misurabile.</strong>
      </>,
      summary: "Il progetto ha trasformato lo sviluppo del talento da processo riservato a pochi a leva strategica per la crescita: per la prima volta, ADR ha una mappa oggettiva del potenziale su tutta la popolazione, operativi inclusi.",
    },
    challenge: {
      badge: 'LA SFIDA',
      title: "Il modello precedente non poteva crescere alla velocità del business",
      intro: "Con il Masterplan in esecuzione su Fiumicino e l'intera organizzazione in rapida espansione, il modello di sviluppo esistente mostrava alcuni limiti strutturali.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Users,
          title: 'Il potenziale di quasi 4.000 persone non era visibile',
          text: "Gli operativi, proprio le persone su cui costruire il management dell'aeroporto in crescita, non potevano essere tutti sottoposti a valutazione: le opportunità di sviluppo partivano dalle segnalazioni dei responsabili diretti.",
        },
        {
          icon: TrendingUp,
          title: 'La pipeline di sviluppo non era scalabile',
          text: "Quando un aeroporto cresce, la velocità con cui identifichi e sviluppi le persone diventa una variabile operativa, non solo un KPI HR: con picchi di 2.000+ assunzioni annue, il modello di gestione manuale non poteva tenere il passo.",
        },
        {
          icon: Scale,
          title: "Senza percorsi chiari, c'era rischio turnover",
          text: "In un mercato del lavoro sempre più competitivo, trattenere il talento ad alto potenziale non è solo una questione di engagement, è un investimento: più aumenta il turnover, più si perdono investimenti in mesi di formazione e conoscenze.",
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: 'Approccio top-down allo sviluppo',
          text: 'Le decisioni su chi portare in valutazione più approfondita e sviluppare dipendevano dalle indicazioni del manager diretto, non da una base dati uniforme. Il potenziale non segnalato restava invisibile.',
        },
        {
          icon: BarChart3,
          title: 'Democratizzazione dello sviluppo a rischio',
          text: 'Possibile percezione di un accesso non del tutto equo alle opportunità di crescita e sviluppo professionale, con il rischio che questo incida sul senso di fiducia verso il processo.',
        },
        {
          icon: Shield,
          title: 'La compliance richiedeva fondamenta più solide',
          text: "C'era la chiara volontà di rendere ogni decisione di promozione trasparente davanti al dipendente e difendibile davanti al regolatore. Servivano basi psicometriche auditabili e criteri documentabili.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Costruire la capacità organizzativa che la crescita richiede.',
      items: [
        { icon: Users, text: "Rendere visibile il potenziale su tutta la popolazione: assessment accessibile a tutti i 4.500+ dipendenti, non solo i 1.000 corporate. Includere per la prima volta gli operativi" },
        { icon: Target, text: 'Guidare le decisioni con un approccio science-based e auditabile: passare dalle segnalazioni soggettive a dati strutturati per ogni ruolo, con criteri chiari, feedback per ogni dipendente e piena compliance regolatoria' },
        { icon: Zap, text: 'Scalare senza appesantire carico operativo e tempistiche: processare le candidature interne in giorni anziché mesi, mantenendo la qualità psicometrica che una realtà pubblica richiede' },
        { icon: Layers, text: "Costruire un modello human-in-the-loop: l'assessment deve produrre intelligenza a supporto delle decisioni manageriali, non sostituirle. Dati per decidere meglio, non verdetti automatici" },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Skillvue è stato integrato nella People Strategy esistente di ADR, che già includeva un modello di leadership e percorsi di sviluppo definiti. Il team People Science di Skillvue ha lavorato con ADR per allineare la piattaforma al modello di competenze aziendale, garantendo che ogni assessment misurasse ciò che ADR considera rilevante, non competenze generiche.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Wrench, label: 'Competenze tecniche (role-specific, calibrate sul modello ADR)' },
        { icon: Heart, label: 'Soft skills (attenzione al passeggero, narrative communication, proattività, ecc.)' },
        { icon: CheckCircle, label: 'Lingua inglese (competenza critica per un hub internazionale con 240 destinazioni)' },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Cosa è cambiato e perché conta.',
      subtitle: "I risultati misurabili e qualitativi del progetto Skillvue x Aeroporti di Roma.",
      metrics: [
        { value: '-97%', label: 'Time-to-Process' },
        { value: 'fino a 4.000', label: 'operativi inclusi' },
        { value: 'Giorni, non mesi', label: 'tempi di selezione interna' },
      ],
      qualitative: [
        { icon: Eye, title: 'Talento nascosto, finalmente visibile', text: "Per la prima volta, ADR ha dati aggiornati su competenze, comportamenti, e potenziale della forza lavoro che fisicamente gestirà i nuovi terminal e le nuove infrastrutture. La pipeline di talento futuro si costruisce da qui." },
        { icon: Zap, title: 'Velocità estrema per un approccio più strategico', text: "Quello che prima si svolgeva in mesi, per garantire equo trattamento e accuratezza di ogni application, oggi si può svolgere in giorni. Rimane la profondità dell'analisi, ma si libera tempo prezioso per gli aspetti di gestione strategica dei processi HR." },
        { icon: Layers, title: 'Human-in-the-loop: più dati, più responsabilità', text: "L'assessment non produce una lista di profili approvati, ma informazioni strutturate che alimentano una decisione manageriale consapevole. Lo sforzo cognitivo rimane chiave perché ora va presa e interpretata una base dati che prima non esisteva." },
        { icon: TrendingUp, title: 'Impatto concreto su employee experience e retention', text: "I dipendenti hanno visibilità sui criteri utilizzati per le valutazioni e ricevono feedback strutturati sul proprio percorso. Fattori chiave in un contesto dove la competizione per il talento è intensa e minaccia la continuità operativa." },
      ],
      quote: {
        text: "L'Assessment non è più visto soltanto come uno step necessario per una promozione: è parte di un sistema integrato di sviluppo che permette la costruzione di percorsi di crescita personalizzati.",
        author: 'Alberto Valenza',
        role: 'SVP Human Capital, Organization & Procurement — Aeroporti di Roma',
      },
    },
    vision: {
      badge: 'EVOLUZIONE 2026',
      title: 'Da sviluppo interno a talent strategy integrata.',
      intro: "Quando il modello testato con Skillvue ha dimostrato di reggere su scala, la domanda successiva è stata naturale: ha senso valutare chi entra con criteri diversi da chi viene sviluppato internamente? La risposta è stata no.",
      objective: "Costruire un unico ciclo coerente in cui ogni persona, dal primo giorno, viene valutata, orientata e accompagnata con la stessa logica.",
      bullets: [
        'Prosecuzione del modello di sviluppo già avviato sull\'interno',
        'Integrazione nel Talent Acquisition esterno',
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO · Mobilità Interna', headline: "Come In's Mercato ha costruito una pipeline interna di Store Manager" },
        { id: 'credem', company: 'Credem', tag: 'Banking & Finance · Sviluppo', headline: 'Credem: come scovare i migliori talenti su larga scala tra 30.000 candidature per nutrire la crescita del business' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'Aeroporti di Roma: how to develop an organisation of nearly 5,000 people to execute a €9 billion plan',
      highlight1: '',
      middle: '',
      highlight2: '',
      after: '',
    },
    subtitle: "With Skillvue, ADR found the key to making the potential of nearly 5,000 people visible — operational staff included — turning talent development into a strategic lever for growth.",
    heroMetrics: [
      { value: '-97%', label: 'Time-to-Process' },
      { value: 'up to 4,000', label: 'operational staff included for the first time' },
      { value: '10+', label: 'dimensions mapped' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Transportation & Logistics' },
        { label: 'Revenue', value: '>€1B' },
        { label: 'Employees', value: '4,500+' },
        { label: 'Passengers managed annually', value: '>55 million' },
        { label: 'Use Case', value: 'Internal Mobility, Learning & Development' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: "An airport that doubles in size needs a people strategy that holds at scale",
      paragraph: <>
        Aeroporti di Roma (ADR), part of Gruppo Mundys, manages and develops Fiumicino and Ciampino airports with over <strong className="text-[#1A1A2E]/80 font-semibold">4,500 employees</strong> and the ambition to build "the airport of the future" on the basis of a new inclusive model.
        <br /><br />
        At the same time, ADR is at the center of an unprecedented infrastructure transformation. The <strong className="text-[#1A1A2E]/80 font-semibold">Masterplan Fiumicino 2046</strong> plans €9 billion in investments to grow the airport's capacity from 50 to 100 million passengers per year, requiring organizational growth capable of sustaining this expansion.
        <br /><br />
        In this context, the organization's ability to grow at the speed of the business becomes a strategic priority. For ADR, developing and mobilizing internal human capital means being able to precisely plan coverage of critical roles, <strong className="text-[#1A1A2E]/80 font-semibold">accelerate vertical and horizontal growth, and build a visible, measurable talent pipeline.</strong>
      </>,
      summary: "The project transformed talent development from a process reserved for the few into a strategic lever for growth: for the first time, ADR has an objective map of potential across the entire workforce, operational staff included.",
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: "The previous model couldn't grow at the speed of the business",
      intro: "With the Masterplan underway at Fiumicino and the entire organization expanding rapidly, the existing development model was showing structural limitations.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Users,
          title: 'The potential of nearly 4,000 people was not visible',
          text: "Operational staff — the very people on whom to build the management of a growing airport — could not all be put through assessment: development opportunities started from nominations by direct line managers.",
        },
        {
          icon: TrendingUp,
          title: 'The development pipeline was not scalable',
          text: "When an airport grows, the speed at which you identify and develop people becomes an operational variable, not just an HR KPI: with peaks of 2,000+ annual hires, the manual management model could not keep pace.",
        },
        {
          icon: Scale,
          title: 'Without clear paths, turnover risk was real',
          text: "In an increasingly competitive job market, retaining high-potential talent is not just an engagement issue, it's an investment: the higher the turnover, the more investment in months of training and knowledge is lost.",
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: 'Top-down approach to development',
          text: 'Decisions on who to bring into deeper assessment and develop depended on direct manager nominations, not on a uniform data foundation. Unrecognised potential remained invisible.',
        },
        {
          icon: BarChart3,
          title: 'Democratisation of development at risk',
          text: 'A possible perception of not entirely equal access to growth and professional development opportunities, with the risk that this affects employees\' sense of trust in the process.',
        },
        {
          icon: Shield,
          title: 'Compliance required stronger foundations',
          text: "There was a clear intent to make every promotion decision transparent to the employee and defensible before the regulator. Auditable psychometric foundations and documentable criteria were needed.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'Building the organizational capacity that growth demands.',
      items: [
        { icon: Users, text: "Make potential visible across the entire workforce: assessment accessible to all 4,500+ employees, not just the 1,000 corporate staff. Including operational employees for the first time" },
        { icon: Target, text: 'Guide decisions with a science-based and auditable approach: move from subjective nominations to structured competency data for every role, with clear criteria, structured feedback for each employee, and full regulatory compliance' },
        { icon: Zap, text: 'Scale without adding operational burden or delays: process internal applications in days instead of months, while preserving the psychometric quality a public entity requires' },
        { icon: Layers, text: "Build a human-in-the-loop model: the assessment must produce intelligence to support managerial decisions, not replace them. Data to decide better, not automated verdicts" },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "Skillvue was integrated into ADR's existing People Strategy, which already included a leadership model and defined development paths. Skillvue's People Science team worked with ADR to align the platform with the company's competency model, ensuring every assessment measured what ADR considers relevant — not generic competencies.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Wrench, label: 'Technical competencies (role-specific, calibrated on ADR\'s model)' },
        { icon: Heart, label: 'Soft skills (for operational roles too, for the first time in ADR\'s history)' },
        { icon: CheckCircle, label: 'English language (critical for an international hub with 240 destinations and 100+ airlines)' },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: "What changed and why it matters.",
      subtitle: "Measurable and qualitative outcomes from the Skillvue x Aeroporti di Roma project.",
      metrics: [
        { value: '-97%', label: 'Time-to-Process' },
        { value: 'up to 4,000', label: 'operational staff included' },
        { value: 'Days, not months', label: 'internal selection timeline' },
      ],
      qualitative: [
        { icon: Eye, title: 'Hidden talent, finally visible', text: "ADR built a data set that simply didn't exist before: people who would have remained invisible under the old approach can now be identified, assessed, and placed into development pipelines." },
        { icon: Zap, title: 'Extreme speed for a more strategic approach', text: "What previously took months — to guarantee fair treatment and accuracy for every application — can now be done in days. The depth of analysis remains, but precious time is freed up for the strategic management of HR processes." },
        { icon: Layers, title: 'Human-in-the-loop: more data, more accountability', text: "The assessment doesn't produce a list of approved profiles, but structured information that feeds a conscious managerial decision. Cognitive effort remains key because a data foundation that didn't exist before now needs to be read and interpreted." },
        { icon: TrendingUp, title: 'Concrete impact on employee experience and retention', text: "Employees have visibility into the criteria used for assessments and receive structured feedback on their development path. Key factors in a context where competition for talent is intense and threatens operational continuity." },
      ],
      quote: {
        text: "Assessment is no longer seen merely as a necessary step for a promotion: it is part of an integrated development system that enables the construction of personalised growth paths.",
        author: 'Alberto Valenza',
        role: 'SVP Human Capital, Organization & Procurement — Aeroporti di Roma',
      },
    },
    vision: {
      badge: 'EVOLUTION 2026',
      title: 'From internal development to an integrated talent strategy.',
      intro: "When the model tested with Skillvue proved it could hold at scale, the next question was natural: does it make sense to assess new hires with different criteria than those used to develop existing employees? The answer was no.",
      objective: "Build a single coherent cycle where every person, from day one, is assessed, guided, and developed with the same logic.",
      bullets: [
        'Continuation of the development model already underway internally',
        'Integration into external Talent Acquisition',
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO · Internal Mobility', headline: "How In's Mercato built an internal pipeline of Store Managers" },
        { id: 'credem', company: 'Credem', tag: 'Banking & Finance · Development', headline: 'Credem: how to find the best talent at scale among 30,000 applications to fuel business growth' },
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
            <img src="/logos/adr-background-explore-stories.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
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
                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.25 }}>
                    {c.headline.before}<span style={{ color: '#7b7df9' }}>{c.headline.highlight1}</span>{c.headline.middle}<span style={{ color: '#7b7df9' }}>{c.headline.highlight2}</span>{c.headline.after}
                  </h1>
                  <p className="text-[17px] text-white/[0.60] leading-[1.75] mb-12 max-w-2xl">{c.subtitle}</p>
                  <div className="flex flex-wrap gap-4 mb-12">
                    {c.heroMetrics.map(m => (
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-4">
                        <span className="block text-white" style={{ fontSize: '1.7rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[13px] text-white/[0.55] mt-1 block">{m.label}</span>
                        {m.sublabel && <span className="text-[11px] text-white/[0.35] mt-0.5 block">{m.sublabel}</span>}
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
                      <img src="/logos/adr-logo.jpg" alt="ADR logo" className="w-full h-full object-contain " />
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

            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{c.results.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12 max-w-3xl">{c.results.subtitle}</p>

              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
                  {/* -97% circular progress */}
                  <div className="text-center flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-5">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#4b4df7" strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40 * 0.97} ${2 * Math.PI * 40}`} />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[0].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[0].label}</span>
                  </div>
                  {/* fino a 4.000 — x4 growth */}
                  <div className="text-center flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-5 flex flex-col items-center justify-center gap-1">
                      <div className="flex items-end gap-1.5">
                        <div className="rounded-sm bg-white/20" style={{ width: 14, height: 20 }} />
                        <div className="rounded-sm bg-white/40" style={{ width: 14, height: 32 }} />
                        <div className="rounded-sm bg-white/60" style={{ width: 14, height: 48 }} />
                        <div className="rounded-sm bg-[#4b4df7]" style={{ width: 14, height: 72 }} />
                      </div>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[1].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[1].label}</span>
                  </div>
                  {/* Giorni, non mesi — calendar icon */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-center justify-center">
                      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
                        <rect x="4" y="10" width="56" height="50" rx="6" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                        <rect x="4" y="10" width="56" height="16" rx="6" fill="#4b4df7" />
                        <line x1="20" y1="4" x2="20" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
                        <line x1="44" y1="4" x2="44" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
                        <rect x="13" y="34" width="8" height="8" rx="2" fill="rgba(255,255,255,0.5)" />
                        <rect x="28" y="34" width="8" height="8" rx="2" fill="rgba(255,255,255,0.5)" />
                        <rect x="13" y="48" width="8" height="8" rx="2" fill="rgba(255,255,255,0.3)" />
                        <rect x="28" y="48" width="8" height="8" rx="2" fill="rgba(75,77,247,0.8)" />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.1rem,2vw,1.6rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{c.results.metrics[2].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[2].label}</span>
                  </div>
                </div>
              </div>

              {c.results.quote && (
                <div className="rounded-2xl border border-[#4b4df7]/[0.12] bg-gradient-to-br from-[#4b4df7]/[0.04] to-transparent p-8 lg:p-10 mb-10">
                  <p className="text-[17px] text-[#1A1A2E]/75 leading-[1.75] italic mb-6">"{c.results.quote.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#4b4df7]/[0.15]">
                      <img src="/logos/adr-alberto.jpg" alt={c.results.quote.author} className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#1A1A2E]/80">{c.results.quote.author}</p>
                      <p className="text-[12px] text-[#1A1A2E]/40 leading-[1.5]">{c.results.quote.role}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
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
