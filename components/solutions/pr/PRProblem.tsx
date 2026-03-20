// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const pains = [
  { title: 'Staffing by availability, not capability', desc: "Project teams assembled based on who's free, not who has the right skills. Result: delivery delays, rework, and frustration." },
  { title: 'No visibility on real skills across the org', desc: 'Managers rely on memory, reputation, and who they know. not verified competency data. Top performers are over-deployed; hidden talent stays invisible.' },
  { title: 'Performance variance is unexplained', desc: "Team A delivers on time. Team B doesn't. Same tools, same size. The difference is people quality. but without objective data, you can't diagnose it." },
];

export default function PRProblem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pr-problem" data-testid="pr-problem" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">
            The blind spots in your{' '}
            <span className="italic font-bold gradient-text-on-light">project staffing</span>
          </h2>
        </motion.div>

        {/* Alternating left-right cards */}
        <div className="space-y-5">
          {pains.map((p, i) => (
            <motion.div
              key={p.title}
              data-testid={`pr-pain-${i}`}
              className={`group rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/90 p-8 lg:p-10 transition-all duration-500 max-w-3xl ${i % 2 === 1 ? 'ml-auto' : ''}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
            >
              <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-3">{p.title}</h3>
              <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.75]">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
