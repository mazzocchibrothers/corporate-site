'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowDown, ArrowRight, Atom, BadgeCheck, Blocks, Columns3Cog, Compass, Database, Layers,
  Sparkles, SquareArrowOutUpRight, SquareMousePointer, Zap, type LucideIcon,
} from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { IconTile } from '@/components/ui/icon-tile';
import { href } from '@/i18n/routes';

const PRODUCTS = ['map', 'assess', 'decide'] as const;
type Product = (typeof PRODUCTS)[number];

// A tab shows either a screenshot or a screen recording. Both are per locale:
// the product UI in the capture is in the visitor's language.
type Shot = { key: string; kind: 'image' | 'video' };

const MAP_TABS: Shot[] = [
  { key: 'jobs', kind: 'image' },
  { key: 'skills', kind: 'video' },
  { key: 'compare', kind: 'image' },
];
const ASSESS_TABS: Shot[] = [
  { key: 'interview', kind: 'image' },
  { key: 'questions', kind: 'image' },
];

const MEDIA: Record<string, string> = {
  jobs: 'map-job',
  skills: 'map-skills',
  compare: 'map-compare',
  interview: 'assess-interview',
  questions: 'assess-questions',
  decide: 'decide',
};

const FEATURES: Record<Product, [string, LucideIcon][]> = {
  map: [['data', Database], ['days', Zap], ['experts', BadgeCheck], ['navigate', Compass]],
  assess: [['context', Columns3Cog], ['science', Atom], ['scale', SquareArrowOutUpRight], ['format', SquareMousePointer]],
  decide: [['stack', Layers], ['query', Sparkles], ['workflows', Blocks]],
};

const H2 = 'font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-[#121212] text-balance';
// The line break is desktop-only, so it carries the space the message does not:
// without it a phone reads "ruoli,alla".
const br = () => <>{' '}<br className="hidden md:inline" /></>;

function scrollTo(e: MouseEvent, id: string) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function Logo({ product }: { product: Product }) {
  const t = useTranslations('product.skillvue-map');
  return (
    <img
      src={`/products/skillvue-${product}.svg`}
      alt={t(`logos.${product}`)}
      loading="lazy"
      decoding="async"
      className="h-8 w-auto block"
    />
  );
}

/** A muted screen recording. Paused for a visitor who asked for reduced motion,
 *  the same way <HeroVideo> does it. */
