/* Offer-personalization for the /redesign landing page.
   Per the outreach playbook, "homepage concept" is only one of several
   soft-offers — the two recommended defaults are the quote-path fix and
   the after-hours capture flow. Cold-email links append ?offer=quote-path
   (etc.) so this page always matches whichever offer was actually
   promised in that specific email, instead of assuming a concept. */

export type OfferKey = 'quote-path' | 'after-hours' | 'concept';

export type OfferCopy = {
  key: OfferKey;
  /** Used in the hero eyebrow: "Built to fix your {eyebrowNoun}" */
  eyebrowNoun: string;
  /** Hero headline: "I already {verb} your {noun}." */
  verb: string;
  noun: string;
  heroSub: string;
  stepTwoTitle: string;
  stepTwoBody: string;
  formHeading: string;
  formIntro: string;
  ctaLabel: string;
  /** Shown after the form is submitted, describing what happens next */
  confirmationNoun: string;
};

export const OFFER_COPY: Record<OfferKey, OfferCopy> = {
  'quote-path': {
    key: 'quote-path',
    eyebrowNoun: 'quote path',
    verb: 'fixed',
    noun: 'quote path',
    heroSub:
      "If you clicked through from my email, this is that page. A real, working redesign of the path from your homepage to a booked quote — fewer taps, a real mobile call button, no dead ends. Free to look at, free to keep either way.",
    stepTwoTitle: 'I sketch a fixed quote path',
    stepTwoBody:
      "A cleaner, faster path to call or request a quote — mobile sticky call button, shorter form, urgent vs. non-urgent. This is the fix from the email, built for real.",
    formHeading: 'Get your free quote-path fix',
    formIntro:
      "Tell me who you are and where to find your current site — I'll send over the fixed quote path directly.",
    ctaLabel: 'Get my free quote-path fix',
    confirmationNoun: 'quote-path fix',
  },
  'after-hours': {
    key: 'after-hours',
    eyebrowNoun: 'after-hours leads',
    verb: 'outlined',
    noun: 'after-hours capture flow',
    heroSub:
      "If you clicked through from my email, this is that page. A short capture flow for nights and weekends — name, area, phone, urgency — so enquiries don't disappear when nobody answers. Free to look at, free to keep either way.",
    stepTwoTitle: 'I outline an after-hours capture flow',
    stepTwoBody:
      "A simple chat or lead flow that routes emergencies toward a call and stores the rest for a morning callback. This is the flow from the email, mapped out for real.",
    formHeading: 'Get your free after-hours flow',
    formIntro:
      "Tell me who you are and where to find your current site — I'll send over the after-hours flow directly.",
    ctaLabel: 'Get my free after-hours flow',
    confirmationNoun: 'after-hours capture flow',
  },
  concept: {
    key: 'concept',
    eyebrowNoun: 'homepage',
    verb: 'built',
    noun: 'homepage concept',
    heroSub:
      "If you clicked through from my email, this is that page. A real homepage design built around how your business actually gets booked: fast to load, obvious to call, and built so an enquiry doesn't get lost. No payment, no obligation.",
    stepTwoTitle: 'I build a free homepage concept',
    stepTwoBody:
      'A real, working homepage design for your business — not a template with your logo dropped in. This is the concept from the email. It costs you nothing to see it.',
    formHeading: 'Get your free concept',
    formIntro:
      "Tell me who you are and where to find your current site — I'll send over your concept directly.",
    ctaLabel: 'Get my free concept',
    confirmationNoun: 'homepage concept',
  },
};

export function getOfferCopy(offer?: string | null): OfferCopy {
  if (offer && offer.toLowerCase() in OFFER_COPY) {
    return OFFER_COPY[offer.toLowerCase() as OfferKey];
  }
  return OFFER_COPY.concept;
}

export const OFFER_OPTIONS: { value: OfferKey; label: string }[] = [
  { value: 'quote-path', label: 'Quote-Path Fix' },
  { value: 'after-hours', label: 'After-Hours Capture' },
  { value: 'concept', label: 'Homepage Concept' },
];
