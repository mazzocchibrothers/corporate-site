export const LICENSE = 100_000;
export const SCENARIOS = { conservative: 0.8, base: 1, optimistic: 1.2 };
export type Scenario = keyof typeof SCENARIOS;
export type Module = keyof typeof MODULES;

type Input = { min: number; max: number; step: number; initial: number; currency?: boolean };
export const MODULES = {
  hiring: {
    cap: 500,
    inputs: [
      { min: 50, max: 800, step: 5, initial: 300 },
      { min: 30_000, max: 120_000, step: 1_000, initial: 50_000, currency: true },
    ],
  },
  promote: {
    cap: 1_000,
    inputs: [
      { min: 500, max: 20_000, step: 100, initial: 4_000 },
      { min: 30_000, max: 150_000, step: 1_000, initial: 50_000, currency: true },
    ],
  },
  develop: {
    cap: 500,
    inputs: [
      { min: 500, max: 20_000, step: 100, initial: 4_000 },
      { min: 60_000, max: 200_000, step: 2_000, initial: 90_000, currency: true },
    ],
  },
  derisk: {
    cap: 500,
    inputs: [
      { min: 500_000, max: 10_000_000, step: 100_000, initial: 2_000_000, currency: true },
      { min: 500, max: 20_000, step: 100, initial: 4_000 },
    ],
  },
} satisfies Record<string, { cap: number; inputs: Input[] }>;

export function normalizeInput(value: number, input: Input) {
  if (!Number.isFinite(value)) return input.initial;
  return Math.min(input.max, Math.max(input.min,
    input.min + Math.round((value - input.min) / input.step) * input.step));
}

// Formulas and fixed assumptions from the supplied ROI calculator prototype.
export function calculate(module: Module, first: number, second: number, scenario: Scenario) {
  const [v1, v2] = [first, second].map((value, i) => normalizeInput(value, MODULES[module].inputs[i]));
  const multiplier = SCENARIOS[scenario];
  let hard = 0;
  let soft = 0;
  switch (module) {
    case 'hiring':
      hard = v1 * 0.15 * 0.10 * multiplier * v2;
      soft = (v1 * 100 * 5 / 60) * 0.50 * multiplier * 40;
      break;
    case 'promote':
      hard = v1 * 0.08 * 0.40 * 0.10 * multiplier * v2;
      break;
    case 'develop':
      hard = v1 * 0.05 * 0.15 * 4 * 0.30 * multiplier * (v2 / 12);
      break;
    case 'derisk':
      hard = (v1 * 0.30 + v2 * 0.50 * 1_000) * 0.10 * multiplier;
      break;
  }
  const total = hard + soft;
  return { hard, soft, total, roi: (total - LICENSE) / LICENSE * 100, payback: LICENSE / (total / 12) };
}
