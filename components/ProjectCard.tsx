'use client';

import { useRef } from 'react';

interface ProjectCardProps {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
  large?: boolean;
}

const accents = [
  { color: '#00C896', bg: 'rgba(0,200,150,0.08)', border: 'rgba(0,200,150,0.14)' },
  { color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.14)' },
  { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.14)' },
  { color: '#F43F5E', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.14)' },
  { color: '#14B8A6', bg: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.14)' },
  { color: '#F97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.14)' },
  { color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.14)' },
  { color: '#A78BFA', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.14)' },
  { color: '#C8FF00', bg: 'rgba(200,255,0,0.08)', border: 'rgba(200,255,0,0.14)' },
];

export default function ProjectCard({
  id,
  title,
  category,
  description,
  technologies,
  link,
  large = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accent = accents[(id - 1) % accents.length];

  /* 3D tilt on mouse move */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -7;
    const rotY = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.01)`;
    card.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${accent.color}15`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
    card.style.boxShadow = '';
  };

  return (
    <div
      ref={cardRef}
      data-cursor-label="View"
      className="group relative rounded-2xl overflow-hidden flex flex-col tilt-card h-full"
      style={{
        background: '#111111',
        border: `1px solid ${accent.border}`,
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient image area */}
      <div
        className={`relative ${large ? 'h-52' : 'h-44'} flex items-end p-5 flex-shrink-0`}
        style={{
          background: `
            radial-gradient(ellipse at 25% 35%, ${accent.color}1A 0%, transparent 60%),
            radial-gradient(ellipse at 75% 70%, ${accent.color}0D 0%, transparent 55%),
            #1A1A1A
          `,
        }}
      >
        {/* Number */}
        <span
          className="absolute top-4 right-4 font-sans font-bold text-xs tabular-nums"
          style={{ color: `${accent.color}50` }}
        >
          {String(id).padStart(2, '0')}
        </span>

        {/* Hover shimmer overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${accent.color}08 0%, transparent 60%)`,
          }}
        />

        {/* Category badge */}
        <span
          className="relative z-10 inline-block font-sans font-semibold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider"
          style={{ background: accent.bg, color: accent.color, border: `1px solid ${accent.border}` }}
        >
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-sans font-bold text-white text-lg mb-2 group-hover:text-lime transition-colors leading-tight">
          {title}
        </h3>
        <p className="font-body text-muted text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="font-body text-xs px-2.5 py-1 rounded-md text-muted"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span
              className="font-body text-xs px-2.5 py-1 rounded-md text-muted"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              +{technologies.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {link !== '#' ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-semibold text-sm transition-colors hover:underline"
              style={{ color: accent.color }}
            >
              View Project ↗
            </a>
          ) : (
            <span className="font-body text-xs text-muted italic">Private Project</span>
          )}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-12"
            style={{ background: accent.bg }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent.color} strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
