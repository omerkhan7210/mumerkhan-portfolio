import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { posts, getPostBySlug, formatDate } from '@/data/blog';
import { PageClosing } from '@/components/page/Page';
import Reveal from '@/components/home/Reveal';

type Props = { params: { slug: string } };
const SITE = 'https://mumerkhan.com';

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: { absolute: post.seoTitle },
    description: post.seoDescription,
    alternates: { canonical: `${SITE}/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `${SITE}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Muhammad Umer Khan'],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = posts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);
  const more = related.length ? related : posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.seoDescription,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#person` },
        mainEntityOfPage: `${SITE}/blog/${post.slug}`,
        image: `${SITE}/opengraph-image`,
        keywords: post.tags.join(', '),
        articleSection: post.category,
        wordCount: post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE}/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <article>
          <header className="mx-auto max-w-[1440px] px-5 md:px-10 pt-28 md:pt-40 pb-12 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-x-6">
            <div className="lg:col-span-9">
              <nav aria-label="Breadcrumb" className="mb-8 text-[14px]" style={{ color: 'var(--muted)' }}>
                <Link href="/" className="hover:text-bone">Home</Link> <span aria-hidden="true">/</span>{' '}
                <Link href="/blog" className="hover:text-bone">Blog</Link> <span aria-hidden="true">/</span>{' '}
                <span className="text-bone">{post.category}</span>
              </nav>
              <h1 className="text-bone fade-up-late" style={{ fontSize: 'clamp(1.35rem, 4.2vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.02em', fontWeight: 600, maxWidth: '24ch' }}>
                {post.seoTitle}
              </h1>
              <p className="fade-up-late mt-6 max-w-[60ch] text-bone" style={{ fontSize: 'var(--step-lead)', lineHeight: 1.45 }}>{post.excerpt}</p>
              <p className="fade-up-late mt-6 text-[15px]" style={{ color: 'var(--muted)' }}>
                By <Link href="/about" className="text-bone underline underline-offset-4">Muhammad Umer Khan</Link> · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime} min read
              </p>
            </div>
          </header>

          <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12">
            <div className="lg:col-span-7 lg:col-start-1 prose-article min-w-0" dangerouslySetInnerHTML={{ __html: post.content }} />
            <aside className="lg:col-span-3 lg:col-start-10" aria-label="About the author">
              <div className="lg:sticky lg:top-28 grid gap-6">
                <Reveal className="p-6" style={{ background: 'var(--surface)' }}>
                  <p className="text-[17px] text-bone font-medium">Need this done for you?</p>
                  <p className="mt-2 text-[15px] leading-[1.55]" style={{ color: '#C4C7BF' }}>
                    I’m a freelance web developer with 80+ sites shipped and 100% Job Success on Upwork. Tell me about your project and get a fixed quote.
                  </p>
                  <Link href="/contact" className="btn-lime mt-5 !py-3 text-[15px]">Get a fixed quote</Link>
                </Reveal>
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 5).map((t) => (
                    <span key={t} className="text-[13px] px-2.5 py-1" style={{ background: 'var(--surface)', color: '#C4C7BF' }}>{t}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </article>

        <section aria-labelledby="more-title" className="mx-auto max-w-[1440px] px-5 md:px-10 pt-24 md:pt-36">
          <h2 id="more-title" className="text-bone" style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)', fontWeight: 500 }}>Keep reading</h2>
          <ul className="mt-8 grid md:grid-cols-3 gap-2">
            {more.map((p) => (
              <Reveal as="li" key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col p-6 transition-colors hover:bg-[#26302D]" style={{ background: 'var(--surface)' }}>
                  <span className="text-[14px]" style={{ color: 'var(--muted)' }}>{p.category} · {p.readTime} min</span>
                  <span className="mt-3 text-[19px] leading-snug text-bone group-hover:text-jade transition-colors">{p.title}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>

        <PageClosing />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
