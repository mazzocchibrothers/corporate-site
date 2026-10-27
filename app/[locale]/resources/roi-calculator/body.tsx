'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { href } from '@/i18n/routes';
import { MODULES, SCENARIOS, LICENSE, calculate, normalizeInput, type Module, type Scenario } from './model';
import styles from './calculator.module.css';
import ReportForm from './report-form';

function NumberField({ label, value, config, format, onChange, id }: {
  label: string; value: number; config: typeof MODULES.hiring.inputs[number];
  format: (value: number) => string; onChange: (value: number) => void; id: string;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <div>
      <div className={styles.fieldHead}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        <input id={id} className={styles.value} type="text" inputMode="numeric" autoComplete="off"
          value={draft ?? format(value)}
          onFocus={(event) => { setDraft(String(value)); event.target.select(); }}
          onChange={(event) => {
            const text = event.target.value;
            if (!/^\d*$/.test(text)) return;
            setDraft(text);
            if (text !== '') onChange(normalizeInput(Number(text), config));
          }}
          onBlur={() => setDraft(null)}
          onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur(); }} />
      </div>
      <input className={styles.slider} type="range" min={config.min} max={config.max} step={config.step}
        value={value} aria-label={label} aria-valuetext={format(value)}
        onChange={(event) => onChange(Number(event.target.value))} />
      <div className={styles.ticks}><span>{format(config.min)}</span><span>{format(config.max)}</span></div>
    </div>
  );
}

