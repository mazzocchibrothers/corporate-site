// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';

export default function FoodRetailPage() {
  const formRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      if (window.hbspt && formRef.current) {
        window.hbspt.forms.create({
          portalId: '48438018',
          formId: '824a40f6-57e6-46eb-bada-ca5d6f8122ea',
          region: 'na1',
          target: '#lead-form',
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col min-h-screen lg:h-screen pt-[80px]">
        <section className="relative flex-1 flex items-center min-h-0">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-6 lg:py-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left. Text */}
              <div className="lg:col-span-5">
                <h1
                  className="text-[clamp(2.25rem,4.2vw,3.5rem)] font-bold tracking-[-0.03em] text-white/95 mb-4"
                  style={{ lineHeight: 1.1 }}
                >
                  Get the one-pager for{' '}
                  <span className="font-bold gradient-text">food retail HR.</span>
                </h1>

                <p className="text-[18px] text-white/95 leading-[1.65] max-w-md" style={{ fontWeight: 300 }}>
                  How an objective read of skills sharpens hiring, promotion, and development decisions.
                </p>

                <p className="text-[18px] text-white/95 leading-[1.65] max-w-md mt-4" style={{ fontWeight: 300 }}>
                  One standard across every store, the same for new hires and the people you grow from within.
                </p>

                <p className="text-[18px] text-white/95 leading-[1.65] max-w-md mt-4" style={{ fontWeight: 300 }}>
                  Fill in the form to download it.
                </p>
              </div>

              {/* Right. Form */}
              <div className="lg:col-span-7">
                <div
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 lg:p-6"
                >
                  <div
                    id="lead-form"
                    ref={formRef}
                    data-testid="lead-form"
                    style={{ minHeight: '400px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <TrustLogosBar lang="en" />
      </div>
      <Footer />
    </>
  );
}
