// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '€4.5M', label: 'saved annually in failed hire costs', sub: 'Based on 300 hires, 30% failure rate, €50K average cost per failure' },
  { value: '6-9mo', label: 'faster strategic execution', sub: 'When the right people are in the right roles from day one' },
  { value: '10-30x', label: 'ROI in 18-24 months', sub: 'With payback typically in 6-12 months' },
];

export default function CustomersROI() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="customers-roi" data-testid="customers-roi" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">
            People are your biggest cost.{' '}
            <span className="italic font-bold gradient-text-warm-on-light">They can also be your biggest return.</span>
          </h2>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-px bg-[#4B4DF7]/[0.06] rounded-2xl overflow-hidden mb-10">
          {stats.map((s, i) => (
            <motion.div key={s.value} className="bg-[#F5F5FA] p-10 lg:p-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}>
              <span className="block mb-5 text-[#1A1A2E]" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</span>
              <h3 className="text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-2">{s.label}</h3>
              <p className="text-[14px] text-[#1A1A2E]/50 leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </div>
        <motion.div className="flex items-center justify-between" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}>
          <p className="text-[15px] text-[#1A1A2E]/50">Every other budget line has an ROI framework. These companies proved talent spend can too.</p>
          <a href="/book-meeting" className="group inline-flex items-center gap-3 px-7 py-3.5 text-[13px] font-semibold tracking-wide rounded-full border border-[#4B4DF7]/15 text-[#4B4DF7] hover:bg-[#4B4DF7]/[0.06] transition-all duration-500 shrink-0">
            Book a Meeting
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
