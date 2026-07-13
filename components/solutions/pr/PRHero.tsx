// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

export default function PRHero() {
  const { t, lang } = useLanguage();
  return (
    <section id="pr-hero" data-testid="pr-hero" className="relative min-h-screen flex flex-col justify-center pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-0">
        <motion.h1
          className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95 mb-10 max-w-5xl"
          style={{ lineHeight: 1.15 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('Staff projects based on verified capability,')}{' '}
          <span className="font-bold gradient-text">{t('not availability.')}</span>
        </motion.h1>
        <motion.div
          className="flex flex-col items-start gap-6 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-[16px] lg:text-[18px] text-white/[0.65] leading-[1.75] max-w-xl" style={{ fontWeight: 300 }}>
            {t('Skillvue gives project leaders and resourcing teams an objective view of who has the skills to deliver, replacing "who\'s free" with "who\'s fit." Reduce delivery risk, improve team composition, and stop staffing in the dark.')}
          </p>
          <Button asChild variant="primary" mode="dark" className="shrink-0">
            <a href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'} data-testid="pr-hero-cta">
              <span>{t('Book a Demo')}</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
