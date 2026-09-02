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

// ─── Fill these in when the assets/links are ready ──────────────────────────
// Empty string '' → a labelled dashed placeholder box renders instead.
// Put files in public/ as: /newsletter-august-<key>.<ext>
const IMAGES = {
  events: { en: '/newsletter-august-events-en.jpg', it: '/newsletter-august-events-it.jpg' },
  // per-language artwork: the headline is baked into the image
  supermarkets: { en: '/newsletter-august-supermarkets-en.jpg', it: '/newsletter-august-supermarkets-it.jpg' },
  unicomm: '/newsletter-august-unicomm.jpg',
};
// external links → full https URL; internal links → relative path ('/lp/...', '/customers/...')
const LINKS = {
  chroAssembly: 'https://mill-all.com/assemblies/european-enterprise-ai-hr-transformation-assembly-september-2026/',
  fairCultures: 'https://www.faircultures.com',
  gartner: 'https://www.gartner.com/en/conferences/emea/hr-symposium-uk',
  hrcoreAcademy: 'https://www.hrcoreacademy.com',
  unleash: 'https://www.unleash.ai/events/unleash-paris',
  // Internal pages (already live on the site)
  supermarkets: '/lp/supermarkets',
  unicomm: '/customers/unicomm',
};
// ────────────────────────────────────────────────────────────────────────────

