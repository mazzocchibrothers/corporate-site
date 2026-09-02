// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { X, Check, ArrowDown } from 'lucide-react';

const oldItems = [
  'cvScreeningGut',
  'unstructuredInterviewsNo',
  'qualityDegradesVolume',
  'hiringDecisionsMade',
  'earlyTurnoverCost',
];

const newItems = [
  'aiPoweredSkill',
  'structuredPsychometricallyValidated',
  'sameScientificRigor',
  'hiringDecisionsBacked',
  'predictiveMatchingReduces',
];

export default function TAShift() {
  const t = useTranslations('solutions.talent-acquisition');

  return (
    <section id="ta-shift" data-testid="ta-shift" className="relative py-20 lg:py-28 md:flex md:items-center">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full">
        <Reveal duration={0.7} className="mb-10 md:mb-20">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white/90">{t.rich('taShift.heading', {
            span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
          })}</h2>
        </Reveal>

        {/* Mobile: vertical stack with transition arrow */}
        <div className="md:hidden flex flex-col gap-4">
          {/* Old playbook */}
          <Reveal
            y={20}
            duration={0.6}
            delay={0.15}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
          >
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.12em] uppercase mb-6 block">{t('taShift.text')}</span>
            <div className="space-y-4">
              {oldItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-5 w-5 text-white/30" />
                  </div>
                  <p className="text-[14px] text-white/40 leading-[1.7]">{t(`taShift.oldItems.${item}`)}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Transition arrow */}
          <Reveal
            y={0}
            duration={0.6}
            delay={0.3}
            className="flex items-center justify-center gap-3 py-1"
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
            <span className="w-9 h-9 rounded-full flex items-center justify-center bg-[#4B4DF7]/[0.12] border border-[#4B4DF7]/25">
              <ArrowDown className="h-4 w-4 text-[#9B9DFB]" strokeWidth={2.5} />
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
          </Reveal>

          {/* With Skillvue */}
          <Reveal
            y={20}
            duration={0.6}
            delay={0.4}
            className="rounded-2xl border border-[#4B4DF7]/[0.15] bg-white/[0.06] p-5"
          >
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.12em] uppercase mb-6 block">{t('taShift.text2')}</span>
            <div className="space-y-4">
              {newItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4B4DF7]/[0.12] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-[#9B9DFB]" />
                  </div>
                  <p className="text-[14px] text-white/[0.65] leading-[1.7]">{t(`taShift.newItems.${item}`)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {/* Old playbook */}
          <Reveal
            y={0}
            x={-20}
            duration={0.6}
            delay={0.15}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-10"
          >
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.12em] uppercase mb-10 block">{t('taShift.text3')}</span>
            <div className="space-y-4 md:space-y-7">
              {oldItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-5 w-5 md:h-4 md:w-4 text-white/30" />
                  </div>
                  <p className="text-[14px] md:text-[17px] text-white/40 leading-[1.7]">{t(`taShift.oldItems.${item}`)}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* With Skillvue */}
          <Reveal
            y={0}
            x={20}
            duration={0.6}
            delay={0.25}
            className="rounded-2xl border border-[#4B4DF7]/[0.15] bg-white/[0.06] p-5 md:p-10"
          >
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.12em] uppercase mb-10 block">{t('taShift.text4')}</span>
            <div className="space-y-4 md:space-y-7">
              {newItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4B4DF7]/[0.12] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-5 w-5 md:h-4 md:w-4 text-[#9B9DFB]" />
                  </div>
                  <p className="text-[14px] md:text-[17px] text-white/[0.65] leading-[1.7]">{t(`taShift.newItems.${item}`)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
