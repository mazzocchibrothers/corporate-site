import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings, Shield, Scale } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pillars = [
  {
    icon: Settings,
    title: 'Customizability',
    desc: 'Every component, internal or candidate-facing, adapts to your processes, your leadership model, your workflows. We deploy on your terms, not ours.',
  },
  {
    icon: Shield,
    title: 'Security',
    desc: 'ISO 27001 and SOC 2 certified. Data protection is embedded in our architecture from day one.',
  },
  {
    icon: Scale,
    title: 'Compliance',
    desc: "From GDPR to the EU AI Act, we build for the most demanding regulatory environments so you don't have to worry about what's next.",
  },
];

const badges = ['EU AI Act', 'ISO 27001', 'GDPR', 'AICPA SOC 2'];

export default function EnterpriseTrust() {
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
    <section id="enterprise-trust" data-testid="enterprise-trust" className="section-breathe relative py-14 md:py-16 lg:py-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-4 md:mb-6">
            {t('Built')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('enterprise ready')}</span>
          </h2>
          <p className="text-[14px] md:text-[18px] text-[#1A1A2E]/[0.65] leading-[1.6] md:leading-[1.75] max-w-2xl">
            {t('We are opinionated about science, flexible about everything else. From deep customizability to the most demanding regulatory environments.')}
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div ref={scrollRef} className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 pb-2">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                data-testid={`trust-${pillar.title.toLowerCase()}`}
                className="shrink-0 w-[80vw] snap-center group rounded-xl border border-[#4B4DF7]/[0.08] bg-white p-5 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <Icon className="h-5 w-5 text-[#4B4DF7]/50 mb-3" strokeWidth={1.5} />
                <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-2">{t(pillar.title)}</h3>
                <p className="text-[13px] text-[#1A1A2E]/[0.55] leading-[1.5]">{t(pillar.desc)}</p>
              </motion.div>
            );
          })}
        </div>
        {/* Progress bar */}
        <div className="md:hidden mx-auto mt-4 mb-8 w-36 h-1 rounded-full bg-[#1A1A2E]/10 relative">
          <div className="absolute top-0 h-full w-[35%] rounded-full skillvue-scroll-fill" style={{ left: `${scrollProgress * 0.65}%`, transition: "left 200ms ease-out" }} />
        </div>

        {/* Desktop: existing grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-3 md:gap-5 mb-8 md:mb-12">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                data-testid={`trust-${pillar.title.toLowerCase()}`}
                className="group rounded-xl md:rounded-2xl border border-[#4B4DF7]/[0.08] bg-white p-5 md:p-10 hover:border-[#4B4DF7]/[0.15] hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04] transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <Icon className="h-5 w-5 md:h-6 md:w-6 text-[#4B4DF7]/50 mb-3 md:mb-5" strokeWidth={1.5} />
                <h3 className="text-[16px] md:text-[20px] font-bold text-[#1A1A2E] mb-2 md:mb-4">{t(pillar.title)}</h3>
                <p className="text-[13px] md:text-[15px] text-[#1A1A2E]/[0.55] leading-[1.5] md:leading-[1.75]">{t(pillar.desc)}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="flex flex-wrap gap-2 md:gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex px-3.5 py-2 md:px-5 md:py-2.5 rounded-full text-[12px] md:text-[12px] font-semibold text-[#4B4DF7]/70 border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.04] tracking-wide"
            >
              {t(badge)}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
