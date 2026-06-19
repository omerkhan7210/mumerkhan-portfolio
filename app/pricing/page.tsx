import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pricing — Transparent Web Development Rates',
  description:
    'Clear, upfront pricing for web development, WordPress, MERN stack, and automation projects. No hidden costs. View full feature comparison and FAQ.',
  alternates: { canonical: 'https://mumerkhan.com/pricing' },
  openGraph: {
    title: 'Pricing | Umer Khan — Full Stack Developer',
    description: 'Transparent web development pricing. Starter $499, Growth $999, Scale custom. Full feature comparison included.',
    url: 'https://mumerkhan.com/pricing',
  },
};

const PLANS = [
  {
    name: 'Starter',
    price: '$499',
    note: 'One-time',
    tagline: 'A clean, professional web presence — fast.',
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
  { q: 'What\'s included in the price?', a: 'Everything listed in your plan. Design, development, testing, deployment, and post-launch support. Hosting is not included — I recommend Hostinger or DigitalOcean and can set it up as part of the project.' },
  { q: 'Do you charge for revisions?', a: 'Revisions within the agreed scope are included as listed. Changes that alter the project scope (new pages, new features) are quoted separately before work begins.' },
  { q: 'Can I upgrade to a higher plan mid-project?', a: 'Yes — the difference is billed at the point of upgrade. It\'s rare that this happens since we scope everything before work starts.' },
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

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="bg-ink min-h-screen">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(200,255,0,0.06) 0%, transparent 60%)',
          }} />
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span className="font-body text-muted text-xs tracking-[0.12em] uppercase">No hidden fees</span>
            </div>
            <h1
              className="font-sans font-extrabold text-white mb-5"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
            >
              Pricing that makes sense
            </h1>
            <p className="font-body text-muted mx-auto max-w-lg" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.1rem)', lineHeight: 1.7 }}>
              Every price is fixed upfront. No billable-hours surprises, no scope-creep invoices. Pick a plan or book a call to get a custom quote.
            </p>
          </div>
        </section>

        {/* ── Plan cards ────────────────────────────────────── */}
        <section className="pb-16">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className="flex flex-col p-7 rounded-2xl border relative"
                  style={{
                    borderColor: plan.highlight ? 'rgba(200,255,0,0.35)' : 'rgba(255,255,255,0.08)',
                    background: plan.highlight ? 'rgba(200,255,0,0.04)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  {plan.badge && (
                    <div
                      className="absolute -top-3 left-6 font-body text-ink text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: '#C8FF00', letterSpacing: '0.06em' }}
                    >
                      {plan.badge}
                    </div>
                  )}
                  <p className="font-body text-muted text-xs tracking-[0.1em] uppercase mb-3">{plan.name}</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="font-sans font-extrabold text-white"
                      style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', letterSpacing: '-0.04em' }}
                    >
                      {plan.price}
                    </span>
                    <span className="font-body text-muted text-sm">{plan.note}</span>
                  </div>
                  <p className="font-body text-muted text-sm mb-6">{plan.tagline}</p>

                  <Link
                    href={plan.cta.href}
                    className={plan.highlight ? 'btn-lime mb-6' : 'btn-outline mb-6'}
                    style={{ justifyContent: 'center', textAlign: 'center' }}
                  >
                    {plan.cta.label}
                  </Link>

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center justify-between gap-3 py-1 border-b border-white/[0.04] last:border-0">
                        <span className="font-body text-white/50 text-xs">{f.label}</span>
                        <Check value={f.value} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature comparison table ──────────────────────── */}
        <section className="pb-16">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <h2
              className="font-sans font-bold text-white mb-8"
              style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', letterSpacing: '-0.025em' }}
            >
              Full comparison
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="font-body text-muted text-xs tracking-[0.1em] uppercase text-left px-6 py-4 w-[38%]">Feature</th>
                    {PLANS.map((p) => (
                      <th
                        key={p.name}
                        className="font-sans font-bold text-sm px-4 py-4 text-center"
                        style={{ color: p.highlight ? '#C8FF00' : 'rgba(255,255,255,0.75)' }}
                      >
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PLANS[0].features.map((f, i) => (
                    <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="font-body text-white/60 text-sm px-6 py-3.5">{f.label}</td>
                      {PLANS.map((p) => (
                        <td key={p.name} className="px-4 py-3.5 text-center">
                          <Check value={p.features[i].value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Add-ons ───────────────────────────────────────── */}
        <section className="pb-16 border-t border-white/[0.05]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-14">
            <p className="font-body text-lime text-xs tracking-[0.14em] uppercase mb-4">Add-ons</p>
            <h2
              className="font-sans font-bold text-white mb-8"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}
            >
              Extend any plan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'n8n Automation Setup', price: 'From $350', desc: 'Self-hosted n8n instance + 1 custom workflow built and tested.' },
                { name: 'Monthly Maintenance', price: '$99 / mo', desc: 'Updates, backups, uptime monitoring, and 1h of content changes.' },
                { name: 'Extra Revision Round', price: '$80', desc: 'One additional round of revisions on any deliverable.' },
                { name: 'Figma Design Only', price: 'From $200', desc: 'Figma wireframes and high-fidelity designs, no development.' },
              ].map((addon) => (
                <div
                  key={addon.name}
                  className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.02]"
                >
                  <p className="font-sans font-bold text-white text-sm mb-1" style={{ letterSpacing: '-0.01em' }}>{addon.name}</p>
                  <p className="font-body text-lime text-sm mb-2">{addon.price}</p>
                  <p className="font-body text-muted text-xs leading-relaxed">{addon.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section className="pb-16 border-t border-white/[0.05]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-14">
            <p className="font-body text-lime text-xs tracking-[0.14em] uppercase mb-4">FAQ</p>
            <h2
              className="font-sans font-bold text-white mb-10"
              style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', letterSpacing: '-0.025em' }}
            >
              Questions about pricing
            </h2>
            <div className="max-w-3xl space-y-0 divide-y divide-white/[0.06]">
              {FAQS.map((faq, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-sans font-semibold text-white/90 pr-8" style={{ fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
                      {faq.q}
                    </span>
                    <span className="w-6 h-6 rounded-full border border-white/15 flex-shrink-0 flex items-center justify-center text-white/40 group-open:rotate-45 transition-transform duration-200" style={{ fontSize: '1rem' }}>
                      +
                    </span>
                  </summary>
                  <p className="font-body text-muted text-sm leading-relaxed mt-3 pr-8">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div className="pb-8" />
      </main>
      <Footer />
    </>
  );
}
