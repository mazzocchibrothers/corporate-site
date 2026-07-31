// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Newspaper, Linkedin, Instagram, Facebook, ArrowLeft, ImageIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

// ─── Fill these in when the assets/links are ready ──────────────────────────
// Photos for each section (leave '' to show a labelled placeholder).
const IMAGES = {
  vivatech: '',    // TODO: VivaTech photo (pitch / award)
  execTa: '',      // TODO: ExecTA London roundtable photo
  aiReadiness: '', // TODO: AI readiness / AI Competency visual
  fidia: '',       // TODO: Fidia Farmaceutici customer story photo
};

// Destinations for the black CTA buttons (leave '#' as placeholder).
const LINKS = {
  vivatech: '#', // LinkedIn post
  execTa: '#',   // LinkedIn post
  aiTest: '#',   // AI Competency landing / document
  fidia: '#',    // Customer story page
  demo: '#',     // Book a demo
};

const SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/skillvue/',
  instagram: 'https://www.instagram.com/skillvue.ai/',
  facebook: 'https://www.facebook.com/skillvue.ai',
};
// ────────────────────────────────────────────────────────────────────────────

const C = {
  en: {
    metaTitle: 'Skillvue — The July Newsletter',
    heroTitle: 'The July newsletter',
    heroSubtitle: 'News from the world of HR & HR Tech',
    greeting: 'Hi,',
    introLead: 'Skills, AI and better talent decisions.',
    intro: [
      "Over the past few months, we’ve met HR and Talent leaders at several events across Europe, discussing the changes reshaping the way organisations hire, assess and develop people.",
      "One shared theme emerged from these conversations: AI creates new opportunities, but turning them into better decisions requires reliable data, a clear understanding of people’s skills, and processes that combine technology with human judgement.",
      "In this edition, we bring together four perspectives on these topics — gathered from London to Paris — alongside a closer look at AI readiness and the experience of one of our clients in the pharmaceutical field.",
    ],
    sections: [
      {
        img: 'vivatech',
        heading: 'A VivaTech award and fresh perspectives',
        body: [
          'At VivaTech in Paris, we joined companies, startups and international leaders to discuss how AI is transforming the world of work.',
          'One of the clearest takeaways was that the AI challenge is not only technological, but also organisational. For HR leaders, this means understanding which skills are needed, how to develop them, and how AI can support more informed talent decisions.',
          'During the event, we also won the ManpowerGroup Startup Challenge, “Redesigning Work for the Age of AI” — an important recognition and an experience that gave us fresh ideas and perspectives on the future of work.',
        ],
        buttons: [{ label: 'Discover more about our VivaTech experience', href: LINKS.vivatech }],
      },
      {
        img: 'execTa',
        heading: 'Beyond skills-based hiring',
        body: [
          'A couple of weeks ago in London, together with ExecTASocial, we sat down with a group of Heads of Talent Acquisition to discuss some of the biggest challenges shaping hiring today: improving candidate quality, building hiring-manager trust, enhancing the candidate experience, reducing mis-hires, increasing assessment adoption, and understanding the growing role of AI across the talent lifecycle.',
          'One point emerged clearly: skills-based hiring is no longer just a selection methodology. It is becoming the foundation for more objective and evidence-based talent decisions across hiring, development, and internal mobility.',
          'But making this shift requires more than new technology. HR needs the influence to help CEOs and other business functions understand the strategic value of a skills-based operating model, as well as cross-functional support to overcome implementation challenges — from technical integration to resource allocation. Only then can organisations fully connect people strategy with measurable business outcomes.',
        ],
        buttons: [{ label: 'Read the LinkedIn post', href: LINKS.execTa }],
      },
      {
        img: 'aiReadiness',
        heading: 'How ready is your organisation for AI?',
        body: [
          'Adopting new tools does not necessarily mean that an organisation is ready to use AI effectively. Self-assessments, claimed skills and generic benchmarks provide only a partial picture of actual readiness.',
          'That’s why we developed a test that measures both technical knowledge and the ability to apply AI with sound judgement. It is built around the organisation’s real roles, processes and use cases, helping identify existing capabilities, relevant skill gaps and priorities for upskilling and reskilling.',
          'In this way, AI readiness can become a concrete source of information for making more targeted development decisions.',
        ],
        buttons: [{ label: 'Explore the AI Competency Test', href: LINKS.aiTest }],
      },
      {
        img: 'fidia',
        heading: 'Making skills visible at Fidia Farmaceutici',
        body: [
          'How can an organisation make skills assessment and development more structured, objective and scalable?',
          'In our latest customer story, Gianluca Magnani, Global People & Culture Officer at Fidia Farmaceutici, explains how the organisation moved from CV-based to skills-based criteria — making skills and potential more visible in order to develop more and more people across a 900-person sales network, where previously only 5-10% managed to progress in their career.',
          'The objective is not to replace human judgement, but to provide a stronger foundation for building development paths aligned with both people’s potential and the organisation’s needs.',
        ],
        buttons: [{ label: 'Read the full customer story', href: LINKS.fidia }],
      },
    ],
    closing: {
      heading: 'Towards better talent decisions',
      body: [
        'From hiring to people development, these experiences reflect the same underlying need: to understand skills more clearly and make talent decisions that are more informed, objective and grounded in the reality of each organisation.',
        'We’ll continue sharing practical insights, conversations and real-world examples of how AI and skills-based approaches are transforming the work of HR leaders.',
      ],
      buttons: [{ label: 'Discover more about Skillvue', href: LINKS.demo }],
    },
    footerText: 'Don’t forget to follow us on social to stay up to date with all the latest news from Skillvue and the HR Tech world!',
    address: 'Skillvue (Algojob S.r.l.), Future of Work House, viale Caldara 13, Milano, Lombardia 20122, Italy',
    back: 'Back to Blog',
    imgSoon: 'image coming',
  },
  it: {
    metaTitle: 'Skillvue — La newsletter di luglio',
    heroTitle: 'La newsletter di luglio',
    heroSubtitle: 'Notizie dal mondo HR & HR Tech',
    greeting: 'Ciao,',
    introLead: 'Competenze, AI e decisioni migliori sul talento.',
    intro: [
      'Negli ultimi mesi abbiamo incontrato HR e Talent leader in diversi eventi in tutta Europa, confrontandoci sui cambiamenti che stanno ridefinendo il modo in cui le organizzazioni assumono, valutano e sviluppano le persone.',
      'Da questi confronti è emerso un tema comune: l’AI apre nuove opportunità, ma trasformarle in decisioni migliori richiede dati affidabili, una comprensione chiara delle competenze delle persone e processi che uniscano tecnologia e giudizio umano.',
      'In questa edizione raccogliamo quattro prospettive su questi temi — da Londra a Parigi — insieme a un approfondimento sull’AI readiness e all’esperienza di un nostro cliente nel settore farmaceutico.',
    ],
    sections: [
      {
        img: 'vivatech',
        heading: 'Un premio a VivaTech e nuove prospettive',
        body: [
          'A VivaTech, a Parigi, ci siamo confrontati con aziende, startup e leader internazionali su come l’AI sta trasformando il mondo del lavoro.',
          'Uno dei messaggi più chiari è che la sfida dell’AI non è solo tecnologica, ma anche organizzativa. Per le Direzioni HR significa capire quali competenze servono, come svilupparle e come l’AI può supportare decisioni sul talento più consapevoli.',
          'Durante l’evento abbiamo anche vinto il ManpowerGroup Startup Challenge, “Redesigning Work for the Age of AI” — un riconoscimento importante e un’esperienza che ci ha lasciato nuove idee e prospettive sul futuro del lavoro.',
        ],
        buttons: [{ label: 'Scopri di più sulla nostra esperienza a VivaTech', href: LINKS.vivatech }],
      },
      {
        img: 'execTa',
        heading: 'Oltre lo skills-based hiring',
        body: [
          'Un paio di settimane fa a Londra, insieme a ExecTASocial, ci siamo seduti con un gruppo di Head of Talent Acquisition per discutere alcune delle sfide più grandi che stanno ridefinendo la selezione oggi: migliorare la qualità dei candidati, costruire la fiducia degli hiring manager, migliorare la candidate experience, ridurre gli errori di assunzione, aumentare l’adozione degli assessment e comprendere il ruolo crescente dell’AI lungo tutto il talent lifecycle.',
          'Un punto è emerso con chiarezza: lo skills-based hiring non è più solo una metodologia di selezione. Sta diventando la base per decisioni sul talento più oggettive e basate sui dati, dall’assunzione allo sviluppo fino alla mobilità interna.',
          'Ma questo cambiamento richiede più della sola tecnologia. L’HR ha bisogno dell’autorevolezza per far comprendere a CEO e alle altre funzioni il valore strategico di un modello operativo basato sulle competenze, oltre a un supporto cross-funzionale per superare le sfide di implementazione — dall’integrazione tecnica all’allocazione delle risorse. Solo così le organizzazioni possono collegare davvero la strategia sulle persone a risultati di business misurabili.',
        ],
        buttons: [{ label: 'Leggi il post su LinkedIn', href: LINKS.execTa }],
      },
      {
        img: 'aiReadiness',
        heading: 'Quanto è pronta la tua organizzazione per l’AI?',
        body: [
          'Adottare nuovi strumenti non significa necessariamente che un’organizzazione sia pronta a usare l’AI in modo efficace. Autovalutazioni, competenze dichiarate e benchmark generici offrono solo un quadro parziale della reale preparazione.',
          'Per questo abbiamo sviluppato un test che misura sia la conoscenza tecnica sia la capacità di applicare l’AI con giudizio. È costruito attorno ai ruoli, ai processi e ai casi d’uso reali dell’organizzazione, aiutando a individuare le capacità esistenti, i gap di competenze rilevanti e le priorità di upskilling e reskilling.',
          'In questo modo l’AI readiness può diventare una fonte concreta di informazioni per prendere decisioni di sviluppo più mirate.',
        ],
        buttons: [{ label: 'Esplora l’AI Competency Test', href: LINKS.aiTest }],
      },
      {
        img: 'fidia',
        heading: 'Rendere visibili le competenze in Fidia Farmaceutici',
        body: [
          'Come può un’organizzazione rendere più strutturato, oggettivo e scalabile il modo in cui valuta e sviluppa le competenze delle proprie persone?',
          'Ne parliamo nella nostra ultima customer story con Gianluca Magnani, Global People & Culture Officer di Fidia Farmaceutici, che racconta come l’organizzazione sia passata da criteri basati sul CV a criteri basati sulle competenze — rendendo competenze e potenziale più visibili per sviluppare sempre più persone in una rete vendita di 900 persone, dove prima solo il 5-10% riusciva a crescere nel proprio percorso di carriera.',
          'L’obiettivo non è sostituire il giudizio umano, ma offrire una base più solida per costruire percorsi di sviluppo allineati sia al potenziale delle persone sia alle esigenze dell’organizzazione.',
        ],
        buttons: [{ label: 'Guarda la customer story', href: LINKS.fidia }],
      },
    ],
    closing: {
      heading: 'Verso decisioni migliori sul talento',
      body: [
        'Dall’assunzione allo sviluppo delle persone, queste esperienze riflettono lo stesso bisogno di fondo: comprendere le competenze in modo più chiaro e prendere decisioni sul talento più informate, oggettive e ancorate alla realtà di ogni organizzazione.',
        'Continueremo a condividere insight pratici, conversazioni ed esempi concreti di come l’AI e gli approcci basati sulle competenze stanno trasformando il lavoro delle Direzioni HR.',
      ],
      buttons: [{ label: 'Scopri di più su Skillvue', href: LINKS.demo }],
    },
    footerText: 'Non dimenticare di seguirci sui social per rimanere aggiornato su tutte le ultime novità da Skillvue e dal mondo HR Tech!',
    address: 'Skillvue (Algojob S.r.l.), Future of Work House, viale Caldara 13, Milano, Lombardia 20122, Italia',
    back: 'Torna al Blog',
    imgSoon: 'immagine in arrivo',
  },
};

