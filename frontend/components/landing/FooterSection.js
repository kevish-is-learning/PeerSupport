"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bird,
  Building2,
  Camera,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Phone,
  Play,
  Share2,
} from "lucide-react";

const contactInfo = [
  { Icon: Mail, text: "hello@peersupport.in", href: "mailto:hello@peersupport.in" },
  { Icon: Phone, text: "+91 123 456 7890", href: "tel:+911234567890" },
  { Icon: MapPin, text: "Mumbai, Maharashtra, India" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: Share2 },
  { label: "Twitter", href: "#", Icon: Bird },
  { label: "Instagram", href: "#", Icon: Camera },
  { label: "LinkedIn", href: "#", Icon: Building2 },
  { label: "YouTube", href: "#", Icon: Play },
];

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Find Mentors", href: "/explore-mentor" },
      { label: "Become a Mentor", href: "/auth?mode=register" },
      { label: "Group Sessions", href: "/mentee/find-mentors" },
      { label: "Mock Interviews", href: "/mentee/find-mentors" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Success Stories", href: "#" },
      { label: "MBA Prep Guide", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Contact Us", href: "mailto:hello@peersupport.in" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const bSchools = [
  "IIM Ahmedabad",
  "IIM Bangalore",
  "IIM Calcutta",
  "IIM Lucknow",
  "FMS Delhi",
  "XLRI Jamshedpur",
  "ISB Hyderabad",
  "SPJIMR Mumbai",
];

function BrandMark() {
  return (
    <div
      className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg border-2 border-black/80 bg-[#F9C41A] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
      aria-hidden="true"
    >
      <span className="text-[0.95rem] font-extrabold leading-none tracking-tight text-[#0d0d0f]">PS</span>
    </div>
  );
}

export default function FooterSection() {
  return (
    <>
      <div
        className="h-1.5 w-full bg-linear-to-r from-[#F59E0B] via-[#FFB800] to-[#5061E4]"
        aria-hidden
      />
      <footer className="bg-[#2d2d2d] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 sm:pt-16 pb-10 sm:pb-12 lg:px-10">
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <BrandMark />
                <div className="flex flex-col">
                  <span className="text-xl sm:text-[1.35rem] font-bold leading-tight tracking-[-0.03em] text-white">
                    Peer Support
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-400">Your Path to Top B-Schools</span>
                </div>
              </Link>

              <p className="mt-4 sm:mt-6 max-w-md text-xs sm:text-sm leading-relaxed text-gray-400">
                A mentorship marketplace connecting MBA aspirants with experienced professionals
                from IIMs, FMS, and other premier business schools.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col gap-3">
                {contactInfo.map((item) => {
                  const ContactIcon = item.Icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 min-w-0">
                      <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-gray-600/80 bg-[#2d2d2d] text-gray-400">
                        <ContactIcon size={16} strokeWidth={2} aria-hidden />
                      </span>
                      {item.href ? (
                        <a href={item.href} className="transition-colors hover:text-white truncate">
                          {item.text}
                        </a>
                      ) : (
                        <span className="truncate">{item.text}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:pt-0">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Stay Updated <span aria-hidden="true">📬</span>
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-400">
                Get weekly MBA prep tips, success stories, and exclusive mentor sessions straight to your inbox.
              </p>

              <form
                className="mt-5 sm:mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="min-h-11 flex-1 rounded-xl border-2 border-gray-500/80 bg-[#3a3a3a] px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-[#F9C41A] focus:ring-1 focus:ring-[#F9C41A] min-w-0"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-[#FFFFFF] bg-[#F9C41A] px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0d0d0f] shadow-[3px_3px_0_0_#FFFFFF33] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_#1a1a1a] cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
                </button>
              </form>

              <div className="mt-6 sm:mt-8">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Follow us
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map((social) => {
                    const SocialIcon = social.Icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-gray-600 bg-[#2d2d2d] text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
                      >
                        <SocialIcon size={16} strokeWidth={2} aria-hidden />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <hr className="border-gray-700/80" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 lg:px-10">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-[#F9C41A] truncate">{section.title}</h4>
                <ul className="mt-3 sm:mt-4 flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-white break-words"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <hr className="border-gray-700/80" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10 text-center lg:px-10">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gray-500">
            Mentors from top B-schools
          </p>
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-1.5 sm:gap-2.5">
            {bSchools.map((school) => (
              <span
                key={school}
                className="rounded-full border border-gray-600 bg-[#2d2d2d] px-2.5 py-1 text-[11px] sm:text-xs font-medium text-gray-400"
              >
                {school}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <hr className="border-gray-700/80" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 sm:flex-row sm:gap-6">
            <p className="text-center sm:text-left">© 2026 Peer Support. All rights reserved.</p>
            <p className="inline-flex items-center justify-center gap-1 text-center">
              Made with{" "}
              <Heart className="inline-block h-3.5 w-3.5 fill-red-400 text-red-400" strokeWidth={2} aria-hidden />
              {" "}
              in India
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 sm:justify-end">
              <a href="#" className="inline-flex items-center gap-1 transition-colors hover:text-white">
                Sitemap
                <ExternalLink size={12} strokeWidth={2} className="shrink-0" aria-hidden />
              </a>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
