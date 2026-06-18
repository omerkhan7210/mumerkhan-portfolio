'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const CODE_LINES = [
  { jsx: <><span style={{ color: '#C084FC' }}>const</span><span style={{ color: '#60A5FA' }}> developer</span><span style={{ color: '#94A3B8' }}> = {'{'}</span></> },
  { jsx: <><span style={{ color: '#94A3B8' }}>{'  '}name</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#86EFAC' }}>&apos;Umer Khan&apos;</span><span style={{ color: '#94A3B8' }}>,</span></> },
  { jsx: <><span style={{ color: '#94A3B8' }}>{'  '}role</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#86EFAC' }}>&apos;Full Stack Dev&apos;</span><span style={{ color: '#94A3B8' }}>,</span></> },
  { jsx: <><span style={{ color: '#94A3B8' }}>{'  '}stack</span><span style={{ color: '#e2e8f0' }}>: [</span><span style={{ color: '#86EFAC' }}>&apos;React&apos;</span><span style={{ color: '#e2e8f0' }}>, </span><span style={{ color: '#86EFAC' }}>&apos;WP&apos;</span><span style={{ color: '#e2e8f0' }}>, </span><span style={{ color: '#86EFAC' }}>&apos;n8n&apos;</span><span style={{ color: '#e2e8f0' }}>],</span></> },
  { jsx: <><span style={{ color: '#94A3B8' }}>{'  '}upwork</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#86EFAC' }}>&apos;100% JSS&apos;</span><span style={{ color: '#94A3B8' }}>,</span></> },
  { jsx: <><span style={{ color: '#94A3B8' }}>{'  '}available</span><span style={{ color: '#e2e8f0' }}>: </span><span style={{ color: '#34D399' }}>true</span><span style={{ color: '#94A3B8' }}>,</span></> },
  { jsx: <span style={{ color: '#94A3B8' }}>{'}'}</span> },
];

const HEADING_LINES = [
  [{ text: 'I', lime: false }, { text: 'build', lime: false }, { text: 'things', lime: false }],
  [{ text: 'people', lime: false }, { text: "don't", lime: false }],
  [{ text: 'forget.', lime: true }],
];

function useCounter(target: number, startMs: number, durationMs = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const begin = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - begin) / durationMs, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(e * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, startMs);
    return () => clearTimeout(t);
  }, [target, startMs, durationMs]);
  return val;
}

