'use client';

// The retail demo dashboard.
//
// A client component for two reasons: the cut selector is state, and the chart
// wrapper is loaded with `ssr: false`, which is only legal inside the client
// graph. Every number comes from data/demo/retail.ts — aggregates computed once
// outside this repository — and every word comes from messages/{en,it}.json.
// Nothing on this page is a store, a person or a record.
//
// What it deliberately does NOT say: that competency explains revenue. On this
// network it does not (r = 0.08 across the stores, 0.06 across the people), and
// the `map` section puts both coefficients on screen rather than leaving them
// out. A prospect who can read a scatter would find them in ten seconds anyway.

import { useMemo, useState, type ReactNode } from 'react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Reveal } from '@/components/ui/reveal';
import DemoView from '@/components/demo/DemoView';
import Chart from '@/components/demo/charts/Chart';
import { retail } from '@/data/demo/retail';
import { href } from '@/i18n/routes';

/** One row of a cut, flattened out of the three shapes the data holds it in. */
type Group = {
  id: string;
  n: number;
  stores: number;
  aboveThresholdPct: number;
  conversionRate: number;
  /** Context cuts only: the areas are published as headcount and result. */
  skill?: number;
  areas?: Record<string, number>;
  unitsPerTicket?: number;
  averageTicket?: number;
  salesPerHour?: number;
  visitsPerDay?: number;
  turnoverPct?: number;
};

const asGroups = (source: Record<string, any>): Group[] =>
  Object.entries(source).map(([id, g]) => ({ id, ...g }));

// The four cuts, each an ordered list of groups. `area` is the odd one: it
// carries no competency breakdown, so the radar below is skipped for it rather
// than drawn from nothing.
const CUTS: Record<string, Group[]> = {
  channel: asGroups(retail.context.channel),
  location: asGroups(retail.context.location),
  tier: asGroups(retail.context.tier),
  area: asGroups(retail.areas),
};
const CUT_IDS = ['channel', 'location', 'tier', 'area'];

// Structure the catalogue cannot hold: the order the keys are drawn in. The
// labels for all of them live under `demo.retail` in messages/.
const SKILLS = [
  'customerSalesExcellence',
  'brandStorytelling',
  'collaborationTeamContribution',
  'agilityExecution',
  'productKnowledge',
];
const SEGMENTS = [
  'benchmark',
  'resultWithoutMethod',
  'skillWithoutResult',
  'priorityDevelopment',
  'toActivate',
];
const SENIORITY = ['lt3m', 'm3to12', 'y1to2', 'y2to5', 'y5to10', 'y10to20', 'gt20'];

// Which KPIs a group card shows, and where each one is read from. A group that
// does not carry one simply does not render the row — the area cut has four of
// these, the context cuts have all ten.
// `digits` is fixed rather than maximum: a conversion rate of 11.21 rounded to
// one place is a different number from the 11.2 next to it, and a relative
// index printed as `1` instead of `1.00` reads as a rounding artefact.
const KPIS: Array<{
  id: string;
  read: (g: Group) => number | undefined;
  digits: number;
  unit?: 'pct' | 'eur';
}> = [
  { id: 'people', read: (g) => g.n, digits: 0 },
  { id: 'stores', read: (g) => g.stores, digits: 0 },
  { id: 'skill', read: (g) => g.skill, digits: 1 },
  { id: 'aboveThreshold', read: (g) => g.aboveThresholdPct, digits: 1, unit: 'pct' },
  { id: 'conversionRate', read: (g) => g.conversionRate, digits: 2, unit: 'pct' },
  { id: 'unitsPerTicket', read: (g) => g.unitsPerTicket, digits: 2 },
  { id: 'averageTicket', read: (g) => g.averageTicket, digits: 2, unit: 'eur' },
  { id: 'salesPerHour', read: (g) => g.salesPerHour, digits: 1 },
  { id: 'visitsPerDay', read: (g) => g.visitsPerDay, digits: 0 },
  { id: 'turnover', read: (g) => g.turnoverPct, digits: 1, unit: 'pct' },
];

