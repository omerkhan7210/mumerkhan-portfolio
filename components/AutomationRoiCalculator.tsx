'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useCountUp } from './calculators/useCountUp';
import { encodeState, decodeState } from './calculators/shareState';
import ShareButton from './calculators/ShareButton';
import BreakdownBars, { BreakdownItem } from './calculators/BreakdownBars';
import PaybackChart from './calculators/PaybackChart';
import EmailCapture from './calculators/EmailCapture';

type Category = 'leads' | 'data-entry' | 'reporting' | 'invoicing' | 'support' | 'social' | 'other';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'leads', label: 'Lead routing / CRM entry' },
  { id: 'data-entry', label: 'Manual data entry' },
  { id: 'reporting', label: 'Recurring reports' },
  { id: 'invoicing', label: 'Invoicing / billing' },
  { id: 'support', label: 'Customer support replies' },
  { id: 'social', label: 'Social media posting' },
  { id: 'other', label: 'Something else' },
];

/* Category-specific framing for the headline copy — same calculation
   underneath, but the result reads like it actually understood what
   was typed in, not a generic template. */
const CATEGORY_COPY: Record<Category, string> = {
  leads: 'on manually routing leads and updating your CRM',
  'data-entry': 'on manual data entry',
  reporting: 'building recurring reports by hand',
  invoicing: 'on manual invoicing and billing',
  support: 'writing repetitive support replies',
  social: 'manually scheduling and posting social content',
  other: 'on this manual process',
};

type ToolChoice = 'none' | 'zapier' | 'make' | 'other';

type State = {
  category: Category;
  hoursPerWeek: number;
  hourlyRate: number;
  teamMembers: number;
  appsCount: 1 | 2 | 3;
  needsBranching: boolean;
  needsErrorHandling: boolean;
  currentTool: ToolChoice;
  monthlyTasks: number;
};

const DEFAULT_STATE: State = {
  category: 'leads',
  hoursPerWeek: 8,
  hourlyRate: 25,
  teamMembers: 1,
  appsCount: 2,
  needsBranching: false,
  needsErrorHandling: false,
  currentTool: 'none',
  monthlyTasks: 5000,
};

