import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Target, BarChart3, GraduationCap, ArrowLeftRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pillars = [
  {
    id: 'talent-acquisition',
    icon: Target,
    title: 'Talent Acquisition',
    desc: 'Replace gut-feel interviews with AI-powered assessments that predict on-the-job performance. Scalable from 10 to 10,000 candidates. same scientific rigor at every level.',
    link: 'Explore Talent Acquisition',
    path: '/solutions/talent-acquisition',
  },
  {
    id: 'performance',
    icon: BarChart3,
    title: 'Performance Management',
    desc: 'Add an objective layer to performance cycles. Structured competency assessments reduce bias, improve calibration, and give managers a starting point grounded in data, not recency.',
    link: 'Explore Performance Management',
    path: '/solutions/performance-management',
  },
  {
    id: 'learning',
    icon: GraduationCap,
    title: 'Learning & Development',
    desc: 'Know exactly where the skill gaps are: at individual, team, and organization level. Fund programs based on evidence, measure progress with before-and-after precision.',
    link: 'Explore Learning & Development',
    path: '/solutions/learning-development',
  },
  {
    id: 'mobility',
    icon: ArrowLeftRight,
    title: 'Internal Mobility & Succession',
    desc: 'See who is ready for a new role today, who can be developed in 6 months, and where critical knowledge is concentrated. Move from "we think she might be ready" to "we know."',
    link: 'Explore Internal Mobility',
    path: '/solutions/internal-mobility',
  },
];

export default function WhatSkillvueDoes() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="what-skillvue-does" data-testid="what-skillvue-does" className="section-breathe relative py-16 md:py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          className="mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] max-w-4xl mb-4 md:mb-6">
            {t('From screening to succession. every talent decision,')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('connected.')}</span>
          </h2>
          <p className="text-[14px] md:text-[18px] text-[#1A1A2E]/[0.65] leading-[1.6] md:leading-[1.75] max-w-2xl">
            {t('Most organizations run hiring, performance, L&D, and mobility on disconnected tools with different frameworks. Skillvue connects them through one skills language and one data layer so every decision compounds.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:gap-5 auto-rows-fr">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                data-testid={`pillar-${pillar.id}`}
                className="group relative rounded-xl md:rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/80 p-4 md:p-10 lg:p-12 transition-all duration-500 flex flex-col h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                {/* Top content */}
                <div className="flex-1">
                  <Icon className="h-4 w-4 md:h-6 md:w-6 text-[#4B4DF7]/40 mb-2 md:mb-5" strokeWidth={1.5} />
                  <h3 className="text-[12px] md:text-[20px] font-bold text-[#1A1A2E] mb-1.5 md:mb-4 leading-snug">{t(pillar.title)}</h3>
                  <p className="text-[10px] md:text-[15px] text-[#1A1A2E]/[0.5] leading-[1.4] md:leading-[1.75]">{t(pillar.desc)}</p>
                </div>
                {/* Link — always anchored at bottom */}
                <a href={pillar.path} className="group/link inline-flex items-center gap-1 md:gap-2 text-[10px] md:text-[13px] font-semibold text-[#4B4DF7] hover:text-[#3A3BD6] transition-colors duration-300 mt-3 md:mt-8">
                  {t(pillar.link)}
                  <ArrowRight className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 shrink-0 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
