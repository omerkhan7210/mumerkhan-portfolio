import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkClient from '@/components/WorkClient';
import projects from '@/data/projects.json';

export const metadata: Metadata = {
  title: 'Work | Muhammad Umer Khan — Full Stack Developer',
  description:
    'Portfolio of 15 WordPress, MERN Stack, automation, and design projects by Muhammad Umer Khan. Built for real clients, solving real problems.',
};

export default function Work() {
  return (
    <>
      <Header />

      {/* ── Hero ──────────────────────────────────────── */}
      <section
        className="relative bg-ink bg-grid-pattern overflow-hidden"
        style={{ paddingTop: 'clamp(120px, 16vw, 180px)', paddingBottom: 'clamp(48px, 6vw, 72px)' }}
      >
        {/* Lime glow */}
        <div
          style={{
            position: 'absolute',
            right: -80,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle at center, rgba(200,255,0,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        {/* Left glow */}
        <div
          style={{
            position: 'absolute',
            left: -120,
            bottom: 0,
            width: 500,
            height: 400,
            background: 'radial-gradient(circle at center, rgba(96,165,250,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            maxWidth: 1360,
            margin: '0 auto',
            padding: '0 28px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>
                Portfolio
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: '#ffffff',
                  fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                  lineHeight: 0.93,
                  letterSpacing: '-0.04em',
                  marginTop: 12,
                }}
              >
                Projects that<br />
                <em className="not-italic" style={{ color: '#C8FF00' }}>prove the point.</em>
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'rgba(255,255,255,0.42)',
                  fontSize: 'clamp(0.9rem,2vw,1.1rem)',
                  maxWidth: 500,
                  lineHeight: 1.65,
                  marginTop: 20,
                }}
              >
                15 builds across WordPress, MERN Stack, automation, and brand design.
                Each one delivered on time and built for results.
              </p>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'flex',
                gap: 28,
                flexShrink: 0,
                padding: '20px 28px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {[
                { num: '15', label: 'Projects' },
                { num: '100%', label: 'Delivered' },
                { num: '6+', label: 'Years' },
              ].map(({ num, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.8rem',
                      letterSpacing: '-0.03em',
                      color: '#C8FF00',
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.68rem',
                      color: 'rgba(255,255,255,0.28)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginTop: 5,
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filterable project grid ────────────────────── */}
      <WorkClient projects={projects} />

      {/* ── CTA ───────────────────────────────────────── */}
      <section
        style={{
          background: '#C8FF00',
          padding: 'clamp(48px,6vw,72px) 28px',
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 28,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: '#0A0A0A',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Ready to add your project to this list?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: 'rgba(10,10,10,0.55)',
                fontSize: '0.9rem',
                marginTop: 8,
              }}
            >
              I&apos;m available for freelance projects — let&apos;s build something great.
            </p>
          </div>
          <Link href="/contact" className="btn-dark" style={{ flexShrink: 0 }}>
            Start a Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
