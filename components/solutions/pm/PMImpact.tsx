// @ts-nocheck
'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

export default function PMImpact() {
  const { lang } = useLanguage();
  const t = useTranslations('solutions.performance-management');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pm-impact" data-testid="pm-impact" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        {/* Customer story placeholder */}
        <motion.div
          className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-8 p-10 lg:p-14">
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-6 block">{t('pmImpact.text')}</span>
              <h3 className="text-[28px] font-semibold text-white/90 mb-2">UniCredit</h3>
              <p className="text-[14px] text-white/40 mb-8">{t('pmImpact.body')}</p>
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div>
                  <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-3 block">{t('pmImpact.text2')}</span>
                  <p className="text-[15px] text-white/[0.65] leading-[1.75]">{t('pmImpact.body2')}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-3 block">{t('pmImpact.text3')}</span>
                  <p className="text-[15px] text-white/[0.65] leading-[1.75]">{t('pmImpact.body3')}</p>
                </div>
              </div>
              <Button asChild variant="secondary" mode="dark">
                <a href={href('book-meeting', lang)}>
                  {t('pmImpact.cta')}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-10 lg:p-14 bg-white/[0.04] border-t lg:border-t-0 lg:border-l border-white/[0.06]">
              <span className="block text-white text-[32px] stat-value md:text-[3.5rem]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>3</span>
              <p className="text-[14px] text-white/[0.65] mt-3 text-center">{t.rich('pmImpact.body4', {
                br: () => <br />,
              })}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
