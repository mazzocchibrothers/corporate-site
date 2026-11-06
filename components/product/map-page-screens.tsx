'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { JobsActions, MAP_PANEL, MapWindow } from '@/components/product/map-screens';
import { MapSkillsDemo } from '@/components/product/map-skills-demo';
import { StaggerReveal } from '@/components/product/stagger-reveal';

// The Skillvue Map screens on /product/skillvue-map, drawn in HTML in place of
// the page's screenshots and screen recording, in the same window as /product's
// (<MapWindow>): the hero is /product's animated Skills screen, and the three
// stills — Job architecture as a list, a role's skill profile, Compare roles —
// are ported from the captures they replace.
//
// The captures are 1344 wide and the window 1680, so every position and size
// below is the capture's times 1.25, the scale /product's screens were drawn
// at. Each panel and its title sit on /product's grid, the panel at (293, 122)
// and its first line at 145, so the four screens and /product's three line up.
// The window is 16:9 where the captures are taller: Job architecture drops the
// pagination under its list, and the skill profile shows the rows that fit
// above the panel's bottom edge.
//
// The words that name the app's own controls and vocabulary — the sidebar,
// the toggle and buttons of Job architecture, priorities and levels — are
// /product's (`product.map.screens`), so a term reads the same on both pages.
// The screens' data is this page's (`product.skillvue-map.screens`).

export type MapPageScreenId = 'skills' | 'list' | 'profile' | 'roles';

const PANEL: CSSProperties = { position: 'absolute', ...MAP_PANEL, border: '1px solid #EBEBEB', borderRadius: 12, background: '#fff' };
const TITLE: CSSProperties = { position: 'absolute', left: 312, top: 145, fontSize: 24, fontWeight: '600', letterSpacing: '-0.01em' };
const BOX: CSSProperties = { border: '1px solid #E6E6E6', borderRadius: 10, boxSizing: 'border-box', overflow: 'hidden', background: '#fff' };
const BUTTON: CSSProperties = { height: 40, padding: '0 19px', border: '1px solid #DDD', borderRadius: 8, boxSizing: 'border-box', display: 'flex', alignItems: 'center', fontSize: 16.5, fontWeight: '600', whiteSpace: 'nowrap' };
const SEGMENTS: CSSProperties = { height: 40, border: '1px solid #EAEAEA', borderRadius: 8, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: 3, gap: 2, fontSize: 16.5, color: '#333', whiteSpace: 'nowrap' };
const SEGMENT: CSSProperties = { height: 32, padding: '0 10px', borderRadius: 6, display: 'flex', alignItems: 'center' };
const SEGMENT_ON: CSSProperties = { ...SEGMENT, background: '#EBEBEC', color: '#111' };
const PILL: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, height: 27, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', fontSize: 14, whiteSpace: 'nowrap' };
const OUTLINE_PILL: CSSProperties = { ...PILL, border: '1px solid #E6E6E6', background: '#fff' };
// A row of the list and of the skill profile, which has its own grey for the
// rows that are open.
const OPEN = '#F5F5F5';

const PATH = {
  right: 'M9 6l6 6-6 6',
  down: 'M6 9l6 6 6-6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  search: 'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM20 20l-4-4',
  filter: 'M4 8h9M17 8h3M15 6v4M4 16h3M11 16h9M9 14v4',
  info: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 11v5M12 8h.01',
  alert: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 8v5M12 16h.01',
  triangle: 'M12 4l9 16H3zM12 10v4M12 17h.01',
  swap: 'M4 8h15l-4-4M20 16H5l4 4',
} as const;

function Icon({ d, size = 20, stroke = '#555', width = 1.8, style }: { d: string; size?: number; stroke?: string; width?: number; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, flexShrink: 0, ...style }}>
      <path d={d} />
    </svg>
  );
}

function Dot({ colour, size = 7 }: { colour: string; size?: number }) {
  return <span style={{ width: size, height: size, borderRadius: '50%', background: colour, flexShrink: 0 }} />;
}

type Priority = 'critical' | 'important' | 'nice';
type Level = 'advanced' | 'practitioner' | 'foundational';

