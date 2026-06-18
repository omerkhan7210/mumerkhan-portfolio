'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  link: string;
  technologies: string[];
  cardImage: string;
  heroImage: string;
  galleryImages: string[];
  keyFeatures: string[];
};

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('sr-visible'); obs.unobserve(el); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function CaseStudyClient({
  project,
  accent,
  prev,
  next,
}: {
  project: Project;
  accent: string;
  prev: { slug: string; title: string; cardImage: string } | null;
  next: { slug: string; title: string; cardImage: string } | null;
}) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const overviewRef = useScrollReveal();
  const challengeRef = useScrollReveal();
  const solutionRef = useScrollReveal();
  const galleryRef = useScrollReveal(0.05);
  const resultsRef = useScrollReveal();
  const navRef = useScrollReveal();

  return (
    <main>
      {/* ── HERO ─────────────────────────────────── */}
      <section
        className="relative min-h-[65vh] flex flex-col justify-end pb-16 pt-32 overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        {/* Accent glow */}
        <div
          className="absolute right-0 top-0 pointer-events-none"
          style={{
            width: 700,
            height: 700,
            background: `radial-gradient(circle at 70% 30%, ${accent}12 0%, transparent 60%)`,
          }}
        />
        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-body text-xs text-muted mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/work" className="hover:text-white transition-colors">Work</Link>
            <span>/</span>
            <span style={{ color: accent }}>{project.title}</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              {/* Category + year pill */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="font-body text-xs px-3 py-1 rounded-full"
                  style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}
                >
                  {project.category}
                </span>
                <span className="font-body text-xs text-muted">{project.year}</span>
              </div>

              <h1
                className="font-sans font-bold text-white"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', lineHeight: 0.93, letterSpacing: '-0.03em' }}
              >
                {project.title}
              </h1>
              <p className="font-body text-muted text-lg mt-4 max-w-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Action links */}
            <div className="flex items-center gap-3 flex-wrap">
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lime"
                >
                  View Live Site
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              )}
              <Link href="/work" className="btn-outline" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
                ← All Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ───────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: '#0D0D0D', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              aspectRatio: '16/9',
              border: `1px solid ${accent}20`,
              boxShadow: `0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px ${accent}10`,
            }}
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transition: 'opacity 0.8s ease',
              }}
              onLoad={() => setHeroLoaded(true)}
              unoptimized
            />
            {/* Accent border glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: `inset 0 0 60px ${accent}06` }}
            />
          </div>
        </div>
      </div>

      {/* ── OVERVIEW ─────────────────────────────── */}
      <section className="py-20 bg-ink-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div ref={overviewRef} className="sr grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Overview text */}
            <div className="md:col-span-2">
              <span className="label-tag">Overview</span>
              <p className="font-body text-white/70 leading-relaxed text-lg">
                {project.longDescription}
              </p>
            </div>

            {/* Quick info */}
            <div className="space-y-6">
              <div>
                <p className="font-body text-xs text-muted uppercase tracking-widest mb-2">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-body text-xs px-2.5 py-1 rounded-sm"
                      style={{
                        background: `${accent}08`,
                        color: accent,
                        border: `1px solid ${accent}18`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-body text-xs text-muted uppercase tracking-widest mb-2">Year</p>
                <p className="font-sans font-bold text-white">{project.year}</p>
              </div>
              <div>
                <p className="font-body text-xs text-muted uppercase tracking-widest mb-2">Category</p>
                <p className="font-sans font-bold text-white">{project.category}</p>
              </div>
              {project.link !== '#' && (
                <div>
                  <p className="font-body text-xs text-muted uppercase tracking-widest mb-2">Live URL</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-body text-sm hover:underline"
                    style={{ color: accent }}
                  >
                    {project.link.replace('https://', '')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION ─────────────────── */}
      <section className="py-20 bg-ink" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Challenge */}
          <div ref={challengeRef} className="sr">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${accent}12`, border: `1px solid ${accent}20` }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
            </div>
            <h2 className="font-sans font-bold text-white text-2xl mb-4" style={{ letterSpacing: '-0.02em' }}>
              The Challenge
            </h2>
            <p className="font-body text-white/60 leading-relaxed">{project.challenge}</p>
          </div>

          {/* Solution */}
          <div ref={solutionRef} className="sr">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${accent}12`, border: `1px solid ${accent}20` }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-sans font-bold text-white text-2xl mb-4" style={{ letterSpacing: '-0.02em' }}>
              The Solution
            </h2>
            <p className="font-body text-white/60 leading-relaxed">{project.solution}</p>
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────── */}
      {project.galleryImages.length > 0 && (
        <section className="py-20 bg-ink-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="max-w-[1280px] mx-auto px-6">
            <div ref={galleryRef} className="sr">
              <span className="label-tag">Gallery</span>
              <div className={`grid gap-4 mt-6 ${project.galleryImages.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {project.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden"
                    style={{
                      aspectRatio: '16/10',
                      border: `1px solid ${accent}15`,
                      ...(i === 0 && project.galleryImages.length > 1 ? { gridColumn: '1 / -1', aspectRatio: '21/9' } : {}),
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── RESULTS + FEATURES ───────────────────── */}
      <section className="py-20 bg-ink" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Results */}
          <div ref={resultsRef} className="sr">
            <span className="label-tag">Results</span>
            <div className="space-y-4 mt-2">
              {project.results.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${accent}15` }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="font-body text-white/70 text-sm leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key features */}
          <div>
            <span className="label-tag">Key Features</span>
            <div className="space-y-3 mt-2">
              {project.keyFeatures.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span className="font-body text-xs tabular-nums text-muted w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-body text-sm text-white/75">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT / PREV NAV ──────────────────────── */}
      <section className="py-16 bg-ink-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div ref={navRef} className="sr max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="group relative rounded-2xl p-6 overflow-hidden flex flex-col justify-between min-h-[140px]"
                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `${accent}06` }}
                />
                <p className="font-body text-xs text-muted mb-2 relative z-10">← Previous</p>
                <p className="font-sans font-bold text-white text-xl relative z-10 group-hover:text-lime transition-colors">
                  {prev.title}
                </p>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="group relative rounded-2xl p-6 overflow-hidden flex flex-col justify-between min-h-[140px] text-right"
                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `${accent}06` }}
                />
                <p className="font-body text-xs text-muted mb-2 relative z-10">Next →</p>
                <p className="font-sans font-bold text-white text-xl relative z-10 group-hover:text-lime transition-colors">
                  {next.title}
                </p>
              </Link>
            ) : <div />}
          </div>

          <div className="mt-6 text-center">
            <Link href="/work" className="font-body text-sm text-muted hover:text-white transition-colors">
              ← Back to all work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
