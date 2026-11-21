'use client';

import { useEffect, useRef } from 'react';

const STATS = [
  { value: 100, suffix: '%', label: 'Job Success Score', sub: 'Maintained on Upwork across every contract' },
  { value: 80, suffix: '+', label: 'Projects delivered', sub: 'Since 2020, for real clients' },
  { value: 6, suffix: '+', label: 'Years building', sub: 'WordPress, WooCommerce and automation' },
  { value: 5, suffix: '.0', label: 'Average rating', sub: 'Eight verified Upwork reviews' },
] as const;

/* Counts up once when scrolled into view. Writes to the DOM directly, no React state per frame. */
export default function ProofStrip() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nums = Array.from(root.querySelectorAll<HTMLElement>('[data-count]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const run = () => {
      if (reduce) {
        nums.forEach((n) => (n.textContent = n.dataset.count ?? ''));
        return;
      }
      const begin = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - begin) / 1600, 1);
        const e = 1 - Math.pow(1 - p, 4);
        nums.forEach((n) => (n.textContent = String(Math.round(e * Number(n.dataset.count)))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          root.classList.add('sr-visible');
          run();
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={rootRef} className="sr bg-ink border-b border-white/[0.06]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`py-10 md:py-14 ${i % 2 === 1 ? 'pl-6 md:pl-10' : 'pr-6 md:pr-10'} ${
              i > 0 ? 'lg:pl-10 lg:border-l lg:border-white/[0.06]' : ''
            } ${i === 1 ? 'border-l border-white/[0.06] lg:border-l' : ''} ${i === 3 ? 'border-l border-white/[0.06]' : ''} ${
              i >= 2 ? 'border-t border-white/[0.06] lg:border-t-0' : ''
            }`}
          >
            <p
              className="font-sans font-bold text-white leading-none tabular-nums"
              style={{ fontSize: 'clamp(3rem, 6.2vw, 5.5rem)', letterSpacing: '-0.045em' }}
            >
              <span data-count={s.value}>0</span>
              <span className="text-lime">{s.suffix}</span>
            </p>
            <p className="font-sans font-semibold text-white text-base mt-4">{s.label}</p>
            <p className="font-body text-muted text-sm mt-1 max-w-[26ch]">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
