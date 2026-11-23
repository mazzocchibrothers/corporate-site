'use client';

import React, { useState } from 'react';
import { Reveal } from '@/components/ui/reveal';
import { useTranslations } from 'next-intl';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from '@/i18n/navigation';
import { Button, buttonVariants, SECONDARY_ON_LIGHT } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ClosingPanel } from '@/components/shared/ClosingPanel';
import { HeroCopy } from '@/components/ui/hero-copy';

const stats = [
  {
    id: 'n50',
  },
  {
    id: 'n3',
  },
  {
    id: 'hybrid',
  },
  {
    id: 'n1m',
  },
];

const steps = [
  {
    id: 'applySkills',
    num: '01',
  },
  {
    id: 'meetTeam',
    num: '02',
  },
  {
    id: 'moveForwardClarity',
    num: '03',
  },
];

const tags = [
  'skillsFirst',
  'biasFree',
  'gdprCompliant',
  'explainable',
];

const allRoles = [
  { team: 'Product', title: 'Technical Product Manager', location: 'Milan', work: 'Hybrid · Full-time', url: 'https://skillvue.factorial.it/job_posting/technical-product-manager-310502' },
  { team: 'Design', title: 'Senior Brand Designer', location: 'Milan', work: 'Hybrid · Full-time', url: 'https://skillvue.factorial.it/job_posting/senior-brand-designer-305100' },
  { team: 'People & Talent', title: 'Talent Lead', location: 'Milan', work: 'Hybrid · Full-time', url: 'https://www.linkedin.com/jobs/view/4420136873' },
  { team: 'Sales', title: 'Enterprise Account Executive – Italy', location: 'Milan', work: 'Hybrid · Full-time', url: 'https://skillvue.factorial.it/job_posting/enterprise-account-executive-italy-294480' },
];

const filters = ['All teams', 'Product', 'Design', 'People', 'Sales'];



