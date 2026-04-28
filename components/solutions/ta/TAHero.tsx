// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function TAHero() {
  const { t, lang } = useLanguage();
  return (
    <section id="ta-hero" data-testid="ta-hero" className="relative min-h-screen flex flex-col justify-center pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-10 md:py-16 lg:py-0">
        <motion.h1
          className="text-[clamp(2.2rem,8vw,5.5rem)] md:text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-[-0.03em] text-white/95 mb-6 md:mb-10"
          style={{ lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('Stop gambling on hiring.')}<br />
          {t('Start predicting who will')}{' '}
          <span className="font-bold gradient-text">{t('perform.')}</span>
        </motion.h1>
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 md:gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-[14px] md:text-[16px] lg:text-[18px] text-white/[0.65] leading-[1.6] md:leading-[1.75] max-w-xl font-normal md:font-light">
            {t('Skillvue replaces guesswork with science at scale. AI-powered assessments customized to your roles and leadership model surface top candidates, cut early turnover, and make every hiring decision defensible.')}
          </p>
          <a href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'} data-testid="ta-hero-cta" className="group inline-flex items-center justify-between w-full lg:w-auto lg:max-w-xl px-6 py-4 lg:px-8 lg:py-5 text-[14px] lg:text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500 shrink-0">
            <span>{t('Book a Demo')}</span>
            <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-[#9B9DFB] group-hover:translate-x-1 transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
