'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('sr-visible');
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* Homepage-facing entry point into the /redesign landing page — the
   cold-email offer ("I'll build your homepage concept free") made
   visible to general visitors too, not just email click-throughs. */
export default function FreeConceptBanner() {
  const ref = useScrollReveal();

  return (
    <section className="py-16 md:py-20 bg-ink-2 border-t border-white/[0.04]">
      <div ref={ref} className="sr max-w-[1280px] mx-auto px-6">
        <div
          className="relative overflow-hidden rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          style={{
            padding: 'clamp(32px,5vw,52px)',
            background: 'linear-gradient(135deg, rgba(200,255,0,0.06) 0%, rgba(200,255,0,0.015) 100%)',
            border: '1px solid rgba(200,255,0,0.16)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 340,
              height: 340,
              background: 'radial-gradient(circle, rgba(200,255,0,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
            <span className="label-tag" style={{ marginBottom: 14 }}>
              Already have a website?
            </span>
            <h2
              className="font-sans font-bold text-white"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              I&apos;ll show you exactly what&apos;s costing you jobs — free, before you pay anything.
            </h2>
            <p className="font-body text-sm mt-4" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 480 }}>
              For HVAC, plumbing, roofing, and cleaning businesses: send me your current
              site and I&apos;ll send back a real, working fix — a quote-path redesign,
              an after-hours capture flow, or a homepage concept, whichever your site
              actually needs. No cost, no obligation.
            </p>
          </div>
          <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
            <Link href="/redesign" className="btn-lime text-base">
              Get my free concept
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
