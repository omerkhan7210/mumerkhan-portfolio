'use client';

import Link from 'next/link';
import { useState } from 'react';

const year = new Date().getFullYear();

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const services = [
  { label: 'WordPress Dev', href: '/services/wordpress-development' },
  { label: 'MERN Stack', href: '/services/mern-stack-development' },
  { label: 'n8n Automation', href: '/services/n8n-automation' },
  { label: 'Figma to Web', href: '/services/figma-to-web' },
  { label: 'E-Commerce', href: '/services/ecommerce-development' },
  { label: 'UI/UX Design', href: '/services/ui-ux-design' },
];

function EmailLink() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="mailto:omerfarooqkhan7210@gmail.com"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        letterSpacing: '-0.02em',
        color: hovered ? 'var(--color-lime)' : 'var(--color-fg)',
        textDecoration: 'none',
        transition: 'color 0.25s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      omerfarooqkhan7210@gmail.com
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ transform: hovered ? 'translate(3px, -3px)' : 'none', transition: 'transform 0.25s' }}
      >
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: '#070707',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── CTA strip ─────────────────────────────────── */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: 'clamp(40px, 6vw, 72px) 28px',
        }}
      >
        <div style={{ maxWidth: 1360, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 32,
            }}
          >
            <div>
              <span
                className="label-tag"
                style={{ marginBottom: 16, display: 'inline-flex' }}
              >
                Open to work
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: 'var(--color-fg)',
                  marginTop: 12,
                  maxWidth: 620,
                }}
              >
                Got a project?<br />
                <span style={{ color: 'var(--color-lime)' }}>Let&apos;s talk.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
              <EmailLink />
              <div style={{ display: 'flex', gap: 12 }}>
                <Link href="/contact" className="btn-lime" style={{ fontSize: '0.85rem', padding: '11px 22px' }}>
                  Start a Project
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
                <a
                  href="https://www.upwork.com/freelancers/muhammadumerk5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ fontSize: '0.85rem', padding: '11px 22px' }}
                >
                  Upwork Profile
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Giant name watermark + info grid ──────────── */}
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '0 28px',
          position: 'relative',
        }}
      >
        {/* Giant watermark text */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(5rem, 16vw, 14rem)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            color: 'rgba(255,255,255,0.025)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          UMER KHAN
        </div>

        {/* Info grid */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
            padding: 'clamp(40px, 5vw, 60px) 0',
          }}
        >
          {/* Col 1: About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 7,
                  border: '1px solid rgba(200,255,0,0.2)',
                  background: 'rgba(200,255,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    color: '#C8FF00',
                    letterSpacing: '0.04em',
                  }}
                >
                  UK
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  color: 'var(--color-fg)',
                  letterSpacing: '-0.01em',
                }}
              >
                Umer Khan
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                color: `rgba(var(--fg-rgb),0.45)`,
                lineHeight: 1.7,
                maxWidth: 220,
                marginBottom: 16,
              }}
            >
              Full Stack Developer building websites that perform, convert, and impress.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span className="status-dot" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: `rgba(var(--fg-rgb),0.32)`,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Available for work
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                color: `rgba(var(--fg-rgb),0.28)`,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 18,
              }}
            >
              Pages
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <FooterLink href={href} label={label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                color: `rgba(var(--fg-rgb),0.28)`,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 18,
              }}
            >
              Services
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {services.map((s) => (
                <li key={s.label}>
                  <FooterLink href={s.href} label={s.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                color: `rgba(var(--fg-rgb),0.28)`,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 18,
              }}
            >
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="mailto:omerfarooqkhan7210@gmail.com" className="social-link"
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#ffffff')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '')}
              >
                Email ↗
              </a>
              <a
                href="https://www.upwork.com/freelancers/muhammadumerk5"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                Upwork ↗
              </a>
              <a
                href="https://github.com/omerkhan7210"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-umer-khan-7998a8266"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                LinkedIn ↗
              </a>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: `rgba(var(--fg-rgb),0.28)`,
                }}
              >
                Karachi, Pakistan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: '18px 28px',
          maxWidth: 1360,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            color: `rgba(var(--fg-rgb),0.22)`,
            letterSpacing: '0.04em',
          }}
        >
          © {year} Muhammad Umer Khan
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.85rem',
        color: hovered ? 'var(--color-fg)' : `rgba(var(--fg-rgb),0.42)`,
        textDecoration: 'none',
        transition: 'color 0.22s',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {hovered && (
        <span style={{ color: '#C8FF00', fontSize: '0.7rem' }}>→</span>
      )}
      {label}
    </Link>
  );
}
