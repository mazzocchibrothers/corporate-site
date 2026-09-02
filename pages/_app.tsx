import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { toEnPath, toItPath } from "@/i18n/localePaths";

const BASE_URL = 'https://skillvue.ai';

function HreflangTags() {
  const { asPath } = useRouter();

  const enPath = toEnPath(asPath);
  const itPath = toItPath(asPath);

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

// A missing key must not read as a silent English fallback. In dev it throws, so
// whoever introduced it sees it on the page they are already looking at. In
// production it degrades instead, because one absent string is not a reason to
// take the site down — `npm run check:i18n` in CI is what keeps them out of
// production in the first place.
function onIntlError(error: unknown) {
  if (process.env.NODE_ENV === 'production') {
    console.error(error);
    return;
  }
  throw error;
}

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  return (
    <NextIntlClientProvider
      locale={locale ?? 'en'}
      timeZone="Europe/Rome"
      // Pages migrated to next-intl provide these from getStaticProps via
      // i18n/messages.ts. The rest of the site has not been migrated yet
      // (#106-#118), so an absent `messages` is expected, not an error.
      messages={pageProps.messages ?? {}}
      onError={onIntlError}
    >
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
    </NextIntlClientProvider>
  );
}
