'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SitePreviewModal from './SitePreviewModal';

type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  cardImage: string;
  link?: string;
};

const ACCENTS = [
  '#C8FF00', '#60A5FA', '#F472B6', '#34D399',
  '#FB923C', '#A78BFA', '#38BDF8', '#86EFAC',
  '#FBBF24', '#E879F9', '#67E8F9', '#4ADE80',
  '#FCA5A5', '#D8B4FE', '#FDE68A',
];

const FILTERS = [
  { label: 'All', match: (_: string) => true },
  { label: 'WordPress', match: (c: string) => c.includes('WordPress') },
  { label: 'E-Commerce', match: (c: string) => c.includes('E-Commerce') },
  { label: 'Full Stack', match: (c: string) => c.includes('Full-Stack') },
  { label: 'Design', match: (c: string) => ['Brand Website', 'Agency Website', 'Service App Website', 'B2B Portfolio Site', 'Wellness Brand Website'].includes(c) },
];

function ProjectCard({
  project,
  accent,
  onPreview,
}: {
  project: Project;
  accent: string;
  onPreview: (url: string, title: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const hasPreview = !!(project.link && project.link !== '#');

  return (
    <div
      data-cursor-label="View"
      onClick={() => router.push(`/work/${project.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        textDecoration: 'none',
        background: '#0d0d0d',
        border: `1px solid ${hovered ? accent + '40' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 24px 60px ${accent}14` : 'none',
        transition: 'border-color 0.32s, box-shadow 0.32s, transform 0.42s cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-5px)' : 'none',
        aspectRatio: '4/3',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <Image
        src={project.cardImage}
        alt={project.title}
        fill
        className="object-cover"
        style={{
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1)',
          filter: hovered ? 'brightness(0.7)' : 'brightness(0.52)',
          transitionProperty: 'transform, filter',
        }}
        unoptimized
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.08) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Accent glow on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 85% 15%, ${accent}18 0%, transparent 55%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
          pointerEvents: 'none',
        }}
      />

      {/* Top: index + category */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          right: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            color: hovered ? accent : 'rgba(255,255,255,0.25)',
            transition: 'color 0.3s',
          }}
        >
          {String(project.id).padStart(2, '0')}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            padding: '4px 10px',
            borderRadius: 20,
            background: hovered ? `${accent}22` : 'rgba(0,0,0,0.6)',
            color: hovered ? accent : 'rgba(255,255,255,0.45)',
            border: `1px solid ${hovered ? accent + '35' : 'rgba(255,255,255,0.09)'}`,
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s',
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Bottom info */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '18px 18px 20px',
          zIndex: 10,
        }}
      >
        {/* Tech tags + action buttons — revealed on hover */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: hovered ? 80 : 0,
            opacity: hovered ? 1 : 0,
            transition: 'max-height 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
            marginBottom: hovered ? 10 : 0,
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  padding: '2px 8px',
                  borderRadius: 4,
                  background: `${accent}14`,
                  color: accent,
                  border: `1px solid ${accent}22`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          {/* Action row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: accent,
              }}
            >
              View Case Study
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>

            {/* Preview site button */}
            {hasPreview && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(project.link!, project.title);
                }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  padding: '3px 10px',
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.09)',
                  color: 'rgba(255,255,255,0.65)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  transition: 'background 0.2s, color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
                Preview
              </button>
            )}
          </div>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            letterSpacing: '-0.02em',
            color: hovered ? '#ffffff' : 'rgba(255,255,255,0.9)',
            lineHeight: 1.2,
            transition: 'color 0.28s',
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.28)',
            marginTop: 4,
          }}
        >
          {project.year}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          width: hovered ? '100%' : '0%',
          background: `linear-gradient(90deg, ${accent}, ${accent}40)`,
          transition: 'width 0.52s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 20,
        }}
      />
    </div>
  );
}

export default function WorkClient({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [displayed, setDisplayed] = useState<Project[]>(projects);
  const [fading, setFading] = useState(false);
  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filterCounts = FILTERS.map((f) => ({
    ...f,
    count: projects.filter((p) => f.match(p.category)).length,
  }));

  const handleFilter = (label: string) => {
    if (label === activeFilter) return;
    setFading(true);
    setTimeout(() => {
      setActiveFilter(label);
      const f = FILTERS.find((fi) => fi.label === label)!;
      setDisplayed(projects.filter((p) => f.match(p.category)));
      setFading(false);
    }, 260);
  };

  /* Scroll reveal on mount */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.wk-card'));
    cards.forEach((c, i) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(28px)';
      setTimeout(() => {
        c.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        c.style.opacity = '1';
        c.style.transform = 'none';
      }, 80 + i * 55);
    });
  }, []);

  return (
    <>
      <section
        style={{ padding: 'clamp(40px,6vw,80px) 0', background: '#111111' }}
      >
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 28px' }}>

          {/* ── Filter tabs ───────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 48,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.22)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginRight: 8,
                flexShrink: 0,
              }}
            >
              Filter:
            </span>
            {filterCounts.map(({ label, count }) => {
              const active = activeFilter === label;
              return (
                <FilterTab
                  key={label}
                  label={label}
                  count={count}
                  active={active}
                  onClick={() => handleFilter(label)}
                />
              );
            })}
          </div>

          {/* ── Count indicator ── */}
          <div
            style={{
              marginBottom: 28,
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '2rem',
                color: '#C8FF00',
                letterSpacing: '-0.03em',
                transition: 'opacity 0.3s',
                opacity: fading ? 0 : 1,
              }}
            >
              {displayed.length}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              {displayed.length === 1 ? 'project' : 'projects'}{activeFilter !== 'All' ? ` in ${activeFilter}` : ' total'}
            </span>
          </div>

          {/* ── Grid ─────────────────────────────────────── */}
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: 16,
              opacity: fading ? 0 : 1,
              transform: fading ? 'translateY(6px)' : 'none',
              transition: 'opacity 0.26s ease, transform 0.26s ease',
            }}
          >
            {displayed.map((p, i) => (
              <div key={p.id} className="wk-card">
                <ProjectCard
                  project={p}
                  accent={ACCENTS[i % ACCENTS.length]}
                  onPreview={(url, title) => setPreview({ url, title })}
                />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {displayed.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 0',
                color: 'rgba(255,255,255,0.2)',
                fontFamily: 'var(--font-body)',
              }}
            >
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Preview modal */}
      {preview && (
        <SitePreviewModal url={preview.url} title={preview.title} onClose={() => setPreview(null)} />
      )}
    </>
  );
}

function FilterTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.8rem',
        letterSpacing: '-0.01em',
        padding: '8px 16px',
        borderRadius: 8,
        border: active
          ? '1px solid rgba(200,255,0,0.5)'
          : `1px solid ${hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
        background: active
          ? 'rgba(200,255,0,0.1)'
          : hovered
          ? 'rgba(255,255,255,0.04)'
          : 'transparent',
        color: active ? '#C8FF00' : hovered ? '#ffffff' : 'rgba(255,255,255,0.45)',
        cursor: 'pointer',
        transition: 'all 0.22s',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          padding: '1px 6px',
          borderRadius: 10,
          background: active ? 'rgba(200,255,0,0.18)' : 'rgba(255,255,255,0.07)',
          color: active ? '#C8FF00' : 'rgba(255,255,255,0.3)',
          transition: 'all 0.22s',
        }}
      >
        {count}
      </span>
    </button>
  );
}
