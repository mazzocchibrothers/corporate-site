'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { ArrowRight } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { whitepapers } from '@/data/whitepapers';
import { onepagers } from '@/data/onepagers';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';



export default function InsightsPage() {
  const lang = useLocale();
  const t = useTranslations('resources.insights');
  const router = useRouter();
  const labels = (key: string) => t(`filters.${key}`);

  const published = whitepapers
    .filter(w => w.published && w.languageAvailability.includes(lang))
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  const publishedOnePagers = onepagers
    .filter(w => w.published && w.languageAvailability.includes(lang as 'en' | 'it'))
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  const renderCard = (w: (typeof published)[number], i: number) => (
    <Reveal
      y={20}
      delay={i * 0.1}
      key={w.slug}
      className="group cursor-pointer flex flex-col h-full"
      onClick={() => { router.push(`/resources/insights/${w.slug}`); window.scrollTo(0, 0); }}
    >
      {/* Cover image in a rounded container */}
      <div className="rounded-2xl overflow-hidden mb-5">
        {w.coverBg ? (
          <div className="aspect-[4/5] relative overflow-hidden">
            <img src={w.coverBg} alt="" loading="lazy" decoding="async" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
              <div>
                <div className="flex items-center gap-2.5 mb-6 md:mb-8">
                  <img loading="lazy" decoding="async" src="/logos/skillvue-logomark.svg" alt="Skillvue" className="h-7 w-7" style={{ filter: 'brightness(0) invert(1)' }} />
                  <span className="text-white/90 text-[15px] font-semibold">Skillvue</span>
                </div>
                <h3 className="text-[clamp(1.5rem,3vw,2.8rem)] font-semibold text-white leading-[1.1] mb-5">{t(`items.${w.slug}.title`)}</h3>
              </div>
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.15em] uppercase">{t('text2')}</span>
            </div>
          </div>
        ) : (
          <div className="aspect-[4/5] overflow-hidden">
            <img loading="lazy" decoding="async" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" src={w.coverImage} alt={t(`items.${w.slug}.title`)} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3 content-start">
        {w.industry.map(tag => (
          <span key={tag} className="inline-flex px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.04] tracking-wide h-fit">{tag}</span>
        ))}
        {w.topic.map(tag => (
          <span key={tag} className="inline-flex px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#121212]/55 border border-[#121212]/10 tracking-wide h-fit">{tag}</span>
        ))}
      </div>

      {/* Description */}
      <p className="text-[14px] md:text-[15px] text-[#121212]/55 leading-[1.7] line-clamp-3 mb-4">{t(`items.${w.slug}.shortDesc`)}</p>

      {/* CTA */}
      <span className="text-[14px] font-semibold text-[#4B4DF7] flex items-center gap-2 group-hover:gap-3 transition-all duration-300 mt-auto">
        {labels('read')} <ArrowRight className="h-4 w-4" />
      </span>
    </Reveal>
  );

  const renderOnePagerCard = (w: (typeof publishedOnePagers)[number], i: number) => {
    const fileUrl = lang === 'it' && w.fileUrlIT ? w.fileUrlIT : w.fileUrlEN;
    return (
      <Reveal
        y={20}
        delay={i * 0.1}
        key={w.slug}
        className="group cursor-pointer flex flex-col h-full"
      >
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
          <div className="rounded-2xl overflow-hidden mb-5">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img src={w.coverBg} alt="" loading="lazy" decoding="async" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
              <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
                <div>
                  <div className="flex items-center gap-2.5 mb-6 md:mb-8">
                    <img loading="lazy" decoding="async" src="/logos/skillvue-logomark.svg" alt="Skillvue" className="h-7 w-7" style={{ filter: 'brightness(0) invert(1)' }} />
                    <span className="text-white/90 text-[15px] font-semibold">Skillvue</span>
                  </div>
                  <h3 className="text-[clamp(1.5rem,3vw,2.8rem)] font-semibold text-white leading-[1.1] mb-5">{t(`onePagers.${w.slug}.title`)}</h3>
                </div>
                <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.15em] uppercase">{t('onePagerBadge')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3 content-start">
            {w.industry.map(tag => (
              <span key={tag} className="inline-flex px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.04] tracking-wide h-fit">{tag}</span>
            ))}
            {w.topic.map(tag => (
              <span key={tag} className="inline-flex px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#121212]/55 border border-[#121212]/10 tracking-wide h-fit">{tag}</span>
            ))}
          </div>

          <p className="text-[14px] md:text-[15px] text-[#121212]/55 leading-[1.7] line-clamp-3 mb-4">{t(`onePagers.${w.slug}.shortDesc`)}</p>

          <span className="text-[14px] font-semibold text-[#4B4DF7] flex items-center gap-2 group-hover:gap-3 transition-all duration-300 mt-auto">
            {labels('read')} <ArrowRight className="h-4 w-4" />
          </span>
        </a>
      </Reveal>
    );
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px] min-h-screen flex items-center overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-0">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              <Reveal duration={0.7} className="lg:col-span-6">
                <span className="text-[12px] font-bold text-[#4B4DF7]/60 tracking-[0.25em] uppercase mb-8 block">{t('text')}</span>
                <h1 className="font-semibold text-white/95 mb-8 text-[48px] md:text-[64px]" style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}>{t.rich('heading', {
                  br: () => <br />,
                  span: (chunks) => <span className="gradient-text">{chunks}</span>,
                })}</h1>
                <p className="text-[20px] text-white/[0.5] leading-[1.75] max-w-xl mb-12" style={{ fontWeight: 300 }}>{t('body')}</p>
                <Button asChild variant="tertiary" mode="dark" icon={null}>
                  <a
                    href="#wp-grid"
                    onClick={(e) => { e.preventDefault(); document.getElementById('wp-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="group inline-flex items-center gap-3"
                  >
                    <span className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:border-white/[0.25] transition-all duration-300">
                      <ArrowRight className="h-4 w-4 rotate-90" />
                    </span>
                    {t('cta')}
                  </a>
                </Button>
              </Reveal>
              <Reveal y={0} duration={0.8} delay={0.2} className="flex justify-center lg:col-span-6">
                <video
                  className="w-full max-w-[560px] h-auto rounded-[40px]"
                  poster="/videos/insights-hero-poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/insights-hero.webm" type="video/webm" />
                  <source src="/videos/insights-hero.mp4" type="video/mp4" />
                </video>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section id="wp-grid" className="section-breathe">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-20 lg:py-24">
            {publishedOnePagers.length > 0 && (
              <>
                <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-[#121212] mb-4">{t('onePagersHeading')}</h2>
                <p className="text-[15px] text-[#121212]/45 mb-10 max-w-xl">{t('onePagersBody')}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {publishedOnePagers.map((w, i) => renderOnePagerCard(w, i))}
                </div>
              </>
            )}

            <h2 className={`text-[clamp(1.5rem,3vw,2rem)] font-semibold text-[#121212] mb-10 ${publishedOnePagers.length > 0 ? 'mt-20 lg:mt-24' : ''}`}>{t('insightsHeading')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {published.map((w, i) => renderCard(w, i))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <Reveal duration={0.7}>
              <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-white/90 mb-4 leading-[1.2] max-w-2xl mx-auto">{t('heading2')}</h2>
              <p className="text-[16px] text-white/[0.45] mb-8 max-w-xl mx-auto">{t('body2')}</p>
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
