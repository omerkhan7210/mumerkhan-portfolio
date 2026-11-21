'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

const SERVICE_LINKS = [
  { href: '/services/wordpress-development', label: 'WordPress development' },
  { href: '/services/mern-stack-development', label: 'Next.js & React apps' },
  { href: '/services/figma-to-web', label: 'Figma to WordPress' },
  { href: '/services/ecommerce-development', label: 'WooCommerce stores' },
  { href: '/services/n8n-automation', label: 'n8n automation' },
  { href: '/services/seo-performance', label: 'SEO & speed' },
  { href: '/redesign', label: 'Trade & local service sites' },
];

/* A plain bar: wordmark, five links, one action. Solid ground once scrolled, no blur, no shadow. */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{ background: scrolled || open ? 'var(--bg)' : 'transparent' }}
    >
      <div className="mx-auto flex h-16 md:h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="font-wide text-[15px] md:text-base text-bone" aria-label="Umer Khan, home">
          Umer Khan
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className="text-[15px] transition-colors hover:text-bone"
              style={{ color: isActive(l.href) ? 'var(--ink)' : 'var(--muted)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-lime !py-2.5 !px-4 text-[14px] md:text-[15px]">
            <span className="sm:hidden">Book a call</span>
            <span className="hidden sm:inline">Book a free call</span>
          </Link>
          <button
            type="button"
            className="lg:hidden grid h-11 w-11 place-items-center text-bone"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className="absolute left-0 top-0 h-[2px] w-6 bg-current transition-transform duration-300"
                style={{ transform: open ? 'translateY(5px) rotate(45deg)' : 'none' }}
              />
              <span
                className="absolute left-0 bottom-0 h-[2px] w-6 bg-current transition-transform duration-300"
                style={{ transform: open ? 'translateY(-5px) rotate(-45deg)' : 'none' }}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="lg:hidden fixed inset-x-0 top-16 bottom-0 overflow-y-auto px-5 pb-10 pt-6"
        style={{ background: 'var(--bg)' }}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {[{ href: '/', label: 'Home' }, ...LINKS, { href: '/contact', label: 'Contact' }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-wide py-2 text-[9vw] leading-[1.05]"
              style={{ color: isActive(l.href) && l.href !== '/' ? 'var(--accent)' : 'var(--ink)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mt-10 mb-3 text-[15px]" style={{ color: 'var(--muted)' }}>Services</p>
        <ul className="grid gap-1">
          {SERVICE_LINKS.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="block py-2 text-[17px] text-bone">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
