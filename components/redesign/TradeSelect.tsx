'use client';

import { useEffect, useRef, useState } from 'react';
import { TRADE_OPTIONS } from './tradeCopy';

/* Custom-styled replacement for a native <select>. The native element's
   dropdown list is rendered by the OS/browser outside the page's own
   styling, so on a dark theme it shows up as an unreadable white-on-white
   list (and fights with the site's hidden-native-cursor setup). This
   matches the option-grid pattern already used in ContactClient instead. */
export default function TradeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const selected = TRADE_OPTIONS.find((t) => t.value === value);

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          color: selected ? '#ffffff' : 'rgba(255,255,255,0.4)',
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${open ? 'rgba(200,255,0,0.4)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 10,
          padding: '13px 16px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          transition: 'border-color 0.25s',
        }}
      >
        {selected ? selected.label : 'Choose your trade...'}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            color: open ? '#C8FF00' : 'rgba(255,255,255,0.35)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.25s ease, color 0.25s',
            flexShrink: 0,
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          right: 0,
          background: 'rgba(14,14,14,0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: 6,
          zIndex: 30,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: `translateY(${open ? 0 : -6}px)`,
          transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          maxHeight: 260,
          overflowY: 'auto',
        }}
      >
        {TRADE_OPTIONS.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                textAlign: 'left',
                color: isSelected ? '#C8FF00' : 'rgba(255,255,255,0.7)',
                background: isSelected ? 'rgba(200,255,0,0.08)' : 'transparent',
                border: 'none',
                borderRadius: 8,
                padding: '10px 12px',
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              {opt.label}
              {isSelected && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
