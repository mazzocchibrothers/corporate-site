// /trust — how Skillvue's AI, data handling and security hold up to review by
// HR, Legal, IT, Procurement and the DPO.
//
// A server component, built from the page's design canvas section by section.
// What moves is either CSS (the looping connectors, the audit log, the hero's
// entrance, the card hover — `.trust-*` in styles/globals.css) or one of the
// client islands in components/trust/: the measured connector lines, the FAQ
// accordion and the staggered scroll reveal (`data-trust-reveal`).
//
// The design's breakpoints are max-width 1080 / 900 / 760px rather than the
// site's min-width ones, so its responsive rules are `max-[Npx]:` variants.

import type { CSSProperties, ReactNode } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { href } from '@/i18n/routes';
import { DealLines } from '@/components/trust/DealLines';
import { SplitLines } from '@/components/trust/SplitLines';
import { TrustFaq } from '@/components/trust/TrustFaq';
import { TrustReveal } from '@/components/trust/TrustReveal';
import { ROSETTE } from '@/components/trust/rosette';

// ── Shared styles ───────────────────────────────────────────────────────────
const CONTAINER = 'max-w-[1184px] mx-auto px-8 max-[760px]:px-5';
const H2 = 'font-semibold text-[clamp(36px,4vw,48px)] leading-none tracking-[-0.03em]';
const H3 = 'font-medium text-[20px] leading-[1.25] tracking-[-0.02em]';
const BODY = 'type-body text-[#4B4B4B]';
const SMALL = 'text-[15px] leading-[1.5] text-[#4B4B4B]';
const TAG = 'type-caption text-[#4B4B4B] bg-[#EDEDF1] border border-[#E3E3EA] px-[10px] py-1 rounded-xl max-w-full';
const ICON_TILE = 'w-10 h-10 rounded-[10px] bg-[#F7F7F7] border border-[#ECECF1] flex items-center justify-center shrink-0';
const MOCK = 'w-full h-[196px] bg-white border border-[#ECECF1] shadow-[0_1px_2px_rgba(16,24,40,.04),0_8px_20px_rgba(16,24,40,.06)] px-[14px] py-3 flex flex-col justify-center';
const MOCK_LABEL = 'text-[10px] font-semibold leading-none tracking-[0.08em] uppercase text-[#6E6E6E]';
const MONO = '[font-family:ui-monospace,SFMono-Regular,Menlo,monospace]';
const CARD_SHADOW = 'shadow-[0_1px_2px_rgba(16,24,40,.04),0_6px_16px_rgba(16,24,40,.05)]';
const ROLE_SHADOW = 'shadow-[0_1px_2px_rgba(16,24,40,.04),0_6px_16px_rgba(16,24,40,.04)]';
const PILL_SHADOW = 'shadow-[0_2px_6px_rgba(16,24,40,.06)]';
// Below 760px the "Who does what" cards lose their shadow and tighten their corners.
const ROLE_FLAT = 'max-[760px]:shadow-none max-[760px]:rounded-[10px]';

/** The hero's entrance: delay, then how far it rises and from what scale. */
const intro = (delay: number, dur = 0.7, rise = 14, scale = 1) =>
  ({
    '--trust-delay': `${delay}s`,
    '--trust-dur': `${dur}s`,
    '--trust-rise': `${rise}px`,
    '--trust-scale': scale,
  }) as CSSProperties;

