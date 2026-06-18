'use client';

import { useEffect, useRef, useState } from 'react';

function useCounter(target: number, startMs: number, durationMs = 1400) {
  const [val, setVal] = useState(0);
  const ranRef = useRef(false);

  useEffect(() => {
    const el = document.querySelector('.trust-bar-trigger');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ranRef.current) {
          ranRef.current = true;
          const timer = setTimeout(() => {
            const begin = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - begin) / durationMs, 1);
              const e = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(e * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }, startMs);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, startMs, durationMs]);

  return val;
}

const BADGES = [
  { icon: '✦', label: '100% Job Success', sub: 'Upwork Score', accent: '#C8FF00' },
  { icon: '⭐', label: 'Top Rated', sub: 'Upwork Badge', accent: '#FBBF24' },
  { icon: '🔒', label: '5.0 Stars', sub: 'All-time Rating', accent: '#60A5FA' },
  { icon: '⚡', label: '< 4h Response', sub: 'Average Reply Time', accent: '#34D399' },
];

export default function TrustBar() {
  const c1 = useCounter(15, 0);
  const c2 = useCounter(100, 80);
  const c3 = useCounter(50, 160);

  return (
    <div
      className="trust-bar-trigger relative overflow-hidden"
      style={{
        background: '#0D0D0D',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Desktop: flex row of badges */}
      <div className="max-w-[1280px] mx-auto px-6 py-8 hidden md:flex items-stretch gap-0">
        {BADGES.map((b, i) => (
          <div
            key={i}
            className="group flex-1 flex items-center gap-4 px-8 cursor-default"
            style={{
              borderRight: i < BADGES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined,
            }}
          >
            <span
              className="text-2xl w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl"
              style={{ background: `${b.accent}10`, fontSize: '1.1rem' }}
            >
              {b.icon}
            </span>
            <div>
              <p
                className="font-sans font-bold text-white text-sm leading-tight group-hover:text-lime transition-colors duration-200"
                style={{ letterSpacing: '-0.01em' }}
              >
                {b.label}
              </p>
              <p className="font-body text-muted text-xs mt-0.5">{b.sub}</p>
            </div>
          </div>
        ))}

        {/* Divider */}
        <div className="w-px bg-white/[0.05] mx-4 self-stretch" />

        {/* Animated stats */}
        <div className="flex items-center gap-10 px-8">
          <div className="text-center">
            <p className="font-sans font-bold text-lime text-2xl leading-none" style={{ letterSpacing: '-0.03em' }}>
              {c1}+
            </p>
            <p className="font-body text-muted text-xs mt-1">Projects</p>
          </div>
          <div className="text-center">
            <p className="font-sans font-bold text-lime text-2xl leading-none" style={{ letterSpacing: '-0.03em' }}>
              {c2}%
            </p>
            <p className="font-body text-muted text-xs mt-1">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="font-sans font-bold text-lime text-2xl leading-none" style={{ letterSpacing: '-0.03em' }}>
              {c3}+
            </p>
            <p className="font-body text-muted text-xs mt-1">Clients</p>
          </div>
        </div>
      </div>

      {/* Mobile: 2x2 grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-6 grid grid-cols-2 gap-4 md:hidden">
        {BADGES.map((b, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className="text-lg w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg"
              style={{ background: `${b.accent}10`, fontSize: '0.9rem' }}
            >
              {b.icon}
            </span>
            <div>
              <p className="font-sans font-bold text-white text-xs leading-tight">{b.label}</p>
              <p className="font-body text-muted" style={{ fontSize: '0.65rem' }}>{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
