import HeroSection from "../components/landing/HeroSection";
import FeaturedMentorSection from "../components/landing/FeaturedMentorSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#ece9e7] bg-grid-paper text-[#0d0d0f]">
      <HeroSection />
      <FeaturedMentorSection />
    </main>
  );
}