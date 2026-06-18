'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    tagline: 'Get online fast',
    price: '$499',
    priceNote: 'per project',
    isCustom: false,
    highlight: false,
    cta: { label: 'Get Started', href: '/contact' },
    features: [
      'Custom WordPress website',
      'Up to 5 pages',
      'Mobile-responsive design',
      'Basic on-page SEO setup',
      'Contact form integration',
      '30-day post-launch support',
      '7–10 day delivery',
    ],
  },
  {
    name: 'Growth',
    tagline: 'Scale your business',
    price: '$999',
    priceNote: 'per project',
    isCustom: false,
    highlight: true,
    cta: { label: 'Get Started', href: '/contact' },
    features: [
      'WordPress or React website',
      'Up to 15 pages + blog',
      'E-commerce integration',
      'Advanced SEO & analytics',
      'Core Web Vitals optimisation',
      'Custom animations & interactions',
      '3 months post-launch support',
      '14–21 day delivery',
    ],
  },
  {
    name: 'Scale',
    tagline: 'Full-stack & automation',
    price: 'Custom',
    priceNote: 'based on scope',
    isCustom: true,
    highlight: false,
    cta: { label: "Let's Talk", href: '/contact' },
    features: [
      'MERN Stack web application',
      'n8n workflow automation',
      'Custom API integrations',
      'Full technical SEO audit',
      'Performance & security hardening',
      '6 months priority support',
      'Dedicated project timeline',
    ],
  },
] as const;

/* ── Single plan card ─────────────────────────────────────────── */
function PlanCard({ plan, index }: { plan: typeof PLANS[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        background: plan.highlight
          ? 'linear-gradient(145deg, rgba(200,255,0,0.05) 0%, rgba(200,255,0,0.02) 100%)'
          : 'rgba(255,255,255,0.02)',
        border: plan.highlight
          ? '1px solid rgba(200,255,0,0.22)'
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: '36px 30px 32px',
        transform: visible
          ? plan.highlight ? 'translateY(-6px)' : 'none'
          : 'translateY(44px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)',
        boxShadow: plan.highlight
          ? '0 0 60px rgba(200,255,0,0.08), 0 24px 60px rgba(0,0,0,0.45)'
          : '0 20px 40px rgba(0,0,0,0.3)',
      }}
    >
      {/* Most Popular badge */}
      {plan.highlight && (
        <div
          style={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#C8FF00',
            color: '#0A0A0A',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '5px 18px',
            borderRadius: 100,
            whiteSpace: 'nowrap',
          }}
        >
          Most Popular
        </div>
      )}

      {/* Plan label */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.68rem',
          color: plan.highlight ? '#C8FF00' : 'rgba(255,255,255,0.32)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        {plan.name}
      </p>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.55)',
          marginBottom: 20,
          letterSpacing: '-0.01em',
        }}
      >
        {plan.tagline}
      </p>

      {/* Price */}
      <div style={{ marginBottom: 6 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          {plan.price}
        </span>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          color: 'rgba(255,255,255,0.28)',
          marginBottom: 28,
          paddingBottom: 24,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {plan.priceNote}
      </p>

      {/* Features list */}
      <ul
        style={{
          listStyle: 'none',
          margin: '0 0 32px',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 11,
        }}
      >
        {plan.features.map((feat, fi) => (
          <li
            key={fi}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              fontFamily: 'var(--font-body)',
              fontSize: '0.84rem',
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.45,
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(-5px)',
              transition: `opacity 0.4s ease ${index * 120 + fi * 55 + 350}ms, transform 0.4s ease ${index * 120 + fi * 55 + 350}ms`,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              style={{ flexShrink: 0, marginTop: 1 }}
            >
              <path
                d="M5 13L9 17L19 7"
                stroke={plan.highlight ? '#C8FF00' : 'rgba(255,255,255,0.32)'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feat}
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <Link
        href={plan.cta.href}
        className={plan.highlight ? 'btn-lime' : 'btn-outline'}
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          fontSize: '0.88rem',
        }}
      >
        {plan.cta.label}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </Link>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function PricingSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="py-24 md:py-32 border-t border-white/[0.05]"
      style={{ background: '#0D0D0D' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Heading */}
        <div
          ref={headRef}
          style={{
            marginBottom: 72,
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>
            Pricing
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">
            <h2
              className="font-sans font-bold text-white"
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              }}
            >
              Transparent plans,
              <br />
              <span style={{ color: 'rgba(255,255,255,0.28)' }}>real results.</span>
            </h2>
            <p
              className="font-body text-muted"
              style={{ fontSize: '0.97rem', maxWidth: 340, lineHeight: 1.6 }}
            >
              Fixed-price projects, no hidden fees.
              <br />
              Every plan includes mobile optimisation and clean code handoff.
            </p>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <p
          className="font-body text-center mt-10"
          style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.22)' }}
        >
          Need something in between?{' '}
          <Link
            href="/contact"
            style={{ color: 'rgba(200,255,0,0.55)', textDecoration: 'none' }}
          >
            Let&apos;s build a custom quote.
          </Link>
        </p>
      </div>
    </section>
  );
}
