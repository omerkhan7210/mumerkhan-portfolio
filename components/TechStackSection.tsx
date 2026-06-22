'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  SiWordpress,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiFigma,
  SiN8N,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiPhp,
  SiTailwindcss,
  SiWoocommerce,
  SiGit,
  SiHtml5,
  SiMysql,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

/* ── Tech data ─────────────────────────────────────────────────── */
type Tech = {
  name: string;
  color: string;
  years: string;
  detail: string;
  slug: string;
  Icon?: IconType;
  label?: string;
};

const INNER: Tech[] = [
  { Icon: SiWordpress,  name: 'WordPress', color: '#21759B', years: '4+ yrs', slug: 'wordpress', detail: '50+ sites built — custom themes, bespoke plugins, WP REST API & Elementor Pro builds.' },
  { Icon: SiReact,      name: 'React',     color: '#61DAFB', years: '3+ yrs', slug: 'react', detail: 'MERN Stack apps — Hooks, Context API, custom hooks, reusable component architecture.' },
  { Icon: SiNodedotjs,  name: 'Node.js',   color: '#3C873A', years: '3+ yrs', slug: 'nodejs', detail: 'REST APIs, Express.js middleware, JWT authentication & server-side architecture.' },
  { Icon: SiMongodb,    name: 'MongoDB',   color: '#47A248', years: '3+ yrs', slug: 'mongodb', detail: 'NoSQL schema design, aggregation pipelines, indexing — MERN Stack data layer.' },
  { Icon: SiFigma,      name: 'Figma',     color: '#F24E1E', years: 'Daily',  slug: 'figma', detail: 'Pixel-perfect design-to-code conversions, auto-layout, prototyping & client collaboration.' },
  { Icon: SiN8N,        name: 'n8n',       color: '#EA4B71', years: '2+ yrs', slug: 'n8n', detail: 'Workflow automation, API integrations, no-code / low-code business process automation.' },
];

const OUTER: Tech[] = [
  { Icon: SiJavascript,  name: 'JavaScript',   color: '#F7DF1E', years: '6+ yrs', slug: 'javascript', detail: 'Core language — ES6+, async/await, closures, event loop & DOM manipulation.' },
  { Icon: SiTypescript,  name: 'TypeScript',   color: '#3178C6', years: '2+ yrs', slug: 'typescript', detail: 'Type-safe React/Next.js — interfaces, generics, utility types, strict mode.' },
  { Icon: SiNextdotjs,   name: 'Next.js',      color: '#FFFFFF', years: '2+ yrs', slug: 'nextjs', detail: 'App Router, SSR, SSG, ISR, API routes — production-grade full-stack deployments.' },
  { Icon: SiPhp,         name: 'PHP',           color: '#8993BE', years: '4+ yrs', slug: 'php', detail: 'WordPress custom development, OOP PHP, hooks & filters, WP-CLI, cron jobs.' },
  { Icon: SiTailwindcss, name: 'Tailwind',      color: '#06B6D4', years: '3+ yrs', slug: 'tailwindcss', detail: 'Rapid UI development, custom design system tokens, responsive layout systems.' },
  { Icon: SiWoocommerce, name: 'WooCommerce',   color: '#96588A', years: '3+ yrs', slug: 'woocommerce', detail: 'Full e-commerce builds, custom product types & payment gateway integration.' },
  { Icon: SiGit,         name: 'Git',           color: '#F05032', years: '6+ yrs', slug: 'git', detail: 'Version control, GitHub CI/CD workflows, branching strategies & code review.' },
  { Icon: SiHtml5,       name: 'HTML5',         color: '#E34F26', years: '6+ yrs', slug: 'html5', detail: 'Semantic markup, ARIA accessibility, web standards & cross-browser compatibility.' },
  { Icon: SiMysql,       name: 'MySQL',         color: '#4479A1', years: '3+ yrs', slug: 'mysql', detail: 'Relational DB design, complex JOINs, stored procedures & query optimisation.' },
];

const INNER_R   = 178;  // orbit radius px from center
const OUTER_R   = 290;  // orbit radius px from center
const ICON_BOX  = 54;   // icon container size px
const INNER_DUR = 38;   // seconds per revolution
const OUTER_DUR = 72;

