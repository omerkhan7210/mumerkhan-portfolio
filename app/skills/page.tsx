import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { skills } from '@/data/skills';
import {
  SiWordpress,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiFigma,
  SiN8N,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiPhp,
  SiTailwindcss,
  SiWoocommerce,
  SiGit,
  SiHtml5,
  SiMysql,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

export const metadata: Metadata = {
  title: 'Skills & Experience — WordPress, React, n8n & More',
  description:
    'A detailed look at my real experience with WordPress, React, Node.js, n8n automation, and every other tool I use — backed by actual client projects, not just a list of logos.',
  alternates: { canonical: 'https://mumerkhan.com/skills' },
  openGraph: {
    title: 'Skills & Experience | Umer Khan',
    description: 'Real experience with WordPress, React, Node.js, n8n, and more — backed by actual client projects.',
    url: 'https://mumerkhan.com/skills',
  },
};

const ICONS: Record<string, IconType> = {
  SiWordpress,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiFigma,
  SiN8N,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiPhp,
  SiTailwindcss,
  SiWoocommerce,
  SiGit,
  SiHtml5,
  SiMysql,
};

export default function SkillsPage() {
  return (
    <>
      <Header />
      <main className="bg-ink min-h-screen">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="pt-36 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,255,0,0.06) 0%, transparent 65%)',
          }} />
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span className="font-body text-muted text-xs tracking-[0.12em] uppercase">Skills & experience</span>
            </div>
            <h1
              className="font-sans font-extrabold text-white mb-6"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
            >
              Every skill, backed by{' '}
              <span className="text-lime">real projects</span>
            </h1>
            <p className="font-body text-muted max-w-xl" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7 }}>
              Click into any skill below for the actual story — what I&apos;ve built with it, which client projects used it, and what I can do for yours.
            </p>
          </div>
        </section>

        {/* ── Skills grid ─────────────────────────────────── */}
        <section className="pb-24">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {skills.map((skill) => {
                const Icon = ICONS[skill.icon];
                return (
                  <Link
                    key={skill.slug}
                    href={`/skills/${skill.slug}`}
                    className="group relative flex flex-col p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
                    style={{ textDecoration: 'none' }}
                  >
                    <span
                      className="absolute top-5 right-6 font-body text-white/30 text-xs"
                      style={{ letterSpacing: '0.06em' }}
                    >
                      {skill.yearsLabel}
                    </span>

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}30` }}
                    >
                      {Icon && <Icon size={22} color={skill.color} />}
                    </div>

                    <p className="font-body text-xs mb-1.5" style={{ color: skill.color }}>{skill.category}</p>
                    <h2
                      className="font-sans font-bold text-white mb-2 group-hover:text-lime transition-colors duration-200"
                      style={{ fontSize: '1.15rem', letterSpacing: '-0.02em' }}
                    >
                      {skill.name}
                    </h2>
                    <p className="font-body text-muted text-sm leading-relaxed mb-6 flex-1">
                      {skill.tagline}
                    </p>

                    <div className="flex items-center gap-2 font-body text-lime text-sm font-medium">
                      View experience
                      <svg
                        width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <div className="pb-8" />
      </main>
      <Footer />
    </>
  );
}
