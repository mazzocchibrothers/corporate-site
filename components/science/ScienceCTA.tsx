// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

export default function ScienceCTA() {
  const lang = useLocale();
  const t = useTranslations('science');

  return (
    <section id="science-cta" data-testid="science-cta" className="relative pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-6 md:mb-10">
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90">{t.rich('cta.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text">{chunks}</span>,
          })}</h2>
        </Reveal>
        <Reveal y={20} duration={0.7} delay={0.2}>
          <div className="group rounded-xl md:rounded-2xl border border-white/[0.06] hover:border-white/[0.14] bg-white/[0.04] hover:bg-white/[0.06] backdrop-blur-sm p-5 md:p-10 transition-all duration-500">
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.15em] uppercase">{t('cta.text')}</span>
            <h3 className="text-xl md:text-2xl font-semibold text-white/90 mt-3 md:mt-4 mb-2 md:mb-3">{t('cta.heading2')}</h3>
            <p className="text-[13px] md:text-[15px] text-white/[0.65] mb-5 md:mb-8 max-w-md">{t('cta.body')}</p>
            <Button asChild variant="primary" mode="dark" className="w-full md:w-auto max-w-sm justify-between">
              <a href={href('book-meeting', lang)} data-testid="science-cta-demo">
                <span>{t('cta.cta')}</span>
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
