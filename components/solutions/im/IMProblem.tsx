// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EyeOff, AlertTriangle, Scale } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pains = [
  { icon: EyeOff, stat: '?', title: 'High potentials are invisible', desc: 'How many are already in the organization but hidden. And at risk of leaving before you even act?' },
  { icon: AlertTriangle, stat: '60%', title: 'Succession pipelines are fiction', desc: 'of critical roles have zero or one ready successor. The next leadership crisis is already building.' },
  { icon: Scale, stat: '0', title: 'Mobility is political, not meritocratic', desc: 'Horizontal moves happen only when someone asks or when it\'s already too late. Internal moves based on proximity and politics, not verified competencies.' },
];

export default function IMProblem() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="im-problem" data-testid="im-problem" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">
            {t('The blind spots in your')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('talent mobility')}</span>
          </h2>
        </motion.div>

        {/* Large stat + icon cards */}
        <div className="grid lg:grid-cols-3 gap-5">
          {pains.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                data-testid={`im-pain-${i}`}
                className="group rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/90 p-10 transition-all duration-500 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[#1A1A2E]" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>{p.stat}</span>
                  <Icon className="h-6 w-6 text-[#4B4DF7]/30" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-3">{t(p.title)}</h3>
                <p className="text-[15px] text-[#1A1A2E]/[0.65] leading-[1.75]">{t(p.desc)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
