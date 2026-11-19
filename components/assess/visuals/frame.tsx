import type { ReactNode } from 'react';
import { Play } from 'lucide-react';
import type { Level } from '@/components/assess/visuals/data';

// The parts every Skillvue Assess visual is built from.
//
// The visuals are illustrations of the product, not the product: the wrapper is
// one image to assistive technology (role="img" with a description of what it
// shows), everything inside is aria-hidden, and nothing in it is a link, a
// button or focusable.

export function Illustration({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className={className}>
      <div aria-hidden="true" className="pointer-events-none select-none">
        {children}
      </div>
    </div>
  );
}

/**
 * A product window: an 8px grey frame (a translucent fill with a faint 1px
 * ring, as in the design, so it reads on white and grey sections alike), the
 * three window dots and a title, and optionally its bottom faded out.
 */
export function Window({ title, fade, className, children }: { title?: string; fade?: number; className?: string; children: ReactNode }) {
  // The design fades each window's last `fade` px out, so the product reads as
  // continuing below the crop. A mask rather than a white overlay: it fades to
  // whatever the section behind it is, white or grey.
  const mask = fade ? `linear-gradient(to bottom, black calc(100% - ${fade}px), transparent)` : undefined;
  return (
    <div
      className={`rounded-[24px] bg-[#121212]/[0.035] p-2 shadow-[inset_0_0_0_1px_rgba(18,18,18,0.05)] ${className ?? ''}`}
      style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
    >
      <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_0_0_1px_rgba(30,30,80,0.06)]">
        {title !== undefined && (
          <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3">
            <span className="flex gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-[#ff6262]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#ffb74b]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            </span>
            <span className="type-body-sm truncate text-[#121212]">{title}</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// Measured levels darken step by step, so a bar reads as a climb.
const SHADES = ['bg-[#d9daff]', 'bg-[#a9aaff]', 'bg-[#8385ff]', 'bg-[#6366f8]', 'bg-[#4b4df7]'];
const HEIGHT = { sm: 'h-1.5', md: 'h-2', lg: 'h-2.5' } as const;

/**
 * Five segments: filled up to the measured level, the shortfall to the level
 * the role needs in peach, and a dark tick where the role's level sits.
 */
export function LevelBar({ level, needed, size = 'md', className }: { level: Level; needed?: Level; size?: keyof typeof HEIGHT; className?: string }) {
  return (
    <span className={`relative flex min-w-0 flex-1 gap-[2px] ${className ?? ''}`}>
      {[1, 2, 3, 4, 5].map((k) => (
        <i
          key={k}
          className={`${HEIGHT[size]} flex-1 rounded-[2px] ${
            k <= level ? SHADES[k - 1] : needed !== undefined && k <= needed ? 'bg-[#f8ddc9]' : 'bg-[#ebebeb]'
          }`}
        />
      ))}
      {needed !== undefined && (
        <i
          className="absolute -top-1 -bottom-1 w-[2px] -translate-x-1/2 rounded-full bg-[#121212]"
          style={{ left: `calc(${needed * 20}% - 1px)` }}
        />
      )}
    </span>
  );
}

/** The legend the readiness views share. */
export function Legend({ measured, needed, gap }: { measured: string; needed: string; gap: string }) {
  return (
    <span className="flex flex-wrap items-center gap-x-4 gap-y-1 type-caption text-[#4B4B4B]">
      <span className="flex items-center gap-1.5"><i className="h-2 w-4 rounded-full bg-[#4b4df7]" />{measured}</span>
      <span className="flex items-center gap-1.5"><i className="h-3 w-[2px] rounded-full bg-[#121212]" />{needed}</span>
      <span className="flex items-center gap-1.5"><i className="h-2 w-4 rounded-full bg-[#f8ddc9]" />{gap}</span>
    </span>
  );
}

/** A status pill: green when ready or meeting the role, peach when there is a gap. */
export function StatusPill({ tone, children }: { tone: 'ok' | 'gap' | 'neutral'; children: ReactNode }) {
  const toneClass =
    tone === 'ok' ? 'bg-[#e3f9ec] text-[#047857]' : tone === 'gap' ? 'bg-[#fdf1ea] text-[#d9603f]' : 'bg-[#f5f5f7] text-[#4B4B4B]';
  return <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 type-caption font-medium ${toneClass}`}>{children}</span>;
}

/** A voice note: play button, waveform and duration. */
export function Voice({ bars, duration, className }: { bars: number[]; duration: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full bg-[#e1e2ff] px-3 py-2 ${className ?? ''}`}>
      <Play className="h-3.5 w-3.5 shrink-0 fill-[#121212] text-[#121212]" strokeWidth={1.5} />
      <span className="flex h-4 items-center gap-[2px]">
        {bars.map((h, i) => (
          <i key={i} className="w-[2px] rounded-full bg-[#121212]" style={{ height: `${h}px` }} />
        ))}
      </span>
      <span className="type-caption tabular-nums text-[#121212]">{duration}</span>
    </span>
  );
}
