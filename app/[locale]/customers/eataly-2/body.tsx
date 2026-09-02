// @ts-nocheck
'use client';

import React, { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Shield, Scale, TrendingUp, Target, Layers, Zap, Eye, Heart, CheckCircle, Clock } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import Navbar from '@/components/landing/Navbar';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { Button } from '@/components/ui/button';
import { href } from '@/i18n/routes';

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 25 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
      {children}
    </motion.div>
  );
}


// Structure the catalogue cannot hold: ids and the components the page
// renders for each row. The words that went with them are in messages/.
const CHALLENGE_BUSINESS_CHALLENGES = [
  { id: 'expansionSpeedOutpaces', icon: Zap },
  { id: 'profileRareArtisanal', icon: Layers },
  { id: 'growthAmplifiesWeight', icon: TrendingUp },
];

const CHALLENGE_HR_CHALLENGES = [
  { id: 'newMoreAgile', icon: Zap },
  { id: 'fairnessObjectivityAt', icon: Scale },
  { id: 'filteringBlockingRequirements', icon: Target },
];

const OBJECTIVES_ITEMS = [
  { id: 'mapAllKey', icon: Eye },
  { id: 'ensureFairnessReduce', icon: Scale },
  { id: 'integrateAiHuman', icon: Heart },
  { id: 'processApplicationsWeeks', icon: Zap },
];

const SOLUTION_SKILLS = [
  { id: 'leadership', icon: Users },
  { id: 'peopleManagement', icon: Shield },
  { id: 'opennessInternationalMobility', icon: Target },
];

const RESULTS_QUALITATIVE = [
  { id: 'hrTeamProductivity', icon: TrendingUp },
  { id: 'significantReductionHiring', icon: Scale },
  { id: 'authenticityHumanTouch', icon: Heart },
];

