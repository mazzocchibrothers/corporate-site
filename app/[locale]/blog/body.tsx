'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/ui/reveal';
import { HeroVideo } from '@/components/ui/hero-video';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { ArrowDown, ArrowRight, ChevronDown, ListFilter, Newspaper } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';
import { HeroCopy } from '@/components/ui/hero-copy';

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
  { id: 'newsletter-october-2026', image: '/newsletter-october-cover.avif' },
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

  // The topics are the cards' own tags, so a topic with no article cannot be
  // offered. The tag is copy, so the filter holds the localized label — a
  // locale switch remounts the page and resets it to 'all'.
  const topics = Array.from(new Set(ARTICLES.map((a) => t(`articles.${a.id}.tag`))));
  const [activeTopic, setActiveTopic] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);

  // Closing gives focus back to the trigger, as on the partners page — an
  // option that unmounts under a keyboard user would drop focus to <body>.
  const closeFilter = (restoreFocus: boolean) => {
    setFilterOpen(false);
    if (restoreFocus) filterTriggerRef.current?.focus();
  };

  useEffect(() => {
    if (!filterOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeFilter(true); };
    const onClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [filterOpen]);

  const filteredArticles = activeTopic === 'all' ? ARTICLES : ARTICLES.filter((a) => t(`articles.${a.id}.tag`) === activeTopic);

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
        <div className="aspect-video overflow-hidden">
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
            <span className="type-caption inline-flex rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-0.5 text-[#4B4B4B] whitespace-nowrap">
              {t(`articles.${article.id}.tag`)}
            </span>
            <span className="type-caption text-[#121212]/30">{t(`articles.${article.id}.date`)}</span>
          </div>
          <h3 className="text-[16px] md:text-[18px] font-semibold text-[#121212] leading-snug mb-3 md:mb-4">
            {t(`articles.${article.id}.title`)}
          </h3>
          <span className="type-button font-medium text-[#4B4DF7] flex items-center gap-1.5 mt-auto md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-300">
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
        className="group rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04] h-full flex flex-col"
        data-testid={`newsletter-${newsletter.id}`}
      >
        <div className="aspect-video overflow-hidden">
          {!newsletter.image ? (
            <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700" style={{ background: 'linear-gradient(135deg, #cdc6f5 0%, #e6d5ea 55%, #f8ddc9 100%)' }}>
              <Newspaper className="h-12 w-12 text-[#2a2350]/70" strokeWidth={1.5} />
            </div>
          ) : (
            <img src={newsletter.image} alt={t(`articles.${newsletter.id}.title`)} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          )}
        </div>
        <div className="p-5 md:p-7 flex-1 flex flex-col">
          <p className="type-body-sm text-[#121212]/60 mb-3 md:mb-4">{month}, {year}</p>
          <h3 className="text-[16px] md:text-[18px] font-semibold text-[#121212] leading-snug mb-3 md:mb-4">
            {t(`articles.${newsletter.id}.title`)}
          </h3>
          {/* Touch has no hover, so mobile shows the link always; desktop
              brings it in on hover. */}
          <span className="type-button text-[#4B4DF7] flex items-center gap-1.5 mt-auto md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-300">
            {t('text')} <ArrowRight className="h-4 w-4" />
          </span>
        </div>
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
                <HeroCopy>
                  <h1
                    className="font-semibold text-white/95 mb-8 text-[48px] md:text-[58px]"
                    style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
                  >{t.rich('heading', {
                    br: () => <br />,
                    span: (chunks) => <span className="gradient-text">{chunks}</span>,
                  })}</h1>
                  <p className="type-body-lg hero-subtitle text-white/[0.45] mb-12">{t('body')}</p>
                </HeroCopy>
                <Button asChild variant="secondary" mode="dark" className="group">
                  <a
                    href="#articles"
                    onClick={(e) => { e.preventDefault(); document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    <span>{t('cta')}</span>
                    <ArrowDown aria-hidden="true" className="transition-transform duration-500 group-hover:translate-y-0.5" />
                  </a>
                </Button>
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
                  <p className="type-eyebrow text-[#6B7DFF]">{t('newsletterBanner.eyebrow')}</p>
                  <h2 className="max-w-[880px] mt-4 text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.03em] text-white">
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
            <Reveal y={20} duration={0.6} className="flex flex-col gap-6 mb-8 md:mb-12">
              <h2 className="max-w-[880px] text-[clamp(1.5rem,4vw,3rem)] font-semibold text-[#121212] tracking-[-0.02em]">{t('heading2')}</h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="type-body-sm inline-flex items-center gap-2 text-[#4B4B4B]">
                  <ListFilter className="h-4 w-4" aria-hidden="true" />
                  {t('articleFilters.filterLabel')}
                </span>
                <div className="relative" ref={filterRef}>
                  <button
                    ref={filterTriggerRef}
                    type="button"
                    onClick={() => setFilterOpen((o) => !o)}
                    aria-haspopup="listbox"
                    aria-expanded={filterOpen}
                    data-testid="blog-topic-filter"
                    className="type-body-sm flex items-center gap-2.5 rounded-full border border-[#EBEBEB] bg-white pl-4 pr-3 py-2.5 font-semibold text-[#1E1E1E] hover:border-[#1E1E1E]/20 transition-colors duration-300"
                  >
                    <span className="type-eyebrow font-medium text-[#4B4B4B]">{t('articleFilters.topicLabel')}</span>
                    <span>{activeTopic === 'all' ? t('articleFilters.all') : activeTopic}</span>
                    <ChevronDown className="h-4 w-4 text-[#4B4B4B]" aria-hidden="true" />
                  </button>
                  {filterOpen && (
                    <div role="listbox" className="absolute z-20 mt-2 min-w-[200px] rounded-xl border border-[#EBEBEB] bg-white py-2 shadow-xl">
                      {['all', ...topics].map((f) => (
                        <button
                          key={f}
                          type="button"
                          role="option"
                          aria-selected={activeTopic === f}
                          onClick={() => { setActiveTopic(f); closeFilter(true); }}
                          className={`type-body-sm block w-full text-left px-4 py-2 whitespace-nowrap transition-colors duration-200 ${activeTopic === f ? 'text-[#1E1E1E] bg-[#F7F7F7]' : 'text-[#4B4B4B] hover:text-[#1E1E1E] hover:bg-[#F7F7F7]'}`}
                        >
                          {f === 'all' ? t('articleFilters.all') : f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="type-body-sm ml-auto text-[#4B4B4B]">{t('articleFilters.count', { count: filteredArticles.length })}</span>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, i) => renderArticle(article, i))}
            </div>
          </div>
        </section>

        {/* 4. Bottom CTA */}
        <section className="relative py-20 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
            <Reveal
              duration={0.7}
              className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm px-6 py-14 md:px-16 md:py-24 text-center"
            >
              <h2 className="max-w-[880px] text-[clamp(1.8rem,4vw,3rem)] font-semibold text-white/90 mb-5 leading-[1.15] mx-auto tracking-[-0.02em]">{t('heading3')}</h2>
              <p className="max-w-[880px] type-body text-white/[0.4] mb-10 mx-auto">{t('body2')}</p>
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
