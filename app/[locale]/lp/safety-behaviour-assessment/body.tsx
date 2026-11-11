'use client';

import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Award,
  Brain,
  ChartPie,
  Check,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Crosshair,
  Database,
  Equal,
  FileText,
  Files,
  GraduationCap,
  HardHat,
  LayoutDashboard,
  Layers,
  Link,
  ListChecks,
  Mail,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Mic,
  Minus,
  Monitor,
  Network,
  Presentation,
  RefreshCcw,
  Repeat,
  Smartphone,
  Tablet,
  Timer,
  Type,
  UserCheck,
  UserSearch,
  Video,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { IconTile } from '@/components/ui/icon-tile';
import { HeroCopy } from '@/components/ui/hero-copy';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import ClosingBanner from '@/components/shared/ClosingBanner';
import SafetyDonut from '@/components/landing/sba/SafetyDonut';
import ImpactPanel from '@/components/landing/sba/ImpactPanel';
import DeliveryFlow from '@/components/landing/sba/DeliveryFlow';
import UsesGrid from '@/components/landing/sba/UsesGrid';
import BalanceChart from '@/components/landing/sba/BalanceChart';
import RoleReport from '@/components/landing/sba/RoleReport';
import ScrollCue from '@/components/landing/sba/ScrollCue';
import { href } from '@/i18n/routes';
import { bookingHref } from '@/components/landing/booking-link';

