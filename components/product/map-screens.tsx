'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapSkillsDemo } from '@/components/product/map-skills-demo';
import { StaggerReveal } from '@/components/product/stagger-reveal';

// The Skillvue Map product UI on /product, drawn in HTML rather than shown as a
// screenshot, so it stays sharp at any width and reads in the visitor's
// language. Ported from the design file "Skillvue Map Screens": the screen is
// laid out 1680 wide, and scaled to the frame's width.
//
// All three screens are always mounted and the tab cross-fades between them,
// as in the design. Job architecture and Compare Roles share the sidebar and
// browser chrome drawn here; Skills is the animated <MapSkillsDemo>, a layer
// that draws its own panels into the same frame. Every screen's panel starts
// at (293, 122) with its title at (312, 145) — the design's Compare Roles sat
// 8 units left and 6 up, and is moved onto that grid. The two still screens
// enter block by block (<StaggerReveal>) each time their tab is chosen.
//
// The window is white, like every product screen on /product; the design's
// #FAFAFA app background is not carried over.
//
// Type is the site's own: Geist, and Geist Mono for the assistant's
// transcript. The design names Inter, which the site does not load.
//
// One departure from the design's coordinates: the Explore / List toggle is
// anchored by its right edge, not its left, so a longer label (Esplora /
// Elenco) grows away from the Compare button instead of under it.

export type MapScreen = 'jobs' | 'skills' | 'compare';

const W = 1680;
// The window is 16:9, 1680×945 where the design's is 1680×1194. Every Map
// screen's panel starts at (293, 122) and ends 10 units inside the window's
// right and bottom edges, so its border shows on all four sides.
const H = 945;
const PANEL_W = W - 10 - 293;
const PANEL_H = H - 10 - 122;
const MONO = "'Geist Mono', monospace";
// The product logo: the section's own, 1.4% of the window's width tall on
// every product screen.
const LOGO = 23.52;

// Job families: key, roles, x, y, width, height, fill, text colour.
// Each column's heights are the design's, scaled to fill 251–919 in the 16:9
// window with the design's gaps between tiles kept.
const TILES = [
  ['hr', 11, 316, 251, 540, 411, '#1A1AF0', '#fff'],
  ['store', 9, 316, 682, 540, 237, '#4B4EF8', '#fff'],
  ['marketing', 8, 875, 251, 457, 317, '#7F7FF7', '#fff'],
  ['merchandising', 8, 875, 587, 457, 332, '#7F7FF7', '#fff'],
  ['supply', 7, 1351, 251, 300, 436, '#ADADFA', '#1A1A1A'],
  ['commercial', 5, 1351, 706, 300, 213, '#DCDCFC', '#1A1A1A'],
] as const;

const ROLE_CARDS = [
  { key: 'a', x: 303, c: '#6264F2', tc: '#4B4DF7' },
  { key: 'b', x: 1010, c: '#F2954A', tc: '#E8731E' },
] as const;
// Compared skills: key, priority, proficiency, and whether role B has it too.
const COMPARED = [
  ['inventory', 'critical', 'advanced', true], ['scheduling', 'important', 'practitioner', true],
  ['sales', 'critical', 'advanced', true], ['communication', 'important', 'practitioner', true],
  ['problemSolving', 'critical', 'practitioner', true], ['product', 'important', 'practitioner', true],
  ['merchandising', 'important', 'practitioner', true], ['trends', 'nice', 'practitioner', false],
  ['promotion', 'nice', 'practitioner', false],
] as const;
const PRIORITY_COLOUR = { critical: '#D9443C', important: '#E8731E', nice: '#333' } as const;
const PROFICIENCY_COLOURS = { advanced: ['#D3F3CC', '#2F7A2A'], practitioner: ['#E9F6BE', '#5E6B12'] } as const;

