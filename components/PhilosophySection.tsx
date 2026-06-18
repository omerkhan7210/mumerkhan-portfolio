'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const pillars = [
  {
    n: '01',
    heading: 'Design without compromise',
    body: "Most developers stop at 'it works.' I don't stop until it looks exactly right on every screen, every browser, every size.",
  },
  {
    n: '02',
    heading: 'Speed is a feature',
    body: "A slow website is a broken website. Every project I ship is performance-audited. If it doesn't load fast, it doesn't go live.",
  },
  {
    n: '03',
    heading: 'SEO built in, not bolted on',
    body: 'Clean architecture means search engines understand your site from day one. No plugins needed to fix what was built right.',
  },
];

function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('sr-visible'); obs.unobserve(el); } },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function PhilosophySection() {
  const headRef = useScrollReveal();
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useScrollReveal();

  /* Stagger pillar cards */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.phil-card'));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement);
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.transform = 'translateY(0)';
            }, idx * 120);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    cards.forEach((c) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(28px)';
      c.style.transition = 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)';
      obs.observe(c);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Heading */}
        <div ref={headRef} className="sr">
          <span className="label-tag-dark">The Philosophy</span>
          <h2
            className="font-sans font-bold text-ink mb-16"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
          >
            The internet<br />deserves better.<br />
            <span style={{ color: '#AAAAAA' }}>So do you.</span>
          </h2>
        </div>

        {/* Pillars */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14">
          {pillars.map((p) => (
            <div key={p.n} className="phil-card">
              <span
                className="font-sans font-bold text-xs tracking-widest uppercase mb-4 block"
                style={{ color: '#BBBBBB' }}
              >
                {p.n}
              </span>
              <h3 className="font-sans font-bold text-ink text-xl mb-3">{p.heading}</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#555555' }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="sr mt-14 pt-14 border-t"
          style={{ borderColor: 'rgba(0,0,0,0.08)' }}
        >
          <Link href="/contact" className="btn-dark">
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
