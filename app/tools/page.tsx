import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Free Tools — Website Cost & Automation ROI Calculators',
  description:
    'Free interactive tools: a website cost calculator and an automation ROI calculator. Get instant estimates with no email required.',
  alternates: { canonical: 'https://mumerkhan.com/tools' },
};

const TOOLS = [
  {
    href: '/tools/website-cost-calculator',
    title: 'Website Cost Calculator',
    description: 'Get an instant price range for your website project based on scope, features, and timeline.',
    accent: '#C8FF00',
  },
  {
    href: '/tools/automation-roi-calculator',
    title: 'Automation ROI Calculator',
    description: 'See how many hours and dollars a workflow automation could save your business every year.',
    accent: '#60A5FA',
  },
];

export default function ToolsPage() {
  return (
    <>
      <Header />
      <section
        className="relative bg-ink bg-grid-pattern overflow-hidden"
        style={{ paddingTop: 'clamp(120px, 16vw, 180px)', paddingBottom: 'clamp(48px, 6vw, 72px)' }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>
            Free Tools
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: '#ffffff',
              fontSize: 'clamp(2.4rem, 7vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginTop: 12,
            }}
          >
            Quick answers,<br /><em className="not-italic" style={{ color: '#C8FF00' }}>no sales call.</em>
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
            Free interactive calculators to help you plan a project before you ever talk to me.
          </p>
        </div>
      </section>

      <section style={{ background: '#0A0A0A', padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              style={{
                display: 'block',
                padding: '32px 28px',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: tool.accent,
                  marginBottom: 18,
                }}
              />
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1.3rem',
                  color: '#fff',
                  letterSpacing: '-0.01em',
                  marginBottom: 10,
                }}
              >
                {tool.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                {tool.description}
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 18,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: tool.accent,
                }}
              >
                Try it free →
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
