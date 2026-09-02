// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';









// Structure the catalogue cannot hold: ids and the components each row
// renders. The words that went with them are in messages/.
const WHEN_ATTITUDE = [
  'roleJuniorOr',
  'contextEvolvingOr',
  'thereTimeStructured',
  'thereStrongInvestment',
];

const WHEN_COMPETENCE = [
  'roleCriticalOr',
  'consolidatedTechnicalSkills',
  'immediatePerformanceImpact',
  'teamCannotAbsorb',
];

const METHODS = [
  { id: 'n01' },
  { id: 'n02' },
  { id: 'n03' },
  { id: 'n04' },
];

export default function BlogArticle1() {
  const router = useRouter();
  const t = useTranslations('blog.attitude-vs-competence');


  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1713865469900-d12502a39875?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">
            <Button
              variant="tertiary"
              mode="dark"
              iconPosition="left"
              icon={<ArrowLeft aria-hidden />}
              onClick={() => { router.push('/blog'); window.scrollTo(0, 0); }}
              className="mb-10"
            >
              {t('cta')}
            </Button>
            <Reveal duration={0.7} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#4B4DF7] border border-[#4B4DF7]/[0.2] bg-[#4B4DF7]/[0.08] tracking-wide">{t('tag')}</span>
                <span className="text-[13px] text-white/35">{t('text')}</span>
                <span className="text-[13px] text-white/25 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {t('text2')}</span>
              </div>
              <h1 className="font-semibold text-white/95 mb-6 text-[48px] md:text-[64px]" style={{ lineHeight: 1.12, letterSpacing: '-0.02em' }}>
                {t('heading')}
              </h1>
              <p className="text-[19px] text-white/[0.5] leading-[1.75]" style={{ fontWeight: 300 }}>
                {t('body')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Intro */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <Reveal y={20} duration={0.6}>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body2')}
              </p>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body3')}
              </p>

              <div className="rounded-xl border-l-4 border-[#4B4DF7] bg-[#4B4DF7]/[0.03] p-6 my-10">
                <p className="text-[16px] text-[#121212]/[0.7] leading-[1.8] italic">
                  {t('body4')}
                </p>
              </div>

              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 mt-14 tracking-[-0.02em] leading-[1.15]">
                {t('heading2')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body5')}
              </p>

              <div className="grid md:grid-cols-3 gap-3 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.06] bg-white p-5 text-center">
                  <h3 className="text-[14px] font-semibold text-[#121212] mb-2">{t('heading3')}</h3>
                  <p className="text-[13px] text-[#121212]/[0.45] leading-[1.6]">{t('body6')}</p>
                </div>
                <div className="rounded-xl border border-[#121212]/[0.04] bg-[#121212]/[0.02] p-5 text-center">
                  <h3 className="text-[14px] font-semibold text-[#121212]/50 mb-2">{t('versus')}</h3>
                  <p className="text-[13px] text-[#121212]/[0.35] leading-[1.6]">{t('body7')}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.03] p-5 text-center">
                  <h3 className="text-[14px] font-semibold text-[#4B4DF7]">{t('heading4')}</h3>
                  <p className="text-[13px] text-[#121212]/[0.55] leading-[1.6]">{t('body8')}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* When to prioritize */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <Reveal y={20} duration={0.6}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-4 tracking-[-0.02em] leading-[1.15]">
                {t('heading5')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.5] leading-[1.9] mb-10">
                {t.rich('body9', {
    b: (chunks) => <strong className="text-[#121212]/80">{chunks}</strong>,
  })}
              </p>

              <div className="space-y-0">
                <Reveal as="details" y={0} duration={0.3} className="group border-b border-[#121212]/[0.06]">
                  <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                    <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">01</span>
                    <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{t('text3')}</span>
                    <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pl-12 pb-6">
                    <ul className="space-y-2">
                      {WHEN_ATTITUDE.map((item, j) => (
                        <li key={j} className="text-[15px] text-[#121212]/[0.55] leading-[1.7] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 shrink-0" />{t(`whenAttitude.${item}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal as="details" y={0} duration={0.3} delay={0.05} className="group border-b border-[#121212]/[0.06]">
                  <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                    <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">02</span>
                    <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{t('text4')}</span>
                    <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pl-12 pb-6">
                    <ul className="space-y-2">
                      {WHEN_COMPETENCE.map((item, j) => (
                        <li key={j} className="text-[15px] text-[#121212]/[0.55] leading-[1.7] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 shrink-0" />{t(`whenCompetence.${item}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#121212]/60 leading-[1.8] italic">
                  {t('body10')}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* How to evaluate — accordions */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <Reveal y={20} duration={0.6}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-4 tracking-[-0.02em] leading-[1.15]">
                {t('heading6')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.5] leading-[1.9] mb-10">
                {t('body11')}
              </p>

              <div className="space-y-0">
                {METHODS.map((m, i) => (
                  <Reveal
                    as="details"
                    y={0}
                    duration={0.3}
                    delay={i * 0.04}
                    key={t(`methods.${m.id}.num`)}
                    className="group border-b border-[#121212]/[0.06] last:border-b-0"
                  >
                    <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                      <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">{t(`methods.${m.id}.num`)}</span>
                      <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{t(`methods.${m.id}.title`)}</span>
                      <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="pl-12 pb-6">
                      <p className="text-[15px] text-[#121212]/[0.55] leading-[1.8]">{t(`methods.${m.id}.desc`)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="rounded-xl bg-[#121212]/[0.04] p-6 my-10">
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                  {t.rich('body12', {
    b: (chunks) => <strong className="text-[#121212]/80">{chunks}</strong>,
  })}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Skill Verification */}
        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <Reveal y={20} duration={0.6}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em] leading-[1.15]">
                {t('heading7')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body13')}
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-8">
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-6">
                  <h3 className="text-[15px] font-semibold text-[#121212] mb-2">{t('heading8')}</h3>
                  <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7]">{t('body14')}</p>
                </div>
                <div className="rounded-xl border border-[#4B4DF7]/[0.08] bg-[#4B4DF7]/[0.03] p-6">
                  <h3 className="text-[15px] font-semibold text-[#121212] mb-2">{t('heading9')}</h3>
                  <p className="text-[14px] text-[#121212]/[0.55] leading-[1.7]">{t('body15')}</p>
                </div>
              </div>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t.rich('body16', {
    b: (chunks) => <strong className="text-[#121212]/80">{chunks}</strong>,
  })}
              </p>

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-semibold text-[#121212]">{t('takeaway')}</h3>
                </div>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                  {t('body17')}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <Reveal duration={0.7}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">
                {t('text5')}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {t.rich('heading10', {
    s: (chunks) => <span className="gradient-text">{chunks}</span>,
  })}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {t('body18')}
              </p>
              <Button
                variant="primary"
                mode="dark"
                onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}
              >
                {t('cta2')}
              </Button>
            </Reveal>
          </div>
        </section>
      <Footer />
      </main>
    </>
  );
}
