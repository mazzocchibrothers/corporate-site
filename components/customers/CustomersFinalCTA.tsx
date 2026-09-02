// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, FileText, BookOpen, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

const badges = [
  'gdprCompliant',
  'iso27001Certified',
  'euAiAct',
  'n50Languages',
  'builtEuropeanEnterprises',
];

export default function CustomersFinalCTA() {
  const lang = useLocale();
  const t = useTranslations('customers');

  return (
    <section id="customers-cta" data-testid="customers-cta" className="relative pt-12 pb-20 lg:pt-16 lg:pb-24">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-8">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90">{t.rich('finalCTA.heading', {
            span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
          })}</h2>
        </Reveal>

        <Reveal y={20} duration={0.7} delay={0.2} className="grid lg:grid-cols-12 gap-4 mb-6">
          <div className="lg:col-span-12 group rounded-2xl border border-white/[0.06] hover:border-white/[0.14] bg-white/[0.04] hover:bg-white/[0.06] backdrop-blur-sm p-10 transition-all duration-500">
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.15em] uppercase">{t('finalCTA.text')}</span>
            <h3 className="text-2xl font-bold text-white/90 mt-4 mb-3">{t('finalCTA.heading2')}</h3>
            <p className="text-[15px] text-white/[0.65] mb-8 max-w-md">{t('finalCTA.body')}</p>
            <Button asChild variant="primary" mode="dark" className="w-full md:w-auto max-w-sm justify-between">
              <a href={href('book-meeting', lang)}>
                <span>{t('finalCTA.cta')}</span>
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal y={0} delay={0.4} className="flex flex-wrap justify-end gap-x-6 gap-y-2">
          {badges.map(b => (
            <span key={b} className="text-[11px] text-white/[0.65] font-medium">{t(`finalCTA.badges.${b}`)}</span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
