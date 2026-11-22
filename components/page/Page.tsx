import Link from 'next/link';
import type { ReactNode } from 'react';
import Reveal from '@/components/home/Reveal';

const SITE = 'https://mumerkhan.com';

export type Crumb = { href: string; label: string };

/* Inner-page hero: breadcrumbs, a wide two-line headline, one lead sentence, actions.
   Emits BreadcrumbList schema so Google can show the trail in results. */
export function PageHero({
  title,
  lead,
  crumbs,
  children,
  aside,
  image,
}: {
  title: [string, string?];
  lead?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
  /* A large picture on the right: the lit exhibit of the first screen. `cutout` sets a
     transparent portrait on a surface panel instead of cropping a photo to fill. */
  image?: { src: string; w: number; h: number; alt: string; cutout?: boolean };
}) {
  const trail = crumbs ? [{ href: '/', label: 'Home' }, ...crumbs] : null;
  const narrow = aside || image;
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-10 pt-28 md:pt-40 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10 items-end">
      {image && (
        <figure
          className={`lg:order-2 lg:col-span-6 lg:col-start-7 fade-up-late relative overflow-hidden flex items-end justify-center ${image.cutout ? 'aspect-[4/5] lg:aspect-auto lg:h-[76svh]' : 'aspect-[16/10] lg:aspect-auto lg:h-[76svh]'}`}
          style={{ background: 'var(--surface)' }}
        >
          <img
            src={image.src}
            alt={image.alt}
            width={image.w}
            height={image.h}
            fetchPriority="high"
            className={image.cutout ? 'h-[94%] w-auto object-contain object-bottom' : 'absolute inset-0 h-full w-full object-contain p-4'}
            style={image.cutout ? undefined : { filter: 'brightness(0.92)' }}
          />
        </figure>
      )}
      <div className={`lg:order-1 ${image ? 'lg:col-span-6 lg:row-start-1' : aside ? 'lg:col-span-7' : 'lg:col-span-10'}`}>
        {trail && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap gap-x-2 text-[14px]" style={{ color: 'var(--muted)' }}>
              {trail.map((c, i) => (
                <li key={c.href} className="flex gap-2">
                  {i < trail.length - 1 ? (
                    <>
                      <Link href={c.href} className="hover:text-bone transition-colors">{c.label}</Link>
                      <span aria-hidden="true">/</span>
                    </>
                  ) : (
                    <span aria-current="page" className="text-bone">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BreadcrumbList',
                  itemListElement: trail.map((c, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: c.label,
                    item: `${SITE}${c.href === '/' ? '' : c.href}`,
                  })),
                }),
              }}
            />
          </nav>
        )}
        <h1 className={`font-wide text-bone whitespace-nowrap text-[clamp(1.4rem,6.2vw,3rem)] ${narrow ? 'lg:text-[clamp(2rem,3.7vw,4.4rem)]' : 'lg:text-[clamp(2.2rem,5vw,5.6rem)]'}`}>
          <span className="mask-line"><span>{title[0]}</span></span>
          {title[1] && <span className="mask-line"><span>{title[1]}</span></span>}
        </h1>
        {lead && (
          <p className="fade-up-late mt-6 max-w-[52ch] text-bone" style={{ fontSize: 'var(--step-lead)', lineHeight: 1.4 }}>
            {lead}
          </p>
        )}
        {children && <div className="fade-up-late mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">{children}</div>}
        {aside && image && <div className="fade-up-late mt-12 max-w-[560px]">{aside}</div>}
      </div>
      {aside && !image && <div className="lg:col-span-4 lg:col-start-9 fade-up-late">{aside}</div>}
    </section>
  );
}

