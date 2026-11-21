'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import projectsData from '@/data/projects.json';
import { loadScrollTrigger } from '@/lib/scrollTrigger';

/* First four entries are the trade case studies that have real screenshots. */
const CASES = projectsData.slice(0, 4);

/**
 * Pinned horizontal gallery on desktop (vertical scroll pans the track).
 * Below 900px, or with reduced motion, it is a native swipeable scroll-snap row.
 */
export default function ProjectsSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;
    let mm: { revert: () => void } | undefined;
    let ro: ResizeObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await loadScrollTrigger();
      if (cancelled) return;
      const wrap = wrapRef.current;
      const view = viewRef.current;
      const track = trackRef.current;
      if (!wrap || !view || !track) return;

      const media = gsap.matchMedia();
      mm = media;
      media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        view.style.overflowX = 'hidden';
        const dist = () => Math.max(track.scrollWidth - view.clientWidth, 0);
        gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
              if (countRef.current) {
                const idx = Math.min(Math.round(self.progress * CASES.length), CASES.length);
                countRef.current.textContent = String(Math.max(idx, 1)).padStart(2, '0');
              }
            },
          },
        });
        return () => {
          view.style.overflowX = '';
        };
      });

      // Layout above the pin shifts as fonts and images settle; re-measure so the pin starts in the right place.
      document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
      let lastH = document.body.offsetHeight;
      ro = new ResizeObserver(() => {
        const h = document.body.offsetHeight;
        if (Math.abs(h - lastH) < 3) return;
        lastH = h;
        clearTimeout(timer);
        timer = setTimeout(() => ScrollTrigger.refresh(), 150);
      });
      ro.observe(document.body);
    })();

    return () => {
      cancelled = true;
      ro?.disconnect();
      clearTimeout(timer);
      mm?.revert();
    };
  }, []);

  return (
    <section className="relative bg-ink border-t border-white/[0.06]">
      {/* The inner div is what GSAP pins, so React never has to remove a re-parented node. */}
      <div ref={wrapRef} className="md:min-h-[100dvh] flex flex-col justify-center py-20 md:py-0">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 w-full flex items-end justify-between gap-6 mb-8 md:mb-10 md:pt-24">
        <div>
          <span className="label-tag">Selected work</span>
          <h2
            className="font-sans font-bold text-white mt-3"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.4rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
          >
            Sites that already <span className="text-lime">bring in jobs.</span>
          </h2>
        </div>
        <p className="hidden md:block font-sans font-bold text-white/30 tabular-nums" style={{ fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
          <span ref={countRef} className="text-lime">01</span> / {String(CASES.length).padStart(2, '0')}
        </p>
      </div>

      <div ref={viewRef} className="overflow-x-auto snap-x snap-mandatory md:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div ref={trackRef} className="flex gap-5 md:gap-8 px-6 md:px-10 w-max will-change-transform">
          {CASES.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group relative snap-start block flex-shrink-0 overflow-hidden rounded-2xl bg-ink-2 border border-white/[0.08]"
              style={{ width: 'min(84vw, 900px)', height: 'min(72vh, 560px)', minHeight: 380 }}
            >
              <Image
                src={p.cardImage}
                alt={`${p.title} website preview`}
                fill
                sizes="(min-width: 900px) 900px, 84vw"
                className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                priority={i === 0}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0) 35%, rgba(10,10,10,0.88) 100%)' }}
              />
              <span
                className="absolute top-5 left-6 font-sans font-bold tabular-nums text-white/85"
                style={{ fontSize: 'clamp(2.4rem,4vw,3.6rem)', letterSpacing: '-0.05em', lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="font-body text-xs md:text-sm text-lime mb-2">{p.category}</p>
                <h3
                  className="font-sans font-bold text-white"
                  style={{ fontSize: 'clamp(1.6rem,3vw,2.6rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
                >
                  {p.title}
                </h3>
                <p className="font-body text-sm md:text-base text-white/70 mt-3 max-w-[52ch] line-clamp-2">{p.results[0]}</p>
                <span className="inline-flex items-center gap-2 mt-5 font-sans font-semibold text-sm text-white group-hover:text-lime group-hover:gap-3 transition-all">
                  View case study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}

          <Link
            href="/work"
            className="group relative snap-start flex-shrink-0 rounded-2xl flex flex-col justify-between p-8 md:p-10 bg-lime text-ink"
            style={{ width: 'min(70vw, 420px)', height: 'min(72vh, 560px)', minHeight: 380 }}
          >
            <p className="font-body text-sm">All projects</p>
            <div>
              <p className="font-sans font-bold leading-[0.95]" style={{ fontSize: 'clamp(2rem,3.4vw,3rem)', letterSpacing: '-0.04em' }}>
                {projectsData.length} projects and counting.
              </p>
              <span className="inline-flex items-center gap-2 mt-6 font-sans font-semibold group-hover:gap-3 transition-all">
                Browse all work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="hidden md:block max-w-[1360px] mx-auto px-10 w-full mt-10 md:pb-16">
        <div className="h-px bg-white/10">
          <div ref={barRef} className="h-px bg-lime origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
      </div>
    </section>
  );
}
