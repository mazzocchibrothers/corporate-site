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
    illustration: '/logos/customers-roi-illustration-cost.svg',
  },
  {
    id: 'n69mo',
    illustration: '/logos/customers-roi-illustration-speed.svg',
  },
  {
    id: 'n1030x',
    illustration: '/logos/customers-roi-illustration-roi.svg',
  },
];

export default function CustomersROI() {
  const lang = useLocale();
  const t = useTranslations('customers');
  const renderCard = (s, i) => (
    <Reveal
      delay={0.15 + i * 0.12}
      key={s.id}
      className="group bg-white border border-[#E2E8F0] rounded-2xl p-[17px] shadow-sm h-full"
    >
      <div className="rounded-lg bg-gradient-to-b from-[#f8f8ff] to-[#f0f0f8] aspect-[379/258] flex items-center justify-center overflow-hidden mb-6">
        <img src={s.illustration} alt="" loading="lazy" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
      </div>
      <span className="block mb-2.5 text-[#1a1a2e] font-semibold text-[32px] md:text-[48px]" style={{ lineHeight: 1.1, letterSpacing: '-0.03em' }}>{t(`roi.stats.${s.id}.value`)}</span>
      <h3 className="text-[16px] font-semibold text-[#1E1E1E] leading-snug mb-2.5">{t(`roi.stats.${s.id}.label`)}</h3>
      <p className="text-[14px] md:text-[16px] text-[#4B4B4B] leading-relaxed">{t(`roi.stats.${s.id}.sub`)}</p>
    </Reveal>
  );

  return (
    <section id="customers-roi" data-testid="customers-roi" className="section-breathe relative py-20 lg:py-24">
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-12 md:mb-16">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#121212]">{t('roi.heading')}</h2>
        </Reveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mb-10">
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
