// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { Eye, GitBranch, Zap } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const pillars = [
  {
    id: 'endEndTalent',
    icon: Eye,
    num: '01',
  },
  {
    id: 'dataDrivenSuccession',
    icon: GitBranch,
    num: '02',
  },
  {
    id: 'fasterInternalFills',
    icon: Zap,
    num: '03',
  },
];

export default function IMHowSolves() {
  const t = useTranslations('solutions.internal-mobility');

  return (
    <section id="im-how" data-testid="im-how" className="section-breathe relative py-20 lg:py-24">
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal duration={0.7} className="max-w-3xl mb-12 md:mb-16">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">{t.rich('imHowSolves.heading', {
            span: (chunks) => <span className="font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal
                y={20}
                delay={0.15 + i * 0.12}
                key={p.id}
                className="group rounded-2xl border border-[#121212]/[0.08] bg-white p-6 md:p-8 lg:p-10 hover:border-[#4B4DF7]/[0.18] hover:shadow-xl hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <span className="text-[36px] md:text-[42px] font-normal text-[#121212]/[0.1] leading-none tracking-[-0.03em]">{p.num}</span>
                  <IconTile icon={Icon} mode="light" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-semibold text-[#121212] mb-2 md:mb-3 leading-tight">{t(`imHowSolves.pillars.${p.id}.title`)}</h3>
                <p className="text-[14px] md:text-[15px] text-[#7A7A7A] leading-[1.7] flex-1">{t(`imHowSolves.pillars.${p.id}.desc`)}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
