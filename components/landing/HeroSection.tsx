'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button, SECONDARY_ON_LIGHT } from '@/components/ui/button';
import LiteYouTubeEmbed from '@/components/landing/LiteYouTubeEmbed';
import { href } from '@/i18n/routes';
import { HeroCopy } from '@/components/ui/hero-copy';

const clientLogos = [
  { name: 'Unicredit', src: '/logos/client-unicredit.svg', width: 221 },
  { name: 'Carrefour', src: '/logos/client-carrefour.svg', width: 157 },
  { name: 'Fidia', src: '/logos/client-fidia.svg', width: 98 },
  { name: 'Generali', src: '/logos/client-generali.svg', width: 178 },
  { name: 'Novacoop', src: '/logos/client-novacoop.svg', width: 86 },
  { name: 'Douglas', src: '/logos/client-douglas.svg', width: 126 },
  { name: 'Moncler', src: '/logos/client-moncler.svg', width: 150 },
  { name: 'Lagardère', src: '/logos/client-lagardere.svg', width: 115 },
  { name: 'Nespresso', src: '/logos/client-nespresso.svg', width: 151 },
  { name: 'Tecnomat', src: '/logos/client-tecnomat.svg', width: 150 },
  // The wide wordmarks sit a step smaller (h-5, 20px) than the rest.
  { name: 'Avolta', src: '/logos/client-avolta.svg', width: 97, height: 20, className: 'h-5' },
  // Redion: the file keeps its old name, commit 8228ad4 replaced its artwork.
  { name: 'Redion', src: '/logos/client-europ-assistance.svg?v=2', width: 116, height: 20, className: 'h-5' },
];


export default function HeroSection() {
  const lang = useLocale();
  const t = useTranslations('home');
  // Repeat the set so the marquee track is always wider than any viewport,
  // eliminating any visible gap before the duplicate kicks in. The two locales
  // used to pick from `trustLogosEn` / `trustLogosIt`; both were assigned the
  // same array, so the branch chose between a value and itself.
  const trustLogos = [...clientLogos, ...clientLogos];

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="section-light relative overflow-hidden flex flex-col justify-between pt-[80px]"
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {/* Hero content. layered above */}
      <div className="relative z-10 flex-1 flex items-start md:items-center pt-6 md:pt-0">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full py-10 md:py-16 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-10 items-center">
            {/* LEFT. Big headline */}
            <div className="lg:col-span-6 relative">
              {/* Soft gradient glow behind headline */}
              <div
                aria-hidden="true"
                className="absolute -top-10 -left-10 w-[320px] h-[320px] pointer-events-none opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(255,155,70,0.14) 0%, rgba(75,77,247,0.05) 50%, transparent 75%)',
                  filter: 'blur(40px)',
                }}
              />

              <HeroCopy>
                <h1
                  className="hero-fade-up relative text-[48px] md:text-[58px] font-semibold tracking-[-0.02em] text-[#121212]"
                  style={{ lineHeight: 1.1 }}
                >
                  {/* Two accent tags, not one: the English headline sets its
                      span to md:whitespace-nowrap and the Italian one does not,
                      and a single handler quietly gave the class to both. On the
                      light hero the accent has no gradient and no italic: the
                      phrase is #121212 like the rest. */}
                  {t.rich('hero.heading', {
                    l: (chunks) => <span className="md:whitespace-nowrap">{chunks}</span>,
                    g: (chunks) => (
                      <span className="font-semibold md:whitespace-nowrap">{chunks}</span>
                    ),
                    gw: (chunks) => <span className="font-semibold">{chunks}</span>,
                    // The Italian "Il" sits inside the accent span; it used to be painted
                    // white out of the gradient and now simply matches the heading.
                    // `m` keeps "Il Sistema Operativo" on one line on desktop.
                    w: (chunks) => <span className="[-webkit-text-fill-color:#121212]">{chunks}</span>,
                    m: (chunks) => <span className="md:whitespace-nowrap">{chunks}</span>,
                    br: () => <br />,
                  })}
                </h1>
                <p
                  className="type-body hero-subtitle hero-fade-up hero-delay-1 relative text-[#4B4B4B] mt-6 md:mt-8"
                >
                  {t('hero.body')}
                </p>
              </HeroCopy>

              <div className="hero-fade-up hero-delay-1 relative flex flex-wrap items-center gap-4 mt-8 md:mt-10">
                <Button asChild variant="primary" mode="light">
                  <a href={href('book-meeting', lang)} data-testid="hero-book-demo">
                    {t('hero.cta2')}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="secondary" mode="light" className={SECONDARY_ON_LIGHT}>
                  <a href={href('science', lang)} data-testid="hero-our-science">{t('hero.cta')}</a>
                </Button>
              </div>

              {/* A text link, not a third button: the lightweight secondary action. */}
              <div className="hero-fade-up hero-delay-1 relative mt-8">
                <Button asChild variant="tertiary" mode="light">
                  <a href={href('roi-calculator', lang)} data-testid="hero-roi-calculator">
                    {t('hero.roiLink')}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>

            {/* RIGHT. Product video — slightly larger */}
            <div className="hero-video-in hero-delay-2 lg:col-span-6 lg:-mr-8">
              <div
                className="relative rounded-2xl overflow-hidden border border-[#e5e7eb] aspect-video bg-[#0d0d1f]"
                style={{ boxShadow: '0 24px 48px -24px rgba(18,18,18,0.18)' }}
              >
                <LiteYouTubeEmbed
                  videoId="g2Ju7COKZrM"
                  title={t('hero.videoTitle')}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated scroll-down arrows — mobile only */}
      <div className="hero-fade-in hero-delay-3 relative z-10 flex md:hidden justify-center pb-4">
        <div className="scroll-arrows" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>

      {/* Trust bar. infinite marquee; logos drawn black at reduced opacity */}
      <div className="hero-fade-in hero-delay-3 relative z-10 overflow-hidden">
        <div
          className="flex items-center h-[60px] md:h-[80px]"
          style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          {/* Fixed label. hidden on mobile, visible from md up */}
          <div className="hidden md:flex shrink-0 pl-8 lg:pl-12 pr-12 z-10 relative items-center h-full">
            <span
              className="type-body inline-flex items-center px-6 py-2.5 text-[#4B4B4B] whitespace-nowrap"
            >{t('hero.text')}</span>
          </div>

          {/* Scrolling marquee with mask fade on both edges */}
          <div
            className="flex-1 overflow-hidden relative"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <div className="marquee-track flex items-center">
              {/* First set */}
              <div className="marquee-content flex items-center gap-8 md:gap-16 shrink-0 pr-8 md:pr-16">
                {trustLogos.map((logo, i) => (
                  <div
                    key={`a-${i}-${logo.name}`}
                    data-testid={`trust-logo-${logo.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="shrink-0 opacity-[0.55]"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={logo.height ?? 24}
                      className={`${logo.className ?? 'h-6'} w-auto object-contain`}
                      style={{ filter: 'brightness(0)' }}
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="marquee-content flex items-center gap-8 md:gap-16 shrink-0 pr-8 md:pr-16" aria-hidden="true">
                {trustLogos.map((logo, i) => (
                  <div key={`b-${i}-${logo.name}`} className="shrink-0 opacity-[0.45]">
                    <img
                      src={logo.src}
                      alt=""
                      width={logo.width}
                      height={logo.height ?? 24}
                      className={`${logo.className ?? 'h-6'} w-auto object-contain`}
                      style={{ filter: 'brightness(0)' }}
                    />
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
