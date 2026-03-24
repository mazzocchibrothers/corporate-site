// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Layers, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pillars = [
  {
    num: '01',
    icon: Search,
    title: 'Precise skill gap analysis',
    desc: 'Objective identification of improvement areas at both individual and aggregate level. Know exactly what to invest in, not where to guess.',
    stat: '3x',
    statLabel: 'more targeted L&D investments vs. catalogue-based programs',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Data-driven learning design',
    desc: 'Programs built on real, measured needs, not standard catalogues. Every learning investment tied to a validated gap.',
    stat: '60%',
    statLabel: 'reduction in unused or misaligned training budget',
  },
  {
    num: '03',
    icon: TrendingUp,
    title: 'Measurable ROI',
    desc: 'Pre/post assessment comparison. Objective tracking of progress and concrete impact on performance.',
    stat: '2-4x',
    statLabel: 'faster skill development with targeted interventions',
  },
];

export default function LDHowSolves() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="ld-how" data-testid="ld-how" className="section-breathe relative flex items-center" style={{ minHeight: '100vh' }} ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">

        <motion.div className="max-w-3xl mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-5">
            {t('Three pillars of')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('skill-driven L&D')}</span>
          </h2>
          <p className="text-[17px] text-[#1A1A2E]/[0.45] leading-[1.75]">
            {t("Stop investing in training that doesn't move the needle. Measure gaps, design programs, and track impact with objective data.")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                className="group rounded-2xl border border-[#1A1A2E]/[0.08] bg-white p-8 lg:p-10 hover:border-[#4B4DF7]/[0.18] hover:shadow-xl hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[42px] font-bold text-[#1A1A2E]/[0.1] leading-none tracking-[-0.03em]">{p.num}</span>
                  <div className="w-11 h-11 rounded-xl bg-[#4B4DF7]/[0.06] border border-[#4B4DF7]/[0.08] flex items-center justify-center group-hover:bg-[#4B4DF7]/[0.12] group-hover:border-[#4B4DF7]/[0.15] transition-all duration-500">
                    <Icon className="h-5 w-5 text-[#4B4DF7]/50 group-hover:text-[#4B4DF7] transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-3 leading-tight">{t(p.title)}</h3>
                <p className="text-[15px] text-[#1A1A2E]/[0.5] leading-[1.75] mb-8 flex-1">{t(p.desc)}</p>

                <div className="rounded-xl bg-[#F5F5FA] border border-[#1A1A2E]/[0.06] p-5">
                  <span className="text-[28px] font-bold text-[#1A1A2E] leading-none tracking-[-0.02em] block mb-1.5">{p.stat}</span>
                  <span className="text-[12px] text-[#1A1A2E]/[0.4] leading-[1.5]">{t(p.statLabel)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