export default function AnimatedHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ranRef = useRef(false);
  const [codeVisible, setCodeVisible] = useState(0);

  // Parallax orb refs — direct DOM mutation so zero React re-renders
  const orb1Ref = useRef<HTMLDivElement>(null); // lime, top-right, slow
  const orb2Ref = useRef<HTMLDivElement>(null); // purple, bottom-left, reverse
  const orb3Ref = useRef<HTMLDivElement>(null); // sky-blue, center, faster
  const spotRef = useRef<HTMLDivElement>(null); // cursor spotlight, direct follow

  const projects = useCounter(80, 1100);
  const jss = useCounter(100, 1200);

  /* ── GSAP entrance ─────────────────────────────────────────── */
  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      const { default: gsap } = await import('gsap');
      if (!sectionRef.current) return;

      gsap.set('.h-pill', { y: -20, opacity: 0 });
      gsap.set('.h-word', { y: 90, opacity: 0 });
      gsap.set('.h-sub',  { y: 24, opacity: 0 });
      gsap.set('.h-cta',  { y: 16, opacity: 0 });
      gsap.set('.h-stat', { y: 16, opacity: 0 });
      gsap.set('.h-code', { x: 60, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl
        .to('.h-pill', { y: 0, opacity: 1, duration: 0.7 }, 0.1)
        .to('.h-word', { y: 0, opacity: 1, duration: 1.0, stagger: 0.08 }, 0.3)
        .to('.h-sub',  { y: 0, opacity: 1, duration: 0.7 }, 0.72)
        .to('.h-cta',  { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 }, 0.88)
        .to('.h-stat', { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 1.05)
        .to('.h-code', { x: 0, opacity: 1, duration: 1.0 }, 0.45);
    };

    run();
  }, []);

  /* ── Code lines type-in ─────────────────────────────────────── */
  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setCodeVisible(i);
        if (i >= CODE_LINES.length) clearInterval(id);
      }, 210);
      return () => clearInterval(id);
    }, 1900);
    return () => clearTimeout(start);
  }, []);

  /* ── Multi-orb mouse parallax (RAF lerp, no state re-renders) ─ */
  useEffect(() => {
    const target = { x: 0, y: 0 };
    const lerped = { x: 0, y: 0 };
    let raf: number;

    const onMouse = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth  - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;

      // Spotlight: follows cursor directly (no lerp, instant)
      if (spotRef.current) {
        spotRef.current.style.left    = `${e.clientX}px`;
        spotRef.current.style.top     = `${e.clientY}px`;
        spotRef.current.style.opacity = '1';
      }
    };

    const tick = () => {
      lerped.x += (target.x - lerped.x) * 0.04;
      lerped.y += (target.y - lerped.y) * 0.04;

      // Orb 1 — lime, slow drift in mouse direction
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${lerped.x * 80}px, ${lerped.y * 60}px)`;
      }
      // Orb 2 — purple, drifts opposite to mouse
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${lerped.x * -130}px, ${lerped.y * -95}px)`;
      }
      // Orb 3 — sky-blue, fastest drift
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate(${lerped.x * 170}px, ${lerped.y * 130}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-ink overflow-hidden flex flex-col justify-center pt-28 pb-20"
    >
      {/* ── Background layers ──────────────────────────────────── */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Orb 1 — large lime glow, top-right */}
      <div
        ref={orb1Ref}
        className="absolute pointer-events-none"
        style={{
          right: -120,
          top: '-5%',
          width: 960,
          height: 960,
          background:
            'radial-gradient(circle at 35% 35%, rgba(200,255,0,0.11) 0%, rgba(200,255,0,0.03) 40%, transparent 68%)',
        }}
      />

      {/* Orb 2 — purple glow, bottom-left, drifts opposite */}
      <div
        ref={orb2Ref}
        className="absolute pointer-events-none"
        style={{
          left: -180,
          bottom: -80,
          width: 720,
          height: 720,
          background:
            'radial-gradient(circle at 55% 55%, rgba(139,92,246,0.11) 0%, rgba(139,92,246,0.03) 40%, transparent 68%)',
        }}
      />

      {/* Orb 3 — sky-blue glow, center area, fastest */}
      <div
        ref={orb3Ref}
        className="absolute pointer-events-none"
        style={{
          left: '35%',
          top: '55%',
          width: 460,
          height: 460,
          background:
            'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Cursor spotlight — lime radial that follows the cursor */}
      <div
        ref={spotRef}
        className="absolute pointer-events-none"
        style={{
          width: 560,
          height: 560,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(200,255,0,0.055) 0%, transparent 65%)',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left col ──────────────────────────────────────── */}
          <div>
            {/* Status pill */}
            <div className="h-pill inline-flex items-center gap-2.5 border border-white/10 rounded-full px-4 py-2 mb-10 font-body text-sm text-muted">
              <span className="status-dot w-2 h-2 bg-lime rounded-full" />
              Available for freelance projects
            </div>

            {/* Heading — overflow:hidden per line for clean wipe-up reveal */}
            <h1 className="mb-8" style={{ letterSpacing: '-0.03em' }}>
              {HEADING_LINES.map((line, li) => (
                <div
                  key={li}
                  style={{ overflow: 'hidden', paddingBottom: '0.06em' }}
                >
                  {line.map(({ text, lime }, wi) => (
                    <span
                      key={wi}
                      className="h-word inline-block font-sans font-bold"
                      style={{
                        fontSize: 'clamp(3.2rem, 9vw, 8rem)',
                        lineHeight: 0.9,
                        color: lime ? '#C8FF00' : '#ffffff',
                        marginRight: '0.22em',
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
              Full Stack Developer turning designs into high-performing
              websites.{' '}
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
              {[
                { val: `${projects}+`, label: 'Projects Done' },
                { val: '6+',           label: 'Years Exp.' },
                { val: `${jss}%`,      label: 'Job Success' },
                { val: '5.0★',         label: 'Upwork Rating' },
              ].map(({ val, label }) => (
                <div key={label} className="h-stat">
                  <p
                    className="font-sans font-bold text-lime"
                    style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)' }}
                  >
                    {val}
                  </p>
                  <p className="font-body text-muted text-xs mt-0.5 uppercase tracking-widest">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right col: VS Code block ───────────────────────── */}
          <div className="h-code hidden lg:block relative">
            {/* Decorative accent glows framing the code block */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: -28,
                left: -28,
                width: 110,
                height: 110,
                background: 'radial-gradient(circle, rgba(200,255,0,0.15) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: -36,
                right: -36,
                width: 150,
                height: 150,
                background: 'radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />

            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#0D1117',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow:
                  '0 0 0 1px rgba(200,255,0,0.05), 0 0 80px rgba(200,255,0,0.07), 0 40px 80px rgba(0,0,0,0.65)',
              }}
            >
              {/* Chrome bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  {['#FF5F57', '#FFBD2E', '#28CA41'].map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span className="font-mono text-xs text-muted">portfolio.config.ts</span>
                <span className="font-mono text-xs" style={{ color: 'rgba(200,255,0,0.5)' }}>TS</span>
              </div>

              {/* Code content */}
              <div className="p-6 min-h-[260px]">
                <pre
                  style={{
                    fontFamily: "'Fira Code','JetBrains Mono','Courier New',monospace",
                    fontSize: '0.82rem',
                    lineHeight: 1.9,
                  }}
                >
                  {CODE_LINES.map((line, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4"
                      style={{
                        opacity: i < codeVisible ? 1 : 0,
                        transform: i < codeVisible ? 'none' : 'translateX(-8px)',
                        transition: 'opacity 0.35s ease, transform 0.4s ease',
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
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.35 }}
        >
          <span className="font-body text-xs text-muted uppercase tracking-[0.15em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
        </div>
      </div>
    </section>
  );
}
