"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "MBA Aspirant",
    type: "mentee",
    badge: { label: "IIM Convert", color: "bg-[#2563eb] text-white" },
    quote:
      "The mock interviews were a game-changer! My mentor from IIM-A gave me insights I could never find in books. Cleared my dream B-school interview!",
    tag: "CAT 2025",
    tagColor: "bg-[#fdf5f2] text-[#0d0d0f] border-[#e5e0dc]",
    stars: 5
  },
  {
    name: "Rahul Verma",
    role: "IIM Bangalore Alum",
    type: "mentor",
    badge: { label: "Top Mentor", color: "bg-[#F9C41A] text-[#0d0d0f]" },
    quote:
      "Earning while helping aspiring students is incredibly fulfilling. The platform is seamless and I love the flexibility!",
    tag: "Mentor",
    tagColor: "bg-white text-[#0d0d0f] border-[#e5e0dc]",
    stars: 5
  },
  {
    name: "Ananya Gupta",
    role: "MBA Aspirant",
    type: "mentee",
    badge: { label: "FMS Selected", color: "bg-[#F9C41A] text-[#0d0d0f]" },
    quote:
      "Group discussions here are so realistic! Practising with peers and getting instant feedback helped me ace my GD rounds.",
    tag: "FMS Delhi",
    tagColor: "bg-[#fdf5f2] text-[#0d0d0f] border-[#e5e0dc]",
    stars: 5
  },
  {
    name: "Vikram Singh",
    role: "IIM Ahmedabad Alum",
    type: "mentor",
    badge: { label: "Top Mentor", color: "bg-[#F9C41A] text-[#0d0d0f]" },
    quote:
      "Built my personal brand while giving back to the community. The dashboard makes scheduling super easy!",
    tag: "Mentor",
    tagColor: "bg-white text-[#0d0d0f] border-[#e5e0dc]",
    stars: 5
  },
  {
    name: "Sneha Patel",
    role: "MBA Aspirant",
    type: "mentee",
    badge: { label: "XLRI Convert", color: "bg-[#2563eb] text-white" },
    quote:
      "My mentor helped me craft a compelling story for my interview. The personalized attention made all the difference!",
    tag: "XLRI Jamshedpur",
    tagColor: "bg-[#fdf5f2] text-[#0d0d0f] border-[#e5e0dc]",
    stars: 5
  },
  {
    name: "Arjun Mehta",
    role: "FMS Delhi Alum",
    type: "mentor",
    badge: { label: "Super Mentor", color: "bg-[#F9C41A] text-[#0d0d0f]" },
    quote:
      "Love how I can set my own rates and availability. The students are genuinely motivated and it's amazing to see their growth!",
    tag: "Mentor",
    tagColor: "bg-white text-[#0d0d0f] border-[#e5e0dc]",
    stars: 5
  }
];

const tabs = [
  { key: "all", label: "All Stories" },
  { key: "mentee", label: "Mentees" },
  { key: "mentor", label: "Mentors" }
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-[#F9C41A]">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

function TestimonialCard({ t, className = "" }) {
  return (
    <article
      className={`flex flex-col rounded-[20px] border-[2.5px] border-[#1a1a1a] bg-white p-5 shadow-[4px_4px_0_0_#1a1a1a] ${className}`}
    >
      {/* Badge */}
      <span
        className={`mb-3 w-fit rounded-full px-3 py-1 text-[11px] font-bold ${t.badge.color}`}
      >
        {t.badge.label}
      </span>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fdf5f2] text-sm font-bold text-[#0d0d0f]">
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-extrabold text-[#0d0d0f]">{t.name}</p>
          <p className="text-xs text-[#5c5f69]">{t.role}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="mt-3">
        <Stars count={t.stars} />
      </div>

      {/* Quote */}
      <div className="relative mt-3 flex-1">
        <Quote
          size={18}
          className="absolute -left-0.5 -top-1 rotate-180 text-[#F9C41A] opacity-50"
          fill="currentColor"
          strokeWidth={0}
        />
        <p className="pl-5 text-[0.82rem] leading-[1.65] text-[#3a3d45]">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Tag pill */}
      <span
        className={`mt-4 w-fit rounded-full border px-3 py-1 text-[11px] font-bold ${t.tagColor}`}
      >
        {t.tag}
      </span>
    </article>
  );
}

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? testimonials
      : testimonials.filter((t) => t.type === activeTab);

  return (
    <section className="relative w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-10" style={{ backgroundColor: "#fdf5f2" }}>

      {/* Decorative — orange diamond top-left */}
      <div
        className="absolute left-6 top-8 h-16 w-16 rotate-45 rounded-[5px] bg-[#F9C41A] sm:left-12 sm:h-20 sm:w-20"
        aria-hidden="true"
      />
      {/* Smaller diamond overlapping */}
      <div
        className="absolute left-3 top-5 h-10 w-10 rotate-45 rounded-[3px] border-[3px] border-[#F9C41A] bg-transparent sm:left-8 sm:top-4 sm:h-12 sm:w-12"
        aria-hidden="true"
      />

      {/* Decorative — red triangle shape top-right area */}
      <div
        className="absolute right-10 top-[45%] h-10 w-10 rotate-12 bg-[#ef4444] sm:right-16 sm:h-14 sm:w-14"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        aria-hidden="true"
      />

      {/* Decorative — yellow shape mid-left area */}
      <div
        className="absolute bottom-[30%] left-4 h-8 w-8 rotate-20 rounded-[3px] bg-[#F9C41A] opacity-60 sm:left-8 sm:h-10 sm:w-10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">

        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F9C41A] px-4 py-2 text-sm font-bold text-[#0d0d0f] shadow-[3px_3px_0_0_#1a1a1a]">
            <Star size={14} fill="currentColor" strokeWidth={0} />
            Success Stories
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-5 text-center text-[2.2rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0d0d0f] sm:text-[2.8rem]">
          Real People.
          <br />
          Real Results.
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-md text-center text-[0.95rem] leading-relaxed text-[#5c5f69]">
          Don&#39;t just take our word for it — hear from those who&#39;ve transformed their careers!
        </p>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition-colors ${
                activeTab === tab.key
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-[2px_2px_0_0_#F9C41A]"
                  : "border-[#1a1a1a] bg-white text-[#0d0d0f] hover:bg-[#f5f5f5]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry-ish grid */}
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((t) => (
            <div key={t.name} className="mb-5 break-inside-avoid">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
