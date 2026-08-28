// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

export default function LDCTA() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ld-cta" data-testid="ld-cta" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">
            {t('Ready to prove L&D impact with')}{' '}
            <span className="font-bold gradient-text-on-light">{t('data?')}</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          <Button asChild variant="primary" mode="light" className="w-full md:w-auto max-w-xl">
            <a href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'} data-testid="ld-final-cta">
              <span>{t('Book a Demo')}</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
