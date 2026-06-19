'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SitePreviewModal from './SitePreviewModal';
import projectsData from '@/data/projects.json';

const ACCENTS = [
  '#C8FF00', '#60A5FA', '#F472B6', '#34D399',
  '#FB923C', '#A78BFA', '#38BDF8', '#FBBF24',
];

type Project = typeof projectsData[0];

function ProjectRow({
  project,
  index,
  flip,
}: {
  project: Project;
  index: number;
  flip: boolean;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const [hovered, setHovered] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const hasLiveLink = project.link && project.link !== '#';

  return (
    <>
      {previewUrl && (
        <SitePreviewModal
          url={previewUrl}
          title={project.title}
          onClose={() => setPreviewUrl(null)}
        />
      )}

      <div
        className="proj-row group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          minHeight: 320,
          transition: 'background 0.35s ease',
          background: hovered ? 'rgba(255,255,255,0.015)' : 'transparent',
        }}
      >
        {/* ── Content side ── */}
        <div
          style={{
            order: flip ? 2 : 1,
            padding: 'clamp(28px, 4vw, 48px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 0,
            borderRight: flip ? '1px solid rgba(255,255,255,0.06)' : undefined,
            borderLeft: !flip ? '1px solid rgba(255,255,255,0.06)' : undefined,
          }}
        >
          {/* Number + category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                color: hovered ? accent : `rgba(var(--fg-rgb),0.3)`,
                letterSpacing: '0.1em',
                transition: 'color 0.3s',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                padding: '3px 10px',
                borderRadius: 100,
                background: hovered ? `${accent}18` : `rgba(var(--fg-rgb),0.05)`,
                color: hovered ? accent : `rgba(var(--fg-rgb),0.48)`,
                border: `1px solid ${hovered ? accent + '35' : `rgba(var(--fg-rgb),0.07)`}`,
                transition: 'all 0.3s',
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: hovered ? 'var(--color-fg)' : `rgba(var(--fg-rgb),0.88)`,
              marginBottom: 12,
              transition: 'color 0.3s',
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: `rgba(var(--fg-rgb),0.5)`,
              lineHeight: 1.65,
              marginBottom: 20,
              maxWidth: 400,
            }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  padding: '3px 10px',
                  borderRadius: 6,
                  background: `rgba(var(--fg-rgb),0.04)`,
                  color: `rgba(var(--fg-rgb),0.48)`,
                  border: `1px solid rgba(var(--fg-rgb),0.07)`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href={`/work/${project.slug}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: accent,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              View case study
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  transform: hovered ? 'translate(2px,-2px)' : 'none',
                  transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>

            {hasLiveLink && (
              <button
                onClick={() => setPreviewUrl(project.link)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  color: `rgba(var(--fg-rgb),0.48)`,
                  background: `rgba(var(--fg-rgb),0.04)`,
                  border: `1px solid rgba(var(--fg-rgb),0.1)`,
                  borderRadius: 8,
                  padding: '5px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-fg)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `rgba(var(--fg-rgb),0.25)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = `rgba(var(--fg-rgb),0.48)`;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `rgba(var(--fg-rgb),0.1)`;
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Preview site
              </button>
            )}
          </div>

          {/* Year */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              color: `rgba(var(--fg-rgb),0.32)`,
              marginTop: 20,
              letterSpacing: '0.06em',
            }}
          >
            {project.year}
          </p>
        </div>

        {/* ── Image side ── */}
        <div
          style={{
            order: flip ? 1 : 2,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 280,
            background: '#111',
          }}
        >
          {/* Accent top border */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: accent,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              zIndex: 2,
            }}
          />

          <Image
            src={project.cardImage}
            alt={project.title}
            fill
            className="object-cover"
            style={{
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.85s cubic-bezier(0.16,1,0.3,1)',
              filter: hovered ? 'brightness(0.85)' : 'brightness(0.7)',
              transitionProperty: 'transform, filter',
            }}
            unoptimized
          />

          {/* Corner accent glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse at ${flip ? '20% 80%' : '80% 20%'}, ${accent}22 0%, transparent 55%)`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.5s ease',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

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

  /* Stagger rows on scroll */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rows = Array.from(section.querySelectorAll<HTMLElement>('.proj-row'));
    rows.forEach((r) => {
      r.style.opacity = '0';
      r.style.transform = 'translateY(28px)';
      r.style.transition = 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1), background 0.35s ease';
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = rows.indexOf(entry.target as HTMLElement);
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.transform = 'none';
            }, i * 80);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    rows.forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const featured = projectsData.slice(0, 6);

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
            View all 15 projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>

        {/* Rows */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {featured.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i}
              flip={i % 2 !== 0}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link href="/work" className="btn-lime">
            See all 15 projects
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile grid fallback */}
      <style>{`
        @media (max-width: 680px) {
          .proj-row {
            grid-template-columns: 1fr !important;
          }
          .proj-row > div:last-child {
            order: 1 !important;
            min-height: 200px !important;
          }
          .proj-row > div:first-child {
            order: 2 !important;
          }
        }
      `}</style>
    </section>
  );
}
