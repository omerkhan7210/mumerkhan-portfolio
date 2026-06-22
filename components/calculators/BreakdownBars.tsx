'use client';

export type BreakdownItem = { label: string; amount: number; color: string };

export default function BreakdownBars({ items }: { items: BreakdownItem[] }) {
  const total = items.reduce((sum, i) => sum + i.amount, 0) || 1;

  return (
    <div style={{ marginTop: 24, textAlign: 'left' }}>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          marginBottom: 12,
        }}
      >
        Where the number comes from
      </p>

      {/* Stacked bar */}
      <div style={{ display: 'flex', width: '100%', height: 10, borderRadius: 6, overflow: 'hidden', marginBottom: 16 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              width: `${(item.amount / total) * 100}%`,
              background: item.color,
              transition: 'width 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>{item.label}</span>
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>
              ${Math.round(item.amount).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
