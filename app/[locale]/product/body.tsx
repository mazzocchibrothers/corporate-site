'use client';

import { useState, type MouseEvent } from 'react';
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
import { HeroCopy } from '@/components/ui/hero-copy';
import { MapScreens, type MapScreen } from '@/components/product/map-screens';
import { AssessScreens, type AssessScreen } from '@/components/product/assess-screens';
import { DecideDemo } from '@/components/product/decide-demo';

const PRODUCTS = ['map', 'assess', 'decide'] as const;
type Product = (typeof PRODUCTS)[number];

// Each tab is a screen of the product UI drawn in HTML (<MapScreens>,
// <AssessScreens>), which reads its copy from the catalogue; Decide's is the
// animated <DecideDemo>.
const MAP_TABS: MapScreen[] = ['jobs', 'skills', 'compare'];
const ASSESS_TABS: AssessScreen[] = ['interview', 'questions'];

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
  const t = useTranslations('product');
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


function ProblemSolution({ product }: { product: Product }) {
  const t = useTranslations('product');
  return (
    <div className="mt-8 lg:mt-[52px] grid gap-5 lg:gap-0 lg:grid-cols-[minmax(0,560fr)_minmax(40px,214fr)_minmax(0,570fr)] items-center">
      <Reveal x={-30} y={0} duration={0.8}>
        <div className="type-eyebrow font-medium text-[#ff5f24]">{t('problem')}</div>
        <h3 className="mt-3 text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#121212]">{t(`${product}.problemTitle`)}</h3>
        <p className="type-body mt-3 text-[#4B4B4B]">{t(`${product}.problemBody`)}</p>
      </Reveal>
      <div className="flex lg:justify-center text-[#4B4DF7]" aria-hidden="true">
        <ArrowRight className="w-[22px] h-[22px] rotate-90 lg:rotate-0" strokeWidth={1.8} />
      </div>
      <Reveal x={30} y={0} duration={0.8} delay={0.2}>
        <div className="type-eyebrow font-medium text-[#4B4DF7]">{t('solution')}</div>
        <h3 className="mt-3 text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#121212]">{t(`${product}.solutionTitle`)}</h3>
        <p className="type-body mt-3 text-[#4B4B4B]">{t(`${product}.solutionBody`)}</p>
      </Reveal>
    </div>
  );
}

