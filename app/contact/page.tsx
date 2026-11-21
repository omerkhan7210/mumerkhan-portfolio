import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactClient from '@/components/ContactClient';
import { PageHero } from '@/components/page/Page';
import Reveal from '@/components/home/Reveal';

export const metadata: Metadata = {
  title: 'Hire a Freelance Web Developer: Get a Fixed Quote',
  description:
    'Tell me about your website, store, app or automation project. I reply within 4 hours on weekdays with a plan and a fixed price. Free 20-minute call.',
  alternates: { canonical: 'https://mumerkhan.com/contact' },
};

const NEXT = [
  ['Within 4 hours', 'I read your answers and reply with questions or a first plan.'],
  ['On a free 20-minute call', 'We agree scope, timeline and what success looks like.'],
  ['Within 24 hours of the call', 'You get a fixed quote and a dated plan. No obligation.'],
];

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[{ href: '/contact', label: 'Contact' }]}
          title={['Tell me what', 'you’re building']}
          image={{ src: '/assets/me/umer-aside.webp', w: 1164, h: 1415, alt: 'Muhammad Umer Khan, freelance web developer', cutout: true }}
          lead="Four quick questions. I reply within four hours on weekdays with an honest plan and a price."
        />
        <section className="mx-auto max-w-[1440px] px-5 md:px-10 -mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-16 pb-24">
          <div className="lg:col-span-7">
            <ContactClient />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9 grid gap-10 content-start" aria-label="Other ways to reach me">
            <Reveal>
              <h2 className="text-[19px] font-medium text-bone">What happens next</h2>
              <ol className="mt-4 grid gap-4">
                {NEXT.map(([t, d]) => (
                  <li key={t} className="text-[16px] leading-[1.55]">
                    <span className="text-bone font-medium">{t},</span> <span style={{ color: '#C4C7BF' }}>{d.charAt(0).toLowerCase() + d.slice(1)}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal data-delay="1">
              <h2 className="text-[19px] font-medium text-bone">Prefer something else?</h2>
              <ul className="mt-4 grid gap-2 text-[16px]">
                <li>
                  <a href="mailto:omerfarooqkhan7210@gmail.com?subject=New%20website%20project" className="text-bone underline underline-offset-4 hover:text-jade break-all">
                    omerfarooqkhan7210@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://www.upwork.com/freelancers/muhammadumerk5" target="_blank" rel="noopener noreferrer" className="text-bone underline underline-offset-4 hover:text-jade">
                    Hire me on Upwork
                  </a>
                  <span style={{ color: 'var(--muted)' }}> (100% Job Success)</span>
                </li>
              </ul>
            </Reveal>
            <Reveal as="figure" data-delay="2" className="p-6" style={{ background: 'var(--surface)' }}>
              <blockquote className="text-[17px] leading-[1.5] text-bone">
                “Fast turnaround, zero back-and-forth on revisions. Just clean work delivered exactly as described.”
              </blockquote>
              <figcaption className="mt-3 text-[15px]" style={{ color: 'var(--muted)' }}>Tyler W., CEO, United States, via Upwork</figcaption>
            </Reveal>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
