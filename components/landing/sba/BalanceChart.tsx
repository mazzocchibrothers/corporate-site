// "Come funziona la valutazione" on /lp/safety-behaviour-assessment, drawn as
// in the deck: on the left the balance between enablers (up) and drifts
// (across), the drifts pulling the line down and the accelerator bending it
// upward; on the right the synthetic score it lands on, +3 to −3. A diagram,
// not data: the curves show the mechanism, not a person.

import React from 'react';

// Top to bottom, against `scale`: positive bands grow right of zero in green,
// negative ones left in red, stronger the further from zero.
const SCORES = [3, 2, 1, -1, -2, -3];
const COLOURS = ['#047857', '#22c55e', '#93e0bb', '#ff9a9a', '#ff5656', '#ef4444'];

export default function BalanceChart({
  enablers,
  drifts,
  accelerator,
  scaleLabel,
  scale,
}: {
  enablers: string;
  drifts: string;
  accelerator: string;
  scaleLabel: string;
  scale: string[];
}) {
  const row = (score: number) => {
    const i = SCORES.indexOf(score);
    const width = `${(Math.abs(score) / 3) * 100}%`;
    const value = score > 0 ? `+${score}` : `−${-score}`;
    return (
      <li key={score} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center">
        <span className="flex h-6 items-center justify-end gap-2 pr-2">
          {score < 0 ? (
            <>
              <span className="type-caption font-semibold" style={{ color: COLOURS[i] }}>{value}</span>
              <span className="h-full rounded-l-md" style={{ width, background: COLOURS[i] }} />
            </>
          ) : (
            <span className="type-caption text-right text-[#121212]/70">{scale[i]}</span>
          )}
        </span>
        <span className="flex h-6 items-center gap-2 border-l border-[#121212]/30">
          {score > 0 ? (
            <>
              <span className="h-full rounded-r-md" style={{ width, background: COLOURS[i] }} />
              <span className="type-caption font-semibold" style={{ color: COLOURS[i] }}>{value}</span>
            </>
          ) : (
            <span className="type-caption pl-2 text-[#121212]/70">{scale[i]}</span>
          )}
        </span>
      </li>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-0 items-center">
      <svg viewBox="0 0 400 280" className="w-full h-auto max-h-[300px] md:pr-8" role="img" aria-label={`${enablers}, ${drifts}, ${accelerator}`}>
        <defs>
          <marker id="sba-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#ef4444" />
          </marker>
        </defs>
        <path d="M56 24 V232 H360" fill="none" stroke="#121212" strokeOpacity="0.35" strokeWidth="1.5" />
        <path d="M56 232 L248 150" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
        <path d="M262 112 V188" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 5" />
        <path d="M274 142 V112" fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#sba-arrow)" />
        <path d="M274 158 V188" fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#sba-arrow)" />
        <path d="M284 150 C 330 150, 362 140, 380 56" fill="none" stroke="#4B4DF7" strokeWidth="3" strokeLinecap="round" />
        <text x="380" y="38" textAnchor="end" fill="#4B4DF7" fontSize="12" fontWeight="600" letterSpacing="0.06em">{accelerator.toUpperCase()}</text>
        <text x="0" y="0" transform="translate(32 128) rotate(-90)" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="600" letterSpacing="0.06em">{enablers.toUpperCase()}</text>
        <text x="208" y="262" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="600" letterSpacing="0.06em">{drifts.toUpperCase()}</text>
      </svg>

      <div className="md:border-l md:border-[#E5E7EB] md:pl-8">
        <p className="type-body-bold text-center text-[#121212] mb-3">{scaleLabel}</p>
        <ol className="space-y-1.5" aria-label={scaleLabel}>{SCORES.slice(0, 3).map(row)}</ol>
        <div className="relative my-3 border-t border-dashed border-[#121212]/30" aria-hidden="true">
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1.5 type-caption text-[#121212]/50">0</span>
        </div>
        <ol className="space-y-1.5" aria-label={scaleLabel}>{SCORES.slice(3).map(row)}</ol>
      </div>
    </div>
  );
}
