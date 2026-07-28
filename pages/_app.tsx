import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      {/* Loaded after hydration so GTM's tags (analytics, consent banner,
          ad pixels, etc.) don't compete with the page's own JS for
          main-thread time on load. afterInteractive (not lazyOnload) is
          deliberate: lazyOnload waits for window.load + idle, which risks
          missing pageview/pixel fires for visitors who bounce quickly. */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5JPQP5T');`,
        }}
      />
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
