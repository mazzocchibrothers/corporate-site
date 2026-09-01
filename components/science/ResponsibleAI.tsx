// @ts-nocheck
'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Eye, Users, Activity, Scale, ChevronDown } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const pillars = [
  {
    id: 'transparentScoring',
    icon: Eye,
  },
  {
    id: 'humanOversight',
    icon: Users,
  },
  {
    id: 'continuousMonitoring',
    icon: Activity,
  },
  {
    id: 'regulatoryCompliance',
    icon: Scale,
  },
];

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

export default function ResponsibleAI() {
  const t = useTranslations('science');
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const renderPillar = (p, i) => {
    const Icon = p.icon;
    return (
      <motion.div key={p.id} data-testid={`responsible-${p.id}`} className="group rounded-xl md:rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/80 p-5 md:p-10 transition-all duration-500 h-full" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}>
        <IconTile icon={Icon} mode="light" className="mb-3 md:mb-5" />
        <h3 className="text-[15px] md:text-[18px] font-semibold text-[#1A1A2E] mb-2 md:mb-3">{t(`responsibleAI.pillars.${p.id}.title`)}</h3>
        <p className="text-[12px] md:text-[15px] text-[#7A7A7A] leading-[1.5] md:leading-[1.75]">{t(`responsibleAI.pillars.${p.id}.desc`)}</p>
      </motion.div>
    );
  };

  return (
    <section id="responsible-ai" data-testid="responsible-ai" className="section-breathe relative py-16 md:py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

        {/* Responsible AI */}
        <motion.div className="mb-8 md:mb-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] max-w-4xl">{t.rich('responsibleAI.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3 md:gap-5 mb-12 md:mb-20">
          {pillars.map((p, i) => renderPillar(p, i))}
        </div>

        {/* FAQ */}
        <motion.div className="mb-6 md:mb-10" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">{t.rich('responsibleAI.heading2', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </motion.div>

        <div className="max-w-3xl space-y-0">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="border-b border-[#1A1A2E]/[0.08]" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} data-testid={`faq-${i}`} className="w-full flex items-center justify-between py-4 md:py-6 text-left">
                <span className="text-[15px] md:text-[16px] font-semibold text-[#1A1A2E]/85 pr-4 md:pr-8">{t(`responsibleAI.faqs.${faq.id}.q`)}</span>
                <ChevronDown className={`h-5 w-5 md:h-4 md:w-4 text-[#1A1A2E]/30 shrink-0 transition-transform duration-400 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="text-[14px] md:text-[15px] text-[#7A7A7A] leading-[1.65] md:leading-[1.75] pb-4 md:pb-6">{t(`responsibleAI.faqs.${faq.id}.a`)}</p>
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
