// @ts-nocheck
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle } from 'lucide-react';
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
      before: 'Come Subdued ha ',
      highlight1: 'dimezzato il turnover',
      middle: ' e ridotto il time-to-hire del 40% su ',
      highlight2: '130+ store',
      after: ' in 6 paesi',
    },
    subtitle: 'Un brand cult della moda teen con 1.000+ dipendenti, candidati Gen Z con CV indistinguibili e un team HR di 7 persone che dedicava 10-15 ore a settimana a screening telefonici. Con Skillvue, Subdued ha trasformato il pre-screening in un vantaggio competitivo e il processo di selezione innovativo \u00e8 diventato esso stesso uno strumento di employer branding.',
    heroMetrics: [
      { value: '-50%', label: 'turnover' },
      { value: '65% \u2192 85%', label: 'retention nuovi assunti' },
      { value: '-40%', label: 'time-to-hire' },
    ],
    ctaPrimary: 'Contattaci',
    ctaSecondary: 'Scopri di pi\u00f9',
    clientCard: {
      label: 'SCHEDA CLIENTE',
      facts: [
        { label: 'Settore', value: 'Fashion Retail' },
        { label: 'Dipendenti', value: '1.000+' },
        { label: 'Punti vendita', value: '130+ monomarca' },
        { label: 'Paesi', value: 'Italia, UK, Francia, Paesi Bassi, Belgio, Svezia, Irlanda' },
        { label: 'Team HR', value: '7 persone su 6 paesi' },
      ],
    },
    context: {
      badge: 'CONTESTO',
      title: 'Il contesto del progetto',
      paragraph: <>
        Subdued \u00e8 uno dei brand italiani pi\u00f9 iconici nel segmento <strong className="text-[#1A1A2E]/80 font-semibold">teen fashion</strong>, con oltre <strong className="text-[#1A1A2E]/80 font-semibold">130 punti vendita monomarca</strong> in Italia, Europa e Asia, <strong className="text-[#1A1A2E]/80 font-semibold">1.000+ dipendenti</strong> e un fatturato 2024 di <strong className="text-[#1A1A2E]/80 font-semibold">\u20ac163,9M</strong>. Fondato a Roma negli anni \u201990, il brand si rivolge a ragazze tra i <strong className="text-[#1A1A2E]/80 font-semibold">12 e i 20 anni</strong> con un modello 100% direct-to-consumer e una supply chain capace di portare un prodotto dal design al negozio in <strong className="text-[#1A1A2E]/80 font-semibold">7 giorni</strong>. L\u2019espansione internazionale accelerata \u2014 <strong className="text-[#1A1A2E]/80 font-semibold">14 nuove aperture nel 2024</strong>, con ingresso negli USA e in Cina \u2014 ha creato una sfida HR strutturale: mantenere una qualit\u00e0 di selezione costante su pi\u00f9 paesi e lingue con un team snello. Il team HR (<strong className="text-[#1A1A2E]/80 font-semibold">7 persone su 6 paesi</strong>) era completamente assorbito dall\u2019operativit\u00e0: tutta la valutazione avveniva tramite <strong className="text-[#1A1A2E]/80 font-semibold">colloqui diretti</strong>, senza alcuna fase di pre-screening strutturato. I recruiter dedicavano <strong className="text-[#1A1A2E]/80 font-semibold">10-15 ore a settimana</strong> a telefonate introduttive, senza tempo per attivit\u00e0 strategiche.
      </>,
      summary: 'Il progetto ha trasformato il pre-screening da attivit\u00e0 interamente manuale a processo strutturato e AI-driven, inserendo per la prima volta una valutazione oggettiva delle competenze prima del colloquio. Il risultato: turnover dimezzato, retention salita fino a circa il 70% e un processo di selezione che \u00e8 diventato esso stesso un elemento di attrattivit\u00e0 per i candidati Gen Z.',
    },
    challenge: {
      badge: 'LA SFIDA',
      title: 'Il problema strutturale',
      intro: 'Subdued \u00e8 un brand in espansione rapida, con 14 nuove aperture nel solo 2024 e nuovi mercati da USA a Cina. Ma un team HR di 7 persone su 6 paesi non poteva sostenere il ritmo: turnover mensile elevato, volumi massicci di candidati junior con CV indifferenziati, e met\u00e0 dei candidati che superavano il primo screening si rivelavano privi delle soft skill necessarie per il lavoro quotidiano in negozio.',
      businessLabel: 'IMPATTO SUL BUSINESS',
      hrLabel: 'IMPATTO SU HR & PEOPLE',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: 'Espansione internazionale, team HR invariato',
          text: '14 nuove aperture nel 2024, ingresso in USA e Cina, e un team di sole 7 persone su 6 paesi a gestire tutto il recruiting. Ogni nuova apertura in un nuovo mercato significava nuovi volumi di candidature, nuove lingue, nuovi contesti culturali, senza alcun incremento di risorse HR. Il modello basato su colloqui individuali per ogni candidato era fisicamente insostenibile.',
        },
        {
          icon: Target,
          title: 'Errori di assunzione ricorrenti',
          text: 'Candidati con buoni CV ma privi delle soft skill pratiche per il lavoro quotidiano in negozio venivano assunti troppo spesso. In un settore ad alto turnover con margini stretti, ogni assunzione sbagliata aveva un costo diretto su performance del punto vendita, onboarding e morale del team.',
        },
        {
          icon: Users,
          title: 'Il brand experience parte dalle persone',
          text: 'Per un brand costruito sull\u2019esperienza in-store e sulla community, le persone in negozio SONO il brand. Assumere le persone giuste \u2014 con le reali competenze di comunicazione e vendita \u2014 non \u00e8 una metrica HR: \u00e8 una questione di sopravvivenza del brand in un mercato competitivo.',
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: '10-15 ore a settimana in telefonate introduttive',
          text: 'Senza alcuna fase di pre-screening strutturato, ogni candidato richiedeva lo stesso investimento di tempo da parte del recruiter, indipendentemente dal reale potenziale. Il team HR era completamente assorbito dall\u2019operativit\u00e0, con zero tempo per employer branding, formazione o strategia \u2014 attivit\u00e0 sacrificate interamente.',
        },
        {
          icon: Eye,
          title: 'Il CV non differenzia i candidati Gen Z',
          text: 'Candidati junior al primo o secondo impiego hanno CV sostanzialmente identici: nessuna esperienza significativa, qualifiche simili. Le competenze che determinano il successo in negozio \u2014 comunicazione, vendita, teamworking \u2014 sono completamente invisibili sulla carta. Serviva uno strumento per renderle visibili prima del colloquio.',
        },
        {
          icon: Scale,
          title: 'Nessuno standard di valutazione cross-country',
          text: 'Con l\u2019espansione in UK, Francia, Paesi Bassi, Belgio e oltre, ogni paese valutava i candidati con criteri propri. Mancava un framework comune che garantisse coerenza nella qualit\u00e0 delle assunzioni indipendentemente dal mercato, dalla lingua o dal singolo recruiter.',
        },
      ],
    },
    objectives: {
      badge: 'OBIETTIVI DI COLLABORAZIONE',
      title: 'Cosa doveva cambiare',
      items: [
        { icon: Zap, text: 'Inserire una fase di pre-screening strutturato: valutare comunicazione, vendita e teamworking prima del colloquio, con dati oggettivi su ogni candidato, liberando il team HR dall\u2019operativit\u00e0' },
        { icon: Target, text: 'Ridurre gli errori di assunzione: portare al colloquio solo candidati con competenze verificate, aumentando il tasso di successo e riducendo il turnover che pesava su performance e costi' },
        { icon: Layers, text: 'Scalare su pi\u00f9 paesi con un unico standard: un processo di valutazione coerente su Italia, UK, Francia, Paesi Bassi, Belgio e mercati futuri, adattabile per lingua e ruolo senza moltiplicare le risorse' },
        { icon: Heart, text: 'Preservare la relazione umana: la tecnologia deve potenziare il recruiter, non sostituirlo \u2014 Subdued voleva mantenere il rapporto diretto con i candidati che \u00e8 parte del DNA del brand' },
      ],
    },
    solution: {
      badge: 'LA SOLUZIONE',
      title: 'Assessment AI con Skillvue',
      intro: 'Skillvue \u00e8 stato integrato come fase di pre-screening nel processo di selezione di Subdued, tra la candidatura e il primo colloquio HR. Il team HR di Valentina Cianciaruso ha lavorato direttamente con Skillvue per selezionare i test e le domande pi\u00f9 efficaci dalla Skill Library per le esigenze specifiche del retail Subdued. L\u2019onboarding \u00e8 stato completato in sole 2 settimane dal kick-off al go-live, una delle implementazioni pi\u00f9 rapide nel portfolio Skillvue.',
      skillsLabel: 'COMPETENZE VALUTATE',
      skills: [
        { icon: CheckCircle, label: 'Comunicazione' },
        { icon: TrendingUp, label: 'Vendita' },
        { icon: Users, label: 'Teamworking' },
      ],
      methodologyLabel: 'METODOLOGIA',
      methodology: [
        {
          title: 'Assessment su misura per paese e ruolo',
          text: 'Assessment configurati per profili e mercati diversi: in Italia, video-presentazione + 2 soft skill (3 domande ciascuna, max 15 minuti); in UK, killer question + video-presentazione + 1 soft skill (max 10 minuti). Per gli Store Manager, test su comunicazione, vendita e teamworking. Ogni configurazione \u00e8 adattata al contesto locale mantenendo lo stesso standard di valutazione.',
        },
        {
          title: 'Delivery via WhatsApp \u2014 mobile-first per Gen Z',
          text: 'Il link all\u2019assessment viene inviato ai candidati via WhatsApp, non via email: una scelta pragmatica e mobile-first perfettamente allineata alle abitudini della Gen Z. Questo switch, introdotto nelle prime settimane, ha migliorato significativamente il tasso di conversione. I candidati completano l\u2019assessment da qualsiasi device entro una deadline predefinita.',
        },
        {
          title: 'Rollout progressivo su 6 paesi',
          text: 'Il progetto \u00e8 partito dall\u2019Italia ed \u00e8 stato progressivamente esteso a UK, Francia, Paesi Bassi/Belgio, con espansione confermata verso Svezia e Irlanda. 7 utenti Skillvue attivi su 6 paesi, un modello che dimostra la scalabilit\u00e0 della piattaforma per il retail internazionale con risorse HR contenute.',
        },
      ],
    },
    results: {
      badge: 'RISULTATI',
      title: 'Key Metrics & Impatto',
      subtitle: 'I risultati misurabili ottenuti da Subdued attraverso l\u2019adozione di Skillvue nei processi di selezione su 6 paesi.',
      metrics: [
        { value: '-50%', label: 'Turnover', sublabel: 'Dimezzato rispetto al periodo pre-Skillvue' },
        { value: '65% \u2192 85%', label: 'Retention nuovi assunti', sublabel: '+20 punti percentuali' },
        { value: '-40%', label: 'Time-to-hire', sublabel: 'Riduzione del 30-50% su tutti i mercati' },
        { value: '50% \u2192 80%', label: 'Tasso di successo al 2\u00b0 step', sublabel: '+20-30pp \u2014 candidati pi\u00f9 qualificati ai colloqui' },
        { value: '-65/70%', label: 'Ore di pre-screening', sublabel: 'Da 10-15 ore/sett. a 3-5 ore/sett.' },
        { value: '6 paesi', label: 'Copertura internazionale', sublabel: '7 utenti Skillvue attivi' },
      ],
      qualitative: [
        { icon: Zap, title: 'Recruiter liberati dall\u2019operativit\u00e0', text: 'Il pre-screening produce ora un report strutturato per ogni candidato \u2014 dati oggettivi su comunicazione, vendita e teamworking prima di qualsiasi interazione umana. Le ore di telefonate introduttive sono passate da 10-15 a 3-5 a settimana, restituendo al team tempo per attivit\u00e0 strategiche prima completamente sacrificate.' },
        { icon: Target, title: 'Colloqui pi\u00f9 mirati e personalizzati', text: 'Il primo colloquio \u00e8 ora basato sul report Skillvue: il recruiter arriva preparato con dati sulle competenze del candidato, rendendo l\u2019interazione pi\u00f9 profonda e mirata. Solo i profili pre-validati raggiungono il colloquio: niente pi\u00f9 back-to-back di screening a calendario.' },
        { icon: Shield, title: 'Errori di assunzione drasticamente ridotti', text: 'La combinazione di turnover dimezzato (-50%) e retention dal 65% all\u201985% dimostra che i candidati assunti con Skillvue sono significativamente pi\u00f9 adatti al ruolo. Meno assunzioni sbagliate significa meno costi di onboarding ripetuto, meno impatto sulla performance di negozio e meno pressione sul team HR.' },
        { icon: Scale, title: 'Standard di valutazione coerente su 6 paesi', text: 'Per la prima volta, tutti i paesi valutano i candidati con gli stessi criteri e lo stesso framework di competenze, adattato per lingua e contesto locale. Le decisioni di assunzione poggiano su dati oggettivi, non sulle logiche del singolo mercato o recruiter.' },
        { icon: Heart, title: 'Employer branding inatteso', text: 'Un risultato inizialmente non previsto: l\u2019innovazione del processo di selezione \u00e8 diventata un elemento differenziante nell\u2019attrarre candidati. Per un brand il cui pubblico \u2014 sia come clienti che come potenziali dipendenti \u2014 \u00e8 la Gen Z, l\u2019allineamento tra innovazione tecnologica e aspettative generazionali rappresenta un vantaggio competitivo concreto nel mercato del lavoro retail.' },
      ],
    },
    vision: {
      badge: 'EVOLUZIONE',
      title: 'Scalare la selezione di qualit\u00e0 al ritmo dell\u2019espansione internazionale',
      intro: 'Con i risultati dimostrati su 6 paesi e il modello di pre-screening consolidato, il passo naturale \u00e8 estendere la copertura ai nuovi mercati al ritmo dell\u2019espansione internazionale di Subdued \u2014 garantendo che ogni nuovo negozio, in qualsiasi paese, parta con le persone giuste.',
      objective: 'Costruire un\u2019infrastruttura di selezione scalabile che accompagni l\u2019espansione di Subdued in ogni nuovo mercato, mantenendo lo stesso standard di qualit\u00e0 e la stessa velocit\u00e0 indipendentemente dal paese.',
      bullets: [
        'Espansione confermata verso Svezia e Irlanda, con ulteriori mercati al passo con le nuove aperture',
        'Consolidamento del modello di assessment per ruoli Store Manager su tutti i paesi',
        'Evoluzione verso un processo di selezione completamente integrato e scalabile a livello globale',
      ],
    },
    related: {
      title: 'Storie correlate',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail \u00b7 Hiring at Scale', headline: 'Come Carrefour Italia ha trasformato la selezione di 30.000 candidature l\u2019anno con soli 3 recruiter.' },
        { id: 'unicomm', company: 'Unicomm', tag: 'GDO \u00b7 Hiring & Sviluppo', headline: 'Come Unicomm ha digitalizzato l\u2019intero ciclo del talento su 270+ store e 7 brand retail.' },
      ],
      cta: 'Leggi la storia',
    },
    finalCta: { headline: 'Pronto a trasformare la tua', accent: 'People Strategy?' },
  },

  en: {
    breadcrumb: 'Customers',
    badge: 'CASE STUDY',
    headline: {
      before: 'How Subdued ',
      highlight1: 'halved turnover',
      middle: ' and cut time-to-hire by 40% across ',
      highlight2: '130+ stores',
      after: ' in 6 countries',
    },
    subtitle: 'A cult teen fashion brand with 1,000+ employees, Gen Z candidates with indistinguishable CVs, and a 7-person HR team spending 10\u201315 hours a week on phone screens. With Skillvue, Subdued turned pre-screening into a competitive advantage \u2014 and the innovative selection process itself became an employer branding asset.',
    heroMetrics: [
      { value: '-50%', label: 'turnover' },
      { value: '65% \u2192 85%', label: 'new hire retention' },
      { value: '-40%', label: 'time-to-hire' },
    ],
    ctaPrimary: 'Contact Us',
    ctaSecondary: 'Learn More',
    clientCard: {
      label: 'CLIENT PROFILE',
      facts: [
        { label: 'Industry', value: 'Fashion Retail' },
        { label: 'Employees', value: '1,000+' },
        { label: 'Stores', value: '130+ mono-brand' },
        { label: 'Countries', value: 'Italy, UK, France, Netherlands, Belgium, Sweden, Ireland' },
        { label: 'HR Team', value: '7 people across 6 countries' },
      ],
    },
    context: {
      badge: 'CONTEXT',
      title: 'The Project Context',
      paragraph: <>
        Subdued is one of Italy\u2019s most iconic brands in the <strong className="text-[#1A1A2E]/80 font-semibold">teen fashion</strong> segment, with over <strong className="text-[#1A1A2E]/80 font-semibold">130 mono-brand stores</strong> across Italy, Europe and Asia, <strong className="text-[#1A1A2E]/80 font-semibold">1,000+ employees</strong> and 2024 revenues of <strong className="text-[#1A1A2E]/80 font-semibold">\u20ac163.9M</strong>. Founded in Rome in the 1990s, the brand targets girls aged <strong className="text-[#1A1A2E]/80 font-semibold">12 to 20</strong> with a 100% direct-to-consumer model and a supply chain that delivers a product from design to store in <strong className="text-[#1A1A2E]/80 font-semibold">7 days</strong>. Accelerated international expansion \u2014 <strong className="text-[#1A1A2E]/80 font-semibold">14 new openings in 2024</strong> including entry into the US and China \u2014 created a structural HR challenge: maintaining consistent selection quality across multiple countries and languages with a lean team. The HR team (<strong className="text-[#1A1A2E]/80 font-semibold">7 people across 6 countries</strong>) was completely absorbed by operations: all evaluation happened through <strong className="text-[#1A1A2E]/80 font-semibold">direct interviews</strong>, with no structured pre-screening phase. Recruiters were spending <strong className="text-[#1A1A2E]/80 font-semibold">10\u201315 hours a week</strong> on introductory calls, with no time left for strategic work.
      </>,
      summary: 'The project transformed pre-screening from a fully manual activity into a structured, AI-driven process \u2014 introducing objective competency assessment before the interview for the first time. The result: turnover halved, retention rising to around 70%, and a selection process that itself became an attraction asset for Gen Z candidates.',
    },
    challenge: {
      badge: 'THE CHALLENGE',
      title: 'The Structural Problem',
      intro: 'Subdued is a rapidly expanding brand, with 14 new openings in 2024 alone and new markets from the US to China. But a 7-person HR team across 6 countries could not keep pace: high monthly turnover, massive volumes of junior candidates with undifferentiated CVs, and half of those passing the first screen lacking the soft skills needed for daily store work.',
      businessLabel: 'BUSINESS IMPACT',
      hrLabel: 'HR & PEOPLE IMPACT',
      businessChallenges: [
        {
          icon: TrendingUp,
          title: 'International expansion, unchanged HR team',
          text: '14 new openings in 2024, entry into the US and China, and a team of just 7 people across 6 countries managing all recruiting. Every new opening in a new market meant new application volumes, new languages, new cultural contexts \u2014 with no increase in HR resources. The model of individual interviews for every candidate was physically unsustainable.',
        },
        {
          icon: Target,
          title: 'Recurring hiring mistakes',
          text: 'Candidates with good CVs but lacking the practical soft skills for daily store work were being hired too often. In a high-turnover sector with tight margins, every wrong hire had a direct cost on store performance, onboarding and team morale.',
        },
        {
          icon: Users,
          title: 'The brand experience starts with people',
          text: 'For a brand built on the in-store experience and community, the people in the store ARE the brand. Hiring the right people \u2014 with genuine communication and selling skills \u2014 is not an HR metric: it\u2019s a matter of brand survival in a competitive market.',
        },
      ],
      hrChallenges: [
        {
          icon: Zap,
          title: '10\u201315 hours a week on introductory calls',
          text: 'With no structured pre-screening phase, every candidate required the same time investment from the recruiter regardless of actual potential. The HR team was completely absorbed by operations, with zero time for employer branding, training or strategy \u2014 activities sacrificed entirely.',
        },
        {
          icon: Eye,
          title: 'CVs don\u2019t differentiate Gen Z candidates',
          text: 'Junior candidates in their first or second job have essentially identical CVs: no significant experience, similar qualifications. The competencies that drive success in-store \u2014 communication, selling, teamwork \u2014 are completely invisible on paper. A tool was needed to make them visible before the interview.',
        },
        {
          icon: Scale,
          title: 'No cross-country evaluation standard',
          text: 'With expansion into the UK, France, the Netherlands, Belgium and beyond, each country assessed candidates using its own criteria. There was no common framework to ensure consistent hiring quality regardless of market, language or individual recruiter.',
        },
      ],
    },
    objectives: {
      badge: 'COLLABORATION OBJECTIVES',
      title: 'What Needed to Change',
      items: [
        { icon: Zap, text: 'Introduce a structured pre-screening phase: assess communication, selling and teamworking before the interview, with objective data on every candidate \u2014 freeing the HR team from operational work' },
        { icon: Target, text: 'Reduce hiring mistakes: bring to interview only candidates with verified competencies, increasing the success rate and reducing turnover that was weighing on performance and costs' },
        { icon: Layers, text: 'Scale across multiple countries with a single standard: a consistent evaluation process across Italy, UK, France, the Netherlands, Belgium and future markets, adaptable by language and role without multiplying resources' },
        { icon: Heart, text: 'Preserve the human relationship: technology must empower the recruiter, not replace them \u2014 Subdued wanted to maintain the direct connection with candidates that is part of the brand\u2019s DNA' },
      ],
    },
    solution: {
      badge: 'THE SOLUTION',
      title: 'AI Assessment with Skillvue',
      intro: 'Skillvue was integrated as a pre-screening stage in Subdued\u2019s selection process, between the application and the first HR interview. Valentina Cianciaruso\u2019s HR team worked directly with Skillvue to select the most effective tests and questions from the Skill Library for Subdued\u2019s specific retail needs. Onboarding was completed in just 2 weeks from kick-off to go-live, one of the fastest implementations in the Skillvue portfolio.',
      skillsLabel: 'SKILLS ASSESSED',
      skills: [
        { icon: CheckCircle, label: 'Communication' },
        { icon: TrendingUp, label: 'Selling' },
        { icon: Users, label: 'Teamworking' },
      ],
      methodologyLabel: 'METHODOLOGY',
      methodology: [
        {
          title: 'Tailored assessments by country and role',
          text: 'Assessments configured for different profiles and markets: in Italy, video pitch + 2 soft skills (3 questions each, max 15 min); in the UK, killer question + video pitch + 1 soft skill (max 10 min). For Store Managers, tests covering communication, selling and teamworking. Each configuration is adapted to the local context while maintaining the same evaluation standard.',
        },
        {
          title: 'Delivery via WhatsApp \u2014 mobile-first for Gen Z',
          text: 'The assessment link is sent to candidates via WhatsApp, not email: a pragmatic, mobile-first choice perfectly aligned with Gen Z habits. This switch, introduced in the first few weeks, significantly improved completion rates. Candidates complete the assessment from any device within a set deadline.',
        },
        {
          title: 'Progressive rollout across 6 countries',
          text: 'The project started in Italy and was progressively extended to the UK, France, the Netherlands and Belgium, with confirmed expansion toward Sweden and Ireland. 7 active Skillvue users across 6 countries \u2014 a model that demonstrates platform scalability for international retail with contained HR resources.',
        },
      ],
    },
    results: {
      badge: 'RESULTS',
      title: 'Key Metrics & Impact',
      subtitle: 'The measurable outcomes Subdued achieved through Skillvue across its hiring processes in 6 countries.',
      metrics: [
        { value: '-50%', label: 'Turnover', sublabel: 'Halved vs. the pre-Skillvue period' },
        { value: '65% \u2192 85%', label: 'New hire retention', sublabel: '+20 percentage points' },
        { value: '-40%', label: 'Time-to-hire', sublabel: '30\u201350% reduction across all markets' },
        { value: '50% \u2192 80%', label: '2nd-step success rate', sublabel: '+20\u201330pp \u2014 more qualified candidates at interview' },
        { value: '-65/70%', label: 'Pre-screening hours', sublabel: 'From 10\u201315 hrs/week to 3\u20135 hrs/week' },
        { value: '6 countries', label: 'International coverage', sublabel: '7 active Skillvue users' },
      ],
      qualitative: [
        { icon: Zap, title: 'Recruiters freed from operations', text: 'Pre-screening now produces a structured report for every candidate \u2014 objective data on communication, selling and teamworking before any human interaction. Introductory call hours dropped from 10\u201315 to 3\u20135 per week, returning strategic time to a team that had none.' },
        { icon: Target, title: 'More focused and personalised interviews', text: 'The first interview is now grounded in the Skillvue report: the recruiter arrives prepared with competency data on the candidate, making the interaction deeper and more targeted. Only pre-validated profiles reach the interview \u2014 no more back-to-back screening sessions on the calendar.' },
        { icon: Shield, title: 'Hiring mistakes drastically reduced', text: 'The combination of halved turnover (-50%) and retention rising from 65% to 85% shows that candidates hired with Skillvue are significantly better suited to the role. Fewer wrong hires means lower repeat onboarding costs, less impact on store performance and less pressure on the HR team.' },
        { icon: Scale, title: 'Consistent evaluation standard across 6 countries', text: 'For the first time, every country assesses candidates using the same criteria and the same competency framework, adapted by language and local context. Hiring decisions rest on objective data, not on the logic of an individual market or recruiter.' },
        { icon: Heart, title: 'Unexpected employer branding effect', text: 'An initially unforeseen outcome: the innovation of the selection process has become a differentiating element in attracting candidates. For a brand whose audience \u2014 both as customers and potential employees \u2014 is Gen Z, the alignment between technological innovation and generational expectations is a concrete competitive advantage in the retail labour market.' },
      ],
    },
    vision: {
      badge: 'EVOLUTION',
      title: 'Scaling quality hiring at the pace of international expansion',
      intro: 'With results proven across 6 countries and the pre-screening model consolidated, the natural next step is to extend coverage to new markets at the pace of Subdued\u2019s international expansion \u2014 ensuring every new store, in any country, starts with the right people.',
      objective: 'Build a scalable hiring infrastructure that accompanies Subdued\u2019s expansion into every new market, maintaining the same quality standard and the same speed regardless of country.',
      bullets: [
        'Confirmed expansion toward Sweden and Ireland, with further markets following new store openings',
        'Consolidation of the Store Manager assessment model across all countries',
        'Evolution toward a fully integrated, globally scalable selection process',
      ],
    },
    related: {
      title: 'Related Stories',
      stories: [
        { id: 'carrefour', company: 'Carrefour', tag: 'Retail \u00b7 Hiring at Scale', headline: 'How Carrefour Italia transformed the selection of 30,000 applications a year with just 3 recruiters.' },
        { id: 'unicomm', company: 'Unicomm', tag: 'GDO \u00b7 Hiring & Development', headline: 'How Unicomm digitized the entire talent lifecycle across 270+ stores and 7 retail brands.' },
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

  return (
    <>
      <Navbar />
      <main>

        {/* ===== HERO ===== */}
        <section className="relative pt-[80px]">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/subdued-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(6px) brightness(0.3)', transform: 'scale(1.05)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <button onClick={() => { router.push('/customers'); window.scrollTo(0, 0); }} className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300">{c.breadcrumb}</button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Subdued</span>
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
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white flex items-center justify-center p-1.5">
                      <img src="/logos/subdued-logo.png" alt="Subdued logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{c.clientCard.label}</span>
                      <p className="text-[18px] font-bold text-white/90">Subdued</p>
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
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/[0.12] bg-white/[0.08]">
                      <img src="/logos/subdued-valentina.jpg" alt="Valentina Cianciaruso" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white/80">Valentina Cianciaruso</p>
                      <p className="text-[12px] text-white/40 leading-[1.5]">HR Manager Dept. Italy</p>
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
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-[#1A1A2E] mb-4">{c.vision.title}</h2>
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
