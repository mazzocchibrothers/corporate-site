'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, BarChart3, Check, Minus, Plus, Route as RouteIcon, TrendingUp, Users } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { href } from '@/i18n/routes';
import { IconTile } from '@/components/ui/icon-tile';
import { bookingHref } from '@/components/landing/booking-link';
import LevelMatrix from '@/components/landing/mvi/LevelMatrix';

// The second cut of /lp/measured-vs-inferred: the same campaign, told as
// skill levels rather than skill tags, and laid out on its own terms rather
// than the original's. The original stays live beside it for comparison.
// Every CTA goes to /book-meeting with the visitor's `v` appended
// (components/landing/booking-link.ts), as on the original. English-only.
const BOOKING_URL = href('book-meeting', 'en');

const FADE = { y: 32, duration: 0.7, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' };

// Structure the catalogue cannot hold: the icon for each decision, in the order
// of use.cards in messages/. The words are in lp.measured-vs-inferred-v2.
const USE_ICONS = [TrendingUp, Users, RouteIcon, BarChart3];

type Card = { title: string; body: string };
type Step = { name: string; title: string; body: string };
type Row = { label: string; inferred: string; measured: string };
type Faq = { q: string; a: string };

const accent = (chunks: React.ReactNode) => <span className="gradient-text">{chunks}</span>;

const H2 = 'text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] leading-[1.1]';
const WRAP = 'max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12';

function Eyebrow({ light, children }: { light?: boolean; children: React.ReactNode }) {
  return (
    <p className={`text-[15px] md:text-[16px] font-medium mb-4 ${light ? 'text-[#4B4DF7]' : 'text-[#8385FF]'}`}>{children}</p>
  );
}

function Cta({ to, mode, children }: { to: string; mode: 'light' | 'dark'; children: React.ReactNode }) {
  return (
    <Button asChild variant="primary" mode={mode} className="max-w-full px-5 sm:px-6 whitespace-normal sm:whitespace-nowrap text-center">
      <a href={to}>
        {children}
        <ArrowRight aria-hidden="true" />
      </a>
    </Button>
  );
}

export default function MeasuredVsInferredV2() {
  const t = useTranslations('lp.measured-vs-inferred-v2');
  const [booking, setBooking] = useState(BOOKING_URL);

  useEffect(() => {
    setBooking(bookingHref(BOOKING_URL, window.location.search));
  }, []);

  const levels = t.raw('hero.visual.levels') as string[];
  const rows = t.raw('compare.rows') as Row[];

  return (
    <>
      <Navbar />

      <main>
        {/* ── HERO: centred copy, the team matrix full width below ─── */}
        <section className="relative pt-[80px]">
          <div className={`${WRAP} pt-16 pb-16 lg:pt-6 lg:pb-20`}>
            <div className="max-w-[920px] mx-auto text-center flex flex-col items-center">
              <Reveal {...FADE} delay={0.1}><Eyebrow>{t('hero.eyebrow')}</Eyebrow></Reveal>
              <Reveal
                {...FADE}
                delay={0.2}
                as="h1"
                className="font-semibold text-[48px] md:text-[64px] text-white/95 mb-6"
                style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                {t.rich('hero.title', { s: accent })}
              </Reveal>
              <Reveal {...FADE} delay={0.3} as="p" className="text-[17px] md:text-[18px] text-white/[0.65] leading-[1.7] mb-10 lg:mb-7 max-w-[720px]">
                {t('hero.sub')}
              </Reveal>
              <Reveal {...FADE} delay={0.4}>
                <Cta to={booking} mode="dark">{t('hero.cta')}</Cta>
              </Reveal>
            </div>
            <Reveal {...FADE} delay={0.5} className="mt-14 lg:mt-10">
              <LevelMatrix />
            </Reveal>
          </div>
        </section>

        {/* ── THE PROBLEM: statement left, numbered list right ──────── */}
        <section className="section-breathe py-20 lg:py-28">
          <div className={`${WRAP} grid lg:grid-cols-12 gap-10 lg:gap-16`}>
            <Reveal {...FADE} className="lg:col-span-6">
              <Eyebrow light>{t('problem.eyebrow')}</Eyebrow>
              <h2 className={`${H2} text-[#121212] mb-6`}>{t.rich('problem.title', { s: accent })}</h2>
              <p className="text-[16px] md:text-[17px] text-[#121212]/60 leading-[1.75]">{t('problem.body')}</p>
            </Reveal>
            <ol className="lg:col-span-6 divide-y divide-black/[0.08] border-y border-black/[0.08] self-start">
              {(t.raw('problem.cards') as Card[]).map((c, i) => (
                <Reveal {...FADE} delay={i * 0.08} as="li" key={c.title} className="flex gap-5 py-6 md:py-7">
                  <span className="stat-value text-[28px] md:text-[32px] text-[#4B4DF7] w-10 shrink-0" style={{ lineHeight: 1 }}>{i + 1}</span>
                  <div>
                    <h3 className="text-[18px] font-semibold text-[#121212] leading-snug mb-2">{c.title}</h3>
                    <p className="text-[15px] text-[#121212]/60 leading-[1.7]">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── INFERENCE VS MEASUREMENT: two columns, versus ─────────── */}
        <section className="section-breathe pb-20 lg:pb-28">
          <div className={WRAP}>
            <Reveal {...FADE} className="max-w-[860px] mx-auto text-center mb-12">
              <Eyebrow light>{t('compare.eyebrow')}</Eyebrow>
              <h2 className={`${H2} text-[#121212] mb-6`}>{t.rich('compare.title', { s: accent })}</h2>
              <p className="text-[16px] md:text-[17px] text-[#121212]/60 leading-[1.75]">{t('compare.intro')}</p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {(['inferred', 'measured'] as const).map((side) => {
                const measured = side === 'measured';
                return (
                  <Reveal
                    {...FADE}
                    delay={measured ? 0.12 : 0}
                    key={side}
                    className={`rounded-2xl p-6 md:p-8 ${
                      measured ? 'bg-white border-2 border-[#4B4DF7]/40 shadow-[0_12px_40px_rgba(75,77,247,0.10)]' : 'bg-white/60 border border-black/[0.06]'
                    }`}
                  >
                    <p className={`text-[17px] font-semibold mb-6 ${measured ? 'text-[#4B4DF7]' : 'text-[#121212]/55'}`}>
                      {measured ? t('compare.colMeasured') : t('compare.colInferred')}
                    </p>
                    <dl className="divide-y divide-black/[0.06]">
                      {rows.map((r) => (
                        <div key={r.label} className="py-4 first:pt-0 last:pb-0">
                          <dt className="text-[13px] font-medium text-[#121212]/45 mb-1.5">{r.label}</dt>
                          <dd className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                measured ? 'bg-[#4B4DF7] text-white' : 'border border-dashed border-black/[0.25] text-[#121212]/40'
                              }`}
                              aria-hidden="true"
                            >
                              {measured ? <Check className="h-3 w-3" strokeWidth={3} /> : <Minus className="h-3 w-3" />}
                            </span>
                            <span className={`text-[15px] leading-[1.6] ${measured ? 'text-[#121212]' : 'text-[#121212]/55'}`}>
                              {measured ? r.measured : r.inferred}
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>
                );
              })}
            </div>

            <Reveal {...FADE} className="mt-10 flex flex-col items-center gap-5 text-center">
              <p className="text-[18px] md:text-[20px] font-semibold tracking-[-0.01em] text-[#121212]">{t('compare.midLine')}</p>
              <Cta to={booking} mode="light">{t('compare.midCta')}</Cta>
            </Reveal>
          </div>
        </section>

        {/* ── HOW SKILLVUE MEASURES: timeline left, level ladder right ── */}
        <section className="relative py-20 lg:py-28">
          <div className={WRAP}>
            <Reveal {...FADE} className="max-w-[860px] mb-14">
              <Eyebrow>{t('how.eyebrow')}</Eyebrow>
              <h2 className={`${H2} text-white/95 mb-6`}>{t.rich('how.title', { s: accent })}</h2>
              <p className="text-[16px] md:text-[17px] text-white/60 leading-[1.75]">{t('how.intro')}</p>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <ol className="lg:col-span-7 relative">
                {(t.raw('how.steps') as Step[]).map((s, i, all) => (
                  <Reveal {...FADE} delay={i * 0.08} as="li" key={s.name} className="relative flex gap-5 md:gap-6 pb-10 last:pb-0">
                    {i < all.length - 1 && (
                      <span className="absolute left-[19px] top-11 bottom-0 w-px bg-white/[0.12]" aria-hidden="true" />
                    )}
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#6366F8]/50 bg-[#6366F8]/15 stat-value text-[15px] text-white">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <p className="text-[13px] font-semibold text-[#8385FF] mb-1">{s.name}</p>
                      <h3 className="text-[19px] font-semibold text-white/95 leading-snug mb-2">{s.title}</h3>
                      <p className="text-[15px] text-white/60 leading-[1.7]">{s.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>

              <div className="lg:col-span-5">
                <Reveal {...FADE} className="lg:sticky lg:top-28 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
                  <p className="text-[13px] text-white/45 mb-6">{t('how.scaleLabel')}</p>
                  {/* The five levels as a ladder, top rung first: each bar one
                      level longer than the one below it. */}
                  <ol className="flex flex-col-reverse gap-3" aria-label={t('how.scaleLabel')}>
                    {levels.map((name, i) => (
                      <li key={name} className="grid grid-cols-[24px_112px_minmax(0,1fr)] items-center gap-3">
                        <span className="stat-value text-[18px] text-white/90">{i + 1}</span>
                        <span className="text-[14px] text-white/70">{name}</span>
                        <span className="h-2.5 rounded-full bg-white/[0.06]">
                          <span
                            className="block h-full rounded-full bg-[#6366F8]"
                            style={{ width: `${20 + i * 20}%`, opacity: 0.35 + i * 0.16 }}
                            aria-hidden="true"
                          />
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 pt-5 border-t border-white/[0.08] text-[14px] md:text-[15px] text-white/60 leading-[1.7]">{t('how.techNote')}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU DECIDE WITH IT: rows, then the proof callout ─── */}
        <section className="section-breathe py-20 lg:py-28">
          <div className={WRAP}>
            <Reveal {...FADE} className="max-w-[860px] mb-10">
              <Eyebrow light>{t('use.eyebrow')}</Eyebrow>
              <h2 className={`${H2} text-[#121212]`}>{t.rich('use.title', { s: accent })}</h2>
            </Reveal>

            <ul className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {(t.raw('use.cards') as Card[]).map((c, i) => (
                <Reveal {...FADE} delay={i * 0.06} as="li" key={c.title} className="grid md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 items-start">
                  <div className="md:col-span-5 flex items-center gap-4">
                    <IconTile icon={USE_ICONS[i]} mode="light" />
                    <h3 className="text-[18px] md:text-[20px] font-semibold text-[#121212] leading-snug">{c.title}</h3>
                  </div>
                  <p className="md:col-span-7 text-[15px] md:text-[16px] text-[#121212]/60 leading-[1.7]">{c.body}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal {...FADE} className="mt-12 rounded-2xl bg-white border border-black/[0.06] p-6 md:p-10">
              <p className="text-[18px] md:text-[22px] font-semibold tracking-[-0.01em] text-[#121212] leading-[1.45] max-w-[980px]">{t('use.proof')}</p>
            </Reveal>
          </div>
        </section>

        {/* ── WORKS WITH WHAT YOU HAVE: the stack as layers ─────────── */}
        <section className="relative py-20 lg:py-28">
          <div className={`${WRAP} grid lg:grid-cols-12 gap-12 lg:gap-16 items-start`}>
            <div className="lg:col-span-6">
              <Reveal {...FADE} className="mb-10">
                <Eyebrow>{t('stack.eyebrow')}</Eyebrow>
                <h2 className={`${H2} text-white/95 mb-6`}>{t.rich('stack.title', { s: accent })}</h2>
                <p className="text-[16px] md:text-[17px] text-white/60 leading-[1.75]">{t('stack.body')}</p>
              </Reveal>
              <p className="text-[13px] font-medium text-white/45 mb-4">{t('stack.pathsLabel')}</p>
              <ol className="space-y-5">
                {(t.raw('stack.paths') as Card[]).map((p, i) => (
                  <Reveal {...FADE} delay={i * 0.08} as="li" key={p.title} className="flex gap-4">
                    <span className="stat-value text-[15px] text-[#8385FF] w-6 shrink-0" style={{ lineHeight: 1.6 }}>0{i + 1}</span>
                    <div>
                      <h3 className="text-[17px] font-semibold text-white/90 mb-1">{p.title}</h3>
                      <p className="text-[15px] text-white/55 leading-[1.65]">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* Three layers, top to bottom: the systems, the skill map, and
                Skillvue underneath it. Levels rise into both. */}
            <Reveal {...FADE} delay={0.15} className="lg:col-span-6 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-6">
                <p className="text-[13px] text-white/50 mb-3">{t('stack.layers.systems')}</p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(t.raw('stack.layers.systemsList') as string[]).map((d) => (
                    <li key={d} className="rounded-lg border border-white/[0.10] px-3 py-2.5 text-[14px] text-center text-white/80">{d}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center py-2" aria-hidden="true">
                <Plus className="h-4 w-4 text-white/30" />
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-6">
                <p className="text-[16px] font-semibold text-white/90">{t('stack.layers.map')}</p>
                <p className="text-[13px] text-white/55 mt-1">{t('stack.layers.mapSub')}</p>
              </div>
              <div className="flex justify-center py-2" aria-hidden="true">
                <Plus className="h-4 w-4 text-white/30" />
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-[#6366F8]/50 bg-[#6366F8]/[0.12] p-5 md:p-6 shadow-[0_12px_40px_rgba(75,77,247,0.18)]">
                <img src="/logos/skillvue-logomark.svg" alt="" width={32} height={32} loading="lazy" decoding="async" className="h-8 w-8 shrink-0" />
                <div>
                  <p className="text-[16px] font-semibold text-white">{t('stack.layers.skillvue')}</p>
                  <p className="text-[13px] text-white/70 mt-1">{t('stack.layers.skillvueSub')}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ: one centred column ───────────────────────────────── */}
        <section className="section-breathe py-20 lg:py-28">
          <div className={WRAP}>
            <div className="max-w-[860px] mx-auto">
              <Reveal {...FADE} className="text-center mb-10">
                <Eyebrow light>{t('faq.eyebrow')}</Eyebrow>
                <h2 className={`${H2} text-[#121212]`}>{t.rich('faq.title', { s: accent })}</h2>
              </Reveal>
              {/* <details> rather than state: the answers are in the HTML for
                  search engines and LLMs whether or not anyone opens them. */}
              <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
                {(t.raw('faq.items') as Faq[]).map((f, i) => (
                  <details key={f.q} className="group py-5 md:py-6" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                      <h3 className="text-[16px] md:text-[18px] font-semibold text-[#121212] leading-[1.5]">{f.q}</h3>
                      <Plus className="mt-1 h-5 w-5 shrink-0 text-[#4B4DF7] transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                    </summary>
                    <p className="mt-3 pr-9 text-[15px] md:text-[16px] text-[#121212]/65 leading-[1.7]">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA: a contained panel ──────────────────────────── */}
        <section className="relative pt-20 pb-32 lg:pt-28 lg:pb-44">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 lg:h-64 bg-gradient-to-b from-transparent to-[#050508]" aria-hidden="true" />
          <div className={`relative ${WRAP}`}>
            <Reveal
              {...FADE}
              className="rounded-3xl border border-[#6366F8]/40 bg-[#6366F8]/[0.08] p-8 md:p-12 lg:p-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-8">
                <h2 className={`${H2} text-white/95 mb-5`}>{t.rich('final.title', { s: accent })}</h2>
                <p className="text-[16px] md:text-[18px] text-white/65 leading-[1.7] max-w-[680px]">{t('final.body')}</p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <Cta to={booking} mode="dark">{t('final.cta')}</Cta>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
