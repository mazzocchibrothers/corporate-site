// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const stats = [
  { value: '€4.5M', label: 'saved annually in failed hire costs', sub: 'Based on 300 hires, 30% failure rate, €50K average cost per failure' },
  { value: '6-9mo', label: 'faster strategic execution', sub: 'When the right people are in the right roles from day one' },
  { value: '10-30x', label: 'ROI in 18-24 months', sub: 'With payback typically in 6-12 months' },
];

export default function CustomersROI() {
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

  const renderCard = (s, i) => (
    <motion.div
      key={s.value}
      className="bg-[#F7F7F7] rounded-2xl md:rounded-none p-6 md:p-10 lg:p-12 h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
    >
      <span className="block mb-3 md:mb-5 text-[#121212]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{t(s.value)}</span>
      <h3 className="text-[16px] md:text-[18px] font-semibold text-[#121212]/80 leading-snug mb-2">{t(s.label)}</h3>
      <p className="text-[13px] md:text-[14px] text-[#121212]/50 leading-relaxed">{t(s.sub)}</p>
    </motion.div>
  );

  return (
    <section id="customers-roi" data-testid="customers-roi" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div className="mb-12 md:mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#121212]">
            {t('People are your biggest cost.')}{' '}
            <span className="font-bold gradient-text-warm-on-light">{t('They can also be your biggest return.')}</span>
          </h2>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div ref={scrollRef} className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 pb-2">
          {stats.map((s, i) => (
            <div key={s.value} className="shrink-0 w-[80vw] snap-center">
              {renderCard(s, i)}
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="md:hidden mx-auto mt-4 mb-10 w-48 h-1.5 rounded-full bg-[#1A1A2E]/20 relative">
          <div className="absolute top-0 h-full w-[35%] rounded-full skillvue-scroll-fill" style={{ left: `${scrollProgress * 0.65}%` }} />
        </div>

        {/* Desktop: bordered grid */}
        <div className="hidden md:grid lg:grid-cols-3 gap-px bg-[#4B4DF7]/[0.06] rounded-2xl overflow-hidden mb-10">
          {stats.map((s, i) => renderCard(s, i))}
        </div>

        <motion.div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}>
          <p className="text-[14px] md:text-[15px] text-[#121212]/50">{t('Every other budget line has an ROI framework. These companies proved talent spend can too.')}</p>
          <a href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'} className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 text-[13px] font-semibold tracking-wide rounded-full border border-[#4B4DF7]/15 text-[#4B4DF7] hover:bg-[#4B4DF7]/[0.06] transition-all duration-500 shrink-0">
            {t('Book a Demo')}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
