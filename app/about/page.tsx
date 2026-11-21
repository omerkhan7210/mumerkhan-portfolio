import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/home/Reveal';
import skills from '@/data/skills.json';
import { PageHero, Split, PageClosing } from '@/components/page/Page';

export const metadata: Metadata = {
  title: 'About Muhammad Umer Khan, Freelance Web Developer',
  description:
    'Muhammad Umer Khan is a freelance web developer in Karachi, Pakistan with 6+ years of experience, 80+ projects and a 100% Job Success Score on Upwork. WordPress, Next.js and n8n.',
  alternates: { canonical: 'https://mumerkhan.com/about' },
};

const FACTS = [
  ['Experience', '6+ years'],
  ['Projects', '80+ completed'],
  ['Job Success', '100% on Upwork'],
  ['Reply time', '0–4 hours'],
  ['Education', 'BS Computer Science, Bahria University'],
  ['Based in', 'Karachi, Pakistan'],
];

const profileSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: 'https://mumerkhan.com/about',
  mainEntity: { '@id': 'https://mumerkhan.com/#person' },
};

export default function About() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          crumbs={[{ href: '/about', label: 'About' }]}
          title={['The person', 'writing the code']}
          image={{ src: '/assets/me/umer-front.webp', w: 705, h: 1484, alt: 'Muhammad Umer Khan, freelance web developer in Karachi', cutout: true }}
          lead="I’m Umer, a freelance web developer in Karachi. No account managers, no hand-offs: you talk to me, and I build it."
        >
          <Link href="/contact" className="btn-lime">Book a free call</Link>
          <Link href="/work" className="text-[16px] text-bone underline underline-offset-[6px] decoration-[#9FC7B8] hover:text-jade">See my work</Link>
        </PageHero>

        <section aria-labelledby="story-title" className="mx-auto max-w-[1440px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12">
          <Reveal as="figure" className="lg:col-span-5">
            <div className="aspect-[4/5] w-full flex items-end justify-center overflow-hidden" style={{ background: 'var(--surface)' }}>
              <img src="/assets/me/umer-seated.webp" alt="Muhammad Umer Khan at work, seated" width={1080} height={1371} className="h-[96%] w-auto object-contain object-bottom" />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7 self-center">
            <h2 id="story-title" className="text-bone" style={{ fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)', lineHeight: 1.1, fontWeight: 500 }}>
              Started with HTML, ended up everywhere
            </h2>
            <div className="mt-8 grid gap-5 text-[18px] leading-[1.6] text-bone max-w-[60ch]">
              <p>
                Muhammad Umer Khan is a freelance web developer based in Karachi, Pakistan, with 6+ years of experience and 80+ completed projects across WordPress, Next.js and the MERN stack, and n8n workflow automation. He holds a 100% Job Success Score on Upwork and works directly with clients worldwide.
              </p>
              <p>
                It started at Bahria University, studying Computer Science. Learning HTML and CSS turned into a full-stack habit: WordPress, React, Node.js and, eventually, automation with n8n.
              </p>
              <p>
                Every project taught me something. Web apps pushed my backend thinking. Pixel-perfect WordPress builds sharpened my eye for design. Automation changed how I see software: not as pages, but as systems that save people hours.
              </p>
              <p>
                Today I build sites that look right, load fast and bring in work, mostly for clients in the US, UK, EU and Australia.
              </p>
            </div>
            <dl className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-4 text-[16px]">
              {FACTS.map(([k, v]) => (
                <div key={k}>
                  <dt style={{ color: 'var(--muted)' }}>{k}</dt>
                  <dd className="text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Split id="toolkit" title="The toolkit" intro="What I use day to day. Each one links to the work it powered." tone="surface">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-10">
            {skills.map((g, i) => (
              <Reveal key={g.category} data-delay={String(i % 3)}>
                <h3 className="text-[19px] font-medium text-bone">{g.category}</h3>
                <p className="mt-2 text-[16px] leading-[1.6]" style={{ color: '#C4C7BF' }}>{g.skills.join(', ')}</p>
              </Reveal>
            ))}
          </div>
          <Link href="/skills" className="btn-outline mt-12">Every skill, with projects</Link>
        </Split>

        <Split id="how" title="How I work">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-[17px] leading-[1.6]">
            {[
              ['Fixed prices', 'You get a fixed quote before work starts. Half up front, half at launch, no surprise invoices.'],
              ['Staging links, not screenshots', 'You review real pages on your own phone while I build, so feedback is fast and specific.'],
              ['You own everything', 'Code, content, hosting and logins are yours from day one, documented and handed over.'],
              ['I stay after launch', 'Every plan includes a support window after launch, and care plans are there if you want ongoing help.'],
            ].map(([t, d], i) => (
              <Reveal key={t} data-delay={String(i % 2)}>
                <h3 className="text-[19px] font-medium text-bone">{t}</h3>
                <p className="mt-2" style={{ color: '#C4C7BF' }}>{d}</p>
              </Reveal>
            ))}
          </div>
        </Split>

        <PageClosing sentence="Enough about me. Tell me about your project and I’ll reply today with an honest plan." />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
    </>
  );
}
