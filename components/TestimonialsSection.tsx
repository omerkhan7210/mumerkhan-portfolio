'use client';

import { useEffect, useRef } from 'react';

/* Real Upwork reviews (5.0 / 5.0). Quotes are verbatim excerpts, trimmed to fit a glance. */
const FEATURED = {
  quote: 'The Figma to WordPress implementation was pixel-perfect. The site loads fast, looks polished, and is easy for our team to update.',
  name: 'Dr. Marcus H.',
  role: 'Company Director',
  where: 'Germany',
  job: 'Medical Equipment Company Website',
};

const WALL = [
  { quote: 'Fast turnaround, zero back-and-forth on revisions. Just clean work delivered exactly as described.', name: 'Tyler W.', role: 'CEO', where: 'United States' },
  { quote: 'The site looks exactly like the design, loads fast, and is easy to manage.', name: 'Sophie R.', role: 'Business Owner', where: 'Netherlands' },
  { quote: 'He was responsive, knowledgeable, and handled all requested changes quickly and efficiently.', name: 'Andrew T.', role: 'Marketing Manager', where: 'Australia' },
  { quote: 'Delivered the Figma-to-Elementor transfer exactly as specified, on time, with zero issues after handoff.', name: 'Lena P.', role: 'Digital Agency Owner', where: 'Netherlands' },
  { quote: 'Great communication, strong understanding of the task, and high-quality delivery.', name: 'Yannick D.', role: 'Project Manager', where: 'Belgium' },
  { quote: 'He demonstrated strong technical skills, attention to detail, and a clear understanding of the requirements.', name: 'Elena B.', role: 'Head of Digital', where: 'United Kingdom' },
];

export default function TestimonialsSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('sr-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="bg-ink border-t border-white/[0.06] py-24 md:py-36">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div data-reveal className="sr flex items-center gap-4 mb-10 md:mb-14">
          <span className="label-tag">Client reviews</span>
          <span className="font-body text-sm text-muted">5.0 average on Upwork</span>
        </div>

        <figure data-reveal className="sr max-w-[1100px]">
          <blockquote
            className="font-sans font-semibold text-white"
            style={{ fontSize: 'clamp(1.7rem, 4vw, 3.6rem)', lineHeight: 1.08, letterSpacing: '-0.035em' }}
          >
            &ldquo;{FEATURED.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 font-body text-white/60">
            <span className="text-white font-semibold">{FEATURED.name}</span>, {FEATURED.role}, {FEATURED.where}
            <span className="block text-sm text-muted mt-1">{FEATURED.job}</span>
          </figcaption>
        </figure>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 mt-20 md:mt-28">
          {WALL.map((t, i) => (
            <figure
              key={t.name}
              data-reveal
              className="sr border-t border-white/10 pt-6"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <blockquote className="font-body text-white/80 leading-relaxed" style={{ fontSize: 'clamp(1rem,1.25vw,1.15rem)' }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 font-body text-sm text-muted">
                <span className="text-white font-semibold">{t.name}</span>, {t.role}, {t.where}
              </figcaption>
            </figure>
          ))}
        </div>

        <a
          href="https://www.upwork.com/freelancers/~0185d8d325242675ad"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-16 font-body text-sm text-muted hover:text-white transition-colors"
        >
          Read all reviews on Upwork
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </section>
  );
}
