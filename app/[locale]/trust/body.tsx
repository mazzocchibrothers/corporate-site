// /trust — how Skillvue's AI, data handling and security hold up to review by
// HR, Legal, IT, Procurement and the DPO.
//
// A server component on the site's standards: the hero is <HeroCopy>, section
// titles are the house H2, text is on the type scale, scroll motion is
// <Reveal>, and the page closes on the shared <ClosingBanner>. The product UI
// it shows in miniature is drawn in components/trust/mockups.tsx. What else
// moves is CSS (`.trust-*` in styles/globals.css: the looping connectors and
// the audit log) or a client island in components/trust/: the measured
// connector lines and the FAQ accordion.
//
// The design's breakpoints are max-width 1080 / 900 / 760px rather than the
// site's min-width ones, so its responsive rules are `max-[Npx]:` variants.

import type { ReactNode } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import ClosingBanner from '@/components/shared/ClosingBanner';
import { Button } from '@/components/ui/button';
import { HeroCopy } from '@/components/ui/hero-copy';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';
import { href } from '@/i18n/routes';
import { AuditLogMock, DealDiagram, DeclarationMock, PseudonymMock, ScoreMock } from '@/components/trust/mockups';
import { SplitLines } from '@/components/trust/SplitLines';
import { TrustFaq } from '@/components/trust/TrustFaq';
import { ROSETTE } from '@/components/trust/rosette';

// ── Shared styles ───────────────────────────────────────────────────────────
const CONTAINER = 'max-w-[1184px] mx-auto px-8 max-[760px]:px-5';
const H2 = 'font-semibold tracking-[-0.02em] text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-[#121212] max-w-[880px]';
const H3 = 'font-medium text-[20px] leading-[1.25] tracking-[-0.02em]';
const BODY = 'type-body text-[#4B4B4B]';
const TAG = 'rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-0.5 type-caption text-[#4B4B4B] max-w-full';
const CHIP = 'flex items-center gap-2 type-body-sm text-[#121212] bg-[#f1f5f9] border border-[#e5e7eb] px-3 py-1.5 rounded-full';
const ICON_TILE = 'w-10 h-10 rounded-[10px] bg-[#F7F7F7] border border-[#EBEBEB] flex items-center justify-center shrink-0';
const ROLE_SHADOW = 'shadow-[0_1px_2px_rgba(16,24,40,.04),0_6px_16px_rgba(16,24,40,.04)]';
const PILL_SHADOW = 'shadow-[0_2px_6px_rgba(16,24,40,.06)]';
// Below 760px the "Who does what" cards lose their shadow and tighten their corners.
const ROLE_FLAT = 'max-[760px]:shadow-none max-[760px]:rounded-[10px]';

// ── Icons ───────────────────────────────────────────────────────────────────
function Stroke({ children, size = 16, color = '#6B7DFF' }: { children: ReactNode; size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 block"
    >
      {children}
    </svg>
  );
}

const DOC = <><rect x="3.5" y="1.8" width="9" height="12.4" rx="1.8" /><path d="M5.8 5.5h4.4M5.8 8h4.4M5.8 10.5h2.6" /></>;
const LOCK = <><rect x="3.5" y="7" width="9" height="7" rx="1.6" /><path d="M5.5 7V5.3a2.5 2.5 0 015 0V7" /></>;
const SHIELD = <path d="M8 1.8l5 2v4c0 3-2.2 5.2-5 6.4C5.2 13 3 10.8 3 7.8v-4l5-2z" />;
const NO = <><circle cx="8" cy="8" r="6.2" /><path d="M6 6l4 4M10 6l-4 4" /></>;
const CHECK = <><circle cx="8" cy="8" r="6.2" /><path d="M5.3 8.2l1.8 1.8 3.6-3.8" /></>;
const CHIP_ICON = <><rect x="4" y="4" width="8" height="8" rx="1.5" /><path d="M6 1.8v2M10 1.8v2M6 12.2v2M10 12.2v2M1.8 6h2M1.8 10h2M12.2 6h2M12.2 10h2" /></>;
const EYE = <><path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8s-2.4 4.5-6.5 4.5S1.5 8 1.5 8z" /><circle cx="8" cy="8" r="2" /></>;
const TARGET = <><circle cx="8" cy="8" r="6.2" /><circle cx="8" cy="8" r="2.4" /></>;

