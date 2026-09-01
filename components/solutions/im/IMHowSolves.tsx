// @ts-nocheck
'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="im-how" data-testid="im-how" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          className="max-w-3xl mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">{t.rich('imHowSolves.heading', {
            span: (chunks) => <span className="font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                className="group rounded-2xl border border-[#121212]/[0.08] bg-white p-6 md:p-8 lg:p-10 hover:border-[#4B4DF7]/[0.18] hover:shadow-xl hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              >
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <span className="text-[36px] md:text-[42px] font-normal text-[#121212]/[0.1] leading-none tracking-[-0.03em]">{p.num}</span>
                  <IconTile icon={Icon} mode="light" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-semibold text-[#121212] mb-2 md:mb-3 leading-tight">{t(`imHowSolves.pillars.${p.id}.title`)}</h3>
                <p className="text-[14px] md:text-[15px] text-[#7A7A7A] leading-[1.7] flex-1">{t(`imHowSolves.pillars.${p.id}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
