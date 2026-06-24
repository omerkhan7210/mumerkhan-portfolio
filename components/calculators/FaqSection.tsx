/* Server component — no client JS needed. <details>/<summary> gives a
   fully crawlable, accessible accordion, and the FAQPage JSON-LD here
   is what's actually eligible for Google's FAQ rich-result snippets. */

export type FaqItem = { q: string; a: string };

export default function FaqSection({ items, title = 'Frequently asked questions' }: { items: FaqItem[]; title?: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 style={h2Style}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          <details key={item.q} style={cardStyle} open={i === 0}>
            <summary style={summaryStyle}>{item.q}</summary>
            <p style={answerStyle}>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
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

const cardStyle: React.CSSProperties = {
  borderRadius: 14,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.02)',
  padding: '4px 20px',
};

const summaryStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: '0.95rem',
  color: '#fff',
  padding: '16px 0',
  cursor: 'pointer',
  listStyle: 'none',
};

const answerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.88rem',
  color: 'rgba(255,255,255,0.55)',
  lineHeight: 1.7,
  paddingBottom: 18,
};
