// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { EyeOff, AlertTriangle, Scale } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const pains = [
  {
    id: 'highPotentialsInvisible',
    icon: EyeOff,
    stat: '?',
  },
  {
    id: 'successionPipelinesFiction',
    icon: AlertTriangle,
    stat: '60%',
  },
  {
    id: 'mobilityPoliticalNot',
    icon: Scale,
    stat: '0',
  },
];

export default function IMProblem() {
  const t = useTranslations('solutions.internal-mobility');

  const renderCard = (p, i) => {
    const Icon = p.icon;
    return (
      <Reveal
        delay={0.1 + i * 0.1}
        key={p.id}
        data-testid={`im-pain-${i}`}
        className="group rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/90 p-6 md:p-10 transition-all duration-500 flex flex-col h-full"
      >
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <span className="text-[#121212] text-[32px] stat-value md:text-[clamp(2rem,4vw,3rem)]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{p.stat}</span>
          <IconTile icon={Icon} mode="light" />
        </div>
        <h3 className="text-[18px] font-semibold text-[#121212] mb-2 md:mb-3">{t(`imProblem.pains.${p.id}.title`)}</h3>
        <p className="text-[14px] md:text-[15px] text-[#7A7A7A] leading-[1.75]">{t(`imProblem.pains.${p.id}.desc`)}</p>
      </Reveal>
    );
  };

  return (
    <section id="im-problem" data-testid="im-problem" className="section-breathe relative py-20 lg:py-24">
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-12 md:mb-16">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">{t.rich('imProblem.heading', {
            span: (chunks) => <span className="font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {pains.map((p, i) => renderCard(p, i))}
        </div>
      </div>
    </section>
  );
}
