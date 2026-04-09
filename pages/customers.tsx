// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import CustomersHero from '@/components/customers/CustomersHero';
import ExploreStories from '@/components/customers/ExploreStories';
import CustomersROI from '@/components/customers/CustomersROI';
import CustomersFinalCTA from '@/components/customers/CustomersFinalCTA';

export default function CustomersPage() {
  const { locale } = useRouter();
  const isIT = locale === 'it';
  const canonical = isIT ? 'https://skillvue.ai/it/clienti' : 'https://skillvue.ai/customers';

  return (
    <>
      <Head>
        <title>{isIT ? 'Storie di Successo | Skillvue' : 'Customer Stories | Skillvue'}</title>
        <meta name="description" content={isIT
          ? "Scopri come 50+ aziende europee come Unicredit e Carrefour hanno sostituito le decisioni intuitive sul talento con valutazioni AI obiettive. ROI 10–30x."
          : 'See how 50+ European enterprises like Unicredit and Carrefour replaced gut-feel talent decisions with objective AI assessments. 10–30x ROI.'
        } />
        <link rel="canonical" href={canonical} />
      </Head>
      <Navbar />
      <main>
        <CustomersHero />
        <ExploreStories />
        <div className="fade-into-light" />
        <CustomersROI />
        <div className="fade-into-dark" />
        <CustomersFinalCTA />
      <Footer />
      </main>
    </>
  );
}
