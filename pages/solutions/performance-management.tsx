// @ts-nocheck
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import PMHero from '@/components/solutions/pm/PMHero';
import PMProblem from '@/components/solutions/pm/PMProblem';
import PMShift from '@/components/solutions/pm/PMShift';
import PMHowSolves from '@/components/solutions/pm/PMHowSolves';
import PMImpact from '@/components/solutions/pm/PMImpact';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { messagesFor } from '@/i18n/messages';
import { canonical as canonicalUrl } from '@/i18n/routes';


// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('solutions/performance-management');

export default function PerformanceManagementPage() {
  const lang = useLocale();
  const t = useTranslations('solutions.performance-management');
  const meta = useTranslations('solutions.performance-management.meta');
  const canonical = canonicalUrl('solutions/performance-management', lang);

  return (
    <>
      <Head>
        <title>{meta('title')}</title>
        <meta name="description" content={meta('description')
        } />
        <link rel="canonical" href={canonical} />
      </Head>
      <Navbar />
      <main>
        <PMHero />
        <div className="fade-into-light" />
        <PMProblem />
        <div className="fade-into-dark" />
        <PMShift />
        <div className="fade-into-light" />
        <PMHowSolves />
        <div className="fade-into-dark" />
        <SolutionCrossLinks currentPath="/solutions/performance-management" />
        <SolutionFinalCTA headline={t('text')} accentWord={t('text2')} />
      <Footer />
      </main>
    </>
  );
}
