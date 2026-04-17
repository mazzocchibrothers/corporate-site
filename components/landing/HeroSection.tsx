import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import GradientBlinds from '../backgrounds/GradientBlinds';
import { useLanguage } from '@/i18n/LanguageContext';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import scrollArrowsData from '../../public/animations/scroll-arrows.json';

const trustLogos = ['Unicredit', 'Loro Piana', 'Carrefour', 'Fidia', 'Generali', 'Capgemini', 'Coop', 'Douglas'];

const logoImages: Record<string, string> = {
  'Unicredit': '/logos/unicredit.png',
  'Loro Piana': '/logos/loropiana_fixed.png',
  'Carrefour': '/logos/carrefour_fixed.png',
  'Fidia': '/logos/fidia_fixed.png',
  'Generali': '/logos/generali.png',
  'Capgemini': '/logos/capgemini_fixed.png',
  'Coop': '/logos/coop.png',
  'Douglas': '/logos/douglas.png',
};

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const [isMobile, setIsMobile] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onMotionChange);
    return () => {
      window.removeEventListener('resize', check);
      mq.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative overflow-hidden flex flex-col justify-between pt-[80px]"
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {/* GradientBlinds background — desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <GradientBlinds
            dpr={typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1}
            gradientColors={["#4B4DF7", "#FF5F24", "#FF5F24"]}
            angle={0}
            noise={0.8}
            blindCount={30}
            blindMinWidth={70}
            mouseDampening={0.15}
            mirrorGradient={false}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="normal"
            paused={reducedMotion}
          />
        </div>
      )}

      {/* Mobile: subtle animated gradient */}
      <div className="absolute inset-0 z-0 md:hidden hero-mobile-gradient" />

      {/* Hero content. layered above */}
      <div className="relative z-10 flex-1 flex items-start md:items-center pt-6 md:pt-0">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-10 md:py-16 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT. Big headline */}
            <div className="lg:col-span-7">
              <motion.h1
                className="text-[clamp(2.5rem,10vw,3.75rem)] md:text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-[-0.03em] text-white"
                style={{ lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t('Every talent')}<br />
                {t('decision,')} <span className="italic font-bold gradient-text">{t('finally')}</span><br />
                {t('backed by science.')}
              </motion.h1>
              <motion.p
                className="text-[15px] md:text-[18px] text-white/80 leading-[1.65] md:leading-[1.75] mt-5 md:mt-8 max-w-xl font-normal md:font-light"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {t('Skillvue combines psychometric rigour with modern AI to assess skills, predict performance, and guide every talent decision, from hiring to promotion to transformation readiness.')}
              </motion.p>
            </div>

            {/* RIGHT. CTA */}
          </div>
        </div>
      </div>

      {/* Animated scroll-down arrows — mobile only */}
      <motion.div
        className="relative z-10 flex md:hidden justify-center pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <Lottie
          animationData={scrollArrowsData}
          loop
          autoplay
          style={{ width: 40, height: 40 }}
        />
      </motion.div>

      {/* Trust bar. infinite marquee with glassmorphic blur */}
      <motion.div
        className="relative z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div
          className="flex items-center h-[60px] md:h-[80px]"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {/* Fixed label. hidden on mobile, visible from md up */}
          <div className="hidden md:flex shrink-0 pl-8 lg:pl-12 pr-12 z-10 relative items-center h-full">
            <span
              className="inline-flex items-center px-6 py-2.5 rounded-lg border border-white/[0.3] text-[15px] text-white/70 whitespace-nowrap hover:text-white/90 hover:border-white/[0.5] transition-all duration-500"
              style={{ fontWeight: 300, letterSpacing: '0.02em' }}
            >
              {t('Our Customers')}
            </span>
          </div>

          {/* Scrolling marquee with mask fade on both edges */}
          <div
            className="flex-1 overflow-hidden relative"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <div className="marquee-track flex items-center">
              {/* First set */}
              <div className="marquee-content flex items-center gap-8 md:gap-16 shrink-0 pr-8 md:pr-16">
                {trustLogos.map((logo) => (
                  <div
                    key={logo}
                    data-testid={`trust-logo-${logo.toLowerCase().replace(/\s+/g, '-')}`}
                    className="shrink-0 opacity-[0.55]"
                  >
                    <img
                      src={logoImages[logo]}
                      alt={logo}
                      className="h-6 md:h-8 w-auto object-contain max-w-[90px] md:max-w-[120px]"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="marquee-content flex items-center gap-8 md:gap-16 shrink-0 pr-8 md:pr-16" aria-hidden="true">
                {trustLogos.map((logo) => (
                  <div key={`dup-${logo}`} className="shrink-0 opacity-[0.45]">
                    <img
                      src={logoImages[logo]}
                      alt=""
                      className="h-6 md:h-8 w-auto object-contain max-w-[90px] md:max-w-[120px]"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
