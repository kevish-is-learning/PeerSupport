import Link from "next/link";
import { Video, Users, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import HighlightPill from "../ui/HighlightPill";

const services = [
  {
    icon: Video,
    title: "1:1 Mentorship Sessions",
    description:
      "Connect with experienced mentors from top B-schools for personalized guidance and career advice.",
    iconBg: "#2563eb",
    iconColor: "#ffffff",
    cardShadow: "shadow-[4px_4px_0_0_#2563eb] sm:shadow-[6px_6px_0_0_#2563eb]",
    cta: {
      label: "Find Your Mentor",
      href: "/mentee/find-mentors",
      className:
        "inline-flex items-center gap-2 justify-center rounded-full bg-[#2563eb] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all hover:translate-x-px hover:translate-y-px shadow-[2px_2px_0_0_#1a1a1a]",
      arrowClass: "text-white"
    }
  },
  {
    icon: Users,
    title: "Group Discussions",
    description:
      "Join interactive GD sessions with peers and mentors to sharpen your communication and teamwork skills.",
    iconBg: "#F9C41A",
    iconColor: "#0d0d0f",
    cardShadow: "shadow-[4px_4px_0_0_#F9C41A] sm:shadow-[6px_6px_0_0_#F9C41A]",
    cta: {
      label: "Join a Session",
      href: "/mentee/find-mentors",
      className:
        "inline-flex items-center justify-center gap-2 rounded-full bg-[#F9C41A] px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0d0d0f] transition-all hover:translate-x-px hover:translate-y-px shadow-[2px_2px_0_0_#1a1a1a]",
      arrowClass: "text-[#0d0d0f]"
    }
  },
  {
    icon: BookOpen,
    title: "Mock Interviews & Prep",
    description:
      "Get real-time feedback through mock interviews and case study sessions to ace your B-school interviews.",
    iconBg: "#f97316",
    iconColor: "#ffffff",
    cardShadow: "shadow-[4px_4px_0_0_#f97316] sm:shadow-[6px_6px_0_0_#f97316]",
    cta: {
      label: "Book Mock Interview",
      href: "/mentee/find-mentors",
      className:
        "inline-flex items-center gap-2 justify-center rounded-full bg-[#f97316] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all hover:translate-x-px hover:translate-y-px shadow-[2px_2px_0_0_#1a1a1a]",
      arrowClass: "text-white"
    }
  }
];

function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <article
      className={`group flex flex-col rounded-[22px] border-2 sm:border-[2.5px] border-[#1a1a1a] bg-[#f5f0e8] p-5 sm:p-7 transition-transform hover:-translate-y-0.5 min-w-0 max-w-full ${service.cardShadow}`}
    >
      <div
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border-2 border-[#1a1a1a] shrink-0"
        style={{ backgroundColor: service.iconBg }}
      >
        <Icon size={24} color={service.iconColor} strokeWidth={2.2} aria-hidden />
      </div>

      <h3 className="mt-4 sm:mt-5 text-base sm:text-xl font-extrabold tracking-[-0.02em] text-[#0d0d0f] break-words">
        {service.title}
      </h3>

      <p className="mt-2.5 sm:mt-3 flex-1 text-xs xs:text-sm sm:text-[0.95rem] leading-[1.65] text-[#5c5f69] break-words">
        {service.description}
      </p>

      <Link href={service.cta.href} className={`mt-5 sm:mt-6 w-full text-center ${service.cta.className}`}>
        <span>{service.cta.label}</span>
        <ArrowRight size={16} strokeWidth={2.5} className={service.cta.arrowClass} aria-hidden />
      </Link>
    </article>
  );
}

export default function CuratedServicesSection() {
  return (
    <section id="services" className="relative w-full scroll-mt-24 overflow-hidden bg-white">
      <div className="relative px-4 py-12 sm:px-6 sm:py-20 lg:px-10">
        {/* Decorative diamond — top right */}
        <div
          className="hidden sm:block absolute right-8 top-12 h-20 w-20 rotate-12 rounded-[4px] border-[3px] border-[#e5e7eb] sm:right-16 sm:h-24 sm:w-24 pointer-events-none"
          aria-hidden="true"
        />

        {/* Decorative circle — bottom left */}
        <div
          className="hidden sm:block absolute bottom-16 left-6 h-16 w-16 rounded-full border-[3px] border-[#e5e7eb] sm:left-12 sm:h-20 sm:w-20 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Badge */}
          <div className="flex justify-center">
            <HighlightPill text="Our Services" variant="accent" icon={<Sparkles size={16} />} />
          </div>

          <h2 className="mt-4 sm:mt-6 text-center text-2xl xs:text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0d0d0f] break-words">
            Everything You Need to Succeed
          </h2>

          <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-center text-xs xs:text-sm sm:text-base leading-relaxed text-[#5c5f69]">
            Get personalized guidance from experienced mentors to achieve your MBA dreams
          </p>

          <div className="mt-8 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} service={s} />
            ))}
          </div>

          <div className="mt-8 sm:mt-14 flex justify-center">
            <Link
              href="/mentee/find-mentors"
              className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border-2 sm:border-[2.5px] border-[#1a1a1a] bg-[#F9C41A] px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-[0.95rem] font-bold text-[#0d0d0f] shadow-[4px_4px_0_0_#1a1a1a] sm:shadow-[6px_6px_0_0_#1a1a1a] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1a1a1a]"
            >
              <span>Explore All Services</span>
              <ArrowRight size={16} strokeWidth={2.5} className="text-[#0d0d0f]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
