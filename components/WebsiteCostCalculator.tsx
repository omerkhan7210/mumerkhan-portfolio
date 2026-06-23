'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useCountUp } from './calculators/useCountUp';
import { encodeState, decodeState } from './calculators/shareState';
import ShareButton from './calculators/ShareButton';
import BreakdownBars, { BreakdownItem } from './calculators/BreakdownBars';
import EmailCapture from './calculators/EmailCapture';
import AiSummary from './calculators/AiSummary';

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
  { id: 'automation', label: 'n8n workflow automation', cost: [400, 1000], color: '#34D399' },
];

type State = {
  type: ProjectType;
  // landing
  landingGoal: 'leads' | 'launch' | 'event';
  needsAnimation: boolean;
  // marketing
  pageCount: number;
  needsBlog: boolean;
  multiLocation: boolean;
  // ecommerce
  productCount: number;
  paymentGateways: number;
  needsInventorySync: boolean;
  // webapp
  userRoles: number;
  realtimeFeatures: boolean;
  integrationCount: number;
  // universal
  customDesign: boolean;
  selfEdit: boolean;
  addons: string[];
  rush: boolean;
};

const DEFAULT_STATE: State = {
  type: 'marketing',
  landingGoal: 'leads',
  needsAnimation: false,
  pageCount: 7,
  needsBlog: false,
  multiLocation: false,
  productCount: 50,
  paymentGateways: 1,
  needsInventorySync: false,
  userRoles: 1,
  realtimeFeatures: false,
  integrationCount: 1,
  customDesign: true,
  selfEdit: true,
  addons: [],
  rush: false,
};

const STEP_TYPE = 0;
const STEP_DYNAMIC = 1;
const STEP_DESIGN = 2;
const STEP_ADDONS = 3;
const STEP_TIMELINE = 4;
const STEP_RESULT = 5;
const TOTAL_STEPS = 6;

