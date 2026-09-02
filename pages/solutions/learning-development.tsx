// @ts-nocheck
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import LDHero from '@/components/solutions/ld/LDHero';
import LDProblem from '@/components/solutions/ld/LDProblem';
import LDShift from '@/components/solutions/ld/LDShift';
import LDHowSolves from '@/components/solutions/ld/LDHowSolves';
import LDIntegration from '@/components/solutions/ld/LDIntegration';
import LDImpact from '@/components/solutions/ld/LDImpact';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { messagesFor } from '@/i18n/messages';
import { canonical as canonicalUrl } from '@/i18n/routes';


// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('solutions/learning-development');

export default function LearningDevelopmentPage() {
  const lang = useLocale();
  const t = useTranslations('solutions.learning-development');
  const meta = useTranslations('solutions.learning-development.meta');
  const canonical = canonicalUrl('solutions/learning-development', lang);

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
        <LDHero />
        <div className="fade-into-light" />
        <LDProblem />
        <div className="fade-into-dark" />
        <LDShift />
        <div className="fade-into-light" />
        <LDHowSolves />
        <div className="fade-into-dark" />
        <LDIntegration />
        <SolutionCrossLinks currentPath="/solutions/learning-development" />
        <div className="fade-into-light" />
        <LDImpact />
        <div className="fade-into-dark" />
        <SolutionFinalCTA headline={t('text')} accentWord={t('text2')} />
      <Footer />
      </main>
    </>
  );
}
