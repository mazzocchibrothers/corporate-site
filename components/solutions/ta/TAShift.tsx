// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const oldItems = [
  'CV screening + gut feeling',
  'Unstructured interviews with no comparability',
  'Quality degrades as volume increases',
  'Hiring decisions made on who "felt right"',
  'Early turnover as a cost of doing business',
];

const newItems = [
  'AI-powered skill assessments from the top of the funnel',
  'Structured, psychometrically validated evaluations across every candidate',
  'Same scientific rigor whether you assess 10 or 10,000 candidates',
  'Hiring decisions backed by objective scores, evidence, and explainable recommendations',
  'Predictive matching that reduces mismatch from day one',
];

export default function TAShift() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const scrollRef = useRef(null);
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
    <section id="ta-shift" data-testid="ta-shift" className="relative py-20 lg:py-28 flex items-center"  ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full">
        <motion.div className="mb-10 md:mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white/90">
            {t('From CV screening to')}{' '}
            <span className="font-bold gradient-text">{t('skill intelligence')}</span>
          </h2>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div ref={scrollRef} className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 pb-2">
          {/* Old playbook */}
          <motion.div
            className="shrink-0 w-[85vw] snap-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-[13px] font-bold text-white/30 tracking-[0.12em] uppercase mb-6 block">{t('The old playbook')}</span>
            <div className="space-y-4">
              {oldItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-5 w-5 text-white/30" />
                  </div>
                  <p className="text-[14px] text-white/40 leading-[1.7]">{t(item)}</p>
                </div>
              ))}
            </div>
          </motion.div>
          {/* With Skillvue */}
          <motion.div
            className="shrink-0 w-[85vw] snap-center rounded-2xl border border-[#4B4DF7]/[0.15] bg-white/[0.06] p-5"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span className="text-[13px] font-bold text-[#9B9DFB]/[0.65] tracking-[0.12em] uppercase mb-6 block">{t('With Skillvue')}</span>
            <div className="space-y-4">
              {newItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4B4DF7]/[0.12] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-[#9B9DFB]" />
                  </div>
                  <p className="text-[14px] text-white/[0.65] leading-[1.7]">{t(item)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Progress bar */}
        <div className="md:hidden mx-auto mt-4 w-36 h-1 rounded-full bg-white/10 relative">
          <div className="absolute top-0 h-full w-[35%] rounded-full skillvue-scroll-fill" style={{ left: `${scrollProgress * 0.65}%`, transition: "left 200ms ease-out" }} />
        </div>

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {/* Old playbook */}
          <motion.div
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-10 lg:p-14"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-[13px] font-bold text-white/30 tracking-[0.12em] uppercase mb-10 block">{t('The old playbook')}</span>
            <div className="space-y-4 md:space-y-7">
              {oldItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-5 w-5 md:h-4 md:w-4 text-white/30" />
                  </div>
                  <p className="text-[14px] md:text-[17px] text-white/40 leading-[1.7]">{t(item)}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* With Skillvue */}
          <motion.div
            className="rounded-2xl border border-[#4B4DF7]/[0.15] bg-white/[0.06] p-5 md:p-10 lg:p-14"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span className="text-[13px] font-bold text-[#9B9DFB]/[0.65] tracking-[0.12em] uppercase mb-10 block">{t('With Skillvue')}</span>
            <div className="space-y-4 md:space-y-7">
              {newItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4B4DF7]/[0.12] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-5 w-5 md:h-4 md:w-4 text-[#9B9DFB]" />
                  </div>
                  <p className="text-[14px] md:text-[17px] text-white/[0.65] leading-[1.7]">{t(item)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
