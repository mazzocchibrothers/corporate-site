// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, GitBranch, Zap } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const pillars = [
  { icon: Eye, num: '01', title: 'End-to-end talent visibility', desc: 'Continuous mapping of skills and potential to match capabilities with needs. Reduce turnover and replacement costs by seeing your full talent picture.' },
  { icon: GitBranch, num: '02', title: 'Data-driven succession planning', desc: "Faster coverage of critical roles. Cut vacancy cost and dependency on external recruiting. Know who's ready now, who's ready in 6 months, and where gaps exist." },
  { icon: Zap, num: '03', title: 'Faster internal fills', desc: 'Stronger engagement and retention through transparent, data-backed decisions that value existing talent. Cut external search costs by filling roles from within.' },
];

export default function IMHowSolves() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="im-how" data-testid="im-how" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          {/* Left. sticky title */}
          <motion.div
            className="lg:sticky lg:top-32 self-start"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[#121212]">
              {t('Three pillars of')}{' '}
              <span className="font-bold gradient-text-on-light">{t('intelligent mobility')}</span>
            </h2>
          </motion.div>

          {/* Right. vertical pillar cards */}
          <div className="space-y-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  className="group relative grid grid-cols-[60px_1fr] gap-6 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                >
                  {/* Left: number + line */}
                  <div className="flex flex-col items-center">
                    <div className="w-[60px] h-[60px] rounded-2xl bg-[#4B4DF7]/[0.07] group-hover:bg-[#4B4DF7]/[0.12] flex items-center justify-center transition-colors duration-500">
                      <Icon className="h-6 w-6 text-[#4B4DF7]/50 group-hover:text-[#4B4DF7]/80 transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    {i < pillars.length - 1 && (
                      <div className="w-px flex-1 bg-[#4B4DF7]/[0.08] mt-4" />
                    )}
                  </div>

                  {/* Right: content */}
                  <div className="pb-10">
                    <span className="text-[12px] font-bold text-[#4B4DF7]/30 tracking-[0.1em] mb-3 block">{p.num}</span>
                    <h3 className="text-[20px] font-bold text-[#121212] mb-3">{t(p.title)}</h3>
                    <p className="text-[16px] text-[#121212]/[0.65] leading-[1.75] max-w-lg">{t(p.desc)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
