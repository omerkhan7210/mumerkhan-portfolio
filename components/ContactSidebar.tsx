'use client';

import Link from 'next/link';
import { useState } from 'react';

function InfoLink({ href, children, lime }: { href: string; children: React.ReactNode; lime?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.85rem',
        color: lime
          ? '#C8FF00'
          : hovered
          ? '#ffffff'
          : 'rgba(255,255,255,0.4)',
        textDecoration: 'none',
        wordBreak: 'break-all',
        transition: 'color 0.2s',
      }}
    >
      {children}
    </a>
  );
}

export default function ContactSidebar() {
  return (
    <div
      className="hidden lg:flex"
      style={{ flexDirection: 'column', gap: 28 }}
    >
      {/* Availability pill */}
      <div
        style={{
          background: 'rgba(200,255,0,0.05)',
          border: '1px solid rgba(200,255,0,0.18)',
          borderRadius: 14,
          padding: '18px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span className="status-dot" style={{ flexShrink: 0 }} />
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.88rem',
              color: '#C8FF00',
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Available for work
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: 'rgba(200,255,0,0.45)',
              margin: '3px 0 0',
            }}
          >
            Taking new projects right now
          </p>
        </div>
      </div>

      {/* Info items */}
      {[
        {
          heading: 'Email',
          body: <InfoLink href="mailto:omerfarooqkhan7210@gmail.com">omerfarooqkhan7210@gmail.com</InfoLink>,
        },
        {
          heading: 'Location',
          body: (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6 }}>
              Karachi, Pakistan<br />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)' }}>Open to remote projects worldwide</span>
            </p>
          ),
        },
        {
          heading: 'Response time',
          body: (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              Within 4 hours (Mon–Sat)
            </p>
          ),
        },
        {
          heading: 'Upwork',
          body: <InfoLink href="https://www.upwork.com/freelancers/muhammadumerk5" lime>View profile — 100% JSS ↗</InfoLink>,
        },
      ].map(({ heading, body }) => (
        <div key={heading}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            {heading}
          </p>
          {body}
        </div>
      ))}

      {/* Trust card */}
      <div
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14,
          padding: '20px 22px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          Why clients choose me
        </p>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            '100% Job Success on Upwork',
            '80+ Projects Delivered',
            '6+ Years of Experience',
            '5.0 / 5.0 Average Rating',
            'On-time delivery, every project',
          ].map((fact) => (
            <li
              key={fact}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.38)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#C8FF00',
                  opacity: 0.55,
                  flexShrink: 0,
                }}
              />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <Link
        href="https://www.upwork.com/freelancers/muhammadumerk5"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline"
        style={{ justifyContent: 'center', fontSize: '0.82rem' }}
      >
        View Upwork Profile
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </Link>
    </div>
  );
}
