import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import ProductHero from '@/components/product/ProductHero';
import PlatformInfographic from '@/components/product/PlatformInfographic';
import WhatSkillvueDoes from '@/components/product/WhatSkillvueDoes';
import HowSkillvueWorks from '@/components/product/HowSkillvueWorks';
import WhatWeAssess from '@/components/product/WhatWeAssess';
import AssessmentFormats from '@/components/product/AssessmentFormats';
import IntegrationEcosystem from '@/components/product/IntegrationEcosystem';
import EnterpriseTrust from '@/components/product/EnterpriseTrust';
import ProductCTA from '@/components/product/ProductCTA';
import ProductCrossLinks from '@/components/shared/ProductCrossLinks';

export default function ProductOverviewPage() {
  const { locale } = useRouter();
  const isIT = locale === 'it';
  const canonical = `https://skillvue.ai${isIT ? '/it' : ''}/product-overview`;

  return (
    <>
      <Head>
        <title>{isIT ? 'Piattaforma | Valutazioni Talent con AI | Skillvue' : 'Platform | AI-Powered Talent Assessments | Skillvue'}</title>
        <meta name="description" content={isIT
          ? "Un'unica piattaforma per selezione, performance, L&D e successione. Valutazioni AI con scienza psicometrica e 100+ integrazioni con SAP, Workday e Oracle."
          : 'One platform for hiring, performance, L&D and succession planning. AI-powered assessments with psychometric science and 100+ integrations with SAP, Workday and Oracle.'
        } />
        <link rel="canonical" href={canonical} />
      </Head>
      <Navbar />
      <main>
        <ProductHero />
        <div className="fade-into-light" />
        <WhatSkillvueDoes />
        <div className="fade-into-dark" />
        <HowSkillvueWorks />
        <div className="fade-into-light" />
        <WhatWeAssess />
        <div className="fade-into-dark" />
        <AssessmentFormats />
        <div className="fade-into-light" />
        <IntegrationEcosystem />
        <EnterpriseTrust />
        <div className="fade-into-dark" />
        <ProductCrossLinks />
        <ProductCTA />
        <div className="fade-into-dark" />
        <Footer />
      </main>
    </>
  );
}