// ── Pieces ──────────────────────────────────────────────────────────────────
/** The site's primary button, with a press and an arrow nudge. */
function Cta({ label, locale }: { label: string; locale: string }) {
  return (
    <Button
      asChild
      variant="primary"
      mode="light"
      className="transition-[color,background-color,transform] active:scale-[0.97] motion-reduce:active:scale-100 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px] motion-reduce:hover:[&_svg]:translate-x-0 max-[760px]:w-full"
    >
      <a href={href('book-meeting', locale)}>
        <span>{label}</span>
        <ArrowRight aria-hidden="true" />
      </a>
    </Button>
  );
}

function PillarCard({ visual, title, body, tag, delay }: { visual: ReactNode; title: string; body: string; tag: string; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className="group bg-[#F7F7F7] border border-[#EBEBEB] rounded-2xl p-7 grid row-span-4 grid-rows-subgrid gap-y-4 mb-4 min-h-[300px] grid-cols-[minmax(0,1fr)]"
    >
      <div
        aria-hidden="true"
        className="trust-dots h-[236px] shrink-0 min-w-0 -mx-7 -mt-7 mb-1 rounded-t-[15px] border-b border-[#EBEBEB] relative overflow-hidden flex items-center justify-center p-5"
      >
        {visual}
      </div>
      <h3 className={H3}>{title}</h3>
      <p className={cn(BODY, 'flex-1')}>{body}</p>
      <div className="flex self-end min-w-0"><span className={TAG}>{tag}</span></div>
    </Reveal>
  );
}

function RoleCard({ side, label, text }: { side: 'ours' | 'yours'; label: string; text: string }) {
  const ours = side === 'ours';
  return (
    <div
      className={cn(
        'bg-white border rounded-2xl p-5 flex flex-col gap-3 max-[900px]:p-4 max-[900px]:gap-[10px]',
        ROLE_SHADOW,
        ROLE_FLAT,
        ours
          ? 'border-[#E1E2FF] items-end text-right max-[900px]:items-start max-[900px]:text-left'
          : 'border-[#FDF1EA] items-start',
      )}
    >
      <span
        className={cn(
          'type-body-sm font-medium border px-3 py-[3px] rounded-full',
          ours ? 'text-white bg-[#3133E7] border-[#3133E7]' : 'text-[#EA580C] bg-[#FDF1EA] border-[#F8DDC9]',
        )}
      >
        {label}
      </span>
      <p className="type-body-sm text-[#121212]">{text}</p>
    </div>
  );
}

