'use client';

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Settings, Shield, Scale } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const pillars = [
  {
    id: 'customizability',
    icon: Settings,
  },
  {
    id: 'security',
    icon: Shield,
  },
  {
    id: 'compliance',
    icon: Scale,
  },
];

const badges = [
  'euAiAct',
  'iso27001',
  'gdpr',
  'aicpaSoc2',
];

export default function EnterpriseTrust() {
  const t = useTranslations('product-overview');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section id="enterprise-trust" data-testid="enterprise-trust" className="section-breathe relative py-14 md:py-16 lg:py-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-4 md:mb-6">{t.rich('enterpriseTrust.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
          <p className="text-[14px] md:text-[18px] text-[#7A7A7A] leading-[1.6] md:leading-[1.75] max-w-2xl">{t('enterpriseTrust.body')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5 mb-8 md:mb-12">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                data-testid={`trust-${pillar.id}`}
                className="group rounded-xl md:rounded-2xl border border-[#4B4DF7]/[0.08] bg-white p-5 md:p-10 hover:border-[#4B4DF7]/[0.15] hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04] transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <IconTile icon={Icon} mode="light" className="mb-3 md:mb-5" />
                <h3 className="text-[16px] md:text-[20px] font-semibold text-[#1A1A2E] mb-2 md:mb-4">{t(`enterpriseTrust.pillars.${pillar.id}.title`)}</h3>
                <p className="text-[13px] md:text-[15px] text-[#7A7A7A] leading-[1.5] md:leading-[1.75]">{t(`enterpriseTrust.pillars.${pillar.id}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="flex flex-wrap gap-2 md:gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex px-3.5 py-2 md:px-5 md:py-2.5 rounded-full text-[12px] md:text-[12px] font-semibold text-[#121212]/60 border border-[#121212]/[0.1] bg-[#121212]/[0.03] tracking-wide"
            >
              {t(`enterpriseTrust.badges.${badge}`)}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
