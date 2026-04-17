// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const pains = [
  { num: '01', title: 'Near-zero visibility on actual capabilities', desc: 'People data live in separate silos. Nobody connects the dots across the organization.' },
  { num: '02', title: 'Programs picked on gut feel', desc: 'Training budgets deployed based on manager requests and vendor catalogues, not evidence of where gaps actually exist.' },
  { num: '03', title: 'ROI is a question nobody can answer', desc: '"We trained X people". but what was the business impact?' },
];

export default function LDProblem() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ld-problem" data-testid="ld-problem" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#121212]">
            {t('The blind spots in your')}{' '}
            <span className="font-bold gradient-text-on-light">{t('L&D investments')}</span>
          </h2>
        </motion.div>

        {/* Numbered vertical list */}
        <div className="space-y-0">
          {pains.map((p, i) => (
            <motion.div
              key={p.num}
              data-testid={`ld-pain-${i}`}
              className="group flex gap-8 py-10 border-t border-[#4B4DF7]/[0.08] last:border-b last:border-[#4B4DF7]/[0.08]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <span className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-[#4B4DF7]/[0.12] leading-none shrink-0 w-20">{p.num}</span>
              <div>
                <h3 className="text-[20px] font-bold text-[#121212] mb-3">{t(p.title)}</h3>
                <p className="text-[16px] text-[#121212]/[0.65] leading-[1.75] max-w-2xl">{t(p.desc)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
