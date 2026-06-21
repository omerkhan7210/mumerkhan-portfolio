'use client';

import { useEffect, useRef, useState } from 'react';

function useCounter(target: number, triggered: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    if (!triggered || ran.current) return;
    ran.current = true;
    const timer = setTimeout(() => {
      const begin = performance.now();
      const dur = 1600;
      const tick = (now: number) => {
        const p = Math.min((now - begin) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(e * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [triggered, target, delay]);
  return val;
}

function MetricCard({
  number,
  suffix = '',
  prefix = '',
  label,
  sub,
  accent,
  size = 'normal',
  triggered,
  delay = 0,
}: {
  number: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  accent: string;
  size?: 'normal' | 'large';
  triggered: boolean;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const count = useCounter(number, triggered, delay);

  return (
    <div
      className="relative overflow-hidden rounded-2xl flex flex-col justify-between h-full"
      style={{
        padding: size === 'large' ? '40px 36px' : '28px 28px',
        background: hovered ? '#131313' : '#0f0f0f',
        border: `1px solid ${hovered ? accent + '35' : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.3s, background 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 20px 60px ${accent}12` : 'none',
        cursor: 'default',
        minHeight: size === 'large' ? 280 : 160,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial accent glow */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${accent}14 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0.45,
          transition: 'opacity 0.4s',
        }}
      />

      {/* Label */}
      <span
        className="font-body text-xs uppercase tracking-widest relative z-10"
        style={{ color: hovered ? accent : 'rgba(255,255,255,0.28)', transition: 'color 0.3s' }}
      >
        {label}
      </span>

      {/* Big number */}
      <div className="relative z-10 mt-auto">
        <div
          className="font-sans font-bold leading-none"
          style={{
            fontSize: size === 'large' ? 'clamp(4.5rem,9vw,7.5rem)' : 'clamp(2.8rem,5vw,4.5rem)',
            letterSpacing: '-0.04em',
            color: hovered ? accent : '#ffffff',
            transition: 'color 0.3s',
          }}
        >
          {prefix}{count}
          <span style={{ color: accent, fontSize: '0.55em', marginLeft: 2 }}>{suffix}</span>
        </div>
        <p className="font-body text-sm mt-2" style={{ color: 'rgba(255,255,255,0.32)' }}>
          {sub}
        </p>
      </div>

      {/* Bottom sweep line */}
      <div
        className="absolute bottom-0 left-0 h-0.5"
        style={{
          width: hovered ? '100%' : '0%',
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          transition: 'width 0.55s cubic-bezier(0.16,1,0.3,1)',
          borderRadius: 1,
        }}
      />
    </div>
  );
}

export default function DeliveredSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); obs.unobserve(el); } },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-ink"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Heading */}
        <div ref={headRef} className="sr mb-16">
          <span className="label-tag">By The Numbers</span>
          <h2
            className="font-sans font-bold text-white mt-2"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 0.9, letterSpacing: '-0.04em' }}
          >
            WHAT I&apos;VE
            <br />
            <span className="text-lime">DELIVERED.</span>
          </h2>
        </div>

        {/* ── Row 1: Featured + 2 stack ────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">

          {/* Large featured card */}
          <div className="md:col-span-5 md:row-span-2">
            <MetricCard
              number={100}
              suffix="%"
              label="Upwork Verified"
              sub="Job Success Score — maintained across every contract"
              accent="#C8FF00"
              size="large"
              triggered={triggered}
              delay={0}
            />
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <MetricCard
              number={80}
              suffix="+"
              label="Career Total"
              sub="Projects delivered since 2020"
              accent="#60A5FA"
              triggered={triggered}
              delay={100}
            />
            <MetricCard
              number={6}
              suffix="+"
              label="Experience"
              sub="Years building for real clients"
              accent="#F472B6"
              triggered={triggered}
              delay={200}
            />

            {/* Rating panel — full width of the 7-col right side */}
            <div
              className="col-span-2 rounded-2xl flex items-center justify-between gap-4 px-7 py-5"
              style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C8FF00">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="font-sans font-bold" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-0.03em', lineHeight: 1, color: '#ffffff' }}>
                  5.0<span className="text-lime text-xl ml-1">/ 5.0</span>
                </p>
                <p className="font-body text-xs text-muted mt-1.5">
                  Average Upwork rating · 8 verified client reviews
                </p>
              </div>
              <div className="hidden md:flex flex-col gap-1.5 flex-shrink-0">
                {['Detail Oriented', 'Clear Communicator', 'Committed to Quality', 'Solution Oriented'].map((s) => (
                  <span
                    key={s}
                    className="font-body text-xs px-3 py-1 rounded-full text-right"
                    style={{ background: 'rgba(200,255,0,0.06)', color: 'rgba(200,255,0,0.6)', border: '1px solid rgba(200,255,0,0.1)' }}
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: 3 equal stat cards ────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            number={10}
            suffix="+"
            label="Global Reach"
            sub="Countries I've worked with"
            accent="#34D399"
            triggered={triggered}
            delay={300}
          />
          <MetricCard
            number={100}
            suffix="%"
            label="Reliability"
            sub="On-time delivery, every project"
            accent="#FB923C"
            triggered={triggered}
            delay={400}
          />
          <MetricCard
            number={50}
            suffix="+"
            label="Clients Served"
            sub="Happy clients across Upwork & direct"
            accent="#A78BFA"
            triggered={triggered}
            delay={500}
          />
        </div>

        {/* Pull quote */}
        <p
          className="font-sans font-bold mt-14 leading-tight"
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
            letterSpacing: '-0.02em',
            color: `rgba(var(--fg-rgb),0.08)`,
            maxWidth: '75%',
          }}
        >
          &ldquo;Every number above is a solved problem,
          a delivered promise, and a client who would hire again.&rdquo;
        </p>

      </div>
    </section>
  );
}
