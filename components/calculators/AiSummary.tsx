'use client';

import { useEffect, useRef, useState } from 'react';
import type { BreakdownItem } from './BreakdownBars';

export default function AiSummary({
  tool,
  inputs,
  breakdown,
}: {
  tool: string;
  inputs: Record<string, unknown>;
  breakdown: BreakdownItem[];
}) {
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading');
  const fetchedKey = useRef<string>('');

  useEffect(() => {
    const key = JSON.stringify(inputs);
    if (fetchedKey.current === key) return;
    fetchedKey.current = key;

    setStatus('loading');
    fetch('/api/ai-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool, inputs, breakdown }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setSummary(data.summary);
        setStatus('done');
      })
      .catch(() => setStatus('error'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool, JSON.stringify(inputs)]);

  if (status === 'error') return null;

  return (
    <div
      style={{
        marginTop: 20,
        textAlign: 'left',
        padding: '16px 18px',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#C8FF00',
          marginBottom: 8,
        }}
      >
        For you, specifically
      </p>
      {status === 'loading' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={skeletonLine} />
          <div style={{ ...skeletonLine, width: '80%' }} />
        </div>
      ) : (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)' }}>
          {summary}
        </p>
      )}
    </div>
  );
}

const skeletonLine: React.CSSProperties = {
  height: 12,
  width: '100%',
  borderRadius: 4,
  background: 'rgba(255,255,255,0.08)',
  animation: 'aiSummaryPulse 1.4s ease-in-out infinite',
};
