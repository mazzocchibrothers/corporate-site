// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function TACustomerStory() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ta-story" data-testid="ta-story" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          className="grid lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-white/[0.08]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Left - Story content */}
          <div className="lg:col-span-8 p-10 lg:p-14 bg-white/[0.04]">
            <span className="text-[12px] font-bold text-[#9B9DFB]/[0.65] tracking-[0.1em] uppercase mb-6 block">{t('Customer Story')}</span>
            <h3 className="text-[28px] font-bold text-white/90 mb-1">Loro Piana</h3>
            <p className="text-[14px] text-white/40 mb-8">{t('Luxury & Retail')}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase mb-3 block">{t('Challenge')}</span>
                <p className="text-[15px] text-white/[0.65] leading-[1.75]">{t('Scaling global hiring across 50+ roles while maintaining consistent luxury brand standards.')}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#9B9DFB]/50 tracking-[0.1em] uppercase mb-3 block">{t('Result')}</span>
                <p className="text-[15px] text-white/[0.65] leading-[1.75]">{t('From 500 to 10,000 candidates assessed per year. A single objective standard now applies across all markets and geographies.')}</p>
              </div>
            </div>

            <a href="#" className="group/btn inline-flex items-center gap-2.5 px-6 py-3 text-[13px] font-semibold tracking-wide rounded-full border border-white/[0.15] text-white/[0.65] hover:text-white/90 hover:border-white/25 hover:bg-white/[0.05] transition-all duration-500">
              {t('Read the full story')}
              <ArrowUpRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

          {/* Right - Big stat */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-10 lg:p-14 bg-white/[0.06] border-t lg:border-t-0 lg:border-l border-white/[0.06]">
            <span className="block text-white" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>10K+</span>
            <p className="text-[14px] text-white/[0.65] mt-4 text-center">{t('candidates assessed')}<br />{t('per year')}</p>
            <div className="mt-6 flex items-center gap-2">
              <div className="h-px w-8 bg-white/10" />
              <span className="text-[11px] text-white/30">{t('20x growth')}</span>
              <div className="h-px w-8 bg-white/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
