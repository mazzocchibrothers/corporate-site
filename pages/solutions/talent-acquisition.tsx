// @ts-nocheck
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TAHero from '@/components/solutions/ta/TAHero';
import TAProblem from '@/components/solutions/ta/TAProblem';
import TAShift from '@/components/solutions/ta/TAShift';
import TAHowSolves from '@/components/solutions/ta/TAHowSolves';
import TAPlaybook from '@/components/solutions/ta/TAPlaybook';
import TAExperience from '@/components/solutions/ta/TAExperience';
import TAImpact from '@/components/solutions/ta/TAImpact';
import TAFunnel from '@/components/solutions/ta/TAFunnel';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { messagesFor } from '@/i18n/messages';
import { canonical as canonicalUrl } from '@/i18n/routes';


// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('solutions/talent-acquisition');

export default function TalentAcquisitionPage() {
  const lang = useLocale();
  const t = useTranslations('solutions.talent-acquisition');
  const meta = useTranslations('solutions.talent-acquisition.meta');
  const canonical = canonicalUrl('solutions/talent-acquisition', lang);

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
        <TAHero />
        <div className="fade-into-light" />
        <TAProblem />
        <div className="fade-into-dark" />
        <TAShift />
        <div className="fade-into-light" />
        <TAFunnel />
        <TAImpact />
        <div className="fade-into-dark" />
        <SolutionCrossLinks currentPath="/solutions/talent-acquisition" />
        <SolutionFinalCTA headline={t('text')} accentWord={t('text2')} />
      <Footer />
      </main>
    </>
  );
}
