'use client';

// The sales network demo dashboard.
//
// Same construction as the retail one: numbers from data/demo/sales-network.ts,
// words from messages/ under demo.salesNetwork, charts from the one wrapper.
//
// Two things this page deliberately does not draw, both because the data will
// not carry them honestly:
//
// 1. No funnel. The extract holds 190 candidates, 180 interviews and 185
//    assessed — the assessed count is above the interview count, because the
//    source was already one out and rounding every headcount to the nearest
//    five (the rule that makes these counts non-identifying) turned a gap of 1
//    into a gap of 5. Three bars that must descend and do not read as numbers
//    that do not add up, and a reader who stops trusting those stops trusting
//    the rest. So the page shows the 185 and the conversion, and says in
//    `population.rounding` why the percentages do not divide back.
//
// 2. No soft-by-hard scatter. Crossing the two thresholds is the reading the
//    section exists for, but the extract has four quadrant shares and two
//    family means — two points is not a scatter, and drawing one implies a
//    resolution that is not in the file. The 2x2 grid below carries the same
//    four numbers without the implication.

import { useMemo, useState, type ReactNode } from 'react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Reveal } from '@/components/ui/reveal';
import DemoView from '@/components/demo/DemoView';
import Chart from '@/components/demo/charts/Chart';
import { salesNetwork } from '@/data/demo/sales-network';
import { href } from '@/i18n/routes';

const FAMILIES = Object.keys(salesNetwork.families);
const BANDS = Object.keys(salesNetwork.bands);
const QUADRANTS = Object.keys(salesNetwork.quadrants);

/**
 * The competencies and knowledge areas a family was assessed on.
 *
 * Neither list is the same for the two families — managers are measured on
 * managing and accounts on selling — so the page reads them out of the data
 * per family rather than holding one list and hoping every cell is filled.
 */
const keysFor = (source: Record<string, Record<string, number>>, family: string) =>
  Object.keys(source).filter((k) => source[k][family] !== undefined);

// Every hex here is already in the ALLOWED list of scripts/check-colors.mjs.
const SERIES = ['#4B4DF7', '#FFAF64', '#5DDBA4', '#FF5656'];
const GRID = 'rgba(255,255,255,0.06)';
const TICK = 'rgba(255,255,255,0.45)';
const AXIS = { grid: { color: GRID }, ticks: { color: TICK } };
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

