import React, { useRef, useState, useEffect } from 'react';
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
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const pct = max > 0 ? (el.scrollLeft / max) * 100 : 0;
      setScrollProgress(pct);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="section-breathe relative py-16 md:py-20 lg:py-24"
    >
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <AnimatedSection className="mb-4 md:mb-6">
          <h2 className="text-[clamp(1.6rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">
            {t('Your Biggest')} <span className="italic font-bold gradient-text-on-light">{t('Opportunity')}</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="max-w-[900px] mb-10 md:mb-24">
          <p className="text-[15px] md:text-[clamp(1.1rem,2vw,1.5rem)] font-normal leading-[1.55] text-[#1A1A2E]">
            {t('Talent represents 60-70% of your operating costs.')}{' '}
            <span className="text-[#7A7A7A]">
              {t('Yet hiring decisions are based on CVs and gut feel. Promotions go to whoever is most visible, not most capable. Transformations stall because nobody mapped the skill gaps before spending millions in that project.')}
            </span>
          </p>
          <p className="text-[15px] md:text-[clamp(1.1rem,2vw,1.5rem)] font-normal leading-[1.55] text-[#7A7A7A] mt-4 md:mt-6">
            {t('And when the CFO asks for talent ROI,')}{' '}
            <span className="font-semibold gradient-text-on-light">{t('HR has no answer.')}</span>
          </p>
        </AnimatedSection>

        {/* Pain cards — horizontal scroll on mobile, 3-col grid on desktop */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
          {painCards.map((card, i) => (
            <motion.div
              key={card.stat + i}
              data-testid={`pain-card-${card.stat.replace('%', '')}`}
              className="group bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-6 lg:p-12 flex flex-col min-h-[240px] md:min-h-0"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            >
              {/* Stat number */}
              <span
                className="block text-[#1A1A2E] text-[64px] font-semibold mb-6 md:mb-10"
                style={{
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {card.stat}
              </span>

              {/* Title + Description */}
              <div>
                <h3 className="text-[15px] md:text-[15px] lg:text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-2 md:mb-3 lg:mb-4">
                  {t(card.title)}
                </h3>
                <p className="text-[13px] md:text-[13px] lg:text-[15px] text-[#7A7A7A] leading-[1.6] md:leading-[1.7] lg:leading-[1.75]">
                  {t(card.desc)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
