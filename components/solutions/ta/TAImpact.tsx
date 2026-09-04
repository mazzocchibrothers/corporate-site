// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';

const kpis = [
  {
    id: 'badHireRate',
    value: '<15%',
  },
  {
    id: 'earlyTurnover',
    value: '<10%',
  },
  {
    id: 'annualSavings',
    value: 'Millions',
  },
];

export default function TAImpact() {
  const t = useTranslations('solutions.talent-acquisition');

  return (
    <section id="ta-impact" data-testid="ta-impact" className="relative pb-20 lg:pb-24" style={{ background: '#F5F5FA' }}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-8 md:mb-16">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">{t.rich('taImpact.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {kpis.map((k, i) => (
            <Reveal delay={0.15 + i * 0.12} key={k.value} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-10">
              <span className="block mb-6 md:mb-10 text-[#1A1A2E] stat-value text-[32px] md:text-[64px]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{k.value}</span>
              <h3 className="text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-4">{t(`taImpact.kpis.${k.id}.label`)} <span className="font-normal text-[#7A7A7A]">{t(`taImpact.kpis.${k.id}.sublabel`)}</span></h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
