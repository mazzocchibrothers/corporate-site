// "Dove la valutazione supporta la riduzione del rischio" on
// /lp/safety-behaviour-assessment: the four uses in the order a person meets
// them — hired, planned, assigned, trained — each with a small sketch of what
// the assessment does there. Sketches, not data: they show the mechanism.

import React from 'react';
import { Check, Eye, HardHat, User, type LucideIcon } from 'lucide-react';

type Card = { title: string; body: string };

const PANEL = 'relative flex h-[148px] items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] px-5';

// Selection: of eighteen candidates, the few oriented to safety stand out.
function Hire() {
  const picked = [3, 8, 14];
  return (
    <div className="grid grid-cols-6 gap-x-3 gap-y-2.5">
      {Array.from({ length: 18 }, (_, i) =>
        picked.includes(i) ? (
          <span key={i} className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#6366F8] shadow-[0_0_16px_rgba(99,102,248,0.6)]">
            <User className="h-3.5 w-3.5 text-white" strokeWidth={2.25} />
          </span>
        ) : (
          <span key={i} className="flex h-6 w-6 items-center justify-center">
            <User className="h-3.5 w-3.5 text-white/25" strokeWidth={2} />
          </span>
        ),
      )}
    </div>
  );
}

// Planning: who can work on their own from day one, who needs supervision.
function Plan() {
  const rows = [0.9, 0.35, 0.8, 0.3];
  return (
    <div className="w-full space-y-2.5">
      {rows.map((v, i) => {
        const solo = v > 0.5;
        return (
          <div key={i} className="flex items-center gap-2.5">
            <span className="h-5 w-5 shrink-0 rounded-full bg-white/15" />
            <span className="h-1.5 flex-1 rounded-full bg-white/[0.08]">
              <span className={`block h-full rounded-full ${solo ? 'bg-[#6366F8]' : 'bg-white/30'}`} style={{ width: `${v * 100}%` }} />
            </span>
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${solo ? 'bg-[#6366F8]/25' : 'bg-white/10'}`}>
              {solo ? <Check className="h-3 w-3 text-[#8385FF]" strokeWidth={3} /> : <Eye className="h-3 w-3 text-white/60" strokeWidth={2.25} />}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// High-risk work: the most exposed position goes to the person fit for it.
function Assign() {
  const slot = (risk: number, strong: boolean) => (
    <div className="flex w-full items-center gap-2">
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${strong ? 'bg-[#6366F8] shadow-[0_0_16px_rgba(99,102,248,0.6)]' : 'bg-white/15'}`}>
        <User className="h-3.5 w-3.5 text-white" strokeWidth={2.25} />
      </span>
      <span className={`h-px flex-1 ${strong ? 'bg-[#6366F8]' : 'bg-white/20'}`} />
      <span className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 ${risk === 3 ? 'border-[#ff5656]/50 bg-[#ff5656]/10' : 'border-white/10 bg-white/[0.04]'}`}>
        <HardHat className={`h-4 w-4 ${risk === 3 ? 'text-[#ff9a9a]' : 'text-white/50'}`} />
        <span className="flex items-end gap-0.5">
          {[1, 2, 3].map((b) => (
            <span key={b} className={`w-1 rounded-sm ${b <= risk ? (risk === 3 ? 'bg-[#ff5656]' : 'bg-white/50') : 'bg-white/15'}`} style={{ height: 3 + b * 3 }} />
          ))}
        </span>
      </span>
    </div>
  );
  return (
    <div className="w-full space-y-4">
      {slot(3, true)}
      {slot(1, false)}
    </div>
  );
}

// Targeted training: the one behaviour below the expected level, and its gap.
function Train() {
  const rows = [0.85, 0.45, 0.8];
  const target = 0.7;
  return (
    <div className="relative w-full space-y-3.5">
      {rows.map((v, i) => {
        const gap = v < target;
        return (
          <span key={i} className="relative block h-2 rounded-full bg-white/[0.08]">
            <span className={`absolute inset-y-0 left-0 rounded-full ${gap ? 'bg-white/35' : 'bg-[#6366F8]'}`} style={{ width: `${v * 100}%` }} />
            {gap && (
              <span
                className="absolute inset-y-[-3px] rounded-full border border-dashed border-[#8385FF] bg-[#6366F8]/15"
                style={{ left: `${v * 100}%`, width: `${(target - v) * 100}%` }}
              />
            )}
          </span>
        );
      })}
      <span className="absolute -top-2 -bottom-2 w-px bg-white/50" style={{ left: `${target * 100}%` }} />
    </div>
  );
}

const SKETCHES = [Hire, Plan, Assign, Train];

export default function UsesGrid({ cards, icons }: { cards: Card[]; icons: LucideIcon[] }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((c, i) => {
        const Sketch = SKETCHES[i];
        const Icon = icons[i];
        return (
          <li key={c.title} className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 md:p-5">
            <div className={PANEL} aria-hidden="true">
              <Sketch />
            </div>
            <div className="px-1 pt-5 pb-1">
              <div className="flex items-center gap-2.5 mb-2">
                <Icon className="h-5 w-5 shrink-0 text-[#6B7DFF]" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="text-[18px] md:text-[20px] font-semibold leading-snug text-white/95">{c.title}</h3>
              </div>
              <p className="type-body-sm text-white/60">{c.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