export default function ROICalculator() {
  const t = useTranslations('roi-calculator');
  const locale = useLocale();
  const [module, setModule] = useState<Module>('hiring');
  const [scenario, setScenario] = useState<Scenario>('base');
  const [reportOpen, setReportOpen] = useState(false);
  const [moduleValues, setModuleValues] = useState(() => Object.fromEntries(
    Object.entries(MODULES).map(([key, config]) => [key, config.inputs.map((input) => input.initial)]),
  ) as Record<Module, number[]>);
  const values = moduleValues[module];
  const config = MODULES[module];
  const result = calculate(module, values[0], values[1], scenario);
  const low = calculate(module, values[0], values[1], 'conservative');
  const high = calculate(module, values[0], values[1], 'optimistic');
  const under = result.total <= LICENSE;
  const fraction = Math.max(0, Math.min(1, result.roi / config.cap));
  const currency = (value: number) => new Intl.NumberFormat(locale, {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(value);
  const number = (value: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
  const percent = (value: number) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(value);
  const bookLink = <Button asChild mode="dark"><a href={href('book-meeting', locale)}>{t('bookDemo')}</a></Button>;

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.wrap}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>{t('eyebrow')}</p>
            <h1 className="font-semibold text-[48px] md:text-[64px] tracking-[-0.02em]" style={{ lineHeight: 1.05 }}>{t('heading')}</h1>
            <p className={styles.intro}>{t('intro')}</p>
          </header>
          <div className={styles.modules} role="group" aria-label={t('useCase')}>
            {(Object.keys(MODULES) as Module[]).map((key) => (
              <button key={key} type="button" aria-pressed={module === key} onClick={() => setModule(key)}>{t(`${key}.tab`)}</button>
            ))}
          </div>
          <div className={styles.grid}>
            <section aria-labelledby="calculator-heading">
              <div className={styles.positioning}>
                <p className={styles.eyebrow}>{t('positioning')}</p>
                <p>{t('positioningBody')}</p>
              </div>
              <h2 id="calculator-heading" className={styles.headline}>{t.rich(`${module}.heading`, {
                span: (chunks) => <span className="gradient-text">{chunks}</span>,
              })}</h2>
              <p className={styles.sub}>{t(`${module}.body`)}</p>
              <div className={styles.controls}>
                {config.inputs.map((input, index) => (
                  <NumberField key={`${module}-${index}`} id={`roi-input-${index}`} label={t(`${module}.input${index + 1}`)}
                    value={values[index]} config={input} format={'currency' in input && input.currency ? currency : number}
                    onChange={(value) => setModuleValues((current) => ({ ...current, [module]: current[module].map((previous, i) => i === index ? value : previous) }))} />
                ))}
              </div>
              <div className={styles.actions}>
                {bookLink}
                <Button mode="dark" variant="secondary" onClick={() => setReportOpen(true)} icon={null}>{t('downloadReport')}</Button>
              </div>
            </section>
            <section className={styles.instrument} aria-label={t('results')}>
              <div className={styles.scenarios} role="group" aria-label={t('scenario')}>
                {(Object.keys(SCENARIOS) as Scenario[]).map((key) => (
                  <button type="button" key={key} aria-pressed={scenario === key} onClick={() => setScenario(key)}>{t(`scenarios.${key}`)}</button>
                ))}
              </div>
              <div className={styles.gaugeWrap}>
                <svg className={styles.gauge} viewBox="0 0 300 176" aria-hidden="true">
                  {[0, 1, 2, 3, 4, 5].map((tick) => {
                    const angle = (180 - tick * 36) * Math.PI / 180;
                    return <line key={tick} x1={150 + 109 * Math.cos(angle)} y1={150 - 109 * Math.sin(angle)}
                      x2={150 + 118 * Math.cos(angle)} y2={150 - 118 * Math.sin(angle)} stroke="currentColor" opacity="0.2" strokeWidth="1.5" />;
                  })}
                  <path d="M 26 150 A 124 124 0 0 1 274 150" fill="none" stroke="currentColor" opacity="0.1" strokeWidth="10" strokeLinecap="round" />
                  <path className={styles.arc} d="M 26 150 A 124 124 0 0 1 274 150" fill="none" strokeWidth="10" strokeLinecap="round"
                    pathLength="100" strokeDasharray="100" strokeDashoffset={100 * (1 - fraction)} />
                  <g className={styles.needle} style={{ transform: `rotate(${-90 + fraction * 180}deg)` }}>
                    <line x1="150" y1="150" x2="150" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="150" cy="150" r="7" fill="#0d0d1f" stroke="currentColor" strokeWidth="2.5" />
                  </g>
                </svg>
                <div className={styles.readout} aria-live="polite" aria-atomic="true">
                  <p className={styles.amount} data-testid="roi-total">{currency(result.total)}</p>
                  <p className={styles.label}>{t(module === 'derisk' ? 'annualValue' : 'annualSavings')}</p>
                </div>
              </div>
              {under ? <p className={styles.fit}>{t('fit')}</p> : <>
                <p className={styles.range}>{t('scenarios.conservative')} <b>{currency(low.total)}</b> · {t('scenarios.optimistic')} <b>{currency(high.total)}</b></p>
                <p className={styles.roi}><strong data-testid="roi-percent">{percent(result.roi / 100)}</strong> {t('roi')}</p>
              </>}
              <div className={styles.breakdown}>
                <div className={styles.bar} aria-hidden="true">
                  <span style={{ width: `${result.hard / result.total * 100}%` }} />
                  {result.soft > 0 && <span className={styles.softBar} style={{ width: `${result.soft / result.total * 100}%` }} />}
                </div>
                <div className={styles.driver}><span><b>{t(`${module}.driver`)}</b><small>{t(`${module}.driverSub`)}</small></span><strong>{currency(result.hard)}</strong></div>
                {result.soft > 0 && <div className={`${styles.driver} ${styles.softDriver}`}><span><b>{t('softDriver')}</b><small>{t('softDriverSub')}</small></span><strong>{currency(result.soft)}</strong></div>}
              </div>
              {!under && <p className={styles.payback}><strong>{result.payback < 1 ? '<1' : new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(result.payback)}</strong><span>{t('payback')}</span></p>}
            </section>
          </div>
        </div>
        {/* The closing banner every page ends on (CustomersFinalCTA), kept to this page's column. */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24">
          <div className={styles.wrap}>
            <Reveal
              duration={0.7}
              className="rounded-[32px] border border-white/[0.12] backdrop-blur-sm px-6 py-16 md:px-20 md:py-20 flex flex-col items-center text-center gap-10"
              style={{ backgroundImage: 'linear-gradient(19deg, rgba(146,147,255,0.1) 3%, rgba(255,255,255,0.1) 52%, rgba(255,127,73,0.15) 95%)' }}
            >
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white/90 max-w-4xl">{t.rich('closing', {
                span: (chunks) => <span className="font-semibold gradient-text">{chunks}</span>,
              })}</h2>
              <Button asChild variant="primary" mode="dark">
                <a href={href('book-meeting', locale)}>
                  <span>{t('bookDemo')}</span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      {reportOpen && <ReportForm onClose={() => setReportOpen(false)} module={module} scenario={scenario} values={values} />}
      <Footer />
    </>
  );
}