export default function SalesNetworkDemo() {
  const lang = useLocale();
  // The namespace is the route id with '/' becoming '.', so it keeps the
  // kebab: `demo/sales-network` is `demo.sales-network`.
  const t = useTranslations('demo.sales-network');
  const format = useFormatter();
  const [family, setFamily] = useState(FAMILIES[0]);

  // Formatting first, then interpolation: next-intl passes a numeric ICU
  // argument through as-is, so `{covered}` would print "175" on the Italian
  // page beside a "175" formatted for Italian by everything else.
  const n = (value: number, digits = 1) =>
    format.number(value, { minimumFractionDigits: digits, maximumFractionDigits: digits });

  const softKeys = keysFor(salesNetwork.soft, family);
  const hardKeys = keysFor(salesNetwork.hard, family);
  // The competency whose behaviours are open. Reset when it does not belong to
  // the family just selected — every family has its own competencies, and one
  // of them (decisionMaking) belongs to both.
  const [openSkill, setOpenSkill] = useState(softKeys[0]);
  const skill = softKeys.includes(openSkill) ? openSkill : softKeys[0];
  const driverKeys = Object.keys(salesNetwork.drivers[skill] ?? {}).filter(
    (d) => salesNetwork.drivers[skill][d][family] !== undefined,
  );

  const bands = useMemo(
    () => ({
      data: {
        labels: BANDS.map((b) => t(`bands.items.${b}`)),
        datasets: [
          {
            label: t('bands.series'),
            data: BANDS.map((b) => salesNetwork.bands[b]),
            backgroundColor: SERIES[0],
            hoverBackgroundColor: '#7B7DF9',
            borderRadius: 4,
            maxBarThickness: 64,
          },
        ],
      },
      options: {
        locale: lang,
        plugins: { legend: { display: false } },
        scales: {
          x: { ...AXIS, grid: { display: false } },
          y: { ...AXIS, beginAtZero: true, title: axisTitle(t('bands.axis')) },
        },
      },
    }),
    [t, lang],
  );

  // The three panels the family selector drives. Rebuilt together because they
  // change together, and ChartCanvas compares its config by identity.
  const profile = useMemo(() => {
    const bar = (series: string, labels: string[], data: number[], colour: string) => ({
      data: {
        labels,
        datasets: [
          {
            label: series,
            data,
            backgroundColor: colour,
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
          // No maximum on either axis. The soft scores look like a five-point
          // scale and the hard ones like a hundred-point one, but neither
          // maximum is in the extract, and a fixed axis would be this page
          // asserting a scale it cannot check.
          x: { ...AXIS, beginAtZero: true },
          y: { ...AXIS, grid: { display: false } },
        },
      },
    });

    return {
      soft: bar(
        t('profile.soft.series'),
        softKeys.map((k) => t(`skills.${k}`)),
        softKeys.map((k) => salesNetwork.soft[k][family]),
        SERIES[0],
      ),
      hard: bar(
        t('profile.hard.series'),
        hardKeys.map((k) => t(`knowledge.${k}`)),
        hardKeys.map((k) => salesNetwork.hard[k][family]),
        SERIES[2],
      ),
      drivers: bar(
        t('profile.drivers.series'),
        driverKeys.map((d) => t(`drivers.${d}`)),
        driverKeys.map((d) => salesNetwork.drivers[skill][d][family]),
        SERIES[1],
      ),
    };
    // `family` and `skill` are what the three lists are derived from; listing
    // the derivations as well would say the same thing twice.
  }, [t, lang, family, skill]);

  const { funnel, overview, quadrants } = salesNetwork;
  const covered = FAMILIES.reduce((sum, f) => sum + salesNetwork.families[f].n, 0);

  const headline: Array<{ id: string; value: string; args: Record<string, string> }> = [
    {
      id: 'assessed',
      value: n(funnel.assessed, 0),
      args: { candidates: n(funnel.candidates, 0), notAssessed: n(funnel.notAssessed, 0) },
    },
    { id: 'conversion', value: `${n(funnel.conversionPct, 0)}%`, args: {} },
    { id: 'matchingMean', value: n(overview.skillMatchingMean), args: {} },
    { id: 'matchingMedian', value: n(overview.skillMatchingMedian), args: {} },
  ];

  return (
    <>
      <DemoView slug="sales-network" />
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
            title={t('bands.heading')}
            body={t('bands.body')}
            note={t('bands.caption')}
          >
            <Chart
              className="h-[280px] md:h-[340px]"
              type="bar"
              ariaLabel={t('bands.ariaLabel')}
              data={bands.data}
              options={bands.options}
            />
          </Panel>

          <Panel title={t('families.heading')} body={t('families.body')}>
            {/* Above the cards, not under them: 85 and 90 are there to be added
                up, and a reader who does that before being told they do not
                reach 185 has found a hole instead of being shown one. */}
            <p className="text-[13px] text-white/40 leading-[1.7] max-w-3xl mb-6">
              {t('families.coverage', { covered: n(covered, 0), assessed: n(funnel.assessed, 0) })}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FAMILIES.map((f, i) => (
                <div key={f} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <span
                    className="block h-1 w-8 rounded-full mb-4"
                    style={{ backgroundColor: SERIES[i] }}
                  />
                  <span className="block text-[15px] font-semibold text-white/90 mb-4">
                    {t(`families.names.${f}`)}
                  </span>
                  <dl className="flex flex-col gap-2">
                    {[
                      { id: 'people', value: n(salesNetwork.families[f].n, 0) },
                      { id: 'skillMatching', value: n(salesNetwork.families[f].skillMatching) },
                      { id: 'soft', value: n(salesNetwork.families[f].soft) },
                      { id: 'hard', value: n(salesNetwork.families[f].hard) },
                    ].map((row) => (
                      <div key={row.id} className="flex items-baseline justify-between gap-4">
                        <dt className="text-[13px] text-white/45">
                          {t(`families.labels.${row.id}`)}
                        </dt>
                        <dd className="text-[14px] font-semibold text-white/85 tabular-nums">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-white/40 leading-[1.7] mt-6">{t('families.overlap')}</p>
          </Panel>

          <Panel title={t('profile.heading')} body={t('profile.body')}>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/35 mr-2">
                {t('profile.label')}
              </span>
              {FAMILIES.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={family === f}
                  onClick={() => setFamily(f)}
                  className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    family === f
                      ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                      : 'text-white/40 border border-transparent hover:text-white/70'
                  }`}
                >
                  {t(`families.names.${f}`)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              <div>
                <h3 className="text-[17px] font-semibold text-white/85 mb-4">
                  {t('profile.soft.heading')}
                </h3>
                <Chart
                  className="h-[260px] md:h-[300px]"
                  type="bar"
                  ariaLabel={t('profile.soft.ariaLabel')}
                  data={profile.soft.data}
                  options={profile.soft.options}
                />
                <p className="text-[13px] text-white/40 leading-[1.7] mt-4">
                  {t('profile.soft.caption')}
                </p>
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-white/85 mb-4">
                  {t('profile.hard.heading')}
                </h3>
                <Chart
                  className="h-[260px] md:h-[300px]"
                  type="bar"
                  ariaLabel={t('profile.hard.ariaLabel')}
                  data={profile.hard.data}
                  options={profile.hard.options}
                />
                <p className="text-[13px] text-white/40 leading-[1.7] mt-4">
                  {t('profile.hard.caption')}
                </p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white/85 mt-10 mb-4">
              {t('profile.drivers.heading')}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/35 mr-2">
                {t('profile.drivers.label')}
              </span>
              {softKeys.map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={skill === k}
                  onClick={() => setOpenSkill(k)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    skill === k
                      ? 'bg-white/[0.1] text-white border border-white/[0.15]'
                      : 'text-white/40 border border-transparent hover:text-white/70'
                  }`}
                >
                  {t(`skills.${k}`)}
                </button>
              ))}
            </div>
            <Chart
              className="h-[280px] md:h-[340px]"
              type="bar"
              ariaLabel={t('profile.drivers.ariaLabel')}
              data={profile.drivers.data}
              options={profile.drivers.options}
            />
            <p className="text-[13px] text-white/40 leading-[1.7] mt-6">
              {t('profile.drivers.caption')}
            </p>
          </Panel>

          <Panel
            title={t('quadrants.heading')}
            body={t('quadrants.body', {
              hardCleared: n(quadrants.softHighHardHigh + quadrants.softLowHardHigh),
              softCleared: n(quadrants.softHighHardHigh + quadrants.softHighHardLow),
            })}
            note={t('quadrants.caption', {
              soft: n(overview.softThreshold, 0),
              hard: n(overview.hardThreshold, 0),
            })}
          >
            {/* The 2x2 itself. Four numbers in the shape they mean, which is
                what a scatter of two aggregate points could not have been. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUADRANTS.map((q, i) => (
                <div key={q} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <span className="block text-[12px] text-white/35 mb-3">
                    {t('quadrants.axisSoft')}{' '}
                    {t(q.startsWith('softHigh') ? 'quadrants.high' : 'quadrants.low', {
                      threshold: n(overview.softThreshold, 0),
                    })}
                    {' · '}
                    {t('quadrants.axisHard')}{' '}
                    {t(q.endsWith('HardHigh') ? 'quadrants.high' : 'quadrants.low', {
                      threshold: n(overview.hardThreshold, 0),
                    })}
                  </span>
                  <span
                    className="block text-white stat-value text-[32px] md:text-[44px] mb-2"
                    style={{ lineHeight: 1, letterSpacing: '-0.03em' }}
                  >
                    {n(salesNetwork.quadrants[q])}%
                  </span>
                  <span
                    className="block h-1 w-8 rounded-full mb-3"
                    style={{ backgroundColor: SERIES[i] }}
                  />
                  <span className="block text-[15px] font-semibold text-white/90 mb-2">
                    {t(`quadrants.items.${q}.name`)}
                  </span>
                  <p className="text-[13px] text-white/[0.55] leading-[1.7]">
                    {t(`quadrants.items.${q}.description`)}
                  </p>
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
