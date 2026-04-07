// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, Heart, CheckCircle } from 'lucide-react';
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
      before: 'Eataly: come alimentare un piano di espansione globale selezionando i migliori talenti tra oltre ',
      highlight1: '1.300 candidature',
      middle: '',
      highlight2: '',
      after: '',
    },
    subtitle: "Eataly cresce a un ritmo 20 volte superiore alla media del settore e sta raddoppiando la presenza in Nord America. Con Skillvue, ha costruito un sistema di pre-screening AI-powered per il progetto Career Passport che ha permesso di valutare migliaia di candidature interne ed esterne in poche settimane, in un settore dove solitamente trovare un profilo qualificato richiede in media 4,5 mesi.",
    heroMetrics: [
      { value: '1.300+', label: 'candidature processate via AI pre-screening' },
      { value: '22', label: 'risorse interne pronte a ricollocarsi' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di pi\u00f9',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Food Retail' },
        { label: 'Dipendenti', value: 'Oltre 5.300' },
        { label: 'Fatturato', value: '684 mln \u20ac' },
        { label: 'Presenza globale', value: '53+ punti vendita in 16 Paesi' },
        { label: 'Use Case', value: 'Hiring, Internal Mobility' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Un brand che cresce 20 volte pi\u00f9 veloce del suo settore ha bisogno di trovare i talenti giusti alla stessa velocit\u00e0',
      paragraph: <>
        Eataly non è un operatore qualsiasi del food italiano. Con <strong className="text-[#1A1A2E]/80 font-semibold">€684M di ricavi, una crescita del 47% in tre anni</strong>, e una revenue per employee doppia rispetto alla media di settore, è l'unico brand italiano del food con una presenza internazionale reale in <strong className="text-[#1A1A2E]/80 font-semibold">16 Paesi</strong>. Dal 2022 sta accelerando su tutti i fronti: nuovi flagship in Nord America (dove si genera il <strong className="text-[#1A1A2E]/80 font-semibold">60% dei ricavi</strong>), nuovi format compatti — Eataly Caffè in hub urbani e Eataly Collection negli aeroporti —, un piano da <strong className="text-[#1A1A2E]/80 font-semibold">€100M per il Medio Oriente</strong>, e il primo Eataly at Sea con MSC Cruises.<br /><br />
        Questa crescita richiede figure manageriali capaci di incarnare i valori del brand in contesti multiculturali: Head Chef, Director of Store Operations, General Manager capaci di portare l'autenticità italiana a Philadelphia, Toronto e Miami. Ma il settore della ristorazione non produce sempre il talento che serve. Con <strong className="text-[#1A1A2E]/80 font-semibold">258.000 posti vacanti, un turnover operativo del 50–70% e un tempo medio di reperimento di 4,5 mesi</strong>, la carenza di figure qualificate è il vincolo più critico al piano di espansione. Nasce da qui il <strong className="text-[#1A1A2E]/80 font-semibold">Progetto Career Passport</strong>, per trasformare questo vincolo in un vantaggio competitivo.
      </>,
      summary: "Il Career Passport è stato il primo capitolo per la costruzione di una talent strategy sempre più solida e innovativa attorno al concetto di mobilità internazionale e crescita, orientata a rendere il brand Eataly una piattaforma globale del Made in Italy.",
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Crescere a questa velocit\u00e0 espone un collo di bottiglia: trovare le persone giuste, in tempo',
      intro: "La campagna Career Passport ha generato oltre mille candidature esterne da sommare a tutte le application interne per 3 posizioni chiave.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: Zap,
          title: 'La velocit\u00e0 dell\u2019espansione supera la capacity di selezione',
          text: "20+ nuovi store in pipeline in Nord America, aperture simultanee su pi\u00f9 mercati, date fissate. La campagna Career Passport ha generato 1.300+ candidature per 3 posizioni e decine di candidature interne che lo screening manuale non poteva reggere.",
        },
        {
          icon: Layers,
          title: 'Il profilo cercato \u00e8 raro: artigianale + manageriale + internazionale',
          text: "Eataly cerca persone capaci di replicare l\u2019autenticit\u00e0 artigianale italiana su scala globale. Leadership, gestione del personale, inglese fluente, disponibilit\u00e0 alla mobilit\u00e0: un profilo composito e difficilmente reperibile.",
        },
        {
          icon: TrendingUp,
          title: 'Il costo dell\u2019errore \u00e8 amplificato dalla crescita',
          text: "Per un\u2019azienda che investe milioni nell\u2019espansione internazionale e ha aperture store con date fissate, ogni posizione scoperta costa \u20ac20.000\u2013\u20ac40.000 in mancati ricavi per trimestre. A questa scala, la qualit\u00e0 della selezione \u00e8 una variabile di P&L.",
        },
      ],
      hrChallenges: [
        {
          icon: Scale,
          title: 'Ricerca di equit\u00e0 su volumi mai gestiti prima',
          text: "Migliaia di candidature da canali interni ed esterni da processare. Senza uno strumento strutturato, il rischio era valutare in modo disomogeneo: nel settore il 38,1% dei mismatch deriva proprio da assessment non standardizzati.",
        },
        {
          icon: Target,
          title: 'Necessit\u00e0 di filtrare da subito i requisiti bloccanti',
          text: "Disponibilit\u00e0 al trasferimento, range retributivo, esperienza internazionale: in un settore dove il costo di sostituzione di un manager \u00e8 il 65\u201390% della RAL, investire ore di colloquio su candidati non idonei era un lusso che la velocit\u00e0 del piano non consentiva.",
        },
        {
          icon: Heart,
          title: 'Il processo di selezione come leva di employer branding',
          text: "Per attrarre i migliori, Eataly doveva comunicare il valore del suo brand anche attraverso il processo di selezione: innovazione, attenzione alla persona, l\u2019unicit\u00e0 dell\u2019opportunit\u00e0 internazionale.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: "Processare 1.300+ candidature in settimane, non mesi: comprimere i tempi di pre-screening per stare al passo con un piano di aperture che non aspetta." },
        { icon: Eye, text: "Mappare tutti i fattori chiave gi\u00e0 al pre-screening: Leadership, gestione del personale, lingua inglese, aspirazione alla mobilit\u00e0 internazionale. Valutare tutto prima del primo colloquio umano, per concentrare l\u2019investimento di tempo sui candidati con il pi\u00f9 alto potenziale di successo." },
        { icon: Scale, text: "Garantire equit\u00e0 e possibilit\u00e0 di crescita su scala: ogni candidato valutato con lo stesso rigore e la stessa profondit\u00e0, costruendo un processo difendibile e trasparente sia all\u2019interno che all\u2019esterno." },
        { icon: TrendingUp, text: "Trasformare la selezione in un acceleratore dell\u2019espansione: non solo trovare persone, ma costruire una macchina di talent acquisition che regga la scala di un brand che sta raddoppiando la presenza in Nord America e punta a 40 nuovi store in Medio Oriente." },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue per il progetto Career Passport',
      intro: "Skillvue \u00e8 stato integrato nel processo di selezione esterna del progetto Eataly Career Passport \u2014 il programma di global mobility lanciato per supportare l\u2019espansione in Nord America. Dopo che una campagna omnichannel ha raccolto oltre 1.300 candidature, Skillvue ha gestito il pre-screening con un assessment basato su domande filtro e video interviste situazionali calibrate sui ruoli specifici (Head Chef, Director of Store Operations, General Manager of Restaurant).",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Users, label: 'Leadership e gestione del personale' },
        { icon: Shield, label: 'Lingua inglese' },
        { icon: Target, label: 'Predisposizione alla mobilit\u00e0 internazionale' },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Cosa \u00e8 cambiato e perch\u00e9 conta.',
      subtitle: 'I risultati del progetto Skillvue \u00d7 Eataly Career Passport.',
      metrics: [
        { value: '1.300+', label: 'Candidature processate' },
        { value: '13', label: 'Risorse esterne in shortlist' },
        { value: '22', label: 'Risorse interne pronte a ricollocarsi' },
      ],
      qualitative: [
        { icon: CheckCircle, title: 'Risultati chiari in poche settimane', text: "In un settore dove trovare un manager qualificato richiede in media 4,5 mesi, Skillvue ha permesso di processare l\u2019intero volume di candidature e arrivare a una shortlist pronta per i colloqui in poche settimane, abilitando il piano di aperture senza ritardi." },
        { icon: Users, title: 'Trasferimenti gi\u00e0 avviati da Europa a Nord America', text: "Da Londra a Boston, da Stoccolma a Philadelphia, da Monaco a West Palm Beach, da Roma a Toronto \u2014 Eataly sta costruendo una pipeline di talento internazionale che porta l\u2019autenticit\u00e0 italiana nei nuovi mercati. Un risultato tangibile del Career Passport." },
        { icon: Heart, title: 'Employer branding premiato', text: "Il progetto \u00e8 stato riconosciuto come di altissimo valore nel 2025, anno di lancio, e per questo motivo viene portato avanti anche nel 2026. In un settore dove la competizione per il talento \u00e8 strutturalmente sfavorevole alla ristorazione, Eataly ha dimostrato che un processo di selezione innovativo \u00e8 esso stesso un asset di brand." },
      ],
    },
    vision: {
      badge: 'EVOLUZIONE 2026',
      title: 'L\u2019espansione continua. La macchina di talent acquisition anche.',
      intro: "Eataly \u00e8 nel pieno di una trasformazione da brand mono-formato a piattaforma multi-formato globale. Il Career Passport \u00e8 stato il primo capitolo per la costruzione di una talent strategy sempre pi\u00f9 solida e innovativa, orientata a rendere il brand Eataly una piattaforma globale del Made in Italy.",
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation \u00b7 Internal Mobility', headline: 'Aeroporti di Roma: come sviluppare un\u2019organizzazione da quasi 5.000 persone per eseguire un piano da 9 miliardi' },
        { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO \u00b7 Mobilit\u00e0 Interna', headline: "In's Mercato: come ha costruito una pipeline interna di Store Manager" },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CUSTOMER STORY',
    headline: {
      before: 'Eataly: how to fuel a global expansion plan by selecting the best talent from over ',
      highlight1: '1,300 applications',
      middle: '',
      highlight2: '',
      after: '',
    },
    subtitle: "Eataly grows 20 times faster than the industry average and is doubling its presence in North America. With Skillvue, it built an AI-powered pre-screening system for the Career Passport project that made it possible to evaluate thousands of internal and external applications in just a few weeks, in a sector where finding a qualified profile typically takes an average of 4.5 months.",
    heroMetrics: [
      { value: '1,300+', label: 'applications processed via AI pre-screening' },
      { value: '22', label: 'internal resources ready to relocate' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Food Retail' },
        { label: 'Employees', value: '5,300+' },
        { label: 'Revenue', value: '\u20ac684M' },
        { label: 'Global presence', value: '53+ stores in 16 countries' },
        { label: 'Use Case', value: 'Hiring, Internal Mobility' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'A brand growing 20 times faster than its sector needs to find the right talent at the same speed',
      paragraph: <>
        Eataly is no ordinary player in Italian food. With <strong className="text-[#1A1A2E]/80 font-semibold">€684M in revenue, 47% growth over three years</strong>, and revenue per employee double the industry average, it is the only Italian food brand with a truly international presence across <strong className="text-[#1A1A2E]/80 font-semibold">16 countries</strong>. Since 2022 it has been accelerating on all fronts: new flagships in North America (where <strong className="text-[#1A1A2E]/80 font-semibold">60% of revenues</strong> are generated), new compact formats — Eataly Caffè in urban hubs and Eataly Collection in airports —, a <strong className="text-[#1A1A2E]/80 font-semibold">€100M plan for the Middle East</strong>, and the first Eataly at Sea with MSC Cruises.<br /><br />
        This growth requires managerial talent capable of embodying the brand's values in multicultural contexts: Head Chefs, Directors of Store Operations, General Managers who can bring Italian authenticity to Philadelphia, Toronto and Miami. But the hospitality sector doesn't always produce the talent that is needed. With <strong className="text-[#1A1A2E]/80 font-semibold">258,000 vacancies, 50–70% operational turnover, and an average time-to-fill of 4.5 months</strong>, the shortage of qualified profiles is the most critical constraint on the expansion plan. This is the origin of the <strong className="text-[#1A1A2E]/80 font-semibold">Career Passport Project</strong> — to turn this constraint into a competitive advantage.
      </>,
      summary: "The Career Passport was the first chapter in building an increasingly solid and innovative talent strategy around the concept of international mobility and growth, aimed at making the Eataly brand a global platform for Made in Italy.",
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'Growing at this pace exposes a bottleneck: finding the right people, on time',
      intro: "The Career Passport campaign generated over a thousand external applications, on top of all internal applications, for 3 key roles.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: Zap,
          title: 'Expansion speed outpaces hiring capacity',
          text: "20+ new stores in the pipeline in North America, simultaneous openings across multiple markets, fixed dates. The Career Passport campaign generated 1,300+ applications for 3 positions and dozens of internal applications that manual screening could not handle.",
        },
        {
          icon: Layers,
          title: 'The profile is rare: artisanal + managerial + international',
          text: "Eataly looks for people who can replicate Italian artisanal authenticity at global scale. Leadership, team management, fluent English, willingness to relocate: a complex profile that is genuinely hard to find.",
        },
        {
          icon: TrendingUp,
          title: 'The cost of error is amplified by growth',
          text: "For a company investing millions in international expansion with fixed store opening dates, every unfilled role costs \u20ac20,000\u2013\u20ac40,000 in missed revenue per quarter. At this scale, hiring quality is a P&L variable.",
        },
      ],
      hrChallenges: [
        {
          icon: Scale,
          title: 'Fairness at volumes never managed before',
          text: "Thousands of applications from internal and external channels to process. Without a structured tool, the risk was inconsistent evaluation: in the sector, 38.1% of mismatches come precisely from non-standardised assessments.",
        },
        {
          icon: Target,
          title: 'Filtering blocking requirements from the start',
          text: "Relocation availability, salary range, international experience: in a sector where the replacement cost of a manager is 65\u201390% of annual salary, spending interview time on unsuitable candidates was a luxury the expansion pace couldn\u2019t afford.",
        },
        {
          icon: Heart,
          title: 'The hiring process as an employer branding lever',
          text: "To attract the best, Eataly needed to communicate its brand value through the hiring process itself: innovation, care for the individual, and the uniqueness of an international career opportunity.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What needed to change',
      items: [
        { icon: Zap, text: "Process 1,300+ applications in weeks, not months: compress pre-screening timelines to keep pace with an opening plan that can\u2019t wait." },
        { icon: Eye, text: "Map all key factors at the pre-screening stage: Leadership, team management, English language, aspiration for international mobility. Assess everything before the first human interview, to focus time investment on the highest-potential candidates." },
        { icon: Scale, text: "Ensure fairness and growth opportunity at scale: every candidate evaluated with the same rigour and depth, building a process that is defensible and transparent both internally and externally." },
        { icon: TrendingUp, text: "Turn hiring into an accelerator of expansion: not just finding people, but building a talent acquisition engine that can support the scale of a brand doubling its North America presence and targeting 40 new stores in the Middle East." },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue for the Career Passport project',
      intro: "Skillvue was integrated into the external hiring process of the Eataly Career Passport project \u2014 the global mobility programme launched to support expansion in North America. After an omnichannel campaign collected over 1,300 applications, Skillvue managed the pre-screening with an assessment combining filter questions and situational video interviews calibrated to specific roles (Head Chef, Director of Store Operations, General Manager of Restaurant).",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Users, label: 'Leadership and people management' },
        { icon: Shield, label: 'English language' },
        { icon: Target, label: 'Openness to international mobility' },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'What changed and why it matters.',
      subtitle: 'Outcomes of the Skillvue \u00d7 Eataly Career Passport project.',
      metrics: [
        { value: '1,300+', label: 'Applications processed' },
        { value: '13', label: 'External resources in shortlist' },
        { value: '22', label: 'Internal resources ready to relocate' },
      ],
      qualitative: [
        { icon: CheckCircle, title: 'Clear results in a matter of weeks', text: "In a sector where finding a qualified manager takes an average of 4.5 months, Skillvue made it possible to process the entire volume of applications and reach an interview-ready shortlist in just a few weeks, enabling the opening plan without delays." },
        { icon: Users, title: 'Transfers already underway from Europe to North America', text: "From London to Boston, Stockholm to Philadelphia, Munich to West Palm Beach, Rome to Toronto \u2014 Eataly is building an international talent pipeline that brings Italian authenticity to new markets. A tangible result of the Career Passport." },
        { icon: Heart, title: 'Employer branding recognised', text: "The project was recognised as exceptionally high-value in 2025, the year of its launch, which is why it is being continued into 2026. In a sector where competition for talent is structurally unfavourable to hospitality, Eataly has shown that an innovative hiring process is itself a brand asset." },
      ],
    },
    vision: {
      badge: 'EVOLUTION 2026',
      title: 'The expansion continues. So does the talent acquisition machine.',
      intro: "Eataly is in the midst of a transformation from a single-format brand to a global multi-format platform. The Career Passport was the first chapter in building an increasingly solid and innovative talent strategy around the concept of international mobility and growth, aimed at making the Eataly brand a global platform for Made in Italy.",
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'adr', company: 'Aeroporti di Roma', tag: 'Aviation \u00b7 Internal Mobility', headline: 'Aeroporti di Roma: how to develop an organisation of nearly 5,000 people to execute a \u20ac9 billion plan' },
        { id: 'ins-mercato', company: "In's Mercato", tag: 'Retail GDO \u00b7 Internal Mobility', headline: "In's Mercato: how it built an internal pipeline of Store Managers" },
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

  return (
    <>
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
              <button onClick={() => { router.push('/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Eataly</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase mb-8 block w-fit" style={{ background: 'rgba(75,77,247,0.15)', color: '#7b7df9', border: '1px solid rgba(75,77,247,0.2)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.25 }}>
                    {c.headline.before}<span style={{ color: '#7b7df9' }}>{c.headline.highlight1}</span>{c.headline.middle}{c.headline.highlight2 && <span style={{ color: '#7b7df9' }}>{c.headline.highlight2}</span>}{c.headline.after}
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
        <section id="context-section" className="section-breathe relative py-16 lg:py-20" style={{ background: '#f8fafc' }}>
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* CONTEXT */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.context.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-6">{c.context.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.85] mb-8">{c.context.paragraph}</p>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.85]">{c.context.summary}</p>
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
              <div>
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.skillsLabel}</span>
                <div className="flex flex-wrap gap-3">
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
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12">{c.results.subtitle}</p>

              {/* Key metrics */}
              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
                  {/* 1.300+ — stacked documents */}
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
                  {/* 17 shortlist — funnel */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-center justify-center">
                      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
                        <rect x="8" y="10" width="48" height="10" rx="3" fill="rgba(75,77,247,0.2)" stroke="#4b4df7" strokeWidth="1.8" />
                        <rect x="16" y="26" width="32" height="10" rx="3" fill="rgba(75,77,247,0.35)" stroke="#4b4df7" strokeWidth="1.8" />
                        <rect x="24" y="42" width="16" height="10" rx="3" fill="#4b4df7" />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[1].value}</span>
                    <span className="text-[13px] text-white/[0.65] leading-[1.4]">{c.results.metrics[1].label}</span>
                  </div>
                  {/* 8 transfers — globe + arrow */}
                  <div className="text-center flex flex-col items-center">
                    <div className="w-24 h-24 mb-5 flex items-center justify-center">
                      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
                        <circle cx="28" cy="32" r="18" stroke="#4b4df7" strokeWidth="2" fill="rgba(75,77,247,0.1)" />
                        <ellipse cx="28" cy="32" rx="8" ry="18" stroke="#4b4df7" strokeWidth="1.5" />
                        <line x1="10" y1="32" x2="46" y2="32" stroke="#4b4df7" strokeWidth="1.5" />
                        <path d="M46 26l8 6-8 6" stroke="#4b4df7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                    <span className="block text-white font-black mb-1" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>{c.results.metrics[2].value}</span>
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
                    <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4]">{q.title}</h4>
                    <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65]">{q.text}</p>
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
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] leading-[1.4] mb-4">{c.vision.title}</h2>
                <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8]">{c.vision.intro}</p>
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
