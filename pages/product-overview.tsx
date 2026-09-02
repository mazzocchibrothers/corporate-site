import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Head from 'next/head';
import { messagesFor } from '@/i18n/messages';
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
import { canonical as canonicalUrl } from '@/i18n/routes';

// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('product-overview');

export default function ProductOverviewPage() {
  const lang = useLocale();
  const meta = useTranslations('product-overview.meta');
  const canonical = canonicalUrl('product-overview', lang);

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
