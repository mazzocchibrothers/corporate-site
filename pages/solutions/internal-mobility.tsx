// @ts-nocheck
import React from 'react';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { useLanguage } from '@/i18n/LanguageContext';
import IMHero from '@/components/solutions/im/IMHero';
import IMProblem from '@/components/solutions/im/IMProblem';
import IMShift from '@/components/solutions/im/IMShift';
import IMHowSolves from '@/components/solutions/im/IMHowSolves';
import IMImpact from '@/components/solutions/im/IMImpact';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { messagesFor } from '@/i18n/messages';
import { canonical as canonicalUrl } from '@/i18n/routes';


// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('solutions/internal-mobility');

export default function InternalMobilityPage() {
  const { t, lang } = useLanguage();
  const meta = useTranslations('solutions.internal-mobility.meta');
  const canonical = canonicalUrl('solutions/internal-mobility', lang);

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
        <IMHero />
        <div className="fade-into-light" />
        <IMProblem />
        <div className="fade-into-dark" />
        <IMShift />
        <div className="fade-into-light" />
        <IMHowSolves />
        <div className="fade-into-dark" />
        <SolutionCrossLinks currentPath="/solutions/internal-mobility" />
        <SolutionFinalCTA headline={t('Ready to unlock the talent you')} accentWord={t('already have?')} />
      <Footer />
      </main>
    </>
  );
}
