'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const STEPS = [
  { title: 'Send your site', body: 'Share the link to your current website. That is all I need to start.' },
  { title: 'I build a real fix', body: 'A quote-path redesign, an after-hours capture flow, or a homepage concept, whichever your site actually needs.' },
  { title: 'You decide', body: 'No cost and no obligation. Keep the concept, or hire me to build it properly.' },
];

/* Homepage-facing entry point into the /redesign landing page - the
   cold-email offer ("I'll build your homepage concept free") made
   visible to general visitors too, not just email click-throughs. */
export default function FreeConceptBanner() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('sr-visible');
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="sr bg-ink px-4 md:px-6 py-6 md:py-10">
      <div
        className="relative overflow-hidden rounded-2xl max-w-[1360px] mx-auto"
        style={{
          padding: 'clamp(32px, 6vw, 88px)',
          background:
            'radial-gradient(900px 520px at 88% 0%, rgba(159,199,184,0.16), transparent 62%), #0e0f0c',
          border: '1px solid rgba(159,199,184,0.18)',
        }}
      >
        <p className="font-body text-sm text-lime">Already have a website?</p>
        <h2
          className="font-sans font-bold text-white mt-4 max-w-[18ch]"
          style={{ fontSize: 'clamp(2.2rem, 5.6vw, 5rem)', lineHeight: 0.98, letterSpacing: '-0.04em' }}
        >
          I&apos;ll show you what&apos;s costing you jobs. Free.
        </h2>
        <p className="font-body text-white/60 mt-6 max-w-[54ch] leading-relaxed" style={{ fontSize: 'clamp(1rem,1.25vw,1.15rem)' }}>
          For HVAC, plumbing, roofing, and cleaning businesses. Before you pay anything, you get a real, working fix.
        </p>

        <ol className="grid md:grid-cols-3 gap-8 md:gap-12 mt-14 md:mt-20 border-t border-white/10 pt-10">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="font-sans font-bold text-lime tabular-nums" style={{ fontSize: '1.1rem' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-sans font-semibold text-white text-xl mt-3" style={{ letterSpacing: '-0.02em' }}>
                {s.title}
              </h3>
              <p className="font-body text-white/55 text-sm md:text-base mt-2 leading-relaxed max-w-[34ch]">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 md:mt-16">
          <Link href="/redesign" className="btn-lime text-base">
            Get my free concept
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