// Compare roles' pills, as in /product's: a triangle for critical, a circle for
// important, nothing for nice to have.
const PRIORITY: Record<Priority, { colour: string; icon?: string; stroke?: string }> = {
  critical: { colour: '#D9443C', icon: PATH.triangle, stroke: '#E5484D' },
  important: { colour: '#E8731E', icon: PATH.alert, stroke: '#E8731E' },
  nice: { colour: '#1A1A1A' },
};
const LEVEL: Record<Level, [string, string]> = {
  advanced: ['#D3F3CC', '#2F7A2A'],
  practitioner: ['#E9F6BE', '#5E6B12'],
  foundational: ['#FBEFC8', '#8A6A12'],
};

function PriorityPill({ priority }: { priority: Priority }) {
  const t = useTranslations('product.map.screens');
  const p = PRIORITY[priority];
  return (
    <span style={{ ...OUTLINE_PILL, height: 25, padding: '0 8px', gap: 5, fontSize: 13.5, color: p.colour }}>
      {p.icon && <Icon d={p.icon} size={14} stroke={p.stroke} width={2} />}
      {t(`priorities.${priority}`)}
    </span>
  );
}

function LevelPill({ level }: { level: Level }) {
  const t = useTranslations('product.map.screens');
  const [bg, fg] = LEVEL[level];
  return <span style={{ ...PILL, height: 25, fontSize: 13.5, background: bg, color: fg }}>{t(`levels.${level}`)}</span>;
}

// ── Job architecture, as a list ────────────────────────────────────────────

// Families, open and closed: key, depth (0 a family, 1 a sub-family, 2 a role),
// whether it is open, whether it is shaded as part of the open branch.
const LIST = [
  ['marketing', 0, false, false],
  ['merchandising', 0, true, true],
  ['visual', 1, true, true],
  ['visualManager', 2, false, true],
  ['category', 1, false, false],
  ['space', 1, false, false],
  ['commercial', 0, false, false],
  ['store', 0, false, false],
  ['supply', 0, false, false],
  ['hr', 0, false, false],
] as const;
// Where each depth's chevron, and its text, start inside the list.
const INDENT = [19, 56, 0] as const;

function ListScreen() {
  const t = useTranslations('product.map.screens');
  const l = useTranslations('product.skillvue-map.screens.list');
  return (
    <StaggerReveal active>
      <div style={PANEL}></div>
      <div style={TITLE}>{t('nav.jobs')}</div>
      <JobsActions view="list" />
      <div style={{ position: 'absolute', left: 311, top: 198, width: 410, height: 41, ...BOX, borderRadius: 9, display: 'flex', alignItems: 'center', gap: 8, padding: '0 11px', fontSize: 14.5, color: '#777' }}><Icon d={PATH.search} size={18} />{l('search')}</div>
      <div style={{ position: 'absolute', left: 731, top: 198, width: 187, height: 41, ...BOX, borderRadius: 9, display: 'flex', alignItems: 'center', gap: 9, padding: '0 11px', fontSize: 14.5, color: '#333' }}><Icon d={PATH.filter} size={18} width={1.5} />{l('families')}<Icon d={PATH.down} size={18} width={1.6} style={{ marginLeft: 'auto' }} /></div>
      <div style={{ position: 'absolute', left: 311, top: 252, width: 1340, height: 659, ...BOX }}>
        <div style={{ height: 50, display: 'flex', alignItems: 'center', paddingLeft: 19, fontSize: 14.5, color: '#333' }}>{l('architecture')}</div>
        {LIST.map(([key, depth, open, shaded]) => (
          <div key={key} style={{ height: 56, display: 'flex', alignItems: 'center', borderTop: '1px solid #EBEBEB', background: shaded ? OPEN : '#fff', fontSize: 17 }}>
            {depth === 2 ? (
              <div style={{ paddingLeft: 75, lineHeight: '24px', fontSize: 16.5 }}>
                <div>{l(`rows.${key}`)}</div>
                <div style={{ color: '#777' }}>{t('jobs.roles', { count: 2 })}</div>
              </div>
            ) : (
              <>
                <Icon d={open ? PATH.down : PATH.right} size={18} stroke="#333" style={{ marginLeft: INDENT[depth], marginRight: 10 }} />
                {l(`rows.${key}`)}
              </>
            )}
            <Icon d={PATH.arrow} size={20} stroke="#333" width={1.6} style={{ marginLeft: 'auto', marginRight: 16 }} />
          </div>
        ))}
        <div style={{ height: 49, display: 'flex', alignItems: 'center', borderTop: '1px solid #E6E6E6', padding: '0 10px', fontSize: 14 }}>
          <span style={OUTLINE_PILL}><Dot colour="#30A46C" />{l('idle')}</span>
          <span style={{ marginLeft: 10, color: '#777' }}>{l('lastRun')}</span>
          <span style={{ marginLeft: 'auto', textDecoration: 'underline' }}>{l('openRuns')}</span>
        </div>
      </div>
    </StaggerReveal>
  );
}

