import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const dimensions = [
  { title: 'Suitability', subtitle: 'Person-job fit', desc: 'Evaluates objective eligibility: qualifications, availability, logistics, baseline requirements. A structured screening layer before deeper assessment.' },
  { title: 'Soft Skills', subtitle: 'Behavioral competencies', desc: 'Communication, collaboration, problem-solving, leadership. Observable through action, rooted in stable behavioral patterns, and among the strongest predictors of long-term performance.' },
  { title: 'Hard Skills', subtitle: 'Technical proficiency', desc: 'Domain-specific knowledge measured against defined proficiency levels, grounded in structured knowledge taxonomies relevant to the role.' },
  { title: 'Potential', subtitle: 'Capacity to grow', desc: 'Predicts capacity to grow, adapt, and take on greater complexity. Assessed through three validated dimensions: learning agility, intrinsic motivation, and career aspiration.' },
  { title: 'Traits', subtitle: 'Dispositional patterns', desc: 'Stable personality traits. openness, conscientiousness, resilience. that shape cultural fit and sustained performance. Grounded in Big Five personality science.' },
];

export default function WhatWeAssess() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="what-we-assess" data-testid="what-we-assess" className="section-breathe relative py-16 md:py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          className="mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-4 md:mb-6">
            {t('Five dimensions for')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('objective evaluations')}</span>
          </h2>
          <p className="text-[14px] md:text-[18px] text-[#1A1A2E]/[0.65] leading-[1.6] md:leading-[1.75] max-w-2xl">
            {t("Every person evaluated through a structured, science-backed framework. whether they're a candidate or a 20-year veteran.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-px md:bg-[#4B4DF7]/[0.06] md:rounded-2xl md:overflow-hidden mb-8 md:mb-10">
          {dimensions.map((dim, i) => (
            <motion.div
              key={dim.title}
              data-testid={`dimension-${dim.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-[#F5F5FA] rounded-xl md:rounded-none p-4 md:p-8 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <h3 className="text-[13px] md:text-[17px] font-bold text-[#1A1A2E] mb-0.5 md:mb-1">{t(dim.title)}</h3>
              <span className="text-[10px] md:text-[12px] text-[#4B4DF7]/[0.65] font-medium mb-2 md:mb-4">{t(dim.subtitle)}</span>
              <p className="text-[10px] md:text-[14px] text-[#1A1A2E]/[0.55] leading-[1.5] md:leading-[1.7]">{t(dim.desc)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex items-center gap-4 mt-6 md:mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="/science" className="group inline-flex items-center gap-1.5 md:gap-2 text-[11px] md:text-[13px] font-semibold text-[#4B4DF7] hover:text-[#3A3BD6] shrink-0 transition-colors duration-300">
            {t('Discover the Science')}
            <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
