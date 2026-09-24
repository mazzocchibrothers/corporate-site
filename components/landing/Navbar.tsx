'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronDown, Menu, X, ArrowRight,
  AppWindow, Atom, UserSearch, UserCog, BookOpenCheck, Move, FolderKanban,
  SquarePlay, UsersRound, Lightbulb, Rows3, Newspaper, Building2, Briefcase,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useSwitchLocale } from '@/i18n/switch-locale';
import { href } from '@/i18n/routes';
import { Button } from '@/components/ui/button';


// Nav structure: route ids, not paths. Each URL comes from i18n/routes.json
// through href(), which is what retired the hrefIt flags — an Italian slug is
// declared in the registry once and every link in the site follows it.
const navLinks: { id: string; route?: string; items: string[] | null }[] = [
  { id: 'platform', items: ['product-overview', 'science'] },
  {
    id: 'solutions',
    items: [
      'solutions/talent-acquisition',
      'solutions/performance-management',
      'solutions/learning-development',
      'solutions/internal-mobility',
      'solutions/project-resourcing',
    ],
  },
  { id: 'customers', items: ['customers', 'customers/talent-pioneers'] },
  {
    id: 'resources',
    items: ['resources/insights', 'blog', 'resources/press', 'about', 'careers'],
  },
];

// One icon per dropdown item, keyed the same way as its label (see labelKey).
const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  productOverview: AppWindow,
  science: Atom,
  talentAcquisition: UserSearch,
  performanceManagement: UserCog,
  learningDevelopment: BookOpenCheck,
  internalMobility: Move,
  projectResourcing: FolderKanban,
  customers: SquarePlay,
  talentPioneers: UsersRound,
  insights: Lightbulb,
  blog: Rows3,
  press: Newspaper,
  about: Building2,
  careers: Briefcase,
};

// English-only content we do not advertise to Italian visitors.
//
// This is NOT derivable from the registry, and the difference matters:
// /it/blog and /it/resources/insights both return 200 and render English,
// so the registry is right that they have an Italian URL. Hiding them is a
// separate, editorial decision. #116 is where it gets settled — once those
// routes are declared English-only, this list goes and hasLocale() replaces it.
const HIDDEN_IN_IT = new Set(['resources/insights', 'blog']);

/** 'solutions/talent-acquisition' -> 'talentAcquisition', the label's key. */
const labelKey = (id: string) =>
  id.split('/').pop()!.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

