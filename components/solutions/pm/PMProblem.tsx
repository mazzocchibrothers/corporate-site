// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserX, GitCompare, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pains = [
  {
    num: '01',
    icon: UserX,
    title: 'Manager subjectivity drives everything',
    desc: "Criteria exist, but evaluations are filtered through each manager's lens — biased by recency, visibility, and personal dynamics.",
    stat: '74%',
    statLabel: 'of employees say reviews don\'t reflect actual performance',
  },
  {
    num: '02',
    icon: GitCompare,
    title: "Evaluations aren't comparable",
    desc: 'Team A in London uses different standards than Team B in New York. No way to benchmark or calibrate across the organization.',
    stat: '0',
    statLabel: 'cross-team comparability without structured assessment',
  },
  {
    num: '03',
    icon: HelpCircle,
    title: 'Negative KPIs \u2260 individual failure',
    desc: "How do you tell whether a poor result reflects individual performance or management quality? Without objective competency data, you can't.",
    stat: '3-4x',
    statLabel: 'cost of a wrong performance decision vs. getting it right',
  },
];

export default function PMProblem() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pm-problem" data-testid="pm-problem" className="section-breathe relative flex items-center" style={{ minHeight: '100vh' }} ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-20 lg:py-28">

        {/* Header row: title + subtitle */}
        <motion.div className="max-w-3xl mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#121212] mb-5">
            {t('The blind spots in your')}{' '}
            <span className="font-bold gradient-text-on-light">{t('performance decisions')}</span>
          </h2>
          <p className="text-[17px] text-[#121212]/[0.45] leading-[1.75]">
            {t('Most performance processes measure activity, not capability. The result: decisions built on impressions, not evidence.')}
          </p>
        </motion.div>

        {/* Cards with stat + content */}
        <div className="grid lg:grid-cols-3 gap-5">
          {pains.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                data-testid={`pm-pain-${i}`}
                className="group rounded-2xl border border-[#121212]/[0.08] bg-white p-8 lg:p-10 hover:border-[#4B4DF7]/[0.18] hover:shadow-xl hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              >
                {/* Top: number + icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[42px] font-bold text-[#121212]/[0.1] leading-none tracking-[-0.03em]">{p.num}</span>
                  <div className="w-11 h-11 rounded-xl bg-[#4B4DF7]/[0.06] border border-[#4B4DF7]/[0.08] flex items-center justify-center group-hover:bg-[#4B4DF7]/[0.12] group-hover:border-[#4B4DF7]/[0.15] transition-all duration-500">
                    <Icon className="h-5 w-5 text-[#4B4DF7]/50 group-hover:text-[#4B4DF7] transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title + desc */}
                <h3 className="text-[20px] font-bold text-[#121212] mb-3 leading-tight">{t(p.title)}</h3>
                <p className="text-[15px] text-[#121212]/[0.5] leading-[1.75] mb-8 flex-1">{t(p.desc)}</p>

                {/* Bottom stat highlight */}
                <div className="rounded-xl bg-[#F7F7F7] border border-[#121212]/[0.06] p-5">
                  <span className="text-[28px] font-bold text-[#121212] leading-none tracking-[-0.02em] block mb-1.5">{p.stat}</span>
                  <span className="text-[12px] text-[#121212]/[0.4] leading-[1.5]">{t(p.statLabel)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