// ── A role's skill profile ─────────────────────────────────────────────────

// Skills: key, type, priority, level, category, and whether its rationale is
// open below it.
const PROFILE = [
  ['channel', 'hard', 'critical', 'advanced', 'marketing', false],
  ['strategy', 'hard', 'critical', 'advanced', 'marketing', true],
  ['creative', 'soft', 'important', 'practitioner', 'business', false],
  ['performance', 'hard', 'important', 'practitioner', 'business', false],
  ['data', 'hard', 'important', 'practitioner', 'analysis', false],
] as const;
// The skill profile draws its levels in its own colours, unlike Compare roles.
const PROFILE_LEVEL = { advanced: ['#C9F0D3', '#2F7A2A'], practitioner: ['#ECEDFE', '#5B5FD7'] } as const;
const TYPE_DOT = { hard: '#E5484D', soft: '#4F86E8' } as const;
const PROFILE_COLUMNS = '478px 135px 135px 135px 1fr';
const CELL: CSSProperties = { paddingLeft: 9, overflow: 'hidden', whiteSpace: 'nowrap' };

function Label({ children }: { children: ReactNode }) {
  return <span style={{ fontSize: 13, color: '#777', letterSpacing: '.04em', textTransform: 'uppercase' }}>{children}</span>;
}