const STEP_CATEGORY = 0;
const STEP_HOURS = 1;
const STEP_RATE = 2;
const STEP_TEAM = 3;
const STEP_WORKFLOW = 4;
const STEP_TOOLS = 5;
const STEP_RESULT = 6;
const TOTAL_STEPS = 7;

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
        setState({ ...DEFAULT_STATE, ...decoded });
        setStep(STEP_RESULT);
      }
    }
  }, []);

  useEffect(() => {
    const encoded = encodeState(state);
    setShareUrl(`https://mumerkhan.com/tools/automation-roi-calculator?s=${encoded}`);
  }, [state]);

  const set = <K extends keyof State>(key: K, value: State[K]) => setState((s) => ({ ...s, [key]: value }));
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  /* ── Complexity is computed from concrete answers, not self-labeled ──
     score: apps involved (1/2/3) + branching logic + error handling.
     This is the "dynamic" piece — two people who'd both vaguely call
     their workflow "medium" can land in different cost tiers depending
     on what they actually answered. */
  const complexity = useMemo(() => {
    const score = state.appsCount + (state.needsBranching ? 1 : 0) + (state.needsErrorHandling ? 1 : 0);
    if (score <= 2) return { tier: 'Simple' as const, setupCost: [300, 700] as [number, number] };
    if (score <= 4) return { tier: 'Medium' as const, setupCost: [700, 1800] as [number, number] };
    return { tier: 'Complex' as const, setupCost: [1800, 4500] as [number, number] };
  }, [state.appsCount, state.needsBranching, state.needsErrorHandling]);

  const result = useMemo(() => {
    const monthlyHoursSaved = state.hoursPerWeek * 4.33 * state.teamMembers;
    const monthlyLaborSavings = monthlyHoursSaved * state.hourlyRate;
    const annualLaborSavings = monthlyLaborSavings * 12;

    const setupLow = complexity.setupCost[0];
    const setupHigh = complexity.setupCost[1];
    const setupMid = (setupLow + setupHigh) / 2;

    let estimatedToolBill = 0;
    if (state.currentTool !== 'none') {
      if (state.monthlyTasks <= 2000) estimatedToolBill = 30;
      else if (state.monthlyTasks <= 10000) estimatedToolBill = 75;
      else if (state.monthlyTasks <= 50000) estimatedToolBill = 300;
      else estimatedToolBill = 800;
    }
    const n8nCost = 15;
    const monthlyToolSavings = state.currentTool !== 'none' ? Math.max(estimatedToolBill - n8nCost, 0) : 0;

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
  }, [state, complexity]);

  const breakdown = useMemo<BreakdownItem[]>(() => {
    const items: BreakdownItem[] = [{ label: 'Labor time saved', amount: result.monthlyLaborSavings, color: '#C8FF00' }];
    if (result.monthlyToolSavings > 0) {
      items.push({ label: `Tool billing saved (vs ${state.currentTool === 'make' ? 'Make' : 'Zapier'})`, amount: result.monthlyToolSavings, color: '#60A5FA' });
    }
    return items;
  }, [result, state.currentTool]);

  const animatedAnnual = useCountUp(result.annualLaborSavings);

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 36 }}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#C8FF00' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
        ))}
      </div>

      {step === STEP_CATEGORY && (
        <Step title="What are you trying to automate?">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => { set('category', c.id); next(); }} style={optionCard(state.category === c.id, true)}>
                <span style={cardTitle}>{c.label}</span>
              </button>
            ))}
          </div>
        </Step>
      )}

      {step === STEP_HOURS && (
        <Step title={`Hours/week spent ${CATEGORY_COPY[state.category]}: ${state.hoursPerWeek}h`} onBack={back}>
          <input type="range" min={1} max={40} value={state.hoursPerWeek} onChange={(e) => set('hoursPerWeek', Number(e.target.value))} style={sliderStyle} />
          <button onClick={next} className="btn-lime" style={{ marginTop: 24 }}>Continue →</button>
        </Step>
      )}

      {step === STEP_RATE && (
        <Step title={`Hourly cost of the person doing it: $${state.hourlyRate}/hr`} onBack={back}>
          <input type="range" min={10} max={150} step={5} value={state.hourlyRate} onChange={(e) => set('hourlyRate', Number(e.target.value))} style={sliderStyle} />
          <button onClick={next} className="btn-lime" style={{ marginTop: 24 }}>Continue →</button>
        </Step>
      )}

      {step === STEP_TEAM && (
        <Step title={`People doing this task: ${state.teamMembers}`} onBack={back}>
          <input type="range" min={1} max={20} value={state.teamMembers} onChange={(e) => set('teamMembers', Number(e.target.value))} style={sliderStyle} />
          <button onClick={next} className="btn-lime" style={{ marginTop: 24 }}>Continue →</button>
        </Step>
      )}

      {step === STEP_WORKFLOW && (
        <Step title="A bit about the workflow" onBack={back}>
          <FieldLabel>How many different apps/tools need to talk to each other?</FieldLabel>
          <ChoiceRow
            options={[{ id: '1', label: '1–2 apps' }, { id: '2', label: '3–5 apps' }, { id: '3', label: '6+ apps' }]}
            value={String(state.appsCount)}
            onChange={(v) => set('appsCount', Number(v) as State['appsCount'])}
          />
          <div style={{ marginTop: 18 }}>
            <ToggleRow label="Needs conditional branching (if/else logic)" value={state.needsBranching} onChange={(v) => set('needsBranching', v)} />
            <ToggleRow label="Needs error handling / retries (mission-critical)" value={state.needsErrorHandling} onChange={(v) => set('needsErrorHandling', v)} />
          </div>
          <button onClick={next} className="btn-lime" style={{ marginTop: 20 }}>Continue →</button>
        </Step>
      )}

      {step === STEP_TOOLS && (
        <Step title="Currently using an automation tool?" onBack={back}>
          <ChoiceRow
            options={[{ id: 'none', label: 'No / not yet' }, { id: 'zapier', label: 'Zapier' }, { id: 'make', label: 'Make' }, { id: 'other', label: 'Other' }]}
            value={state.currentTool}
            onChange={(v) => set('currentTool', v as ToolChoice)}
          />
          {state.currentTool !== 'none' && (
            <div style={{ marginTop: 20 }}>
              <FieldLabel>
                Approx. automation tasks/month: <Highlight>{state.monthlyTasks.toLocaleString()}</Highlight>
              </FieldLabel>
              <input type="range" min={500} max={100000} step={500} value={state.monthlyTasks} onChange={(e) => set('monthlyTasks', Number(e.target.value))} style={sliderStyle} />
            </div>
          )}
          <button onClick={next} className="btn-lime" style={{ marginTop: 20 }}>See my results →</button>
        </Step>
      )}

      {step === STEP_RESULT && (
        <div>
          <button onClick={back} style={backLink}>← Edit answers</button>
          <div style={resultBox}>
            <p style={resultLabel}>Estimated annual savings</p>
            <p style={resultNumber}>${animatedAnnual.toLocaleString()}</p>
            <p style={resultSub}>
              {result.monthlyHoursSaved} hours/month freed up {CATEGORY_COPY[state.category]}
              {result.monthlyToolSavings > 0 && <> · plus ~${result.monthlyToolSavings.toLocaleString()}/month saved switching tool billing to n8n</>}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <Stat label="Workflow tier" value={complexity.tier} />
              <Stat label="Setup cost (est.)" value={`$${result.setupLow.toLocaleString()}–${result.setupHigh.toLocaleString()}`} />
              <Stat label="Payback period" value={`~${result.paybackMonths.toFixed(1)} mo`} />
            </div>

            <PaybackChart setupCost={result.setupMid} monthlySavings={result.totalMonthlySavings} />
            <BreakdownBars items={breakdown} />

            <p style={{ ...resultSub, marginTop: 20 }}>
              Workflow tier is based on how many apps are involved and whether you need branching logic or error handling — not a guess.
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
                `Workflow tier: ${complexity.tier}`,
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
      <p style={fieldLabelBase}>{title}</p>
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p style={fieldLabelBase}>{children}</p>;
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <span style={{ color: '#C8FF00' }}>{children}</span>;
}

function ChoiceRow({ options, value, onChange }: { options: { id: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {options.map((o) => (
        <button key={o.id} onClick={() => onChange(o.id)} style={optionCard(value === o.id, true)}>
          <span style={cardTitle}>{o.label}</span>
        </button>
      ))}
    </div>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} style={{ ...optionCard(value, true), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#fff' }}>{label}</span>
      <span style={{ width: 18, height: 18, borderRadius: 5, border: value ? '2px solid #C8FF00' : '2px solid rgba(255,255,255,0.2)', background: value ? '#C8FF00' : 'transparent', flexShrink: 0 }} />
    </button>
  );
}

const cardTitle: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' };

const fieldLabelBase: React.CSSProperties = {
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

const resultBox: React.CSSProperties = {
  borderRadius: 20,
  background: 'linear-gradient(135deg, rgba(200,255,0,0.06), rgba(255,255,255,0.02))',
  border: '1px solid rgba(200,255,0,0.18)',
  padding: 'clamp(24px, 5vw, 40px)',
  textAlign: 'center',
};

const resultLabel: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.8rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: 10,
};

const resultNumber: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(2.4rem, 7vw, 4rem)',
  color: '#C8FF00',
  letterSpacing: '-0.03em',
  lineHeight: 1,
};

const resultSub: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  color: 'rgba(255,255,255,0.45)',
  marginTop: 10,
  maxWidth: 480,
  marginLeft: 'auto',
  marginRight: 'auto',
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
