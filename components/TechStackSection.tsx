'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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

/* ── Types & data ─────────────────────────────────────────────── */
type Tech = {
  name: string;
  color: string;
  years: string;
  detail: string;
  Icon?: IconType;
  label?: string; // for text-based fallback icons
};

const INNER: Tech[] = [
  {
    Icon: SiWordpress, name: 'WordPress', color: '#21759B',
    years: '4+ yrs',
    detail: '50+ sites built — custom themes, bespoke plugins, Elementor Pro & WP REST API.',
  },
  {
    Icon: SiReact, name: 'React', color: '#61DAFB',
    years: '3+ yrs',
    detail: 'MERN Stack applications — Hooks, Context API, custom hooks, reusable component systems.',
  },
  {
    Icon: SiNodedotjs, name: 'Node.js', color: '#3C873A',
    years: '3+ yrs',
    detail: 'REST APIs, Express.js middleware, JWT auth, server-side architecture & deployment.',
  },
  {
    Icon: SiMongodb, name: 'MongoDB', color: '#47A248',
    years: '3+ yrs',
    detail: 'NoSQL schema design, aggregation pipelines, indexing — MERN Stack data layer.',
  },
  {
    Icon: SiFigma, name: 'Figma', color: '#F24E1E',
    years: 'Daily',
    detail: 'Pixel-perfect design-to-code conversions, auto-layout, prototyping & client collaboration.',
  },
  {
    Icon: SiN8N, name: 'n8n', color: '#EA4B71',
    years: '2+ yrs',
    detail: 'Workflow automation, API integrations, no-code/low-code business process automation.',
  },
];

const OUTER: Tech[] = [
  {
    Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E',
    years: '6+ yrs',
    detail: 'Core language — ES6+, async/await, closures, event loop, DOM manipulation.',
  },
  {
    Icon: SiTypescript, name: 'TypeScript', color: '#3178C6',
    years: '2+ yrs',
    detail: 'Type-safe React/Next.js apps — interfaces, generics, strict mode, utility types.',
  },
  {
    Icon: SiNextdotjs, name: 'Next.js', color: '#ffffff',
    years: '2+ yrs',
    detail: 'App Router, SSR, SSG, ISR, API routes — production-grade full-stack deployments.',
  },
  {
    Icon: SiPhp, name: 'PHP', color: '#7B7FB5',
    years: '4+ yrs',
    detail: 'WordPress custom development, OOP PHP, hooks & filters, cron jobs.',
  },
  {
    Icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4',
    years: '3+ yrs',
    detail: 'Rapid UI development, custom design system tokens, responsive layouts.',
  },
  {
    Icon: SiWoocommerce, name: 'WooCommerce', color: '#96588A',
    years: '3+ yrs',
    detail: 'Full e-commerce builds, custom product types, payment gateway integration.',
  },
  {
    Icon: SiGit, name: 'Git', color: '#F05032',
    years: '6+ yrs',
    detail: 'Version control, GitHub CI/CD workflows, branching strategies, team collaboration.',
  },
  {
    Icon: SiHtml5, name: 'HTML5', color: '#E34F26',
    years: '6+ yrs',
    detail: 'Semantic markup, ARIA accessibility, web standards & browser compatibility.',
  },
  {
    Icon: SiMysql, name: 'MySQL', color: '#4479A1',
    years: '3+ yrs',
    detail: 'Relational DB design, complex JOINs, stored procedures, query optimisation.',
  },
];

const ALL_TECHS = [...INNER, ...OUTER];

const INNER_R = 155;  // orbit radius px
const OUTER_R = 252;
const ICON_BOX = 52;  // icon container px
const INNER_DUR = 38; // seconds per revolution
const OUTER_DUR = 70;

/* ── Orbit ring ───────────────────────────────────────────────── */
type OrbitProps = {
  techs: Tech[];
  radius: number;
  duration: number;
  clockwise: boolean;
  paused: boolean;
  onHover: (tech: Tech | null) => void;
};

