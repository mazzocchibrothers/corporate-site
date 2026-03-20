// @ts-nocheck
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How does Skillvue ensure assessment validity?', a: 'Every assessment is built on validated I-O psychology constructs, reviewed by subject-matter experts, piloted with real participants, and continuously monitored for reliability and fairness. We publish internal validity reports for every deployment.' },
  { q: 'What role does AI play in assessment design and scoring?', a: 'AI generates contextualized assessment items, scores responses with transparent evidence, and surfaces patterns at scale. But every AI output is governed by psychometric constraints and subject to human review.' },
  { q: 'How does Skillvue handle bias in assessments?', a: 'Bias evaluation is embedded at every stage: item design, pilot testing, scoring validation, and ongoing monitoring. We test for differential item functioning across demographics and adjust items that show systematic bias.' },
  { q: 'What languages are supported?', a: 'Skillvue assessments are available in 50+ languages, with cultural adaptation built into the item design process to ensure measurement consistency across regions.' },
  { q: 'How does Skillvue comply with the EU AI Act?', a: 'Skillvue is designed from the ground up for EU AI Act compliance: transparent scoring, human oversight, continuous monitoring, and full auditability. We maintain documentation and governance processes that meet high-risk AI system requirements.' },
  { q: 'Can assessments be customized to our competency framework?', a: 'Yes. Every deployment starts with your competency model. We map your framework to validated constructs, generate contextualized items, and validate them against your population before going live.' },
];

export default function ScienceFAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" data-testid="science-faq" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90">
            Frequently asked{' '}
            <span className="italic font-bold gradient-text">questions</span>
          </h2>
        </motion.div>
        <div className="max-w-3xl space-y-0">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="border-b border-white/[0.06]" initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} data-testid={`faq-${i}`} className="w-full flex items-center justify-between py-6 text-left">
                <span className="text-[16px] font-semibold text-white/85 pr-8">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-white/40 shrink-0 transition-transform duration-400 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="text-[15px] text-white/[0.65] leading-[1.75] pb-6">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
