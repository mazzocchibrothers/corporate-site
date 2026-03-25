// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Building2, Users, Plane, Shield, Scale, Clock, TrendingUp, Target, Layers, CheckCircle, Zap, Eye, BarChart3, Heart, Star } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}

const keyMetrics = [
  { value: '~3 giorni', label: 'Time-to-process', sublabel: 'Per gestire 150+ candidature interne' },
  { value: '5.000', label: 'Dipendenti con accesso allo sviluppo', sublabel: 'Da ~1.000 (solo corporate) a tutta la popolazione' },
  { value: '~3.000', label: 'Operativi inclusi per la prima volta', sublabel: 'Precedentemente esclusi da ogni percorso di sviluppo' },
  { value: '150+', label: 'Candidature per processo', sublabel: 'Gestite con supporto AI strutturato' },
];

const businessChallenges = [
  {
    icon: Clock,
    title: 'Crescita frenata dalla lentezza dei processi di assessment',
    text: 'Con oltre 150 candidature per ogni posizione interna e un processo che richiedeva 3-4 mesi, la velocità di promozione non reggeva il ritmo delle assunzioni. I ruoli chiave restavano scoperti troppo a lungo, impattando la qualità del servizio aeroportuale.',
  },
  {
    icon: Users,
    title: '3.000 dipendenti operativi esclusi dallo sviluppo',
    text: 'Solo ~1.000 dipendenti corporate avevano accesso a percorsi di sviluppo strutturati. I ~4.000 operativi — che rappresentano il cuore del servizio aeroportuale — non erano mai stati valutati sulle soft skill, lasciando un enorme bacino di talento invisibile.',
  },
  {
    icon: Scale,
    title: 'Vincolo regolatorio e scrutinio pubblico',
    text: 'Come concessionario pubblico, ogni processo di valutazione deve reggere allo scrutinio del regolatore. Servivano fondamenta accademiche e psicometriche solide dietro ogni strumento utilizzato, non solo efficienza operativa.',
  },
];

const hrChallenges = [
  {
    icon: Eye,
    title: 'Nessuna visibilità sulle competenze della popolazione operativa',
    text: 'Per i ~4.000 dipendenti operativi non esisteva alcuna mappatura strutturata delle competenze. Le decisioni sul potenziale si basavano esclusivamente sul giudizio del responsabile diretto, senza dati oggettivi a supporto.',
  },
  {
    icon: BarChart3,
    title: 'Assessment manuali e non scalabili',
    text: 'Ogni processo di crescita richiedeva 5-10 persone HR, test in presenza e colloqui individuali distribuiti su 3-4 mesi. Un modello impossibile da scalare sull\'intera popolazione, che di fatto limitava lo sviluppo ai soli ruoli corporate.',
  },
  {
    icon: Heart,
    title: 'Scetticismo e resistenza al cambiamento',
    text: 'Il personale operativo non aveva alcuna esperienza pregressa con strumenti di assessment digitale. Serviva un piano di change management strutturato, con accompagnamento sul campo e comunicazione trasparente, per superare la paura del giudizio.',
  },
];

const objectives = [
  { icon: Users, text: 'Democratizzare l\'accesso all\'assessment: garantire a tutti i 5.000 dipendenti pari opportunità di sviluppo, non solo al personale corporate' },
  { icon: Target, text: 'Oggettivare la valutazione: passare dal giudizio soggettivo del singolo responsabile a un assessment strutturato e data-driven sulle competenze, incluse le soft skill per i ruoli operativi' },
  { icon: Zap, text: 'Scalare senza sacrificare la qualità: processare 150+ candidature interne in giorni anziché mesi, preservando il rigore psicometrico richiesto dal regolatore' },
  { icon: Layers, text: 'Costruire un modello human-in-the-loop: lo strumento deve supportare le decisioni manageriali con dati, non sostituirle — intelligenza aumentata, non automazione del giudizio' },
];

const skillsAssessed = [
  { icon: Star, label: 'Leadership' },
  { icon: Users, label: 'Comunicazione' },
  { icon: Shield, label: 'Safety awareness' },
  { icon: Target, label: 'Competenze tecniche' },
  { icon: CheckCircle, label: 'Lingua inglese' },
];

const methodologyCards = [
  {
    title: 'Assessment multi-step strutturato',
    text: 'Un percorso a più fasi: filtro prerequisiti, invito aperto senza pre-selezione del manager, test di inglese, test tecnico (per ruoli specifici), assessment AI sulle soft skill, ranking e shortlisting, assessment center in presenza per i top-ranked, decisione finale manageriale.',
  },
  {
    title: 'Invito aperto e inclusivo',
    text: 'Tutti i dipendenti eleggibili sono invitati a partecipare — nessuna pre-selezione da parte dei responsabili di linea. Una scelta progettuale per garantire equità di accesso e far emergere talento nascosto, coerente con i requisiti di un concessionario pubblico.',
  },
  {
    title: 'Change management sul campo',
    text: 'Per i ruoli corporate l\'adozione è stata immediata. Per i ruoli operativi è stato necessario un accompagnamento strutturato: sessioni guidate in sede, comunicazione estensiva fino a livello sindacale, e supporto on-site durante le prime fasi di assessment.',
  },
];

