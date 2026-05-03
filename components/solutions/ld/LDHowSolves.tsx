// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Layers, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pillars = [
  {
    num: '01',
    icon: Search,
    title: 'Precise skill gap analysis',
    desc: 'Objective identification of improvement areas at both individual and aggregate level. Know exactly what to invest in, not where to guess.',
    stat: '3x',
    statLabel: 'more targeted L&D investments vs. catalogue-based programs',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Data-driven learning design',
    desc: 'Programs built on real, measured needs, not standard catalogues. Every learning investment tied to a validated gap.',
    stat: '60%',
    statLabel: 'reduction in unused or misaligned training budget',
  },
  {
    num: '03',
    icon: TrendingUp,
    title: 'Measurable ROI',
    desc: 'Pre/post assessment comparison. Objective tracking of progress and concrete impact on performance.',
    stat: '2-4x',
    statLabel: 'faster skill development with targeted interventions',
  },
];

export default function LDHowSolves() {
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

  const renderCard = (p, i) => {
    const Icon = p.icon;
    return (
      <motion.div
        key={p.title}
        className="group rounded-2xl border border-[#121212]/[0.08] bg-white p-6 md:p-8 lg:p-10 hover:border-[#4B4DF7]/[0.18] hover:shadow-xl hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 flex flex-col h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
      >
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <span className="text-[36px] md:text-[42px] font-bold text-[#121212]/[0.1] leading-none tracking-[-0.03em]">{p.num}</span>
          <div className="w-11 h-11 rounded-xl bg-[#4B4DF7]/[0.06] border border-[#4B4DF7]/[0.08] flex items-center justify-center group-hover:bg-[#4B4DF7]/[0.12] group-hover:border-[#4B4DF7]/[0.15] transition-all duration-500">
            <Icon className="h-5 w-5 text-[#4B4DF7]/50 group-hover:text-[#4B4DF7] transition-colors duration-500" strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="text-[18px] md:text-[20px] font-bold text-[#121212] mb-2 md:mb-3 leading-tight">{t(p.title)}</h3>
        <p className="text-[14px] md:text-[15px] text-[#121212]/[0.5] leading-[1.7] mb-5 md:mb-8 flex-1">{t(p.desc)}</p>

        <div className="rounded-xl bg-[#F7F7F7] border border-[#121212]/[0.06] p-4 md:p-5">
          <span className="text-[24px] md:text-[28px] font-bold text-[#121212] leading-none tracking-[-0.02em] block mb-1.5">{p.stat}</span>
          <span className="text-[12px] text-[#121212]/[0.4] leading-[1.5]">{t(p.statLabel)}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="ld-how" data-testid="ld-how" className="section-breathe relative md:flex md:items-center" style={{ minHeight: '100vh' }} ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-20 lg:py-28">

        <motion.div className="max-w-3xl mb-12 md:mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#121212] mb-5">
            {t('Three pillars of')}{' '}
            <span className="font-bold gradient-text-on-light">{t('skill-driven L&D')}</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#121212]/[0.45] leading-[1.75]">
            {t("Stop investing in training that doesn't move the needle. Measure gaps, design programs, and track impact with objective data.")}
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div ref={scrollRef} className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 pb-2">
          {pillars.map((p, i) => (
            <div key={p.title} className="shrink-0 w-[80vw] snap-center">
              {renderCard(p, i)}
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="md:hidden mx-auto mt-4 w-48 h-1.5 rounded-full bg-[#1A1A2E]/20 relative">
          <div className="absolute top-0 h-full w-[35%] rounded-full skillvue-scroll-fill" style={{ left: `${scrollProgress * 0.65}%` }} />
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => renderCard(p, i))}
        </div>
      </div>
    </section>
  );
}
