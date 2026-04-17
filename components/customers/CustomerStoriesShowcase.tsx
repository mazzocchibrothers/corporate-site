// @ts-nocheck
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import AnimatedWaveform from '../ui/AnimatedWaveform';
import { useLanguage } from '@/i18n/LanguageContext';

export default function CustomerStoriesShowcase() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative py-28 lg:py-36" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center" style={{ minHeight: '650px' }}>

          {/* Left. Title + description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[11px] font-bold text-white/30 tracking-[0.2em] uppercase mb-6 block">
              {t('Customer Stories')}
            </span>

            <h2
              className="font-bold text-white/95 mb-8"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              {t('See how')}<br />{t('they')}{' '}
              <span className="gradient-text">{t('grow.')}</span>
            </h2>

            <p className="text-[18px] text-white/[0.5] leading-[1.75] max-w-md mb-12" style={{ fontWeight: 300 }}>
              {t('Organizations harness Skillvue to make talent decisions with confidence, eliminating guesswork and empowering their people. These are their stories.')}
            </p>

            <a
              href="#explore"
              className="group inline-flex items-center gap-3 text-[14px] text-white/50 hover:text-white/80 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:border-white/[0.25] transition-all duration-300">
                <ChevronDown className="h-4 w-4" />
              </span>
              {t('Explore all stories')}
            </a>
          </motion.div>

          {/* Right. Video card (replicating reference exactly) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                aspectRatio: '3/4',
                maxHeight: '680px',
                background: '#0E0E0E',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Video */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src="/videos/customer-story.mp4"
                autoPlay
                loop
                muted
                playsInline
              />

              {/* Top overlay. mute button + animated waveform */}
              <div className="absolute top-0 left-0 right-0 z-10 p-6 flex items-center gap-5" style={{ paddingRight: '24px' }}>
                <button
                  onClick={toggleMute}
                  className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition-all duration-300 shrink-0"
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5 text-white/80" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white/80" />
                  )}
                </button>
                {/* Animated audio waveform */}
                <div className="flex-1" style={{ height: '56px' }}>
                  <AnimatedWaveform
                    playing={true}
                    barCount={100}
                    barWidth={2.5}
                    barGap={2}
                    maxHeight={26}
                    color="#ffffff"
                  />
                </div>
              </div>

              {/* Bottom overlay. gradient + quote */}
              <div
                className="absolute bottom-0 left-0 right-0 z-10 p-8 lg:p-10"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
                }}
              >
                {/* Quote */}
                <p className="text-[clamp(1.2rem,2.2vw,1.6rem)] font-bold text-white leading-[1.35] mb-5">
                  {t('has enabled me to turn that formerly manual process into a very fine tune')}{' '}
                  <span className="text-[#FF5F24]">{t('machine.')}</span>
                </p>

                {/* Author */}
                <div className="mb-6">
                  <span className="text-[14px] font-semibold text-white/80">Alessandro Mazzarol</span>
                  <span className="text-[13px] text-white/40 ml-2">{t('TA & EB Manager, Carrefour')}</span>
                </div>

                {/* Navigation bars */}
                <div className="flex items-center gap-2">
                  <div className="h-[2px] w-10 bg-white/70 rounded-full" />
                  <div className="h-[2px] w-10 bg-white/20 rounded-full" />
                  <div className="h-[2px] w-10 bg-white/20 rounded-full" />
                  <div className="h-[2px] w-10 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
