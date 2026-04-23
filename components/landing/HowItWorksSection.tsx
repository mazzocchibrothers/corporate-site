import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Map, Brain, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const steps = [
  {
    num: '01',
    title: 'Map',
    icon: Map,
    accent: '#4B4DF7',
    desc: 'Assess skills, mindset, and readiness across candidates and employees using AI-powered psychometric assessments, customized to your leadership model and deployable at scale across 50+ languages.',
    keywords: ['Skills', 'Mindset', 'Readiness', '50+ languages'],
  },
  {
    num: '02',
    title: 'Predict',
    icon: Brain,
    accent: '#7577F8',
    desc: 'AI co-pilots surface who is ready now, who can be developed in 3-6 months, and where gaps will block your strategy, before they become expensive surprises.',
    keywords: ['Ready now', '3-6 months', 'Gap analysis', 'AI co-pilot'],
  },
  {
    num: '03',
    title: 'Decide',
    icon: CheckCircle,
    accent: '#FF5F24',
    desc: 'Every hire, promotion, and transformation investment is backed by objective, auditable data. GDPR-compliant. Defensible to boards, regulators, and investors.',
    keywords: ['Objective data', 'Auditable', 'GDPR', 'Defensible'],
  },
];

export default function HowItWorksSection() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

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
      id="how-it-works"
      data-testid="how-it-works-section"
      className="section-breathe relative md:flex md:items-center overflow-hidden md:min-h-screen"
      ref={sectionRef}
    >
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-16 md:py-20 lg:py-28">

        {/* Title */}
        <motion.div
          className="text-center mb-10 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.6rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#1A1A2E]">
            {t('From assessment to action')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('in three steps')}</span>
          </h2>
        </motion.div>

        {/* 3 step cards — horizontal scroll on mobile, 3-col grid on desktop */}
        <div ref={scrollRef} className="md:grid md:grid-cols-3 md:gap-4 lg:gap-5 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === active;
            return (
              <motion.div
                key={step.num}
                onClick={() => setActive(i)}
                className="cursor-pointer relative group shrink-0 w-[70vw] md:w-auto snap-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                {/* Card */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden h-full md:aspect-auto flex flex-col"
                  animate={{
                    backgroundColor: isActive ? '#0D0D1F' : '#F0F0F8',
                    borderColor: isActive ? 'rgba(75,77,247,0.3)' : 'rgba(26,26,46,0.08)',
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ border: '1px solid' }}
                >
                  {/* Top progress bar */}
                  <div className="h-1 w-full relative shrink-0" style={{ background: isActive ? 'rgba(75,77,247,0.15)' : 'rgba(26,26,46,0.04)' }}>
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{ background: step.accent }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        key={`bar-${active}`}
                      />
                    )}
                  </div>

                  <div className="p-5 md:p-8 lg:p-10 flex flex-col justify-between flex-1">
                    {/* Top: Number + Icon */}
                    <div className="flex items-center justify-between mb-auto">
                      <motion.span
                        className="text-[32px] md:text-[48px] lg:text-[56px] font-bold leading-none tracking-[-0.04em]"
                        animate={{ color: isActive ? 'rgba(155,157,251,0.3)' : 'rgba(26,26,46,0.12)' }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.num}
                      </motion.span>
                      <motion.div
                        className="w-9 h-9 md:w-12 md:h-12 rounded-xl flex items-center justify-center"
                        animate={{
                          backgroundColor: isActive ? 'rgba(75,77,247,0.15)' : 'rgba(75,77,247,0.05)',
                          borderColor: isActive ? 'rgba(155,157,251,0.2)' : 'rgba(75,77,247,0.08)',
                        }}
                        transition={{ duration: 0.5 }}
                        style={{ border: '1px solid' }}
                      >
                        <Icon className="h-4 w-4 md:h-5 md:w-5" style={{ color: isActive ? '#9B9DFB' : 'rgba(75,77,247,0.35)' }} strokeWidth={1.5} />
                      </motion.div>
                    </div>

                    {/* Bottom: Title + Description + Tags */}
                    <div>
                      <motion.h3
                        className="text-[18px] md:text-[28px] lg:text-[32px] font-bold mb-2 md:mb-4 leading-tight tracking-[-0.02em]"
                        animate={{ color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(26,26,46,0.85)' }}
                        transition={{ duration: 0.5 }}
                      >
                        {t(step.title)}
                      </motion.h3>

                      <motion.p
                        className="text-[13px] md:text-[15px] leading-[1.6] md:leading-[1.8] mb-3 md:mb-8"
                        animate={{ color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,46,0.55)' }}
                        transition={{ duration: 0.5 }}
                      >
                        {t(step.desc)}
                      </motion.p>

                      {/* Keyword tags */}
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {step.keywords.map(kw => (
                          <motion.span
                            key={kw}
                            className="inline-flex px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[11px] md:text-[11px] font-semibold tracking-wide"
                            animate={{
                              color: isActive ? 'rgba(155,157,251,0.7)' : 'rgba(75,77,247,0.5)',
                              backgroundColor: isActive ? 'rgba(75,77,247,0.12)' : 'rgba(75,77,247,0.04)',
                              borderColor: isActive ? 'rgba(75,77,247,0.2)' : 'rgba(75,77,247,0.08)',
                            }}
                            transition={{ duration: 0.5 }}
                            style={{ border: '1px solid' }}
                          >
                            {t(kw)}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar — mobile only */}
        <div className="md:hidden mx-auto mt-4 w-36 h-1 rounded-full bg-[#1A1A2E]/10 relative">
          <div
            className="absolute top-0 h-full w-[35%] rounded-full skillvue-scroll-fill"
            style={{ left: `${scrollProgress * 0.65}%`, transition: "left 200ms ease-out" }}
          />
        </div>
      </div>
    </section>
  );
}
