'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

const badges = [
  'gdprCompliant',
  'iso27001Certified',
  'euAiAct',
  'n50Languages',
  'enterpriseReady',
];

export default function CustomersFinalCTA() {
  const lang = useLocale();
  const t = useTranslations('customers');

  return (
    <section id="customers-cta" data-testid="customers-cta" className="relative py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal
          duration={0.7}
          className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm px-6 py-14 md:px-16 md:py-24 flex flex-col items-center text-center gap-10"
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white/90 max-w-4xl">{t.rich('finalCTA.heading', {
            span: (chunks) => <span className="font-semibold gradient-text">{chunks}</span>,
          })}</h2>
          <p className="text-[18px] text-white/[0.65]">{t('finalCTA.body')}</p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {badges.map(b => (
              <span key={b} className="rounded-full border border-white/[0.15] px-4 py-2 text-[12px] text-white/60">{t(`finalCTA.badges.${b}`)}</span>
            ))}
          </div>

          <Button asChild variant="primary" mode="dark">
            <a href={href('book-meeting', lang)}>
              <span>{t('finalCTA.cta')}</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
