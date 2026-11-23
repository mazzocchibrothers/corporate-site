'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { href } from '@/i18n/routes';
import { ClosingPanel } from '@/components/shared/ClosingPanel';

// /science closes on the shared light closing (the Assess closing): heading,
// sentence, demo button. No top rule — a temporary exception until /science is
// converted: the product cross-links above are built as one block with it.
export default function ScienceCTA() {
  const lang = useLocale();
  const t = useTranslations('science');

  return (
    <ClosingPanel
      id="science-cta"
      testId="science-cta"
      heading={t.rich('cta.heading', {
        span: (chunks) => <span className="font-semibold">{chunks}</span>,
      })}
      body={t('cta.body')}
      cta={t('cta.cta')}
      href={href('book-meeting', lang)}
      ctaTestId="science-cta-demo"
    />
  );
}
