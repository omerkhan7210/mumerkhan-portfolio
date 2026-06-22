'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useCountUp } from './calculators/useCountUp';
import { encodeState, decodeState } from './calculators/shareState';
import ShareButton from './calculators/ShareButton';
import BreakdownBars, { BreakdownItem } from './calculators/BreakdownBars';
import PaybackChart from './calculators/PaybackChart';
import EmailCapture from './calculators/EmailCapture';

const COMPLEXITY: { id: 'simple' | 'medium' | 'complex'; label: string; sub: string; setupCost: [number, number] }[] = [
  { id: 'simple', label: 'Simple', sub: '1-2 apps, no branching logic', setupCost: [300, 700] },
  { id: 'medium', label: 'Medium', sub: 'A few steps, some conditions', setupCost: [700, 1800] },
  { id: 'complex', label: 'Complex', sub: 'Multi-branch, custom logic, error handling', setupCost: [1800, 4500] },
];

type Complexity = 'simple' | 'medium' | 'complex';
type State = {
  hoursPerWeek: number;
  hourlyRate: number;
  teamMembers: number;
  complexity: Complexity;
  onZapier: boolean;
  monthlyTasks: number;
};
const DEFAULT_STATE: State = { hoursPerWeek: 8, hourlyRate: 25, teamMembers: 1, complexity: 'medium', onZapier: false, monthlyTasks: 5000 };

const STEPS = ['hours', 'rate', 'team', 'complexity', 'tools', 'result'] as const;