// ── Icons ───────────────────────────────────────────────────────────────────
function Stroke({ children, size = 16, color = '#6B7DFF', width = 1.4 }: {
  children: ReactNode; size?: number; color?: string; width?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth={width}
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
const CHIP = <><rect x="4" y="4" width="8" height="8" rx="1.5" /><path d="M6 1.8v2M10 1.8v2M6 12.2v2M10 12.2v2M1.8 6h2M1.8 10h2M12.2 6h2M12.2 10h2" /></>;
const EYE = <><path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8s-2.4 4.5-6.5 4.5S1.5 8 1.5 8z" /><circle cx="8" cy="8" r="2" /></>;
const TARGET = <><circle cx="8" cy="8" r="6.2" /><circle cx="8" cy="8" r="2.4" /></>;

const TickBox = ({ size, color = '#fff', width = 1.8 }: { size: number; color?: string; width?: number }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2 5.2l2 2 4-4.4" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ORANGE = '#EA4D0F';
const TEAM_ICONS: Record<string, ReactNode> = {
  hr: (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7" r="2.6" stroke={ORANGE} strokeWidth="1.5" />
      <path d="M2.5 16c0-2.8 2.2-4.4 5-4.4s5 1.6 5 4.4" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="13.8" cy="6.2" r="2.1" stroke={ORANGE} strokeWidth="1.5" />
      <path d="M14.5 10.9c1.9.3 3.2 1.6 3.2 3.6" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  legal: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v12M4.5 14h7M3 4.5h10M3 4.5L1.5 8.5a1.6 1.6 0 003 0L3 4.5zM13 4.5l-1.5 4a1.6 1.6 0 003 0L13 4.5z" stroke={ORANGE} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  it: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.8" y="2.5" width="12.4" height="8.5" rx="1.5" stroke={ORANGE} strokeWidth="1.4" />
      <path d="M5.5 13.8h5M8 11v2.8" stroke={ORANGE} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  dpo: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.8l5 2v4c0 3-2.2 5.2-5 6.4C5.2 13 3 10.8 3 7.8v-4l5-2z" stroke={ORANGE} strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="8" cy="6.6" r="1.6" stroke={ORANGE} strokeWidth="1.3" />
      <path d="M5.6 11c.4-1.3 1.3-2 2.4-2s2 .7 2.4 2" stroke={ORANGE} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  procurement: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3" y="2" width="10" height="12.4" rx="1.6" stroke={ORANGE} strokeWidth="1.4" />
      <path d="M6 1.6h4v1.8H6z" stroke={ORANGE} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.6 8.2l1.6 1.6 3.2-3.4" stroke={ORANGE} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// ── Pieces ──────────────────────────────────────────────────────────────────
/** The site's primary button, with the design's press and arrow nudge. */
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

function TeamCard({ area, id, name, desc, delay, className }: {
  area: string; id: string; name: string; desc: string; delay: number; className?: string;
}) {
  return (
    <div
      data-dn
      style={intro(delay, 0.5, 8)}
      className={cn(
        'trust-intro relative z-[1] bg-white border border-[#ECECF1] rounded-xl p-3 flex flex-col gap-2 min-w-0 max-[760px]:!w-full',
        CARD_SHADOW,
        area,
        className,
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-[26px] h-[26px] rounded-[7px] bg-[#FFEBD9] border border-[#FFD0A6] flex items-center justify-center shrink-0">
          {TEAM_ICONS[id]}
        </div>
        <div className="text-[14px] font-semibold leading-[1.3] whitespace-nowrap">{name}</div>
      </div>
      <div className="text-[12px] leading-[1.35] text-[#6E6E6E] [text-wrap:pretty]">{desc}</div>
    </div>
  );
}

function PillarCard({ visual, title, body, tag }: { visual: ReactNode; title: string; body: string; tag: string }) {
  return (
    <div
      data-trust-reveal
      className="group bg-[#F7F7F7] border border-[#ECECF1] rounded-2xl p-7 grid row-span-4 grid-rows-subgrid gap-y-4 mb-4 min-h-[300px] grid-cols-[minmax(0,1fr)]"
    >
      <div
        aria-hidden="true"
        className="trust-dots h-[236px] shrink-0 min-w-0 -mx-7 -mt-7 mb-1 rounded-t-[15px] border-b border-[#ECECF1] relative overflow-hidden flex items-center justify-center p-5"
      >
        {visual}
      </div>
      <h3 className={H3}>{title}</h3>
      <p className={cn(BODY, 'flex-1')}>{body}</p>
      <div className="flex self-end min-w-0"><span className={TAG}>{tag}</span></div>
    </div>
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
          ? 'border-[#E5E5FE] items-end text-right max-[900px]:items-start max-[900px]:text-left'
          : 'border-[#FFEBD9] items-start',
      )}
    >
      <span
        className={cn(
          'text-[13px] font-medium border px-3 py-[3px] rounded-full',
          ours ? 'text-white bg-[#3B3DE6] border-[#E6E6EC]' : 'text-[#F26A2E] bg-[#FFEBD9] border-[#FFD0A6]',
        )}
      >
        {label}
      </span>
      <p className="type-body-sm text-[#1E1E1E]">{text}</p>
    </div>
  );
}

function PendingBadge({ top, bottom, topSize, bottomSize }: { top: string; bottom: string; topSize: number; bottomSize: number }) {
  return (
    <svg width="88" height="88" viewBox="0 0 77 77" fill="none" aria-hidden="true" className="block">
      <path d={ROSETTE} fill="#D9D9DF" />
      <circle cx="38.5" cy="38.5" r="30" fill="#fff" />
      <circle cx="38.5" cy="38.5" r="27" fill="#F4F4F6" stroke="#D9D9DF" strokeWidth="1" strokeDasharray="2.5 2.5" />
      <text x="38.5" y="38" textAnchor="middle" fontFamily="Mona Sans, Geist, sans-serif" fontWeight="700" fontSize={topSize} fill="#8A8A94">{top}</text>
      <text x="38.5" y="50" textAnchor="middle" fontFamily="Mona Sans, Geist, sans-serif" fontWeight="600" fontSize={bottomSize} letterSpacing="0.6" fill="#A4A4AE">{bottom}</text>
    </svg>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────
// Structure only; the words are in the catalogue under `trust`.
const DEAL_BARS = [
  ['hr', '60%'],
  ['legal', '55%'],
  ['it', '70%'],
  ['dpo', '58%'],
  ['procurement', '30%'],
] as const;

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

  const declarationRows = t.raw('ai.declaration.rows') as { label: string; value: string }[];
  const prohibited = t.raw('ai.prohibited') as string[];
  const extras = t.raw('security.extras') as string[];
  const docs = t.raw('roles.docs') as string[];
  const packNow = t.raw('pack.now.items') as string[];
  const packRequest = t.raw('pack.request.items') as string[];
  const chips = t.raw('certs.chips') as string[];
  const faq = t.raw('faq.items') as { q: string; a: string }[];

  const recordRows = [
    { field: t('data.fields.name'), source: t('data.record.sampleName'), token: t('data.model.tokenName') },
    { field: t('data.fields.email'), source: 'candidate@example.com', token: t('data.model.tokenEmail') },
    { field: t('data.fields.phone'), source: '+00 000 000 0000', token: t('data.model.tokenPhone') },
  ];

  const replacedPill = (
    <span className={cn('flex items-center gap-1.5 text-[11px] font-medium leading-none text-[#1E1E1E] bg-white border border-[#ECECF1] px-[10px] py-1.5 rounded-full whitespace-nowrap', PILL_SHADOW)}>
      <Stroke size={12} width={1.5}>{LOCK}</Stroke>
      {t('data.replaced')}
    </span>
  );

  const recordCard = (kind: 'source' | 'model') => (
    <div
      className={cn(
        'flex-[1_1_0] min-w-0 bg-white border rounded-xl px-[14px] pt-3 pb-1.5 max-[900px]:flex-none',
        'shadow-[0_1px_2px_rgba(16,24,40,.04),0_8px_20px_rgba(16,24,40,.06)]',
        kind === 'source' ? 'border-[#ECECF1]' : 'border-[#D4D7FB]',
      )}
    >
      <div className="flex items-center justify-between gap-2 pb-2">
        <span className={MOCK_LABEL}>{kind === 'source' ? t('data.record.label') : t('data.model.label')}</span>
        {kind === 'source' ? (
          <span className="text-[10px] leading-none text-[#A4A4A4]">{t('data.record.source')}</span>
        ) : (
          <span className="flex items-center gap-[5px] text-[10px] leading-none text-[#4B4DF7]">
            <img src="/trust/logomark-gradient.svg" alt="" loading="lazy" decoding="async" className="h-[10px] block" />
            {t('data.model.name')}
          </span>
        )}
      </div>
      {recordRows.map((row) => (
        <div key={row.field} className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-[10px] py-[7px] border-t border-[#F0F0F3]">
          <span className="text-[11px] leading-none text-[#8A8A8A]">{row.field}</span>
          <div className="flex min-w-0">
            {kind === 'source' ? (
              <span className="text-[12px] leading-[1.3] font-medium text-[#1E1E1E] whitespace-nowrap overflow-hidden text-ellipsis min-w-0">{row.source}</span>
            ) : (
              <span className={cn(MONO, 'text-[11px] leading-none font-medium text-[#4B4DF7] bg-[#EEEEFE] border border-[#E3E4FD] px-[7px] py-1 rounded-[6px] whitespace-nowrap')}>{row.token}</span>
            )}
          </div>
        </div>
      ))}
      <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-[10px] py-[7px] border-t border-[#F0F0F3]">
        <span className="text-[11px] leading-[1.4] text-[#8A8A8A]">{t('data.fields.answer')}</span>
        <span className="text-[12px] leading-[1.4] text-[#4B4B4B]">{t('data.answer')}</span>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="trust-page section-light text-[#1E1E1E] [line-height:normal]">
        {/* ── Hero ── */}
        <section className="max-w-[1184px] mx-auto px-8 pt-[168px] pb-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-14 items-stretch max-[760px]:px-5 max-[760px]:pt-[120px] max-[760px]:pb-10 max-[760px]:gap-10">
          <div className="flex flex-col justify-center gap-7">
            <h1 style={intro(0)} className="trust-intro font-semibold text-[clamp(40px,5.2vw,58px)] leading-none tracking-[-0.03em] text-balance">
              {t('hero.title')}
            </h1>
            <p style={intro(0.07)} className="trust-intro type-body-lg text-[#4B4B4B] max-w-[500px]">{t('hero.subtitle')}</p>
            <div style={intro(0.14)} className="trust-intro flex gap-3 flex-wrap max-[760px]:w-full">
              <Cta label={cta} locale={locale} />
            </div>
          </div>

          <div
            style={intro(0.15, 0.8, 16, 0.98)}
            className="trust-intro relative rounded-3xl bg-[#F7F7F7] px-7 py-8 flex items-center justify-center overflow-hidden max-[760px]:px-4 max-[760px]:py-5"
          >
            <div className="absolute left-1/2 top-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(75,77,247,0.14),rgba(75,77,247,0.06)_40%,rgba(75,77,247,0)_70%)]" />
            <div className="relative w-full max-w-[560px] grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] [grid-template-areas:'hr_doc_legal'_'it_doc_dpo'_'proc_proc_proc'] gap-x-7 gap-y-4 items-center max-[760px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-[760px]:[grid-template-areas:'doc_doc'_'hr_legal'_'it_dpo'_'proc_proc'] max-[760px]:gap-3">
              <DealLines />
              <TeamCard area="[grid-area:hr]" id="hr" name={t('deal.teams.hr.name')} desc={t('deal.teams.hr.desc')} delay={0.35} />
              <TeamCard area="[grid-area:legal]" id="legal" name={t('deal.teams.legal.name')} desc={t('deal.teams.legal.desc')} delay={0.41} />

              <div
                data-deal-doc
                style={intro(0.47, 0.5, 8)}
                className="trust-intro [grid-area:doc] relative z-[1] self-stretch bg-white border border-[#ECECF1] rounded-[14px] px-[14px] py-4 flex flex-col gap-3 min-w-0 shadow-[0_12px_32px_rgba(16,24,40,.08)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <img src="/trust/logomark-gradient.svg" alt="" className="h-[14px] block" />
                  <span className="text-[10px] font-medium leading-none tracking-[0.08em] uppercase text-[#6E6E6E]">{t('deal.label')}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-display text-[15px] font-semibold leading-[1.2] tracking-[-0.01em]">{t('deal.title')}</div>
                  <span className="h-1 rounded-[2px] bg-[#F0F0F3] w-[88%]" />
                  <span className="h-1 rounded-[2px] bg-[#F0F0F3] w-[64%]" />
                </div>
                <div className="flex flex-col gap-2 pt-3 border-t border-[#F0F0F3]">
                  {DEAL_BARS.map(([id, bar]) => (
                    <div key={id} className="flex items-center gap-[7px] text-[11px] font-medium leading-none text-[#1E1E1E] min-w-0">
                      <span className="w-[13px] h-[13px] rounded bg-[#4B4DF7] flex items-center justify-center shrink-0"><TickBox size={8} /></span>
                      <span className="whitespace-nowrap">{t(`deal.teams.${id}.name`)}</span>
                      <span className="flex-1 min-w-2 h-1 rounded-[2px] bg-[#F0F0F3] ml-auto" style={{ maxWidth: bar }} />
                    </div>
                  ))}
                </div>
                <span className="mt-auto self-start flex items-center gap-[5px] text-[11px] font-medium leading-none text-[#127A4A] bg-[#E8F6EE] border border-[#C6E9D5] px-2 py-[5px] rounded-full whitespace-nowrap">
                  <TickBox size={10} color="#127A4A" width={1.6} />
                  {t('deal.signedOff')}
                </span>
              </div>

              <TeamCard area="[grid-area:it]" id="it" name={t('deal.teams.it.name')} desc={t('deal.teams.it.desc')} delay={0.53} />
              <TeamCard area="[grid-area:dpo]" id="dpo" name={t('deal.teams.dpo.name')} desc={t('deal.teams.dpo.desc')} delay={0.59} />
              <TeamCard
                area="[grid-area:proc]"
                id="procurement"
                name={t('deal.teams.procurement.name')}
                desc={t('deal.teams.procurement.desc')}
                delay={0.65}
                className="justify-self-center w-[min(100%,220px)]"
              />
            </div>
          </div>
        </section>

        {/* ── Pillar 1: responsible AI ── */}
        <section id="responsible-ai" className="bg-white pt-[136px] pb-[120px] scroll-mt-[80px] max-[760px]:py-[72px]">
          <div className={cn(CONTAINER, 'flex flex-col gap-12')}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-16 gap-y-6 items-start">
              <div className="flex flex-col gap-4">
                <h2 data-trust-reveal className={H2}>{t.rich('ai.title', { br: () => <br /> })}</h2>
              </div>
              <p className={cn(BODY, 'max-w-[480px]')}>{t('ai.body')}</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-4">
              <PillarCard
                title={t('ai.cards.human.title')}
                body={t('ai.cards.human.body')}
                tag={t('ai.cards.human.tag')}
                visual={
                  <div className={cn(MOCK, 'rounded-xl gap-[10px]')}>
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#F0F0F3]">
                      <span className={MOCK_LABEL}>{t('ai.auditLog.label')}</span>
                      <span className={cn(MONO, 'text-[10px] leading-none text-[#8A8A8A]')}>{t('ai.auditLog.candidate')}</span>
                    </div>
                    <div className="relative flex flex-col gap-3 pl-4">
                      <span className="absolute left-[3.25px] top-2 bottom-6 w-[1.5px] bg-[repeating-linear-gradient(180deg,#D4D7FB_0_3px,transparent_3px_6px)]" />
                      <div className="relative flex flex-col gap-[5px]">
                        <span className="absolute -left-4 top-[3px] w-2 h-2 rounded-full bg-white border-2 border-[#A9A9C2]" />
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-[12px] font-semibold leading-[1.2] text-[#1E1E1E]">
                            <img src="/trust/logomark-gradient.svg" alt="" loading="lazy" decoding="async" className="h-[11px] block grayscale opacity-[.55]" />
                            {t('ai.auditLog.generated')}
                          </span>
                          <span className={cn(MONO, 'text-[10px] leading-none text-[#8A8A8A] whitespace-nowrap')}>09:14:02</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] leading-[1.3] text-[#6E6E6E]">
                          Skillvue<span className="text-[#CBCBCB]">·</span>
                          <span className="font-medium text-[#C2481A] bg-[#FFEBD9] border border-[#FFD9B8] px-[7px] py-0.5 rounded-full whitespace-nowrap">{t('ai.auditLog.suggestion')}</span>
                        </div>
                      </div>
                      <div className="relative flex flex-col gap-[5px]">
                        <span className="absolute -left-4 top-[3px] w-2 h-2 rounded-full bg-[#4B4DF7] shadow-[0_0_0_3px_rgba(75,77,247,.15)]" />
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[12px] font-semibold leading-[1.2] text-[#1E1E1E]">{t('ai.auditLog.recorded')}</span>
                          <span className={cn(MONO, 'grid text-[10px] leading-none whitespace-nowrap')}>
                            <span className="trust-log-pending [grid-area:1/1] text-[#A4A4A4]">--:--:--</span>
                            <span className="trust-log-done [grid-area:1/1] text-[#8A8A8A]">11:47:36</span>
                          </span>
                        </div>
                        <div className="text-[11px] leading-[1.3] text-[#6E6E6E]">
                          {t('ai.auditLog.evaluator')}<span className="text-[#CBCBCB]"> · </span>{t('ai.auditLog.role')}
                        </div>
                        <div className="grid">
                          <div className="trust-log-pending [grid-area:1/1] flex items-center gap-2 h-[30px] px-[10px] border border-[#D4D7FB] rounded-[8px] bg-white shadow-[0_0_0_3px_rgba(75,77,247,.08)]">
                            <span className="trust-caret w-[1.5px] h-[14px] bg-[#4B4DF7]" />
                            <span className="flex-1 text-[11px] text-[#A4A4A4]">{t('ai.auditLog.placeholder')}</span>
                            <span className="text-[10px] font-medium leading-none text-[#F26A2E] bg-[#FFF7EE] border border-[#FFEBD9] px-[7px] py-[3px] rounded-full">{t('ai.auditLog.pending')}</span>
                          </div>
                          <div className="trust-log-done [grid-area:1/1] flex items-center gap-2 h-[30px] px-[10px] border border-[#ECECF1] rounded-[8px] bg-white">
                            <span className="flex-1 text-[11px] font-semibold text-[#1E1E1E]">{t('ai.auditLog.decision')}</span>
                            <span className={cn(MONO, 'text-[10px] leading-none text-[#6E6E6E] whitespace-nowrap')}>{t('ai.auditLog.signed')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
              <PillarCard
                title={t('ai.cards.explained.title')}
                body={t('ai.cards.explained.body')}
                tag={t('ai.cards.explained.tag')}
                visual={
                  <div className={cn(MOCK, 'rounded-xl gap-[10px]')}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12px] font-semibold leading-[1.2] text-[#1E1E1E]">{t('ai.score.skill')}</span>
                      <span className="text-[12px] font-semibold leading-none text-[#1E1E1E] whitespace-nowrap">3.8<span className="font-medium text-[#A4A4A4]"> / 5</span></span>
                    </div>
                    <div className="grid grid-cols-5 gap-[3px]">
                      <span className="h-1 rounded-[2px] bg-[#6B7DFF]" />
                      <span className="h-1 rounded-[2px] bg-[#6B7DFF]" />
                      <span className="h-1 rounded-[2px] bg-[#6B7DFF]" />
                      <span className="h-1 rounded-[2px] bg-[linear-gradient(90deg,#6B7DFF_80%,#E3E4FD_80%)]" />
                      <span className="h-1 rounded-[2px] bg-[#E3E4FD]" />
                    </div>
                    <div className="flex flex-col gap-[5px] pt-2 border-t border-[#F0F0F3]">
                      <span className={MOCK_LABEL}>{t('ai.score.justification')}</span>
                      <p className="trust-mask-62 text-[11.5px] leading-[1.45] text-[#4B4B4B] h-[50px] overflow-hidden">{t('ai.score.text')}</p>
                    </div>
                    <div className="flex justify-end">
                      <span className="flex items-center gap-1.5 text-[11px] font-medium leading-none text-[#1E1E1E] bg-white border border-[#CBCBCB] px-[10px] py-[7px] rounded-[8px] whitespace-nowrap">
                        <Stroke size={11} color="#4B4B4B" width={1.5}><path d="M11 2.5l2.5 2.5L6 12.5H3.5V10z" /></Stroke>
                        {t('ai.score.override')}
                      </span>
                    </div>
                  </div>
                }
              />
              <PillarCard
                title={t('ai.cards.classified.title')}
                body={t('ai.cards.classified.body')}
                tag={t('ai.cards.classified.tag')}
                visual={
                  <div
                    className={cn(
                      MOCK,
                      'rounded-[6px] gap-1.5 origin-[50%_55%] transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-rotate-2 group-hover:shadow-[0_2px_4px_rgba(16,24,40,.04),0_14px_30px_rgba(16,24,40,.10)] motion-reduce:transition-none',
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <img src="/trust/wordmark.svg" alt="" loading="lazy" decoding="async" className="h-[9px] w-auto block opacity-80" />
                      <span className={cn(MONO, 'text-[9px] leading-none text-[#A4A4A4]')}>{t('ai.declaration.regulation')}</span>
                    </div>
                    <div className="font-display text-[13px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1E1E1E] my-0.5">{t('ai.declaration.title')}</div>
                    <div className="flex flex-col">
                      {declarationRows.map((row) => (
                        <div key={row.label} className="flex justify-between gap-[10px] py-1 border-t border-[#F0F0F3] text-[10.5px] leading-[1.3]">
                          <span className="text-[#8A8A8A] whitespace-nowrap">{row.label}</span>
                          <span className="text-[#1E1E1E] font-medium text-right whitespace-nowrap">{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-end gap-[10px] mt-0.5">
                      <div className="w-24 flex flex-col gap-0.5">
                        <svg width="80" height="18" viewBox="0 0 110 26" fill="none" aria-hidden="true" className="block">
                          <path d="M3 19c6-9 10-14 13-12s-5 14-1 13 8-15 12-13-2 11 2 11 6-9 10-8 0 7 4 7 7-6 11-6 3 5 7 5 9-3 15-6" stroke="#3B3DE6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="h-px bg-[#CBCBCB]" />
                      </div>
                      <span className="text-[9px] leading-[1.3] text-[#8A8A8A]">{t('ai.declaration.signatory')}</span>
                    </div>
                  </div>
                }
              />
            </div>

            <div className="flex items-center justify-between gap-x-3 gap-y-5 flex-wrap">
              <div className="flex gap-2 flex-wrap">
                {prohibited.map((item) => (
                  <span key={item} className="flex items-center gap-2 type-caption text-[#1E1E1E] bg-[#EDEDF1] border border-[#E3E3EA] px-3 py-1.5 rounded-xl">
                    <Stroke>{NO}</Stroke>
                    {item}
                  </span>
                ))}
              </div>
              <span className="text-[12px] text-[#6E6E6E] whitespace-nowrap">{t('ai.prohibitedRef')}</span>
            </div>
            <div className="flex justify-start max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
          </div>
        </section>

        {/* ── Pillar 2: data ── */}
        <section id="data" className="bg-white pt-[136px] pb-[128px] scroll-mt-[80px] max-[760px]:py-[72px]">
          <div className={cn(CONTAINER, 'flex flex-col gap-14')}>
            <div className="flex flex-col items-center text-center gap-4 max-[760px]:items-start max-[760px]:text-left">
              <h2 data-trust-reveal className={H2}>{t('data.title')}</h2>
              <p data-trust-reveal className={cn(BODY, 'max-w-[560px]')}>{t('data.body')}</p>
            </div>

            <div className="w-full flex flex-col gap-12">
              <div
                data-trust-reveal
                aria-hidden="true"
                className="trust-dots rounded-2xl border border-[#ECECF1] p-[clamp(20px,3vw,40px)] flex flex-row items-center min-w-0 max-[900px]:flex-col max-[900px]:items-stretch"
              >
                {recordCard('source')}
                <div className="flex-none flex items-center px-1 max-[900px]:hidden">
                  <span className="trust-dash-x w-5 h-[1.5px]" />
                  {replacedPill}
                  <span className="trust-dash-x w-4 h-[1.5px]" />
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="block -ml-[3px]">
                    <path d="M1 1l4 4-4 4" stroke="#A9A9C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="hidden flex-col items-center py-0.5 max-[900px]:flex">
                  <span className="trust-dash-y w-[1.5px] h-[14px]" />
                  {replacedPill}
                  <span className="trust-dash-y w-[1.5px] h-[14px]" />
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="block -mt-[3px]">
                    <path d="M1 1l4 4 4-4" stroke="#A9A9C2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {recordCard('model')}
              </div>

              <div className="grid grid-cols-4 gap-x-7 gap-y-8 max-[900px]:grid-cols-2 max-[760px]:grid-cols-1">
                {([
                  ['processor', <Stroke key="i" size={18}>{DOC}</Stroke>],
                  ['eu', <img key="i" src="/trust/icon-europe.svg" alt="" loading="lazy" decoding="async" className="w-[19px] h-[19px] shrink-0 block" />],
                  ['training', <Stroke key="i" size={18}>{CHIP}</Stroke>],
                  ['identifiers', <Stroke key="i" size={18}>{LOCK}</Stroke>],
                ] as const).map(([id, icon]) => (
                  <div key={id} data-trust-reveal className="flex flex-col items-start gap-4 min-w-0">
                    <span className={ICON_TILE}>{icon}</span>
                    <div className="flex-1 w-full min-w-0 flex flex-col gap-2 items-start">
                      <h3 className={H3}>{t(`data.items.${id}.title`)}</h3>
                      <p className={SMALL}>{t(`data.items.${id}.body`)}</p>
                      <div className="flex min-w-0 mt-1"><span className={cn(TAG, 'whitespace-nowrap')}>{t(`data.items.${id}.tag`)}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-trust-reveal className="-mt-2 bg-[#F7F7F7] border border-[#ECECF1] rounded-2xl px-7 py-5 flex items-center gap-x-5 gap-y-4 flex-wrap">
              <span className={ICON_TILE}><Stroke size={18}>{DOC}</Stroke></span>
              <div className="flex-[1_1_320px] min-w-0 flex flex-col gap-1">
                <h3 className={H3}>{t('data.templates.title')}</h3>
                <p className={SMALL}>{t('data.templates.body')}</p>
              </div>
              <span className={cn(TAG, 'whitespace-nowrap')}>{t('data.templates.tag')}</span>
            </div>
            <div className="flex justify-center max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
          </div>
        </section>

        {/* ── Pillar 3: security ── */}
        <section id="security" className="bg-white pt-[136px] pb-[128px] scroll-mt-[80px] max-[760px]:py-[72px]">
          <div className={cn(CONTAINER, 'flex flex-col gap-12')}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-16 gap-y-6 items-start">
              <div className="flex flex-col gap-4">
                <h2 data-trust-reveal className={H2}>{t('security.title')}</h2>
              </div>
              <p className={cn(BODY, 'max-w-[480px]')}>{t('security.body')}</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
              <div data-trust-reveal className="trust-cq bg-[#4B4DF7] border border-[#4B4DF7] rounded-[20px] p-7 text-white flex flex-col gap-5 min-h-[380px]">
                <span className="w-[34px] h-[34px] rounded-[8px] bg-[#322ABD] border border-white/[0.18] flex items-center justify-center shrink-0">
                  <Stroke color="#fff">{SHIELD}</Stroke>
                </span>
                <h3 className="mt-2 font-medium text-[24px] leading-[1.33] tracking-[-0.03em] text-white">{t('security.isms.title')}</h3>
                <p className="type-body text-[#E5E5FE] max-w-[440px]">{t('security.isms.body')}</p>
                <div aria-hidden="true" className="flex-1 flex items-center justify-center gap-[clamp(8px,1.4vw,18px)] py-5">
                  {['27001', '27017', '27018'].map((n) => (
                    <img key={n} src={`/trust/badge-iso-${n}.svg`} alt="" loading="lazy" decoding="async" className="w-[clamp(72px,7vw,92px)] h-auto block shrink-0" />
                  ))}
                </div>
                <div className="trust-cert-strip mt-auto flex flex-wrap gap-px bg-[#ECECF1] border border-white rounded-xl overflow-hidden">
                  {([
                    ['certificate', 'certificateId'],
                    ['issued', 'issuedOn'],
                    ['validTo', 'validUntil'],
                  ] as const).map(([label, value]) => (
                    <div key={label} className="bg-white px-4 py-[14px] flex flex-col gap-1 flex-[1_1_120px]">
                      <span className="type-eyebrow text-[#6E6E6E] whitespace-nowrap">{t(`security.isms.${label}`)}</span>
                      <span className="text-[14px] font-semibold whitespace-nowrap text-[#1E1E1E]">{t(`security.isms.${value}`)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {([
                  ['encryption', LOCK],
                  ['monitoring', EYE],
                  ['pentest', TARGET],
                ] as const).map(([id, icon]) => (
                  <div key={id} data-trust-reveal className="bg-[#F7F7F7] border border-[#ECECF1] rounded-[20px] p-[22px] flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-[14px]">
                      <span className="w-9 h-9 rounded-[8px] bg-[#ECEDFE] border border-[#D4D7FB] flex items-center justify-center shrink-0">
                        <Stroke>{icon}</Stroke>
                      </span>
                      <h3 className={H3}>{t(`security.cards.${id}.title`)}</h3>
                    </div>
                    <p className={BODY}>{t(`security.cards.${id}.body`)}</p>
                    <div className="flex min-w-0"><span className={TAG}>{t(`security.cards.${id}.tag`)}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-[10px] text-[13px] leading-[1.43] text-[#1E1E1E]">
              {extras.map((item) => (
                <span key={item} className="flex items-center gap-2 bg-[#F3F4F5] border border-[#EBEBEB] py-[7px] pl-[10px] pr-[14px] rounded-full">
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
              <h2 data-trust-reveal className={H2}>{t('roles.title')}</h2>
              <p data-trust-reveal className={cn(BODY, 'max-w-[440px]')}>{t('roles.body')}</p>
            </div>

            <div className="relative flex flex-col gap-4 w-full max-w-[1120px] mx-auto">
              <div className="trust-dash-y absolute left-1/2 top-[30px] bottom-0 w-[1.5px] max-[900px]:hidden" />

              <div className="relative grid grid-cols-[minmax(0,1fr)_clamp(150px,22vw,300px)_minmax(0,1fr)] items-center pb-2 max-[900px]:grid-cols-[1fr_1fr] max-[900px]:gap-2">
                <div className={cn('justify-self-end bg-white border border-[#E5E5FE] rounded-[14px] px-4 py-3 flex items-center gap-3 max-[900px]:justify-self-stretch', ROLE_SHADOW, ROLE_FLAT)}>
                  <div className="w-9 h-9 rounded-[10px] bg-[#F7F7F7] border border-[#ECECF1] flex items-center justify-center">
                    <img src="/trust/logomark-gradient.svg" alt="" loading="lazy" decoding="async" className="h-[19px] block" />
                  </div>
                  <div>
                    <div className="font-display text-[18px] font-medium leading-[1.4] tracking-[-0.01em]">Skillvue</div>
                    <div className="text-[10px] font-medium leading-[1.4] tracking-[0.08em] uppercase text-[#6E6E6E]">{t('roles.vendorLabel')}</div>
                  </div>
                </div>
                <div className="flex justify-center max-[900px]:hidden">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8C9FFF] shadow-[0_0_0_6px_#F3F4F5]" />
                </div>
                <div className={cn('justify-self-start bg-white border border-[#FFEBD9] rounded-[14px] px-4 py-3 flex items-center gap-3 max-[900px]:justify-self-stretch', ROLE_SHADOW, ROLE_FLAT)}>
                  <div className="w-9 h-9 rounded-[10px] bg-[#FFEBD9] border border-[#FFD0A6] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <circle cx="9" cy="6" r="3" stroke={ORANGE} strokeWidth="1.5" />
                      <path d="M3 16c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-[18px] font-medium leading-[1.4] tracking-[-0.01em]">{t('roles.customer')}</div>
                    <div className="text-[10px] font-medium leading-[1.4] tracking-[0.08em] uppercase text-[#6E6E6E]">{t('roles.customerLabel')}</div>
                  </div>
                </div>
              </div>

              {([
                ['aiAct', DOC],
                ['gdpr', SHIELD],
              ] as const).map(([id, icon]) => (
                <div
                  key={id}
                  data-trust-reveal
                  className="grid grid-cols-[minmax(0,1fr)_clamp(150px,22vw,300px)_minmax(0,1fr)] items-stretch max-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-[900px]:gap-[10px] max-[900px]:pt-2"
                >
                  <RoleCard side="ours" label={t(`roles.rows.${id}.ours`)} text={t(`roles.rows.${id}.oursText`)} />
                  <div className="relative flex items-center px-2 max-[900px]:order-first max-[900px]:col-span-full max-[900px]:justify-start max-[900px]:p-0">
                    <span className="trust-dash-x flex-1 min-w-2 h-[1.5px] max-[900px]:hidden" />
                    <span className="w-1.5 max-[900px]:hidden" />
                    <span className={cn('relative text-[12px] font-semibold tracking-[0.06em] uppercase text-[#1E1E1E] bg-white border border-[#ECECF1] px-3 py-[7px] rounded-full whitespace-nowrap flex items-center gap-2 max-[760px]:shadow-none', PILL_SHADOW)}>
                      <Stroke size={14}>{icon}</Stroke>
                      {t(`roles.rows.${id}.law`)}
                    </span>
                    <span className="w-1.5 max-[900px]:hidden" />
                    <span className="trust-dash-x-rev flex-1 min-w-2 h-[1.5px] max-[900px]:hidden" />
                  </div>
                  <RoleCard side="yours" label={t(`roles.rows.${id}.yours`)} text={t(`roles.rows.${id}.yoursText`)} />
                </div>
              ))}

              <div className="relative z-[1] bg-[#F7F7F7] flex flex-col items-center">
                <div className="trust-dash-y w-[1.5px] h-3" />
                <span className={cn('relative type-eyebrow text-[#4B4DF7] bg-white border border-[#ECECF1] px-3 py-1.5 rounded-full whitespace-nowrap', PILL_SHADOW)}>{t('roles.give')}</span>
                <div className="trust-dash-y w-[1.5px] h-6" />
                <SplitLines className="relative w-full max-w-[1000px] h-11 max-[760px]:hidden" />
                <div className="relative grid grid-flow-col auto-cols-fr gap-3 w-max max-w-full max-[760px]:grid-cols-2 max-[760px]:grid-flow-row max-[760px]:w-full max-[760px]:mt-4">
                  {docs.map((doc) => (
                    <span
                      key={doc}
                      className={cn(
                        'whitespace-nowrap text-[13px] font-medium text-[#1E1E1E] bg-white border border-[#ECECF1] px-[18px] py-4 rounded-xl flex items-center justify-start text-left leading-[1.3] gap-2 min-w-0 max-[1080px]:whitespace-normal max-[1080px]:px-[14px] max-[760px]:p-3',
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
            <div
              data-trust-reveal
              className="bg-white border border-[#ECECF1] rounded-3xl p-[clamp(28px,4vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-14 items-center max-[760px]:px-4 max-[760px]:py-5 max-[760px]:gap-8"
            >
              <div className="flex flex-col gap-6">
                <h2 data-trust-reveal className={H2}>{t('pack.title')}</h2>
                <p data-trust-reveal className={cn(BODY, 'max-w-[460px]')}>{t('pack.body')}</p>
                <div aria-hidden="true" className="trust-mask-70 relative mt-4 max-w-[420px] pt-[52px]">
                  <div className="absolute left-5 right-5 top-0 h-20 bg-[#F2F2F2] border border-[#EBEBEB] rounded-t-[20px]" />
                  <div className="absolute left-[10px] right-[10px] top-6 h-20 bg-[#F7F7F7] border border-[#EBEBEB] rounded-t-[20px]" />
                  <div className="relative bg-white border border-[#EBEBEB] rounded-t-[20px] px-5 pt-[22px] pb-20 flex flex-col gap-3">
                    <div className="flex justify-between items-center gap-3">
                      <span className="type-eyebrow text-[#4B4DF7]">{t('pack.preview.label')}</span>
                      <span className="text-[12px] text-[#6E6E6E]">{t('pack.preview.format')}</span>
                    </div>
                    <div className="font-display text-[18px] font-medium leading-[1.4] tracking-[-0.01em] mb-1">{t('pack.preview.title')}</div>
                    <div className="h-1.5 rounded-[3px] bg-[#F3F4F5] w-[72%]" />
                    <div className="h-1.5 rounded-[3px] bg-[#F3F4F5] w-[56%]" />
                    <div className="h-1.5 rounded-[3px] bg-[#F3F4F5] w-[64%]" />
                  </div>
                </div>
                <div className="flex max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-[#F7F7F7] rounded-2xl p-7 flex flex-col gap-4 max-[760px]:p-[18px] max-[760px]:gap-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <Stroke size={18} color="#139559">{CHECK}</Stroke>
                    <span className="font-display text-[18px] font-medium leading-[1.4]">{t('pack.now.title')}</span>
                  </div>
                  <div className="flex flex-col">
                    {packNow.map((item) => (
                      <div key={item} className="py-3 border-t border-[#EBEBEB] flex items-center gap-3 type-body-sm text-[#1E1E1E]">
                        <Stroke>{DOC}</Stroke>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-dashed border-[#CBCBCB] rounded-2xl p-7 flex flex-col gap-4 max-[760px]:p-[18px] max-[760px]:gap-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <Stroke size={18} color="#6E6E6E">{LOCK}</Stroke>
                    <span className="font-display text-[18px] font-medium leading-[1.4]">{t('pack.request.title')}</span>
                  </div>
                  <div className="flex flex-col">
                    {packRequest.map((item) => (
                      <div key={item} className="py-3 border-t border-[#EBEBEB] flex items-center gap-3 type-body-sm text-[#4B4B4B]">
                        <Stroke color="#A4A4A4">{LOCK}</Stroke>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Certifications ── */}
        <section className="max-w-[1184px] mx-auto px-8 pt-[136px] flex flex-col gap-5 items-center max-[760px]:py-[72px]">
          <h2 data-trust-reveal className={cn(H2, 'mb-5 text-center')}>{t('certs.title')}</h2>
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
                  <div className="text-[13px] leading-[1.35] text-[#4B4B4B] text-balance">{t(`certs.items.${cert.id}.desc`)}</div>
                  {cert.year && <div className="text-[12px] text-[#6E6E6E] whitespace-nowrap">{cert.year}</div>}
                  {cert.badge && (
                    <span className="mt-1 text-[11px] font-medium leading-[1.4] text-[#F26A2E] bg-[#FFF7EE] border border-[#FFEBD9] px-2 py-px rounded-full whitespace-nowrap">
                      {t('certs.inProgress')}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap justify-center mt-6 max-[760px]:px-5">
            {chips.map((chip, i) => (
              <span key={chip} className="flex items-center gap-2 text-[13px] text-[#1E1E1E] bg-[#F3F4F5] border border-[#EBEBEB] px-3 py-1.5 rounded-full whitespace-nowrap">
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
        <section className="bg-white pt-[136px] max-[760px]:pt-[72px]">
          <div className={cn(CONTAINER, 'flex flex-wrap gap-x-16 gap-y-10 items-start')}>
            <h2 data-trust-reveal className={cn(H2, 'flex-[1_1_260px]')}>{t('faq.title')}</h2>
            <TrustFaq items={faq}>
              <div className="flex justify-start mt-6 max-[760px]:w-full"><Cta label={cta} locale={locale} /></div>
            </TrustFaq>
          </div>
        </section>

        {/* ── Closing ── */}
        <section id="contact" className="bg-white py-28 mt-28 scroll-mt-[80px] max-[760px]:mt-0 max-[760px]:pt-12 max-[760px]:pb-14">
          <div className={CONTAINER}>
            <div className="relative overflow-hidden border border-[#ECECF1] rounded-3xl bg-[#F7F7F7] py-[clamp(40px,6vw,88px)] px-8 flex flex-col items-center text-center gap-5">
              <div className="absolute left-1/2 top-1/2 w-[640px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,#F7F7F7_30%,rgba(247,247,249,0)_70%)]" />
              <div className="absolute -right-[120px] -top-[140px] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,91,36,0.14),rgba(255,91,36,0)_65%)]" />
              <div className="absolute -left-[120px] -bottom-[160px] w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(75,77,247,0.16),rgba(75,77,247,0)_65%)]" />
              <h2 data-trust-reveal className={cn(H2, 'relative')}>{t('closing.title')}</h2>
              <p data-trust-reveal className={cn(BODY, 'relative max-w-[440px]')}>{t('closing.body')}</p>
              <div className="relative flex gap-3 flex-wrap justify-center mt-2 max-[760px]:w-full">
                <Cta label={cta} locale={locale} />
              </div>
            </div>
          </div>
        </section>

        <TrustReveal />
      </main>
      <Footer />
    </>
  );
}
