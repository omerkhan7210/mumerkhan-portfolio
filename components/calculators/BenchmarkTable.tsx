/* Static, crawlable pricing/savings table — this is the kind of content
   block Google pulls into featured snippets for "how much does X cost"
   queries, separate from the interactive calculator itself. */

export type BenchmarkRow = { label: string; value: string; note: string };

export default function BenchmarkTable({ rows, title }: { rows: BenchmarkRow[]; title: string }) {
  return (
    <div>
      <h2 style={h2Style}>{title}</h2>
      <div style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        {rows.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(140px, 1fr) auto',
              gap: 16,
              padding: '16px 20px',
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
            }}
          >
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{row.label}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{row.note}</p>
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: '#C8FF00', alignSelf: 'center', whiteSpace: 'nowrap' }}>
              {row.value}
            </p>
          </div>
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
