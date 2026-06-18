'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', num: '01' },
  { href: '/work', label: 'Work', num: '02' },
  { href: '/contact', label: 'Contact', num: '03' },
];

function NavItem({ href, label, num, active }: { href: string; label: string; num: string; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="relative flex items-center gap-1.5 px-3 py-2"
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.58rem',
          letterSpacing: '0.1em',
          color: active ? '#C8FF00' : hovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)',
          transition: 'color 0.25s',
          lineHeight: 1,
          marginTop: 1,
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.83rem',
          color: active ? '#ffffff' : hovered ? '#ffffff' : 'rgba(255,255,255,0.52)',
          transition: 'color 0.25s',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </span>
      <span
        style={{
          position: 'absolute',
          bottom: 4,
          left: 12,
          right: 12,
          height: 1,
          background: '#C8FF00',
          transform: active || hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: active ? 'left' : 'center',
          transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </Link>
  );
}

function LogoMark() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        border: `1px solid ${hovered ? 'rgba(200,255,0,0.55)' : 'rgba(200,255,0,0.22)'}`,
        background: hovered ? 'rgba(200,255,0,0.07)' : 'rgba(200,255,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color 0.28s, background 0.28s',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '0.82rem',
          color: '#C8FF00',
          letterSpacing: '0.06em',
        }}
      >
        UK
      </span>
    </div>
  );
}

function HireMeBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.82rem',
        fontWeight: 500,
        color: hovered ? '#0A0A0A' : '#C8FF00',
        background: hovered ? '#C8FF00' : 'transparent',
        border: '1px solid rgba(200,255,0,0.45)',
        borderRadius: 8,
        padding: '9px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        transition: 'color 0.25s, background 0.25s, border-color 0.25s, box-shadow 0.25s',
        boxShadow: hovered ? '0 6px 20px rgba(200,255,0,0.25)' : 'none',
      }}
    >
      Hire Me
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Main bar ──────────────────────────────────── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.4s ease, border-color 0.4s ease',
          background: scrolled ? 'rgba(10,10,10,0.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: '0 auto',
            padding: '0 28px',
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}
          >
            <LogoMark />
            <div className="hidden sm:flex flex-col" style={{ lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                Umer Khan
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: 3,
                }}
              >
                Full Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label, num }) => (
              <NavItem key={href} href={href} label={label} num={num} active={pathname === href} />
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-5">
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span className="status-dot" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                }}
              >
                Available
              </span>
            </div>
            <HireMeBtn />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-[60]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 22 }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    height: 1.5,
                    background: open ? '#C8FF00' : '#ffffff',
                    borderRadius: 2,
                    width: i === 1 ? (open ? 22 : 14) : 22,
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                    transform:
                      i === 0 && open ? 'rotate(45deg) translate(4.5px, 4.5px)' :
                      i === 2 && open ? 'rotate(-45deg) translate(4.5px, -4.5px)' :
                      'none',
                    opacity: i === 1 && open ? 0 : 1,
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ────────────────────────────── */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          background: '#080808',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.38s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '0.88rem',
              color: '#C8FF00',
              letterSpacing: '0.08em',
            }}
          >
            UK
          </span>
          <button
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>

        <nav
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 28px',
            gap: 2,
          }}
        >
          {navLinks.map(({ href, label, num }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                textDecoration: 'none',
                padding: '12px 0',
                transform: open ? 'translateX(0)' : 'translateX(-16px)',
                opacity: open ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, opacity 0.42s ease ${i * 60}ms`,
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.1em',
                  flexShrink: 0,
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(2.4rem, 10vw, 3.8rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: pathname === href ? '#C8FF00' : '#ffffff',
                }}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>

        <div
          style={{
            padding: '20px 28px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <a
            href="mailto:omerfarooqkhan7210@gmail.com"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
            }}
          >
            omerfarooqkhan7210@gmail.com
          </a>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-lime"
            style={{ padding: '10px 20px', fontSize: '0.8rem' }}
          >
            Hire Me
          </Link>
        </div>
      </div>
    </>
  );
}
