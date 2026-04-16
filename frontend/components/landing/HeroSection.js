import Link from "next/link";
import HeaderAuthButton from "../auth/HeaderAuthButton";
import BecomeMentorHeroButton from "./BecomeMentorHeroButton";
import HighlightPill from "../ui/HighlightPill";

const navItems = [
  { label: "Find Mentors", href: "/mentee/find-mentors" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" }
];

const stats = [
  { value: "400+", label: "Happy Mentees" },
  { value: "50+", label: "B-Schools" },
  { value: "1000+", label: "Hrs of sessions" },
  { value: "4.8", label: "Rating on Google" }
];

const BRAND_BG = "#fdf5f2";

function BrandMark() {
  return (
    <div
      className="flex h-10 w-10 shrink-0 -rotate-6 items-center justify-center rounded-[3px] border-[3px] border-[#1a1a1a] bg-[#2563eb]"
      aria-hidden="true"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function MentorCardIllustration() {
  return (
    <div className="relative flex items-center justify-center py-10 lg:py-4">
      <div className="relative h-[310px] w-[360px]">

        {/* Blue card — furthest back */}
        <div
          className="absolute left-[110px] top-[10px] h-[278px] w-[210px] rotate-14 rounded-[26px] border-[3px] border-[#1a1a1a] bg-[#2563eb]"
          style={{ zIndex: 1 }}
        />

        {/* Red card */}
        <div
          className="absolute left-[70px] top-[6px] h-[278px] w-[210px] rotate-[7deg] rounded-[26px] border-[3px] border-[#1a1a1a] bg-[#ef4444]"
          style={{ zIndex: 2 }}
        />

        {/* Peach / tan card */}
        <div
          className="absolute left-[32px] top-[4px] h-[278px] w-[210px] rotate-3 rounded-[26px] border-[3px] border-[#1a1a1a] bg-[#f5c6aa]"
          style={{ zIndex: 3 }}
        />

        {/* White front card */}
        <div
          className="absolute left-0 top-0 flex h-[278px] w-[210px] flex-col rounded-[26px] border-[3px] border-[#1a1a1a] bg-white p-5 shadow-[6px_6px_0_0_#1a1a1a]"
          style={{ zIndex: 4 }}
        >
          {/* Avatar circle */}
          <div className="h-14 w-14 shrink-0 rounded-full border-[2.5px] border-[#1a1a1a] bg-[#F9C41A]" />

          {/* Placeholder lines */}
          <div className="mt-5 space-y-2.5">
            <div className="h-2.5 rounded-full bg-gray-200" />
            <div className="h-2.5 w-[82%] rounded-full bg-gray-200" />
            <div className="h-2.5 w-[65%] rounded-full bg-gray-200" />
            <div className="mt-1 h-2 w-[45%] rounded-full bg-gray-100" />
          </div>

          {/* Action pills at bottom */}
          <div className="mt-auto flex gap-2.5">
            <div className="h-8 flex-1 rounded-full border border-gray-200 bg-gray-100" />
            <div className="h-8 flex-1 rounded-full border border-gray-200 bg-gray-100" />
          </div>
        </div>

        {/* Floating: 2000+ Students */}
        <HighlightPill
          text="2000+ Students"
          variant="secondary"
          className="absolute -top-20 left-5 z-10"
        />

        {/* Floating: 85% Success Rate */}
        <HighlightPill
          text="85% Success Rate"
          variant="primary"
          className="absolute bottom-0 -left-35 z-10"
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col" style={{ backgroundColor: BRAND_BG }}>

      {/* ── HEADER ───────────────────────────────────────── */}
      <header
        className="w-full border-b border-black px-4 py-3.5 sm:px-6 lg:px-10"
        style={{ backgroundColor: BRAND_BG }}
      >
        <div className="mx-auto grid w-full grid-cols-2 items-center gap-y-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-8 md:gap-y-0">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <BrandMark />
            <div className="flex flex-col text-[1.35rem] font-bold leading-[0.95] tracking-[-0.04em] text-[#0d0d0f] sm:text-[1.5rem]">
              <span>Peer Support</span>
            </div>
          </Link>

          <div className="col-start-2 row-start-1 justify-self-end md:col-start-3">
            <HeaderAuthButton />
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.9rem] font-semibold text-black sm:gap-x-7 sm:text-[0.95rem] md:col-span-1 md:col-start-2 md:row-start-1 md:justify-center"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-opacity hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HERO BODY ─────────────────────────────────────── */}
      <div className="mx-auto flex w-full flex-1 items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-6">

          {/* Left — copy */}
          <div className="flex flex-col items-start">

            {/* Badge */}
            <HighlightPill
              text="India's #1 MBA Mentorship Platform"
              variant="primary"
            />

            {/* Heading */}
            <h1 className="mt-5 text-[2.8rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0d0d0f] sm:text-[3.4rem] lg:text-[3.8rem]">
              Your Gateway to
              <br />
              <span className="relative inline-block pb-1">
                Top B&#8209;Schools
                {/* Yellow underline */}
                <span
                  className="absolute -bottom-1 left-0 block h-[5px] w-full rounded-sm"
                  style={{ backgroundColor: "#F9C41A" }}
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-[480px] text-base leading-[1.75] text-[#5c5f69] sm:text-[1.05rem]">
              Connect with experienced mentors from IIMs, FMS &amp; top B&#8209;schools.
              Get personalized guidance, ace your interviews, and achieve your MBA dreams.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/mentee/find-mentors"
                className="inline-flex items-center gap-2.5 rounded-full border-[2.5px] border-[#1a1a1a] bg-[#FFB705] px-7 py-3.5 text-[0.95rem] font-bold text-[#0d0d0f] shadow-[4px_4px_0_0_#1a1a1a] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#1a1a1a]"
              >
                Find Your Mentor
                <span aria-hidden="true" className="text-lg">
                  →
                </span>
              </Link>
              <BecomeMentorHeroButton />
            </div>

            {/* Social proof */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {/* Mentor avatars + count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-9 w-9 rounded-full border-[2.5px] bg-[#2563eb]"
                      style={{ borderColor: BRAND_BG }}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#0d0d0f]">500+ Mentors</span>
              </div>

              {/* Divider */}
              <span className="hidden h-5 w-px bg-black/20 sm:block" aria-hidden="true" />

              {/* Star rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#F9C41A]" aria-label="4.9 out of 5 stars">
                  {[0, 1, 2, 3].map((i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.09 6.26L21 10l-6.26 2.09L12 22l-2.09-6.26L3 14l6.26-2.09z" />
                    </svg>
                  ))}
                  {/* Half star (4.9) */}
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="halfStar">
                        <stop offset="80%" stopColor="#F9C41A" />
                        <stop offset="80%" stopColor="#d1d5db" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2l2.09 6.26L21 10l-6.26 2.09L12 22l-2.09-6.26L3 14l6.26-2.09z"
                      fill="url(#halfStar)"
                    />
                  </svg>
                </div>
                <span className="text-sm font-bold text-[#0d0d0f]">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right — illustration */}
          <div className="flex items-center justify-center lg:justify-end lg:pr-4">
            <MentorCardIllustration />
          </div>
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────── */}
      <div className="">
        <div
          className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-y-7 px-4 py-10 text-center sm:px-6 md:grid-cols-4 lg:px-8"
          aria-label="Platform highlights"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[2.2rem] font-extrabold leading-none tracking-[-0.04em] text-[#0d0d0f] sm:text-[2.8rem]">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-[#5c5f69] sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