function PendingBadge({ top, bottom, topSize, bottomSize }: { top: string; bottom: string; topSize: number; bottomSize: number }) {
  return (
    <svg width="88" height="88" viewBox="0 0 77 77" fill="none" aria-hidden="true" className="block">
      <path d={ROSETTE} fill="#e5e7eb" />
      <circle cx="38.5" cy="38.5" r="30" fill="#fff" />
      <circle cx="38.5" cy="38.5" r="27" fill="#F5F5F7" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2.5 2.5" />
      <text x="38.5" y="38" textAnchor="middle" fontFamily="Mona Sans, Geist, sans-serif" fontWeight="700" fontSize={topSize} fill="#888888">{top}</text>
      <text x="38.5" y="50" textAnchor="middle" fontFamily="Mona Sans, Geist, sans-serif" fontWeight="600" fontSize={bottomSize} letterSpacing="0.6" fill="#a9a9a9">{bottom}</text>
    </svg>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────
// Structure only; the words are in the catalogue under `trust`.
const CERTS: { id: string; img?: string; year?: string; badge?: 'soc' | 'iso' }[] = [
  { id: 'iso27001', img: '/trust/cert-iso-27001.svg', year: '2022' },
  { id: 'iso27017', img: '/trust/cert-iso-27017.svg', year: '2015' },
  { id: 'iso27018', img: '/trust/cert-iso-27018.svg', year: '2025' },
  { id: 'iso9001', img: '/trust/cert-iso-9001.svg', year: '2015' },
  { id: 'csa', img: '/trust/cert-csa-star.svg' },
  { id: 'soc2', badge: 'soc' },
  { id: 'iso42001', badge: 'iso' },
];

// ── Page ────────────────────────────────────────────────────────────────────
export default async function TrustPage() {
  const locale = await getLocale();
  const t = await getTranslations('trust');
  const cta = t('cta');

  const prohibited = t.raw('ai.prohibited') as string[];
  const extras = t.raw('security.extras') as string[];
  const docs = t.raw('roles.docs') as string[];
  const packNow = t.raw('pack.now.items') as string[];
  const packRequest = t.raw('pack.request.items') as string[];
  const chips = t.raw('certs.chips') as string[];
  const faq = t.raw('faq.items') as { q: string; a: string }[];

  return (
    <>
      <Navbar />
      <main className="trust-page section-light text-[#121212] [line-height:normal]">
        {/* ── Hero ── */}
        <section className="max-w-[1184px] mx-auto px-8 pt-[168px] pb-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-14 items-stretch max-[760px]:px-5 max-[760px]:pt-[120px] max-[760px]:pb-10 max-[760px]:gap-10">
          <Reveal className="flex flex-col justify-center gap-8">
            <HeroCopy>
              <h1 className="font-semibold text-[48px] md:text-[58px] text-[#121212]" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {t('hero.title')}
              </h1>
              <p className="type-body-lg hero-subtitle mt-7 text-[#4B4B4B]">{t('hero.subtitle')}</p>
            </HeroCopy>
            <div className="flex gap-3 flex-wrap max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
          </Reveal>

          <Reveal
            delay={0.15}
            className="relative rounded-3xl bg-[#F7F7F7] px-7 py-8 flex items-center justify-center overflow-hidden max-[760px]:px-4 max-[760px]:py-5"
          >
            <div className="absolute left-1/2 top-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,77,247,0.14),rgba(75,77,247,0.06)_40%,rgba(75,77,247,0)_70%)]" />
            <DealDiagram />
          </Reveal>
        </section>

        {/* ── Pillar 1: responsible AI ── */}
        <section id="responsible-ai" className="bg-white pt-[136px] pb-[120px] scroll-mt-[80px] max-[760px]:py-[72px]">
          <div className={cn(CONTAINER, 'flex flex-col gap-12')}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-16 gap-y-6 items-start">
              <Reveal as="h2" className={H2}>{t('ai.title')}</Reveal>
              <Reveal as="p" delay={0.1} className={cn(BODY, 'max-w-[480px]')}>{t('ai.body')}</Reveal>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-4">
              <PillarCard delay={0} visual={<AuditLogMock />} title={t('ai.cards.human.title')} body={t('ai.cards.human.body')} tag={t('ai.cards.human.tag')} />
              <PillarCard delay={0.1} visual={<ScoreMock />} title={t('ai.cards.explained.title')} body={t('ai.cards.explained.body')} tag={t('ai.cards.explained.tag')} />
              <PillarCard delay={0.2} visual={<DeclarationMock />} title={t('ai.cards.classified.title')} body={t('ai.cards.classified.body')} tag={t('ai.cards.classified.tag')} />
            </div>

            <div className="flex items-center justify-between gap-x-3 gap-y-5 flex-wrap">
              <div className="flex gap-2 flex-wrap">
                {prohibited.map((item) => (
                  <span key={item} className="flex items-center gap-2 type-caption text-[#121212] bg-[#f1f5f9] border border-[#e5e7eb] px-3 py-1.5 rounded-full">
                    <Stroke>{NO}</Stroke>
                    {item}
                  </span>
                ))}
              </div>
              <span className="type-caption text-[#121212]/60 whitespace-nowrap">{t('ai.prohibitedRef')}</span>
            </div>
            <div className="flex justify-start max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
          </div>
        </section>

        {/* ── Pillar 2: data ── */}
        <section id="data" className="bg-white pt-[136px] pb-[128px] scroll-mt-[80px] max-[760px]:py-[72px]">
          <div className={cn(CONTAINER, 'flex flex-col gap-14')}>
            <div className="flex flex-col items-center text-center gap-4 max-[760px]:items-start max-[760px]:text-left">
              <Reveal as="h2" className={cn(H2, 'mx-auto max-[760px]:mx-0')}>{t('data.title')}</Reveal>
              <Reveal as="p" delay={0.1} className={cn(BODY, 'max-w-[560px]')}>{t('data.body')}</Reveal>
            </div>

            <div className="w-full flex flex-col gap-12">
              <Reveal><PseudonymMock /></Reveal>

              <div className="grid grid-cols-4 gap-x-7 gap-y-8 max-[900px]:grid-cols-2 max-[760px]:grid-cols-1">
                {([
                  ['processor', <Stroke key="i" size={18}>{DOC}</Stroke>],
                  ['eu', <img key="i" src="/trust/icon-europe.svg" alt="" loading="lazy" decoding="async" className="w-[19px] h-[19px] shrink-0 block" />],
                  ['training', <Stroke key="i" size={18}>{CHIP_ICON}</Stroke>],
                  ['identifiers', <Stroke key="i" size={18}>{LOCK}</Stroke>],
                ] as const).map(([id, icon], i) => (
                  <Reveal key={id} delay={i * 0.1} className="flex flex-col items-start gap-4 min-w-0">
                    <span className={ICON_TILE}>{icon}</span>
                    <div className="flex-1 w-full min-w-0 flex flex-col gap-2 items-start">
                      <h3 className={H3}>{t(`data.items.${id}.title`)}</h3>
                      <p className={BODY}>{t(`data.items.${id}.body`)}</p>
                      <div className="flex min-w-0 mt-1"><span className={cn(TAG, 'whitespace-nowrap')}>{t(`data.items.${id}.tag`)}</span></div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal className="-mt-2 bg-[#F7F7F7] border border-[#EBEBEB] rounded-2xl px-7 py-5 flex items-center gap-x-5 gap-y-4 flex-wrap">
              <span className={ICON_TILE}><Stroke size={18}>{DOC}</Stroke></span>
              <div className="flex-[1_1_320px] min-w-0 flex flex-col gap-1">
                <h3 className={H3}>{t('data.templates.title')}</h3>
                <p className={BODY}>{t('data.templates.body')}</p>
              </div>
              <span className={cn(TAG, 'whitespace-nowrap')}>{t('data.templates.tag')}</span>
            </Reveal>
            <div className="flex justify-center max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
          </div>
        </section>

        {/* ── Pillar 3: security ── */}
        <section id="security" className="bg-white pt-[136px] pb-[128px] scroll-mt-[80px] max-[760px]:py-[72px]">
          <div className={cn(CONTAINER, 'flex flex-col gap-12')}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-16 gap-y-6 items-start">
              <Reveal as="h2" className={H2}>{t('security.title')}</Reveal>
              <Reveal as="p" delay={0.1} className={cn(BODY, 'max-w-[480px]')}>{t('security.body')}</Reveal>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
              <Reveal className="trust-cq bg-[#4B4DF7] border border-[#4B4DF7] rounded-[20px] p-7 text-white flex flex-col gap-5 min-h-[380px]">
                <span className="w-[34px] h-[34px] rounded-[8px] bg-[#3133E7] border border-white/[0.18] flex items-center justify-center shrink-0">
                  <Stroke color="#fff">{SHIELD}</Stroke>
                </span>
                <h3 className="mt-2 font-medium text-[24px] leading-[1.33] tracking-[-0.02em] text-white">{t('security.isms.title')}</h3>
                <p className="type-body text-white/85 max-w-[440px]">{t('security.isms.body')}</p>
                <div aria-hidden="true" className="flex-1 flex items-center justify-center gap-[clamp(8px,1.4vw,18px)] py-5">
                  {['27001', '27017', '27018'].map((n) => (
                    <img key={n} src={`/trust/badge-iso-${n}.svg`} alt="" loading="lazy" decoding="async" className="w-[clamp(72px,7vw,92px)] h-auto block shrink-0" />
                  ))}
                </div>
                <div className="trust-cert-strip mt-auto flex flex-wrap gap-px bg-[#EBEBEB] border border-white rounded-xl overflow-hidden">
                  {([
                    ['certificate', 'certificateId'],
                    ['issued', 'issuedOn'],
                    ['validTo', 'validUntil'],
                  ] as const).map(([label, value]) => (
                    <div key={label} className="bg-white px-4 py-[14px] flex flex-col gap-1 flex-[1_1_120px]">
                      <span className="type-eyebrow text-[#121212]/60 whitespace-nowrap">{t(`security.isms.${label}`)}</span>
                      <span className="type-body-sm font-semibold whitespace-nowrap text-[#121212]">{t(`security.isms.${value}`)}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="flex flex-col gap-4">
                {([
                  ['encryption', LOCK],
                  ['monitoring', EYE],
                  ['pentest', TARGET],
                ] as const).map(([id, icon], i) => (
                  <Reveal key={id} delay={0.1 + i * 0.1} className="bg-[#F7F7F7] border border-[#EBEBEB] rounded-[20px] p-[22px] flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-[14px]">
                      <span className="w-9 h-9 rounded-[8px] bg-[#F1F2FF] border border-[#D9DAFF] flex items-center justify-center shrink-0">
                        <Stroke>{icon}</Stroke>
                      </span>
                      <h3 className={H3}>{t(`security.cards.${id}.title`)}</h3>
                    </div>
                    <p className={BODY}>{t(`security.cards.${id}.body`)}</p>
                    <div className="flex min-w-0"><span className={TAG}>{t(`security.cards.${id}.tag`)}</span></div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-[10px]">
              {extras.map((item) => (
                <span key={item} className={cn(CHIP, 'py-[7px] pl-[10px] pr-[14px]')}>
                  <Stroke>{CHECK}</Stroke>
                  <span>{item}</span>
                </span>
              ))}
            </div>
            <div className="flex justify-start max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
          </div>
        </section>

        {/* ── Who does what ── */}
        <section className="bg-[#F7F7F7] pt-[136px] pb-[128px] max-[760px]:py-[72px]">
          <div className={cn(CONTAINER, 'flex flex-col gap-14')}>
            <div className="flex flex-col items-center text-center gap-4">
              <Reveal as="h2" className={cn(H2, 'mx-auto')}>{t('roles.title')}</Reveal>
              <Reveal as="p" delay={0.1} className={cn(BODY, 'max-w-[440px]')}>{t('roles.body')}</Reveal>
            </div>

            <div className="relative flex flex-col gap-4 w-full max-w-[1120px] mx-auto">
              <div className="trust-dash-y absolute left-1/2 top-[30px] bottom-0 w-[1.5px] max-[900px]:hidden" />

              <div className="relative grid grid-cols-[minmax(0,1fr)_clamp(150px,22vw,300px)_minmax(0,1fr)] items-center pb-2 max-[900px]:grid-cols-[1fr_1fr] max-[900px]:gap-2">
                <div className={cn('justify-self-end bg-white border border-[#E1E2FF] rounded-[14px] px-4 py-3 flex items-center gap-3 max-[900px]:justify-self-stretch', ROLE_SHADOW, ROLE_FLAT)}>
                  <div className="w-9 h-9 rounded-[10px] bg-[#F7F7F7] border border-[#EBEBEB] flex items-center justify-center">
                    <img src="/trust/logomark-gradient.svg" alt="" loading="lazy" decoding="async" className="h-[19px] block" />
                  </div>
                  <div>
                    <div className="font-display text-[18px] font-medium leading-[1.4] tracking-[-0.01em]">Skillvue</div>
                    <div className="type-eyebrow text-[#121212]/60">{t('roles.vendorLabel')}</div>
                  </div>
                </div>
                <div className="flex justify-center max-[900px]:hidden">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8587FF] shadow-[0_0_0_6px_#F7F7F7]" />
                </div>
                <div className={cn('justify-self-start bg-white border border-[#FDF1EA] rounded-[14px] px-4 py-3 flex items-center gap-3 max-[900px]:justify-self-stretch', ROLE_SHADOW, ROLE_FLAT)}>
                  <div className="w-9 h-9 rounded-[10px] bg-[#FDF1EA] border border-[#F8DDC9] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <circle cx="9" cy="6" r="3" stroke="#EA580C" strokeWidth="1.5" />
                      <path d="M3 16c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-[18px] font-medium leading-[1.4] tracking-[-0.01em]">{t('roles.customer')}</div>
                    <div className="type-eyebrow text-[#121212]/60">{t('roles.customerLabel')}</div>
                  </div>
                </div>
              </div>

              {([
                ['aiAct', DOC],
                ['gdpr', SHIELD],
              ] as const).map(([id, icon], i) => (
                <Reveal
                  key={id}
                  delay={i * 0.1}
                  className="grid grid-cols-[minmax(0,1fr)_clamp(150px,22vw,300px)_minmax(0,1fr)] items-stretch max-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-[900px]:gap-[10px] max-[900px]:pt-2"
                >
                  <RoleCard side="ours" label={t(`roles.rows.${id}.ours`)} text={t(`roles.rows.${id}.oursText`)} />
                  <div className="relative flex items-center px-2 max-[900px]:order-first max-[900px]:col-span-full max-[900px]:justify-start max-[900px]:p-0">
                    <span className="trust-dash-x flex-1 min-w-2 h-[1.5px] max-[900px]:hidden" />
                    <span className="w-1.5 max-[900px]:hidden" />
                    <span className={cn('relative type-eyebrow font-semibold text-[#121212] bg-white border border-[#EBEBEB] px-3 py-[7px] rounded-full whitespace-nowrap flex items-center gap-2 max-[760px]:shadow-none', PILL_SHADOW)}>
                      <Stroke size={14}>{icon}</Stroke>
                      {t(`roles.rows.${id}.law`)}
                    </span>
                    <span className="w-1.5 max-[900px]:hidden" />
                    <span className="trust-dash-x-rev flex-1 min-w-2 h-[1.5px] max-[900px]:hidden" />
                  </div>
                  <RoleCard side="yours" label={t(`roles.rows.${id}.yours`)} text={t(`roles.rows.${id}.yoursText`)} />
                </Reveal>
              ))}

              <div className="relative z-[1] bg-[#F7F7F7] flex flex-col items-center">
                <div className="trust-dash-y w-[1.5px] h-3" />
                <span className={cn('relative type-eyebrow text-[#4B4DF7] bg-white border border-[#EBEBEB] px-3 py-1.5 rounded-full whitespace-nowrap', PILL_SHADOW)}>{t('roles.give')}</span>
                <div className="trust-dash-y w-[1.5px] h-6" />
                <SplitLines className="relative w-full max-w-[1000px] h-11 max-[760px]:hidden" />
                <div className="relative grid grid-flow-col auto-cols-fr gap-3 w-max max-w-full max-[760px]:grid-cols-2 max-[760px]:grid-flow-row max-[760px]:w-full max-[760px]:mt-4">
                  {docs.map((doc) => (
                    <span
                      key={doc}
                      className={cn(
                        'whitespace-nowrap type-body-sm font-medium text-[#121212] bg-white border border-[#EBEBEB] px-[18px] py-4 rounded-xl flex items-center justify-start text-left gap-2 min-w-0 max-[1080px]:whitespace-normal max-[1080px]:px-[14px] max-[760px]:p-3',
                        ROLE_SHADOW,
                        ROLE_FLAT,
                      )}
                    >
                      <Stroke size={14}>{DOC}</Stroke>
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
          </div>
        </section>

        {/* ── Trust Pack ── */}
        <section id="trust-pack" className="bg-[#F7F7F7] py-[136px] scroll-mt-[80px] max-[760px]:py-[72px]">
          <div className={CONTAINER}>
            <Reveal className="bg-white border border-[#EBEBEB] rounded-3xl p-[clamp(28px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-14 items-center max-[760px]:px-4 max-[760px]:py-5 max-[760px]:gap-8">
              <div className="flex flex-col gap-6">
                <h2 className={H2}>{t('pack.title')}</h2>
                <p className={cn(BODY, 'max-w-[460px]')}>{t('pack.body')}</p>
                <div aria-hidden="true" className="trust-mask-70 relative mt-4 max-w-[420px] pt-[52px]">
                  <div className="absolute left-5 right-5 top-0 h-20 bg-[#F5F5F7] border border-[#EBEBEB] rounded-t-[20px]" />
                  <div className="absolute left-[10px] right-[10px] top-6 h-20 bg-[#F7F7F7] border border-[#EBEBEB] rounded-t-[20px]" />
                  <div className="relative bg-white border border-[#EBEBEB] rounded-t-[20px] px-5 pt-[22px] pb-20 flex flex-col gap-3">
                    <div className="flex justify-between items-center gap-3">
                      <span className="type-eyebrow text-[#4B4DF7]">{t('pack.preview.label')}</span>
                      <span className="type-caption text-[#121212]/60">{t('pack.preview.format')}</span>
                    </div>
                    <div className="font-display text-[18px] font-medium leading-[1.4] tracking-[-0.01em] mb-1">{t('pack.preview.title')}</div>
                    <div className="h-1.5 rounded-[3px] bg-[#f1f5f9] w-[72%]" />
                    <div className="h-1.5 rounded-[3px] bg-[#f1f5f9] w-[56%]" />
                    <div className="h-1.5 rounded-[3px] bg-[#f1f5f9] w-[64%]" />
                  </div>
                </div>
                <div className="flex max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-[#F7F7F7] rounded-2xl p-7 flex flex-col gap-4 max-[760px]:p-[18px] max-[760px]:gap-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <Stroke size={18} color="#059669">{CHECK}</Stroke>
                    <span className="font-display text-[18px] font-medium leading-[1.4]">{t('pack.now.title')}</span>
                  </div>
                  <div className="flex flex-col">
                    {packNow.map((item) => (
                      <div key={item} className="py-3 border-t border-[#EBEBEB] flex items-center gap-3 type-body-sm text-[#121212]">
                        <Stroke>{DOC}</Stroke>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-dashed border-[#121212]/25 rounded-2xl p-7 flex flex-col gap-4 max-[760px]:p-[18px] max-[760px]:gap-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <Stroke size={18} color="#888888">{LOCK}</Stroke>
                    <span className="font-display text-[18px] font-medium leading-[1.4]">{t('pack.request.title')}</span>
                  </div>
                  <div className="flex flex-col">
                    {packRequest.map((item) => (
                      <div key={item} className="py-3 border-t border-[#EBEBEB] flex items-center gap-3 type-body-sm text-[#4B4B4B]">
                        <Stroke color="#a9a9a9">{LOCK}</Stroke>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Certifications ── */}
        <section className="max-w-[1184px] mx-auto px-8 pt-[136px] flex flex-col gap-5 items-center max-[760px]:py-[72px]">
          <Reveal as="h2" className={cn(H2, 'mx-auto mb-5 text-center')}>{t('certs.title')}</Reveal>
          <div className="w-full border border-[#EBEBEB] rounded-[14px] overflow-hidden bg-white">
            <div className="w-[calc(100%+1px)] -mb-px grid grid-cols-7 bg-white max-[1080px]:grid-cols-4 max-[760px]:grid-cols-1">
              {CERTS.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white shadow-[inset_-1px_-1px_0_#EBEBEB] min-h-[208px] flex flex-col items-center justify-start gap-1 px-3 pt-7 pb-6 text-center max-[760px]:min-h-0 max-[760px]:px-4 max-[760px]:py-7"
                >
                  {cert.img ? (
                    <img src={cert.img} alt="" loading="lazy" decoding="async" className="w-[88px] h-[88px] object-contain block" />
                  ) : cert.badge === 'soc' ? (
                    <PendingBadge top={t('certs.badge.soc')} bottom={t('certs.badge.type')} topSize={15} bottomSize={8} />
                  ) : (
                    <PendingBadge top={t('certs.badge.iso')} bottom="42001" topSize={11.5} bottomSize={10} />
                  )}
                  <div className="font-display font-semibold text-[14px] mt-2 whitespace-nowrap">{t(`certs.items.${cert.id}.name`)}</div>
                  <div className="type-body-sm text-[#4B4B4B] text-balance">{t(`certs.items.${cert.id}.desc`)}</div>
                  {cert.year && <div className="type-caption text-[#121212]/60 whitespace-nowrap">{cert.year}</div>}
                  {cert.badge && (
                    <span className="mt-1 type-caption font-medium text-[#EA580C] bg-[#FDF3EC] border border-[#FDF1EA] px-2 py-px rounded-full whitespace-nowrap">
                      {t('certs.inProgress')}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap justify-center mt-6 max-[760px]:px-5">
            {chips.map((chip, i) => (
              <span key={chip} className={cn(CHIP, 'whitespace-nowrap')}>
                {i === 0 && <Stroke size={14}>{DOC}</Stroke>}
                {i === 1 && <Stroke size={14}>{SHIELD}</Stroke>}
                {i === 2 && <img src="/trust/icon-europe.svg" alt="" loading="lazy" decoding="async" className="w-[14px] h-[14px] shrink-0 block" />}
                {chip}
              </span>
            ))}
          </div>
          <div className="flex justify-center mt-6 max-[760px]:px-5 max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white pt-[136px] pb-[120px] max-[760px]:py-[72px]">
          <div className={cn(CONTAINER, 'flex flex-wrap gap-x-16 gap-y-10 items-start')}>
            <Reveal as="h2" className={cn(H2, 'flex-[1_1_260px]')}>{t('faq.title')}</Reveal>
            <TrustFaq items={faq}>
              <div className="flex justify-start mt-6 max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
            </TrustFaq>
          </div>
        </section>
      </main>

      {/* ── Closing: the site's shared banner, on the dark band every page closes on ── */}
      <div className="section-dark">
        <ClosingBanner heading={t('closing.title')} body={t('closing.body')} cta={cta} />
      </div>
      <Footer />
    </>
  );
}
