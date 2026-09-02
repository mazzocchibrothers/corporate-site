// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { TrendingUp, Award, RefreshCw } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const points = [
  {
    id: 'utilizationOptimization',
    num: '01',
    icon: TrendingUp,
    stat: '25%',
  },
  {
    id: 'clientFacingProof',
    num: '02',
    icon: Award,
    stat: '2x',
  },
  {
    id: 'reskillingIdentification',
    num: '03',
    icon: RefreshCw,
    stat: '40%',
  },
];

export default function PRConsulting() {
  const t = useTranslations('solutions.project-resourcing');

  const renderCard = (p, i) => {
    const Icon = p.icon;
    return (
      <Reveal
        delay={0.1 + i * 0.12}
        key={p.id}
        className="group rounded-2xl border border-[#121212]/[0.08] bg-white p-6 md:p-8 lg:p-10 hover:border-[#4B4DF7]/[0.18] hover:shadow-xl hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 flex flex-col h-full"
      >
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <span className="text-[36px] md:text-[42px] font-normal text-[#121212]/[0.1] leading-none tracking-[-0.03em]">{p.num}</span>
          <IconTile icon={Icon} mode="light" />
        </div>

        <h3 className="text-[18px] md:text-[20px] font-semibold text-[#121212] mb-2 md:mb-3 leading-tight">{t(`prConsulting.points.${p.id}.title`)}</h3>
        <p className="text-[14px] md:text-[15px] text-[#7A7A7A] leading-[1.7] mb-5 md:mb-8 flex-1">{t(`prConsulting.points.${p.id}.desc`)}</p>

        <div className="rounded-xl bg-[#F7F7F7] border border-[#121212]/[0.06] p-4 md:p-5">
          <span className="text-[24px] md:text-[28px] font-bold text-[#121212] leading-none tracking-[-0.02em] block mb-1.5">{p.stat}</span>
          <span className="text-[12px] text-[#7A7A7A] leading-[1.5]">{t(`prConsulting.points.${p.id}.statLabel`)}</span>
        </div>
      </Reveal>
    );
  };

  return (
    <section id="pr-consulting" data-testid="pr-consulting" className="section-breathe relative md:flex md:items-center" style={{ minHeight: '100vh' }}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-20 lg:py-28">

        {/* Header */}
        <Reveal duration={0.7} className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212] mb-5">{t.rich('prConsulting.heading', {
            span: (chunks) => <span className="font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
          <p className="text-[15px] md:text-[17px] text-[#7A7A7A] leading-[1.75] max-w-2xl">{t('prConsulting.body')}</p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {points.map((p, i) => renderCard(p, i))}
        </div>
      </div>
    </section>
  );
}
