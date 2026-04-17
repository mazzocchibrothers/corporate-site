// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Ruler } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pillars = [
  {
    icon: Brain,
    title: 'I-O Psychology',
    subtitle: 'Defining what to measure and why it matters',
    desc: 'I/O psychology grounds our platform in decades of research on human performance at work, ensuring we map the right skills, select the right constructs, and use the right mix of assessment types for each talent decision.',
  },
  {
    icon: Ruler,
    title: 'Psychometrics',
    subtitle: 'Defining how to measure it right',
    desc: 'Psychometrics governs the design of every assessment we build: which format, which scale, which scoring model. The goal is simple: maximize accuracy, minimize noise, and make sure results mean what they claim to mean.',
  },
];

export default function ScientificPillars() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pillars" data-testid="scientific-pillars" className="section-breathe relative py-16 md:py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div className="mb-8 md:mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">
            {t('Two disciplines, one standard of')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('rigor')}</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} className="group rounded-xl md:rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/80 p-5 md:p-10 lg:p-12 transition-all duration-500" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}>
                <Icon className="h-5 w-5 md:h-6 md:w-6 text-[#4B4DF7]/40 mb-3 md:mb-5" strokeWidth={1.5} />
                <h3 className="text-[17px] md:text-[22px] font-bold text-[#1A1A2E] mb-1 md:mb-2">{t(p.title)}</h3>
                <p className="text-[12px] md:text-[15px] text-[#4B4DF7]/[0.65] font-medium mb-3 md:mb-5">{t(p.subtitle)}</p>
                <p className="text-[12px] md:text-[15px] text-[#1A1A2E]/[0.65] leading-[1.5] md:leading-[1.75]">{t(p.desc)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
