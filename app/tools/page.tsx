import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PageHero, PageClosing } from '@/components/page/Page';

export const metadata: Metadata = {
  title: 'Free Tools: Website Cost & Automation ROI Calculators',
  description:
    'Free calculators for business owners: estimate what your website should cost, and how much an n8n automation could save you. No email required.',
  alternates: { canonical: 'https://mumerkhan.com/tools' },
};

const TOOLS = [
  {
    href: '/tools/website-cost-calculator',
    title: 'Website cost calculator',
    description: 'Get an instant price range for your website based on pages, features, integrations and timeline.',
    note: 'Takes about a minute',
  },
  {
    href: '/tools/automation-roi-calculator',
    title: 'Automation ROI calculator',
    description: 'See how many hours and dollars a workflow automation could save your business each year, and how fast it pays back.',
    note: 'Takes about a minute',
  },
];

export default function ToolsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[{ href: '/tools', label: 'Tools' }]}
          title={['Free tools', 'for budgeting']}
          image={{ src: '/assets/gallery/wlk-gardeners.webp', w: 1280, h: 720, alt: 'WLK Gardeners website on desktop, laptop and phone' }}
          lead="Two calculators I built from real project numbers. No email, no sales call, just an honest estimate."
        />
        <section className="mx-auto max-w-[1440px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-2">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="group flex min-h-[320px] flex-col justify-between p-8 md:p-12 transition-colors hover:bg-[#26302D]" style={{ background: 'var(--surface)' }}>
              <span>
                <span className="block text-bone group-hover:text-jade transition-colors" style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)', lineHeight: 1.1, fontWeight: 500 }}>{t.title}</span>
                <span className="mt-4 block text-[18px] leading-[1.55] max-w-[40ch]" style={{ color: '#C4C7BF' }}>{t.description}</span>
              </span>
              <span className="mt-8 flex items-center justify-between text-[15px]" style={{ color: 'var(--muted)' }}>
                {t.note}
                <span className="text-bone text-[22px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </section>
        <PageClosing sentence="Want a real number instead of an estimate? Describe the project and I’ll send a fixed quote today." />
      </main>
      <Footer />
    </>
  );
}
