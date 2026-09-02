// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, Compass, Target, Heart, Handshake, Wrench } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';







// Structure the catalogue cannot hold: ids and the components each row
// renders. The words that went with them are in messages/.
const SKILLS = [
  { id: 'leadership', icon: Compass },
  { id: 'goalOrientation', icon: Target },
  { id: 'emotionalIntelligence', icon: Heart },
  { id: 'negotiation', icon: Handshake },
  { id: 'problemSolving', icon: Wrench },
];

const OBSERVABLES = [
  { id: 'meetings' },
  { id: 'conflictMoments' },
  { id: 'priorityManagement' },
];

export default function BlogArticle7() {
  const router = useRouter();
  const t = useTranslations('blog.managerial-skills');


  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-[80px]">
          <img src="https://images.unsplash.com/photo-1752650735509-58f11eaa2e10?w=1400&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
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

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <Reveal y={20} duration={0.6}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em]">
                {t('heading2')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t('body2')}
              </p>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-6">
                {t.rich('body3', {
    b: (chunks) => <strong className="text-[#121212]/80">{chunks}</strong>,
  })}
              </p>
              <div className="border-l-[3px] border-[#4B4DF7]/30 pl-6 my-10">
                <p className="text-[17px] text-[#121212]/60 leading-[1.8] italic">
                  {t('body4')}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <Reveal y={20} duration={0.6}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em]">
                {t('heading3')}
              </h2>
              <div className="space-y-0">
                {SKILLS.map((s, i) => {
                  return (
                    <Reveal
                      as="details"
                      y={0}
                      duration={0.3}
                      delay={i * 0.04}
                      key={t(`skills.${s.id}.title`)}
                      className="group border-b border-[#121212]/[0.06] last:border-b-0"
                    >
                      <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                        <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">0{i + 1}</span>
                        <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{t(`skills.${s.id}.title`)}</span>
                        <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                      </summary>
                      <div className="pl-12 pb-6">
                        <p className="text-[15px] text-[#121212]/[0.55] leading-[1.8]">{t(`skills.${s.id}.desc`)}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-breathe">
          <div className="max-w-[780px] mx-auto px-8 lg:px-12 py-16 lg:py-20">
            <Reveal y={20} duration={0.6}>
              <h2 className="text-[26px] font-semibold text-[#121212] mb-5 tracking-[-0.02em]">
                {t('heading4')}
              </h2>
              <p className="text-[17px] text-[#121212]/[0.65] leading-[1.9] mb-8">
                {t('body5')}
              </p>
              {OBSERVABLES.map((obs, i) => (
                <Reveal
                  as="details"
                  y={0}
                  duration={0.3}
                  delay={i * 0.05}
                  key={i}
                  className="group border-b border-[#121212]/[0.06] last:border-b-0"
                >
                  <summary className="flex items-center gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                    <span className="text-[24px] font-bold text-[#4B4DF7]/25 leading-none w-8 shrink-0">0{i + 1}</span>
                    <span className="text-[17px] font-semibold text-[#121212]/80 flex-1">{t(`observables.${obs.id}.context`)}</span>
                    <span className="text-[#4B4DF7]/40 text-[20px] transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <div className="pl-12 pb-6">
                    <ul className="space-y-2">
                      {t.raw(`observables.${obs.id}.signs`).map((sign, j) => (
                        <li key={j} className="text-[15px] text-[#121212]/[0.55] leading-[1.7] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4B4DF7]/40 mt-2.5 shrink-0" />{sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}

              <div className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-gradient-to-br from-[#4B4DF7]/[0.04] to-transparent p-8 my-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-5 w-5 text-[#4B4DF7]" />
                  <h3 className="text-[16px] font-semibold text-[#121212]">{t('heading5')}</h3>
                </div>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.8]">
                  {t('body6')}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 text-center">
            <Reveal duration={0.7}>
              <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.2em] uppercase mb-6 block">{t('text3')}</span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white/90 mb-5 leading-[1.1] max-w-3xl mx-auto tracking-[-0.03em]">
                {t.rich('heading6', {
    s: (chunks) => <span className="gradient-text">{chunks}</span>,
  })}
              </h2>
              <p className="text-[17px] text-white/[0.4] mb-12 max-w-xl mx-auto leading-[1.75]">
                {t('body7')}
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
