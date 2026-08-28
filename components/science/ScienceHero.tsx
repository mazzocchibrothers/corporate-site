// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

export default function ScienceHero() {
  const { t, lang } = useLanguage();
  return (
    <section id="science-hero" data-testid="science-hero" className="relative min-h-screen flex flex-col justify-center pt-[80px] overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-10 md:py-16 lg:py-0">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
            <motion.h1
              className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95"
              style={{ lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t('Science you can stake')}<br />{t('talent decisions')}<br />
              <span className="italic font-bold gradient-text">{t('on.')}</span>
            </motion.h1>
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-[14px] md:text-[18px] text-white/[0.65] leading-[1.6] md:leading-[1.75] max-w-md lg:max-w-lg font-normal md:font-light">
                {lang === 'it'
                  ? "Valutare le persone è difficile. Per prendere decisioni sul talento di cui fidarsi, accuratezza e affidabilità non possono essere degli optional. Skillvue è costruito su basi psicometriche e psicologiche rigorose, che garantiscono output a prova di qualsiasi scrutinio."
                  : "Measuring people is hard. To make talent decisions you can trust, accuracy and reliability aren't optional. Skillvue is built on I/O psychology and psychometrics, ensuring every data point holds up to scrutiny."}
              </p>
              <Button asChild variant="primary" mode="dark" className="self-start gap-8">
                <a href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'}>
                  <span>{t('Book a Demo')}</span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