/* ── Tooltip (fixed, follows cursor position at time of hover) ─── */
type TooltipInfo = { tech: Tech; x: number; y: number } | null;

function FloatingTooltip({ info }: { info: TooltipInfo }) {
  if (!info) return null;
  const { tech, x, y } = info;
  /* Clamp to avoid edge overflow */
  const left = Math.min(Math.max(x, 180), (typeof window !== 'undefined' ? window.innerWidth : 1200) - 180);
  const top  = y - 20; // appear above cursor

  return (
    <div
      style={{
        position: 'fixed',
        left,
        top,
        transform: 'translate(-50%, -100%)',
        zIndex: 9999,
        pointerEvents: 'none',
        animation: 'ts-tooltip-in 0.18s cubic-bezier(0.16,1,0.3,1) forwards',
      }}
    >
      <div
        style={{
          background: 'rgba(14,14,14,0.96)',
          backdropFilter: 'blur(16px)',
          border: `1px solid rgba(${hexToRgb(tech.color)}, 0.3)`,
          borderRadius: 14,
          padding: '12px 16px',
          minWidth: 230,
          maxWidth: 300,
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(${hexToRgb(tech.color)}, 0.1)`,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
          {tech.Icon && <tech.Icon size={17} color={tech.color} />}
          {tech.label && (
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', color: tech.color }}>
              {tech.label}
            </span>
          )}
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: '#fff', letterSpacing: '-0.01em' }}>
            {tech.name}
          </span>
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              color: tech.color,
              background: `rgba(${hexToRgb(tech.color)}, 0.12)`,
              border: `1px solid rgba(${hexToRgb(tech.color)}, 0.25)`,
              padding: '2px 8px',
              borderRadius: 100,
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {tech.years}
          </span>
        </div>
        {/* Detail */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: 0 }}>
          {tech.detail}
        </p>
        {/* Arrow tip */}
        <div style={{
          position: 'absolute',
          bottom: -6,
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: 12,
          height: 12,
          background: 'rgba(14,14,14,0.96)',
          border: `1px solid rgba(${hexToRgb(tech.color)}, 0.3)`,
          borderTop: 'none',
          borderLeft: 'none',
        }} />
      </div>
    </div>
  );
}

/* ── Single icon badge ──────────────────────────────────────────── */
function IconBadge({ tech, onHover }: { tech: Tech; onHover: (t: Tech | null, e?: React.MouseEvent) => void }) {
  const [hov, setHov] = useState(false);
  const { Icon, label, color, name, slug } = tech;

  return (
    <Link
      href={`/skills/${slug}`}
      onMouseEnter={(e) => { setHov(true);  onHover(tech, e); }}
      onMouseLeave={()  => { setHov(false); onHover(null); }}
      title={`View ${name} experience`}
      style={{
        width: ICON_BOX,
        height: ICON_BOX,
        borderRadius: 14,
        background: hov
          ? `rgba(${hexToRgb(color)}, 0.18)`
          : `rgba(${hexToRgb(color)}, 0.07)`,
        border: hov
          ? `1px solid rgba(${hexToRgb(color)}, 0.55)`
          : `1px solid rgba(${hexToRgb(color)}, 0.18)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.22s, border 0.22s, transform 0.22s, box-shadow 0.22s',
        transform: hov ? 'scale(1.2)' : 'scale(1)',
        boxShadow: hov ? `0 0 22px rgba(${hexToRgb(color)}, 0.45)` : 'none',
        backdropFilter: 'blur(8px)',
      }}
    >
      {Icon  && <Icon size={24} color={color} />}
      {label && (
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.7rem', color, letterSpacing: '-0.02em' }}>
          {label}
        </span>
      )}
    </Link>
  );
}

/* ── Orbit ring ─────────────────────────────────────────────────── */
type OrbitProps = {
  techs: Tech[];
  radius: number;
  duration: number;
  clockwise: boolean;
  paused: boolean;
  onHover: (t: Tech | null, e?: React.MouseEvent) => void;
};

