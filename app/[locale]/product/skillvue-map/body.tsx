import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight, Check, Database, FlaskConical, Search, Sparkles } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { HeroVideo } from '@/components/ui/hero-video';
import { href } from '@/i18n/routes';

const CONTAINER = 'max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12';
const EYEBROW = 'text-[12px] font-medium uppercase tracking-[1.2px]';
const H2 = 'font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-[#121212]';
const BODY = 'text-[16px] leading-[1.45] text-[#4B4B4B]';

// The product captures are 1344×956 and in the visitor's language. Below lg the
// frame turns squarer and crops onto `focus` — the part of the UI the section
// is about — instead of shrinking the whole screen to illegibility.
const FEATURES = [
  { id: 'jobs', image: 'map-job-architecture', focus: [620, 400] },
  { id: 'consistency', image: 'map-skill-profile', focus: [620, 420] },
  { id: 'mapping', image: 'map-compare-roles', focus: [700, 380] },
  { id: 'activation', image: 'decide-participants', focus: [640, 420], video: true },
] as const;

const PRODUCTS = [
  { id: 'map', logo: '/product/skillvue-map-logo.svg', width: 148, height: 25 },
  { id: 'assess', logo: '/product/skillvue-assess-logo.svg', width: 231, height: 32 },
  { id: 'decide', logo: '/product/skillvue-decide-logo.svg', width: 225, height: 32 },
] as const;

const FLOW_INPUTS = [
  { id: 'jobsData', Icon: Database },
  { id: 'market', Icon: Search },
  { id: 'science', Icon: FlaskConical },
] as const;

