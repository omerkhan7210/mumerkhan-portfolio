import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import projects from '@/data/projects.json';
import CaseStudyClient from '@/components/CaseStudyClient';

type Project = typeof projects[0];

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study | Muhammad Umer Khan`,
    description: project.description,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) notFound();

  const project = projects[idx] as Project;
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  const accentColors: Record<string, string> = {
    roaddarts:         '#C8FF00',
    globalremote:      '#60A5FA',
    talehouse:         '#F472B6',
    'novara-md':       '#34D399',
    cleverconcept:     '#FB923C',
    wetotalcare:       '#A78BFA',
    'gc-logistics':    '#38BDF8',
    'house-of-greens': '#86EFAC',
    'karma-fastfood':  '#FBBF24',
    'lobos-co':        '#E879F9',
    'manyway-laundry': '#67E8F9',
    panaceacare:       '#4ADE80',
    'shopfitters-fitout': '#FCA5A5',
    'furniture-store': '#D8B4FE',
    'yogi-escape':     '#FDE68A',
  };
  const accent = accentColors[project.slug] ?? '#C8FF00';

  return (
    <>
      <Header />
      <CaseStudyClient project={project} accent={accent} prev={prev} next={next} />
      <Footer />
    </>
  );
}
