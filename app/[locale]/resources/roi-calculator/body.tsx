'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { href } from '@/i18n/routes';
import { MODULES, SCENARIOS, LICENSE, calculate, normalizeInput, type Module, type Scenario } from './model';
import { ArrowDown } from 'lucide-react';
import styles from './calculator.module.css';
import ReportForm from './report-form';
import { HeroCopy } from '@/components/ui/hero-copy';
import { ClosingPanel } from '@/components/shared/ClosingPanel';

/**
 * The light ROI calculator (the Talent ROI Calculator v6 design): a centred
 * hero, the calculator as one white card on the grey section (tabs across the
 * top, inputs left, results right), one button under it to the report form,
 * the report form inline, and the shared light closing. Type sizes are a step
 * below the design's, as asked for this page.
 */

type Input = typeof MODULES.hiring.inputs[number];

function NumberField({ label, unit, value, input, id, onChange }: {
  label: string; unit?: string; value: number; input: Input; id: string; onChange: (value: number) => void;
}) {
  const t = useTranslations('roi-calculator');
  const locale = useLocale();
  const [draft, setDraft] = useState<string | null>(null);
  const currency = 'currency' in input && input.currency;
  // Thousands grouped in both languages (Italian too: 4.000, not 4000).
  const grouped = (n: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 0, useGrouping: 'always' }).format(n);
  // Where the euro sign goes in this language: before the number (€50,000) or after it (50.000 €).
  const euroFirst = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).formatToParts(1)[0].type === 'currency';
  const hint = currency && euroFirst
    ? t('range', { min: `€${grouped(input.min)}`, max: `€${grouped(input.max)}` })
    : currency
      ? t('rangeUnit', { min: grouped(input.min), max: grouped(input.max), unit: '€' })
      : unit ? t('rangeUnit', { min: grouped(input.min), max: grouped(input.max), unit }) : t('range', { min: grouped(input.min), max: grouped(input.max) });
  const fill = ((value - input.min) / (input.max - input.min) * 100).toFixed(2);
  return (
    <div className={styles.field}>
      <div className={styles.fieldRow}>
        <div className={styles.fieldLabel}>
          <label className="type-body-sm font-medium text-[#121212]" htmlFor={id}>{label}</label>
          <span id={`${id}-range`} className="type-caption text-[#707070]">{hint}</span>
        </div>
        <div className={styles.valueBox}>
          {currency && euroFirst && <span className={styles.euro} aria-hidden="true">€</span>}
          <input id={id} className={`${styles.value} font-display`} type="text" inputMode="numeric" autoComplete="off"
            aria-describedby={`${id}-range`}
            value={draft ?? grouped(value)}
            onFocus={(event) => { setDraft(String(value)); event.target.select(); }}
            onChange={(event) => {
              const text = event.target.value.replace(/\D/g, '').slice(0, 9);
              setDraft(text);
              if (text !== '') onChange(normalizeInput(Number(text), input));
            }}
            onBlur={() => setDraft(null)}
            onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur(); }} />
          {currency && !euroFirst && <span className={styles.euro} aria-hidden="true">€</span>}
        </div>
      </div>
      <input className={styles.slider} type="range" min={input.min} max={input.max} step={input.step}
        value={value} aria-label={label} aria-valuetext={currency ? `${grouped(value)} €` : grouped(value)}
        style={{ '--fill': `${fill}%` } as React.CSSProperties}
        onChange={(event) => onChange(Number(event.target.value))} />
    </div>
  );
}

