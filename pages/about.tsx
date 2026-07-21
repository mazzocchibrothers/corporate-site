// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { useRouter } from 'next/router';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '€9M+', label: 'Raised' },
  { value: '50+', label: 'People across Europe' },
  { value: '50+', label: 'Enterprise clients' },
  { value: '30+', label: 'Languages' },
  { value: '1M+', label: 'People empowered' },
];

// Backers — Orbita Verticale placed last per feedback
const investors = [
  { name: '360 Capital', src: '/logos/investor-360capital.svg', h: 42 },
  { name: '14 Peaks', src: '/logos/investor-14peaks.svg', h: 42 },
  { name: 'Kfund', src: '/logos/investor-kfund.svg', h: 42 },
  { name: 'IFF', src: '/logos/investor-iff.svg', h: 42 },
  { name: 'Ithaca', src: '/logos/investor-ithaca.svg', h: 42 },
  { name: 'Orbita', src: '/logos/investor-orbita.svg', h: 42 },
];

// Enterprise clients — reused from the landing TrustLogosBar set
const clientLogos = [
  { name: 'Unicredit', src: '/logos/client-unicredit.svg' },
  { name: 'Carrefour', src: '/logos/client-carrefour.svg' },
  { name: 'Generali', src: '/logos/client-generali.svg' },
  { name: 'Moncler', src: '/logos/client-moncler.svg' },
  { name: 'Nespresso', src: '/logos/client-nespresso.svg' },
  { name: 'Douglas', src: '/logos/client-douglas.svg' },
  { name: 'Lagardère', src: '/logos/client-lagardere.svg' },
  { name: 'Avolta', src: '/logos/client-avolta.svg' },
  { name: 'Europ Assistance', src: '/logos/client-europ-assistance.svg?v=2' },
  { name: 'Fidia', src: '/logos/client-fidia.svg' },
  { name: 'Novacoop', src: '/logos/client-novacoop.svg' },
  { name: 'Tecnomat', src: '/logos/client-tecnomat.svg' },
];

// One Team section — full team photo set, scrolls infinitely
const oneTeamPhotos = [
  '/about/team-photo-01.avif',
  '/about/team-photo-02.avif',
  '/about/team-photo-03-v2.avif',
  '/about/team-photo-04.avif',
  '/about/team-photo-05-v2.avif',
  '/about/team-photo-06.avif',
  '/about/team-photo-07.avif',
  '/about/team-photo-08.avif',
  '/about/team-photo-09-v2.avif',
];

