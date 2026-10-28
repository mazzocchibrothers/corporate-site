import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { getLocale, getTranslations } from 'next-intl/server';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, ImageIcon } from 'lucide-react';
import { href, localizePath } from '@/i18n/routes';
import { HeroCopy } from '@/components/ui/hero-copy';

// ─── Fill these in when the assets/links are ready ──────────────────────────
// Empty string '' → a labelled dashed placeholder box renders instead.
// Put files in public/ as: /newsletter-october-<key>.<ext>
const IMAGES = {
  topStartups: '/newsletter-october-top-startups.avif',
  roiCalculator: '/newsletter-october-roi-calculator.avif',
  events: '/newsletter-october-events.avif',
  easygenerator: '/newsletter-october-easygenerator.avif',
};
// external links → full https URL; internal links → relative path ('/lp/...', '/customers/...')
const LINKS = {
  topStartups: 'https://www.linkedin.com/feed/update/urn:li:activity:7516045786133139456',
  gartner: 'https://www.linkedin.com/feed/update/urn:li:activity:7513969065657274368',
  hrCoreAcademy: 'https://www.linkedin.com/feed/update/urn:li:activity:7513632747572142081',
  unleash: 'https://www.linkedin.com/feed/update/urn:li:activity:7518647797596811264',
  // Internal pages (already live on the site)
  roiCalculator: '/resources/roi-calculator',
  partners: '/customers/partners',
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
  if (src) return <img src={src} alt={label} loading="lazy" decoding="async" sizes="(min-width: 768px) 780px, 100vw" className="block w-full rounded-2xl my-8" />;
  return (
    <div className="my-8 w-full rounded-2xl flex flex-col items-center justify-center gap-2 text-center px-6"
      style={{ aspectRatio: '16 / 10', background: 'linear-gradient(135deg, #ece9fb 0%, #f7e6dc 100%)', border: '1px dashed rgba(75,77,247,0.25)' }}>
      <ImageIcon className="h-7 w-7 text-[#4B4DF7]/50" />
      <span className="type-body-sm font-semibold text-[#4B4DF7]/70">{label}</span>
      <span className="type-eyebrow text-[#121212]/25">{soon}</span>
    </div>
  );
}

