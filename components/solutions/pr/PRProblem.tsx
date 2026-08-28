// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shuffle, EyeOff, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { IconTile } from '@/components/ui/icon-tile';

const pains = [
  { icon: Shuffle, title: 'Staffing by availability, not capability', desc: "Project teams assembled based on who's free, not who has the right skills. Result: delivery delays, rework, and frustration." },
  { icon: EyeOff, title: 'No visibility on real skills across the org', desc: 'Managers rely on memory, reputation, and who they know. not verified competency data. Top performers are over-deployed; hidden talent stays invisible.' },
  { icon: HelpCircle, title: 'Performance variance is unexplained', desc: "Team A delivers on time. Team B doesn't. Same tools, same size. The difference is people quality. but without objective data, you can't diagnose it." },
];

export default function PRProblem() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pr-problem" data-testid="pr-problem" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">
            {t('The blind spots in your')}{' '}
            <span className="font-bold gradient-text-on-light">{t('project staffing')}</span>
          </h2>
        </motion.div>

        {/* Pain cards — 3-col grid, consistent with homepage card layout */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
          {pains.map((p, i) => (
            <motion.div
              key={p.title}
              data-testid={`pr-pain-${i}`}
              className="group bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-6 lg:p-10 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            >
              <IconTile icon={p.icon} mode="light" className="mb-6 md:mb-8" />
              <h3 className="text-[15px] md:text-[15px] lg:text-[18px] font-semibold text-[#121212] leading-snug mb-2 md:mb-3 lg:mb-4">{t(p.title)}</h3>
              <p className="text-[13px] md:text-[13px] lg:text-[15px] text-[#7A7A7A] leading-[1.6] md:leading-[1.7] lg:leading-[1.75]">{t(p.desc)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
