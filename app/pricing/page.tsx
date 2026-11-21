import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/home/Reveal';
import { PageHero, Split, FaqList, PageClosing } from '@/components/page/Page';

export const metadata: Metadata = {
  title: 'Web Development Pricing: Fixed Quotes from $499',
  description:
    'Fixed, upfront prices for websites, WooCommerce stores, web apps and n8n automation. Starter $499, Growth $999, custom builds quoted. Full feature comparison and FAQ.',
  alternates: { canonical: 'https://mumerkhan.com/pricing' },
};

const PLANS = [
  {
    name: 'Starter',
    price: '$499',
    note: 'One-time',
    tagline: 'A clean, professional web presence - fast.',
    highlight: false,
    cta: { label: 'Get started', href: '/contact' },
    features: [
      { label: 'Pages', value: 'Up to 5' },
      { label: 'Custom design', value: true },
      { label: 'Mobile responsive', value: true },
      { label: 'Contact form', value: true },
      { label: 'CMS (edit content yourself)', value: false },
      { label: 'Blog / news section', value: false },
      { label: 'Custom functionality', value: false },
      { label: 'E-commerce', value: false },
      { label: 'SEO optimisation', value: 'Basic' },
      { label: 'Performance optimisation', value: false },
      { label: 'n8n automation', value: false },
      { label: 'Revisions', value: '2 rounds' },
      { label: 'Post-launch support', value: '7 days' },
      { label: 'Turnaround', value: '~1 week' },
    ],
  },
  {
    name: 'Growth',
    price: '$999',
    note: 'One-time',
    tagline: 'A full website that generates leads and runs itself.',
    highlight: true,
    badge: 'Most Popular',
    cta: { label: 'Get started', href: '/contact' },
    features: [
      { label: 'Pages', value: 'Up to 15' },
      { label: 'Custom design', value: true },
      { label: 'Mobile responsive', value: true },
      { label: 'Contact form', value: true },
      { label: 'CMS (edit content yourself)', value: true },
      { label: 'Blog / news section', value: true },
      { label: 'Custom functionality', value: true },
      { label: 'E-commerce', value: false },
      { label: 'SEO optimisation', value: 'Advanced' },
      { label: 'Performance optimisation', value: true },
      { label: 'n8n automation', value: false },
      { label: 'Revisions', value: '5 rounds' },
      { label: 'Post-launch support', value: '30 days' },
      { label: 'Turnaround', value: '2–3 weeks' },
    ],
  },
  {
    name: 'Scale',
    price: 'Custom',
    note: 'Get a quote',
    tagline: 'Complex builds, web apps, automation, and e-commerce.',
    highlight: false,
    cta: { label: 'Book a call', href: '/contact' },
    features: [
      { label: 'Pages', value: 'Unlimited' },
      { label: 'Custom design', value: true },
      { label: 'Mobile responsive', value: true },
      { label: 'Contact form', value: true },
      { label: 'CMS (edit content yourself)', value: true },
      { label: 'Blog / news section', value: true },
      { label: 'Custom functionality', value: true },
      { label: 'E-commerce', value: true },
      { label: 'SEO optimisation', value: 'Enterprise' },
      { label: 'Performance optimisation', value: true },
      { label: 'n8n automation', value: true },
      { label: 'Revisions', value: 'Unlimited' },
      { label: 'Post-launch support', value: '60 days' },
      { label: 'Turnaround', value: 'Scoped per project' },
    ],
  },
];

const FAQS = [
  { q: 'What\'s included in the price?', a: 'Everything listed in your plan. Design, development, testing, deployment, and post-launch support. Hosting is not included - I recommend Hostinger or DigitalOcean and can set it up as part of the project.' },
  { q: 'Do you charge for revisions?', a: 'Revisions within the agreed scope are included as listed. Changes that alter the project scope (new pages, new features) are quoted separately before work begins.' },
  { q: 'Can I upgrade to a higher plan mid-project?', a: 'Yes - the difference is billed at the point of upgrade. It\'s rare that this happens since we scope everything before work starts.' },
  { q: 'Do you offer payment plans?', a: 'Yes. All projects are split into two payments: 50% upfront to begin work, 50% on delivery. For Scale projects, milestone-based payments can be arranged.' },
  { q: 'What about ongoing maintenance?', a: 'Monthly maintenance retainers (starting at $99/month) cover WordPress/plugin updates, uptime monitoring, security scans, and one hour of content changes. Ask for details when you enquire.' },
  { q: 'Is hosting included?', a: 'Hosting is not included in the one-time fee, but I\'ll recommend a plan, set up the server, and configure everything as part of the project at no extra charge.' },
  { q: 'I have a project that doesn\'t fit these plans. What should I do?', a: 'The Scale plan covers anything non-standard: MERN stack apps, n8n automation, large e-commerce stores, headless WordPress. Book a free call and I\'ll scope it properly.' },
];

