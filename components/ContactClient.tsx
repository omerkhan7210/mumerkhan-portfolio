'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

/* ── Types ───────────────────────────────────────────────── */
type FormData = {
  service: string;
  budget: string;
  name: string;
  email: string;
  details: string;
};

const SERVICES = [
  { value: 'New Website', icon: '🌐' },
  { value: 'Redesign', icon: '✦' },
  { value: 'E-Commerce', icon: '🛒' },
  { value: 'Automation', icon: '⚡' },
  { value: 'Full Stack App', icon: '⬡' },
  { value: 'Not sure yet', icon: '?' },
];

const BUDGETS = [
  { value: 'Under $500', label: 'Under $500' },
  { value: '$500–$2k', label: '$500 – $2k' },
  { value: '$2k–$5k', label: '$2k – $5k' },
  { value: '$5k+', label: '$5k+' },
];

const TOTAL_STEPS = 5; // 0=service, 1=budget, 2=name, 3=email, 4=details

/* ── Progress bar ────────────────────────────────────────── */
function ProgressBar({ step }: { step: number }) {
  return (
    <div
      style={{
        width: '100%',
        height: 2,
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 2,
        marginBottom: 48,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
          background: '#C8FF00',
          borderRadius: 2,
          transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </div>
  );
}

/* ── Step wrapper with enter/exit animation ──────────────── */
function StepWrapper({ children, visible }: { children: React.ReactNode; visible: boolean }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {children}
    </div>
  );
}

/* ── Option button (for service / budget selectors) ──────── */
function OptionBtn({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.88rem',
        letterSpacing: '-0.01em',
        padding: '14px 20px',
        borderRadius: 12,
        border: selected
          ? '1px solid rgba(200,255,0,0.6)'
          : `1px solid ${hovered ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.08)'}`,
        background: selected
          ? 'rgba(200,255,0,0.1)'
          : hovered
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(255,255,255,0.02)',
        color: selected ? '#C8FF00' : hovered ? '#ffffff' : 'rgba(255,255,255,0.6)',
        cursor: 'pointer',
        transition: 'all 0.22s',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {icon && (
        <span style={{ fontSize: '1rem', flexShrink: 0, opacity: selected ? 1 : 0.6 }}>
          {icon}
        </span>
      )}
      {label}
      {selected && (
        <span
          style={{
            marginLeft: 'auto',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#C8FF00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
      )}
    </button>
  );
}

/* ── Text input ──────────────────────────────────────────── */
function StepInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  autoFocus,
  onKeyDown,
}: {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) setTimeout(() => ref.current?.focus(), 50);
  }, [autoFocus]);

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 'clamp(1.1rem, 3vw, 1.8rem)',
        letterSpacing: '-0.02em',
        color: '#ffffff',
        background: 'transparent',
        border: 'none',
        borderBottom: '2px solid rgba(255,255,255,0.15)',
        outline: 'none',
        padding: '12px 0',
        width: '100%',
        caretColor: '#C8FF00',
        transition: 'border-color 0.25s',
      }}
      onFocus={(e) => { e.target.style.borderBottomColor = '#C8FF00'; }}
      onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)'; }}
    />
  );
}

/* ── Textarea ────────────────────────────────────────────── */
function StepTextarea({
  placeholder,
  value,
  onChange,
  autoFocus,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (autoFocus) setTimeout(() => ref.current?.focus(), 50);
  }, [autoFocus]);

  return (
    <textarea
      ref={ref}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={5}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        letterSpacing: '-0.01em',
        color: 'rgba(255,255,255,0.85)',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        outline: 'none',
        padding: '16px',
        width: '100%',
        resize: 'none',
        lineHeight: 1.65,
        caretColor: '#C8FF00',
        transition: 'border-color 0.25s',
      }}
      onFocus={(e) => { e.target.style.borderColor = 'rgba(200,255,0,0.4)'; }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
    />
  );
}

