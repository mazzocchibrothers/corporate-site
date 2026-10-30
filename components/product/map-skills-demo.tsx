'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

// The Skills screen of the Skillvue Map tabs on /product: a twenty-two-second
// loop in which the cursor explores the skills map — hovering bubbles, opening
// three skills — then asks the assistant about one. Drawn in HTML from the
// design file "Skillvue Map Skills Demo"; every element's state is a function
// of one clock, `t`, in seconds.
//
// It is a layer of <MapScreens>, in its 1680-unit space, and draws only the
// design's two panels, the cursor and its clicks: the browser bar, sidebar,
// search and user row are <MapScreens>' own, shared by all three tabs. The
// panels are placed with their corner on Job architecture's panel (293, 122)
// and scaled by K, the most that keeps the chat input clear of the frame's
// bottom edge. The map panel is DX wider than the design's and the chat panel
// DX further right, so the pair reaches closer to the window's right edge; the
// panel title takes Job architecture's size and place.
//
// The clock starts from zero each time the tab is chosen and runs only while
// the tab is showing and the frame is on screen. A visitor who
// asked for reduced motion gets one still frame — the answer, with the
// International Taxation skill open.
//
// Type is the site's own: Geist, and Geist Mono for the transcript. The design
// names Inter, which the site does not load.

// Design units to <MapScreens>' units, and where the design's panel corner
// (252, 65) lands.
const K = 1.12;
const TX = 293 - 252 * K;
const TY = 122 - 65 * K;
const DX = 63.5;
// The window is 16:9 (<MapScreens>): the panels are PANEL_H tall, not 950, so
// they end where Job architecture's does. The map lifts by MAP_LIFT into the
// space above its clusters; the chat input moves up by INPUT_UP, and the
// conversation scrolls by CHAT_SCROLL as the answer's last lines arrive.
const PANEL_H = 726;
const MAP_LIFT = 85;
const INPUT_UP = 950 - PANEL_H;
const CHAT_SCROLL = 135;
const WELCOME_UP = 115;
const LOOP = 22;
const STILL = 20.5;
const MONO = "'Geist Mono', monospace";

