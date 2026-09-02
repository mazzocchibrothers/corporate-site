'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useSwitchLocale } from '@/i18n/switch-locale';
import { href } from '@/i18n/routes';
import { Button } from '@/components/ui/button';


// Nav structure: route ids, not paths. Each URL comes from i18n/routes.json
// through href(), which is what retired the hrefIt flags — an Italian slug is
// declared in the registry once and every link in the site follows it.
const navLinks = [
  { id: 'platform', anchor: '#hero', items: ['product-overview', 'science'] },
  {
    id: 'solutions',
    anchor: '#solutions',
    items: [
      'solutions/talent-acquisition',
      'solutions/performance-management',
      'solutions/learning-development',
      'solutions/internal-mobility',
      'solutions/project-resourcing',
    ],
  },
  { id: 'customers', route: 'customers', items: null },
  {
    id: 'resources',
    anchor: '#',
    items: ['resources/whitepapers', 'blog', 'resources/press', 'about', 'careers'],
  },
];

// English-only content we do not advertise to Italian visitors.
//
// This is NOT derivable from the registry, and the difference matters:
// /it/blog and /it/resources/whitepapers both return 200 and render English,
// so the registry is right that they have an Italian URL. Hiding them is a
// separate, editorial decision. #116 is where it gets settled — once those
// routes are declared English-only, this list goes and hasLocale() replaces it.
const HIDDEN_IN_IT = new Set(['resources/whitepapers', 'blog']);

