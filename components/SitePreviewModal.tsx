'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  url: string;
  title: string;
  onClose: () => void;
};

export default function SitePreviewModal({ url, title, onClose }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Slide-up entrance */
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Block scroll on body */
    document.body.style.overflow = 'hidden';

    /* Animate in */
    requestAnimationFrame(() => {
      if (overlayRef.current) overlayRef.current.style.opacity = '1';
      if (panelRef.current) panelRef.current.style.transform = 'translateY(0)';
    });

    /* If iframe doesn't fire load within 6s, assume it's blocked */
    timerRef.current = setTimeout(() => {
      if (!loaded) setBlocked(true);
    }, 6000);

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function close() {
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
    if (panelRef.current) panelRef.current.style.transform = 'translateY(100%)';
    setTimeout(onClose, 420);
  }

  function handleLoad() {
    if (timerRef.current) clearTimeout(timerRef.current);
    /* Try accessing the iframe's location to detect cross-origin block */
    try {
      // This throws SecurityError if iframe loaded cross-origin with blocked framing
      const _ = iframeRef.current?.contentWindow?.location.href;
      setLoaded(true);
    } catch {
      /* SecurityError = cross-origin but DID load (iframe framing allowed) */
      setLoaded(true);
    }
  }

  const domain = (() => {
    try { return new URL(url).hostname; } catch { return url; }
  })();

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        opacity: 0,
        transition: 'opacity 0.38s ease',
      }}
    >
      <div
        ref={panelRef}
        style={{
          width: '100%',
          height: '92vh',
          background: '#0D0D0D',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px 20px 0 0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transform: 'translateY(100%)',
          transition: 'transform 0.48s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            height: 54,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
            gap: 12,
          }}
        >
          {/* Traffic-light dots */}
          <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
            <button
              onClick={close}
              style={{ width: 13, height: 13, borderRadius: '50%', background: '#FF5F57', border: 'none', cursor: 'pointer' }}
            />
            <div style={{ width: 13, height: 13, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ width: 13, height: 13, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          </div>

          {/* URL bar */}
          <div
            style={{
              flex: 1,
              maxWidth: 520,
              height: 32,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              gap: 8,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {domain}
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: '#C8FF00',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '5px 12px',
                borderRadius: 6,
                border: '1px solid rgba(200,255,0,0.3)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Open in new tab
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <button
              onClick={close}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '1rem',
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* ── Iframe area ── */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Loading spinner */}
          {!loaded && !blocked && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                background: '#080808',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.07)',
                  borderTopColor: '#C8FF00',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
                Loading {domain}…
              </p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Blocked state */}
          {blocked && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                background: '#080808',
                zIndex: 2,
                textAlign: 'center',
                padding: '0 32px',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                }}
              >
                🔒
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: 6 }}>
                  Preview blocked
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', maxWidth: 340 }}>
                  {domain} has security settings that prevent embedding in an iframe. You can still visit it directly.
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  background: '#C8FF00',
                  padding: '10px 24px',
                  borderRadius: 100,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Open {title}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={url}
            title={`Preview of ${title}`}
            onLoad={handleLoad}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
}