function OrbitRing({ techs, radius, duration, clockwise, paused, onHover }: OrbitProps) {
  const spinAnim  = clockwise ? 'ts-spin-cw' : 'ts-spin-ccw';
  const countAnim = clockwise ? 'ts-spin-ccw' : 'ts-spin-cw';
  const dur = `${duration}s`;

  return (
    /* ring origin sits at center; w/h 0 so it doesn't capture clicks */
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
            /* slot: pre-rotated to spread icons evenly around the ring */
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 0,
              height: 0,
              transform: `rotate(${angle}deg)`,
            }}
          >
            {/* icon box: translated outward to the orbit radius */}
            <div
              style={{
                position: 'absolute',
                width: ICON_BOX,
                height: ICON_BOX,
                top: -ICON_BOX / 2,
                left: radius - ICON_BOX / 2,
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
              onMouseEnter={() => onHover(tech)}
              onMouseLeave={() => onHover(null)}
            >
              {/* counter-spin so the icon stays upright */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: `${countAnim} ${dur} linear infinite`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              >
                <IconBadge tech={tech} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Single icon badge ────────────────────────────────────────── */
function IconBadge({ tech }: { tech: Tech }) {
  const [hov, setHov] = useState(false);
  const { Icon, label, color } = tech;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: ICON_BOX,
        height: ICON_BOX,
        borderRadius: 14,
        background: hov ? `rgba(${hexToRgb(color)}, 0.15)` : 'rgba(255,255,255,0.04)',
        border: hov ? `1px solid rgba(${hexToRgb(color)}, 0.5)` : '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.25s, border 0.25s, transform 0.25s, box-shadow 0.25s',
        transform: hov ? 'scale(1.18)' : 'scale(1)',
        boxShadow: hov ? `0 0 18px rgba(${hexToRgb(color)}, 0.35)` : 'none',
        backdropFilter: 'blur(8px)',
      }}
    >
      {Icon ? (
        <Icon size={24} color={hov ? color : 'rgba(255,255,255,0.55)'} />
      ) : (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '0.72rem',
            color: hov ? color : 'rgba(255,255,255,0.55)',
            letterSpacing: '-0.02em',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/* ── Mobile tech list ─────────────────────────────────────────── */
function MobileTechGrid({ active }: { active: Tech | null }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8">
      {ALL_TECHS.map((tech) => {
        const { Icon, label, color, name } = tech;
        const isActive = active?.name === name;
        return (
          <div
            key={name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '7px 14px',
              borderRadius: 100,
              background: isActive ? `rgba(${hexToRgb(color)}, 0.12)` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${isActive ? `rgba(${hexToRgb(color)}, 0.4)` : 'rgba(255,255,255,0.08)'}`,
              transition: 'all 0.2s',
            }}
          >
            {Icon ? (
              <Icon size={14} color={color} />
            ) : (
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color, fontFamily: 'var(--font-display)' }}>
                {label}
              </span>
            )}
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Hex to RGB helper ────────────────────────────────────────── */
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ── Main section ─────────────────────────────────────────────── */
export default function TechStackSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const photoRef    = useRef<HTMLDivElement>(null);
  const orbitRef    = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);

  const [innerPaused, setInnerPaused] = useState(false);
  const [outerPaused, setOuterPaused] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<Tech | null>(null);
  const [headVisible, setHeadVisible] = useState(false);

  /* ── Heading scroll reveal ───────────────────────────────────── */
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeadVisible(true); obs.unobserve(el); } },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── GSAP 3D photo reveal + orbit fade ──────────────────────── */
  useEffect(() => {
    const run = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      /* Expose for Lenis sync (SmoothScroll.tsx reads this) */
      (window as any).__GSAP_ScrollTrigger = ScrollTrigger;

      const photo  = photoRef.current;
      const orbit  = orbitRef.current;
      const section = sectionRef.current;
      if (!photo || !section) return;

      /* Photo: dramatic 3D entrance — tips up from horizontal plane */
      gsap.set(photo, {
        transformPerspective: 1000,
        rotateX: -90,
        y: -30,
        scale: 0.85,
        opacity: 0,
      });

      gsap.to(photo, {
        rotateX: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      });

      /* Orbit rings: fade + scale in after photo lands */
      if (orbit) {
        gsap.set(orbit, { opacity: 0, scale: 0.75 });
        gsap.to(orbit, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.55,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        });
      }
    };

    run();
  }, []);

  const handleInnerHover = (tech: Tech | null) => {
    setInnerPaused(!!tech);
    setHoveredTech(tech);
  };

  const handleOuterHover = (tech: Tech | null) => {
    setOuterPaused(!!tech);
    setHoveredTech(tech);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 border-t border-white/[0.05] overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* CSS keyframes for the orbit animations */}
      <style>{`
        @keyframes ts-spin-cw  { to { transform: rotate( 360deg); } }
        @keyframes ts-spin-ccw { to { transform: rotate(-360deg); } }
      `}</style>

      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Section heading ──────────────────────────────── */}
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
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            style={{ marginTop: 16 }}
          >
            <h2
              className="font-sans font-bold text-white"
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              }}
            >
              Tools I build<br />
              <span style={{ color: 'rgba(255,255,255,0.28)' }}>the web with.</span>
            </h2>
            <p
              className="font-body text-muted"
              style={{ fontSize: '0.97rem', maxWidth: 360, lineHeight: 1.65 }}
            >
              6+ years across the full stack. Hover any icon to explore my experience with each technology.
            </p>
          </div>
        </div>

        {/* ── Orbit system (desktop) ───────────────────────── */}
        <div className="hidden md:flex flex-col items-center">

          {/* Orbit stage */}
          <div
            style={{
              position: 'relative',
              width: 620,
              height: 620,
              flexShrink: 0,
            }}
          >
            {/* Orbit track rings (decorative circles) */}
            <div
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: INNER_R * 2,
                height: INNER_R * 2,
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.07)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: OUTER_R * 2,
                height: OUTER_R * 2,
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.05)',
              }}
            />

            {/* Photo — 3D animated via GSAP */}
            <div
              ref={photoRef}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 172,
                height: 172,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(200,255,0,0.2)',
                boxShadow:
                  '0 0 0 8px rgba(200,255,0,0.04), 0 0 60px rgba(200,255,0,0.12), 0 20px 60px rgba(0,0,0,0.7)',
                zIndex: 20,
              }}
            >
              <Image
                src="/assets/my_image.png"
                fill
                alt="Muhammad Umer Khan"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                unoptimized
              />
              {/* Gradient vignette — subtle dark fade at the edges */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 50% 38%, transparent 28%, rgba(8,8,8,0.38) 65%, rgba(8,8,8,0.72) 100%)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Orbit rings — fade/scale in via GSAP */}
            <div ref={orbitRef} style={{ position: 'absolute', inset: 0 }}>
              {/* Inner orbit — clockwise */}
              <OrbitRing
                techs={INNER}
                radius={INNER_R}
                duration={INNER_DUR}
                clockwise
                paused={innerPaused}
                onHover={(tech) => handleInnerHover(tech)}
              />

              {/* Outer orbit — counter-clockwise */}
              <OrbitRing
                techs={OUTER}
                radius={OUTER_R}
                duration={OUTER_DUR}
                clockwise={false}
                paused={outerPaused}
                onHover={(tech) => handleOuterHover(tech)}
              />
            </div>
          </div>

          {/* ── Tech detail panel ─────────────────────────── */}
          <div
            style={{
              marginTop: 40,
              height: 90,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'opacity 0.3s',
            }}
          >
            {hoveredTech ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {hoveredTech.Icon && (
                    <hoveredTech.Icon size={20} color={hoveredTech.color} />
                  )}
                  {hoveredTech.label && (
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: hoveredTech.color }}>
                      {hoveredTech.label}
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: hoveredTech.color,
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {hoveredTech.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.72rem',
                      color: 'rgba(255,255,255,0.3)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '3px 10px',
                      borderRadius: 100,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {hoveredTech.years}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                    color: 'rgba(255,255,255,0.45)',
                    maxWidth: 480,
                    lineHeight: 1.55,
                  }}
                >
                  {hoveredTech.detail}
                </p>
              </>
            ) : (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.04em',
                }}
              >
                Hover any icon to explore my experience
              </p>
            )}
          </div>
        </div>

        {/* ── Mobile fallback ──────────────────────────────── */}
        <div className="flex md:hidden flex-col items-center gap-8">
          {/* Photo */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(200,255,0,0.2)',
              boxShadow: '0 0 40px rgba(200,255,0,0.1)',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <Image
              src="/assets/my_image.png"
              fill
              alt="Muhammad Umer Khan"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              unoptimized
            />
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 38%, transparent 28%, rgba(8,8,8,0.4) 65%, rgba(8,8,8,0.75) 100%)',
                zIndex: 1,
              }}
            />
          </div>

          {/* Tech chips */}
          <MobileTechGrid active={hoveredTech} />
        </div>

      </div>
    </section>
  );
}
