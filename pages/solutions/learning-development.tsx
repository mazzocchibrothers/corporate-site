// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { useLanguage } from '@/i18n/LanguageContext';
import LDHero from '@/components/solutions/ld/LDHero';
import LDProblem from '@/components/solutions/ld/LDProblem';
import LDShift from '@/components/solutions/ld/LDShift';
import LDHowSolves from '@/components/solutions/ld/LDHowSolves';
import LDIntegration from '@/components/solutions/ld/LDIntegration';
import LDImpact from '@/components/solutions/ld/LDImpact';
import SolutionCrossLinks from '@/components/shared/SolutionCrossLinks';
import SolutionFinalCTA from '@/components/shared/SolutionFinalCTA';

export default function LearningDevelopmentPage() {
  const { t, lang } = useLanguage();
  const isIT = lang === 'it';
  const canonical = `https://skillvue.ai${isIT ? '/it' : ''}/solutions/learning-development`;

  return (
    <>
      <Head>
        <title>{isIT ? 'Learning & Development | Gap Analysis Competenze | Skillvue' : 'Learning & Development | Skill Gap Analysis | Skillvue'}</title>
        <meta name="description" content={isIT
          ? "Identifica i reali gap di competenze a livello individuale, di team e organizzativo. Concentra ogni investimento formativo dove ha il maggiore impatto."
          : 'Identify real skill gaps at individual, team and org level. Target every training investment where it matters and measure impact on business outcomes.'
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
        <SolutionFinalCTA headline={t('Ready to prove L&D impact with')} accentWord={t('data?')} />
      <Footer />
      </main>
    </>
  );
}
