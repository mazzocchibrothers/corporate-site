// Sample data behind the Skillvue Assess product visuals. Structure only: the
// levels, percentages and which person or skill shows what. Every word the
// visuals draw is in the catalogue under `product.skillvue-assess.visuals`.

/** A soft-skill level, 1 to 5. Hard skills are shown as level × 20%. */
export type Level = 1 | 2 | 3 | 4 | 5;

// ── Hero: team readiness ─────────────────────────────────────────────────────
export const TEAM_SKILLS = ['leadership', 'customerCare', 'coaching', 'compliance'] as const;
export type TeamSkill = (typeof TEAM_SKILLS)[number];

export const TEAM_NEEDED: Record<TeamSkill, Level> = {
  leadership: 4,
  customerCare: 3,
  coaching: 3,
  compliance: 4,
};

export const TEAM: {
  id: 'emily' | 'lukas' | 'jessica';
  fit: number;
  levels: Record<TeamSkill, Level>;
  /** null: ready for the role. A skill: the one to develop. */
  develop: TeamSkill | null;
}[] = [
  { id: 'emily', fit: 91, levels: { leadership: 4, customerCare: 4, coaching: 3, compliance: 5 }, develop: null },
  { id: 'lukas', fit: 78, levels: { leadership: 3, customerCare: 4, coaching: 3, compliance: 4 }, develop: 'leadership' },
  { id: 'jessica', fit: 72, levels: { leadership: 4, customerCare: 3, coaching: 1, compliance: 4 }, develop: 'coaching' },
];

// ── How it works ─────────────────────────────────────────────────────────────
/** A person's measured level on each skill of the role, against the level it needs. */
export const ROLE_PROFILE: { skill: 'leadership' | 'customerCare' | 'teamLeadership'; level: Level; needed: Level }[] = [
  { skill: 'leadership', level: 3, needed: 4 },
  { skill: 'customerCare', level: 3, needed: 3 },
  { skill: 'teamLeadership', level: 3, needed: 4 },
];

export const CAPABILITY = { soft: 4 as Level, softNeeded: 5 as Level, hardPercent: 70 };

export const DECISION = {
  level: 3 as Level,
  needed: 4 as Level,
  options: ['hire', 'promote', 'develop', 'move'] as const,
  chosen: 'develop' as const,
};

// Waveform bar heights, in px, as drawn in the design.
export const WAVE_SHORT = [5, 11, 7, 15, 9, 16, 6, 13, 8, 15, 5, 11, 9, 14, 7, 5];
export const WAVE_LONG = [...WAVE_SHORT, 9, 14, 6, 12, 16, 8, 11, 5, 13, 7, 15, 10, 6, 12, 9, 5];

// ── Step 1: question generator ───────────────────────────────────────────────
export const GENERATOR = {
  level: 3 as Level,
  contexts: ['procedures', 'jobDescription', 'regionRules'] as const,
  pipeline: ['draft', 'critique', 'refine', 'check'] as const,
  /** Skeleton text lines per drafted question, as % of the card's width. */
  ready: [89, 73, 50],
  expert: [81, 56],
};

// ── Step 2: the conversation ─────────────────────────────────────────────────
export const CHANNELS = ['whatsapp', 'teams', 'web'] as const;
export type Channel = (typeof CHANNELS)[number];

// ── Step 3: framework mapping ────────────────────────────────────────────────
export const MAPPING = {
  yours: ['customerFirst', 'peopleLeadership', 'getsResults'] as const,
  science: ['leading', 'focusingOnOthers', 'deliveringResults'] as const,
  /** [index in `yours`, index in `science`] */
  links: [
    [0, 1],
    [1, 0],
    [2, 2],
  ] as const,
  /** Hard-skill scale: filled segments out of five. */
  hardFilled: 3,
};

// ── What you get: readiness report ───────────────────────────────────────────
export const REPORT: { id: 'leading' | 'salesKpi' | 'focusing' | 'delivering' | 'haccp'; hard: boolean; level: Level; needed: Level }[] = [
  { id: 'leading', hard: false, level: 4, needed: 4 },
  { id: 'salesKpi', hard: true, level: 2, needed: 4 },
  { id: 'focusing', hard: false, level: 5, needed: 4 },
  { id: 'delivering', hard: false, level: 3, needed: 4 },
  { id: 'haccp', hard: true, level: 5, needed: 4 },
];
/** The skill the report shows when it is not cycling (and with reduced motion). */
export const REPORT_DEFAULT = 1;
/** Skeleton lines in the report's evidence and reasoning blocks, as % width. */
export const REPORT_EVIDENCE = [92, 74, 84, 46];
export const REPORT_WHY = [96, 68];

// ── The science ──────────────────────────────────────────────────────────────
export const EXPERT_MATCH = { expert: 4 as Level, assess: 4 as Level };

// ── Why Skillvue: comparison ─────────────────────────────────────────────────
export type Verdict = 'yes' | 'no' | 'partly';
export const COMPARISON_COLUMNS = ['assess', 'ratings', 'inference', 'tests'] as const;
export const COMPARISON: { id: 'measures' | 'builtOn' | 'oneScale' | 'evidence' | 'scale'; cells: [Verdict, Verdict, Verdict, Verdict] }[] = [
  { id: 'measures', cells: ['yes', 'no', 'partly', 'yes'] },
  { id: 'builtOn', cells: ['yes', 'yes', 'partly', 'no'] },
  { id: 'oneScale', cells: ['yes', 'no', 'partly', 'no'] },
  { id: 'evidence', cells: ['yes', 'no', 'no', 'partly'] },
  { id: 'scale', cells: ['yes', 'partly', 'yes', 'yes'] },
];
