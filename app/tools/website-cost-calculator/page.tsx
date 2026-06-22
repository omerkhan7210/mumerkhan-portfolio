import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WebsiteCostCalculator from '@/components/WebsiteCostCalculator';

export const metadata: Metadata = {
  title: 'Website Cost Calculator — Free Instant Estimate',
  description:
    'Free interactive website cost calculator. Get an instant price estimate for a landing page, marketing site, e-commerce store, or custom web app based on your actual scope.',
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
      <Footer />
    </>
  );
}
