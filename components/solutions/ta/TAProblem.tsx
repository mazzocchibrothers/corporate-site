// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const pains = [
  { stat: '30-40%', title: 'of hires fail within 18 months', desc: 'Costing 3-4x salary each time \u2014 before you count the opportunity cost of a vacant role.' },
  { stat: 'No scale', title: "Screening doesn't scale", desc: 'Manual CV review degrades quality as volume increases. Different countries, different standards, no comparability.' },
  { stat: '0.05', title: 'Interviews predict nothing', desc: 'Unstructured interviews have among the lowest predictive validity of any selection method, yet they drive most hiring decisions.' },
];

export default function TAProblem() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ta-problem" data-testid="ta-problem" className="section-breathe relative py-20 lg:py-24 flex items-center" style={{ minHeight: '100vh' }} ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="max-w-[900px] mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#121212] mb-8">
            {t('The blind spots in your')}{' '}
            <span className="font-bold gradient-text-on-light">{t('hiring decisions')}</span>
          </h2>
          <p className="text-[18px] text-[#121212]/[0.65] leading-[1.75]">
            {t('How do you really know who will perform before the interview? How do you make screening predictive and comparable at scale? How do you cut early turnover and mismatch from day one?')}
          </p>
        </motion.div>

        {/* Vertical stacked pain cards with large stat on left */}
        <div className="space-y-4">
          {pains.map((p, i) => (
            <motion.div
              key={p.stat}
              data-testid={`ta-pain-${i}`}
              className="group grid grid-cols-12 gap-6 lg:gap-10 items-center rounded-2xl border border-[#4B4DF7]/[0.06] bg-white/60 hover:bg-white/90 hover:border-[#4B4DF7]/[0.15] p-8 lg:p-10 transition-all duration-500"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
            >
              <div className="col-span-4 lg:col-span-3">
                <span className="block text-[#121212]" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>{p.stat}</span>
              </div>
              <div className="col-span-8 lg:col-span-9">
                <h3 className="text-[18px] font-bold text-[#121212]/80 mb-2">{t(p.title)}</h3>
                <p className="text-[15px] text-[#121212]/50 leading-[1.7]">{t(p.desc)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