export default function CareersPage() {
  const t = useTranslations('careers');
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All teams');

  const filtered =
    activeFilter === 'All teams'
      ? allRoles
      : allRoles.filter(
          (r) =>
            r.team.toLowerCase().includes(activeFilter.toLowerCase()) ||
            r.location === activeFilter
        );

  const grouped = filtered.reduce<Record<string, typeof allRoles>>((acc, role) => {
    if (!acc[role.team]) acc[role.team] = [];
    acc[role.team].push(role);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <main>

        {/* ── 1. HERO ─────────────────────────────────────────────── */}
        <section className="section-light relative overflow-hidden pt-[80px] min-h-screen flex flex-col justify-center">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute rounded-full"
              style={{
                width: '700px', height: '700px',
                top: '-200px', left: '-150px',
                background: 'radial-gradient(circle, rgba(75,77,247,0.12) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: '500px', height: '500px',
                bottom: '-100px', right: '-80px',
                background: 'radial-gradient(circle, rgba(255,95,36,0.07) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left — headline + CTAs */}
              <Reveal duration={0.7}>
                <span className="type-eyebrow text-[#4B4DF7] mb-6 block">{t('text')}</span>
                <HeroCopy>
                  <h1
                    className="font-semibold text-[#121212] mb-6 text-[48px] md:text-[58px]"
                    style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
                  >{t.rich('heading', {
                    span: (chunks) => <span className="font-semibold">{chunks}</span>,
                  })}</h1>
                  <p className="type-body hero-subtitle text-[#4B4B4B] mb-8">{t('body')}</p>
                </HeroCopy>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="primary" mode="light">
                    <a href="#open-roles">
                      {t('cta')}
                      <ArrowRight aria-hidden />
                    </a>
                  </Button>
                  <Button asChild variant="secondary" mode="light" className={SECONDARY_ON_LIGHT}>
                    <a
                      href="#life-at-skillvue"
                      onClick={(e) => { e.preventDefault(); document.getElementById('life-at-skillvue')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                      {t('cta2')}
                      <ArrowDown aria-hidden />
                    </a>
                  </Button>
                </div>
              </Reveal>

              {/* Right — photo */}
              <Reveal
                y={0}
                scale={0.97}
                duration={0.8}
                delay={0.3}
                className="rounded-2xl overflow-hidden aspect-video"
              >
                <img
                  src="/careers/team_foto_01.avif"
                  alt="Skillvue team"
                  width={1280}
                  height={720}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </Reveal>
            </div>

            {/* Stats row */}
            <Reveal
              y={20}
              duration={0.7}
              delay={0.5}
              className="grid grid-cols-2 lg:grid-cols-4 mt-14 lg:mt-16"
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`pt-6 pb-8 ${i % 2 !== 0 ? 'pl-6 md:pl-8' : ''}`}
                >
                  <p className="font-display text-[32px] md:text-[34px] font-semibold text-[#121212] tracking-[-0.02em] leading-none mb-1.5">
                    {t(`stats.${s.id}.value`)}
                  </p>
                  <p className="type-body-sm text-[#707070]">{t(`stats.${s.id}.label`)}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── 2. WHY SKILLVUE ─────────────────────────────────────── */}
        <section className="section-breathe py-20 lg:py-28 min-h-screen flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full">
            <Reveal duration={0.7} className="max-w-4xl">
              <span className="type-eyebrow text-[#4B4DF7] mb-6 block">{t('text2')}</span>
              <h2
                className="max-w-[880px] font-semibold text-[#121212] mb-6"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >{t.rich('heading2', {
                span: (chunks) => <span className="font-semibold">{chunks}</span>,
              })}</h2>
              <p className="max-w-[880px] type-body text-[#707070] mb-8">{t('body2')}</p>
              <Button asChild variant="secondary" mode="light">
                <a href="/about" onClick={(e) => { e.preventDefault(); router.push('/about'); window.scrollTo(0, 0); }}>
                  {t('cta3')}
                  <ArrowRight aria-hidden />
                </a>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ── 3. HOW WE HIRE ──────────────────────────────────────── */}
        <section className="section-light relative py-20 lg:py-28 min-h-screen flex flex-col justify-center">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(75,77,247,0.07) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal duration={0.7} className="mb-12 lg:mb-16 max-w-2xl">
              <span className="type-eyebrow text-[#4B4DF7] mb-6 block">{t('text3')}</span>
              <h2
                className="max-w-[880px] font-semibold text-[#121212] mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >{t.rich('heading3', {
                span: (chunks) => <span className="font-semibold">{chunks}</span>,
              })}</h2>
              <p className="max-w-[880px] type-body text-[#4B4B4B]">{t('body3')}</p>
            </Reveal>

            {/* Step cards */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5 mb-8 md:mb-10">
              {steps.map((step, i) => (
                <Reveal
                  y={20}
                  delay={i * 0.1}
                  key={step.num}
                  className="rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] p-6 md:p-8 lg:p-10"
                >
                  <span className="font-display block text-[40px] md:text-[56px] font-light text-[#121212]/10 leading-none tracking-[-0.04em] mb-6 md:mb-8">
                    {step.num}
                  </span>
                  <h3 className="text-[16px] md:text-[18px] font-semibold text-[#121212] mb-3 leading-snug">
                    {t(`steps.${step.id}.title`)}
                  </h3>
                  <p className="type-body-sm text-[#4B4B4B]">{t(`steps.${step.id}.desc`)}</p>
                </Reveal>
              ))}
            </div>

            {/* Tags */}
            <Reveal
              y={0}
              delay={0.35}
              className="flex flex-wrap gap-2 md:gap-3"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="type-caption inline-flex px-3 py-1.5 md:px-4 md:py-2 rounded-full font-semibold text-[#4B4B4B] border border-[#e5e7eb] bg-[#f1f5f9]"
                >
                  {t(`tags.${tag}`)}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── 4. LIFE AT SKILLVUE ─────────────────────────────────── */}
        <section id="life-at-skillvue" className="section-breathe py-20 lg:py-28 min-h-screen flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal duration={0.7} className="mb-10 lg:mb-12">
              <span className="type-eyebrow text-[#4B4DF7] mb-4 block">{t('text4')}</span>
              <h2
                className="max-w-[880px] font-semibold text-[#121212] mb-2"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >{t('heading4')}</h2>
              <p className="max-w-[880px] type-body text-[#707070]">{t('body4')}</p>
            </Reveal>

            {/* Photo mosaic — large left + 2×2 right */}
            <Reveal
              y={20}
              duration={0.7}
              delay={0.2}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
            >
              <div className="rounded-2xl overflow-hidden aspect-video">
                <img loading="lazy" decoding="async"
                  src="/careers/life_at_skillvue.avif"
                  alt="Skillvue team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="rounded-2xl overflow-hidden aspect-video">
                    <img loading="lazy" decoding="async"
                      src={`/careers/life_at_skillvue-${n}.avif`}
                      alt={`Life at Skillvue ${n}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 5. OPEN ROLES ───────────────────────────────────────── */}
        <section id="open-roles" className="section-light relative py-20 lg:py-28 min-h-screen flex flex-col justify-start">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full">
            <Reveal duration={0.7} className="mb-8 lg:mb-10">
              <span className="type-eyebrow text-[#4B4DF7] mb-4 block">{t('text5')}</span>
              <h2
                className="max-w-[880px] font-semibold text-[#121212]"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >{t('heading5')}</h2>
            </Reveal>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`type-body-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full font-medium transition-all duration-300 ${
 activeFilter === f
 ? 'bg-[#E7E7E8] text-[#121212] border border-[#E7E7E8]'
 : 'text-[#4B4B4B] border border-transparent hover:text-[#121212]'
 }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Grouped listings */}
            <div className="flex flex-col gap-8">
              {Object.entries(grouped).map(([team, teamRoles], gi) => (
                <Reveal
                  y={20}
                  delay={gi * 0.07}
                  key={team}
                >
                  <p className="type-eyebrow font-medium text-[#707070] mb-3">
                    {team}
                  </p>
                  <div className="flex flex-col gap-2">
                    {teamRoles.map((role) => (
                      <a
                        key={role.title}
                        href={role.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6 rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] hover:border-[#121212]/20 focus-visible:border-[#121212]/20 hover:bg-[#f1f5f9] focus-visible:bg-[#f1f5f9] px-5 py-5 md:px-8 md:py-6 transition-all duration-300"
                      >
                        <span className="type-body-bold text-[#121212]">
                          {role.title}
                        </span>
                        <div className="flex items-center justify-between w-full gap-4 md:w-auto md:justify-start shrink-0">
                          <span className="type-body-sm text-[#707070]">
                            {role.location} · {role.work}
                          </span>
                          <span className={cn(buttonVariants({ variant: 'secondary', mode: 'light' }), SECONDARY_ON_LIGHT)}>
                            {t('cta4')}
                            <ArrowRight aria-hidden className="group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </Reveal>
              ))}

              {Object.keys(grouped).length === 0 && (
                <p className="type-body text-[#707070] py-8">{t('body5')}</p>
              )}
            </div>
          </div>
        </section>

        {/* ── 6. FINAL CTA: the shared light closing, ruled off the white open
            roles above. It keeps the page's two buttons (the Assess closing has one). */}
        <ClosingPanel
          heading={t('heading6')}
          rule
          action={
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary" mode="light">
                <a href="#open-roles">
                  {t('cta5')}
                  <ArrowRight aria-hidden />
                </a>
              </Button>
              <Button asChild variant="tertiary" mode="light">
                <a href="#life-at-skillvue">
                  {t('cta6')}
                  <ArrowRight aria-hidden />
                </a>
              </Button>
            </div>
          }
        />

      </main>
      <Footer />
    </>
  );
}
