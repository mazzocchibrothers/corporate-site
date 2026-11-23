'use client';

import React, { useState } from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Sparkles, Shield, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { IconTile } from '@/components/ui/icon-tile';

const steps = [
  {
    id: 'defineConstructs',
    num: '01',
  },
  {
    id: 'designVerificationItems',
    num: '02',
  },
  {
    id: 'expertValidation',
    num: '03',
  },
  {
    id: 'pilotRefine',
    num: '04',
  },
  {
    id: 'deployScale',
    num: '05',
  },
  {
    id: 'scoreExplainability',
    num: '06',
  },
  {
    id: 'monitorEvolve',
    num: '07',
  },
];

const principles = [
  {
    id: 'betterEvidence',
    icon: Sparkles,
  },
  {
    id: 'rigorScale',
    icon: Shield,
  },
  {
    id: 'continuousEvolution',
    icon: RefreshCw,
  },
];

export default function MethodologyLifecycle() {
  const t = useTranslations('science');
  // The carousel's arrow labels are read aloud, not shown, and they are the same
  // two words on every carousel — so they live in `shared`, not in this page's
  // namespace.
  const ta = useTranslations('shared');
  const [active, setActive] = useState(0);
  const [activePrinciple, setActivePrinciple] = useState(0);

  return (
    <section id="methodology" data-testid="methodology" className="section-light border-t border-[#e5e7eb] relative py-16 md:py-20 lg:py-28">
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

        {/* Title */}
        <Reveal duration={0.7} className="mb-8 md:mb-16">
          <h2 className="max-w-[880px] text-[clamp(1.5rem,3.5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#121212] mb-4 md:mb-6">{t.rich('methodologyLifecycle.heading', {
            span: (chunks) => <span className="font-semibold">{chunks}</span>,
          })}</h2>
        </Reveal>

        {/* Steps — accordion on mobile, sidebar + card on desktop */}

        {/* Mobile: accordion */}
        <div className="md:hidden space-y-0 mb-10">
          {steps.map((s, i) => (
            <div key={s.num}>
              <button
                onClick={() => setActive(i)}
                data-testid={`lifecycle-${s.num}`}
                className={`w-full flex items-center gap-3 py-3.5 border-b transition-all duration-300 ${i === active ? 'border-[#4B4DF7]/30 bg-[#f7f7f7]' : 'border-[#e5e7eb]'}`}
              >
                <span className={`type-caption font-bold w-6 ${i === active ? 'text-[#4B4DF7]' : 'text-[#707070]'}`}>{s.num}</span>
                <span className={`type-body-sm flex-1 text-left ${i === active ? 'font-semibold text-[#121212]' : ' text-[#4B4B4B]'}`}>{t(`methodologyLifecycle.steps.${s.id}.title`)}</span>
                <span className={`type-body-sm transition-transform duration-300 ${i === active ? 'text-[#4B4DF7] rotate-90' : 'text-[#707070]'}`}>›</span>
              </button>
              {i === active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden bg-[#f7f7f7]"
                >
                  <p className="type-body-sm text-[#4B4B4B] py-3 pl-9 pr-4">{t(`methodologyLifecycle.steps.${s.id}.desc`)}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: sidebar + card */}
        <div className="hidden md:grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 mb-20">
          <div className="flex flex-col space-y-1">
            {steps.map((s, i) => (
              <button key={s.num} onClick={() => setActive(i)} data-testid={`lifecycle-desktop-${s.num}`} className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-400 flex items-center gap-4 ${i === active ? 'bg-[#f7f7f7] border border-[#e5e7eb]' : 'hover:bg-[#f7f7f7] border border-transparent'}`}>
                <span className={`type-caption font-bold ${i === active ? 'text-[#4B4DF7]' : 'text-[#707070]'}`}>{s.num}</span>
                <span className={`type-body font-medium ${i === active ? 'text-[#121212]' : 'text-[#4B4B4B]'}`}>{t(`methodologyLifecycle.steps.${s.id}.title`)}</span>
              </button>
            ))}
          </div>

          <Reveal y={10} duration={0.35} key={active} className="rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] p-10">
            <span className="type-eyebrow text-[#4B4DF7] mb-4 block">{t('methodologyLifecycle.text')} {steps[active].num}</span>
            <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-[#121212] mb-5">{t(`methodologyLifecycle.steps.${steps[active].id}.title`)}</h3>
            <p className="type-body text-[#4B4B4B]">{t(`methodologyLifecycle.steps.${steps[active].id}.desc`)}</p>
          </Reveal>
        </div>

        {/* 3 principle cards — single swipeable card on mobile, 3-col on desktop */}

        {/* Mobile: single card with arrows */}
        <div className="md:hidden">
          {(() => {
            const p = principles[activePrinciple];
            const Icon = p.icon;
            return (
              <Reveal
                y={0}
                x={10}
                duration={0.25}
                key={activePrinciple}
                className="rounded-xl border border-[#e5e7eb] bg-[#f7f7f7] p-5 transition-all duration-300"
              >
                <IconTile icon={Icon} mode="light" className="mb-3" />
                <h3 className="text-[16px] font-semibold text-[#121212] mb-2">{t(`methodologyLifecycle.principles.${p.id}.title`)}</h3>
                <p className="type-body-sm text-[#4B4B4B]">{t(`methodologyLifecycle.principles.${p.id}.desc`)}</p>
              </Reveal>
            );
          })()}
          <div className="flex items-center justify-between mt-4">
            <span className="type-caption text-[#707070] font-medium">{activePrinciple + 1} / {principles.length}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePrinciple((p) => (p - 1 + principles.length) % principles.length)}
                aria-label={ta('a11y.previous')}
                className="flex items-center justify-center h-8 w-8 rounded-full border border-[#e5e7eb] text-[#4B4B4B] active:text-[#121212] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DF7]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActivePrinciple((p) => (p + 1) % principles.length)}
                aria-label={ta('a11y.next')}
                className="flex items-center justify-center h-8 w-8 rounded-full border border-[#e5e7eb] text-[#4B4B4B] active:text-[#121212] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B4DF7]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal y={20} delay={0.15 + i * 0.1} key={p.id} className="rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] p-10">
                <IconTile icon={Icon} mode="light" className="mb-5" />
                <h3 className="text-[20px] font-semibold text-[#121212] mb-4">{t(`methodologyLifecycle.principles.${p.id}.title`)}</h3>
                <p className="type-body text-[#4B4B4B]">{t(`methodologyLifecycle.principles.${p.id}.desc`)}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
