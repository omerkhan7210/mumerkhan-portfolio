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
type SiteStatus = 'none' | 'outdated' | 'redesign';
type ContentSource = 'client' | 'us' | 'copywriter';
type HostingPref = 'new' | 'has';
type LaunchTimeframe = 'asap' | '1-2mo' | '3mo-plus' | 'flexible';
type BudgetRange = 'lt2k' | '2-5k' | '5-10k' | '10k-plus' | 'not-sure';

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
  { id: 'seo', label: 'On-page SEO setup', cost: [250, 650], color: '#A78BFA' },
];

type State = {
  type: ProjectType;
  industry: string;
  currentSiteStatus: SiteStatus;
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
  // content & design
  contentSource: ContentSource;
  customDesign: boolean;
  brandAssetsReady: boolean;
  // functionality
  addons: string[];
  specificIntegrations: string;
  // technical
  selfEdit: boolean;
  hostingPref: HostingPref;
  // timeline & budget
  rush: boolean;
  launchTimeframe: LaunchTimeframe;
  budgetRange: BudgetRange;
};

const DEFAULT_STATE: State = {
  type: 'marketing',
  industry: '',
  currentSiteStatus: 'none',
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
  contentSource: 'client',
  customDesign: true,
  brandAssetsReady: true,
  addons: [],
  specificIntegrations: '',
  selfEdit: true,
  hostingPref: 'new',
  rush: false,
  launchTimeframe: 'flexible',
  budgetRange: 'not-sure',
};

