'use client';

import { useRef } from 'react';

/* Real Upwork reviews — verified 5.0 / 5.0 */
const TESTIMONIALS = [
  {
    name: 'Sophie R.',
    role: 'Business Owner',
    country: 'Netherlands',
    flag: '🇳🇱',
    rating: 5,
    job: 'WordPress + Ongoing Maintenance',
    text: 'Umer was a pleasure to work with from start to finish. He helped improve our website design on Figma first, which gave us a clear picture before development began. Once approved, he built everything in WordPress with clean structure and reusable sections. The site looks exactly like the design, loads fast, and is easy to manage. Highly recommend for anyone looking for a developer who thinks beyond just getting it live.',
  },
  {
    name: 'Dr. Marcus H.',
    role: 'Company Director',
    country: 'Germany',
    flag: '🇩🇪',
    rating: 5,
    job: 'Medical Equipment Company Website',
    text: 'Umer did an excellent job building our new website. He demonstrated strong expertise in WordPress and Elementor, and successfully converted our design into a clean, modern, and fully responsive website. The Figma to WordPress implementation was pixel-perfect. What stood out most was his ability to combine design accuracy with performance — the site loads fast, looks polished, and is easy for our team to update.',
  },
  {
    name: 'Andrew T.',
    role: 'Marketing Manager',
    country: 'Australia',
    flag: '🇦🇺',
    rating: 5,
    job: 'Responsive WordPress Site',
    text: 'Umer did an outstanding job building our WordPress website. He was responsive, knowledgeable, and handled all requested changes quickly and efficiently. The final result met our expectations perfectly. I appreciate the professionalism and would definitely hire him again.',
  },
  {
    name: 'Elena B.',
    role: 'Head of Digital',
    country: 'United Kingdom',
    flag: '🇬🇧',
    rating: 5,
    job: 'WordPress Website Revamp',
    text: 'It was a great experience working with Umer on our WordPress revamp. He demonstrated strong technical skills, attention to detail, and a clear understanding of the requirements. Communication was smooth throughout, and he delivered on time while maintaining high quality. I highly recommend him to anyone looking for a reliable WordPress developer.',
  },
  {
    name: 'Yannick D.',
    role: 'Project Manager',
    country: 'Belgium',
    flag: '🇧🇪',
    rating: 5,
    job: 'Figma → WordPress (Homepage + 4 Pages)',
    text: 'A very smooth and professional collaboration. Great communication, strong understanding of the task, and high-quality delivery. Everything was handled efficiently and with attention to detail. I can definitely recommend working together.',
  },
  {
    name: 'Tyler W.',
    role: 'CEO',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    job: 'WordPress Website Build',
    text: 'They are truly amazing and a great WordPress expert. Fast turnaround, zero back-and-forth on revisions — just clean work delivered exactly as described. Will absolutely be coming back for future projects.',
  },
  {
    name: 'Jason M.',
    role: 'Web Manager',
    country: 'Canada',
    flag: '🇨🇦',
    rating: 5,
    job: 'WordPress Mobile Menu Fix',
    text: 'Excellent work on the WordPress mobile menu fix. Umer quickly diagnosed the issue, implemented a clean solution, and ensured full responsiveness across mobile and tablet without breaking existing functionality. Communication was clear, turnaround was fast, and the final result works flawlessly. Highly recommended.',
  },
  {
    name: 'Lena P.',
    role: 'Digital Agency Owner',
    country: 'Netherlands',
    flag: '🇳🇱',
    rating: 5,
    job: 'Figma to Elementor Transfer',
    text: 'Endorsed for being Solution Oriented, a Clear Communicator, Detail Oriented, and Professional. Delivered the Figma-to-Elementor transfer exactly as specified, on time, with zero issues after handoff.',
  },
];

/* Split into two rows for the double marquee */
const ROW_1 = TESTIMONIALS.slice(0, 4);
const ROW_2 = TESTIMONIALS.slice(4, 8);

function StarRating({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C8FF00">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="flex-shrink-0 w-[340px] rounded-2xl p-6 mx-3 flex flex-col"
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'border-color 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,255,0,0.22)';
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.025) translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
      }}
    >
      {/* Top row: stars + platform badge */}
      <div className="flex items-center justify-between mb-4">
        <StarRating n={t.rating} />
        <span
          className="font-body text-xs px-2.5 py-0.5 rounded-full"
          style={{ background: 'rgba(200,255,0,0.07)', color: 'rgba(200,255,0,0.65)', border: '1px solid rgba(200,255,0,0.12)' }}
        >
          Upwork ✓
        </span>
      </div>

      {/* Job label */}
      <p className="font-body text-xs text-muted mb-3 line-clamp-1" style={{ letterSpacing: '0.01em' }}>
        {t.job}
      </p>

      {/* Quote */}
      <p className="font-body text-sm leading-relaxed text-white/65 mb-5 flex-1">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-sm flex-shrink-0"
          style={{ background: 'rgba(200,255,0,0.1)', color: '#C8FF00' }}
        >
          {t.name[0]}
        </div>
        <div className="min-w-0">
          <p className="font-sans font-semibold text-white text-sm truncate">{t.name}</p>
          <p className="font-body text-xs text-muted truncate">
            {t.role} · {t.flag} {t.country}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  speed = 'normal',
}: {
  items: typeof TESTIMONIALS;
  reverse?: boolean;
  speed?: 'normal' | 'slow';
}) {
  const doubled = [...items, ...items];
  const animClass = reverse
    ? speed === 'slow' ? 'animate-marquee-reverse-slow' : 'animate-marquee-reverse'
    : speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee';

  return (
    <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
      <div
        className={`flex ${animClass}`}
        style={{ width: 'max-content' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'; }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const headRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 md:py-32 bg-ink overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* Heading */}
      <div className="max-w-[1280px] mx-auto px-6 mb-14">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="label-tag">Social Proof</span>
            <h2
              className="font-sans font-bold text-white mt-3"
              style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', lineHeight: 1, letterSpacing: '-0.03em' }}
            >
              Clients who keep
              <br />
              <span className="text-lime">coming back.</span>
            </h2>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C8FF00">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="font-sans font-bold text-white text-2xl">5.0 / 5.0</p>
            <p className="font-body text-muted text-xs mt-0.5">Upwork Average Rating</p>
          </div>
        </div>
      </div>

      {/* Double row marquee */}
      <div className="space-y-4">
        <MarqueeRow items={ROW_1} reverse={false} speed="slow" />
        <MarqueeRow items={ROW_2} reverse={true} speed="normal" />
      </div>

      {/* CTA */}
      <div className="max-w-[1280px] mx-auto px-6 mt-12">
        <a
          href="https://www.upwork.com/freelancers/~0185d8d325242675ad"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-white transition-colors"
        >
          <span>View all reviews on Upwork</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </section>
  );
}
