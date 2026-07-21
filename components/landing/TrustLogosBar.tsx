import React from 'react';

const clientLogos = [
  { name: 'Unicredit', src: '/logos/client-unicredit.svg' },
  { name: 'Carrefour', src: '/logos/client-carrefour.svg' },
  { name: 'Fidia', src: '/logos/client-fidia.svg' },
  { name: 'Generali', src: '/logos/client-generali.svg' },
  { name: 'Novacoop', src: '/logos/client-novacoop.svg' },
  { name: 'Douglas', src: '/logos/client-douglas.svg' },
  { name: 'Moncler', src: '/logos/client-moncler.svg' },
  { name: 'Lagardère', src: '/logos/client-lagardere.svg' },
  { name: 'Nespresso', src: '/logos/client-nespresso.svg' },
  { name: 'Tecnomat', src: '/logos/client-tecnomat.svg' },
  { name: 'Avolta', src: '/logos/client-avolta.svg' },
  { name: 'Europ Assistance', src: '/logos/client-europ-assistance.svg?v=2' },
];

const trustLogosIt = clientLogos;
const trustLogosEn = clientLogos;

interface TrustLogosBarProps {
  lang: 'en' | 'it';
}

export default function TrustLogosBar({ lang }: TrustLogosBarProps) {
  const baseLogos = lang === 'en' ? trustLogosEn : trustLogosIt;
  const trustLogos = [...baseLogos, ...baseLogos];

  return (
    <div className="relative z-10 overflow-hidden">
      <div
        className="flex items-center h-[60px] md:h-[80px]"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div className="marquee-track flex items-center">
            <div className="marquee-content flex items-center gap-8 md:gap-16 shrink-0 pr-8 md:pr-16">
              {trustLogos.map((logo, i) => (
                <div
                  key={`a-${i}-${logo.name}`}
                  data-testid={`trust-logo-${logo.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="shrink-0 opacity-[0.55]"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-6 w-auto object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              ))}
            </div>
            <div className="marquee-content flex items-center gap-8 md:gap-16 shrink-0 pr-8 md:pr-16" aria-hidden="true">
              {trustLogos.map((logo, i) => (
                <div key={`b-${i}-${logo.name}`} className="shrink-0 opacity-[0.45]">
                  <img
                    src={logo.src}
                    alt=""
                    className="h-6 w-auto object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
