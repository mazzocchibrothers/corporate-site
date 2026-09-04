// @ts-nocheck
'use client';

import React from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, BarChart3, Heart, CheckCircle, Wrench } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

function Section({ children, className = '' }) {
  return (
    <Reveal y={25} duration={0.6} className={className}>
      {children}
    </Reveal>
  );
}


// Structure the catalogue cannot hold: ids and the components the page
// renders for each row. The words that went with them are in messages/.
const CHALLENGE_BUSINESS_CHALLENGES = [
  { id: 'groupSExpansion', icon: TrendingUp },
  { id: 'businessNeedsWere', icon: Zap },
  { id: 'chosenToolHad', icon: Layers },
];

const CHALLENGE_HR_CHALLENGES = [
  { id: 'newApproachHiring', icon: Scale },
  { id: 'evaluationModelBuilt', icon: Users },
  { id: 'firstBrandTouchpoint', icon: Shield },
];

const OBJECTIVES_ITEMS = [
  { id: 'item', icon: Zap },
  { id: 'item2', icon: Eye },
  { id: 'item3', icon: Shield },
  { id: 'item4', icon: Layers },
];

const SOLUTION_SKILLS = [
  { id: 'softSkillsCalibrated', icon: CheckCircle },
  { id: 'logicalReasoningStructured', icon: BarChart3 },
  { id: 'knowledgeQuestionsRole', icon: Wrench },
];

const RESULTS_QUALITATIVE = [
  { id: 'visibilityIntoPotential', icon: Eye },
  { id: 'moreEfficientHiring', icon: Target },
  { id: 'assessmentsCustomisedMediaset', icon: Users },
];