function Recording({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const locale = useLocale();

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) ref.current?.pause();
  }, []);

  return (
    // The recordings are 16:9 and carry their own browser frame, so they are
    // centred in the frame around them, never cropped. The rounded clip hides
    // the black the encoder left outside the window's rounded corners.
    <div className="absolute inset-0 flex items-center">
      <video
        ref={ref}
        key={locale}
        className="block w-full aspect-video rounded-[1%/1.8%] object-cover"
        poster={`/products/${name}-${locale}.avif`}
        aria-label={label}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={`/products/${name}-${locale}.webm`} type="video/webm" />
        <source src={`/products/${name}-${locale}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}

function ShotFrame({ shot, label }: { shot: Shot; label: string }) {
  const locale = useLocale();
  const name = MEDIA[shot.key];
  return (
    <div className="relative w-full aspect-[2520/1792]">
      {shot.kind === 'video' ? (
        <Recording name={name} label={label} />
      ) : (
        <img
          src={`/products/${name}-${locale}.avif`}
          alt={label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  );
}

function ProblemSolution({ product }: { product: Product }) {
  const t = useTranslations('product.skillvue-map');
  return (
    <div className="mt-8 lg:mt-[52px] grid gap-5 lg:gap-0 lg:grid-cols-[minmax(0,560fr)_minmax(40px,214fr)_minmax(0,570fr)] items-center">
      <Reveal x={-30} y={0} duration={0.8}>
        <div className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#ff5f24]">{t('problem')}</div>
        <h3 className="mt-3 text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#121212]">{t(`${product}.problemTitle`)}</h3>
        <p className="mt-3 text-[16px] leading-[1.5] text-[#4B4B4B]">{t(`${product}.problemBody`)}</p>
      </Reveal>
      <div className="flex lg:justify-center text-[#4B4DF7]" aria-hidden="true">
        <ArrowRight className="w-[22px] h-[22px] rotate-90 lg:rotate-0" strokeWidth={1.8} />
      </div>
      <Reveal x={30} y={0} duration={0.8} delay={0.2}>
        <div className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#4B4DF7]">{t('solution')}</div>
        <h3 className="mt-3 text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#121212]">{t(`${product}.solutionTitle`)}</h3>
        <p className="mt-3 text-[16px] leading-[1.5] text-[#4B4B4B]">{t(`${product}.solutionBody`)}</p>
      </Reveal>
    </div>
  );
}

function TabbedPanel({ product, tabs }: { product: Product; tabs: Shot[] }) {
  const t = useTranslations('product.skillvue-map');
  const [active, setActive] = useState(0);
  const label = (key: string) => t(`${product}.tabs.${key}`);

  return (
    <Reveal y={40} duration={0.9} className="mt-10 lg:mt-[84px] rounded-[24px] md:rounded-[40px] bg-[#f5f5f7] p-3 pt-4 md:px-10 md:pt-10 md:pb-[30px]">
      <div role="tablist" className="mb-4 md:mb-10 flex flex-col md:flex-row md:flex-wrap justify-center gap-1 md:gap-6">
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`h-11 px-6 rounded-full text-[18px] font-medium transition-[color,background-color,box-shadow,transform] duration-150 active:scale-[0.97] ${active === i ? 'bg-white text-[#121212] shadow-[0_1px_3px_rgba(0,0,0,0.06)]' : 'text-[#4B4B4B] hover:text-[#121212]'}`}
          >
            {label(tab.key)}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        <ShotFrame key={tabs[active].key} shot={tabs[active]} label={label(tabs[active].key)} />
      </div>
    </Reveal>
  );
}

function Features({ product }: { product: Product }) {
  const t = useTranslations('product.skillvue-map');
  const items = FEATURES[product];
  return (
    <div className={`mt-8 lg:mt-20 grid gap-3 lg:gap-10 sm:grid-cols-2 ${items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {items.map(([key, icon], i) => (
        <Reveal key={key} y={16} duration={0.6} delay={i * 0.06} className="rounded-2xl border border-[#e5e7eb] p-5 lg:p-6 lg:pb-7">
          <IconTile icon={icon} mode="light" />
          <h3 className="mt-4 lg:mt-[22px] text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#121212]">{t(`${product}.features.${key}.title`)}</h3>
          <p className="mt-3 text-[16px] leading-[1.5] text-[#4B4B4B]">{t(`${product}.features.${key}.body`)}</p>
        </Reveal>
      ))}
    </div>
  );
}

export default function SkillvueMapPage() {
  const t = useTranslations('product.skillvue-map');
  const locale = useLocale();
  const container = 'max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12';
  const section = 'scroll-mt-20 border-t border-[#e5e7eb] py-16 lg:pt-[120px] lg:pb-[104px]';

  return (
    <>
      <Navbar />
      <main>
        <div className="section-light">
          {/* Hero */}
          <section className="pt-[120px] pb-12 lg:pt-[152px] lg:pb-20 text-center">
            <Reveal duration={0.7} className={`${container} flex flex-col items-center`}>
              <h1 className="font-semibold text-[48px] md:text-[64px] text-[#121212] text-balance" style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                {t.rich('hero.heading', { br })}
              </h1>
              <p className="mt-[26px] max-w-[760px] text-[18px] leading-[1.4] text-[#4B4B4B] text-balance">{t('hero.body')}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                <Button asChild variant="primary" mode="light" icon={null}>
                  <a href={href('book-meeting', locale)}>{t('hero.cta')}</a>
                </Button>
                <a href={href('science', locale)} className="group flex items-center gap-3 text-[16px] font-medium text-[#4B4B4B] hover:text-[#121212] transition-colors">
                  {t('hero.science')}
                  <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </section>

          {/* Platform: the three products */}
          <section className="pb-14 lg:pb-20">
            <Reveal
              y={32}
              scale={0.98}
              duration={0.9}
              className="max-w-[1344px] mx-5 md:mx-8 lg:mx-auto rounded-[24px] md:rounded-[40px] px-4 pt-8 pb-4 md:px-12 md:pt-[52px] md:pb-12 text-center"
              style={{ background: 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.85) 18%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0) 62%), linear-gradient(90deg, #fdf1ea 0%, #f5f5f7 50%, #efeefd 100%)' }}
            >
              <div className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#4B4DF7]">{t('platform.eyebrow')}</div>
              <h2 className={`mt-[18px] ${H2}`}>{t.rich('platform.heading', { br })}</h2>
              <p className="mx-auto mt-[22px] max-w-[800px] text-[18px] leading-[1.4] text-[#4B4B4B] text-balance">{t('platform.body')}</p>
              <div className="mt-10 grid gap-3 md:grid-cols-3 lg:gap-[42px]">
                {PRODUCTS.map((p) => (
                  <a
                    key={p}
                    href={`#${p}`}
                    onClick={(e) => scrollTo(e, p)}
                    className="group flex flex-col items-center gap-[26px] rounded-2xl border border-[#e5e7eb] bg-white px-5 pt-6 pb-[22px] md:px-8 md:pt-8 md:pb-[30px] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(20,20,60,0.10),0_2px_6px_rgba(20,20,60,0.03)]"
                  >
                    <Logo product={p} />
                    <p className="text-[16px] leading-[1.5] text-[#4B4B4B] text-balance">{t(`platform.cards.${p}`)}</p>
                    <span className="mt-auto flex items-center gap-2 text-[16px] font-medium text-[#4B4DF7] group-hover:text-[#3133E7] transition-colors">
                      {t('platform.explore')}
                      <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Map */}
          <section id="map" className={section}>
            <div className={container}>
              <Reveal><Logo product="map" /></Reveal>
              <Reveal delay={0.1}><h2 className={`mt-6 lg:mt-11 ${H2}`}>{t.rich('map.heading', { br })}</h2></Reveal>
              <ProblemSolution product="map" />
              <TabbedPanel product="map" tabs={MAP_TABS} />
              <Features product="map" />
            </div>
          </section>

          {/* Assess */}
          <section id="assess" className={section}>
            <div className={container}>
              <Reveal><Logo product="assess" /></Reveal>
              <Reveal delay={0.1}><h2 className={`mt-6 lg:mt-11 ${H2}`}>{t.rich('assess.heading', { br })}</h2></Reveal>
              <ProblemSolution product="assess" />
              <TabbedPanel product="assess" tabs={ASSESS_TABS} />
              <Features product="assess" />
            </div>
          </section>

          {/* Decide */}
          <section id="decide" className={section}>
            <div className={container}>
              <Reveal><Logo product="decide" /></Reveal>
              <Reveal delay={0.1} className="mt-6 lg:mt-11 grid gap-6 lg:gap-0 lg:grid-cols-[minmax(0,713fr)_minmax(0,631fr)] items-start">
                <h2 className={`max-w-[660px] lg:pr-8 ${H2}`}>{t('decide.heading')}</h2>
                <p className="text-[18px] leading-[1.4] text-[#4B4B4B]">{t('decide.lead')}</p>
              </Reveal>
              <ProblemSolution product="decide" />
              <Reveal y={40} duration={0.9} className="mt-10 lg:mt-28 rounded-[24px] md:rounded-[40px] bg-[#f5f5f7] p-3 md:px-10 md:py-[38px]">
                <div className="relative w-full aspect-video">
                  <Recording name={MEDIA.decide} label={t('logos.decide')} />
                </div>
              </Reveal>
              <Features product="decide" />
            </div>
          </section>
        </div>

        {/* CTA */}
        <section className="py-14 lg:py-28">
          <Reveal
            y={32}
            scale={0.98}
            duration={0.9}
            className="max-w-[1344px] mx-5 md:mx-8 lg:mx-auto flex flex-col items-center rounded-[24px] md:rounded-[40px] border border-white/[0.08] bg-white/[0.04] px-5 py-12 md:px-8 md:py-20 text-center"
            style={{ backgroundImage: 'radial-gradient(ellipse 45% 70% at 100% 0%, rgba(90,52,44,0.85) 0%, rgba(33,32,38,0) 100%)' }}
          >
            <h2 className="font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-white text-balance">{t('cta.heading')}</h2>
            <p className="mt-[26px] text-[18px] leading-[1.4] text-white/70">{t('cta.body')}</p>
            <Button asChild variant="primary" mode="dark" className="mt-[34px]">
              <a href={href('book-meeting', locale)}>
                {t('cta.cta')}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </Reveal>
        </section>
        <Footer />
      </main>
    </>
  );
}
