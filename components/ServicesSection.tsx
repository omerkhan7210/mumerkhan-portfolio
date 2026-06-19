'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SERVICES = [
  {
    n: '01',
    title: 'Full Stack Web Development',
    desc: 'React, Node.js, MongoDB, Express — end to end. Scalable architecture built for real-world production loads.',
    tags: ['React', 'Node.js', 'MongoDB'],
    href: '/services/mern-stack-development',
  },
  {
    n: '02',
    title: 'Custom WordPress Solutions',
    desc: 'Bespoke theme development from Figma, Elementor Pro builds, WooCommerce stores, and advanced plugin customization.',
    tags: ['Elementor', 'WooCommerce', 'PHP'],
    href: '/services/wordpress-development',
  },
  {
    n: '03',
    title: 'Business Process Automation',
    desc: 'Automating manual work with n8n workflows — CRM syncs, lead pipelines, email sequences, and data processing at scale.',
    tags: ['n8n', 'Zapier', 'REST APIs'],
    href: '/services/n8n-automation',
  },
  {
    n: '04',
    title: 'Figma → Pixel-Perfect Code',
    desc: 'Exact translation of any design to responsive HTML, WordPress, or React. Every shadow, every spacing, every breakpoint.',
    tags: ['Figma', 'HTML/CSS', 'React'],
    href: '/services/figma-to-web',
  },
  {
    n: '05',
    title: 'E-Commerce Development',
    desc: 'Full online stores — product catalogs, cart flows, Stripe / PayPal gateways, and inventory management integrations.',
    tags: ['WooCommerce', 'Stripe', 'UX'],
    href: '/services/ecommerce-development',
  },
  {
    n: '06',
    title: 'UI/UX Design',
    desc: 'Figma wireframes and high-fidelity designs for web apps and marketing sites. Built with development handoff in mind.',
    tags: ['Figma', 'Design Systems', 'Prototyping'],
    href: '/services/ui-ux-design',
  },
  {
    n: '07',
    title: 'SEO & Performance Optimization',
    desc: 'Core Web Vitals tuning, schema markup, image optimization, and technical SEO audits for real search ranking results.',
    tags: ['Core Web Vitals', 'Schema', 'PageSpeed'],
    href: '/services/seo-performance',
  },
  {
    n: '08',
    title: 'Ongoing Maintenance & Support',
    desc: 'Proactive security updates, performance monitoring, backups, and feature additions. I keep your site healthy 24/7.',
    tags: ['Security', 'Backups', 'Performance'],
    href: '/services/website-maintenance',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

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

  /* Stagger rows */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rows = Array.from(section.querySelectorAll<HTMLElement>('.svc-cell'));
    rows.forEach((row) => {
      row.style.opacity = '0';
      row.style.transform = 'translateY(24px)';
      row.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = rows.indexOf(entry.target as HTMLElement);
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.transform = 'none';
            }, i * 55);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    rows.forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-ink border-t border-white/[0.04]">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div ref={headRef} className="sr flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <span className="label-tag">What I Do</span>
            <h2
              className="font-sans font-bold text-white mt-3"
              style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', lineHeight: 1, letterSpacing: '-0.03em' }}
            >
              Services &amp;<br />Capabilities
            </h2>
          </div>
          <p className="font-body text-muted max-w-xs leading-relaxed text-sm">
            From design to deployment — everything your project needs, handled by one developer who gives a damn.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ border: '1px solid rgba(255,255,255,0.05)' }}
        >
          {SERVICES.map((svc, i) => {
            const isActive = active === i;
            return (
              <Link
                key={i}
                href={svc.href}
                className="svc-cell group relative overflow-hidden"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.05)' : undefined,
                  padding: '28px 32px 26px',
                  cursor: 'pointer',
                  background: isActive ? '#0e0e0e' : 'transparent',
                  transition: 'background 0.35s ease',
                }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Left border flash */}
                <div
                  className="absolute inset-y-0 left-0 w-0.5 pointer-events-none"
                  style={{
                    background: '#C8FF00',
                    transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                    transformOrigin: 'bottom',
                    transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />

                {/* Watermark number */}
                <span
                  className="absolute right-3 bottom-0 font-sans font-bold pointer-events-none select-none"
                  style={{
                    fontSize: '8rem',
                    lineHeight: 0.85,
                    color: isActive ? 'rgba(200,255,0,0.05)' : 'rgba(255,255,255,0.025)',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {svc.n}
                </span>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span
                      className="font-body text-xs tabular-nums"
                      style={{
                        color: isActive ? 'rgba(200,255,0,0.6)' : 'rgba(255,255,255,0.2)',
                        transition: 'color 0.3s',
                      }}
                    >
                      {svc.n}
                    </span>
                    <svg
                      width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke={isActive ? '#C8FF00' : 'rgba(255,255,255,0.15)'}
                      strokeWidth="2"
                      style={{
                        transform: isActive ? 'translate(2px,-2px)' : 'none',
                        transition: 'stroke 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                        flexShrink: 0,
                      }}
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>

                  <h3
                    className="font-sans font-semibold mb-2.5"
                    style={{
                      fontSize: '1.05rem',
                      color: isActive ? 'var(--color-lime)' : 'var(--color-fg)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {svc.title}
                  </h3>

                  <p
                    className="font-body text-sm leading-relaxed mb-4"
                    style={{
                      color: isActive ? `rgba(var(--fg-rgb),0.5)` : 'var(--color-muted)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {svc.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs px-2 py-0.5 rounded-sm"
                        style={{
                          background: isActive ? 'rgba(200,255,0,0.07)' : `rgba(var(--fg-rgb),0.04)`,
                          color: isActive ? 'var(--color-lime)' : 'var(--color-muted)',
                          border: isActive ? '1px solid rgba(200,255,0,0.14)' : `1px solid rgba(var(--fg-rgb),0.05)`,
                          transition: 'background 0.3s, color 0.3s, border-color 0.3s',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: isActive ? '100%' : '0%',
                        background: 'linear-gradient(90deg, rgba(200,255,0,0.7), rgba(200,255,0,0.15))',
                        transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1)',
                      }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
