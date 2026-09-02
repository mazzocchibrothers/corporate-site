// @ts-nocheck
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
    <section id="methodology" data-testid="methodology" className="relative py-16 md:py-20 lg:py-28">
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

        {/* Title */}
        <Reveal duration={0.7} className="mb-8 md:mb-16">
          <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white/90 mb-4 md:mb-6">{t.rich('methodologyLifecycle.heading', {
            span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
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
                className={`w-full flex items-center gap-3 py-3.5 border-b transition-all duration-300 ${i === active ? 'border-[#9B9DFB]/30 bg-white/[0.03]' : 'border-white/[0.04]'}`}
              >
                <span className={`text-[11px] font-bold w-6 ${i === active ? 'text-[#4B4DF7]' : 'text-white/40'}`}>{s.num}</span>
                <span className={`text-[14px] flex-1 text-left ${i === active ? 'font-semibold text-white' : 'font-normal text-white/55'}`}>{t(`methodologyLifecycle.steps.${s.id}.title`)}</span>
                <span className={`text-[14px] transition-transform duration-300 ${i === active ? 'text-[#4B4DF7] rotate-90' : 'text-white/30'}`}>›</span>
              </button>
              {i === active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden bg-white/[0.03]"
                >
                  <p className="text-[13px] text-white/[0.55] leading-[1.65] py-3 pl-9 pr-4">{t(`methodologyLifecycle.steps.${s.id}.desc`)}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: sidebar + card */}
        <div className="hidden md:grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 mb-20">
          <div className="flex flex-col space-y-1">
            {steps.map((s, i) => (
              <button key={s.num} onClick={() => setActive(i)} data-testid={`lifecycle-desktop-${s.num}`} className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-400 flex items-center gap-4 ${i === active ? 'bg-white/[0.06] border border-white/[0.1]' : 'hover:bg-white/[0.03] border border-transparent'}`}>
                <span className={`text-[12px] font-bold ${i === active ? 'text-[#4B4DF7]' : 'text-[#4B4DF7]/30'}`}>{s.num}</span>
                <span className={`text-[15px] font-medium ${i === active ? 'text-white/90' : 'text-white/40'}`}>{t(`methodologyLifecycle.steps.${s.id}.title`)}</span>
              </button>
            ))}
          </div>

          <Reveal y={10} duration={0.35} key={active} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-10">
            <span className="text-[11px] font-bold text-[#9B9DFB] tracking-[0.1em] uppercase mb-4 block">{t('methodologyLifecycle.text')} {steps[active].num}</span>
            <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-white/90 mb-5">{t(`methodologyLifecycle.steps.${steps[active].id}.title`)}</h3>
            <p className="text-[16px] text-white/[0.55] leading-[1.75]">{t(`methodologyLifecycle.steps.${steps[active].id}.desc`)}</p>
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
                className="rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5 transition-all duration-300"
              >
                <IconTile icon={Icon} mode="dark" className="mb-3" />
                <h3 className="text-[16px] font-semibold text-white/90 mb-2">{t(`methodologyLifecycle.principles.${p.id}.title`)}</h3>
                <p className="text-[14px] text-white/[0.6] leading-[1.65]">{t(`methodologyLifecycle.principles.${p.id}.desc`)}</p>
              </Reveal>
            );
          })()}
          <div className="flex items-center justify-between mt-4">
            <span className="text-[11px] text-white/25 font-medium">{activePrinciple + 1} / {principles.length}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePrinciple((p) => (p - 1 + principles.length) % principles.length)}
                aria-label={ta('a11y.previous')}
                className="flex items-center justify-center h-8 w-8 rounded-full border border-white/10 text-white/40 active:text-white/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActivePrinciple((p) => (p + 1) % principles.length)}
                aria-label={ta('a11y.next')}
                className="flex items-center justify-center h-8 w-8 rounded-full border border-white/15 text-white/60 active:text-white/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
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
              <Reveal y={20} delay={0.15 + i * 0.1} key={p.id} className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 transition-all duration-500">
                <IconTile icon={Icon} mode="dark" className="mb-5" />
                <h3 className="text-[20px] font-semibold text-white/90 mb-4">{t(`methodologyLifecycle.principles.${p.id}.title`)}</h3>
                <p className="text-[15px] text-white/[0.65] leading-[1.75]">{t(`methodologyLifecycle.principles.${p.id}.desc`)}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
