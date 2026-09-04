// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';

export default function PMHowSolves() {
  const t = useTranslations('solutions.performance-management');

  return (
    <section id="pm-how" data-testid="pm-how" className="section-breathe relative py-20 lg:py-24">
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-16">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">{t.rich('pmHowSolves.heading', {
            span: (chunks) => <span className="font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </Reveal>

        {/* Two-column comparison */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* Subjective */}
          <Reveal
            y={20}
            delay={0.15}
            className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-10"
          >
            <span className="text-[11px] font-bold text-[#4B4DF7] tracking-[0.1em] uppercase mb-5 block">{t('pmHowSolves.text')}</span>
            <h3 className="text-[20px] font-bold text-[#121212] mb-4">{t('pmHowSolves.heading2')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-[#4B4DF7] font-bold mt-0.5">✓</span>
                <p className="text-[15px] text-[#7A7A7A] leading-[1.7]">{t('pmHowSolves.body')}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✗</span>
                <p className="text-[15px] text-[#7A7A7A] leading-[1.7]">{t('pmHowSolves.body2')}</p>
              </div>
            </div>
          </Reveal>

          {/* Objective */}
          <Reveal
            y={20}
            delay={0.25}
            className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-white/70 p-10"
          >
            <span className="text-[11px] font-bold text-[#4B4DF7] tracking-[0.1em] uppercase mb-5 block">{t('pmHowSolves.text2')}</span>
            <h3 className="text-[20px] font-bold text-[#121212] mb-4">Skillvue</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-[#4B4DF7] font-bold mt-0.5">✓</span>
                <p className="text-[15px] text-[#7A7A7A] leading-[1.7]">{t('pmHowSolves.body3')}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✗</span>
                <p className="text-[15px] text-[#7A7A7A] leading-[1.7]">{t('pmHowSolves.body4')}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom callout */}
        <Reveal
          y={15}
          delay={0.35}
          className="rounded-2xl bg-[#0E0E0E] p-8 lg:p-10"
        >
          <h3 className="text-[20px] font-semibold text-white/90 mb-4 text-center">{t('pmHowSolves.heading3')}</h3>
          <p className="text-[17px] text-white/[0.85] leading-[1.7] text-center max-w-3xl mx-auto font-medium">{t('pmHowSolves.body5')}</p>
        </Reveal>
      </div>
    </section>
  );
}
