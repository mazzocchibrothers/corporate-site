// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const kpis = [
  { value: '<15%', label: 'bad hire rate', sublabel: 'down from 30-40%' },
  { value: '<10%', label: 'early turnover', sublabel: '0-18 months, down from 20-30%' },
  { value: 'Millions', label: 'annual savings', sublabel: 'on failed hires, replacement costs, lost productivity' },
];

export default function TAImpact() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ta-impact" data-testid="ta-impact" className="relative pb-20 lg:pb-24" style={{ background: '#F5F5FA' }} ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div className="mb-8 md:mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">
            {t('Measurable impact on every hiring metric that')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('matters')}</span>
          </h2>
        </motion.div>
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {kpis.map((k, i) => (
            <motion.div key={k.value} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-10 lg:p-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}>
              <span className="block mb-6 md:mb-10 text-[#1A1A2E] font-semibold" style={{ fontSize: '64px', lineHeight: 1, letterSpacing: '-0.03em' }}>{k.value}</span>
              <h3 className="text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-4">{t(k.label)} <span className="font-normal text-[#7A7A7A]">{t(k.sublabel)}</span></h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
