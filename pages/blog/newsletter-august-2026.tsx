// @ts-nocheck
import React from 'react';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, ImageIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';
import { href, localizePath } from '@/i18n/routes';
import { messagesFor } from '@/i18n/messages';

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
        href={localize(LINKS[event.cta.href])}
        {...(event.cta.external || event.cta.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#4B4DF7] transition-colors duration-300 hover:text-[#3133E7]"
      >
        {event.cta.label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('blog/newsletter-august-2026');

export default function AugustNewsletter() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = useTranslations('blog.newsletter-august-2026');
  // An IMAGES entry is either one shared file or { en, it } when the artwork
  // carries baked-in copy.
  const imgSrc = (key) => { const v = IMAGES[key]; return typeof v === 'string' ? v : (v[lang] ?? v.en); };
  // A raw <a href> (unlike next/link) does not add the locale prefix, and the
  // Italian slug is the registry's to know.
  const localize = (href) => localizePath(href, lang);

  return (
    <>
      <Head>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('subtitle')} />
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
              {t('back')}
            </Button>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">{t('tag')}</span>
                <span className="text-[13px] text-white/35">{t('date')}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {t('readTime')}</span>
              </div>
              <h1 className="font-semibold text-white/95 mb-6 text-[40px] md:text-[60px]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>{t('title')}</h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>{t('subtitle')}</p>
            </motion.div>
          </div>
        </section>

        {/* BODY — light panel */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20">
            {/* Intro */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-5">
              {t.raw('intro').map((p, i) => <p key={i} className="text-[17px] text-[#121212]/[0.7] leading-[1.9]">{renderRich(p)}</p>)}
            </motion.div>

            {/* Sections */}
            {t.raw('sections').map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 pt-10 border-t border-[#121212]/[0.06]">
                <h2 className={`text-[26px] font-semibold text-[#121212] tracking-[-0.02em] ${s.img ? 'mb-1' : 'mb-5'}`}>{s.heading}</h2>
                {s.img && <Img src={imgSrc(s.img)} label={t.raw('imgLabels')[s.img]} soon={t('imgSoon')} />}
                <div className="space-y-5">
                  {s.body.map((p, j) => <p key={j} className="text-[17px] text-[#121212]/[0.7] leading-[1.9]">{renderRich(p)}</p>)}
                </div>
                {s.events && (
                  <div className="mt-8 space-y-4">
                    {s.events.map((e, k) => <EventCard key={k} event={e} localize={localize} />)}
                  </div>
                )}
                {s.cta && <CtaLink label={s.cta.label} href={localize(LINKS[s.cta.href])} newTab={s.cta.external || s.cta.newTab} />}
              </motion.div>
            ))}

            {/* Closing */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 pt-10 border-t border-[#121212]/[0.06]">
              <h2 className="text-[26px] font-semibold text-[#121212] tracking-[-0.02em] mb-4">{t('closing.heading')}</h2>
              <div className="space-y-5">
                {t.raw('closing.body').map((p, j) => <p key={j} className="text-[17px] text-[#121212]/[0.7] leading-[1.9]">{renderRich(p)}</p>)}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA — dark */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24" style={{ background: '#08080c' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{t('finalKicker')}</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {t('finalTitle')} <span className="gradient-text">{t('finalTitleHighlight')}</span>
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">{t('finalBody')}</p>
              <Button variant="primary" mode="dark" onClick={() => { router.push(href('book-meeting', lang)); window.scrollTo(0, 0); }}>
                {t('finalButton')}
              </Button>
            </motion.div>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}