const qualitativeCards = [
  {
    icon: Users,
    title: 'Democratizzazione dello sviluppo',
    text: 'Ogni dipendente può ora partecipare alle selezioni interne con pari opportunità. Per la prima volta, lo sviluppo professionale è un diritto accessibile a tutti i 5.000 dipendenti, non un privilegio riservato ai ruoli corporate.',
  },
  {
    icon: Eye,
    title: 'Talento nascosto scoperto',
    text: 'ADR ha individuato profili ad alto potenziale in ruoli operativi dove prima non esisteva alcuna visibilità. Persone di valore che sarebbero rimaste invisibili con il vecchio approccio basato sul solo giudizio del responsabile.',
  },
  {
    icon: Scale,
    title: 'Valutazione oggettivata e difendibile',
    text: 'Le decisioni sono ora supportate da dati strutturati sulle competenze, non più da sole opinioni soggettive. Un aspetto cruciale per un concessionario pubblico che deve poter giustificare ogni processo davanti al regolatore.',
  },
  {
    icon: Layers,
    title: 'Primo vero modello human-in-the-loop',
    text: 'L\'assessment non produce un verdetto ma informazioni che alimentano un processo decisionale manageriale consapevole. Lo sforzo cognitivo per i manager aumenta, perché ora hanno dati su cui decidere — nessun assessore esterno a cui delegare la responsabilità.',
  },
  {
    icon: TrendingUp,
    title: 'Miglioramento engagement',
    text: 'La dimensione "accesso alle opportunità di sviluppo" nelle survey di engagement interne è migliorata nel tempo dopo l\'implementazione di Skillvue, segnalando un impatto percepito e concreto sulla employee experience.',
  },
];

const visionBullets = [
  'Estensione di Skillvue a tutte le selezioni interne nel 2026, sfruttando la scalabilità della piattaforma',
  'Pilota recruitment esterno avviato: ~20 nuove assunzioni in ruoli operativi già valutate su inglese e competenze tecniche specifiche',
  'Integrazione più ampia nel Talent Acquisition per creare continuità tra selezione e sviluppo',
  'Assessment asincrono per la selezione esterna: i candidati completano da qualsiasi device tramite link, abbattendo le barriere di accesso',
];

