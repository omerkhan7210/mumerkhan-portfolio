import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkStrips from '@/components/home/WorkStrips';
import { ALL_STRIPS } from '@/components/home/data';
import { PageHero, Facts, PageClosing } from '@/components/page/Page';

export const metadata: Metadata = {
  title: 'Web Development Portfolio & Case Studies',
  description: `${ALL_STRIPS.length} case studies from a freelance web developer: WordPress and Elementor sites, WooCommerce stores, Next.js apps, n8n automation and trade business websites.`,
  alternates: { canonical: 'https://mumerkhan.com/work' },
};

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Web development case studies',
  itemListElement: ALL_STRIPS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://mumerkhan.com/work/${p.slug}`,
    name: p.title,
  })),
};

export default function Work() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[{ href: '/work', label: 'Work' }]}
          title={['Work that', 'ships and sells']}
          image={{ src: '/assets/gallery/kanalfuchs.webp', w: 1280, h: 720, alt: 'Kanalfuchs drain service website on desktop, laptop and phone' }}
          lead={`${ALL_STRIPS.length} case studies across WordPress, WooCommerce, Next.js and n8n automation. Each one shows what was broken, what I built and what changed.`}
          aside={
            <Facts
              items={[
                { k: '80+', v: 'sites shipped since 2020' },
                { k: '100%', v: 'Job Success on Upwork' },
                { k: '6 yrs', v: 'building for clients' },
                { k: '5.0', v: 'average client rating' },
              ]}
            />
          }
        />
        <div className="-mt-12 md:-mt-20">
          <WorkStrips items={ALL_STRIPS} title="All projects" showAllLink={false} />
        </div>
        <PageClosing sentence="Want your project in this list? Tell me what you need built and I’ll send a plan and a fixed price today." />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </>
  );
}
