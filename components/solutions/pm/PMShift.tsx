// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { X, Check } from 'lucide-react';

const oldItems = [
  'Reviews driven by manager opinion and recency bias',
  'Inconsistent evaluation standards across teams, countries, and BUs',
  'Promotion decisions based on "who\'s visible"',
  'No way to measure competencies as rigorously as KPIs',
];

const newItems = [
  'Reviews informed by objective skill data as a calibrated starting point',
  'One framework applied consistently across the entire organization',
  'Promotion decisions based on validated competency data',
  'Skill assessments embedded in performance reviews with the same objectivity as business metrics',
];

export default function PMShift() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pm-shift" data-testid="pm-shift" className="relative py-20 lg:py-28 flex items-center" style={{ minHeight: '100vh' }} ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90">
            From subjective reviews to{' '}
            <span className="italic font-bold gradient-text">objective-subjective linkage</span>
          </h2>
        </motion.div>

        {/* Two cards side by side */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Old playbook */}
          <motion.div
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 lg:p-10"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-[12px] font-bold text-white/30 tracking-[0.1em] uppercase mb-8 block">The old playbook</span>
            <div className="space-y-6">
              {oldItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                    <X className="h-3.5 w-3.5 text-white/30" />
                  </div>
                  <p className="text-[15px] text-white/40 leading-[1.7]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* With Skillvue */}
          <motion.div
            className="rounded-2xl border border-[#4B4DF7]/[0.15] bg-white/[0.06] p-8 lg:p-10"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span className="text-[12px] font-bold text-[#9B9DFB]/[0.65] tracking-[0.1em] uppercase mb-8 block">With Skillvue</span>
            <div className="space-y-6">
              {newItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#4B4DF7]/[0.12] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-[#9B9DFB]" />
                  </div>
                  <p className="text-[15px] text-white/[0.65] leading-[1.7]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
