// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

export default function PRCTA() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pr-cta" data-testid="pr-cta" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-10 text-center" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90 mb-10">
            {t('Ready to staff projects with')}{' '}
            <span className="font-bold gradient-text">{t('confidence?')}</span>
          </h2>
          <Button asChild variant="primary" mode="dark">
            <a href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'} data-testid="pr-final-cta">
              <span>{t('Book a Demo')}</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
