import Link from 'next/link';
import Reveal from './Reveal';

/* ───────── How it works: photographs down a diagonal ───────── */
const STAGES = [
  {
    lead: 'On the first call,',
    text: 'we agree what the site has to do, who it is for and how you will measure it. You get a fixed quote and a dated plan within 24 hours, not a vague estimate.',
    img: '/assets/site/process-1.webp', w: 900, h: 1200,
    alt: 'Design mockups for a yoga studio website, desktop pages tilted in perspective',
  },
  {
    lead: 'A week later,',
    text: 'the design is live on a private staging link. You click through real pages on your own phone, and every comment is fixed in the build, not in a PDF.',
    img: '/assets/site/process-2.webp', w: 1000, h: 1000,
    alt: 'Kanalfuchs drain service website pages in development',
  },
  {
    lead: 'By launch day,',
    text: 'redirects, analytics, schema and speed are done and checked. You get a recorded walkthrough so your team can edit everything, plus a fixed support window after launch (7 to 60 days, by plan).',
    img: '/assets/site/process-3.webp', w: 1600, h: 1000,
    alt: 'V1 Campers booking website shown on desktop, laptop and phone',
  },
];

export function Process() {
  return (
    <section aria-labelledby="process-title" className="mx-auto max-w-[1440px] px-5 md:px-10 pt-28 md:pt-48">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6">
        <Reveal as="figure" className="lg:col-span-4 lg:row-start-1">
          <img src={STAGES[0].img} alt={STAGES[0].alt} width={STAGES[0].w} height={STAGES[0].h} loading="lazy" className="w-full h-auto" style={{ filter: 'brightness(0.85) contrast(1.05)' }} />
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-6 lg:row-start-1 mt-8 lg:mt-0">
          <h2 id="process-title" className="text-bone font-light" style={{ fontSize: 'clamp(2.25rem, 4vw, 4rem)', lineHeight: 1.02, letterSpacing: '-0.02em' }}>
            How a project runs
          </h2>
          <Reveal as="p" className="mt-10 text-[17px] leading-[1.6] text-bone max-w-[36ch]">
            <strong className="font-semibold">{STAGES[0].lead}</strong> {STAGES[0].text}
          </Reveal>
        </div>

        <Reveal as="figure" className="lg:col-span-3 lg:col-start-6 mt-16 lg:mt-[220px] w-[62%] ml-auto lg:w-full lg:ml-0">
          <img src={STAGES[1].img} alt={STAGES[1].alt} width={STAGES[1].w} height={STAGES[1].h} loading="lazy" className="w-full h-auto" style={{ filter: 'brightness(0.85) contrast(1.05)' }} />
        </Reveal>
        <Reveal as="p" className="lg:col-span-3 lg:col-start-9 lg:mt-[220px] mt-5 pl-[38%] lg:pl-0 text-[17px] leading-[1.6] text-bone max-w-[36ch]">
          <strong className="font-semibold">{STAGES[1].lead}</strong> {STAGES[1].text}
        </Reveal>

        <Reveal as="p" className="lg:col-span-3 lg:col-start-4 lg:row-start-3 lg:mt-[180px] order-last lg:order-none mt-5 text-[17px] leading-[1.6] text-bone max-w-[36ch] lg:text-right lg:justify-self-end">
          <strong className="font-semibold">{STAGES[2].lead}</strong> {STAGES[2].text}
        </Reveal>
        <Reveal as="figure" className="lg:col-span-5 lg:col-start-8 lg:row-start-3 mt-16 lg:mt-[180px] w-[78%] lg:w-full">
          <img src={STAGES[2].img} alt={STAGES[2].alt} width={STAGES[2].w} height={STAGES[2].h} loading="lazy" className="w-full h-auto" style={{ filter: 'brightness(0.85) contrast(1.05)' }} />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── Testimonials: one lead voice, two in the corners ───────── */
// Verbatim excerpts of verified Upwork reviews (also used on the previous homepage).
const LEAD = {
  quote: 'The Figma to WordPress implementation was pixel-perfect. The site loads fast, looks polished, and is easy for our team to update.',
  name: 'Dr. Marcus H.', role: 'Company Director, medical equipment company, Germany',
};
const CORNERS = [
  { quote: 'Fast turnaround, zero back-and-forth on revisions. Just clean work delivered exactly as described.', name: 'Tyler W.', role: 'CEO, United States' },
  { quote: 'Delivered the Figma-to-Elementor transfer exactly as specified, on time, with zero issues after handoff.', name: 'Lena P.', role: 'Digital agency owner, Netherlands' },
];

export function Quotes() {
  return (
    <section aria-label="What clients say" className="mt-28 md:mt-48 grid min-h-[100svh] grid-rows-[auto_1fr_auto] px-5 md:px-10 py-16 md:py-24" style={{ background: '#121715' }}>
      <Reveal as="figure" className="mx-auto max-w-[1440px] w-full">
        <blockquote className="lg:mx-auto lg:max-w-[60vw] lg:text-center text-bone font-light" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.25rem)', lineHeight: 1.3 }}>
          “{LEAD.quote}”
        </blockquote>
        <figcaption className="mt-6 lg:text-center text-[16px]" style={{ color: 'var(--muted)' }}>
          {LEAD.name}, {LEAD.role}
        </figcaption>
      </Reveal>
      <div className="min-h-[96px]" />
      <div className="mx-auto max-w-[1440px] w-full grid gap-12 md:grid-cols-12">
        {CORNERS.map((c, i) => (
          <Reveal as="figure" key={c.name} data-delay={String(i)} className={i === 0 ? 'md:col-span-3' : 'md:col-span-3 md:col-start-10 ml-[25%] md:ml-0'}>
            <blockquote className="text-[17px] leading-[1.5] text-bone">“{c.quote}”</blockquote>
            <figcaption className="mt-3 text-[15px]" style={{ color: 'var(--muted)' }}>
              {c.name}
              <br />
              {c.role}
            </figcaption>
          </Reveal>
        ))}
      </div>
      <p className="mx-auto max-w-[1440px] w-full mt-14 text-[15px]" style={{ color: 'var(--muted)' }}>
        From verified Upwork reviews.{' '}
        <a href="https://www.upwork.com/freelancers/muhammadumerk5" target="_blank" rel="noopener noreferrer" className="text-bone underline underline-offset-4 hover:text-jade">
          Read them all on Upwork
        </a>
      </p>
    </section>
  );
}

/* ───────── Pricing set like a menu ───────── */
const MENU = [
  {
    group: 'Websites',
    items: [
      { name: 'Starter site', price: '$499', desc: 'Up to 5 pages in WordPress, contact form, on-page SEO. 7–10 days.' },
      { name: 'Growth site', price: '$999', desc: 'Up to 15 pages, blog, store or booking, analytics, speed work. 2–3 weeks.' },
      { name: 'Web app or custom build', price: 'Quoted', desc: 'Next.js or MERN, integrations, logins and dashboards, scoped together.' },
    ],
  },
  {
    group: 'Add-ons & care',
    items: [
      { name: 'n8n automation', price: 'from $350', desc: 'Self-hosted n8n plus one workflow, built and tested end to end.' },
      { name: 'Figma design only', price: 'from $200', desc: 'Wireframes and high-fidelity pages, ready for any developer.' },
      { name: 'Monthly care plan', price: '$99/mo', desc: 'Updates, backups, uptime checks and an hour of edits each month.' },
    ],
  },
];

export function PriceMenu() {
  return (
    <section aria-labelledby="pricing-title" className="mx-auto max-w-[1440px] px-5 md:px-10 pt-28 md:pt-48 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10">
      <div className="lg:col-span-3">
        <h2 id="pricing-title" className="text-bone" style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)', lineHeight: 1.1, fontWeight: 500 }}>
          Plain prices
        </h2>
        <p className="mt-4 text-[16px] max-w-[30ch]" style={{ color: 'var(--muted)' }}>
          Fixed quotes, half up front and half at launch. Not sure which fits?{' '}
          <Link href="/tools/website-cost-calculator" className="text-bone underline underline-offset-4 hover:text-jade">Estimate your site</Link>.
        </p>
      </div>
      <div className="lg:col-span-8 lg:col-start-5 grid grid-cols-1 md:grid-cols-2 gap-x-16">
        {MENU.map((g) => (
          <Reveal key={g.group} className="mt-2">
            <h3 className="text-bone font-medium" style={{ fontSize: 'clamp(1.25rem, 1.6vw, 1.5rem)' }}>{g.group}</h3>
            <ul className="mt-6 grid gap-[22px]">
              {g.items.map((it) => (
                <li key={it.name}>
                  <div className="flex items-baseline justify-between gap-4 text-[19px] text-bone">
                    <span>{it.name}</span>
                    <span className="tabular-nums whitespace-nowrap">{it.price}</span>
                  </div>
                  <p className="mt-1 text-[16px] max-w-[36ch]" style={{ color: 'var(--muted)' }}>{it.desc}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        <div className="md:col-span-2 mt-10">
          <Link href="/pricing" className="btn-outline">Full pricing and what’s included</Link>
        </div>
      </div>
    </section>
  );
}

/* ───────── FAQ beside a tall photograph ───────── */
export const FAQS = [
  {
    q: 'Why hire a freelance web developer instead of an agency?',
    a: 'You talk to the person writing the code, so nothing is lost between account manager, designer and developer. You pay for the build, not the office, and projects usually start within a week.',
  },
  {
    q: 'WordPress or a custom Next.js site: which should I choose?',
    a: 'WordPress suits most marketing sites and stores, because your team can edit everything and the plugin ecosystem is huge. Next.js suits apps, heavy integrations and sites where speed is the product. I build both and will recommend the cheaper one that does the job.',
  },
  {
    q: 'How long does a website take?',
    a: 'A 5-page site takes 7–10 days. A 10–15 page site with a blog or store takes 2–3 weeks. Web apps are scoped together and usually run 4–8 weeks.',
  },
  {
    q: 'Will my Google rankings drop if I redesign?',
    a: 'Not if the move is planned. I map every old URL to its new page with 301 redirects, keep the content that ranks, and resubmit the sitemap in Search Console on launch day.',
  },
  {
    q: 'What can n8n automation do for a small business?',
    a: 'It connects the tools you already use. Typical jobs: new enquiries go straight to your CRM and phone, quotes and invoices are created automatically, follow-up emails go out on time, and a weekly report lands in your inbox.',
  },
  {
    q: 'Do you work with clients outside Pakistan?',
    a: 'Almost all of my clients are in the US, UK, EU and Australia. I overlap with UK and EU working hours, keep a few hours of US overlap, and reply within four hours on weekdays.',
  },
];

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="mt-28 md:mt-48 relative" style={{ background: 'var(--surface)' }}>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-14 pb-20 md:pb-28">
        <div className="lg:col-span-5 lg:order-1 order-2 pt-4 lg:pt-28">
          <h2 id="faq-title" className="text-bone" style={{ fontSize: 'clamp(1.875rem, 2.8vw, 2.75rem)', lineHeight: 1.1, fontWeight: 500 }}>
            Questions, answered
          </h2>
          <ul className="mt-6 grid gap-1 text-[18px] text-bone">
            <li>Based in Karachi, working with clients worldwide</li>
            <li>Replies within 4 hours, Monday to Friday</li>
            <li>Fixed quotes, 50% up front, 50% at launch</li>
          </ul>
          <div className="mt-10 grid gap-7">
            {FAQS.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[20px] leading-snug text-bone [&::-webkit-details-marker]:hidden min-h-[44px]">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="relative mt-3 h-2.5 w-2.5 flex-none transition-transform duration-300 group-open:rotate-180">
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l6 6 6-6" /></svg>
                  </span>
                </summary>
                <p className="mt-3 text-[17px] leading-[1.6] max-w-[58ch]" style={{ color: '#C4C7BF' }}>{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link href="/contact" className="btn-lime">Ask me directly</Link>
            <Link href="/about" className="text-[16px] text-bone underline underline-offset-[6px] decoration-[#9FC7B8] hover:text-jade">About me</Link>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:order-2 order-1 relative">
          <Reveal as="figure" className="relative lg:-mt-20 mt-0" >
            <div className="aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden flex items-end justify-center" style={{ background: '#2A3532' }}>
              <img
                src="/assets/me/umer-seated.webp"
                alt="Muhammad Umer Khan, freelance web developer"
                width={1080}
                height={1371}
                loading="lazy"
                className="h-[92%] w-auto object-contain object-bottom"
              />
            </div>
            <img
              src="/assets/site/arch-893.webp"
              alt=""
              width={2000}
              height={1250}
              loading="lazy"
              className="absolute -bottom-10 right-0 lg:right-auto lg:-left-10 w-[38%] lg:w-[33%] aspect-square object-cover"
              style={{ filter: 'brightness(0.7) grayscale(1)' }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── Closing: a plain sentence, one action ───────── */
export function Closing() {
  return (
    <section aria-label="Start a project" className="mx-auto max-w-[1440px] px-5 md:px-10 pt-[24svh] pb-[18svh]">
      <Reveal>
        <p className="text-bone max-w-[34ch]" style={{ fontSize: 'clamp(1.25rem, 1.6vw, 1.375rem)', lineHeight: 1.45 }}>
          Tell me what your website should be doing for you, and I’ll reply today with an honest plan and a fixed price.
        </p>
        <div className="mt-6 flex flex-wrap items-baseline gap-6">
          <Link href="/contact" className="btn-lime !py-3 !px-[18px] text-[15px]">Book a free call</Link>
          <a href="mailto:omerfarooqkhan7210@gmail.com?subject=New%20website%20project" className="text-[15px] text-bone underline underline-offset-4 hover:text-jade">
            or email me
          </a>
        </div>
      </Reveal>
    </section>
  );
}
