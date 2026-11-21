'use client';

import { useEffect, useRef } from 'react';

const PILLARS = [
  {
    n: '01',
    heading: 'Design without compromise',
    body: 'Trade customers decide in seconds. I design for clarity and trust first, then polish every breakpoint so nothing gets in the way of the enquiry.',
  },
  {
    n: '02',
    heading: 'Speed is a feature',
    body: 'A slow site loses jobs on mobile. Every build is checked for speed, especially the path to call or request a quote.',
  },
  {
    n: '03',
    heading: 'SEO built in, not bolted on',
    body: 'Clean structure helps local search and real users. Service pages, areas, and proof are built in, not added later.',
  },
];

/* Sticky headline on the left, pillars reveal one by one on the right. */
export default function PhilosophySection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('sr-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="bg-ink border-t border-white/[0.06] py-24 md:py-36">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 grid md:grid-cols-[1fr_1.15fr] gap-14 md:gap-24">
        <div className="md:sticky md:top-32 md:self-start">
          <h2
            data-reveal
            className="sr font-sans font-bold text-white"
            style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.8rem)', lineHeight: 0.98, letterSpacing: '-0.04em' }}
          >
            Your website should win more jobs.
            <span className="block text-white/35 mt-2">Not just look busy.</span>
          </h2>
        </div>

        <div>
          {PILLARS.map((p) => (
            <div key={p.n} data-reveal className="sr py-10 md:py-14 border-t border-white/[0.08] first:border-t-0 first:pt-0">
              <p
                className="font-sans font-bold leading-none text-transparent"
                style={{
                  fontSize: 'clamp(4rem, 8vw, 7rem)',
                  letterSpacing: '-0.05em',
                  WebkitTextStroke: '1px rgba(159,199,184,0.55)',
                }}
              >
                {p.n}
              </p>
              <h3 className="font-sans font-semibold text-white mt-6" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', letterSpacing: '-0.02em' }}>
                {p.heading}
              </h3>
              <p className="font-body text-white/60 leading-relaxed mt-3 max-w-[52ch]" style={{ fontSize: 'clamp(1rem,1.2vw,1.1rem)' }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
