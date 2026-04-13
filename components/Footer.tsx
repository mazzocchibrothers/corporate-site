import React from 'react';
import { useRouter } from 'next/router';
import SkillvueLogo from './landing/SkillvueLogo';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const footerLinks = [
  {
    title: 'Platform',
    titleIt: 'Piattaforma',
    links: [
      { name: 'Product', nameIt: 'Prodotto', href: '/product-overview' },
      { name: 'Science', nameIt: 'Scienza', href: '/science' },
    ],
  },
  {
    title: 'Solutions',
    titleIt: 'Soluzioni',
    links: [
      { name: 'Hiring', nameIt: 'Hiring', href: '/solutions/talent-acquisition' },
      { name: 'Performance Management', nameIt: 'Performance Management', href: '/solutions/performance-management' },
      { name: 'Learning & Development', nameIt: 'Learning & Development', href: '/solutions/learning-development' },
      { name: 'Internal Mobility', nameIt: 'Internal Mobility', href: '/solutions/internal-mobility' },
      { name: 'Project Resourcing', nameIt: 'Project Resourcing', href: '/solutions/project-resourcing' },
    ],
  },
  {
    title: 'Customers',
    titleIt: 'Clienti',
    links: [
      { name: 'Customer Stories', nameIt: 'Storie di Successo', href: '/customers', hrefIt: '/clienti' },
    ],
  },
  {
    title: 'Resources',
    titleIt: 'Risorse',
    links: [
      { name: 'Blog', nameIt: 'Blog', href: '/blog', hideInIT: true },
      { name: 'White Papers', nameIt: 'White Papers', href: '/resources/whitepapers', hideInIT: true },
      { name: 'About', nameIt: 'Chi siamo', href: '/about' },
      { name: 'Book a Meeting', nameIt: 'Prenota un Incontro', href: '/book-meeting', hrefIt: '/prenota-incontro' },
    ],
  },
];

const socials = [
  { icon: Instagram, href: 'https://www.instagram.com/skillvue.ai/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/skillvue.ai', label: 'Facebook' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/skillvue/', label: 'LinkedIn' },
];

export default function Footer() {
  const { t, lang } = useLanguage();
  const router = useRouter();

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      router.push(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="relative border-t border-white/[0.04] pt-14 pb-6">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-24 mb-8">

          {/* Left: logo + socials + newsletter */}
          <div className="flex flex-col items-center lg:items-start">
            <a href="/" onClick={handleClick('/')} className="flex items-center gap-3 mb-8">
              <SkillvueLogo size={40} style={{ color: '#ffffff' }} />
              <span className="font-semibold text-[24px] tracking-tight text-white">Skillvue</span>
            </a>

            <div className="flex items-center gap-3 mb-8">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/[0.25] transition-all duration-300"
                    aria-label={s.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            <p className="text-[11px] text-white/25 leading-[1.5] text-center lg:text-left max-w-[180px]">
              {lang === 'it'
                ? "Partner della ricerca 2025/2026 dell'Osservatorio HR del Politecnico di Milano"
                : 'Partner of the 2025/2026 research of Osservatorio HR Politecnico di Milano'}
            </p>
          </div>

          {/* Right: 4 link columns matching nav order */}
          <div className="grid grid-cols-4 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-[16px] font-semibold text-white/85 mb-7">
                  {lang === 'it' ? group.titleIt : group.title}
                </h4>
                <ul className="space-y-5 lg:space-y-4">
                  {group.links.filter(link => !(lang === 'it' && (link as any).hideInIT)).map((link) => {
                    const href = lang === 'it' && (link as any).hrefIt ? (link as any).hrefIt : link.href;
                    const name = lang === 'it' ? (link as any).nameIt : link.name;
                    return (
                      <li key={link.name}>
                        <a
                          href={href}
                          onClick={handleClick(href)}
                          className="text-[15px] text-white/35 hover:text-white/65 transition-colors duration-300"
                        >
                          {name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-white/20">
            &copy; {new Date().getFullYear()} Skillvue. {t('All rights reserved.')}
          </span>
          <div className="flex flex-wrap items-center gap-6">
            {[
              {
                label: 'Privacy Policy',
                href: lang === 'it' ? 'https://www.iubenda.com/privacy-policy/75783964' : 'https://www.iubenda.com/privacy-policy/45750674/full-legal',
              },
              {
                label: 'Cookie Policy',
                href: lang === 'it' ? 'https://www.iubenda.com/privacy-policy/75783964/cookie-policy' : 'https://www.iubenda.com/privacy-policy/45750674/cookie-policy',
              },
              {
                label: lang === 'it' ? 'Politica dei Sistemi di Gestione' : 'Management System Policy',
                href: 'https://cdn.prod.website-files.com/63eb9c5c0665608db409b4df/68711dddeb1206d0f80e3194_PoliticaDeiSistemiDiGestione.pdf',
              },
              {
                label: lang === 'it' ? 'Politica di Sicurezza delle Informazioni' : 'Information Security Policy',
                href: 'https://cdn.prod.website-files.com/63eb9c5c0665608db409b4df/68711e6395c0cd387565988b_PoliticaDiSicurezzaDelleInformazioni.pdf',
              },
              {
                label: lang === 'it' ? 'Trattamento dati personali' : 'Personal Data Processing',
                href: '/privacy-policy-algo',
              },
            ].map(({ label, href }) => (
              href.startsWith('http') ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/20 hover:text-white/40 transition-colors duration-300">
                  {label}
                </a>
              ) : (
                <a key={label} href={href} onClick={handleClick(href)} className="text-[13px] text-white/20 hover:text-white/40 transition-colors duration-300">
                  {label}
                </a>
              )
            ))}
          </div>
        </div>

        {/* Company info line */}
        <div className="border-t border-white/[0.04] pt-4 mt-6">
          <p className="text-[11px] text-white/20 text-center">
            Algojob S.r.l. — Via Molino delle Armi 11, 20123 Milano — P.IVA 11656370969 — REA MI-2617568
          </p>
        </div>
      </div>
    </footer>
  );
}
