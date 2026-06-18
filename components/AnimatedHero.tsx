'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ── Code block content ─────────────────────────────────────── */
const CODE_LINES = [
  { jsx: <><span style={{ color: '#C084FC' }}>const</span><span style={{ color: '#60A5FA' }}> developer</span><span style={{ color: '#94A3B8' }}> = {'{'}</span></> },
  { jsx: <><span style={{ color: '#94A3B8' }}>{'  '}name</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#86EFAC' }}>&apos;Umer Khan&apos;</span><span style={{ color: '#94A3B8' }}>,</span></> },
  { jsx: <><span style={{ color: '#94A3B8' }}>{'  '}role</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#86EFAC' }}>&apos;Full Stack Dev&apos;</span><span style={{ color: '#94A3B8' }}>,</span></> },
  { jsx: <><span style={{ color: '#94A3B8' }}>{'  '}stack</span><span style={{ color: '#e2e8f0' }}>: [</span><span style={{ color: '#86EFAC' }}>&apos;React&apos;</span><span style={{ color: '#e2e8f0' }}>, </span><span style={{ color: '#86EFAC' }}>&apos;WP&apos;</span><span style={{ color: '#e2e8f0' }}>, </span><span style={{ color: '#86EFAC' }}>&apos;n8n&apos;</span><span style={{ color: '#e2e8f0' }}>],</span></> },
  { jsx: <><span style={{ color: '#94A3B8' }}>{'  '}upwork</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#86EFAC' }}>&apos;100% JSS&apos;</span><span style={{ color: '#94A3B8' }}>,</span></> },
  { jsx: <><span style={{ color: '#94A3B8' }}>{'  '}available</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#34D399' }}>true</span><span style={{ color: '#94A3B8' }}>,</span></> },
  { jsx: <span style={{ color: '#94A3B8' }}>{'}'}</span> },
];

/* ── Heading word structure ─────────────────────────────────── */
const LINES = [
  [{ text: 'I', lime: false }, { text: 'build', lime: false }, { text: 'things', lime: false }],
  [{ text: "people", lime: false }, { text: "don't", lime: false }],
  [{ text: 'forget.', lime: true }],
];

/* ── Animated counter hook (React-based, no GSAP textContent) ─ */
function useCounter(target: number, startMs: number, durationMs = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const begin = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - begin) / durationMs, 1);
        const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setVal(Math.round(e * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, startMs);
    return () => clearTimeout(t);
  }, [target, startMs, durationMs]);
  return val;
}

/* ── Component ──────────────────────────────────────────────── */
export default function AnimatedHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false); // guard against React Strict Mode double-fire
  const [codeVisible, setCodeVisible] = useState(0);

  /* Counters */
  const c1 = useCounter(100, 1100);
  const c2 = useCounter(9, 1200);
  const c3 = useCounter(100, 1300);

  /* ── GSAP hero entrance (runs once) ─────────────────────── */
  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      const { default: gsap } = await import('gsap');
      const el = sectionRef.current;
      if (!el) return;

      /* Hard-set initial hidden states */
      gsap.set('.h-pill', { y: -20, opacity: 0 });
      gsap.set('.h-word', { y: 60, opacity: 0 });
      gsap.set('.h-sub', { y: 20, opacity: 0 });
      gsap.set('.h-cta', { y: 14, opacity: 0 });
      gsap.set('.h-stat', { y: 14, opacity: 0 });
      gsap.set('.h-code', { x: 40, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl
        .to('.h-pill', { y: 0, opacity: 1, duration: 0.7 }, 0.15)
        .to('.h-word', { y: 0, opacity: 1, duration: 0.9, stagger: 0.07 }, 0.35)
        .to('.h-sub',  { y: 0, opacity: 1, duration: 0.7 }, 0.7)
        .to('.h-cta',  { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 0.85)
        .to('.h-stat', { y: 0, opacity: 1, duration: 0.5, stagger: 0.07 }, 1.0)
        .to('.h-code', { x: 0, opacity: 1, duration: 0.9 }, 0.5);
    };

    run();
  }, []);

  /* ── Code lines type in ─────────────────────────────────── */
  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setCodeVisible(i);
        if (i >= CODE_LINES.length) clearInterval(id);
      }, 200);
      return () => clearInterval(id);
    }, 1600);
    return () => clearTimeout(start);
  }, []);

  /* ── Mouse parallax on orb ──────────────────────────────── */
  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-ink bg-grid-pattern flex flex-col justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* Parallax orb */}
      <div
        ref={orbRef}
        className="absolute right-[-80px] top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(200,255,0,0.09) 0%, transparent 65%)',
          transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      <div
        className="absolute left-[-200px] bottom-[-100px] pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left col ───────────────────────────────────── */}
          <div>
            {/* Status pill */}
            <div className="h-pill inline-flex items-center gap-2.5 border border-white/10 rounded-full px-4 py-2 mb-10 font-body text-sm text-muted">
              <span className="status-dot w-2 h-2 bg-lime rounded-full" />
              Available for freelance projects
            </div>

            {/* Heading */}
            <h1 className="mb-8" style={{ letterSpacing: '-0.03em' }}>
              {LINES.map((line, li) => (
                <div key={li} className="overflow-visible">
                  {line.map(({ text, lime }, wi) => (
                    <span
                      key={wi}
                      className="h-word inline-block font-sans font-bold"
                      style={{
                        fontSize: 'clamp(3rem, 8.5vw, 7.5rem)',
                        lineHeight: 0.92,
                        color: lime ? '#C8FF00' : '#ffffff',
                        marginRight: '0.2em',
                      }}
                    >
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </h1>

            {/* Subtext */}
            <p className="h-sub font-body text-muted text-lg max-w-sm mb-10 leading-relaxed">
              Full Stack Developer. Turning designs into high-performing
              sites and automating business processes.{' '}
              <span className="text-white/40">WordPress · MERN · n8n.</span>
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap mb-16">
              <Link href="/work" className="h-cta btn-lime text-base">
                View My Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
              <Link href="/contact" className="h-cta btn-outline text-base">
                Let&apos;s Talk
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 border-t border-white/10 pt-8">
              <div className="h-stat">
                <p className="font-sans font-bold text-lime" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' }}>
                  {c1}<span>%</span>
                </p>
                <p className="font-body text-muted text-xs mt-0.5 uppercase tracking-widest">Job Success</p>
              </div>
              <div className="h-stat">
                <p className="font-sans font-bold text-lime" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' }}>
                  {c2}<span>+</span>
                </p>
                <p className="font-body text-muted text-xs mt-0.5 uppercase tracking-widest">Projects Done</p>
              </div>
              <div className="h-stat">
                <p className="font-sans font-bold text-lime" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' }}>
                  0–4<span className="text-2xl">h</span>
                </p>
                <p className="font-body text-muted text-xs mt-0.5 uppercase tracking-widest">Response Time</p>
              </div>
              <div className="h-stat">
                <p className="font-sans font-bold text-lime" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' }}>
                  {c3}<span>%</span>
                </p>
                <p className="font-body text-muted text-xs mt-0.5 uppercase tracking-widest">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* ── Right col: Code block ───────────────────────── */}
          <div className="h-code hidden lg:block">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#0D1117',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 0 80px rgba(200,255,0,0.05), 0 40px 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Chrome bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  {['#FF5F57','#FFBD2E','#28CA41'].map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span className="font-mono text-xs text-muted">portfolio.config.ts</span>
                <span className="font-mono text-xs" style={{ color: 'rgba(200,255,0,0.5)' }}>TS</span>
              </div>

              {/* Code content */}
              <div className="p-6 min-h-[260px]">
                <pre style={{ fontFamily: "'Fira Code','JetBrains Mono','Courier New',monospace", fontSize: '0.82rem', lineHeight: 1.9 }}>
                  {CODE_LINES.map((line, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4"
                      style={{
                        opacity: i < codeVisible ? 1 : 0,
                        transform: i < codeVisible ? 'none' : 'translateX(-6px)',
                        transition: 'opacity 0.35s ease, transform 0.35s ease',
                      }}
                    >
                      <span
                        className="select-none w-4 text-right flex-shrink-0"
                        style={{ color: '#2d3047', fontSize: '0.65rem' }}
                      >
                        {i + 1}
                      </span>
                      <span>{line.jsx}</span>
                    </div>
                  ))}

                  {/* Blinking cursor */}
                  {codeVisible >= CODE_LINES.length && (
                    <div className="flex items-center gap-4 mt-0.5">
                      <span className="w-4 flex-shrink-0" />
                      <span
                        className="cursor-blink inline-block rounded-sm"
                        style={{ width: 7, height: 15, background: '#C8FF00' }}
                      />
                    </div>
                  )}
                </pre>
              </div>

              {/* Status bar */}
              <div
                className="flex items-center justify-between px-4 py-2 border-t border-white/[0.05]"
                style={{ background: 'rgba(200,255,0,0.03)' }}
              >
                <span className="font-mono text-xs" style={{ color: 'rgba(200,255,0,0.6)' }}>
                  ✓ available: true
                </span>
                <span className="font-mono text-xs text-muted">
                  Ln {CODE_LINES.length + 1}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.35 }}>
          <span className="font-body text-xs text-muted uppercase tracking-[0.15em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
        </div>
      </div>
    </section>
  );
}
