'use client';

// The canvas half of the chart wrapper: one Chart.js instance, created on
// mount and destroyed on unmount.
//
// Nothing imports this module statically — Chart.tsx reaches it through
// next/dynamic with ssr: false — which is what keeps chart.js in an async
// chunk that only a demo page requests. Importing it directly from a page
// would undo that and put the library in that page's initial bundle.

import { useEffect, useRef } from 'react';
// ponytail: chart.js/auto registers every controller, scale and element (~70 KB
// gz) so a dashboard can ask for a bar, a radar or a scatter without editing
// this file. The upgrade path, if the demo pages ever need to be light, is to
// register the handful of components the three dashboards actually use.
import ChartJS from 'chart.js/auto';
import type { ChartData, ChartOptions, ChartType } from 'chart.js';

export type ChartCanvasProps = {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
  /** What a screen reader is told the chart shows. */
  ariaLabel: string;
};

export default function ChartCanvas({ type, data, options, ariaLabel }: ChartCanvasProps) {
  const canvas = useRef<HTMLCanvasElement>(null);

  // ponytail: the config is compared by identity, so a caller that builds it
  // inline on every render rebuilds the chart on every render. The demo pages
  // are static and render once; a dashboard that drives a chart from state
  // should useMemo its data, or this becomes a deep compare.
  useEffect(() => {
    if (!canvas.current) return;
    const chart = new ChartJS(canvas.current, {
      type,
      data,
      // The container decides the height — every chart here sits in a div with
      // a height class, and Chart.js's default 2:1 aspect ratio would fight it.
      options: { responsive: true, maintainAspectRatio: false, ...options },
    });
    return () => chart.destroy();
  }, [type, data, options]);

  return <canvas ref={canvas} role="img" aria-label={ariaLabel} />;
}
