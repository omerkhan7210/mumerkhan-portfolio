import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services — Full Stack Development & Design',
  description:
    'WordPress development, MERN stack web apps, n8n automation, Figma-to-web, e-commerce, and UI/UX design. Hire Umer Khan for your next web project.',
  alternates: { canonical: 'https://mumerkhan.com/services' },
  openGraph: {
    title: 'Services | Umer Khan — Full Stack Developer',
    description: 'Six specialist services: WordPress, MERN Stack, n8n Automation, Figma to Web, E-Commerce, and UI/UX Design.',
    url: 'https://mumerkhan.com/services',
  },
};

const SERVICE_ICONS: Record<string, string> = {
  'wordpress-development': '⬛',
  'mern-stack-development': '⚛',
  'n8n-automation': '⚡',
  'figma-to-web': '✦',
  'ecommerce-development': '🛒',
  'ui-ux-design': '◈',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="bg-ink min-h-screen">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="pt-36 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,255,0,0.06) 0%, transparent 65%)',
          }} />
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span className="font-body text-muted text-xs tracking-[0.12em] uppercase">What I do</span>
            </div>
            <h1
              className="font-sans font-extrabold text-white mb-6"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
            >
              Services built for{' '}
              <span className="text-lime">real results</span>
            </h1>
            <p className="font-body text-muted max-w-xl" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7 }}>
              Six specialist services. Every project scoped clearly, delivered on time, and built to perform — not just to look good.
            </p>
          </div>
        </section>

        {/* ── Services grid ─────────────────────────────────── */}
        <section className="pb-24">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((svc, i) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="group relative flex flex-col p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
                  style={{ textDecoration: 'none' }}
                >
                  {/* Number */}
                  <span
                    className="absolute top-5 right-6 font-body text-white/10 font-bold"
                    style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}
                  >
                    0{i + 1}
                  </span>

                  {/* Icon area */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-xl"
                    style={{
                      background: `${svc.color}15`,
                      border: `1px solid ${svc.color}30`,
                      color: svc.color,
                      fontSize: '1.2rem',
                    }}
                  >
                    {SERVICE_ICONS[svc.slug] ?? '◻'}
                  </div>

                  <h2
                    className="font-sans font-bold text-white mb-2 group-hover:text-lime transition-colors duration-200"
                    style={{ fontSize: '1.15rem', letterSpacing: '-0.02em' }}
                  >
                    {svc.name}
                  </h2>
                  <p className="font-body text-muted text-sm leading-relaxed mb-6 flex-1">
                    {svc.tagline}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {svc.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-body text-white/40 text-xs px-2.5 py-1 rounded-md border border-white/[0.06]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="flex items-center gap-2 font-body text-lime text-sm font-medium">
                    View service
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="pb-8" />
      </main>
      <Footer />
    </>
  );
}
