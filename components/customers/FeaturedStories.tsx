// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const stories = [
  {
    id: 'carrefour',
    company: 'Carrefour',
    tags: ['Retail GDO', 'Hiring'],
    headline: '35% fewer days to hire. 30% better hires. Zero additional headcount.',
    metrics: ['-35% time-to-hire', '+30% new hire success'],
    quote: 'Skillvue ci ha permesso di rafforzare la nostra People Strategy, rendendo la mappatura delle competenze più rapida, efficace e data-driven.',
    author: 'Alessandro Mazzarol',
    title: 'TA & EB Manager, Carrefour Italia',
  },
  {
    id: 'ins-mercato',
    company: "In's Mercato",
    tags: ['Retail GDO', 'Hiring + Internal Mobility'],
    headline: '~900 people assessed. A Store Manager pipeline built from within.',
    metrics: ['~900 assessments', 'Hiring + Mobility unified'],
    quote: '',
    author: '',
    title: '',
  },
];

export default function FeaturedStories() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();

  return (
    <section id="featured" data-testid="featured-stories" className="section-breathe relative py-20 lg:py-24" ref={ref}>
      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E] mb-4">
            {t('Proof, not')}{' '}
            <span className="italic font-bold gradient-text-on-light">{t('promises.')}</span>
          </h2>
          <p className="text-[18px] text-[#1A1A2E]/[0.65] leading-[1.75] max-w-2xl">
            {t('See how leading European enterprises are making talent decisions with confidence.')}
          </p>
        </motion.div>

        <div className="space-y-5">
          {stories.map((s, i) => (
            <motion.div
              key={s.id}
              data-testid={`featured-${s.id}`}
              className="group grid lg:grid-cols-12 gap-8 rounded-2xl border border-[#4B4DF7]/[0.08] hover:border-[#4B4DF7]/[0.18] bg-white/60 hover:bg-white/90 p-8 lg:p-10 transition-all duration-500"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
            >
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[20px] font-bold text-[#1A1A2E]">{s.company}</span>
                  {s.tags.map(t => (
                    <span key={t} className="px-3 py-1 rounded-full text-[11px] font-semibold text-[#4B4DF7]/[0.65] bg-[#4B4DF7]/[0.06]">{t}</span>
                  ))}
                </div>
                <h3 className="text-[18px] font-bold text-[#1A1A2E]/80 mb-4 leading-snug">{t(s.headline)}</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {s.metrics.map(m => (
                    <span key={m} className="text-[15px] font-bold text-[#4B4DF7]">{m}</span>
                  ))}
                </div>
                {s.quote && (
                  <div className="border-l-2 border-[#4B4DF7]/20 pl-5 mb-6">
                    <p className="text-[14px] text-[#1A1A2E]/50 italic leading-[1.7] mb-2">"{t(s.quote)}"</p>
                    <p className="text-[13px] text-[#1A1A2E]/70 font-semibold">{s.author}, <span className="font-normal text-[#1A1A2E]/50">{t(s.title)}</span></p>
                  </div>
                )}
              </div>
              <div className="lg:col-span-4 flex items-end justify-end">
                <button onClick={() => { router.push(`/customers/${s.id}`); window.scrollTo(0,0); }} className="group/btn inline-flex items-center gap-2 text-[13px] font-semibold text-[#4B4DF7] hover:text-[#3A3BD6] transition-colors duration-300">
                  {t('Read the full story')}
                  <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
