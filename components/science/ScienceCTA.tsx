// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ScienceCTA() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="science-cta" data-testid="science-cta" className="relative pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div className="mb-6 md:mb-10" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90">
            {t('Science-backed talent intelligence.')}{' '}
            <span className="italic font-bold gradient-text">{t('See it in action.')}</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="group rounded-xl md:rounded-2xl border border-white/[0.06] hover:border-white/[0.14] bg-white/[0.04] hover:bg-white/[0.06] backdrop-blur-sm p-5 md:p-10 lg:p-14 transition-all duration-500">
            <span className="text-[10px] md:text-[11px] font-semibold text-[#9B9DFB]/[0.65] tracking-[0.15em] uppercase">{t('Ready to explore')}</span>
            <h3 className="text-xl md:text-2xl font-bold text-white/90 mt-3 md:mt-4 mb-2 md:mb-3">{t('Book a Demo')}</h3>
            <p className="text-[13px] md:text-[15px] text-white/[0.65] mb-5 md:mb-8 max-w-md">{t('See how science translates into better talent decisions')}</p>
            <a href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'} data-testid="science-cta-demo" className="group/btn inline-flex items-center justify-between w-full max-w-sm px-6 py-4 md:px-8 md:py-5 text-[13px] md:text-[14px] font-semibold tracking-wide text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500">
              <span>{t('Book a Demo')}</span>
              <ArrowRight className="h-4 w-4 text-white/30 group-hover/btn:text-[#9B9DFB] group-hover/btn:translate-x-1 transition-all duration-500" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
