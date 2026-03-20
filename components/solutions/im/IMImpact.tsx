// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function IMImpact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="im-impact" data-testid="im-impact" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          className="grid lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-white/[0.08]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="lg:col-span-8 p-10 lg:p-14 bg-white/[0.04]">
            <span className="text-[12px] font-bold text-[#9B9DFB]/[0.65] tracking-[0.1em] uppercase mb-6 block">Customer Story</span>
            <h3 className="text-[28px] font-bold text-white/90 mb-2">Fidia</h3>
            <p className="text-[14px] text-white/40 mb-8">Pharma</p>
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase mb-3 block">Challenge</span>
                <p className="text-[15px] text-white/[0.65] leading-[1.75]">Mapping internal talent to identify succession candidates for critical leadership roles across multiple business units.</p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#9B9DFB]/50 tracking-[0.1em] uppercase mb-3 block">Result</span>
                <p className="text-[15px] text-white/[0.65] leading-[1.75]">Full talent visibility across the organization. Data-driven succession plans now cover 100% of critical roles with identified ready-now and ready-soon candidates.</p>
              </div>
            </div>
            <a href="#" className="group/btn inline-flex items-center gap-2.5 px-6 py-3 text-[13px] font-semibold tracking-wide rounded-full border border-white/[0.15] text-white/[0.65] hover:text-white/90 hover:border-white/25 hover:bg-white/[0.05] transition-all duration-500">
              Read the full story
              <ArrowUpRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-10 lg:p-14 bg-white/[0.06] border-t lg:border-t-0 lg:border-l border-white/[0.06]">
            <span className="block text-white" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>100%</span>
            <p className="text-[14px] text-white/[0.65] mt-3 text-center">critical roles with<br />succession coverage</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
