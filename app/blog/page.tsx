import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCoverArt from '@/components/BlogCoverArt';
import { posts, formatDate } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Web Development Blog — WordPress, n8n Automation & Pricing Guides',
  description:
    'Practical 2025 articles on WordPress vs custom development, n8n workflow automation, website conversion fixes, and real website pricing. Written by Umer Khan, Full Stack Developer.',
  alternates: { canonical: 'https://mumerkhan.com/blog' },
  openGraph: {
    title: 'Web Development & Automation Blog | Umer Khan',
    description: 'WordPress vs custom development, n8n automation guides, website pricing breakdowns, and conversion strategy — straight answers, no fluff.',
    url: 'https://mumerkhan.com/blog',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Web Development': '#61DAFB',
  'Automation': '#ea4b71',
  'Strategy': '#f59e0b',
  'Pricing': '#10b981',
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main className="bg-ink min-h-screen">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 70% 50% at 40% -5%, rgba(200,255,0,0.05) 0%, transparent 60%)',
          }} />
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span className="font-body text-muted text-xs tracking-[0.12em] uppercase">Articles & insights</span>
            </div>
            <h1
              className="font-sans font-extrabold text-white mb-4"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
            >
              Writing that earns its place
            </h1>
            <p className="font-body text-muted max-w-lg" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.1rem)', lineHeight: 1.7 }}>
              No filler. Practical articles on web development, automation, and strategy — written for business owners and builders who want straight answers.
            </p>
          </div>
        </section>

        {/* ── Featured post ─────────────────────────────────── */}
        <section className="pb-12">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <Link
              href={`/blog/${featured.slug}`}
              className="group flex flex-col md:flex-row gap-0 rounded-2xl border border-white/[0.08] overflow-hidden hover:border-white/15 transition-all duration-300"
              style={{ textDecoration: 'none' }}
            >
              <BlogCoverArt
                accent={CATEGORY_COLORS[featured.category] ?? '#C8FF00'}
                category={featured.category}
                className="w-full md:w-2/5 h-48 md:h-auto min-h-[200px] flex-shrink-0"
                style={{ minHeight: 220 }}
              />
              <div className="flex flex-col justify-center p-8 md:p-10 flex-1 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-body text-xs px-2.5 py-1 rounded-full"
                    style={{
                      color: CATEGORY_COLORS[featured.category] ?? '#C8FF00',
                      background: `${CATEGORY_COLORS[featured.category] ?? '#C8FF00'}15`,
                    }}
                  >
                    {featured.category}
                  </span>
                  <span className="font-body text-muted text-xs">{formatDate(featured.date)}</span>
                  <span className="font-body text-muted text-xs">{featured.readTime} min read</span>
                </div>
                <h2
                  className="font-sans font-bold text-white mb-3 group-hover:text-lime transition-colors duration-200"
                  style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
                >
                  {featured.title}
                </h2>
                <p className="font-body text-muted text-sm leading-relaxed mb-5 max-w-xl">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-2 font-body text-lime text-sm font-medium">
                  Read article
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
              </div>
            </Link>
          </div>
        </section>

        {/* ── Article grid ──────────────────────────────────── */}
        {rest.length > 0 && (
          <section className="pb-20">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/15 transition-all duration-300"
                    style={{ textDecoration: 'none' }}
                  >
                    <BlogCoverArt
                      accent={CATEGORY_COLORS[post.category] ?? '#C8FF00'}
                      category={post.category}
                      className="h-36 flex-shrink-0"
                    />
                    <div className="flex flex-col flex-1 p-6 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="font-body text-xs px-2.5 py-1 rounded-full"
                          style={{
                            color: CATEGORY_COLORS[post.category] ?? '#C8FF00',
                            background: `${CATEGORY_COLORS[post.category] ?? '#C8FF00'}15`,
                          }}
                        >
                          {post.category}
                        </span>
                        <span className="font-body text-muted text-xs">{post.readTime} min</span>
                      </div>
                      <h2
                        className="font-sans font-bold text-white mb-2 group-hover:text-lime transition-colors duration-200 flex-1"
                        style={{ fontSize: '1.05rem', letterSpacing: '-0.02em', lineHeight: 1.35 }}
                      >
                        {post.title}
                      </h2>
                      <p className="font-body text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-body text-white/30 text-xs">{formatDate(post.date)}</span>
                        <div className="flex items-center gap-1 font-body text-lime text-xs">
                          Read
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="pb-8" />
      </main>
      <Footer />
    </>
  );
}
