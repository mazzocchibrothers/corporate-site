'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

const testimonials = [
  { id: 'unicomm', name: 'Unicomm', routeId: 'customers/unicomm', bgImage: '/logos/unicomm-background-explore-stories.avif' },
  { id: 'mediaset', name: 'Mediaset', routeId: 'customers/mediaset', bgImage: '/logos/mediaset-background-explore-stories (2).avif' },
  { id: 'europAssistance', name: 'Europ Assistance', routeId: 'customers/europ-assistance', bgImage: '/logos/europ-assistance-background-explore-stories.avif' },
];

export default function CustomerTestimonials() {
  const lang = useLocale();
  const t = useTranslations('customers');

  return (
    <section id="customers-testimonials" data-testid="customers-testimonials" className="section-breathe relative py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal duration={0.7} className="mb-14">
          <span className="block text-[12px] font-medium text-[#4B4DF7] tracking-[0.1em] uppercase mb-4">{t('testimonials.eyebrow')}</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1E1E1E] mb-4">{t.rich('testimonials.heading', {
            span: (chunks) => <span className="font-semibold gradient-text-warm-on-light">{chunks}</span>,
          })}</h2>
          <p className="text-[18px] text-[#4B4B4B]">{t('testimonials.body')}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-14">
          {testimonials.map((c, i) => (
            <Reveal
              y={20}
              duration={0.5}
              delay={i * 0.1}
              key={c.id}
              className="group"
            >
              <a href={href(c.routeId, lang)} className="block">
                <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '416/233' }}>
                  <img src={c.bgImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full border border-white/25 bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors duration-300">
                      <Play className="h-6 w-6 text-white translate-x-0.5" fill="currentColor" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between">
                    <p className="text-[24px] font-bold text-white tracking-[-0.01em]">{c.name}</p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5656]" />
                      {t('testimonials.interview')}
                    </span>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="text-[24px] font-semibold leading-[1.4] text-[#1E1E1E] tracking-[-0.01em] mb-4">{t(`testimonials.cards.${c.id}.title`)}</h3>
                  <span className="inline-flex rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-1 text-[12px] text-[#4B4B4B] mb-4">{t(`testimonials.cards.${c.id}.tags`)}</span>
                  <div className="flex items-center gap-2 text-[14px] font-semibold text-[#4B4DF7]">
                    {t('testimonials.watchVideo')}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal y={0} delay={0.3} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <p className="text-[15px] text-[#4B4B4B]">{t('testimonials.footerText')}</p>
          <Button asChild variant="primary" mode="light">
            <a href={href('book-meeting', lang)}>
              {t('testimonials.cta')}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
