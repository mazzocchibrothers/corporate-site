// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, ImageIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';
import { messagesFor } from '@/i18n/messages';

// ─── Fill these in when the assets/links are ready ──────────────────────────
const IMAGES = {
  vivatech: '/newsletter-july-vivatech.jpeg',
  execTa: '/newsletter-july-execta.jpeg',
  aiReadiness: '/newsletter-july-ai-readiness.png',
  fidia: '/newsletter-july-fidia.webp',
};
const LINKS = {
  vivatech: 'https://www.linkedin.com/posts/skillvue_we-flew-to-france-for-vivatech-and-came-back-activity-7473749153379041280-cxBR?utm_source=share&utm_medium=member_desktop&rcm=ACoAACZSO2IBOJeEW6vWG4-WdHsN9EKvCSEp4DA',
  execTa: 'https://www.linkedin.com/feed/update/urn:li:activity:7480888533185093632',
  aiTest: '/lp/ai-competency-newsletter',
  fidia: '/customers/fidia-farmaceutici',
};
// ────────────────────────────────────────────────────────────────────────────

const C = {
  en: {
    metaTitle: 'Skillvue — The July Newsletter',
    tag: 'Newsletter',
    date: 'July 2026',
    readTime: '4 min read',
    title: 'The July newsletter',
    subtitle: 'Skills, AI and better talent decisions — four perspectives gathered from London to Paris, plus a closer look at AI readiness.',
    intro: [
      'Over the past few months, we’ve met HR and Talent leaders at several events across Europe, discussing the changes reshaping the way organisations hire, assess and develop people.',
      'One shared theme emerged from these conversations: AI creates new opportunities, but turning them into better decisions requires **reliable data**, a clear understanding of people’s skills, and processes that combine technology with human judgement.',
      'In this edition, we bring together four perspectives on these topics — gathered from London to Paris — alongside a closer look at AI readiness and the experience of one of our clients in the pharmaceutical field.',
    ],
    sections: [
      {
        img: 'vivatech',
        heading: 'A VivaTech award and fresh perspectives',
        body: [
          'At VivaTech in Paris, we joined companies, startups and international leaders to discuss how AI is transforming the world of work.',
          'One of the clearest takeaways was that the AI challenge is **not only technological, but also organisational**. For HR leaders, this means understanding which skills are needed, how to develop them, and how AI can support more informed talent decisions.',
          'During the event, we also won the ManpowerGroup Startup Challenge, “Redesigning Work for the Age of AI” — an important recognition and an experience that gave us fresh ideas and perspectives on the future of work.',
        ],
        cta: { label: 'Discover more about our VivaTech experience', href: LINKS.vivatech, external: true },
      },
      {
        img: 'execTa',
        heading: 'Beyond skills-based hiring',
        body: [
          'A couple of weeks ago in London, together with ExecTASocial, we sat down with a group of Heads of Talent Acquisition to discuss some of the biggest challenges shaping hiring today: improving candidate quality, building hiring-manager trust, enhancing the candidate experience, reducing mis-hires, increasing assessment adoption, and understanding the growing role of AI across the talent lifecycle.',
          'One point emerged clearly: skills-based hiring is **no longer just a selection methodology**. It is becoming the foundation for more objective and evidence-based talent decisions across hiring, development, and internal mobility.',
          'But making this shift requires more than new technology. HR needs the influence to help CEOs and other business functions understand the strategic value of a skills-based operating model, as well as cross-functional support to overcome implementation challenges — from technical integration to resource allocation. Only then can organisations fully connect people strategy with measurable business outcomes.',
        ],
        cta: { label: 'Read the LinkedIn post', href: LINKS.execTa, external: true },
      },
      {
        img: 'aiReadiness',
        heading: 'How ready is your organisation for AI?',
        body: [
          'Adopting new tools does not necessarily mean that an organisation is ready to use AI effectively. Self-assessments, claimed skills and generic benchmarks provide only a partial picture of actual readiness.',
          'That’s why we developed a test that measures **both technical knowledge and the ability to apply AI with sound judgement**. It is built around the organisation’s real roles, processes and use cases, helping identify existing capabilities, relevant skill gaps and priorities for upskilling and reskilling.',
          'In this way, AI readiness can become a concrete source of information for making more targeted development decisions.',
        ],
        cta: { label: 'Explore the AI Competency Test', href: LINKS.aiTest, external: false },
      },
      {
        img: 'fidia',
        heading: 'Making skills visible at Fidia Farmaceutici',
        body: [
          'How can an organisation make skills assessment and development more structured, objective and scalable?',
          'In our latest customer story, Gianluca Magnani, Global People & Culture Officer at Fidia Farmaceutici, explains how the organisation moved **from CV-based to skills-based criteria** — making skills and potential more visible in order to develop more and more people across a 900-person sales network, where previously only 5-10% managed to progress in their career.',
          'The objective is not to replace human judgement, but to provide a stronger foundation for building development paths aligned with both people’s potential and the organisation’s needs.',
        ],
        cta: { label: 'Read the full customer story', href: LINKS.fidia, external: false },
      },
    ],
    closing: {
      heading: 'Towards better talent decisions',
      body: [
        'From hiring to people development, these experiences reflect the same underlying need: to understand skills more clearly and make talent decisions that are **more informed, objective and grounded in the reality of each organisation**.',
        'We’ll continue sharing practical insights, conversations and real-world examples of how AI and skills-based approaches are transforming the work of HR leaders.',
      ],
    },
    finalKicker: 'Discover Skillvue',
    finalTitle: 'Better talent decisions start with',
    finalTitleHighlight: 'clearer skills.',
    finalBody: 'Book a demo and see how Skillvue verifies skills and AI readiness across your organisation.',
    finalButton: 'Book a Demo',
    back: 'Back to Blog',
    imgSoon: 'image coming',
    imgLabels: {
      vivatech: 'VivaTech photo',
      execTa: 'ExecTA roundtable photo (London)',
      aiReadiness: 'AI Competency Test visual',
      fidia: 'Fidia customer story photo',
    },
  },
  it: {
    metaTitle: 'Skillvue — La newsletter di luglio',
    tag: 'Newsletter',
    date: 'Luglio 2026',
    readTime: '4 min di lettura',
    title: 'La newsletter di luglio',
    subtitle: 'Competenze, AI e decisioni migliori sul talento — quattro prospettive raccolte da Londra a Parigi, più un approfondimento sull’AI readiness.',
    intro: [
      'Negli ultimi mesi abbiamo incontrato HR e Talent leader in diversi eventi in tutta Europa, confrontandoci sui cambiamenti che stanno ridefinendo il modo in cui le organizzazioni assumono, valutano e sviluppano le persone.',
      'Da questi confronti è emerso un tema comune: l’AI apre nuove opportunità, ma trasformarle in decisioni migliori richiede **dati affidabili**, una comprensione chiara delle competenze delle persone e processi che uniscano tecnologia e giudizio umano.',
      'In questa edizione raccogliamo quattro prospettive su questi temi — da Londra a Parigi — insieme a un approfondimento sull’AI readiness e all’esperienza di un nostro cliente nel settore farmaceutico.',
    ],
    sections: [
      {
        img: 'vivatech',
        heading: 'Un premio a VivaTech e nuove prospettive',
        body: [
          'A VivaTech, a Parigi, ci siamo confrontati con aziende, startup e leader internazionali su come l’AI sta trasformando il mondo del lavoro.',
          'Uno dei messaggi più chiari è che la sfida dell’AI **non è solo tecnologica, ma anche organizzativa**. Per le Direzioni HR significa capire quali competenze servono, come svilupparle e come l’AI può supportare decisioni sul talento più consapevoli.',
          'Durante l’evento abbiamo anche vinto il ManpowerGroup Startup Challenge, “Redesigning Work for the Age of AI” — un riconoscimento importante e un’esperienza che ci ha lasciato nuove idee e prospettive sul futuro del lavoro.',
        ],
        cta: { label: 'Scopri di più sulla nostra esperienza a VivaTech', href: LINKS.vivatech, external: true },
      },
      {
        img: 'execTa',
        heading: 'Oltre lo skills-based hiring',
        body: [
          'Un paio di settimane fa a Londra, insieme a ExecTASocial, ci siamo seduti con un gruppo di Head of Talent Acquisition per discutere alcune delle sfide più grandi che stanno ridefinendo la selezione oggi: migliorare la qualità dei candidati, costruire la fiducia degli hiring manager, migliorare la candidate experience, ridurre gli errori di assunzione, aumentare l’adozione degli assessment e comprendere il ruolo crescente dell’AI lungo tutto il talent lifecycle.',
          'Un punto è emerso con chiarezza: lo skills-based hiring **non è più solo una metodologia di selezione**. Sta diventando la base per decisioni sul talento più oggettive e basate sui dati, dall’assunzione allo sviluppo fino alla mobilità interna.',
          'Ma questo cambiamento richiede più della sola tecnologia. L’HR ha bisogno dell’autorevolezza per far comprendere a CEO e alle altre funzioni il valore strategico di un modello operativo basato sulle competenze, oltre a un supporto cross-funzionale per superare le sfide di implementazione — dall’integrazione tecnica all’allocazione delle risorse. Solo così le organizzazioni possono collegare davvero la strategia sulle persone a risultati di business misurabili.',
        ],
        cta: { label: 'Leggi il post su LinkedIn', href: LINKS.execTa, external: true },
      },
      {
        img: 'aiReadiness',
        heading: 'Quanto è pronta la tua organizzazione per l’AI?',
        body: [
          'Adottare nuovi strumenti non significa necessariamente che un’organizzazione sia pronta a usare l’AI in modo efficace. Autovalutazioni, competenze dichiarate e benchmark generici offrono solo un quadro parziale della reale preparazione.',
          'Per questo abbiamo sviluppato un test che misura **sia la conoscenza tecnica sia la capacità di applicare l’AI con giudizio**. È costruito attorno ai ruoli, ai processi e ai casi d’uso reali dell’organizzazione, aiutando a individuare le capacità esistenti, i gap di competenze rilevanti e le priorità di upskilling e reskilling.',
          'In questo modo l’AI readiness può diventare una fonte concreta di informazioni per prendere decisioni di sviluppo più mirate.',
        ],
        cta: { label: 'Esplora l’AI Competency Test', href: LINKS.aiTest, external: false },
      },
      {
        img: 'fidia',
        heading: 'Rendere visibili le competenze in Fidia Farmaceutici',
        body: [
          'Come può un’organizzazione rendere più strutturato, oggettivo e scalabile il modo in cui valuta e sviluppa le competenze delle proprie persone?',
          'Ne parliamo nella nostra ultima customer story con Gianluca Magnani, Global People & Culture Officer di Fidia Farmaceutici, che racconta come l’organizzazione sia passata **da criteri basati sul CV a criteri basati sulle competenze** — rendendo competenze e potenziale più visibili per sviluppare sempre più persone in una rete vendita di 900 persone, dove prima solo il 5-10% riusciva a crescere nel proprio percorso di carriera.',
          'L’obiettivo non è sostituire il giudizio umano, ma offrire una base più solida per costruire percorsi di sviluppo allineati sia al potenziale delle persone sia alle esigenze dell’organizzazione.',
        ],
        cta: { label: 'Guarda la customer story', href: LINKS.fidia, external: false },
      },
    ],
    closing: {
      heading: 'Verso decisioni migliori sul talento',
      body: [
        'Dall’assunzione allo sviluppo delle persone, queste esperienze riflettono lo stesso bisogno di fondo: comprendere le competenze in modo più chiaro e prendere decisioni sul talento **più informate, oggettive e ancorate alla realtà di ogni organizzazione**.',
        'Continueremo a condividere insight pratici, conversazioni ed esempi concreti di come l’AI e gli approcci basati sulle competenze stanno trasformando il lavoro delle Direzioni HR.',
      ],
    },
    finalKicker: 'Scopri Skillvue',
    finalTitle: 'Decisioni migliori sul talento partono da',
    finalTitleHighlight: 'competenze più chiare.',
    finalBody: 'Prenota una demo e scopri come Skillvue verifica competenze e AI readiness in tutta l’organizzazione.',
    finalButton: 'Prenota una demo',
    back: 'Torna al Blog',
    imgSoon: 'immagine in arrivo',
    imgLabels: {
      vivatech: 'Foto VivaTech',
      execTa: 'Foto tavola rotonda ExecTA (Londra)',
      aiReadiness: 'Visual AI Competency Test',
      fidia: 'Foto customer story Fidia',
    },
  },
};

