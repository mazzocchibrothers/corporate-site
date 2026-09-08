// The one chart component the demo dashboards render.
//
// It exists to keep chart.js out of every other route: the library is behind a
// next/dynamic with ssr: false, so it is neither prerendered nor in any page's
// initial bundle — a browser downloads it only after a demo page has mounted.
// Measured on the build, no non-demo page's script tags reference it.
//
// No 'use client' here on purpose. `ssr: false` is only legal inside the
// client graph, and this module is in it because the demo bodies that import
// it are client components; the directive would be gratuitous and
// `npm run check:client` rejects it. A Server Component importing this file
// fails the build, loudly, which is the right way to find out.

import dynamic from 'next/dynamic';
import type { ChartCanvasProps } from '@/components/demo/charts/ChartCanvas';

const ChartCanvas = dynamic(() => import('@/components/demo/charts/ChartCanvas'), {
  ssr: false,
  // The canvas has no intrinsic size, so without this the section collapses
  // and the page reflows when the chart arrives.
  loading: () => <div className="h-full w-full rounded-xl bg-white/[0.04] animate-pulse" />,
});

/** `className` sizes the box — the canvas fills it. */
export default function Chart({ className, ...props }: ChartCanvasProps & { className?: string }) {
  return (
    <div className={className}>
      <ChartCanvas {...props} />
    </div>
  );
}
