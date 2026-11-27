import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { getLocale, getTranslations } from 'next-intl/server';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, ImageIcon } from 'lucide-react';
import { href, localizePath } from '@/i18n/routes';
import { HeroCopy } from '@/components/ui/hero-copy';
import { ClosingPanel } from '@/components/shared/ClosingPanel';

// ─── Fill these in when the assets/links are ready ──────────────────────────
// Empty string '' → a labelled dashed placeholder box renders instead.
// Put files in public/ as: /newsletter-november-<key>.<ext>
const IMAGES = {
  assess: { en: '/newsletter-november-assess-en.avif', it: '/newsletter-november-assess-it.avif' },
  forum: '/newsletter-november-forum.avif',
  adr: { en: '/newsletter-november-adr-en.avif', it: '/newsletter-november-adr-it.avif' },
  events: '/newsletter-november-events.avif',
};
// external links → full https URL; internal links → relative path ('/lp/...', '/customers/...')
const LINKS = {
  // Forum People & Culture
  forumHr: 'https://www.forumhr.it/',
  bianco: 'https://www.linkedin.com/in/frabianco/',
  grosset: 'https://www.linkedin.com/in/alexgrosset/',
  mazzocchi: 'https://www.linkedin.com/in/nicolo-mazzocchi-16a39215b/',
  luperi: 'https://www.linkedin.com/in/federico-luperi/',
  panelPost: 'https://www.linkedin.com/feed/update/urn:li:activity:7530551376788017152',
  // Market news sources
  sapTechwolf: 'https://news.sap.com/2026/10/sap-to-acquire-techwolf-evidence-based-work-age-of-ai/',
  pearsonWorkera: 'https://www.prnewswire.com/news-releases/pearson-acquires-workera-a-pioneer-in-ai-native-enterprise-assessment-and-skills-verification-302891786.html',
  // Events (LinkedIn posts)
  zurichPost: 'https://www.linkedin.com/feed/update/urn:li:activity:7524463266375286786',
  hrcTrendsPost: 'https://www.linkedin.com/feed/update/urn:li:activity:7526262702076403712',
  jobRetailPost: 'https://www.linkedin.com/feed/update/urn:li:activity:7521595703257874432',
  // Internal pages (already live on the site)
  assess: '/product/skillvue-assess',
  adr: '/customers/adr',
  // Landing page from the Instantly campaign "Measured vs Inferred - Wave 1"
  measuredVsInferred: '/lp/measured-vs-inferred-v2',
};
// Section anchors, in the order of `sections` in the catalogue. The email links
// to them, so they are part of the URL, not copy: the events anchor is
// localized because the Italian email links to #eventi.
const ANCHORS = ['assess', 'forum', 'adr', { en: 'events', it: 'eventi' }];
// ────────────────────────────────────────────────────────────────────────────


