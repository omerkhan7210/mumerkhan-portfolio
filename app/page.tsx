import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Marquee from '@/components/Marquee';
import AnimatedHero from '@/components/AnimatedHero';
import TrustBar from '@/components/TrustBar';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import DeliveredSection from '@/components/DeliveredSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PhilosophySection from '@/components/PhilosophySection';
import CTASection from '@/components/CTASection';

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
      <TestimonialsSection />
      <PhilosophySection />
      <CTASection />
      <Footer />
    </>
  );
}
