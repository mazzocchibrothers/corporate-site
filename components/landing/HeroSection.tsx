import React from 'react';
import { motion } from 'framer-motion';
import GradientBlinds from '../backgrounds/GradientBlinds';

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
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative overflow-hidden flex flex-col justify-between pt-[80px]"
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {/* GradientBlinds background. full hero, mouse-interactive on desktop, static on mobile */}
      <div className="absolute inset-0 z-0">
        <GradientBlinds
          dpr={typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1}
          gradientColors={["#4B4DF7", "#FF5F24", "#FF5F24"]}
          angle={0}
          noise={0.8}
          blindCount={isMobile ? 12 : 30}
          blindMinWidth={isMobile ? 0 : 70}
          mouseDampening={0.15}
          mirrorGradient={false}
          spotlightRadius={isMobile ? 0.7 : 0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="normal"
        />
      </div>

      {/* Hero content. layered above */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT. Big headline */}
            <div className="lg:col-span-7">
              <motion.h1
                className="text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-[-0.03em] text-white"
                style={{ lineHeight: 1.15, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Every talent<br />
                decision, <span className="italic font-bold gradient-text">finally</span><br />
                backed by science.
              </motion.h1>
              <motion.p
                className="text-[18px] text-white/80 leading-[1.75] mt-8 max-w-xl"
                style={{ fontWeight: 300, textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Skillvue combines psychometric rigour with modern AI to assess skills, predict performance, and guide every talent decision, from hiring to promotion to transformation readiness.
              </motion.p>
            </div>

            {/* RIGHT. CTA */}
          </div>
        </div>
      </div>

      {/* Trust bar. infinite marquee with glassmorphic blur */}
      <motion.div
        className="relative z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div
          className="flex items-center h-[80px]"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {/* Fixed label. styled like reference button */}
          <div className="shrink-0 pl-8 lg:pl-12 pr-12 z-10 relative flex items-center h-full">
            <span
              className="inline-flex items-center px-6 py-2.5 rounded-lg border border-white/[0.3] text-[15px] text-white/70 whitespace-nowrap hover:text-white/90 hover:border-white/[0.5] transition-all duration-500"
              style={{ fontWeight: 300, letterSpacing: '0.02em' }}
            >
              Our Customers
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
              <div className="marquee-content flex items-center gap-16 shrink-0 pr-16">
                {trustLogos.map((logo) => (
                  <div
                    key={logo}
                    data-testid={`trust-logo-${logo.toLowerCase().replace(/\s+/g, '-')}`}
                    className="shrink-0 opacity-[0.55]"
                  >
                    <img
                      src={logoImages[logo]}
                      alt={logo}
                      className="h-8 w-auto object-contain max-w-[120px]"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="marquee-content flex items-center gap-16 shrink-0 pr-16" aria-hidden="true">
                {trustLogos.map((logo) => (
                  <div key={`dup-${logo}`} className="shrink-0 opacity-[0.25]">
                    <img
                      src={logoImages[logo]}
                      alt=""
                      className="h-8 w-auto object-contain max-w-[120px]"
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
