'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SERVICES = [
  {
    title: 'Quote & enquiry path',
    desc: 'Mobile-first path to call or request a quote - sticky CTAs, shorter forms, photo upload, urgent vs non-urgent. Built so visitors become booked jobs.',
    tags: ['Conversion', 'Mobile UX', 'WordPress'],
    href: '/services/wordpress-development',
  },
  {
    title: 'After-hours lead capture',
    desc: 'Simple chat or lead flows for nights and weekends - name, area, phone, urgency - so enquiries do not die when the phone is not answered.',
    tags: ['Lead capture', 'Automation', 'UX'],
    href: '/services/n8n-automation',
  },
  {
    title: 'Trade & local service websites',
    desc: 'WordPress rebuilds for roofing, plumbing, HVAC, cleaning, and local trades - services, areas, galleries, trust, and enquiry-ready pages.',
    tags: ['WordPress', 'Elementor', 'Local business'],
    href: '/services/wordpress-development',
  },
  {
    title: 'Project galleries & proof',
    desc: 'Real job photos organized by service type - so homeowners and commercial clients see finished work, not placeholders.',
    tags: ['Portfolio', 'Trust', 'WordPress'],
    href: '/services/wordpress-development',
  },
  {
    title: 'Local SEO service pages',
    desc: 'City × service landing pages with unique meta and natural copy - the structure behind multi-location trade visibility.',
    tags: ['Local SEO', 'Rank Math', 'Elementor'],
    href: '/services/seo-performance',
  },
  {
    title: 'Booking & payment automation',
    desc: 'WooCommerce deposits, hire rules, branded reminder emails, and staff-safe payment workflows when bookings get complex.',
    tags: ['WooCommerce', 'WP-Cron', 'Stripe'],
    href: '/services/ecommerce-development',
  },
  {
    title: 'Figma → WordPress',
    desc: 'Pixel-perfect builds from design files - every breakpoint, every interaction - without losing conversion structure.',
    tags: ['Figma', 'WordPress', 'CSS'],
    href: '/services/figma-to-web',
  },
  {
    title: 'Ongoing support',
    desc: 'Updates, fixes, speed, and small feature work after launch - so the site keeps earning enquiries, not collecting dust.',
    tags: ['Maintenance', 'Performance', 'Support'],
    href: '/services/website-maintenance',
  },
];

/* Large-type index: one row open at a time, hover or focus opens it, tap toggles on touch. */
export default function ServicesSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('sr-visible');
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-36 bg-ink">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div ref={headRef} className="sr mb-14 md:mb-20 max-w-[980px]">
          <h2
            className="font-sans font-bold text-white"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5.2rem)', lineHeight: 0.98, letterSpacing: '-0.04em' }}
          >
            Everything a trade site needs to <span className="text-lime">book jobs.</span>
          </h2>
        </div>

        <ul className="border-t border-white/[0.08]">
          {SERVICES.map((svc, i) => {
            const isOpen = open === i;
            return (
              <li
                key={svc.title}
                className="border-b border-white/[0.08]"
                onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setOpen(i)}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`svc-panel-${i}`}
                  onClick={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  className="w-full grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[5rem_1fr_auto] items-baseline gap-2 py-5 md:py-7 text-left group"
                >
                  <span className="font-body text-sm tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className="font-sans font-semibold transition-all duration-500"
                    style={{
                      fontSize: 'clamp(1.5rem, 3.6vw, 3.2rem)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05,
                      color: isOpen ? 'var(--color-lime)' : 'rgba(255,255,255,0.72)',
                      transform: isOpen ? 'translateX(12px)' : 'none',
                      transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    {svc.title}
                  </span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isOpen ? '#9FC7B8' : 'rgba(255,255,255,0.3)'}
                    strokeWidth="2"
                    className="transition-transform duration-500"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>

                <div
                  id={`svc-panel-${i}`}
                  role="region"
                  className="grid transition-[grid-template-rows] duration-500"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="grid md:grid-cols-[5rem_1fr_auto] gap-x-2 pb-8 md:pb-10">
                      <span />
                      <div className="md:pl-3 max-w-[64ch]">
                        <p className="font-body text-white/65 leading-relaxed" style={{ fontSize: 'clamp(1rem,1.3vw,1.15rem)' }}>
                          {svc.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-5">
                          {svc.tags.map((t) => (
                            <span
                              key={t}
                              className="font-body text-xs px-3 py-1 rounded-full text-white/60 border border-white/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        href={svc.href}
                        tabIndex={isOpen ? 0 : -1}
                        className="mt-6 md:mt-0 self-end justify-self-start md:justify-self-end inline-flex items-center gap-2 font-sans font-semibold text-sm text-lime hover:gap-3 transition-all"
                      >
                        Learn more
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
