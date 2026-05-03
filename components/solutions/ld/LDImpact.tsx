// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Target, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const kpis = [
  {
    value: '6-9mo',
    icon: Zap,
    label: 'faster execution',
    sublabel: 'on strategic initiatives',
    detail: 'When you know exactly which skills your people have and which they lack, transformation projects stop stalling. Teams are staffed with the right capabilities from day one.',
  },
  {
    value: '85%+',
    icon: Target,
    label: 'hiring success',
    sublabel: 'territories fill faster, products launch on-time',
    detail: 'Objective skill data helps you place people where they can perform immediately. No more guessing, no more costly mismatches between role and capability.',
  },
  {
    value: 'Millions',
    icon: TrendingUp,
    label: 'revenue captured',
    sublabel: 'opportunities realized earlier',
    detail: 'Every month a critical role stays empty or misaligned, revenue is left on the table. Skill-driven L&D closes gaps faster and turns people into your competitive advantage.',
  },
];

export default function LDImpact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
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

  const renderCard = (k, i) => {
    const Icon = k.icon;
    return (
      <motion.div
        key={k.value}
        className="group rounded-2xl border border-[#121212]/[0.08] bg-white p-6 md:p-8 lg:p-10 hover:border-[#4B4DF7]/[0.18] hover:shadow-xl hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 flex flex-col h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
      >
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#4B4DF7]/[0.06] border border-[#4B4DF7]/[0.08] flex items-center justify-center group-hover:bg-[#4B4DF7]/[0.12] group-hover:border-[#4B4DF7]/[0.15] transition-all duration-500">
            <Icon className="h-5 w-5 text-[#4B4DF7]/50 group-hover:text-[#4B4DF7] transition-colors duration-500" strokeWidth={1.5} />
          </div>
        </div>

        <span
          className="block mb-2 text-[#121212]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}
        >
          {t(k.value)}
        </span>

        <h3 className="text-[15px] md:text-[17px] font-semibold text-[#121212]/80 leading-snug mb-1.5">
          {t(k.label)} <span className="font-normal text-[#121212]/40">{t(k.sublabel)}</span>
        </h3>

        <div className="w-12 h-px bg-[#4B4DF7]/[0.15] my-4 md:my-5" />

        <p className="text-[14px] text-[#121212]/[0.45] leading-[1.75] flex-1">{t(k.detail)}</p>
      </motion.div>
    );
  };

  return (
    <section id="ld-impact" data-testid="ld-impact" className="section-breathe relative md:flex md:items-center" style={{ minHeight: '100vh' }} ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-20 lg:py-28">

        {/* Header */}
        <motion.div className="text-center mb-12 md:mb-16 lg:mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#121212] mb-5">
            {t('Measurable impact on')}{' '}
            <span className="font-bold gradient-text-on-light">{t('L&D outcomes')}</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#121212]/[0.45] leading-[1.75] max-w-2xl mx-auto">
            {t('When learning investments are driven by objective skill data, the results speak for themselves.')}
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div ref={scrollRef} className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 pb-2">
          {kpis.map((k, i) => (
            <div key={k.value} className="shrink-0 w-[80vw] snap-center">
              {renderCard(k, i)}
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="md:hidden mx-auto mt-4 w-48 h-1.5 rounded-full bg-[#1A1A2E]/20 relative">
          <div className="absolute top-0 h-full w-[35%] rounded-full skillvue-scroll-fill" style={{ left: `${scrollProgress * 0.65}%` }} />
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid lg:grid-cols-3 gap-5">
          {kpis.map((k, i) => renderCard(k, i))}
        </div>
      </div>
    </section>
  );
}
