import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AutomationRoiCalculator from '@/components/AutomationRoiCalculator';

export const metadata: Metadata = {
  title: 'Automation ROI Calculator — n8n & Workflow Savings',
  description:
    'Free automation ROI calculator. See how many hours and dollars a workflow automation (n8n, Zapier, Make) could save your business every year, and the payback period.',
  alternates: { canonical: 'https://mumerkhan.com/tools/automation-roi-calculator' },
  openGraph: {
    title: 'Automation ROI Calculator | Umer Khan',
    description: 'Calculate your potential time and cost savings from workflow automation.',
    url: 'https://mumerkhan.com/tools/automation-roi-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Automation ROI Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  url: 'https://mumerkhan.com/tools/automation-roi-calculator',
};

export default function AutomationRoiCalculatorPage() {
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
            Automation ROI calculator
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
            See how much time and money a workflow automation could actually save your business, and how fast it pays for itself.
          </p>
        </div>
      </section>

      <section style={{ background: '#0A0A0A', padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <AutomationRoiCalculator />
        </div>
      </section>
      <Footer />
    </>
  );
}
