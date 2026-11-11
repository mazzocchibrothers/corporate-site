// The illustrative report on /lp/safety-behaviour-assessment: one person,
// measured once, read against what two roles expect. Levels are 1–5. For an
// enabler or the accelerator the role sets a floor; for a drift it sets a
// ceiling, since less is better. Illustrative numbers, not a real person.

export type Kind = 'enabler' | 'drift' | 'accelerator';

// In the order of framework.columns[*].items in the catalogue:
// four enablers, four drifts, one accelerator.
export const KINDS: Kind[] = [
  'enabler', 'enabler', 'enabler', 'enabler',
  'drift', 'drift', 'drift', 'drift',
  'accelerator',
];

export const MEASURED = [4, 3, 4, 2, 2, 3, 1, 2, 4];

// One row per role, in the order of reporting.individual.roles.
export const EXPECTED = [
  [4, 3, 3, 2, 2, 2, 2, 3, 3],
  [4, 4, 4, 3, 2, 2, 2, 2, 4],
];

export const inLine = (kind: Kind, measured: number, expected: number) =>
  kind === 'drift' ? measured <= expected : measured >= expected;