export default function ADRStoryPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main>
        {/* ===== HERO ===== */}
        <section className="relative pt-[80px]">
          {/* Dark gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #111128 50%, #0d0d1f 100%)' }} />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #4b4df7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b3be0 0%, transparent 40%)' }} />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">Clienti</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Aeroporti di Roma</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  {/* Badge */}
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase mb-8 block w-fit" style={{ background: 'rgba(75,77,247,0.15)', color: '#7b7df9', border: '1px solid rgba(75,77,247,0.2)' }}>
                    CASE STUDY
                  </span>

                  {/* Headline */}
                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.12 }}>
                    Come Aeroporti di Roma ha{' '}
                    <span style={{ color: '#7b7df9' }}>democratizzato</span>
                    {' '}l'accesso allo sviluppo per{' '}
                    <span style={{ color: '#7b7df9' }}>5.000 persone</span>
                  </h1>

                  <p className="text-[17px] text-white/[0.60] leading-[1.75] mb-12 max-w-2xl">
                    Da assessment manuali riservati a pochi, a un sistema AI scalabile che copre l'intera popolazione aziendale. Con Skillvue, ADR ha trasformato lo sviluppo del talento da privilegio a diritto.
                  </p>

                  {/* Key metrics */}
                  <div className="flex flex-wrap gap-4 mb-12">
                    {[
                      { value: '~3 giorni', label: 'time-to-process' },
                      { value: '5.000', label: 'dipendenti coinvolti' },
                      { value: '3-4 mesi', label: 'tempo precedente' },
                    ].map(m => (
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-4">
                        <span className="block text-white" style={{ fontSize: '1.7rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[13px] text-white/[0.55] mt-1 block">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all duration-300" style={{ background: '#4b4df7' }}>
                      Contattaci <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => document.getElementById('contesto')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white/70 border border-white/[0.15] hover:border-white/[0.25] hover:text-white transition-all duration-300">
                      Scopri di più <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Client card sidebar */}
              <motion.div className="lg:col-span-5 lg:sticky lg:top-[100px] self-start" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.08]">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white flex items-center justify-center p-1.5">
                      <img src="/logos/adr-logo.jpg" alt="ADR logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">SCHEDA CLIENTE</span>
                      <p className="text-[18px] font-bold text-white/90">Aeroporti di Roma</p>
                    </div>
                  </div>

                  <div className="divide-y divide-white/[0.08]">
                    {[
                      { label: 'Settore', value: 'Gestione aeroportuale – concessionario pubblico' },
                      { label: 'Dipendenti', value: '~5.000 FTE' },
                      { label: 'Aeroporti', value: 'Fiumicino + Ciampino' },
                      { label: 'Gruppo', value: 'Mundys' },
                    ].map(s => (
                      <div key={s.label} className="py-4 first:pt-0 last:pb-0">
                        <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{s.label}</span>
                        <p className="text-[14px] text-white/[0.65] leading-[1.6]">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Contact person */}
                  <div className="mt-6 pt-6 border-t border-white/[0.08] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/[0.12]">
                      <img src="/logos/adr-alberto.jpg" alt="Alberto Valenza" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">Alberto Valenza</p>
                      <p className="text-[12px] text-white/40 leading-[1.5]">SVP Human Capital, Organization & Procurement</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== LIGHT CONTENT SECTIONS ===== */}
        <section id="contesto" className="section-breathe relative py-16 lg:py-20" style={{ background: '#f8fafc' }}>
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* ===== CONTEXT ===== */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>CONTESTO</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-6 max-w-3xl">Il contesto del progetto</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.85] mb-6 max-w-3xl">
                Aeroporti di Roma (ADR), parte del Gruppo Mundys, gestisce gli aeroporti di Fiumicino "Leonardo da Vinci" e Ciampino "G.B. Pastine" con circa <strong className="text-[#1A1A2E]/80 font-semibold">5.000 dipendenti</strong>, di cui <strong className="text-[#1A1A2E]/80 font-semibold">~4.000 in ruoli operativi</strong> (manutenzione, sicurezza, ground handling, pulizie). Il rimbalzo del traffico post-COVID ha imposto ad ADR di assumere e promuovere a velocità senza precedenti — <strong className="text-[#1A1A2E]/80 font-semibold">oltre 2.000 contratti a tempo determinato nel solo 2023</strong>. Come concessionario pubblico, ADR deve garantire processi di valutazione equi e rigorosi dal punto di vista accademico e psicometrico.
              </p>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.85] mb-8 max-w-3xl">
                L'approccio precedente prevedeva assessment solo per le promozioni, gestiti manualmente con <strong className="text-[#1A1A2E]/80 font-semibold">5-10 persone HR coinvolte per processo</strong> e <strong className="text-[#1A1A2E]/80 font-semibold">3-4 mesi</strong> per gestire oltre 150 candidature. Le survey di engagement interne avevano segnalato l'<strong className="text-[#1A1A2E]/80 font-semibold">accesso alle opportunità di sviluppo</strong> come un punto critico.
              </p>
              <p className="text-[15px] text-[#1A1A2E]/40 italic leading-[1.75] max-w-2xl border-l-2 border-[#4b4df7]/20 pl-5">
                Il progetto ha trasformato l'assessment da strumento riservato a pochi a un sistema scalabile e democratico, estendendo per la prima volta percorsi di sviluppo strutturati all'intera popolazione aziendale — inclusi i ~3.000 dipendenti operativi precedentemente esclusi.
              </p>
            </Section>

            {/* ===== CHALLENGE ===== */}
            <Section id="sfida" className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>LA SFIDA</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">Il problema strutturale</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-14 max-w-3xl">
                ADR è un'azienda in forte crescita post-COVID, con un piano di assunzioni massiccio e la necessità di promuovere internamente a ritmi senza precedenti. Il business aveva un vincolo operativo che precedeva qualsiasi considerazione HR: garantire che ogni ruolo chiave fosse coperto da persone qualificate, in tempi sostenibili e con processi difendibili davanti al regolatore.
              </p>

              {/* Business challenges */}
              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">IMPATTO SUL BUSINESS</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {businessChallenges.map((c) => (
                    <div key={c.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <c.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4]">{c.title}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* HR challenges */}
              <div>
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">IMPATTO SU HR & PEOPLE</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {hrChallenges.map((c) => (
                    <div key={c.title} className="rounded-2xl border border-[#4b4df7]/[0.1] bg-[#4b4df7]/[0.02] p-7">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.1)' }}>
                        <c.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4]">{c.title}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* ===== OBJECTIVES ===== */}
            <Section id="obiettivi" className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>OBIETTIVI DI COLLABORAZIONE</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">Cosa doveva cambiare</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {objectives.map((o, i) => (
                  <div key={i} className="flex items-start gap-5 rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <o.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <p className="text-[15px] text-[#1A1A2E]/70 leading-[1.65] pt-1.5">{o.text}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* ===== SOLUTION ===== */}
            <Section id="soluzione" className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>LA SOLUZIONE</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">Assessment AI con Skillvue</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12 max-w-3xl">
                Skillvue è stato integrato nella People Strategy esistente di ADR, che già includeva un modello di leadership e percorsi di crescita strutturati (Green Field Program, Talent Building Program, Management Career Path). Il team People Science di Skillvue ha lavorato con l'HR di ADR per allineare la piattaforma al modello di competenze aziendale.
              </p>

              {/* Skills assessed */}
              <div className="mb-12">
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">COMPETENZE VALUTATE</span>
                <div className="flex flex-wrap gap-3">
                  {skillsAssessed.map((s) => (
                    <div key={s.label} className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
                      <s.icon className="h-4 w-4" style={{ color: '#4b4df7' }} />
                      <span className="text-[14px] font-semibold text-[#1A1A2E]/70">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Methodology cards */}
              <div>
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">METODOLOGIA</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {methodologyCards.map((c, i) => (
                    <div key={c.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm relative overflow-hidden">
                      <span className="absolute top-5 right-6 text-[3rem] font-black leading-none select-none" style={{ color: 'rgba(75,77,247,0.04)' }}>0{i + 1}</span>
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4] relative">{c.title}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65] relative">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* ===== RESULTS ===== */}
            <Section id="risultati" className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>RISULTATI</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">Key Metrics & Impatto</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12 max-w-3xl">
                I risultati misurabili ottenuti da ADR attraverso l'adozione di Skillvue per la gestione dei processi di sviluppo interno.
              </p>

              {/* Key metrics dark block */}
              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {keyMetrics.map(m => (
                    <div key={m.value} className="text-center">
                      <span className="block text-white" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                      <span className="text-[13px] text-white/[0.65] mt-3 block leading-[1.4]">{m.label}</span>
                      {m.sublabel && <span className="text-[11px] text-white/30 mt-1 block leading-[1.4]">{m.sublabel}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualitative impact cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {qualitativeCards.map((c) => (
                  <div key={c.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <c.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4]">{c.title}</h4>
                    <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{c.text}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* ===== FUTURE VISION ===== */}
            <Section id="evoluzione">
              <div className="rounded-2xl border border-[#4b4df7]/[0.12] bg-gradient-to-br from-[#4b4df7]/[0.04] to-transparent p-10 lg:p-14">
                {/* Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-6 block w-fit" style={{ background: 'rgba(75,77,247,0.1)', color: '#4b4df7', border: '1px solid rgba(75,77,247,0.2)' }}>
                  EVOLUZIONE 2026
                </span>

                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">
                  Da sviluppo interno a talent strategy integrata su tutta la workforce
                </h2>
                <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-8 max-w-3xl">
                  Quando l'assessment sullo sviluppo interno ha dimostrato di essere scalabile e rigoroso, il passo naturale è stato estenderlo anche alla selezione esterna — eliminando la discontinuità tra come si valuta chi è già in azienda e come si seleziona chi entra.
                </p>

                {/* Strategic objective callout */}
                <div className="rounded-xl border border-[#4b4df7]/[0.15] bg-[#4b4df7]/[0.05] p-6 mb-8 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.12)' }}>
                    <Target className="h-5 w-5" style={{ color: '#4b4df7' }} />
                  </div>
                  <p className="text-[15px] text-[#1A1A2E]/75 leading-[1.7]">
                    Costruire un unico ciclo coerente in cui ogni persona — dal primo giorno — viene valutata, orientata e accompagnata con la stessa logica, coprendo l'intera popolazione di 5.000 dipendenti.
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-4">
                  {visionBullets.map((b, i) => (
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

        {/* ===== RELATED STORIES ===== */}
        <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white/90 mb-12">Storie correlate</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO · Mobilità Interna', headline: '~900 persone valutate. Una pipeline di Store Manager costruita dall\'interno.' },
                { id: 'credem', company: 'Credem', tag: 'Banking & Finance · Sviluppo', headline: 'Competenze e sviluppo del talento nel settore bancario.' },
              ].map(s => (
                <button key={s.id} onClick={() => { router.push(`/customers/${s.id}`); window.scrollTo(0, 0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 lg:p-14 transition-all duration-500">
                  <span className="text-[14px] text-white/40 mb-4 block">{s.tag}</span>
                  <h4 className="text-[24px] font-bold text-white/90 mb-4">{s.company}</h4>
                  <p className="text-[16px] text-white/[0.65] leading-[1.7] mb-8">{s.headline}</p>
                  <span className="inline-flex items-center gap-2 text-[15px] text-white/50 group-hover:text-white/80 font-semibold transition-colors duration-300">
                    Leggi la storia <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <SolutionFinalCTA headline="Pronto a trasformare la tua" accentWord="People Strategy?" />
        <Footer />
      </main>
    </>
  );
}
