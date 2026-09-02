// @ts-nocheck
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import ScienceHero from '@/components/science/ScienceHero';
import ScientificPillars from '@/components/science/ScientificPillars';
import ScienceTeam from '@/components/science/ScienceTeam';
import MethodologyLifecycle from '@/components/science/MethodologyLifecycle';
import ResponsibleAI from '@/components/science/ResponsibleAI';
import ScienceCTA from '@/components/science/ScienceCTA';
import ProductCrossLinks from '@/components/shared/ProductCrossLinks';
import { messagesFor } from '@/i18n/messages';
import { canonical as canonicalUrl } from '@/i18n/routes';


// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('science');

export default function SciencePage() {
  const lang = useLocale();
  const meta = useTranslations('science.meta');
  const canonical = canonicalUrl('science', lang);

  return (
    <>
      <Head>
        <title>{meta('title')}</title>
        <meta name="description" content={meta('description')
        } />
        <link rel="canonical" href={canonical} />
        {/* Hero's italic gradient span needs Bold Italic; only this page (and the homepage) does. */}
        <link rel="preload" href="/fonts/MonaSans-BoldItalic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <Navbar />
      <main>
        <ScienceHero />
        <div className="fade-into-light" />
        <ScientificPillars />
        <ScienceTeam />
        <div className="fade-into-dark" />
        <MethodologyLifecycle />
        <div className="fade-into-light" />
        <ResponsibleAI />
        <div className="fade-into-dark" />
        <ProductCrossLinks />
        <ScienceCTA />
      <Footer />
      </main>
    </>
  );
}
