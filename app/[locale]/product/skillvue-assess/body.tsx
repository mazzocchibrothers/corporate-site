import type { ReactNode } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Check,
  Mic,
  MonitorUp,
  Quote,
  ScanFace,
  Users,
  VenusAndMars,
  X,
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { HeroCopy } from '@/components/ui/hero-copy';
import { TrustFaq } from '@/components/trust/TrustFaq';
import { href } from '@/i18n/routes';
import { CountUp } from '@/components/assess/count-up';
import { BookDemoButton } from '@/components/assess/book-demo-button';
import { TeamReadiness } from '@/components/assess/visuals/team-readiness';
import { ContextToRole } from '@/components/assess/visuals/context-to-role';
import { MeasureCapability } from '@/components/assess/visuals/measure-capability';
import { DecideResult } from '@/components/assess/visuals/decide-result';
import { QuestionGenerator } from '@/components/assess/visuals/question-generator';
import { DeliverChat } from '@/components/assess/visuals/deliver-chat';
import { FrameworkMapping } from '@/components/assess/visuals/framework-mapping';
import { ReadinessReport } from '@/components/assess/visuals/readiness-report';
import { COMPARISON, COMPARISON_COLUMNS, type Verdict } from '@/components/assess/visuals/data';

// /product/skillvue-assess. Built from the "Assess Product Page v8" design with
// the site's own parts: the /product/skillvue-map page's container and type,
// <Reveal> for every entrance, the house <Button>, the /trust FAQ. The product
// visuals are illustrations drawn in HTML, in components/assess/visuals.
//
// A server component: every word renders on the server. The visuals, the
// count-ups, the FAQ and the tracked closing button are the client parts.

const CONTAINER = 'max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12';
const SECTION = 'py-16 md:py-[88px] lg:py-[112px]';
const EYEBROW = 'type-eyebrow text-[#4B4DF7]';
const H2 = 'font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-[#121212]';
const H3 = 'font-display text-[20px] md:text-[22px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#121212]';
const LEDE = 'type-body-lg text-[#4B4B4B]';
const PILL = 'rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-0.5 type-caption text-[#4B4B4B]';
const STAT = 'stat-value text-[#4B4DF7]';

type Point = { title: string; body: string };

/** A centred section opening: eyebrow, title, lede. */
function Head({ eyebrow, title, body, eyebrowClass = EYEBROW }: { eyebrow: string; title: ReactNode; body?: string; eyebrowClass?: string }) {
  return (
    <Reveal y={16} className="mx-auto flex max-w-[880px] flex-col items-center gap-5 text-center">
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={H2}>{title}</h2>
      {body && <p className={LEDE}>{body}</p>}
    </Reveal>
  );
}

