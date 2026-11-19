'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

const stats = [
  { id: 'payback', value: '6-12' },
  { id: 'roi', value: '10x' },
];

export default function ROISection() {
  const lang = useLocale();
  const t = useTranslations('shared');
  return (
    <section
      id="roi"
      data-testid="roi-section"
      className="section-breathe relative py-20 lg:py-24 md:flex md:items-center md:min-h-screen"
    >
      <div className="relative w-full max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1A1A2E]">
            {t.rich('roi.heading', {
              span: (chunks) => (
                // Deliberately stacked: the return line sits under the cost line.
                <span className="block">
                  <span className="font-semibold gradient-text-warm-on-light">{chunks}</span>
                </span>
              ),
            })}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
          {stats.map((stat, i) => (
            <Reveal
              delay={0.15 + i * 0.12}
              key={stat.id}
              data-testid={`roi-stat-${stat.id}`}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[200px] md:min-h-[260px]"
            >
              <span
                className="block font-display text-[#1A1A2E] text-[48px] md:text-[54px] stat-value mb-4 md:mb-6"
                style={{ lineHeight: 1, letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </span>
              <p className="type-body-lg text-[#7A7A7A]">
                <span className="font-semibold text-[#1A1A2E]/80">{t(`roi.stats.${stat.id}.label`)}</span>{' '}
                {t(`roi.stats.${stat.id}.sublabel`)}
              </p>
            </Reveal>
          ))}

          <Reveal
            delay={0.39}
            data-testid="roi-calculator-card"
            className="bg-[#4B4DF7] rounded-2xl p-8 md:p-10 flex flex-col justify-between gap-8 min-h-[200px] md:min-h-[260px]"
          >
            <div>
              <h3 className="font-display font-semibold text-white text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.01em] mb-3">
                {t('roi.card.heading')}
              </h3>
              <p className="type-body text-white/90">{t('roi.card.body')}</p>
            </div>
            <Button
              asChild
              variant="primary"
              mode="light"
              className="self-start bg-white text-[#121212] hover:bg-white/90"
            >
              <a href={href('roi-calculator', lang)} data-testid="roi-cta">
                {t('roi.card.cta')}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </Reveal>
        </div>

        <p className="type-body-sm text-[#7A7A7A] mt-4 md:mt-5">{t('roi.note')}</p>
      </div>
    </section>
  );
}
