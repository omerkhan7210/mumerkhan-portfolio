'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const pillars = [
  {
    n: '01',
    heading: 'Design without compromise',
    body: "Trade customers decide in seconds. I design for clarity and trust first — then polish every breakpoint so nothing gets in the way of the enquiry.",
  },
  {
    n: '02',
    heading: 'Speed is a feature',
    body: "A slow site loses jobs on mobile. Every build is checked for speed — especially the path to call or request a quote.",
  },
  {
    n: '03',
    heading: 'SEO built in, not bolted on',
    body: 'Clean structure helps local search and real users. Service pages, areas, and proof are built in — not bolted on later.',
  },
];

function useScrollReveal(threshold = 0.08) {
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

export default function PhilosophySection() {
  const headRef = useScrollReveal();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = cardsRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.phil-card'));
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
        <div ref={headRef} className="sr">
          <span className="label-tag-dark">The Philosophy</span>
          <h2
            className="font-sans font-bold text-ink mb-16"
            style={{ fontSize: 'clamp(2rem,5vw,3.4rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            Your website should<br />win more jobs.<br />Not just look busy.
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {pillars.map((p) => (
            <div
              key={p.n}
              className="phil-card rounded-2xl p-7 border border-black/5 bg-white/60"
            >
              <span className="font-body text-xs text-ink/40 tabular-nums">{p.n}</span>
              <h3 className="font-sans font-semibold text-ink mt-3 mb-3" style={{ fontSize: '1.15rem' }}>
                {p.heading}
              </h3>
              <p className="font-body text-sm text-ink/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/contact" className="btn-ink">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
