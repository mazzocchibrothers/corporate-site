import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

export default function PlatformInfographic() {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-breathe relative py-16 md:py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-8 md:mb-14"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-[#1A1A2E] tracking-[-0.02em] mb-3 md:mb-4">
            {t('From signals to decisions. One connected flow.')}
          </h2>
          <p className="text-[13px] md:text-[17px] text-[#1A1A2E]/[0.45] leading-[1.6] md:leading-[1.75] max-w-2xl mx-auto">
            {t('Skillvue gathers signals from candidates, workforce, and market data, processes them through AI-powered skills intelligence, integrates with your core HR systems, and enables every talent decision with objective, defensible data.')}
          </p>
        </motion.div>

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* The original infographic image */}
          <img
            src="/assets/infographic-platform.png"
            alt="Skillvue Platform Flow"
            className="w-full max-w-[1100px] h-auto relative z-10"
          />

          {/* Animated pulse on the central orb area */}
          <div
            className="absolute z-0 rounded-full"
            style={{
              width: '18%',
              paddingBottom: '18%',
              left: '29%',
              top: '42%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
              animation: 'infraPulse 3s ease-in-out infinite',
            }}
          />

          <style>{`
            @keyframes infraPulse {
              0%, 100% { transform: scale(1); opacity: 0.5; }
              50% { transform: scale(1.15); opacity: 0.8; }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}