export default function WebsiteCostCalculator() {
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
    setShareUrl(`https://mumerkhan.com/tools/website-cost-calculator?s=${encoded}`);
  }, [state]);

  const set = <K extends keyof State>(key: K, value: State[K]) => setState((s) => ({ ...s, [key]: value }));
  const toggleAddon = (id: string) =>
    setState((prev) => ({ ...prev, addons: prev.addons.includes(id) ? prev.addons.filter((a) => a !== id) : [...prev.addons, id] }));

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  /* ── Dynamic, type-specific cost contribution ──────────────────── */
  const dynamicBreakdown = useMemo<BreakdownItem[]>(() => {
    const items: BreakdownItem[] = [];
    if (state.type === 'landing') {
      if (state.needsAnimation) items.push({ label: 'Custom motion / animation', amount: 150, color: '#60A5FA' });
    }
    if (state.type === 'marketing') {
      if (state.pageCount > 10) items.push({ label: `${state.pageCount - 10} extra pages`, amount: (state.pageCount - 10) * 65, color: '#60A5FA' });
      if (state.needsBlog) items.push({ label: 'Blog / news section', amount: 300, color: '#FBBF24' });
      if (state.multiLocation) items.push({ label: 'Multi-location pages', amount: 450, color: '#A78BFA' });
    }
    if (state.type === 'ecommerce') {
      if (state.productCount > 50) {
        const tier = state.productCount > 500 ? 3500 : state.productCount > 200 ? 1800 : 700;
        items.push({ label: `Catalogue size (${state.productCount}+ products)`, amount: tier, color: '#60A5FA' });
      }
      if (state.paymentGateways > 1) items.push({ label: `${state.paymentGateways - 1} extra payment gateway(s)`, amount: (state.paymentGateways - 1) * 250, color: '#F472B6' });
      if (state.needsInventorySync) items.push({ label: 'Inventory sync', amount: 600, color: '#34D399' });
    }
    if (state.type === 'webapp') {
      if (state.userRoles > 1) items.push({ label: `${state.userRoles - 1} extra user role(s)`, amount: (state.userRoles - 1) * 600, color: '#60A5FA' });
      if (state.realtimeFeatures) items.push({ label: 'Real-time features (live updates)', amount: 1800, color: '#F472B6' });
      if (state.integrationCount > 1) items.push({ label: `${state.integrationCount - 1} extra API integration(s)`, amount: (state.integrationCount - 1) * 700, color: '#FBBF24' });
    }
    return items;
  }, [state]);

  const breakdown = useMemo<BreakdownItem[]>(() => {
    const project = PROJECT_TYPES.find((p) => p.id === state.type)!;
    const designMultiplier = state.customDesign ? 1 : 0.72;
    const rushMultiplier = state.rush ? 1.35 : 1;
    const baseMid = ((project.base[0] + project.base[1]) / 2) * designMultiplier;

    const items: BreakdownItem[] = [{ label: project.label, amount: baseMid * rushMultiplier, color: project.color }];

    dynamicBreakdown.forEach((d) => items.push({ ...d, amount: d.amount * rushMultiplier }));

    state.addons.forEach((id) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (addon) {
        const mid = ((addon.cost[0] + addon.cost[1]) / 2) * rushMultiplier;
        items.push({ label: addon.label, amount: mid, color: addon.color });
      }
    });

    if (!state.selfEdit) {
      items.push({ label: 'Static build (no CMS)', amount: -150 * rushMultiplier, color: '#94A3B8' });
    }

    return items;
  }, [state, dynamicBreakdown]);

  const result = useMemo(() => {
    const total = breakdown.reduce((sum, i) => sum + i.amount, 0);
    const low = Math.round((total * 0.85) / 50) * 50;
    const high = Math.round((total * 1.18) / 50) * 50;
    return { low: Math.max(low, 200), high: Math.max(high, 300) };
  }, [breakdown]);

  const animatedLow = useCountUp(result.low);
  const animatedHigh = useCountUp(result.high);

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 36 }}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#C8FF00' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
        ))}
      </div>

      {step === STEP_TYPE && (
        <Step title="What are you building?">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {PROJECT_TYPES.map((p) => (
              <button key={p.id} onClick={() => { set('type', p.id); next(); }} style={optionCard(state.type === p.id)}>
                <span style={cardTitle}>{p.label}</span>
                <span style={cardSub}>{p.sub}</span>
              </button>
            ))}
          </div>
        </Step>
      )}

      {/* ── Dynamic, type-specific question set ───────────────────── */}
      {step === STEP_DYNAMIC && (
        <Step title="A bit more detail" onBack={back} onNext={next}>
          {state.type === 'landing' && (
            <>
              <FieldLabel>Main goal of the page</FieldLabel>
              <ChoiceRow
                options={[
                  { id: 'leads', label: 'Capture leads' },
                  { id: 'launch', label: 'Product launch' },
                  { id: 'event', label: 'Event / promo' },
                ]}
                value={state.landingGoal}
                onChange={(v) => set('landingGoal', v as State['landingGoal'])}
              />
              <ToggleRow label="Custom motion / scroll animation" value={state.needsAnimation} onChange={(v) => set('needsAnimation', v)} />
            </>
          )}

          {state.type === 'marketing' && (
            <>
              <FieldLabel>
                Number of pages: <Highlight>{state.pageCount}</Highlight>
              </FieldLabel>
              <input type="range" min={5} max={30} value={state.pageCount} onChange={(e) => set('pageCount', Number(e.target.value))} style={sliderStyle} />
              <div style={{ marginTop: 18 }}>
                <ToggleRow label="Blog / news section" value={state.needsBlog} onChange={(v) => set('needsBlog', v)} />
                <ToggleRow label="Multiple locations / branches" value={state.multiLocation} onChange={(v) => set('multiLocation', v)} />
              </div>
            </>
          )}

          {state.type === 'ecommerce' && (
            <>
              <FieldLabel>
                Roughly how many products: <Highlight>{state.productCount}</Highlight>
              </FieldLabel>
              <input type="range" min={5} max={1000} step={5} value={state.productCount} onChange={(e) => set('productCount', Number(e.target.value))} style={sliderStyle} />
              <FieldLabel style={{ marginTop: 22 }}>
                Payment gateways needed: <Highlight>{state.paymentGateways}</Highlight>
              </FieldLabel>
              <input type="range" min={1} max={4} value={state.paymentGateways} onChange={(e) => set('paymentGateways', Number(e.target.value))} style={sliderStyle} />
              <div style={{ marginTop: 18 }}>
                <ToggleRow label="Inventory sync with another system" value={state.needsInventorySync} onChange={(v) => set('needsInventorySync', v)} />
              </div>
            </>
          )}

          {state.type === 'webapp' && (
            <>
              <FieldLabel>
                Distinct user roles (e.g. admin, customer, staff): <Highlight>{state.userRoles}</Highlight>
              </FieldLabel>
              <input type="range" min={1} max={6} value={state.userRoles} onChange={(e) => set('userRoles', Number(e.target.value))} style={sliderStyle} />
              <FieldLabel style={{ marginTop: 22 }}>
                Third-party API integrations: <Highlight>{state.integrationCount}</Highlight>
              </FieldLabel>
              <input type="range" min={0} max={6} value={state.integrationCount} onChange={(e) => set('integrationCount', Number(e.target.value))} style={sliderStyle} />
              <div style={{ marginTop: 18 }}>
                <ToggleRow label="Real-time features (live updates, chat, dashboards)" value={state.realtimeFeatures} onChange={(v) => set('realtimeFeatures', v)} />
              </div>
            </>
          )}
        </Step>
      )}

      {step === STEP_DESIGN && (
        <Step title="Design & content approach" onBack={back}>
          <FieldLabel>Design approach</FieldLabel>
          <ChoiceRow
            options={[{ id: 'custom', label: 'Custom design' }, { id: 'template', label: 'Template-based' }]}
            value={state.customDesign ? 'custom' : 'template'}
            onChange={(v) => set('customDesign', v === 'custom')}
          />
          <FieldLabel style={{ marginTop: 22 }}>Will you need to edit content yourself?</FieldLabel>
          <ChoiceRow
            options={[{ id: 'yes', label: 'Yes, I need a CMS' }, { id: 'no', label: 'No, static is fine' }]}
            value={state.selfEdit ? 'yes' : 'no'}
            onChange={(v) => { set('selfEdit', v === 'yes'); next(); }}
          />
        </Step>
      )}

      {step === STEP_ADDONS && (
        <Step title="Extra functionality (optional)" onBack={back} onNext={next}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {ADDONS.filter((a) => !(a.id === 'payments' && state.type === 'ecommerce')).map((a) => (
              <button key={a.id} onClick={() => toggleAddon(a.id)} style={{ ...optionCard(state.addons.includes(a.id), true), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#fff' }}>{a.label}</span>
                <Checkbox checked={state.addons.includes(a.id)} />
              </button>
            ))}
          </div>
        </Step>
      )}

      {step === STEP_TIMELINE && (
        <Step title="Timeline" onBack={back}>
          <ChoiceRow
            options={[{ id: 'standard', label: 'Standard' }, { id: 'rush', label: 'Rush (+30%)' }]}
            value={state.rush ? 'rush' : 'standard'}
            onChange={(v) => { set('rush', v === 'rush'); next(); }}
          />
        </Step>
      )}

      {step === STEP_RESULT && (
        <div>
          <button onClick={back} style={backLink}>← Edit answers</button>
          <div style={resultBox}>
            <p style={resultLabel}>Estimated cost</p>
            <p style={resultNumber}>${animatedLow.toLocaleString()}–${animatedHigh.toLocaleString()}</p>
            <p style={resultSub}>
              This is a rough estimate based on your actual scope. Every project is different —{' '}
              <Link href="/pricing" style={{ color: '#C8FF00' }}>see fixed-fee packages</Link> or get an exact quote below.
            </p>

            <BreakdownBars items={breakdown} />

            <AiSummary tool="Website Cost Calculator" inputs={state} breakdown={breakdown} />

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

/* ── Shared step chrome ───────────────────────────────────────────── */
function Step({ title, children, onBack, onNext }: { title: string; children: React.ReactNode; onBack?: () => void; onNext?: () => void }) {
  return (
    <div>
      {onBack && <button onClick={onBack} style={backLink}>← Back</button>}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: 18, letterSpacing: '-0.01em' }}>{title}</p>
      {children}
      {onNext && (
        <button onClick={onNext} className="btn-lime" style={{ marginTop: 20 }}>
          Continue →
        </button>
      )}
    </div>
  );
}

function FieldLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ ...fieldLabelBase, ...style }}>{children}</p>;
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
      <Checkbox checked={value} />
    </button>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      style={{
        width: 18,
        height: 18,
        borderRadius: 5,
        border: checked ? '2px solid #C8FF00' : '2px solid rgba(255,255,255,0.2)',
        background: checked ? '#C8FF00' : 'transparent',
        flexShrink: 0,
      }}
    />
  );
}

const cardTitle: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: '#fff' };
const cardSub: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 };

const fieldLabelBase: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.7)',
  marginBottom: 14,
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
  marginTop: 14,
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
