'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';
import { ClosingPanel } from '@/components/shared/ClosingPanel';

// `tone="light"` (interim standard, pending the redesign) renders the shared
// light closing, <ClosingPanel> — the Assess closing, with no gradient on the
// accent word; `rule` draws its top line after another white section. This
// closing has no sentence of its own, so the panel holds the heading and the
// button only. `tone="dark"`, the default, is the original band below, kept
// unchanged for /lp/europ-assistance.
export default function SolutionFinalCTA({ headline, accentWord, tone = 'dark', rule = false }: {
  headline: string;
  accentWord: string;
  tone?: 'dark' | 'light';
  rule?: boolean;
}) {
  const lang = useLocale();
  const t = useTranslations('shared');

  if (tone === 'light') {
    return (
      <ClosingPanel
        heading={<>{headline}{' '}<span className="font-semibold">{accentWord}</span></>}
        cta={t('solutionFinalCTA.cta')}
        href={href('book-meeting', lang)}
        rule={rule}
      />
    );
  }

  return (
    <section className="relative py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm px-6 py-14 md:px-16 md:py-24 text-center">
          <h2 className="max-w-[880px] mx-auto text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90 mb-6">
            {headline}{' '}
            <span className="font-semibold gradient-text">{accentWord}</span>
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