function Img({ src, label, soon }) {
  if (src) {
    return <img src={src} alt={label} className="block w-full rounded-2xl my-8" />;
  }
  return (
    <div className="my-8 w-full rounded-2xl flex flex-col items-center justify-center gap-2 text-center px-6"
      style={{ aspectRatio: '16 / 10', background: 'linear-gradient(135deg, #ece9fb 0%, #f7e6dc 100%)', border: '1px dashed rgba(75,77,247,0.3)' }}>
      <ImageIcon className="h-7 w-7 text-[#4B4DF7]/50" />
      <span className="text-[13px] font-semibold text-[#4B4DF7]/70">{label}</span>
      <span className="text-[11px] uppercase tracking-[0.14em] text-[#1a1a1a]/30">{soon}</span>
    </div>
  );
}

function CTA({ label, href }) {
  return (
    <div className="flex justify-center my-8">
      <a href={href}
        className="inline-flex items-center justify-center text-center bg-black text-white text-[15px] font-semibold px-8 py-4 rounded-[10px] transition-opacity duration-300 hover:opacity-85">
        {label}
      </a>
    </div>
  );
}

function Section({ heading, imgKey, imgLabel, body, buttons, soon }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      className="mt-14">
      <h2 className="text-[21px] font-bold text-[#1a1a1a] tracking-[-0.01em] mb-1">{heading}</h2>
      {imgKey && <Img src={IMAGES[imgKey]} label={imgLabel} soon={soon} />}
      <div className="space-y-5">
        {body.map((p, i) => <p key={i} className="text-[16px] leading-[1.75] text-[#1a1a1a]/[0.78]">{p}</p>)}
      </div>
      {buttons?.map((b, i) => <CTA key={i} label={b.label} href={b.href} />)}
    </motion.section>
  );
}

