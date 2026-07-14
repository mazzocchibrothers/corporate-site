// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EyeOff, AlertTriangle, Scale } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { IconTile } from '@/components/ui/icon-tile';

const pains = [
  { icon: EyeOff, stat: '?', title: 'High potentials are invisible', desc: 'How many are already in the organization but hidden. And at risk of leaving before you even act?' },
  { icon: AlertTriangle, stat: '60%', title: 'Succession pipelines are fiction', desc: 'of critical roles have zero or one ready successor. The next leadership crisis is already building.' },
  { icon: Scale, stat: '0', title: 'Mobility is political, not meritocratic', desc: 'Horizontal moves happen only when someone asks or when it\'s already too late. Internal moves based on proximity and politics, not verified competencies.' },
];

export default function IMProblem() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const renderCard = (p, i) => {
    const Icon = p.icon;
    return (
      <motion.div
        key={p.title}
        data-testid={`im-pain-${i}`}
        className="group rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/90 p-6 md:p-10 transition-all duration-500 flex flex-col h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
      >
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <span className="text-[#121212] text-[32px] stat-value md:text-[clamp(2rem,4vw,3rem)]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{p.stat}</span>
          <IconTile icon={Icon} mode="light" />
        </div>
        <h3 className="text-[18px] font-semibold text-[#121212] mb-2 md:mb-3">{t(p.title)}</h3>
        <p className="text-[14px] md:text-[15px] text-[#7A7A7A] leading-[1.75]">{t(p.desc)}</p>
      </motion.div>
    );
  };

  return (
    <section id="im-problem" data-testid="im-problem" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <motion.div className="mb-12 md:mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212]">
            {t('The blind spots in your')}{' '}
            <span className="font-bold gradient-text-on-light">{t('talent mobility')}</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pains.map((p, i) => renderCard(p, i))}
        </div>
      </div>
    </section>
  );
}