// Auto-scrolls continuously; dragging (mouse or touch) takes over and follows the pointer,
// then auto-scroll resumes from wherever the drag left off.
function DraggableMarquee({ photos }) {
  const trackRef = React.useRef(null);
  const offsetRef = React.useRef(0);
  const loopWidthRef = React.useRef(0);
  const draggingRef = React.useRef(false);
  const dragStartXRef = React.useRef(0);
  const dragStartOffsetRef = React.useRef(0);
  const rafRef = React.useRef(null);
  const lastTimeRef = React.useRef(null);

  const LOOP_SECONDS = 60;

  const applyTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
    }
  };

  const wrap = (value) => {
    const w = loopWidthRef.current;
    if (!w) return value;
    return ((value % w) + w) % w;
  };

  React.useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        loopWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener('resize', measure);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = (time) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      if (!draggingRef.current && !reduceMotion && loopWidthRef.current) {
        offsetRef.current = wrap(offsetRef.current + (loopWidthRef.current / LOOP_SECONDS) * dt);
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    offsetRef.current = wrap(dragStartOffsetRef.current - dx);
    applyTransform();
  };

  const endDrag = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (e?.currentTarget?.style) e.currentTarget.style.cursor = 'grab';
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        cursor: 'grab',
        touchAction: 'pan-y',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <div ref={trackRef} className="flex items-center" style={{ width: 'max-content', willChange: 'transform' }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-4 shrink-0 pr-4" aria-hidden={copy === 1}>
            {photos.map((src, i) => (
              <div key={`${copy}-${i}`} className="w-[280px] h-[155px] sm:w-[424px] sm:h-[235px]" style={{ borderRadius: 12, position: 'relative', overflow: 'hidden', backgroundColor: '#141516', flexShrink: 0 }}>
                <img src={src} alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function getCounterDisplay(original, count) {
  const match = original.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return original;
  return `${match[1]}${count}${match[3]}`;
}

export default function AboutPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const isIT = lang === 'it';
  const canonical = `https://skillvue.ai${isIT ? '/it' : ''}/about`;

  const [heroVisible, setHeroVisible] = React.useState(false);
  const targets = React.useMemo(() => stats.map(s => {
    const m = s.value.match(/\d+/);
    return m ? parseInt(m[0]) : 0;
  }), []);
  const [counts, setCounts] = React.useState(targets);

  React.useEffect(() => {
    setHeroVisible(true);

    let rafId: number;
    setCounts(targets.map(() => 0));

    const delay = setTimeout(() => {
      const duration = 2000;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounts(targets.map(t => Math.round(t * eased)));
        if (progress < 1) rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    }, 300);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{isIT ? 'Chi siamo – Skillvue' : 'About Us – Skillvue'}</title>
        <meta name="description" content={isIT
          ? 'Scopri Skillvue, lo Skills Operating System per le grandi imprese. La nostra missione, visione, fondatori e team.'
          : 'Learn about Skillvue, the Skills Operating System for modern enterprises. Our mission, vision, founders, and team.'
        } />
        <link rel="canonical" href={canonical} />
      </Head>
      <Navbar />

      <main style={{ backgroundColor: '#040404' }}>

        {/* ─── 1. HERO ─────────────────────────────────────────────────────── */}
        <section style={{ flexShrink: 0 }}>

          {/* ── MOBILE: image at full width, text + stats below ── */}
          <div className="lg:hidden" style={{ backgroundColor: '#010102' }}>
            <div style={{ position: 'relative', aspectRatio: '16/9' }}>
              <img
                src="/about/Skillvue_Team_photo.avif"
                alt=""
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%', objectFit: 'cover',
                }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(180deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 12%, rgba(0,0,0,0) 75%, rgb(0,0,0) 100%)' }} />
            </div>
            <div style={{ padding: '40px 24px 64px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 48 }}>
              {(() => {
                const line1 = t('Unlock human potential and').split(' ');
                const line2 = t('organizational success at scale').split(' ');
                return (
                  <h1 className="text-[48px] md:text-[clamp(42px,10vw,56px)] font-semibold md:font-medium" style={{ fontFamily: 'Mona Sans, sans-serif', lineHeight: 1.05, color: '#fff', letterSpacing: '-1.5px', margin: 0, textAlign: 'left' }}>
                    {[...line1, ...line2].map((word, i) => (
                      <span key={i} style={{ display: 'inline-block', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.7s ease-out, transform 0.7s ease-out', transitionDelay: heroVisible ? `${0.3 + i * 0.08}s` : '0s', marginRight: '0.25em' }}>{word}</span>
                    ))}
                  </h1>
                );
              })()}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {stats.map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', width: '100%', paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <p style={{ fontFamily: 'Mona Sans, sans-serif', fontWeight: 600, fontSize: 32, lineHeight: 1.1, color: '#9395ff', letterSpacing: '-1.5px', margin: 0, flexShrink: 0 }}>
                      {getCounterDisplay(s.value, counts[i])}
                    </p>
                    <p style={{ fontFamily: 'Mona Sans, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: 1.4, color: '#a9a9a9', margin: 0 }}>
                      {t(s.label)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── DESKTOP: full-viewport hero with image as cover background ── */}
          <div
            className="hidden lg:block"
            style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}
          >
            <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#010102' }} />
              <img
                src="/about/Skillvue_Team_photo.avif"
                alt=""
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(180deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 30%, rgb(0,0,0) 72%)' }} />
            </div>
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                display: 'flex', justifyContent: 'center', padding: '0 0 56px',
              }}
            >
              <div className="px-5 md:px-8 lg:px-12" style={{ width: '100%', maxWidth: 1304, display: 'flex', flexDirection: 'column', gap: 40 }}>
                {/* Stats row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
                  {stats.map((s, i) => (
                    <div key={i} style={{ flex: '1 0 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                      <p style={{ fontFamily: 'Mona Sans, sans-serif', fontWeight: 600, fontSize: 48, lineHeight: 1.4, color: '#9395ff', letterSpacing: '-1.75px', margin: 0 }}>
                        {getCounterDisplay(s.value, counts[i])}
                      </p>
                      <p style={{ fontFamily: 'Mona Sans, sans-serif', fontWeight: 400, fontSize: 13.5, lineHeight: 1.5, color: '#a9a9a9', margin: 0 }}>
                        {t(s.label)}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Headline text */}
                {(() => {
                  const line1 = t('Unlock human potential and').split(' ');
                  const line2 = t('organizational success at scale').split(' ');
                  return (
                    <h1 className="text-[48px] md:text-[clamp(36px,4.2vw,64px)] font-semibold md:font-medium" style={{ fontFamily: 'Mona Sans, sans-serif', lineHeight: 1.1, color: '#fff', letterSpacing: '-1.28px', margin: 0, textAlign: 'center' }}>
                      {line1.map((word, i) => (
                        <span key={`l1-${i}`} style={{ display: 'inline-block', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.7s ease-out, transform 0.7s ease-out', transitionDelay: heroVisible ? `${0.3 + i * 0.08}s` : '0s', marginRight: '0.25em' }}>{word}</span>
                      ))}
                      <br />
                      {line2.map((word, i) => (
                        <span key={`l2-${i}`} style={{ display: 'inline-block', opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.7s ease-out, transform 0.7s ease-out', transitionDelay: heroVisible ? `${0.3 + (line1.length + i) * 0.08}s` : '0s', marginRight: i < line2.length - 1 ? '0.25em' : 0 }}>{word}</span>
                      ))}
                    </h1>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. VISION + MISSION (compound) ──────────────────────────────── */}
        <section
          className="px-5 md:px-8 lg:px-12"
          style={{
            position: 'relative',
            paddingTop: 112,
            paddingBottom: 112,
            backgroundColor: '#040404',
            overflow: 'hidden',
          }}
        >
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <img src="/about/section-margin.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src="/about/section-margin1.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ maxWidth: 1304, margin: '0 auto', position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: 72 }}>

            {/* Vision */}
            <div style={{ maxWidth: 1000 }}>
              <p
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.52px',
                  color: '#9395ff',
                  textTransform: 'uppercase',
                  margin: '0 0 24px',
                }}
              >
                {t('OUR VISION')}
              </p>
              <p
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  lineHeight: 1.15,
                  color: '#fff',
                  letterSpacing: '-0.96px',
                  margin: 0,
                }}
              >
                {t('A world where every talent decision, from hire to promotion to transformation is powered by objective intelligence. Where human potential is no longer left to chance. And organizational success is something you build, not hope for.')}
              </p>
            </div>

            {/* Team images — bridging vision and mission */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['/about/vision-1.avif', '/about/vision-2.avif', '/about/vision-3.avif'].map((src, i) => (
                <div key={i} style={{ aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', position: 'relative', backgroundColor: '#141516' }}>
                  <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            {/* Mission */}
            <div style={{ maxWidth: 900 }}>
              <p
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.52px',
                  color: '#9395ff',
                  textTransform: 'uppercase',
                  margin: '0 0 24px',
                }}
              >
                {t('OUR MISSION')}
              </p>
              <h2
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(28px, 3.1vw, 48px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.96px',
                  color: '#fff',
                  margin: '0 0 24px',
                }}
              >
                {t('Make skills the most')}{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #4e6bff 0%, #ff5b5b 49.52%, #ff8447 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t('reliable data')}
                </span>
                {' '}{t('in every organization')}
              </h2>
              <p
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: 20,
                  lineHeight: 1.4,
                  color: '#9a9a9a',
                  margin: 0,
                }}
              >
                {t('Building the science-grounded, AI-scaled Skills Operating System that every HR system can plug into, so that every talent decision, from hire to promotion to transformation, is finally objective.')}
              </p>
            </div>

          </div>
        </section>

        {/* ─── 4. WHO WE ARE — Skills Operating System ─────────────────────── */}
        <section className="section-breathe px-5 md:px-8 lg:px-12" style={{ paddingTop: 112, paddingBottom: 112, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: 1304, margin: '0 auto', width: '100%' }}>
            <p
              style={{
                fontFamily: 'Mona Sans, sans-serif',
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: '0.52px',
                color: '#4b4df7',
                textTransform: 'uppercase',
                margin: '0 0 24px',
              }}
            >
              {t('WHO WE ARE')}
            </p>
            <h2
              style={{
                fontFamily: 'Mona Sans, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(28px, 3.1vw, 48px)',
                lineHeight: 1.1,
                letterSpacing: '-0.96px',
                color: '#121212',
                margin: '0 0 24px',
                maxWidth: 850,
              }}
            >
              {t('Skillvue is the')}{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #5667ff 0%, #ff6262 51.93%, #ff7d49 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('Skills Operating System')}
              </span>
              {' '}{t('for your organization.')}
            </h2>
            <p
              style={{
                fontFamily: 'Mona Sans, sans-serif',
                fontWeight: 400,
                fontSize: 18,
                lineHeight: 1.4,
                color: '#7a7a7a',
                margin: 0,
                maxWidth: 837,
              }}
            >
              {t('Skillvue is the objective skills data layer for your enterprise, tailored to your competency framework, grounded in science, scaled by AI, embedded into the HR systems you already run.')}
            </p>

            {/* Working with leading global companies — client logos */}
            <div style={{ marginTop: 72 }}>
              <p
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '2.4px',
                  color: '#848484',
                  textTransform: 'uppercase',
                  margin: '0 0 36px',
                }}
              >
                {t('Working with leading global companies')}
              </p>
              <div
                className="grid grid-cols-2 lg:grid-cols-6 items-center justify-items-center"
                style={{ gap: '36px 56px' }}
              >
                {clientLogos.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    style={{ height: 26, width: 'auto', objectFit: 'contain', filter: 'brightness(0)', opacity: 0.45 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. OUR STORY ────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 lg:px-12"
          style={{
            position: 'relative',
            paddingTop: 112,
            paddingBottom: 112,
            backgroundColor: '#040404',
            overflow: 'hidden',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <img src="/about/section-margin.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src="/about/section-margin1.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div
            style={{
              maxWidth: 1304,
              margin: '0 auto',
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 72,
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                gap: 80,
                alignItems: 'flex-end',
              }}
              className="flex-col lg:flex-row"
            >
            {/* Left: text */}
            <div style={{ flex: '1 0 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.52px',
                  color: '#6366f8',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {t('ABOUT SKILLVUE')}
              </p>
              <h2
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(28px, 3.1vw, 48px)',
                  lineHeight: 1.1,
                  color: '#fff',
                  letterSpacing: '-0.96px',
                  margin: 0,
                }}
              >
                {t('Our Story')}
              </h2>
              <div
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: 18,
                  lineHeight: 1.4,
                  color: '#7a7a7a',
                }}
              >
                <p style={{ margin: '0 0 16px' }}>
                  {t("Founded in Milan in 2021, at the heart of one of Europe's most dynamic startup hubs, Skillvue is an HR-Tech company that helps organizations make every talent decision objective. Backed by €9M in funding, Skillvue supports 30+ languages and serves 100+ mid-to-large enterprises across industries such as retail, financial services, pharma, and energy.")}
                </p>
                <p style={{ margin: 0 }}>
                  {t('With a team of 50+ professionals across Milan, Berlin, and London, Skillvue brings together expertise in psychometrics, AI, product design, and enterprise go-to-market. Its platform combines psychometric rigour with modern AI to transform static and unstructured talent data into reliable, predictive insights, supporting decisions across hiring, performance management, internal mobility, and learning & development.')}
                </p>
              </div>
              <div>
                <Button asChild variant="secondary" mode="dark" icon={null}>
                  <a
                    href="/resources/press"
                    onClick={(e) => { e.preventDefault(); router.push('/resources/press'); }}
                  >
                    {t('Learn more about Skillvue')}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Map */}
            <div
              className="w-full lg:w-[474px] lg:h-[390px] lg:shrink-0"
            >
              <img
                src={isIT ? '/about/presenza.avif' : '/about/coverage.avif'}
                alt="Skillvue locations across Europe"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
            </div>

            {/* Backers — moved into Our Story per feedback (Orbita last) */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 48 }}>
              <p
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '2.4px',
                  color: '#848484',
                  textTransform: 'uppercase',
                  margin: '0 0 32px',
                }}
              >
                {t('Backed by leading European VCs')}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '36px 56px', alignItems: 'center' }}>
                {investors.map((inv) => (
                  <img
                    key={inv.name}
                    src={inv.src}
                    alt={inv.name}
                    style={{ height: inv.h, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.7 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. FOUNDERS ─────────────────────────────────────────────────── */}
        <section className="section-breathe px-5 md:px-8 lg:px-12" style={{ paddingTop: 112, paddingBottom: 112, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: 1304, margin: '0 auto', width: '100%' }}>
            {/* Header */}
            <div style={{ marginBottom: 36 }}>
              <p
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.52px',
                  color: '#4b4df7',
                  textTransform: 'uppercase',
                  margin: '0 0 24px',
                }}
              >
                {t('Leadership')}
              </p>
              <h2
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(28px, 3.1vw, 48px)',
                  lineHeight: 1.1,
                  color: '#121212',
                  letterSpacing: '-0.64px',
                  margin: '0 0 24px',
                }}
              >
                {t('Meet Our Founders')}
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.4,
                  color: '#7a7a7a',
                  letterSpacing: '-0.19px',
                  margin: 0,
                }}
              >
                {t('"We set out to make talent decisions as rigorous as every other business decision"')}
              </p>
            </div>

            {/* Cards */}
            <div
              style={{ display: 'flex', gap: 48 }}
              className="flex-col lg:flex-row"
            >
              {/* Nicolò */}
              <div style={{ flex: '1 0 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a
                  href="https://www.linkedin.com/in/nicolo-mazzocchi-16a39215b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  style={{ display: 'block', aspectRatio: '16/9', borderRadius: 12, position: 'relative', overflow: 'hidden', backgroundColor: '#222', cursor: 'pointer' }}
                >
                  <img
                    src="/about/CEO_nicolo.avif"
                    alt="Nicolò Mazzocchi"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </a>
                <div style={{ paddingTop: 21 }}>
                  <p
                    style={{
                      fontFamily: 'Mona Sans, sans-serif',
                      fontWeight: 600,
                      fontSize: 20,
                      lineHeight: '22px',
                      color: '#121212',
                      letterSpacing: '-0.4px',
                      margin: '0 0 4px',
                    }}
                  >
                    Nicolò Mazzocchi
                  </p>
                  <p
                    style={{
                      fontFamily: 'Mona Sans, sans-serif',
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: '21px',
                      color: '#4b4df7',
                      letterSpacing: '-0.176px',
                      margin: '0 0 8px',
                    }}
                  >
                    {t('Co-founder & CEO')}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Mona Sans, sans-serif',
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: '20.25px',
                      color: '#7a7a7a',
                      letterSpacing: '-0.176px',
                      margin: 0,
                    }}
                  >
                    {t('After competing at a pre-Olympic level in sports at a very young age, Nicolò found himself at a crossroads: a career as a professional sailor, with the dream of the Olympics, or a more conventional university education and career. After a year of reflection in Australia, he chose a third way: to set up his own business, founding his first startup in the B2C entertainment sector with his brother Riccardo. After this first successful experience, he decided to move into the HR Tech sector and, together with his partner Simone Patera, launched Skillvue with the aim of leveraging science and AI to support companies in human capital management and in the transition towards a skills-based approach.')}
                  </p>
                </div>
              </div>

              {/* Simone */}
              <div style={{ flex: '1 0 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a
                  href="https://www.linkedin.com/in/simone-patera/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  style={{ display: 'block', aspectRatio: '16/9', borderRadius: 12, position: 'relative', overflow: 'hidden', backgroundColor: '#222', cursor: 'pointer' }}
                >
                  <img
                    src="/about/Co-founder-Simone.avif"
                    alt="Simone Patera"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </a>
                <div style={{ paddingTop: 21 }}>
                  <p
                    style={{
                      fontFamily: 'Mona Sans, sans-serif',
                      fontWeight: 600,
                      fontSize: 20,
                      lineHeight: '22px',
                      color: '#121212',
                      letterSpacing: '-0.4px',
                      margin: '0 0 4px',
                    }}
                  >
                    Simone Patera
                  </p>
                  <p
                    style={{
                      fontFamily: 'Mona Sans, sans-serif',
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: '21px',
                      color: '#4b4df7',
                      letterSpacing: '-0.176px',
                      margin: '0 0 8px',
                    }}
                  >
                    {t('Co-founder')}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Mona Sans, sans-serif',
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: '20.25px',
                      color: '#7a7a7a',
                      letterSpacing: '-0.176px',
                      margin: 0,
                    }}
                  >
                    {t("Simone is the co-founder of Skillvue. He started his first company in the education sector when he was just 18 years old, and led its growth to a team of 50 people, while completing his studies in Philosophy. After graduating, he worked as a Business Developer for various Italian companies in the tech sector, collaborating with major players such as Poste Italiane and Rai. During those years, he also became father to two girls. In 2021 his professional path crossed with Nicolò Mazzocchi's: from the union of their respective experiences in the startup and technology field, Skillvue was born.")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. ONE TEAM ─────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 lg:px-12"
          style={{
            position: 'relative',
            paddingTop: 80,
            paddingBottom: 80,
            backgroundColor: '#040404',
            overflow: 'hidden',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <img src="/about/section-margin.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src="/about/section-margin1.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ maxWidth: 1304, margin: '0 auto', position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: 80 }}>
            {/* Header row: label + heading + pills (left), Join us button (right) */}
            <div
              style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}
              className="flex-col lg:flex-row"
            >
              <div style={{ flex: '1 0 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p
                  style={{
                    fontFamily: 'Mona Sans, sans-serif',
                    fontWeight: 500,
                    fontSize: 13,
                    letterSpacing: '0.52px',
                    color: '#9395ff',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  {t('One Team One Mission')}
                </p>
                <h2
                  style={{
                    fontFamily: 'Mona Sans, sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(28px, 3.1vw, 48px)',
                    lineHeight: 1.1,
                    color: '#fff',
                    letterSpacing: '-0.96px',
                    margin: 0,
                    maxWidth: 760,
                  }}
                >
                  {t('People. Data. Performance. One engine for the future of work.')}
                </h2>
                <p
                  style={{
                    fontFamily: 'Mona Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: 18,
                    lineHeight: 1.5,
                    color: '#9a9a9a',
                    letterSpacing: '-0.19px',
                    margin: 0,
                    maxWidth: 820,
                  }}
                >
                  {t("One team across Europe at the intersection of Organizational and Psychometric Science, AI, and Data Science shipping cutting-edge AI Agents that measure what actually matters: what people can do, not what their title says. High ambition, high standards, zero complacency. We push boundaries daily and settle for nothing less than excellence. Talent is the world's most underused asset. We're here to unlock all of it and leave a mark doing it.")}
                </p>
                {/* Discipline pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {['Psychometricians', 'Engineers', 'Designers', 'Product'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 16px',
                        border: '1px solid #7a7a7a',
                        borderRadius: 99,
                        fontFamily: 'Mona Sans, sans-serif',
                        fontWeight: 500,
                        fontSize: 13,
                        color: '#7a7a7a',
                        lineHeight: 'normal',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Join us button */}
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                <Button asChild variant="secondary" mode="dark" icon={null}>
                  <a
                    href="/careers"
                    onClick={(e) => { e.preventDefault(); router.push('/careers'); }}
                  >
                    {t('Join us')}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Photo marquee — auto-scrolls, drag to take control */}
            <DraggableMarquee photos={oneTeamPhotos} />
          </div>
        </section>

        {/* ─── 8. LIFE AT SKILLVUE ─────────────────────────────────────────── */}
        <section className="section-breathe px-5 md:px-8 lg:px-12" style={{ paddingTop: 128, paddingBottom: 128, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: 1304, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.52px',
                  color: '#4b4df7',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {t('Life at Skillvue')}
              </p>
              <p
                style={{
                  fontFamily: 'Mona Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(28px, 3.1vw, 48px)',
                  lineHeight: 1.1,
                  color: '#111',
                  letterSpacing: '-0.96px',
                  margin: 0,
                }}
              >
                {t('50+ people across Milan, Berlin & London.')}
              </p>
            </div>

            {/* Asymmetric photo grid: desktop — large left + 2×2 right */}
            <div
              className="hidden lg:grid"
              style={{
                gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)',
                gridTemplateRows: 'auto auto',
                gap: '14px',
              }}
            >
              {/* Col 1, spans 2 rows */}
              <div
                style={{
                  gridColumn: 1,
                  gridRow: '1 / span 2',
                  borderRadius: 12,
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#141516',
                  minHeight: 0,
                }}
              >
                <img src="/about/life-1.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Col 2, Row 1 */}
              <div style={{ gridColumn: 2, gridRow: 1, aspectRatio: '16/9', borderRadius: 12, position: 'relative', overflow: 'hidden', backgroundColor: '#141516' }}>
                <img src="/about/life-2.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Col 3, Row 1 */}
              <div style={{ gridColumn: 3, gridRow: 1, aspectRatio: '16/9', borderRadius: 12, position: 'relative', overflow: 'hidden', backgroundColor: '#141516' }}>
                <img src="/about/life-3.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Col 2, Row 2 */}
              <div style={{ gridColumn: 2, gridRow: 2, aspectRatio: '16/9', borderRadius: 12, position: 'relative', overflow: 'hidden', backgroundColor: '#141516' }}>
                <img src="/about/life-4.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Col 3, Row 2 */}
              <div style={{ gridColumn: 3, gridRow: 2, aspectRatio: '16/9', borderRadius: 12, position: 'relative', overflow: 'hidden', backgroundColor: '#141516' }}>
                <img src="/about/life-5.avif" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Mobile photo grid */}
            <div className="lg:hidden grid grid-cols-1 gap-3">
              {[
                '/about/life-1.avif',
                '/about/life-2.avif',
                '/about/life-3.avif',
                '/about/life-4.avif',
                '/about/life-5.avif',
              ].map((src, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9', position: 'relative', backgroundColor: '#141516' }}>
                  <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