// Renders inline markers inside a plain string: **bold**, *italic*, and
// [label](linkKey) where linkKey is a LINKS entry. Any other [bracketed note]
// is left as visible text.
function renderRich(text, link) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([A-Za-z]+\))/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold text-[#121212]">{part.slice(2, -2)}</strong>;
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    const m = part.match(/^\[([^\]]+)\]\(([A-Za-z]+)\)$/);
    if (m && link) return link(m[1], m[2], i);
    return part;
  });
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
        className="type-button inline-flex items-center gap-2 rounded-full bg-[#4B4DF7] text-white px-6 py-4 transition-colors duration-300 hover:bg-[#3133E7]"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export default async function NovemberNewsletter() {
  const lang = await getLocale();
  const t = await getTranslations('blog.newsletter-november-2026');
  // An IMAGES entry is either one shared file or { en, it } when the artwork
  // carries baked-in copy.
  const imgSrc = (key) => { const v = IMAGES[key]; return typeof v === 'string' ? v : (v[lang] ?? v.en); };
  const anchor = (i) => { const a = ANCHORS[i]; return typeof a === 'string' ? a : a?.[lang] ?? a?.en; };
  // A raw <a href> (unlike next/link) does not add the locale prefix, and the
  // Italian slug is the registry's to know.
  const localize = (href) => localizePath(href, lang);
  const isExternal = (key) => /^https?:/.test(LINKS[key]);
  const inlineLink = (label, key, i) => (
    <a
      key={i}
      href={isExternal(key) ? LINKS[key] : localize(LINKS[key])}
      {...(isExternal(key) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="font-medium text-[#4B4DF7] underline underline-offset-2 transition-colors duration-300 hover:text-[#3133E7]"
    >
      {label}
    </a>
  );
  const rich = (text) => renderRich(text, inlineLink);
  // A blank line inside a string is a paragraph break, so a locale can split
  // a paragraph further without changing the array's shape.
  const paragraphs = (list) => list?.flatMap((p) => p.split('\n\n')).map((p, j) => <p key={j} className="type-body text-[#121212]/[0.7]">{rich(p)}</p>);
  const bullets = (items) => (
    <ul className="list-disc pl-6 space-y-1 marker:text-[#4B4DF7]">
      {items.map((item, k) => <li key={k} className="type-list text-[#121212]/[0.7]">{rich(item)}</li>)}
    </ul>
  );
  return (
    <>

      <Navbar />
      <main>
        {/* HERO — light (interim standard) */}
        <section className="section-light relative pt-[80px] overflow-hidden">
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 w-full py-16 lg:py-24">
            <Button asChild variant="tertiary" mode="light" className="mb-10">
              <a href={href('blog', lang)}><ArrowLeft aria-hidden />{t('back')}</a>
            </Button>
            <Reveal hero duration={0.7} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="type-caption inline-flex px-4 py-1.5 rounded-full font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08]">{t('tag')}</span>
                <span className="type-body-sm text-[#707070]">{t('date')}</span>
                <span className="type-body-sm text-[#707070] flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {t('readTime')}</span>
              </div>
              <HeroCopy>
                <h1 className="font-semibold text-[#121212] mb-6 text-[40px] md:text-[46px]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>{t('title')}</h1>
                <p className="type-body-lg hero-subtitle text-[#4B4B4B]">{t('subtitle')}</p>
              </HeroCopy>
            </Reveal>
          </div>
        </section>

        {/* BODY — light panel */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20">
            {/* Intro */}
            <Reveal y={20} duration={0.6} className="space-y-5">
              {paragraphs(t.raw('intro'))}
            </Reveal>

            {/* Sections */}
            {t.raw('sections').map((s, i) => (
              <Reveal y={20} key={i} id={anchor(i)} className="mt-16 pt-10 border-t border-[#121212]/[0.06] scroll-mt-24">
                <h2 className={`max-w-[880px] text-[26px] font-semibold text-[#121212] tracking-[-0.02em] ${s.img ? 'mb-1' : 'mb-5'}`}>{s.heading}</h2>
                {s.img && <Img src={imgSrc(s.img)} label={t.raw('imgLabels')[s.img]} soon={t('imgSoon')} />}
                <div className="space-y-5">
                  {paragraphs(s.body)}
                  {s.list && bullets(s.list)}
                  {paragraphs(s.bodyAfter)}
                </div>
                {s.parts?.map((part, j) => (
                  <div key={j} className="mt-10 space-y-5">
                    <h3 className="text-[20px] font-semibold text-[#121212] tracking-[-0.01em]">{part.heading}</h3>
                    {paragraphs(part.body)}
                    {part.list && bullets(part.list)}
                    {paragraphs(part.bodyAfter)}
                  </div>
                ))}
                {s.cta && <CtaLink label={s.cta.label} href={isExternal(s.cta.href) ? LINKS[s.cta.href] : localize(LINKS[s.cta.href])} newTab={isExternal(s.cta.href)} />}
              </Reveal>
            ))}

            {/* Closing */}
            <Reveal y={20} className="mt-16 pt-10 border-t border-[#121212]/[0.06]">
              <h2 className="max-w-[880px] text-[26px] font-semibold text-[#121212] tracking-[-0.02em] mb-4">{t('closing.heading')}</h2>
              <div className="space-y-5">
                {paragraphs(t.raw('closing.body'))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA: the shared light closing */}
        <ClosingPanel
          heading={<>{t('finalTitle')} <span>{t('finalTitleHighlight')}</span></>}
          body={t('finalBody')}
          cta={t('finalButton')}
          href={href('book-meeting', lang)}
        />
      <Footer />
      </main>
    </>
  );
}
