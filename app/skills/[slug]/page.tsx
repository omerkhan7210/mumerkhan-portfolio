import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkStrips from '@/components/home/WorkStrips';
import { ALL_STRIPS } from '@/components/home/data';
import { skills, getSkillBySlug } from '@/data/skills';
import { getServiceBySlug } from '@/data/services';
import { PageHero, Split, FaqList, PageClosing } from '@/components/page/Page';

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
    openGraph: { title: skill.seoTitle, description: skill.seoDescription, url: `https://mumerkhan.com/skills/${skill.slug}` },
  };
}

export default function SkillPage({ params }: Props) {
  const skill = getSkillBySlug(params.slug);
  if (!skill) notFound();
  const work = ALL_STRIPS.filter((p) => skill.projectSlugs.includes(p.slug));
  const related = skills.filter((s) => skill.relatedSkillSlugs.includes(s.slug));
  const service = getServiceBySlug(skill.relatedServiceSlug);
  const words = skill.name.split(' ');
  const title: [string, string?] = skill.name.length > 12 && words.length > 1
    ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')]
    : [skill.name, skill.yearsLabel.toLowerCase()];

  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[{ href: '/skills', label: 'Skills' }, { href: `/skills/${skill.slug}`, label: skill.name }]}
          title={title}
          lead={skill.tagline}
        >
          {service && <Link href={`/services/${service.slug}`} className="btn-lime">Hire me for {service.name}</Link>}
          <Link href="/contact" className="text-[16px] text-bone underline underline-offset-[6px] decoration-[#9FC7B8] hover:text-jade">Ask a question</Link>
        </PageHero>

        <Split id="experience" title="Experience" intro={skill.yearsLabel}>
          <div className="grid gap-5 text-[18px] leading-[1.6] text-bone max-w-[64ch]">
            <p>{skill.intro}</p>
            <p>{skill.experience}</p>
          </div>
        </Split>

        <Split id="capabilities" title="What I do with it" tone="surface">
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4 text-[18px] leading-[1.5] text-bone">
            {skill.capabilities.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </Split>

        {work.length > 0 && <WorkStrips items={work} title="Built with it" showAllLink />}

        {skill.faqs.length > 0 && (
          <Split id="faq" title="Questions" tone="surface">
            <FaqList faqs={skill.faqs} />
          </Split>
        )}

        {related.length > 0 && (
          <Split id="related" title="Often paired with">
            <ul className="flex flex-wrap gap-2">
              {related.map((s) => (
                <li key={s.slug}>
                  <Link href={`/skills/${s.slug}`} className="block px-4 py-2.5 text-[17px] text-bone transition-colors hover:bg-[#26302D]" style={{ background: 'var(--surface)' }}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </Split>
        )}

        <PageClosing />
      </main>
      <Footer />
    </>
  );
}
