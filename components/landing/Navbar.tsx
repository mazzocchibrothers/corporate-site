import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useRouter } from 'next/router';
import SkillvueLogo from './SkillvueLogo';
import { useLanguage } from '@/i18n/LanguageContext';


const navLinks = [
  {
    label: 'Platform',
    href: '#hero',
    items: [
      { name: 'Product', path: '/product-overview' },
      { name: 'Science', path: '/science' },
    ],
  },
  {
    label: 'Solutions',
    href: '#solutions',
    items: [
      { name: 'Hiring', path: '/solutions/talent-acquisition' },
      { name: 'Performance', path: '/solutions/performance-management' },
      { name: 'Development', path: '/solutions/learning-development' },
      { name: 'Mobility', path: '/solutions/internal-mobility' },
      { name: 'Project Resourcing', path: '/solutions/project-resourcing' },
    ],
  },
  {
    label: 'Customers',
    href: '/customers',
    items: null,
  },
  {
    label: 'Resources',
    href: '#',
    items: [
      { name: 'White Papers', path: '/resources/whitepapers' },
      { name: 'Blog', path: '/blog' },
      { name: 'Press', path: '/resources/press' },
      { name: 'About', path: '/about' },
    ],
  },
];

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

  const hasDropdown = !!(openMenu && navLinks.find(l => l.label === openMenu)?.items);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const heroThreshold = window.innerHeight * 0.6;
          setScrolled(currentY > 50);
          if (currentY > heroThreshold) {
            setHidden(currentY > lastScrollY.current);
          } else {
            setHidden(false);
          }
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

  const { lang, switchLang } = useLanguage();

  const isLight = onLightSection && scrolled && !hasDropdown;

  const textColor = isLight ? '#1A1A2E' : '#ffffff';
  const textMuted = isLight ? 'rgba(26,26,46,0.7)' : 'rgba(255,255,255,0.7)';
  const btnBorder = isLight ? 'rgba(26,26,46,0.15)' : 'rgba(255,255,255,0.15)';

  const activeItems = hasDropdown ? navLinks.find(l => l.label === openMenu)?.items : null;

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
          backgroundColor: hasDropdown || mobileOpen
            ? '#000000'
            : isLight
              ? 'rgba(245,245,250,0.92)'
              : 'transparent',
          backdropFilter: hasDropdown || isLight || mobileOpen ? 'blur(40px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: hasDropdown || isLight || mobileOpen ? 'blur(40px) saturate(1.2)' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[80px] relative">
          <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className="flex items-center gap-2.5 shrink-0" data-testid="nav-logo">
            <SkillvueLogo
              size={28}
              className="transition-colors duration-300"
              style={{ color: hasDropdown || mobileOpen ? '#ffffff' : textColor }}
            />
            <span
              className="font-semibold text-[17px] tracking-tight transition-colors duration-300"
              style={{ color: hasDropdown || mobileOpen ? '#ffffff' : textColor }}
            >
              Skillvue
            </span>
          </a>

          {/* Desktop nav. absolutely centered */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.items && handleEnter(link.label)}
                onMouseLeave={handleLeave}
              >
                <a
                  href={link.href}
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                  className="text-[15px] font-light tracking-[0.02em] flex items-center gap-1.5 py-2 transition-colors duration-300"
                  style={{
                    color: hasDropdown
                      ? (openMenu === link.label ? '#ffffff' : 'rgba(255,255,255,0.5)')
                      : (openMenu === link.label ? textColor : textMuted),
                  }}
                  onClick={(e) => {
                    if (link.items) {
                      e.preventDefault();
                    } else if (link.href.startsWith('/')) {
                      e.preventDefault();
                      navigateTo(link.href);
                    }
                  }}
                >
                  {link.label}
                  {link.items && (
                    <ChevronDown
                      className="h-3.5 w-3.5"
                      style={{
                        opacity: openMenu === link.label ? 0.8 : 0.4,
                        transform: openMenu === link.label ? 'rotate(180deg)' : 'rotate(0deg)',
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
              style={{ border: `1px solid ${hasDropdown ? 'rgba(255,255,255,0.15)' : btnBorder}` }}
            >
              {(['en', 'it'] as const).map((l, i) => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  className="px-3 py-1.5 text-[13px] font-medium tracking-wide transition-all duration-200"
                  style={{
                    color: lang === l
                      ? (hasDropdown ? '#ffffff' : textColor)
                      : (hasDropdown ? 'rgba(255,255,255,0.35)' : textMuted),
                    borderLeft: i === 1 ? `1px solid ${hasDropdown ? 'rgba(255,255,255,0.15)' : btnBorder}` : 'none',
                    background: lang === l ? (hasDropdown ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : 'transparent',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <a
              href="/book-meeting"
              data-testid="nav-book-demo"
              className="inline-flex items-center px-7 py-3 text-[14px] font-medium tracking-wide rounded-full transition-all duration-300"
              style={{
                color: hasDropdown ? '#ffffff' : textColor,
                border: `1px solid ${hasDropdown ? 'rgba(255,255,255,0.15)' : btnBorder}`,
              }}
              onClick={(e) => { e.preventDefault(); navigateTo('/book-meeting'); }}
            >
              Book a Meeting
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6" style={{ color: isLight ? '#1A1A2E' : '#ffffff' }} />
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
              {activeItems.map((item, idx) => (
                <a
                  key={item.name}
                  href={item.path}
                  data-testid={`mega-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-200"
                  style={{
                    opacity: hasDropdown ? 1 : 0,
                    transform: hasDropdown ? 'translateY(0)' : 'translateY(-4px)',
                    transition: `opacity 0.3s ease ${idx * 0.04}s, transform 0.3s ease ${idx * 0.04}s, border-color 0.2s ease, background-color 0.2s ease`,
                  }}
                  onClick={(e) => {
                    if (item.path && item.path !== '#') {
                      e.preventDefault();
                      setOpenMenu(null);
                      navigateTo(item.path);
                    }
                  }}
                >
                  <span className="text-[14px] font-medium text-white/90 group-hover:text-white transition-colors duration-200">
                    {item.name}
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
                <div key={link.label}>
                  <button
                    className="w-full flex items-center justify-between py-4 border-b border-white/[0.06]"
                    onClick={() => {
                      if (link.items) {
                        setMobileExpanded(mobileExpanded === link.label ? null : link.label);
                      } else if (link.href.startsWith('/')) {
                        navigateTo(link.href);
                      }
                    }}
                  >
                    <span className="text-[18px] font-medium text-white">{link.label}</span>
                    {link.items && (
                      <ChevronDown
                        className="h-4 w-4 text-white/40"
                        style={{
                          transform: mobileExpanded === link.label ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    )}
                  </button>

                  {/* Expanded sub-items */}
                  {link.items && mobileExpanded === link.label && (
                    <div className="pl-4 pb-2">
                      {link.items.map((item) => (
                        <button
                          key={item.name}
                          className="w-full text-left py-3 text-[16px] text-white/60 hover:text-white transition-colors duration-200"
                          onClick={() => navigateTo(item.path)}
                        >
                          {item.name}
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

              <button
                onClick={() => navigateTo('/book-meeting')}
                className="w-full flex items-center justify-center py-4 text-[16px] font-semibold text-white rounded-full border border-white/15"
              >
                Book a Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
