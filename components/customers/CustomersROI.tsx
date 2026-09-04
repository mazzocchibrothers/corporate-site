// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

const stats = [
  {
    id: 'n45m',
    value: '€4.5M',
  },
  {
    id: 'n69mo',
    value: '6-9mo',
  },
  {
    id: 'n1030x',
    value: '10-30x',
  },
];

export default function CustomersROI() {
  const lang = useLocale();
  const t = useTranslations('customers');
  const renderCard = (s, i) => (
    <Reveal
      delay={0.15 + i * 0.12}
      key={s.value}
      className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-10 h-full"
    >
      <span className="block mb-6 md:mb-10 text-[#121212] font-semibold text-[32px] md:text-[64px]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{t(`roi.stats.${s.id}.value`)}</span>
      <h3 className="text-[16px] md:text-[18px] font-semibold text-[#121212]/80 leading-snug mb-2">{t(`roi.stats.${s.id}.label`)}</h3>
      <p className="text-[13px] md:text-[14px] text-[#7A7A7A] leading-relaxed">{t(`roi.stats.${s.id}.sub`)}</p>
    </Reveal>
  );

  return (
    <section id="customers-roi" data-testid="customers-roi" className="section-breathe relative py-20 lg:py-24">
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-12 md:mb-16">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">{t.rich('roi.heading', {
            span: (chunks) => <span className="font-bold gradient-text-warm-on-light">{chunks}</span>,
          })}</h2>
        </Reveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5 mb-10">
          {stats.map((s, i) => renderCard(s, i))}
        </div>

        <Reveal y={0} delay={0.5} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <p className="text-[14px] md:text-[15px] text-[#7A7A7A]">{t('roi.body')}</p>
          <Button asChild variant="primary" mode="light">
            <a href={href('book-meeting', lang)}>
              {t('roi.cta')}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
