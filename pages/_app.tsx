import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LanguageProvider } from "@/i18n/LanguageContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
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
