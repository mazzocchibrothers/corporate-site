// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const integrations = ['Cornerstone', 'Docebo', 'SAP Learning'];

export default function LDIntegration() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ld-integration" data-testid="ld-integration" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-10 lg:p-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold text-white/90 mb-6">
            {t('Skillvue enriches your')}{' '}
            <span className="font-bold gradient-text">{t('learning ecosystem')}</span>
          </h2>
          <p className="text-[16px] text-white/[0.65] leading-[1.75] max-w-3xl mb-10">
            {t('Skillvue integrates natively with your LMS and LXP. feeding precise skill gap data into the systems where learning is delivered. The result: the right content reaches the right people based on verified needs, not generic assignments.')}
          </p>
          <div className="flex flex-wrap gap-3">
            {integrations.map((name) => (
              <span key={name} className="inline-flex px-5 py-2.5 rounded-full text-[13px] font-medium text-white/[0.65] border border-white/[0.1] bg-white/[0.03]">
                {name}
              </span>
            ))}
            <span className="inline-flex px-5 py-2.5 rounded-full text-[13px] font-medium text-white/40 border border-white/[0.06]">{t('+ more')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
