import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/home/Reveal';
import { posts, formatDate } from '@/data/blog';
import { PageHero, PageClosing } from '@/components/page/Page';

export const metadata: Metadata = {
  title: 'Web Development Blog: Costs, WordPress, Next.js & Automation',
  description:
    'Plain-English guides for business owners: website costs, WordPress vs custom builds, hiring a freelancer vs an agency, and n8n automation, from a working freelance developer.',
  alternates: { canonical: 'https://mumerkhan.com/blog' },
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const [lead, ...rest] = sorted;
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[{ href: '/blog', label: 'Blog' }]}
          title={['Notes from', 'the build']}
          lead="Straight answers on costs, platforms and automation, written for the people paying for websites, not other developers."
        />

        <section className="mx-auto max-w-[1440px] px-5 md:px-10" aria-label="Latest article">
          <Link href={`/blog/${lead.slug}`} className="group block p-7 md:p-12 transition-colors hover:bg-[#26302D]" style={{ background: 'var(--surface)' }}>
            <h2 className="text-bone group-hover:text-jade transition-colors" style={{ fontSize: 'clamp(1.3rem, 3vw, 2.75rem)', lineHeight: 1.1, fontWeight: 500, maxWidth: '30ch' }}>
              {lead.seoTitle}
            </h2>
            <p className="mt-3 text-[15px]" style={{ color: 'var(--muted)' }}>Latest article · {lead.category} · {formatDate(lead.date)}</p>
            <p className="mt-4 text-[18px] leading-[1.55] max-w-[70ch]" style={{ color: '#C4C7BF' }}>{lead.excerpt}</p>
          </Link>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 md:px-10 pt-16" aria-label="All articles">
          <ul className="grid">
            {rest.map((p) => (
              <Reveal as="li" key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-2 py-8">
                  <span className="md:col-span-3 text-[15px]" style={{ color: 'var(--muted)' }}>
                    {p.category}
                    <br className="hidden md:block" />
                    <span className="md:hidden"> · </span>
                    <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readTime} min
                  </span>
                  <span className="md:col-span-9">
                    <span className="block text-bone group-hover:text-jade transition-colors" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.75rem)', lineHeight: 1.2, fontWeight: 500 }}>{p.seoTitle}</span>
                    <span className="mt-2 block text-[17px] leading-[1.55] max-w-[70ch]" style={{ color: '#C4C7BF' }}>{p.excerpt}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>

        <PageClosing />
      </main>
      <Footer />
    </>
  );
}
