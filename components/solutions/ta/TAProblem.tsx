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
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ta-problem" data-testid="ta-problem" className="section-breathe relative py-20 lg:py-24 md:flex md:items-center"  ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div className="max-w-[900px] mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-8">
            {t('The blind spots in your')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('hiring decisions')}</span>
          </h2>
          <p className="text-[14px] md:text-[18px] text-[#7A7A7A] leading-[1.75]">
            {t('How do you really know who will perform before the interview? How do you make screening predictive and comparable at scale? How do you cut early turnover and mismatch from day one?')}
          </p>
        </motion.div>

        {/* Pain cards — 3-col grid, consistent with homepage card layout */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
          {pains.map((p, i) => (
            <motion.div
              key={p.stat}
              data-testid={`ta-pain-${i}`}
              className="group bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-6 lg:p-10 flex flex-col min-h-[240px] md:min-h-0"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            >
              <span
                className="block text-[#1A1A2E] text-[32px] md:text-[clamp(1.75rem,3.2vw,4rem)] font-semibold mb-6 md:mb-10"
                style={{ lineHeight: 1, letterSpacing: '-0.03em' }}
              >
                {p.stat}
              </span>
              <div>
                <h3 className="text-[15px] md:text-[15px] lg:text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-2 md:mb-3 lg:mb-4">{t(p.title)}</h3>
                <p className="text-[13px] md:text-[13px] lg:text-[15px] text-[#7A7A7A] leading-[1.6] md:leading-[1.7] lg:leading-[1.75]">{t(p.desc)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