// Renders **bold** markers inside a plain string as <strong> spans.
function renderRich(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-semibold text-[#121212]">{part.slice(2, -2)}</strong>
      : part
  );
}

function Img({ src, label, soon }) {
  if (src) return <img src={src} alt={label} className="block w-full rounded-2xl my-8" />;
  return (
    <div className="my-8 w-full rounded-2xl flex flex-col items-center justify-center gap-2 text-center px-6"
      style={{ aspectRatio: '16 / 10', background: 'linear-gradient(135deg, #ece9fb 0%, #f7e6dc 100%)', border: '1px dashed rgba(75,77,247,0.25)' }}>
      <ImageIcon className="h-7 w-7 text-[#4B4DF7]/50" />
      <span className="text-[13px] font-semibold text-[#4B4DF7]/70">{label}</span>
      <span className="text-[11px] uppercase tracking-[0.14em] text-[#121212]/25">{soon}</span>
    </div>
  );
}

function CtaLink({ label, href, external }) {
  return (
    <div className="mt-8">
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="inline-flex items-center gap-2 rounded-full bg-[#4B4DF7] text-white text-[14px] font-semibold px-6 py-3.5 transition-colors duration-300 hover:bg-[#3133E7]"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}


// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('blog/newsletter-july-2026');

export default function JulyNewsletter() {
  const router = useRouter();
  const { lang } = useLanguage();
  const isIt = lang === 'it';
  const t = isIt ? C.it : C.en;

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.subtitle} />
      </Head>

      <Navbar />
      <main>
        {/* HERO — dark, on-brand */}
        <section className="relative pt-[80px] overflow-hidden" style={{ background: '#08080c' }}>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(75,77,247,0.18) 0%, rgba(75,77,247,0) 60%)' }} />
            <div className="absolute top-10 right-[-200px] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,86,86,0.10) 0%, rgba(255,86,86,0) 60%)' }} />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 w-full py-16 lg:py-24">
            <Button
              variant="tertiary" mode="dark" iconPosition="left" icon={<ArrowLeft aria-hidden />}
              onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }}
              className="mb-10"
            >
              {t.back}
            </Button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">{t.tag}</span>
                <span className="text-[13px] text-white/35">{t.date}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {t.readTime}</span>
              </div>
              <h1 className="font-semibold text-white/95 mb-6 text-[40px] md:text-[60px]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>{t.title}</h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>{t.subtitle}</p>
            </motion.div>
          </div>
        </section>

        {/* BODY — light panel */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20">
            {/* Intro */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-5">
              {t.intro.map((p, i) => <p key={i} className="text-[17px] text-[#121212]/[0.7] leading-[1.9]">{renderRich(p)}</p>)}
            </motion.div>

            {/* Sections */}
            {t.sections.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 pt-10 border-t border-[#121212]/[0.06]">
                <h2 className="text-[26px] font-semibold text-[#121212] tracking-[-0.02em] mb-1">{s.heading}</h2>
                <Img src={IMAGES[s.img]} label={t.imgLabels[s.img]} soon={t.imgSoon} />
                <div className="space-y-5">
                  {s.body.map((p, j) => <p key={j} className="text-[17px] text-[#121212]/[0.7] leading-[1.9]">{renderRich(p)}</p>)}
                </div>
                <CtaLink label={s.cta.label} href={s.cta.href} external={s.cta.external} />
              </motion.div>
            ))}

            {/* Closing */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 pt-10 border-t border-[#121212]/[0.06]">
              <h2 className="text-[26px] font-semibold text-[#121212] tracking-[-0.02em] mb-4">{t.closing.heading}</h2>
              <div className="space-y-5">
                {t.closing.body.map((p, j) => <p key={j} className="text-[17px] text-[#121212]/[0.7] leading-[1.9]">{renderRich(p)}</p>)}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA — dark */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24" style={{ background: '#08080c' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{t.finalKicker}</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {t.finalTitle} <span className="gradient-text">{t.finalTitleHighlight}</span>
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">{t.finalBody}</p>
              <Button variant="primary" mode="dark" onClick={() => { router.push(isIt ? '/prenota-incontro' : '/book-meeting'); window.scrollTo(0, 0); }}>
                {t.finalButton}
              </Button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}
