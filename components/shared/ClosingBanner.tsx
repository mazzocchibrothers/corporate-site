'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

// `className` overrides the logo height: the wide wordmarks read larger than
// the rest at the shared h-6, so they sit a step smaller.
const logos: { name: string; src: string; className?: string }[] = [
  { name: 'Novacoop', src: '/logos/client-novacoop.svg' },
  { name: 'Douglas', src: '/logos/client-douglas.svg' },
  { name: 'Moncler', src: '/logos/client-moncler.svg' },
  { name: 'Lagardère', src: '/logos/client-lagardere.svg' },
  { name: 'Nespresso', src: '/logos/client-nespresso.svg' },
  { name: 'Tecnomat', src: '/logos/client-tecnomat.svg' },
  { name: 'Avolta', src: '/logos/client-avolta.svg', className: 'h-5' },
  // The file still carries its old name: commit 8228ad4 replaced its artwork with Redion's.
  { name: 'Redion', src: '/logos/client-europ-assistance.svg?v=2', className: 'h-5' },
];

/**
 * The banner a page closes on (homepage, Insights): one centred card — the
 * closing line, a sentence, the demo button — over a single row of client
 * logos. The copy is the page's own, passed in already translated.
 */
export default function ClosingBanner({ heading, body, cta }: {
  heading: React.ReactNode;
  body: string;
  cta: string;
}) {
  const lang = useLocale();

  return (
    <section id="cta" data-testid="cta-section" className="relative py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <Reveal
          y={40}
          duration={0.8}
          data-testid="cta-track-a"
          className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm px-6 py-14 md:px-16 md:py-24 flex flex-col items-center text-center"
        >
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white/90">{heading}</h2>
          <p className="text-[17px] text-white/[0.65] leading-[1.7] mt-4 md:mt-5">{body}</p>
          <Button asChild variant="primary" mode="dark" className="mt-8">
            <a href={href('book-meeting', lang)} data-testid="cta-book-demo">
              <span>{cta}</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </Reveal>

        <Reveal
          y={20}
          duration={0.8}
          delay={0.2}
          data-testid="cta-track-b"
          className="mt-14 md:mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:justify-between lg:gap-x-6"
        >
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center h-8">
              <img loading="lazy" decoding="async"
                src={logo.src}
                alt={logo.name}
                className={`${logo.className ?? 'h-6'} w-auto object-contain opacity-[0.55] hover:opacity-[0.8] transition-opacity duration-500`}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
