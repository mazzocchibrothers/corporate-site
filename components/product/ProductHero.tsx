'use client';

import React, { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Lottie from 'lottie-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

// The hero animation has text baked into it, so there is one per language.
// Both URLs live in the catalogue with the copy they belong to — an asset that
// changes with the language is a translation, whatever its file extension.

export default function ProductHero() {
  const lang = useLocale();
  const t = useTranslations('product-overview');
  const [animData, setAnimData] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const url = t('hero.animation');
    setAnimData(null);
    fetch(url)
      .then(r => r.json())
      .then(setAnimData)
      .catch(() => setUseFallback(true));
  }, [t]);

  return (
    <section id="product-hero" data-testid="product-hero" className="relative min-h-screen flex flex-col justify-center pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-10 md:py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: text + CTA */}
          <div>
            <motion.h1
              className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95 mb-6 md:mb-10"
              style={{ lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >{t.rich('hero.heading', {
              br: () => <br />,
              span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
            })}</motion.h1>

            <motion.div
              className="flex flex-col items-start gap-5 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-[14px] md:text-[18px] text-white/[0.65] leading-[1.6] md:leading-[1.75] max-w-xl font-normal md:font-light">{t('hero.body')}</p>

              <Button asChild variant="primary" mode="dark">
                <a
                  href={href('book-meeting', lang)}
                  data-testid="product-hero-book-demo"
                >
                  <span>{t('hero.cta')}</span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right: Lottie animation */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            {!useFallback && animData ? (
              <Lottie animationData={animData} loop autoplay style={{ width: '100%' }} />
            ) : useFallback ? (
              <iframe
                src={t('hero.animationEmbed')}
                title="Skillvue product demo"
                className="w-full aspect-square border-0"
                allowFullScreen
              />
            ) : (
              <div className="w-full aspect-square" />
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
