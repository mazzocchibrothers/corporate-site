// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

export default function ScienceHero() {
  const lang = useLocale();
  const t = useTranslations('science');
  return (
    <section id="science-hero" data-testid="science-hero" className="relative min-h-screen flex flex-col justify-center pt-[80px] overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-10 md:py-16 lg:py-0">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
            <Reveal
              as="h1"
              y={40}
              duration={0.8}
              delay={0.3}
              className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95"
              style={{ lineHeight: 1.1 }}
            >{t.rich('hero.heading', {
              br: () => <br />,
              span: (chunks) => <span className="italic font-bold gradient-text">{chunks}</span>,
            })}</Reveal>
            <Reveal
              y={20}
              duration={0.8}
              delay={0.5}
              className="flex flex-col gap-6"
            >
              <p className="text-[14px] md:text-[18px] text-white/[0.65] leading-[1.6] md:leading-[1.75] max-w-md lg:max-w-lg font-normal md:font-light">
                {t('hero.body')}
              </p>
              <Button asChild variant="primary" mode="dark" className="self-start gap-8">
                <a href={href('book-meeting', lang)}>
                  <span>{t('hero.cta')}</span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
