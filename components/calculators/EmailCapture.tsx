'use client';

import { useState } from 'react';

const ROLE_OPTIONS = ['Owner / Founder', 'Manager', 'Employee', 'Other'];

export default function EmailCapture({
  tool,
  resultHeadline,
  resultLines,
  shareUrl,
  inputs,
  result,
  collectRole = false,
}: {
  tool: string;
  resultHeadline: string;
  resultLines: string[];
  shareUrl: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  collectRole?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const submit = async () => {
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, email, name, company, role, resultHeadline, resultLines, shareUrl, inputs, result }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#C8FF00', marginTop: 18 }}>
        ✓ Sent — check your inbox for the full breakdown.
      </p>
    );
  }

  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10 }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={inputStyle()}
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (optional)"
          style={inputStyle()}
        />
        {collectRole && (
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ ...inputStyle(), cursor: 'pointer' }}>
            <option value="">Your role (optional)</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        )}
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="you@email.com"
          style={inputStyle(status === 'error')}
        />
        <button
          onClick={submit}
          disabled={status === 'loading'}
          className="btn-outline"
          style={{ fontSize: '0.85rem', opacity: status === 'loading' ? 0.6 : 1 }}
        >
          {status === 'loading' ? 'Sending…' : 'Email me this breakdown'}
        </button>
        {status === 'error' && (
          <p style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#f87171', marginTop: 2 }}>
            Enter a valid email to get your breakdown sent over.
          </p>
        )}
      </div>
    </div>
  );
}

function inputStyle(error = false): React.CSSProperties {
  return {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: '#fff',
    background: 'rgba(255,255,255,0.04)',
    border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10,
    padding: '11px 16px',
    outline: 'none',
    minWidth: 200,
  };
}
