'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { href } from '@/i18n/routes';
import { announcementClickEvent } from '@/components/landing/announcement';

// The launch announcement above the navbar, on every page but the one it links
// to. It sits inside the navbar's fixed header and folds away once the page
// scrolls or the mobile menu opens, so the bar under it is the usual 80px
// everywhere the page relies on that (section anchors, the mobile menu's top).
// While folded it is inert: its link leaves the tab order.
//
// The header is fixed, so the banner would cover the top of every page.
// <AnnouncementSpacer> sits in the page's flow above everything else and takes
// the banner's height, whatever its copy wraps to, so the page starts below it.

const LINE = 'mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-2.5 text-center type-body-sm lg:px-12';

/** The banner's text laid out invisibly in flow: the same height, nothing to read or click. */
export function AnnouncementSpacer() {
  const t = useTranslations('common.announcement');
  return (
    <div aria-hidden="true" inert className="invisible">
      <p className={LINE}>
        <span>{t('text')}</span>
        <span className="inline-flex items-center gap-1 font-medium">
          {t('link')}
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
        </span>
      </p>
    </div>
  );
}

export function AnnouncementBar({ visible }: { visible: boolean }) {
  const t = useTranslations('common.announcement');
  const locale = useLocale();

  return (
    <div
      data-testid="announcement"
      className="grid bg-[#e1e2ff] transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
      style={{ gridTemplateRows: visible ? '1fr' : '0fr' }}
      inert={!visible}
      aria-hidden={!visible}
    >
      <div className="min-h-0 overflow-hidden">
        <p
          data-testid="announcement-bar"
          className={`${LINE} text-[#121212]`}
        >
          <span>{t('text')}</span>
          <a
            href={href('product/skillvue-assess', locale)}
            data-testid="announcement-link"
            onClick={() => {
              (window.dataLayer ??= []).push(announcementClickEvent(locale));
            }}
            className="inline-flex items-center gap-1 font-medium text-[#4B4DF7] underline decoration-[#4B4DF7]/40 underline-offset-4 transition-colors hover:text-[#3133E7] hover:decoration-[#3133E7]"
          >
            {t('link')}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </a>
        </p>
      </div>
    </div>
  );
}