// The map is drawn in page coordinates; its panel starts at OX, OY.
const OX = 252;
const OY = 65;
// Department clusters: key, centre x, centre y, radius, border, fill, label x, label y, label colour.
const CLUSTERS = [
  ['business', 575, 503, 151, '#B9B9E6', '#F6F6FC', 575, 332, '#5B5DB8'],
  ['it', 880, 533, 141, '#A9D6CB', '#F3FAF8', 872, 371, '#2E8B7A'],
  ['manufacturing', 357, 571, 70, '#C9B8E6', '#F9F6FC', 345, 478, '#8A6BB8'],
  ['engineering', 454, 697, 45, '#CFD3B3', '#FAFBF4', 454, 637, '#7E8F4E'],
  ['administration', 575, 745, 50, '#B4CDE6', '#F4F8FC', 575, 683, '#4F86B8'],
  ['hr', 706, 742, 76, '#B6DCC4', '#F4FAF6', 711, 654, '#3E9A6A'],
  ['marketing', 873, 782, 80, '#E8C3BD', '#FCF5F4', 873, 694, '#C8705F'],
] as const;
// Bubble fill and border, per cluster.
const BUBBLE_COLOURS = [['#E2E2F5', '#C8C8EC'], ['#DDEFEA', '#B9DCD2'], ['#EAE2F5', '#CFC2E8'], ['#ECEEE0', '#D4D8BE'], ['#DEEAF6', '#BCD3EA'], ['#DEF0E4', '#BCDDC8'], ['#F6E2DF', '#EAC6C0']] as const;
// Skill bubbles per cluster: centre x, centre y, radius.
const BUBBLES: [number, (readonly [number, number, number])[]][] = [
  [0, [[484, 418, 21], [541, 410, 9], [524, 438, 17], [644, 440, 18], [491, 463, 17], [456, 484, 17], [536, 489, 28], [579, 489, 9], [626, 492, 28], [488, 507, 16], [459, 543, 23], [518, 551, 30], [580, 533, 28], [652, 566, 46], [570, 604, 38]]],
  [1, [[816, 460, 18], [850, 446, 9], [882, 447, 16], [922, 435, 16], [848, 470, 9], [872, 478, 9], [914, 484, 29], [958, 488, 9], [768, 514, 21], [811, 502, 18], [851, 503, 16], [881, 515, 9], [940, 522, 9], [972, 519, 18], [802, 540, 16], [829, 527, 8], [862, 541, 17], [907, 542, 21], [771, 567, 17], [810, 577, 17], [850, 581, 17], [882, 567, 9], [954, 563, 23], [876, 602, 9], [817, 622, 21], [853, 614, 9], [911, 591, 21], [956, 614, 23], [887, 617, 9], [867, 643, 16], [918, 640, 14]]],
  [2, [[338, 545, 23], [390, 548, 23], [363, 584, 17], [330, 584, 9], [311, 600, 9], [339, 614, 16], [371, 614, 10]]],
  [3, [[454, 675, 17], [441, 705, 9], [467, 705, 9], [454, 727, 9]]],
  [4, [[569, 717, 16], [552, 753, 16], [596, 753, 22], [570, 779, 9]]],
  [5, [[683, 702, 23], [729, 705, 16], [676, 741, 9], [709, 740, 17], [683, 773, 17], [729, 782, 23]]],
  [6, [[890, 734, 20], [855, 743, 9], [926, 745, 9], [832, 780, 9], [869, 773, 17], [909, 773, 16], [889, 799, 9], [852, 823, 29], [921, 811, 16]]],
];
// The three skills the cursor opens: key, category dot, the roles' expected
// levels (role, level, filled segments of four), and when the popover is open.
const POPS = [
  { key: 'business', dot: '#DCDCF2', a: 1.5, b: 2.95, levels: [['director', 'advanced', 3], ['strategy', 'advanced', 3], ['analyst', 'qualified', 2], ['commercial', 'qualified', 2], ['intelligence', 'qualified', 2]] },
  { key: 'it', dot: '#BFE3D9', a: 4.1, b: 5.35, levels: [['architect', 'advanced', 3], ['platform', 'advanced', 3], ['devops', 'qualified', 2], ['software', 'qualified', 2], ['data', 'qualified', 2]] },
  { key: 'tax', dot: '#5B5FC7', a: 7.25, b: 21.3, levels: [['expert', 'advanced', 3], ['manager', 'advanced', 3], ['member', 'qualified', 2], ['middle', 'qualified', 2], ['multi', 'qualified', 2]] },
] as const;
const ROLE_ROWS = [['expert', 'advanced'], ['manager', 'advanced'], ['member', 'qualified']] as const;
// The cursor's path — time, x, y — and its five clicks.
// Over the map they rise with it, by MAP_LIFT; at the input, by INPUT_UP.
const CURSOR = [[0, 720, 640 - MAP_LIFT], [0.9, 660, 578 - MAP_LIFT], [3.0, 660, 578 - MAP_LIFT], [3.7, 918, 490 - MAP_LIFT], [5.4, 918, 490 - MAP_LIFT], [6.6, 598, 756 - MAP_LIFT], [7.5, 598, 756 - MAP_LIFT], [8.4, 1236, 540], [8.9, 1236, 540], [9.5, 1160, 906 - INPUT_UP], [12.4, 1160, 906 - INPUT_UP], [12.9, 1376, 960 - INPUT_UP], [13.6, 1376, 960 - INPUT_UP], [14.4, 1300, 820 - INPUT_UP]] as const;
const CLICKS = [[1.4, 660, 578 - MAP_LIFT], [4.0, 918, 490 - MAP_LIFT], [7.1, 598, 756 - MAP_LIFT], [9.6, 1160, 906 - INPUT_UP], [13.1, 1376, 960 - INPUT_UP]] as const;

