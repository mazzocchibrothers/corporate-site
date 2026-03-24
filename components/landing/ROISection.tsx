import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const stats = [
  {
    value: '4.5M',
    label: 'saved annually',
    sublabel: 'in failed hire costs',
    footnote: 'Based on 300 hires, 30% lower failure rate, 50K average cost per failure',
  },
  {
    value: '6-9',
    label: 'months faster',
    sublabel: 'strategic execution',
    footnote: 'When the right people are in the right roles from day one',
  },
  {
    value: '10-30x',
    label: 'ROI',
    sublabel: 'in 18-24 months',
    footnote: 'With payback typically in 6-12 months',
  },
];

export default function ROISection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="roi"
      data-testid="roi-section"
      className="section-breathe relative pt-12 pb-2 lg:pt-16 lg:pb-2 flex items-center"
      style={{ minHeight: '100vh' }}
      ref={ref}
    >
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        {/* Header */}
        {/* Header row: title left + CTA right */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8 mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.6rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1A1A2E] max-w-4xl">
            {t('People are your biggest cost.')}{' '}
            <span className="italic font-bold gradient-text-warm-on-light">
              {t('They can also be your biggest return.')}
            </span>
          </h2>
          <a
            href="/book-meeting"
            data-testid="roi-cta"
            className="group inline-flex items-center gap-3 px-7 py-3.5 text-[13px] font-semibold tracking-wide rounded-full border border-[#4B4DF7]/15 text-[#4B4DF7] hover:bg-[#4B4DF7]/[0.06] hover:border-[#4B4DF7]/30 transition-all duration-500 shrink-0 mt-2"
          >
            {t('Book a Meeting')}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* 3-column stat cards. same style as Problem section */}
        <div className="grid lg:grid-cols-3 gap-px bg-[#4B4DF7]/[0.06] rounded-2xl overflow-hidden mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              data-testid={`roi-stat-${stat.value}`}
              className="group bg-[#F5F5FA] p-10 lg:p-12 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
            >
              {/* Stat number. Inter 800 */}
              <span
                className="block mb-5 text-[#1A1A2E]"
                style={{
                  fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </span>

              {/* Label + Sublabel on same line */}
              <h3
                className="text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-4"
              >
                {t(stat.label)} <span className="font-normal text-[#1A1A2E]/50">{t(stat.sublabel)}</span>
              </h3>

              {/* Footnote */}
              <p className="text-[15px] text-[#1A1A2E]/50 leading-relaxed">
                {t(stat.footnote)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