export default function ROICalculator() {
  const t = useTranslations('roi-calculator');
  const locale = useLocale();
  const [module, setModule] = useState<Module>('hiring');
  const [scenario, setScenario] = useState<Scenario>('conservative');
  const [moduleValues, setModuleValues] = useState(() => Object.fromEntries(
    Object.entries(MODULES).map(([key, config]) => [key, config.inputs.map((input) => input.initial)]),
  ) as Record<Module, number[]>);
  const values = moduleValues[module];
  const config = MODULES[module];
  const result = calculate(module, values[0], values[1], scenario);
  // At this scale the license outweighs the modelled value: no payback to show.
  const under = result.total <= LICENSE;
  const currency = (value: number) => new Intl.NumberFormat(locale, {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always',
  }).format(value);
  const percent = (value: number) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(value);
  const share = (part: number) => percent(result.total > 0 ? part / result.total : 0);
  // To the report form below the fixed header (scroll-margin-top), then into its first field.
  const jumpToReport = (event: React.MouseEvent) => {
    const target = document.getElementById('report');
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    document.getElementById('roi-name')?.focus({ preventScroll: true });
  };
  const drivers = [
    { key: 'hard', label: t(`${module}.driver`), amount: result.hard, className: styles.hard },
    ...(result.soft > 0 ? [{ key: 'soft', label: t('softDriver'), amount: result.soft, className: styles.soft }] : []),
  ];
  const scenarioButtons = (Object.keys(SCENARIOS) as Scenario[]).map((key) => (
    <button type="button" key={key} className="font-medium" aria-pressed={scenario === key} onClick={() => setScenario(key)}>{t(`scenarios.${key}`)}</button>
  ));

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={`section-light ${styles.hero}`}>
          <div className={`${styles.wrap} ${styles.heroInner}`}>
            <p className="type-eyebrow text-[#4B4B4B]">{t('eyebrow')}</p>
            <HeroCopy>
              <h1 className="max-w-[840px] font-semibold text-[48px] md:text-[58px] tracking-[-0.02em] text-[#121212]" style={{ lineHeight: 1.1 }}>{t('heading')}</h1>
              <p className="hero-subtitle type-body-lg text-[#4B4B4B] mt-5">{t('intro')}</p>
            </HeroCopy>
          </div>
        </section>

        <section className={`section-breathe ${styles.calculatorSection}`} aria-label={t('calculator')}>
          <div className={styles.wrap}>
            <div className={styles.card}>
              <div className={styles.tabsBar}>
                <div className={styles.tabs} role="group" aria-label={t('useCase')}>
                  {(Object.keys(MODULES) as Module[]).map((key) => (
                    <button key={key} type="button" className="font-medium" aria-pressed={module === key} onClick={() => setModule(key)}>{t(`${key}.tab`)}</button>
                  ))}
                </div>
              </div>
              <div className={styles.panel}>
                <div className={styles.inputs}>
                  <div>
                    <h2 id="calculator-heading" className={styles.headline}>{t(`${module}.heading`)}</h2>
                    <p className="type-body-sm text-[#4B4B4B] mt-2">{t(`${module}.body`)}</p>
                  </div>
                  {config.inputs.map((input, index) => (
                    <NumberField key={`${module}-${index}`} id={`roi-input-${index}`} input={input}
                      label={t(`${module}.input${index + 1}`)}
                      unit={t.has(`${module}.unit${index + 1}`) ? t(`${module}.unit${index + 1}`) : undefined}
                      value={values[index]}
                      onChange={(value) => setModuleValues((current) => ({ ...current, [module]: current[module].map((previous, i) => i === index ? value : previous) }))} />
                  ))}
                </div>

                <div className={styles.results}>
                  <div className={styles.scenario}>
                    <p id="roi-scenario" className="type-eyebrow text-[#4B4B4B]">{t('scenario')}</p>
                    <div className={styles.scenarioBar}>
                      <div className={styles.scenarioTabs} role="group" aria-labelledby="roi-scenario">{scenarioButtons}</div>
                    </div>
                  </div>

                  <div className={styles.readout} aria-live="polite" aria-atomic="true">
                    <div className={styles.amountBox}>
                      <p className="type-caption text-[#4B4B4B]">{t('indicativeValue')}</p>
                      <p className={styles.amount} data-testid="roi-total">{currency(result.total)}</p>
                    </div>
                    <div className={styles.split}>
                      <div className={styles.bar} aria-hidden="true">
                        {drivers.map((driver) => (
                          <span key={driver.key} className={driver.className} style={{ width: `${driver.amount / result.total * 100}%` }} />
                        ))}
                      </div>
                      <ul className={styles.legend}>
                        {drivers.map((driver) => (
                          <li key={driver.key} className="type-caption">
                            <span className={`${styles.swatch} ${driver.className}`} aria-hidden="true" />
                            <span className="text-[#4B4B4B]">{driver.label}</span>
                            <span className="font-medium text-[#121212]">{share(driver.amount)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.tiles}>
                      <div className={styles.tile}>
                        <p className="type-caption text-[#4B4B4B]">{t('roi')}</p>
                        <p className={`${styles.tileValue} stat-value`} data-testid="roi-percent">{percent(result.roi / 100)}</p>
                      </div>
                      <div className={styles.tile}>
                        <p className="type-caption text-[#4B4B4B]">{t('payback')}</p>
                        {under
                          ? <p className="type-body-sm text-[#121212]">{t('fit')}</p>
                          : <p className={`${styles.tileValue} stat-value`}>{result.payback < 1 ? t('paybackUnderOne') : new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(result.payback)}</p>}
                      </div>
                    </div>
                  </div>

                  <p className={`${styles.note} type-body-sm text-[#4B4B4B]`}>{t.rich('note', {
                    a: (chunks) => <a href={href('book-meeting', locale)}>{chunks}</a>,
                  })}</p>
                </div>
              </div>
            </div>
            {/* Under the card, centred: the way to the report form. */}
            <div className={styles.actions}>
              <a href="#report" onClick={jumpToReport} className={`${styles.outlineButton} type-button`}>
                {t('downloadReport')}<ArrowDown aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <ReportForm module={module} scenario={scenario} values={values} />

        <ClosingPanel
          id="demo"
          rule
          heading={t('closing')}
          body={t('closingBody')}
          href={href('book-meeting', locale)}
          cta={t('bookDemo')}
        />
      </main>
      <Footer />
    </>
  );
}
