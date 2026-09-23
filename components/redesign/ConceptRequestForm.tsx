'use client';

import { useState } from 'react';
import Link from 'next/link';
import TradeSelect from './TradeSelect';
import { TRADE_OPTIONS } from './tradeCopy';
import type { OfferCopy } from './offerCopy';

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  color: '#ffffff',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  outline: 'none',
  padding: '13px 16px',
  width: '100%',
  transition: 'border-color 0.25s',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <span
        className="font-body"
        style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginBottom: 8, display: 'block' }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

export default function ConceptRequestForm({ offer, presetTrade }: { offer: OfferCopy; presetTrade: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [trade, setTrade] = useState(presetTrade);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tradeLabel = TRADE_OPTIONS.find((t) => t.value === trade)?.label || 'Home service';
  const canSubmit = name.trim() && email.includes('@') && websiteUrl.trim() && trade;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'Redesign',
          followUp: `${tradeLabel} — free ${offer.confirmationNoun} request`,
          budget: '',
          name: name.trim(),
          email: email.trim(),
          details: `Source: /redesign landing page (offer: ${offer.key})\nBusiness: ${business.trim() || '—'}\nCurrent website: ${websiteUrl.trim()}\nTrade: ${tradeLabel}\n\n${message.trim() || 'No additional details provided.'}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(200,255,0,0.12)',
            border: '1px solid rgba(200,255,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3
          className="font-sans font-bold"
          style={{ fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', letterSpacing: '-0.03em', color: '#ffffff', marginBottom: 14 }}
        >
          Got it, {name.split(/\s+/)[0]}.
        </h3>
        <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 380, margin: '0 auto' }}>
          I&apos;ll take a look at {websiteUrl} and start on your {offer.confirmationNoun}. You&apos;ll hear from
          me directly — usually within a few days, not weeks.
        </p>
        <div style={{ marginTop: 28 }}>
          <Link href="/work" className="btn-outline" style={{ fontSize: '0.85rem' }}>
            See more trade work while you wait
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Your name">
          <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" required />
        </Field>
        <Field label="Email">
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@yourcompany.com"
            required
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Business name (optional)">
          <input style={inputStyle} value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Your company" />
        </Field>
        <Field label="Your current website">
          <input
            style={inputStyle}
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="yourcompany.com"
            required
          />
        </Field>
      </div>

      <Field label="What do you do?">
        <TradeSelect value={trade} onChange={setTrade} />
      </Field>

      <Field label="What's bugging you about your current site? (optional)">
        <textarea
          style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="It's slow, it looks dated, people can't find the phone number..."
        />
      </Field>

      {error && (
        <p className="font-body" style={{ fontSize: '0.82rem', color: '#FF6B6B' }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="btn-lime"
        style={{
          justifyContent: 'center',
          fontSize: '0.95rem',
          padding: '15px 28px',
          opacity: !canSubmit || submitting ? 0.5 : 1,
          cursor: !canSubmit || submitting ? 'not-allowed' : 'pointer',
        }}
      >
        {submitting ? 'Sending...' : offer.ctaLabel}
        {!submitting && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        )}
      </button>

      <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
        No payment, no contract. I&apos;ll email you directly once your {offer.confirmationNoun} is ready.
      </p>
    </form>
  );
}
