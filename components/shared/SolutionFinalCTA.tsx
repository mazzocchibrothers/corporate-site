'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

export default function SolutionFinalCTA({ headline, accentWord }) {
  const lang = useLocale();
  const t = useTranslations('shared');

  return (
    <section className="relative py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm px-6 py-14 md:px-16 md:py-24 text-center">
          <h2 className="max-w-[880px] mx-auto text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90 mb-6">
            {headline}{' '}
            <span className="italic font-semibold gradient-text">{accentWord}</span>
          </h2>
          <Button asChild variant="primary" mode="dark">
            <a href={href('book-meeting', lang)}>
              <span>{t('solutionFinalCTA.cta')}</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
