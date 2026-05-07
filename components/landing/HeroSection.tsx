import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/i18n/LanguageContext';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import scrollArrowsData from '../../public/animations/scroll-arrows.json';

const trustLogosIt = [
  { name: 'Unicredit', src: '/logos/unicredit.png' },
  { name: 'Carrefour', src: '/logos/carrefour_fixed.png' },
  { name: 'Fidia', src: '/logos/fidia_fixed.png' },
  { name: 'Generali', src: '/logos/generali.png' },
  { name: 'Coop', src: '/logos/coop.png' },
  { name: 'Douglas', src: '/logos/douglas.png' },
];

const trustLogosEn = [
  { name: 'Moncler', src: '/logos/moncler-en.png' },
  { name: 'Lagardère', src: '/logos/lagardere-en.png' },
  { name: 'Nespresso', src: '/logos/nespresso-en.png' },
  { name: 'Tecnomat', src: '/logos/tecnomat-en.png' },
  { name: 'Avolta', src: '/logos/avolta-en.png' },
  { name: 'Carrefour', src: '/logos/carrefour-en.png' },
  { name: 'Generali', src: '/logos/generali-en.png' },
  { name: 'Douglas', src: '/logos/douglas-en.png' },
  { name: 'Europ Assistance', src: '/logos/europ-assistance-en.png' },
];

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const baseLogos = lang === 'en' ? trustLogosEn : trustLogosIt;
  // Repeat the set so the marquee track is always wider than any viewport,
  // eliminating any visible gap before the duplicate kicks in.
  const trustLogos = [...baseLogos, ...baseLogos];

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative overflow-hidden flex flex-col justify-between pt-[80px]"
      style={{ width: '100%', minHeight: '100vh', background: '#0d0d1f' }}
    >
      {/* Hero content. layered above */}
      <div className="relative z-10 flex-1 flex items-start md:items-center pt-6 md:pt-0">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-10 md:py-16 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-12 items-center">
            {/* LEFT. Big headline */}
            <div className="lg:col-span-6">
              <motion.h1
                className="text-[clamp(2.5rem,10vw,3.75rem)] md:text-[clamp(2.75rem,4.8vw,4.5rem)] font-bold tracking-[-0.025em] text-white"
                style={{ lineHeight: 1.08, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t('Every talent')}<br />
                {t('decision,')} <span className="italic font-bold gradient-text">{t('finally')}</span><br />
                {t('backed by science.')}
              </motion.h1>
              <motion.p
                className="text-[15px] md:text-[17px] text-white/75 leading-[1.65] md:leading-[1.65] mt-6 md:mt-8 max-w-lg font-normal md:font-light"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {t('Skillvue combines psychometric rigour with modern AI to assess skills, predict performance, and guide every talent decision, from hiring to promotion to transformation readiness.')}
              </motion.p>
            </div>

            {/* RIGHT. Product video — slightly larger */}
            <motion.div
              className="lg:col-span-6 lg:-mr-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div
                className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-[#0d0d1f]"
                style={{ boxShadow: '0 20px 60px -15px rgba(75, 77, 247, 0.45), 0 0 0 1px rgba(255,255,255,0.05)' }}
              >
                <iframe
                  src="https://www.youtube-nocookie.com/embed/Y8Oo5HBVl-Q?autoplay=1&mute=1&loop=1&playlist=Y8Oo5HBVl-Q&rel=0&modestbranding=1&vq=hd2160&hd=1&playsinline=1&enablejsapi=1"
                  title="Skillvue product video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={(e) => {
                    const iframe = e.currentTarget;
                    const setQuality = () => {
                      iframe.contentWindow?.postMessage(
                        '{"event":"command","func":"setPlaybackQuality","args":["hd2160"]}',
                        '*'
                      );
                    };
                    setTimeout(setQuality, 800);
                    setTimeout(setQuality, 2000);
                    setTimeout(setQuality, 4000);
                  }}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
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
                {trustLogos.map((logo, i) => (
                  <div
                    key={`a-${i}-${logo.name}`}
                    data-testid={`trust-logo-${logo.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="shrink-0 opacity-[0.55]"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-6 md:h-8 w-auto object-contain max-w-[90px] md:max-w-[120px]"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="marquee-content flex items-center gap-8 md:gap-16 shrink-0 pr-8 md:pr-16" aria-hidden="true">
                {trustLogos.map((logo, i) => (
                  <div key={`b-${i}-${logo.name}`} className="shrink-0 opacity-[0.45]">
                    <img
                      src={logo.src}
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
