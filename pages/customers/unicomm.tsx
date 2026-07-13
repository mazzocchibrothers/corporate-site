// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle, Wrench, Store, Workflow } from 'lucide-react';
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
      before: 'Come Unicomm sta costruendo una nuova ',
      highlight1: 'gestione del talento',
      middle: ' su una rete di ',
      highlight2: '250 punti vendita',
      after: ' in costante aumento',
    },
    subtitle: "Con Skillvue, Unicomm sta trasformando la propria infrastruttura HR in un sistema skills-based agile, capace di rispondere alle necessità di selezione, conferma e sviluppo su tutta la rete.",
    heroMetrics: [
      { value: '250', label: 'punti vendita coinvolti' },
      { value: '7', label: 'insegne' },
      { value: '3', label: 'processi attivati in parallelo' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'GDO' },
        { label: 'Gruppo', value: 'Gruppo Unicomm' },
        { label: 'Fatturato', value: '+3,5 mld €' },
        { label: 'Dipendenti', value: '8.000+' },
        { label: 'Punti vendita diretti', value: '250+' },
        { label: 'Use Case', value: 'Hiring, Learning & Development, Internal Mobility' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Un gruppo in continua e forte crescita ha bisogno di persone pronte alla stessa velocità.',
      paragraph: <>
        <strong className="text-[#121212]/80 font-semibold">Gruppo Unicomm</strong>, parte di <strong className="text-[#121212]/80 font-semibold">Selex Gruppo Commerciale</strong>, è una delle principali realtà della <strong className="text-[#121212]/80 font-semibold">Grande Distribuzione Organizzata</strong> italiana. Negli ultimi 3 anni il gruppo ha registrato una <strong className="text-[#121212]/80 font-semibold">crescita quasi doppia</strong> rispetto alla media di settore, con l'obiettivo dichiarato di proseguire lavorando all'apertura di nuovi punti vendita, all'integrazione strategica con <strong className="text-[#121212]/80 font-semibold">Etruria Retail</strong> e alla realizzazione di nuove infrastrutture logistiche. In questo scenario di espansione accelerata, la capacità di selezionare, confermare e sviluppare le persone giuste diventa una priorità tanto per HR quanto per il business — soprattutto considerando che nel mercato del lavoro della GDO italiana il <strong className="text-[#121212]/80 font-semibold">50% delle posizioni</strong> è classificato come "difficile da chiudere" e uno store manager richiede in media <strong className="text-[#121212]/80 font-semibold">90-120 giorni</strong> di ricerca.
      </>,
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Non bastava ottimizzare: serviva costruire dalle fondamenta.',
      intro: "Unicomm partiva da una infrastruttura HR ancora poco digitalizzata, e lo faceva nel momento di crescita più intensa della propria storia.",
      businessLabel: 'BUSINESS CHALLENGES',
      hrLabel: 'HR & PEOPLE CHALLENGES',
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
          text: "Selezione, conferme del personale e percorsi di sviluppo venivano gestiti in modo manuale ed erano affidati alle capacità dei singoli responsabili di negozio o area. Non esisteva una visione d'insieme sul talento degli oltre 8.000 dipendenti.",
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
      title: 'Cosa doveva cambiare',
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
      intro: "Skillvue è stato integrato come partner per la costruzione del talent lifecycle di Unicomm, lavorando con la Direzione Risorse Umane guidata da Giuseppe Curci, Direttore Risorse Umane Gruppo, per allineare la piattaforma al modello di competenze aziendale e alle specificità della GDO.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Wrench, title: 'Competenze tecniche GDO', text: 'differenziate per reparto e livello di responsabilità (ruolo client-facing o meno, livello da addetto vendita a gerente)' },
        { icon: Heart, title: 'Soft skill specifiche', text: 'sviluppate ad hoc sul modello Unicomm (es. orientamento al servizio in contesti GDO, gestione del team su turni)' },
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
        { value: '250', label: 'Punti vendita coinvolti' },
        { value: '7', label: 'Insegne' },
        { value: '3', label: 'Processi attivati in parallelo' },
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
        { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO · Mobilità Interna', headline: "Come In's Mercato ha costruito una pipeline interna di Store Manager" },
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Mobilità Interna', headline: "Aeroporti di Roma: come sviluppare un'organizzazione da quasi 5.000 persone per eseguire un piano da 9 miliardi." },
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
      highlight2: '250+ stores',
      after: '',
    },
    subtitle: "With Skillvue, Unicomm is transforming its HR infrastructure into an agile, skills-based system that responds to hiring, confirmation and internal development needs across its entire network.",
    heroMetrics: [
      { value: '250', label: 'included stores' },
      { value: '7', label: 'brands' },
      { value: '3', label: 'processes activated in parallel' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Large-scale distribution' },
        { label: 'Group', value: 'Unicomm Group' },
        { label: 'Revenue', value: '+€3.5B' },
        { label: 'Employees', value: '8,000+' },
        { label: 'Direct Stores', value: '250+' },
        { label: 'Use Case', value: 'Hiring, Learning & Development, Internal Mobility' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'A group in continuous and strong growth needs people ready at the same speed.',
      paragraph: <>
        <strong className="text-[#121212]/80 font-semibold">Gruppo Unicomm</strong>, part of <strong className="text-[#121212]/80 font-semibold">Selex Gruppo Commerciale</strong>, is one of Italy's leading <strong className="text-[#121212]/80 font-semibold">organized grocery retail</strong> groups. Over the past 3 years, the group has recorded <strong className="text-[#121212]/80 font-semibold">growth nearly double the sector average</strong>, with a declared objective to continue — through new store openings, strategic integration with <strong className="text-[#121212]/80 font-semibold">Etruria Retail</strong>, and new logistics infrastructure. In this context of accelerated expansion, the ability to hire, confirm and develop the right people becomes a priority for both HR and the business, especially given that in Italy's grocery retail labor market, <strong className="text-[#121212]/80 font-semibold">50% of positions</strong> are classified as "hard to fill" and a store manager requires an average of <strong className="text-[#121212]/80 font-semibold">90-120 days</strong> to recruit.
      </>,
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'Optimization was not enough: they needed to build from scratch.',
      intro: "Unicomm was starting from a scarcely-digitized HR infrastructure, and doing so at the most intense growth phase in its history.",
      businessLabel: 'BUSINESS CHALLENGES',
      hrLabel: 'HR & PEOPLE CHALLENGES',
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
          text: "Hiring, confirmations and development paths were managed manually and relied on the individual capabilities of store or area managers. There was no overview of talent quality across over 8,000 employees.",
        },
        {
          icon: Heart,
          title: 'Change management with no digital precedents',
          text: "Introducing digital assessments into an organization that had never used HR technology meant driving a deep transformation at every level of the organization: quite a big challenge to take on for a small HR team.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change',
      items: [
        { icon: Scale, text: "Standardize assessments across the entire network: same criteria, same skills framework, regardless of brand, store or individual manager" },
        { icon: CheckCircle, text: "Adopt a complete skills-based approach: assessments calibrated by objective (hiring, confirmation, development) and by role/department, with a mix of soft and hard skills" },
        { icon: Wrench, text: "Build sector-specific assessment capabilities: develop selected assessments where the Unicomm model required it" },
        { icon: Users, text: "Lead real change management: transform the organization's HR culture, not just introduce a tool" },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI assessment across three parallel streams, calibrated on the Unicomm model.',
      intro: "Skillvue was integrated as a partner for building Unicomm's talent lifecycle, working with the HR Division led by Giuseppe Curci, Group HR Director, to align the platform to the company's leadership model and the specifics of grocery retail.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Wrench, title: 'Grocery retail technical skills', text: 'differentiated by department and level of responsibility (client-facing or not, from sales associate to store manager)' },
        { icon: Heart, title: 'Tailored soft skills', text: 'developed ad hoc on the Unicomm model (e.g. service orientation in grocery retail contexts, team management across shifts)' },
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
          text: "Two annual milestones for progression to department head or store manager, through an internal Academy based on objective skills data.",
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'What is changing.',
      metrics: [
        { value: '250', label: 'Included stores' },
        { value: '7', label: 'Brands' },
        { value: '3', label: 'Processes activated in parallel' },
      ],
      qualitative: [
        { icon: TrendingUp, title: "From zero to integrated system", text: "Unicomm has gone from the complete absence of digital HR tools to a structured talent lifecycle covering hiring, confirmations and development in a single system. Not an incremental optimization, but a paradigm shift achieved during the most intense growth phase of the Group." },
        { icon: Wrench, title: "Industry-relevant skills now measurable", text: "Sector-specific soft skills are now assessed with tools calibrated to the Unicomm model, not generic assessments. Measuring these skills is a business lever, not just an HR exercise." },
        { icon: BarChart3, title: "Decisions based on data, not impressions", text: "Assessments produce structured information that supports managerial decisions without replacing them. Managers decide with more data, and this raises the quality of the decision." },
        { icon: Users, title: "An ongoing change management journey", text: "The cultural transformation is still underway, but the foundations are solid: the system is live, the three streams are advancing in parallel, and the organization is building familiarity with a skills-based approach that did not exist before." },
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'ins-mercato', company: "In's Mercato", tag: "Large-scale distribution · Internal Mobility", headline: "How In's Mercato built an internal pipeline of Store Managers" },
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation · Internal Mobility', headline: 'Aeroporti di Roma: how to develop an organisation of nearly 5,000 people to execute a €9 billion plan.' },
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
            <img src="/logos/unicomm-background-explore-stories.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-10">
            {/* Breadcrumb */}
            <motion.div className="mb-5 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Button variant="tertiary" mode="dark" icon={null} onClick={() => { router.push(lang === 'it' ? '/clienti' : '/customers'); window.scrollTo(0, 0); }}>{c.breadcrumb}</Button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Unicomm</span>
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
                    <div className="mt-auto pt-6 grid grid-cols-3 gap-2 md:gap-4">
                      {c.heroMetrics.map(m => (
                      <div key={m.value} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-3 md:px-6 md:py-4">
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
                      <img src="/logos/unicomm-logo.jpg" alt="Unicomm logo" className="w-full h-full object-contain " />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-0.5">{c.clientCard.label}</span>
                      <p className="text-[16px] font-bold text-white/90">Unicomm</p>
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
                <div className="rounded-2xl border border-white/[0.08] overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    className="w-full h-full"
                    src={lang === 'it' ? 'https://www.youtube.com/embed/QddxrTw82h4?autoplay=1&mute=1&rel=0&modestbranding=1' : 'https://www.youtube.com/embed/EVFraMnOgDg?autoplay=1&mute=1&rel=0&modestbranding=1'}
                    title="Unicomm interview"
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
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

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
                <div className="grid md:grid-cols-2 gap-5">
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
                <div className="grid md:grid-cols-2 gap-5">
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
                <div className="grid md:grid-cols-2 gap-5">
                  {c.solution.skills.map((s) => (
                    <div key={s.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <s.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{s.title}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.methodologyLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.solution.methodology.map((m, i) => (
                    <div key={m.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <span className="block text-[2.75rem] font-light leading-none mb-6" style={{ color: '#c7d2fe' }}>0{i + 1}</span>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{m.title.replace(/^\d+\s*[—\-]+\s*/, '')}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#047857' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{c.results.title}</h2>
              {c.results.subtitle && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{c.results.subtitle}</p>}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {[Store, Layers, Workflow].map((Icon, i) => {
                  const m = c.results.metrics[i];
                  return (
                    <div key={m.label} className="rounded-2xl border p-8" style={{ background: '#b7f5d8', borderColor: '#93e0bb' }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(6,78,59,0.14)' }}>
                        <Icon className="h-[22px] w-[22px]" style={{ color: '#064e3b' }} />
                      </div>
                      <h4 className="text-[32px] stat-value text-[#0b3b28] mb-3 leading-[1.3]">{m.value}</h4>
                      <p className="text-[15px] text-[#0b3b28]/60 leading-[1.55]">{m.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
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
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
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
