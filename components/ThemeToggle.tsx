'use client';

import { useTheme } from '@/contexts/ThemeContext';

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      style={{
        position: 'relative',
        width: 38,
        height: 38,
        borderRadius: 10,
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'border-color 0.35s, background 0.35s',
        perspective: '100px',
      }}
    >
      {/* 3D flip inner */}
      <div
        style={{
          width: 20,
          height: 20,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: isDark ? 'rotateY(0deg)' : 'rotateY(180deg)',
          transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Front: Moon (dark mode) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <MoonIcon />
        </div>
        {/* Back: Sun (light mode) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            color: '#0A0A0A',
          }}
        >
          <SunIcon />
        </div>
      </div>

      {/* Lime glow pulse on hover */}
      <span
        className="theme-toggle-glow"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 10,
          background: 'radial-gradient(circle, rgba(200,255,0,0.18) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}
      />

      <style>{`
        button:hover .theme-toggle-glow { opacity: 1; }
      `}</style>
    </button>
  );
}
