'use client';

import React, { useState } from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown, ListFilter } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

const allStories = [
  {
    id: 'carrefour', company: 'Carrefour', industry: 'gdo', useCases: ['hiring', 'learningDevelopment'],
    bgImage: '/logos/customer-story-cover-carrefour.avif',
  },
  {
    id: 'subdued', company: 'Subdued', industry: 'retail', useCases: ['hiring'],
    bgImage: '/logos/customer-story-cover-subdued.avif',
  },
  {
    id: 'ins-mercato', company: "In's Mercato", industry: 'gdo', useCases: ['internalMobility'],
    bgImage: '/logos/customer-story-cover-ins-mercato.avif',
  },
  {
    id: 'adr', company: 'Aeroporti di Roma', industry: 'transportationLogistics', useCases: ['internalMobility', 'learningDevelopment'],
    bgImage: '/logos/customer-story-cover-adr.avif',
  },
  {
    id: 'europ-assistance', company: 'Europ Assistance', industry: 'financialServices', useCases: ['hiring'],
    bgImage: '/logos/customer-story-cover-europ-assistance.avif',
  },
  {
    id: 'unicomm', company: 'Unicomm', industry: 'gdo', useCases: ['hiring', 'internalMobility', 'learningDevelopment'],
    bgImage: '/logos/customer-story-cover-unicomm.avif',
  },
  {
    id: 'mediaset', company: 'Mediaset', industry: 'mediaBroadcasting', useCases: ['hiring'],
    bgImage: '/logos/customer-story-cover-mediaset.avif',
  },
  {
    id: 'fidia-farmaceutici', company: 'Fidia Farmaceutici', industry: 'pharmaceutical', useCases: ['learningDevelopment'],
    bgImage: '/logos/customer-story-cover-fidia-farmaceutici.avif',
  },
  {
    id: 'credem', company: 'Gruppo Credem', industry: 'financialServices', useCases: ['hiring'],
    bgImage: '/logos/customer-story-cover-credem.avif',
  },
  // douglas, eataly
];

// Still derived from the stories, so a new story cannot arrive without its
// filters. The values are ids now, and the labels come from the catalogue —
// which is what retired the industryLabel() ladder of locale checks.
const filters = {
  industry: Array.from(new Set(allStories.map(s => s.industry))),
  useCase: Array.from(new Set(allStories.flatMap(s => s.useCases))),
};

export default function ExploreStories() {
  const lang = useLocale();
  const t = useTranslations('customers');
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [activeUseCase, setActiveUseCase] = useState('all');
  const [industryOpen, setIndustryOpen] = useState(false);
  const [useCaseOpen, setUseCaseOpen] = useState(false);
  const router = useRouter();

  const filtered = allStories.filter(s => {
    if (activeIndustry !== 'all' && s.industry !== activeIndustry) return false;
    if (activeUseCase !== 'all' && !s.useCases.includes(activeUseCase)) return false;
    return true;
  });

  return (
    <section id="explore" data-testid="explore-stories" className="relative py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-10">
          <h2 className="text-[clamp(2.5rem,5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white/90 mb-6">{t.rich('exploreStories.heading', {
            span: (chunks) => <span className="font-semibold gradient-text">{chunks}</span>,
          })}</h2>
          <p className="text-[18px] text-white/[0.65] leading-[1.75] max-w-2xl">{t('exploreStories.body')}</p>
        </Reveal>

        {/* Filters */}
        <Reveal y={0} delay={0.2} className="flex flex-wrap items-center gap-3 mb-12">
          <span className="inline-flex items-center gap-2 text-[13px] text-white/50 mr-1">
            <ListFilter className="h-4 w-4" aria-hidden="true" />
            {t('exploreStories.filterLabel')}
          </span>

          <div className="relative">
            <button
              onClick={() => { setIndustryOpen(o => !o); setUseCaseOpen(false); }}
              className="flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.06] pl-4 pr-3 py-2.5 text-[14px] font-semibold text-white/80 hover:border-white/20 transition-colors duration-300"
            >
              <span className="text-[12px] font-medium text-white/40 tracking-[0.08em] uppercase">{t('exploreStories.text')}</span>
              <span>{activeIndustry === 'all' ? t('exploreStories.allIndustries') : t(`explore.industries.${activeIndustry}`)}</span>
              <ChevronDown className="h-4 w-4 text-white/40" aria-hidden="true" />
            </button>
            {industryOpen && (
              <div className="absolute z-20 mt-2 min-w-[200px] rounded-xl border border-white/[0.1] bg-[#1e1e1e] py-2 shadow-xl">
                {['all', ...filters.industry].map(f => (
                  <button
                    key={f}
                    onClick={() => { setActiveIndustry(f); setIndustryOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-[14px] transition-colors duration-200 ${activeIndustry === f ? 'text-white bg-white/[0.06]' : 'text-white/60 hover:text-white/90 hover:bg-white/[0.04]'}`}
                  >
                    {f === 'all' ? t('exploreStories.allIndustries') : t(`explore.industries.${f}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => { setUseCaseOpen(o => !o); setIndustryOpen(false); }}
              className="flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.06] pl-4 pr-3 py-2.5 text-[14px] font-semibold text-white/80 hover:border-white/20 transition-colors duration-300"
            >
              <span className="text-[12px] font-medium text-white/40 tracking-[0.08em] uppercase">{t('exploreStories.text2')}</span>
              <span>{activeUseCase === 'all' ? t('exploreStories.allUseCases') : t(`explore.useCases.${activeUseCase}`)}</span>
              <ChevronDown className="h-4 w-4 text-white/40" aria-hidden="true" />
            </button>
            {useCaseOpen && (
              <div className="absolute z-20 mt-2 min-w-[200px] rounded-xl border border-white/[0.1] bg-[#1e1e1e] py-2 shadow-xl">
                {['all', ...filters.useCase].map(f => (
                  <button
                    key={f}
                    onClick={() => { setActiveUseCase(f); setUseCaseOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-[14px] transition-colors duration-200 ${activeUseCase === f ? 'text-white bg-white/[0.06]' : 'text-white/60 hover:text-white/90 hover:bg-white/[0.04]'}`}
                  >
                    {f === 'all' ? t('exploreStories.allUseCases') : t(`explore.useCases.${f}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="ml-auto text-[13px] text-white/40">{t('exploreStories.storiesCount', { count: filtered.length })}</span>
        </Reveal>

        {/* Story grid. 3 columns, real thumbnails with title + summary below */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {filtered.map((s, i) => (
              <Reveal
                y={20}
                duration={0.4}
                delay={i * 0.06}
                key={s.id}
                data-testid={`story-${s.id}`}
                className="group cursor-pointer"
                onClick={() => { router.push(href(`customers/${s.id}`, lang)); window.scrollTo(0, 0); }}
              >
                {/* Card visual area */}
                <div className="relative rounded-2xl border border-white/[0.08] group-hover:border-white/[0.16] transition-all duration-500 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img src={s.bgImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <ArrowRight className="h-4 w-4 text-white/70" />
                  </div>
                </div>
                {/* Title + summary below */}
                <div className="pt-4">
                  <h3 className="text-[24px] font-semibold text-white/90 tracking-[-0.01em] mb-2">{s.company}</h3>
                  <p className="text-[16px] text-white/[0.65] leading-[1.5]">{t(`explore.stories.${s.id}.headline`)}</p>
                </div>
              </Reveal>
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
