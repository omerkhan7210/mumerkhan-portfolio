'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.style.cursor = 'none';

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    /* Hover: expand ring, shrink dot */
    const onEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      ring.style.width = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = 'rgba(200,255,0,0.8)';
      ring.style.background = 'rgba(200,255,0,0.06)';
      dot.style.opacity = '0';
      /* Show "View" label on project cards */
      if (target.dataset.cursorLabel && labelRef.current) {
        labelRef.current.textContent = target.dataset.cursorLabel;
        labelRef.current.style.opacity = '1';
      }
    };

    const onLeave = () => {
      ring.style.width = '30px';
      ring.style.height = '30px';
      ring.style.borderColor = 'rgba(200,255,0,0.5)';
      ring.style.background = 'transparent';
      dot.style.opacity = '1';
      if (labelRef.current) {
        labelRef.current.textContent = '';
        labelRef.current.style.opacity = '0';
      }
    };

    /* Click flash */
    const onClick = () => {
      dot.style.transform = 'translate(-50%,-50%) scale(2)';
      dot.style.opacity = '0.5';
      setTimeout(() => {
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        dot.style.opacity = '1';
      }, 150);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    const interactives = document.querySelectorAll<HTMLElement>('a, button, [data-cursor]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: -100,
          top: -100,
          width: 8,
          height: 8,
          background: '#C8FF00',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.2s, transform 0.2s',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          left: -100,
          top: -100,
          width: 30,
          height: 30,
          border: '1px solid rgba(200,255,0,0.5)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s, background 0.25s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            color: '#C8FF00',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            opacity: 0,
            transition: 'opacity 0.2s',
            fontFamily: 'var(--font-display)',
            userSelect: 'none',
          }}
        />
      </div>
    </>
  );
}