/* Facts set as figure + line, used beside heroes and in proof bands. */
export function Facts({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
      {items.map((f) => (
        <div key={f.k + f.v}>
          <dt className="text-bone tabular-nums" style={{ fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)', fontWeight: 600, lineHeight: 1.1 }}>{f.k}</dt>
          <dd className="mt-1 text-[15px] max-w-[26ch]" style={{ color: 'var(--muted)' }}>{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* A section with its heading in the left rail and content to the right. */
export function Split({
  id,
  title,
  intro,
  children,
  tone,
}: {
  id?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  tone?: 'surface' | 'deep';
}) {
  const bg = tone === 'surface' ? 'var(--surface)' : tone === 'deep' ? '#121715' : undefined;
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} style={bg ? { background: bg } : undefined} className={bg ? 'py-20 md:py-28' : 'pt-24 md:pt-36'}>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-8">
        <Reveal className="lg:col-span-4">
          <h2 id={id ? `${id}-title` : undefined} className="text-bone" style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)', lineHeight: 1.1, fontWeight: 500 }}>
            {title}
          </h2>
          {intro && <p className="mt-4 text-[16px] max-w-[34ch]" style={{ color: 'var(--muted)' }}>{intro}</p>}
        </Reveal>
        <div className="lg:col-span-8 min-w-0">{children}</div>
      </div>
    </section>
  );
}

/* A plain list of items: bold name, one line under it. No cards, no icons. */
export function ItemList({ items, cols = 2 }: { items: { title: string; desc?: string; href?: string }[]; cols?: 1 | 2 }) {
  return (
    <ul className={`grid grid-cols-1 ${cols === 2 ? 'md:grid-cols-2' : ''} gap-x-12 gap-y-8`}>
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} data-delay={String(i % 4)}>
          {it.href ? (
            <Link href={it.href} className="group block">
              <p className="text-[19px] text-bone font-medium group-hover:text-jade transition-colors">{it.title} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
              {it.desc && <p className="mt-1.5 text-[16px] leading-[1.55]" style={{ color: '#C4C7BF' }}>{it.desc}</p>}
            </Link>
          ) : (
            <>
              <p className="text-[19px] text-bone font-medium">{it.title}</p>
              {it.desc && <p className="mt-1.5 text-[16px] leading-[1.55]" style={{ color: '#C4C7BF' }}>{it.desc}</p>}
            </>
          )}
        </Reveal>
      ))}
    </ul>
  );
}

/* Accordion FAQ with optional FAQPage schema. */
export function FaqList({ faqs, schema = true }: { faqs: { q: string; a: string }[]; schema?: boolean }) {
  return (
    <div className="grid gap-7">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[20px] leading-snug text-bone [&::-webkit-details-marker]:hidden min-h-[44px]">
            <span>{f.q}</span>
            <span aria-hidden="true" className="mt-3 flex-none transition-transform duration-300 group-open:rotate-180">
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l6 6 6-6" /></svg>
            </span>
          </summary>
          <p className="mt-3 text-[17px] leading-[1.6] max-w-[62ch]" style={{ color: '#C4C7BF' }}>{f.a}</p>
        </details>
      ))}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            }),
          }}
        />
      )}
    </div>
  );
}

/* The page ends on a plain sentence and one action. */
export function PageClosing({
  sentence = 'Tell me what your website should be doing for you, and I’ll reply today with an honest plan and a fixed price.',
  action = { href: '/contact', label: 'Book a free call' },
}: {
  sentence?: string;
  action?: { href: string; label: string };
}) {
  return (
    <section aria-label="Start a project" className="mx-auto max-w-[1440px] px-5 md:px-10 pt-[22svh] pb-[16svh]">
      <Reveal>
        <p className="text-bone max-w-[34ch]" style={{ fontSize: 'clamp(1.25rem, 1.6vw, 1.375rem)', lineHeight: 1.45 }}>{sentence}</p>
        <div className="mt-6 flex flex-wrap items-baseline gap-6">
          <Link href={action.href} className="btn-lime !py-3 !px-[18px] text-[15px]">{action.label}</Link>
          <a href="mailto:umer@mumerkhan.com?subject=New%20website%20project" className="text-[15px] text-bone underline underline-offset-4 hover:text-jade">
            or email me
          </a>
        </div>
      </Reveal>
    </section>
  );
}
