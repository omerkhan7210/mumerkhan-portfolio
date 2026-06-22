'use client';

/* 12-month cumulative-value line chart with the break-even point marked —
   this is the single feature research showed real competitor ROI
   calculators (e.g. Blaron) lean on hardest: visitors trust a curve
   crossing zero far more than a single static number. */
export default function PaybackChart({
  setupCost,
  monthlySavings,
  months = 12,
}: {
  setupCost: number;
  monthlySavings: number;
  months?: number;
}) {
  const width = 600;
  const height = 220;
  const padding = { top: 20, right: 16, bottom: 28, left: 16 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = Array.from({ length: months + 1 }, (_, m) => monthlySavings * m - setupCost);
  const minY = Math.min(...points, 0);
  const maxY = Math.max(...points, 0);
  const range = maxY - minY || 1;

  const x = (m: number) => padding.left + (m / months) * chartW;
  const y = (v: number) => padding.top + chartH - ((v - minY) / range) * chartH;
  const zeroY = y(0);

  const pathD = points.map((v, m) => `${m === 0 ? 'M' : 'L'} ${x(m)} ${y(v)}`).join(' ');

  /* Find the break-even month (first month value crosses 0) for the marker */
  const breakEvenIdx = points.findIndex((v) => v >= 0);
  const breakEvenMonth =
    breakEvenIdx > 0
      ? breakEvenIdx - 1 + (0 - points[breakEvenIdx - 1]) / (points[breakEvenIdx] - points[breakEvenIdx - 1])
      : breakEvenIdx === 0
        ? 0
        : null;

  const areaD = `${pathD} L ${x(months)} ${zeroY} L ${x(0)} ${zeroY} Z`;

  return (
    <div style={{ marginTop: 24 }}>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          marginBottom: 12,
          textAlign: 'left',
        }}
      >
        12-month cumulative value
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        <defs>
          <linearGradient id="payback-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8FF00" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C8FF00" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Zero baseline */}
        <line x1={padding.left} y1={zeroY} x2={width - padding.right} y2={zeroY} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />

        {/* Area + line */}
        <path d={areaD} fill="url(#payback-fill)" />
        <path d={pathD} fill="none" stroke="#C8FF00" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Break-even marker */}
        {breakEvenMonth !== null && breakEvenMonth <= months && (
          <g>
            <line
              x1={x(breakEvenMonth)}
              y1={padding.top}
              x2={x(breakEvenMonth)}
              y2={height - padding.bottom}
              stroke="#ffffff"
              strokeOpacity={0.3}
              strokeDasharray="4 4"
            />
            <circle cx={x(breakEvenMonth)} cy={zeroY} r={5} fill="#0A0A0A" stroke="#C8FF00" strokeWidth={2} />
            <text
              x={x(breakEvenMonth)}
              y={padding.top - 4}
              textAnchor="middle"
              fill="#C8FF00"
              fontSize="11"
              fontFamily="var(--font-body)"
              fontWeight={700}
            >
              Break-even: month {breakEvenMonth.toFixed(1)}
            </text>
          </g>
        )}

        {/* X axis labels */}
        {[0, 3, 6, 9, 12].map((m) => (
          <text
            key={m}
            x={x(m)}
            y={height - 6}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize="10"
            fontFamily="var(--font-body)"
          >
            {m === 0 ? 'Start' : `Mo ${m}`}
          </text>
        ))}
      </svg>
    </div>
  );
}
