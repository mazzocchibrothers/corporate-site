// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';

const pains = [
  {
    id: 'hiresFailWithin',
    stat: '30-40%',
  },
  {
    id: 'screeningDoesnT',
    stat: 'No scale',
  },
  {
    id: 'interviewsPredictNothing',
    stat: '0.05',
  },
];

export default function TAProblem() {
  const t = useTranslations('solutions.talent-acquisition');

  return (
    <section id="ta-problem" data-testid="ta-problem" className="section-breathe relative py-20 lg:py-24 md:flex md:items-center">
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="max-w-[900px] mb-16">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-8">{t.rich('taProblem.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
          <p className="text-[14px] md:text-[18px] text-[#7A7A7A] leading-[1.75]">{t('taProblem.body')}</p>
        </Reveal>

        {/* Pain cards — 3-col grid, consistent with homepage card layout */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
          {pains.map((p, i) => (
            <Reveal
              delay={i * 0.12}
              key={p.id}
              data-testid={`ta-pain-${i}`}
              className="group bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-6 lg:p-10 flex flex-col"
            >
              <span
                className="block text-[#1A1A2E] text-[32px] md:text-[clamp(1.75rem,3.2vw,4rem)] font-semibold mb-6 md:mb-10"
                style={{ lineHeight: 1, letterSpacing: '-0.03em' }}
              >
                {p.stat}
              </span>
              <div>
                <h3 className="text-[15px] md:text-[15px] lg:text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-2 md:mb-3 lg:mb-4">{t(`taProblem.pains.${p.id}.title`)}</h3>
                <p className="text-[13px] md:text-[13px] lg:text-[15px] text-[#7A7A7A] leading-[1.6] md:leading-[1.7] lg:leading-[1.75]">{t(`taProblem.pains.${p.id}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
