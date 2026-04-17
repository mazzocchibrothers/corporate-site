// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

export default function PMHowSolves() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pm-how" data-testid="pm-how" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#121212]">
            {t('The best of')}{' '}
            <span className="font-bold gradient-text-on-light">{t('both worlds')}</span>
          </h2>
        </motion.div>

        {/* Two-column comparison */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* Subjective */}
          <motion.div
            className="rounded-2xl border border-[#4B4DF7]/[0.08] bg-white/60 p-10 lg:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="text-[12px] font-bold text-[#4B4DF7]/50 tracking-[0.1em] uppercase mb-5 block">{t('Subjective assessments')}</span>
            <h3 className="text-[20px] font-bold text-[#121212] mb-4">{t('360, 180, manager reviews')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-[#4B4DF7] font-bold mt-0.5">✓</span>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.7]">{t('Captures context, relationships, and situational nuance that only a manager can see firsthand')}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✗</span>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.7]">{t('Without a shared standard, reviews become inconsistent and impossible to compare')}</p>
              </div>
            </div>
          </motion.div>

          {/* Objective */}
          <motion.div
            className="rounded-2xl border border-[#4B4DF7]/[0.12] bg-white/70 p-10 lg:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <span className="text-[12px] font-bold text-[#4B4DF7]/[0.65] tracking-[0.1em] uppercase mb-5 block">{t('Objective assessments')}</span>
            <h3 className="text-[20px] font-bold text-[#121212] mb-4">Skillvue</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-[#4B4DF7] font-bold mt-0.5">✓</span>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.7]">{t('One framework applied consistently. Evaluation is fair and comparable')}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400 font-bold mt-0.5">✗</span>
                <p className="text-[15px] text-[#121212]/[0.65] leading-[1.7]">{t('Objective data alone can miss the human layer. the context behind a result')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div
          className="rounded-2xl bg-[#0E0E0E] p-8 lg:p-10"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <h3 className="text-[20px] font-bold text-white/90 mb-4 text-center">{t('Human Reviews + Skillvue')}</h3>
          <p className="text-[17px] text-white/[0.85] leading-[1.7] text-center max-w-3xl mx-auto font-medium">
            {t('Combining subjective assessment methods with Skillvue assessments brings objectivity without compromising on context and nuance.')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