/** 'solutions/talent-acquisition' -> 'talentAcquisition', the label's key. */
const labelKey = (id: string) =>
  id.split('/').pop()!.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [onLightSection, setOnLightSection] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const closeTimeout = useRef<any>(null);
  const router = useRouter();

  const hasDropdown = !!(openMenu && navLinks.find(l => l.id === openMenu)?.items);
  const menuActive = !!openMenu;

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const heroThreshold = window.innerHeight * 0.6;
          setScrolled(currentY > 50);
          setHidden(false);
          lastScrollY.current = currentY;

          const probeY = 82;
          const el = document.elementFromPoint(window.innerWidth / 2, probeY);
          if (el) {
            const isLight = el.closest('.section-breathe') !== null;
            setOnLightSection(isLight);
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleEnter = useCallback((label: string) => {
    clearTimeout(closeTimeout.current);
    setOpenMenu(label);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 250);
  }, []);

  const lang = useLocale();
  const switchLang = useSwitchLocale();
  const t = useTranslations('common');

  const isLight = onLightSection && scrolled && !menuActive;

  const textColor = isLight ? '#121212' : '#ffffff';
  const textMuted = isLight ? 'rgba(26,26,46,0.7)' : 'rgba(255,255,255,0.7)';
  const btnBorder = isLight ? 'rgba(26,26,46,0.15)' : 'rgba(255,255,255,0.15)';
  const navCtaMode = !menuActive && isLight ? 'light' : 'dark';

  const activeItems = hasDropdown ? navLinks.find(l => l.id === openMenu)?.items : null;

  const navigateTo = (path: string) => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setOpenMenu(null);
    router.push(path);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 ${hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'}`}
      style={{ transition: 'transform 0.5s cubic-bezier(0.25,0.1,0.25,1)' }}
      onMouseLeave={handleLeave}
    >
      {/* Navbar bar */}
      <nav
        data-testid="navbar"
        style={{
          transition: 'background-color 0.3s ease',
          backgroundColor: menuActive || mobileOpen
            ? '#000000'
            : isLight
              ? 'rgba(245,245,250,0.92)'
              : scrolled
                ? 'rgba(13,13,31,0.78)'
                : 'transparent',
          backdropFilter: (menuActive || isLight || mobileOpen || scrolled) ? 'blur(40px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: (menuActive || isLight || mobileOpen || scrolled) ? 'blur(40px) saturate(1.2)' : 'none',
          borderBottom: scrolled && !menuActive && !mobileOpen ? `1px solid ${isLight ? 'rgba(26,26,46,0.06)' : 'rgba(255,255,255,0.06)'}` : '1px solid transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[80px] relative">
          <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded" data-testid="nav-logo">
            <img
              src={isLight ? '/logos/Skillvue_logo-on_light.svg' : '/logos/Skillvue_logo-on_dark.svg'}
              alt="Skillvue"
              width={960}
              height={240}
              className="h-7 w-auto block border-0"
            />
          </a>

          {/* Desktop nav. absolutely centered */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <div
                key={link.id}
                className="relative"
                onMouseEnter={() => handleEnter(link.id)}
                onMouseLeave={handleLeave}
              >
                <a
                  href={link.route ? href(link.route, lang) : link.anchor}
                  data-testid={`nav-link-${link.id}`}
                  className="text-[15px] font-light tracking-[0.02em] flex items-center gap-1.5 py-2 transition-colors duration-300"
                  style={{
                    color: menuActive
                      ? (openMenu === link.id ? '#ffffff' : 'rgba(255,255,255,0.5)')
                      : (openMenu === link.id ? textColor : textMuted),
                  }}
                  onClick={(e) => {
                    if (link.items) {
                      e.preventDefault();
                      return;
                    }
                    if (link.route) {
                      e.preventDefault();
                      navigateTo(href(link.route, lang));
                    }
                  }}
                >
                  {t(`nav.${link.id}`)}
                  {link.items && (
                    <ChevronDown
                      className="h-3.5 w-3.5"
                      style={{
                        opacity: openMenu === link.id ? 0.8 : 0.4,
                        transform: openMenu === link.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s cubic-bezier(0.25,0.1,0.25,1), opacity 0.3s ease',
                      }}
                    />
                  )}
                </a>
              </div>
            ))}
          </div>

          {/* Desktop CTA + Language */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Language toggle */}
            <div
              className="flex items-center rounded-full overflow-hidden"
              style={{ border: `1px solid ${menuActive ? 'rgba(255,255,255,0.15)' : btnBorder}` }}
            >
              {(['en', 'it'] as const).map((l, i) => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  className="px-3 py-1.5 text-[13px] font-medium tracking-wide transition-all duration-200"
                  style={{
                    color: lang === l
                      ? (menuActive ? '#ffffff' : textColor)
                      : (menuActive ? 'rgba(255,255,255,0.35)' : textMuted),
                    borderLeft: i === 1 ? `1px solid ${menuActive ? 'rgba(255,255,255,0.15)' : btnBorder}` : 'none',
                    background: lang === l ? (menuActive ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : 'transparent',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <Button
              asChild
              variant="primary"
              mode={navCtaMode}
              className="text-[14px] tracking-wide"
            >
              <a
                href={href('book-meeting', lang)}
                data-testid="nav-book-demo"
                onClick={(e) => { e.preventDefault(); navigateTo(href('book-meeting', lang)); }}
              >
                {t('nav.bookDemo')}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6" style={{ color: isLight ? '#121212' : '#ffffff' }} />
            )}
          </button>
        </div>
      </nav>

      {/* Desktop dropdown panel */}
      <div
        className="hidden lg:block"
        style={{
          backgroundColor: '#000000',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          maxHeight: hasDropdown ? '400px' : '0px',
          opacity: hasDropdown ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.25,0.1,0.25,1), opacity 0.3s ease',
        }}
        onMouseEnter={() => clearTimeout(closeTimeout.current)}
      >
        {activeItems && (
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {activeItems.filter(id => !(lang === 'it' && HIDDEN_IN_IT.has(id))).map((id, idx) => (
                <a
                  key={id}
                  href={href(id, lang)}
                  data-testid={`mega-${labelKey(id)}`}
                  className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-200"
                  style={{
                    opacity: hasDropdown ? 1 : 0,
                    transform: hasDropdown ? 'translateY(0)' : 'translateY(-4px)',
                    transition: `opacity 0.3s ease ${idx * 0.04}s, transform 0.3s ease ${idx * 0.04}s, border-color 0.2s ease, background-color 0.2s ease`,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenu(null);
                    navigateTo(href(id, lang));
                  }}
                >
                  <span className="text-[14px] font-medium text-white/90 group-hover:text-white transition-colors duration-200">
                    {t(`nav.links.${labelKey(id)}`)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div
          className="lg:hidden absolute left-0 right-0"
          style={{
            top: '80px',
            height: 'calc(100vh - 80px)',
            backgroundColor: '#000000',
            zIndex: 9999,
          }}
        >
          <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.id}>
                  <button
                    className="w-full flex items-center justify-between py-4 border-b border-white/[0.06]"
                    onClick={() => {
                      if (link.items) {
                        setMobileExpanded(mobileExpanded === link.id ? null : link.id);
                      } else if (link.route) {
                        navigateTo(href(link.route, lang));
                      }
                    }}
                  >
                    <span className="text-[18px] font-medium text-white">{t(`nav.${link.id}`)}</span>
                    {link.items && (
                      <ChevronDown
                        className="h-4 w-4 text-white/40"
                        style={{
                          transform: mobileExpanded === link.id ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    )}
                  </button>

                  {/* Expanded sub-items */}
                  {link.items && mobileExpanded === link.id && (
                    <div className="pl-4 pb-2">
                      {link.items.filter(id => !(lang === 'it' && HIDDEN_IN_IT.has(id))).map((id) => (
                        <button
                          key={id}
                          className="w-full text-left py-3 text-[16px] text-white/60 hover:text-white transition-colors duration-200"
                          onClick={() => navigateTo(href(id, lang))}
                        >
                          {t(`nav.links.${labelKey(id)}`)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-auto pt-8 pb-4 flex flex-col gap-4">
              {/* Language toggle */}
              <div className="flex items-center rounded-full overflow-hidden border border-white/15 self-start">
                {(['en', 'it'] as const).map((l, i) => (
                  <button
                    key={l}
                    onClick={() => switchLang(l)}
                    className="px-5 py-2 text-[14px] font-medium tracking-wide transition-all duration-200"
                    style={{
                      color: lang === l ? '#ffffff' : 'rgba(255,255,255,0.35)',
                      borderLeft: i === 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                      background: lang === l ? 'rgba(255,255,255,0.08)' : 'transparent',
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              <Button
                variant="primary"
                mode="dark"
                onClick={() => navigateTo(href('book-meeting', lang))}
                className="w-full text-[16px]"
              >
                {t('nav.bookDemo')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
