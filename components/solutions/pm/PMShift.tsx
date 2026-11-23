'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { X, Check } from 'lucide-react';

const oldItems = [
  'reviewsDrivenManager',
  'inconsistentEvaluationStandards',
  'promotionDecisionsBased',
  'noWayMeasure',
];

const newItems = [
  'reviewsInformedObjective',
  'oneFrameworkApplied',
  'promotionDecisionsBased',
  'skillVerificationsEmbedded',
];

export default function PMShift() {
  const t = useTranslations('solutions.performance-management');

  return (
    <section id="pm-shift" data-testid="pm-shift" className="section-light relative py-20 lg:py-28 flex items-center" style={{ minHeight: '100vh' }}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-16">
          <h2 className="max-w-[880px] text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">{t.rich('pmShift.heading', {
            span: (chunks) => <span className="font-semibold">{chunks}</span>,
          })}</h2>
        </Reveal>

        {/* Two cards side by side */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Old playbook */}
          <Reveal
            y={0}
            x={-20}
            duration={0.6}
            delay={0.15}
            className="rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] p-8 lg:p-10"
          >
            <span className="type-eyebrow text-[#4B4DF7] mb-8 block">{t('pmShift.text')}</span>
            <div className="space-y-6">
              {oldItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#ff5f24]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5 text-[#ff5f24]" />
                  </div>
                  <p className="type-body text-[#4B4B4B]">{t(`pmShift.oldItems.${item}`)}</p>
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
            className="rounded-2xl border border-[#4B4DF7]/[0.15] bg-[#f6f7ff] p-8 lg:p-10"
          >
            <span className="type-eyebrow text-[#4B4DF7] mb-8 block">{t('pmShift.text2')}</span>
            <div className="space-y-6">
              {newItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#4B4DF7]/[0.12] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-[#4B4DF7]" />
                  </div>
                  <p className="type-body text-[#121212]">{t(`pmShift.newItems.${item}`)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
