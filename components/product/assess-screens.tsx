'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { StaggerReveal } from '@/components/product/stagger-reveal';

// The Skillvue Assess product UI on /product, drawn in HTML rather than shown
// as a screenshot, so it stays sharp at any width and reads in the visitor's
// language. Ported from the design as given: every length is in cqw, a
// percentage of the frame's width, so the frame is a size container and the
// screens scale with no measuring.
//
// Both screens are always mounted and the tab cross-fades between them, as on
// <MapScreens>. The browser bar and the assessment's header and footer are
// shared, and so is the assistant's avatar; what differs per screen is the body. The
// design gives the questions screen grey header and footer bands; both screens
// are white with a rule under the header here, so every product screen on
// /product reads as the same window.
//
// Type is the site's own: Geist, and Mona Sans for the product name. The
// design names Inter, which the site does not load.

export type AssessScreen = 'interview' | 'questions';

// Waveform bars on the interview: left, top, height, in cqw.
const BARS = [
  [26.681, 39.25, 0.882], [27.828, 39.03, 1.323], [28.975, 38.368, 2.646], [30.121, 38.037, 3.308], [31.268, 38.92, 1.544],
  [32.415, 39.03, 1.323], [33.561, 38.809, 1.764], [34.708, 38.258, 2.867], [35.854, 38.037, 3.308], [37.001, 39.14, 1.103],
  [38.148, 38.92, 1.544], [39.294, 38.699, 1.985], [40.441, 38.148, 3.087], [41.588, 38.037, 3.308], [42.734, 38.037, 3.308],
  [43.881, 38.479, 2.426], [45.028, 39.03, 1.323], [46.174, 39.14, 1.103], [47.321, 39.03, 1.323], [48.467, 38.92, 1.544],
  [49.614, 38.368, 2.646], [50.761, 38.148, 3.087], [51.907, 38.037, 3.308], [53.054, 38.148, 3.087], [54.201, 38.92, 1.544],
  [55.347, 39.03, 1.323], [56.494, 38.92, 1.544], [57.641, 38.809, 1.764], [58.787, 38.479, 2.426], [59.934, 38.148, 3.087],
  [61.08, 38.037, 3.308], [62.227, 38.037, 3.308], [63.374, 38.258, 2.867], [64.52, 38.92, 1.544], [65.667, 39.03, 1.323],
] as const;

// The waveform's entrance: the bars grow from their centre line, left to right,
// starting just after the question.
const BAR_START_MS = 45;
const BAR_STEP_MS = 12;

// The answer choices on the questions screen; the second is the one selected.
const OPTIONS = ['kpis', 'owners', 'outplacement', 'leaders'] as const;
const SELECTED = 'owners';

const ABS = 'absolute' as const;
// The window is 16:9, 56.25cqw tall where the design's is 71.114: the footer
// moves up by FOOT, and the centred content by LIFT into the empty space the
// design leaves above it — the most that keeps the avatar's halo below the
// header rule. The answer choices sit 0.9cqw apart, not 1.323.
const LIFT = 8.6;
const FOOT = 71.114 - 56.25;
// The product logo: the section's own, 1.4% of the window's width tall on
// every product screen.
const LOGO = '1.4cqw';
const ICON = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24' } as const;

