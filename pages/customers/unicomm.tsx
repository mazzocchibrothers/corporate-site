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
      before: 'Come Unicomm sta costruendo una nuova ',
      highlight1: 'gestione del talento',
      middle: ' su una rete di ',
      highlight2: '270 punti vendita',
      after: ' in costante aumento',
    },
    subtitle: "Con Skillvue, Unicomm sta trasformando un'infrastruttura HR ancora poco digitalizzata in un sistema skills-based agile e capace di rispondere con efficacia alle necessità di selezione, conferme e sviluppo interno su tutta la rete.",
    heroMetrics: [
      { value: '3', label: 'Filoni attivati in parallelo (hiring, conferme, sviluppo)' },
      { value: '4', label: "Livelli di ruolo coperti, dall'addetto vendita al gerente" },
      { value: 'End-to-end', label: 'Talent lifecycle su 7 insegne e 7 regioni' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Dipendenti', value: '8.000+' },
        { label: 'Insegne', value: '7' },
        { label: 'Punti vendita diretti', value: '270+' },
        { label: 'Regioni', value: '7' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Un gruppo che raddoppia il fatturato in tre anni ha bisogno di persone pronte alla stessa velocità.',
      paragraph: <>
        <strong className="text-[#1A1A2E]/80 font-semibold">Gruppo Unicomm</strong>, parte di <strong className="text-[#1A1A2E]/80 font-semibold">Selex Gruppo Commerciale</strong>, è una delle principali realtà della <strong className="text-[#1A1A2E]/80 font-semibold">Grande Distribuzione Organizzata</strong> italiana. Negli ultimi 3 anni il gruppo ha registrato una <strong className="text-[#1A1A2E]/80 font-semibold">crescita quasi doppia</strong> rispetto alla media di settore, con l'obiettivo dichiarato di proseguire lavorando all'apertura di nuovi punti vendita, all'integrazione strategica con <strong className="text-[#1A1A2E]/80 font-semibold">Etruria Retail</strong> e alla realizzazione di nuove infrastrutture logistiche. In questo scenario di espansione accelerata, la capacità di selezionare, confermare e sviluppare le persone giuste diventa una priorità tanto per HR quanto per il business — soprattutto considerando che nel mercato del lavoro della GDO italiana il <strong className="text-[#1A1A2E]/80 font-semibold">50% delle posizioni</strong> è classificato come "difficile da chiudere" e uno store manager richiede in media <strong className="text-[#1A1A2E]/80 font-semibold">90-120 giorni</strong> di ricerca.
      </>,
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Non bastava ottimizzare: serviva costruire dalle fondamenta.',
      intro: "Unicomm partiva da una infrastruttura HR ancora poco digitalizzata, e lo faceva nel momento di crescita più intensa della propria storia.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR REALITY',
      businessChallenges: [
        {
          icon: Layers,
          title: 'Rete distribuita, criteri frammentati',
          text: "Due candidati con lo stesso potenziale potevano avere percorsi diversi per mancanza di un framework comune. In un settore dove la variazione di performance tra uno store manager può valere il 15-25% del fatturato di un punto vendita, l'assenza di criteri oggettivi era un rischio commerciale.",
        },
        {
          icon: Target,
          title: 'Tre processi critici per il business da attivare contemporaneamente',
          text: "Unicomm doveva attivarsi simultaneamente sulle selezioni per le nuove aperture, le conferme di decine di neoassunti al mese, e lo sviluppo interno attraverso l'Academy per la progressione a capo reparto e store manager.",
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: 'Una digitalizzazione HR ancora agli inizi',
          text: "Selezione, conferme del personale e percorsi di sviluppo venivano gestiti in modo manuale ed erano affidati alle capacità dei singoli responsabili di negozio o area. Non esisteva una visione d'insieme sul talento dei 7.000 dipendenti.",
        },
        {
          icon: Heart,
          title: 'Change management senza precedenti digitali',
          text: "Introdurre assessment digitali in un'organizzazione che non aveva mai utilizzato strumenti tecnologici per la gestione delle persone significava dover promuovere una trasformazione profonda, a tutti i livelli.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: "Costruire l'infrastruttura di talento che la crescita richiede.",
      items: [
        { icon: Scale, text: "Standardizzare le valutazioni su tutta la rete: stessi criteri, stesso framework di competenze, indipendentemente dall'insegna, dal punto vendita o dal singolo responsabile" },
        { icon: CheckCircle, text: "Adottare un approccio skills-based completo: valutazioni calibrate per obiettivo (hiring, conferma, sviluppo) e per ruolo/reparto, con un mix di soft e hard skill" },
        { icon: Wrench, text: "Costruire competenze di valutazione specifiche per la GDO: sviluppare assessment ad hoc laddove il modello Unicomm lo richiedeva" },
        { icon: Users, text: "Guidare un change management reale: trasformare la cultura HR dell'organizzazione, non solo introdurre uno strumento" },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI su tre filoni in parallelo, calibrato sul modello Unicomm.',
      intro: "Skillvue è stato integrato come partner per la costruzione del talent lifecycle di Unicomm, lavorando con il team HR guidato da Giuseppe Curci per allineare la piattaforma al modello di competenze aziendale e alle specificità della GDO.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Wrench, label: 'Competenze tecniche GDO — differenziate per reparto e livello di responsabilità (ruolo client-facing o meno, livello da addetto vendita a gerente)' },
        { icon: Heart, label: 'Soft skill specifiche — sviluppate ad hoc sul modello Unicomm (es. orientamento al servizio in contesti GDO, gestione del team su turni)' },
      ],
      methodologyLabel: 'STRUTTURA DEL PROGETTO — TRE FILONI IN PARALLELO',
      methodology: [
        {
          title: 'Hiring',
          text: "Selezione per le posizioni aperte sulle diverse insegne del Gruppo, con assessment calibrati sul ruolo specifico.",
        },
        {
          title: 'Conferme',
          text: "Decine di collaboratori al mese da valutare per la conferma a tempo indeterminato, con criteri strutturati e tracciabili.",
        },
        {
          title: "03 — Sviluppo",
          text: "Due momenti l'anno per la progressione a capo reparto o store manager, tramite Academy interna basata su dati di competenza oggettivi.",
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Cosa sta cambiando.',
      metrics: [
        { value: '3', label: 'Filoni attivati in parallelo' },
        { value: '4', label: 'Livelli di ruolo coperti' },
        { value: 'End-to-end', label: 'Talent lifecycle in costruzione' },
      ],
      qualitative: [
        { icon: TrendingUp, title: "Da zero a sistema integrato", text: "Unicomm è passata dall'assenza totale di strumenti digitali HR a un talent lifecycle strutturato che copre selezione, conferme e sviluppo in un unico sistema. Non un'ottimizzazione incrementale, ma un salto di paradigma realizzato durante la fase di crescita più intensa del Gruppo." },
        { icon: Wrench, title: "Competenze GDO finalmente misurabili", text: "Le soft skill specifiche del settore vengono ora valutate con strumenti calibrati sul modello Unicomm, non con assessment generici. Misurare queste competenze è una leva di business, non un mero esercizio HR." },
        { icon: BarChart3, title: "Decisioni basate su dati, non su impressioni", text: "Gli assessment producono informazioni strutturate che supportano le decisioni manageriali senza sostituirle. I manager decidono con più dati, e questo alza il livello della decisione." },
        { icon: Users, title: "Un percorso di change management in corso", text: "La trasformazione culturale è ancora in atto, ma le fondamenta sono solide: il sistema è operativo, i tre filoni avanzano in parallelo, e l'organizzazione sta costruendo la familiarità con un approccio skills-based che prima non esisteva." },
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO · Mobilità Interna', headline: "~900 persone valutate. Una pipeline di Store Manager costruita dall'interno." },
        { id: 'adr', company: 'Aeroporti di Roma', industry: 'Aviation', tag: 'Aviation · Sviluppo Interno', headline: "Aeroporti di Roma: come sviluppare un'organizzazione da quasi 5.000 persone per eseguire un piano da 9 miliardi." },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'How Unicomm is building a new ',
      highlight1: 'talent management system',
      middle: ' across a network of ',
      highlight2: '270 stores',
      after: ' and growing',
    },
    subtitle: "With Skillvue, Unicomm is transforming a barely-digitized HR infrastructure into an agile, skills-based system capable of effectively responding to the needs of hiring, confirmations and internal development across its entire network.",
    heroMetrics: [
      { value: '3', label: 'Streams activated in parallel (hiring, confirmations, development)' },
      { value: '4', label: 'Role levels covered, from sales associate to store manager' },
      { value: 'End-to-end', label: 'Talent lifecycle across 7 brands and 7 regions' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Employees', value: '8,000+' },
        { label: 'Retail Brands', value: '7' },
        { label: 'Direct Stores', value: '270+' },
        { label: 'Regions', value: '7' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'A group that doubles revenue in three years needs people ready at the same speed.',
      paragraph: <>
        <strong className="text-[#1A1A2E]/80 font-semibold">Gruppo Unicomm</strong>, part of <strong className="text-[#1A1A2E]/80 font-semibold">Selex Gruppo Commerciale</strong>, is one of Italy's leading <strong className="text-[#1A1A2E]/80 font-semibold">organized grocery retail</strong> groups. Over the past 3 years, the group has recorded <strong className="text-[#1A1A2E]/80 font-semibold">growth nearly double the sector average</strong>, with a declared objective to continue — through new store openings, strategic integration with <strong className="text-[#1A1A2E]/80 font-semibold">Etruria Retail</strong>, and new logistics infrastructure. In this context of accelerated expansion, the ability to hire, confirm and develop the right people becomes a priority for both HR and the business — especially given that in Italy's grocery retail labor market, <strong className="text-[#1A1A2E]/80 font-semibold">50% of positions</strong> are classified as "hard to fill" and a store manager requires an average of <strong className="text-[#1A1A2E]/80 font-semibold">90-120 days</strong> to recruit.
      </>,
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'Optimization was not enough: they needed to build from scratch.',
      intro: "Unicomm was starting from a barely-digitized HR infrastructure, and doing so at the most intense growth phase in its history.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR REALITY',
      businessChallenges: [
        {
          icon: Layers,
          title: 'Distributed network, fragmented criteria',
          text: "Two candidates with the same potential could have completely different paths due to the lack of a common framework. In a sector where store manager performance variance can account for 15-25% of a store's revenue, the absence of objective criteria was a commercial risk.",
        },
        {
          icon: Target,
          title: 'Three critical business processes to activate simultaneously',
          text: "Unicomm needed to act simultaneously on hiring for new store openings, confirming dozens of new hires per month to permanent contracts, and internal development through the Academy for progression to department head and store manager.",
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: 'HR digitization still at zero',
          text: "Hiring, confirmations and development paths were managed manually and relied on the individual capabilities of store or area managers. There was no overview of talent quality across 7,000 employees.",
        },
        {
          icon: Heart,
          title: 'Change management with no digital precedents',
          text: "Introducing digital assessments into an organization that had never used HR technology meant driving a deep transformation at every level of the organization.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: "Build the talent infrastructure that growth requires.",
      items: [
        { icon: Scale, text: "Standardize assessments across the entire network: same criteria, same competency framework, regardless of brand, store or individual manager" },
        { icon: CheckCircle, text: "Adopt a complete skills-based approach: assessments calibrated by objective (hiring, confirmation, development) and by role/department, with a mix of soft and hard skills" },
        { icon: Wrench, text: "Build sector-specific assessment capabilities: develop bespoke assessments where the Unicomm model required it" },
        { icon: Users, text: "Lead real change management: transform the organization's HR culture, not just introduce a tool" },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI assessment across three parallel streams, calibrated on the Unicomm model.',
      intro: "Skillvue was integrated as a partner for building Unicomm's talent lifecycle, working with the HR team led by Giuseppe Curci to align the platform to the company's competency model and the specifics of grocery retail.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Wrench, label: 'Grocery retail technical competencies — differentiated by department and level of responsibility (client-facing or not, from sales associate to store manager)' },
        { icon: Heart, label: 'Bespoke soft skills — developed ad hoc on the Unicomm model (e.g. service orientation in grocery retail contexts, team management across shifts)' },
      ],
      methodologyLabel: 'PROJECT STRUCTURE — THREE PARALLEL STREAMS',
      methodology: [
        {
          title: 'Hiring',
          text: "Selection for open positions across the Group's different brands, with assessments calibrated to the specific role.",
        },
        {
          title: 'Confirmations',
          text: "Dozens of employees per month assessed for confirmation to permanent contract, with structured and traceable criteria.",
        },
        {
          title: 'Development',
          text: "Two annual milestones for progression to department head or store manager, through an internal Academy based on objective competency data.",
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'What is changing.',
      metrics: [
        { value: '3', label: 'Streams activated in parallel' },
        { value: '4', label: 'Role levels covered' },
        { value: 'End-to-end', label: 'Talent lifecycle in progress' },
      ],
      qualitative: [
        { icon: TrendingUp, title: "From zero to integrated system", text: "Unicomm has gone from the complete absence of digital HR tools to a structured talent lifecycle covering hiring, confirmations and development in a single system. Not an incremental optimization, but a paradigm shift achieved during the most intense growth phase of the Group." },
        { icon: Wrench, title: "Grocery retail competencies now measurable", text: "Sector-specific soft skills are now assessed with tools calibrated to the Unicomm model, not generic assessments. Measuring these competencies is a business lever, not just an HR exercise." },
        { icon: BarChart3, title: "Decisions based on data, not impressions", text: "Assessments produce structured information that supports managerial decisions without replacing them. Managers decide with more data, and this raises the quality of the decision." },
        { icon: Users, title: "An ongoing change management journey", text: "The cultural transformation is still underway, but the foundations are solid: the system is live, the three streams are advancing in parallel, and the organization is building familiarity with a skills-based approach that did not exist before." },
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'ins-mercato', company: "In's Mercato", tag: "Retail GDO · Internal Mobility", headline: "~900 people assessed. A Store Manager pipeline built from within." },
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Internal Development', headline: 'Aeroporti di Roma: how to develop an organisation of nearly 5,000 people to execute a €9 billion plan.' },
      ],
      cta: 'Read the story',
    },
    finalCta: { headline: 'Ready to transform your', accent: 'People Strategy?' },
  },
};

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function UnicommStoryPage() {
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
              <span className="text-[13px] text-white/[0.65]">Unicomm</span>
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
              <motion.div className="lg:col-span-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-6">
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/[0.08]">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white flex items-center justify-center p-1.5">
                      <img src="/logos/unicomm-logo.jpg" alt="Unicomm logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[16px] font-bold text-white/90">Unicomm</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {c.clientCard.facts.map(s => (
                      <div key={s.label}>
                        <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{s.label}</span>
                        <p className="text-[13px] text-white/[0.65] leading-[1.5]">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    className="w-full h-full"
                    src={lang === 'it' ? 'https://www.youtube.com/embed/QddxrTw82h4?autoplay=1&mute=1' : 'https://www.youtube.com/embed/EVFraMnOgDg?autoplay=1&mute=1'}
                    title="Unicomm interview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </div>


            {/* Hero metrics — horizontal row */}
            <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
              <div className="grid grid-cols-3 gap-5">
                {c.heroMetrics.map(m => (
                  <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-5 text-center">
                    <span className="block text-white" style={{ fontSize: '1.7rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                    <span className="text-[13px] text-white/[0.55] mt-2 block leading-[1.4]">{m.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
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
                <div className="grid md:grid-cols-2 gap-5">
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
                <div className="grid md:grid-cols-2 gap-5">
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
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-10">{c.results.title}</h2>

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
