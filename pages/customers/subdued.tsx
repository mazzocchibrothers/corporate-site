// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, TrendingDown, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle, Clock, Globe } from 'lucide-react';
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
      before: 'Subdued: come creare uno ',
      highlight1: 'standard di selezione unico e scalabile',
      middle: ' per una rete internazionale di ',
      highlight2: '130+ negozi',
      after: '',
    },
    subtitle: "Con Skillvue, Subdued ha costruito un processo di selezione coerente e scalabile su più mercati, con lo stesso rigore in ogni paese e un turnover dimezzato.",
    heroMetrics: [
      { value: '-40%', label: 'Time-to-hire' },
      { value: '-50%', label: 'Turnover' },
      { value: '80%', label: 'Candidati qualificati dopo lo skills screening' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Retail' },
        { label: 'Paesi', value: 'Italia, Irlanda, UK, Paesi Bassi, Svezia, Francia' },
        { label: 'Dipendenti', value: '1.000+' },
        { label: 'Punti vendita', value: '130+ monomarca' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Subdued è un brand italiano di fashion retail. Fondato in Italia, oggi opera con oltre <strong className="text-[#121212]/80 font-semibold">130 negozi monomarca</strong> in continua espansione, <strong className="text-[#121212]/80 font-semibold">più di 1.000 dipendenti</strong> e una presenza in crescita su più continenti.
        <br /><br />
        La traiettoria di crescita è eccezionale: il fatturato del brand è <strong className="text-[#121212]/80 font-semibold">quasi raddoppiato tra il 2022 e il 2024</strong> e più della metà dei ricavi arriva dai mercati internazionali, che danno ottimi segnali per il futuro con aperture in corso negli Stati Uniti, in Medio Oriente, nel Sud-Est asiatico, in Corea e in Cina.
        <br /><br />
        In questo scenario, la capacità di selezionare le persone giuste al ritmo delle aperture diventa <strong className="text-[#121212]/80 font-semibold">il vincolo operativo numero uno</strong>. Ogni nuovo negozio richiede un team formato capace di rappresentare il brand e il suo DNA italiano davanti a un pubblico Gen Z in mercati culturalmente diversi, ma il team HR è composto da <strong className="text-[#121212]/80 font-semibold">1-3 persone per ciascuno dei paesi di attività</strong>. Con i metodi tradizionali, l'equazione non regge.
      </>,
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: 'Tante figure chiave da selezionare, turnover alto e un team HR snello che non poteva scalare con l\'espansione senza un sistema strutturato.',
      businessLabel: 'BUSINESS CHALLENGES',
      hrLabel: 'HR & PEOPLE CHALLENGES',
      businessChallenges: [
        {
          icon: BarChart3,
          title: 'Alta performance in store: la selezione è il punto di partenza',
          text: 'Per scalare il business, non bastava assumere velocemente: servivano insight predittivi per identificare i candidati con più alto potenziale commerciale e garantire performance elevate fin dall\'ingresso in store.',
        },
        {
          icon: TrendingUp,
          title: 'Un turnover strutturalmente alto',
          text: 'Nel fashion retail il turnover è fisiologicamente elevato. Per un brand dove l\'esperienza in negozio è parte della vendita, ogni assunzione sbagliata moltiplicava ulteriormente questo rischio.',
        },
        {
          icon: Scale,
          title: 'Un brand, nessuno standard condiviso in Europa',
          text: 'Ogni paese valutava con criteri diversi, in lingue diverse. Non esisteva un framework comune: "la persona giusta per Subdued" significava cose diverse a Milano e a Londra. Serviva un modello HR sostenibile e replicabile su tutta la rete commerciale europea.',
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: 'Il CV: uno strumento insufficiente',
          text: 'Il 50% dei candidati che superavano il primo screening si rivelava privo delle soft skill necessarie per il lavoro in store. Comunicazione, vendita e predisposizione al cliente: invisibili sulla carta.',
        },
        {
          icon: Zap,
          title: 'Lo screening manuale erode il tempo strategico',
          text: 'Senza un filtro strutturato, ogni candidato richiedeva un forte investimento di tempo per il pre-screening — un carico che sottraeva risorse preziose ad attività più strategiche, dall\'employer branding allo sviluppo del team.',
        },
        {
          icon: Heart,
          title: 'Early turnover: segnale di un processo poco predittivo',
          text: 'Un processo di selezione poco predittivo generava assunzioni sbagliate, con alto turnover nei primi mesi. Il costo di ogni errore era difficilmente sostenibile con una rete in rapida espansione.',
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: 'Mettere in luce competenze e potenziale su scala: valutare comunicazione, vendita e teamworking prima del colloquio, con dati oggettivi su ogni candidato' },
        { icon: Target, text: 'Liberare il team dall\'operatività: ridurre le ore di screening per recuperare tempo per attività strategiche, employer branding e sviluppo' },
        { icon: Layers, text: 'Creare uno standard cross-europe: stessi criteri di valutazione su Italia, Irlanda, UK, Paesi Bassi, Svezia e Francia, adattati per lingua e ruolo, senza moltiplicare le risorse HR' },
        { icon: Heart, text: 'Trasformare HR in vero agente di cambiamento: creare un\'infrastruttura di selezione capace di supportare la crescita del business, rendendo HR un business partner a tutti gli effetti' },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: 'Il team HR di Subdued ha lavorato direttamente con Skillvue per selezionare le skill più rilevanti per i profili di store e costruire un assessment strutturato, erogato via WhatsApp — una scelta progettuale chiave per garantire un\'esperienza frictionless e un buon tasso di completamento.',
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: CheckCircle, label: 'Comunicazione' },
        { icon: TrendingUp, label: 'Capacità di vendita' },
        { icon: Users, label: 'Teamworking' },
      ],
      methodologyLabel: 'COME È STATO COSTRUITO',
      methodology: [
        {
          title: 'Invio del link all\'assessment Skillvue via WhatsApp',
          text: 'Una scelta progettuale chiave per garantire un\'esperienza frictionless e un buon tasso di completamento.',
        },
        {
          title: 'Il candidato completa l\'assessment',
          text: 'Video presentation + domande comportamentali strutturate su comunicazione, vendita e teamwork. Massimo 15 minuti, da qualunque device, entro una deadline definita.',
        },
        {
          title: 'Skillvue genera un report dettagliato',
          text: 'Punteggio per competenza, compatibilità complessiva, aree di forza e miglioramento che l\'HR utilizza per la gestione del colloquio in persona.',
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: 'I risultati misurabili ottenuti da Subdued attraverso l\'adozione di Skillvue nei processi di selezione.',
      metrics: [
        { value: '-70%', label: 'Ore di pre-screening' },
        { value: '80%', label: 'Candidati qualificati dopo lo skills screening' },
        { value: '-50%', label: 'Turnover' },
        { value: '6', label: 'Paesi coperti' },
      ],
      qualitative: [
        { icon: Heart, title: 'L\'employer branding inatteso', text: 'Il risultato che nessuno aveva previsto: il processo di selezione innovativo è diventato esso stesso un elemento di attrazione, un vantaggio competitivo concreto nel mercato del lavoro retail.' },
        { icon: Users, title: 'Human-in-the-loop, sempre', text: 'Il primo colloquio in persona è ora più mirato e personalizzato, basato sui dati del report. Il recruiter arriva preparato. Il candidato si sente ascoltato. La connessione umana è preservata.' },
        { icon: Layers, title: 'Consolidamento europeo del progetto', text: 'L\'Italia è stata il primo mercato a implementare l\'infrastruttura Skillvue, diventando il modello di riferimento per il gruppo e guidando i team HR di UK, Irlanda, Paesi Bassi, Svezia e Francia. Un esempio virtuoso di standardizzazione di processo a partire dal lavoro di un team "pilota".' },
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
      before: 'Subdued: building a ',
      highlight1: 'single scalable hiring standard',
      middle: ' for an international network of ',
      highlight2: '130+ stores',
      after: '',
    },
    subtitle: 'With Skillvue, Subdued built a consistent, scalable evaluation process across multiple markets, allowing a lean HR team to apply the same hiring rigour in every country while halving turnover.',
    heroMetrics: [
      { value: '-40%', label: 'Time-to-hire' },
      { value: '-50%', label: 'Turnover' },
      { value: '80%', label: 'Qualified candidates after skills screening' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Retail' },
        { label: 'Countries', value: 'Italy, Ireland, UK, Netherlands, Sweden, France' },
        { label: 'Employees', value: '1,000+' },
        { label: 'Stores', value: '130+ mono-brand' },
        { label: 'Use Case', value: 'Hiring' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Company and The Context',
      paragraph: <>
        Subdued is an Italian fashion retail brand. Founded in Italy, it now operates over <strong className="text-[#121212]/80 font-semibold">130 mono-brand stores</strong> in continuous expansion, <strong className="text-[#121212]/80 font-semibold">1,000+ employees</strong> and a growing presence across multiple continents.
        <br /><br />
        The growth trajectory is exceptional: the brand's revenue <strong className="text-[#121212]/80 font-semibold">nearly doubled between 2022 and 2024</strong>, and more than half of revenues come from international markets — which are showing strong signals for the future, with openings underway in the United States, the Middle East, South-East Asia, Korea and China.
        <br /><br />
        In this context, the ability to hire the right people at the pace of new store openings becomes <strong className="text-[#121212]/80 font-semibold">the number one operational constraint</strong>. Every new store requires a trained team capable of representing the brand and its Italian DNA to a Gen Z audience in culturally different markets — yet each country's HR team is just <strong className="text-[#121212]/80 font-semibold">1–3 people</strong>. With traditional methods, the equation simply does not work.
      </>,
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: 'Key store roles to fill, structurally high turnover, and a lean HR team that could not scale with global expansion without a structured system.',
      businessLabel: 'BUSINESS CHALLENGES',
      hrLabel: 'HR & PEOPLE CHALLENGES',
      businessChallenges: [
        {
          icon: BarChart3,
          title: 'High store performance starts with hiring',
          text: 'Scaling the business was not just about hiring quickly: it required predictive insights to identify candidates with the highest commercial potential and ensure strong performance from day one in store.',
        },
        {
          icon: TrendingUp,
          title: 'A structurally high turnover rate',
          text: 'Turnover in fashion retail is inherently elevated. For a brand where the in-store experience is a core part of the sale, every wrong hire amplified this risk further.',
        },
        {
          icon: Scale,
          title: 'One brand, no shared standard across Europe',
          text: 'Each country used different criteria, different languages, different cultural sensitivities. No common framework existed — a sustainable, replicable HR model for the entire commercial network was needed.',
        },
      ],
      hrChallenges: [
        {
          icon: Eye,
          title: 'The CV: an insufficient filter',
          text: '50% of candidates who passed initial screening lacked the soft skills for daily store work. Communication, selling ability and customer orientation: all invisible on paper.',
        },
        {
          icon: Zap,
          title: 'Manual screening was eating into strategic time',
          text: 'Without a structured filter, every candidate required a significant time investment just for pre-screening — operational load that crowded out time for more strategic activities, from employer branding to team development.',
        },
        {
          icon: Heart,
          title: 'Early turnover: a signal of a fragile process',
          text: 'A low-predictability hiring process led to mismatched hires and high turnover in the first few months. The cost of every hiring mistake was hard to absorb in a rapidly expanding network.',
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change',
      items: [
        { icon: Zap, text: 'Surface skills and potential at scale: assess communication, selling and teamworking before the interview, with objective data on every candidate' },
        { icon: Target, text: 'Free the team from operational work: reduce screening hours to recover time for strategic activities, employer branding and development' },
        { icon: Layers, text: 'Create a cross-Europe standard: the same evaluation criteria across Italy, Ireland, the UK, the Netherlands, Sweden and France, adapted by language and role, without multiplying HR resources' },
        { icon: Heart, text: 'Transform HR into a real agent of change: build a hiring infrastructure capable of supporting business growth, making HR a true business partner' },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI-scaled Assessment with Skillvue',
      intro: 'The Subdued HR team worked directly with Skillvue to select the most relevant skills for store profiles and build a structured assessment — delivered via WhatsApp, a deliberate design choice to ensure a frictionless experience and strong completion rates.',
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: CheckCircle, label: 'Communication' },
        { icon: TrendingUp, label: 'Selling ability' },
        { icon: Users, label: 'Teamworking' },
      ],
      methodologyLabel: 'HOW IT WAS BUILT',
      methodology: [
        {
          title: 'Skillvue assessment link sent via WhatsApp',
          text: 'A deliberate design choice to ensure a frictionless experience and strong completion rates.',
        },
        {
          title: 'Candidate completes the assessment',
          text: 'Video presentation + structured behavioural questions on communication, sales, and teamwork. Max 15 minutes, any device, within a set deadline.',
        },
        {
          title: 'Skillvue generates a detailed report',
          text: 'Score per skill, overall fit, strengths, and development areas — used by HR to guide the in-person interview.',
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The measurable outcomes Subdued achieved through Skillvue across its hiring processes.',
      metrics: [
        { value: '-70%', label: 'Pre-screening hours' },
        { value: '80%', label: 'Qualified candidates after skills screening' },
        { value: '-50%', label: 'Turnover' },
        { value: '6', label: 'Countries covered' },
      ],
      qualitative: [
        { icon: Heart, title: 'The unexpected employer branding effect', text: 'The result no one anticipated: the innovative hiring process itself became an attraction asset — a concrete competitive advantage in the retail labour market.' },
        { icon: Users, title: 'Human-in-the-loop, always', text: 'The first in-person interview is now more focused and personalised, grounded in report data. The recruiter arrives prepared. The candidate feels heard. The human connection is preserved.' },
        { icon: Layers, title: 'European consolidation of the project', text: 'Italy was the first market to implement the Skillvue infrastructure, becoming the blueprint for the group and guiding the HR teams in the UK, Ireland, the Netherlands, Sweden and France. A virtuous example of process standardisation driven by a pilot team.' },
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

export default function SubduedStoryPage() {
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
            <img src="/logos/subdued-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(6px) brightness(0.3)', transform: 'scale(1.05)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-10">
            {/* Breadcrumb */}
            <motion.div className="mb-5 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Button variant="tertiary" mode="dark" icon={null} onClick={() => { router.push(lang === 'it' ? '/clienti' : '/customers'); window.scrollTo(0, 0); }}>{c.breadcrumb}</Button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Subdued</span>
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

              {/* Client card */}
              <motion.div className="lg:col-span-5 flex flex-col gap-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/[0.08]">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white flex items-center justify-center">
                      <img src="/logos/subdued-logo.png" alt="Subdued logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-0.5">{c.clientCard.label}</span>
                      <p className="text-[16px] font-bold text-white/90">Subdued</p>
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

              <div>
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.methodologyLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.solution.methodology.map((m, i) => (
                    <div key={m.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <span className="block text-[2.75rem] font-light leading-none mb-6" style={{ color: '#c7d2fe' }}>0{i + 1}</span>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{m.title}</h4>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-5">
                {c.results.metrics.map((m, i) => {
                  const ResultIcon = [Clock, CheckCircle, TrendingDown, Globe][i];
                  return (
                    <div key={m.label} className="rounded-2xl border p-8" style={{ background: '#b7f5d8', borderColor: '#93e0bb' }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(6,78,59,0.14)' }}>
                        <ResultIcon className="h-[22px] w-[22px]" style={{ color: '#064e3b' }} />
                      </div>
                      <h4 className="text-[32px] stat-value text-[#0b3b28] mb-3 leading-[1.3]">{m.value}</h4>
                      <p className="text-[15px] text-[#0b3b28]/60 leading-[1.55]">{m.label}</p>
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
