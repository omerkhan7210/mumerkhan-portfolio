import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import AnimatedHero from '@/components/AnimatedHero';
import TrustBar from '@/components/TrustBar';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import DeliveredSection from '@/components/DeliveredSection';
import TechStackSection from '@/components/TechStackSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PhilosophySection from '@/components/PhilosophySection';
import PricingSection from '@/components/PricingSection';

export const metadata: Metadata = {
  title: 'Muhammad Umer Khan | Full Stack Developer & WordPress Expert',
  description:
    'Hire Umer Khan — Full Stack Developer with 6+ years experience and 80+ projects delivered. WordPress, MERN Stack & n8n Automation. 100% Job Success Score on Upwork.',
  alternates: {
    canonical: 'https://mumerkhan.com',
  },
  openGraph: {
    title: 'Muhammad Umer Khan | Full Stack Developer & WordPress Expert',
    description:
      '80+ projects · 6+ years · 100% JSS · WordPress, MERN Stack, n8n Automation. Available for freelance projects.',
    url: 'https://mumerkhan.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Muhammad Umer Khan — Full Stack Developer' }],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <AnimatedHero />
      <TrustBar />
      <Marquee />
      <ServicesSection />
      <ProjectsSection />
      <DeliveredSection />
      <TechStackSection />
      <TestimonialsSection />
      <PhilosophySection />
      <PricingSection />
      <Footer />
    </>
  );
}
