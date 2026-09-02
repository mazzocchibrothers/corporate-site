// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { X, Check } from 'lucide-react';

const oldItems = [
  'peopleDataSeparate',
  'programsPickedGut',
  'nearZeroVisibility',
  'roiQuestionNobody',
  'whenBusinessPivots',
];

const newItems = [
  'skillsMeasuredObjectively',
  'budgetAllocatedWhere',
  'trainingShapedAround',
  'skillGapTrend',
  'contentPersonalizedScale',
];

export default function LDShift() {
  const t = useTranslations('solutions.learning-development');

  return (
    <section id="ld-shift" data-testid="ld-shift" className="relative py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-16">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90">{t.rich('ldShift.heading', {
            span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
          })}</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Old playbook */}
          <Reveal
            y={0}
            x={-20}
            duration={0.6}
            delay={0.15}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 lg:p-10"
          >
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-8 block">{t('ldShift.text')}</span>
            <div className="space-y-6">
              {oldItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5 text-white/30" />
                  </div>
                  <p className="text-[15px] text-white/40 leading-[1.7]">{t(`ldShift.oldItems.${item}`)}</p>
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
            className="rounded-2xl border border-[#4B4DF7]/[0.15] bg-white/[0.06] p-8 lg:p-10"
          >
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-8 block">{t('ldShift.text2')}</span>
            <div className="space-y-6">
              {newItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#4B4DF7]/[0.12] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-[#9B9DFB]" />
                  </div>
                  <p className="text-[15px] text-white/[0.65] leading-[1.7]">{t(`ldShift.newItems.${item}`)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
