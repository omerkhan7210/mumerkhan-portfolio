import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RedesignHero from '@/components/redesign/RedesignHero';
import RedesignTrustStrip from '@/components/redesign/RedesignTrustStrip';
import RedesignProcess from '@/components/redesign/RedesignProcess';
import RedesignProof from '@/components/redesign/RedesignProof';
import RedesignFAQ from '@/components/redesign/RedesignFAQ';
import ConceptRequestForm from '@/components/redesign/ConceptRequestForm';
import { getTradeCopy, TRADE_OPTIONS } from '@/components/redesign/tradeCopy';
import { getOfferCopy } from '@/components/redesign/offerCopy';

export const metadata: Metadata = {
  title: 'Your Free Homepage Concept | Muhammad Umer Khan',
  description:
    "I already built you a homepage concept — see it first, no payment or obligation. Website redesigns built specifically for HVAC, plumbing, roofing, and cleaning businesses.",
  alternates: {
    canonical: 'https://mumerkhan.com/redesign',
  },
  openGraph: {
    title: 'Your Free Homepage Concept | Muhammad Umer Khan',
    description:
      'Website redesigns built specifically for trade & home service businesses — HVAC, plumbing, roofing, cleaning. See your free concept first.',
    url: 'https://mumerkhan.com/redesign',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Free homepage concept for trade & home service businesses' }],
  },
};

/* Cold-email links append ?trade=hvac&offer=quote-path&company=Acme+HVAC
   so this page always matches what was actually promised in that specific
   email (quote-path fix / after-hours capture / homepage concept — see
   the outreach playbook) instead of assuming one fixed pitch. Resolved
   server-side so nothing here needs a client-side searchParams hook. */
export default function RedesignLandingPage({
  searchParams,
}: {
  searchParams: { trade?: string; offer?: string; company?: string };
}) {
  const trade = getTradeCopy(searchParams.trade);
  const offer = getOfferCopy(searchParams.offer);
  const company = searchParams.company;
  const presetTrade = TRADE_OPTIONS.some((t) => t.value === searchParams.trade?.toLowerCase())
    ? (searchParams.trade as string).toLowerCase()
    : '';

  return (
    <>
      <Header />

      <RedesignHero trade={trade} offer={offer} company={company} />
      <RedesignTrustStrip />
      <RedesignProcess offer={offer} />
      <RedesignProof />
      <RedesignFAQ offer={offer} />

      {/* ── Request form ──────────────────────────────────── */}
      <section id="concept-form" className="py-24 md:py-28 bg-ink border-t border-white/[0.04]">
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 28px' }}>
          <span className="label-tag">Last Step</span>
          <h2
            className="font-sans font-bold text-white mt-3 mb-4"
            style={{ fontSize: 'clamp(1.8rem,4.5vw,3rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            {offer.formHeading}.
          </h2>
          <p className="font-body text-sm mb-10" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 460 }}>
            {offer.formIntro}
          </p>
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20,
              padding: 'clamp(24px,5vw,40px)',
            }}
          >
            <ConceptRequestForm offer={offer} presetTrade={presetTrade} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
