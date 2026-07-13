// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

export default function IMImpact() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="im-impact" data-testid="im-impact" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          className="grid lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-white/[0.08]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="lg:col-span-8 p-10 lg:p-14 bg-white/[0.04]">
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-6 block">{t('Customer Story')}</span>
            <h3 className="text-[28px] font-semibold text-white/90 mb-2">Fidia</h3>
            <p className="text-[14px] text-white/40 mb-8">{t('Pharma')}</p>
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-3 block">{t('Challenge')}</span>
                <p className="text-[15px] text-white/[0.65] leading-[1.75]">{t('Mapping internal talent to identify succession candidates for critical leadership roles across multiple business units.')}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-3 block">{t('Result')}</span>
                <p className="text-[15px] text-white/[0.65] leading-[1.75]">{t('Full talent visibility across the organization. Data-driven succession plans now cover 100% of critical roles with identified ready-now and ready-soon candidates.')}</p>
              </div>
            </div>
            <Button asChild variant="secondary" mode="dark">
              <a href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'}>
                {t('Read the full story')}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-10 lg:p-14 bg-white/[0.06] border-t lg:border-t-0 lg:border-l border-white/[0.06]">
            <span className="block text-white text-[32px] stat-value md:text-[3.5rem]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>100%</span>
            <p className="text-[14px] text-white/[0.65] mt-3 text-center">{t('critical roles with')}<br />{t('succession coverage')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