// Every hex here is already in the ALLOWED list of scripts/check-colors.mjs:
// the dashboards reuse the brand palette rather than opening a second one.
const SERIES = ['#4B4DF7', '#FFAF64', '#5DDBA4', '#8A8CFF', '#FF5656'];
const FILLS = [
  'rgba(75,77,247,0.16)',
  'rgba(255,175,100,0.16)',
  'rgba(93,219,164,0.16)',
];

const GRID = 'rgba(255,255,255,0.06)';
const TICK = 'rgba(255,255,255,0.45)';
const AXIS = { grid: { color: GRID }, ticks: { color: TICK } };
const LEGEND = {
  labels: { color: 'rgba(255,255,255,0.6)', usePointStyle: true, boxWidth: 8, padding: 16 },
};
const axisTitle = (text: string) => ({ display: true, text, color: TICK });

/** The recurring card. Local, because nothing outside this page has a second use for it. */
function Panel({
  title,
  body,
  note,
  children,
}: {
  title: string;
  body?: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <Reveal
      as="section"
      y={20}
      duration={0.6}
      className="rounded-xl md:rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 md:p-10"
    >
      <h2 className="text-[24px] md:text-[32px] font-semibold text-white/90 mb-3">{title}</h2>
      {body ? (
        <p className="text-[15px] text-white/[0.55] leading-[1.7] max-w-3xl mb-8">{body}</p>
      ) : null}
      {children}
      {note ? (
        <p className="text-[13px] text-white/40 leading-[1.7] max-w-3xl mt-6">{note}</p>
      ) : null}
    </Reveal>
  );
}