export default function WebsiteCostCalculator() {
  const [state, setState] = useState<State>(DEFAULT_STATE);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    if (s) {
      const decoded = decodeState<State>(s);
      if (decoded) setState({ ...DEFAULT_STATE, ...decoded });
    }
  }, []);

  useEffect(() => {
    const encoded = encodeState(state);
    setShareUrl(`https://mumerkhan.com/tools/website-cost-calculator?s=${encoded}`);
  }, [state]);

  const set = <K extends keyof State>(key: K, value: State[K]) => setState((s) => ({ ...s, [key]: value }));
  const toggleAddon = (id: string) =>
    setState((prev) => ({ ...prev, addons: prev.addons.includes(id) ? prev.addons.filter((a) => a !== id) : [...prev.addons, id] }));

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

    if (state.contentSource === 'copywriter') items.push({ label: 'Copywriting service', amount: 400 * rushMultiplier, color: '#FDE68A' });
    if (!state.brandAssetsReady) items.push({ label: 'Basic branding (logo/colors)', amount: 350 * rushMultiplier, color: '#FCA5A5' });
    if (!state.selfEdit) items.push({ label: 'Static build (no CMS)', amount: -150 * rushMultiplier, color: '#94A3B8' });

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
      <p style={hintText}>Answer what applies below — your estimate updates instantly as you go.</p>

      <Section title="1. Project basics">
        <FieldLabel>What are you building?</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
          {PROJECT_TYPES.map((p) => (
            <button key={p.id} onClick={() => set('type', p.id)} style={optionCard(state.type === p.id)}>
              <span style={cardTitle}>{p.label}</span>
              <span style={cardSub}>{p.sub}</span>
            </button>
          ))}
        </div>
        <FieldLabel>What industry/niche is this for?</FieldLabel>
        <input
          type="text"
          value={state.industry}
          onChange={(e) => set('industry', e.target.value)}
          placeholder="e.g. dental clinic, SaaS startup, local restaurant"
          style={textInputStyle}
        />
        <FieldLabel style={{ marginTop: 20 }}>Do you currently have a website?</FieldLabel>
        <ChoiceRow
          options={[
            { id: 'none', label: 'No, starting fresh' },
            { id: 'outdated', label: 'Yes, but outdated' },
            { id: 'redesign', label: 'Yes, want a redesign' },
          ]}
          value={state.currentSiteStatus}
          onChange={(v) => set('currentSiteStatus', v as SiteStatus)}
        />
      </Section>

      <Section title="2. Scope">
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
      </Section>

      <Section title="3. Content & design">
        <FieldLabel>Who's writing the content?</FieldLabel>
        <ChoiceRow
          options={[
            { id: 'client', label: "I'll provide it" },
            { id: 'us', label: 'Use placeholder, refine later' },
            { id: 'copywriter', label: 'I need a copywriter' },
          ]}
          value={state.contentSource}
          onChange={(v) => set('contentSource', v as ContentSource)}
        />
        <FieldLabel style={{ marginTop: 22 }}>Design approach</FieldLabel>
        <ChoiceRow
          options={[{ id: 'custom', label: 'Custom design' }, { id: 'template', label: 'Template-based' }]}
          value={state.customDesign ? 'custom' : 'template'}
          onChange={(v) => set('customDesign', v === 'custom')}
        />
        <div style={{ marginTop: 18 }}>
          <ToggleRow label="I already have a logo and brand colors" value={state.brandAssetsReady} onChange={(v) => set('brandAssetsReady', v)} />
        </div>
      </Section>

      <Section title="4. Functionality & integrations">
        <FieldLabel>Extra functionality (optional)</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 20 }}>
          {ADDONS.filter((a) => !(a.id === 'payments' && state.type === 'ecommerce')).map((a) => (
            <button key={a.id} onClick={() => toggleAddon(a.id)} style={{ ...optionCard(state.addons.includes(a.id), true), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#fff' }}>{a.label}</span>
              <Checkbox checked={state.addons.includes(a.id)} />
            </button>
          ))}
        </div>
        <FieldLabel>Any specific tools/platforms that need to connect? (optional)</FieldLabel>
        <input
          type="text"
          value={state.specificIntegrations}
          onChange={(e) => set('specificIntegrations', e.target.value)}
          placeholder="e.g. Stripe, HubSpot, Calendly, Mailchimp"
          style={textInputStyle}
        />
      </Section>

      <Section title="5. Technical">
        <FieldLabel>Will you need to edit content yourself?</FieldLabel>
        <ChoiceRow
          options={[{ id: 'yes', label: 'Yes, I need a CMS' }, { id: 'no', label: 'No, static is fine' }]}
          value={state.selfEdit ? 'yes' : 'no'}
          onChange={(v) => set('selfEdit', v === 'yes')}
        />
        <FieldLabel style={{ marginTop: 22 }}>Hosting / domain</FieldLabel>
        <ChoiceRow
          options={[{ id: 'new', label: 'Need new hosting/domain' }, { id: 'has', label: 'Already have hosting' }]}
          value={state.hostingPref}
          onChange={(v) => set('hostingPref', v as HostingPref)}
        />
      </Section>

      <Section title="6. Timeline & budget">
        <FieldLabel>Timeline</FieldLabel>
        <ChoiceRow
          options={[{ id: 'standard', label: 'Standard' }, { id: 'rush', label: 'Rush (+30%)' }]}
          value={state.rush ? 'rush' : 'standard'}
          onChange={(v) => set('rush', v === 'rush')}
        />
        <FieldLabel style={{ marginTop: 22 }}>When do you want to launch?</FieldLabel>
        <ChoiceRow
          options={[
            { id: 'asap', label: 'ASAP' },
            { id: '1-2mo', label: '1–2 months' },
            { id: '3mo-plus', label: '3+ months' },
            { id: 'flexible', label: "I'm flexible" },
          ]}
          value={state.launchTimeframe}
          onChange={(v) => set('launchTimeframe', v as LaunchTimeframe)}
        />
        <FieldLabel style={{ marginTop: 22 }}>Do you have a budget range in mind? (optional, helps us tailor the quote)</FieldLabel>
        <ChoiceRow
          options={[
            { id: 'lt2k', label: 'Under $2k' },
            { id: '2-5k', label: '$2k–$5k' },
            { id: '5-10k', label: '$5k–$10k' },
            { id: '10k-plus', label: '$10k+' },
            { id: 'not-sure', label: 'Not sure yet' },
          ]}
          value={state.budgetRange}
          onChange={(v) => set('budgetRange', v as BudgetRange)}
        />
      </Section>

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
  );
}

/* ── Shared chrome ───────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={sectionCard}>
      <p style={sectionTitle}>{title}</p>
      {children}
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

const hintText: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  color: 'rgba(255,255,255,0.45)',
  marginBottom: 24,
  textAlign: 'center',
};

const sectionCard: React.CSSProperties = {
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.015)',
  padding: 'clamp(18px, 3vw, 28px)',
  marginBottom: 16,
};

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: '1rem',
  color: '#fff',
  marginBottom: 18,
  letterSpacing: '-0.01em',
};

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

const sliderStyle: React.CSSProperties = {
  width: '100%',
  height: 6,
  borderRadius: 3,
  background: 'rgba(255,255,255,0.1)',
  accentColor: '#C8FF00',
  cursor: 'pointer',
};

const textInputStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  color: '#fff',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 10,
  padding: '12px 16px',
  outline: 'none',
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
