// @ts-nocheck
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import CustomersHero from '@/components/customers/CustomersHero';
import ExploreStories from '@/components/customers/ExploreStories';
import CustomersROI from '@/components/customers/CustomersROI';
import CustomersFinalCTA from '@/components/customers/CustomersFinalCTA';
import { messagesFor } from '@/i18n/messages';
import { canonical as canonicalUrl } from '@/i18n/routes';


// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('customers');

export default function CustomersPage() {
  const lang = useLocale();
  const meta = useTranslations('customers.meta');
  const canonical = canonicalUrl('customers', lang);

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
