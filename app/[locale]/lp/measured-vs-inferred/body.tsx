'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, Code2, Plug, Network, Map, ClipboardCheck, Workflow } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { href } from '@/i18n/routes';
import { IconTile } from '@/components/ui/icon-tile';
import { bookingHref } from '@/components/landing/booking-link';
import SkillProfile from '@/components/landing/mvi/SkillProfile';
import StackFlow from '@/components/landing/mvi/StackFlow';
import CompareTable from '@/components/landing/mvi/CompareTable';
import { useInView } from '@/components/landing/mvi/motion';

// The booking page for the 20-minute conversation: the site's own
// /book-meeting, the same page the main navbar's "Book a demo" opens. Every CTA
// on the page goes here with the visitor's `v` appended
// (components/landing/booking-link.ts); the HubSpot form there records the full
// page URL with each submission, so `v` reaches the conversion. The page is
// English-only, hence the fixed locale.
const BOOKING_URL = href('book-meeting', 'en');

const FADE = { y: 32, duration: 0.7, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' };

// Structure the catalogue cannot hold: the icon for each item, in the order of
// its array in messages/. The words are in lp.measured-vs-inferred.
const PATH_ICONS = [Code2, Plug, Network];
const STEP_ICONS = [Map, ClipboardCheck, Workflow];

type Card = { title: string; body: string };
type Step = { name: string; title: string; body: string };

const accent = (chunks: React.ReactNode) => <span className="gradient-text">{chunks}</span>;

const H2 = 'text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] leading-[1.1]';

function Eyebrow({ light, children }: { light?: boolean; children: React.ReactNode }) {
  return (
    <p className={`text-[15px] md:text-[16px] font-medium mb-4 ${light ? 'text-[#4B4DF7]' : 'text-[#8385FF]'}`}>{children}</p>
  );
}

function Cta({ to, mode, children }: { to: string; mode: 'light' | 'dark'; children: React.ReactNode }) {
  return (
    // On a 320px screen the label is wider than the 280px between the gutters:
    // a little less padding, and it may wrap rather than push the page wide.
    <Button asChild variant="primary" mode={mode} className="max-w-full px-5 sm:px-6 whitespace-normal sm:whitespace-nowrap text-center">
      <a href={to}>
        {children}
        <ArrowRight aria-hidden="true" />
      </a>
    </Button>
  );
}

// Map, Assess, Decide on a rail that fills left to right as the section comes
// into view; each step lights as the fill reaches it. Vertical below md.
const STEP_MS = 700;

function HowSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className="relative">
      <div className="hidden md:block relative h-4 mb-5" aria-hidden="true">
        <div className="absolute left-[16.66%] right-[16.66%] top-1/2 -translate-y-1/2 h-[2px] bg-black/[0.08]">
          <div
            className="h-full bg-[#4B4DF7] transition-[width] ease-linear"
            style={{ width: inView ? '100%' : '0%', transitionDuration: `${STEP_MS * (steps.length - 1)}ms` }}
          />
        </div>
        {steps.map((s, i) => (
          <span
            key={s.name}
            className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-300 ${
              inView ? 'border-[#4B4DF7] bg-[#4B4DF7]' : 'border-black/[0.15] bg-[#F7F7F7]'
            }`}
            style={{ left: `${16.66 + i * 33.33}%`, transitionDelay: `${i * STEP_MS}ms` }}
          />
        ))}
      </div>
      <ol className="relative grid md:grid-cols-3 gap-4 md:gap-6">
        {steps.map((s, i) => (
          <li
            key={s.name}
            className={`rounded-2xl bg-white border p-6 md:p-7 transition-all duration-500 ${
              inView ? 'border-[#4B4DF7]/30 shadow-[0_8px_30px_rgba(75,77,247,0.08)] opacity-100 translate-y-0' : 'border-black/[0.06] opacity-40 translate-y-3'
            }`}
            style={{ transitionDelay: `${i * STEP_MS}ms` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <IconTile icon={STEP_ICONS[i]} mode="light" />
              <span className="text-[15px] font-semibold text-[#4B4DF7]">{s.name}</span>
            </div>
            <h3 className="text-[18px] font-semibold text-[#121212] leading-snug mb-3">{s.title}</h3>
            <p className="text-[15px] text-[#121212]/60 leading-[1.7]">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function MeasuredVsInferred() {
  const t = useTranslations('lp.measured-vs-inferred');
  const [booking, setBooking] = useState(BOOKING_URL);

  useEffect(() => {
    setBooking(bookingHref(BOOKING_URL, window.location.search));
  }, []);

  return (
    <>
      <Navbar />

      <main>
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative pt-[80px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 pt-16 pb-16 lg:pt-24 lg:pb-24">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="min-w-0 lg:col-span-7">
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
              <Reveal {...FADE} delay={0.3} as="p" className="text-[17px] md:text-[18px] text-white/[0.65] leading-[1.7] mb-10 max-w-[620px]">
                {t('hero.sub')}
              </Reveal>
              <Reveal {...FADE} delay={0.4} className="flex flex-col items-start gap-3">
                <Cta to={booking} mode="dark">{t('hero.cta')}</Cta>
              </Reveal>
            </div>
            <Reveal {...FADE} delay={0.4} className="min-w-0 lg:col-span-5">
              <SkillProfile />
            </Reveal>
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM ───────────────────────────────────────────── */}
        <section className="relative pb-20 lg:pb-28">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal {...FADE} className="max-w-[820px] mb-12">
              <Eyebrow>{t('problem.eyebrow')}</Eyebrow>
              <h2 className={`${H2} text-white/95 mb-6`}>{t.rich('problem.title', { s: accent })}</h2>
              <p className="text-[16px] md:text-[17px] text-white/60 leading-[1.75]">{t('problem.body')}</p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {(t.raw('problem.cards') as Card[]).map((c, i) => (
                <Reveal {...FADE} delay={i * 0.08} key={c.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-7">
                  <span className="block text-[13px] font-medium text-[#8385FF] mb-4">0{i + 1}</span>
                  <h3 className="text-[18px] font-semibold text-white/90 leading-snug mb-3">{c.title}</h3>
                  <p className="text-[15px] text-white/55 leading-[1.7]">{c.body}</p>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* ── INFERRED VS MEASURED ──────────────────────────────────── */}
        <section className="section-breathe py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal {...FADE} className="max-w-[820px] mb-12">
              <Eyebrow light>{t('compare.eyebrow')}</Eyebrow>
              <h2 className={`${H2} text-[#121212] mb-6`}>{t.rich('compare.title', { s: accent })}</h2>
              <p className="text-[16px] md:text-[17px] text-[#121212]/60 leading-[1.75]">{t('compare.intro')}</p>
            </Reveal>

            <Reveal {...FADE}>
              <CompareTable />
            </Reveal>

            <Reveal {...FADE} className="mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8">
              <p className="text-[18px] md:text-[20px] font-semibold tracking-[-0.01em] text-[#121212]">{t('compare.midLine')}</p>
              <Cta to={booking} mode="light">{t('compare.midCta')}</Cta>
            </Reveal>
          </div>
        </section>

        {/* ── WORKS WITH YOUR STACK ─────────────────────────────────── */}
        <section className="relative py-20 lg:py-28">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal {...FADE} className="max-w-[820px] mb-12">
              <Eyebrow>{t('stack.eyebrow')}</Eyebrow>
              <h2 className={`${H2} text-white/95 mb-6`}>{t.rich('stack.title', { s: accent })}</h2>
              <p className="text-[16px] md:text-[17px] text-white/60 leading-[1.75]">{t('stack.body')}</p>
            </Reveal>

            <StackFlow />

            <p className="text-[16px] md:text-[17px] text-white/60 leading-[1.75] mb-6">{t('stack.pathsLabel')}</p>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {(t.raw('stack.paths') as Card[]).map((p, i) => (
                <Reveal {...FADE} delay={i * 0.08} key={p.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <IconTile icon={PATH_ICONS[i]} mode="dark" className="mb-5" />
                  <h3 className="text-[17px] font-semibold text-white/90 mb-2">{p.title}</h3>
                  <p className="text-[15px] text-white/55 leading-[1.65]">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
        <section className="section-breathe pt-20 pb-8 lg:pt-28 lg:pb-12">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal {...FADE} className="max-w-[820px] mb-12">
              <Eyebrow light>{t('how.eyebrow')}</Eyebrow>
              <h2 className={`${H2} text-[#121212]`}>{t.rich('how.title', { s: accent })}</h2>
            </Reveal>

            <HowSteps steps={t.raw('how.steps') as Step[]} />

          </div>
        </section>

        {/* ── FIVE QUESTIONS ────────────────────────────────────────── */}
        <section className="section-breathe pt-8 pb-20 lg:pt-12 lg:pb-28">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <Reveal {...FADE} className="lg:col-span-5">
                <Eyebrow light>{t('questions.eyebrow')}</Eyebrow>
                <h2 className={`${H2} text-[#121212]`}>{t.rich('questions.title', { s: accent })}</h2>
              </Reveal>
              <div className="lg:col-span-7">
                <ol className="space-y-3">
                  {(t.raw('questions.items') as string[]).map((q, i) => (
                    <Reveal {...FADE} delay={i * 0.06} as="li" key={q} className="flex gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 md:p-6">
                      <span className="stat-value text-[20px] text-[#4B4DF7] w-6 shrink-0" style={{ lineHeight: 1.4 }}>{i + 1}</span>
                      <p className="text-[16px] text-[#121212] leading-[1.6]">{q}</p>
                    </Reveal>
                  ))}
                </ol>
                <Reveal {...FADE} className="mt-8">
                  <Cta to={booking} mode="light">{t('questions.cta')}</Cta>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section className="relative pt-24 pb-36 lg:pt-32 lg:pb-48">
          {/* The site's coloured background fades into the footer's flat black
              instead of stopping at its top edge. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 lg:h-64 bg-gradient-to-b from-transparent to-[#050508]" aria-hidden="true" />
          <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal {...FADE} className="max-w-[860px] mx-auto text-center flex flex-col items-center">
              <h2 className={`${H2} text-white/95 mb-6`}>{t.rich('final.title', { s: accent })}</h2>
              <p className="text-[16px] md:text-[18px] text-white/60 leading-[1.7] mb-10 max-w-[680px]">{t('final.body')}</p>
              <Cta to={booking} mode="dark">{t('final.cta')}</Cta>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
