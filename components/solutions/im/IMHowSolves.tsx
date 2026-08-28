// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, GitBranch, Zap } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { IconTile } from '@/components/ui/icon-tile';

const pillars = [
  { icon: Eye, num: '01', title: 'End-to-end talent visibility', desc: 'Continuous mapping of skills and potential to match capabilities with needs. Reduce turnover and replacement costs by seeing your full talent picture.' },
  { icon: GitBranch, num: '02', title: 'Data-driven succession planning', desc: "Faster coverage of critical roles. Cut vacancy cost and dependency on external recruiting. Know who's ready now, who's ready in 6 months, and where gaps exist." },
  { icon: Zap, num: '03', title: 'Faster internal fills', desc: 'Stronger engagement and retention through transparent, data-backed decisions that value existing talent. Cut external search costs by filling roles from within.' },
];

export default function IMHowSolves() {
  const { t } = useLanguage();
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
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">
            {t('Three pillars of')}{' '}
            <span className="font-bold gradient-text-on-light">{t('intelligent mobility')}</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                className="group rounded-2xl border border-[#121212]/[0.08] bg-white p-6 md:p-8 lg:p-10 hover:border-[#4B4DF7]/[0.18] hover:shadow-xl hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              >
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <span className="text-[36px] md:text-[42px] font-normal text-[#121212]/[0.1] leading-none tracking-[-0.03em]">{p.num}</span>
                  <IconTile icon={Icon} mode="light" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-semibold text-[#121212] mb-2 md:mb-3 leading-tight">{t(p.title)}</h3>
                <p className="text-[14px] md:text-[15px] text-[#7A7A7A] leading-[1.7] flex-1">{t(p.desc)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
