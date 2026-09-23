'use client';

import { useEffect, useRef } from 'react';
import type { OfferCopy } from './offerCopy';

function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('sr-visible');
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function RedesignProcess({ offer }: { offer: OfferCopy }) {
  const headRef = useScrollReveal();
  const cardsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      n: '01',
      title: 'I review your current site',
      body:
        'Load speed, mobile layout, and — most importantly — how many taps it takes someone to call or request a quote. Most trade sites lose jobs right there, before design even matters.',
    },
    {
      n: '02',
      title: offer.stepTwoTitle,
      body: offer.stepTwoBody,
    },
    {
      n: '03',
      title: 'You decide — no pressure either way',
      body:
        `Like it? We talk about building it into the full site. Don't like it, or the timing's wrong? Keep the ${offer.noun} anyway. I'm not chasing a signature, I'm showing you the work first.`,
    },
  ];

  useEffect(() => {
    const root = cardsRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.step-card'));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement);
            setTimeout(() => {
              (entry.target as HTMLElement).style.opacity = '1';
              (entry.target as HTMLElement).style.transform = 'translateY(0)';
            }, idx * 120);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    cards.forEach((c) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(28px)';
      c.style.transition = 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)';
      obs.observe(c);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 md:py-28 bg-ink-2 border-t border-white/[0.04]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div ref={headRef} className="sr mb-14">
          <span className="label-tag">How This Works</span>
          <h2
            className="font-sans font-bold text-white mt-3"
            style={{ fontSize: 'clamp(1.8rem,4.5vw,3.2rem)', lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: 640 }}
          >
            The free work comes first. The pitch comes after.
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.n}
              className="step-card rounded-2xl p-7"
              style={{ background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span
                className="font-body text-xs tabular-nums"
                style={{ color: 'rgba(200,255,0,0.6)' }}
              >
                {step.n}
              </span>
              <h3 className="font-sans font-semibold text-white mt-3 mb-3" style={{ fontSize: '1.1rem' }}>
                {step.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
