// @ts-nocheck
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

export default function TAHero() {
  const { lang } = useLanguage();
  const t = useTranslations('solutions.talent-acquisition');
  return (
    <section id="ta-hero" data-testid="ta-hero" className="relative min-h-screen flex flex-col justify-center pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-10 md:py-16 lg:py-0">
        <motion.h1
          className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95 mb-6 md:mb-10"
          style={{ lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >{t.rich('taHero.heading', {
          br: () => <br />,
          span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
        })}</motion.h1>
        <motion.div
          className="flex flex-col items-start gap-5 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-[14px] md:text-[16px] lg:text-[18px] text-white/[0.65] leading-[1.6] md:leading-[1.75] max-w-xl font-normal md:font-light">{t('taHero.body')}</p>
          <Button asChild variant="primary" mode="dark" className="shrink-0">
            <a href={href('book-meeting', lang)} data-testid="ta-hero-cta">
              <span>{t('taHero.cta')}</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