export default function RetailDemo() {
  const lang = useLocale();
  const t = useTranslations('demo.retail');
  const format = useFormatter();
  const [cut, setCut] = useState('channel');

  // Every number on the page goes through here, including the ones handed to a
  // message as an ICU argument: next-intl interpolates a numeric argument
  // as-is, so `{above}` would print "20.5" on the Italian page next to the
  // "20,5%" of the stat card right above it. Formatting first and passing the
  // string is what keeps the two agreeing.
  const n = (value: number, digits = 1) =>
    format.number(value, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const eur = (value: number) =>
    format.number(value, { style: 'currency', currency: 'EUR' });

  const groups = CUTS[cut];
  const groupName = (id: string) => t(`cuts.groups.${cut}.${id}`);
  const hasSkillProfile = groups.every((g) => g.areas !== undefined);

  // ChartCanvas compares its config by identity, so a config rebuilt on every
  // render rebuilds the chart on every render. These five do not depend on the
  // selected cut; the three below do.
  const fixed = useMemo(() => {
    const { binWidth, distribution } = retail.skillDistribution;
    const { topVsRest, correlations } = retail;

    return {
      distribution: {
        data: {
          labels: distribution.map((_, i) => `${i * binWidth}–${(i + 1) * binWidth}`),
          datasets: [
            {
              label: t('distribution.series'),
              data: [...distribution],
              backgroundColor: SERIES[0],
              hoverBackgroundColor: '#7B7DF9',
              borderRadius: 4,
            },
          ],
        },
        options: {
          locale: lang,
          plugins: { legend: { display: false } },
          scales: {
            x: { ...AXIS, grid: { display: false }, title: axisTitle(t('distribution.axisScore')) },
            y: { ...AXIS, beginAtZero: true, title: axisTitle(t('distribution.axisShare')) },
          },
        },
      },

      map: {
        data: {
          datasets: CUT_IDS.map((id, i) => ({
            label: t(`cuts.options.${id}`),
            data: CUTS[id].map((g) => ({ x: g.aboveThresholdPct, y: g.conversionRate })),
            backgroundColor: SERIES[i],
            pointRadius: 7,
            pointHoverRadius: 9,
          })),
        },
        options: {
          locale: lang,
          plugins: { legend: { ...LEGEND, position: 'bottom' as const } },
          scales: {
            x: { ...AXIS, title: axisTitle(t('map.axisX')) },
            y: { ...AXIS, title: axisTitle(t('map.axisY')) },
          },
        },
      },

      segments: {
        data: {
          labels: CUTS.area.map((g) => t(`cuts.groups.area.${g.id}`)),
          datasets: SEGMENTS.map((s, i) => ({
            label: t(`segments.items.${s}.name`),
            data: CUTS.area.map((g) => (g as any).segments[s]),
            backgroundColor: SERIES[i],
            borderRadius: 2,
          })),
        },
        options: {
          locale: lang,
          indexAxis: 'y' as const,
          plugins: { legend: { ...LEGEND, position: 'bottom' as const } },
          scales: {
            x: { ...AXIS, stacked: true, min: 0, max: 100, title: axisTitle(t('segments.chart.axis')) },
            y: { ...AXIS, stacked: true, grid: { display: false } },
          },
        },
      },

      top: {
        data: {
          labels: SKILLS.map((s) => t(`skills.${s}`)),
          datasets: (['top', 'rest'] as const).map((band, i) => ({
            label: t(`top.series.${band}`),
            data: SKILLS.map((s) => topVsRest.areas[s][band]),
            backgroundColor: SERIES[i],
            borderRadius: 4,
          })),
        },
        options: {
          locale: lang,
          plugins: { legend: { ...LEGEND, position: 'bottom' as const } },
          // Zero-based on purpose. The whole point of this chart is that the
          // competency gap is small; a truncated axis would draw it as large.
          scales: {
            x: { ...AXIS, grid: { display: false } },
            y: { ...AXIS, beginAtZero: true, max: 50 },
          },
        },
      },

      // Two charts rather than one with two y axes. On a shared plot the two
      // series land on top of each other — 28-33 on a 0-40 axis and 0.87-1.06
      // on a 0-1.2 axis are the same three-quarters of the height — and the
      // reader cannot tell which line is which, let alone that one of them is
      // flat. Side by side, on the same seven bands, the shapes are the
      // comparison.
      seniority: (['skill', 'relativeSph'] as const).map((series, i) => ({
        series,
        data: {
          labels: SENIORITY.map((b) => t(`seniority.buckets.${b}`)),
          datasets: [
            {
              label: t(`seniority.series.${series}`),
              data: SENIORITY.map((b) => retail.seniority[b][series]),
              borderColor: SERIES[i],
              backgroundColor: SERIES[i],
              tension: 0.3,
            },
          ],
        },
        options: {
          locale: lang,
          plugins: { legend: { display: false } },
          scales: {
            x: { ...AXIS, grid: { display: false } },
            // Zero-based, both of them. A truncated axis would draw the flat
            // series as a slope, which is the claim this section refuses.
            y: {
              ...AXIS,
              min: 0,
              max: series === 'skill' ? 40 : 1.2,
              title: axisTitle(t(series === 'skill' ? 'seniority.axisSkill' : 'seniority.axisSph')),
            },
          },
        },
      })),

      correlations,
      topVsRest,
    };
  }, [t, lang]);

  const perCut = useMemo(
    () => ({
      skills: {
        data: {
          labels: SKILLS.map((s) => t(`skills.${s}`)),
          datasets: groups.map((g, i) => ({
            label: groupName(g.id),
            data: SKILLS.map((s) => g.areas?.[s] ?? null),
            borderColor: SERIES[i],
            backgroundColor: FILLS[i % FILLS.length],
            pointBackgroundColor: SERIES[i],
            borderWidth: 2,
          })),
        },
        options: {
          locale: lang,
          plugins: { legend: { ...LEGEND, position: 'bottom' as const } },
          scales: {
            r: {
              min: 0,
              max: 50,
              grid: { color: GRID },
              angleLines: { color: GRID },
              ticks: { color: TICK, backdropColor: 'transparent', stepSize: 10 },
              pointLabels: { color: 'rgba(255,255,255,0.7)', font: { size: 11 } },
            },
          },
        },
      },

      results: {
        data: {
          labels: groups.map((g) => groupName(g.id)),
          datasets: [
            {
              label: t('cuts.labels.aboveThreshold'),
              data: groups.map((g) => g.aboveThresholdPct),
              backgroundColor: SERIES[0],
              borderRadius: 4,
              maxBarThickness: 56,
            },
            {
              label: t('cuts.labels.conversionRate'),
              data: groups.map((g) => g.conversionRate),
              backgroundColor: SERIES[1],
              borderRadius: 4,
              maxBarThickness: 56,
            },
          ],
        },
        options: {
          locale: lang,
          plugins: { legend: { ...LEGEND, position: 'bottom' as const } },
          scales: {
            x: { ...AXIS, grid: { display: false } },
            y: { ...AXIS, beginAtZero: true, title: axisTitle(t('cuts.results.axis')) },
          },
        },
      },
    }),
    // `cut` is what `groups` and `groupName` are derived from, so it is the
    // dependency; listing the derivations as well would say the same thing twice.
    [t, lang, cut],
  );

  const headline: Array<{ id: string; value: string; args: Record<string, string> }> = [
    {
      id: 'advisors',
      value: n(retail.population.salesAdvisors, 0),
      args: { managers: n(retail.population.storeManagers, 0) },
    },
    {
      id: 'stores',
      value: n(retail.population.stores, 0),
      args: { outlets: n(retail.population.outlets, 0) },
    },
    {
      id: 'aboveThreshold',
      value: `${n(retail.overview.aboveThresholdPct)}%`,
      args: { threshold: n(retail.overview.threshold, 0) },
    },
    { id: 'conversion', value: `${n(retail.overview.conversionRate, 2)}%`, args: {} },
  ];

  return (
    <>
      <DemoView slug="retail" />
      <Navbar />
      <main>
        <section className="relative pt-[80px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-20 lg:py-24">
            <Reveal
              as="p"
              y={20}
              duration={0.6}
              className="text-[13px] font-semibold tracking-[0.18em] uppercase text-white/40 mb-6"
            >
              {t('hero.eyebrow')}
            </Reveal>
            <Reveal
              as="h1"
              y={40}
              duration={0.8}
              delay={0.1}
              className="text-[40px] md:text-[56px] font-semibold tracking-[-0.02em] text-white/95 mb-8 max-w-4xl"
              style={{ lineHeight: 1.15 }}
            >
              {t.rich('hero.heading', {
                span: (chunks) => <span className="font-bold gradient-text">{chunks}</span>,
              })}
            </Reveal>
            <Reveal
              as="p"
              y={20}
              duration={0.8}
              delay={0.2}
              className="text-[18px] text-white/[0.65] leading-[1.75] max-w-3xl mb-8"
              style={{ fontWeight: 300 }}
            >
              {t('hero.body')}
            </Reveal>
            <Reveal
              as="p"
              y={20}
              duration={0.6}
              delay={0.3}
              className="text-[14px] text-white/40 leading-[1.7] max-w-2xl"
            >
              {t('hero.note')}
            </Reveal>
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 pb-24 lg:pb-32 flex flex-col gap-4 md:gap-6">
          <Panel title={t('population.heading')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {headline.map((s) => (
                <div key={s.id}>
                  <span
                    className="block text-white stat-value text-[32px] md:text-[44px] mb-2"
                    style={{ lineHeight: 1, letterSpacing: '-0.03em' }}
                  >
                    {s.value}
                  </span>
                  <span className="block text-[14px] font-semibold text-white/80 mb-2">
                    {t(`population.${s.id}.label`)}
                  </span>
                  <span className="block text-[13px] text-white/40 leading-[1.7]">
                    {t(`population.${s.id}.note`, s.args)}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title={t('distribution.heading')}
            body={t('distribution.body')}
            note={t('distribution.caption', {
              above: n(retail.overview.aboveThresholdPct),
              threshold: n(retail.overview.threshold, 0),
            })}
          >
            <Chart
              className="h-[280px] md:h-[360px]"
              type="bar"
              ariaLabel={t('distribution.ariaLabel')}
              data={fixed.distribution.data}
              options={fixed.distribution.options}
            />
          </Panel>

          <Panel title={t('cuts.heading')} body={t('cuts.body')}>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/35 mr-2">
                {t('cuts.label')}
              </span>
              {CUT_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={cut === id}
                  onClick={() => setCut(id)}
                  className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    cut === id
                      ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                      : 'text-white/40 border border-transparent hover:text-white/70'
                  }`}
                >
                  {t(`cuts.options.${id}`)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              <div>
                <h3 className="text-[17px] font-semibold text-white/85 mb-4">
                  {t('cuts.skills.heading')}
                </h3>
                {hasSkillProfile ? (
                  <Chart
                    className="h-[300px] md:h-[380px]"
                    type="radar"
                    ariaLabel={t('cuts.skills.ariaLabel')}
                    data={perCut.skills.data}
                    options={perCut.skills.options}
                  />
                ) : (
                  <p className="text-[14px] text-white/45 leading-[1.7] h-[300px] md:h-[380px] flex items-center">
                    {t('cuts.skills.unavailable')}
                  </p>
                )}
                <p className="text-[13px] text-white/40 leading-[1.7] mt-4">
                  {t('cuts.skills.caption')}
                </p>
              </div>

              <div>
                <h3 className="text-[17px] font-semibold text-white/85 mb-4">
                  {t('cuts.results.heading')}
                </h3>
                <Chart
                  className="h-[300px] md:h-[380px]"
                  type="bar"
                  ariaLabel={t('cuts.results.ariaLabel')}
                  data={perCut.results.data}
                  options={perCut.results.options}
                />
                <p className="text-[13px] text-white/40 leading-[1.7] mt-4">
                  {t('cuts.results.caption')}
                </p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white/85 mt-10 mb-4">
              {t('cuts.kpis.heading')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map((g) => (
                <div key={g.id} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <span className="block text-[14px] font-semibold text-white/85 mb-4">
                    {groupName(g.id)}
                  </span>
                  <dl className="flex flex-col gap-2">
                    {KPIS.filter((k) => k.read(g) !== undefined).map((k) => {
                      const value = k.read(g) as number;
                      return (
                        <div key={k.id} className="flex items-baseline justify-between gap-4">
                          <dt className="text-[13px] text-white/45">{t(`cuts.labels.${k.id}`)}</dt>
                          <dd className="text-[14px] font-semibold text-white/85 tabular-nums">
                            {k.unit === 'eur'
                              ? eur(value)
                              : k.unit === 'pct'
                                ? `${n(value, k.digits)}%`
                                : n(value, k.digits)}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-white/40 leading-[1.7] mt-6">
              {t('cuts.kpis.caption')} {cut === 'area' ? t('cuts.areaNote') : null}
            </p>
          </Panel>

          <Panel title={t('map.heading')} body={t('map.body')} note={t('map.caption')}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              <div className="lg:col-span-2">
                <Chart
                  className="h-[300px] md:h-[400px]"
                  type="scatter"
                  ariaLabel={t('map.ariaLabel')}
                  data={fixed.map.data}
                  options={fixed.map.options}
                />
              </div>
              <div className="flex flex-col justify-center gap-8">
                {[
                  { id: 'stores', r: fixed.correlations.storeSkillToConversion, count: fixed.correlations.nStores },
                  { id: 'people', r: fixed.correlations.individualSkillToSales, count: fixed.correlations.nIndividuals },
                ].map((c) => (
                  <div key={c.id}>
                    <span
                      className="block text-white stat-value text-[32px] md:text-[44px] mb-2"
                      style={{ lineHeight: 1, letterSpacing: '-0.03em' }}
                    >
                      {n(c.r, 2)}
                    </span>
                    <span className="block text-[14px] font-semibold text-white/80 mb-2">
                      {t(`map.${c.id}.label`)}
                    </span>
                    <span className="block text-[13px] text-white/40 leading-[1.7]">
                      {t(`map.${c.id}.note`, { n: n(c.count, 0) })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel title={t('segments.heading')} body={t('segments.body')}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-10">
              {SEGMENTS.map((s, i) => (
                <div key={s} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <span
                    className="block h-1 w-8 rounded-full mb-4"
                    style={{ backgroundColor: SERIES[i] }}
                  />
                  <span className="block text-[15px] font-semibold text-white/90 mb-1">
                    {t(`segments.items.${s}.name`)}
                  </span>
                  <span className="block text-[13px] text-white/45 mb-4">
                    {n(retail.segments[s])}% {t('segments.share')}
                  </span>
                  <p className="text-[13px] text-white/[0.55] leading-[1.7] mb-3">
                    {t(`segments.items.${s}.description`)}
                  </p>
                  <p className="text-[13px] text-white/[0.75] leading-[1.7]">
                    {t(`segments.items.${s}.action`)}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-[17px] font-semibold text-white/85 mb-4">
              {t('segments.chart.heading')}
            </h3>
            <Chart
              className="h-[300px] md:h-[360px]"
              type="bar"
              ariaLabel={t('segments.chart.ariaLabel')}
              data={fixed.segments.data}
              options={fixed.segments.options}
            />
            <p className="text-[13px] text-white/40 leading-[1.7] mt-6">
              {t('segments.chart.caption')} {t('cuts.areaNote')}
            </p>
          </Panel>

          <Panel
            title={t('top.heading')}
            body={t('top.body', { n: n(fixed.topVsRest.n, 0) })}
            note={t('top.caveat', {
              top: n(fixed.topVsRest.skill.top),
              rest: n(fixed.topVsRest.skill.rest),
              p: n(fixed.topVsRest.skillPValue, 3),
            })}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-10">
              {[
                { id: 'salesPerHour', band: fixed.topVsRest.salesPerHour, digits: 1 },
                { id: 'aboveThreshold', band: fixed.topVsRest.aboveThresholdPct, digits: 1 },
                { id: 'relativeSph', band: fixed.topVsRest.relativeSph, digits: 2 },
              ].map((s) => (
                <div key={s.id}>
                  <span
                    className="block text-white stat-value text-[32px] md:text-[44px] mb-2"
                    style={{ lineHeight: 1, letterSpacing: '-0.03em' }}
                  >
                    {n(s.band.top, s.digits)}
                  </span>
                  <span className="block text-[14px] font-semibold text-white/80 mb-2">
                    {t(`top.stats.${s.id}`)}
                  </span>
                  <span className="block text-[13px] text-white/40">
                    {t('top.series.rest')} · {n(s.band.rest, s.digits)}
                  </span>
                </div>
              ))}
            </div>

            <Chart
              className="h-[300px] md:h-[380px]"
              type="bar"
              ariaLabel={t('top.ariaLabel')}
              data={fixed.top.data}
              options={fixed.top.options}
            />
            <p className="text-[13px] text-white/40 leading-[1.7] mt-6">{t('top.caption')}</p>
          </Panel>

          <Panel
            title={t('seniority.heading')}
            body={t('seniority.body')}
            note={t('seniority.caption', {
              skill: n(fixed.correlations.seniorityToSkill, 2),
              kpi: n(fixed.correlations.seniorityToKpi, 2),
            })}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {fixed.seniority.map((chart) => (
                <div key={chart.series}>
                  <h3 className="text-[17px] font-semibold text-white/85 mb-4">
                    {t(`seniority.series.${chart.series}`)}
                  </h3>
                  <Chart
                    className="h-[280px] md:h-[340px]"
                    type="line"
                    ariaLabel={t(
                      chart.series === 'skill'
                        ? 'seniority.skillChart.ariaLabel'
                        : 'seniority.sphChart.ariaLabel',
                    )}
                    data={chart.data}
                    options={chart.options}
                  />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={t('closing.heading')} body={t('closing.body')}>
            <a
              href={href('demo', lang)}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2 text-[13px] font-semibold text-white/70 transition-colors duration-300 hover:text-white hover:border-white/[0.25]"
            >
              {t('closing.back')}
            </a>
          </Panel>
        </div>
      </main>
      <Footer />
    </>
  );
}
