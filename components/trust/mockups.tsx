// The product UI drawn on /trust, in miniature: the sign-off diagram in the
// hero, the audit log, the score card, the AI Act declaration and the
// pseudonymisation record. Like the screens in components/product/, these are
// drawings of the product, not page copy, so their text is sized to the
// drawing (10–12px) rather than set on the site's type scale. Their colours
// are the site palette's: #121212 and its opacity steps for text and rules,
// the brand blues, and the palette's orange and green tints.
//
// Server components: each reads its words from the `trust` catalogue.

import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { DealLines } from '@/components/trust/DealLines';

const MOCK = 'w-full h-[196px] bg-white border border-[#EBEBEB] shadow-[0_1px_2px_rgba(16,24,40,.04),0_8px_20px_rgba(16,24,40,.06)] px-[14px] py-3 flex flex-col justify-center';
const LABEL = 'text-[10px] font-semibold leading-none tracking-[0.08em] uppercase text-[#121212]/60';
const MONO = '[font-family:ui-monospace,SFMono-Regular,Menlo,monospace]';
const CARD_SHADOW = 'shadow-[0_1px_2px_rgba(16,24,40,.04),0_6px_16px_rgba(16,24,40,.05)]';
const ORANGE = '#EA580C';

const Tick = ({ size, color = '#fff', width = 1.8 }: { size: number; color?: string; width?: number }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2 5.2l2 2 4-4.4" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

// ── Hero: every team signs the same agreement ───────────────────────────────
const BARS = [['hr', '60%'], ['legal', '55%'], ['it', '70%'], ['dpo', '58%'], ['procurement', '30%']] as const;

export async function DealDiagram() {
  const t = await getTranslations('trust');

  const team = (id: string, area: string, className?: string) => (
    <div
      data-dn
      className={cn(
        'relative z-[1] bg-white border border-[#EBEBEB] rounded-xl p-3 flex flex-col gap-2 min-w-0 max-[760px]:!w-full',
        CARD_SHADOW,
        area,
        className,
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-[26px] h-[26px] rounded-[7px] bg-[#FDF1EA] border border-[#F8DDC9] flex items-center justify-center shrink-0">
          {TEAM_ICONS[id]}
        </div>
        <div className="text-[14px] font-semibold leading-[1.3] whitespace-nowrap">{t(`deal.teams.${id}.name`)}</div>
      </div>
      <div className="text-[12px] leading-[1.35] text-[#121212]/60 [text-wrap:pretty]">{t(`deal.teams.${id}.desc`)}</div>
    </div>
  );

  return (
    <div className="relative w-full max-w-[560px] grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] [grid-template-areas:'hr_doc_legal'_'it_doc_dpo'_'proc_proc_proc'] gap-x-7 gap-y-4 items-center max-[760px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-[760px]:[grid-template-areas:'doc_doc'_'hr_legal'_'it_dpo'_'proc_proc'] max-[760px]:gap-3">
      <DealLines />
      {team('hr', '[grid-area:hr]')}
      {team('legal', '[grid-area:legal]')}
      <div
        data-deal-doc
        className="[grid-area:doc] relative z-[1] self-stretch bg-white border border-[#EBEBEB] rounded-[14px] px-[14px] py-4 flex flex-col gap-3 min-w-0 shadow-[0_12px_32px_rgba(16,24,40,.08)]"
      >
        <div className="flex items-center justify-between gap-2">
          <img src="/trust/logomark-gradient.svg" alt="" className="h-[14px] block" />
          <span className="text-[10px] font-medium leading-none tracking-[0.08em] uppercase text-[#121212]/60">{t('deal.label')}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="font-display text-[15px] font-semibold leading-[1.2] tracking-[-0.01em]">{t('deal.title')}</div>
          <span className="h-1 rounded-[2px] bg-[#F5F5F7] w-[88%]" />
          <span className="h-1 rounded-[2px] bg-[#F5F5F7] w-[64%]" />
        </div>
        <div className="flex flex-col gap-2 pt-3 border-t border-[#EBEBEB]">
          {BARS.map(([id, bar]) => (
            <div key={id} className="flex items-center gap-[7px] text-[11px] font-medium leading-none min-w-0">
              <span className="w-[13px] h-[13px] rounded bg-[#4B4DF7] flex items-center justify-center shrink-0"><Tick size={8} /></span>
              <span className="whitespace-nowrap">{t(`deal.teams.${id}.name`)}</span>
              <span className="flex-1 min-w-2 h-1 rounded-[2px] bg-[#F5F5F7] ml-auto" style={{ maxWidth: bar }} />
            </div>
          ))}
        </div>
        <span className="mt-auto self-start flex items-center gap-[5px] text-[11px] font-medium leading-none text-[#047857] bg-[#E3F9EC] border border-[#B7F5D8] px-2 py-[5px] rounded-full whitespace-nowrap">
          <Tick size={10} color="#047857" width={1.6} />
          {t('deal.signedOff')}
        </span>
      </div>
      {team('it', '[grid-area:it]')}
      {team('dpo', '[grid-area:dpo]')}
      {team('procurement', '[grid-area:proc]', 'justify-self-center w-[min(100%,220px)]')}
    </div>
  );
}

// ── Pillar 1: the audit log ─────────────────────────────────────────────────
export async function AuditLogMock() {
  const t = await getTranslations('trust');
  return (
    <div className={cn(MOCK, 'rounded-xl gap-[10px]')}>
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#EBEBEB]">
        <span className={LABEL}>{t('ai.auditLog.label')}</span>
        <span className={cn(MONO, 'text-[10px] leading-none text-[#121212]/50')}>{t('ai.auditLog.candidate')}</span>
      </div>
      <div className="relative flex flex-col gap-3 pl-4">
        <span className="absolute left-[3.25px] top-2 bottom-6 w-[1.5px] bg-[repeating-linear-gradient(180deg,#D9DAFF_0_3px,transparent_3px_6px)]" />
        <div className="relative flex flex-col gap-[5px]">
          <span className="absolute -left-4 top-[3px] w-2 h-2 rounded-full bg-white border-2 border-[#121212]/30" />
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold leading-[1.2]">
              <img src="/trust/logomark-gradient.svg" alt="" loading="lazy" decoding="async" className="h-[11px] block grayscale opacity-[.55]" />
              {t('ai.auditLog.generated')}
            </span>
            <span className={cn(MONO, 'text-[10px] leading-none text-[#121212]/50 whitespace-nowrap')}>{t('ai.auditLog.generatedAt')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] leading-[1.3] text-[#121212]/60">
            Skillvue<span className="text-[#121212]/25">·</span>
            <span className="font-medium text-[#D9603F] bg-[#FDF1EA] border border-[#F8DDC9] px-[7px] py-0.5 rounded-full whitespace-nowrap">{t('ai.auditLog.suggestion')}</span>
          </div>
        </div>
        <div className="relative flex flex-col gap-[5px]">
          <span className="absolute -left-4 top-[3px] w-2 h-2 rounded-full bg-[#4B4DF7] shadow-[0_0_0_3px_rgba(75,77,247,.15)]" />
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-semibold leading-[1.2]">{t('ai.auditLog.recorded')}</span>
            <span className={cn(MONO, 'grid text-[10px] leading-none whitespace-nowrap')}>
              <span className="trust-log-pending [grid-area:1/1] text-[#121212]/40">{t('ai.auditLog.recordedPending')}</span>
              <span className="trust-log-done [grid-area:1/1] text-[#121212]/50">{t('ai.auditLog.recordedAt')}</span>
            </span>
          </div>
          <div className="text-[11px] leading-[1.3] text-[#121212]/60">
            {t('ai.auditLog.evaluator')}<span className="text-[#121212]/25"> · </span>{t('ai.auditLog.role')}
          </div>
          <div className="grid">
            <div className="trust-log-pending [grid-area:1/1] flex items-center gap-2 h-[30px] px-[10px] border border-[#D9DAFF] rounded-[8px] bg-white shadow-[0_0_0_3px_rgba(75,77,247,.08)]">
              <span className="trust-caret w-[1.5px] h-[14px] bg-[#4B4DF7]" />
              <span className="flex-1 text-[11px] text-[#121212]/40">{t('ai.auditLog.placeholder')}</span>
              <span className="text-[10px] font-medium leading-none text-[#EA580C] bg-[#FDF3EC] border border-[#FDF1EA] px-[7px] py-[3px] rounded-full">{t('ai.auditLog.pending')}</span>
            </div>
            <div className="trust-log-done [grid-area:1/1] flex items-center gap-2 h-[30px] px-[10px] border border-[#EBEBEB] rounded-[8px] bg-white">
              <span className="flex-1 text-[11px] font-semibold">{t('ai.auditLog.decision')}</span>
              <span className={cn(MONO, 'text-[10px] leading-none text-[#121212]/60 whitespace-nowrap')}>{t('ai.auditLog.signed')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Pillar 1: an explained score ────────────────────────────────────────────
export async function ScoreMock() {
  const t = await getTranslations('trust');
  return (
    <div className={cn(MOCK, 'rounded-xl gap-[10px]')}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-semibold leading-[1.2]">{t('ai.score.skill')}</span>
        <span className="text-[12px] font-semibold leading-none whitespace-nowrap">{t('ai.score.value')}<span className="font-medium text-[#121212]/40"> {t('ai.score.outOf')}</span></span>
      </div>
      <div className="grid grid-cols-5 gap-[3px]">
        <span className="h-1 rounded-[2px] bg-[#6B7DFF]" />
        <span className="h-1 rounded-[2px] bg-[#6B7DFF]" />
        <span className="h-1 rounded-[2px] bg-[#6B7DFF]" />
        <span className="h-1 rounded-[2px] bg-[linear-gradient(90deg,#6B7DFF_80%,#E1E2FF_80%)]" />
        <span className="h-1 rounded-[2px] bg-[#E1E2FF]" />
      </div>
      <div className="flex flex-col gap-[5px] pt-2 border-t border-[#EBEBEB]">
        <span className={LABEL}>{t('ai.score.justification')}</span>
        <p className="trust-mask-62 text-[11.5px] leading-[1.45] text-[#4B4B4B] h-[50px] overflow-hidden">{t('ai.score.text')}</p>
      </div>
      <div className="flex justify-end">
        <span className="flex items-center gap-1.5 text-[11px] font-medium leading-none bg-white border border-[#121212]/20 px-[10px] py-[7px] rounded-[8px] whitespace-nowrap">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#4B4B4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="block">
            <path d="M11 2.5l2.5 2.5L6 12.5H3.5V10z" />
          </svg>
          {t('ai.score.override')}
        </span>
      </div>
    </div>
  );
}

// ── Pillar 1: the signed AI Act declaration (tilts when its card is hovered) ─
export async function DeclarationMock() {
  const t = await getTranslations('trust');
  const rows = t.raw('ai.declaration.rows') as { label: string; value: string }[];
  return (
    <div
      className={cn(
        MOCK,
        'rounded-[6px] gap-1.5 origin-[50%_55%] transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-rotate-2 group-hover:shadow-[0_2px_4px_rgba(16,24,40,.04),0_14px_30px_rgba(16,24,40,.10)] motion-reduce:transition-none',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <img src="/trust/wordmark.svg" alt="" loading="lazy" decoding="async" className="h-[9px] w-auto block opacity-80" />
        <span className={cn(MONO, 'text-[9px] leading-none text-[#121212]/40')}>{t('ai.declaration.regulation')}</span>
      </div>
      <div className="font-display text-[13px] font-semibold leading-[1.2] tracking-[-0.01em] my-0.5">{t('ai.declaration.title')}</div>
      <div className="flex flex-col">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-[10px] py-1 border-t border-[#EBEBEB] text-[10.5px] leading-[1.3]">
            <span className="text-[#121212]/50 whitespace-nowrap">{row.label}</span>
            <span className="font-medium text-right whitespace-nowrap">{row.value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-[10px] mt-0.5">
        <div className="w-24 flex flex-col gap-0.5">
          <svg width="80" height="18" viewBox="0 0 110 26" fill="none" aria-hidden="true" className="block">
            <path d="M3 19c6-9 10-14 13-12s-5 14-1 13 8-15 12-13-2 11 2 11 6-9 10-8 0 7 4 7 7-6 11-6 3 5 7 5 9-3 15-6" stroke="#4B4DF7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="h-px bg-[#121212]/20" />
        </div>
        <span className="text-[9px] leading-[1.3] text-[#121212]/50">{t('ai.declaration.signatory')}</span>
      </div>
    </div>
  );
}

// ── Pillar 2: identifiers swapped before the model sees the record ──────────
export async function PseudonymMock() {
  const t = await getTranslations('trust');
  const rows = [
    { field: t('data.fields.name'), source: t('data.record.sampleName'), token: t('data.model.tokenName') },
    { field: t('data.fields.email'), source: t('data.record.sampleEmail'), token: t('data.model.tokenEmail') },
    { field: t('data.fields.phone'), source: t('data.record.samplePhone'), token: t('data.model.tokenPhone') },
  ];

  const pill = (
    <span className="flex items-center gap-1.5 text-[11px] font-medium leading-none bg-white border border-[#EBEBEB] px-[10px] py-1.5 rounded-full whitespace-nowrap shadow-[0_2px_6px_rgba(16,24,40,.06)]">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#6B7DFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="block">
        <rect x="3.5" y="7" width="9" height="7" rx="1.6" /><path d="M5.5 7V5.3a2.5 2.5 0 015 0V7" />
      </svg>
      {t('data.replaced')}
    </span>
  );

  const card = (kind: 'source' | 'model') => (
    <div
      className={cn(
        'flex-[1_1_0] min-w-0 bg-white border rounded-xl px-[14px] pt-3 pb-1.5 max-[900px]:flex-none shadow-[0_1px_2px_rgba(16,24,40,.04),0_8px_20px_rgba(16,24,40,.06)]',
        kind === 'source' ? 'border-[#EBEBEB]' : 'border-[#D9DAFF]',
      )}
    >
      <div className="flex items-center justify-between gap-2 pb-2">
        <span className={LABEL}>{kind === 'source' ? t('data.record.label') : t('data.model.label')}</span>
        {kind === 'source' ? (
          <span className="text-[10px] leading-none text-[#121212]/40">{t('data.record.source')}</span>
        ) : (
          <span className="flex items-center gap-[5px] text-[10px] leading-none text-[#4B4DF7]">
            <img src="/trust/logomark-gradient.svg" alt="" loading="lazy" decoding="async" className="h-[10px] block" />
            {t('data.model.name')}
          </span>
        )}
      </div>
      {rows.map((row) => (
        <div key={row.field} className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-[10px] py-[7px] border-t border-[#EBEBEB]">
          <span className="text-[11px] leading-none text-[#121212]/50">{row.field}</span>
          <div className="flex min-w-0">
            {kind === 'source' ? (
              <span className="text-[12px] leading-[1.3] font-medium whitespace-nowrap overflow-hidden text-ellipsis min-w-0">{row.source}</span>
            ) : (
              <span className={cn(MONO, 'text-[11px] leading-none font-medium text-[#4B4DF7] bg-[#EFEEFD] border border-[#E1E2FF] px-[7px] py-1 rounded-[6px] whitespace-nowrap')}>{row.token}</span>
            )}
          </div>
        </div>
      ))}
      <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-[10px] py-[7px] border-t border-[#EBEBEB]">
        <span className="text-[11px] leading-[1.4] text-[#121212]/50">{t('data.fields.answer')}</span>
        <span className="text-[12px] leading-[1.4] text-[#4B4B4B]">{t('data.answer')}</span>
      </div>
    </div>
  );

  const chevron = (d: string, w: number, h: number, className: string) => (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true" className={className}>
      <path d={d} stroke="#121212" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div
      aria-hidden="true"
      className="trust-dots rounded-2xl border border-[#EBEBEB] p-[clamp(20px,3vw,40px)] flex flex-row items-center min-w-0 max-[900px]:flex-col max-[900px]:items-stretch"
    >
      {card('source')}
      <div className="flex-none flex items-center px-1 max-[900px]:hidden">
        <span className="trust-dash-x w-5 h-[1.5px]" />
        {pill}
        <span className="trust-dash-x w-4 h-[1.5px]" />
        {chevron('M1 1l4 4-4 4', 6, 10, 'block -ml-[3px]')}
      </div>
      <div className="hidden flex-col items-center py-0.5 max-[900px]:flex">
        <span className="trust-dash-y w-[1.5px] h-[14px]" />
        {pill}
        <span className="trust-dash-y w-[1.5px] h-[14px]" />
        {chevron('M1 1l4 4 4-4', 10, 6, 'block -mt-[3px]')}
      </div>
      {card('model')}
    </div>
  );
}
