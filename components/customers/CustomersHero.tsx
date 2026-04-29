// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const metrics = [
  { value: '50+', label: 'European enterprises' },
  { value: '40%', label: 'avg reduction in time-to-hire' },
  { value: '10-30x', label: 'ROI within 18-24 months' },
  { value: '85%+', label: 'hiring success rate' },
];

const logoFiles = [
  { name: 'Unicredit', src: '/logos/unicredit.png' },
  { name: 'Carrefour', src: '/logos/carrefour_fixed.png' },
  { name: 'Fidia', src: '/logos/fidia_fixed.png' },
  { name: 'Generali', src: '/logos/generali.png' },
  { name: 'Douglas', src: '/logos/douglas.png' },
  { name: 'Coop', src: '/logos/coop.png' },
];

export default function CustomersHero() {
  const { t, lang } = useLanguage();
  return (
    <section id="customers-hero" data-testid="customers-hero" className="relative pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-24 lg:py-32">
        <motion.h1
          className="text-[clamp(2.8rem,5.5vw,5rem)] font-bold tracking-[-0.03em] text-white/95 mb-8 max-w-5xl"
          style={{ lineHeight: 1.15 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('The decisions that define your organization. Finally backed by')}{' '}
          <span className="font-bold gradient-text">{t('proof.')}</span>
        </motion.h1>
        <motion.p
          className="text-[18px] text-white/[0.65] leading-[1.75] max-w-2xl mb-16"
          style={{ fontWeight: 300 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {t('50+ European enterprises have replaced gut feel with objective talent intelligence. across hiring, promotion, development, and transformation readiness. These are their stories.')}
        </motion.p>

        {/* CTA - Read the stories */}
        <motion.a
          href="#explore"
          className="group inline-flex items-center gap-4 px-8 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <span>{t('Read the stories')}</span>
          <svg className="h-4 w-4 text-white/30 group-hover:text-[#9B9DFB] group-hover:translate-y-1 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </motion.a>

        {/* Live metrics bar */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {metrics.map((m) => (
            <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
              <span className="block text-white mb-1" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
              <span className="text-[13px] text-white/[0.65]">{t(m.label)}</span>
            </div>
          ))}
        </motion.div>

        {/* Logo marquee. identical to homepage trust bar */}
        </div>
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center h-[80px]">
            <div className="shrink-0 pl-8 lg:pl-12 pr-12 z-10 relative flex items-center h-full">
              <span
                className="inline-flex items-center px-6 py-2.5 rounded-lg border border-white/[0.3] text-[15px] text-white/70 whitespace-nowrap font-medium"
                style={{ fontWeight: 300, letterSpacing: '0.02em' }}
              >
                {t('Our Customers')}
              </span>
            </div>
            <div
              className="flex-1 overflow-hidden relative"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              }}
            >
              <div className="marquee-track flex items-center">
                <div className="marquee-content flex items-center gap-16 shrink-0 pr-16">
                  {logoFiles.map((l) => (
                    <div key={l.name} className="shrink-0 opacity-[0.55]">
                      <img src={l.src} alt={l.name} className="h-8 w-auto object-contain max-w-[120px]" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                  ))}
                </div>
                <div className="marquee-content flex items-center gap-16 shrink-0 pr-16" aria-hidden="true">
                  {logoFiles.map((l) => (
                    <div key={`d-${l.name}`} className="shrink-0 opacity-[0.55]">
                      <img src={l.src} alt="" className="h-8 w-auto object-contain max-w-[120px]" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
    </section>
  );
}
