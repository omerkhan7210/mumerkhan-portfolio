import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import WorkStrips from '@/components/home/WorkStrips';
import Proof from '@/components/home/Proof';
import Services from '@/components/home/Services';
import { Process, Quotes, PriceMenu, Faq, FAQS, Closing } from '@/components/home/Sections';

const TITLE = 'Freelance Web Developer | WordPress, Next.js & n8n | Umer Khan';
const DESC =
  'Freelance web developer for growing businesses: WordPress, Next.js and n8n automation. 80+ projects, 100% Upwork Job Success. Book a free 20-minute call.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: 'https://mumerkhan.com' },
  openGraph: { title: TITLE, description: DESC, url: 'https://mumerkhan.com' },
  twitter: { title: TITLE, description: DESC },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WorkStrips />
        <Proof />
        <Services />
        <Process />
        <Quotes />
        <PriceMenu />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
