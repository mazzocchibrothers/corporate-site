'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { ArrowRight, Target, BarChart3, GraduationCap, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconTile } from '@/components/ui/icon-tile';

const pillars = [
  {
    id: 'talent-acquisition',
    icon: Target,
    path: '/solutions/talent-acquisition',
  },
  {
    id: 'performance',
    icon: BarChart3,
    path: '/solutions/performance-management',
  },
  {
    id: 'learning',
    icon: GraduationCap,
    path: '/solutions/learning-development',
  },
  {
    id: 'mobility',
    icon: ArrowLeftRight,
    path: '/solutions/internal-mobility',
  },
];

export default function WhatSkillvueDoes() {
  const t = useTranslations('product-overview');
  return (
    <section id="what-skillvue-does" data-testid="what-skillvue-does" className="section-breathe relative py-16 md:py-20 lg:py-24">
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-8 md:mb-16">
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] max-w-4xl mb-4 md:mb-6">{t.rich('whatSkillvueDoes.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
          <p className="text-[14px] md:text-[18px] text-[#7A7A7A] leading-[1.6] md:leading-[1.75] max-w-2xl">{t('whatSkillvueDoes.body')}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 auto-rows-fr">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal
                delay={0.15 + i * 0.1}
                key={pillar.id}
                data-testid={`pillar-${pillar.id}`}
                className="group relative rounded-xl md:rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/80 p-5 md:p-10 transition-all duration-500 flex flex-col h-full"
              >
                {/* Top content */}
                <div className="flex-1">
                  <IconTile icon={Icon} mode="light" className="mb-2 md:mb-5" />
                  <h3 className="text-[15px] md:text-[20px] font-semibold text-[#1A1A2E] mb-1.5 md:mb-4 leading-snug">{t(`whatSkillvueDoes.pillars.${pillar.id}.title`)}</h3>
                  <p className="text-[12px] md:text-[15px] text-[#7A7A7A] leading-[1.4] md:leading-[1.75]">{t(`whatSkillvueDoes.pillars.${pillar.id}.desc`)}</p>
                </div>
                {/* Link — always anchored at bottom */}
                <Button asChild variant="tertiary" mode="light" className="self-start mt-3 md:mt-8">
                  <a href={pillar.path}>
                    {t(`whatSkillvueDoes.pillars.${pillar.id}.link`)}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
