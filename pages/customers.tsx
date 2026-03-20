// @ts-nocheck
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import CustomersHero from '@/components/customers/CustomersHero';
import CustomerHighlights from '@/components/customers/CustomerHighlights';
import ExploreStories from '@/components/customers/ExploreStories';
import CustomersROI from '@/components/customers/CustomersROI';
import CustomersFinalCTA from '@/components/customers/CustomersFinalCTA';

export default function CustomersPage() {
  return (
    <>
      <Navbar />
      <main>
        <CustomersHero />
        <div className="fade-into-light" />
        <CustomerHighlights />
        <div className="fade-into-dark" />
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