const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const overChat = (x: number) => (x >= 1042 ? x + DX : x);
const cursorOn = (cx: number, cy: number, x: number, y: number, r: number) => Math.hypot(cx - x, cy - y) < r + 2;

export function MapSkillsDemo({ active }: { active: boolean }) {
  const t = useTranslations('product.map.screens');
  const ref = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);

  // The clock, restarted each time the tab is chosen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setTime(STILL);
      return;
    }
    let visible = true;
    let clock = 0;
    let prev = performance.now();
    let painted = 0;
    let raf = 0;
    setTime(0);
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
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [active]);

  const question = t('chat.question');
  const reasoning = t('chat.reasoning');
  const answer = t('chat.answer');

  // Every value below is the design's, as a function of the clock.
  const f = (start: number, duration = 0.35) => clamp((time - start) / duration);
  const out = 1 - f(21.3, 0.5);
  let cx: number = overChat(CURSOR[0][1]);
  let cy: number = CURSOR[0][2];
  for (let i = 0; i < CURSOR.length - 1; i++) {
    const [a, ax, y1] = CURSOR[i];
    const [b, bx, y2] = CURSOR[i + 1];
    const x1 = overChat(ax);
    const x2 = overChat(bx);
    if (time >= a && time <= b) {
      const k = easeCubic((time - a) / (b - a));
      cx = x1 + (x2 - x1) * k;
      cy = y1 + (y2 - y1) * k;
    } else if (time > b) {
      cx = x2;
      cy = y2;
    }
  }
  const anyPop = POPS.some((p) => time >= p.a - 0.1 && time < p.b);
  const bubbles = BUBBLES.flatMap(([c, list]) => list.map(([x, y, r]) => {
    const hover = !anyPop && cursorOn(cx, cy, x, y - MAP_LIFT, r) && time < 8.4;
    return {
      l: x - r - OX, t: y - r - OY - MAP_LIFT, d: r * 2, bg: BUBBLE_COLOURS[c][0], bd: hover ? CLUSTERS[c][4] : BUBBLE_COLOURS[c][1],
      s: hover ? 1.06 : 1, sh: hover ? '0 4px 14px rgba(0,0,0,.14)' : 'none',
    };
  }));
  const typed = time >= 9.9 && time < 13.15 ? question.slice(0, Math.floor(f(9.9, 2.3) * question.length)) : '';
  const done = time >= 15.9;
  const v = {
    clusters: CLUSTERS.map(([key, x, y, r, bd, bg, lx, ly, lc]) => ({ l: x - r - OX, t: y - r - OY - MAP_LIFT, d: r * 2, bd, bg, label: t(`skills.clusters.${key}`), lx: lx - OX, ly: ly - OY - MAP_LIFT, lc })),
    bubbles,
    pops: POPS.map((p) => {
      const k = Math.min(f(p.a, 0.25), 1 - f(p.b, 0.25));
      return {
        dot: p.dot, cat: t(`skills.pops.${p.key}.category`), title: t(`skills.pops.${p.key}.skill`), sub: t(`skills.pops.${p.key}.subSkill`), req: t(`skills.pops.${p.key}.required`),
        o: k, y: (1 - k) * 6, s: 0.98 + 0.02 * k,
        levels: p.levels.map(([role, level, n]) => ({ t: t(`skills.pops.${p.key}.roles.${role}`), l: t(`levels.${level}`), segs: [0, 1, 2, 3].map((i) => ({ c: i < n ? '#22B07D' : '#DDDDDD' })) })),
      };
    }),
    welcome: Math.max(1 - f(13.25, 0.35), f(21.3, 0.5)),
    chat: f(13.3, 0.4) * out,
    ub: f(13.45, 0.3) * out,
    ubY: (1 - f(13.45, 0.3)) * 8,
    th: f(14.0, 0.3) * out,
    thText: reasoning.slice(0, Math.floor(f(14.3, 1.4) * reasoning.length)),
    thLabel: time < 15.7 ? t('chat.thinking') : t('chat.thoughtFor'),
    tc: f(15.9, 0.3) * out,
    chkBg: done && time >= 16.4 ? '#DFF5E6' : '#EEE',
    chkC: time >= 16.4 ? '#22A06B' : '#999',
    chkD: time >= 16.4 ? 'M5 12l5 5 9-10' : 'M8 12h8',
    kr: f(16.8, 0.3) * out,
    tb: f(17.2, 0.3) * out,
    rows: ROLE_ROWS.map(([role, level], i) => ({ r: t(`chat.roles.${role}`), l: t(`levels.${level}`), o: f(17.35 + i * 0.18, 0.25) })),
    chatScroll: easeCubic(f(18.3, 1.0)) * CHAT_SCROLL,
    sum: time < 21.8 ? answer.slice(0, Math.floor(f(18.0, 1.0) * answer.length)) : '',
    bt: f(19.1, 0.3) * out,
    inText: typed || t('chat.ask'),
    inColor: typed ? '#1A1A1A' : '#777',
    caret: time >= 9.7 && time < 13.15 && Math.floor(time * 2.5) % 2 === 0 ? 1 : 0,
    sendS: 1 - 0.12 * Math.sin(Math.PI * f(13.02, 0.22)),
    cx,
    cy,
    cursor: Math.min(f(0, 0.3), 1 - f(14.2, 0.5)),
    press: 1 - 0.14 * Math.max(...CLICKS.map(([c]) => Math.sin(Math.PI * f(c - 0.08, 0.2)))),
    clicks: CLICKS.map(([c, x, y]) => {
      const k = f(c, 0.55);
      return { x: overChat(x), y, o: time >= c && k < 1 ? (1 - k) * 0.55 : 0, s: 0.3 + k * 1.2 };
    }),
  };

  return (
    <div ref={ref} style={{ position: 'absolute', left: 0, top: 0, width: 1440, height: 1024, transformOrigin: '0 0', transform: `translate(${TX}px, ${TY}px) scale(${K})`, color: '#1A1A1A', textAlign: 'left', opacity: active ? 1 : 0, transition: 'opacity 400ms ease', pointerEvents: 'none' }}>
    <div style={{ position: 'absolute', left: 252, top: 65, width: 780 + DX, height: PANEL_H, border: '1px solid #EBEBEB', borderRadius: 12, boxSizing: 'border-box', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: (312 - 293) / K, top: (145 - 122) / K, fontSize: 24 / K, fontWeight: '600', letterSpacing: '-0.01em' }}>{t('nav.skills')}</div>
    <div style={{ position: 'absolute', left: 636 + DX, top: 15, width: 128, height: 35, border: '1px solid #EAEAEA', borderRadius: 7, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: 3, gap: 6, fontSize: 14 }}>
    <span style={{ height: 27, padding: '0 8px', borderRadius: 5, background: '#EBEBEC', display: 'flex', alignItems: 'center' }}>{t('explore')}</span>
    <span style={{ color: '#666' }}>{t('skills.table')}</span>
    </div>
    <div style={{ position: 'absolute', left: 14, top: 51, width: 353, height: 114, border: '1px solid #EBEBEB', borderRadius: 9, boxSizing: 'border-box' }}>
    <div style={{ position: 'absolute', left: 15, top: 15, width: 321, height: 37, border: '1px solid #E6E6E6', borderRadius: 7, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 7, padding: '0 9px', fontSize: 14, color: '#666' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" style={{ width: 17, height: 17 }}>
    <circle cx="11" cy="11" r="7">
    </circle>
    <path d="M20 20l-4-4">
    </path>
    </svg>{t('skills.search')}</div>
    <div style={{ position: 'absolute', left: 15, top: 60, width: 321, height: 36, border: '1px solid #EBEBEB', borderRadius: 7, boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: 3, fontSize: 14, color: '#444' }}>
    <span style={{ borderRadius: 5, background: '#EBEBEC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111' }}>{t('skills.all')}</span>
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t('skills.soft')}</span>
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t('skills.hard')}</span>
    </div>
    </div>{v.clusters.map((c, i0) => (<Fragment key={i0}>
    <div style={{ position: 'absolute', left: `${c.l}px`, top: `${c.t}px`, width: `${c.d}px`, height: `${c.d}px`, borderRadius: '50%', border: `1.3px dashed ${c.bd}`, background: c.bg, boxSizing: 'border-box' }}>
    </div>
    <div style={{ position: 'absolute', left: `${c.lx}px`, top: `${c.ly}px`, transform: 'translate(-50%,-50%)', fontSize: 12, fontWeight: '600', color: c.lc, whiteSpace: 'pre', lineHeight: '16px', textAlign: 'center' }}>{c.label}</div>
    </Fragment>))}{v.bubbles.map((b, i1) => (<Fragment key={i1}>
    <span style={{ position: 'absolute', left: `${b.l}px`, top: `${b.t}px`, width: `${b.d}px`, height: `${b.d}px`, borderRadius: '50%', background: b.bg, border: `1.2px solid ${b.bd}`, boxSizing: 'border-box', transform: `scale(${b.s})`, boxShadow: b.sh, transition: 'transform 180ms ease,box-shadow 180ms ease' }}>
    </span>
    </Fragment>))}<div style={{ position: 'absolute', left: 302, top: 352, width: 56, height: 56, borderRadius: '50%', background: '#5B5FC7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ width: 15, height: 15, borderRadius: '50%', background: '#fff' }}>
    </span>
    </div>{v.pops.map((p, i2) => (<Fragment key={i2}>
    <div style={{ position: 'absolute', left: 89, top: 416 - MAP_LIFT, width: 553, height: 362, borderRadius: 10, background: '#fff', boxShadow: '0 10px 36px rgba(0,0,0,.12),0 0 0 1px rgba(0,0,0,.06)', overflow: 'hidden', opacity: p.o, transform: `translateY(${p.y}px) scale(${p.s})`, transformOrigin: '50% 0' }}>
    <div style={{ height: 52, background: '#F5F5F5', display: 'flex', alignItems: 'center', gap: 9, padding: '0 12px', fontSize: 12.5 }}>
    <span style={{ width: 15, height: 15, borderRadius: '50%', background: p.dot }}>
    </span>{p.cat}<svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" style={{ marginLeft: 'auto', width: 17, height: 17 }}>
    <path d="M6 6l12 12M18 6L6 18">
    </path>
    </svg>
    </div>
    <div style={{ padding: '16px 15px 0' }}>
    <div style={{ fontSize: 20, fontWeight: '600', letterSpacing: '-0.01em' }}>{p.title}</div>
    <div style={{ fontSize: 15.5, color: '#777', marginTop: 6 }}>{p.sub}</div>
    <div style={{ fontSize: 13.5, color: '#777', marginTop: 19 }}>{p.req}</div>
    <div style={{ fontSize: 14, color: '#444', marginTop: 18 }}>{t('skills.expected')}</div>
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>{p.levels.map((lv, i3) => (<Fragment key={i3}>
    <div style={{ height: 29, display: 'flex', alignItems: 'center', fontSize: 14, color: '#444' }}>
    <span style={{ display: 'flex', gap: 3, width: 63 }}>{lv.segs.map((sg, i4) => (<Fragment key={i4}>
    <span style={{ width: 10.5, height: 3.5, borderRadius: 2, background: sg.c }}>
    </span>
    </Fragment>))}</span>{lv.t}<span style={{ marginLeft: 'auto', fontSize: 12.5, color: '#666' }}>{lv.l}</span>
    </div>
    </Fragment>))}</div>
    </div>
    </div>
    </Fragment>))}<div style={{ position: 'absolute', left: 726 + DX, top: PANEL_H - 16 - 151, width: 39, height: 151, border: '1px solid #E6E6E6', borderRadius: 7, boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" style={{ width: 17, height: 17 }}>
    <path d="M12 5v14M5 12h14">
    </path>
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" style={{ width: 17, height: 17 }}>
    <path d="M5 12h14">
    </path>
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" style={{ width: 17, height: 17 }}>
    <path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5">
    </path>
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" style={{ width: 17, height: 17 }}>
    <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5">
    </path>
    </svg>
    </div>
    </div>
    <div style={{ position: 'absolute', left: 1042 + DX, top: 65, width: 376, height: PANEL_H, border: '1px solid #EBEBEB', borderRadius: 12, boxSizing: 'border-box', opacity: v.chat }}>
    </div>
    <svg viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.6" strokeLinecap="round" style={{ position: 'absolute', left: 1063 + DX, top: 80, width: 20, height: 20 }}>
    <path d="M4 6h16M4 12h16M4 18h16">
    </path>
    </svg>
    <div style={{ position: 'absolute', left: 1097 + DX, top: 81, fontSize: 14, fontWeight: '500', opacity: v.chat }}>{t('chat.title')}</div>
    <svg viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.6" style={{ position: 'absolute', left: 1376 + DX, top: 80, width: 20, height: 20 }}>
    <rect x="4" y="4" width="16" height="16" rx="1.5">
    </rect>
    <path d="M14 4v16M8 10l2 2-2 2">
    </path>
    </svg>
    <div style={{ position: 'absolute', left: 1058 + DX, top: -WELCOME_UP, width: 345, height: 1024, opacity: v.welcome }}>
    <div style={{ position: 'absolute', left: 148, top: 297, width: 48, height: 48, borderRadius: '50%', background: 'radial-gradient(circle at 30% 25%,#FFB35C,#F0566E 55%,#9B5CF0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg viewBox="0 0 24 24" fill="#fff" style={{ width: 22, height: 22 }}>
    <path d="M12 3c.8 4.6 4.4 8.2 9 9-4.6.8-8.2 4.4-9 9-.8-4.6-4.4-8.2-9-9 4.6-.8 8.2-4.4 9-9z">
    </path>
    </svg>
    </div>
    <div style={{ position: 'absolute', left: '0', top: 361, width: 345, textAlign: 'center', fontSize: 16, fontWeight: '600' }}>{t('welcome.title')}</div>
    <div style={{ position: 'absolute', left: '0', top: 412, width: 345, textAlign: 'center', fontSize: 12.5, color: '#555', letterSpacing: '0.02em' }}>{t('welcome.quickStarts')}</div>
    <div style={{ position: 'absolute', left: '0', top: 442, width: 345, display: 'flex', flexDirection: 'column', gap: 9 }}>
    <div style={{ border: '1px solid #E3E3E3', borderRadius: 7, padding: '9px 8px 10px', display: 'flex', flexDirection: 'column', gap: 13, fontSize: 14 }}>
    <span style={{ fontWeight: '500' }}>{t('welcome.skill.title')}</span>
    <span style={{ color: '#444' }}>{t('welcome.skill.body')}</span>
    </div>
    <div style={{ border: '1px solid #E3E3E3', borderRadius: 7, padding: '9px 8px 10px', display: 'flex', flexDirection: 'column', gap: 13, fontSize: 14 }}>
    <span style={{ fontWeight: '500' }}>{t('welcome.assessment.title')}</span>
    <span style={{ color: '#444' }}>{t('welcome.assessment.body')}</span>
    </div>
    <div style={{ border: '1px solid #E3E3E3', borderRadius: 7, padding: '9px 8px 10px', display: 'flex', flexDirection: 'column', gap: 13, fontSize: 14, lineHeight: '19px' }}>
    <span style={{ fontWeight: '500' }}>{t('welcome.report.title')}</span>
    <span style={{ color: '#444' }}>{t('welcome.report.body')}</span>
    </div>
    </div>
    </div>
    <div style={{ position: 'absolute', left: 0, top: 0, width: 1440 + DX, height: 1024, clipPath: `inset(110px 0 ${1024 - (875 - INPUT_UP - 8)}px 0)` }}><div style={{ position: 'absolute', inset: 0, transform: `translateY(${-v.chatScroll}px)` }}>
    <div style={{ position: 'absolute', left: 1100 + DX, top: 124, width: 303, borderRadius: 12, background: '#EBEBEC', padding: '11px 12px', boxSizing: 'border-box', fontSize: 14.5, lineHeight: '19.5px', opacity: v.ub, transform: `translateY(${v.ubY}px)` }}>{t('chat.question')}</div>
    <div style={{ position: 'absolute', left: 1058 + DX, top: 202, width: 345, height: 135, border: '1px solid #EAEAEA', borderRadius: 8, boxSizing: 'border-box', padding: '9px 8px', opacity: v.th }}>
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: '500' }}>{t('chat.thought')}<span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#444' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" style={{ width: 15, height: 15 }}>
    <circle cx="12" cy="12" r="8.5">
    </circle>
    <path d="M12 7v5l3 2">
    </path>
    </svg>{v.thLabel}<svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" style={{ width: 16, height: 16, marginLeft: 10 }}>
    <path d="M6 9l6 6 6-6">
    </path>
    </svg>
    </span>
    </div>
    <div style={{ fontFamily: MONO, fontSize: 11.5, lineHeight: '16.8px', color: '#555', marginTop: 14, whiteSpace: 'pre-wrap' }}>{v.thText}</div>
    </div>
    <div style={{ position: 'absolute', left: 1058 + DX, top: 351, width: 345, height: 76, border: '1px solid #EAEAEA', borderRadius: 8, boxSizing: 'border-box', overflow: 'hidden', opacity: v.tc }}>
    <div style={{ height: 36, display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: 14, fontWeight: '500', borderBottom: '1px solid #EEE' }}>{t('chat.toolCall')}<svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" style={{ width: 16, height: 16, marginLeft: 'auto' }}>
    <path d="M6 9l6 6 6-6">
    </path>
    </svg>
    </div>
    <div style={{ height: 39, display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px', fontFamily: MONO, fontSize: 12, color: '#555' }}>
    <span style={{ width: 22, height: 22, borderRadius: '50%', background: v.chkBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke={v.chkC} strokeWidth="2.2" strokeLinecap="round" style={{ width: 12, height: 12 }}>
    <path d={v.chkD}>
    </path>
    </svg>
    </span>{t('chat.tool')}<svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8" style={{ width: 16, height: 16, marginLeft: 'auto' }}>
    <path d="M9 6l6 6-6 6">
    </path>
    </svg>
    </div>
    </div>
    <div style={{ position: 'absolute', left: 1074 + DX, top: 441, width: 290, fontSize: 14, lineHeight: '19.5px', opacity: v.kr }}>{t('chat.answerLead')}</div>
    <div style={{ position: 'absolute', left: 1058 + DX, top: 495, width: 345, border: '1px solid #E6E6E6', borderRadius: 5, boxSizing: 'border-box', overflow: 'hidden', fontSize: 14, opacity: v.tb }}>
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: 36, background: '#EBEBEC', alignItems: 'center' }}>
    <span style={{ paddingLeft: 8 }}>{t('chat.role')}</span>
    <span style={{ paddingLeft: 8, borderLeft: '1px solid #DDD', height: '100%', display: 'flex', alignItems: 'center' }}>{t('chat.level')}</span>
    </div>{v.rows.map((rr, i5) => (<Fragment key={i5}>
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: 36, borderTop: '1px solid #EEE', alignItems: 'center', opacity: rr.o }}>
    <span style={{ paddingLeft: 8, whiteSpace: 'nowrap' }}>{rr.r}</span>
    <span style={{ paddingLeft: 8, borderLeft: '1px solid #EEE', height: '100%', display: 'flex', alignItems: 'center', fontSize: 12.5 }}>{rr.l}</span>
    </div>
    </Fragment>))}</div>
    <div style={{ position: 'absolute', left: 1074 + DX, top: 653, width: 310, fontSize: 14, lineHeight: '19.5px' }}>{v.sum}</div>
    <div style={{ position: 'absolute', left: 1058 + DX, top: 727, display: 'flex', gap: 9, opacity: v.bt }}>
    <span style={{ height: 35, padding: '0 12px', border: '1px solid #DDD', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14.5, fontWeight: '600', boxSizing: 'border-box' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" style={{ width: 18, height: 18 }}>
    <rect x="8" y="8" width="12" height="12" rx="2">
    </rect>
    <path d="M4 16V6a2 2 0 0 1 2-2h10">
    </path>
    </svg>{t('chat.copy')}</span>
    <span style={{ height: 35, padding: '0 15px', border: '1px solid #DDD', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14.5, fontWeight: '600', boxSizing: 'border-box' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" style={{ width: 18, height: 18 }}>
    <path d="M12 4v11M8 11l4 4 4-4M4 17v3h16v-3">
    </path>
    </svg>{t('chat.export')}</span>
    <span style={{ height: 35, padding: '0 15px', border: '1px solid #DDD', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14.5, fontWeight: '600', boxSizing: 'border-box' }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" style={{ width: 18, height: 18 }}>
    <path d="M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-2">
    </path>
    </svg>{t('chat.refresh')}</span>
    </div>
    </div></div>
    <div style={{ position: 'absolute', left: 1057 + DX, top: 875 - INPUT_UP, width: 347, height: 112, border: '1px solid #DADADA', borderRadius: 12, boxSizing: 'border-box', boxShadow: '0 2px 8px rgba(0,0,0,.05)', background: '#fff' }}>
    <div style={{ position: 'absolute', left: 19, top: 16, width: 305, fontSize: 16, lineHeight: '22px', color: v.inColor }}>{v.inText}<span style={{ display: 'inline-block', width: 1.5, height: 18, background: '#1A1A1A', verticalAlign: '-3px', marginLeft: 1, opacity: v.caret }}>
    </span>
    </div>
    <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" style={{ position: 'absolute', left: 18, top: 73, width: 19, height: 19 }}>
    <path d="M12 5v14M5 12h14">
    </path>
    </svg>
    <span style={{ position: 'absolute', left: 301, top: 67, width: 32, height: 32, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${v.sendS})` }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" style={{ width: 16, height: 16 }}>
    <path d="M12 19V5M6 11l6-6 6 6">
    </path>
    </svg>
    </span>
    </div>
    <div style={{ position: 'absolute', left: 1042 + DX, top: 993 - INPUT_UP, width: 376, textAlign: 'center', fontSize: 11, color: '#555' }}>{t('chat.disclaimer')}</div>{v.clicks.map((ck, i6) => (<Fragment key={i6}>
    <span style={{ position: 'absolute', left: `${ck.x}px`, top: `${ck.y}px`, width: 44, height: 44, margin: '-22px 0 0 -22px', borderRadius: '50%', background: 'rgba(75,77,247,.35)', border: '2px solid rgba(75,77,247,.6)', boxSizing: 'border-box', opacity: ck.o, transform: `scale(${ck.s})`, pointerEvents: 'none' }}>
    </span>
    </Fragment>))}<svg viewBox="0 0 24 24" style={{ position: 'absolute', left: '0', top: '0', width: 34, height: 34, transform: `translate(${v.cx}px,${v.cy}px) scale(${v.press})`, transformOrigin: '3px 2px', opacity: v.cursor, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.3))' }}>
    <path d="M3 2l18 8-8 2.5L10 21z" fill="#111" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round">
    </path>
    </svg>
    </div>
  );
}
