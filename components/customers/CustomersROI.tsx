// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '€4.5M', label: 'saved annually in failed hire costs', sub: 'Based on 300 hires, 30% failure rate, €50K average cost per failure' },
  { value: '6-9mo', label: 'faster strategic execution', sub: 'When the right people are in the right roles from day one' },
  { value: '10-30x', label: 'ROI in 18-24 months', sub: 'With payback typically in 6-12 months' },
];

export default function CustomersROI() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const renderCard = (s, i) => (
    <motion.div
      key={s.value}
      className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-10 h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
    >
      <span className="block mb-6 md:mb-10 text-[#121212] font-semibold text-[32px] md:text-[64px]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{t(s.value)}</span>
      <h3 className="text-[16px] md:text-[18px] font-semibold text-[#121212]/80 leading-snug mb-2">{t(s.label)}</h3>
      <p className="text-[13px] md:text-[14px] text-[#7A7A7A] leading-relaxed">{t(s.sub)}</p>
    </motion.div>
  );

  return (
    <section id="customers-roi" data-testid="customers-roi" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div className="mb-12 md:mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">
            {t('People are your biggest cost.')}{' '}
            <span className="font-bold gradient-text-warm-on-light">{t('They can also be your biggest return.')}</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5 mb-10">
          {stats.map((s, i) => renderCard(s, i))}
        </div>

        <motion.div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}>
          <p className="text-[14px] md:text-[15px] text-[#7A7A7A]">{t('Every other budget line has an ROI framework. These companies proved talent spend can too.')}</p>
          <Button asChild variant="primary" mode="light">
            <a href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'}>
              {t('Book a Demo')}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
