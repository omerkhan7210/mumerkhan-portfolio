import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactClient from '@/components/ContactClient';
import ContactSidebar from '@/components/ContactSidebar';

export const metadata: Metadata = {
  title: 'Contact | Muhammad Umer Khan — Full Stack Developer',
  description:
    "Let's build something together. Get in touch with Muhammad Umer Khan for WordPress, MERN Stack, automation, or design projects.",
};

export default function Contact() {
  return (
    <>
      <Header />

      {/* ── Hero ──────────────────────────────────────── */}
      <section
        className="relative bg-ink bg-grid-pattern overflow-hidden"
        style={{ paddingTop: 'clamp(120px,16vw,180px)', paddingBottom: 'clamp(48px,5vw,72px)' }}
      >
        <div
          style={{
            position: 'absolute',
            right: -80,
            top: '40%',
            transform: 'translateY(-50%)',
            width: 560,
            height: 560,
            background: 'radial-gradient(circle, rgba(200,255,0,0.055) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
          <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>
            Let&apos;s Talk
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: '#ffffff',
              fontSize: 'clamp(2.8rem, 8vw, 6rem)',
              lineHeight: 0.93,
              letterSpacing: '-0.04em',
              marginTop: 12,
            }}
          >
            Tell me what<br />
            <em className="not-italic" style={{ color: '#C8FF00' }}>you&apos;re building.</em>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.38)',
              fontSize: '1rem',
              maxWidth: 440,
              lineHeight: 1.65,
              marginTop: 20,
            }}
          >
            From quick questions to full project briefs — I&apos;m here. Usually reply within 4 hours.
          </p>
        </div>
      </section>

      {/* ── Form + Info ───────────────────────────────── */}
      <section style={{ background: '#111111', padding: 'clamp(52px,7vw,96px) 28px' }}>
        <div
          style={{
            maxWidth: 1360,
            margin: '0 auto',
            display: 'grid',
            gap: 48,
          }}
          className="grid-cols-1 lg:grid-cols-[1fr_340px]"
        >
          {/* Multi-step form */}
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20,
              padding: 'clamp(28px,5vw,48px)',
            }}
          >
            <ContactClient />
          </div>

          {/* Info sidebar */}
          <ContactSidebar />
        </div>
      </section>

      <Footer />
    </>
  );
}
