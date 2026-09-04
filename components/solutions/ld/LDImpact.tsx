// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { Zap, Target, TrendingUp } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const kpis = [
  {
    id: 'n69mo',
    value: '6-9mo',
    icon: Zap,
  },
  {
    id: 'n85',
    value: '85%+',
    icon: Target,
  },
  {
    id: 'millions',
    value: 'Millions',
    icon: TrendingUp,
  },
];

export default function LDImpact() {
  const t = useTranslations('solutions.learning-development');

  const renderCard = (k, i) => {
    const Icon = k.icon;
    return (
      <Reveal
        delay={0.15 + i * 0.12}
        key={k.value}
        className="group rounded-2xl border border-[#121212]/[0.08] bg-white p-6 md:p-8 lg:p-10 hover:border-[#4B4DF7]/[0.18] hover:shadow-xl hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 flex flex-col h-full"
      >
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <IconTile icon={Icon} mode="light" />
        </div>

        <span
          className="block mb-2 text-[#121212] text-[32px] md:text-[64px]"
          style={{ fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em' }}
        >
          {t(`ldImpact.kpis.${k.id}.value`)}
        </span>

        <h3 className="text-[15px] md:text-[17px] font-semibold text-[#121212]/80 leading-snug mb-1.5">
          {t(`ldImpact.kpis.${k.id}.label`)} <span className="font-normal text-[#7A7A7A]">{t(`ldImpact.kpis.${k.id}.sublabel`)}</span>
        </h3>

        <div className="w-12 h-px bg-[#4B4DF7]/[0.15] my-4 md:my-5" />

        <p className="text-[14px] text-[#7A7A7A] leading-[1.75] flex-1">{t(`ldImpact.kpis.${k.id}.detail`)}</p>
      </Reveal>
    );
  };

  return (
    <section id="ld-impact" data-testid="ld-impact" className="section-breathe relative md:flex md:items-center" style={{ minHeight: '100vh' }}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-20 lg:py-28">

        {/* Header */}
        <Reveal duration={0.7} className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212] mb-5">{t.rich('ldImpact.heading', {
            span: (chunks) => <span className="font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
          <p className="text-[15px] md:text-[17px] text-[#7A7A7A] leading-[1.75] max-w-2xl mx-auto">{t('ldImpact.body')}</p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {kpis.map((k, i) => renderCard(k, i))}
        </div>
      </div>
    </section>
  );
}
