'use client';

import { useState } from 'react';
import type { OfferCopy } from './offerCopy';

function buildFaqs(offer: OfferCopy) {
  return [
    {
      q: `Is the free ${offer.noun} actually free?`,
      a: `Yes — no card, no deposit, no catch. I ${offer.verb} it before we talk pricing because it's easier to judge real work than a pitch. If it's not for you, keep it either way.`,
    },
    {
      q: 'Will you touch my live site to build it?',
      a: `No. The ${offer.noun} is a separate mockup — your live site stays exactly as it is unless and until you decide to move forward. There's zero risk to your current site or rankings.`,
    },
    {
      q: `What if I don't like the ${offer.noun}?`,
      a: "Then we don't work together, and that's fine. I'd rather you see the actual work and pass than commit to something you haven't seen. No follow-up pressure.",
    },
    {
      q: `How long does the free ${offer.noun} take?`,
      a: "Usually a few days. It's built around your actual business, not a five-minute template swap — so I only send it once it's actually worth your time.",
    },
    {
      q: "I'm not technical — will I be able to manage the site myself?",
      a: 'Yes. Every build includes a screen-recorded walkthrough so you can update text, photos, and service pages without calling a developer for every small change.',
    },
    {
      q: 'Do you only work with businesses in one region?',
      a: "No — I build for trade and home service businesses across the US, UK, Australia, and beyond. Time zones aren't a blocker; most of my client communication happens async anyway.",
    },
  ];
}

function FaqItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '20px 4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          className="font-sans font-semibold"
          style={{ fontSize: '1rem', color: open ? '#C8FF00' : '#ffffff', transition: 'color 0.25s' }}
        >
          {q}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            flexShrink: 0,
            color: open ? '#C8FF00' : 'rgba(255,255,255,0.3)',
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), color 0.25s',
          }}
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p
          className="font-body text-sm leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)', paddingBottom: 22, paddingRight: 24 }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

export default function RedesignFAQ({ offer }: { offer: OfferCopy }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = buildFaqs(offer);

  return (
    <section className="py-24 md:py-28 bg-ink-2 border-t border-white/[0.04]">
      <div className="max-w-[760px] mx-auto px-6">
        <span className="label-tag">Fair Questions</span>
        <h2
          className="font-sans font-bold text-white mt-3 mb-12"
          style={{ fontSize: 'clamp(1.8rem,4.5vw,3rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
        >
          Before you scroll past this.
        </h2>

        <div>
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              open={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
