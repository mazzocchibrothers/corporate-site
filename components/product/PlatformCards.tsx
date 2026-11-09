'use client';

import type { CSSProperties, MouseEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { href } from '@/i18n/routes';

// The three products — Map, Assess, Decide — as one card each. /product and
// the homepage render this same block, so the platform reads the same
// wherever it is introduced. Its copy is `product.platform` and
// `product.logos`; a route other than /product receives those two through
// `messages` in i18n/routes.json.
//
// `link="section"` (on /product) scrolls to the product's section below;
// `link="page"` (anywhere else) goes to that section on /product.

const PRODUCTS = ['map', 'assess', 'decide'] as const;
type Product = (typeof PRODUCTS)[number];

const H2 = 'font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-[#121212] text-balance';
// The line break is desktop-only, so it carries the space the message does not.
const br = () => <>{' '}<br className="hidden md:inline" /></>;

/** The block's tint, peach to lavender. A page that tints the whole section
 *  with it passes `surface={false}`, and the block then draws no card of its own. */
export const PLATFORM_GRADIENT = 'linear-gradient(90deg, #fdf1ea 0%, #f5f5f7 50%, #efeefd 100%)';

// On /product the card fades in from the white hero above it.
const SURFACE: CSSProperties = {
  background: `linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.85) 18%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0) 62%), ${PLATFORM_GRADIENT}`,
};

export function PlatformCards({ link, surface = true }: { link: 'section' | 'page'; surface?: boolean }) {
  const t = useTranslations('product');
  const locale = useLocale();
  const Arrow = link === 'section' ? ArrowDown : ArrowRight;
  const arrowNudge = link === 'section' ? 'group-hover:translate-y-0.5' : 'group-hover:translate-x-0.5';

  const target = (p: Product) => (link === 'section' ? `#${p}` : `${href('product', locale)}#${p}`);
  const onClick = (p: Product) =>
    link === 'section'
      ? (e: MouseEvent) => {
          e.preventDefault();
          document.getElementById(p)?.scrollIntoView({ behavior: 'smooth' });
        }
      : undefined;

  return (
    <Reveal
      y={32}
      scale={0.98}
      duration={0.9}
      className={`max-w-[1344px] mx-5 md:mx-8 lg:mx-auto text-center ${surface ? 'rounded-[24px] md:rounded-[40px] px-4 pb-4 md:px-12 md:pb-12' : 'md:px-12'}`}
      style={surface ? SURFACE : undefined}
    >
      <h2 className={`${H2} max-w-[880px] mx-auto`}>{t.rich('platform.heading', { br })}</h2>
      <div className="mt-10 lg:mt-12 grid gap-3 md:grid-cols-3 lg:gap-[42px]">
        {PRODUCTS.map((p) => (
          <a
            key={p}
            href={target(p)}
            onClick={onClick(p)}
            className="group flex flex-col items-center gap-[26px] rounded-2xl border border-[#e5e7eb] bg-white px-5 pt-6 pb-[22px] md:px-8 md:pt-8 md:pb-[30px] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(20,20,60,0.10),0_2px_6px_rgba(20,20,60,0.03)]"
          >
            <img
              src={`/products/skillvue-${p}.svg`}
              alt={t(`logos.${p}`)}
              loading="lazy"
              decoding="async"
              className="h-8 w-auto block"
            />
            <p className="type-body text-[#4B4B4B] text-balance">{t(`platform.cards.${p}`)}</p>
            <span className="type-button mt-auto flex items-center gap-2 font-medium text-[#4B4DF7] group-hover:text-[#3133E7] transition-colors">
              {t('platform.explore')}
              <Arrow className={`w-3.5 h-3.5 transition-transform ${arrowNudge}`} strokeWidth={1.8} aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </Reveal>
  );
}
