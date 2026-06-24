import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AutomationRoiCalculator from '@/components/AutomationRoiCalculator';
import BenchmarkTable from '@/components/calculators/BenchmarkTable';
import FaqSection from '@/components/calculators/FaqSection';

export const metadata: Metadata = {
  title: 'Automation ROI Calculator 2026 — n8n & Workflow Savings',
  description:
    'Free automation ROI calculator. See how many hours and dollars a workflow automation (n8n, Zapier, Make) could save your business every year, and the exact payback period.',
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

const SAVINGS_ROWS = [
  { label: 'Simple workflow', value: '$300 – $700 setup', note: '1–2 apps, no branching logic, low risk if it breaks' },
  { label: 'Medium workflow', value: '$700 – $1,800 setup', note: '3–5 apps, conditional logic, occasional error handling' },
  { label: 'Complex workflow', value: '$1,800 – $4,500 setup', note: '6+ apps, branching logic, mission-critical error handling' },
  { label: 'Typical payback period', value: '1 – 4 months', note: 'Most workflows pay for their setup cost within the first quarter' },
];

const SAVINGS_SOURCES = [
  { label: 'Lead routing & CRM entry', detail: 'Auto-routing new leads into your CRM with the right owner and tags assigned eliminates one of the most time-sensitive manual tasks.' },
  { label: 'Manual data entry', detail: 'Copying data between spreadsheets, forms, and systems is repetitive, error-prone, and almost always automatable end to end.' },
  { label: 'Recurring reports', detail: 'Weekly or monthly reports built by hand can be generated and delivered automatically on a schedule.' },
  { label: 'Invoicing & billing', detail: 'Connecting your billing tool to your CRM or project tracker removes the manual step of creating and sending invoices.' },
  { label: 'Customer support replies', detail: 'Routine, repetitive replies (order status, FAQs) can be triaged or drafted automatically, freeing up time for complex tickets.' },
  { label: 'Social media posting', detail: 'Scheduling and cross-posting content across platforms is a clean, low-risk automation win.' },
];

const FAQ_ITEMS = [
  {
    q: 'How accurate is this automation ROI estimate?',
    a: 'The labor savings calculation is straightforward math: hours saved per week × hourly cost × team size, annualized. The setup cost and payback period are based on real n8n project tiers (simple/medium/complex) determined by how many apps are involved and whether you need branching logic or error handling — not a flat guess.',
  },
  {
    q: 'What is n8n and why does it change the numbers?',
    a: 'n8n is a workflow automation tool similar to Zapier or Make, but self-hostable and usually far cheaper at scale since it isn\'t billed per task. If you\'re currently paying for Zapier or Make based on monthly task volume, switching the same workflow to n8n often saves the tool subscription cost on top of the labor savings. See the full comparison linked below.',
  },
  {
    q: 'How long does automation setup take?',
    a: 'A simple workflow (1–2 apps, no branching) can be built and tested in a few days. Medium-complexity workflows with conditional logic typically take 1–2 weeks, and mission-critical workflows with error handling and retries can take 2–4 weeks to build and stress-test properly.',
  },
  {
    q: 'Is my workflow too complex or too simple to automate?',
    a: 'Almost any repetitive task that involves moving data between two or more digital tools is a good candidate. The exceptions are tasks that require human judgment calls on every instance, or processes still fully on paper — those usually need a digitization step first before automation makes sense.',
  },
];

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

      <section style={{ background: '#0A0A0A', padding: '0 24px 100px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56, paddingTop: 64 }}>
          <div>
            <h2 style={h2Style}>How this estimate is calculated</h2>
            <p style={pStyle}>
              Labor savings come from a simple formula — hours saved per week × hourly cost × team size, annualized. The
              workflow complexity tier (and therefore the setup cost and payback period) is determined by how many apps
              are involved and whether you need conditional branching or error handling, not a self-reported "easy/medium/hard" label.
            </p>
          </div>

          <BenchmarkTable title="Setup cost & payback by workflow complexity" rows={SAVINGS_ROWS} />

          <div>
            <h2 style={h2Style}>Where automation savings come from</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {SAVINGS_SOURCES.map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: '#fff', marginBottom: 4 }}>{s.label}</p>
                  <p style={pStyle}>{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <FaqSection items={FAQ_ITEMS} />

          <div>
            <h2 style={h2Style}>Related reading</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href="/blog/what-is-n8n-automation" style={linkStyle}>What Is n8n? The Workflow Automation Tool Saving Small Businesses Hours Every Week →</Link>
              <Link href="/blog/n8n-vs-zapier-vs-make" style={linkStyle}>n8n vs Zapier vs Make: Which Automation Tool Should You Use in 2026? →</Link>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: 12 }}>
            <p style={{ ...pStyle, marginBottom: 18 }}>Ready to actually build the workflow?</p>
            <Link href="/services/n8n-automation" className="btn-lime">See automation service</Link>
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
