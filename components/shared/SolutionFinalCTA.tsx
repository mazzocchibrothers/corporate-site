'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';
import { CLOSING_PANEL_GRADIENT } from '@/components/shared/ClosingBanner';

// `tone`: "dark" (the default) is the original dark band; "light" is the
// interim light standard, the Assess closing panel on a white section, with
// no gradient on the accent word. `rule` draws a #e5e7eb line on top, for a
// light closing that follows another white section. See ClosingBanner.
export default function SolutionFinalCTA({ headline, accentWord, tone = 'dark', rule = false }: {
  headline: string;
  accentWord: string;
  tone?: 'dark' | 'light';
  rule?: boolean;
}) {
  const lang = useLocale();
  const t = useTranslations('shared');
  const light = tone === 'light';

  return (
    <section className={light
      ? `section-light relative py-20 lg:py-24${rule ? ' border-t border-[#e5e7eb]' : ''}`
      : 'relative py-20 lg:py-24'}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal
          duration={0.7}
          className={light
            ? 'rounded-[20px] md:rounded-3xl px-6 py-14 md:px-16 md:py-24 text-center'
            : 'rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm px-6 py-14 md:px-16 md:py-24 text-center'}
          style={light ? { backgroundImage: CLOSING_PANEL_GRADIENT } : undefined}
        >
          <h2 className={`max-w-[880px] mx-auto text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] mb-6 ${light ? 'text-[#121212]' : 'text-white/90'}`}>
            {headline}{' '}
            <span className={light ? 'font-semibold' : 'font-semibold gradient-text'}>{accentWord}</span>
          </h2>
          <Button asChild variant="primary" mode={light ? 'light' : 'dark'}>
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
