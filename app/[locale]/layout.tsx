// Root layout — the App Router replacement for pages/_app.tsx (98 lines) and
// pages/_document.tsx (47 lines) together. Everything both of those carried on
// every page lives here: the html/body shell, the head links, the animated
// background layers, the grain overlay, and GTM.
//
// Both files stay in place while pages/ still serves most routes. They are
// deleted with the last page that leaves.

import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/i18n/urls';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: [
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
};

// themeColor is not part of `metadata` in the App Router — it belongs to the
// viewport export, and Next warns (then ignores it) if it stays above.
export const viewport: Viewport = {
  themeColor: '#4B4DF7',
  // Next's default is width=device-width, initial-scale=1. viewport-fit=cover is
  // the part it does not add, and pages/_app.tsx did — it is what lets the fixed
  // navbar reach under the notch instead of leaving a white band above it.
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Both locales are prerendered. Without this every page falls back to dynamic
// rendering, which for a static marketing site means paying for a server render
// on a page whose content changed last month.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // An unknown locale is a 404, not a silent fallback to English: `/fr/about`
  // rendering the English page would let a broken link look like a working one.
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering — without it every descendant becomes dynamic.
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        {/* Preconnect to GTM, loaded on every page. The YouTube preconnects
            live on the homepage's own metadata — that's the only page with the
            video, and every other page would otherwise open those connections
            for nothing. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Preload the weights used above the fold on nearly every page: body
            text (Regular), hero heading (SemiBold), and the hero's non-italic
            gradient span (Bold). BoldItalic is only needed by the homepage and
            /science — those two preload it themselves rather than every other
            page paying for it. */}
        <link rel="preload" href="/fonts/MonaSans-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/MonaSans-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/MonaSans-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {/* GTM noscript, first in body as Google requires. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5JPQP5T" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />

        {/* Loaded after hydration so GTM's tags (analytics, consent banner, ad
            pixels) don't compete with the page's own JS for main-thread time on
            load. afterInteractive (not lazyOnload) is deliberate: lazyOnload
            waits for window.load + idle, which risks missing pageview/pixel
            fires for visitors who bounce quickly. */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5JPQP5T');`,
          }}
        />

        {/* No NextIntlClientProvider here, deliberately. One rendered at this
            level inherits the whole catalogue from i18n/request.ts and
            serializes it into every document: measured, a ten-line probe page
            prerendered to 310 KB, of which 251 KB was copy no page on screen
            used. Each page provides its own, narrowed to the namespaces it
            renders — see messagesForRoute in i18n/messages.ts. */}
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
          <div className="content-layer">{children}</div>
        </div>
      </body>
    </html>
  );
}
