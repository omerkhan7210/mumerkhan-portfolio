/* Abstract editorial cover art rendered as real SVG image content for
   blog cards/heroes — there's no stock photography in this project, so
   each post gets a distinct generative illustration keyed to its
   category accent color instead of a flat gradient swatch. */

type Variant = 'orbit' | 'flow' | 'bars' | 'burst';

const VARIANT_BY_CATEGORY: Record<string, Variant> = {
  'Web Development': 'bars',
  Automation: 'flow',
  Strategy: 'burst',
  Pricing: 'orbit',
};

export default function BlogCoverArt({
  accent,
  category,
  className,
  style,
}: {
  accent: string;
  category: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const variant = VARIANT_BY_CATEGORY[category] ?? 'orbit';

  return (
    <div
      className={className}
      role="img"
      aria-label={`${category} article illustration`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#0c0c0c',
        ...style,
      }}
    >
      <svg
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id={`g-${variant}`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="240" fill="#0c0c0c" />
        <rect width="400" height="240" fill={`url(#g-${variant})`} />

        {variant === 'orbit' && (
          <g stroke={accent} strokeOpacity="0.35" fill="none">
            <circle cx="200" cy="120" r="40" />
            <circle cx="200" cy="120" r="72" strokeOpacity="0.22" />
            <circle cx="200" cy="120" r="104" strokeOpacity="0.12" />
            <circle cx="200" cy="48" r="5" fill={accent} stroke="none" />
            <circle cx="296" cy="120" r="4" fill={accent} stroke="none" fillOpacity="0.7" />
            <circle cx="104" cy="150" r="3.5" fill={accent} stroke="none" fillOpacity="0.5" />
          </g>
        )}

        {variant === 'flow' && (
          <g stroke={accent} strokeOpacity="0.4" strokeWidth="1.5" fill="none">
            <path d="M50 180 L140 120 L230 150 L320 80" />
            <circle cx="50" cy="180" r="6" fill="#0c0c0c" />
            <circle cx="140" cy="120" r="6" fill="#0c0c0c" />
            <circle cx="230" cy="150" r="6" fill="#0c0c0c" />
            <circle cx="320" cy="80" r="6" fill="#0c0c0c" />
            <circle cx="50" cy="180" r="6" />
            <circle cx="140" cy="120" r="6" />
            <circle cx="230" cy="150" r="6" />
            <circle cx="320" cy="80" r="6" />
            <circle cx="50" cy="180" r="2.5" fill={accent} stroke="none" />
            <circle cx="140" cy="120" r="2.5" fill={accent} stroke="none" />
            <circle cx="230" cy="150" r="2.5" fill={accent} stroke="none" />
            <circle cx="320" cy="80" r="2.5" fill={accent} stroke="none" />
          </g>
        )}

        {variant === 'bars' && (
          <g>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const h = [60, 110, 80, 140, 95, 65][i];
              const x = 70 + i * 48;
              return (
                <rect
                  key={i}
                  x={x}
                  y={200 - h}
                  width="22"
                  height={h}
                  rx="3"
                  fill={accent}
                  opacity={0.12 + i * 0.04}
                />
              );
            })}
          </g>
        )}

        {variant === 'burst' && (
          <g>
            {Array.from({ length: 7 }).map((_, row) =>
              Array.from({ length: 11 }).map((_, col) => {
                const cx = 30 + col * 34;
                const cy = 20 + row * 34;
                const dCenter = Math.hypot(cx - 200, cy - 120);
                const o = Math.max(0.05, 0.55 - dCenter / 260);
                return (
                  <circle key={`${row}-${col}`} cx={cx} cy={cy} r="2" fill={accent} opacity={o} />
                );
              }),
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
