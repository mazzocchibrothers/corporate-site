'use client';

// The /trust FAQ: native <details>, with the answer's height animated open and
// shut. A plain <details> snaps; the toggle is taken over only to animate it,
// so without the Web Animations API it still opens and closes, just at once.
// The plus turns into a cross from CSS (`.trust-page details[open]`), and
// `.closing` turns it back the moment a close starts, not when it ends.
//
// Each item enters with the site's <Reveal>, which animates opacity and
// transform only — the summaries stay focusable before they are revealed.
//
// A click mid-animation reverses from wherever the answer is: the direction
// comes from the last click, not from `open` (which a closing item still has),
// and the new animation starts from the current frame, not from an end state.
// With reduced motion the answer opens and closes at once.

import { useRef, type MouseEvent, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const OPEN_EASE = 'cubic-bezier(0.215, 0.61, 0.355, 1)';
const CLOSE_EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const COLLAPSED = { height: '0px', opacity: 0, paddingBottom: '0px' };

type Frame = { height: string; opacity: number; paddingBottom: string };

export function TrustFaq({ items, children }: { items: { q: string; a: string }[]; children?: ReactNode }) {
  const running = useRef(new Map<HTMLElement, { anim: Animation; opening: boolean }>());

  const toggle = (event: MouseEvent<HTMLElement>) => {
    const details = event.currentTarget.parentElement as HTMLDetailsElement | null;
    const body = details?.querySelector('p');
    if (!details || !body) return;
    event.preventDefault();

    const current = running.current.get(body);
    const opening = !(current ? current.opening : details.open);

    // Where the answer is right now, read before the running animation is dropped.
    let from: Frame | null = null;
    if (current) {
      const style = getComputedStyle(body);
      from = { height: `${body.getBoundingClientRect().height}px`, opacity: Number(style.opacity), paddingBottom: style.paddingBottom };
      current.anim.cancel();
      running.current.delete(body);
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof body.animate !== 'function') {
      details.classList.remove('closing');
      details.open = opening;
      return;
    }

    if (opening) {
      details.classList.remove('closing');
      details.open = true;
      const full = { height: `${body.offsetHeight}px`, opacity: 1, paddingBottom: getComputedStyle(body).paddingBottom };
      const anim = body.animate([from ?? COLLAPSED, full], { duration: 300, easing: OPEN_EASE });
      anim.onfinish = () => running.current.delete(body);
      running.current.set(body, { anim, opening: true });
    } else {
      details.classList.add('closing');
      const start = from ?? { height: `${body.offsetHeight}px`, opacity: 1, paddingBottom: getComputedStyle(body).paddingBottom };
      const anim = body.animate([start, COLLAPSED], { duration: 220, easing: CLOSE_EASE, fill: 'forwards' });
      anim.onfinish = () => {
        details.open = false;
        details.classList.remove('closing');
        anim.cancel();
        running.current.delete(body);
      };
      running.current.set(body, { anim, opening: false });
    }
  };

  return (
    <div className="flex-[2_1_520px] min-w-0 flex flex-col gap-2">
      {items.map((item, i) => (
        <Reveal
          as="details"
          key={i}
          open={i === 0}
          delay={Math.min(i, 4) * 0.05}
          className="bg-white border border-[#EBEBEB] rounded-[14px] px-6"
        >
          <summary onClick={toggle} className="flex justify-between items-center gap-4 py-5 type-body font-medium text-[#121212]">
            <span className="flex-1 min-w-0">{item.q}</span>
            <span
              aria-hidden="true"
              className="trust-faq-plus w-7 h-7 shrink-0 flex items-center justify-center text-[#4B4B4B] transition-transform duration-200 motion-reduce:transition-none"
            >
              <Plus className="h-5 w-5" strokeWidth={1.5} />
            </span>
          </summary>
          <p className="pb-[22px] type-body text-[#4B4B4B] max-w-[620px] overflow-hidden">{item.a}</p>
        </Reveal>
      ))}
      {children}
    </div>
  );
}
