// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
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
const ARTICLES = [
  { id: 'newsletter-august-2026', image: '/newsletter-august-cover.avif', href: '/blog/newsletter-august-2026' },
  { id: 'newsletter-july-2026', image: '/newsletter-july-cover.avif', href: '/blog/newsletter-july-2026' },
  { id: 'attitude-vs-competence', image: 'https://images.unsplash.com/photo-1713865469900-d12502a39875?w=600&h=400&fit=crop', href: '/blog/attitude-vs-competence' },
  { id: 'recruitment-biases', image: 'https://images.unsplash.com/photo-1758519288480-1489c17b1519?w=600&h=400&fit=crop', href: '/blog/recruitment-biases' },
  { id: 'negotiation-techniques', image: 'https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?w=600&h=400&fit=crop', href: '/blog/negotiation-techniques' },
  { id: 'accountability', image: 'https://images.unsplash.com/photo-1545005785-a4a5554b8efe?w=600&h=400&fit=crop', href: '/blog/accountability' },
  { id: 'critical-thinking', image: 'https://images.unsplash.com/photo-1685541088069-66baf0b2d753?w=600&h=400&fit=crop', href: '/blog/critical-thinking' },
  { id: 'corporate-onboarding', image: 'https://images.unsplash.com/photo-1758519288548-046187014c85?w=600&h=400&fit=crop', href: '/blog/corporate-onboarding' },
  { id: 'managerial-skills', image: 'https://images.unsplash.com/photo-1752650735509-58f11eaa2e10?w=600&h=400&fit=crop', href: '/blog/managerial-skills' },
  { id: 'social-skills', image: 'https://images.unsplash.com/photo-1544477989-b64060e53f36?w=600&h=400&fit=crop', href: '/blog/social-skills' },
  { id: 'talent-acquisition', image: 'https://images.unsplash.com/photo-1726842172813-55c6e284f8b5?w=600&h=400&fit=crop', href: '/blog/talent-acquisition' },
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
            <img src={article.image} alt={t(`articles.${article.id}.title`)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
            <Reveal duration={0.7}>
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.2em] uppercase mb-8 block">{t('text2')}</span>
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
          </div>
        </section>

        {/* 2. Article Grid */}
        <section id="articles" className="section-breathe">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-20 lg:py-28">
            <Reveal y={20} duration={0.6} className="mb-8 md:mb-12">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-[#121212] tracking-[-0.02em]">{t('heading2')}</h2>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ARTICLES.map((article, i) => renderArticle(article, i))}
            </div>
          </div>
        </section>

        {/* 3. Bottom CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <Reveal duration={0.7}>
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
