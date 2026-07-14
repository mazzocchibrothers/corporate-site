// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import Navbar from '@/components/landing/Navbar';
import TrustLogosBar from '@/components/landing/TrustLogosBar';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="relative flex flex-col min-h-screen lg:h-screen pt-[80px]">
      <section className="relative flex-1 flex items-center min-h-0">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 w-full py-6 lg:py-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left. Text */}
            <div className="lg:col-span-5">
              <Button
                onClick={() => { router.back(); }}
                variant="tertiary"
                mode="dark"
                icon={<ArrowLeft aria-hidden />}
                iconPosition="left"
                className="mb-6"
              >
                Indietro
              </Button>

              <h1
                className="text-[48px] md:text-[64px] font-semibold tracking-[-0.02em] text-white/95 mb-4"
                style={{ lineHeight: 1.1 }}
              >
                Parliamo della tua{' '}
                <span className="font-bold gradient-text">talent strategy.</span>
              </h1>

              <p className="text-[16px] text-white/[0.55] leading-[1.65] max-w-md" style={{ fontWeight: 300 }}>
                Prenota una demo con il nostro team per scoprire come Skillvue può trasformare i tuoi processi di selezione, performance e sviluppo grazie a dati chiari e oggettivi supportati dalla scienza.
              </p>
            </div>

            {/* Right. HubSpot Form */}
            <div className="lg:col-span-7">
              <div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 lg:p-6"
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
        <TrustLogosBar lang="it" />
      </div>
      <Footer />
    </>
  );
}
