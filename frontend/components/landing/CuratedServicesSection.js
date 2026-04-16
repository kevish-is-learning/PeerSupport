import Link from "next/link";
import { Video, Users, BookOpen, ArrowRight, Sparkles } from "lucide-react";

const services = [
  {
    icon: Video,
    title: "1:1 Mentorship Sessions",
    description:
      "Connect with experienced mentors from top B-schools for personalized guidance and career advice.",
    iconBg: "#2563eb",
    iconColor: "#ffffff",
    cardShadow: "shadow-[6px_6px_0_0_#2563eb]",
    cta: {
      label: "Find Your Mentor",
      href: "/explore-mentor",
      className:
        "inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a1a] bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#1a1a1a] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_#1a1a1a]",
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
    cardShadow: "shadow-[6px_6px_0_0_#F9C41A]",
    cta: {
      label: "Join a Session",
      href: "/mentee/find-mentors",
      className:
        "inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a1a] bg-[#F9C41A] px-5 py-2.5 text-sm font-bold text-[#0d0d0f] shadow-[3px_3px_0_0_#1a1a1a] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_#1a1a1a]",
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
    cardShadow: "shadow-[6px_6px_0_0_#f97316]",
    cta: {
      label: "Book Mock Interview",
      href: "/mentee/find-mentors",
      className:
        "inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a1a] bg-[#f97316] px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#1a1a1a] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_#1a1a1a]",
      arrowClass: "text-white"
    }
  }
];

function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <article
      className={`group flex flex-col rounded-[22px] border-[2.5px] border-[#1a1a1a] bg-[#f5f0e8] p-6 transition-transform hover:-translate-y-0.5 sm:p-7 ${service.cardShadow}`}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#1a1a1a]"
        style={{ backgroundColor: service.iconBg }}
      >
        <Icon size={26} color={service.iconColor} strokeWidth={2.2} aria-hidden />
      </div>

      <h3 className="mt-5 text-lg font-extrabold tracking-[-0.02em] text-[#0d0d0f] sm:text-xl">
        {service.title}
      </h3>

      <p className="mt-3 flex-1 text-[0.9rem] leading-[1.65] text-[#5c5f69] sm:text-[0.95rem]">
        {service.description}
      </p>

      <Link href={service.cta.href} className={`mt-6 w-fit ${service.cta.className}`}>
        {service.cta.label}
        <ArrowRight size={16} strokeWidth={2.5} className={service.cta.arrowClass} aria-hidden />
      </Link>
    </article>
  );
}

export default function CuratedServicesSection() {
  return (
    <section id="services" className="relative w-full scroll-mt-24 overflow-hidden bg-white">
      <div className="relative px-4 py-20 sm:px-6 lg:px-10">
        {/* Decorative diamond — top right */}
        <div
          className="absolute right-8 top-12 h-20 w-20 rotate-12 rounded-[4px] border-[3px] border-[#e5e7eb] sm:right-16 sm:h-24 sm:w-24"
          aria-hidden="true"
        />

        {/* Decorative circle — bottom left */}
        <div
          className="absolute bottom-16 left-6 h-16 w-16 rounded-full border-[3px] border-[#e5e7eb] sm:left-12 sm:h-20 sm:w-20"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a1a] bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white shadow-[4px_4px_0_0_#1a1a1a]">
              <Sparkles className="h-4 w-4 shrink-0" strokeWidth={2.2} aria-hidden />
              Our Services
            </div>
          </div>

          <h2 className="mt-6 text-center text-[2.2rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0d0d0f] sm:text-[2.8rem]">
            Everything You Need to Succeed
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-center text-[0.95rem] leading-relaxed text-[#5c5f69] sm:text-base">
            Get personalized guidance from experienced mentors to achieve your MBA dreams
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} service={s} />
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              href="/mentee/find-mentors"
              className="inline-flex items-center gap-2.5 rounded-full border-[2.5px] border-[#1a1a1a] bg-[#F9C41A] px-8 py-3.5 text-[0.95rem] font-bold text-[#0d0d0f] shadow-[6px_6px_0_0_#1a1a1a] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1a1a1a]"
            >
              Explore All Services
              <ArrowRight size={18} strokeWidth={2.5} className="text-[#0d0d0f]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
