import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/home/Services';
import { services } from '@/data/services';
import { PageHero, Split, ItemList, PageClosing } from '@/components/page/Page';
import { SERVICE_SEO } from '@/components/page/serviceSeo';

export const metadata: Metadata = {
  title: 'Web Development Services: WordPress, Next.js, WooCommerce & n8n',
  description:
    'Freelance web development services: custom WordPress and Elementor sites, Figma to WordPress, Next.js apps, WooCommerce stores, n8n automation and technical SEO. Fixed quotes.',
  alternates: { canonical: 'https://mumerkhan.com/services' },
};

const INDUSTRIES = [
  { title: 'Trades & home services', desc: 'Roofing, plumbing, HVAC, flooring, cleaning and gardening firms that need calls and quote requests.', href: '/redesign' },
  { title: 'Professional services', desc: 'Consultants, clinics, logistics and B2B firms that need trust, clarity and a clean enquiry path.' },
  { title: 'E-commerce & bookings', desc: 'Stores and hire businesses that need WooCommerce, deposits, bookings and Stripe payments to just work.' },
  { title: 'Startups & SaaS', desc: 'Founders who need a fast Next.js marketing site, a dashboard or a first product version.' },
  { title: 'Agencies', desc: 'White-label Figma to WordPress and Elementor builds, delivered to spec and on time.' },
  { title: 'Nonprofits & education', desc: 'Community, course and charity sites that volunteers can actually edit.' },
];

export default function ServicesIndex() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[{ href: '/services', label: 'Services' }]}
          title={['What I build', 'for you']}
          image={{ src: '/assets/gallery/kp-global-consultants.webp', w: 1280, h: 720, alt: 'KP Global Consultants website on desktop, laptop and phone' }}
          lead="Websites, stores, web apps and automations, built by one developer who answers your messages and owns the result."
        >
          <Link href="/contact" className="btn-lime">Book a free call</Link>
          <Link href="/tools/website-cost-calculator" className="text-[16px] text-bone underline underline-offset-[6px] decoration-[#9FC7B8] hover:text-jade">Estimate your project</Link>
        </PageHero>

        <div>
          <Services />
        </div>

        <Split id="all" title="Every service" intro="Each page lists exactly what’s included, how it runs and what it costs." tone="surface">
          <ItemList
            items={services.map((s) => ({
              title: SERVICE_SEO[s.slug]?.short ?? s.name,
              desc: s.tagline,
              href: `/services/${s.slug}`,
            }))}
          />
        </Split>

        <Split id="industries" title="Who I work with">
          <ItemList items={INDUSTRIES} />
        </Split>

        <PageClosing />
      </main>
      <Footer />
    </>
  );
}
