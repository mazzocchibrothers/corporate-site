// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const highlights = [
  {
    author: 'Alessandro Mazzarol',
    role: 'TA & EB Manager, Carrefour Italia',
    metric: '-35%',
    metricLabel: 'time-to-hire',
  },
  {
    author: 'Loro Piana',
    role: 'Luxury & Retail',
    metric: '20x',
    metricLabel: 'volume of assessments',
  },
];

export default function CustomerHighlights() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-4">
            {t('Proof, not')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('promises.')}</span>
          </h2>
          <p className="text-[18px] text-[#1A1A2E]/[0.65] leading-[1.75] max-w-2xl">
            {t('See how leading European enterprises are making talent decisions with confidence.')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {highlights.map((h, i) => (
            <motion.div
              key={h.author}
              className="group rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/90 p-8 lg:p-10 transition-all duration-500 flex flex-col"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              {/* Metric */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-[#1A1A2E]" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>
                  {h.metric}
                </span>
                <span className="text-[13px] text-[#1A1A2E]/[0.55] font-medium">{t(h.metricLabel)}</span>
              </div>

              {/* Author */}
              <div>
                <p className="text-[14px] font-semibold text-[#1A1A2E]/70">{h.author}</p>
                <p className="text-[12px] text-[#1A1A2E]/40">{t(h.role)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
