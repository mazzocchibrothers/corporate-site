'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { HeroVideo } from '@/components/ui/hero-video';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { ArrowRight, ChevronDown, Newspaper } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

// Structure: the card's image and where it links. The title, the date and the
// tag are copy and live in messages/ under blog.articles, keyed on the same
// slug as the post itself — so the card and the page it opens are neighbours in
// the catalogue instead of an `id: 11` in a module array.
const NEWSLETTERS = [
  { id: 'newsletter-august-2026', image: '/newsletter-august-cover.avif', href: '/blog/newsletter-august-2026' },
  { id: 'newsletter-july-2026', image: '/newsletter-july-cover.avif', href: '/blog/newsletter-july-2026' },
];

const ARTICLES = [
  { id: 'attitude-vs-competence', image: '/covers/blog-attitude-vs-competence.avif', href: '/blog/attitude-vs-competence' },
  { id: 'recruitment-biases', image: '/covers/blog-recruitment-biases.avif', href: '/blog/recruitment-biases' },
  { id: 'negotiation-techniques', image: '/covers/blog-negotiation-techniques.avif', href: '/blog/negotiation-techniques' },
  { id: 'accountability', image: '/covers/blog-accountability.avif', href: '/blog/accountability' },
  { id: 'critical-thinking', image: '/covers/blog-critical-thinking.avif', href: '/blog/critical-thinking' },
  { id: 'corporate-onboarding', image: '/covers/blog-corporate-onboarding.avif', href: '/blog/corporate-onboarding' },
  { id: 'managerial-skills', image: '/covers/blog-managerial-skills.avif', href: '/blog/managerial-skills' },
  { id: 'social-skills', image: '/covers/blog-social-skills.avif', href: '/blog/social-skills' },
  { id: 'talent-acquisition', image: '/covers/blog-talent-acquisition.avif', href: '/blog/talent-acquisition' },
];


export default function BlogPage() {
  const lang = useLocale();
  const t = useTranslations('blog');
  const router = useRouter();
  const renderArticle = (article, i) => {
    return (
      <Reveal
        as="article"
        y={20}
        delay={Math.min(i * 0.06, 0.4)}
        key={article.id}
        className="group rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04] h-full flex flex-col"
        data-testid={`blog-article-${article.id}`}
        onClick={() => { if (article.href) { router.push(article.href); window.scrollTo(0, 0); } }}
      >
        <div className="aspect-[16/10] overflow-hidden">
          {!article.image ? (
            <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700" style={{ background: 'linear-gradient(135deg, #cdc6f5 0%, #e6d5ea 55%, #f8ddc9 100%)' }}>
              <Newspaper className="h-12 w-12 text-[#2a2350]/70" strokeWidth={1.5} />
            </div>
          ) : (
            <img src={article.image} alt={t(`articles.${article.id}.title`)} loading="lazy" decoding="async" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          )}
        </div>
        <div className="p-5 md:p-7 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.04] tracking-wide">
              {t(`articles.${article.id}.tag`)}
            </span>
            <span className="text-[12px] text-[#121212]/30">{t(`articles.${article.id}.date`)}</span>
          </div>
          <h3 className="text-[16px] md:text-[18px] font-semibold text-[#121212] leading-snug mb-3 md:mb-4">
            {t(`articles.${article.id}.title`)}
          </h3>
          <span className="text-[13px] font-semibold text-[#4B4DF7] flex items-center gap-1.5 mt-auto md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
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
                <h1
                  className="font-semibold text-white/95 mb-8 text-[48px] md:text-[64px]"
                  style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}
                >{t.rich('heading', {
                  br: () => <br />,
                  span: (chunks) => <span className="gradient-text">{chunks}</span>,
                })}</h1>
                <p className="text-[20px] text-white/[0.45] leading-[1.75] max-w-xl mb-12" style={{ fontWeight: 300 }}>{t('body')}</p>
                <Button asChild variant="tertiary" mode="dark" icon={null}>
                  <a
                    href="#articles"
                    onClick={(e) => { e.preventDefault(); document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="group inline-flex items-center gap-3"
                  >
                    <span className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:border-white/[0.25] transition-all duration-300">
                      <ChevronDown className="!h-4 !w-4" />
                    </span>
                    {t('cta')}
                  </a>
                </Button>
              </Reveal>
              <HeroVideo
                poster="/videos/blog-hero-showcase-poster.jpg"
                webmSrc="/videos/blog-hero-showcase.webm"
                mp4Src="/videos/blog-hero-showcase.mp4"
                className="flex justify-center lg:col-span-5"
                videoClassName="w-full max-w-[380px] h-auto rounded-[32px]"
              />
            </div>
          </div>
        </section>

        {/* 2. Newsletters */}
        <section id="articles" className="section-breathe">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-20 lg:py-28">
            <Reveal y={20} duration={0.6} className="mb-8 md:mb-12">
              <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-semibold text-[#121212] tracking-[-0.02em]">{t('headingNewsletters')}</h2>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {NEWSLETTERS.map((article, i) => renderArticle(article, i))}
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
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold text-white/90 mb-5 leading-[1.15] max-w-2xl mx-auto tracking-[-0.02em]">{t('heading3')}</h2>
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
