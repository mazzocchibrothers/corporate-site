import React from 'react';
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
  return (
    <>
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
