// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function PRCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pr-cta" data-testid="pr-cta" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-10 lg:p-16 text-center" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90 mb-10">
            Ready to staff projects with{' '}
            <span className="italic font-bold gradient-text">confidence?</span>
          </h2>
          <a href="/book-meeting" data-testid="pr-final-cta" className="group inline-flex items-center gap-4 px-10 py-5 text-[15px] font-semibold tracking-wide text-white rounded-full border border-white/15 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500">
            <span>Book a Meeting</span>
            <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-[#9B9DFB] group-hover:translate-x-1 transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
