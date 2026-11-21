import Link from 'next/link';

const COLS = [
  {
    title: 'Services',
    links: [
      { href: '/services/wordpress-development', label: 'WordPress development' },
      { href: '/services/mern-stack-development', label: 'Next.js & React apps' },
      { href: '/services/figma-to-web', label: 'Figma to WordPress' },
      { href: '/services/ecommerce-development', label: 'WooCommerce stores' },
      { href: '/services/n8n-automation', label: 'n8n automation' },
      { href: '/services/seo-performance', label: 'SEO & site speed' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { href: '/work', label: 'Case studies' },
      { href: '/redesign', label: 'Trade & local service sites' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/tools/website-cost-calculator', label: 'Website cost calculator' },
      { href: '/blog', label: 'Blog' },
      { href: '/about', label: 'About' },
    ],
  },
];

/* The footer is the page's last photograph, with the name across its bottom edge. */
export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden" style={{ minHeight: '100svh' }}>
      <img
        src="/assets/site/arch-942.webp"
        alt=""
        width={2000}
        height={1250}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ filter: 'brightness(0.34) contrast(1.05) grayscale(1)' }}
      />
      <div className="mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-between px-5 md:px-10 pt-24 pb-8">
        <div className="grid gap-12 md:grid-cols-12">
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title} className="md:col-span-3">
              <p className="mb-4 text-[15px]" style={{ color: 'var(--muted)' }}>{c.title}</p>
              <ul className="grid gap-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[16px] text-bone hover:text-jade transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="md:col-span-4 md:col-start-9">
            <p className="mb-4 text-[15px]" style={{ color: 'var(--muted)' }}>Start a project</p>
            <p className="text-[17px] leading-relaxed text-bone max-w-[34ch]">
              Replies within four hours on weekdays. Working with clients in the US, UK, EU and Australia from Karachi.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-lime">Book a free call</Link>
              <a
                href="https://www.upwork.com/freelancers/muhammadumerk5"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Hire on Upwork
              </a>
            </div>
          </div>
        </div>

        <div>
          <p
            aria-hidden="true"
            className="font-wide whitespace-nowrap text-bone"
            style={{ fontSize: 'clamp(2.5rem, 10.6vw, 12rem)', lineHeight: 0.85 }}
          >
            Umer Khan
          </p>
          <div className="mt-6 flex flex-wrap justify-between gap-3 text-[13px]" style={{ color: 'var(--muted)' }}>
            <p>© {new Date().getFullYear()} Muhammad Umer Khan. Freelance web developer.</p>
            <p>Photograph: Carl Nenzen Loven, Unsplash.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
