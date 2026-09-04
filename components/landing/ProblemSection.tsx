'use client';

import React, { useRef } from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';

const painCards = [
  {
    id: 'hiresFailWithin',
    stat: '35%',
  },
  {
    id: 'transformationsStall',
    stat: '65%',
  },
  {
    id: 'criticalRolesHave',
    stat: '60%',
  },
];

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  return (
    <Reveal
      y={50}
      duration={0.8}
      className={className}
    >
      {children}
    </Reveal>
  );
}

export default function ProblemSection() {
  const t = useTranslations('home');
  const ref = useRef(null);
  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="section-breathe relative py-16 md:py-20 lg:py-24"
    >
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <AnimatedSection className="mb-4 md:mb-6">
          <h2 className="text-[clamp(1.6rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1A1A2E]">{t.rich('problem.heading', {
            span: (chunks) => <span className="italic font-bold gradient-text-on-light">{chunks}</span>,
          })}</h2>
        </AnimatedSection>

        <AnimatedSection className="max-w-[900px] mb-10 md:mb-24">
          <p className="text-[15px] md:text-[clamp(1.1rem,2vw,1.5rem)] font-normal leading-[1.55] text-[#1A1A2E]">{t.rich('problem.body', {
            span: (chunks) => <span className="text-[#7A7A7A]">{chunks}</span>,
          })}</p>
          <p className="text-[15px] md:text-[clamp(1.1rem,2vw,1.5rem)] font-normal leading-[1.55] text-[#7A7A7A] mt-4 md:mt-6">{t.rich('problem.body2', {
            span: (chunks) => <span className="font-semibold gradient-text-on-light">{chunks}</span>,
          })}</p>
        </AnimatedSection>

        {/* Pain cards — horizontal scroll on mobile, 3-col grid on desktop */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
          {painCards.map((card, i) => (
            <Reveal
              delay={i * 0.12}
              key={card.stat + i}
              data-testid={`pain-card-${card.stat.replace('%', '')}`}
              className="group bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-6 lg:p-10 flex flex-col"
            >
              {/* Stat number */}
              <span
                className="block text-[#1A1A2E] text-[32px] md:text-[64px] font-semibold mb-6 md:mb-10"
                style={{
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {card.stat}
              </span>

              {/* Title + Description */}
              <div>
                <h3 className="text-[15px] md:text-[15px] lg:text-[18px] font-semibold text-[#1A1A2E]/80 leading-snug mb-2 md:mb-3 lg:mb-4">
                  {t(`problem.painCards.${card.id}.title`)}
                </h3>
                <p className="text-[13px] md:text-[13px] lg:text-[15px] text-[#7A7A7A] leading-[1.6] md:leading-[1.7] lg:leading-[1.75]">
                  {t(`problem.painCards.${card.id}.desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
