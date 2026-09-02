// @ts-nocheck
'use client';

import React, { useState, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

const allStories = [
  {
    id: 'carrefour', company: 'Carrefour', industry: 'gdo', useCases: ['hiring', 'learningDevelopment'],
    bgImage: '/logos/carrefour-bg.avif',
  },
  {
    id: 'subdued', company: 'Subdued', industry: 'retail', useCases: ['hiring'],
    bgImage: '/logos/subdued-bg.avif',
  },
  {
    id: 'ins-mercato', company: "In's Mercato", industry: 'gdo', useCases: ['internalMobility'],
    bgImage: '/logos/insmercato-bg.avif',
  },
  {
    id: 'adr', company: 'Aeroporti di Roma', industry: 'transportationLogistics', useCases: ['internalMobility', 'learningDevelopment'],
    bgImage: '/logos/adr-explore-stories.avif',
  },
  {
    id: 'europ-assistance', company: 'Europ Assistance', industry: 'financialServices', useCases: ['hiring'],
    bgImage: '/logos/europ-assistance-background-explore-stories.avif',
  },
  {
    id: 'unicomm', company: 'Unicomm', industry: 'gdo', useCases: ['hiring', 'internalMobility', 'learningDevelopment'],
    bgImage: '/logos/unicomm-background-explore-stories.avif',
  },
  {
    id: 'mediaset', company: 'Mediaset', industry: 'mediaBroadcasting', useCases: ['hiring'],
    bgImage: '/logos/mediaset-background-explore-stories (2).avif',
  },
  {
    id: 'fidia-farmaceutici', company: 'Fidia Farmaceutici', industry: 'pharmaceutical', useCases: ['learningDevelopment'],
    bgImage: '/logos/fidia-farmaceutici explore stories.avif',
  },
  // Temporarily removed from listing pending approval (restore when ready):
  // {
  //   id: 'credem', company: 'Gruppo Credem', industry: 'Financial Services', useCases: ['Hiring'],
  //   headlineIt: 'Gruppo Credem: come trovare i migliori talenti tra 30.000 candidature per seguire la crescita del business',
  //   headlineEn: 'Gruppo Credem: how to find the best talent among 30,000 applications to support business growth',
  //   bgImage: '/logos/credem_customer_story_cover.jpg',
  // },
  // douglas, eataly
];

// Still derived from the stories, so a new story cannot arrive without its
// filters. The values are ids now, and the labels come from the catalogue —
// which is what retired the industryLabel() ladder of locale checks.
const filters = {
  industry: ['all', ...Array.from(new Set(allStories.map(s => s.industry)))],
  useCase: ['all', ...Array.from(new Set(allStories.flatMap(s => s.useCases)))],
};

export default function ExploreStories() {
  const lang = useLocale();
  const t = useTranslations('customers');
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [activeUseCase, setActiveUseCase] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();

  const filtered = allStories.filter(s => {
    if (activeIndustry !== 'all' && s.industry !== activeIndustry) return false;
    if (activeUseCase !== 'all' && !s.useCases.includes(activeUseCase)) return false;
    return true;
  });

  return (
    <section id="explore" data-testid="explore-stories" className="relative py-20 lg:py-28" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white/90 mb-6">{t.rich('exploreStories.heading', {
            span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
          })}</h2>
          <p className="text-[20px] text-white/[0.65] leading-[1.75] max-w-2xl">{t('exploreStories.body')}</p>
        </motion.div>

        {/* Filters */}
        <motion.div className="mb-14 space-y-5" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mr-4 self-center">{t('exploreStories.text')}</span>
            {filters.industry.map(f => (
              <button key={f} onClick={() => setActiveIndustry(f)} className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${activeIndustry === f ? 'bg-white/[0.1] text-white border border-white/[0.15]' : 'text-white/40 border border-transparent hover:text-white/70'}`}>{t(`explore.industries.${f}`)}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mr-4 self-center">{t('exploreStories.text2')}</span>
            {filters.useCase.map(f => (
              <button key={f} onClick={() => setActiveUseCase(f)} className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${activeUseCase === f ? 'bg-white/[0.1] text-white border border-white/[0.15]' : 'text-white/40 border border-transparent hover:text-white/70'}`}>{t(`explore.useCases.${f}`)}</button>
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
                onClick={() => { router.push(`${href('customers', lang)}/${s.id}`); window.scrollTo(0, 0); }}
              >
                {/* Card visual area */}
                <div className="relative rounded-2xl border border-white/[0.08] hover:border-white/[0.14] transition-all duration-500 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* Background image if available */}
                  {s.bgImage && s.bgStyle === 'contain' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/[0.06] p-10">
                      <img src={s.bgImage} alt="" loading="lazy" className="max-w-[60%] max-h-[60%] object-contain opacity-90" />
                    </div>
                  ) : s.bgImage ? (
                    <>
                      <img src={s.bgImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/70" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-white/[0.04]" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-white/90 tracking-tight">{s.company}</span>
                  </div>
                  <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <ArrowRight className="h-4 w-4 text-white/50" />
                  </div>
                </div>
                {/* Title below. left aligned with card, with left padding */}
                <h3 className="text-[18px] font-semibold text-white/[0.65] leading-[1.45] mt-5 pl-2 group-hover:text-white/90 transition-colors duration-400">{t(`explore.stories.${s.id}.headline`)}</h3>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-10 text-center">
            <p className="text-[16px] text-white/50 mb-4">{t('exploreStories.body2')}</p>
            <p className="text-[14px] text-white/30">{t('exploreStories.body3')}</p>
            <Button asChild variant="secondary" mode="dark" className="mt-6">
              <a href={href('book-meeting', lang)}>
                {t('exploreStories.cta')} <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
