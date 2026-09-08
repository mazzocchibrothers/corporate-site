'use client';

// The cross-country demo dashboard.
//
// Same construction as the other two: numbers from data/demo/cross-country.ts,
// words from messages/ under demo.cross-country, charts from the one wrapper.
//
// Two things this page does not draw.
//
// 1. No radar comparing two groups. The Acceptance asks for one, and the
//    extract cannot carry it: `countryGroups` holds a headcount and a skill
//    matching mean per group and nothing else, so there are no axes to put a
//    radar on. A one-dimensional radar is a bar chart wearing a costume, and
//    the bar chart says the same thing without implying the extract has a
//    per-group competency profile in it. The group selector went with it —
//    a control that redraws nothing is worse than no control.
//
// 2. No reading built on `skillMatching.min` or `max`. Those are two
//    individuals' scores rather than group statistics, so a "top performer"
//    framing on them would be an individual record with a label on it. The
//    section works off `distribution` and `median`.

import { useMemo, useState, type ReactNode } from 'react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Reveal } from '@/components/ui/reveal';
import DemoView from '@/components/demo/DemoView';
import Chart from '@/components/demo/charts/Chart';
import { crossCountry } from '@/data/demo/cross-country';
import { href } from '@/i18n/routes';

const FRAMES = ['competencies', 'framework'];
const COMPETENCIES = Object.keys(crossCountry.competencies);
const BANDS = Object.keys(crossCountry.competencies.vision.bands);
const GROUPS = Object.keys(crossCountry.countryGroups);
const MOBILITY = Object.keys(crossCountry.mobility);
const AREAS = Object.keys(crossCountry.preferredAreas);
const GROWTH = Object.keys(crossCountry.growth);
const HOW_TO_READ = ['matching', 'scale', 'groups', 'areas', 'mobility', 'counts'];

// Every hex here is already in the ALLOWED list of scripts/check-colors.mjs.
const SERIES = ['#4B4DF7', '#FFAF64', '#5DDBA4', '#8A8CFF', '#FF5656'];
const GRID = 'rgba(255,255,255,0.06)';
const TICK = 'rgba(255,255,255,0.45)';
const AXIS = { grid: { color: GRID }, ticks: { color: TICK } };
const LEGEND = {
  labels: { color: 'rgba(255,255,255,0.6)', usePointStyle: true, boxWidth: 8, padding: 16 },
};
const axisTitle = (text: string) => ({ display: true, text, color: TICK });

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

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

