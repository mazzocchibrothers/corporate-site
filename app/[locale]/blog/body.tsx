'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { HeroVideo } from '@/components/ui/hero-video';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { ArrowDown, ArrowRight, Newspaper } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

// Structure: the card's image. The title, the date and the tag are copy and
// live in messages/ under blog.articles, keyed on the same slug as the post
// itself — so the card and the page it opens are neighbours in the catalogue
// instead of an `id: 11` in a module array. The link is the registry's
// `blog/<id>` route, localized by href().
//
// Each card is an <a>, not a clickable <article>: a real link is reachable with
// Tab, announced as a link by screen readers, and opens in a new tab on
// cmd/middle-click.
const NEWSLETTERS = [
  { id: 'newsletter-september-2026', image: '/newsletter-september-cover.avif' },
  { id: 'newsletter-august-2026', image: '/newsletter-august-cover.avif' },
  { id: 'newsletter-july-2026', image: '/newsletter-july-cover.avif' },
];

const ARTICLES = [
  { id: 'attitude-vs-competence', image: '/covers/blog-attitude-vs-competence.avif' },
  { id: 'recruitment-biases', image: '/covers/blog-recruitment-biases.avif' },
  { id: 'negotiation-techniques', image: '/covers/blog-negotiation-techniques.avif' },
  { id: 'accountability', image: '/covers/blog-accountability.avif' },
  { id: 'critical-thinking', image: '/covers/blog-critical-thinking.avif' },
  { id: 'corporate-onboarding', image: '/covers/blog-corporate-onboarding.avif' },
  { id: 'managerial-skills', image: '/covers/blog-managerial-skills.avif' },
  { id: 'social-skills', image: '/covers/blog-social-skills.avif' },
  { id: 'talent-acquisition', image: '/covers/blog-talent-acquisition.avif' },
];

