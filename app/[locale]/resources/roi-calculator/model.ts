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

export type ReportContact = { name: string; company: string; industry: string; date: Date };

export function reportContent({ contact, module, scenario, values, locale, translate: t, demoUrl }: {
  contact: ReportContact; module: Module; scenario: Scenario; values: number[]; locale: string;
  translate: (key: string, values?: Record<string, string | number>) => string; demoUrl: string;
}) {
  const inputs = MODULES[module].inputs.map((input, i) => normalizeInput(values[i], input));
  const result = calculate(module, inputs[0], inputs[1], scenario);
  const euro = (value: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  const number = (value: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
  const pct = (value: number) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(value);
  const multiplier = SCENARIOS[scenario];
  const assumptions = {
    hiring: [[t('report.salaryMultiple'), 'failedHireCost'], [pct(0.15), 'baselineFailure'], [pct(0.1 * multiplier), 'failedHireReduction'], [pct(0.5 * multiplier), 'screeningCut'], [t('report.hourlyCost', { amount: euro(40) }), 'recruiterCost']],
    promote: [[pct(0.08), 'promotionRate'], [pct(0.4), 'baselineFailure'], [pct(0.1 * multiplier), 'failureReduction'], [t('report.salaryMultiple'), 'failedPromotionCost']],
    develop: [[pct(0.05), 'leadershipShare'], [pct(0.15), 'leadershipTurnover'], [t('report.months', { count: 4 }), 'vacancyDuration'], [pct(1), 'productivityLoss'], [pct(0.3 * multiplier), 'durationReduction']],
    derisk: [[pct(0.5), 'workforceImpacted'], [pct(0.3), 'failureProbability'], [euro(1000), 'employeeCost'], [pct(0.1 * multiplier), 'riskReduction']],
  }[module];
  assumptions.push([euro(LICENSE), 'license']);
  const sector = ['luxury', 'retail', 'banking', 'insurance', 'pharma', 'manufacturing'].includes(contact.industry) ? contact.industry : null;
  return {
    title: t('report.title', { company: contact.company }),
    meta: t('report.preparedFor', { name: contact.name, date: new Intl.DateTimeFormat(locale === 'it' ? 'it' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(contact.date) }),
    pill: sector ? t(`report.sectors.${sector}.label`) : t(`${module}.tab`),
    metrics: [
      { label: t(module === 'derisk' ? 'annualValue' : 'annualSavings'), value: euro(result.total) },
      { label: t('roi'), value: pct(result.roi / 100) },
      { label: t('payback'), value: result.payback < 1 ? '<1' : new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(result.payback) },
    ],
    inputsHeading: t('report.inputs'),
    inputs: MODULES[module].inputs.map((input, i) => ({ label: t(`${module}.input${i + 1}`), value: 'currency' in input && input.currency ? euro(inputs[i]) : number(inputs[i]) })),
    driversHeading: t('report.drivers'),
    drivers: [
      { label: t(`${module}.driver`), value: euro(result.hard) },
      ...(result.soft > 0 ? [{ label: t('softDriver'), value: euro(result.soft) }] : []),
    ],
    assumptionsHeading: t('report.assumptions', { scenario: t(`scenarios.${scenario}`) }),
    assumptions: assumptions.map(([value, key]) => ({ value, label: t(`report.assumptionLabels.${key}`) })),
    sector: sector ? { label: t(`report.sectors.${sector}.label`), body: t(`report.sectors.${sector}.body`) } : null,
    disclaimer: t('report.disclaimer'),
    priceNote: t('report.priceNote'),
    cta: t('report.cta'), demoUrl,
    copyright: t('report.copyright', { year: contact.date.getFullYear() }),
    locale,
  };
}
