// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const kpis = [
  { value: '<15%', label: 'bad hire rate', sublabel: 'down from 30-40%' },
  { value: '<10%', label: 'early turnover', sublabel: '0-18 months, down from 20-30%' },
  { value: 'Millions', label: 'annual savings', sublabel: 'on failed hires, replacement costs, lost productivity' },
];

export default function TAImpact() {
  const { t, lang } = useLanguage();
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
    <section id="ta-impact" data-testid="ta-impact" className="relative pb-20 lg:pb-24" style={{ background: '#F5F5FA' }} ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div className="mb-8 md:mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">
            {t('Measurable impact on every hiring metric that')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('matters')}</span>
          </h2>
        </motion.div>
        {/* Mobile: horizontal scroll */}
        <div ref={scrollRef} className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 pb-2">
          {kpis.map((k, i) => (
            <motion.div
              key={k.value}
              className="shrink-0 w-[80vw] snap-center rounded-2xl border border-[#4B4DF7]/[0.06] bg-white/70 p-5"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
            >
              <span className="block mb-5 text-[#1A1A2E]" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{k.value}</span>
              <h3 className="text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-4">{t(k.label)} <span className="font-normal text-[#1A1A2E]/50">{t(k.sublabel)}</span></h3>
            </motion.div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="md:hidden mx-auto mt-4 w-36 h-1 rounded-full bg-[#1A1A2E]/10 relative">
          <div className="absolute top-0 h-full w-[35%] rounded-full skillvue-scroll-fill" style={{ left: `${scrollProgress * 0.65}%`, transition: "left 200ms ease-out" }} />
        </div>

        {/* Desktop */}
        <div className="hidden md:grid lg:grid-cols-3 gap-px bg-[#4B4DF7]/[0.06] rounded-2xl overflow-hidden">
          {kpis.map((k, i) => (
            <motion.div key={k.value} className="bg-[#F5F5FA] p-5 md:p-10 lg:p-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}>
              <span className="block mb-5 text-[#1A1A2E]" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{k.value}</span>
              <h3 className="text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-4">{t(k.label)} <span className="font-normal text-[#1A1A2E]/50">{t(k.sublabel)}</span></h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