export function MapScreens({ tab, label }: { tab: MapScreen; label: string }) {
  const t = useTranslations('product.map');
  const ref = useRef<HTMLDivElement>(null);
  // Unknown until the frame is measured, and hidden until then: a guess would
  // paint the screen at the wrong size for a frame.
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tiles = TILES.map(([key, n, x, y, w, h, bg, fg]) => ({
    t: t(`screens.jobs.families.${key}`), n, x, y, w, h, bg, fg, tw: key === 'commercial' ? '130px' : 'auto',
  }));
  const roleCards = ROLE_CARDS.map(({ key, ...card }) => ({
    ...card, h: t(`screens.compare.${key}.label`), r: t(`screens.compare.${key}.role`), m: t(`screens.compare.${key}.meta`),
  }));
  const cmp = COMPARED.map(([key, priority, proficiency, inB]) => ({
    t: t(`screens.compare.skills.${key}`),
    p: t(`screens.priorities.${priority}`), pc: PRIORITY_COLOUR[priority],
    crit: priority === 'critical', imp: priority === 'important',
    f: t(`screens.levels.${proficiency}`), fb: PROFICIENCY_COLOURS[proficiency][0], fc: PROFICIENCY_COLOURS[proficiency][1],
    hasB: inB, noB: !inB,
  }));

  return (
    <div ref={ref} role="img" aria-label={label} style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#fff', borderRadius: 12, border: '1px solid #D4D4D8', boxSizing: 'border-box', boxShadow: '0 20px 50px rgba(30,30,80,.12)' }}>
    <div style={{ position: 'absolute', left: '0', top: '0', width: 1680, height: H, transformOrigin: '0 0', transform: `scale(${scale ?? 0})`, visibility: scale === null ? 'hidden' : undefined, color: '#1A1A1A', textAlign: 'left', background: '#FFFFFF' }}>
    <div style={{ position: 'absolute', left: 24, top: 23, display: 'flex', gap: 10 }}><span style={{ width: 14, height: 14, borderRadius: '50%', background: '#FF5F57' }}></span><span style={{ width: 14, height: 14, borderRadius: '50%', background: '#FEBC2E' }}></span><span style={{ width: 14, height: 14, borderRadius: '50%', background: '#28C840' }}></span></div>
    <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" style={{ position: 'absolute', left: 113, top: 17, width: 26, height: 26 }}><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M9 5v14M5 9h2M5 12h2"></path></svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round" style={{ position: 'absolute', left: 164, top: 18, width: 24, height: 24 }}><path d="M15 6l-6 6 6 6"></path></svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#BBB" strokeWidth="1.8" strokeLinecap="round" style={{ position: 'absolute', left: 201, top: 18, width: 24, height: 24 }}><path d="M9 6l6 6-6 6"></path></svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" style={{ position: 'absolute', left: 453, top: 18, width: 24, height: 24 }}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path><path d="M12 3v18" fill="#666"></path></svg>
    <div style={{ position: 'absolute', left: 496, top: 14, width: 682, height: 32, borderRadius: 8, background: '#EFEFF0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 16, color: '#444' }}><svg viewBox="0 0 24 24" fill="#888" style={{ width: 12, height: 12 }}><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="#888" strokeWidth="2.4"></path></svg>{t('screens.url')}<svg viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" style={{ position: 'absolute', right: 12, width: 16, height: 16 }}><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"></path></svg></div>
    <div style={{ position: 'absolute', left: 1491, top: 18, display: 'flex', gap: 24 }}><svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" style={{ width: 24, height: 24 }}><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12l4 4 4-4"></path></svg><svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" style={{ width: 24, height: 24 }}><path d="M12 3v12M8 7l4-4 4 4M6 11v9h12v-9"></path></svg><svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" style={{ width: 24, height: 24 }}><path d="M12 5v14M5 12h14"></path></svg><svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" style={{ width: 24, height: 24 }}><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M4 16V6a2 2 0 0 1 2-2h10"></path></svg></div>
    <img src="/products/skillvue-map.svg" alt="" style={{ position: 'absolute', left: 18, top: 75.74, height: LOGO }} />
    <div style={{ position: 'absolute', left: 293, top: 70, width: 409, height: 41, border: '1px solid #E6E6E6', borderRadius: 9, boxSizing: 'border-box', background: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', fontSize: 16.5, color: '#555' }}><svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" style={{ width: 20, height: 20 }}><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>{t('screens.search')}<span style={{ marginLeft: 'auto', fontSize: 13.5, color: '#777' }}>⌘K</span></div>
    <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" style={{ position: 'absolute', left: 1593, top: 79, width: 24, height: 24 }}><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"></path></svg>
    <div style={{ position: 'absolute', left: 1634, top: 73, width: 36, height: 36, borderRadius: 9, border: '1.5px solid #E7A6C4', boxSizing: 'border-box', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg viewBox="0 0 24 24" fill="none" stroke="#E5566E" strokeWidth="1.5" strokeLinejoin="round" style={{ width: 22, height: 22 }}><path d="M12 3c.8 4.6 4.4 8.2 9 9-4.6.8-8.2 4.4-9 9-.8-4.6-4.4-8.2-9-9 4.6-.8 8.2-4.4 9-9z"></path></svg></div>
    <div style={{ position: 'absolute', left: 10, top: 121, width: 272, fontSize: 16.5, color: '#333' }}>
    <div style={{ height: 46, display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 10 }}><span style={{ width: 26, height: 26, border: '1px solid #CCC', borderRadius: 3, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg viewBox="0 0 24 24" fill="#222" style={{ width: 16, height: 16 }}><rect x="3" y="3" width="8" height="8" rx="1" /><circle cx="17" cy="7" r="4" /><path d="M3 13h8v8a8 8 0 0 1-8-8z" /><path d="M13 21l8-8v8z" /></svg></span>{t('screens.workspace')}<svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" style={{ marginLeft: 'auto', marginRight: 14, width: 16, height: 16 }}><path d="M9 6l6 6-6 6"></path></svg></div>
    <div style={{ height: 46, marginTop: 1, display: 'flex', alignItems: 'center', gap: 15, paddingLeft: 14, borderRadius: 8, background: tab === 'jobs' ? '#E8E8E9' : 'transparent', width: '263px', boxSizing: 'border-box' }}><svg viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.6" style={{ width: 19, height: 19 }}><rect x="4" y="4" width="6" height="6" rx="1"></rect><rect x="14" y="4" width="6" height="6" rx="1"></rect><rect x="4" y="14" width="6" height="6" rx="1"></rect><rect x="14" y="14" width="6" height="6" rx="1"></rect></svg>{t('screens.nav.jobs')}</div>
    <div style={{ height: 46, marginTop: 1, display: 'flex', alignItems: 'center', gap: 15, paddingLeft: 14, borderRadius: 8, background: tab === 'jobs' ? 'transparent' : '#E8E8E9', width: '263px', boxSizing: 'border-box' }}><svg viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.6" strokeLinejoin="round" style={{ width: 19, height: 19 }}><path d="M10 3c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6zM18 14c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3z"></path></svg>{t('screens.nav.skills')}</div>
    <div style={{ height: 46, marginTop: 1, display: 'flex', alignItems: 'center', gap: 15, paddingLeft: 14 }}><svg viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.6" style={{ width: 19, height: 19 }}><rect x="5" y="4" width="14" height="17" rx="2"></rect><path d="M9 4V3h6v1M9 13l2 2 4-4"></path></svg>{t('screens.nav.workflow')}<svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" style={{ marginLeft: 'auto', marginRight: 14, width: 16, height: 16 }}><path d="M6 15l6-6 6 6"></path></svg></div>
    <div style={{ position: 'relative', paddingLeft: 46, display: 'flex', flexDirection: 'column' }}><span style={{ position: 'absolute', left: 23, top: '0', bottom: '0', width: 1, background: '#E3E3E3' }}></span><span style={{ height: 42.5, display: 'flex', alignItems: 'center' }}>{t('screens.nav.input')}</span><span style={{ height: 42.5, display: 'flex', alignItems: 'center' }}>{t('screens.nav.validation')}</span><span style={{ height: 42.5, display: 'flex', alignItems: 'center' }}>{t('screens.nav.mapping')}</span><span style={{ height: 42.5, display: 'flex', alignItems: 'center' }}>{t('screens.nav.settings')}</span></div>
    <div style={{ height: 46, display: 'flex', alignItems: 'center', gap: 15, paddingLeft: 14 }}><svg viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.6" strokeLinejoin="round" style={{ width: 19, height: 19 }}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path><path d="M9 12l2 2 4-4"></path></svg>{t('screens.nav.admin')}<svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" style={{ marginLeft: 'auto', marginRight: 14, width: 16, height: 16 }}><path d="M6 15l6-6 6 6"></path></svg></div>
    <div style={{ position: 'relative', paddingLeft: 46, display: 'flex', flexDirection: 'column' }}><span style={{ position: 'absolute', left: 23, top: '0', bottom: '0', width: 1, background: '#E3E3E3' }}></span><span style={{ height: 42.5, display: 'flex', alignItems: 'center' }}>{t('screens.nav.workspaces')}</span><span style={{ height: 42.5, display: 'flex', alignItems: 'center' }}>{t('screens.nav.people')}</span><span style={{ height: 42.5, display: 'flex', alignItems: 'center' }}>{t('screens.nav.prompts')}</span><span style={{ height: 42.5, display: 'flex', alignItems: 'center' }}>{t('screens.nav.queues')}<svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" style={{ marginLeft: 'auto', marginRight: 14, width: 19, height: 19 }}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"></path></svg></span></div>
    </div>
    <div style={{ position: 'absolute', left: 19, top: 1147 - (1194 - H), width: 250, display: 'flex', alignItems: 'center', gap: 11, fontSize: 16.5, color: '#333' }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: '#E9E9EA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#555' }}>{t('screens.user').charAt(0)}</span>{t('screens.user')}<svg viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.6" style={{ marginLeft: 'auto', width: 19, height: 19 }}><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M9 4v16M16 10l-2 2 2 2"></path></svg></div>
    <div style={{ position: 'absolute', inset: '0', opacity: tab === 'jobs' ? 1 : 0, transition: 'opacity 400ms ease' }}>
    <StaggerReveal active={tab === 'jobs'}>
    <div style={{ position: 'absolute', left: 293, top: 122, width: PANEL_W, height: PANEL_H, border: '1px solid #EBEBEB', borderRadius: 12, background: '#fff' }}></div>
    <div style={{ position: 'absolute', left: 312, top: 145, fontSize: 24, fontWeight: '600', letterSpacing: '-0.01em' }}>{t('screens.nav.jobs')}</div>
    <div style={{ position: 'absolute', right: 345, top: 141, height: 41, border: '1px solid #EAEAEA', borderRadius: 8, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: 3, gap: 4, fontSize: 16.5 }}><span style={{ height: 33, padding: '0 9px', borderRadius: 6, background: '#EBEBEC', display: 'flex', alignItems: 'center' }}>{t('screens.explore')}</span><span style={{ padding: '0 6px', color: '#666' }}>{t('screens.jobs.list')}</span></div>
    <div style={{ position: 'absolute', left: 1347, top: 141, width: 111, height: 41, border: '1px solid #DDD', borderRadius: 8, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16.5, fontWeight: '600' }}>{t('screens.jobs.compare')}</div>
    <div style={{ position: 'absolute', left: 1469, top: 141, width: 178, height: 41, borderRadius: 8, background: '#4B4DF7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16.5, fontWeight: '600' }}>{t('screens.jobs.run')}</div>
    <div style={{ position: 'absolute', left: 312, top: 202, fontSize: 16.5, color: '#555' }}>{t('screens.jobs.summary')}</div>
    {tiles.map((tl, i0) => (<Fragment key={i0}><div style={{ position: 'absolute', left: `${tl.x}px`, top: `${tl.y}px`, width: `${tl.w}px`, height: `${tl.h}px`, borderRadius: 14, background: tl.bg, color: tl.fg, padding: '12px 15px', boxSizing: 'border-box' }}><div style={{ fontSize: 16.5, fontWeight: '500', lineHeight: '23px', width: tl.tw }}>{tl.t}</div><div style={{ fontSize: 14.5, opacity: '.85', marginTop: 2 }}>{t('screens.jobs.roles', { count: tl.n })}</div></div></Fragment>))}
    </StaggerReveal></div>
    <div style={{ position: 'absolute', inset: '0', transform: 'translateX(8px)', opacity: tab === 'compare' ? 1 : 0, transition: 'opacity 400ms ease' }}>
    <StaggerReveal active={tab === 'compare'}>
    <div style={{ position: 'absolute', left: 285, top: 122, width: PANEL_W, height: PANEL_H, border: '1px solid #EBEBEB', borderRadius: 12, background: '#fff' }}></div>
    <div style={{ position: 'absolute', left: 304, top: 145, fontSize: 24, fontWeight: '600', letterSpacing: '-0.01em' }}>{t('screens.compare.title')}</div>
    {roleCards.map((rc, i0) => (<Fragment key={i0}><div style={{ position: 'absolute', left: `${rc.x}px`, top: 203, width: 632, height: 145, border: `1.5px solid ${rc.c}`, borderRadius: 10, boxSizing: 'border-box' }}>
    <div style={{ position: 'absolute', left: 17, top: 18, fontSize: 17, color: rc.tc }}>{rc.h}</div>
    <div style={{ position: 'absolute', left: 17, top: 50, width: 595, height: 42, border: '1px solid #DDD', borderRadius: 8, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '0 9px', fontSize: 17 }}>{rc.r}<svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" style={{ marginLeft: 'auto', width: 20, height: 20 }}><path d="M6 9l6 6 6-6"></path></svg></div>
    <div style={{ position: 'absolute', left: 19, top: 103, display: 'flex', alignItems: 'center', gap: 8, fontSize: 16.5, color: '#555' }}><svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.6" strokeLinecap="round" style={{ width: 19, height: 19 }}><circle cx="12" cy="12" r="9"></circle><path d="M12 11v5M12 8h.01"></path></svg>{rc.m}</div>
    </div></Fragment>))}
    <svg viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 960, top: 263, width: 24, height: 24 }}><path d="M4 8h15l-4-4M20 16H5l4 4"></path></svg>
    <div style={{ position: 'absolute', left: 321, top: 383, fontSize: 14.5, color: '#555' }}>{t('screens.compare.show')}</div>
    <div style={{ position: 'absolute', left: 371, top: 372, width: 400, height: 41, border: '1px solid #EBEBEB', borderRadius: 8, boxSizing: 'border-box', background: '#FAFAFA', display: 'flex', alignItems: 'center', padding: 3, gap: 2, fontSize: 16.5, color: '#555' }}><span style={{ height: 33, padding: '0 9px', borderRadius: 6, background: '#EBEBEC', color: '#111', display: 'flex', alignItems: 'center' }}>{t('screens.compare.all')}</span><span style={{ padding: '0 9px' }}>{t('screens.compare.shared')}</span><span style={{ padding: '0 9px' }}>{t('screens.compare.differences')}</span></div>
    <div style={{ position: 'absolute', right: 38, top: 383, fontSize: 14.5, color: '#555' }}>{t('screens.compare.counts')}</div>
    <div style={{ position: 'absolute', left: 302, top: 437, width: 1341, height: 427, border: '1px solid #E6E6E6', borderRadius: 10, boxSizing: 'border-box', overflow: 'hidden' }}>
    <span style={{ position: 'absolute', left: 668, top: '0', bottom: '0', width: 1, background: '#E3E3E3' }}></span>
    <div style={{ display: 'grid', gridTemplateColumns: '320px 175px 173px 320px 175px 1fr', height: 42, alignItems: 'center', fontSize: 17 }}>
    <span style={{ paddingLeft: 18, color: '#4B4DF7' }}>{t('screens.compare.columnA')}</span><span style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 18 }}>{t('screens.compare.priority')}<svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" style={{ width: 18, height: 18 }}><path d="M6 9l6 6 6-6"></path></svg></span><span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{t('screens.compare.proficiency')}<svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" style={{ width: 18, height: 18 }}><path d="M6 9l6 6 6-6"></path></svg></span>
    <span style={{ paddingLeft: 20, color: '#E8731E', whiteSpace: 'nowrap' }}>{t('screens.compare.columnB')}</span><span style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 20 }}>{t('screens.compare.priority')}<svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" style={{ width: 18, height: 18 }}><path d="M6 9l6 6 6-6"></path></svg></span><span style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 20 }}>{t('screens.compare.proficiency')}<svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.6" style={{ width: 18, height: 18 }}><path d="M6 9l6 6 6-6"></path></svg></span></div>
    {cmp.map((c, i0) => (<Fragment key={i0}><div style={{ display: 'grid', gridTemplateColumns: '320px 175px 173px 320px 175px 1fr', height: 42.3, alignItems: 'center', borderTop: '1px solid #F0F0F0', fontSize: 17 }}>
    <span style={{ paddingLeft: 18, whiteSpace: 'nowrap' }}>{c.t}</span>
    <span style={{ paddingLeft: 18 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 27, padding: '0 9px', border: '1px solid #E6E6E6', borderRadius: 999, fontSize: 14, color: c.pc, boxSizing: 'border-box' }}>{c.crit && (<><svg viewBox="0 0 24 24" fill="none" stroke="#E5484D" strokeWidth="2" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M12 4l9 16H3z"></path><path d="M12 10v4M12 17h.01"></path></svg></>)}{c.imp && (<><svg viewBox="0 0 24 24" fill="none" stroke="#E8731E" strokeWidth="2" strokeLinecap="round" style={{ width: 16, height: 16 }}><circle cx="12" cy="12" r="9"></circle><path d="M12 8v5M12 16h.01"></path></svg></>)}{c.p}</span></span>
    <span><span style={{ display: 'inline-flex', alignItems: 'center', height: 27, padding: '0 10px', borderRadius: 999, fontSize: 14, background: c.fb, color: c.fc }}>{c.f}</span></span>
    {c.hasB && (<><span style={{ paddingLeft: 20, whiteSpace: 'nowrap' }}>{c.t}</span><span style={{ paddingLeft: 20 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 27, padding: '0 9px', border: '1px solid #E6E6E6', borderRadius: 999, fontSize: 14, color: c.pc, boxSizing: 'border-box' }}>{c.crit && (<><svg viewBox="0 0 24 24" fill="none" stroke="#E5484D" strokeWidth="2" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M12 4l9 16H3z"></path><path d="M12 10v4M12 17h.01"></path></svg></>)}{c.imp && (<><svg viewBox="0 0 24 24" fill="none" stroke="#E8731E" strokeWidth="2" strokeLinecap="round" style={{ width: 16, height: 16 }}><circle cx="12" cy="12" r="9"></circle><path d="M12 8v5M12 16h.01"></path></svg></>)}{c.p}</span></span><span style={{ paddingLeft: 20 }}><span style={{ display: 'inline-flex', alignItems: 'center', height: 27, padding: '0 10px', borderRadius: 999, fontSize: 14, background: c.fb, color: c.fc }}>{c.f}</span></span></>)}
    {c.noB && (<><span style={{ paddingLeft: 20 }}>—</span><span style={{ paddingLeft: 20 }}>—</span><span style={{ paddingLeft: 20 }}>—</span></>)}
    </div></Fragment>))}
    </div>
    </StaggerReveal></div>
    <MapSkillsDemo active={tab === 'skills'} />
    </div>
    </div>
  );
}
