'use client';

import { useEffect, useRef } from 'react';

const GAP = 32;
const DOT_R = 1.2;
const PUSH_R = 130;
const MAX_PUSH = 28;

export default function HeroDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let dots: { ox: number; oy: number; x: number; y: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    function resize() {
      const rect = parent!.getBoundingClientRect();
      W = canvas!.width = Math.ceil(rect.width);
      H = canvas!.height = Math.ceil(rect.height);
      dots = [];
      const cols = Math.ceil(W / GAP) + 1;
      const rows = Math.ceil(H / GAP) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * GAP;
          const oy = r * GAP;
          dots.push({ ox, oy, x: ox, y: oy });
        }
      }
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      for (const d of dots) {
        const dx = d.ox - mouse.x;
        const dy = d.oy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let tx = d.ox;
        let ty = d.oy;

        if (dist < PUSH_R && dist > 0.5) {
          const s = (1 - dist / PUSH_R);
          const push = s * s * MAX_PUSH;
          tx = d.ox + (dx / dist) * push;
          ty = d.oy + (dy / dist) * push;
        }

        d.x += (tx - d.x) * 0.13;
        d.y += (ty - d.y) * 0.13;

        const disp = Math.hypot(d.x - d.ox, d.y - d.oy);
        const t = Math.min(disp / MAX_PUSH, 1);

        const alpha = 0.09 + t * 0.38;
        const radius = DOT_R + t * 0.8;

        // White → lime (#C8FF00) as dots are pushed
        const rr = Math.round(255 + (200 - 255) * t);
        const gg = 255;
        const bb = Math.round(255 + (0 - 255) * t);

        ctx!.beginPath();
        ctx!.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${rr},${gg},${bb},${alpha.toFixed(3)})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
