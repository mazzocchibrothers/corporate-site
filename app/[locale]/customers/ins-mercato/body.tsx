// @ts-nocheck
'use client';

import React, { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Target, TrendingUp, Layers, Eye, Scale, Zap, Heart, Users, Shield, CheckCircle } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';









// Structure the catalogue cannot hold: the icon each row renders and the order
// they render in. The words are in messages/, keyed on these ids. `group` names
// the catalogue block, because the two pain grids share one card body.
const SKILLS = [
  { id: 'customerOrientation', icon: Heart },
  { id: 'leadership', icon: Users },
  { id: 'resilience', icon: Shield },
  { id: 'organizationPlanning', icon: Layers },
  { id: 'cognitiveFlexibility', icon: Zap },
  { id: 'goalOrientation', icon: Target },
];

const BUSINESS_PAINS = [
  { group: 'businessPains', id: 'expansionHeldBack', icon: Target },
  { group: 'businessPains', id: 'storePerformance', icon: TrendingUp },
  { group: 'businessPains', id: 'externalHiring', icon: Layers },
];

const HR_PAINS = [
  { group: 'hrPains', id: 'invisibleTalent', icon: Eye },
  { group: 'hrPains', id: 'fragmentedEvaluations', icon: Scale },
  { group: 'hrPains', id: 'reactiveManagement', icon: Zap },
];

const OBJECTIVES = [
  { id: 'sharedReading', icon: Eye },
  { id: 'internalPipeline', icon: Users },
  { id: 'storeRoi', icon: TrendingUp },
  { id: 'anticipateNeeds', icon: Target },
];

const METHODOLOGY = ['mobileFirst', 'neutralBaseline', 'communicationLever'];

const IMPACT = [
  { id: 'internalPipeline', icon: Users },
  { id: 'reactiveToPredictive', icon: TrendingUp },
  { id: 'culturalImpact', icon: Heart },
  { id: 'internalMobility', icon: Layers },
];

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}



// Structure the catalogue cannot hold: which facts the client card shows and in
// what order, and each funnel row's width and colour. The words are in
// messages/, keyed on these ids.
const CARD_FACTS = ['industry', 'revenue', 'employees', 'stores', 'useCase'];

const FUNNEL = [
  { id: 'involved', value: '~1000', pct: '100%', color: 'rgba(75,77,247,0.18)' },
  { id: 'completed', value: '~900', pct: '90%', color: 'rgba(75,77,247,0.3)' },
  { id: 'topTalent', value: '~90', pct: '60%', color: 'rgba(75,77,247,0.55)' },
  { id: 'roleReady', value: '~42', pct: '30%', color: '#4b4df7' },
  { id: 'inDevelopment', value: '~48', pct: '34%', color: '#4b4df7' },
];

