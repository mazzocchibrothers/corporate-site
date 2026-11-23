'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { href } from '@/i18n/routes';
import { ClosingPanel } from '@/components/shared/ClosingPanel';

// The customers index closes on the shared light closing (the Assess closing):
// heading, sentence, demo button.
export default function CustomersFinalCTA() {
  const lang = useLocale();
  const t = useTranslations('customers');

  return (
    <ClosingPanel
      id="customers-cta"
      testId="customers-cta"
      heading={t.rich('finalCTA.heading', {
        span: (chunks) => <span className="font-semibold">{chunks}</span>,
      })}
      body={t('finalCTA.body')}
      cta={t('finalCTA.cta')}
      href={href('book-meeting', lang)}
    />
  );
}
