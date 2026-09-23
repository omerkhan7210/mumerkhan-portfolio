'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import projectsData from '@/data/projects.json';

/* The five trade / local-service case studies already in the
   portfolio — reused here rather than duplicated, framed as
   problem → fix → result instead of a generic project grid. */
const TRADE_SLUGS = ['erbs-ltd', 'wlk-gardeners', 'isg-flooring', 'v1-campers', 'bright-home'];

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

export default function RedesignProof() {
  const headRef = useScrollReveal();
  const gridRef = useRef<HTMLDivElement>(null);

  const tradeProjects = TRADE_SLUGS
    .map((slug) => projectsData.find((p) => p.slug === slug))
    .filter((p): p is (typeof projectsData)[number] => Boolean(p));

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.proof-card'));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement);
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.transform = 'translateY(0)';
            }, idx * 90);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    cards.forEach((c) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(24px)';
      c.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
      obs.observe(c);
    });
    return () => obs.disconnect();
  }, [tradeProjects.length]);

  return (
    <section className="py-24 md:py-28 bg-ink border-t border-white/[0.04]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={headRef} className="sr mb-14 flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="label-tag">Real Trade Rebuilds</span>
            <h2
              className="font-sans font-bold text-white mt-3"
              style={{ fontSize: 'clamp(1.8rem,4.5vw,3.2rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              The problem I found.<br />What I changed.
            </h2>
          </div>
          <p className="font-body text-muted max-w-xs text-sm leading-relaxed">
            No before/after screenshots here — just what was actually broken, and what
            replaced it, on live sites for real roofing, gardening, flooring, and hire
            businesses.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tradeProjects.map((project) => (
            <div
              key={project.slug}
              className="proof-card rounded-2xl overflow-hidden flex flex-col"
              style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div style={{ position: 'relative', height: 190, background: '#111' }}>
                <Image src={project.cardImage} alt={project.title} fill className="object-cover" style={{ filter: 'brightness(0.8)' }} />
              </div>
              <div style={{ padding: '24px 26px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-sans font-semibold text-white" style={{ fontSize: '1.05rem' }}>
                    {project.title}
                  </h3>
                  <span
                    className="font-body text-xs px-2 py-0.5 rounded-sm"
                    style={{ background: 'rgba(200,255,0,0.07)', color: 'rgba(200,255,0,0.65)', border: '1px solid rgba(200,255,0,0.14)' }}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="font-body text-xs uppercase tracking-wide mb-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    The problem
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {project.challenge}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="font-body text-xs uppercase tracking-wide mb-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    What changed
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {project.solution}
                  </p>
                </div>

                <Link
                  href={`/work/${project.slug}`}
                  className="font-body text-sm font-semibold flex items-center gap-1.5 mt-auto"
                  style={{ color: '#C8FF00' }}
                >
                  Read the full case study
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
