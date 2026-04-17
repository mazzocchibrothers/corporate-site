import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings, Shield, Scale } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pillars = [
  {
    icon: Settings,
    title: 'Customizability',
    desc: 'Every component, internal or candidate-facing, adapts to your processes, your leadership model, your workflows. We deploy on your terms, not ours.',
  },
  {
    icon: Shield,
    title: 'Security',
    desc: 'ISO 27001 and SOC 2 certified. Data protection is embedded in our architecture from day one.',
  },
  {
    icon: Scale,
    title: 'Compliance',
    desc: "From GDPR to the EU AI Act, we build for the most demanding regulatory environments so you don't have to worry about what's next.",
  },
];

const badges = ['EU AI Act', 'ISO 27001', 'GDPR', 'AICPA SOC 2'];

export default function EnterpriseTrust() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="enterprise-trust" data-testid="enterprise-trust" className="section-breathe relative py-16 lg:py-20" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#121212] mb-6">
            {t('Built')}{' '}
            <span className="font-bold gradient-text-on-light">{t('enterprise ready')}</span>
          </h2>
          <p className="text-[18px] text-[#121212]/[0.65] leading-[1.75] max-w-2xl">
            {t('We are opinionated about science, flexible about everything else. From deep customizability to the most demanding regulatory environments.')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 mb-12">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                data-testid={`trust-${pillar.title.toLowerCase()}`}
                className="group rounded-2xl border border-[#4B4DF7]/[0.08] bg-white p-10 hover:border-[#4B4DF7]/[0.15] hover:shadow-lg hover:shadow-[#4B4DF7]/[0.04] transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <Icon className="h-6 w-6 text-[#4B4DF7]/50 mb-5" strokeWidth={1.5} />
                <h3 className="text-[20px] font-bold text-[#121212] mb-4">{t(pillar.title)}</h3>
                <p className="text-[15px] text-[#121212]/[0.55] leading-[1.75]">{t(pillar.desc)}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex px-5 py-2.5 rounded-full text-[12px] font-semibold text-[#4B4DF7]/70 border border-[#4B4DF7]/[0.12] bg-[#4B4DF7]/[0.04] tracking-wide"
            >
              {t(badge)}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