// The product screens sit on the page, not on a card: they carry their own
// window frame. The tabs start at the left edge, in line with the section's
// copy, and the active one is a grey pill (#E7E7E8) that reads on white.
function TabbedPanel({ product, tabs }: { product: 'map' | 'assess'; tabs: string[] }) {
  const t = useTranslations('product');
  const [active, setActive] = useState(0);
  const label = (key: string) => t(`${product}.tabs.${key}`);
  const tab = tabs[active];

  return (
    <Reveal y={40} duration={0.9} className="mt-10 lg:mt-[84px]">
      <div role="tablist" className="mb-4 md:mb-6 flex flex-col md:flex-row md:flex-wrap items-start gap-1 md:gap-2">
        {tabs.map((key, i) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`type-body h-11 px-6 rounded-full font-medium transition-[color,background-color,transform] duration-150 active:scale-[0.97] ${active === i ? 'bg-[#E7E7E8] text-[#121212]' : 'text-[#4B4B4B] hover:text-[#121212]'}`}
          >
            {label(key)}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {/* Not keyed: the screens stay mounted and cross-fade between tabs. */}
        {product === 'map'
          ? <MapScreens tab={tab as MapScreen} label={label(tab)} />
          : <AssessScreens tab={tab as AssessScreen} label={label(tab)} />}
      </div>
    </Reveal>
  );
}

function Features({ product }: { product: Product }) {
  const t = useTranslations('product');
  const items = FEATURES[product];
  return (
    <div className={`mt-6 lg:mt-8 grid gap-3 lg:gap-6 sm:grid-cols-2 ${items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {items.map(([key, icon], i) => (
        <Reveal key={key} y={16} duration={0.6} delay={i * 0.06} className="rounded-2xl border border-[#e5e7eb] bg-[#f7f7f7] p-5 lg:p-6 lg:pb-7">
          <IconTile icon={icon} mode="light" />
          <h3 className="mt-4 lg:mt-[22px] text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#121212]">{t(`${product}.features.${key}.title`)}</h3>
          <p className="type-body mt-3 text-[#4B4B4B]">{t(`${product}.features.${key}.body`)}</p>
        </Reveal>
      ))}
    </div>
  );
}

function ReadMore() {
  const t = useTranslations('product');
  const locale = useLocale();
  return (
    <a
      href={href('product/skillvue-map', locale)}
      className="type-button group inline-flex h-[46px] shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-[#e5e7eb] bg-white pl-6 pr-[22px] font-medium text-[#121212] transition-colors hover:bg-[#f7f7f7]"
    >
      {t('map.readMore')}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} aria-hidden="true" />
    </a>
  );
}

export default function SkillvueMapPage() {
  const t = useTranslations('product');
  const locale = useLocale();
  const container = 'max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12';
  const section = 'scroll-mt-20 border-t border-[#e5e7eb] py-16 lg:pt-[120px] lg:pb-[104px]';

  return (
    <>
      <Navbar />
      <main>
        <div className="section-light">
          {/* Hero — the headline block and the three-products block together
              make up the hero, sized to the viewport as one unit. */}
          <div className="min-h-screen flex flex-col justify-center">
            <section className="pt-[120px] pb-8 lg:pt-[152px] text-center">
              <Reveal duration={0.7} className={`${container} flex flex-col items-center`}>
                <HeroCopy>
                  <h1 className="font-semibold text-[48px] md:text-[58px] text-[#121212] text-balance" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    {t.rich('hero.heading', { br })}
                  </h1>
                  <p className="type-body-lg hero-subtitle mt-[26px] text-[#4B4B4B] text-balance">{t('hero.body')}</p>
                </HeroCopy>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                  <Button asChild variant="primary" mode="light" icon={null}>
                    <a href={href('book-meeting', locale)}>{t('hero.cta')}</a>
                  </Button>
                  <a href={href('science', locale)} className="type-link group flex items-center gap-3 font-medium text-[#4B4B4B] hover:text-[#121212] transition-colors">
                    {t('hero.science')}
                    <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            </section>

            {/* Platform: the three products */}
            <section className="pt-16 pb-14 lg:pt-24 lg:pb-20">
              <Reveal
                y={32}
                scale={0.98}
                duration={0.9}
                className="max-w-[1344px] mx-5 md:mx-8 lg:mx-auto rounded-[24px] md:rounded-[40px] px-4 pb-4 md:px-12 md:pb-12 text-center"
                style={{ background: 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.85) 18%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0) 62%), linear-gradient(90deg, #fdf1ea 0%, #f5f5f7 50%, #efeefd 100%)' }}
              >
                <h2 className={`${H2} max-w-[880px] mx-auto`}>{t.rich('platform.heading', { br })}</h2>
                <div className="mt-10 lg:mt-12 grid gap-3 md:grid-cols-3 lg:gap-[42px]">
                  {PRODUCTS.map((p) => (
                    <a
                      key={p}
                      href={`#${p}`}
                      onClick={(e) => scrollTo(e, p)}
                      className="group flex flex-col items-center gap-[26px] rounded-2xl border border-[#e5e7eb] bg-white px-5 pt-6 pb-[22px] md:px-8 md:pt-8 md:pb-[30px] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(20,20,60,0.10),0_2px_6px_rgba(20,20,60,0.03)]"
                    >
                      <Logo product={p} />
                      <p className="type-body text-[#4B4B4B] text-balance">{t(`platform.cards.${p}`)}</p>
                      <span className="type-button mt-auto flex items-center gap-2 font-medium text-[#4B4DF7] group-hover:text-[#3133E7] transition-colors">
                        {t('platform.explore')}
                        <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </section>
          </div>

          {/* Map */}
          <section id="map" className={section}>
            <div className={container}>
              <Reveal><Logo product="map" /></Reveal>
              <Reveal delay={0.1} className="mt-6 lg:mt-11 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
                <h2 className={`max-w-[880px] min-w-0 flex-[1_1_560px] ${H2}`}>{t.rich('map.heading', { br })}</h2>
                <ReadMore />
              </Reveal>
              <ProblemSolution product="map" />
              <TabbedPanel product="map" tabs={MAP_TABS} />
              <Features product="map" />
              <div className="mt-8 lg:mt-20 flex justify-center"><ReadMore /></div>
            </div>
          </section>

          {/* Assess */}
          <section id="assess" className={section}>
            <div className={container}>
              <Reveal><Logo product="assess" /></Reveal>
              <Reveal delay={0.1}><h2 className={`max-w-[880px] mt-6 lg:mt-11 ${H2}`}>{t.rich('assess.heading', { br })}</h2></Reveal>
              <ProblemSolution product="assess" />
              <TabbedPanel product="assess" tabs={ASSESS_TABS} />
              <Features product="assess" />
            </div>
          </section>

          {/* Decide */}
          <section id="decide" className={section}>
            <div className={container}>
              <Reveal><Logo product="decide" /></Reveal>
              <Reveal delay={0.1}><h2 className={`max-w-[880px] mt-6 lg:mt-11 ${H2}`}>{t.rich('decide.heading', { br })}</h2></Reveal>
              <ProblemSolution product="decide" />
              <Reveal y={40} duration={0.9} className="mt-10 lg:mt-28">
                <DecideDemo label={t('logos.decide')} />
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
            <h2 className="max-w-[880px] font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-white text-balance">{t('cta.heading')}</h2>
            <p className="max-w-[880px] type-body-lg mt-[26px] text-white/70">{t('cta.body')}</p>
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
