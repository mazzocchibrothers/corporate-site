'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

// The Skillvue Decide demo on /product: a seventeen-second loop of the product
// UI, drawn in HTML rather than played as a screen recording, so it stays
// sharp at any width and reads in the visitor's language. Ported from the
// design file "Skillvue Decide Demo": the screen is laid out at its design
// size, 1440 wide, scaled to the frame's width, and every element's state is a
// function of one clock, `t`, in seconds.
//
// The clock runs only while the frame is on screen, as in the design. A
// visitor who asked for reduced motion gets one still frame — the finished
// answer — the way the site's recordings pause for them.
//
// Type is the site's own: Geist, and Geist Mono for the transcript and tool
// names. The design names Inter, which the site does not load.

const W = 1440;
const LOOP = 17;
// The window is 16:9: 1440×810 where the design's is 1440×1080. The input,
// the footer and the user row move up by UP; the welcome block re-centres in
// the shorter panel; the chat window is UP shorter, and scrolls MORE_SCROLL
// further, as the answer's last lines arrive, to keep them in view.
const UP = 1080 - 810;
const WELCOME_UP = 135;
const MORE_SCROLL = 270;
// The frame a reduced-motion visitor sees: the answer fully drawn, before the
// loop fades back to the welcome screen at 16.2s.
const STILL = 15.5;
const MONO = "'Geist Mono', monospace";
// The product logo: the section's own, 1.4% of the window's width tall on
// every product screen.
const LOGO = 20.16;

// Skill match: candidate, percentage, pill colour. Their dates are copy.
const ROWS = [['olivia', '100%', '#C9F2D6'], ['ethan', '80%', '#C9F2D6'], ['marco', '79%', '#DDF5C6']] as const;
// Score chart: candidate, bar length at full growth (px of 454), score.
const BARS = [['olivia', 352, 77.8], ['ethan', 325, 74.4], ['marco', 249, 54.7], ['noah', 201, 52.7], ['isabella', 162, 54.2], ['emma', 83, 14.4]] as const;
// The cursor's path — time, x, y — and its two clicks: the input, then send.
// The first move, to the input, is twice as quick as the design's and ends at
// the same moment, so the click and the typing stay where the design put them.
const CURSOR = [[0, 980, 760 - UP], [1.1, 980, 760 - UP], [2.2, 700, 962 - UP], [4.0, 700, 962 - UP], [4.9, 1143, 1008 - UP], [5.6, 1143, 1008 - UP], [7.2, 1110, 860 - UP]] as const;
const CLICKS = [[2.35, 700, 962 - UP], [5.05, 1145, 1010 - UP]] as const;

