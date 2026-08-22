"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Menu, X, Users, BookOpen, Layers, Info } from "lucide-react";
import HeaderAuthButton from "../auth/HeaderAuthButton";
import BecomeMentorHeroButton from "./BecomeMentorHeroButton";
import HighlightPill from "../ui/HighlightPill";
import PillButton from "../ui/PillButton";

const navItems = [
  { label: "Find Mentors", href: "/mentee/find-mentors", icon: Users },
  { label: "Services", href: "#services", icon: Layers },
  { label: "How It Works", href: "#how-it-works", icon: BookOpen },
  { label: "About", href: "#about", icon: Info },
];

const BRAND_BG = "#FDF5F3";

function BrandMark() {
  return (
    <div
      className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-[4px] border-2 sm:border-[3px] border-[#1a1a1a] bg-[#2563eb] shadow-[2px_2px_0px_0px_#1a1a1a]"
      aria-hidden="true"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function MentorCardIllustration() {
  return (
    <div className="relative flex items-center justify-center py-6 sm:py-10 lg:py-4 max-w-full overflow-visible">
      <div className="relative h-[278px] w-[210px] sm:h-69.5 sm:w-52.5">
        {/* Blue card — furthest back */}
        <div
          className="absolute left-20 sm:left-27.5 top-2.5 h-[270px] w-[200px] sm:h-69.5 sm:w-52.5 rotate-14 rounded-[26px] border-[3px] border-[#1a1a1a] bg-[#2563eb]"
          style={{ zIndex: 1 }}
        />

        {/* Red card */}
        <div
          className="absolute left-12 sm:left-17.5 top-1.5 h-[270px] w-[200px] sm:h-69.5 sm:w-52.5 rotate-[7deg] rounded-[26px] border-[3px] border-[#1a1a1a] bg-[#ef4444]"
          style={{ zIndex: 2 }}
        />

        {/* Peach / tan card */}
        <div
          className="absolute left-6 sm:left-8 top-1 h-[270px] w-[200px] sm:h-69.5 sm:w-52.5 rotate-3 rounded-[26px] border-[3px] border-[#1a1a1a] bg-[#f5c6aa]"
          style={{ zIndex: 3 }}
        />

        {/* White front card */}
        <div
          className="absolute left-0 top-0 flex h-[270px] w-[200px] sm:h-69.5 sm:w-52.5 flex-col rounded-[26px] border-[3px] border-[#1a1a1a] bg-white p-4 sm:p-5 shadow-[6px_6px_0_0_#1a1a1a]"
          style={{ zIndex: 4 }}
        >
          {/* Avatar circle */}
          <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full border-[2.5px] border-[#1a1a1a] bg-[#F9C41A]" />

          {/* Placeholder lines */}
          <div className="mt-4 sm:mt-5 space-y-2.5">
            <div className="h-2.5 rounded-full bg-gray-200" />
            <div className="h-2.5 w-[82%] rounded-full bg-gray-200" />
            <div className="h-2.5 w-[65%] rounded-full bg-gray-200" />
            <div className="mt-1 h-2 w-[45%] rounded-full bg-gray-100" />
          </div>

          {/* Action pills at bottom */}
          <div className="mt-auto flex gap-2.5">
            <div className="h-7 sm:h-8 flex-1 rounded-full border border-gray-200 bg-gray-100" />
            <div className="h-7 sm:h-8 flex-1 rounded-full border border-gray-200 bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <section
      className="flex min-h-screen flex-col overflow-x-clip"
      style={{ backgroundColor: BRAND_BG }}
    >
      {/* ── HEADER ───────────────────────────────────────── */}
      <header
        className="relative z-40 w-full border-b-2 border-black px-4 py-3 sm:px-6 lg:px-10"
        style={{ backgroundColor: BRAND_BG }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-80"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BrandMark />
            <div className="flex flex-col text-[1.2rem] sm:text-[1.45rem] font-black leading-tight tracking-[-0.04em] text-[#0d0d0f]">
              <span>Peer Support</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden items-center justify-center gap-x-6 lg:gap-x-8 text-[0.9rem] font-bold text-black md:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-[#2563eb]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex shrink-0 items-center justify-end gap-3">
            <HeaderAuthButton />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#1a1a1a] transition-all hover:bg-neutral-50 active:translate-x-px active:translate-y-px active:shadow-none"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY & DRAWER ─────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[61px] sm:top-[65px] z-50 flex flex-col bg-black/40 backdrop-blur-xs md:hidden animate-in fade-in duration-200">
          <div
            className="w-full border-b-2 border-black bg-[#FDF5F3] px-5 py-6 shadow-xl max-h-[calc(100vh-65px)] overflow-y-auto"
            style={{ backgroundColor: BRAND_BG }}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-base font-bold text-gray-900 transition-colors hover:bg-white active:bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/20 bg-[#FBECE6] text-[#2563eb]">
                      <Icon size={16} strokeWidth={2.5} />
                    </div>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-black/15 pt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                Get Started
              </p>
              <div className="flex flex-col gap-3">
                <div onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <HeaderAuthButton />
                </div>
                <div onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <BecomeMentorHeroButton />
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop click to close */}
          <div
            className="flex-1 w-full"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}

      {/* ── HERO BODY ─────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-8 sm:px-6 sm:py-14 lg:px-10">
        <div className="grid w-full items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left — copy */}
          <div className="flex flex-col items-start min-w-0 max-w-full">
            {/* Badge */}
            <HighlightPill
              text="MBA Mentorship Platform"
              variant="primary"
              icon={<Sparkles size={16} />}
            />

            {/* Heading */}
            <h1 className="mt-4 sm:mt-5 text-[2.15rem] xs:text-[2.65rem] sm:text-[3.2rem] lg:text-[3.6rem] xl:text-[3.8rem] font-black leading-[1.12] tracking-[-0.03em] text-[#0d0d0f] break-words max-w-full">
              Your Gateway to
              <br />
              <span className="inline-block pb-1 text-[#2563eb]">Top B&#8209;Schools</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 max-w-xl text-sm leading-[1.7] text-[#5c5f69] xs:text-base sm:text-[1.05rem]">
              Connect with experienced mentors from IIMs, FMS &amp; top
              B&#8209;schools. Get personalized guidance, ace your interviews,
              and achieve your MBA dreams.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 w-full xs:w-auto">
              <PillButton href="/mentee/find-mentors" variant="yellow" className="justify-center text-center">
                Find Your Mentor
                <ArrowRight size={16} className="ml-2" />
              </PillButton>
              <div className="w-full xs:w-auto flex justify-center xs:justify-start">
                <BecomeMentorHeroButton />
              </div>
            </div>
          </div>

          {/* Right — illustration */}
          <div className="flex items-center justify-center lg:justify-end py-4 sm:py-6 overflow-hidden">
            <MentorCardIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