function CtaLink({ label, href, newTab }) {
  return (
    <div className="mt-8">
      <a
        href={href}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="type-button inline-flex items-center gap-2 rounded-full bg-[#4B4DF7] text-white font-medium px-6 py-[18px] transition-colors duration-300 hover:bg-[#3133E7]"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export default async function OctoberNewsletter() {
  const lang = await getLocale();
  const t = await getTranslations('blog.newsletter-october-2026');
  // An IMAGES entry is either one shared file or { en, it } when the artwork
  // carries baked-in copy.
  const imgSrc = (key) => { const v = IMAGES[key]; return typeof v === 'string' ? v : (v[lang] ?? v.en); };
  // A raw <a href> (unlike next/link) does not add the locale prefix, and the
  // Italian slug is the registry's to know.
  const localize = (href) => localizePath(href, lang);

  return (
    <>

      <Navbar />
      <main>
        {/* HERO — dark, on-brand */}
        <section className="relative pt-[80px] overflow-hidden" style={{ background: '#08080c' }}>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(75,77,247,0.18) 0%, rgba(75,77,247,0) 60%)' }} />
            <div className="absolute top-10 right-[-200px] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,86,86,0.10) 0%, rgba(255,86,86,0) 60%)' }} />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 w-full py-16 lg:py-24">
            <Button asChild variant="tertiary" mode="dark" className="mb-10">
              <a href={href('blog', lang)}><ArrowLeft aria-hidden />{t('back')}</a>
            </Button>
            <Reveal duration={0.7} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="type-caption inline-flex px-4 py-1.5 rounded-full font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08]">{t('tag')}</span>
                <span className="type-body-sm text-white/35">{t('date')}</span>
                <span className="type-body-sm text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {t('readTime')}</span>
              </div>
              <HeroCopy>
                <h1 className="font-semibold text-white/95 mb-6 text-[40px] md:text-[58px]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>{t('title')}</h1>
                <p className="type-body-lg hero-subtitle text-white/[0.5]">{t('subtitle')}</p>
              </HeroCopy>
            </Reveal>
          </div>
        </section>

        {/* BODY — light panel */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20">
            {/* Intro */}
            <Reveal y={20} duration={0.6} className="space-y-5">
              {t.raw('intro').map((p, i) => <p key={i} className="type-body text-[#121212]/[0.7]">{renderRich(p)}</p>)}
              {t.has('introList') && (
                <div>
                  <p className="type-body-bold text-[#121212]">{t('introList.label')}</p>
                  <ul className="mt-2 list-disc pl-6 space-y-1 marker:text-[#4B4DF7]">
                    {t.raw('introList.items').map((item, i) => <li key={i} className="type-list text-[#121212]/[0.7]">{renderRich(item)}</li>)}
                  </ul>
                </div>
              )}
            </Reveal>

            {/* Sections */}
            {t.raw('sections').map((s, i) => (
              <Reveal y={20} key={i} className="mt-16 pt-10 border-t border-[#121212]/[0.06]">
                <h2 className={`max-w-[880px] text-[26px] font-semibold text-[#121212] tracking-[-0.02em] ${s.img ? 'mb-1' : 'mb-5'}`}>{s.heading}</h2>
                {s.img && <Img src={imgSrc(s.img)} label={t.raw('imgLabels')[s.img]} soon={t('imgSoon')} />}
                <div className="space-y-5">
                  {s.body.map((p, j) => <p key={j} className="type-body text-[#121212]/[0.7]">{renderRich(p)}</p>)}
                  {s.list && (
                    <ul className={s.listBare ? 'space-y-1' : 'list-disc pl-6 space-y-1 marker:text-[#4B4DF7]'}>
                      {s.list.map((item, k) => <li key={k} className="type-list text-[#121212]/[0.7]">{renderRich(item)}</li>)}
                    </ul>
                  )}
                  {s.bodyAfter?.map((p, j) => <p key={j} className="type-body text-[#121212]/[0.7]">{renderRich(p)}</p>)}
                </div>
                {s.links && (
                  <div className="mt-8 flex flex-col gap-3">
                    {s.links.map((l, k) => (
                      <a key={k} href={LINKS[l.href]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#4B4DF7] transition-colors duration-300 hover:text-[#3133E7]">
                        {l.label} <ArrowRight className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                )}
                {s.cta && <CtaLink label={s.cta.label} href={localize(LINKS[s.cta.href])} newTab={s.cta.external || s.cta.newTab} />}
              </Reveal>
            ))}

            {/* Closing */}
            <Reveal y={20} className="mt-16 pt-10 border-t border-[#121212]/[0.06]">
              <h2 className="max-w-[880px] text-[26px] font-semibold text-[#121212] tracking-[-0.02em] mb-4">{t('closing.heading')}</h2>
              <div className="space-y-5">
                {t.raw('closing.body').map((p, j) => <p key={j} className="type-body text-[#121212]/[0.7]">{renderRich(p)}</p>)}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA — dark */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24" style={{ background: '#08080c' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 text-center">
            <Reveal duration={0.7}>
              <span className="type-eyebrow text-[#6B7DFF] mb-6 block">{t('finalKicker')}</span>
              <h2 className="max-w-[880px] text-[clamp(2rem,4vw,3rem)] font-semibold text-white/90 mb-5 leading-[1.1] mx-auto tracking-[-0.02em]">
                {t('finalTitle')} <span className="gradient-text">{t('finalTitleHighlight')}</span>
              </h2>
              <p className="max-w-[880px] type-body text-white/[0.4] mb-12 mx-auto">{t('finalBody')}</p>
              <Button asChild variant="primary" mode="dark">
                <a href={href('book-meeting', lang)}>{t('finalButton')}<ArrowRight aria-hidden /></a>
              </Button>
            </Reveal>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}
