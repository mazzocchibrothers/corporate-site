/**
 * The Talent Pioneers hero visual, drawn in code on a transparent background
 * so it sits directly on the light hero (it replaces
 * /logos/talent-pioneers-hero.*, whose black backdrop is baked in).
 *
 * The motion is the video's: a collage of four event photos. One is large in
 * the middle, the next waits small at the top right, the previous small at the
 * bottom left. Every 1.5 s the top-right photo grows into the middle, the
 * middle one shrinks to the bottom left, the bottom-left one fades away and the
 * next one appears at the top right — a 6 s loop. One CSS keyframe loop
 * (`pioneers-collage` in styles/globals.css) on transform and opacity, no
 * JavaScript; each photo enters the loop at its own offset. Under
 * prefers-reduced-motion it is the still collage. It is decorative, so hidden
 * from screen readers. All four photos load lazily, with no preload: the
 * hero's largest paint is its text.
 *
 * The box is square like the video's, so nothing moves when the photos arrive.
 */
const PHOTOS = ['panel', 'microphone', 'room', 'group'] as const;

// Four 1.5 s slots in a 6 s loop. Photo i starts i slots ahead in its cycle:
// 0 in the middle, 1 waiting at the top right, 2 out of sight, 3 bottom left.
const SLOT_S = 1.5;

export function PioneersCollage({ className }: { className?: string }) {
  return (
    <div className={`relative aspect-square w-full ${className ?? ''}`} aria-hidden="true">
        {PHOTOS.map((photo, i) => (
          <div
            key={photo}
            data-place={i}
            className="pioneers-collage-card absolute left-[10%] top-[10%] aspect-square w-[80%] overflow-hidden rounded-[28px] shadow-[0_24px_48px_-24px_rgba(18,18,18,0.35)]"
            style={{ animationDelay: `${i === 0 ? 0 : -((4 - i) % 4) * SLOT_S}s` }}
          >
            <img
              src={`/logos/talent-pioneers-hero-${photo}.avif`}
              alt=""
              width={1200}
              height={1200}
              decoding="async"
              // All four lazily, no preload: the hero's largest paint is its
              // text, and loading a photo with the page only competes with it.
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
    </div>
  );
}
