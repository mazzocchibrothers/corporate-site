// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function LDCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ld-cta" data-testid="ld-cta" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">
            Ready to prove L&D impact with{' '}
            <span className="italic font-bold gradient-text-on-light">data?</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          <a href="/book-meeting" data-testid="ld-final-cta" className="group inline-flex items-center justify-between w-full max-w-xl px-8 py-5 text-[14px] font-semibold tracking-wide text-[#4B4DF7] rounded-full border border-[#4B4DF7]/15 hover:bg-[#4B4DF7]/[0.06] transition-all duration-500">
            <span>Book a Meeting</span>
            <ArrowRight className="h-4 w-4 text-[#4B4DF7]/40 group-hover:text-[#4B4DF7] group-hover:translate-x-1 transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