export default function JulyNewsletter() {
  const router = useRouter();
  const { lang, switchLang } = useLanguage();
  const isIt = lang === 'it';
  const t = isIt ? C.it : C.en;

  const imgLabels = {
    vivatech: isIt ? 'Foto VivaTech' : 'VivaTech photo',
    execTa: isIt ? 'Foto tavola rotonda ExecTA (Londra)' : 'ExecTA roundtable photo (London)',
    aiReadiness: isIt ? 'Visual AI Competency Test' : 'AI Competency Test visual',
    fidia: isIt ? 'Foto customer story Fidia' : 'Fidia customer story photo',
  };

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.heroSubtitle} />
      </Head>

      <main style={{ background: '#ffffff' }} className="min-h-screen">
        {/* Top bar: back link + logo + language toggle */}
        <div className="max-w-[720px] mx-auto px-6 pt-8">
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }}
              className="absolute left-0 inline-flex items-center gap-1.5 text-[13px] text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors">
              <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">{t.back}</span>
            </button>
            <img src="/logos/Skillvue_logo-on_light.svg" alt="Skillvue" className="h-8 w-auto" />
            <div className="absolute right-0 flex items-center gap-1 text-[12px] font-semibold">
              <button onClick={() => switchLang('en')} className={`px-2 py-1 rounded ${!isIt ? 'text-[#4B4DF7]' : 'text-[#1a1a1a]/40'}`}>EN</button>
              <span className="text-[#1a1a1a]/20">|</span>
              <button onClick={() => switchLang('it')} className={`px-2 py-1 rounded ${isIt ? 'text-[#4B4DF7]' : 'text-[#1a1a1a]/40'}`}>IT</button>
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="max-w-[680px] mx-auto px-6 pb-4">
          {/* Hero banner card */}
          <div className="mt-8 rounded-[28px] overflow-hidden px-8 py-10 md:px-12 md:py-12 flex items-center gap-6"
            style={{ background: 'linear-gradient(105deg, #cdc6f5 0%, #e6d5ea 55%, #f8ddc9 100%)' }}>
            <div className="hidden sm:flex w-24 h-24 shrink-0 rounded-full items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.5)' }}>
              <Newspaper className="h-11 w-11 text-[#2a2350]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-[32px] md:text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em]" style={{ color: '#221d47' }}>
                {t.heroTitle}
              </h1>
              <p className="text-[17px] md:text-[19px] mt-2" style={{ color: '#221d47', opacity: 0.72 }}>{t.heroSubtitle}</p>
            </div>
          </div>

          {/* Greeting + intro */}
          <p className="mt-10 text-[16px] text-[#1a1a1a]/[0.78]">{t.greeting}</p>
          <p className="mt-5 text-[16px] font-semibold text-[#1a1a1a]">{t.introLead}</p>
          <div className="mt-4 space-y-5">
            {t.intro.map((p, i) => <p key={i} className="text-[16px] leading-[1.75] text-[#1a1a1a]/[0.78]">{p}</p>)}
          </div>

          {/* Sections */}
          {t.sections.map((s, i) => (
            <Section key={i} heading={s.heading} imgKey={s.img} imgLabel={imgLabels[s.img]} body={s.body} buttons={s.buttons} soon={t.imgSoon} />
          ))}

          {/* Closing (no image) */}
          <Section heading={t.closing.heading} imgKey={null} body={t.closing.body} buttons={t.closing.buttons} soon={t.imgSoon} />
        </div>

        {/* Email-style footer */}
        <footer className="mt-16" style={{ background: '#fbf6ef' }}>
          <div className="max-w-[680px] mx-auto px-6 py-14 text-center">
            <img src="/logos/Skillvue_logo-on_light.svg" alt="Skillvue" className="h-8 w-auto mx-auto mb-6" />
            <p className="text-[15px] leading-[1.7] text-[#1a1a1a]/70 max-w-md mx-auto">{t.footerText}</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a1a1a]/[0.06] flex items-center justify-center text-[#1a1a1a]/60 hover:text-[#4B4DF7] transition-colors"><Linkedin className="h-4 w-4" /></a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a1a1a]/[0.06] flex items-center justify-center text-[#1a1a1a]/60 hover:text-[#4B4DF7] transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1a1a1a]/[0.06] flex items-center justify-center text-[#1a1a1a]/60 hover:text-[#4B4DF7] transition-colors"><Facebook className="h-4 w-4" /></a>
            </div>
            <p className="text-[12px] text-[#1a1a1a]/35 mt-8">{t.address}</p>
          </div>
        </footer>
      </main>
    </>
  );
}