// The Safety Behaviour Assessment presentation, as a page. It follows the
// deck's order (pages 19 to 21, the applied architectures, are left out) and
// says as much as it can in pictures: the cost as proportional circles, the
// three elements as the deck's donut, the formula as its chart, the pipeline
// as a line of stations. Italian only, like the deck.
const FADE = { y: 32, duration: 0.7, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' };
const IMG = '/covers/safety-behaviour-assessment';

// Structure the catalogue cannot hold: icons, in the order of their arrays in
// lp.safety-behaviour-assessment.
const ELEMENT_ICONS = [Wrench, Award, Brain];
const FIELD_ICONS = [Zap, Repeat, Timer];
const USE_ICONS = [UserSearch, ClipboardList, HardHat, GraduationCap];
const STEP_ICONS = [Network, Files, ClipboardCheck, ChartPie, Presentation];
const TOOL_ICONS = [MessagesSquare, Crosshair, Layers];
const DELIVERY_ICONS = [
  [Mail, Link, MessageCircle, MessageSquare],
  [Monitor, Tablet, Smartphone],
  [ListChecks, Type, Video, Mic],
];
const REPORT_ICONS = [LayoutDashboard, FileText, Database];
// Enablers, drifts, accelerator: green, red and blue, as in the deck.
const FACTOR_BAR = ['bg-[#16a34a]', 'bg-[#ef4444]', 'bg-[#6366F8]'];
const FACTOR_TEXT_DARK = ['text-[#22c55e]', 'text-[#ff7a7a]', 'text-[#8385FF]'];
const FACTOR_PILL = ['bg-[#16a34a]/15', 'bg-[#ef4444]/15', 'bg-[#6366F8]/15'];
const FACTOR_EFFECT_ICONS = [ArrowDown, ArrowUp, ArrowUp];
// Steps of the multi-agent pipeline that a scientist and a domain expert sign off.
const HITL_STEPS = [0, 1, 3];

type Stat = { value: string; label: string };
type Card = { title: string; body: string };
type Element = { name: string; tag: string; summary: string; callout: string; moments?: string[] };
type Phase = { label: string; title: string; body: string; badge: string; stat?: string };
type Column = { name: string; body: string; items: Card[]; effect: string };
type Term = { name: string; body: string };
type ListCard = { title: string; items: string[] };

const accent = (chunks: React.ReactNode) => <span className="gradient-text">{chunks}</span>;

const H2 = 'text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] leading-[1.1]';
const H3 = 'text-[24px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.2]';
const CARD_TITLE = 'text-[18px] md:text-[20px] font-semibold leading-snug';
const WRAP = 'max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12';
const CARD_LIGHT = 'rounded-2xl bg-white border border-black/[0.06]';
const CARD_DARK = 'rounded-2xl border border-white/[0.08] bg-white/[0.03]';
// One rhythm for every section: the same padding, and from lg up a soft floor
// of most of a screen, content centred, so a short section never reads as a
// strip between two others. Long sections simply take the height they need.
const SECTION = 'py-20 lg:py-28 lg:min-h-[80svh] lg:flex lg:flex-col lg:justify-center';

function Eyebrow({ light, children }: { light?: boolean; children: React.ReactNode }) {
  return <p className={`type-eyebrow mb-4 ${light ? 'text-[#4B4DF7]' : 'text-[#6B7DFF]'}`}>{children}</p>;
}

export default function SafetyBehaviourAssessment() {
  const t = useTranslations('lp.safety-behaviour-assessment');
  const locale = useLocale();
  const bookingUrl = href('book-meeting', locale);
  const [booking, setBooking] = useState(bookingUrl);

  useEffect(() => {
    setBooking(bookingHref(bookingUrl, window.location.search));
  }, [bookingUrl]);

  const elements = t.raw('elements.items') as Element[];
  const terms = t.raw('formula.terms') as Term[];

  return (
    <>
      <Navbar />

      <main>
        {/* ── HERO: copy left, the field photo right ─────────────────── */}
        <div className="relative flex flex-col pt-[80px] lg:min-h-[100svh]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-40 left-1/2 h-[1100px] w-[1100px] -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(75,77,247,0.18) 0%, rgba(75,77,247,0) 60%)' }} />
            <div className="absolute top-1/3 right-[-200px] h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,86,86,0.10) 0%, rgba(255,86,86,0) 60%)' }} />
          </div>

          <section className="relative z-10 flex flex-1 items-center">
          <div className={`${WRAP} w-full pt-12 pb-16 lg:py-12 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center`}>
            <div className="lg:col-span-6">
              <Reveal {...FADE} delay={0.1}><Eyebrow>{t('hero.eyebrow')}</Eyebrow></Reveal>
              <HeroCopy>
                <Reveal
                  {...FADE}
                  delay={0.2}
                  as="h1"
                  className="font-semibold text-[48px] md:text-[58px] text-white/95 mb-6"
                  style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
                >
                  {t.rich('hero.title', { s: accent })}
                </Reveal>
                <Reveal {...FADE} delay={0.3} as="p" className="type-body-lg hero-subtitle text-white/[0.65] mb-10">
                  {t('hero.sub')}
                </Reveal>
              </HeroCopy>
              <Reveal {...FADE} delay={0.4} className="flex flex-wrap gap-3">
                <Button asChild variant="primary" mode="dark">
                  <a href={booking}>
                    {t('hero.cta')}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              </Reveal>
            </div>
            <Reveal {...FADE} delay={0.3} className="lg:col-span-6">
              <img
                src={`${IMG}-hero.avif`}
                alt={t('hero.imageAlt')}
                width={1400}
                height={788}
                fetchPriority="high"
                className="w-full h-auto rounded-3xl border border-white/[0.08] object-cover"
              />
            </Reveal>
          </div>
          </section>

          <ScrollCue label={t('hero.scroll')} target="impatto" />
        </div>

        {/* ── THE SIZE OF THE PROBLEM: the deck's first slide, words and numbers as given ── */}
        <section id="impatto" className={`section-breathe ${SECTION} scroll-mt-20`}>
          <div className={WRAP}>
            <Reveal {...FADE} className="mb-12">
              <Eyebrow light>{t('impact.eyebrow')}</Eyebrow>
              <h2 className={`max-w-[880px] ${H2} text-[#121212]`}>{t.rich('impact.title', { s: accent })}</h2>
            </Reveal>
            <ImpactPanel
              italyLabel={t('impact.italyLabel')}
              costLabel={t('impact.costLabel')}
              italy={t.raw('impact.italy') as Stat[]}
              cost={t.raw('impact.cost') as Stat[]}
            />
          </div>
        </section>

        {/* ── THE THREE ELEMENTS: the donut, three cards, then the field ── */}
        <section className={`relative ${SECTION}`}>
          <div className={WRAP}>
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-14">
              <Reveal {...FADE} className="lg:col-span-7">
                <Eyebrow>{t('elements.eyebrow')}</Eyebrow>
                <h2 className={`max-w-[880px] ${H2} text-white/95 mb-6`}>{t.rich('elements.title', { s: accent })}</h2>
                <p className="max-w-[880px] type-body-lg text-white/65">{t('elements.body')}</p>
              </Reveal>
              <Reveal {...FADE} delay={0.15} className="lg:col-span-5">
                <SafetyDonut icons={ELEMENT_ICONS} active={2} className="w-full max-w-[300px] mx-auto" />
              </Reveal>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {elements.map((e, i) => {
                const focus = i === elements.length - 1;
                return (
                  <Reveal
                    {...FADE}
                    delay={i * 0.08}
                    key={e.name}
                    className={`relative flex flex-col rounded-2xl p-6 md:p-7 ${
                      focus
                        ? 'mt-5 md:mt-0 pt-10 md:pt-10 border-2 border-[#6366F8] bg-[#6366F8]/[0.14] shadow-[0_16px_56px_rgba(75,77,247,0.35)]'
                        : CARD_DARK
                    }`}
                  >
                    {/* Where Skillvue comes in: a badge riding the card's top edge. */}
                    {focus && (
                      <span className="absolute -top-4 left-5 md:left-6 inline-flex items-center gap-2 rounded-full bg-[#4B4DF7] py-1.5 pl-1.5 pr-4 shadow-[0_8px_24px_rgba(75,77,247,0.55)]">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                          <img src="/logos/skillvue-logomark.svg" alt="" width={16} height={16} loading="lazy" decoding="async" className="h-4 w-4" />
                        </span>
                        <span className="type-body-sm font-semibold text-white">{t('elements.focus')}</span>
                      </span>
                    )}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <IconTile icon={ELEMENT_ICONS[i]} mode="dark" />
                    </div>
                    <p className="type-eyebrow text-[#6B7DFF] mb-1.5">{e.tag}</p>
                    <h3 className={`${CARD_TITLE} text-white/95 mb-2`}>{e.name}</h3>
                    <p className="type-body-sm text-white/60 mb-5">{e.summary}</p>
                    <p className="mt-auto border-l-2 border-[#6366F8] pl-4 type-body text-white/90">{e.callout}</p>
                    {e.moments && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {e.moments.map((m) => (
                          <li key={m} className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1 type-caption text-white/80">{m}</li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                );
              })}
            </div>

            {/* What happens on the job: three conditions and what each does to
                behaviour, as the deck tells it on its attitudes slide. */}
            <div className="mt-20 lg:mt-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <Reveal {...FADE} className="lg:col-span-5">
                <h3 className={`${H3} text-white/95 mb-4`}>{t.rich('elements.field.title', { s: accent })}</h3>
                <p className="type-body-lg text-white/60">{t('elements.field.body')}</p>
              </Reveal>
              <ul className="lg:col-span-7 space-y-3">
                {(t.raw('elements.field.rows') as { cause: string; effect: string }[]).map((r, i) => {
                  const Icon = FIELD_ICONS[i];
                  return (
                    <Reveal
                      {...FADE}
                      delay={i * 0.08}
                      as="li"
                      key={r.cause}
                      className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.6fr)] items-center gap-2 sm:gap-4"
                    >
                      <span className="flex items-center gap-3 rounded-xl border border-[#ff7d49]/30 bg-[#ff7d49]/10 px-4 py-3">
                        <Icon className="h-5 w-5 shrink-0 text-[#ff8a5b]" aria-hidden="true" />
                        <span className="type-body-bold text-white/95">{r.cause}</span>
                      </span>
                      <ArrowRight className="hidden sm:block h-5 w-5 text-white/30" aria-hidden="true" />
                      <span className={`${CARD_DARK} px-4 py-3 type-body-sm text-white/75`}>{r.effect}</span>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* ── THE MODEL: two phases, one leading to the other ────────── */}
        <section className={`section-breathe ${SECTION}`}>
          <div className={WRAP}>
            <Reveal {...FADE} className="mb-12">
              <Eyebrow light>{t('model.eyebrow')}</Eyebrow>
              <h2 className={`max-w-[880px] ${H2} text-[#121212]`}>{t.rich('model.title', { s: accent })}</h2>
            </Reveal>
            <div className="grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4 md:gap-6 items-stretch">
              {(t.raw('model.phases') as Phase[]).map((p, i) => (
                <React.Fragment key={p.label}>
                  {i > 0 && (
                    <span className="flex items-center justify-center" aria-hidden="true">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B4DF7] text-white">
                        <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
                      </span>
                    </span>
                  )}
                  <Reveal {...FADE} delay={i * 0.1} className={`flex flex-col ${CARD_LIGHT} p-6 md:p-8`}>
                    <span className="self-start rounded-full bg-[#4B4DF7] px-3 py-0.5 type-eyebrow text-white mb-5">{p.label}</span>
                    <h3 className={`${CARD_TITLE} text-[#121212] mb-4`}>{p.title}</h3>
                    {p.stat ? (
                      <div className="flex items-start gap-4 mb-6">
                        <span className="stat-value text-[32px] md:text-[54px] text-[#4B4DF7]" style={{ lineHeight: 1 }}>{p.stat}</span>
                        <p className="type-body text-[#121212]/70 pt-1">{p.body}</p>
                      </div>
                    ) : (
                      <p className="type-body text-[#121212]/70 mb-6">{p.body}</p>
                    )}
                    {i === 0 ? (
                      <p className="mt-auto flex items-center justify-center gap-2 rounded-full border border-[#4B4DF7]/25 bg-[#efeefb] px-4 py-2.5 type-body-sm font-medium text-[#121212]">
                        <GraduationCap className="h-4 w-4 shrink-0 text-[#4B4DF7]" aria-hidden="true" />
                        {p.badge}
                      </p>
                    ) : (
                      <p className="mt-auto flex items-center justify-center gap-2 rounded-full border border-[#a8ecca] bg-[#e3f9ec] px-4 py-2.5 type-body-sm font-medium text-[#047857]">
                        <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                        {p.badge}
                      </p>
                    )}
                  </Reveal>
                </React.Fragment>
              ))}
            </div>
            <Reveal {...FADE} className="mt-6 rounded-2xl bg-[#efeefb] px-6 py-4 text-center">
              <p className="type-body-lg font-medium text-[#121212]">{t('model.note')}</p>
            </Reveal>
          </div>
        </section>

        {/* ── THE FRAMEWORK: enablers, drifts, accelerator; each behaviour opens ── */}
        <section className={`relative ${SECTION}`}>
          <div className={WRAP}>
            <Reveal {...FADE} className="mb-12">
              <Eyebrow>{t('framework.eyebrow')}</Eyebrow>
              <h2 className={`max-w-[880px] ${H2} text-white/95 mb-6`}>{t.rich('framework.title', { s: accent })}</h2>
              <p className="max-w-[880px] type-body-lg text-white/60">{t('framework.intro')}</p>
            </Reveal>
            <div className="grid lg:grid-cols-3 gap-4 md:gap-6 items-start">
              {(t.raw('framework.columns') as Column[]).map((c, i) => {
                const Effect = FACTOR_EFFECT_ICONS[i];
                return (
                  <Reveal {...FADE} delay={i * 0.08} key={c.name} className={`${CARD_DARK} overflow-hidden`}>
                    <span className={`block h-1 w-full ${FACTOR_BAR[i]}`} aria-hidden="true" />
                    <div className="p-6 md:p-7">
                      <h3 className={`${CARD_TITLE} ${FACTOR_TEXT_DARK[i]} mb-2`}>{c.name}</h3>
                      <p className="type-body-sm text-white/60 mb-5">{c.body}</p>
                      {/* <details> rather than state: the descriptions stay in
                          the HTML for search engines whether or not they open. */}
                      <ul className="space-y-2 mb-5">
                        {c.items.map((item) => (
                          <li key={item.title}>
                            <details className="group rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                                <span className="type-body-bold text-white/90">{item.title}</span>
                                <ChevronDown className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                              </summary>
                              <p className="mt-2 type-body-sm text-white/60">{item.body}</p>
                            </details>
                          </li>
                        ))}
                      </ul>
                      <p className={`flex items-center gap-2 rounded-xl px-4 py-3 type-body-sm font-medium ${FACTOR_PILL[i]} ${FACTOR_TEXT_DARK[i]}`}>
                        <Effect className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {c.effect}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal {...FADE} className="mt-6">
              <p className="type-body-sm text-white/40">{t('framework.hint')}</p>
            </Reveal>
          </div>
        </section>

        {/* ── THE FORMULA: the equation, then the chart and the score ─── */}
        <section className={`section-breathe ${SECTION}`}>
          <div className={WRAP}>
            <Reveal {...FADE} className="mb-12">
              <Eyebrow light>{t('formula.eyebrow')}</Eyebrow>
              <h2 className={`max-w-[880px] ${H2} text-[#121212]`}>{t.rich('formula.title', { s: accent })}</h2>
            </Reveal>

            {/* ( enablers − drifts ) × accelerator = propensity */}
            <Reveal {...FADE} className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-3">
              {terms.map((term, i) => {
                const Op = i === 0 ? Minus : X;
                return (
                  <React.Fragment key={term.name}>
                    <div className={`${CARD_LIGHT} overflow-hidden`}>
                      <span className={`block h-1 w-full ${FACTOR_BAR[i]}`} aria-hidden="true" />
                      <div className="p-5">
                        <p className="type-body-bold text-[#121212] mb-1.5">{term.name}</p>
                        <p className="type-body-sm text-[#121212]/60">{term.body}</p>
                      </div>
                    </div>
                    {i < terms.length - 1 && (
                      <span className="flex items-center justify-center" aria-hidden="true">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white">
                          <Op className="h-4 w-4 text-[#121212]/60" strokeWidth={2.5} />
                        </span>
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
              <span className="flex items-center justify-center" aria-hidden="true">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4B4DF7]">
                  <Equal className="h-4 w-4 text-white" strokeWidth={2.5} />
                </span>
              </span>
              <div className="rounded-2xl bg-[#4B4DF7] p-5 text-white shadow-[0_12px_40px_rgba(75,77,247,0.20)]">
                <UserCheck className="h-6 w-6 mb-3" strokeWidth={1.5} aria-hidden="true" />
                <p className="type-body-bold mb-1.5">{t('formula.result')}</p>
                <p className="type-body-sm text-white/80">{t('formula.resultBody')}</p>
              </div>
            </Reveal>

            {/* How it reads: the mechanism on the left, the score it lands on on the right. */}
            <Reveal {...FADE} className={`mt-6 ${CARD_LIGHT} p-6 md:p-8`}>
              <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.02em] text-[#121212] mb-6">{t('formula.howTitle')}</h3>
              <BalanceChart
                enablers={terms[0].name}
                drifts={terms[1].name}
                accelerator={terms[2].name}
                scaleLabel={t('formula.scaleLabel')}
                scale={t.raw('formula.scale') as string[]}
              />
            </Reveal>
          </div>
        </section>

        {/* ── WHERE IT IS USED: four uses, each with its sketch ──────────────────────────── */}
        <section className={`relative ${SECTION}`}>
          <div className={WRAP}>
            <Reveal {...FADE} className="mb-12">
              <Eyebrow>{t('uses.eyebrow')}</Eyebrow>
              <h2 className={`max-w-[880px] ${H2} text-white/95`}>{t.rich('uses.title', { s: accent })}</h2>
            </Reveal>
            <Reveal {...FADE}>
              <UsesGrid cards={t.raw('uses.cards') as Card[]} icons={USE_ICONS} />
            </Reveal>
          </div>
        </section>

        {/* ── THE MULTI-AGENT SYSTEM: five stations on one line ─────── */}
        <section className={`section-breathe ${SECTION}`}>
          <div className={WRAP}>
            <Reveal {...FADE} className="mb-14">
              <Eyebrow light>{t('agents.eyebrow')}</Eyebrow>
              <h2 className={`max-w-[880px] ${H2} text-[#121212]`}>{t.rich('agents.title', { s: accent })}</h2>
            </Reveal>

            <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-4">
              <span className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-1 rounded-full bg-[#8385FF]/50 lg:block" aria-hidden="true" />
              <span className="pointer-events-none absolute left-7 top-7 bottom-7 w-1 -translate-x-1/2 rounded-full bg-[#8385FF]/40 lg:hidden" aria-hidden="true" />
              {(t.raw('agents.steps') as Card[]).map((s, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <Reveal
                    {...FADE}
                    delay={i * 0.06}
                    as="li"
                    key={s.title}
                    className="relative grid grid-cols-[56px_minmax(0,1fr)] gap-4 lg:flex lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                  >
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#4B4DF7] text-white shadow-[0_8px_24px_rgba(75,77,247,0.30)]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="lg:mt-5">
                      <span className="type-caption font-semibold text-[#4B4DF7]">0{i + 1}</span>
                      <h3 className={`${CARD_TITLE} text-[#121212] mt-1 mb-2 lg:min-h-[2.75em]`}>{s.title}</h3>
                      <p className="type-body-sm text-[#121212]/60">{s.body}</p>
                      {HITL_STEPS.includes(i) && (
                        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#d9daff] px-3 py-1 type-caption font-medium text-[#121212]">
                          <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" />
                          {t('agents.hitl')}
                        </p>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </ol>
            <Reveal {...FADE} className="mt-10 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 type-body-sm text-[#121212]/60">
                <RefreshCcw className="h-4 w-4 text-[#4B4DF7]" aria-hidden="true" />
                {t('agents.hitl')}:
              </span>
              {(t.raw('agents.hitlRoles') as string[]).map((r) => (
                <span key={r} className="rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-0.5 type-caption text-[#4B4B4B]">{r}</span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── THE TOOL: features left, the assessment on two devices ── */}
        <section className={`relative ${SECTION}`}>
          <div className={`${WRAP} grid lg:grid-cols-12 gap-12 lg:gap-16 items-center`}>
            <div className="lg:col-span-5">
              <Reveal {...FADE} className="mb-10">
                <Eyebrow>{t('tool.eyebrow')}</Eyebrow>
                <h2 className={`max-w-[880px] ${H2} text-white/95`}>{t.rich('tool.title', { s: accent })}</h2>
              </Reveal>
              <ul className="space-y-5">
                {(t.raw('tool.features') as Card[]).map((f, i) => (
                  <Reveal {...FADE} delay={i * 0.08} as="li" key={f.title} className="flex items-center gap-4">
                    <IconTile icon={TOOL_ICONS[i]} mode="dark" />
                    <div>
                      <h3 className="type-body-bold text-white/95">{f.title}</h3>
                      <p className="type-body-sm text-white/60">{f.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
            <Reveal {...FADE} delay={0.15} className="lg:col-span-7">
              <img
                src={`${IMG}-devices.avif`}
                alt={t('tool.imageAlt')}
                width={1200}
                height={772}
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
              />
            </Reveal>
          </div>
        </section>

        {/* ── DELIVERY: invite, device, format, as one journey ────────── */}
        <section className={`section-breathe ${SECTION}`}>
          <div className={WRAP}>
            <Reveal {...FADE} className="mb-12">
              <Eyebrow light>{t('delivery.eyebrow')}</Eyebrow>
              <h2 className={`max-w-[880px] ${H2} text-[#121212]`}>{t.rich('delivery.title', { s: accent })}</h2>
            </Reveal>
            <Reveal {...FADE}>
              <DeliveryFlow groups={t.raw('delivery.groups') as ListCard[]} icons={DELIVERY_ICONS} />
            </Reveal>
            <Reveal {...FADE} className="mt-6 rounded-2xl bg-[#efeefb] px-6 py-4 text-center">
              <p className="type-body-lg font-medium text-[#121212]">{t('delivery.note')}</p>
            </Reveal>
          </div>
        </section>

        {/* ── REPORTING: the outputs, then the report read against a role ── */}
        <section className={`relative ${SECTION}`}>
          <div className={WRAP}>
            <Reveal {...FADE} className="mb-12">
              <Eyebrow>{t('reporting.eyebrow')}</Eyebrow>
              <h2 className={`max-w-[880px] ${H2} text-white/95`}>{t.rich('reporting.title', { s: accent })}</h2>
            </Reveal>
            <div>
              <ul className="grid md:grid-cols-3 gap-4 md:gap-6">
                {(t.raw('reporting.cards') as Card[]).map((c, i) => (
                  <Reveal {...FADE} delay={i * 0.08} as="li" key={c.title} className={`flex items-center gap-4 ${CARD_DARK} p-5`}>
                    <IconTile icon={REPORT_ICONS[i]} mode="dark" />
                    <div>
                      <h3 className="type-body-bold text-white/95">{c.title}</h3>
                      <p className="type-body-sm text-white/60">{c.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal {...FADE} className="mt-10 lg:mt-12">
              <RoleReport />
            </Reveal>
          </div>
        </section>

        <ClosingBanner heading={t.rich('final.title', { s: accent })} body={t('final.body')} cta={t('final.cta')} />
      </main>

      <Footer />
    </>
  );
}
