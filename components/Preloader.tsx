'use client';

import { useEffect, useRef, useState } from 'react';

type Phase = 'loading' | 'complete' | 'flash' | 'exiting' | 'done';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    /* Only show once per browser session */
    try {
      if (sessionStorage.getItem('muk-loaded')) {
        setPhase('done');
        return;
      }
    } catch {}

    /* Lock scroll while preloader is active */
    document.body.style.overflow = 'hidden';

    /* Animate progress over ~2.4s */
    const duration = 2400;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      /* Ease: slow-fast-slow-fast (like real resource loading) */
      let eased: number;
      if (t < 0.5) {
        eased = 4 * t * t * t; // ease in cubic
      } else {
        const f = 2 * t - 2;
        eased = 1 + f * f * f / 2; // ease out cubic
      }

      const p = Math.min(Math.floor(eased * 100), 100);
      setProgress(p);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        /* Reached 100% */
        setPhase('complete');
        setTimeout(() => {
          setPhase('flash');          // lime background flash
          setTimeout(() => {
            setPhase('exiting');      // slide up
            setTimeout(() => {
              setPhase('done');
              document.body.style.overflow = '';
              try { sessionStorage.setItem('muk-loaded', '1'); } catch {}
            }, 850);
          }, 180);
        }, 350);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  const isFlash   = phase === 'flash';
  const isExiting = phase === 'exiting';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        overflow: 'hidden',
        backgroundColor: isFlash ? '#C8FF00' : '#0A0A0A',
        transition: isFlash ? 'background-color 0.14s ease' : 'none',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        /* Spring-like slide — fast exit, tiny overshoot feel */
        transitionProperty: isExiting ? 'transform' : 'background-color',
        transitionDuration: isExiting ? '0.85s' : '0.14s',
        transitionTimingFunction: isExiting ? 'cubic-bezier(0.76, 0, 0.24, 1)' : 'ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '28px 40px',
      }}
    >
      {/* ── Top bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Monogram */}
        <span
          style={{
            fontFamily: 'var(--font-display, system-ui, sans-serif)',
            fontWeight: 800,
            fontSize: '1rem',
            letterSpacing: '0.12em',
            color: isFlash ? '#0A0A0A' : '#C8FF00',
            transition: 'color 0.14s',
          }}
        >
          MUK
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body, system-ui, sans-serif)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: isFlash ? '#0A0A0A' : 'rgba(255,255,255,0.25)',
            transition: 'color 0.14s',
          }}
        >
          Portfolio {new Date().getFullYear()}
        </span>
      </div>

      {/* ── Center content ── */}
      <div style={{ textAlign: 'center', position: 'relative', userSelect: 'none' }}>
        {/* Giant background percentage (decorative) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -52%)',
            fontFamily: 'var(--font-display, system-ui, sans-serif)',
            fontWeight: 800,
            fontSize: 'clamp(8rem, 24vw, 20rem)',
            lineHeight: 1,
            color: isFlash ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.03)',
            transition: 'color 0.14s',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.04em',
            pointerEvents: 'none',
          }}
        >
          {String(progress).padStart(2, '0')}
        </div>

        {/* Name reveal — two halves slide together */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: '0.3em',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display, system-ui, sans-serif)',
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: isFlash ? '#0A0A0A' : '#ffffff',
              transition: 'color 0.14s',
              transform: `translateX(${phase === 'loading' ? `-${(100 - progress) * 0.3}px` : '0'})`,
              transitionProperty: 'color, transform',
              transitionDuration: '0.14s, 0.05s',
            }}
          >
            UMER
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display, system-ui, sans-serif)',
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: isFlash ? '#0A0A0A' : '#C8FF00',
              transition: 'color 0.14s',
              transform: `translateX(${phase === 'loading' ? `${(100 - progress) * 0.3}px` : '0'})`,
              transitionProperty: 'color, transform',
              transitionDuration: '0.14s, 0.05s',
            }}
          >
            KHAN
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-body, system-ui, sans-serif)',
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: isFlash ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.3)',
            marginTop: '1.2rem',
            transition: 'color 0.14s',
          }}
        >
          Full Stack Developer · Karachi
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div>
        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: 1,
            background: isFlash ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.07)',
            borderRadius: 1,
            marginBottom: 16,
            overflow: 'hidden',
            transition: 'background 0.14s',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: isFlash ? '#0A0A0A' : '#C8FF00',
              transition: 'width 0.08s linear, background 0.14s',
              borderRadius: 1,
            }}
          />
        </div>

        {/* Bottom labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-body, system-ui, sans-serif)',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: isFlash ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.2)',
              transition: 'color 0.14s',
            }}
          >
            mumerkhan.com
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display, system-ui, sans-serif)',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              color: isFlash ? '#0A0A0A' : '#C8FF00',
              minWidth: 40,
              textAlign: 'right',
              transition: 'color 0.14s',
            }}
          >
            {String(progress).padStart(2, '0')}%
          </span>
        </div>
      </div>
    </div>
  );
}