/** Drops a trailing slash so '/customers/adr' and '/customers/adr/' compare equal. */
const withoutTrailingSlash = (path: string) => path.length > 1 ? path.replace(/\/$/, '') : path;

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openedMenus, setOpenedMenus] = useState<Set<string>>(new Set());
  const [onLightSection, setOnLightSection] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const ticking = useRef(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const menuActive = !!openMenu;

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 50);
          setHidden(false);

          const probeY = 82;
          const el = document.elementFromPoint(window.innerWidth / 2, probeY);
          if (el) {
            const isLight = el.closest('.section-breathe, .section-light') !== null;
            setOnLightSection(isLight);
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    // A page can open on a light section (/product/skillvue-map), so the bar has
    // to know what it sits on before the first scroll, not only after it.
    handleScroll();
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

  useEffect(() => {
    if (!mobileOpen) return;

    const menu = mobileMenuRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusable = () => Array.from(menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    const focusFirst = () => focusable()[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        setMobileExpanded(null);
        return;
      }

      if (event.key !== 'Tab') return;
      const elements = focusable();
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (!menu?.contains(document.activeElement) || (!event.shiftKey && document.activeElement === last)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    focusFirst();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [mobileOpen]);

  useEffect(() => () => clearTimeout(closeTimeout.current), []);

  const handleEnter = useCallback((label: string) => {
    clearTimeout(closeTimeout.current);
    setOpenMenu(label);
    // Mount a dropdown's panel the first time it opens, not on first paint —
    // so a visitor who never touches "Solutions" never pays for its markup.
    // Once mounted it stays mounted, so the close fade below has something to
    // animate on every subsequent close.
    setOpenedMenus((prev) => (prev.has(label) ? prev : new Set(prev).add(label)));
  }, []);

  const handleLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 250);
  }, []);

  const lang = useLocale();
  const pathname = usePathname();
  const switchLang = useSwitchLocale();
  const t = useTranslations('common');

  // Whether the open menu should read light-on-white or light-on-black is the
  // same question the bar itself already answers — is it over a light section
  // — so the dropdown follows it too instead of forcing black while open.
  const isLight = onLightSection;

  const textColor = isLight ? '#121212' : '#ffffff';
  const textMuted = isLight ? 'rgba(26,26,46,0.7)' : 'rgba(255,255,255,0.7)';
  const btnBorder = isLight ? 'rgba(26,26,46,0.15)' : 'rgba(255,255,255,0.15)';
  const navCtaMode = isLight ? 'light' : 'dark';

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
      onKeyDown={(event) => {
        if (event.key === 'Escape' && openMenu) {
          event.preventDefault();
          setOpenMenu(null);
          desktopTriggerRef.current?.focus();
        }
      }}
    >
      {/* Navbar bar */}
      <nav
        data-testid="navbar"
        style={{
          transition: 'background-color 0.3s ease',
          backgroundColor: mobileOpen
            ? '#000000'
            : isLight
              ? '#ffffff'
              : menuActive || scrolled
                ? '#000000'
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
                {link.items ? (
                  <button
                    type="button"
                    id={`desktop-trigger-${link.id}`}
                    data-testid={`nav-link-${link.id}`}
                    aria-expanded={openMenu === link.id}
                    aria-controls={`desktop-menu-${link.id}`}
                    className="text-[15px] font-light tracking-[0.02em] flex items-center gap-1.5 py-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                    style={{ color: openMenu === link.id ? textColor : textMuted }}
                    onFocus={(event) => {
                      desktopTriggerRef.current = event.currentTarget;
                      handleEnter(link.id);
                    }}
                    onClick={(event) => {
                      desktopTriggerRef.current = event.currentTarget;
                      setOpenMenu(openMenu === link.id ? null : link.id);
                    }}
                  >
                    {t(`nav.${link.id}`)}
                    <ChevronDown
                      className="h-3.5 w-3.5"
                      style={{
                        opacity: openMenu === link.id ? 0.8 : 0.4,
                        transform: openMenu === link.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s cubic-bezier(0.25,0.1,0.25,1), opacity 0.3s ease',
                      }}
                    />
                  </button>
                ) : (
                  <a
                    href={href(link.route!, lang)}
                    data-testid={`nav-link-${link.id}`}
                    className="text-[15px] font-light tracking-[0.02em] flex items-center gap-1.5 py-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                    style={{ color: textMuted }}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo(href(link.route!, lang));
                    }}
                  >
                    {t(`nav.${link.id}`)}
                  </a>
                )}

                {/* Per-trigger floating dropdown card. Mounted lazily (see
                    handleEnter) so it stays a no-op for the ~17 anchors across
                    all four triggers until a visitor actually opens one. */}
                {link.items && openedMenus.has(link.id) && (
                  <div
                    id={`desktop-menu-${link.id}`}
                    role="region"
                    aria-labelledby={`desktop-trigger-${link.id}`}
                    aria-hidden={openMenu !== link.id}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                    style={{
                      opacity: openMenu === link.id ? 1 : 0,
                      visibility: openMenu === link.id ? 'visible' : 'hidden',
                      transform: openMenu === link.id ? 'translate(-50%, 0)' : 'translate(-50%, -6px)',
                      // visibility flips instantly when opening, but only
                      // after the fade finishes when closing — otherwise the
                      // browser stops painting the card the instant openMenu
                      // changes and the opacity/transform transition below
                      // never gets to run.
                      transition: openMenu === link.id
                        ? 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.25,0.1,0.25,1), visibility 0s'
                        : 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.25,0.1,0.25,1), visibility 0s 0.25s',
                      pointerEvents: openMenu === link.id ? 'auto' : 'none',
                    }}
                  >
                    <div
                      className="rounded-2xl border p-2 min-w-[220px]"
                      style={{
                        backgroundColor: isLight ? '#ffffff' : '#000000',
                        borderColor: isLight ? 'rgba(18,18,18,0.08)' : 'rgba(255,255,255,0.08)',
                        boxShadow: isLight ? '0 20px 40px rgba(18,18,18,0.12)' : '0 20px 40px rgba(0,0,0,0.4)',
                      }}
                    >
                      {link.items.filter(id => !(lang === 'it' && HIDDEN_IN_IT.has(id))).map((id) => {
                        const key = labelKey(id);
                        const Icon = ICONS[key];
                        const isActive = withoutTrailingSlash(pathname) === withoutTrailingSlash(href(id, lang));
                        // Solid colors, not alpha overlays — default is a flat
                        // muted gray, hover/active both resolve to the same
                        // flat on/off color instead of blending with the panel.
                        const solidColor = isLight ? 'text-[#121212]' : 'text-white';
                        const mutedColor = isLight ? 'text-[#7a7a7a]' : 'text-[#888888]';
                        const hoverColor = isLight ? 'group-hover:text-[#121212]' : 'group-hover:text-white';
                        const itemColorClass = isActive ? solidColor : `${mutedColor} ${hoverColor}`;
                        return (
                          <a
                            key={id}
                            href={href(id, lang)}
                            data-testid={`mega-${key}`}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${isActive ? '' : (isLight ? 'hover:bg-black/[0.04]' : 'hover:bg-white/[0.05]')}`}
                            style={{ backgroundColor: isActive ? (isLight ? 'rgba(18,18,18,0.05)' : 'rgba(255,255,255,0.08)') : 'transparent' }}
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenMenu(null);
                              navigateTo(href(id, lang));
                            }}
                          >
                            {Icon && <Icon className={`h-[18px] w-[18px] shrink-0 transition-colors duration-200 ${itemColorClass}`} />}
                            <span className={`text-[15px] font-medium whitespace-nowrap transition-colors duration-200 ${itemColorClass}`}>
                              {t(`nav.links.${key}`)}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA + Language */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Language toggle */}
            <div
              className="flex items-center rounded-full overflow-hidden"
              style={{ border: `1px solid ${btnBorder}` }}
            >
              {(['en', 'it'] as const).map((l, i) => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  className="px-3 py-1.5 text-[13px] font-medium tracking-wide transition-all duration-200"
                  style={{
                    color: lang === l ? textColor : textMuted,
                    borderLeft: i === 1 ? `1px solid ${btnBorder}` : 'none',
                    background: lang === l ? (isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)') : 'transparent',
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
            aria-controls="mobile-navigation"
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

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.menu')}
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
                    type="button"
                    className="w-full flex items-center justify-between py-4 border-b border-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                    aria-expanded={link.items ? mobileExpanded === link.id : undefined}
                    aria-controls={mobileExpanded === link.id ? `mobile-menu-${link.id}` : undefined}
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
                    <div id={`mobile-menu-${link.id}`} className="pl-4 pb-2">
                      {link.items.filter(id => !(lang === 'it' && HIDDEN_IN_IT.has(id))).map((id) => (
                        <button
                          key={id}
                          className="w-full text-left py-3 text-[16px] text-white/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
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
