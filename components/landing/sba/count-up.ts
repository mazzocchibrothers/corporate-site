// The figures on /lp/safety-behaviour-assessment count up from zero, so each
// one is split into its number and the words after it, and the number is
// regrouped as it climbs. Italian groups thousands with a dot ("4.000
// miliardi"), English with a comma ("4,000 billion"): a figure keeps its own.

export type Figure = { n: number; rest: string; sep: '.' | ',' };

export function splitFigure(value: string): Figure {
  const m = value.match(/^([\d.,]+)(.*)$/);
  if (!m) return { n: 0, rest: value, sep: '.' };
  return { n: Number(m[1].replace(/[.,]/g, '')), rest: m[2], sep: m[1].includes(',') ? ',' : '.' };
}

export function groupFigure(n: number, sep: Figure['sep']): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}
