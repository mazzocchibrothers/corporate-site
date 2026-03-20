import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ProductHero() {
  return (
    <section id="product-hero" data-testid="product-hero" className="relative min-h-screen flex flex-col justify-center pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-0">
        {/* Headline */}
        <motion.h1
          className="text-[clamp(3rem,6vw,5.5rem)] font-bold tracking-[-0.03em] text-white/95 mb-10"
          style={{ lineHeight: 1.15 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          One platform.<br />
          Every talent decision.<br />
          <span className="italic font-bold gradient-text">Objective data.</span>
        </motion.h1>

        {/* Sub-headline + Book a Meeting on same row */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p
            className="text-[18px] text-white/[0.65] leading-[1.75] max-w-xl"
            style={{ fontWeight: 300 }}
          >
            Skillvue is the AI-powered talent intelligence platform that turns static HR processes into predictive, objective insights. Assess skills, predict potential, and make every people decision defensible.
          </p>

          <a
            href="/book-meeting"
            data-testid="product-hero-book-demo"
            className="group inline-flex items-center justify-between w-full lg:w-auto lg:max-w-xl px-8 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500 shrink-0"
          >
            <span>Book a Meeting</span>
            <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-[#9B9DFB] group-hover:translate-x-1 transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