function OrbitRing({ techs, radius, duration, clockwise, paused, onHover }: OrbitProps) {
  const spinAnim  = clockwise ? 'ts-spin-cw' : 'ts-spin-ccw';
  const countAnim = clockwise ? 'ts-spin-ccw' : 'ts-spin-cw';
  const dur = `${duration}s`;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        animation: `${spinAnim} ${dur} linear infinite`,
        animationPlayState: paused ? 'paused' : 'running',
      }}
    >
      {techs.map((tech, i) => {
        const angle = (360 / techs.length) * i;
        return (
          <div
            key={tech.name}
            style={{ position: 'absolute', width: 0, height: 0, transform: `rotate(${angle}deg)` }}
          >
            <div
              style={{
                position: 'absolute',
                width: ICON_BOX,
                height: ICON_BOX,
                top: -ICON_BOX / 2,
                left: radius - ICON_BOX / 2,
                pointerEvents: 'auto',
              }}
            >
              {/* Counter-rotate to keep icon upright */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  animation: `${countAnim} ${dur} linear infinite`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              >
                <IconBadge tech={tech} onHover={onHover} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── hex → "r,g,b" helper ───────────────────────────────────────── */
function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

/* ── Main section ───────────────────────────────────────────────── */
export default function TechStackSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const photoRef    = useRef<HTMLDivElement>(null);
  const orbitRef    = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const ranRef      = useRef(false);

  const [innerPaused, setInnerPaused] = useState(false);
  const [outerPaused, setOuterPaused] = useState(false);
  const [tooltip, setTooltip]         = useState<TooltipInfo>(null);
  const [headVisible, setHeadVisible] = useState(false);

  /* ── Heading reveal ─────────────────────────────────────────── */
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeadVisible(true); obs.unobserve(el); } },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── GSAP 3D photo reveal via IntersectionObserver ──────────── */
  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const photo  = photoRef.current;
    const orbit  = orbitRef.current;
    const section = sectionRef.current;
    if (!photo || !section) return;

    let gsapInstance: typeof import('gsap')['default'] | null = null;

    const runAnim = async () => {
      const { default: gsap } = await import('gsap');
      gsapInstance = gsap;

      /* Initial 3D state — photo is horizontal (laying flat away from viewer) */
      gsap.set(photo, {
        transformPerspective: 1000,
        rotateX: -90,
        y: -30,
        scale: 0.8,
        opacity: 0,
      });

      if (orbit) {
        gsap.set(orbit, { opacity: 0, scale: 0.7 });
      }

      /* Trigger on scroll */
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          /* Photo: tips up from horizontal → stands upright */
          gsap.to(photo, {
            rotateX: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.8,
            ease: 'back.out(1.6)',
          });

          /* Orbit: fades + scales in after photo lands */
          if (orbit) {
            gsap.to(orbit, {
              opacity: 1,
              scale: 1,
              duration: 1.3,
              delay: 0.6,
              ease: 'power3.out',
            });
          }

          obs.unobserve(section);
        },
        { threshold: 0.15 },
      );
      obs.observe(section);
    };

    runAnim();
  }, []);

  const handleHover = useCallback((tech: Tech | null, e?: React.MouseEvent) => {
    if (tech && e) {
      setTooltip({ tech, x: e.clientX, y: e.clientY });
    } else {
      setTooltip(null);
    }
  }, []);

  const handleInnerHover = useCallback((tech: Tech | null, e?: React.MouseEvent) => {
    setInnerPaused(!!tech);
    handleHover(tech, e);
  }, [handleHover]);

  const handleOuterHover = useCallback((tech: Tech | null, e?: React.MouseEvent) => {
    setOuterPaused(!!tech);
    handleHover(tech, e);
  }, [handleHover]);

  /* Container dimensions */
  const STAGE_SIZE = OUTER_R * 2 + ICON_BOX + 40; // ~674px

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 border-t border-white/[0.05] overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Orbit CSS keyframes + tooltip animation */}
      <style>{`
        @keyframes ts-spin-cw  { to { transform: rotate( 360deg); } }
        @keyframes ts-spin-ccw { to { transform: rotate(-360deg); } }
        @keyframes ts-tooltip-in {
          from { opacity: 0; transform: translate(-50%, -90%); }
          to   { opacity: 1; transform: translate(-50%, -100%); }
        }
      `}</style>

      {/* Floating tooltip rendered at cursor position */}
      <FloatingTooltip info={tooltip} />

      <div className="max-w-[1280px] mx-auto px-6">

        {/* Heading */}
        <div
          ref={headRef}
          style={{
            marginBottom: 72,
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>
            Tech Stack
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">
            <h2
              className="font-sans font-bold text-white"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
            >
              Tools I build<br />
              <span style={{ color: 'rgba(255,255,255,0.28)' }}>the web with.</span>
            </h2>
            <p className="font-body text-muted" style={{ fontSize: '0.97rem', maxWidth: 360, lineHeight: 1.65 }}>
              6+ years across the full stack. Hover any icon to explore my experience with each technology.
            </p>
          </div>
        </div>

        {/* ── Desktop orbit ───────────────────────────────────── */}
        <div className="hidden md:flex flex-col items-center">
          <div style={{ position: 'relative', width: STAGE_SIZE, height: STAGE_SIZE, flexShrink: 0 }}>

            {/* Orbit track circles */}
            {[INNER_R, OUTER_R].map((r) => (
              <div
                key={r}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: r * 2, height: r * 2,
                  borderRadius: '50%',
                  border: '1px dashed rgba(255,255,255,0.06)',
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Center photo — 3D reveal via GSAP + IntersectionObserver */}
            <div
              ref={photoRef}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 230,
                height: 230,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(200,255,0,0.22)',
                boxShadow:
                  '0 0 0 10px rgba(200,255,0,0.04), 0 0 70px rgba(200,255,0,0.14), 0 24px 80px rgba(0,0,0,0.75)',
                zIndex: 20,
                flexShrink: 0,
              }}
            >
              <Image
                src="/assets/my_image.png"
                fill
                alt="Muhammad Umer Khan"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
              {/* Vignette — subtle dark fade at the photo edges */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at 50% 38%, transparent 30%, rgba(8,8,8,0.42) 68%, rgba(8,8,8,0.78) 100%)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Orbit rings — fade/scale in after photo via GSAP */}
            <div ref={orbitRef} style={{ position: 'absolute', inset: 0 }}>
              <OrbitRing
                techs={INNER}
                radius={INNER_R}
                duration={INNER_DUR}
                clockwise
                paused={innerPaused}
                onHover={handleInnerHover}
              />
              <OrbitRing
                techs={OUTER}
                radius={OUTER_R}
                duration={OUTER_DUR}
                clockwise={false}
                paused={outerPaused}
                onHover={handleOuterHover}
              />
            </div>

          </div>

          {/* Hint text below orbit */}
          <p
            style={{
              marginTop: 36,
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.05em',
              textAlign: 'center',
            }}
          >
            Inner ring · 6 core technologies &nbsp;·&nbsp; Outer ring · 9 complementary tools
          </p>
        </div>

        {/* ── Mobile: photo + chip grid ───────────────────────── */}
        <div className="flex md:hidden flex-col items-center gap-8">
          <div
            style={{
              width: 160, height: 160,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(200,255,0,0.2)',
              boxShadow: '0 0 50px rgba(200,255,0,0.12)',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <Image src="/assets/my_image.png" fill alt="Muhammad Umer Khan" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 38%, transparent 30%, rgba(8,8,8,0.4) 68%, rgba(8,8,8,0.75) 100%)', zIndex: 1 }} />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[...INNER, ...OUTER].map((tech) => {
              const { Icon, label, color, name, slug } = tech;
              return (
                <Link
                  key={name}
                  href={`/skills/${slug}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '7px 14px', borderRadius: 100,
                    background: `rgba(${hexToRgb(color)}, 0.08)`,
                    border: `1px solid rgba(${hexToRgb(color)}, 0.2)`,
                    textDecoration: 'none',
                  }}
                >
                  {Icon  && <Icon size={14} color={color} />}
                  {label && <span style={{ fontSize: '0.65rem', fontWeight: 800, color, fontFamily: 'var(--font-display)' }}>{label}</span>}
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>{name}</span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
