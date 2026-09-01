'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { m, useInView } from 'framer-motion';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const renderCard = (pillar: typeof pillars[number], i: number) => (
    <m.div
      key={pillar.id}
      data-testid={`solution-card-${pillar.id}`}
      className="group relative rounded-2xl border border-white/[0.06] hover:border-white/[0.14] bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm p-5 md:p-8 lg:p-10 transition-all duration-500 overflow-hidden md:aspect-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
    >
      {/* Subtle hover glow */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[#4B4DF7]/[0.04] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative">
        {/* Top: Icon + Label */}
        <div>
          {(() => {
            const Icon = pillar.icon;
            return <IconTile icon={Icon} mode="dark" className="mb-3 md:mb-5" />;
          })()}
          <h3
            className="text-[15px] md:text-2xl font-semibold text-white/85 group-hover:text-white/95 transition-colors duration-500 leading-snug"
          >
            {t(`solution.pillars.${pillar.id}.label`)}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[13px] md:text-[16px] text-white/[0.55] md:text-white/[0.65] group-hover:text-white/[0.75] leading-[1.5] md:leading-[1.75] transition-colors duration-500 mb-4 md:mb-8 mt-2 md:mt-4">
          {t(`solution.pillars.${pillar.id}.desc`)}
        </p>

        {/* Stat */}
        <div className="flex items-baseline gap-2 md:gap-3">
          <span className="text-[22px] md:text-[1.8rem] text-[#9B9DFB] font-semibold tracking-tight leading-none">
            {t(`solution.pillars.${pillar.id}.stat`)}
          </span>
          <span className="text-[11px] md:text-[13px] text-white/50 font-medium tracking-wide leading-tight">
            {t(`solution.pillars.${pillar.id}.statLabel`)}
          </span>
        </div>
      </div>
    </m.div>
  );

  return (
    <section id="solutions" data-testid="solution-section" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <m.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90 max-w-3xl">{t.rich('solution.heading', {
            br: () => <br />,
            span: (chunks) => <span className="font-bold gradient-text-warm">{chunks}</span>,
          })}</h2>
          <p className="text-[15px] md:text-[18px] text-white/[0.65] leading-[1.7] mt-4 md:mt-6 max-w-xl">{t('solution.body')}</p>
        </m.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:gap-5">
          {pillars.map((pillar, i) => renderCard(pillar, i))}
        </div>
      </div>
    </section>
  );
}