/** A checked list: a bold line and a sentence under it. */
function Points({ items, className }: { items: Point[]; className?: string }) {
  return (
    <ul className={className ?? 'mt-8 flex flex-col gap-5'}>
      {items.map((item) => (
        <li key={item.title} className="flex gap-3.5">
          <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#4B4DF7]" strokeWidth={1.75} />
          <span>
            <span className="block type-body-bold text-[#121212]">{item.title}</span>
            <span className="mt-1 block type-body text-[#4B4B4B]">{item.body}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function VerdictMark({ verdict, ours, labels }: { verdict: Verdict; ours: boolean; labels: Record<Verdict, string> }) {
  if (verdict === 'partly') return <span className="type-caption font-medium text-[#d9603f]">{labels.partly}</span>;
  return (
    <>
      {verdict === 'yes' ? (
        <Check aria-hidden="true" className={`h-4 w-4 ${ours ? 'text-[#4B4DF7]' : 'text-[#121212]'}`} strokeWidth={1.75} />
      ) : (
        <X aria-hidden="true" className="h-4 w-4 text-[#ff5f24]" strokeWidth={1.75} />
      )}
      <span className="sr-only">{labels[verdict]}</span>
    </>
  );
}

const PRODUCTS = [
  { id: 'map', logo: '/logos/skillvue-map-logo.svg', width: 198, height: 33 },
  { id: 'assess', logo: '/logos/skillvue-assess-logo.svg', width: 230, height: 32 },
  { id: 'decide', logo: '/logos/skillvue-decide-logo.svg', width: 227, height: 32 },
] as const;

const STORIES = [
  { id: 'credem', route: 'customers/credem', logo: '/logos/client-credem.svg', width: 166, height: 32 },
  { id: 'mediaset', route: 'customers/mediaset', logo: '/logos/client-mediaset.svg', width: 152, height: 32 },
  { id: 'adr', route: 'customers/adr', logo: '/logos/client-adr.svg', width: 70, height: 32 },
] as const;

const NEVER = [
  { id: 'face', Icon: ScanFace },
  { id: 'voice', Icon: Mic },
  { id: 'accent', Icon: AudioLines },
  { id: 'gender', Icon: VenusAndMars },
  { id: 'ethnicity', Icon: Users },
  { id: 'screen', Icon: MonitorUp },
] as const;

export default async function SkillvueAssessPage() {
  const locale = await getLocale();
  const t = await getTranslations('product.skillvue-assess');
  const verdicts = t.raw('why.table.verdicts') as Record<Verdict, string>;
  const orange = (chunks: ReactNode) => <span className="text-[#ff5f24]">{chunks}</span>;
  // A product's logo on its tile; Assess, the product this page is about, raised.
  const productTile = ({ id, logo, width, height }: (typeof PRODUCTS)[number], className = '') => (
    <div
      className={`flex items-center justify-center rounded-2xl border border-black/[0.06] px-6 py-7 ${
        id === 'assess' ? 'bg-white shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)]' : 'bg-[#fafafa]'
      } ${className}`}
    >
      <img src={logo} alt={t(`how.products.${id}`)} width={width} height={height} loading="lazy" decoding="async" className="h-7 w-auto max-w-full md:h-8" />
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="section-light">
        {/* Hero */}
        <section className="pt-[144px] pb-16 md:pt-[168px] md:pb-[88px] lg:pt-[192px] lg:pb-[112px]">
          <div className={CONTAINER}>
            <Reveal y={16} className="mx-auto flex max-w-[918px] flex-col items-center gap-6 text-center">
              <p className={EYEBROW}>{t('hero.eyebrow')}</p>
              <HeroCopy>
                <h1 className="mb-6 font-semibold text-[48px] md:text-[58px] text-[#121212] text-balance" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {t('hero.title')}
                </h1>
                <p className="type-body-lg hero-subtitle text-[#4B4B4B]">{t('hero.body')}</p>
              </HeroCopy>
              <Button asChild variant="primary" mode="light">
                <a href="#how">
                  {t('hero.cta')}
                  <ArrowDown aria-hidden="true" />
                </a>
              </Button>
            </Reveal>

            <Reveal y={16} delay={0.15} className="mx-auto mt-12 max-w-[1040px] md:mt-16">
              <Points items={t.raw('hero.points') as Point[]} className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8" />
            </Reveal>

            <Reveal y={40} duration={0.9} delay={0.3} className="mx-auto mt-12 max-w-[1040px] md:mt-16">
              <TeamReadiness />
            </Reveal>

            <div aria-label={t('hero.proofLabel')} role="group" className="mx-auto mt-12 grid max-w-[1040px] grid-cols-1 gap-10 text-center md:mt-16 md:grid-cols-3 md:gap-8">
              {(t.raw('hero.proof') as { value: string; label: string; source: string }[]).map((p, i) => (
                <Reveal key={p.source} y={16} delay={i * 0.1} className="flex flex-col items-center gap-3">
                  <span className={`${STAT} block text-[36px] md:text-[44px]`} style={{ lineHeight: 1 }}>{p.value}</span>
                  <span className="max-w-[300px] type-body text-[#121212]">{p.label}</span>
                  <span className="type-body-sm text-[#7A7A7A]">{p.source}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why now */}
        <section id="why-now" className={`section-breathe ${SECTION}`}>
          <div className={CONTAINER}>
            <Head
              eyebrow={t('whyNow.eyebrow')}
              eyebrowClass="type-eyebrow text-[#ff5f24]"
              title={t.rich('whyNow.title', { span: orange })}
              body={t('whyNow.body')}
            />
            <div className="mx-auto mt-12 grid max-w-[1144px] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
              {(t.raw('whyNow.cards') as { tag: string; title: string; basis: string; result: string }[]).map((c, i) => (
                <Reveal key={c.tag} y={16} delay={i * 0.08} className="flex flex-col rounded-2xl bg-white p-6">
                  <p className="type-eyebrow text-[#4B4B4B]">{c.tag}</p>
                  <h3 className={`mt-3 ${H3}`}>{c.title}</h3>
                  <div className="mt-6 border-t border-black/[0.08] pt-4">
                    <p className="type-body-sm text-[#ff5f24]">{c.basis}</p>
                    <p className="mt-1 type-body text-[#4B4B4B]">{c.result}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal y={16} className="mx-auto mt-4 grid max-w-[1144px] grid-cols-1 gap-6 rounded-2xl bg-[#fdf1ea] p-6 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-10 md:p-10">
              <p className="type-eyebrow text-[#d9603f]">{t('whyNow.alarm.tag')}</p>
              <h3 className="font-display text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#121212] md:text-[30px]">{t('whyNow.alarm.title')}</h3>
              <div className="border-t border-[#d9603f]/20 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
                <p className="font-display text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#d9603f] md:text-[30px]">{t('whyNow.alarm.answer')}</p>
                <p className="mt-2 type-body-sm text-[#4B4B4B]">{t('whyNow.alarm.body')}</p>
              </div>
            </Reveal>
            <Reveal y={16} className="mx-auto mt-16 max-w-[880px] text-center md:mt-20">
              <p className="font-display text-[24px] font-medium leading-[1.3] tracking-[-0.01em] text-[#121212] md:text-[32px]">
                {t.rich('whyNow.stakes', { span: orange })}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Why Skillvue */}
        <section id="why" className={SECTION}>
          <div className={CONTAINER}>
            <Head eyebrow={t('why.eyebrow')} title={t('why.title')} body={t('why.body')} />
            <Reveal y={16} className="mx-auto mt-12 max-w-[1144px] md:mt-16">
              {/* md and up: the table */}
              {/* Separate borders, not collapsed: a collapsed table ignores
                  border-radius, and the Skillvue Assess column is one rounded
                  card. The row rules sit on the cells, so they run through it. */}
              <table className="hidden w-full border-separate border-spacing-0 text-left md:table">
                <caption className="sr-only">{t('why.table.caption')}</caption>
                <thead>
                  <tr>
                    <th scope="col" className="w-[36%] border-b border-black/[0.08] px-5 py-4 type-body-sm font-normal text-[#4B4B4B]">{t('why.table.columns.features')}</th>
                    {COMPARISON_COLUMNS.map((col, i) => (
                      <th
                        key={col}
                        scope="col"
                        className={`border-b border-black/[0.08] px-3 py-4 text-center type-body-sm font-normal ${
                          i === 0 ? 'rounded-t-2xl border-x border-t border-x-[#a9aaff] border-t-[#a9aaff] bg-[#f6f7ff] text-[#4B4DF7]' : 'text-[#4B4B4B]'
                        }`}
                      >
                        {t(`why.table.columns.${col}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, r) => {
                    const last = r === COMPARISON.length - 1;
                    const rule = last ? '' : 'border-b border-black/[0.08]';
                    return (
                    <tr key={row.id}>
                      <th scope="row" className={`px-5 py-5 type-body font-normal text-[#121212] ${rule}`}>{t(`why.table.rows.${row.id}`)}</th>
                      {COMPARISON_COLUMNS.map((col, i) => (
                        <td
                          key={col}
                          className={`px-3 py-5 text-center ${rule} ${
                            i === 0 ? `border-x border-x-[#a9aaff] bg-[#f6f7ff] ${last ? 'rounded-b-2xl border-b border-b-[#a9aaff]' : ''}` : ''
                          }`}
                        >
                          <span className="inline-flex justify-center"><VerdictMark verdict={row.cells[col]} ours={i === 0} labels={verdicts} /></span>
                        </td>
                      ))}
                    </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Below md: one block per feature */}
              <div className="flex flex-col gap-3 md:hidden">
                {COMPARISON.map((row) => (
                  <div key={row.id} className="rounded-2xl border border-black/[0.08] p-4">
                    <p className="type-body-bold text-[#121212]">{t(`why.table.rows.${row.id}`)}</p>
                    <dl className="mt-3 grid grid-cols-1 gap-2">
                      {COMPARISON_COLUMNS.map((col, i) => (
                        <div
                          key={col}
                          className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 ${i === 0 ? 'bg-[#f6f7ff]' : 'bg-[#fafafa]'}`}
                        >
                          <dt className={`type-body-sm ${i === 0 ? 'text-[#4B4DF7]' : 'text-[#4B4B4B]'}`}>{t(`why.table.columns.${col}`)}</dt>
                          <dd className="flex"><VerdictMark verdict={row.cells[col]} ours={i === 0} labels={verdicts} /></dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className={`section-breathe scroll-mt-20 ${SECTION}`}>
          <div className={CONTAINER}>
            <Head eyebrow={t('how.eyebrow')} title={t('how.title')} body={t('how.body')} />

            {/* md and up: the three products in a row, then their three cards
                below. On a phone each product sits right above its own card,
                with an arrow down to the next pair. */}
            <Reveal y={16} className="mx-auto mt-16 hidden max-w-[1144px] items-center gap-3 md:flex">
              {PRODUCTS.map((p, i) => (
                <div key={p.id} className="contents">
                  {i > 0 && <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-[#4B4DF7]" strokeWidth={1.5} />}
                  {productTile(p, 'flex-1')}
                </div>
              ))}
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-[1144px] grid-cols-1 gap-3 md:mt-6 md:grid-cols-3 md:gap-6">
              {([
                { id: 'context', product: PRODUCTS[0], Visual: ContextToRole },
                { id: 'measure', product: PRODUCTS[1], Visual: MeasureCapability },
                { id: 'decide', product: PRODUCTS[2], Visual: DecideResult },
              ] as const).map(({ id, product, Visual }, i) => (
                <div key={id} className="contents">
                  {i > 0 && <ArrowDown aria-hidden="true" className="mx-auto h-5 w-5 text-[#4B4DF7] md:hidden" strokeWidth={1.5} />}
                  <Reveal y={16} delay={i * 0.1} className="flex flex-col gap-3">
                    {productTile(product, 'md:hidden')}
                    <div
                      className={`flex flex-1 flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white ${
                        id === 'measure' ? 'shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)]' : ''
                      }`}
                    >
                      <div className="border-b border-black/[0.06] bg-[#fafafa] p-5">
                        <Visual />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className={H3}>{t(`how.${id}.title`)}</h3>
                        <p className="mt-3 type-body text-[#4B4B4B]">{t(`how.${id}.body`)}</p>
                        {id === 'context' && (
                          <a href={href('product/skillvue-map', locale)} className="mt-auto inline-flex items-center gap-2 pt-6 type-button text-[#4B4DF7] hover:text-[#3133E7]">
                            {t('how.context.link')}
                            <ArrowRight aria-hidden="true" className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Control */}
        <section id="control" className={`scroll-mt-20 ${SECTION}`}>
          <div className={CONTAINER}>
            <Head eyebrow={t('control.eyebrow')} title={t('control.title')} body={t('control.body')} />
            <div className="mx-auto mt-12 grid max-w-[1144px] grid-cols-1 gap-8 md:mt-16 md:grid-cols-3 md:gap-0">
              {(['ai', 'science', 'people'] as const).map((id, i) => (
                <Reveal key={id} y={16} delay={i * 0.1} className={`flex flex-col gap-3 ${i > 0 ? 'md:border-l md:border-black/[0.08] md:pl-10' : ''} md:pr-10`}>
                  <p className="type-body-sm text-[#4B4DF7]">{t(`control.pillars.${id}.role`)}</p>
                  <p className="font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#121212]">{t(`control.pillars.${id}.name`)}</p>
                  <p className="type-body text-[#4B4B4B]">{t(`control.pillars.${id}.body`)}</p>
                </Reveal>
              ))}
            </div>

            <Reveal
              y={16}
              className="mx-auto mt-12 grid max-w-[1144px] grid-cols-1 gap-6 rounded-[20px] p-6 md:mt-16 md:rounded-3xl md:p-10 lg:grid-cols-[1.1fr_1fr_0.8fr]"
              style={{ backgroundImage: 'linear-gradient(100deg, #efeefb 0%, #f7f7f7 55%, #fdf3ec 100%)' }}
            >
              <div className="flex flex-col gap-4">
                <p className="type-body-sm text-[#4B4DF7]">{t('control.proctoring.eyebrow')}</p>
                <h3 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#121212] md:text-[34px]">{t('control.proctoring.title')}</h3>
                <p className="type-body text-[#4B4B4B]">{t('control.proctoring.body')}</p>
              </div>
              <div className="flex flex-col gap-4">
                {(['rules', 'fair'] as const).map((id) => (
                  <div key={id} className="rounded-2xl border border-black/[0.06] bg-white p-5">
                    <p className="type-eyebrow text-[#4B4B4B]">{t(`control.${id}.title`)}</p>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {(t.raw(`control.${id}.items`) as string[]).map((item) => (
                        <li key={item} className="flex items-center gap-3 type-body text-[#121212]">
                          <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[#4B4DF7]" strokeWidth={1.75} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
                <p className="type-eyebrow text-[#ff5f24]">{t('control.never.title')}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {NEVER.map(({ id, Icon }) => (
                    <li key={id} className="flex items-center gap-3 type-body text-[#121212]">
                      <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fdf1ea] text-[#ff5f24]">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <span className="line-through decoration-[#ff5f24] decoration-1">{t(`control.never.items.${id}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Steps 1–3: copy beside a product visual */}
        {([
          { id: 'generate', Visual: QuestionGenerator, tone: 'section-breathe' },
          { id: 'deliver', Visual: DeliverChat, tone: '' },
          { id: 'measure', Visual: FrameworkMapping, tone: 'section-breathe' },
        ] as const).map(({ id, Visual, tone }) => (
          <section key={id} id={id} className={`${tone} ${SECTION}`}>
            <div className={`${CONTAINER} grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
              <Reveal y={16} className="max-w-[560px]">
                <p className={EYEBROW}>{t(`${id}.eyebrow`)}</p>
                <h2 className={`mt-5 ${H2}`}>{t(`${id}.title`)}</h2>
                <p className={`mt-5 ${LEDE}`}>{t(`${id}.body`)}</p>
                <Points items={t.raw(`${id}.points`) as Point[]} />
                {id === 'deliver' && (
                  <p className="mt-8 border-t border-black/[0.08] pt-6">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <CountUp value={t('deliver.proof.value')} className={`${STAT} text-[32px]`} />
                      <span className="type-body text-[#121212]">{t('deliver.proof.text')}</span>
                    </span>
                    <span className="mt-2 block type-eyebrow text-[#7A7A7A]">{t('deliver.proof.source')}</span>
                  </p>
                )}
              </Reveal>
              <Reveal y={24} scale={0.98} duration={0.8} className="min-w-0">
                <Visual />
              </Reveal>
            </div>
          </section>
        ))}

        {/* Use cases */}
        <section id="use-cases" className={`scroll-mt-20 ${SECTION}`}>
          <div className={CONTAINER}>
            <Head eyebrow={t('useCases.eyebrow')} title={t('useCases.title')} body={t('useCases.body')} />
            <div className="mx-auto mt-12 grid max-w-[1144px] grid-cols-1 gap-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-8">
              {(t.raw('useCases.cards') as { tag: string; title: string; body: string; value: string; result: string; source: string }[]).map((c, i) => (
                <Reveal key={c.tag} y={16} delay={i * 0.08} className="flex flex-col">
                  <p className={EYEBROW}>{c.tag}</p>
                  <h3 className={`mt-3 ${H3}`}>{c.title}</h3>
                  <p className="mt-3 type-body-sm text-[#4B4B4B]">{c.body}</p>
                  <div className="mt-6 border-t border-black/[0.08] pt-5">
                    <CountUp value={c.value} className={`${STAT} block text-[32px]`} />
                    <p className="mt-2 type-body-sm text-[#121212]">{c.result}</p>
                    <span className={`mt-3 inline-block ${PILL}`}>{c.source}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section id="evidence" className={`section-breathe ${SECTION}`}>
          <div className={CONTAINER}>
            <Head eyebrow={t('evidence.eyebrow')} title={t('evidence.title')} body={t('evidence.body')} />
            <Reveal y={24} scale={0.98} duration={0.8} className="mx-auto mt-12 max-w-[1040px] md:mt-16">
              <ReadinessReport />
            </Reveal>
            <Reveal y={16} className="mx-auto mt-10 max-w-[1040px]">
              <Points items={t.raw('evidence.points') as Point[]} className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8" />
            </Reveal>
          </div>
        </section>

        {/* Works with your systems */}
        <section id="systems" className={SECTION}>
          <div className={CONTAINER}>
            <Head eyebrow={t('systems.eyebrow')} title={t('systems.title')} body={t('systems.body')} />
            <div className="mx-auto mt-12 grid max-w-[1144px] grid-cols-1 gap-8 md:mt-16 md:grid-cols-3 md:gap-0">
              {(t.raw('systems.columns') as { title: string; body: string; chips: string[] }[]).map((c, i) => (
                <Reveal key={c.title} y={16} delay={i * 0.1} className={`flex flex-col gap-3 ${i > 0 ? 'md:border-l md:border-black/[0.08] md:pl-10' : ''} md:pr-10`}>
                  <h3 className={H3}>{c.title}</h3>
                  <p className="type-body text-[#4B4B4B]">{c.body}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {c.chips.map((chip) => (
                      <span key={chip} className="rounded-full border border-black/[0.1] bg-white px-3 py-1 type-caption font-medium text-[#121212]">{chip}</span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section id="proof" className={`section-breathe ${SECTION}`}>
          <div className={CONTAINER}>
            <Head eyebrow={t('proof.eyebrow')} title={t('proof.title')} body={t('proof.body')} />
            <div className="mx-auto mt-12 grid max-w-[1144px] grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
              {STORIES.map(({ id, route, logo, width, height }, i) => (
                <Reveal key={id} y={16} delay={i * 0.1}>
                  <a href={href(route, locale)} className="group flex h-full flex-col rounded-2xl bg-white p-6 transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(18,18,18,0.18)] md:p-8">
                    <img src={logo} alt={t(`proof.stories.${id}.logo`)} width={width} height={height} loading="lazy" decoding="async" className="h-7 w-auto self-start" />
                    <CountUp value={t(`proof.stories.${id}.value`)} className={`${STAT} mt-8 block text-[40px] md:text-[44px]`} />
                    <p className="mt-3 type-body-sm text-[#4B4B4B]">{t(`proof.stories.${id}.body`)}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 type-button text-[#4B4DF7] group-hover:text-[#3133E7]">
                      {t('proof.cta')}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal as="figure" y={16} className="mx-auto mt-16 flex max-w-[880px] flex-col items-center gap-6 text-center md:mt-20">
              <Quote aria-hidden="true" className="h-9 w-9 rotate-180 fill-[#121212] text-[#121212]" strokeWidth={1} />
              <blockquote className="font-display text-[22px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#121212] md:text-[30px]">
                {t('proof.quote')}
              </blockquote>
              <figcaption className="type-body-sm text-[#4B4B4B]">{t('proof.author')}</figcaption>
            </Reveal>
          </div>
        </section>

        {/* Trust */}
        <section id="trust" className={SECTION}>
          <div className={CONTAINER}>
            <Head eyebrow={t('trust.eyebrow')} title={t('trust.title')} body={t('trust.body')} />
            <div className="mx-auto mt-12 grid max-w-[1144px] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
              {(t.raw('trust.cards') as { tag: string; title: string; body: string }[]).map((c, i) => (
                <Reveal key={c.tag} y={16} delay={i * 0.08} className="flex flex-col rounded-2xl border border-black/[0.06] bg-white p-6">
                  <p className={EYEBROW}>{c.tag}</p>
                  <h3 className={`mt-3 ${H3}`}>{c.title}</h3>
                  <p className="mt-3 type-body-sm text-[#4B4B4B]">{c.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`section-breathe ${SECTION}`}>
          <div className={`${CONTAINER} assess-faq`}>
            <Reveal y={16} className="text-center">
              <h2 className={H2}>{t('faq.title')}</h2>
            </Reveal>
            <div className="mx-auto mt-10 flex max-w-[880px] md:mt-12">
              <TrustFaq items={t.raw('faq.items') as { q: string; a: string }[]} />
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className={SECTION}>
          <div className={CONTAINER}>
            <Reveal
              y={16}
              className="mx-auto flex max-w-[1144px] flex-col items-center gap-6 rounded-[20px] px-6 py-14 text-center md:rounded-3xl md:px-10 md:py-20"
              style={{ backgroundImage: 'linear-gradient(100deg, #fdf3ec 0%, #f7f7f7 50%, #efeefb 100%)' }}
            >
              <h2 className={`max-w-[880px] ${H2}`}>{t('closing.title')}</h2>
              <p className={`max-w-[720px] ${LEDE}`}>{t('closing.body')}</p>
              <BookDemoButton href={href('book-meeting', locale)} label={t('closing.cta')} language={locale} />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
