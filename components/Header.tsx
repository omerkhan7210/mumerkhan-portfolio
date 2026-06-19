'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const SERVICE_LINKS = [
  { href: '/services/wordpress-development',  label: 'WordPress Development', icon: 'WP' },
  { href: '/services/mern-stack-development', label: 'MERN Stack Development', icon: '⚛' },
  { href: '/services/n8n-automation',         label: 'n8n Automation',         icon: '⚡' },
  { href: '/services/figma-to-web',           label: 'Figma to Web',           icon: '✦' },
  { href: '/services/ecommerce-development',  label: 'E-Commerce Development', icon: '🛒' },
  { href: '/services/ui-ux-design',           label: 'UI/UX Design',           icon: '◈' },
  { href: '/services/seo-performance',        label: 'SEO & Performance',      icon: '🔍' },
  { href: '/services/website-maintenance',    label: 'Website Maintenance',    icon: '🛡' },
];

const TOP_LINKS = [
  { href: '/',        label: 'Home',    num: '01' },
  { href: '/work',    label: 'Work',    num: '03' },
  { href: '/pricing', label: 'Pricing', num: '04' },
  { href: '/blog',    label: 'Blog',    num: '05' },
  { href: '/contact', label: 'Contact', num: '06' },
];

const MOBILE_LINKS = [
  { href: '/',        label: 'Home',     num: '01' },
  { href: '/services',label: 'Services', num: '02' },
  { href: '/work',    label: 'Work',     num: '03' },
  { href: '/pricing', label: 'Pricing',  num: '04' },
  { href: '/blog',    label: 'Blog',     num: '05' },
  { href: '/contact', label: 'Contact',  num: '06' },
];

/* ── Simple nav item ───────────────────────────────────────────── */
function NavItem({
  href,
  label,
  num,
  active,
}: {
  href: string;
  label: string;
  num: string;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="relative flex items-center gap-1.5 px-3 py-2"
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.58rem',
        letterSpacing: '0.1em',
        color: active ? 'var(--color-lime)' : hovered ? `rgba(var(--fg-rgb),0.45)` : `rgba(var(--fg-rgb),0.18)`,
        transition: 'color 0.25s',
        lineHeight: 1,
        marginTop: 1,
      }}>
        {num}
      </span>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.83rem',
        color: active ? 'var(--color-fg)' : hovered ? 'var(--color-fg)' : `rgba(var(--fg-rgb),0.52)`,
        transition: 'color 0.25s',
        letterSpacing: '-0.01em',
      }}>
        {label}
      </span>
      <span style={{
        position: 'absolute',
        bottom: 4,
        left: 12,
        right: 12,
        height: 1,
        background: '#C8FF00',
        transform: active || hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: active ? 'left' : 'center',
        transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1)',
      }} />
    </Link>
  );
}