function ProfileScreen() {
  const t = useTranslations('product.map.screens');
  const l = useTranslations('product.skillvue-map.screens.list');
  const pr = useTranslations('product.skillvue-map.screens.profile');
  return (
    <StaggerReveal active>
      <div style={PANEL}></div>
      <div style={{ position: 'absolute', left: 312, top: 148, fontSize: 14, color: '#333', whiteSpace: 'nowrap' }}>
        {t('nav.jobs')} / {l('rows.marketing')} / {pr('family')} / <span style={{ color: '#777' }}>{pr('title')}</span>
      </div>
      <div style={{ ...TITLE, top: 176 }}>{pr('title')}</div>
      <div style={{ position: 'absolute', left: 311, top: 217, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={OUTLINE_PILL}><Dot colour={TYPE_DOT.hard} />{pr('hard')}</span>
        <span style={{ fontSize: 14.5, color: '#666' }}>{pr('department')}</span>
      </div>
      <div style={{ position: 'absolute', right: 33, top: 203, display: 'flex', gap: 10 }}>
        <span style={BUTTON}>{pr('compareWith')}</span>
        <span style={BUTTON}>{pr('rerun')}</span>
        <span style={BUTTON}>{pr('share')}</span>
      </div>
      <div style={{ position: 'absolute', left: 311, top: 256, width: 1340 }}>
        <div style={{ fontSize: 16.5, lineHeight: '21px', fontWeight: '500' }}>{pr('descriptionTitle')}</div>
        <div style={{ marginTop: 10, width: 880, fontSize: 14, lineHeight: '20px', color: '#666' }}>{pr('description')}</div>
        <div style={{ marginTop: 16, height: 41, display: 'flex', borderBottom: '1px solid #E6E6E6', fontSize: 14.5, fontWeight: '500', color: '#333' }}>
          {(['internal', 'market', 'profile'] as const).map((key) => (
            <span key={key} style={{ padding: '6px 14px 0', lineHeight: '20px', ...(key === 'profile' ? { color: '#4B4DF7', borderBottom: '2px solid #4B4DF7', marginBottom: -1 } : {}) }}>{pr(`tabs.${key}`)}</span>
          ))}
        </div>
        <div style={{ marginTop: 9, display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 409, height: 40, ...BOX, borderRadius: 9, display: 'flex', alignItems: 'center', gap: 8, padding: '0 11px', fontSize: 16.5, color: '#777' }}><Icon d={PATH.search} size={19} />{pr('search')}</div>
          <Label>{pr('type')}</Label>
          <div style={SEGMENTS}><span style={SEGMENT_ON}>{pr('all')}</span><span style={SEGMENT}>{pr('softFilter')}</span><span style={SEGMENT}>{pr('hardFilter')}</span></div>
          <Label>{t('compare.priority')}</Label>
          <div style={SEGMENTS}><span style={SEGMENT_ON}>{pr('all')}</span><span style={SEGMENT}>{t('priorities.critical')}</span><span style={SEGMENT}>{t('priorities.important')}</span><span style={SEGMENT}>{t('priorities.nice')}</span></div>
        </div>
        <div style={{ marginTop: 10, ...BOX }}>
          <div style={{ display: 'grid', gridTemplateColumns: PROFILE_COLUMNS, height: 44, alignItems: 'center', fontSize: 16.5, fontWeight: '500' }}>
            <span style={{ paddingLeft: 19 }}>{pr('roleName')}</span><span style={CELL}>{pr('type')}</span><span style={CELL}>{t('compare.priority')}</span><span style={CELL}>{t('compare.proficiency')}</span><span style={CELL}>{pr('category')}</span>
          </div>
          {PROFILE.map(([key, type, priority, level, category, open]) => {
            const [bg, fg] = PROFILE_LEVEL[level];
            const prio = PRIORITY[priority];
            return (
              <div key={key} style={{ borderTop: '1px solid #F0F0F0', background: open ? OPEN : '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: PROFILE_COLUMNS, height: 56, alignItems: 'center', fontSize: 17 }}>
                  <span style={{ paddingLeft: 19, display: 'flex', alignItems: 'center', gap: 13, overflow: 'hidden', whiteSpace: 'nowrap' }}><Icon d={open ? PATH.down : PATH.right} size={18} stroke="#333" />{pr(`rows.${key}`)}</span>
                  <span style={CELL}><span style={OUTLINE_PILL}><Dot colour={TYPE_DOT[type]} />{pr(type)}</span></span>
                  <span style={CELL}><span style={{ ...OUTLINE_PILL, color: prio.colour }}><Icon d={PATH.alert} size={16} stroke={prio.colour} width={1.8} />{t(`priorities.${priority}`)}</span></span>
                  <span style={CELL}><span style={{ ...PILL, background: bg, color: fg }}>{t(`levels.${level}`)}<Icon d={PATH.down} size={14} stroke={fg} width={2} /></span></span>
                  <span style={{ ...CELL, color: '#777' }}>{pr(`categories.${category}`)}</span>
                </div>
                {open && (
                  <div style={{ padding: '9px 19px', borderTop: '1px solid #F0F0F0', fontSize: 14, lineHeight: '20px' }}>
                    <div style={{ fontWeight: '600' }}>{pr('rationale.title')}</div>
                    <div style={{ marginTop: 9, color: '#666' }}>{pr('rationale.body')}</div>
                    <div style={{ marginTop: 19, color: '#666' }}>{pr('rationale.definition')}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </StaggerReveal>
  );
}

// ── Compare roles ──────────────────────────────────────────────────────────

type Side = readonly [Priority, Level] | null;
// Skills: key, then role A's priority and level and role B's, null where the
// role does not have the skill. Role A's are listed first, then role B's own.
const ROLES: readonly (readonly [string, Side, Side])[] = [
  ['leadership', ['nice', 'foundational'], ['critical', 'advanced']],
  ['inventory', ['critical', 'advanced'], ['important', 'practitioner']],
  ['visual', ['critical', 'advanced'], ['nice', 'foundational']],
  ['sales', ['important', 'practitioner'], ['critical', 'advanced']],
  ['communication', ['important', 'practitioner'], ['important', 'practitioner']],
  ['problemSolving', ['critical', 'advanced'], ['critical', 'advanced']],
  ['cash', ['important', 'practitioner'], null],
  ['handover', ['nice', 'foundational'], null],
  ['pnl', null, ['critical', 'advanced']],
  ['multiSite', null, ['critical', 'advanced']],
  ['talent', null, ['important', 'practitioner']],
];
const ROLE_CARDS = [
  { key: 'a', left: 312, width: 609, border: '#6264F2', colour: '#4B4DF7' },
  { key: 'b', left: 1005, width: 610, border: '#F2954A', colour: '#E8731E' },
] as const;
// Role A's three columns, then role B's; the line between them at 629.
const ROLE_COLUMNS = '350px 144px 135px 349px 145px 1fr';
const DASH: CSSProperties = { color: '#777' };

function RoleCells({ name, side }: { name: string; side: Side }) {
  return (
    <>
      <span style={{ paddingLeft: 19, overflow: 'hidden', whiteSpace: 'nowrap' }}>{side ? name : <span style={DASH}>—</span>}</span>
      <span>{side ? <PriorityPill priority={side[0]} /> : <span style={{ ...DASH, paddingLeft: 10 }}>—</span>}</span>
      <span>{side ? <LevelPill level={side[1]} /> : <span style={{ ...DASH, paddingLeft: 11 }}>—</span>}</span>
    </>
  );
}

function RolesScreen() {
  const t = useTranslations('product.map.screens');
  const ro = useTranslations('product.skillvue-map.screens.roles');
  const sort = <span style={{ display: 'inline-flex' }}><Icon d={PATH.down} size={16} width={1.6} /></span>;
  return (
    <StaggerReveal active>
      <div style={PANEL}></div>
      <div style={TITLE}>{ro('title')}</div>
      {ROLE_CARDS.map(({ key, left, width, border, colour }) => (
        <div key={key} style={{ position: 'absolute', left, top: 202, width, height: 135, border: `1.5px solid ${border}`, borderRadius: 10, boxSizing: 'border-box' }}>
          <div style={{ position: 'absolute', left: 17, top: 18, fontSize: 16.5, color: colour }}>{ro(`${key}.label`)}</div>
          <div style={{ position: 'absolute', left: 17, top: 47, width: width - 54, height: 39, border: '1px solid #DDD', borderRadius: 8, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 16.5 }}>{ro(`${key}.role`)}<Icon d={PATH.down} size={19} width={1.6} style={{ marginLeft: 'auto' }} /></div>
          <div style={{ position: 'absolute', left: 19, top: 95, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, color: '#555' }}><Icon d={PATH.info} size={17} stroke="#666" width={1.6} />{ro(`${key}.meta`)}</div>
        </div>
      ))}
      <Icon d={PATH.swap} size={24} stroke="#444" width={1.6} style={{ position: 'absolute', left: 951, top: 258 }} />
      <div style={{ position: 'absolute', left: 331, top: 362, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14.5, fontWeight: '500', color: '#555' }}>{ro('show')}</span>
        <div style={{ ...SEGMENTS, borderColor: '#EBEBEB', background: '#FAFAFA', color: '#555' }}><span style={SEGMENT_ON}>{ro('all')}</span><span style={SEGMENT}>{ro('shared')}</span><span style={SEGMENT}>{ro('differences')}</span></div>
      </div>
      <div style={{ position: 'absolute', right: 56, top: 372, fontSize: 14.5, color: '#555', whiteSpace: 'nowrap' }}>{ro.rich('counts', { b: (chunks) => <b style={{ fontWeight: '600', color: '#1A1A1A' }}>{chunks}</b> })}</div>
      <div style={{ position: 'absolute', left: 312, top: 422, width: 1344, ...BOX }}>
        <span style={{ position: 'absolute', left: 629, top: 0, bottom: 0, width: 1, background: '#E3E3E3' }}></span>
        <div style={{ display: 'grid', gridTemplateColumns: ROLE_COLUMNS, height: 41, alignItems: 'center', fontSize: 16.5 }}>
          <span style={{ paddingLeft: 19, color: '#4B4DF7' }}>{ro('columnA')}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{t('compare.priority')}{sort}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{t('compare.proficiency')}{sort}</span>
          <span style={{ paddingLeft: 19, color: '#E8731E', whiteSpace: 'nowrap' }}>{ro('columnB')}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{t('compare.priority')}{sort}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{t('compare.proficiency')}{sort}</span>
        </div>
        {ROLES.map(([key, a, b]) => (
          <div key={key} style={{ display: 'grid', gridTemplateColumns: ROLE_COLUMNS, height: 40.6, alignItems: 'center', borderTop: '1px solid #F0F0F0', fontSize: 16.5 }}>
            <RoleCells name={ro(`skills.${key}`)} side={a} />
            <RoleCells name={ro(`skills.${key}`)} side={b} />
          </div>
        ))}
      </div>
    </StaggerReveal>
  );
}

export function MapPageScreen({ screen, label }: { screen: MapPageScreenId; label: string }) {
  return (
    <MapWindow label={label} nav={screen === 'skills' ? 'skills' : screen === 'list' ? 'jobs' : null}>
      {screen === 'skills' && <MapSkillsDemo active />}
      {screen === 'list' && <ListScreen />}
      {screen === 'profile' && <ProfileScreen />}
      {screen === 'roles' && <RolesScreen />}
    </MapWindow>
  );
}
