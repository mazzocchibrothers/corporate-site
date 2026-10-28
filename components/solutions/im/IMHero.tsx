'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';
import { HeroCopy } from '@/components/ui/hero-copy';

export default function IMHero() {
  const lang = useLocale();
  const t = useTranslations('solutions.internal-mobility');
  return (
    <section id="im-hero" data-testid="im-hero" className="relative min-h-screen flex flex-col justify-center pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-0">
        <HeroCopy>
          <Reveal
            as="h1"
            y={40}
            duration={0.8}
            delay={0.3}
            className="text-[48px] md:text-[58px] font-semibold tracking-[-0.02em] text-white/95 mb-10 max-w-5xl"
            style={{ lineHeight: 1.1 }}
          >{t.rich('imHero.heading', {
            span: (chunks) => <span className="font-semibold gradient-text">{chunks}</span>,
          })}</Reveal>
          <Reveal
            y={20}
            duration={0.8}
            delay={0.5}
            className="flex flex-col items-start gap-6 md:gap-8"
          >
            <p className="type-body-lg hero-subtitle text-white/[0.65]">{t('imHero.body')}</p>
            <Button asChild variant="primary" mode="dark" className="shrink-0">
              <a href={href('book-meeting', lang)} data-testid="im-hero-cta">
                <span>{t('imHero.cta')}</span>
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </Reveal>
        </HeroCopy>
      </div>
    </section>
  );
}
