'use client';

// The demo hub: what the three dashboards are, and what one of their charts
// looks like. It is a client component for the same reason every demo page
// will be — the chart wrapper is loaded with ssr: false, which is only legal
// inside the client graph.

import { useTranslations } from 'next-intl';
import { Globe, Store, Users } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Reveal } from '@/components/ui/reveal';
import DemoView from '@/components/demo/DemoView';
import Chart from '@/components/demo/charts/Chart';

// Structure the catalogue cannot hold: which icon belongs to which card. The
// copy is keyed by the same id under `demo.dashboards`.
const DASHBOARDS = [
  { id: 'retail', Icon: Store },
  { id: 'salesNetwork', Icon: Users },
  { id: 'crossCountry', Icon: Globe },
];

// The preview chart's numbers. Illustrative, and said to be illustrative in
// `preview.caption` — the real figures arrive with the dashboards themselves
// (issues 169 to 171), aggregated and anonymised.
const PREVIEW_SCORES = [82, 74, 69, 61, 54];

export default function DemoHub() {
  const t = useTranslations('demo');

  return (
    <>
      <DemoView slug="hub" />
      <Navbar />
      <main>
        <section className="relative pt-[80px]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-20 lg:py-28">
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
              className="text-[18px] text-white/[0.65] leading-[1.75] max-w-2xl mb-8"
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

        <section className="relative">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 pb-20 lg:pb-28">
            <Reveal
              as="h2"
              y={20}
              duration={0.6}
              className="text-[24px] md:text-[32px] font-semibold text-white/90 mb-8 md:mb-12"
            >
              {t('dashboards.heading')}
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {DASHBOARDS.map(({ id, Icon }, i) => (
                <Reveal
                  key={id}
                  as="article"
                  y={20}
                  duration={0.5}
                  delay={0.05 + i * 0.08}
                  className="rounded-xl md:rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 md:p-8"
                >
                  <Icon className="h-6 w-6 text-white/30 mb-6" />
                  <span className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/35 block mb-3">
                    {t(`dashboards.${id}.sector`)}
                  </span>
                  <h3 className="text-[19px] md:text-[21px] font-semibold text-white/90 mb-3 leading-tight">
                    {t(`dashboards.${id}.title`)}
                  </h3>
                  <p className="text-[14px] text-white/[0.55] leading-[1.7] mb-6">
                    {t(`dashboards.${id}.body`)}
                  </p>
                  {/* Not a link: these three pages do not exist yet,
                      and a card that navigates nowhere reads as a broken site
                      rather than as a roadmap. */}
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-3 py-1.5 text-[12px] font-semibold text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFAF64]" />
                    {t('status.comingSoon')}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 pb-24 lg:pb-32">
            <Reveal
              as="div"
              y={20}
              duration={0.6}
              className="rounded-xl md:rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 md:p-10"
            >
              <h2 className="text-[24px] md:text-[32px] font-semibold text-white/90 mb-3">
                {t('preview.heading')}
              </h2>
              <p className="text-[15px] text-white/[0.55] leading-[1.7] max-w-2xl mb-8">
                {t('preview.body')}
              </p>

              <Chart
                className="h-[260px] md:h-[320px]"
                type="bar"
                ariaLabel={t('preview.ariaLabel')}
                data={{
                  labels: t.raw('preview.skills'),
                  datasets: [
                    {
                      label: t('preview.axis'),
                      data: PREVIEW_SCORES,
                      backgroundColor: '#4B4DF7',
                      hoverBackgroundColor: '#7B7DF9',
                      borderRadius: 6,
                      barThickness: 18,
                    },
                  ],
                }}
                options={{
                  indexAxis: 'y',
                  plugins: { legend: { display: false } },
                  scales: {
                    x: {
                      min: 0,
                      max: 100,
                      grid: { color: 'rgba(255,255,255,0.06)' },
                      ticks: { color: 'rgba(255,255,255,0.4)' },
                    },
                    y: {
                      grid: { display: false },
                      ticks: { color: 'rgba(255,255,255,0.7)' },
                    },
                  },
                }}
              />

              <p className="text-[13px] text-white/35 leading-[1.7] mt-6">
                {t('preview.caption')}
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