function Check({ value }: { value: string | boolean }) {
  if (value === true) return (
    <span className="text-lime font-bold" style={{ fontSize: '1.1rem' }}>✓</span>
  );
  if (value === false) return (
    <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '1rem' }}>–</span>
  );
  return <span className="font-body text-white/70 text-sm">{value}</span>;
}

const ADDONS = [
                { name: 'n8n Automation Setup', price: 'From $350', desc: 'Self-hosted n8n instance + 1 custom workflow built and tested.' },
                { name: 'Monthly Maintenance', price: '$99 / mo', desc: 'Updates, backups, uptime monitoring, and 1h of content changes.' },
                { name: 'Extra Revision Round', price: '$80', desc: 'One additional round of revisions on any deliverable.' },
                { name: 'Figma Design Only', price: 'From $200', desc: 'Figma wireframes and high-fidelity designs, no development.' }
];

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Web development packages',
  itemListElement: PLANS.filter((p) => p.price.startsWith('$')).map((p) => ({
    '@type': 'Offer',
    name: `${p.name} website package`,
    price: p.price.replace(/[^0-9]/g, ''),
    priceCurrency: 'USD',
    description: p.tagline,
    seller: { '@id': 'https://mumerkhan.com/#person' },
  })),
};

const cell = (v: string | boolean) => (v === true ? 'Included' : v === false ? '–' : v);

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[{ href: '/pricing', label: 'Pricing' }]}
          title={['Plain prices,', 'fixed quotes']}
          image={{ src: '/assets/gallery/v1-campers.webp', w: 1280, h: 720, alt: 'V1 Campers booking website on desktop, laptop and phone' }}
          lead="Pick the plan that fits, or tell me the project and I’ll quote it. Half up front, half at launch, nothing hidden."
        >
          <Link href="/contact" className="btn-lime">Get a fixed quote</Link>
          <Link href="/tools/website-cost-calculator" className="text-[16px] text-bone underline underline-offset-[6px] decoration-[#9FC7B8] hover:text-jade">Estimate your site first</Link>
        </PageHero>

        <section aria-label="Plans" className="mx-auto max-w-[1440px] px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-2">
          {PLANS.map((p, i) => {
            const lead = 'badge' in p && p.badge;
            return (
              <Reveal key={p.name} data-delay={String(i)} className="flex flex-col p-7 md:p-9" style={{ background: lead ? 'var(--accent)' : 'var(--surface)', color: lead ? 'var(--accent-ink)' : 'var(--ink)' }}>
                <h2 className="text-[22px] font-medium">{p.name}</h2>
                <p className="mt-6 tabular-nums" style={{ fontSize: 'clamp(2.75rem, 4.4vw, 4rem)', fontWeight: 600, lineHeight: 1 }}>{p.price}</p>
                <p className="mt-2 text-[15px]" style={{ opacity: 0.8 }}>{p.note}{lead ? ', and the plan most clients choose' : ''}</p>
                <p className="mt-6 text-[17px] leading-[1.5]">{p.tagline}</p>
                <ul className="mt-6 grid gap-1.5 text-[16px]">
                  {p.features.filter((f) => f.value !== false).slice(0, 7).map((f) => (
                    <li key={f.label}>{f.value === true ? f.label : `${f.label}: ${f.value}`}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link href={p.cta.href} className={lead ? 'btn-dark' : 'btn-lime'}>{p.cta.label}</Link>
                </div>
              </Reveal>
            );
          })}
        </section>

        <Split id="compare" title="Compare plans" intro="Everything each plan includes, line by line.">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-[16px]">
              <thead>
                <tr style={{ borderBottom: '1px solid #33403C' }}>
                  <th scope="col" className="py-3 pr-4 font-normal" style={{ color: 'var(--muted)' }}>Feature</th>
                  {PLANS.map((p) => <th key={p.name} scope="col" className="py-3 px-4 font-medium text-bone">{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {PLANS[0].features.map((f, row) => (
                  <tr key={f.label} style={{ borderBottom: '1px solid #26302D' }}>
                    <th scope="row" className="py-3 pr-4 font-normal text-bone">{f.label}</th>
                    {PLANS.map((p) => <td key={p.name} className="py-3 px-4" style={{ color: '#C4C7BF' }}>{cell(p.features[row].value)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Split>

        <Split id="addons" title="Add-ons & care" tone="surface">
          <ul className="grid md:grid-cols-2 gap-x-16 gap-y-6">
            {ADDONS.map((a) => (
              <li key={a.name}>
                <div className="flex items-baseline justify-between gap-4 text-[19px] text-bone">
                  <span>{a.name}</span>
                  <span className="tabular-nums whitespace-nowrap">{a.price}</span>
                </div>
                <p className="mt-1 text-[16px]" style={{ color: 'var(--muted)' }}>{a.desc}</p>
              </li>
            ))}
          </ul>
        </Split>

        <Split id="faq" title="Pricing questions">
          <FaqList faqs={FAQS} />
        </Split>

        <PageClosing sentence="Not sure which plan fits? Describe the project and I’ll recommend the cheapest option that does the job." />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
    </>
  );
}