export default function AutomationRoiCalculator() {
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const [step, setStep] = useState(0);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    if (s) {
      const decoded = decodeState<State>(s);
      if (decoded) {
        setState(decoded);
        setStep(STEPS.length - 1);
      }
    }
  }, []);

  useEffect(() => {
    const encoded = encodeState(state);
    setShareUrl(`https://mumerkhan.com/tools/automation-roi-calculator?s=${encoded}`);
  }, [state]);

  const update = <K extends keyof State>(key: K, value: State[K]) => setState((s) => ({ ...s, [key]: value }));

  const result = useMemo(() => {
    const monthlyHoursSaved = state.hoursPerWeek * 4.33 * state.teamMembers;
    const monthlyLaborSavings = monthlyHoursSaved * state.hourlyRate;
    const annualLaborSavings = monthlyLaborSavings * 12;

    const tier = COMPLEXITY.find((c) => c.id === state.complexity)!;
    const setupLow = tier.setupCost[0];
    const setupHigh = tier.setupCost[1];
    const setupMid = (setupLow + setupHigh) / 2;

    let estimatedToolBill = 0;
    if (state.onZapier) {
      if (state.monthlyTasks <= 2000) estimatedToolBill = 30;
      else if (state.monthlyTasks <= 10000) estimatedToolBill = 75;
      else if (state.monthlyTasks <= 50000) estimatedToolBill = 300;
      else estimatedToolBill = 800;
    }
    const n8nCost = 15;
    const monthlyToolSavings = state.onZapier ? Math.max(estimatedToolBill - n8nCost, 0) : 0;

    const totalMonthlySavings = monthlyLaborSavings + monthlyToolSavings;
    const paybackMonths = totalMonthlySavings > 0 ? setupMid / totalMonthlySavings : 0;

    return {
      monthlyHoursSaved: Math.round(monthlyHoursSaved),
      monthlyLaborSavings: Math.round(monthlyLaborSavings),
      annualLaborSavings: Math.round(annualLaborSavings),
      monthlyToolSavings: Math.round(monthlyToolSavings),
      totalMonthlySavings: Math.round(totalMonthlySavings),
      setupLow,
      setupHigh,
      setupMid,
      paybackMonths: Math.max(paybackMonths, 0.1),
    };
  }, [state]);

  const breakdown = useMemo<BreakdownItem[]>(() => {
    const items: BreakdownItem[] = [
      { label: 'Labor time saved', amount: result.monthlyLaborSavings, color: '#C8FF00' },
    ];
    if (result.monthlyToolSavings > 0) {
      items.push({ label: 'Tool billing saved (vs Zapier/Make)', amount: result.monthlyToolSavings, color: '#60A5FA' });
    }
    return items;
  }, [result]);

  const animatedAnnual = useCountUp(result.annualLaborSavings);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 36 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#C8FF00' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
        ))}
      </div>

      {step === 0 && (
        <Step title={`Hours/week spent on this manual task: ${state.hoursPerWeek}h`}>
          <input type="range" min={1} max={40} value={state.hoursPerWeek} onChange={(e) => update('hoursPerWeek', Number(e.target.value))} style={sliderStyle} />
          <button onClick={next} className="btn-lime" style={{ marginTop: 24 }}>Continue →</button>
        </Step>
      )}

      {step === 1 && (
        <Step title={`Hourly cost of the person doing it: $${state.hourlyRate}/hr`} onBack={back}>
          <input type="range" min={10} max={150} step={5} value={state.hourlyRate} onChange={(e) => update('hourlyRate', Number(e.target.value))} style={sliderStyle} />
          <button onClick={next} className="btn-lime" style={{ marginTop: 24 }}>Continue →</button>
        </Step>
      )}

      {step === 2 && (
        <Step title={`People doing this task: ${state.teamMembers}`} onBack={back}>
          <input type="range" min={1} max={20} value={state.teamMembers} onChange={(e) => update('teamMembers', Number(e.target.value))} style={sliderStyle} />
          <button onClick={next} className="btn-lime" style={{ marginTop: 24 }}>Continue →</button>
        </Step>
      )}

      {step === 3 && (
        <Step title="Workflow complexity" onBack={back}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {COMPLEXITY.map((c) => (
              <button key={c.id} onClick={() => { update('complexity', c.id); next(); }} style={optionCard(state.complexity === c.id)}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{c.label}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{c.sub}</span>
              </button>
            ))}
          </div>
        </Step>
      )}

      {step === 4 && (
        <Step title="Currently paying for Zapier or Make?" onBack={back}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: state.onZapier ? 18 : 0 }}>
            <button onClick={() => update('onZapier', false)} style={optionCard(!state.onZapier, true)}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>No / not yet</span>
            </button>
            <button onClick={() => update('onZapier', true)} style={optionCard(state.onZapier, true)}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Yes</span>
            </button>
          </div>
          {state.onZapier && (
            <div style={{ marginBottom: 20 }}>
              <p style={fieldLabel}>
                Approx. automation tasks/month: <span style={{ color: '#C8FF00' }}>{state.monthlyTasks.toLocaleString()}</span>
              </p>
              <input type="range" min={500} max={100000} step={500} value={state.monthlyTasks} onChange={(e) => update('monthlyTasks', Number(e.target.value))} style={sliderStyle} />
            </div>
          )}
          <button onClick={next} className="btn-lime">See my results →</button>
        </Step>
      )}

      {step === 5 && (
        <div>
          <button onClick={back} style={backLink}>← Edit answers</button>
          <div
            style={{
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(200,255,0,0.06), rgba(255,255,255,0.02))',
              border: '1px solid rgba(200,255,0,0.18)',
              padding: 'clamp(24px, 5vw, 40px)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>
              Estimated annual savings
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.4rem, 7vw, 4rem)', color: '#C8FF00', letterSpacing: '-0.03em', lineHeight: 1 }}>
              ${animatedAnnual.toLocaleString()}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginTop: 10 }}>
              {result.monthlyHoursSaved} hours/month freed up
              {result.monthlyToolSavings > 0 && <> · plus ~${result.monthlyToolSavings.toLocaleString()}/month saved switching tool billing to n8n</>}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <Stat label="Setup cost (est.)" value={`$${result.setupLow.toLocaleString()}–${result.setupHigh.toLocaleString()}`} />
              <Stat label="Payback period" value={`~${result.paybackMonths.toFixed(1)} mo`} />
              <Stat label="Monthly savings" value={`$${result.monthlyLaborSavings.toLocaleString()}`} />
            </div>

            <PaybackChart setupCost={result.setupMid} monthlySavings={result.totalMonthlySavings} />
            <BreakdownBars items={breakdown} />

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginTop: 20, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
              Rough estimate for planning purposes — actual setup cost depends on the specific apps and logic involved.
            </p>

            <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-lime">Get a workflow built</Link>
              <Link href="/services/n8n-automation" className="btn-outline">See automation service</Link>
            </div>

            <EmailCapture
              tool="Automation ROI Calculator"
              resultHeadline={`Estimated annual savings: $${result.annualLaborSavings.toLocaleString()}`}
              resultLines={[
                `${result.monthlyHoursSaved} hours/month freed up`,
                `Payback period: ~${result.paybackMonths.toFixed(1)} months`,
                `Setup cost estimate: $${result.setupLow.toLocaleString()}–$${result.setupHigh.toLocaleString()}`,
              ]}
              shareUrl={shareUrl}
              inputs={state}
              result={result}
            />

            <div style={{ marginTop: 18 }}>
              <ShareButton url={shareUrl} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: '#fff' }}>{value}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
    </div>
  );
}

function Step({ title, children, onBack }: { title: string; children: React.ReactNode; onBack?: () => void }) {
  return (
    <div>
      {onBack && <button onClick={onBack} style={backLink}>← Back</button>}
      <p style={fieldLabel}>{title}</p>
      {children}
    </div>
  );
}

const fieldLabel: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  fontWeight: 600,
  color: '#fff',
  marginBottom: 18,
  letterSpacing: '-0.01em',
};

const backLink: React.CSSProperties = {
  display: 'inline-block',
  marginBottom: 16,
  fontFamily: 'var(--font-body)',
  fontSize: '0.8rem',
  color: 'rgba(255,255,255,0.4)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
};

const sliderStyle: React.CSSProperties = {
  width: '100%',
  height: 6,
  borderRadius: 3,
  background: 'rgba(255,255,255,0.1)',
  accentColor: '#C8FF00',
  cursor: 'pointer',
};

function optionCard(active: boolean, compact = false): React.CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: compact ? '14px 18px' : '18px 20px',
    borderRadius: 14,
    border: active ? '1.5px solid #C8FF00' : '1.5px solid rgba(255,255,255,0.08)',
    background: active ? 'rgba(200,255,0,0.07)' : 'rgba(255,255,255,0.02)',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background 0.2s',
    minWidth: compact ? 160 : undefined,
  };
}
