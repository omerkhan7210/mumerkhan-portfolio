'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import projectsData from '@/data/projects.json';

const ACCENTS = [
  '#C8FF00', '#60A5FA', '#F472B6', '#34D399',
  '#FB923C', '#A78BFA', '#38BDF8', '#FBBF24', '#E879F9',
];

/* ── Individual project card ─────────────────────────────────── */
function ProjCard({
  project,
  index,
  wide = false,
}: {
  project: typeof projectsData[0];
  index: number;
  wide?: boolean;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor-label="View"
      className="proj-card relative block overflow-hidden rounded-2xl"
      style={{
        background: '#0D0D0D',
        border: `1px solid ${hovered ? accent + '40' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 28px 80px ${accent}18, 0 0 0 1px ${accent}20` : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        height: wide ? 340 : 380,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ── */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={project.cardImage}
          alt={project.title}
          fill
          className="object-cover"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1)',
            filter: hovered ? 'brightness(0.75)' : 'brightness(0.55)',
            transitionProperty: 'transform, filter',
          }}
          unoptimized
        />
      </div>

      {/* ── Gradient overlay — always visible ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* ── Accent corner glow on hover ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 90% 10%, ${accent}18 0%, transparent 50%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* ── Top: number + category badge ── */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <span
          className="font-body tabular-nums"
          style={{ fontSize: '0.68rem', color: hovered ? accent : 'rgba(255,255,255,0.3)', transition: 'color 0.3s', letterSpacing: '0.08em' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="font-body text-xs px-2.5 py-1 rounded-full"
          style={{
            background: hovered ? `${accent}22` : 'rgba(0,0,0,0.55)',
            color: hovered ? accent : 'rgba(255,255,255,0.5)',
            border: `1px solid ${hovered ? accent + '35' : 'rgba(255,255,255,0.1)'}`,
            backdropFilter: 'blur(8px)',
            transition: 'background 0.3s, color 0.3s, border-color 0.3s',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* ── Bottom info panel ── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        {/* Tech tags — slide up on hover */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: hovered ? '80px' : '0px',
            opacity: hovered ? 1 : 0,
            transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
            marginBottom: hovered ? 10 : 0,
          }}
        >
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="font-body text-xs px-2 py-0.5 rounded-sm"
                style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}22` }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 font-body text-xs" style={{ color: accent }}>
            <span>View Case Study</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>

        {/* Project title — always visible */}
        <h3
          className="font-sans font-bold leading-tight"
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
            letterSpacing: '-0.02em',
            color: hovered ? '#ffffff' : 'rgba(255,255,255,0.9)',
            transition: 'color 0.3s',
          }}
        >
          {project.title}
        </h3>
        <p className="font-body text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {project.year}
        </p>
      </div>

      {/* ── Bottom accent sweep ── */}
      <div
        className="absolute bottom-0 left-0 h-0.5 z-20"
        style={{
          width: hovered ? '100%' : '0%',
          background: `linear-gradient(90deg, ${accent}, ${accent}40)`,
          transition: 'width 0.55s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </Link>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* Scroll-reveal heading */
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('sr-visible'); obs.unobserve(el); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Stagger cards on scroll */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.proj-card'));
    cards.forEach((c) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(32px)';
      c.style.transitionProperty = 'opacity, transform, border-color, box-shadow';
      c.style.transitionDuration = '0.7s, 0.7s, 0.35s, 0.35s';
      c.style.transitionTimingFunction = 'cubic-bezier(0.16,1,0.3,1)';
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = cards.indexOf(entry.target as HTMLElement);
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.transform = 'translateY(0)';
            }, i * 70);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-ink-2">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div ref={headRef} className="sr flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <span className="label-tag">Selected Work</span>
            <h2
              className="font-sans font-bold text-white mt-3"
              style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', lineHeight: 1, letterSpacing: '-0.03em' }}
            >
              Projects that<br />prove the point.
            </h2>
          </div>
          <Link
            href="/work"
            className="font-body text-muted text-sm hover:text-white transition-colors flex items-center gap-2 self-end"
          >
            View All 15 Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>

        {/* ── Bento card grid ── */}
        <div ref={gridRef}>

          {/* Row 1: [wide - 2col] + [normal] + [normal] — 4-col base */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* P1 wide */}
            <div className="sm:col-span-2">
              <ProjCard project={projectsData[0]} index={0} wide />
            </div>
            {/* P2 */}
            <div>
              <ProjCard project={projectsData[1]} index={1} />
            </div>
            {/* P3 */}
            <div>
              <ProjCard project={projectsData[2]} index={2} />
            </div>
          </div>

          {/* Row 2: [normal] + [normal] + [wide - 2col] */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* P4 */}
            <div>
              <ProjCard project={projectsData[3]} index={3} />
            </div>
            {/* P5 */}
            <div>
              <ProjCard project={projectsData[4]} index={4} />
            </div>
            {/* P6 wide */}
            <div className="sm:col-span-2">
              <ProjCard project={projectsData[5]} index={5} wide />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link href="/work" className="btn-lime">
            See All 15 Projects
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
          <Link href="/work" className="font-body text-sm text-muted hover:text-white transition-colors flex items-center gap-1.5">
            <span>Browse by category</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
