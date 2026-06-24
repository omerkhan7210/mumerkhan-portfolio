import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import skills from '@/data/skills.json';

export const metadata: Metadata = {
  title: 'About | Muhammad Umer Khan — Full Stack Developer',
  description:
    'Full Stack Developer based in Karachi, Pakistan with 6+ years of experience and 80+ completed projects. 100% Job Success Score on Upwork. WordPress, MERN Stack, and n8n automation specialist.',
};

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

export default function About() {
  return (
    <>
      <Header />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative pt-40 pb-24 bg-ink bg-grid-pattern overflow-hidden">
        <div
          className="absolute left-[-100px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(200,255,0,0.05) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <span className="label-tag">About Me</span>
          <h1
            className="font-sans font-bold text-white mb-6"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
              lineHeight: '0.93',
              letterSpacing: '-0.03em',
            }}
          >
            Full Stack Dev.<br />
            <em className="not-italic text-lime">I make ideas ship.</em>
          </h1>
          <p className="font-body text-muted text-lg max-w-lg leading-relaxed">
            Detail-oriented developer specializing in WordPress, MERN Stack, and
            automation. Based in Karachi — building for the world.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STORY  (light section)
      ══════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Narrative */}
            <div>
              <span className="label-tag-dark">My Journey</span>
              <h2
                className="font-sans font-bold text-ink mb-8"
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em',
                }}
              >
                Started with HTML.<br />Ended up everywhere.
              </h2>
              <div
                className="space-y-4 font-body text-sm leading-relaxed"
                style={{ color: '#444444' }}
              >
                <p className="font-semibold" style={{ color: '#1a1a1a' }}>
                  Muhammad Umer Khan is a full-stack developer based in Karachi, Pakistan,
                  with 6+ years of experience and 80+ completed projects across WordPress,
                  the MERN stack (MongoDB, Express, React, Node.js), and n8n workflow
                  automation. He holds a 100% Job Success Score on Upwork and works
                  directly with clients worldwide — no agency overhead, no account
                  managers, just the person who writes the code.
                </p>
                <p>
                  It started at Bahria University studying Computer Science. What began
                  as learning HTML and CSS quickly evolved into a full-stack obsession —
                  spanning WordPress, React, Node.js, and eventually workflow automation
                  with n8n.
                </p>
                <p>
                  Every project taught me something new. MERN applications pushed
                  my backend thinking. Pixel-perfect WordPress builds sharpened my
                  eye for design. Automation projects changed how I see software
                  entirely — not as code, but as systems.
                </p>
                <p>
                  Today I work with clients worldwide, delivering solutions that
                  look great, load fast, and actually solve the problem. A 100%
                  Job Success on Upwork reflects the results, not just the effort.
                </p>
              </div>
            </div>

            {/* Quick-fact cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Experience', value: '6+ Years' },
                { label: 'Projects Completed', value: '80+' },
                { label: 'Location', value: 'Karachi, Pakistan' },
                { label: 'Status', value: 'Available for hire' },
                { label: 'Education', value: 'BS Computer Science' },
                { label: 'University', value: 'Bahria University' },
                { label: 'Job Success', value: '100% on Upwork' },
                { label: 'Response Time', value: '0–4 hours' },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="p-5 rounded-xl"
                  style={{ background: '#EEEEE9' }}
                >
                  <p
                    className="font-body text-xs uppercase tracking-widest mb-1.5"
                    style={{ color: '#AAAAAA' }}
                  >
                    {fact.label}
                  </p>
                  <p className="font-sans font-semibold text-ink text-sm">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SKILLS
      ══════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-ink">
        <div className="max-w-[1280px] mx-auto px-6">
          <span className="label-tag">Skills</span>
          <h2
            className="font-sans font-bold text-white mb-16"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: '1',
              letterSpacing: '-0.025em',
            }}
          >
            The full toolkit.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((group, i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <h3 className="font-sans font-semibold text-lime text-xs uppercase tracking-widest mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-2.5">
                  {group.skills.map((skill, j) => (
                    <li
                      key={j}
                      className="font-body text-muted text-sm flex items-center gap-2.5"
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: 'rgba(200,255,0,0.4)' }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CREDENTIALS
      ══════════════════════════════════════ */}
      <section
        className="py-24 bg-ink-2 border-t border-white/[0.05]"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <span className="label-tag">Credentials</span>
          <h2
            className="font-sans font-bold text-white mb-12"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1',
              letterSpacing: '-0.025em',
            }}
          >
            Background & proof.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: '🎓',
                title: 'Bachelor of Computer Science',
                sub: 'Bahria University, Karachi',
                detail: '2022 – 2026',
              },
              {
                icon: '⭐',
                title: 'Upwork Top-Rated Freelancer',
                sub: '100% Job Success Score',
                detail: '9+ Upwork Projects · 5-Star Rated · Verified ID',
              },
            ].map((cred, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl flex items-start gap-5"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span className="text-3xl flex-shrink-0">{cred.icon}</span>
                <div>
                  <h3 className="font-sans font-bold text-white text-lg mb-1">
                    {cred.title}
                  </h3>
                  <p className="font-body text-lime text-sm mb-1">{cred.sub}</p>
                  <p className="font-body text-muted text-sm">{cred.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA  (lime section)
      ══════════════════════════════════════ */}
      <section className="py-20 bg-lime">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2
            className="font-sans font-bold text-ink"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              letterSpacing: '-0.025em',
              lineHeight: '1.1',
            }}
          >
            Enough about me.<br />
            Let&apos;s talk about your project.
          </h2>
          <Link href="/contact" className="btn-dark flex-shrink-0">
            Get in Touch <ArrowIcon />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
