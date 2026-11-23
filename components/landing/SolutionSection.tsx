'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { Target, TrendingUp, Award, Shield } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const pillars = [
  {
    id: 'hire',
    icon: Target,
  },
  {
    id: 'develop',
    icon: TrendingUp,
  },
  {
    id: 'promote',
    icon: Award,
  },
  {
    id: 'transform',
    icon: Shield,
  },
];

export default function SolutionSection() {
  const t = useTranslations('home');
  const renderCard = (pillar: typeof pillars[number], i: number) => (
    <Reveal
      delay={0.1 + i * 0.1}
      key={pillar.id}
      data-testid={`solution-card-${pillar.id}`}
      className="group relative rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] hover:shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)] p-5 md:p-8 lg:p-10 transition-all duration-500 overflow-hidden md:aspect-auto"
    >
      {/* Subtle hover glow */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[#4B4DF7]/[0.04] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative">
        {/* Top: Icon + Label */}
        <div>
          {(() => {
            const Icon = pillar.icon;
            return <IconTile icon={Icon} mode="light" className="mb-3 md:mb-5" />;
          })()}
          <h3
            className="text-[15px] md:text-2xl font-semibold text-[#121212] transition-colors duration-500 leading-snug"
          >
            {t(`solution.pillars.${pillar.id}.label`)}
          </h3>
        </div>

        {/* Description */}
        <p className="type-body text-[#4B4B4B] transition-colors duration-500 mb-4 md:mb-8 mt-2 md:mt-4">
          {t(`solution.pillars.${pillar.id}.desc`)}
        </p>

        {/* Stat */}
        <div className="flex items-baseline gap-2 md:gap-3">
          <span className="font-display text-[22px] md:text-[1.8rem] text-[#4B4DF7] font-semibold tracking-tight leading-none">
            {t(`solution.pillars.${pillar.id}.stat`)}
          </span>
          <span className="type-body-sm text-[#4B4B4B] font-medium">
            {t(`solution.pillars.${pillar.id}.statLabel`)}
          </span>
        </div>
      </div>
    </Reveal>
  );

  return (
    <section id="solutions" data-testid="solution-section" className="section-light relative py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <Reveal duration={0.7} className="mb-16 lg:mb-20">
          <h2 className="max-w-[880px] text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">{t.rich('solution.heading', {
            br: () => <br />,
            span: (chunks) => <span className="font-semibold">{chunks}</span>,
          })}</h2>
          <p className="max-w-[880px] type-body-lg text-[#4B4B4B] mt-4 md:mt-6">{t('solution.body')}</p>
        </Reveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:gap-5">
          {pillars.map((pillar, i) => renderCard(pillar, i))}
        </div>
      </div>
    </section>
  );
}
