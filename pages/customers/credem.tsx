// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle } from 'lucide-react';
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
    badge: 'CASE STUDY',
    headline: {
      before: 'Come Credem ha ',
      highlight1: 'dimezzato il time-to-hire',
      middle: ' raddoppiando la ',
      highlight2: 'qualità',
      after: ' dei candidati in colloquio',
    },
    subtitle: "30.000 candidature l'anno, 600+ filiali in 19 regioni e profili junior indistinguibili da CV. Con Skillvue, Credem ha trasformato lo screening da collo di bottiglia a vantaggio competitivo, riducendo del 50% i tempi di selezione e aumentando del 50% il tasso di fit-to-hire al colloquio.",
    heroMetrics: [
      { value: '-50%', label: 'time-to-hire' },
      { value: '+50%', label: 'fit-to-hire al colloquio' },
      { value: '-15%', label: 'candidati in colloquio (più qualificati)' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di più',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Dipendenti', value: '5.000+' },
        { label: 'Filiali', value: '600+' },
        { label: 'Regioni', value: '19' },
        { label: 'Candidature/anno', value: '30.000' },
        { label: 'Gruppo', value: 'Credito Emiliano' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Credem (Credito Emiliano) è uno dei gruppi bancari più consolidati d'Italia, con oltre <strong className="text-[#1A1A2E]/80 font-semibold">5.000 dipendenti</strong>, <strong className="text-[#1A1A2E]/80 font-semibold">600+ filiali</strong> distribuite in <strong className="text-[#1A1A2E]/80 font-semibold">19 regioni</strong> e una presenza capillare sul territorio nazionale. Ogni anno, il gruppo riceve circa <strong className="text-[#1A1A2E]/80 font-semibold">30.000 candidature</strong>, in larga parte da giovani professionisti che si affacciano per la prima volta sul mercato del lavoro. La sfida per Credem non era il volume in sé, ma trovare i profili ad alto potenziale nascosti al suo interno. Il primo filtro di screening non era sufficientemente selettivo: candidati con competenze eccellenti si perdevano nella massa, mentre profili meno adatti avanzavano alle fasi di colloquio, rallentando l'intero processo e allungando i tempi di selezione. In un settore bancario sempre più competitivo sul fronte del talento, i migliori candidati spesso accettavano altre offerte prima che il processo Credem si concludesse, con <strong className="text-[#1A1A2E]/80 font-semibold">tempi di gestione delle candidature che potevano raggiungere diverse settimane</strong>. Il modello precedente, basato su una prima scrematura dei CV con limitata profondità di valutazione, non permetteva di distinguere il potenziale reale dei candidati junior.
      </>,
      summary: "Il progetto ha trasformato lo screening da un filtro generico basato sul CV a un sistema di valutazione AI-driven delle competenze, inserito subito dopo la raccolta dei CV. Per la prima volta, ogni candidato viene valutato in profondità prima del colloquio, con lo stesso effort operativo ma una qualità delle shortlist radicalmente superiore.",
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: "Con 30.000 candidature l'anno distribuite su 600+ filiali in 19 regioni, Credem doveva risolvere un problema strutturale: il primo filtro di selezione non era abbastanza selettivo per intercettare l'alto potenziale. I candidati migliori, spesso giovani con CV poco differenziati, si perdevano nel volume, mentre i colloqui erano affollati da profili non realmente in linea con il ruolo. I tempi lunghi del processo facevano perdere i talenti migliori, che accettavano altre offerte prima della conclusione della selezione.",
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: 'I migliori candidati nascosti dal processo',
          text: "Con tempi di selezione troppo lunghi, i profili ad alto potenziale — i più richiesti dal mercato — rischiavano di abbandonare il processo prima di arrivare a conclusione. In un settore bancario sempre più competitivo nella guerra per il talento, la velocità di risposta era diventata un fattore critico: ogni settimana di ritardo significava perdere candidati che altri istituti intercettavano prima.",
        },
        {
          icon: Users,
          title: 'Colloqui affollati da candidati non in linea',
          text: "La fase di colloquio era sistematicamente sovraffollata da candidati che non possedevano le competenze reali per il ruolo. Senza un filtro strutturato sulle competenze prima dell'intervista, i recruiter e gli hiring manager investivano tempo prezioso in colloqui a basso rendimento, con un impatto diretto sulla produttività del team HR e sulla percezione del processo da parte dei responsabili di linea.",
        },
        {
          icon: Heart,
          title: "Employer brand non sufficientemente valorizzato dall'hiring process",
          text: "Un processo di selezione macchinoso impattava negativamente sulla percezione del brand Credem come datore di lavoro. I candidati, soprattutto i più giovani e digitalmente nativi, si aspettano ormai molto spesso un'esperienza di selezione moderna, rapida e inclusiva.",
        },
      ],
      hrChallenges: [
        {
          icon: Target,
          title: 'Primo filtro non sufficientemente selettivo',
          text: "Su 30.000 candidature annue, il primo step di screening non riusciva a separare efficacemente i profili ad alto potenziale dalla massa. La valutazione iniziale, basata principalmente sul CV, non aveva la profondità necessaria per intercettare le competenze trasversali che determinano il successo nel ruolo, lasciando passare troppi candidati non idonei e, paradossalmente, filtrando profili di valore.",
        },
        {
          icon: Layers,
          title: 'CV poco differenziati per i profili junior',
          text: "La maggior parte delle candidature proveniva da giovani professionisti al primo ingresso nel mercato del lavoro, con CV sostanzialmente identici: poca esperienza, percorsi formativi simili, nessun elemento oggettivo per distinguere il potenziale reale. Le competenze che fanno la differenza — problem solving, orientamento al cliente, capacità relazionali — erano completamente invisibili sulla carta.",
        },
        {
          icon: BarChart3,
          title: 'Scalabilità del processo su 600+ filiali',
          text: "Garantire una qualità di valutazione omogenea su una rete di oltre 600 filiali distribuite in 19 regioni era una sfida operativa significativa. Senza uno standard centralizzato e strutturato, il livello di selezione variava in base alla sede, al singolo recruiter e al volume locale di candidature, creando disomogeneità nella qualità delle assunzioni.",
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Target, text: "Rendere il primo filtro di selezione più selettivo e accurato: intercettare i profili ad alto potenziale nascosti nelle 30.000 candidature annue, riducendo i falsi positivi che affollano i colloqui" },
        { icon: Zap, text: "Dimezzare il time-to-hire: accelerare il processo per rispondere ai candidati migliori prima della concorrenza, riducendo il dropout dei profili di valore" },
        { icon: CheckCircle, text: "Raddoppiare la qualità delle shortlist: portare al colloquio solo candidati con competenze verificate, aumentando il fit-to-hire e ottimizzando il tempo degli hiring manager" },
        { icon: Heart, text: "Migliorare l'employer brand: trasformare il processo di selezione da lungo e opaco a rapido, inclusivo e moderno, migliorando la percezione di Credem come datore di lavoro" },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: "Skillvue è stato integrato nel processo di selezione di Credem con un approccio graduale: prima la validazione dell'impatto con dati reali, poi l'estensione progressiva. La piattaforma è stata inserita subito dopo la raccolta dei CV, aggiungendo una valutazione approfondita delle competenze senza modificare la banda operativa del team HR. Il team People Science di Skillvue ha selezionato i test dalla Skillvue Library per ogni profilo target, calibrandoli sulle esigenze specifiche di Credem.",
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: Target, label: 'Competenze trasversali dalla Skillvue Library' },
        { icon: Layers, label: 'Competenze specifiche per profilo' },
        { icon: Heart, label: 'Orientamento al cliente' },
        { icon: BarChart3, label: 'Problem solving e capacità relazionali' },
      ],
      methodologyLabel: 'METODOLOGIA',
      methodology: [
        {
          title: 'Rollout graduale e data-driven',
          text: "Anziché un deployment a tappeto, Credem ha scelto un approccio incrementale: validare l'impatto con dati reali su un perimetro iniziale prima di estendere il modello. Questo ha permesso di misurare i risultati, calibrare i parametri e costruire fiducia interna nel sistema prima della scalata.",
        },
        {
          title: 'Inserimento post-CV, stessa banda operativa',
          text: "Skillvue è stato posizionato subito dopo la raccolta dei CV, come primo step di valutazione approfondita. I candidati completano l'assessment in autonomia. Il team HR mantiene lo stesso carico operativo ma riceve shortlist radicalmente più qualificate, con profili di competenza chiari per ogni candidato.",
        },
        {
          title: 'Libreria di competenze per ruolo',
          text: "Per ogni profilo target, i test sono stati selezionati dalla Skillvue Library e calibrati sulle competenze specifiche richieste dal ruolo. L'AI genera profili di competenza completi per ogni candidato, permettendo ai recruiter di prendere decisioni informate con dati oggettivi.",
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: "I risultati misurabili ottenuti da Credem attraverso l'integrazione di Skillvue nel processo di selezione.",
      metrics: [
        { value: '-50%', label: 'Time-to-hire', sublabel: 'Tempi di selezione dimezzati' },
        { value: '+50%', label: 'Fit-to-hire al colloquio', sublabel: 'Candidati in colloquio realmente idonei al ruolo' },
        { value: '-15%', label: 'Candidati in colloquio', sublabel: 'Meno candidati, ma drammaticamente più qualificati' },
        { value: '30.000', label: 'Candidature annue gestite', sublabel: 'Con la stessa banda operativa del team HR' },
      ],
      qualitative: [
        { icon: CheckCircle, title: 'Qualità dei colloqui radicalmente migliorata', text: "La fase di colloquio è passata dall'essere affollata da candidati non in linea a una shortlist dove il 50% in più dei candidati è realmente idoneo al ruolo. Gli hiring manager ricevono profili pre-valutati con dati strutturati sulle competenze, rendendo ogni colloquio più mirato e produttivo." },
        { icon: Eye, title: "Più candidati hanno l'opportunità di dimostrare il proprio valore", text: "L'assessment AI ha dato a un numero maggiore di candidati la possibilità di far emergere le proprie competenze reali, andando oltre i limiti del CV. Profili ad alto potenziale che prima si perdevano nel volume sono ora intercettati e portati alle fasi successive della selezione." },
        { icon: Heart, title: 'Employer brand migliorato e misurabile', text: "Il processo di selezione è diventato più rapido, inclusivo e trasparente. La percezione di Credem come datore di lavoro è migliorata in modo misurabile: un processo moderno e innovativo che risponde alle aspettative dei candidati, soprattutto delle generazioni più giovani." },
        { icon: Zap, title: 'Valutazione più profonda a parità di risorse', text: "Senza aumentare il carico operativo del team HR, Credem ha aggiunto un livello di valutazione approfondita che prima non esisteva. Ogni candidato viene ora valutato sulle competenze reali prima del colloquio, come se il team avesse condotto un primo screening individuale su ciascuno dei 30.000 candidati." },
        { icon: TrendingUp, title: 'Risultati qualitativi e quantitativi in crescita esponenziale', text: "L'integrazione di Skillvue nel processo di selezione ha prodotto un miglioramento simultaneo su più dimensioni: velocità (time-to-hire dimezzato), qualità (fit-to-hire raddoppiato) e efficienza (meno colloqui, più assunzioni riuscite). Un circolo virtuoso che si consolida con ogni ciclo di selezione." },
      ],
    },
    vision: {
      badge: 'EVOLUZIONE',
      title: 'Dalla selezione a una talent strategy skills-based su scala nazionale',
      intro: "Con i risultati dimostrati sullo screening e la qualità delle shortlist, il passo naturale è estendere il modello Skillvue ad altre fasi del ciclo del talento, consolidando un approccio integrato che copra dalla selezione allo sviluppo interno su tutte le 600+ filiali.",
      objective: "Costruire un sistema integrato in cui ogni candidato e ogni dipendente viene valutato con la stessa logica basata sulle competenze, dalla prima candidatura ai percorsi di crescita interna, su tutte le 19 regioni.",
      bullets: [
        "Estensione del modello di assessment a tutti i profili e tutte le filiali del gruppo",
        "Consolidamento dell'approccio skills-based come standard unico per le decisioni di selezione",
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail GDO · Hiring at Scale', headline: "Come Carrefour Italia ha trasformato la selezione di 30.000 candidature l'anno con soli 3 recruiter." },
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Insurance · Hiring', headline: 'Come Europ Assistance ha assunto il 24% in più con il 18% di colloqui in meno.' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CASE STUDY',
    headline: {
      before: 'How Credem ',
      highlight1: 'halved time-to-hire',
      middle: ' while doubling ',
      highlight2: 'interview quality',
      after: '',
    },
    subtitle: "30,000 applications per year, 600+ branches across 19 regions and indistinguishable junior profiles from CVs. With Skillvue, Credem transformed screening from a bottleneck into a competitive advantage — reducing selection times by 50% and increasing the fit-to-hire rate in interviews by 50%.",
    heroMetrics: [
      { value: '-50%', label: 'time-to-hire' },
      { value: '+50%', label: 'fit-to-hire in interviews' },
      { value: '-15%', label: 'candidates in interviews (more qualified)' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Employees', value: '5,000+' },
        { label: 'Branches', value: '600+' },
        { label: 'Regions', value: '19' },
        { label: 'Applications/year', value: '30,000' },
        { label: 'Group', value: 'Credito Emiliano' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Credem (Credito Emiliano) is one of Italy's most established banking groups, with over <strong className="text-[#1A1A2E]/80 font-semibold">5,000 employees</strong>, <strong className="text-[#1A1A2E]/80 font-semibold">600+ branches</strong> across <strong className="text-[#1A1A2E]/80 font-semibold">19 regions</strong> and a capillary national presence. Every year the group receives approximately <strong className="text-[#1A1A2E]/80 font-semibold">30,000 applications</strong>, the majority from young professionals entering the labour market for the first time. Credem's challenge was not the volume itself, but finding the high-potential profiles hidden within it. The first screening filter was not selective enough: candidates with excellent competencies were lost in the crowd, while less suited profiles advanced to the interview stage — slowing the entire process and extending selection timelines. In an increasingly competitive banking sector on the talent front, the best candidates often accepted other offers before Credem's process concluded, with <strong className="text-[#1A1A2E]/80 font-semibold">application management times that could span several weeks</strong>. The previous model, based on an initial CV shortlisting with limited evaluation depth, did not allow the real potential of junior candidates to be distinguished.
      </>,
      summary: "The project transformed screening from a generic CV-based filter to an AI-driven competency assessment system, inserted immediately after CV collection. For the first time, every candidate is assessed in depth before an interview — with the same operational effort but a radically higher-quality shortlist.",
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: "With 30,000 applications per year spread across 600+ branches in 19 regions, Credem had to solve a structural problem: the first selection filter was not selective enough to identify high-potential candidates. The best candidates — often young people with undifferentiated CVs — were lost in the volume, while interviews were filled with profiles not genuinely aligned with the role. Long process timelines caused the best talent to be lost, as they accepted other offers before the selection concluded.",
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: 'The best candidates hidden by the process',
          text: "With selection timelines too long, high-potential profiles — the most sought after in the market — risked abandoning the process before it concluded. In an increasingly competitive banking sector in the war for talent, speed of response had become a critical factor: every week of delay meant losing candidates that other institutions were capturing first.",
        },
        {
          icon: Users,
          title: 'Interviews crowded with misaligned candidates',
          text: "The interview stage was systematically overcrowded with candidates who did not possess the real competencies for the role. Without a structured competency filter before the interview, recruiters and hiring managers invested valuable time in low-yield interviews — with a direct impact on HR team productivity and on the perception of the process by line managers.",
        },
        {
          icon: Heart,
          title: 'Employer brand undersold by the hiring process',
          text: "A cumbersome selection process negatively impacted the perception of Credem as an employer of choice. Candidates — especially the youngest and most digitally native — increasingly expect a modern, fast and inclusive selection experience.",
        },
      ],
      hrChallenges: [
        {
          icon: Target,
          title: 'First filter not selective enough',
          text: "Across 30,000 annual applications, the first screening step could not effectively separate high-potential profiles from the crowd. The initial assessment, based primarily on the CV, lacked the depth needed to surface the cross-functional competencies that determine success in the role — letting through too many unsuitable candidates while, paradoxically, filtering out candidates of genuine value.",
        },
        {
          icon: Layers,
          title: 'Undifferentiated CVs for junior profiles',
          text: "The majority of applications came from young professionals entering the labour market for the first time, with essentially identical CVs: little experience, similar educational backgrounds, no objective element to distinguish real potential. The competencies that make the difference — problem solving, customer orientation, relationship skills — were completely invisible on paper.",
        },
        {
          icon: BarChart3,
          title: 'Process scalability across 600+ branches',
          text: "Ensuring consistent evaluation quality across a network of over 600 branches in 19 regions was a significant operational challenge. Without a centralised, structured standard, the level of selection varied by location, individual recruiter and local application volume — creating inconsistency in the quality of hires.",
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Target, text: "Make the first selection filter more selective and accurate: identify high-potential profiles hidden within the 30,000 annual applications, reducing the false positives that crowd interviews" },
        { icon: Zap, text: "Halve time-to-hire: accelerate the process to respond to the best candidates before the competition, reducing dropout among high-value profiles" },
        { icon: CheckCircle, text: "Double shortlist quality: bring to interview only candidates with verified competencies, increasing fit-to-hire and optimising hiring managers' time" },
        { icon: Heart, text: "Improve employer brand: transform the selection process from slow and opaque to fast, inclusive and modern — improving the perception of Credem as an employer" },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: "Skillvue was integrated into Credem's selection process with a gradual approach: first validate the impact with real data, then progressively expand. The platform was inserted immediately after CV collection — adding an in-depth competency assessment without changing the operational bandwidth of the HR team. Skillvue's People Science team selected tests from the Skillvue Library for each target profile, calibrating them to Credem's specific requirements.",
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: Target, label: 'Cross-functional skills from the Skillvue Library' },
        { icon: Layers, label: 'Profile-specific competencies' },
        { icon: Heart, label: 'Customer orientation' },
        { icon: BarChart3, label: 'Problem solving & relationship skills' },
      ],
      methodologyLabel: 'METHODOLOGY',
      methodology: [
        {
          title: 'Gradual, data-driven rollout',
          text: "Rather than a blanket deployment, Credem chose an incremental approach: validate the impact with real data on an initial perimeter before expanding the model. This made it possible to measure results, calibrate parameters and build internal trust in the system before scaling.",
        },
        {
          title: 'Post-CV insertion, same operational bandwidth',
          text: "Skillvue was positioned immediately after CV collection as the first in-depth assessment step. Candidates complete the assessment independently. The HR team maintains the same operational load but receives radically more qualified shortlists, with clear competency profiles for every candidate.",
        },
        {
          title: 'Competency library by role',
          text: "For each target profile, tests were selected from the Skillvue Library and calibrated to the specific competencies required for the role. The AI generates complete competency profiles for each candidate, enabling recruiters to make informed decisions with objective data.",
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: "The measurable outcomes Credem achieved by integrating Skillvue into its selection process.",
      metrics: [
        { value: '-50%', label: 'Time-to-hire', sublabel: 'Selection timelines halved' },
        { value: '+50%', label: 'Fit-to-hire in interviews', sublabel: 'Candidates in interviews genuinely suited to the role' },
        { value: '-15%', label: 'Candidates in interviews', sublabel: 'Fewer candidates, but dramatically more qualified' },
        { value: '30,000', label: 'Annual applications managed', sublabel: 'With the same HR team operational bandwidth' },
      ],
      qualitative: [
        { icon: CheckCircle, title: 'Radically improved interview quality', text: "The interview stage went from being crowded with misaligned candidates to a shortlist where 50% more candidates are genuinely suited to the role. Hiring managers receive pre-assessed profiles with structured competency data, making every interview more targeted and productive." },
        { icon: Eye, title: 'More candidates get the chance to demonstrate their value', text: "The AI assessment gave a greater number of candidates the opportunity to surface their real competencies — going beyond the limitations of the CV. High-potential profiles that were previously lost in the volume are now identified and brought forward to the next stages of selection." },
        { icon: Heart, title: 'Employer brand improved and measurable', text: "The selection process became faster, more inclusive and more transparent. The perception of Credem as an employer improved in a measurable way: a modern, innovative process that meets candidate expectations, especially those of the youngest generations." },
        { icon: Zap, title: 'Deeper assessment with the same resources', text: "Without increasing the HR team's operational load, Credem added a level of in-depth assessment that did not previously exist. Every candidate is now assessed on real competencies before the interview — as if the team had conducted an individual first screening for each of the 30,000 applicants." },
        { icon: TrendingUp, title: 'Exponential growth in qualitative and quantitative results', text: "Integrating Skillvue into the selection process produced simultaneous improvement across multiple dimensions: speed (time-to-hire halved), quality (fit-to-hire doubled) and efficiency (fewer interviews, more successful hires). A virtuous cycle that strengthens with every selection round." },
      ],
    },
    vision: {
      badge: 'EVOLUTION',
      title: 'From hiring to a skills-based talent strategy at national scale',
      intro: "With the results demonstrated on screening and shortlist quality, the natural next step is to extend the Skillvue model to other phases of the talent cycle — consolidating an integrated approach covering selection through to internal development across all 600+ branches.",
      objective: "Build an integrated system in which every candidate and every employee is assessed with the same competency-based logic — from the first application through to internal career development, across all 19 regions.",
      bullets: [
        "Extension of the assessment model to all profiles and all branches of the group",
        "Consolidation of the skills-based approach as the single standard for selection decisions",
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'GDO Retail · Hiring at Scale', headline: 'How Carrefour Italia transformed the screening of 30,000 applications a year with just 3 recruiters.' },
        { id: 'europ-assistance', company: 'Europ Assistance', tag: 'Insurance · Hiring', headline: 'How Europ Assistance hired 24% more with 18% fewer interviews.' },
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
              <span className="text-[13px] text-white/[0.65]">Credem</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.12em] uppercase mb-8 block w-fit" style={{ background: 'rgba(75,77,247,0.15)', color: '#7b7df9', border: '1px solid rgba(75,77,247,0.2)' }}>
                    {c.badge}
                  </span>
                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.03em] text-white/95 mb-8" style={{ lineHeight: 1.12 }}>
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
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white flex items-center justify-center p-1.5">
                      <img src="/logos/credem-logo.png" alt="Credem logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Credem</p>
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
                  <div className="mt-6 pt-6 border-t border-white/[0.08] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/[0.12] bg-white/[0.08] flex items-center justify-center">
                      <Users className="h-5 w-5 text-white/30" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">HR Team</p>
                      <p className="text-[12px] text-white/40 leading-[1.5]">Credem · Credito Emiliano</p>
                    </div>
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-6 max-w-3xl">{c.context.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.85] mb-8 max-w-3xl">{c.context.paragraph}</p>
              <p className="text-[15px] text-[#1A1A2E]/40 italic leading-[1.75] max-w-2xl border-l-2 border-[#4b4df7]/20 pl-5">
                {c.context.summary}
              </p>
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.challenge.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{c.challenge.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-14 max-w-3xl">{c.challenge.intro}</p>

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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-10">{c.objectives.title}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {c.objectives.items.map((o, i) => (
                  <div key={i} className="flex items-start gap-5 rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <o.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <p className="text-[15px] text-[#1A1A2E]/70 leading-[1.65] pt-1.5">{o.text}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* SOLUTION */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.solution.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{c.solution.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12 max-w-3xl">{c.solution.intro}</p>

              <div className="mb-12">
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

              <div>
                <span className="text-[12px] font-bold text-[#1A1A2E]/30 tracking-[0.1em] uppercase mb-5 block">{c.solution.methodologyLabel}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {c.solution.methodology.map((m, i) => (
                    <div key={m.title} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm relative overflow-hidden">
                      <span className="absolute top-5 right-6 text-[3rem] font-black leading-none select-none" style={{ color: 'rgba(75,77,247,0.04)' }}>0{i + 1}</span>
                      <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-3 leading-[1.4] relative">{m.title}</h4>
                      <p className="text-[14px] text-[#1A1A2E]/55 leading-[1.65] relative">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{c.results.badge}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{c.results.title}</h2>
              <p className="text-[16px] text-[#1A1A2E]/[0.65] leading-[1.8] mb-12 max-w-3xl">{c.results.subtitle}</p>

              <div className="rounded-2xl bg-[#111128] p-10 lg:p-14 mb-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {c.results.metrics.map(m => (
                    <div key={m.label} className="text-center">
                      <span className="block text-white" style={{ fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{m.value}</span>
                      <span className="text-[13px] text-white/[0.65] mt-3 block leading-[1.4]">{m.label}</span>
                      {m.sublabel && <span className="text-[11px] text-white/30 mt-1 block leading-[1.4]">{m.sublabel}</span>}
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
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4 leading-[1.3]">{c.vision.title}</h2>
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
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-white/90 mb-12">{c.related.title}</h3>
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
