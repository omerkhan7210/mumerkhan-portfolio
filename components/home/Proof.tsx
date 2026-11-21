import Reveal from './Reveal';

const FACTS = [
  { k: '100%', v: 'Job Success Score on Upwork, kept across every contract' },
  { k: '5.0', v: 'average rating from verified client reviews' },
  { k: '6 yrs', v: 'building WordPress, WooCommerce, React and automation' },
  { k: '< 4 h', v: 'typical reply time on weekdays' },
];

/* Bars standing on the edge: the published case studies by year, drawn in HTML. */
export default function Proof() {
  return (
    <section aria-labelledby="proof-title" className="relative mt-24 md:mt-40" style={{ background: 'var(--surface)' }}>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-20 md:pt-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-6">
          <p className="font-wide text-bone tabular-nums" style={{ fontSize: 'clamp(6rem, 13vw, 12rem)', lineHeight: 0.85 }}>
            80+
          </p>
          <h2 id="proof-title" className="mt-5 text-bone" style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.75rem)', lineHeight: 1.25 }}>
            Websites shipped for clients since 2020
          </h2>
        </Reveal>
        <dl className="lg:col-span-6 grid grid-cols-2 gap-x-8 gap-y-8 self-end">
          {FACTS.map((f, i) => (
            <Reveal key={f.k} data-delay={String(i % 4)}>
              <dt className="text-bone tabular-nums" style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.25rem)', fontWeight: 600 }}>{f.k}</dt>
              <dd className="mt-1 text-[16px] max-w-[30ch]" style={{ color: 'var(--muted)' }}>{f.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="h-20 md:h-28" />
    </section>
  );
}
