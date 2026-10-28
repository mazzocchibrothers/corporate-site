import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { getLocale, getTranslations } from 'next-intl/server';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, BookOpen, CheckCircle, Clipboard, Users, MessageSquare, Heart, BarChart3 } from 'lucide-react';
import { href } from '@/i18n/routes';
import { HeroCopy } from '@/components/ui/hero-copy';





// Structure the catalogue cannot hold: ids and the components each row
// renders. The words that went with them are in messages/.
const PHASES = [
  { id: 'n01', icon: Clipboard },
  { id: 'n02', icon: Users },
  { id: 'n03', icon: MessageSquare },
  { id: 'n04', icon: Heart },
  { id: 'n05', icon: BarChart3 },
];

export default async function BlogArticle6() {
  const locale = await getLocale();
  const t = await getTranslations('blog.corporate-onboarding');


  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1758519288548-046187014c85?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <Button asChild
              variant="tertiary"
              mode="dark"
              className="mb-10"
            >
              <a href={href('blog', locale)}><ArrowLeft aria-hidden />{t('cta')}</a>
            </Button>
            <Reveal duration={0.7} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="type-caption inline-flex px-4 py-1.5 rounded-full font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08]">{t('tag')}</span>
                <span className="type-body-sm text-white/35">{t('text')}</span>
                <span className="type-body-sm text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {t('text2')}</span>
              </div>
              <HeroCopy>
                <h1 className="font-semibold text-white/95 mb-6 text-[48px] md:text-[58px]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {t('heading')}
                </h1>
                <p className="type-body-lg hero-subtitle text-white/[0.5]">
                  {t('body')}
                </p>
              </HeroCopy>
            </Reveal>
          </div>
        </section>

        {/* All article content in one continuous light section */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-14 lg:py-16">

            {/* What Is Onboarding */}
            <Reveal y={20} duration={0.6}>
              <h2 className="max-w-[880px] text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em]">
                {t('heading2')}
              </h2>
              <p className="max-w-[880px] type-body text-[#121212]/[0.65] mb-6">
                {t('body2')}
              </p>
              <div className="rounded-xl border-l-4 border-[#4B4DF7] bg-[#4B4DF7]/[0.03] p-6 mb-6">
                <p className="type-body text-[#121212]/[0.7] italic">
                  {t('body3')}
                </p>
              </div>
            </Reveal>

            {/* The 5 Phases */}
            <h2 className="max-w-[880px] text-[26px] font-semibold text-[#121212] mb-4 mt-12 tracking-[-0.02em]">
              {t('heading3')}
            </h2>
            <p className="max-w-[880px] type-body text-[#121212]/[0.5] mb-8">
              {t('body4')}
            </p>

            <div className="space-y-0 mb-12">
              {PHASES.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal
                    as="details"
                    y={0}
                    duration={0.3}
                    delay={i * 0.04}
                    key={t(`phases.${p.id}.num`)}
                    className="group border-b border-[#121212]/[0.06] last:border-b-0"
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="font-display text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{t(`phases.${p.id}.num`)}</span>
                      <div className="flex-1">
                        <span className="type-body-bold text-[#121212]/80 block">{t(`phases.${p.id}.title`)}</span>
                        <span className="type-caption text-[#121212]/30">{t(`phases.${p.id}.timing`)}</span>
                      </div>
                      <span className="font-display text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6">
                      <div className="space-y-2">
                        {t.raw(`phases.${p.id}.points`).map((point, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <CheckCircle className="h-3.5 w-3.5 text-[#4B4DF7]/40 mt-1 shrink-0" />
                            <p className="type-body-sm text-[#121212]/[0.55]">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Onboarding as Field Verification */}
            <h2 className="max-w-[880px] text-[26px] font-bold text-[#121212] mb-5 mt-12 tracking-[-0.02em]">
              {t('heading4')}
            </h2>
            <p className="max-w-[880px] type-body text-[#121212]/[0.65] mb-6">
              {t.rich('body5', {
    b: (chunks) => <strong className="text-[#121212]/80">{chunks}</strong>,
  })}
            </p>

            <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-white p-8 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                <h3 className="text-[16px] font-semibold text-[#121212]">{t('takeaway')}</h3>
              </div>
              <p className="type-body text-[#121212]/[0.65]">
                {t('body6')}
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <Reveal duration={0.7}>
              <span className="type-eyebrow text-[#6B7DFF] mb-6 block">
                {t('text3')}
              </span>
              <h2 className="max-w-[880px] text-[clamp(2rem,4vw,3rem)] font-semibold text-white/90 mb-5 leading-[1.1] mx-auto tracking-[-0.02em]">
                {t.rich('heading5', {
    s: (chunks) => <span className="gradient-text">{chunks}</span>,
  })}
              </h2>
              <p className="max-w-[880px] type-body text-white/[0.4] mb-12 mx-auto">
                {t('body7')}
              </p>
              <Button asChild
                variant="primary"
                mode="dark"
              >
                <a href={href('book-meeting', locale)}>{t('cta2')}<ArrowRight aria-hidden /></a>
              </Button>
            </Reveal>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}