/* ── Services dropdown ─────────────────────────────────────────── */
function ServicesNav({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
    setHovered(true);
  };

  const hide = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setHovered(false);
    }, 120);
  };

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      style={{ position: 'relative' }}
    >
      {/* Trigger */}
      <Link
        href="/services"
        className="relative flex items-center gap-1.5 px-3 py-2"
        style={{ textDecoration: 'none' }}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.58rem',
          letterSpacing: '0.1em',
          color: active ? 'var(--color-lime)' : hovered ? `rgba(var(--fg-rgb),0.45)` : `rgba(var(--fg-rgb),0.18)`,
          transition: 'color 0.25s',
          lineHeight: 1,
          marginTop: 1,
        }}>
          02
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.83rem',
          color: active ? 'var(--color-fg)' : hovered ? 'var(--color-fg)' : `rgba(var(--fg-rgb),0.52)`,
          transition: 'color 0.25s',
          letterSpacing: '-0.01em',
        }}>
          Services
        </span>
        {/* chevron */}
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            color: open ? '#C8FF00' : 'rgba(255,255,255,0.3)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.25s ease, color 0.25s',
            marginLeft: 2,
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        {/* underline */}
        <span style={{
          position: 'absolute',
          bottom: 4,
          left: 12,
          right: 12,
          height: 1,
          background: '#C8FF00',
          transform: active || open ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: active ? 'left' : 'center',
          transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </Link>

      {/* Dropdown panel */}
      <div
        onMouseEnter={show}
        onMouseLeave={hide}
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: '50%',
          width: 460,
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '12px',
          zIndex: 200,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: `translateX(-50%) translateY(${open ? 0 : -8}px)`,
          transition: 'opacity 0.22s ease, transform 0.22s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 8px 10px',
          marginBottom: 4,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}>
            Services
          </span>
          <Link
            href="/services"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: '#C8FF00',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              textDecoration: 'none',
            }}
          >
            View all
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>

        {/* Grid of 8 services */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          {SERVICE_LINKS.map((svc) => (
            <DropdownServiceItem key={svc.href} {...svc} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DropdownServiceItem({ href, label, icon }: { href: string; label: string; icon: string }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 10px',
        borderRadius: 10,
        background: hov ? 'rgba(255,255,255,0.05)' : 'transparent',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
        textDecoration: 'none',
        transition: 'background 0.18s, border-color 0.18s',
      }}
    >
      <span style={{
        width: 28,
        height: 28,
        borderRadius: 7,
        background: hov ? 'rgba(200,255,0,0.1)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hov ? 'rgba(200,255,0,0.25)' : 'rgba(255,255,255,0.07)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7rem',
        flexShrink: 0,
        transition: 'background 0.18s, border-color 0.18s',
      }}>
        {icon}
      </span>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.8rem',
        color: hov ? 'var(--color-fg)' : `rgba(var(--fg-rgb),0.65)`,
        letterSpacing: '-0.01em',
        transition: 'color 0.18s',
        lineHeight: 1.2,
      }}>
        {label}
      </span>
    </Link>
  );
}

/* ── Logo ────────────────────────────────────────────────────────  */
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
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '0.82rem',
        color: '#C8FF00',
        letterSpacing: '0.06em',
      }}>
        UK
      </span>
    </div>
  );
}

/* ── Hire Me button ────────────────────────────────────────────── */
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

/* ── Main export ───────────────────────────────────────────────── */
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

  const isServicesActive = pathname.startsWith('/services');

  return (
    <>
      {/* ── Main bar ─────────────────────────────────────────── */}
      <header style={{
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
      }}>
        <div style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '0 28px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}
          >
            <LogoMark />
            <div className="hidden sm:flex flex-col" style={{ lineHeight: 1 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.88rem',
                color: 'var(--color-fg)',
                letterSpacing: '-0.01em',
              }}>
                Umer Khan
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6rem',
                color: `rgba(var(--fg-rgb),0.3)`,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: 3,
              }}>
                Full Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            <NavItem href="/" label="Home" num="01" active={pathname === '/'} />
            <ServicesNav active={isServicesActive} />
            {TOP_LINKS.slice(1).map(({ href, label, num }) => (
              <NavItem
                key={href}
                href={href}
                label={label}
                num={num}
                active={pathname === href}
              />
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span className="status-dot" />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: `rgba(var(--fg-rgb),0.35)`,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
              }}>
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
                      i === 2 && open ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
                    opacity: i === 1 && open ? 0 : 1,
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ───────────────────────────────────── */}
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
        <div style={{
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '0.88rem',
            color: '#C8FF00',
            letterSpacing: '0.08em',
          }}>
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

        <nav style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 28px',
          gap: 2,
          overflowY: 'auto',
        }}>
          {MOBILE_LINKS.map(({ href, label, num }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                textDecoration: 'none',
                padding: '10px 0',
                transform: open ? 'translateX(0)' : 'translateX(-16px)',
                opacity: open ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 55}ms, opacity 0.42s ease ${i * 55}ms`,
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.1em',
                flexShrink: 0,
              }}>
                {num}
              </span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 9vw, 3.4rem)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: pathname === href || (href === '/services' && isServicesActive) ? '#C8FF00' : '#ffffff',
              }}>
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile service sub-links */}
        <div style={{
          padding: '14px 28px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            Services
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {SERVICE_LINKS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  padding: '5px 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
            <ThemeToggle />
          </div>
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
