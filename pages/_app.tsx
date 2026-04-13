import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { LanguageProvider } from "@/i18n/LanguageContext";

const BASE_URL = 'https://skillvue.ai';

// Maps IT-only slugs to their EN equivalents and vice versa
const itToEn: Record<string, string> = { '/clienti': '/customers' };
const enToIt: Record<string, string> = { '/customers': '/clienti' };

function HreflangTags() {
  const { asPath } = useRouter();

  let enPath = itToEn[asPath] ?? asPath;
  let itPath = enToIt[asPath] ?? asPath;

  // Handle /customers/:slug <-> /clienti/:slug
  if (asPath.startsWith('/customers/')) {
    itPath = '/clienti/' + asPath.slice('/customers/'.length);
  } else if (asPath.startsWith('/clienti/')) {
    enPath = '/customers/' + asPath.slice('/clienti/'.length);
  }

  const enUrl = `${BASE_URL}${enPath}`;
  const itUrl = itPath === '/' ? `${BASE_URL}/it` : `${BASE_URL}/it${itPath}`;
  return (
    <Head>
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="it" href={itUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
    </Head>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <HreflangTags />
      <div className="min-h-screen">
        {/* Animated flowing background. fixed */}
        <div className="animated-bg">
          <div className="side-left" />
          <div className="side-right" />
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
          <div className="orb orb-5" />
          <div className="orb orb-6" />
          <div className="shimmer shimmer-1" />
          <div className="shimmer shimmer-2" />
          <div className="shimmer shimmer-3" />
        </div>

        {/* Grain */}
        <div className="grain-overlay" />

        {/* Content */}
        <div className="content-layer">
          <Component {...pageProps} />
        </div>
      </div>
    </LanguageProvider>
  );
}