export default function EatalyStoryPage() {
  const router = useRouter();
  const lang = useLocale();
  const t = useTranslations('customers.eataly-2');
  const metaTitle = `${t('headline').replace(/<\/?hl\d*>/g, '')} | Skillvue`;
  const metaDesc = t('subtitle').length > 160 ? t('subtitle').substring(0, 157) + '...' : t('subtitle');

  return (
    <>
      <>
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
      </>
      <Navbar />
      <main>

        {/* ===== HERO ===== */}
        <section className="relative pt-[80px]">
          <div className="absolute inset-0 overflow-hidden">
            <img src="/logos/eataly-explore-stories.avif" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(8px) brightness(0.25)', transform: 'scale(1.1)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20 lg:py-28">
            {/* Breadcrumb */}
            <motion.div className="mb-10 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Button variant="tertiary" mode="dark" icon={null} onClick={() => { router.push(href('customers', lang)); window.scrollTo(0, 0); }}>{t('breadcrumb')}</Button>
              <span className="text-white/20">/</span>
              <span className="text-[13px] text-white/[0.65]">Eataly</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium tracking-[0.08em] uppercase mb-8 block w-fit text-white/85 border border-white/15" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    {t('badge')}
                  </span>
                  <h1 className="text-[48px] md:text-[44px] font-semibold tracking-[-0.02em] text-white/95 mb-8" style={{ lineHeight: 1.25 }}>
                    {t.rich('headline', {
                      hl: (chunks) => <span style={{ color: '#7b7df9' }}>{chunks}</span>,
                      hl2: (chunks) => <span style={{ color: '#7b7df9' }}>{chunks}</span>,
                    })}
                  </h1>
                  <p className="text-[17px] text-white/[0.60] leading-[1.75] mb-12 max-w-2xl">{t('subtitle')}</p>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4 mb-12">
                    {t.raw('heroMetrics').map(m => (
                      <div key={m.value} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-3 md:px-6 md:py-4">
                        <span className="block text-white text-[19px] break-words stat-value md:text-[1.7rem]" style={{ lineHeight: 1, letterSpacing: '-0.03em' }}>{m.value}</span>
                        <span className="text-[13px] text-white/[0.55] mt-1 block">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary" mode="dark" onClick={() => { router.push(href('book-meeting', lang)); window.scrollTo(0, 0); }}>
                      {t('ctaPrimary')}
                    </Button>
                    <Button variant="secondary" mode="dark" onClick={() => document.getElementById('context-section')?.scrollIntoView({ behavior: 'smooth' })}>
                      {t('ctaSecondary')}
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Client card */}
              <motion.div className="lg:col-span-5 lg:sticky lg:top-[100px] self-start" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.08]">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-white">
                      <img loading="lazy" decoding="async" src="/logos/Eataly-logo.png" alt="Eataly logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{t('clientCard.label')}</span>
                      <p className="text-[18px] font-bold text-white/90">Eataly</p>
                    </div>
                  </div>
                  <div className="divide-y divide-white/[0.08]">
                    {t.raw('clientCard.facts').map(s => (
                      <div key={s.label} className="py-4 first:pt-0 last:pb-0">
                        <span className="text-[11px] font-bold text-white/30 tracking-[0.1em] uppercase block mb-1">{s.label}</span>
                        <p className="text-[14px] text-white/[0.65] leading-[1.6]">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CONTENT SECTIONS ===== */}
        <section id="context-section" className="section-breathe relative py-16 lg:py-20" style={{ background: '#F7F7F7' }}>
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">

            {/* CONTEXT */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{t('context.badge')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-6">{t('context.title')}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.85] mb-8">{t.rich('context.paragraph', {
    b: (chunks) => <strong className="text-[#121212]/80 font-semibold">{chunks}</strong>,
    br: () => <br />,
  })}</p>
              {t.has('context').summary && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.85]">{t.raw('context').summary}</p>}
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
                {OBJECTIVES_ITEMS.map((o, i) => {
                  const [title, ...rest] = t(`objectives.items.${o.id}.text`).split(':');
                  const desc = rest.join(':').trim();
                  return (
                    <div key={i} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
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

            {/* SOLUTION */}
            <Section className="mb-24">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase block mb-4" style={{ color: '#4b4df7' }}>{t('solution.badge')}</span>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{t('solution.title')}</h2>
              <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-4">{t('solution.intro')}</p>
              {t.has('solution.intro2') && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mb-12">{t('solution.intro2')}</p>}
              <div>
                <span className="text-[12px] font-bold text-[#121212]/30 tracking-[0.1em] uppercase mb-5 block">{t('solution.skillsLabel')}</span>
                <div className="grid md:grid-cols-3 gap-5">
                  {SOLUTION_SKILLS.map((s) => (
                    <div key={t(`solution.skills.${s.id}.label`)} className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-sm">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(75,77,247,0.08)' }}>
                        <s.icon className="h-5 w-5" style={{ color: '#4b4df7' }} />
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#121212] mb-3 leading-[1.4]">{t(`solution.skills.${s.id}.label`)}</h4>
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
                {[Users, Clock, TrendingUp].map((Icon, i) => {
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

            {/* EVOLUTION */}
            <Section>
              <div className="rounded-2xl border border-[#4b4df7]/[0.12] bg-gradient-to-br from-[#4b4df7]/[0.04] to-transparent p-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase mb-6 block w-fit" style={{ background: 'rgba(75,77,247,0.1)', color: '#4b4df7', border: '1px solid rgba(75,77,247,0.2)' }}>
                  {t('vision.badge')}
                </span>
                <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-[#121212] leading-[1.4] mb-4">{t('vision.title')}</h2>
                <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8]">{t('vision.intro')}</p>
                {t.has('vision.nextGen') && <p className="text-[16px] text-[#121212]/[0.65] leading-[1.8] mt-4">{t('vision.nextGen')}</p>}
              </div>
            </Section>

          </div>
        </section>

        <div className="fade-into-dark" />

        {/* RELATED STORIES */}
        <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
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
