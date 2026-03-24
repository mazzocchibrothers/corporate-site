// @ts-nocheck
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Eye, Users, Activity, Scale, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pillars = [
  { icon: Eye, title: 'Transparent scoring', desc: 'Every score comes with an explanation: what was measured, how it was scored, and what evidence supports it.' },
  { icon: Users, title: 'Human oversight', desc: 'AI recommends; humans decide. HR teams can edit, override, and make the final call on every assessment.' },
  { icon: Activity, title: 'Continuous monitoring', desc: 'Drift checks, stability reviews, and scoring audits detect changes before they affect results.' },
  { icon: Scale, title: 'Regulatory compliance', desc: 'Built from the ground up for GDPR, EU AI Act, ISO 27001, and SOC 2. Auditable by design.' },
];

const faqs = [
  { q: 'How does Skillvue ensure assessment validity?', a: 'Every assessment is built on validated I-O psychology constructs, reviewed by subject-matter experts, piloted with real participants, and continuously monitored for reliability and fairness. We publish internal validity reports for every deployment.' },
  { q: 'What role does AI play in assessment design and scoring?', a: 'AI generates contextualized assessment items, scores responses with transparent evidence, and surfaces patterns at scale. But every AI output is governed by psychometric constraints and subject to human review.' },
  { q: 'How does Skillvue handle bias in assessments?', a: 'Bias evaluation is embedded at every stage: item design, pilot testing, scoring validation, and ongoing monitoring. We test for differential item functioning across demographics and adjust items that show systematic bias.' },
  { q: 'What languages are supported?', a: 'Skillvue assessments are available in 50+ languages, with cultural adaptation built into the item design process to ensure measurement consistency across regions.' },
  { q: 'How does Skillvue comply with the EU AI Act?', a: 'Skillvue is designed from the ground up for EU AI Act compliance: transparent scoring, human oversight, continuous monitoring, and full auditability. We maintain documentation and governance processes that meet high-risk AI system requirements.' },
  { q: 'Can assessments be customized to our competency framework?', a: 'Yes. Every deployment starts with your competency model. We map your framework to validated constructs, generate contextualized items, and validate them against your population before going live.' },
];

export default function ResponsibleAI() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="responsible-ai" data-testid="responsible-ai" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">

        {/* Responsible AI */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] max-w-4xl">
            {t('Responsible AI built for')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('high-stakes talent decisions')}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} data-testid={`responsible-${p.title.toLowerCase().replace(/\s+/g, '-')}`} className="group rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/80 p-10 transition-all duration-500" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}>
                <Icon className="h-6 w-6 text-[#4B4DF7]/40 mb-5" strokeWidth={1.5} />
                <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-3">{t(p.title)}</h3>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.75]">{t(p.desc)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">
            {t('Frequently asked')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('questions')}</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl space-y-0">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="border-b border-[#1A1A2E]/[0.08]" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} data-testid={`faq-${i}`} className="w-full flex items-center justify-between py-6 text-left">
                <span className="text-[16px] font-semibold text-[#1A1A2E]/85 pr-8">{t(faq.q)}</span>
                <ChevronDown className={`h-4 w-4 text-[#1A1A2E]/30 shrink-0 transition-transform duration-400 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="text-[15px] text-[#1A1A2E]/[0.55] leading-[1.75] pb-6">{t(faq.a)}</p>
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
