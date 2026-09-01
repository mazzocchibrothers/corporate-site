// @ts-nocheck
'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

const pains = [
  {
    id: 'nearZeroVisibility',
    num: '01',
  },
  {
    id: 'programsPickedGut',
    num: '02',
  },
  {
    id: 'roiQuestionNobody',
    num: '03',
  },
];

export default function LDProblem() {
  const t = useTranslations('solutions.learning-development');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ld-problem" data-testid="ld-problem" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">{t.rich('ldProblem.heading', {
            span: (chunks) => <span className="font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pains.map((p, i) => (
            <motion.div
              key={p.num}
              data-testid={`ld-pain-${i}`}
              className="group rounded-2xl border border-[#121212]/[0.08] bg-white p-6 md:p-8 lg:p-10 hover:border-[#4B4DF7]/[0.18] hover:shadow-xl hover:shadow-[#4B4DF7]/[0.05] transition-all duration-500 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <span className="text-[36px] md:text-[42px] font-normal text-[#121212]/[0.1] leading-none tracking-[-0.03em] mb-6 md:mb-8 block">{p.num}</span>
              <h3 className="text-[18px] md:text-[20px] font-semibold text-[#121212] mb-2 md:mb-3 leading-tight">{t(`ldProblem.pains.${p.id}.title`)}</h3>
              <p className="text-[14px] md:text-[15px] text-[#7A7A7A] leading-[1.7] flex-1">{t(`ldProblem.pains.${p.id}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