export default function CrossCountryDemo() {
  const lang = useLocale();
  // The namespace is the route id with '/' becoming '.', so it keeps the kebab.
  const t = useTranslations('demo.cross-country');
  const format = useFormatter();
  const [frame, setFrame] = useState(FRAMES[0]);
  const [skill, setSkill] = useState(COMPETENCIES[0]);

  // Formatting first, then interpolation: next-intl passes a numeric ICU
  // argument through as-is, so `{below}` would print "51.2" on the Italian page
  // beside the "51,2" everything else produces.
  const n = (value: number, digits = 1) =>
    format.number(value, { minimumFractionDigits: digits, maximumFractionDigits: digits });

  const { population, skillMatching, countryGroups, mobility, preferredAreas, growth } = crossCountry;
  const items = frame === 'competencies' ? COMPETENCIES : Object.keys(crossCountry.framework);
  const source = crossCountry[frame];
  const nameOf = (id: string) => t(`${frame}.${id}`);

  const belowThreshold = sum(
    skillMatching.distribution.slice(0, skillMatching.threshold / skillMatching.binWidth),
  );
  const groupsBySize = [...GROUPS].sort((a, b) => countryGroups[b].n - countryGroups[a].n);
  const groupMatching = GROUPS.map((g) => countryGroups[g].skillMatching);
  const best = GROUPS.reduce((a, b) =>
    countryGroups[b].skillMatching > countryGroups[a].skillMatching ? b : a,
  );

  // Neither of these depends on the selectors, so they are built once.
  const fixed = useMemo(
    () => ({
      matching: {
        data: {
          labels: skillMatching.distribution.map(
            (_, i) => `${i * skillMatching.binWidth}–${(i + 1) * skillMatching.binWidth}`,
          ),
          datasets: [
            {
              label: t('matching.series'),
              data: [...skillMatching.distribution],
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
            x: { ...AXIS, grid: { display: false }, title: axisTitle(t('matching.axisScore')) },
            y: { ...AXIS, beginAtZero: true, title: axisTitle(t('matching.axis')) },
          },
        },
      },

      groups: {
        data: {
          labels: GROUPS.map((g) => t(`groups.names.${g}`)),
          datasets: [
            {
              label: t('groups.series'),
              data: groupMatching,
              backgroundColor: SERIES[0],
              borderRadius: 4,
              maxBarThickness: 56,
            },
          ],
        },
        options: {
          locale: lang,
          plugins: { legend: { display: false } },
          scales: {
            x: { ...AXIS, grid: { display: false } },
            // Zero-based: the three means are within three points of each
            // other, and a truncated axis would draw that as a chasm.
            y: { ...AXIS, beginAtZero: true, title: axisTitle(t('groups.axis')) },
          },
        },
      },

      mobility: {
        data: {
          labels: MOBILITY.map((m) => t(`mobility.items.${m}`)),
          datasets: [
            {
              label: t('mobility.series'),
              data: MOBILITY.map((m) => mobility[m]),
              backgroundColor: SERIES[0],
              borderRadius: 4,
              maxBarThickness: 56,
            },
          ],
        },
        options: {
          locale: lang,
          plugins: { legend: { display: false } },
          scales: {
            x: { ...AXIS, grid: { display: false } },
            y: { ...AXIS, beginAtZero: true, title: axisTitle(t('mobility.axis')) },
          },
        },
      },

      areas: {
        data: {
          labels: AREAS.map((a) => t(`areas.items.${a}`)),
          datasets: [
            {
              label: t('areas.series'),
              data: AREAS.map((a) => preferredAreas[a]),
              backgroundColor: SERIES[2],
              borderRadius: 4,
              maxBarThickness: 40,
            },
          ],
        },
        options: {
          locale: lang,
          indexAxis: 'y' as const,
          plugins: { legend: { display: false } },
          scales: {
            x: { ...AXIS, beginAtZero: true, title: axisTitle(t('areas.axis')) },
            y: { ...AXIS, grid: { display: false } },
          },
        },
      },

      growth: {
        data: {
          labels: GROWTH.map((g) => t(`growth.items.${g}`)),
          datasets: [
            {
              label: t('growth.series'),
              data: GROWTH.map((g) => growth[g]),
              backgroundColor: SERIES[1],
              borderRadius: 4,
              maxBarThickness: 40,
            },
          ],
        },
        options: {
          locale: lang,
          indexAxis: 'y' as const,
          plugins: { legend: { display: false } },
          scales: {
            x: { ...AXIS, beginAtZero: true, title: axisTitle(t('growth.axis')) },
            y: { ...AXIS, grid: { display: false } },
          },
        },
      },
    }),
    [t, lang],
  );

  // The two panels the frame selector drives.
  const frameCharts = useMemo(
    () => ({
      means: {
        data: {
          labels: items.map(nameOf),
          datasets: [
            {
              label: t('frames.means.series'),
              data: items.map((id) => source[id].mean),
              backgroundColor: SERIES[0],
              borderRadius: 4,
              maxBarThickness: 32,
            },
          ],
        },
        options: {
          locale: lang,
          indexAxis: 'y' as const,
          plugins: { legend: { display: false } },
          // Zero-based, and no maximum: the five-point scale is the client's
          // and its top is not in the extract, so the page does not assert one.
          scales: {
            x: { ...AXIS, beginAtZero: true },
            y: { ...AXIS, grid: { display: false } },
          },
        },
      },

      bands: {
        data: {
          labels: items.map(nameOf),
          datasets: BANDS.map((band, i) => ({
            label: t(`bands.${band}`),
            data: items.map((id) => source[id].bands[band]),
            backgroundColor: SERIES[i],
            borderRadius: 2,
          })),
        },
        options: {
          locale: lang,
          indexAxis: 'y' as const,
          plugins: { legend: { ...LEGEND, position: 'bottom' as const } },
          scales: {
            x: { ...AXIS, stacked: true, min: 0, max: 100, title: axisTitle(t('frames.bands.axis')) },
            y: { ...AXIS, stacked: true, grid: { display: false } },
          },
        },
      },
    }),
    // `frame` is what `items`, `source` and `nameOf` derive from.
    [t, lang, frame],
  );

  const drivers = useMemo(() => {
    const keys = Object.keys(crossCountry.drivers[skill]);
    return {
      data: {
        labels: keys.map((d) => t(`drivers.names.${d}`)),
        datasets: [
          {
            label: t('drivers.series'),
            data: keys.map((d) => crossCountry.drivers[skill][d]),
            backgroundColor: SERIES[1],
            borderRadius: 4,
            maxBarThickness: 20,
          },
        ],
      },
      options: {
        locale: lang,
        indexAxis: 'y' as const,
        plugins: { legend: { display: false } },
        scales: {
          x: { ...AXIS, beginAtZero: true },
          y: { ...AXIS, grid: { display: false } },
        },
      },
      count: keys.length,
    };
  }, [t, lang, skill]);

  const headline = [
    { id: 'invited', value: n(population.invited, 0) },
    { id: 'evaluated', value: n(population.evaluated, 0) },
    { id: 'completion', value: `${n(population.evaluatedPct)}%` },
  ];

  return (
    <>
      <DemoView slug="cross-country" />
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
          <Panel title={t('population.heading')} note={t('population.rounding')}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
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
                    {t(`population.${s.id}.note`)}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title={t('matching.heading')}
            body={t('matching.body', {
              threshold: n(skillMatching.threshold, 0),
              below: n(belowThreshold),
              above: n(100 - belowThreshold),
            })}
            note={t('matching.caption')}
          >
            <div className="flex flex-wrap gap-8 mb-8">
              {[
                { id: 'mean', value: skillMatching.mean },
                { id: 'median', value: skillMatching.median },
              ].map((s) => (
                <div key={s.id}>
                  <span
                    className="block text-white stat-value text-[26px] md:text-[32px] mb-1"
                    style={{ lineHeight: 1, letterSpacing: '-0.03em' }}
                  >
                    {n(s.value)}
                  </span>
                  <span className="block text-[13px] text-white/45">{t(`matching.${s.id}`)}</span>
                </div>
              ))}
            </div>
            <Chart
              className="h-[280px] md:h-[340px]"
              type="bar"
              ariaLabel={t('matching.ariaLabel')}
              data={fixed.matching.data}
              options={fixed.matching.options}
            />
          </Panel>

          <Panel
            title={t('groups.heading')}
            body={t('groups.body')}
            note={t('groups.caption', {
              spread: n(Math.max(...groupMatching) - Math.min(...groupMatching)),
              small: n(countryGroups[best].n, 0),
              large: n(countryGroups[groupsBySize[0]].n, 0),
            })}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {GROUPS.map((g, i) => (
                <div key={g} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <span
                    className="block h-1 w-8 rounded-full mb-4"
                    style={{ backgroundColor: SERIES[i] }}
                  />
                  <span className="block text-[15px] font-semibold text-white/90 mb-3">
                    {t(`groups.names.${g}`)}
                  </span>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[13px] text-white/45">{t('groups.people')}</span>
                    <span className="text-[14px] font-semibold text-white/85 tabular-nums">
                      {n(countryGroups[g].n, 0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Chart
              className="h-[260px] md:h-[320px]"
              type="bar"
              ariaLabel={t('groups.ariaLabel')}
              data={fixed.groups.data}
              options={fixed.groups.options}
            />
          </Panel>

          <Panel title={t('frames.heading')} body={t('frames.body')}>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/35 mr-2">
                {t('frames.label')}
              </span>
              {FRAMES.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={frame === f}
                  onClick={() => setFrame(f)}
                  className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    frame === f
                      ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                      : 'text-white/40 border border-transparent hover:text-white/70'
                  }`}
                >
                  {t(`frames.options.${f}`)}
                </button>
              ))}
            </div>

            <h3 className="text-[17px] font-semibold text-white/85 mb-4">
              {t('frames.means.heading')}
            </h3>
            <Chart
              className="h-[240px] md:h-[320px]"
              type="bar"
              ariaLabel={t('frames.means.ariaLabel')}
              data={frameCharts.means.data}
              options={frameCharts.means.options}
            />
            <p className="text-[13px] text-white/40 leading-[1.7] mt-4">
              {t('frames.means.caption', {
                narrow: n(spreadOf(crossCountry.competencies), 2),
                wide: n(spreadOf(crossCountry.framework), 2),
              })}
            </p>

            <h3 className="text-[17px] font-semibold text-white/85 mt-10 mb-4">
              {t('frames.bands.heading')}
            </h3>
            <Chart
              className="h-[280px] md:h-[380px]"
              type="bar"
              ariaLabel={t('frames.bands.ariaLabel')}
              data={frameCharts.bands.data}
              options={frameCharts.bands.options}
            />
            <p className="text-[13px] text-white/40 leading-[1.7] mt-4">
              {t('frames.bands.caption')}
            </p>
          </Panel>

          <Panel title={t('drivers.heading')} body={t('drivers.body')} note={t('drivers.caption')}>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/35 mr-2">
                {t('drivers.label')}
              </span>
              {COMPETENCIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={skill === c}
                  onClick={() => setSkill(c)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    skill === c
                      ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                      : 'text-white/40 border border-transparent hover:text-white/70'
                  }`}
                >
                  {t(`competencies.${c}`)}
                </button>
              ))}
            </div>
            {/* The tallest competency carries 22 behaviours, so the box grows
                with the list rather than squeezing them into a fixed height. */}
            <div style={{ height: `${Math.max(240, drivers.count * 26)}px` }}>
              <Chart
                className="h-full w-full"
                type="bar"
                ariaLabel={t('drivers.ariaLabel')}
                data={drivers.data}
                options={drivers.options}
              />
            </div>
          </Panel>

          <Panel
            title={t('mobility.heading')}
            body={t('mobility.body', {
              yes: n(mobility.veryWilling + mobility.willing),
              maybe: n(mobility.openToConsidering),
              no: n(mobility.somewhatReluctant + mobility.notInterested),
            })}
            note={t('mobility.caption')}
          >
            <Chart
              className="h-[280px] md:h-[340px]"
              type="bar"
              ariaLabel={t('mobility.ariaLabel')}
              data={fixed.mobility.data}
              options={fixed.mobility.options}
            />
          </Panel>

          <Panel
            title={t('areas.heading')}
            body={t('areas.body', {
              total: n(sum(AREAS.map((a) => preferredAreas[a]))),
              each: n(sum(AREAS.map((a) => preferredAreas[a])) / 100, 1),
            })}
            note={t('areas.caption')}
          >
            <Chart
              className="h-[260px] md:h-[300px]"
              type="bar"
              ariaLabel={t('areas.ariaLabel')}
              data={fixed.areas.data}
              options={fixed.areas.options}
            />
          </Panel>

          <Panel title={t('growth.heading')} body={t('growth.body')} note={t('growth.caption')}>
            <Chart
              className="h-[220px] md:h-[260px]"
              type="bar"
              ariaLabel={t('growth.ariaLabel')}
              data={fixed.growth.data}
              options={fixed.growth.options}
            />
          </Panel>

          <Panel title={t('howToRead.heading')} body={t('howToRead.body')}>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {HOW_TO_READ.map((id) => (
                <div key={id}>
                  <dt className="text-[15px] font-semibold text-white/90 mb-2">
                    {t(`howToRead.items.${id}.question`, {
                      threshold: n(skillMatching.threshold, 0),
                    })}
                  </dt>
                  <dd className="text-[14px] text-white/[0.55] leading-[1.7]">
                    {t(`howToRead.items.${id}.answer`)}
                  </dd>
                </div>
              ))}
            </dl>
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

/** Distance between the highest and lowest mean in a frame. */
function spreadOf(frame: Record<string, { mean: number }>) {
  const means = Object.values(frame).map((v) => v.mean);
  return Math.max(...means) - Math.min(...means);
}
