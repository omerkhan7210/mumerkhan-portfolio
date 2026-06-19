import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { posts, getPostBySlug, formatDate } from '@/data/blog';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `https://mumerkhan.com/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `https://mumerkhan.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  'Web Development': '#61DAFB',
  'Automation': '#ea4b71',
  'Strategy': '#f59e0b',
  'Pricing': '#10b981',
};

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = posts.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))),
  ).slice(0, 3);

  const catColor = CATEGORY_COLORS[post.category] ?? '#C8FF00';

  return (
    <>
      <Header />
      <main className="bg-ink min-h-screen">
        {/* ── Article hero ─────────────────────────────────── */}
        <section className="pt-36 pb-12 relative overflow-hidden">
          <div
            className={`absolute inset-0 pointer-events-none bg-gradient-to-b ${post.coverGradient}`}
            style={{ opacity: 0.15 }}
          />
          <div className="max-w-[780px] mx-auto px-6 md:px-10 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-body text-sm text-muted mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span className="text-white/20">/</span>
              <span className="text-white/40 truncate max-w-[200px]">{post.title}</span>
            </nav>

            {/* Meta */}
            <div className="flex items-center flex-wrap gap-3 mb-6">
              <span
                className="font-body text-xs px-2.5 py-1 rounded-full"
                style={{ color: catColor, background: `${catColor}18` }}
              >
                {post.category}
              </span>
              <span className="font-body text-muted text-xs">{formatDate(post.date)}</span>
              <span className="font-body text-muted text-xs">{post.readTime} min read</span>
            </div>

            <h1
              className="font-sans font-extrabold text-white mb-5"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              {post.title}
            </h1>
            <p className="font-body text-muted mb-8" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pb-8 border-b border-white/[0.07]">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-sans font-bold text-sm"
                style={{ background: 'rgba(200,255,0,0.12)', color: '#C8FF00' }}
              >
                UK
              </div>
              <div>
                <p className="font-body text-white text-sm">Umer Khan</p>
                <p className="font-body text-muted text-xs">Full Stack Developer</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Article body ─────────────────────────────────── */}
        <section className="pb-16">
          <div
            className="max-w-[780px] mx-auto px-6 md:px-10 prose-article"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>

        {/* ── Tags ─────────────────────────────────────────── */}
        <section className="pb-12">
          <div className="max-w-[780px] mx-auto px-6 md:px-10">
            <div className="flex flex-wrap gap-2 pt-8 border-t border-white/[0.07]">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/50 bg-white/[0.02]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="pb-16">
          <div className="max-w-[780px] mx-auto px-6 md:px-10">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{ background: 'rgba(200,255,0,0.04)', border: '1px solid rgba(200,255,0,0.12)' }}
            >
              <p className="font-body text-lime text-xs tracking-[0.12em] uppercase mb-3">Ready to build?</p>
              <h2
                className="font-sans font-bold text-white mb-2"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', letterSpacing: '-0.025em' }}
              >
                Let's turn this into action
              </h2>
              <p className="font-body text-muted text-sm mb-6 max-w-md">
                I build what I write about. If this article gave you an idea, let's scope it out — free, no commitment.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Link href="/contact" className="btn-lime" style={{ fontSize: '0.9rem' }}>
                  Book a free call
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
                <Link href="/services" className="btn-outline" style={{ fontSize: '0.9rem' }}>
                  View services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related articles ─────────────────────────────── */}
        {related.length > 0 && (
          <section className="pb-20 border-t border-white/[0.05]">
            <div className="max-w-[780px] mx-auto px-6 md:px-10 pt-14">
              <p className="font-body text-muted text-xs tracking-[0.14em] uppercase mb-6">Related articles</p>
              <div className="space-y-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className={`w-14 h-14 rounded-lg flex-shrink-0 bg-gradient-to-br ${p.coverGradient}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-muted text-xs mb-1">{p.category} · {p.readTime} min read</p>
                      <h3
                        className="font-sans font-semibold text-white/85 group-hover:text-white transition-colors duration-200 truncate"
                        style={{ fontSize: '0.9rem', letterSpacing: '-0.01em' }}
                      >
                        {p.title}
                      </h3>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="flex-shrink-0 text-white/25 group-hover:text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/blog" className="font-body text-muted text-sm hover:text-white transition-colors duration-200">
                  ← All articles
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
