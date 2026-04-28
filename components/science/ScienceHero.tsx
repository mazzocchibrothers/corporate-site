// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ScienceHero() {
  const { t, lang } = useLanguage();
  return (
    <section id="science-hero" data-testid="science-hero" className="relative min-h-screen flex flex-col justify-center pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-10 md:py-16 lg:py-0">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.h1
              className="text-[clamp(2.2rem,8vw,5.5rem)] md:text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-[-0.03em] text-white/95"
              style={{ lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t('Science you can stake')}<br />{t('talent decisions')}{' '}
              <span className="italic font-bold gradient-text">{t('on.')}</span>
            </motion.h1>
          </div>
        </div>

        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 lg:gap-12 mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p
            className="text-[14px] md:text-[18px] text-white/[0.65] leading-[1.6] md:leading-[1.75] max-w-md lg:max-w-lg font-normal md:font-light"
          >
            {t("Measuring people is hard. To make talent decisions you can trust, accuracy and reliability aren't optional. Skillvue is built on I/O psychology and psychometrics, ensuring every data point holds up to scrutiny.")}
          </p>
          <a href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'} className="group inline-flex items-center justify-between shrink-0 w-full lg:w-[480px] px-6 py-4 md:px-8 md:py-5 text-[13px] md:text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500">
            <span>{t('Book a Demo')}</span>
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-4 md:ml-8 text-white/30 group-hover:text-[#9B9DFB] group-hover:translate-x-1 transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
