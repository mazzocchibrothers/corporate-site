// @ts-nocheck
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
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5 md:p-8 lg:p-10 text-center">
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90 mb-6">
            {headline}{' '}
            <span className="italic font-bold gradient-text">{accentWord}</span>
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