export default function InsMercatoStoryPage() {
  const t = useTranslations('customers.ins-mercato');
  const router = useRouter();
  const lang = useLocale();
  // The Open Graph pair is the page's own title and description — the same two
  // strings generateMetadata emits, not a second copy of them.
  const metaTitle = t('meta.title');
  const metaDesc = t('meta.description');

  return (
    <>
      <>
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
      </>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-[80px] min-h-screen flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/insmercato-bg.avif" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-10">
            <motion.div className="mb-5 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Button variant="tertiary" mode="dark" icon={null} onClick={() => { router.push(href('customers', lang)); window.scrollTo(0, 0); }}>
                {t('cta3')}
              </Button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">In's Mercato</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main content */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium tracking-[0.08em] uppercase mb-4 block w-fit text-white/85 border border-white/15" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    {t('diagram.kicker')}
                  </span>
                  <h1 className="text-[48px] md:text-[44px] font-semibold tracking-[-0.02em] text-white/95 mb-4" style={{ lineHeight: 1.2 }}>
                    {t.rich('heading2', {
    s: (chunks) => <span style={{ color: '#7b7df9' }}>{chunks}</span>,
  })
                    }
                  </h1>
                  <p className="text-[15px] text-white/[0.60] leading-[1.65] mb-6 max-w-2xl">
                    {t('body')
                    }
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" mode="dark" onClick={() => { router.push(href('book-meeting', lang)); window.scrollTo(0, 0); }}>
                      {t('cta4')}
                    </Button>
                    <Button variant="secondary" mode="dark" onClick={() => document.getElementById('context-section')?.scrollIntoView({ behavior: 'smooth' })}>
                      {t('cta5')}
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Client card + video */}
              <motion.div className="lg:col-span-5 flex flex-col gap-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/[0.08]">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                      <img loading="lazy" decoding="async" src="/logos/ins-mercato-logo.png" alt="In's Mercato logo" className="w-full h-full object-contain " />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-0.5">
                        {t('text9')}
                      </span>
                      <p className="text-[16px] font-bold text-white/90">In's Mercato</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {CARD_FACTS.map((id) => (
                      <div key={id}>
                        <span className="text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-0.5">{t(`clientCard.${id}.label`)}</span>
                        <p className="text-[13px] text-white/[0.65] leading-[1.4]">{t(`clientCard.${id}.value`)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/[0.08] overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    className="w-full h-full"
                    src={t('src')}
                    title={t('videoTitle')}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Content */}
        <section id="context-section" className="section-breathe relative py-16 lg:py-20" style={{ background: '#F7F7F7' }}>
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">

            {/* Context */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{t('text10')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{t('heading3')}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-6">
                {t.rich('body2', {
    b: (chunks) => <strong className="text-[#121212]/80 font-semibold">{chunks}</strong>,
  })
                }
              </p>
            </Section>

            {/* Challenge */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#ea580c' }}>{t('text11')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{t('heading4')}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-14">
                {t('body3')
                }
              </p>
              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{t('businessChallengesLabel')}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {BUSINESS_PAINS.map(p => (
                    <div key={p.id} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(234,88,12,0.1)' }}>
                        <p.icon className="h-5 w-5" style={{ color: '#ea580c' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{t(`${p.group}.${p.id}.title`)}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{t(`${p.group}.${p.id}.desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{t('hrChallengesLabel')}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {HR_PAINS.map(p => (
                    <div key={p.id} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(234,88,12,0.1)' }}>
                        <p.icon className="h-5 w-5" style={{ color: '#ea580c' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{t(`${p.group}.${p.id}.title`)}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{t(`${p.group}.${p.id}.desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Objectives */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{t('text12')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-10">{t('heading5')}</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {OBJECTIVES.map((o) => {
                  const [title, ...rest] = t(`objectives.${o.id}.label`).split(':');
                  const desc = rest.join(':').trim();
                  return (
                    <div key={o.id} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <o.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{title}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{desc}</p>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Solution */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{t('text13')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{t('heading6')}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">
                {t('body4')
                }
              </p>
              <div className="mb-10">
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{t('text14')}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {SKILLS.map(s => (
                    <div key={s.id} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <s.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{t(`skills.${s.id}.label`)}</h4>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{t('text15')}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {METHODOLOGY.map((id, i) => (
                    <div key={id} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <span className="block text-[2.75rem] font-light leading-none mb-6" style={{ color: '#c7d2fe' }}>0{i + 1}</span>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{t(`methodologyCards.${id}.title`)}</h4>
                      <p className="text-[14px] text-[#121212]/55 leading-[1.65]">{t(`methodologyCards.${id}.text`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Results */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#047857' }}>{t('text16')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">
                {t('heading7')}
              </h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">
                {t('body5')
                }
              </p>
              {/* ── DASHBOARD ── */}
              <div className="mb-10 space-y-4">

                {/* Talent Pipeline card */}
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="h-4 w-4" style={{ color: '#4b4df7' }} />
                    <span className="text-[15px] font-bold text-[#121212]">{t('diagram.title')}</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_40px_1fr_40px_1fr] gap-3 items-stretch mb-5">
                    {/* Step 1 */}
                    <div className="rounded-xl p-5" style={{ background: '#f1f5f9' }}>
                      <span className="text-[10px] font-bold tracking-[0.12em] text-[#121212]/30 block mb-2">{t('diagram.step1')}</span>
                      <span className="block stat-value text-[#121212] leading-none mb-2 text-[32px] md:text-[clamp(2rem,3.5vw,2.8rem)]" style={{ letterSpacing: '-0.03em' }}>900</span>
                      <p className="text-[13px] font-semibold text-[#121212]/70 leading-[1.4]">{t('body6')}</p>
                      <p className="text-[12px] text-[#121212]/35 mt-1">{t('body7')}</p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full border border-[#e2e8f0] bg-white flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-[#121212]/25" />
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="rounded-xl p-5" style={{ background: 'rgba(75,77,247,0.06)' }}>
                      <span className="text-[10px] font-bold tracking-[0.12em] block mb-2" style={{ color: 'rgba(75,77,247,0.45)' }}>{t('diagram.step2')}</span>
                      <span className="block stat-value leading-none mb-2 text-[32px] md:text-[clamp(2rem,3.5vw,2.8rem)]" style={{ letterSpacing: '-0.03em', color: '#4b4df7' }}>90</span>
                      <p className="text-[13px] font-semibold text-[#121212]/70 leading-[1.4]">{t('body8')}</p>
                      <p className="text-[12px] text-[#121212]/35 mt-1">{t('body9')}</p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden lg:flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full border border-[#e2e8f0] bg-white flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-[#121212]/25" />
                      </div>
                    </div>

                    {/* Outcome split */}
                    <div className="space-y-3">
                      <div className="rounded-xl p-4 flex items-start justify-between gap-3" style={{ background: 'rgba(5,150,105,0.07)' }}>
                        <div>
                          <span className="block stat-value leading-none mb-1 text-[32px] md:text-[1.7rem]" style={{ color: '#059669', letterSpacing: '-0.02em' }}>47%</span>
                          <p className="text-[13px] font-semibold text-[#121212]/80">{t('diagram.roleReady')}</p>
                          <p className="text-[11px] text-[#121212]/35 mt-0.5">{t('body10')}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 mt-0.5" style={{ background: 'rgba(5,150,105,0.15)', color: '#059669' }}>
                          {t('diagram.ready')}
                        </span>
                      </div>
                      <div className="rounded-xl p-4 flex items-start justify-between gap-3" style={{ background: 'rgba(217,119,6,0.07)' }}>
                        <div>
                          <span className="block stat-value leading-none mb-1 text-[32px] md:text-[1.7rem]" style={{ color: '#d97706', letterSpacing: '-0.02em' }}>53%</span>
                          <p className="text-[13px] font-semibold text-[#121212]/80">{t('diagram.inDevelopment')}</p>
                          <p className="text-[11px] text-[#121212]/35 mt-0.5">{t('body11')}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 mt-0.5" style={{ background: 'rgba(217,119,6,0.15)', color: '#d97706' }}>
                          {t('diagram.growing')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footnote */}
                  <p className="text-[11px] text-[#121212]/30 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    {t('body12')}
                  </p>
                </div>

                {/* Bottom row: Completion Rate + Funnel */}
                <div className="grid md:grid-cols-2 gap-4">

                  {/* Completion Rate */}
                  <div className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm flex flex-col h-full">
                    <p className="text-[14px] font-bold text-[#121212] mb-7">{t('body13')}</p>
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-48 h-48 mb-5">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="9" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="9" strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40 * 0.95} ${2 * Math.PI * 40}`} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[32px] md:text-[2.4rem] stat-value text-[#121212]" style={{ letterSpacing: '-0.03em' }}>95%</span>
                        </div>
                      </div>
                      <p className="text-[13px] text-[#121212]/50 text-left leading-[1.6] w-full">
                        {t('body14')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] mt-auto" style={{ color: '#059669' }}>
                      <CheckCircle className="h-4 w-4 shrink-0" />
                      <span>{t('text17')}</span>
                    </div>
                  </div>

                  {/* Selection Funnel */}
                  <div className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                    <p className="text-[14px] font-bold text-[#121212] mb-6">{t('body15')}</p>
                    <div className="space-y-4">
                      {FUNNEL.map(item => (
                        <div key={item.id}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[12px] text-[#121212]/50">{t(`funnel.${item.id}.label`)}</span>
                            <span className="text-[12px] font-semibold text-[#121212]/65">{item.value}</span>
                          </div>
                          <div className="h-[10px] rounded-full overflow-hidden" style={{ background: 'rgba(75,77,247,0.06)' }}>
                            <div className="h-full rounded-full" style={{ width: item.pct, background: item.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
              {/* ── END DASHBOARD ── */}

              {/* Quote */}
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-8 mb-5">
                <p className="text-[24px] font-medium text-[#121212]/75 leading-[1.75] italic mb-6">"{t('quote.text')}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#4b4df7]/[0.15]">
                    <img loading="lazy" decoding="async" src="/logos/mirko%20tortolano.png" alt={t('quote.author')} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#121212]/80">{t('quote.author')}</p>
                    <p className="text-[12px] text-[#121212]/40 leading-[1.5]">{t('quote.role')}</p>
                  </div>
                </div>
              </div>

              {/* Impact cards */}
              <div className="grid md:grid-cols-2 gap-5">
                {IMPACT.map(card => (
                  <div key={card.id} className="rounded-2xl border border-[#e5e7eb] bg-white p-8">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: '#e3f9ec' }}>
                      <card.icon className="h-[22px] w-[22px]" style={{ color: '#10b981' }} />
                    </div>
                    <h4 className="text-[19px] font-bold text-[#121212] mb-3 leading-[1.3]">{t(`impactCards.${card.id}.title`)}</h4>
                    <p className="text-[15px] text-[#121212]/55 leading-[1.55]">{t(`impactCards.${card.id}.text`)}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Future Vision */}
            <Section className="mb-5">
              <div className="rounded-2xl border border-[#4b4df7]/[0.12] bg-gradient-to-br from-[#4b4df7]/[0.04] to-transparent p-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-6 block w-fit" style={{ background: 'rgba(75,77,247,0.1)', color: '#4b4df7', border: '1px solid rgba(75,77,247,0.2)' }}>
                  {t('text18')}
                </span>
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">
                  {t('heading8')}
                </h2>
                <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-8">
                  {t('body16')
                  }
                </p>
                <div className="rounded-xl border border-[#4b4df7]/[0.15] bg-[#4b4df7]/[0.05] p-6 mb-8 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(75,77,247,0.12)' }}>
                    <Target className="h-5 w-5" style={{ color: '#4b4df7' }} />
                  </div>
                  <p className="text-[15px] text-[#121212]/75 leading-[1.7]">
                    {t('body17')
                    }
                  </p>
                </div>
                <div className="space-y-4">
                  {t.raw('visionBullets').map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <ArrowRight className="h-4 w-4 mt-1 shrink-0" style={{ color: '#4b4df7' }} />
                      <p className="text-[15px] text-[#121212]/65 leading-[1.65]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Science Note */}
            <Section>
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-8 lg:p-10 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase">{t('text')}</span>
                  <Button variant="tertiary" mode="dark" onClick={() => { router.push('/science'); window.scrollTo(0,0); }}>{t('cta')}</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-4 items-center">
                  <div className="rounded-xl bg-black/[0.03] p-6 text-center">{t.rich('text2', {
                    span: (chunks) => <span className="block text-[#121212] text-[32px] stat-value md:text-[2.5rem]" style={{ lineHeight: 1 }}>{chunks}</span>,
                    br: () => <br />,
                    span2: (chunks) => <span className="text-[13px] text-[#121212]/40 mt-2 block">{chunks}</span>,
                  })}</div>
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full border border-[#e2e8f0] bg-white flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-[#121212]/25" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#4B4DF7]/[0.06] p-6 text-center">{t.rich('text3', {
                    span: (chunks) => <span className="block text-[32px] stat-value md:text-[2.5rem]" style={{ lineHeight: 1, color: '#4b4df7' }}>{chunks}</span>,
                    br: () => <br />,
                    span2: (chunks) => <span className="text-[13px] text-[#121212]/[0.65] mt-2 block">{chunks}</span>,
                  })}</div>
                </div>
              </div>
            </Section>

          </div>
        </section>

        <div className="fade-into-dark" />

        {/* Related Stories */}
        <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-white/90 leading-[1.4] mb-12">{t('heading')}</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { id: 'carrefour', company: 'Carrefour', tag: 'Large-scale distribution · Hiring at Scale', headline: 'Carrefour: how to protect margins across 1,200 stores by optimising the key hiring KPI' },
                { id: 'subdued', company: 'Subdued', tag: 'Fashion Retail · Hiring', headline: 'Subdued: building a single scalable hiring standard for a network of 130+ stores' },
              ].map(s => (
                <button key={s.id} onClick={() => { router.push(`${href('customers', lang)}/${s.id}`); window.scrollTo(0,0); }} className="group text-left rounded-2xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.14] backdrop-blur-sm p-10 transition-all duration-500">
                  <span className="text-[14px] text-white/40 mb-4 block">{s.tag}</span>
                  <h4 className="text-[24px] font-semibold text-white/90 mb-4">{s.company}</h4>
                  <p className="text-[16px] text-white/[0.65] leading-[1.7] mb-8">{s.headline}</p>
                  <span className="inline-flex items-center gap-2 text-[15px] text-white/50 group-hover:text-white/80 font-semibold transition-colors duration-300">
                    {t('cta2')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <SolutionFinalCTA headline={t('text4')} accentWord={t('text5')} />
        <Footer />
      </main>
    </>
  );
}
