'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { m, useInView, AnimatePresence } from 'framer-motion';
import { Map, Brain, CheckCircle } from 'lucide-react';

// The keywords are ids, not copy: the copy is in the catalogue, keyed on them.
// They used to be English strings passed through t(), and none of the twelve
// was in the dictionary — so the Italian site rendered them in English while
// looking, at the call site, as though it did not.
const steps = [
  {
    id: 'map',
    num: '01',
    icon: Map,
    accent: '#4B4DF7',
    keywords: ['skills', 'mindset', 'readiness', 'languages'],
  },
  {
    id: 'predict',
    num: '02',
    icon: Brain,
    accent: '#7577F8',
    keywords: ['readyNow', 'months', 'gapAnalysis', 'coPilot'],
  },
  {
    id: 'decide',
    num: '03',
    icon: CheckCircle,
    accent: '#FF5F24',
    keywords: ['objectiveData', 'auditable', 'gdpr', 'defensible'],
  },
];

export default function HowItWorksSection() {
  const t = useTranslations('home');
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % 3), 5000);
    return () => clearInterval(timer);
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
        <m.div
          className="text-center mb-10 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.6rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#1A1A2E]">{t.rich('howItWorks.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </m.div>

        {/* 3 step cards — horizontal scroll on mobile, 3-col grid on desktop */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === active;
            return (
              <m.div
                key={step.num}
                onClick={() => setActive(i)}
                className="cursor-pointer relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                {/* Card */}
                <m.div
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
                      <m.div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{ background: step.accent }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        key={`bar-${active}`}
                      />
                    )}
                  </div>

                  <div className="p-5 md:p-8 lg:p-10 flex flex-col flex-1">
                    {/* Top: Number + Icon */}
                    <div className="flex items-center justify-between mb-6 md:mb-8 lg:mb-10">
                      <m.span
                        className="text-[32px] md:text-[48px] lg:text-[56px] font-light leading-none tracking-[-0.04em]"
                        animate={{ color: isActive ? 'rgba(155,157,251,0.3)' : 'rgba(26,26,46,0.12)' }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.num}
                      </m.span>
                      <m.div
                        className="w-9 h-9 md:w-12 md:h-12 rounded-xl flex items-center justify-center"
                        animate={{
                          backgroundColor: isActive ? 'rgba(75,77,247,0.15)' : 'rgba(75,77,247,0.05)',
                          borderColor: isActive ? 'rgba(155,157,251,0.2)' : 'rgba(75,77,247,0.08)',
                        }}
                        transition={{ duration: 0.5 }}
                        style={{ border: '1px solid' }}
                      >
                        <Icon className="h-4 w-4 md:h-5 md:w-5" style={{ color: isActive ? '#9B9DFB' : 'rgba(75,77,247,0.35)' }} strokeWidth={1.5} />
                      </m.div>
                    </div>

                    {/* Title + Description + Tags */}
                    <m.h3
                        className="text-[18px] md:text-[28px] lg:text-[32px] font-semibold mb-2 md:mb-4 leading-tight tracking-[-0.02em]"
                        animate={{ color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(26,26,46,0.85)' }}
                        transition={{ duration: 0.5 }}
                      >
                        {t(`howItWorks.steps.${step.id}.title`)}
                      </m.h3>

                      <m.p
                        className="text-[13px] md:text-[15px] leading-[1.6] md:leading-[1.8] mb-3 md:mb-8"
                        animate={{ color: isActive ? 'rgba(255,255,255,0.5)' : '#7A7A7A' }}
                        transition={{ duration: 0.5 }}
                      >
                        {t(`howItWorks.steps.${step.id}.desc`)}
                      </m.p>

                    {/* Keyword tags */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {step.keywords.map(kw => (
                        <m.span
                          key={kw}
                          className="inline-flex px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[11px] md:text-[11px] font-semibold tracking-wide"
                          animate={{
                            color: isActive ? 'rgba(155,157,251,0.7)' : 'rgba(75,77,247,1.0)',
                            backgroundColor: isActive ? 'rgba(75,77,247,0.12)' : 'rgba(75,77,247,0.04)',
                            borderColor: isActive ? 'rgba(75,77,247,0.2)' : 'rgba(75,77,247,0.08)',
                          }}
                          transition={{ duration: 0.5 }}
                          style={{ border: '1px solid' }}
                        >
                          {t(`howItWorks.steps.${step.id}.keywords.${kw}`)}
                        </m.span>
                      ))}
                    </div>
                  </div>
                </m.div>
              </m.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
