'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* Scramble effect on heading word */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

function useScramble(target: string, trigger: boolean) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = 18;
    const id = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDisplay(target);
        clearInterval(id);
        return;
      }
      const progress = frame / totalFrames;
      setDisplay(
        target
          .split('')
          .map((char, i) =>
            i < Math.floor(target.length * progress)
              ? char
              : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(''),
      );
    }, 50);
    return () => clearInterval(id);
  }, [trigger, target]);

  return display;
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const scramble = useScramble('building.', revealed);

  useEffect(() => {
    const el = sectionRef.current;
    const head = headRef.current;
    if (!el || !head) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sr-visible');
          setTimeout(() => setRevealed(true), 400);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Magnetic button effect */
  const btnRef = useRef<HTMLAnchorElement>(null);
  const handleMagMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleMagLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = '';
  };

  return (
    <section
      ref={sectionRef}
      className="sr py-24 md:py-32 bg-ink border-t border-white/[0.05]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <span className="label-tag">Start a Project</span>
        <div ref={headRef}>
          <h2
            className="font-sans font-bold text-white mb-12"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              lineHeight: 0.93,
              letterSpacing: '-0.03em',
            }}
          >
            Tell me what<br />
            you&apos;re{' '}
            <em className="not-italic text-lime">{scramble}</em>
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            ref={btnRef}
            href="/contact"
            className="btn-lime text-base"
            style={{ padding: '16px 36px', transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s' }}
            onMouseMove={handleMagMove}
            onMouseLeave={handleMagLeave}
          >
            Let&apos;s Talk
          </Link>
          <a
            href="mailto:omerfarooqkhan7210@gmail.com"
            className="btn-outline text-base"
            style={{ padding: '16px 36px' }}
          >
            Send an Email
          </a>
        </div>

        <p className="font-body text-muted text-sm">
          Usually reply within 4 hours · Karachi, PKT (UTC+5)
        </p>
      </div>
    </section>
  );
}