/** The assistant's avatar in its halo, `left` and `top` being the halo's corner. */
function Halo({ left, top }: { left: number; top: number }) {
  return (
    <>
      <div style={{ position: ABS, left: `${left}cqw`, top: `${top}cqw`, width: '20.948cqw', height: '15.436cqw', borderRadius: '50%', background: 'radial-gradient(34% 36% at 40% 60%, rgba(130, 125, 255, 0.22), rgba(130, 125, 255, 0) 100%), radial-gradient(32% 36% at 60% 62%, rgba(255, 125, 100, 0.2), rgba(255, 125, 100, 0) 100%), radial-gradient(30% 28% at 55% 36%, rgba(255, 200, 150, 0.18), rgba(255, 200, 150, 0) 100%)', filter: 'blur(0.882cqw)' }} />
      <div style={{ position: ABS, left: `${left + 8.489}cqw`, top: `${top + 5.733}cqw`, width: '3.969cqw', height: '3.969cqw', borderRadius: '50%', background: 'linear-gradient(195deg, #FFD3A4 0%, #FFB3A0 30%, #F7A3B0 55%, #A9A3FF 100%)', padding: '0.243cqw', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/products/skillvue-logomark-white.svg" alt="" style={{ height: '52%' }} />
        </div>
      </div>
    </>
  );
}

/** One screen's layer, under the shared chrome; its blocks enter one after another each time it is shown. */
function Layer({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <div style={{ position: ABS, inset: 0, opacity: on ? 1 : 0, transition: 'opacity 400ms ease' }}>
      <StaggerReveal active={on}>{children}</StaggerReveal>
    </div>
  );
}

export function AssessScreens({ tab, label }: { tab: AssessScreen; label: string }) {
  const t = useTranslations('product.assess.screens');
  const time = '1:32 / 3:00';

  return (
    // The same window as <MapScreens>: border, radius and shadow.
    <div
      role="img"
      aria-label={label}
      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#FFFFFF', borderRadius: 12, border: '1px solid #D4D4D8', boxSizing: 'border-box', boxShadow: '0 20px 50px rgba(30,30,80,.12)', containerType: 'inline-size', color: '#1A1A1A', textAlign: 'left' }}
    >
      <Layer on={tab === 'interview'}>
        <div style={{ position: ABS, left: '20.066cqw', top: `${27.894 - LIFT}cqw`, width: '59.537cqw', fontSize: '1.433cqw', lineHeight: 1.3, textAlign: 'center', fontWeight: 500, letterSpacing: '-0.005em' }}>{t('interview.question')}</div>
        {BARS.map(([left, top, height], i) => (
          <div key={left} data-reveal="grow" data-reveal-delay={BAR_START_MS + i * BAR_STEP_MS} style={{ position: ABS, left: `${left}cqw`, top: `${top - LIFT}cqw`, width: '0.331cqw', height: `${height}cqw`, borderRadius: '999px', background: '#3A3A3A' }} />
        ))}
        <span style={{ position: ABS, left: '69.129cqw', top: `${39.691 - LIFT}cqw`, transform: 'translateY(-50%)', fontSize: '0.838cqw', lineHeight: 1.2, whiteSpace: 'nowrap', color: '#222222', fontWeight: 500 }}>{time}</span>
        <div style={{ position: ABS, left: '42.889cqw', top: `${47.519 - LIFT}cqw`, width: '13.782cqw', height: '2.646cqw', borderRadius: '999px', background: '#4B4DF7' }} />
        <span style={{ position: ABS, left: '49.779cqw', top: `${48.842 - LIFT}cqw`, transform: 'translate(-50%, -50%)', fontSize: '0.948cqw', lineHeight: 1.2, whiteSpace: 'nowrap', color: '#FFFFFF', fontWeight: 500 }}>{t('interview.send')}</span>
      </Layer>

      <Layer on={tab === 'questions'}>
        <span style={{ position: ABS, left: '49.945cqw', top: `${29.107 - LIFT}cqw`, transform: 'translate(-50%, -50%)', fontSize: '0.882cqw', lineHeight: 1.2, whiteSpace: 'nowrap', color: '#222222', fontWeight: 500 }}>{time}</span>
        <div style={{ position: ABS, left: '27.563cqw', top: `${32.745 - LIFT}cqw`, width: '44.763cqw', fontSize: '1.367cqw', lineHeight: 1.32, textAlign: 'center', fontWeight: 500 }}>{t('questions.question')}</div>
        {/* The design gives each choice a fixed height, set for the English
            text; stacked with the same padding and gaps, they grow with a
            longer translation instead of letting it spill out. */}
        <div style={{ position: ABS, left: '33.407cqw', top: `${41.125 - LIFT - 1}cqw`, width: '33.186cqw', display: 'flex', flexDirection: 'column', gap: '0.9cqw' }}>
          {OPTIONS.map((key) => (
            <div key={key} style={{ padding: '0.771cqw 1.102cqw', border: key === SELECTED ? '1.5px solid #3A3A3A' : '1px solid #DEDEDE', borderRadius: 7, background: '#FFFFFF', fontSize: '0.926cqw', lineHeight: 1.45, color: '#222222' }}>
              {t(`questions.options.${key}`)}
            </div>
          ))}
        </div>
      </Layer>

      {/* The avatar: one, shared, so it holds still while the screens cross-fade.
          The design places it 0.2cqw left and 0.55cqw up on the interview;
          both use the questions screen's position, centred on the window. */}
      <Halo left={39.471} top={15.876 - LIFT} />

      {/* Browser bar */}
      <div style={{ position: ABS, left: 0, top: 0, width: '100cqw', height: '3.528cqw', background: '#FFFFFF' }} />
      {(['#FF5F57', '#FEBC2E', '#28C840'] as const).map((c, i) => (
        <div key={c} style={{ position: ABS, left: `${1.213 + i * 1.5435}cqw`, top: '1.213cqw', width: '1.103cqw', height: '1.103cqw', borderRadius: '50%', background: c }} />
      ))}
      <svg {...ICON} stroke="#666" strokeWidth="1.6" style={{ position: ABS, left: '6.781cqw', top: '1.047cqw', width: '1.433cqw', height: '1.433cqw' }}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></svg>
      <svg {...ICON} stroke="#666" strokeWidth="1.8" style={{ position: ABS, left: '9.813cqw', top: '1.103cqw', width: '1.323cqw', height: '1.323cqw' }}><path d="M15 6l-6 6 6 6" /></svg>
      <svg {...ICON} stroke="#BBB" strokeWidth="1.8" style={{ position: ABS, left: '12.018cqw', top: '1.103cqw', width: '1.323cqw', height: '1.323cqw' }}><path d="M9 6l6 6-6 6" /></svg>
      <svg {...ICON} stroke="#666" strokeWidth="1.8" style={{ position: ABS, left: '27.012cqw', top: '1.103cqw', width: '1.323cqw', height: '1.323cqw' }}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M12 3v18" /></svg>
      <div style={{ position: ABS, left: '29.548cqw', top: '0.772cqw', width: '40.573cqw', height: '1.985cqw', borderRadius: 6, background: '#EFEFF0' }} />
      {/* The lock and the address are one centred row, not two absolutes as in
          the design: placed apart, they overlap once the address is set in
          Geist, which runs wider than the Inter they were measured for. */}
      <span style={{ position: ABS, left: '50.276cqw', top: '1.764cqw', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: '0.4cqw', fontSize: '0.937cqw', lineHeight: 1.2, whiteSpace: 'nowrap', color: '#444444' }}>
        <svg {...ICON} stroke="#777" strokeWidth="2" style={{ width: '0.772cqw', height: '0.772cqw' }}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
        {t('url')}
      </span>
      <svg {...ICON} stroke="#666" strokeWidth="2" style={{ position: ABS, left: '68.302cqw', top: '1.268cqw', width: '0.992cqw', height: '0.992cqw' }}><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" /></svg>
      <svg {...ICON} stroke="#555" strokeWidth="1.6" style={{ position: ABS, left: '88.754cqw', top: '1.103cqw', width: '1.323cqw', height: '1.323cqw' }}><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12l4 4 4-4" /></svg>
      <svg {...ICON} stroke="#555" strokeWidth="1.6" style={{ position: ABS, left: '91.621cqw', top: '0.992cqw', width: '1.323cqw', height: '1.323cqw' }}><path d="M12 3v12M8 7l4-4 4 4M6 11v9h12v-9" /></svg>
      <svg {...ICON} stroke="#555" strokeWidth="1.6" style={{ position: ABS, left: '94.487cqw', top: '1.103cqw', width: '1.323cqw', height: '1.323cqw' }}><path d="M12 5v14M5 12h14" /></svg>
      <svg {...ICON} stroke="#555" strokeWidth="1.6" style={{ position: ABS, left: '97.354cqw', top: '1.103cqw', width: '1.323cqw', height: '1.323cqw' }}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M4 16V6a2 2 0 0 1 2-2h10" /></svg>

      {/* Assessment header */}
      <div style={{ position: ABS, left: 0, top: '7.497cqw', width: '100cqw', height: '0.11cqw', background: '#EEEEEE' }} />
      <div style={{ position: ABS, left: '0.882cqw', top: '4.52cqw', width: '2.095cqw', height: '2.095cqw', boxSizing: 'border-box', border: '1px solid #CCCCCC', borderRadius: 3, background: '#FFFFFF' }} />
      <svg {...ICON} stroke="none" fill="#222" style={{ position: ABS, left: '1.323cqw', top: '4.906cqw', width: '1.213cqw', height: '1.213cqw' }}><rect x="3" y="3" width="8" height="8" rx="1" /><circle cx="17" cy="7" r="4" /><path d="M3 13h8v8a8 8 0 0 1-8-8z" /><path d="M13 21l8-8v8z" /></svg>
      <span style={{ position: ABS, left: '3.638cqw', top: '5.513cqw', transform: 'translateY(-50%)', fontSize: '1.058cqw', lineHeight: 1.2, whiteSpace: 'nowrap', fontWeight: 600, color: '#111111' }}>{t('assessment')}</span>
      <img src="/products/skillvue-assess.svg" alt="" style={{ position: ABS, left: '50cqw', top: '4.84cqw', transform: 'translateX(-50%)', height: LOGO }} />
      <div style={{ position: ABS, left: '87.541cqw', top: '5.237cqw', width: '4.41cqw', height: '0.441cqw', borderRadius: '999px', background: '#DCDCDC' }}>
        <div style={{ width: '1.654cqw', height: '100%', borderRadius: '999px', background: '#4B4DF7' }} />
      </div>
      <span style={{ position: ABS, left: '92.393cqw', top: '5.513cqw', transform: 'translateY(-50%)', fontSize: '0.816cqw', lineHeight: 1.2, whiteSpace: 'nowrap', color: '#333333' }}>1/6</span>
      <svg {...ICON} stroke="#444" strokeWidth="1.6" style={{ position: ABS, left: '94.653cqw', top: '4.906cqw', width: '1.213cqw', height: '1.213cqw' }}><path d="M4 5h16v11H8l-4 4z" /></svg>
      <div style={{ position: ABS, left: '95.369cqw', top: '4.3cqw', width: '1.103cqw', height: '1.103cqw', borderRadius: '50%', background: '#4B4DF7' }} />
      <span style={{ position: ABS, left: '95.921cqw', top: '4.851cqw', transform: 'translate(-50%, -50%)', fontSize: '0.662cqw', lineHeight: 1.2, whiteSpace: 'nowrap', color: '#FFFFFF', fontWeight: 600 }}>5</span>
      <svg {...ICON} stroke="#444" strokeWidth="1.6" style={{ position: ABS, left: '97.409cqw', top: '4.906cqw', width: '1.213cqw', height: '1.213cqw' }}><path d="M4 10v4h4l5 4V6L8 10zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" /></svg>

      {/* Assessment footer */}
      <span style={{ position: ABS, left: '0.882cqw', top: `${69.129 - FOOT}cqw`, transform: 'translateY(-50%)', fontSize: '0.794cqw', lineHeight: 1.2, whiteSpace: 'nowrap', color: '#333333' }}>{t.rich('poweredBy', { b: (c) => <span style={{ color: '#4B4DF7' }}>{c}</span> })}</span>
      <svg {...ICON} stroke="#666" strokeWidth="1.5" style={{ position: ABS, left: '94.542cqw', top: `${68.523 - FOOT}cqw`, width: '1.213cqw', height: '1.213cqw' }}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
      <svg {...ICON} stroke="#444" strokeWidth="1.6" style={{ position: ABS, left: '97.409cqw', top: `${68.523 - FOOT}cqw`, width: '1.213cqw', height: '1.213cqw' }}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 4.8 1c0 1.7-2.3 2-2.3 3.5M12 17h.01" /></svg>
    </div>
  );
}
