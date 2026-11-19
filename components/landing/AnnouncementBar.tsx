'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { href } from '@/i18n/routes';
import { announcementClickEvent } from '@/components/landing/announcement';

// The launch announcement above the navbar, on every page but the one it links
// to. It sits inside the navbar's fixed header and stays there while the page
// scrolls. It folds away only while the mobile menu is open, because that menu
// opens at 80px from the top. While folded it is inert: its link leaves the
// tab order.
//
// The header is fixed, so the banner would cover the top of every page.
// <AnnouncementSpacer> sits in the page's flow above everything else and takes
// the banner's height, whatever its copy wraps to, so the page starts below it.
// Section anchors already clear the 80px bar with their own scroll margin; the
// banner adds its measured height to the page's scroll padding, so a jump to
// an anchor lands below the banner too.

// Below sm the line is one flowing paragraph, the link inline after the text,
// so the two share lines and the bar stays at two lines on a phone: from 360px
// in both languages at 14px, and below 360px at the 12px caption size, which
// the longer Italian copy needs there. From sm up, text and link sit side by
// side, the link wrapping under the text only when the line runs out.
const LINE = 'mx-auto max-w-[1400px] px-4 py-2.5 text-center type-body-sm max-[359px]:type-caption sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-1 sm:px-6 lg:px-12';
const LINK = 'inline-flex items-center gap-1 font-medium text-[#4B4DF7] underline decoration-[#4B4DF7]/40 underline-offset-4 transition-colors hover:text-[#3133E7] hover:decoration-[#3133E7]';

/**
 * The banner's one line: its text and its link. The bar and the spacer both
 * render this, so the spacer's height always matches the bar's. In the spacer
 * (`live={false}`) the link is a plain span: same box, nothing to click.
 */
function AnnouncementLine({ live }: { live: boolean }) {
  const t = useTranslations('common.announcement');
  const locale = useLocale();
  const content = (
    <>
      {t('link')}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
    </>
  );
  return (
    <p data-testid={live ? 'announcement-bar' : undefined} className={`${LINE} text-[#121212]`}>
      <span>{t('text')}</span>{' '}
      {live ? (
        <a
          href={href('product/skillvue-assess', locale)}
          data-testid="announcement-link"
          onClick={() => {
            (window.dataLayer ??= []).push(announcementClickEvent(locale));
          }}
          className={LINK}
        >
          {content}
        </a>
      ) : (
        <span className={LINK}>{content}</span>
      )}
    </p>
  );
}

/** The banner's line laid out invisibly in flow: the same height, nothing to read or click. */
export function AnnouncementSpacer() {
  return (
    <div aria-hidden="true" inert className="invisible">
      <AnnouncementLine live={false} />
    </div>
  );
}

export function AnnouncementBar({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const root = document.documentElement;
    const ro = new ResizeObserver(() => {
      root.style.scrollPaddingTop = `${el.offsetHeight}px`;
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.scrollPaddingTop = '';
    };
  }, []);

  return (
    <div
      ref={ref}
      data-testid="announcement"
      className="grid bg-[#e1e2ff] transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
      style={{ gridTemplateRows: visible ? '1fr' : '0fr' }}
      inert={!visible}
      aria-hidden={!visible}
    >
      <div className="min-h-0 overflow-hidden">
        <AnnouncementLine live />
      </div>
    </div>
  );
}
