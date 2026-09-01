// @ts-nocheck
'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Users, Radar, ShieldCheck } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const pillars = [
  {
    id: 'skillsMatchedStaffing',
    icon: Users,
  },
  {
    id: 'realTimeCapability',
    icon: Radar,
  },
  {
    id: 'deliveryRiskReduction',
    icon: ShieldCheck,
  },
];

export default function PRHowSolves() {
  const t = useTranslations('solutions.project-resourcing');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pr-how" data-testid="pr-how" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90">{t.rich('prHowSolves.heading', {
            span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
          })}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <IconTile icon={Icon} mode="dark" className="mb-5" />
                <h3 className="text-[20px] font-semibold text-white/90 mb-4">{t(`prHowSolves.pillars.${p.id}.title`)}</h3>
                <p className="text-[15px] text-white/[0.65] leading-[1.75]">{t(`prHowSolves.pillars.${p.id}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
