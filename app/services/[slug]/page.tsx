import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/home/Reveal';
import WorkStrips from '@/components/home/WorkStrips';
import { ALL_STRIPS } from '@/components/home/data';
import { services, getServiceBySlug } from '@/data/services';
import { TECH_TAG_TO_SKILL } from '@/data/skills';
import { PageHero, Facts, Split, FaqList, PageClosing } from '@/components/page/Page';
import { SERVICE_SEO } from '@/components/page/serviceSeo';

type Props = { params: { slug: string } };
const SITE = 'https://mumerkhan.com';
const HERO_SHOT: Record<string, string> = {
  'wordpress-development': 'cleverconcept',
  'mern-stack-development': 'roaddarts',
  'n8n-automation': 'globalremote',
  'figma-to-web': 'novara-md',
  'ecommerce-development': 'v1-campers',
  'ui-ux-design': 'kp-global-consultants',
  'seo-performance': 'isg-flooring',
  'website-maintenance': 'wlk-gardeners',
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const svc = getServiceBySlug(params.slug);
  if (!svc) return {};
  const seo = SERVICE_SEO[svc.slug];
  const title = seo?.title ?? `${svc.name} Services`;
  return {
    title,
    description: svc.metaDescription,
    alternates: { canonical: `${SITE}/services/${svc.slug}` },
    openGraph: { title: `${title} | Umer Khan`, description: svc.metaDescription, url: `${SITE}/services/${svc.slug}` },
  };
}

export default function ServicePage({ params }: Props) {
  const svc = getServiceBySlug(params.slug);
  if (!svc) notFound();
  const seo = SERVICE_SEO[svc.slug];
  const related = ALL_STRIPS.filter((p) => seo?.match.test(p.category + ' ' + p.tech.join(' '))).slice(0, 4);
  const others = services.filter((s) => s.slug !== svc.slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: seo?.title ?? svc.name,
    serviceType: svc.name,
    description: svc.metaDescription,
    url: `${SITE}/services/${svc.slug}`,
    provider: { '@id': `${SITE}/#person` },
    areaServed: ['United States', 'United Kingdom', 'European Union', 'Australia'],
  };

  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[{ href: '/services', label: 'Services' }, { href: `/services/${svc.slug}`, label: svc.name }]}
          title={seo?.h1 ?? [svc.name]}
          lead={svc.hero.sub}
          image={{ src: `/assets/gallery/${HERO_SHOT[svc.slug] ?? 'kanalfuchs'}.webp`, w: 1280, h: 720, alt: `${svc.name} project example on desktop, laptop and phone` }}
          aside={
            <Facts
              items={[
                { k: '100%', v: 'Job Success on Upwork' },
                { k: '80+', v: 'sites shipped' },
                { k: '< 4 h', v: 'reply time on weekdays' },
                { k: '7–60 days', v: 'of fixes after launch, by plan' },
              ]}
            />
          }
        >
          <Link href="/contact" className="btn-lime">Get a fixed quote</Link>
          <Link href="/pricing" className="text-[16px] text-bone underline underline-offset-[6px] decoration-[#9FC7B8] hover:text-jade">See prices</Link>
        </PageHero>

        <Split id="included" title="What you get" intro={svc.tagline} tone="surface">
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-5">
            {svc.deliverables.map((d, i) => (
              <Reveal as="li" key={d} data-delay={String(i % 4)} className="text-[18px] leading-[1.5] text-bone">
                {d}
              </Reveal>
            ))}
          </ul>
        </Split>

        <Split id="process" title="How it runs">
          <ol className="grid gap-10">
            {svc.process.map((p, i) => (
              <Reveal as="li" key={p.title} className="grid md:grid-cols-[minmax(0,14rem)_1fr] gap-x-10 gap-y-2" data-delay={String(i % 3)}>
                <h3 className="text-[19px] font-medium text-bone">{p.title}</h3>
                <p className="text-[17px] leading-[1.6]" style={{ color: '#C4C7BF' }}>{p.desc}</p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-12 text-[16px]" style={{ color: 'var(--muted)' }}>
            Tools:{' '}
            {svc.technologies.map((t, i) => {
              const skill = TECH_TAG_TO_SKILL[t];
              return (
                <span key={t}>
                  {skill ? <Link href={`/skills/${skill}`} className="text-bone underline underline-offset-4 decoration-[#9FC7B8] hover:text-jade">{t}</Link> : <span className="text-bone">{t}</span>}
                  {i < svc.technologies.length - 1 ? ', ' : ''}
                </span>
              );
            })}
          </p>
        </Split>

        {related.length > 0 && (
          <div className="mt-4">
            <WorkStrips items={related} title="Related work" showAllLink />
          </div>
        )}

        <Split id="faq" title="Questions" intro="Straight answers before you book anything." tone="surface">
          <FaqList faqs={svc.faqs} />
        </Split>

        <Split id="more" title="Other services">
          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group inline-flex gap-2 text-[19px] text-bone hover:text-jade transition-colors">
                  {SERVICE_SEO[s.slug]?.short ?? s.name}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/redesign" className="group inline-flex gap-2 text-[19px] text-bone hover:text-jade transition-colors">
                Trade & local service sites <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </li>
          </ul>
        </Split>

        <PageClosing sentence={`Tell me what you need from ${svc.name.toLowerCase()}, and I’ll reply today with a plan, a timeline and a fixed price.`} />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
