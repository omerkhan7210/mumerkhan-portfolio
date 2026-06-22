'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type ProjectType = 'landing' | 'marketing' | 'ecommerce' | 'webapp';

const PROJECT_TYPES: { id: ProjectType; label: string; sub: string; base: [number, number] }[] = [
  { id: 'landing', label: 'Landing Page', sub: '1–3 pages, single focus', base: [300, 600] },
  { id: 'marketing', label: 'Marketing Site', sub: '5–10 pages, CMS', base: [600, 1500] },
  { id: 'ecommerce', label: 'E-Commerce Store', sub: 'WooCommerce / Shopify-style', base: [2000, 5000] },
  { id: 'webapp', label: 'Custom Web App', sub: 'Accounts, dashboard, custom logic', base: [5000, 12000] },
];

const ADDONS: { id: string; label: string; cost: [number, number] }[] = [
  { id: 'booking', label: 'Booking / scheduling system', cost: [300, 700] },
  { id: 'payments', label: 'Payment gateway integration', cost: [400, 900] },
  { id: 'multilang', label: 'Multi-language support', cost: [300, 600] },
  { id: 'accounts', label: 'User accounts / login', cost: [500, 1200] },
  { id: 'automation', label: 'n8n workflow automation', cost: [400, 1000] },
  { id: 'api', label: 'Third-party API integration', cost: [400, 1000] },
];

export default function WebsiteCostCalculator() {
  const [type, setType] = useState<ProjectType>('marketing');
  const [customDesign, setCustomDesign] = useState(true);
  const [addons, setAddons] = useState<string[]>([]);
  const [rush, setRush] = useState(false);

  const toggleAddon = (id: string) => {
    setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const result = useMemo(() => {
    const project = PROJECT_TYPES.find((p) => p.id === type)!;
    let [low, high] = project.base;

    if (!customDesign) {
      low *= 0.7;
      high *= 0.75;
    }

    addons.forEach((id) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (addon) {
        low += addon.cost[0];
        high += addon.cost[1];
      }
    });

    if (rush) {
      low *= 1.3;
      high *= 1.4;
    }

    return {
      low: Math.round(low / 50) * 50,
      high: Math.round(high / 50) * 50,
    };
  }, [type, customDesign, addons, rush]);

  return (
    <div>
      {/* Project type */}
      <div style={{ marginBottom: 36 }}>
        <p style={fieldLabel}>What are you building?</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {PROJECT_TYPES.map((p) => (
            <button
              key={p.id}
              onClick={() => setType(p.id)}
              style={optionCard(type === p.id)}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>
                {p.label}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                {p.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Design type */}
      <div style={{ marginBottom: 36 }}>
        <p style={fieldLabel}>Design approach</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => setCustomDesign(true)} style={optionCard(customDesign, true)}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Custom design</span>
          </button>
          <button onClick={() => setCustomDesign(false)} style={optionCard(!customDesign, true)}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Template-based</span>
          </button>
        </div>
      </div>

      {/* Add-ons */}
      <div style={{ marginBottom: 36 }}>
        <p style={fieldLabel}>Extra functionality (optional)</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {ADDONS.map((a) => (
            <button
              key={a.id}
              onClick={() => toggleAddon(a.id)}
              style={{ ...optionCard(addons.includes(a.id), true), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#fff' }}>{a.label}</span>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  border: addons.includes(a.id) ? '2px solid #C8FF00' : '2px solid rgba(255,255,255,0.2)',
                  background: addons.includes(a.id) ? '#C8FF00' : 'transparent',
                  flexShrink: 0,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 40 }}>
        <p style={fieldLabel}>Timeline</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => setRush(false)} style={optionCard(!rush, true)}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Standard</span>
          </button>
          <button onClick={() => setRush(true)} style={optionCard(rush, true)}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>Rush (+30%)</span>
          </button>
        </div>
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
          ${result.low.toLocaleString()}–${result.high.toLocaleString()}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginTop: 14, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          This is a rough estimate based on typical project scope. Every project is different —{' '}
          <Link href="/pricing" style={{ color: '#C8FF00' }}>see fixed-fee packages</Link> or get an exact quote below.
        </p>
        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-lime">Get an exact quote</Link>
          <Link href="/pricing" className="btn-outline">View pricing packages</Link>
        </div>
      </div>
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
