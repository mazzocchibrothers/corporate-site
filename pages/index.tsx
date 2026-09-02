import React from 'react';
import Head from 'next/head';
import { useLocale, useTranslations } from 'next-intl';
import { messagesFor } from '@/i18n/messages';
import { canonical as canonicalUrl } from '@/i18n/routes';
import { LazyMotion } from 'framer-motion';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CustomerStoriesSection from '@/components/landing/CustomerStoriesSection';
import ROISection from '@/components/landing/ROISection';
import CTASection from '@/components/landing/CTASection';

const loadMotionFeatures = () => import('@/lib/motion-features').then((res) => res.default);

// One line per page is the whole contract: the argument is this route's `id` in
// routes.json, and i18n/messages.ts turns it into the namespaces to load.
export const getStaticProps = messagesFor('index');

export default function HomePage() {
  const lang = useLocale();
  const canonical = canonicalUrl('index', lang);
  const t = useTranslations('home.meta');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="canonical" href={canonical} />
        {/* Hero's italic gradient span needs Bold Italic; only this page (and /science) does. */}
        <link rel="preload" href="/fonts/MonaSans-BoldItalic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Preconnect for the hero's YouTube facade — only this page has the video. */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      </Head>
      <Navbar />
      <LazyMotion features={loadMotionFeatures} strict>
        <main>
          <HeroSection />
          <div className="fade-into-light" />
          <ProblemSection />
          <div className="fade-into-dark" />
          <SolutionSection />
          <div className="fade-into-light" />
          <HowItWorksSection />
          <div className="fade-into-dark" />
          <CustomerStoriesSection />
          <div className="fade-into-light" />
          <ROISection />
          <div className="fade-into-dark" />
          <CTASection />
          <Footer />
        </main>
      </LazyMotion>
    </>
  );
}
