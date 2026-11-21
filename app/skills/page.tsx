import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/home/Reveal';
import { skills } from '@/data/skills';
import { PageHero, PageClosing } from '@/components/page/Page';

export const metadata: Metadata = {
  title: 'Skills: WordPress, Next.js, React, WooCommerce, n8n & More',
  description:
    'The tools I build with, each backed by real client projects: WordPress, Elementor, WooCommerce, Next.js, React, Node.js, MongoDB, n8n, Figma and more.',
  alternates: { canonical: 'https://mumerkhan.com/skills' },
};

export default function SkillsPage() {
  const groups = Array.from(new Set(skills.map((s) => s.category)));
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[{ href: '/skills', label: 'Skills' }]}
          title={['The tools,', 'with receipts']}
          image={{ src: '/assets/gallery/roaddarts.webp', w: 1280, h: 720, alt: 'RoadDarts web app on desktop, laptop and phone' }}
          lead="Every skill below links to the client projects it was used on, so you can judge the work rather than the logo."
        />
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid gap-16 md:gap-24">
          {groups.map((g) => (
            <section key={g} aria-label={g} className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-6">
              <h2 className="lg:col-span-3 text-bone" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.75rem)', fontWeight: 500 }}>{g}</h2>
              <ul className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skills.filter((s) => s.category === g).map((s, i) => (
                  <Reveal as="li" key={s.slug} data-delay={String(i % 4)}>
                    <Link href={`/skills/${s.slug}`} className="group flex h-full flex-col p-6 transition-colors hover:bg-[#26302D]" style={{ background: 'var(--surface)' }}>
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="text-[21px] text-bone group-hover:text-jade transition-colors">{s.name}</span>
                        <span className="text-[14px] whitespace-nowrap" style={{ color: 'var(--muted)' }}>{s.yearsLabel}</span>
                      </span>
                      <span className="mt-2 text-[16px] leading-[1.5]" style={{ color: '#C4C7BF' }}>{s.tagline}</span>
                      <span className="mt-4 text-[14px]" style={{ color: 'var(--muted)' }}>
                        {s.projectSlugs.length} project{s.projectSlugs.length === 1 ? '' : 's'}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <PageClosing />
      </main>
      <Footer />
    </>
  );
}
