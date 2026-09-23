import Link from 'next/link';
import type { TradeCopy } from './tradeCopy';
import type { OfferCopy } from './offerCopy';

export default function RedesignHero({
  trade,
  offer,
  company,
}: {
  trade: TradeCopy;
  offer: OfferCopy;
  company?: string;
}) {
  return (
    <section
      className="relative bg-ink bg-grid-pattern overflow-hidden"
      style={{ paddingTop: 'clamp(120px,16vw,180px)', paddingBottom: 'clamp(64px,8vw,100px)' }}
    >
      <div
        style={{
          position: 'absolute',
          right: -120,
          top: '20%',
          width: 640,
          height: 640,
          background: 'radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
        <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>
          Built to fix your {offer.eyebrowNoun} — {trade.short}
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            color: '#ffffff',
            fontSize: 'clamp(2.4rem, 6.5vw, 5.2rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            marginTop: 12,
            maxWidth: 900,
          }}
        >
          I already {offer.verb}{company ? ` ${company}'s` : ' your'}{' '}
          <em className="not-italic" style={{ color: '#C8FF00' }}>
            {offer.noun}.
          </em>
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
            maxWidth: 560,
            lineHeight: 1.7,
            marginTop: 24,
          }}
        >
          {offer.heroSub}
        </p>

        <div className="flex items-center gap-4 flex-wrap" style={{ marginTop: 36 }}>
          <a href="#concept-form" className="btn-lime text-base">
            {offer.ctaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <a href="#how-it-works" className="btn-outline text-base">
            See how this works
          </a>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.3)',
            marginTop: 20,
          }}
        >
          No payment, no obligation — see{' '}
          <Link href="/work" style={{ color: 'rgba(200,255,0,0.6)' }}>
            real trade &amp; local service rebuilds
          </Link>{' '}
          below first.
        </p>
      </div>
    </section>
  );
}
