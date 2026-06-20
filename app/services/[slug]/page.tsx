import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug } from '@/data/services';
import { TECH_TAG_TO_SKILL } from '@/data/skills';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const svc = getServiceBySlug(params.slug);
  if (!svc) return {};
  return {
    title: `${svc.name} Services`,
    description: svc.metaDescription,
    alternates: { canonical: `https://mumerkhan.com/services/${svc.slug}` },
    openGraph: {
      title: `${svc.name} | Umer Khan`,
      description: svc.metaDescription,
      url: `https://mumerkhan.com/services/${svc.slug}`,
    },
  };
}

export default function ServicePage({ params }: Props) {
  const svc = getServiceBySlug(params.slug);
  if (!svc) notFound();

  return (
    <>
      <Header />
      <main className="bg-ink min-h-screen">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 70% 55% at 60% 0%, ${svc.color}12 0%, transparent 60%)`,
            }}
          />
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-body text-sm text-muted mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span className="text-white/20">/</span>
              <span className="text-white/60">{svc.name}</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {svc.tags.map((t) => {
                const skillSlug = TECH_TAG_TO_SKILL[t];
                const tagClass = 'font-body text-xs px-3 py-1 rounded-full border';
                const tagStyle = { color: svc.color, borderColor: `${svc.color}40`, background: `${svc.color}10` };
                return skillSlug ? (
                  <Link key={t} href={`/skills/${skillSlug}`} className={tagClass} style={{ ...tagStyle, textDecoration: 'none' }}>
                    {t}
                  </Link>
                ) : (
                  <span key={t} className={tagClass} style={tagStyle}>
                    {t}
                  </span>
                );
              })}
            </div>

            <h1
              className="font-sans font-extrabold text-white mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.03em', maxWidth: 800 }}
            >
              {svc.hero.heading}
            </h1>
            <p className="font-body text-muted max-w-lg mb-8" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7 }}>
              {svc.hero.sub}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/contact" className="btn-lime">
                Get a quote
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
              <Link href="/work" className="btn-outline">
                See my work
              </Link>
            </div>
          </div>
        </section>

        {/* ── What's included ──────────────────────────────── */}
        <section className="py-16 border-t border-white/[0.05]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-14 items-start">
              <div>
                <p className="font-body text-lime text-xs tracking-[0.14em] uppercase mb-4">What you get</p>
                <h2
                  className="font-sans font-bold text-white mb-6"
                  style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.025em' }}
                >
                  Everything in the scope, nothing hidden
                </h2>
                <p className="font-body text-muted leading-relaxed">
                  Every engagement is fully scoped upfront. No surprise add-ons, no scope creep that gets billed separately. Here's exactly what's included.
                </p>
              </div>
              <ul className="space-y-3">
                {svc.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center text-xs"
                      style={{ background: `${svc.color}18`, color: svc.color }}
                    >
                      ✓
                    </span>
                    <span className="font-body text-white/75 text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────── */}
        <section className="py-16 border-t border-white/[0.05]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <p className="font-body text-lime text-xs tracking-[0.14em] uppercase mb-4">How it works</p>
            <h2
              className="font-sans font-bold text-white mb-12"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.025em' }}
            >
              A clear process, start to finish
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {svc.process.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-xl border border-white/[0.07] bg-white/[0.02]"
                >
                  <span
                    className="font-body text-xs font-bold mb-3 block"
                    style={{ color: svc.color, letterSpacing: '0.08em' }}
                  >
                    {step.step}
                  </span>
                  <h3 className="font-sans font-bold text-white text-base mb-2" style={{ letterSpacing: '-0.01em' }}>
                    {step.title}
                  </h3>
                  <p className="font-body text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Technologies ─────────────────────────────────── */}
        <section className="py-16 border-t border-white/[0.05]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <p className="font-body text-lime text-xs tracking-[0.14em] uppercase mb-4">Tech stack</p>
            <h2
              className="font-sans font-bold text-white mb-8"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}
            >
              Tools I use for {svc.name.toLowerCase()}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {svc.technologies.map((tech) => {
                const skillSlug = TECH_TAG_TO_SKILL[tech];
                const tagClass = 'font-body text-sm px-4 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/65 hover:text-white hover:border-white/20 transition-colors duration-200';
                return skillSlug ? (
                  <Link key={tech} href={`/skills/${skillSlug}`} className={tagClass} style={{ textDecoration: 'none' }}>
                    {tech}
                  </Link>
                ) : (
                  <span key={tech} className={tagClass}>
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="py-16 border-t border-white/[0.05]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <p className="font-body text-lime text-xs tracking-[0.14em] uppercase mb-4">FAQ</p>
            <h2
              className="font-sans font-bold text-white mb-10"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.025em' }}
            >
              Common questions
            </h2>
            <div className="max-w-3xl space-y-0 divide-y divide-white/[0.06]">
              {svc.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group py-5"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-sans font-semibold text-white/90 pr-8" style={{ fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
                      {faq.q}
                    </span>
                    <span
                      className="w-6 h-6 rounded-full border border-white/15 flex-shrink-0 flex items-center justify-center text-white/40 group-open:rotate-45 transition-transform duration-200"
                      style={{ fontSize: '1rem' }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="font-body text-muted text-sm leading-relaxed mt-3 pr-8">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Other services ───────────────────────────────── */}
        <section className="pb-20 border-t border-white/[0.05]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-16">
            <p className="font-body text-xs tracking-[0.14em] uppercase text-muted mb-8">Other services</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {services
                .filter((s) => s.slug !== svc.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group px-4 py-3 rounded-xl border border-white/[0.07] hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="font-body text-white/70 group-hover:text-white text-sm transition-colors duration-200 block">
                      {s.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
