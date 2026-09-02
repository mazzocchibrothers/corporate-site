// @ts-nocheck
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import PRHero from '@/components/solutions/pr/PRHero';
import PRProblem from '@/components/solutions/pr/PRProblem';
import PRHowSolves from '@/components/solutions/pr/PRHowSolves';
import PRConsulting from '@/components/solutions/pr/PRConsulting';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';
import { messagesFor } from '@/i18n/messages';
import { canonical as canonicalUrl } from '@/i18n/routes';


// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('solutions/project-resourcing');

export default function ProjectResourcingPage() {
  const lang = useLocale();
  const t = useTranslations('solutions.project-resourcing');
  const meta = useTranslations('solutions.project-resourcing.meta');
  const canonical = canonicalUrl('solutions/project-resourcing', lang);

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
        <PRHero />
        <div className="fade-into-light" />
        <PRProblem />
        <div className="fade-into-dark" />
        <PRHowSolves />
        <div className="fade-into-light" />
        <PRConsulting />
        <div className="fade-into-dark" />
        <SolutionCrossLinks currentPath="/solutions/project-resourcing" />
        <SolutionFinalCTA headline={t('text')} accentWord={t('text2')} />
      <Footer />
      </main>
    </>
  );
}
