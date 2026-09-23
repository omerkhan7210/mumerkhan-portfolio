'use client';

const SIGNALS = [
  { value: '100%', label: 'Upwork Job Success', accent: '#C8FF00' },
  { value: 'Top Rated', label: 'Upwork Badge', accent: '#FBBF24' },
  { value: '5', label: 'Trade & local rebuilds live', accent: '#60A5FA' },
  { value: '90+', label: 'Target mobile Lighthouse score', accent: '#34D399' },
  { value: '1 tap', label: 'To call or request a quote', accent: '#F472B6' },
];

export default function RedesignTrustStrip() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: '#0D0D0D',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0">
        {SIGNALS.map((s, i) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 px-0 md:px-6"
            style={{
              borderRight: i < SIGNALS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined,
            }}
          >
            <span
              className="font-sans font-bold"
              style={{ fontSize: '1.4rem', letterSpacing: '-0.02em', color: s.accent }}
            >
              {s.value}
            </span>
            <span className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
