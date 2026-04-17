import HeroSection from "../components/landing/HeroSection";
import FeaturedMentorSection from "../components/landing/FeaturedMentorSection";
import CollegeMarqueeSection from "../components/landing/CollegeMarqueeSection";
import CuratedServicesSection from "../components/landing/CuratedServicesSection";
import ProblemsSolutionsSection from "../components/landing/ProblemsSolutionsSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import CommunitySection from "../components/landing/CommunitySection";
import FooterSection from "../components/landing/FooterSection";

export default function HomePage() {
  return (
    <main id="about" className="min-h-screen scroll-mt-24 bg-[#FFFFFF]  text-[#0d0d0f]">
      <HeroSection />
      <FeaturedMentorSection />
      <CollegeMarqueeSection />
      <CuratedServicesSection />
      <TestimonialsSection />
      <CommunitySection />
      <ProblemsSolutionsSection />
      <FooterSection />
    </main>
  );
}