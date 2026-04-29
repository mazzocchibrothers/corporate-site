// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import { ArrowLeft } from 'lucide-react';

export default function PrenotaUnIncontroPage() {
  const formRef = useRef(null);
  const router = useRouter();

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
          formId: 'd841a6fe-99a0-46cd-af9c-389b8df01855',
          region: 'na1',
          target: '#hubspot-form-it',
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
      <section className="relative min-h-screen flex items-center pt-[80px]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            {/* Left. Text */}
            <div className="lg:col-span-5">
              <button
                onClick={() => { router.back(); }}
                className="group inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors duration-300 mb-10"
              >
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
                Indietro
              </button>

              <h1
                className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.03em] text-white/95 mb-6"
                style={{ lineHeight: 1.1 }}
              >
                Parliamo della tua{' '}
                <span className="font-bold gradient-text">talent strategy.</span>
              </h1>

              <p className="text-[18px] text-white/[0.55] leading-[1.75] max-w-md" style={{ fontWeight: 300 }}>
                Prenota una demo con il nostro team per scoprire come Skillvue può trasformare i tuoi processi di selezione, performance e sviluppo grazie a dati chiari e oggettivi supportati dalla scienza.
              </p>
            </div>

            {/* Right. HubSpot Form */}
            <div className="lg:col-span-7">
              <div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 lg:p-12"
              >
                <div
                  id="hubspot-form-it"
                  ref={formRef}
                  data-testid="hubspot-form"
                  style={{ minHeight: '400px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
