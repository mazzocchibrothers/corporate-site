// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, FileText, BookOpen, Shield, Globe } from 'lucide-react';

const badges = ['GDPR-compliant', 'ISO 27001 certified', 'EU AI Act ready', '50+ languages', 'Built for European enterprises'];

export default function CustomersFinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="customers-cta" data-testid="customers-cta" className="relative pt-12 pb-20 lg:pt-16 lg:pb-24" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90">
            Ready to see what Skillvue can do for your{' '}
            <span className="italic font-bold gradient-text">organization?</span>
          </h2>
        </motion.div>

        <motion.div className="grid lg:grid-cols-12 gap-4 mb-6" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="lg:col-span-12 group rounded-2xl border border-white/[0.06] hover:border-white/[0.14] bg-white/[0.04] hover:bg-white/[0.06] backdrop-blur-sm p-10 lg:p-14 transition-all duration-500">
            <span className="text-[11px] font-semibold text-[#9B9DFB]/[0.65] tracking-[0.15em] uppercase">Ready to explore</span>
            <h3 className="text-2xl font-bold text-white/90 mt-4 mb-3">Book a Meeting</h3>
            <p className="text-[15px] text-white/[0.65] mb-8 max-w-md">See Skillvue live with your specific use case</p>
            <a href="/book-meeting" className="group/btn inline-flex items-center justify-between w-full max-w-sm px-8 py-5 text-[14px] font-semibold text-white rounded-full border border-white/10 hover:border-[#4B4DF7]/40 hover:bg-[#4B4DF7]/[0.08] transition-all duration-500">
              <span>Book a Meeting</span>
              <ArrowRight className="h-4 w-4 text-white/30 group-hover/btn:text-[#9B9DFB] group-hover/btn:translate-x-1 transition-all duration-500" />
            </a>
          </div>
        </motion.div>

        <motion.div className="flex flex-wrap gap-x-6 gap-y-2" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }}>
          {badges.map(b => (
            <span key={b} className="text-[11px] text-white/[0.65] font-medium">{b}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
