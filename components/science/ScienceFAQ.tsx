// @ts-nocheck
'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 'howDoesSkillvue',
  },
  {
    id: 'whatRoleDoes',
  },
  {
    id: 'howDoesSkillvue2',
  },
  {
    id: 'whatLanguagesSupported',
  },
  {
    id: 'howDoesSkillvue3',
  },
  {
    id: 'canVerificationsCustomized',
  },
];

export default function ScienceFAQ() {
  const t = useTranslations('science');
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" data-testid="science-faq" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90">{t.rich('faq.heading', {
            span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
          })}</h2>
        </motion.div>
        <div className="max-w-3xl space-y-0">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="border-b border-white/[0.06]" initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} data-testid={`faq-${i}`} className="w-full flex items-center justify-between py-6 text-left">
                <span className="text-[16px] font-semibold text-white/85 pr-8">{t(`faq.faqs.${faq.id}.q`)}</span>
                <ChevronDown className={`h-4 w-4 text-white/40 shrink-0 transition-transform duration-400 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="text-[15px] text-white/[0.65] leading-[1.75] pb-6">{t(`faq.faqs.${faq.id}.a`)}</p>
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
