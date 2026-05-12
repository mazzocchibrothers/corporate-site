import React from 'react';

const trustLogosIt = [
  { name: 'Unicredit', src: '/logos/unicredit.png' },
  { name: 'Carrefour', src: '/logos/carrefour_fixed.png' },
  { name: 'Fidia', src: '/logos/fidia_fixed.png' },
  { name: 'Generali', src: '/logos/generali.png' },
  { name: 'Coop', src: '/logos/coop.png' },
  { name: 'Douglas', src: '/logos/douglas.png' },
];

const trustLogosEn = [
  { name: 'Moncler', src: '/logos/moncler-en.png' },
  { name: 'Lagardère', src: '/logos/lagardere-en.png' },
  { name: 'Nespresso', src: '/logos/nespresso-en.png' },
  { name: 'Tecnomat', src: '/logos/tecnomat-en.png' },
  { name: 'Avolta', src: '/logos/avolta-en.png' },
  { name: 'Carrefour', src: '/logos/carrefour-en.png' },
  { name: 'Generali', src: '/logos/generali-en.png' },
  { name: 'Douglas', src: '/logos/douglas-en.png' },
  { name: 'Europ Assistance', src: '/logos/europ-assistance-en.png' },
];

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
                    className="h-6 md:h-8 w-auto object-contain max-w-[90px] md:max-w-[120px]"
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
                    className="h-6 md:h-8 w-auto object-contain max-w-[90px] md:max-w-[120px]"
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