export default function BlogPage() {
  const lang = useLocale();
  const t = useTranslations('blog');
  const router = useRouter();
  const renderArticle = (article, i) => {
    return (
      <Reveal
        as="a"
        y={20}
        delay={Math.min(i * 0.06, 0.4)}
        key={article.id}
        href={href(`blog/${article.id}`, lang)}
        className="group rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04] h-full flex flex-col"
        data-testid={`blog-article-${article.id}`}
      >
        <div className="aspect-[16/10] overflow-hidden">
          {!article.image ? (
            <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700" style={{ background: 'linear-gradient(135deg, #cdc6f5 0%, #e6d5ea 55%, #f8ddc9 100%)' }}>
              <Newspaper className="h-12 w-12 text-[#2a2350]/70" strokeWidth={1.5} />
            </div>
          ) : (
            <img src={article.image} alt={t(`articles.${article.id}.title`)} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          )}
        </div>
        <div className="p-5 md:p-7 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <span className="inline-flex rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-0.5 text-[12px] text-[#4B4B4B] whitespace-nowrap">
              {t(`articles.${article.id}.tag`)}
            </span>
            <span className="text-[12px] text-[#121212]/30">{t(`articles.${article.id}.date`)}</span>
          </div>
          <h3 className="text-[16px] md:text-[18px] font-semibold text-[#121212] leading-snug mb-3 md:mb-4">
            {t(`articles.${article.id}.title`)}
          </h3>
          <span className="text-[15px] font-medium text-[#4B4DF7] flex items-center gap-1.5 mt-auto md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-300">
            {t('text')} <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Reveal>
    );
  };

  const renderNewsletter = (newsletter, i) => {
    const [month, year] = t(`articles.${newsletter.id}.date`).split(' ');
    return (
      <Reveal
        as="a"
        y={20}
        delay={Math.min(i * 0.06, 0.4)}
        key={newsletter.id}
        href={href(`blog/${newsletter.id}`, lang)}
        className="group relative block aspect-[16/10] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#4B4DF7]/[0.08]"
        data-testid={`newsletter-${newsletter.id}`}
      >
        {!newsletter.image ? (
          <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700" style={{ background: 'linear-gradient(135deg, #cdc6f5 0%, #e6d5ea 55%, #f8ddc9 100%)' }}>
            <Newspaper className="h-12 w-12 text-[#2a2350]/70" strokeWidth={1.5} />
          </div>
        ) : (
          <img src={newsletter.image} alt={t(`articles.${newsletter.id}.title`)} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        )}
        {/* The date sits on the cover, so shade its lower edge — a cover's
            own bottom is often a pale shirt or a lit wall. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2a2350]/75 via-[#2a2350]/10 via-45% to-transparent" />
        <p className="absolute bottom-5 left-5 md:bottom-6 md:left-6 text-[22px] md:text-[24px] font-semibold leading-none tracking-[-0.01em] text-white">{month}, {year}</p>
        {/* The arrow says the card opens. Touch has no hover, so mobile shows
            it always; desktop brings it in on hover. */}
        <ArrowRight aria-hidden="true" className="absolute bottom-5 right-5 h-6 w-6 text-white transition-all duration-300 md:bottom-6 md:right-6 md:-translate-x-1 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:group-focus-visible:translate-x-0 md:group-focus-visible:opacity-100" strokeWidth={2} />
      </Reveal>
    );
  };

  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero */}
        <section className="relative pt-[80px] min-h-screen flex items-center">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-0">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              <Reveal duration={0.7} className="lg:col-span-7">
                <h1
                  className="font-semibold text-white/95 mb-8 text-[48px] md:text-[64px]"
                  style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}
                >{t.rich('heading', {
                  br: () => <br />,
                  span: (chunks) => <span className="gradient-text">{chunks}</span>,
                })}</h1>
                <p className="text-[20px] text-white/[0.45] leading-[1.75] max-w-xl mb-12" style={{ fontWeight: 300 }}>{t('body')}</p>
                <a
                  href="#articles"
                  onClick={(e) => { e.preventDefault(); document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group inline-flex items-center gap-4 px-8 py-5 text-[15px] font-medium tracking-wide text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500"
                >
                  <span>{t('cta')}</span>
                  <ArrowDown className="h-4 w-4 text-white/30 group-hover:text-[#9B9DFB] group-hover:translate-y-1 transition-all duration-500" strokeWidth={2} />
                </a>
              </Reveal>
              <HeroVideo
                poster="/videos/blog-hero-showcase-poster.jpg"
                webmSrc="/videos/blog-hero-showcase.webm"
                mp4Src="/videos/blog-hero-showcase.mp4"
                className="flex justify-center lg:col-span-5"
                videoClassName="w-full max-w-[360px] h-auto rounded-[32px]"
              />
            </div>
          </div>
        </section>

        {/* 2. Newsletters */}
        <section id="articles" className="section-breathe">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-20 lg:py-28">
            <Reveal y={20} duration={0.6} className="mb-10 md:mb-14">
              <div className="relative overflow-hidden rounded-3xl bg-[#030101] flex flex-col md:flex-row md:items-stretch justify-between gap-2 md:gap-8">
                <div className="relative z-10 flex flex-col justify-center px-8 py-10 md:px-14 md:py-14 md:flex-[38]">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#9B9DFB]">{t('newsletterBanner.eyebrow')}</p>
                  <h2 className="mt-4 text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.03em] text-white">
                    {t('newsletterBanner.title')}
                  </h2>
                </div>
                {/* 32:15, not the video's 16:9: the box is shorter than the
                    frame at the same width, so object-cover keeps the video
                    at full width and trims only the empty band above and
                    below the shape — cropped, never scaled down. */}
                <div className="relative z-10 mb-6 aspect-[32/15] w-full md:mb-0 md:flex-[62]">
                  <HeroVideo
                    poster="/videos/newsletter-signal-poster.jpg"
                    webmSrc="/videos/newsletter-signal.webm"
                    mp4Src="/videos/newsletter-signal.mp4"
                    className="absolute inset-0"
                    videoClassName="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {NEWSLETTERS.map((newsletter, i) => renderNewsletter(newsletter, i))}
            </div>
          </div>
        </section>

        {/* 3. All Articles */}
        <section className="section-breathe">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 pb-20 lg:pb-28">
            <Reveal y={20} duration={0.6} className="mb-8 md:mb-12">
              <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-semibold text-[#121212] tracking-[-0.02em]">{t('heading2')}</h2>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ARTICLES.map((article, i) => renderArticle(article, i))}
            </div>
          </div>
        </section>

        {/* 4. Bottom CTA */}
        <section className="relative py-20 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <Reveal
              duration={0.7}
              className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.05] backdrop-blur-sm px-8 py-16 md:px-16 md:py-20 text-center"
            >
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold text-white/90 mb-5 leading-[1.15] max-w-2xl mx-auto tracking-[-0.02em]">{t('heading3')}</h2>
              <p className="text-[16px] text-white/[0.4] mb-10 max-w-xl mx-auto leading-[1.7]">{t('body2')}</p>
              <Button
                onClick={() => { router.push(href('book-meeting', lang)); window.scrollTo(0, 0); }}
                variant="primary"
                mode="dark"
              >{t('cta2')}</Button>
            </Reveal>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}
