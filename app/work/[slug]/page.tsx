import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/home/Reveal';
import projects from '@/data/projects.json';
import { TECH_TAG_TO_SKILL } from '@/data/skills';
import { Split, ItemList, PageClosing } from '@/components/page/Page';

type Project = (typeof projects)[number];
const SITE = 'https://mumerkhan.com';
const src = (u: string) => decodeURI(u);

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  const seoTitle = (p as { seoTitle?: string }).seoTitle;
  return {
    title: seoTitle ?? `${p.title}: ${p.category} Case Study`,
    description: p.description,
    alternates: { canonical: `${SITE}/work/${p.slug}` },
    openGraph: { title: seoTitle ?? p.title, description: p.description, images: [{ url: p.heroImage }] },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) notFound();
  const p = projects[idx] as Project;
  const next = projects[(idx + 1) % projects.length];
  const gallery = Array.from(new Set((p.galleryImages as string[]).map(src))).filter((g) => g !== src(p.heroImage));
  const live = p.link && p.link !== '#' ? p.link : null;
  const long = p.title.length > 18;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    headline: (p as { seoTitle?: string }).seoTitle ?? p.title,
    description: p.longDescription ?? p.description,
    image: `${SITE}${encodeURI(decodeURI(p.heroImage))}`,
    dateCreated: p.year,
    creator: { '@id': `${SITE}/#person` },
    keywords: (p.technologies as string[]).join(', '),
    ...(live ? { url: live } : {}),
  };

  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-[1440px] px-5 md:px-10 pt-28 md:pt-40 pb-12 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-8 items-end">
          <div className="lg:col-span-8">
            <nav aria-label="Breadcrumb" className="mb-8 text-[14px]" style={{ color: 'var(--muted)' }}>
              <Link href="/" className="hover:text-bone">Home</Link> <span aria-hidden="true">/</span>{' '}
              <Link href="/work" className="hover:text-bone">Work</Link> <span aria-hidden="true">/</span>{' '}
              <span aria-current="page" className="text-bone">{p.title}</span>
            </nav>
            <h1 className={`font-wide text-bone ${long ? 'text-[clamp(1.4rem,6vw,2.4rem)] md:text-[clamp(2rem,3.6vw,3.6rem)]' : 'text-[clamp(1.8rem,8vw,3rem)] md:text-[clamp(2.4rem,5.4vw,5.4rem)]'}`}>
              <span className="mask-line"><span>{p.title}</span></span>
            </h1>
            <p className="fade-up-late mt-6 max-w-[56ch] text-bone" style={{ fontSize: 'var(--step-lead)', lineHeight: 1.4 }}>
              {p.description}
            </p>
          </div>
          <dl className="fade-up-late lg:col-span-4 grid grid-cols-2 gap-x-6 gap-y-4 text-[15px]">
            <div><dt style={{ color: 'var(--muted)' }}>Type</dt><dd className="text-bone">{p.category}</dd></div>
            <div><dt style={{ color: 'var(--muted)' }}>Year</dt><dd className="text-bone tabular-nums">{p.year}</dd></div>
            <div className="col-span-2">
              <dt style={{ color: 'var(--muted)' }}>Built with</dt>
              <dd className="text-bone">
                {(p.technologies as string[]).map((t, i) => {
                  const skill = TECH_TAG_TO_SKILL[t];
                  return (
                    <span key={t}>
                      {skill ? <Link href={`/skills/${skill}`} className="underline underline-offset-4 decoration-[#9FC7B8] hover:text-jade">{t}</Link> : t}
                      {i < p.technologies.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </dd>
            </div>
            {live && (
              <div className="col-span-2 pt-2">
                <a href={live} target="_blank" rel="noopener noreferrer" className="btn-outline !py-3">
                  Visit the live site <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </dl>
        </section>

        <figure className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="relative w-full aspect-[16/9]" style={{ background: 'var(--surface)' }}>
            <Image src={src(p.heroImage)} alt={`${p.title} website shown on desktop, laptop and phone`} fill priority sizes="(max-width: 1440px) 100vw, 1360px" className="object-contain" />
          </div>
        </figure>

        <Split id="story" title="The brief" intro={p.longDescription}>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <Reveal>
              <h3 className="text-[19px] font-medium text-bone">What was wrong</h3>
              <p className="mt-3 text-[17px] leading-[1.6] text-bone">{p.challenge}</p>
            </Reveal>
            <Reveal data-delay="1">
              <h3 className="text-[19px] font-medium text-bone">What I built</h3>
              <p className="mt-3 text-[17px] leading-[1.6] text-bone">{p.solution}</p>
            </Reveal>
          </div>
        </Split>

        <Split id="results" title="What changed" tone="surface">
          <ItemList items={(p.results as string[]).map((r) => ({ title: r }))} />
          {p.keyFeatures?.length ? (
            <div className="mt-14">
              <h3 className="text-[19px] font-medium text-bone">Key features</h3>
              <ul className="mt-4 grid md:grid-cols-2 gap-x-12 gap-y-2 text-[17px]" style={{ color: '#C4C7BF' }}>
                {(p.keyFeatures as string[]).map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ) : null}
        </Split>

        {gallery.length > 0 && (
          <section aria-label="More screens" className="mx-auto max-w-[1440px] px-5 md:px-10 pt-24 md:pt-36 grid gap-6">
            {gallery.map((g) => (
              <Reveal as="figure" key={g} className="relative w-full aspect-[16/10]" style={{ background: 'var(--surface)' }}>
                <Image src={src(g)} alt={`${p.title}: additional pages`} fill sizes="(max-width: 1440px) 100vw, 1360px" className="object-contain" />
              </Reveal>
            ))}
          </section>
        )}

        <section aria-label="Next project" className="mx-auto max-w-[1440px] px-5 md:px-10 pt-24 md:pt-36">
          <Link href={`/work/${next.slug}`} className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-6">
              <p className="font-wide text-bone group-hover:text-jade transition-colors text-[clamp(1.3rem,3.2vw,2.6rem)]">Next: {next.title}</p>
              <p className="mt-2 text-[16px]" style={{ color: 'var(--muted)' }}>{next.category}</p>
            </div>
            <div className="md:col-span-6 relative aspect-[16/9] overflow-hidden" style={{ background: 'var(--surface)' }}>
              <Image src={src(next.cardImage)} alt="" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          </Link>
        </section>

        <PageClosing sentence={`Need something like ${p.title}? Tell me about your project and I’ll reply today with a plan and a fixed price.`} />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
