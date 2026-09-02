'use client';

import React from 'react';
import { useRouter } from '@/i18n/navigation';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { href } from '@/i18n/routes';

// Route ids, not paths — the URL for each comes from the registry through
// href(), which is what retired the hrefIt flags. Labels come from the
// catalogue, keyed on the same ids.
const footerGroups = [
  { id: 'platform', links: ['product-overview', 'science'] },
  {
    id: 'solutions',
    links: [
      'solutions/talent-acquisition',
      'solutions/performance-management',
      'solutions/learning-development',
      'solutions/internal-mobility',
      'solutions/project-resourcing',
    ],
  },
  { id: 'customers', links: ['customers', 'book-meeting'] },
  { id: 'resources', links: ['blog', 'resources/whitepapers', 'resources/press', 'about', 'careers'] },
];

// English-only content, not advertised to Italian visitors. Same list and same
// reason as the navbar: it is an editorial decision, not something the registry
// knows, until #116 declares those routes English-only.
const HIDDEN_IN_IT = new Set(['blog', 'resources/whitepapers']);

/** 'solutions/talent-acquisition' -> 'talentAcquisition', the label's key. */
const labelKey = (id: string) =>
  id.split('/').pop()!.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

const socials = [
  { icon: Instagram, href: 'https://www.instagram.com/skillvue.ai/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/skillvue.ai', label: 'Facebook' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/skillvue/', label: 'LinkedIn' },
];

export default function Footer() {
  const lang = useLocale();
  const t = useTranslations('common');
  const router = useRouter();

  const handleClick = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (target.startsWith('http')) {
      window.open(target, '_blank');
    } else {
      router.push(target);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="relative border-t border-white/[0.04] bg-[#050508] pt-10 md:pt-14 pb-6">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-24 mb-8">

          {/* Left: logo + socials */}
          <div className="flex flex-col items-center lg:items-start">
            <a href="/" onClick={handleClick('/')} className="flex items-center mb-5 md:mb-8">
              <img
                src="/logos/Skillvue_logo_solid_white.svg"
                alt="Skillvue"
                width={961}
                height={240}
                loading="lazy"
                className="h-6 w-auto block border-0"
              />
            </a>

            <div className="flex items-center gap-2.5 md:gap-3 mb-5 md:mb-8">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/[0.25] transition-all duration-300"
                    aria-label={s.label}
                  >
                    <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </a>
                );
              })}
            </div>

            <p className="text-[12px] md:text-[11px] text-white/45 leading-[1.5] text-center lg:text-left max-w-[180px]">
              {t('footer.researchPartner')}
            </p>
          </div>

          {/* Link sections — stacked on mobile with horizontal links, 4-col grid on desktop */}
          <div className="flex flex-col gap-6 md:grid md:grid-cols-4 md:gap-8">
            {footerGroups.map((group) => (
              <div key={group.id}>
                <h4 className="text-[15px] md:text-[16px] font-semibold text-white/85 mb-2 md:mb-7 text-center md:text-left">
                  {t(`footer.groups.${group.id}`)}
                </h4>
                <div className="flex flex-col items-center gap-4 md:items-start md:block md:space-y-4">
                  {group.links.filter(id => !(lang === 'it' && HIDDEN_IN_IT.has(id))).map((id) => (
                    <a
                      key={id}
                      href={href(id, lang)}
                      onClick={handleClick(href(id, lang))}
                      className="block text-center md:text-left text-[14px] md:text-[15px] text-white/55 hover:text-white/65 transition-colors duration-300 py-1 md:py-0"
                    >
                      {t(`footer.links.${labelKey(id)}`)}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
          <div className="text-center sm:text-left">
            <p className="text-[12px] md:text-[13px] text-white/40">
              &copy; {new Date().getFullYear()} Skillvue. {t('footer.rights')}
            </p>
            <p className="text-[12px] md:text-[13px] text-white/40">
              Algojob S.r.l. — Via Molino delle Armi 11, 20123 Milano — P.IVA 11656370969 — REA MI-2617568
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            {[
              { label: t('footer.legal.privacy'), href: href('privacy-policy', lang) },
              {
                label: t('footer.legal.cookies'),
                // Two Iubenda policies, one per language — an external id, not a
                // route, so it cannot come from the registry.
                href: lang === 'it'
                  ? 'https://www.iubenda.com/privacy-policy/75783964/cookie-policy'
                  : 'https://www.iubenda.com/privacy-policy/45750674/cookie-policy',
              },
              { label: t('footer.legal.dataProcessing'), href: href('privacy-policy-algo', lang) },
            ].map(({ label, href }) => (
              href.startsWith('http') ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-[12px] md:text-[13px] text-white/40 hover:text-white/40 transition-colors duration-300 py-2 md:py-0">
                  {label}
                </a>
              ) : (
                <a key={label} href={href} onClick={handleClick(href)} className="text-[12px] md:text-[13px] text-white/40 hover:text-white/40 transition-colors duration-300 py-2 md:py-0">
                  {label}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
