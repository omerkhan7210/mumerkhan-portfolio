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
  title: 'Muhammad Umer Khan | Websites for Trade & Local Service Businesses',
  description:
    'Hire Umer Khan for trade and local service websites — quote paths, project galleries, local SEO pages, and WordPress builds that convert. 100% Job Success on Upwork.',
  alternates: {
    canonical: 'https://mumerkhan.com',
  },
  openGraph: {
    title: 'Muhammad Umer Khan | Websites for Trade & Local Service Businesses',
    description:
      'Websites for roofing, plumbing, HVAC & local trades · 80+ projects · 100% JSS on Upwork.',
    url: 'https://mumerkhan.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Muhammad Umer Khan — Trade & local service websites' }],
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
