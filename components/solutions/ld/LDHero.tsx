// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function LDHero() {
  return (
    <section id="ld-hero" data-testid="ld-hero" className="relative min-h-screen flex flex-col justify-center pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-0">
        <motion.h1
          className="text-[clamp(2.8rem,5.5vw,5rem)] font-bold tracking-[-0.03em] text-white/95 mb-10 max-w-5xl"
          style={{ lineHeight: 1.15 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Stop funding generic training.<br />Start focusing on the{' '}
          <span className="italic font-bold gradient-text">real skill gaps.</span>
        </motion.h1>
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-[16px] lg:text-[18px] text-white/[0.65] leading-[1.75] max-w-xl" style={{ fontWeight: 300 }}>
            Skillvue gives L&D leaders objective, measurable data on where the real skill gaps are, at individual, team, and organizational level, so every training investment is targeted, measurable, and aligned to business impact.
          </p>
          <a href="/book-meeting" data-testid="ld-hero-cta" className="group inline-flex items-center justify-between w-full lg:w-auto lg:max-w-xl px-6 py-4 lg:px-8 lg:py-5 text-[14px] lg:text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500 shrink-0">
            <span>Book a Meeting</span>
            <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-[#9B9DFB] group-hover:translate-x-1 transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
