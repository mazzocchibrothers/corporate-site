// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Shield, RefreshCw } from 'lucide-react';

const principles = [
  { icon: Sparkles, title: 'Better evidence', desc: 'AI unlocks richer, more direct evidence of skill through realistic scenarios, interactive tasks, and multiple response modalities that reflect how work is actually done.' },
  { icon: Shield, title: 'Rigor at scale', desc: 'We embed assessment science into the product so rigor scales with the system. Clear constructs, evidence-centered design, and governed scoring prevent AI from introducing noise.' },
  { icon: RefreshCw, title: 'Continuous evolution', desc: 'Because skills and roles evolve quickly, measurement must evolve with them. Continuous monitoring and scientist-led iteration keep signals accurate and defensible.' },
];

export default function AIScienceTogether() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ai-science" data-testid="ai-science" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-5">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 transition-all duration-500" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}>
                <Icon className="h-6 w-6 text-[#9B9DFB]/50 mb-5" strokeWidth={1.5} />
                <h3 className="text-[20px] font-bold text-white/90 mb-4">{p.title}</h3>
                <p className="text-[15px] text-white/[0.65] leading-[1.75]">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
