// "Modalità di erogazione" on /lp/safety-behaviour-assessment, as one journey:
// the invite arrives on any channel, the assessment runs on any device, the
// answer comes in any format. The middle step is drawn — the same question on
// a monitor, a tablet and a phone — and each format shows a glimpse of itself.
// The screens are a sketch in the house colours, not a screenshot of the product.

import React from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';

type Group = { title: string; items: string[] };

const CARD = 'rounded-2xl bg-white border border-[#E5E7EB]';

// The same question on every screen: a heading bar, two lines, three options,
// the middle one chosen.
function Screen({ compact }: { compact?: boolean }) {
  return (
    <span className={`flex h-full flex-col ${compact ? 'gap-1 p-1.5' : 'gap-1.5 p-3'}`}>
      <span className="h-1.5 w-2/5 rounded-full bg-[#4B4DF7]" />
      <span className="h-1 w-full rounded-full bg-[#E5E7EB]" />
      <span className="h-1 w-4/5 rounded-full bg-[#E5E7EB]" />
      <span className={`mt-auto flex flex-col ${compact ? 'gap-1' : 'gap-1.5'}`}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`rounded-md border ${compact ? 'h-2' : 'h-3'} ${
              i === 1 ? 'border-[#4B4DF7] bg-[#d9daff]' : 'border-[#E5E7EB] bg-white'
            }`}
          />
        ))}
      </span>
    </span>
  );
}

function Devices() {
  return (
    <div className="relative mx-auto h-[190px] w-full max-w-[340px]" aria-hidden="true">
      {/* Monitor */}
      <span className="absolute left-0 top-0 w-[72%]">
        <span className="block h-[132px] overflow-hidden rounded-xl border-2 border-[#121212]/80 bg-white">
          <Screen />
        </span>
        <span className="mx-auto block h-4 w-3 bg-[#121212]/80" />
        <span className="mx-auto block h-1.5 w-16 rounded-full bg-[#121212]/80" />
      </span>
      {/* Tablet */}
      <span className="absolute bottom-0 right-[14%] block h-[128px] w-[30%] overflow-hidden rounded-xl border-2 border-[#121212]/80 bg-white shadow-[0_12px_32px_rgba(18,18,18,0.12)]">
        <Screen compact />
      </span>
      {/* Phone */}
      <span className="absolute bottom-0 right-0 block h-[100px] w-[17%] overflow-hidden rounded-[12px] border-2 border-[#121212]/80 bg-white shadow-[0_12px_32px_rgba(18,18,18,0.16)]">
        <Screen compact />
      </span>
    </div>
  );
}

// A glimpse of each format, in the order of delivery.groups[2].items:
// closed answer, text, video, audio.
function FormatGlimpse({ index }: { index: number }) {
  if (index === 0)
    return (
      <span className="flex flex-col gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full border ${i === 0 ? 'border-[#4B4DF7] bg-[#4B4DF7]' : 'border-[#121212]/25'}`} />
            <span className="h-1 w-10 rounded-full bg-[#E5E7EB]" />
          </span>
        ))}
      </span>
    );
  if (index === 1)
    return (
      <span className="flex w-full flex-col gap-1.5">
        <span className="h-1 w-full rounded-full bg-[#E5E7EB]" />
        <span className="h-1 w-5/6 rounded-full bg-[#E5E7EB]" />
        <span className="flex items-center gap-0.5">
          <span className="h-1 w-1/2 rounded-full bg-[#E5E7EB]" />
          <span className="h-3 w-px bg-[#4B4DF7]" />
        </span>
      </span>
    );
  if (index === 2)
    return (
      <span className="flex h-10 w-full items-center justify-center rounded-lg bg-[#121212]/[0.06]">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4B4DF7]">
          <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
        </span>
      </span>
    );
  return (
    <span className="flex h-10 items-center gap-[3px]">
      {[8, 18, 12, 26, 16, 30, 14, 22, 10, 18, 8].map((h, i) => (
        <span key={i} className="w-[3px] rounded-full bg-[#4B4DF7]" style={{ height: h, opacity: 0.45 + (i % 3) * 0.2 }} />
      ))}
    </span>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="type-caption font-semibold text-[#4B4DF7]">0{n}</span>
      <h3 className="text-[18px] md:text-[20px] font-semibold leading-snug text-[#121212]">{title}</h3>
    </div>
  );
}

function Arrow() {
  return (
    <span className="flex items-center justify-center" aria-hidden="true">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B4DF7] text-white">
        <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
      </span>
    </span>
  );
}

export default function DeliveryFlow({ groups, icons }: { groups: Group[]; icons: LucideIcon[][] }) {
  const [invite, devices, formats] = groups;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1.25fr)_auto_minmax(0,1fr)] lg:gap-5 items-stretch">
      {/* 01 — the invite */}
      <div className={`${CARD} p-6 md:p-7`}>
        <Step n={1} title={invite.title} />
        <ul className="space-y-2.5">
          {invite.items.map((item, j) => {
            const Icon = icons[0][j];
            return (
              <li key={item} className="flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-white py-2 pl-2 pr-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efeefb]">
                  <Icon className="h-4 w-4 text-[#4B4DF7]" strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="type-body-sm font-medium text-[#121212]">{item}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <Arrow />

      {/* 02 — the assessment, on any device */}
      <div className={`${CARD} border-[#4B4DF7]/30 p-6 md:p-7 shadow-[0_12px_40px_rgba(75,77,247,0.12)] flex flex-col`}>
        <Step n={2} title={devices.title} />
        <div className="flex flex-1 items-center">
          <Devices />
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {devices.items.map((item, j) => {
            const Icon = icons[1][j];
            return (
              <li key={item} className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#f1f5f9] px-3 py-1 type-caption font-medium text-[#121212]">
                <Icon className="h-3.5 w-3.5 text-[#4B4DF7]" aria-hidden="true" />
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      <Arrow />

      {/* 03 — the answer, in any format */}
      <div className={`${CARD} p-6 md:p-7`}>
        <Step n={3} title={formats.title} />
        <ul className="grid grid-cols-2 gap-3">
          {formats.items.map((item, j) => {
            const Icon = icons[2][j];
            return (
              <li key={item} className="flex flex-col gap-3 rounded-xl bg-[#f5f5f7] p-3.5">
                <span className="flex h-10 items-center">
                  <FormatGlimpse index={j} />
                </span>
                <span className="flex items-center gap-1.5 type-body-sm font-medium text-[#121212]">
                  <Icon className="h-4 w-4 text-[#4B4DF7]" aria-hidden="true" />
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
