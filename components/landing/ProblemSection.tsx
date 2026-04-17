import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const painCards = [
  {
    stat: '35%',
    title: 'of hires fail within 18 months',
    desc: "Costing 3-4x salary each time, and that's before you count the opportunity cost.",
  },
  {
    stat: '65%',
    title: 'of transformations stall',
    desc: 'Not due to bad strategy, but undetected skill gaps that only surface 12 months in.',
  },
  {
    stat: '60%',
    title: 'of critical roles have zero ready successors',
    desc: 'Succession pipelines are largely fiction. The next leadership crisis is already building.',
  },
];

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function ProblemSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="section-breathe relative py-20 lg:py-24"
    >
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <AnimatedSection className="mb-6">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#121212]">
            {t('Your Biggest')} <span className="font-bold gradient-text-on-light">{t('Opportunity')}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="max-w-[900px] mb-24">
          <p className="text-[clamp(1.1rem,2vw,1.5rem)] font-normal leading-[1.55] text-[#121212]">
            {t('Talent represents 60-70% of your operating costs.')}{' '}
            <span className="text-[#121212]/35">
              {t('Yet hiring decisions are based on CVs and gut feel. Promotions go to whoever is most visible, not most capable. Transformations stall because nobody mapped the skill gaps before spending millions in that project.')}
            </span>
          </p>
          <p className="text-[clamp(1.1rem,2vw,1.5rem)] font-normal leading-[1.55] text-[#121212]/35 mt-6">
            {t('And when the CFO asks for talent ROI,')}{' '}
            <span className="font-semibold gradient-text-on-light">{t('HR has no answer.')}</span>
          </p>
        </AnimatedSection>

        {/* Pain cards. 3 columns, clean & minimal */}
        <div ref={ref} className="grid lg:grid-cols-3 gap-px bg-[#4B4DF7]/[0.06] rounded-2xl overflow-hidden">
          {painCards.map((card, i) => (
            <motion.div
              key={card.stat + i}
              data-testid={`pain-card-${card.stat.replace('%', '')}`}
              className="group bg-[#F7F7F7] p-6 lg:p-12 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            >
              {/* Stat number */}
              <span
                className="block mb-3 lg:mb-5 text-[#121212] text-[1.5rem] lg:text-[clamp(2.8rem,5vw,4.2rem)]"
                style={{
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {card.stat}
              </span>

              {/* Title */}
              <h3 className="text-[15px] lg:text-[18px] font-semibold text-[#121212]/80 leading-snug mb-3 lg:mb-4">
                {t(card.title)}
              </h3>

              {/* Description */}
              <p className="text-[13px] lg:text-[15px] text-[#121212]/50 leading-[1.7] lg:leading-[1.75]">
                {t(card.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
