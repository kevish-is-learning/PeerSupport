"use client";

import { useState } from "react";
import Link from "next/link";
import { Video, Users, MessageSquare, Sparkles, GraduationCap, BookOpen, Briefcase, ArrowRight } from "lucide-react";

const colleges = [
  "IIM Ahmedabad",
  "IIM Bangalore",
  "IIM Calcutta",
  "FMS Delhi",
  "XLRI Jamshedpur",
  "IIM Lucknow",
  "IIM Kozhikode",
  "ISB Hyderabad"
];

const menteeServices = [
  {
    icon: Video,
    title: "1:1 Mentorship Sessions",
    description:
      "Connect with experienced mentors from top B-schools for personalized guidance and career advice.",
    accent: "#2563eb"
  },
  {
    icon: Users,
    title: "Group Discussions",
    description:
      "Join interactive GD sessions with peers and mentors to sharpen your communication and teamwork skills.",
    accent: "#F9C41A"
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews & Prep",
    description:
      "Get real-time feedback through mock interviews and case study sessions to ace your B-school interviews.",
    accent: "#ef4444"
  }
];

const mentorServices = [
  {
    icon: GraduationCap,
    title: "Share Your Expertise",
    description:
      "Mentor aspiring MBA students and help them navigate admissions, interviews, and career decisions.",
    accent: "#2563eb"
  },
  {
    icon: BookOpen,
    title: "Create Study Resources",
    description:
      "Build and share curated study materials, case banks, and prep guides for your mentees.",
    accent: "#F9C41A"
  },
  {
    icon: Briefcase,
    title: "Grow Your Network",
    description:
      "Connect with fellow mentors and industry professionals while building your personal brand.",
    accent: "#ef4444"
  }
];

function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <article className="group flex flex-col rounded-[22px] border-[2.5px] border-[#1a1a1a] bg-white p-5 shadow-[4px_4px_0_0_#1a1a1a] transition-all hover:-translate-y-1 sm:p-6">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: service.accent + "18" }}
      >
        <Icon size={24} style={{ color: service.accent }} strokeWidth={2.2} />
      </div>

      <h3 className="mt-4 text-lg font-extrabold tracking-[-0.02em] text-[#0d0d0f]">
        {service.title}
      </h3>

      <p className="mt-2 flex-1 text-[0.84rem] leading-[1.65] text-[#5c5f69]">
        {service.description}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#0d0d0f] transition-colors group-hover:text-[#2563eb]">
        Learn more
        <ArrowRight size={15} strokeWidth={2.5} />
      </span>
    </article>
  );
}

export default function CuratedServicesSection() {
  const [activeTab, setActiveTab] = useState("mentees");
  const services = activeTab === "mentees" ? menteeServices : mentorServices;

  return (
    <section id="services" className="relative w-full scroll-mt-24 overflow-hidden">

      {/* ── College marquee ──────────────────────────── */}
      <div className="w-full bg-[#1a1a1a] py-3.5">
        <p className="mb-2.5 text-center text-sm font-medium tracking-wide text-white/60">
          Mentors from colleges students dream of :
        </p>
        <div className="flex items-center justify-center gap-3 overflow-x-auto px-4 pb-1">
          {colleges.map((c) => (
            <span
              key={c}
              className="shrink-0 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.8rem] font-semibold text-white"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ── Services area ────────────────────────────── */}
      <div className="relative px-4 py-20 sm:px-6 lg:px-10">

        {/* Decorative diamond — top right */}
        <div
          className="absolute right-8 top-16 h-16 w-16 rotate-12 rounded-[4px] border-[3px] border-[#e5e0dc] bg-[#fdf5f2] opacity-50 sm:right-14 sm:h-20 sm:w-20"
          aria-hidden="true"
        />

        {/* Decorative circle — bottom left */}
        <div
          className="absolute bottom-14 left-6 h-14 w-14 rounded-full border-[3px] border-[#e5e0dc] bg-[#fdf5f2] opacity-50 sm:left-10 sm:h-16 sm:w-16"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">

          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#3730a3] px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0_0_#1a1a1a]">
              <Sparkles size={14} />
              Our Services
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-5 text-center text-[2.2rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0d0d0f] sm:text-[2.8rem]">
            Everything You Need to Succeed
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-lg text-center text-[0.95rem] leading-relaxed text-[#5c5f69]">
            Whether you&#39;re looking for guidance or want to share your expertise, we&#39;ve got you covered
          </p>

          {/* Tab toggle */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border-[2.5px] border-[#1a1a1a] bg-white p-1 shadow-[3px_3px_0_0_#1a1a1a]">
              <button
                onClick={() => setActiveTab("mentees")}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  activeTab === "mentees"
                    ? "bg-[#1a1a1a] text-white"
                    : "text-[#5c5f69] hover:text-[#0d0d0f]"
                }`}
              >
                For Mentees
                <Sparkles size={13} />
              </button>
              <button
                onClick={() => setActiveTab("mentors")}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  activeTab === "mentors"
                    ? "bg-[#1a1a1a] text-white"
                    : "text-[#5c5f69] hover:text-[#0d0d0f]"
                }`}
              >
                For Mentors
                <GraduationCap size={14} />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.title} service={s} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/mentee/find-mentors"
              className="inline-flex items-center gap-2.5 rounded-full border-[2.5px] border-[#1a1a1a] bg-[#F9C41A] px-7 py-3.5 text-[0.95rem] font-bold text-[#0d0d0f] shadow-[4px_4px_0_0_#1a1a1a] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#1a1a1a]"
            >
              Find Your Mentor
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
