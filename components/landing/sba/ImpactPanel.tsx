'use client';

// "Infortuni sul lavoro" on /lp/safety-behaviour-assessment: the deck's first
// slide, its words and numbers unchanged, in the house card and stat style.
// Italy on the left — the reports and the deaths, then the 255 serious
// accidents a day as 255 dots that light up — and on the right the yearly cost
// as three circles resting on one baseline, each one's area in proportion to
// its figure.
//
// Every figure renders final on the server and counts up from zero only once
// it scrolls into view, so search engines and readers without JS see the
// number, and nobody sees it jump.

import React, { useEffect, useRef, useState } from 'react';
import { groupFigure, splitFigure } from './count-up';

type Stat = { value: string; label: string };

// Billions per year, in the order of impact.cost in the catalogue.
const COST = [4000, 366, 45];
const DOTS = 255;
// The house card on a light section, as on the homepage problem cards.
const CARD = 'rounded-2xl bg-white border border-[#E5E7EB]';

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;


function CountUp({ value, start, className, style }: { value: string; start: boolean; className?: string; style?: React.CSSProperties }) {
  const [shown, setShown] = useState<string | null>(null);
  const armed = useRef(false);

  // Below the fold at mount: start from zero, out of sight.
  useEffect(() => {
    if (start || reducedMotion()) return;
    armed.current = true;
    setShown(`0${splitFigure(value).rest}`);
  }, []);

  useEffect(() => {
    if (!start || !armed.current) return;
    const { n, rest, sep } = splitFigure(value);
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1600);
      const eased = 1 - Math.pow(1 - p, 3);
      if (p < 1) {
        setShown(`${groupFigure(Math.round(n * eased), sep)}${rest}`);
        raf = requestAnimationFrame(tick);
      } else {
        setShown(null);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <p className={className} style={style}>
      {shown ?? value}
    </p>
  );
}

export default function ImpactPanel({
  italyLabel,
  costLabel,
  italy,
  cost,
}: {
  italyLabel: string;
  costLabel: string;
  italy: Stat[];
  cost: Stat[];
}) {
  const [leftRef, leftIn] = useInView<HTMLDivElement>();
  const [rightRef, rightIn] = useInView<HTMLDivElement>();
  const [reports, serious, deaths] = italy;
  const radii = COST.map((v) => Math.sqrt(v / COST[0]));

  const STAT = 'stat-value text-[32px] md:text-[54px] text-[#121212]';
  const statStyle = { lineHeight: 1.1, letterSpacing: '-0.03em' };

  return (
    <div className="grid lg:grid-cols-12 gap-4 md:gap-6">
      {/* Italy */}
      <div ref={leftRef} className={`lg:col-span-7 flex flex-col ${CARD} p-6 md:p-8 lg:p-10`}>
        <p className="type-body-bold text-[#121212]">{italyLabel}</p>

        <div className="mt-8 grid sm:grid-cols-2 gap-6 sm:gap-0 sm:divide-x sm:divide-[#E5E7EB]">
          {[reports, deaths].map((s, i) => (
            <div key={s.value} className={i ? 'sm:pl-8' : 'sm:pr-8'}>
              <CountUp value={s.value} start={leftIn} className={STAT} style={statStyle} />
              <p className="type-body text-[#4B4B4B] mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 255 serious accidents a day, one dot each. */}
        <div className="mt-8 border-t border-[#E5E7EB] pt-8 md:mt-auto">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-5">
            <CountUp value={serious.value} start={leftIn} className={`${STAT} !text-[#4B4DF7]`} style={statStyle} />
            <p className="type-body text-[#4B4B4B]">{serious.label}</p>
          </div>
          <div className="grid grid-cols-[repeat(17,minmax(0,1fr))] sm:grid-cols-[repeat(51,minmax(0,1fr))] gap-[3px] sm:gap-1" aria-hidden="true">
            {Array.from({ length: DOTS }, (_, i) => (
              <span
                key={i}
                className={`aspect-square rounded-full transition-colors duration-300 motion-reduce:transition-none ${
                  leftIn ? 'bg-[#4B4DF7]' : 'bg-[#E5E7EB]'
                }`}
                style={{ transitionDelay: leftIn ? `${i * 6}ms` : '0ms' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* The yearly cost */}
      <div ref={rightRef} className={`lg:col-span-5 flex flex-col ${CARD} p-6 md:p-8 lg:p-10`}>
        <p className="type-body-bold text-[#121212]">{costLabel}</p>

        <div className="mt-8 md:mt-auto">
          <div className="relative mx-auto aspect-square w-full max-w-[340px]">
            {radii.map((r, i) => (
              <span
                key={COST[i]}
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full origin-bottom transition-transform duration-1000 ease-out motion-reduce:transition-none ${
                  rightIn ? 'scale-100' : 'scale-0'
                } ${
                  i === 0
                    ? 'border border-[#6366F8]/25 bg-[#6366F8]/[0.06]'
                    : i === 1
                      ? 'border border-[#6366F8]/40 bg-[#6366F8]/[0.16]'
                      : 'bg-[#4B4DF7]'
                }`}
                style={{ width: `${r * 100}%`, height: `${r * 100}%`, transitionDelay: `${i * 250}ms` }}
                aria-hidden="true"
              />
            ))}

            {/* World, inside the top of its circle; the EU just above its own. */}
            <div className="absolute inset-x-0 top-[20%] text-center">
              <CountUp value={cost[0].value} start={rightIn} className="stat-value text-[24px] md:text-[32px] text-[#121212]" style={statStyle} />
              <p className="type-body-sm text-[#4B4B4B]">{cost[0].label}</p>
            </div>
            <div className="absolute inset-x-0 text-center" style={{ bottom: `calc(${radii[1] * 100}% + 12px)` }}>
              <CountUp value={cost[1].value} start={rightIn} className="stat-value text-[20px] md:text-[24px] text-[#121212]" style={statStyle} />
              <p className="type-body-sm text-[#4B4B4B]">{cost[1].label}</p>
            </div>
          </div>

          {/* The baseline, and Italy beneath it. */}
          <span className="block h-px w-full bg-[#E5E7EB]" aria-hidden="true" />
          <div className="mt-4 text-center">
            <CountUp value={cost[2].value} start={rightIn} className={`${STAT} !text-[#4B4DF7]`} style={statStyle} />
            <p className="type-body-sm text-[#4B4B4B]">{cost[2].label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
