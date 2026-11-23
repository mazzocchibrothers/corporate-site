'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';
import { CLOSING_PANEL_GRADIENT } from '@/components/shared/ClosingBanner';

export default function ScienceCTA() {
  const lang = useLocale();
  const t = useTranslations('science');

  return (
    <section id="science-cta" data-testid="science-cta" className="section-light relative pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-6 md:mb-10">
          <h2 className="max-w-[880px] text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">{t.rich('cta.heading', {
            span: (chunks) => <span className="font-semibold">{chunks}</span>,
          })}</h2>
        </Reveal>
        <Reveal y={20} duration={0.7} delay={0.2}>
          <div className="rounded-[20px] md:rounded-3xl p-5 md:p-10" style={{ backgroundImage: CLOSING_PANEL_GRADIENT }}>
            <span className="type-eyebrow text-[#4B4DF7]">{t('cta.text')}</span>
            <h3 className="text-xl md:text-2xl font-semibold text-[#121212] mt-3 md:mt-4 mb-2 md:mb-3">{t('cta.heading2')}</h3>
            <p className="type-body text-[#4B4B4B] mb-5 md:mb-8 max-w-md">{t('cta.body')}</p>
            <Button asChild variant="primary" mode="light">
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
