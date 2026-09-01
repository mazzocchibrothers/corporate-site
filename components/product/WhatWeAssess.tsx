'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const dimensions = [
  {
    id: 'suitability',
  },
  {
    id: 'softSkills',
  },
  {
    id: 'hardSkills',
  },
  {
    id: 'potential',
  },
  {
    id: 'traits',
  },
];

export default function WhatWeAssess() {
  const t = useTranslations('product-overview');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section id="what-we-verify" data-testid="what-we-verify" className="section-breathe relative py-16 md:py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          className="mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-4 md:mb-6">{t.rich('whatWeAssess.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
          <p className="text-[14px] md:text-[18px] text-[#7A7A7A] leading-[1.6] md:leading-[1.75] max-w-2xl">{t('whatWeAssess.body')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5 md:gap-3 lg:gap-4 mb-8 md:mb-10">
          {dimensions.map((dim, i) => (
            <motion.div
              key={dim.id}
              data-testid={`dimension-${dim.id}`}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-4 md:p-8 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <h3 className="text-[15px] md:text-[17px] font-semibold text-[#1A1A2E] mb-0.5 md:mb-1">{t(`whatWeAssess.dimensions.${dim.id}.title`)}</h3>
              <span className="text-[12px] md:text-[12px] text-[#4B4DF7]/[0.65] font-medium mb-2 md:mb-4">{t(`whatWeAssess.dimensions.${dim.id}.subtitle`)}</span>
              <p className="text-[12px] md:text-[14px] text-[#7A7A7A] leading-[1.5] md:leading-[1.7]">{t(`whatWeAssess.dimensions.${dim.id}.desc`)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex items-center gap-4 mt-6 md:mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button asChild variant="tertiary" mode="dark">
            <a href="/science">
              {t('whatWeAssess.cta')}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
