'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, ArrowUpRight, ChevronDown, ListFilter } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';
import { partners } from '@/data/partners';

const FILTERS = ['all', 'commercial', 'integration'] as const;
type Filter = (typeof FILTERS)[number];

const container = 'max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12';

// The line break is desktop-only, so it carries the space the message does
// not: without it a phone reads the two sentences run together.
const br = () => <>{' '}<br className="hidden md:inline" /></>;

export default function PartnersPage() {
  const t = useTranslations('customers.partners');
  const lang = useLocale();
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = activeFilter === 'all' ? partners : partners.filter((p) => p.category === activeFilter);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-[80px]">
          <div className="absolute inset-0" aria-hidden="true">
            {/* Same dimming as the customer-story hero photos: blur(8px) is
                what actually darkens it — brightness alone still shows
                bright highlights clearly. scale(1.1) hides the blurred edge. */}
            <img
              src="/logos/partners-hero.avif"
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 size-full object-cover"
              style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }}
            />
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/logos/partners-hero-secondary.avif"
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute -left-1/2 -top-[93%] h-[214%] w-[150%] max-w-none object-cover"
                style={{ filter: 'blur(8px) brightness(0.25)' }}
              />
            </div>
          </div>

          <div className={`${container} relative z-10 w-full`}>
            <Reveal duration={0.7} className="flex flex-col items-start gap-6 max-w-[640px]">
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase">
                {t('hero.eyebrow')}
              </span>
              <h1
                className="font-semibold text-white/95 text-[48px] md:text-[64px]"
                style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                {t('hero.heading')}
              </h1>
              <p className="text-[18px] leading-[1.4] text-white/70">
                {t.rich('hero.body', { br })}
              </p>
              <Button asChild variant="primary" mode="dark">
                <a href={href('become-a-partner', lang)}>
                  {t('hero.cta')}
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* Our partner network */}
        <section className="section-breathe py-16 lg:py-24">
          <div className={container}>
            <Reveal duration={0.7} className="flex flex-col gap-6 mb-10">
              <h2 className="font-semibold leading-[1.1] tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] text-[#1E1E1E]">
                {t('network.heading')}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 text-[13px] text-[#4B4B4B]">
                  <ListFilter className="h-4 w-4" aria-hidden="true" />
                  {t('network.filterLabel')}
                </span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setFilterOpen((o) => !o)}
                    className="flex items-center gap-2.5 rounded-full border border-[#EBEBEB] bg-white pl-4 pr-3 py-2.5 text-[14px] font-semibold text-[#1E1E1E] hover:border-[#1E1E1E]/20 transition-colors duration-300"
                  >
                    <span className="text-[12px] font-medium text-[#4B4B4B] tracking-[0.08em] uppercase">{t('network.categoryLabel')}</span>
                    <span>{t(`network.filters.${activeFilter}`)}</span>
                    <ChevronDown className="h-4 w-4 text-[#4B4B4B]" aria-hidden="true" />
                  </button>
                  {filterOpen && (
                    <div className="absolute z-20 mt-2 min-w-[200px] rounded-xl border border-[#EBEBEB] bg-white py-2 shadow-xl">
                      {FILTERS.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => { setActiveFilter(f); setFilterOpen(false); }}
                          className={`block w-full text-left px-4 py-2 text-[14px] transition-colors duration-200 ${activeFilter === f ? 'text-[#1E1E1E] bg-[#F7F7F7]' : 'text-[#4B4B4B] hover:text-[#1E1E1E] hover:bg-[#F7F7F7]'}`}
                        >
                          {t(`network.filters.${f}`)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {filtered.map((p) => (
                <Reveal
                  key={p.slug}
                  y={20}
                  className="rounded-[20px] border border-[#EBEBEB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col"
                >
                  <div className="h-[220px] flex items-center justify-center border-b border-[#EBEBEB] px-8">
                    <img
                      src={p.logo}
                      alt={t(`network.items.${p.slug}.name`)}
                      width={p.logoWidth}
                      height={p.logoHeight}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[64px] w-auto max-w-full object-contain"
                    />
                  </div>
                  <div className="p-7 flex flex-col gap-4 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[22px] font-semibold tracking-[-0.02em] text-[#1E1E1E]">
                        {t(`network.items.${p.slug}.name`)}
                      </p>
                      <span className="rounded-full bg-[#F3F4F5] px-2.5 py-1 text-[12px] text-[#4B4B4B] whitespace-nowrap">
                        {t(`network.filters.${p.category}`)}
                      </span>
                    </div>
                    <p className="text-[16px] leading-[1.25] text-[#4B4B4B]">
                      {t(`network.items.${p.slug}.description`)}
                    </p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-[16px] font-medium text-[#4B4DF7] hover:text-[#3133E7] transition-colors"
                    >
                      {t(`network.items.${p.slug}.cta`)}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black py-20 lg:py-28">
          <div className={container}>
            <Reveal
              duration={0.7}
              className="rounded-[24px] border border-white/[0.1] px-6 py-16 md:px-20 md:py-20 flex flex-col items-center text-center gap-6"
              style={{
                backgroundImage:
                  'linear-gradient(255deg, rgba(255,115,63,0.11) 1%, rgba(0,0,0,0.08) 21%, rgba(0,0,0,0.08) 78%, rgba(73,79,255,0.13) 99%), linear-gradient(90deg, #161616 0%, #161616 100%)',
              }}
            >
              <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase">
                {t('cta.eyebrow')}
              </span>
              <h2 className="font-semibold leading-[1.1] text-white/95 text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.02em] max-w-4xl text-balance">
                {t('cta.heading')}
              </h2>
              <p className="text-[16px] text-white/65 max-w-xl">{t('cta.body')}</p>
              <Button asChild variant="primary" mode="dark">
                <a href={href('become-a-partner', lang)}>
                  {t('cta.cta')}
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
