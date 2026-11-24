/**
 * The press page hero visual, drawn in code on a transparent background so it
 * sits directly on the light hero (it replaces /videos/press-hero-showcase.*,
 * whose dark backdrop is baked in).
 *
 * The motion is the video's, through five outlets: each outlet's tile wipes in
 * from the right, holds, then zooms into its article — the tile grows and
 * fades while the article grows out of it — and the article pans slowly down
 * until the next tile wipes across it. 4.8 s per outlet, a 24 s loop.
 *
 * Three CSS keyframe loops (`press-seq-*` in styles/globals.css) on clip-path,
 * transform and opacity, no JavaScript; each outlet runs them offset by its
 * slot. Under prefers-reduced-motion it is the Forbes tile, still. It is
 * decorative, so it is hidden from screen readers. The tiles and articles are
 * the Figma exports in public/press/.
 *
 * The box has the video's size and aspect ratio (720:898, at most 360px wide),
 * so nothing moves when the images arrive.
 */
const OUTLETS = ['forbes', 'techeu', 'globenewswire', 'startuprise', 'aiworld'] as const;

// 4.8 s per outlet. Each outlet starts its wipe at i × SLOT; the whole sequence
// is shifted 0.6 s so the first frame already shows the Forbes tile.
const SLOT_S = 4.8;
const LEAD_S = 0.6;

export function PressSequence({ className }: { className?: string }) {
  return (
    <>
      {/* The first frame is the Forbes tile: fetch it with the document.
          React hoists this <link> into <head>. */}
      <link rel="preload" as="image" href="/press/press-tile-forbes.svg" fetchPriority="high" />
      <div
        className={`relative mx-auto aspect-[720/898] w-full max-w-[360px] ${className ?? ''}`}
        aria-hidden="true"
      >
        {OUTLETS.map((outlet, i) => {
          const delay = { animationDelay: `${i * SLOT_S - LEAD_S}s` };
          return (
            <div
              key={outlet}
              data-first={i === 0 ? '' : undefined}
              className="press-seq-group absolute inset-0 overflow-hidden rounded-[32px]"
              style={delay}
            >
              <img
                src={`/press/press-article-${outlet}.avif`}
                alt=""
                width={1080}
                height={1350}
                decoding="async"
                loading="lazy"
                fetchPriority="low"
                className="press-seq-article absolute inset-0 h-full w-full object-cover"
                style={delay}
              />
              {/* The articles are mostly white: a #e5e7eb hairline keeps their
                  edge on the white hero. It fades in with the article, so the
                  tile phase has no frame. */}
              <div className="press-seq-ring pointer-events-none absolute inset-0 rounded-[32px] shadow-[inset_0_0_0_1px_#e5e7eb]" style={delay} />
              <img
                src={`/press/press-tile-${outlet}.svg`}
                alt=""
                width={1080}
                height={1080}
                decoding="async"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'low'}
                // 76% of the width, centred: (898/720 − 0.76) / 2 ≈ 19.5% of the height.
                className="press-seq-tile absolute left-[12%] top-[19.5%] w-[76%]"
                style={delay}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