const C = {
  en: {
    metaTitle: 'Skillvue — The August Newsletter',
    tag: 'Newsletter',
    date: 'August 2026',
    readTime: '5 min read',
    title: 'Skills, new insights and where to meet us across Europe',
    subtitle: 'A new customer story with Gruppo Unicomm, a closer look at the workforce challenges in the retail industry, and our upcoming events across Europe.',
    intro: [
      'At Skillvue, as we head into a new season of events and conversations across Europe, we’re continuing to explore the themes reshaping how organisations measure and manage skills.',
      'From workforce transformation to talent management, and the need to make faster, more informed decisions in complex and distributed organisations, having **clear skills data** is becoming essential.',
      'In this edition, we bring together a new customer story with Gruppo Unicomm, a closer look at some of the key workforce challenges in the retail industry, and our upcoming events across Europe.',
    ],
    sections: [
      {
        img: 'unicomm',
        heading: 'Making skills visible at Gruppo Unicomm',
        body: [
          'When an organisation grows through acquisitions and manages a distributed network of stores, building a **common language around skills** becomes essential.',
          'In our latest customer story, Giuseppe Curci, HR Director at Gruppo Unicomm, shares how the company is turning large volumes of candidate and workforce data into insights that HR teams can prioritise and act on.',
        ],
        cta: { label: 'Read the full customer story', href: LINKS.unicomm, external: false },
      },
      {
        img: 'supermarkets',
        heading: 'What does a skills-based approach look like in the retail industry?',
        body: [
          'High turnover, hiring at scale, store manager pipelines, frontline development and post-M&A integration all make talent management particularly complex in the retail industry.',
          'We’ve brought together some of the sector’s key challenges and explored how **objective skills data** can support hiring, promotions, development and organisational transformation.',
          'The document focuses on four areas in particular: hiring and screening at scale, building pipelines for store managers and department heads, frontline development, and managing skills during acquisitions and reorganisations.',
        ],
        cta: { label: 'Explore the full retail overview', href: LINKS.supermarkets, external: false, newTab: true },
      },
      {
        img: 'events',
        heading: 'Where to meet us this autumn',
        body: [
          'Over the next two months, we’ll be in **several European cities**, joining CHROs, Talent leaders and HR professionals to discuss the topics reshaping the future of work.',
        ],
        events: [
          {
            name: 'Transformational CHRO Assembly',
            meta: 'Amsterdam, 9–10 September',
            text: 'We’ll join closed-door conversations with CHROs from some of Europe’s leading companies, discussing the trends and priorities transforming the role of HR.',
            cta: { label: 'Learn more', href: LINKS.chroAssembly, external: true },
          },
          {
            name: 'Fair Cultures',
            meta: 'Barcelona, 1 October',
            text: 'We’ll take part in stage sessions and private workshops exploring how skills can become a real infrastructure for the future of workforce planning.',
            cta: { label: 'Learn more', href: LINKS.fairCultures, external: true },
          },
          {
            name: 'Gartner HR Symposium/Xpo',
            meta: 'London, 6–8 October',
            text: 'Meet us at our stand to connect with the team and explore how objective skills data can support better decisions across hiring, internal mobility and development.',
            cta: { label: 'Learn more', href: LINKS.gartner, external: true },
          },
          {
            name: 'HRcoreACADEMY Summit',
            meta: 'Amsterdam, 7–8 October',
            text: 'Two days focused on Talent Transformation and Learning & Development, where we’ll also bring new perspectives on the changes reshaping skills, AI and talent management.',
            cta: { label: 'Learn more', href: LINKS.hrcoreAcademy, external: true },
          },
          {
            name: 'UNLEASH World',
            meta: 'Paris, 20–22 October',
            text: 'Come and meet us at our stand at one of Europe’s leading events dedicated to HR, technology and the future of work.',
            cta: { label: 'Learn more', href: LINKS.unleash, external: true },
          },
        ],
      },
    ],
    closing: {
      heading: 'Looking ahead to what’s next',
      body: [
        'The next few months will bring new conversations around **how skills, AI and workforce planning are evolving** across Europe.',
        'We’ll continue sharing what we’re learning from HR leaders, customers and the events where these discussions are taking place.',
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
      events: 'Where to find Skillvue in the coming months?',
      supermarkets: 'The roles of skills in the retail industry',
      unicomm: 'Giuseppe Curci, HR Director at Gruppo Unicomm',
    },
  },
  it: {
    metaTitle: 'Skillvue — La newsletter di agosto',
    tag: 'Newsletter',
    date: 'Agosto 2026',
    readTime: '5 min di lettura',
    title: 'Competenze, nuovi insight e dove incontrarci in Europa',
    subtitle: 'Una nuova customer story con Gruppo Unicomm, un approfondimento sulle sfide organizzative della GDO e i nostri prossimi eventi in Europa.',
    intro: [
      'In Skillvue, mentre entriamo in una nuova stagione di eventi e confronti in tutta Europa, continuiamo a esplorare i temi che stanno ridefinendo il modo in cui le organizzazioni misurano e gestiscono le competenze.',
      'Dalla trasformazione della forza lavoro al talent management, fino alla necessità di prendere decisioni più rapide e informate in organizzazioni complesse e distribuite, avere **dati chiari sulle competenze** è essenziale.',
      'In questa edizione raccogliamo una nuova customer story con Gruppo Unicomm, un approfondimento su alcune delle principali sfide organizzative della GDO e i nostri prossimi eventi in Europa.',
    ],
    sections: [
      {
        img: 'unicomm',
        heading: 'Rendere visibili le competenze in Gruppo Unicomm',
        body: [
          'Quando un’organizzazione cresce attraverso acquisizioni e gestisce una rete distribuita di punti vendita, costruire un **linguaggio comune sulle competenze** diventa essenziale.',
          'Nella nostra ultima customer story, Giuseppe Curci, Direttore Risorse Umane di Gruppo Unicomm, racconta come l’azienda stia trasformando grandi volumi di dati su candidati e popolazione aziendale in insight che i team HR possono prioritizzare e su cui agire.',
        ],
        cta: { label: 'Guarda la customer story', href: LINKS.unicomm, external: false },
      },
      {
        img: 'supermarkets',
        heading: 'Che cosa significa un approccio skills-based nei supermercati?',
        body: [
          'Turnover elevato, selezione su larga scala, pipeline per i direttori di punto vendita, sviluppo delle persone in prima linea e integrazione post-acquisizione rendono la gestione del talento particolarmente complessa nella GDO.',
          'Abbiamo raccolto alcune delle sfide chiave del settore e approfondito come **dati oggettivi sulle competenze** possano supportare selezione, promozioni, sviluppo e trasformazione organizzativa.',
          'Il documento si concentra in particolare su quattro ambiti: selezione e screening su larga scala, costruzione delle pipeline per direttori di punto vendita e capireparto, sviluppo delle persone in prima linea e gestione delle competenze durante acquisizioni e riorganizzazioni.',
        ],
        cta: { label: 'Esplora la panoramica sui supermercati', href: LINKS.supermarkets, external: false, newTab: true },
      },
      {
        img: 'events',
        heading: 'Dove incontrarci questo autunno',
        body: [
          'Nei prossimi due mesi saremo in **diverse città europee**, insieme a CHRO, Talent leader e professionisti HR, per confrontarci sui temi che stanno ridefinendo il futuro del lavoro.',
        ],
        events: [
          {
            name: 'Transformational CHRO Assembly',
            meta: 'Amsterdam, 9–10 settembre',
            text: 'Parteciperemo a confronti a porte chiuse con i CHRO di alcune delle principali aziende europee, per discutere i trend e le priorità che stanno trasformando il ruolo dell’HR.',
            cta: { label: 'Scopri di più', href: LINKS.chroAssembly, external: true },
          },
          {
            name: 'Fair Cultures',
            meta: 'Barcellona, 1 ottobre',
            text: 'Parteciperemo a sessioni sul palco e a workshop privati per esplorare come le competenze possano diventare una vera infrastruttura per il futuro del workforce planning.',
            cta: { label: 'Scopri di più', href: LINKS.fairCultures, external: true },
          },
          {
            name: 'Gartner HR Symposium/Xpo',
            meta: 'Londra, 6–8 ottobre',
            text: 'Vieni a trovarci al nostro stand per conoscere il team ed esplorare come dati oggettivi sulle competenze possano supportare decisioni migliori su selezione, mobilità interna e sviluppo.',
            cta: { label: 'Scopri di più', href: LINKS.gartner, external: true },
          },
          {
            name: 'HRcoreACADEMY Summit',
            meta: 'Amsterdam, 7–8 ottobre',
            text: 'Due giornate dedicate a Talent Transformation e Learning & Development, dove porteremo anche nuove prospettive sui cambiamenti che stanno ridefinendo competenze, AI e talent management.',
            cta: { label: 'Scopri di più', href: LINKS.hrcoreAcademy, external: true },
          },
          {
            name: 'UNLEASH World',
            meta: 'Parigi, 20–22 ottobre',
            text: 'Vieni a trovarci al nostro stand a uno dei principali eventi europei dedicati a HR, tecnologia e futuro del lavoro.',
            cta: { label: 'Scopri di più', href: LINKS.unleash, external: true },
          },
        ],
      },
    ],
    closing: {
      heading: 'Uno sguardo a ciò che verrà',
      body: [
        'I prossimi mesi porteranno nuovi confronti su **come competenze, AI e workforce planning stanno evolvendo** in tutta Europa.',
        'Continueremo a condividere ciò che impariamo dagli HR leader, dai nostri clienti e dagli eventi in cui questi temi vengono discussi.',
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
      events: 'Dove trovare Skillvue nei prossimi mesi?',
      supermarkets: 'Il ruolo delle competenze nella GDO',
      unicomm: 'Giuseppe Curci, Direttore Risorse Umane di Gruppo Unicomm',
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

function CtaLink({ label, href, newTab }) {
  return (
    <div className="mt-8">
      <a
        href={href}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="inline-flex items-center gap-2 rounded-full bg-[#4B4DF7] text-white text-[14px] font-semibold px-6 py-3.5 transition-colors duration-300 hover:bg-[#3133E7]"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

// One card per event. Lighter than the section pill CTA so five of them in a
// row don't overpower the page.
function EventCard({ event, localize }) {
  return (
    <div className="rounded-2xl border border-[#121212]/[0.08] bg-white px-6 py-6 md:px-7">
      <h3 className="text-[19px] font-semibold text-[#121212] tracking-[-0.01em]">{event.name}</h3>
      <p className="mt-1.5 text-[13px] font-semibold text-[#4B4DF7] tracking-[0.01em]">{event.meta}</p>
      <p className="mt-4 text-[16px] text-[#121212]/[0.7] leading-[1.8]">{renderRich(event.text)}</p>
      <a
        href={localize(event.cta.href)}
        {...(event.cta.external || event.cta.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#4B4DF7] transition-colors duration-300 hover:text-[#3133E7]"
      >
        {event.cta.label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export default function AugustNewsletter() {
  const router = useRouter();
  const { lang } = useLanguage();
  const isIt = lang === 'it';
  const t = isIt ? C.it : C.en;
  // A raw <a href> (unlike next/link) doesn't add the locale prefix, so without
  // this an IT reader following an internal link would land on the EN page.
  // /it/customers/:slug 308-redirects to /it/clienti/:slug, so point straight there.
  // An IMAGES entry is either one shared file or { en, it } when the artwork
  // carries baked-in copy.
  const imgSrc = (key) => { const v = IMAGES[key]; return typeof v === 'string' ? v : (isIt ? v.it : v.en); };
  const localize = (href)=>
    !isIt || !href.startsWith('/') ? href : `/it${href.replace(/^\/customers\//, '/clienti/')}`;

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
                <h2 className={`text-[26px] font-semibold text-[#121212] tracking-[-0.02em] ${s.img ? 'mb-1' : 'mb-5'}`}>{s.heading}</h2>
                {s.img && <Img src={imgSrc(s.img)} label={t.imgLabels[s.img]} soon={t.imgSoon} />}
                <div className="space-y-5">
                  {s.body.map((p, j) => <p key={j} className="text-[17px] text-[#121212]/[0.7] leading-[1.9]">{renderRich(p)}</p>)}
                </div>
                {s.events && (
                  <div className="mt-8 space-y-4">
                    {s.events.map((e, k) => <EventCard key={k} event={e} localize={localize} />)}
                  </div>
                )}
                {s.cta && <CtaLink label={s.cta.label} href={localize(s.cta.href)} newTab={s.cta.external || s.cta.newTab} />}
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
