import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { skills, getSkillBySlug } from '@/data/skills';
import projects from '@/data/projects.json';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const skill = getSkillBySlug(params.slug);
  if (!skill) return {};
  return {
    title: skill.seoTitle,
    description: skill.seoDescription,
    alternates: { canonical: `https://mumerkhan.com/skills/${skill.slug}` },
    openGraph: {
      title: skill.seoTitle,
      description: skill.seoDescription,
      url: `https://mumerkhan.com/skills/${skill.slug}`,
    },
  };
}

export default function SkillPage({ params }: Props) {
  const skill = getSkillBySlug(params.slug);
  if (!skill) notFound();

  const relatedProjects = projects.filter((p) => skill.projectSlugs.includes(p.slug));
  const relatedSkills = skills.filter((s) => skill.relatedSkillSlugs.includes(s.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: skill.name,
    description: skill.seoDescription,
    inDefinedTermSet: 'https://mumerkhan.com/skills',
    url: `https://mumerkhan.com/skills/${skill.slug}`,
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="bg-ink min-h-screen">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 70% 55% at 60% 0%, ${skill.color}14 0%, transparent 60%)` }}
          />
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-body text-sm text-muted mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <Link href="/skills" className="hover:text-white transition-colors">Skills</Link>
              <span className="text-white/20">/</span>
              <span className="text-white/60">{skill.name}</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-body text-xs px-3 py-1 rounded-full border"
                style={{ color: skill.color, borderColor: `${skill.color}40`, background: `${skill.color}10` }}
              >
                {skill.category}
              </span>
              <span className="font-body text-muted text-xs">{skill.yearsLabel}</span>
            </div>

            <h1
              className="font-sans font-extrabold text-white mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.03em', maxWidth: 800 }}
            >
              {skill.name} Experience
            </h1>
            <p className="font-body text-muted max-w-xl mb-8" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7 }}>
              {skill.tagline}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/contact" className="btn-lime">
                Hire me for {skill.name}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
              <Link href={`/services/${skill.relatedServiceSlug}`} className="btn-outline">
                View related service
              </Link>
            </div>
          </div>
        </section>

        {/* ── Experience narrative ───────────────────────────── */}
        <section className="py-16 border-t border-white/[0.05]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-14 items-start">
              <div>
                <p className="font-body text-lime text-xs tracking-[0.14em] uppercase mb-4">Overview</p>
                <h2
                  className="font-sans font-bold text-white mb-6"
                  style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.025em' }}
                >
                  How I&apos;ve used {skill.name}
                </h2>
                <p className="font-body text-muted leading-relaxed">{skill.intro}</p>
              </div>
              <div>
                <p className="font-body text-white/80 leading-relaxed" style={{ fontSize: '0.97rem' }}>
                  {skill.experience}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Capabilities ───────────────────────────────────── */}
        <section className="py-16 border-t border-white/[0.05]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <p className="font-body text-lime text-xs tracking-[0.14em] uppercase mb-4">What I can do</p>
            <h2
              className="font-sans font-bold text-white mb-10"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.025em' }}
            >
              Specific {skill.name} capabilities
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {skill.capabilities.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center text-xs"
                    style={{ background: `${skill.color}18`, color: skill.color }}
                  >
                    ✓
                  </span>
                  <span className="font-body text-white/75 text-sm leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Real projects ──────────────────────────────────── */}
        {relatedProjects.length > 0 && (
          <section className="py-16 border-t border-white/[0.05]">
            <div className="max-w-[1100px] mx-auto px-6 md:px-10">
              <p className="font-body text-lime text-xs tracking-[0.14em] uppercase mb-4">Proof, not just claims</p>
              <h2
                className="font-sans font-bold text-white mb-10"
                style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.025em' }}
              >
                Real projects built with {skill.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/work/${p.slug}`}
                    className="group relative rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/15 transition-all duration-300"
                    style={{ textDecoration: 'none', aspectRatio: '4/3' }}
                  >
                    <Image
                      src={p.cardImage}
                      alt={p.title}
                      fill
                      className="object-cover"
                      style={{ filter: 'brightness(0.55)', transition: 'filter 0.3s' }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%)' }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-body text-xs mb-1" style={{ color: skill.color }}>{p.category}</p>
                      <h3 className="font-sans font-bold text-white text-base group-hover:text-lime transition-colors duration-200">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────── */}
        {skill.faqs.length > 0 && (
          <section className="py-16 border-t border-white/[0.05]">
            <div className="max-w-[1100px] mx-auto px-6 md:px-10">
              <p className="font-body text-lime text-xs tracking-[0.14em] uppercase mb-4">FAQ</p>
              <h2
                className="font-sans font-bold text-white mb-10"
                style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.025em' }}
              >
                Common questions about my {skill.name} work
              </h2>
              <div className="max-w-3xl space-y-0 divide-y divide-white/[0.06]">
                {skill.faqs.map((faq, i) => (
                  <details key={i} className="group py-5">
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
                    <p className="font-body text-muted text-sm leading-relaxed mt-3 pr-8">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related skills ──────────────────────────────────── */}
        {relatedSkills.length > 0 && (
          <section className="pb-20 border-t border-white/[0.05]">
            <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-16">
              <p className="font-body text-xs tracking-[0.14em] uppercase text-muted mb-8">Related skills</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {relatedSkills.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/skills/${s.slug}`}
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
        )}
      </main>
      <Footer />
    </>
  );
}
