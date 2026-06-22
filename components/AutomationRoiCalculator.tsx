'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const COMPLEXITY: { id: 'simple' | 'medium' | 'complex'; label: string; sub: string; setupCost: [number, number] }[] = [
  { id: 'simple', label: 'Simple', sub: '1-2 apps, no branching logic', setupCost: [300, 700] },
  { id: 'medium', label: 'Medium', sub: 'A few steps, some conditions', setupCost: [700, 1800] },
  { id: 'complex', label: 'Complex', sub: 'Multi-branch, custom logic, error handling', setupCost: [1800, 4500] },
];

export default function AutomationRoiCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [teamMembers, setTeamMembers] = useState(1);
  const [complexity, setComplexity] = useState<'simple' | 'medium' | 'complex'>('medium');
  const [onZapier, setOnZapier] = useState(false);
  const [monthlyTasks, setMonthlyTasks] = useState(5000);

  const result = useMemo(() => {
    const monthlyHoursSaved = hoursPerWeek * 4.33 * teamMembers;
    const monthlyLaborSavings = monthlyHoursSaved * hourlyRate;
    const annualLaborSavings = monthlyLaborSavings * 12;

    const tier = COMPLEXITY.find((c) => c.id === complexity)!;
    const setupLow = tier.setupCost[0];
    const setupHigh = tier.setupCost[1];
    const setupMid = (setupLow + setupHigh) / 2;

    /* Rough Zapier/Make cost bands by monthly task volume — illustrative,
       not pulled from a live pricing API. n8n self-hosted assumed flat
       at ~$15/month VPS regardless of volume. */
    let estimatedToolBill = 0;
    if (onZapier) {
      if (monthlyTasks <= 2000) estimatedToolBill = 30;
      else if (monthlyTasks <= 10000) estimatedToolBill = 75;
      else if (monthlyTasks <= 50000) estimatedToolBill = 300;
      else estimatedToolBill = 800;
    }
    const n8nCost = 15;
    const monthlyToolSavings = onZapier ? Math.max(estimatedToolBill - n8nCost, 0) : 0;

    const totalMonthlySavings = monthlyLaborSavings + monthlyToolSavings;
    const paybackMonths = totalMonthlySavings > 0 ? setupMid / totalMonthlySavings : 0;

    return {
      monthlyHoursSaved: Math.round(monthlyHoursSaved),
      monthlyLaborSavings: Math.round(monthlyLaborSavings),
      annualLaborSavings: Math.round(annualLaborSavings),
      monthlyToolSavings: Math.round(monthlyToolSavings),
      setupLow,
      setupHigh,
      paybackMonths: Math.max(paybackMonths, 0.1),
    };
  }, [hoursPerWeek, hourlyRate, teamMembers, complexity, onZapier, monthlyTasks]);

  return (
    <div>
      {/* Hours per week */}
      <div style={{ marginBottom: 32 }}>
        <p style={fieldLabel}>
          Hours/week spent on this manual task: <span style={{ color: '#C8FF00' }}>{hoursPerWeek}h</span>
        </p>
        <input
          type="range"
          min={1}
          max={40}
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(Number(e.target.value))}
          style={sliderStyle}
        />
      </div>

      {/* Hourly rate */}
      <div style={{ marginBottom: 32 }}>
        <p style={fieldLabel}>
          Hourly cost of the person doing it: <span style={{ color: '#C8FF00' }}>${hourlyRate}/hr</span>
        </p>
        <input
          type="range"
          min={10}
          max={150}
          step={5}
          value={hourlyRate}
          onChange={(e) => setHourlyRate(Number(e.target.value))}
          style={sliderStyle}
        />
      </div>

      {/* Team members */}
      <div style={{ marginBottom: 32 }}>
        <p style={fieldLabel}>
          People doing this task: <span style={{ color: '#C8FF00' }}>{teamMembers}</span>
        </p>
        <input
          type="range"
          min={1}
          max={20}
          value={teamMembers}
          onChange={(e) => setTeamMembers(Number(e.target.value))}
          style={sliderStyle}
        />
      </div>

      {/* Complexity */}
      <div style={{ marginBottom: 32 }}>
        <p style={fieldLabel}>Workflow complexity</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {COMPLEXITY.map((c) => (
            <button key={c.id} onClick={() => setComplexity(c.id)} style={optionCard(complexity === c.id)}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{c.label}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{c.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Currently on Zapier/Make */}
      <div style={{ marginBottom: 40 }}>
        <p style={fieldLabel}>Currently paying for Zapier or Make?</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: onZapier ? 18 : 0 }}>
          <button onClick={() => setOnZapier(false)} style={optionCard(!onZapier, true)}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>No / not yet</span>
          </button>
          <button onClick={() => setOnZapier(true)} style={optionCard(onZapier, true)}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Yes</span>
          </button>
        </div>
        {onZapier && (
          <div>
            <p style={fieldLabel}>
              Approx. automation tasks/month: <span style={{ color: '#C8FF00' }}>{monthlyTasks.toLocaleString()}</span>
            </p>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={monthlyTasks}
              onChange={(e) => setMonthlyTasks(Number(e.target.value))}
              style={sliderStyle}
            />
          </div>
        )}
      </div>

      {/* Result */}
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
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 7vw, 4rem)',
            color: '#C8FF00',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          ${result.annualLaborSavings.toLocaleString()}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginTop: 10 }}>
          {result.monthlyHoursSaved} hours/month freed up
          {result.monthlyToolSavings > 0 && (
            <> · plus ~${result.monthlyToolSavings.toLocaleString()}/month saved switching tool billing to n8n</>
          )}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 16,
            marginTop: 28,
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Stat label="Setup cost (est.)" value={`$${result.setupLow.toLocaleString()}–${result.setupHigh.toLocaleString()}`} />
          <Stat label="Payback period" value={`~${result.paybackMonths.toFixed(1)} mo`} />
          <Stat label="Monthly savings" value={`$${result.monthlyLaborSavings.toLocaleString()}`} />
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginTop: 20, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          Rough estimate for planning purposes — actual setup cost depends on the specific apps and logic involved.
        </p>

        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-lime">Get a workflow built</Link>
          <Link href="/services/n8n-automation" className="btn-outline">See automation service</Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: '#fff' }}>{value}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </p>
    </div>
  );
}

const fieldLabel: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.7)',
  marginBottom: 14,
  letterSpacing: '-0.01em',
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