export default function Mediaset1StoryPage() {
  const router = useRouter();
  const lang = useLocale();
  const t = useTranslations('customers.mediaset-1');

  return (
    <>
      <>
        <meta name="robots" content="noindex, nofollow" />
      </>
      <Navbar />
      <main>

        {/* ===== HERO ===== */}
        <section className="relative pt-[80px]">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/mediaset-background-explore-stories (2).avif" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <Reveal y={0} delay={0.2} className="mb-10 flex items-center gap-2">
              <Button variant="tertiary" mode="dark" icon={null} onClick={() => { router.push(href('customers', lang)); window.scrollTo(0, 0); }}>{t('breadcrumb')}</Button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Mediaset</span>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-6">
                <Reveal duration={0.7} delay={0.3}>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium tracking-[0.08em] uppercase mb-8 block w-fit text-white/85 border border-white/15" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    {t('badge')}
                  </span>
                  <h1 className="text-[48px] md:text-[44px] font-semibold tracking-[-0.02em] text-white/95 mb-8" style={{ lineHeight: 1.25 }}>
                    {t.rich('headline', {
                      hl: (chunks) => <span style={{ color: '#7b7df9' }}>{chunks}</span>,
                      hl2: (chunks) => <span style={{ color: '#7b7df9' }}>{chunks}</span>,
                      hl3: (chunks) => <span style={{ color: '#7b7df9' }}>{chunks}</span>,
                    })}
                  </h1>
                  <p className="text-[17px] text-white/[0.60] leading-[1.75] mb-10 max-w-2xl">{t('subtitle')}</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" mode="dark" onClick={() => { router.push('/book-meeting'); window.scrollTo(0, 0); }}>
                      {t('ctaPrimary')}
                    </Button>
                    <Button variant="secondary" mode="dark" onClick={() => document.getElementById('context-section')?.scrollIntoView({ behavior: 'smooth' })}>
                      {t('ctaSecondary')}
                    </Button>
                  </div>
                </Reveal>
              </div>

              {/* Client card + quote + video */}
              <Reveal y={0} x={20} duration={0.6} delay={0.5} className="lg:col-span-5 lg:col-start-8 lg:pt-20">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-6">
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/[0.08]">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                      <img loading="lazy" decoding="async" src="/logos/mediaset-logo.avif" alt="Mediaset logo" className="w-full h-full object-contain " />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{t('clientCard.label')}</span>
                      <p className="text-[16px] font-bold text-white/90">Mediaset</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {t.raw('clientCard.facts').map(s => (
                      <div key={s.label}>
                        <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{s.label}</span>
                        <p className="text-[13px] text-white/[0.65] leading-[1.5]">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    className="w-full h-full"
                    src={lang === 'it' ? 'https://www.youtube.com/embed/sE-66pxiEv0?autoplay=1&mute=1' : 'https://www.youtube.com/embed/NA8aLA4BjgI?autoplay=1&mute=1'}
                    title="Mediaset – Skillvue"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            </div>

            {/* Hero metrics — horizontal row */}
            <Reveal y={20} duration={0.6} delay={0.8} className="mt-12">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-5">
                {t.raw('heroMetrics').map(m => (
                  <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3 md:px-6 md:py-5 text-center">
                    <span className="block text-white text-[19px] break-words stat-value md:text-[1.7rem]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                    <span className="text-[13px] text-white/[0.55] mt-2 block leading-[1.4]">{m.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== CONTENT SECTIONS ===== */}
        <section id="context-section" className="section-breathe relative py-16 lg:py-20" style={{ background: '#F7F7F7' }}>
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

            {/* CONTEXT */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{t('context.badge')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-6">{t('context.title')}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.85] mb-8">{t.rich('context.paragraph', {
    b: (chunks) => <strong className="text-[#121212]/80 font-semibold">{chunks}</strong>,
    br: () => <br />,
  })}</p>
            </Section>

            {/* CHALLENGE */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#ea580c' }}>{t('challenge.badge')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{t('challenge.title')}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-14">{t('challenge.intro')}</p>

              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{t('challenge.businessLabel')}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {CHALLENGE_BUSINESS_CHALLENGES.map((ch) => (
                    <div key={t(`challenge.businessChallenges.${ch.id}.title`)} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(234,88,12,0.1)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#ea580c' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{t(`challenge.businessChallenges.${ch.id}.title`)}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{t(`challenge.businessChallenges.${ch.id}.text`)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{t('challenge.hrLabel')}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {CHALLENGE_HR_CHALLENGES.map((ch) => (
                    <div key={t(`challenge.hrChallenges.${ch.id}.title`)} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(234,88,12,0.1)' }}>
                        <ch.icon className="h-5 w-5" style={{ color: '#ea580c' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{t(`challenge.hrChallenges.${ch.id}.title`)}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{t(`challenge.hrChallenges.${ch.id}.text`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* OBJECTIVES */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{t('objectives.badge')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-10">{t('objectives.title')}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {OBJECTIVES_ITEMS.map((o, i) => (
                  <div key={i} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                      <o.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                    </div>
                    <p className="text-[15px] text-[#121212]/70 leading-[1.65]">
                      {typeof t.rich(`objectives.items.${o.id}.text`, {
    b: (chunks) => <strong>{chunks}</strong>,
  }) === 'string' && t.rich(`objectives.items.${o.id}.text`, {
    b: (chunks) => <strong>{chunks}</strong>,
  }).includes(':') ? <><strong className="font-bold text-[#121212]/90">{t.rich(`objectives.items.${o.id}.text`, {
    b: (chunks) => <strong>{chunks}</strong>,
  }).split(':')[0]}</strong>:{t.rich(`objectives.items.${o.id}.text`, {
    b: (chunks) => <strong>{chunks}</strong>,
  }).split(':').slice(1).join(':')}</> : t.rich(`objectives.items.${o.id}.text`, {
    b: (chunks) => <strong>{chunks}</strong>,
  })}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* SOLUTION */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{t('solution.badge')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{t('solution.title')}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{t('solution.intro')}</p>

              <div className="mb-12">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{t('solution.skillsLabel')}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {SOLUTION_SKILLS.map((s) => (
                    <div key={t(`solution.skills.${s.id}.label`)} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <s.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] leading-[1.4]">{t(`solution.skills.${s.id}.label`)}</h4>
                    </div>
                  ))}
                </div>
              </div>

            </Section>

            {/* RESULTS */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#047857' }}>{t('results.badge')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{t('results.title')}</h2>
              {t.has('results.subtitle') && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{t('results.subtitle')}</p>}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {[Users, Heart, TrendingUp].map((Icon, i) => {
                  const m = t.raw('results.metrics')[i];
                  return (
                    <div key={m.label} className="rounded-2xl border p-8" style={{ background: '#b7f5d8', borderColor: '#93e0bb' }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(6,78,59,0.14)' }}>
                        <Icon className="h-[22px] w-[22px]" style={{ color: '#064e3b' }} />
                      </div>
                      <h4 className="text-[32px] stat-value text-[#0b3b28] mb-3 leading-[1.3]">{m.value}</h4>
                      <p className="text-[15px] text-[#0b3b28]/60 leading-[1.55]">{m.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {RESULTS_QUALITATIVE.map((q) => (
                  <div key={t(`results.qualitative.${q.id}.title`)} className="rounded-2xl border border-[#e5e7eb] bg-white p-8">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#e3f9ec' }}>
                      <q.icon className="h-[22px] w-[22px]" style={{ color: '#10b981' }} />
                    </div>
                    <h4 className="text-[19px] font-bold text-[#121212] mb-3 leading-[1.3]">{t(`results.qualitative.${q.id}.title`)}</h4>
                    <p className="text-[15px] text-[#121212]/55 leading-[1.55]">{t(`results.qualitative.${q.id}.text`)}</p>
                  </div>
                ))}
              </div>
            </Section>

          </div>
        </section>

        <div className="fade-into-dark" />

        {/* RELATED STORIES */}
        <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-white/90 leading-[1.4] mb-12">{t('related.title')}</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {t.raw('related.stories').map(s => (
                <button key={s.id} onClick={() => { router.push(`${href('customers', lang)}/${s.id}`); window.scrollTo(0, 0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 transition-all duration-500">
                  <span className="text-[14px] text-white/40 mb-4 block">{s.tag}</span>
                  <h4 className="text-[24px] font-semibold text-white/90 mb-4">{s.company}</h4>
                  <p className="text-[16px] text-white/[0.65] leading-[1.7] mb-8">{s.headline}</p>
                  <span className="inline-flex items-center gap-2 text-[15px] text-white/50 group-hover:text-white/80 font-semibold transition-colors duration-300">
                    {t('related.cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <SolutionFinalCTA headline={t('finalCta.headline')} accentWord={t('finalCta.accent')} />
        <Footer />
      </main>
    </>
  );
}
