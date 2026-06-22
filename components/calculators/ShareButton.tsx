'use client';

import { useState } from 'react';

export default function ShareButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API unavailable — silently no-op, button still shows the URL via title */
    }
  };

  return (
    <button
      onClick={copy}
      title={url}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.78rem',
        color: copied ? '#C8FF00' : 'rgba(255,255,255,0.45)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: 0,
      }}
    >
      {copied ? '✓ Link copied' : '🔗 Share this exact estimate'}
    </button>
  );
}
