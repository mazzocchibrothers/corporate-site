// @ts-nocheck
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';

const allStories = [
  { id: 'carrefour', company: 'Carrefour', industry: 'Retail', useCase: 'Hiring & Screening', headline: "How Carrefour Italia is Hiring Better, Faster, and at Scale. Without Adding a Single Person to the Team with Skillvue", bgImage: '/logos/carrefour-bg.jpg' },
  { id: 'subdued', company: 'Subdued', industry: 'Retail', useCase: 'Hiring & Screening', headline: 'Winning Gen Z Talent Without Drowning in Interviews. The Subdued Story with Skillvue', bgImage: '/logos/subdued-bg.jpg' },
  { id: 'ins-mercato', company: "In's Mercato", industry: 'Retail', useCase: 'Internal Mobility & Succession', headline: "Building the Next Generation of Store Managers from Within. How In's Mercato Did It with Skillvue", bgImage: '/logos/insmercato-bg.jpg' },
  { id: 'adr', company: 'Aeroporti di Roma', industry: 'Aviation', useCase: 'Internal Mobility & Succession', headline: 'Come Aeroporti di Roma ha democratizzato l\'accesso allo sviluppo per 5.000 persone con Skillvue', bgImage: '/logos/adr-logo.jpg', bgStyle: 'contain' },
];

const filters = {
  industry: ['All', 'Retail', 'Aviation'],
  useCase: ['All', 'Hiring & Screening', 'Internal Mobility & Succession'],
};

export default function ExploreStories() {
  const { t } = useLanguage();
  const [activeIndustry, setActiveIndustry] = useState('All');
  const [activeUseCase, setActiveUseCase] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();

  const filtered = allStories.filter(s => {
    if (activeIndustry !== 'All' && s.industry !== activeIndustry) return false;
    if (activeUseCase !== 'All' && s.useCase !== activeUseCase) return false;
    return true;
  });

  return (
    <section id="explore" data-testid="explore-stories" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90 mb-6">
            {t('Find your')}{' '}
            <span className="italic font-bold gradient-text">{t('story.')}</span>
          </h2>
          <p className="text-[20px] text-white/[0.65] leading-[1.75] max-w-2xl">
            {t('Every challenge is different. Every context is specific. Filter by what matters to you.. Every context is specific. Filter by what matters to you.')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div className="mb-14 space-y-5" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="flex flex-wrap gap-2">
            <span className="text-[13px] font-bold text-white/35 tracking-[0.1em] uppercase mr-4 self-center">{t('Industry')}</span>
            {filters.industry.map(f => (
              <button key={f} onClick={() => setActiveIndustry(f)} className={`px-5 py-2.5 rounded-full text-[15px] font-medium transition-all duration-300 ${activeIndustry === f ? 'bg-[#4B4DF7] text-white' : 'text-white/50 border border-white/[0.1] hover:border-white/[0.2]'}`}>{f}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-[13px] font-bold text-white/35 tracking-[0.1em] uppercase mr-4 self-center">{t('Use Case')}</span>
            {filters.useCase.map(f => (
              <button key={f} onClick={() => setActiveUseCase(f)} className={`px-5 py-2.5 rounded-full text-[15px] font-medium transition-all duration-300 ${activeUseCase === f ? 'bg-[#4B4DF7] text-white' : 'text-white/50 border border-white/[0.1] hover:border-white/[0.2]'}`}>{f}</button>
            ))}
          </div>
        </motion.div>

        {/* Story grid. 2 columns, large cards with centered name + title below */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-10">
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                data-testid={`story-${s.id}`}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => { router.push(`/customers/${s.id}`); window.scrollTo(0, 0); }}
              >
                {/* Card visual area */}
                <div className="relative rounded-2xl border border-white/[0.08] hover:border-white/[0.14] transition-all duration-500 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* Background image if available */}
                  {s.bgImage && s.bgStyle === 'contain' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/[0.06] p-10">
                      <img src={s.bgImage} alt="" className="max-w-[60%] max-h-[60%] object-contain opacity-90" />
                    </div>
                  ) : s.bgImage ? (
                    <>
                      <img src={s.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/70" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-white/[0.04]" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-white/90 tracking-tight">{s.company}</span>
                  </div>
                  <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <ArrowRight className="h-5 w-5 text-white/50" />
                  </div>
                </div>
                {/* Title below. left aligned with card, with left padding */}
                <h3 className="text-[18px] font-semibold text-white/[0.65] leading-[1.45] mt-5 pl-2 group-hover:text-white/90 transition-colors duration-400">{t(s.headline)}</h3>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-12 text-center">
            <p className="text-[16px] text-white/50 mb-4">{t('No stories match these filters yet.')}</p>
            <p className="text-[14px] text-white/30">{t('We may have a relevant case to share privately.')}</p>
            <a href="#" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-[13px] font-semibold text-white border border-white/15 hover:bg-white/[0.06] transition-all duration-400">
              {t('Book a meeting')} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
