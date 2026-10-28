'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import ClosingBanner from '@/components/shared/ClosingBanner';

export default function CTASection() {
  const t = useTranslations('home');

  return (
    <ClosingBanner
      heading={t.rich('cta.heading', {
        span: (chunks) => <span className="font-semibold gradient-text">{chunks}</span>,
      })}
      body={t('cta.body')}
      cta={t('cta.cta')}
    />
  );
}