// `video`, when set, is a screen recording with the capture as its first frame.
function Mockup({ src, alt, focus, video }: { src: string; alt: string; focus: readonly [number, number]; video?: string }) {
  const position = `${(focus[0] / 1344) * 100}% ${(focus[1] / 956) * 100}%`;
  return (
    <div className="overflow-hidden rounded-lg border border-black/[0.12] bg-[#F7F7F7] aspect-square md:aspect-[4/3] lg:aspect-[1344/956]">
      {video ? (
        <div role="img" aria-label={alt} className="h-full" style={{ ['--focus' as string]: position }}>
          <HeroVideo
            poster={src}
            webmSrc={`${video}.webm`}
            mp4Src={`${video}.mp4`}
            delay={0}
            className="h-full"
            videoClassName="block h-full w-full object-cover [object-position:var(--focus)]"
          />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={1344}
          height={956}
          className="block h-full w-full object-cover"
          style={{ objectPosition: position }}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 flex flex-col gap-4">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3.5 text-[16px] font-semibold leading-[1.25] text-[#121212]">
          <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#4B4DF7]" strokeWidth={1.5} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const FLOW_BOX = 'flex h-[57px] items-center justify-center gap-3 rounded border px-3 text-center text-[16px] font-medium tracking-[0.04em] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0';

export default async function ProductPage() {
  const locale = await getLocale();
  const t = await getTranslations('product.skillvue-map');
  const shot = (name: string) => `/product/${name}-${locale}.avif`;
  const clip = (name: string) => `/product/${name}-${locale}`;
  const demo = (
    <Button asChild variant="primary" mode="light">
      <a href={href('book-meeting', locale)}>{t('cta')}</a>
    </Button>
  );

  return (
    <>
      <Navbar />
      <main className="section-breathe">
        {/* Hero */}
        <section className="pt-[144px] pb-16 md:pt-[168px] md:pb-[88px] lg:pt-[192px] lg:pb-[112px]">
          <div className={CONTAINER}>
            <Reveal y={16} className="mx-auto flex max-w-[918px] flex-col items-center gap-6 text-center">
              <h1 className="font-semibold text-[48px] md:text-[64px] text-[#121212] text-balance" style={{ lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                {t('hero.titleLead')} <span className="hidden lg:block" aria-hidden="true" />{t('hero.titleTail')}
              </h1>
              <p className="max-w-[587px] text-[18px] leading-[1.35] text-[#121212]">{t('hero.body')}</p>
              {demo}
            </Reveal>
            <Reveal y={40} duration={0.9} delay={0.3} className="mt-12 md:mt-16 lg:mt-20">
              <Mockup src={shot('map-skills-explore')} video={clip('map-skills-explore')} alt={t('hero.imageAlt')} focus={[700, 520]} />
            </Reveal>
          </div>
        </section>

        {/* Problem → solution */}
        <section className="pb-0">
          <Reveal y={16} className={`${CONTAINER} flex flex-wrap items-start gap-x-12 gap-y-8`}>
            {(['problem', 'solution'] as const).map((id, i) => (
              <div key={id} className="contents">
                {i === 1 && <ArrowRight aria-hidden="true" className="mt-9 h-6 w-6 shrink-0 text-[#4B4DF7]" strokeWidth={1.5} />}
                <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
                  <p className={`${EYEBROW} ${i === 0 ? 'text-[#ff5f24]' : 'text-[#4B4DF7]'}`}>{t(`${id}.eyebrow`)}</p>
                  <h3 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#121212] text-balance">{t(`${id}.title`)}</h3>
                  <p className={`${BODY} text-pretty`}>{t(`${id}.body`)}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </section>

        {/* How it works */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-[88px] lg:pt-20 lg:pb-[112px]">
          <div className={CONTAINER}>
            <Reveal y={16}>
              <p className={`${EYEBROW} text-[#4B4B4B]`}>{t('how.eyebrow')}</p>
              <div className="mt-6 grid grid-cols-1 gap-y-6 md:mt-8 lg:mt-10 lg:grid-cols-2 lg:gap-x-12">
                <h2 className={H2}>{t('how.title')}</h2>
                <p className={BODY}>{t('how.body')}</p>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-6 xl:gap-10">
              {(t.raw('how.steps') as { title: string; body: string }[]).map((step, i) => (
                <Reveal key={step.title} y={16} delay={i * 0.12} className="flex flex-col gap-[42px] rounded-lg border border-black/[0.12] p-6">
                  <h3 className="flex items-baseline gap-4">
                    <span className="text-[32px] font-light tracking-[0.04em] text-[#4B4B4B]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[24px] md:text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#121212]">{step.title}</span>
                  </h3>
                  <p className={BODY}>{step.body}</p>
                </Reveal>
              ))}
            </div>

            <p className={`${EYEBROW} mt-8 text-[#4B4B4B] lg:mt-10`}>{t('how.flowLabel')}</p>
            <Reveal y={16} className="mt-8 grid grid-cols-1 lg:mt-10 lg:h-[235px] lg:grid-cols-[372fr_111fr_369fr_121fr_371fr]">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:flex lg:flex-col lg:gap-8">
                {FLOW_INPUTS.map(({ id, Icon }) => (
                  <div key={id} className={`${FLOW_BOX} border-black/25 bg-white text-[#121212]`}>
                    <Icon aria-hidden="true" strokeWidth={1.5} />
                    <span>{t(`how.flow.${id}`)}</span>
                  </div>
                ))}
              </div>
              {/* The three inputs converge on the AI step: a bracket on desktop, a plain line when stacked. */}
              <svg className="hidden h-[235px] w-full text-black/20 lg:block" viewBox="0 0 111 235" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 28.5H47.5Q55.5 28.5 55.5 36.5V198.5Q55.5 206.5 47.5 206.5H0M0 117.5H111" fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="mx-auto block h-8 w-px bg-black/20 lg:hidden" aria-hidden="true" />
              <div className="flex items-center">
                <div className={`${FLOW_BOX} h-14 w-full border-transparent bg-[#4B4DF7] text-white`}>
                  <Sparkles aria-hidden="true" strokeWidth={1.5} />
                  <span>{t('how.flow.ai')}</span>
                </div>
              </div>
              <div className="flex items-center justify-center text-black/20 lg:pr-2" aria-hidden="true">
                <span className="hidden h-px flex-1 bg-current lg:block" />
                <ArrowRight className="hidden h-3 w-3 -ml-1.5 lg:block" strokeWidth={1.5} />
                <span className="block h-8 w-px bg-current lg:hidden" />
              </div>
              <div className="flex items-center">
                <div className={`${FLOW_BOX} w-full border-[#121212] bg-white text-[#121212]`}>
                  <Check aria-hidden="true" strokeWidth={1.5} />
                  <span>{t('how.flow.ready')}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        {FEATURES.map(({ id, image, focus, ...f }) => (
          <section key={id} className="py-16 md:py-[88px] lg:py-[112px]">
            <div className={CONTAINER}>
              <Reveal y={16}>
                <p className={`${EYEBROW} text-[#4B4B4B]`}>{t(`features.${id}.eyebrow`)}</p>
                <div className="mt-6 grid grid-cols-1 gap-y-6 md:mt-8 lg:mt-10 lg:grid-cols-2 lg:gap-x-12">
                  <h2 className={`${H2} text-balance`}>{t(`features.${id}.title`)}</h2>
                  <div>
                    <p className={BODY}>{t(`features.${id}.body`)}</p>
                    <Points items={t.raw(`features.${id}.points`) as string[]} />
                  </div>
                </div>
              </Reveal>
              <Reveal y={24} scale={0.96} duration={0.8} className="mt-12 md:mt-16 lg:mt-20">
                <Mockup src={shot(image)} video={'video' in f ? clip(image) : undefined} alt={t(`features.${id}.imageAlt`)} focus={focus} />
              </Reveal>
            </div>
          </section>
        ))}

        {/* One platform, three products */}
        <section className="py-16 md:py-[88px] lg:py-[112px]">
          <div className={CONTAINER}>
            <div
              className="rounded-[20px] px-4 py-8 text-center md:rounded-3xl md:p-10 xl:-mx-2 xl:rounded-[32px] xl:px-[55px] xl:py-12"
              style={{ backgroundImage: 'linear-gradient(100deg, #fdf3ec 0%, #f7f7f7 50%, #efeefb 100%)' }}
            >
              <Reveal y={16} className="flex flex-col items-center gap-6">
                <p className={`${EYEBROW} text-[#4B4DF7]`}>{t('platform.eyebrow')}</p>
                <h2 className={`${H2} text-balance`}>{t('platform.title')}</h2>
                <p className="max-w-[760px] text-[18px] leading-[1.35] text-[#4B4B4B]">{t('platform.body')}</p>
              </Reveal>
              <div className="mt-8 grid grid-cols-1 justify-items-center gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-6 xl:gap-[43px]">
                {PRODUCTS.map(({ id, logo, width, height }, i) => (
                  <Reveal key={id} y={16} delay={i * 0.1} className="flex w-full max-w-[520px] flex-col items-center gap-6 rounded-xl bg-white px-6 py-8 lg:max-w-none">
                    <img src={logo} alt={t(`platform.${id}.name`)} width={width} height={height} loading="lazy" decoding="async" className="h-8 w-auto max-w-full" />
                    <p className="max-w-[344px] text-[14px] leading-[1.45] text-[#4B4B4B] text-balance">{t(`platform.${id}.body`)}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Demo */}
        <section className="py-16 md:py-[88px] lg:py-[112px]">
          <Reveal y={16} className={`${CONTAINER} flex flex-col items-center gap-8 text-center lg:gap-10`}>
            <h2 className={H2}>{t('demo.title')}</h2>
            <p className="max-w-[640px] text-[18px] leading-[1.35] text-[#121212]">{t('demo.body')}</p>
            {demo}
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
