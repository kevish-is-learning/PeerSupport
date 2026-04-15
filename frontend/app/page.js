import HeroSection from "../components/landing/HeroSection";
import FeaturedMentorSection from "../components/landing/FeaturedMentorSection";
import CuratedServicesSection from "../components/landing/CuratedServicesSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import FooterSection from "../components/landing/FooterSection";

export default function HomePage() {
  return (
    <main id="about" className="min-h-screen scroll-mt-24 bg-[#FFFFFF] bg-grid-paper text-[#0d0d0f]">
      <HeroSection />
      <FeaturedMentorSection />
      <CuratedServicesSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}