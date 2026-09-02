// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { Shuffle, EyeOff, HelpCircle } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const pains = [
  {
    id: 'staffingAvailabilityNot',
    icon: Shuffle,
  },
  {
    id: 'noVisibilityReal',
    icon: EyeOff,
  },
  {
    id: 'performanceVarianceUnexplained',
    icon: HelpCircle,
  },
];

export default function PRProblem() {
  const t = useTranslations('solutions.project-resourcing');

  return (
    <section id="pr-problem" data-testid="pr-problem" className="section-breathe relative py-20 lg:py-24">
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-16">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">{t.rich('prProblem.heading', {
            span: (chunks) => <span className="font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </Reveal>

        {/* Pain cards — 3-col grid, consistent with homepage card layout */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
          {pains.map((p, i) => (
            <Reveal
              delay={i * 0.12}
              key={p.id}
              data-testid={`pr-pain-${i}`}
              className="group bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-6 lg:p-10 flex flex-col"
            >
              <IconTile icon={p.icon} mode="light" className="mb-6 md:mb-8" />
              <h3 className="text-[15px] md:text-[15px] lg:text-[18px] font-semibold text-[#121212] leading-snug mb-2 md:mb-3 lg:mb-4">{t(`prProblem.pains.${p.id}.title`)}</h3>
              <p className="text-[13px] md:text-[13px] lg:text-[15px] text-[#7A7A7A] leading-[1.6] md:leading-[1.7] lg:leading-[1.75]">{t(`prProblem.pains.${p.id}.desc`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
