import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WebsiteCostCalculator from '@/components/WebsiteCostCalculator';
import BenchmarkTable from '@/components/calculators/BenchmarkTable';
import FaqSection from '@/components/calculators/FaqSection';

export const metadata: Metadata = {
  title: 'Website Cost Calculator 2026 — Free Instant Price Estimate',
  description:
    'Free website cost calculator. Get an instant price estimate for a landing page, marketing site, e-commerce store, or custom web app based on your actual scope — no email required.',
  alternates: { canonical: 'https://mumerkhan.com/tools/website-cost-calculator' },
  openGraph: {
    title: 'Website Cost Calculator | Umer Khan',
    description: 'Get an instant estimate for your website project — no email required.',
    url: 'https://mumerkhan.com/tools/website-cost-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Website Cost Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://mumerkhan.com/tools/website-cost-calculator',
};

const COST_ROWS = [
  { label: 'Landing Page', value: '$300 – $600', note: '1–3 pages, single focus, no CMS needed' },
  { label: 'Marketing Site', value: '$600 – $1,500', note: '5–10 pages, CMS-ready, blog-capable' },
  { label: 'E-Commerce Store', value: '$2,000 – $5,000', note: 'WooCommerce/Shopify-style storefront' },
  { label: 'Custom Web App', value: '$5,000 – $12,000+', note: 'User accounts, dashboards, custom logic' },
];

const COST_FACTORS = [
  { label: 'Number of pages', detail: 'More pages means more design, content, and QA time — this is usually the single biggest driver of cost.' },
  { label: 'Custom design vs. template', detail: 'A template-based build is faster and cheaper; fully custom design adds time for mockups, revisions, and unique components.' },
  { label: 'Who writes the content', detail: 'If you need a copywriter on top of the build, that\'s additional scope most calculators bury in the fine print.' },
  { label: 'Functionality & integrations', detail: 'Booking systems, payment gateways, CRMs, and other third-party tools each add their own setup and testing time.' },
  { label: 'CMS / self-editing needs', detail: 'A static site is the cheapest option, but if you need to edit content yourself later, a CMS adds setup cost upfront.' },
  { label: 'Timeline', detail: 'Rush turnarounds typically add 25–35% since they require reprioritizing other work to hit your deadline.' },
];

const FAQ_ITEMS = [
  {
    q: 'How much does a website cost in 2026?',
    a: 'Most small business websites range from $300 for a single landing page to $12,000+ for a custom web application with user accounts. The biggest factors are page count, whether the design is custom or template-based, and how many integrations (payments, bookings, CRMs) you need. Use the calculator above for an estimate based on your specific project, not a generic average.',
  },
  {
    q: 'How accurate is this website cost calculator?',
    a: 'It\'s built on real pricing factors — page count, design complexity, e-commerce scale, integrations, and timeline — the same variables that go into an actual quote. It\'s a solid planning estimate, not a final price; the exact number depends on details that only come out in a short conversation.',
  },
  {
    q: 'Do I need a CMS for my website?',
    a: 'Only if you plan to update content yourself after launch — adding blog posts, changing prices, swapping images, etc. If the site is mostly static and you\'re fine asking a developer for changes, skipping the CMS keeps the build simpler and cheaper.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'A simple landing page can be ready in about a week. A marketing site with 5–10 pages usually takes 2–4 weeks, and e-commerce or custom web apps can run 6–12 weeks depending on integrations. See the full breakdown in our timeline guide linked below.',
  },
  {
    q: 'Should I hire a freelancer or an agency?',
    a: 'Freelancers are typically 30–50% cheaper for the same scope and give you direct access to the person building your site, while agencies offer more bandwidth for very large projects. For most small-to-mid sized projects, a freelancer is the more cost-effective choice — see the full comparison linked below.',
  },
];

export default function WebsiteCostCalculatorPage() {
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section
        className="relative bg-ink bg-grid-pattern overflow-hidden"
        style={{ paddingTop: 'clamp(120px, 16vw, 180px)', paddingBottom: 'clamp(48px, 6vw, 72px)' }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>
            Free Tool
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: '#ffffff',
              fontSize: 'clamp(2.2rem, 6vw, 3.6rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginTop: 12,
            }}
          >
            Website cost calculator
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.45)',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              maxWidth: 560,
              lineHeight: 1.65,
              marginTop: 18,
            }}
          >
            Answer a few questions about your project and get an instant price range — no email, no sales call required.
          </p>
        </div>
      </section>

      <section style={{ background: '#0A0A0A', padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <WebsiteCostCalculator />
        </div>
      </section>

      <section style={{ background: '#0A0A0A', padding: '0 24px 100px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56, paddingTop: 64 }}>
          <div>
            <h2 style={h2Style}>How this estimate is calculated</h2>
            <p style={pStyle}>
              This calculator doesn't guess — it runs the same factors that go into a real quote: your project type, page
              count, design approach, functionality, and timeline. The range you see updates live as you answer, and the
              optional AI summary explains what's driving your specific number, not a generic average.
            </p>
          </div>

          <BenchmarkTable title="Typical website costs by project type" rows={COST_ROWS} />

          <div>
            <h2 style={h2Style}>What actually affects the cost of a website</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {COST_FACTORS.map((f) => (
                <div key={f.label}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: '#fff', marginBottom: 4 }}>{f.label}</p>
                  <p style={pStyle}>{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <FaqSection items={FAQ_ITEMS} />

          <div>
            <h2 style={h2Style}>Related reading</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href="/blog/how-much-does-a-website-cost" style={linkStyle}>How Much Does a Professional Website Cost in 2025? Real Numbers →</Link>
              <Link href="/blog/freelancer-vs-agency-website" style={linkStyle}>Freelancer vs Agency: Who Should Build Your Website in 2026? →</Link>
              <Link href="/blog/how-long-does-it-take-to-build-a-website" style={linkStyle}>How Long Does It Take to Build a Website in 2026? →</Link>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: 12 }}>
            <p style={{ ...pStyle, marginBottom: 18 }}>Want a number you can actually budget around?</p>
            <Link href="/contact" className="btn-lime">Get an exact quote</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
  color: '#fff',
  letterSpacing: '-0.02em',
  marginBottom: 20,
};

const pStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.92rem',
  color: 'rgba(255,255,255,0.5)',
  lineHeight: 1.75,
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  color: '#C8FF00',
  textDecoration: 'none',
};
