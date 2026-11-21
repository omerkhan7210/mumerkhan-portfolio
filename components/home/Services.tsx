'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const SERVICES = [
  {
    name: 'Custom websites',
    keys: 'W',
    href: '/services/wordpress-development',
    desc: 'Marketing sites in WordPress or Next.js, built around one job: turning visitors into enquiries. Fast, accessible, and easy for your team to edit.',
    terms: 'wordpress nextjs website design development custom',
  },
  {
    name: 'Figma to WordPress',
    keys: 'F',
    href: '/services/figma-to-web',
    desc: 'Your designer’s file, built pixel-for-pixel in Elementor or a custom theme, with every breakpoint and interaction intact.',
    terms: 'figma elementor design to code pixel perfect',
  },
  {
    name: 'Website redesigns',
    keys: 'R',
    href: '/redesign',
    desc: 'A rebuild of the site you have, keeping the rankings you earned: redirects, content mapping and a faster, clearer path to contact.',
    terms: 'redesign rebuild migrate refresh',
  },
  {
    name: 'WooCommerce stores',
    keys: 'E',
    href: '/services/ecommerce-development',
    desc: 'Product catalogues, bookings, deposits and Stripe payments, with checkout flows that hold up on a phone.',
    terms: 'ecommerce woocommerce shop store stripe booking',
  },
  {
    name: 'Next.js & React apps',
    keys: 'A',
    href: '/services/mern-stack-development',
    desc: 'Dashboards, portals and marketplaces on Next.js, Node and MongoDB, from login to admin panel.',
    terms: 'react nextjs node mern app saas dashboard',
  },
  {
    name: 'n8n automation',
    keys: 'N',
    href: '/services/n8n-automation',
    desc: 'Leads routed to your CRM, follow-ups sent, invoices raised and reports built, without anyone copying and pasting.',
    terms: 'n8n automation workflow zapier make crm ai',
  },
  {
    name: 'SEO & site speed',
    keys: 'S',
    href: '/services/seo-performance',
    desc: 'Technical SEO, schema, Core Web Vitals and local service pages, so the people already searching for you find you.',
    terms: 'seo speed core web vitals local schema rank',
  },
  {
    name: 'Trade & local service sites',
    keys: 'T',
    href: '/redesign',
    desc: 'For roofers, plumbers, HVAC and cleaning firms: quote paths, job galleries and city service pages that book work.',
    terms: 'roofing hvac plumbing contractor trade local cleaning',
  },
];

/* Giant command list: what I do, set as a search menu you can actually type into. */
export default function Services() {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? SERVICES.filter((s) => (s.name + ' ' + s.terms).toLowerCase().includes(t)) : SERVICES;
  }, [q]);
  const selIdx = Math.min(sel, Math.max(list.length - 1, 0));

  return (
    <section aria-labelledby="services-title" className="mx-auto max-w-[1440px] px-5 md:px-10 pt-28 md:pt-44" data-ui>
      <h2 id="services-title" className="sr-only">Web development services</h2>
      <label htmlFor="svc-search" className="sr-only">Search services</label>
      <input
        id="svc-search"
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setSel(0);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, list.length - 1)); }
          if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
          if (e.key === 'Enter' && list[selIdx]) window.location.href = list[selIdx].href;
        }}
        placeholder="What do you need built?"
        autoComplete="off"
        className="block w-full lg:w-[83%] px-5 text-bone placeholder:text-[#9AA099]"
        style={{ background: 'var(--surface)', height: '1.9em', fontSize: 'clamp(1.25rem, 3vw, 2.75rem)', border: 0 }}
      />

      <ul className="mt-6" role="listbox" aria-label="Services">
        {list.map((s, i) => {
          const on = i === selIdx;
          return (
            <li key={s.name} role="option" aria-selected={on} onMouseEnter={() => setSel(i)}>
              <button
                type="button"
                onClick={() => setSel(i)}
                onFocus={() => setSel(i)}
                className="w-full flex items-center justify-between gap-6 px-3 md:px-5 py-1.5 text-left transition-colors duration-200"
                style={{ background: on ? 'var(--accent)' : 'transparent', color: on ? 'var(--accent-ink)' : 'var(--ink)' }}
              >
                <span style={{ fontSize: 'clamp(1.9rem, 4.6vw, 4.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 500 }}>
                  {s.name}
                </span>
                <kbd
                  className="hidden md:grid place-items-center flex-none font-[inherit] text-[17px]"
                  style={{ width: '2.2em', height: '2.2em', background: on ? 'rgba(22,28,26,0.12)' : 'var(--surface)' }}
                  aria-hidden="true"
                >
                  {s.keys}
                </kbd>
              </button>
              <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: on ? '1fr' : '0fr', transitionTimingFunction: 'var(--ease-out)' }}>
                <div className="overflow-hidden">
                  <div className="px-3 md:px-5 pt-3 pb-6 flex flex-wrap items-end justify-between gap-4" style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}>
                    <p className="text-[17px] max-w-[60ch] leading-relaxed">{s.desc}</p>
                    <Link href={s.href} tabIndex={on ? 0 : -1} className="text-[16px] font-semibold underline underline-offset-4">
                      {s.name} details
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        {list.length === 0 && (
          <li className="px-5 py-6 text-[18px]" style={{ color: 'var(--muted)' }}>
            Nothing matches that yet. <Link href="/contact" className="text-bone underline underline-offset-4">Tell me what you need</Link> and I’ll say honestly whether I’m the right fit.
          </li>
        )}
      </ul>
    </section>
  );
}
