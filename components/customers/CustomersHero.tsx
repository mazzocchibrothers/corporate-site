'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const metrics = [
  {
    id: 'europeanEnterprises',
    value: '100+',
  },
  {
    id: 'roiWithin18',
    value: '10-30x',
  },
  {
    id: 'savedYearly',
    value: '€4.5M',
  },
  {
    id: 'fasterTimeToHire',
    value: '40%',
  },
];

const clientLogos = [
  { name: 'Unicredit', src: '/logos/client-unicredit.svg' },
  { name: 'Carrefour', src: '/logos/client-carrefour.svg' },
  { name: 'Fidia', src: '/logos/client-fidia.svg' },
  { name: 'Generali', src: '/logos/client-generali.svg' },
  { name: 'Novacoop', src: '/logos/client-novacoop.svg' },
  { name: 'Douglas', src: '/logos/client-douglas.svg' },
  { name: 'Moncler', src: '/logos/client-moncler.svg' },
  { name: 'Lagardère', src: '/logos/client-lagardere.svg' },
  { name: 'Nespresso', src: '/logos/client-nespresso.svg' },
  { name: 'Tecnomat', src: '/logos/client-tecnomat.svg' },
  // The wide wordmarks sit a step smaller (h-5) than the rest.
  { name: 'Avolta', src: '/logos/client-avolta.svg', className: 'h-5' },
  // Redion: the file keeps its old name, commit 8228ad4 replaced its artwork.
  { name: 'Redion', src: '/logos/client-europ-assistance.svg?v=2', className: 'h-5' },
];


export default function CustomersHero() {
  const lang = useLocale();
  const t = useTranslations('customers');
  // Repeat to keep the track wider than any viewport (no visible gap on wide screens)
  const logoFiles = [...clientLogos, ...clientLogos];
  return (
    <section id="customers-hero" data-testid="customers-hero" className="relative pt-[80px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal
              y={20}
              duration={0.6}
              delay={0.15}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="text-[12px] font-medium text-[#6B7DFF] tracking-[0.1em] uppercase">{t('hero.eyebrow')}</span>
            </Reveal>
            <Reveal
              as="h1"
              y={40}
              duration={0.8}
              delay={0.3}
              className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95 mb-8"
              style={{ lineHeight: 1.15 }}
            >{t.rich('hero.heading', {
              span: (chunks) => <span className="font-semibold gradient-text">{chunks}</span>,
            })}</Reveal>
            <Reveal
              as="p"
              y={20}
              duration={0.8}
              delay={0.5}
              className="text-[18px] text-white/[0.65] leading-[1.75] mb-10"
              style={{ fontWeight: 300 }}
            >{t('hero.body')}</Reveal>

            {/* CTA - Read the stories */}
            <Reveal y={20} duration={0.8} delay={0.55}>
              <Button asChild variant="secondary" mode="dark" className="group">
                <a href="#explore">
                  <span>{t('hero.cta')}</span>
                  <ArrowDown aria-hidden="true" className="transition-transform duration-500 group-hover:translate-y-0.5" />
                </a>
              </Button>
            </Reveal>
          </div>

          {/* Metrics grid */}
          <Reveal
            y={20}
            duration={0.8}
            delay={0.6}
            className="grid grid-cols-2 gap-4"
          >
            {metrics.map((m) => (
              <div key={m.value} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <span className="block text-[#6B7DFF] mb-8 stat-value text-[32px] md:text-[64px]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                <span className="text-[13px] text-white/[0.65]">{t(`hero.metrics.${m.id}.label`)}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Logo marquee. identical to homepage trust bar */}
      <div className="relative overflow-hidden mt-16">
        <div className="flex items-center h-[80px]">
          <div
            className="flex-1 overflow-hidden relative"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <div className="marquee-track flex items-center">
              <div className="marquee-content flex items-center gap-16 shrink-0 pr-16">
                {logoFiles.map((l, i) => (
                  <div key={`a-${i}-${l.name}`} className="shrink-0 opacity-[0.55]">
                    <img src={l.src} alt={l.name} className={`${l.className ?? 'h-6'} w-auto object-contain`} style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                ))}
              </div>
              <div className="marquee-content flex items-center gap-16 shrink-0 pr-16" aria-hidden="true">
                {logoFiles.map((l, i) => (
                  <div key={`b-${i}-${l.name}`} className="shrink-0 opacity-[0.55]">
                    <img src={l.src} alt="" className={`${l.className ?? 'h-6'} w-auto object-contain`} style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