/* ── Nav button ──────────────────────────────────────────── */
function NavBtn({
  onClick,
  disabled,
  children,
  variant = 'primary',
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
}) {
  const [hovered, setHovered] = useState(false);

  if (variant === 'ghost') {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.28)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          transition: 'color 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '8px 0',
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.88rem',
        fontWeight: 500,
        color: disabled ? 'rgba(10,10,10,0.4)' : '#0A0A0A',
        background: disabled ? 'rgba(200,255,0,0.3)' : hovered ? '#d4ff1a' : '#C8FF00',
        border: 'none',
        borderRadius: 10,
        padding: '13px 28px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.22s, box-shadow 0.22s, transform 0.22s',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: !disabled && hovered ? '0 8px 24px rgba(200,255,0,0.3)' : 'none',
        transform: !disabled && hovered ? 'translateY(-2px)' : 'none',
        letterSpacing: '-0.01em',
      }}
    >
      {children}
    </button>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function ContactClient() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    service: '',
    budget: '',
    name: '',
    email: '',
    details: '',
  });

  const transition = (fn: () => void) => {
    setVisible(false);
    setTimeout(() => {
      fn();
      setVisible(true);
    }, 280);
  };

  const next = () => transition(() => setStep((s) => s + 1));
  const back = () => transition(() => setStep((s) => s - 1));

  const set = (key: keyof FormData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    /* Submission: log for now, swap URL for real endpoint */
    console.log('Form submitted:', form);
    setVisible(false);
    setTimeout(() => {
      setSubmitted(true);
      setVisible(true);
    }, 280);
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <StepWrapper visible={visible}>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          {/* Animated checkmark */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(200,255,0,0.12)',
              border: '1px solid rgba(200,255,0,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.035em',
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Thanks, {form.name || 'there'}!
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.65,
              maxWidth: 380,
              margin: '0 auto 32px',
            }}
          >
            Your message is on its way. I&apos;ll review your project details and get back to you within 4 hours.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-lime" style={{ fontSize: '0.85rem' }}>
              Back to Home
            </Link>
            <Link href="/work" className="btn-outline" style={{ fontSize: '0.85rem' }}>
              View My Work
            </Link>
          </div>
        </div>
      </StepWrapper>
    );
  }

  return (
    <div>
      <ProgressBar step={step} />

      <StepWrapper visible={visible}>
        {/* Step 0 — Service */}
        {step === 0 && (
          <div>
            <StepLabel num="01 / 05" />
            <StepQuestion>What are you looking to build?</StepQuestion>
            <StepHint>Pick the one that fits best — we can always refine it.</StepHint>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,200px), 1fr))',
                gap: 10,
                marginTop: 28,
              }}
            >
              {SERVICES.map(({ value, icon }) => (
                <OptionBtn
                  key={value}
                  label={value}
                  icon={icon}
                  selected={form.service === value}
                  onClick={() => {
                    set('service', value);
                    setTimeout(next, 160);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — Budget */}
        {step === 1 && (
          <div>
            <StepLabel num="02 / 05" />
            <StepQuestion>What&apos;s your budget range?</StepQuestion>
            <StepHint>Rough estimates are totally fine — helps me tailor my approach.</StepHint>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,180px),1fr))',
                gap: 10,
                marginTop: 28,
              }}
            >
              {BUDGETS.map(({ value, label }) => (
                <OptionBtn
                  key={value}
                  label={label}
                  selected={form.budget === value}
                  onClick={() => {
                    set('budget', value);
                    setTimeout(next, 160);
                  }}
                />
              ))}
            </div>
            <BackBtn onClick={back} />
          </div>
        )}

        {/* Step 2 — Name */}
        {step === 2 && (
          <div>
            <StepLabel num="03 / 05" />
            <StepQuestion>What&apos;s your name?</StepQuestion>
            <div style={{ marginTop: 28, maxWidth: 480 }}>
              <StepInput
                placeholder="Your name..."
                value={form.name}
                onChange={(v) => set('name', v)}
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter' && form.name.trim()) next(); }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32 }}>
              <NavBtn onClick={next} disabled={!form.name.trim()}>
                Continue
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </NavBtn>
              <BackBtn onClick={back} />
            </div>
          </div>
        )}

        {/* Step 3 — Email */}
        {step === 3 && (
          <div>
            <StepLabel num="04 / 05" />
            <StepQuestion>
              Nice to meet you, {form.name}!<br />
              <span style={{ color: '#C8FF00' }}>What&apos;s your email?</span>
            </StepQuestion>
            <div style={{ marginTop: 28, maxWidth: 480 }}>
              <StepInput
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(v) => set('email', v)}
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Enter' && form.email.trim()) next(); }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32 }}>
              <NavBtn onClick={next} disabled={!form.email.includes('@')}>
                Continue
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </NavBtn>
              <BackBtn onClick={back} />
            </div>
          </div>
        )}

        {/* Step 4 — Details + Submit */}
        {step === 4 && (
          <div>
            <StepLabel num="05 / 05" />
            <StepQuestion>
              Almost there — tell me<br />
              <span style={{ color: '#C8FF00' }}>about your project.</span>
            </StepQuestion>
            <StepHint>
              Timeline, goals, anything important — the more you share, the better I can help.
              (Optional but useful)
            </StepHint>
            <div style={{ marginTop: 24 }}>
              <StepTextarea
                placeholder="Describe your project, timeline, and goals..."
                value={form.details}
                onChange={(v) => set('details', v)}
                autoFocus
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28 }}>
              <NavBtn onClick={handleSubmit}>
                Send Message
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </NavBtn>
              <BackBtn onClick={back} />
            </div>
          </div>
        )}
      </StepWrapper>
    </div>
  );
}

/* ── Small helpers ─────────────────────────────────────── */
function StepLabel({ num }: { num: string }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.65rem',
        color: 'rgba(255,255,255,0.22)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginBottom: 16,
      }}
    >
      {num}
    </p>
  );
}

function StepQuestion({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
        letterSpacing: '-0.035em',
        lineHeight: 1.1,
        color: '#ffffff',
      }}
    >
      {children}
    </h2>
  );
}

function StepHint({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.35)',
        lineHeight: 1.6,
        marginTop: 10,
      }}
    >
      {children}
    </p>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <NavBtn variant="ghost" onClick={onClick}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back
    </NavBtn>
  );
}
