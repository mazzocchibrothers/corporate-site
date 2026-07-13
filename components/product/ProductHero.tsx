import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Lottie from 'lottie-react';
import { Button } from '@/components/ui/button';

const ANIM_EN = 'https://cdn.lottielab.com/l/3FJ5CBuSY6Ebq8.json';
const ANIM_IT = 'https://cdn.lottielab.com/l/9E2vegrr5hs33N.json';
const EMBED_EN = 'https://cdn.lottielab.com/l/3FJ5CBuSY6Ebq8.html';
const EMBED_IT = 'https://cdn.lottielab.com/l/9E2vegrr5hs33N.html';

export default function ProductHero() {
  const { t, lang } = useLanguage();
  const [animData, setAnimData] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const url = lang === 'it' ? ANIM_IT : ANIM_EN;
    setAnimData(null);
    fetch(url)
      .then(r => r.json())
      .then(setAnimData)
      .catch(() => setUseFallback(true));
  }, [lang]);

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
            >
              {t('One platform.')}<br />
              {t('Every talent decision.')}<br />
              <span className="font-bold gradient-text">{t('Objective data.')}</span>
            </motion.h1>

            <motion.div
              className="flex flex-col items-start gap-5 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-[14px] md:text-[18px] text-white/[0.65] leading-[1.6] md:leading-[1.75] max-w-xl font-normal md:font-light">
                {t('Skillvue is the AI-powered talent intelligence platform that turns static HR processes into predictive, objective insights. Verify skills, predict potential, and make every people decision defensible.')}
              </p>

              <Button asChild variant="primary" mode="dark">
                <a
                  href={lang === 'it' ? '/prenota-incontro' : '/book-meeting'}
                  data-testid="product-hero-book-demo"
                >
                  <span>{t('Book a Demo')}</span>
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
                src={lang === 'it' ? EMBED_IT : EMBED_EN}
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
