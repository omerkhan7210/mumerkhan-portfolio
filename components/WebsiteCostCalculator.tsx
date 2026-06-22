'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useCountUp } from './calculators/useCountUp';
import { encodeState, decodeState } from './calculators/shareState';
import ShareButton from './calculators/ShareButton';
import BreakdownBars, { BreakdownItem } from './calculators/BreakdownBars';
import EmailCapture from './calculators/EmailCapture';

type ProjectType = 'landing' | 'marketing' | 'ecommerce' | 'webapp';

const PROJECT_TYPES: { id: ProjectType; label: string; sub: string; base: [number, number]; color: string }[] = [
  { id: 'landing', label: 'Landing Page', sub: '1–3 pages, single focus', base: [300, 600], color: '#C8FF00' },
  { id: 'marketing', label: 'Marketing Site', sub: '5–10 pages, CMS', base: [600, 1500], color: '#C8FF00' },
  { id: 'ecommerce', label: 'E-Commerce Store', sub: 'WooCommerce / Shopify-style', base: [2000, 5000], color: '#C8FF00' },
  { id: 'webapp', label: 'Custom Web App', sub: 'Accounts, dashboard, custom logic', base: [5000, 12000], color: '#C8FF00' },
];

const ADDONS: { id: string; label: string; cost: [number, number]; color: string }[] = [
  { id: 'booking', label: 'Booking / scheduling system', cost: [300, 700], color: '#60A5FA' },
  { id: 'payments', label: 'Payment gateway integration', cost: [400, 900], color: '#F472B6' },
  { id: 'multilang', label: 'Multi-language support', cost: [300, 600], color: '#FBBF24' },
  { id: 'accounts', label: 'User accounts / login', cost: [500, 1200], color: '#A78BFA' },
  { id: 'automation', label: 'n8n workflow automation', cost: [400, 1000], color: '#34D399' },
  { id: 'api', label: 'Third-party API integration', cost: [400, 1000], color: '#FB923C' },
];

type State = { type: ProjectType; customDesign: boolean; addons: string[]; rush: boolean };
const DEFAULT_STATE: State = { type: 'marketing', customDesign: true, addons: [], rush: false };

const STEPS = ['type', 'design', 'addons', 'timeline', 'result'] as const;

export default function WebsiteCostCalculator() {
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const [step, setStep] = useState(0);
  const [shareUrl, setShareUrl] = useState('');

  /* Restore state from a shared link (?s=...) on first load */
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
    setShareUrl(`https://mumerkhan.com/tools/website-cost-calculator?s=${encoded}`);
  }, [state]);

  const toggleAddon = (id: string) => {
    setState((prev) => ({
      ...prev,
      addons: prev.addons.includes(id) ? prev.addons.filter((a) => a !== id) : [...prev.addons, id],
    }));
  };

  const breakdown = useMemo<BreakdownItem[]>(() => {
    const project = PROJECT_TYPES.find((p) => p.id === state.type)!;
    const designMultiplier = state.customDesign ? 1 : 0.72;
    const rushMultiplier = state.rush ? 1.35 : 1;
    const baseMid = ((project.base[0] + project.base[1]) / 2) * designMultiplier;

    const items: BreakdownItem[] = [
      { label: project.label, amount: baseMid * rushMultiplier, color: project.color },
    ];

    state.addons.forEach((id) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (addon) {
        const mid = ((addon.cost[0] + addon.cost[1]) / 2) * rushMultiplier;
        items.push({ label: addon.label, amount: mid, color: addon.color });
      }
    });

    return items;
  }, [state]);

  const result = useMemo(() => {
    const project = PROJECT_TYPES.find((p) => p.id === state.type)!;
    let [low, high] = project.base;

    if (!state.customDesign) {
      low *= 0.7;
      high *= 0.75;
    }

    state.addons.forEach((id) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (addon) {
        low += addon.cost[0];
        high += addon.cost[1];
      }
    });

    if (state.rush) {
      low *= 1.3;
      high *= 1.4;
    }

    return { low: Math.round(low / 50) * 50, high: Math.round(high / 50) * 50 };
  }, [state]);

  const animatedLow = useCountUp(result.low);
  const animatedHigh = useCountUp(result.high);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div>
      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 36 }}>
        {STEPS.map((s, i) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i <= step ? '#C8FF00' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {step === 0 && (
        <Step title="What are you building?">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {PROJECT_TYPES.map((p) => (
              <button key={p.id} onClick={() => { setState((s) => ({ ...s, type: p.id })); next(); }} style={optionCard(state.type === p.id)}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{p.label}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{p.sub}</span>
              </button>
            ))}
          </div>
        </Step>
      )}

      {step === 1 && (
        <Step title="Design approach" onBack={back}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => { setState((s) => ({ ...s, customDesign: true })); next(); }} style={optionCard(state.customDesign, true)}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Custom design</span>
            </button>
            <button onClick={() => { setState((s) => ({ ...s, customDesign: false })); next(); }} style={optionCard(!state.customDesign, true)}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Template-based</span>
            </button>
          </div>
        </Step>
      )}

      {step === 2 && (
        <Step title="Extra functionality (optional)" onBack={back} onNext={next}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {ADDONS.map((a) => (
              <button
                key={a.id}
                onClick={() => toggleAddon(a.id)}
                style={{ ...optionCard(state.addons.includes(a.id), true), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#fff' }}>{a.label}</span>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    border: state.addons.includes(a.id) ? '2px solid #C8FF00' : '2px solid rgba(255,255,255,0.2)',
                    background: state.addons.includes(a.id) ? '#C8FF00' : 'transparent',
                    flexShrink: 0,
                  }}
                />
              </button>
            ))}
          </div>
        </Step>
      )}

      {step === 3 && (
        <Step title="Timeline" onBack={back}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => { setState((s) => ({ ...s, rush: false })); next(); }} style={optionCard(!state.rush, true)}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Standard</span>
            </button>
            <button onClick={() => { setState((s) => ({ ...s, rush: true })); next(); }} style={optionCard(state.rush, true)}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Rush (+30%)</span>
            </button>
          </div>
        </Step>
      )}

      {step === 4 && (
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
              Estimated cost
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
              ${animatedLow.toLocaleString()}–${animatedHigh.toLocaleString()}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginTop: 14, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
              This is a rough estimate based on typical project scope. Every project is different —{' '}
              <Link href="/pricing" style={{ color: '#C8FF00' }}>see fixed-fee packages</Link> or get an exact quote below.
            </p>

            <BreakdownBars items={breakdown} />

            <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-lime">Get an exact quote</Link>
              <Link href="/pricing" className="btn-outline">View pricing packages</Link>
            </div>

            <EmailCapture
              tool="Website Cost Calculator"
              resultHeadline={`Estimated cost: $${result.low.toLocaleString()}–$${result.high.toLocaleString()}`}
              resultLines={breakdown.map((b) => `${b.label}: $${Math.round(b.amount).toLocaleString()}`)}
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

function Step({
  title,
  children,
  onBack,
  onNext,
}: {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext?: () => void;
}) {
  return (
    <div>
      {onBack && <button onClick={onBack} style={backLink}>← Back</button>}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: 18, letterSpacing: '-0.01em' }}>
        {title}
      </p>
      {children}
      {onNext && (
        <button onClick={onNext} className="btn-lime" style={{ marginTop: 20 }}>
          Continue →
        </button>
      )}
    </div>
  );
}

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