const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeQuad = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const easeCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function DecideDemo({ label }: { label: string }) {
  const t = useTranslations('product.decide.screen');
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  // Unknown until the frame is measured, and hidden until then: a guess would
  // paint the screen at the wrong size for a frame.
  const [scale, setScale] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / W));
    ro.observe(el);
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setTime(STILL);
      return () => ro.disconnect();
    }
    // The clock: advanced only while visible, and repainted at most ~30 times
    // a second, as in the design.
    let visible = true;
    let clock = 0;
    let prev = performance.now();
    let painted = 0;
    let raf = 0;
    const io = new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; });
    io.observe(el);
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (visible) clock = (clock + (now - prev) / 1000) % LOOP;
      prev = now;
      if (!visible || now - painted < 33) return;
      painted = now;
      setTime(clock);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  const question = t('question');
  const reasoning = t('reasoning');
  const tools = t.raw('tools') as string[];
  const observations = t.raw('answer.bullets') as string[];
  const score = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  // Every value below is the design's, as a function of the clock.
  const f = (start: number, duration = 0.35) => clamp((time - start) / duration);
  const out = 1 - f(16.2, 0.5);
  let cx: number = CURSOR[0][1];
  let cy: number = CURSOR[0][2];
  for (let i = 0; i < CURSOR.length - 1; i++) {
    const [a, x1, y1] = CURSOR[i];
    const [b, x2, y2] = CURSOR[i + 1];
    if (time >= a && time <= b) {
      const k = easeCubic((time - a) / (b - a));
      cx = x1 + (x2 - x1) * k;
      cy = y1 + (y2 - y1) * k;
    } else if (time > b) {
      cx = x2;
      cy = y2;
    }
  }
  const typed = time < 5.15 ? question.slice(0, Math.floor(f(2.6, 1.3) * question.length)) : '';
  const grow = easeQuad(f(12.6, 1));
  const v = {
    welcome: Math.max(1 - f(5.15, 0.35), f(16.5, 0.5)),
    chat: out,
    title: f(6.9) * out,
    card2bg: '#fff',
    bubble: f(5.2),
    bubbleY: (1 - f(5.2)) * 10,
    thought: f(5.7),
    thoughtText: reasoning.slice(0, Math.floor(f(5.9, 0.9) * reasoning.length)),
    process: f(7.3),
    processH: 36 + 40 * Math.min(4, Math.max(0, Math.ceil((time - 7.5) / 0.4))),
    tools: tools.map((n, i) => ({ n, o: f(7.5 + i * 0.4, 0.25) })),
    r1: f(9.4), r2: f(9.7), r3: f(10), r4: f(10.4),
    table: f(11),
    rows: ROWS.map(([key, p, bg], i) => ({ n: t(`answer.candidates.${key}`), p, bg, d: t(`answer.dates.${key}`), o: f(11.1 + i * 0.15, 0.25) })),
    chart: f(11.9),
    bars: BARS.map(([key, w, value]) => ({ n: t(`answer.candidates.${key}`), w: w * grow, v: score.format(value) })),
    obs: f(13.4),
    bullets: observations.map((text, i) => ({ t: text, o: f(13.6 + i * 0.18, 0.3) })),
    btns: f(14.7),
    // The design's scroll, then the rest of the answer into the shorter window.
    scroll: -(easeQuad(f(11.8, 1.6)) * 515 + easeQuad(f(13.6, 1.3)) * MORE_SCROLL),
    inputText: typed || t('ask'),
    inputColor: typed ? '#1A1A1A' : '#888',
    caret: typed && Math.floor(time * 2.5) % 2 === 0 ? 1 : 0,
    sendS: 1 - 0.12 * Math.sin(Math.PI * f(4.98, 0.22)),
    cx,
    cy,
    cursor: 1 - f(7.0, 0.5),
    press: 1 - 0.14 * Math.max(...CLICKS.map(([c]) => Math.sin(Math.PI * f(c - 0.08, 0.2)))),
    clicks: CLICKS.map(([c, x, y]) => {
      const k = f(c, 0.55);
      return { x, y, o: time >= c && k < 1 ? (1 - k) * 0.55 : 0, s: 0.3 + k * 1.2 };
    }),
  };

  return (
    <div ref={ref} role="img" aria-label={label} style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#fff', borderRadius: 12, border: '1px solid #D4D4D8', boxSizing: 'border-box', boxShadow: '0 20px 50px rgba(30,30,80,.12)' }}>
    <div style={{ position: 'absolute', left: '0', top: '0', width: 1440, height: 810, transformOrigin: '0 0', transform: `scale(${scale ?? 0})`, visibility: scale === null ? 'hidden' : undefined, color: '#1A1A1A', textAlign: 'left', background: '#fff' }}>
    <div style={{ position: 'absolute', left: 15, top: 20, display: 'flex', gap: 8 }}>
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }}>
    </span>
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }}>
    </span>
    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }}>
    </span>
    </div>
    <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.6" style={{ position: 'absolute', left: 97, top: 14, width: 24, height: 24 }}>
    <rect x="3" y="5" width="18" height="14" rx="2">
    </rect>
    <path d="M9 5v14">
    </path>
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round" style={{ position: 'absolute', left: 140, top: 15, width: 22, height: 22 }}>
    <path d="M15 6l-6 6 6 6">
    </path>
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#BBB" strokeWidth="1.8" strokeLinecap="round" style={{ position: 'absolute', left: 172, top: 15, width: 22, height: 22 }}>
    <path d="M9 6l6 6-6 6">
    </path>
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" style={{ position: 'absolute', left: 388, top: 15, width: 22, height: 22 }}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z">
    </path>
    <path d="M12 3v18">
    </path>
    </svg>
    <div style={{ position: 'absolute', left: 425, top: 12, width: 585, height: 28, borderRadius: 8, background: '#EFEFF0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 14, color: '#444' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" style={{ width: 12, height: 12 }}>
    <rect x="5" y="11" width="14" height="10" rx="2">
    </rect>
    <path d="M8 11V7a4 4 0 0 1 8 0v4">
    </path>
    </svg>{t('url')}<svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" style={{ position: 'absolute', right: 10, width: 15, height: 15 }}>
    <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5">
    </path>
    </svg>
    </div>
    <div style={{ position: 'absolute', left: 1277, top: 15, display: 'flex', gap: 19 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" style={{ width: 22, height: 22 }}>
    <circle cx="12" cy="12" r="9">
    </circle>
    <path d="M12 8v8M8 12l4 4 4-4">
    </path>
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" style={{ width: 22, height: 22 }}>
    <path d="M12 3v12M8 7l4-4 4 4M6 11v9h12v-9">
    </path>
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" style={{ width: 22, height: 22 }}>
    <path d="M12 5v14M5 12h14">
    </path>
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" style={{ width: 22, height: 22 }}>
    <rect x="8" y="8" width="12" height="12" rx="2">
    </rect>
    <path d="M4 16V6a2 2 0 0 1 2-2h10">
    </path>
    </svg>
    </div>
    <img src="/products/skillvue-decide.svg" alt="" style={{ position: 'absolute', left: 20, top: 67.42, height: LOGO }} />
    <div style={{ position: 'absolute', left: 8, top: 108, width: 240, display: 'flex', flexDirection: 'column', gap: '0', fontSize: 14.5, color: '#444' }}>
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 9, paddingLeft: 8 }}>
    <span style={{ width: 22, height: 22, border: '1px solid #CCC', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
    <svg viewBox="0 0 24 24" style={{ width: 14, height: 14 }}>
    <rect x="3" y="3" width="8" height="8" rx="1" fill="#222">
    </rect>
    <circle cx="17" cy="7" r="4" fill="#222">
    </circle>
    <path d="M3 13h8v8a8 8 0 0 1-8-8z" fill="#222">
    </path>
    <path d="M13 21l8-8v8z" fill="#222">
    </path>
    </svg>
    </span>{t('workspace')}</div>
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 12, background: '#EBEBEB', borderRadius: 8, color: '#1A1A1A' }}>
    <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%,#FFB08A,#F46B6B 55%,#9B7BFF)' }}>
    </span>{t('nav.chats')}</div>
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 12 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.6" style={{ width: 16, height: 16 }}>
    <rect x="3" y="7" width="18" height="13" rx="2">
    </rect>
    <path d="M9 7V4h6v3M9 7v13M15 7v13">
    </path>
    </svg>{t('nav.jobs')}</div>
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 12 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.6" style={{ width: 16, height: 16 }}>
    <circle cx="9" cy="8" r="3.5">
    </circle>
    <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2 .8 3 2.8 3 6">
    </path>
    </svg>{t('nav.people')}</div>
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 12 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.6" style={{ width: 16, height: 16 }}>
    <path d="M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3zM21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z">
    </path>
    </svg>{t('nav.skills')}</div>
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 12 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.6" style={{ width: 16, height: 16 }}>
    <rect x="5" y="4" width="14" height="17" rx="2">
    </rect>
    <path d="M9 4V3h6v1M9 13l2 2 4-4">
    </path>
    </svg>{t('nav.assessments')}</div>
    <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 12 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.6" style={{ width: 16, height: 16 }}>
    <path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z">
    </path>
    </svg>{t('nav.campaigns')}</div>
    </div>
    <div style={{ position: 'absolute', left: 16, top: 1036 - UP, width: 232, display: 'flex', alignItems: 'center', gap: 9, fontSize: 14.5, color: '#444' }}>
    <span style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid #CCC', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{t('user').charAt(0)}</span>{t('user')}<svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.6" style={{ marginLeft: 'auto', width: 16, height: 16 }}>
    <rect x="3" y="4" width="18" height="16" rx="2">
    </rect>
    <path d="M9 4v16M16 10l-2 2 2 2">
    </path>
    </svg>
    </div>
    <div style={{ position: 'absolute', left: 264, top: 60, width: 87, height: 36, borderRadius: 8, background: '#EBEBEB', display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 13, boxSizing: 'border-box', fontSize: 14.5 }}>
    <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%,#FFB08A,#F46B6B 55%,#9B7BFF)' }}>
    </span>{t('nav.chats')}</div>
    <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.6" strokeLinecap="round" style={{ position: 'absolute', left: 356, top: 71, width: 14, height: 14 }}>
    <path d="M12 5v14M5 12h14">
    </path>
    </svg>
    <div style={{ position: 'absolute', left: 264, top: 104, width: 1168, height: 964 - UP, border: '1px solid #EEE', borderRadius: 8, boxSizing: 'border-box', background: '#fff' }}>
    </div>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" style={{ position: 'absolute', left: 286, top: 120, width: 20, height: 20 }}>
    <rect x="4" y="4" width="16" height="16" rx="1.5">
    </rect>
    <path d="M14 4v16M8 10l2 2-2 2">
    </path>
    </svg>
    <div style={{ position: 'absolute', left: 320, top: 121, fontSize: 14, fontWeight: '500', opacity: v.title }}>{t('chatTitle')}</div>
    <div style={{ position: 'absolute', left: 264, top: 380 - WELCOME_UP, width: 1168, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: v.welcome, pointerEvents: 'none' }}>
    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%,#FFC29A 0%,#F7877A 45%,#9A86F0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 26 }}>
    <svg viewBox="0 0 24 24" style={{ width: 16, height: 16 }}>
    <path d="M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" fill="rgba(255,255,255,.35)">
    </path>
    </svg>
    </div>
    <div style={{ fontSize: 30, fontWeight: '600', letterSpacing: '-0.01em', marginTop: 18 }}>{t('welcome.title')}</div>
    <div style={{ fontSize: 12, color: '#555', letterSpacing: '0.03em', marginTop: 28 }}>{t('welcome.quickStarts')}</div>
    <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
    <div style={{ width: 242, minHeight: 86, border: '1px solid #DDD', borderRadius: 8, padding: '9px 8px', boxSizing: 'border-box', fontSize: 14 }}>
    <div style={{ fontWeight: '500' }}>{t('welcome.skill.title')}</div>
    <div style={{ color: '#666', marginTop: 11, lineHeight: '1.35' }}>{t('welcome.skill.body')}</div>
    </div>
    <div style={{ width: 242, minHeight: 86, border: '1px solid #DDD', borderRadius: 8, padding: '9px 8px', boxSizing: 'border-box', fontSize: 14, background: v.card2bg }}>
    <div style={{ fontWeight: '500' }}>{t('welcome.assessment.title')}</div>
    <div style={{ color: '#666', marginTop: 11, lineHeight: '1.35' }}>{t('welcome.assessment.body')}</div>
    </div>
    <div style={{ width: 242, minHeight: 86, border: '1px solid #DDD', borderRadius: 8, padding: '9px 8px', boxSizing: 'border-box', fontSize: 14 }}>
    <div style={{ fontWeight: '500' }}>{t('welcome.report.title')}</div>
    <div style={{ color: '#666', marginTop: 11, lineHeight: '1.35' }}>{t('welcome.report.body')}</div>
    </div>
    </div>
    </div>
    <div style={{ position: 'absolute', left: '0', top: 148, width: 1440, height: 770 - UP, overflow: 'hidden', opacity: v.chat }}>
    <div style={{ position: 'absolute', left: '0', top: '0', width: 1440, height: 1400, transform: `translateY(${v.scroll}px)` }}>
    <div style={{ position: 'absolute', left: 576, top: 19, width: 596, height: 40, borderRadius: 10, background: '#F4F4F4', fontSize: 14, lineHeight: '40px', paddingLeft: 11, boxSizing: 'border-box', opacity: v.bubble, transform: `translateY(${v.bubbleY}px)` }}>{t('question')}</div>
    <div style={{ position: 'absolute', left: 524, top: 74, width: 648, height: 112, border: '1px solid #E6E6E6', borderRadius: 8, boxSizing: 'border-box', padding: '8px 7px', opacity: v.thought }}>
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: '500' }}>{t('thought')}<span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: '500', color: '#444' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" style={{ width: 14, height: 14 }}>
    <circle cx="12" cy="12" r="8.5">
    </circle>
    <path d="M12 7v5l3 2">
    </path>
    </svg>{t('thoughtFor')}<svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" style={{ width: 15, height: 15, marginLeft: 12 }}>
    <path d="M6 9l6 6 6-6">
    </path>
    </svg>
    </span>
    </div>
    <div style={{ fontFamily: MONO, fontSize: 11.5, lineHeight: '16px', color: '#555', marginTop: 15, whiteSpace: 'pre-wrap' }}>{v.thoughtText}</div>
    </div>
    <div style={{ position: 'absolute', left: 524, top: 200, width: 648, border: '1px solid #E6E6E6', borderRadius: 8, boxSizing: 'border-box', overflow: 'hidden', opacity: v.process, height: `${v.processH}px` }}>
    <div style={{ height: 36, display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: 14, fontWeight: '500' }}>{t('process')}<svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" style={{ width: 15, height: 15, marginLeft: 'auto' }}>
    <path d="M6 9l6 6 6-6">
    </path>
    </svg>
    </div>{v.tools.map((tl, i0) => (<Fragment key={i0}>
    <div style={{ height: 40, borderTop: '1px solid #EEE', display: 'flex', alignItems: 'center', gap: 13, padding: '0 9px 0 13px', fontFamily: MONO, fontSize: 12, color: '#444', opacity: tl.o }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#3BB273" strokeWidth="2" strokeLinecap="round" style={{ width: 14, height: 14 }}>
    <path d="M5 12l5 5 9-10">
    </path>
    </svg>{tl.n}<svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" style={{ width: 15, height: 15, marginLeft: 'auto' }}>
    <path d="M9 6l6 6-6 6">
    </path>
    </svg>
    </div>
    </Fragment>))}</div>
    <div style={{ position: 'absolute', left: 539, top: 410, width: 610, fontSize: 14, lineHeight: '18px' }}>
    <div style={{ opacity: v.r1 }}>{t('answer.intro')}</div>
    <div style={{ fontWeight: '600', marginTop: 18, opacity: v.r2 }}>{t('answer.ranking')}</div>
    <div style={{ marginTop: 18, opacity: v.r3 }}>{t.rich('answer.overview', { b: (c) => <b style={{ fontWeight: 600 }}>{c}</b> })}</div>
    <div style={{ marginTop: 18, opacity: v.r4 }}>{t('answer.rankedBelow')}</div>
    </div>
    <div style={{ position: 'absolute', left: 539, top: 569, width: 619, border: '1px solid #DDD', boxSizing: 'border-box', fontSize: 14, opacity: v.table }}>
    <div style={{ display: 'grid', gridTemplateColumns: '206px 206px 1fr', height: 34, background: '#F4F4F4', alignItems: 'center' }}>
    <span style={{ paddingLeft: 8 }}>{t('answer.table.candidate')}</span>
    <span style={{ paddingLeft: 7, borderLeft: '1px solid #DDD', height: '100%', display: 'flex', alignItems: 'center' }}>{t('answer.table.match')}</span>
    <span style={{ paddingLeft: 7, borderLeft: '1px solid #DDD', height: '100%', display: 'flex', alignItems: 'center' }}>{t('answer.table.date')}</span>
    </div>{v.rows.map((r, i1) => (<Fragment key={i1}>
    <div style={{ display: 'grid', gridTemplateColumns: '206px 206px 1fr', height: 37, borderTop: '1px solid #DDD', alignItems: 'center', opacity: r.o }}>
    <span style={{ paddingLeft: 8 }}>{r.n}</span>
    <span style={{ paddingLeft: 7, borderLeft: '1px solid #DDD', height: '100%', display: 'flex', alignItems: 'center' }}>
    <span style={{ fontSize: 11.5, padding: '3px 7px', borderRadius: 999, background: r.bg, color: '#1D6B3A' }}>{r.p}</span>
    </span>
    <span style={{ paddingLeft: 7, borderLeft: '1px solid #DDD', height: '100%', display: 'flex', alignItems: 'center', fontSize: 12, color: '#666' }}>{r.d}</span>
    </div>
    </Fragment>))}</div>
    <div style={{ position: 'absolute', left: 539, top: 729, width: 619, height: 289, border: '1px solid #EEE', borderRadius: 6, boxSizing: 'border-box', padding: '9px 8px', opacity: v.chart }}>
    <div style={{ fontSize: 14.5 }}>{t('answer.chartTitle')}</div>
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>{v.bars.map((b, i2) => (<Fragment key={i2}>
    <div style={{ height: 35, display: 'flex', alignItems: 'center', fontSize: 13.5 }}>
    <span style={{ width: 108, paddingLeft: 2 }}>{b.n}</span>
    <span style={{ position: 'relative', width: 454, height: 6, borderRadius: 999, background: '#EEE' }}>
    <span style={{ position: 'absolute', left: '0', top: '0', height: 6, borderRadius: 999, background: '#4B4DF7', width: `${b.w}px` }}>
    </span>
    </span>
    <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: '600' }}>{b.v}</span>
    </div>
    </Fragment>))}</div>
    <div style={{ fontSize: 14, textDecoration: 'underline', marginTop: 12, paddingLeft: 4 }}>{t('answer.expand')}</div>
    </div>
    <div style={{ position: 'absolute', left: 539, top: 1039, width: 622, fontSize: 13.5, lineHeight: '18.5px' }}>
    <div style={{ fontWeight: '600', fontSize: 14, opacity: v.obs }}>{t('answer.observations')}</div>
    <div style={{ marginTop: 17, display: 'flex', flexDirection: 'column' }}>{v.bullets.map((bl, i3) => (<Fragment key={i3}>
    <div style={{ display: 'flex', gap: 11, paddingLeft: 7, opacity: bl.o }}>
    <span >•</span>
    <span >{bl.t}</span>
    </div>
    </Fragment>))}</div>
    <div style={{ display: 'flex', gap: 9, marginTop: 11, opacity: v.btns }}>
    <span style={{ height: 36, padding: '0 16px', border: '1px solid #DDD', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: '500' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" style={{ width: 18, height: 18 }}>
    <rect x="8" y="8" width="12" height="12" rx="2">
    </rect>
    <path d="M4 16V6a2 2 0 0 1 2-2h10">
    </path>
    </svg>{t('copy')}</span>
    <span style={{ height: 36, padding: '0 16px', border: '1px solid #DDD', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: '500' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" style={{ width: 18, height: 18 }}>
    <path d="M12 4v11M8 11l4 4 4-4M4 17v3h16v-3">
    </path>
    </svg>{t('export')}</span>
    <span style={{ height: 36, padding: '0 16px', border: '1px solid #DDD', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: '500' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" style={{ width: 18, height: 18 }}>
    <path d="M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-2">
    </path>
    </svg>{t('refresh')}</span>
    </div>
    </div>
    </div>
    </div>
    <div style={{ position: 'absolute', left: 523, top: 926 - UP, width: 650, height: 112, border: '1px solid #CFCFCF', borderRadius: 14, boxSizing: 'border-box', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
    <div style={{ position: 'absolute', left: 20, top: 17, fontSize: 16, color: v.inputColor, whiteSpace: 'nowrap' }}>{v.inputText}<span style={{ opacity: v.caret }}>|</span>
    </div>
    <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.6" strokeLinecap="round" style={{ position: 'absolute', left: 19, top: 75, width: 18, height: 18 }}>
    <path d="M12 5v14M5 12h14">
    </path>
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.6" strokeLinecap="round" style={{ position: 'absolute', left: 574, top: 75, width: 16, height: 16 }}>
    <path d="M6 9l6 6 6-6">
    </path>
    </svg>
    <span style={{ position: 'absolute', left: 605, top: 67, width: 32, height: 32, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${v.sendS})` }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" style={{ width: 16, height: 16 }}>
    <path d="M12 19V5M6 11l6-6 6 6">
    </path>
    </svg>
    </span>
    </div>
    <div style={{ position: 'absolute', left: 264, top: 1046 - UP, width: 1168, textAlign: 'center', fontSize: 11.5, color: '#555', opacity: v.welcome }}>{t('disclaimer')}</div>{v.clicks.map((ck, i4) => (<Fragment key={i4}>
    <span style={{ position: 'absolute', left: `${ck.x}px`, top: `${ck.y}px`, width: 44, height: 44, margin: '-22px 0 0 -22px', borderRadius: '50%', background: 'rgba(75,77,247,.35)', border: '2px solid rgba(75,77,247,.6)', boxSizing: 'border-box', opacity: ck.o, transform: `scale(${ck.s})`, pointerEvents: 'none' }}>
    </span>
    </Fragment>))}<svg viewBox="0 0 24 24" style={{ position: 'absolute', left: '0', top: '0', width: 30, height: 30, transform: `translate(${v.cx}px,${v.cy}px) scale(${v.press})`, transformOrigin: '3px 2px', opacity: v.cursor, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.3))' }}>
    <path d="M3 2l18 8-8 2.5L10 21z" fill="#111" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round">
    </path>
    </svg>
    </div>
    </div>
  );
}
