"use client";

import Link from "next/link";

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13L2 4" />
      </svg>
    ),
    text: "hello@peersupport.in",
    href: "mailto:hello@peersupport.in",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    text: "+91 123 456 7890",
    href: "tel:+911234567890",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    text: "Mumbai, Maharashtra, India",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1a1a2e" />
      </svg>
    ),
  },
];

const footerLinks = [
  {
    title: "Product",
    color: "text-[#3b82f6]",
    links: [
      { label: "Find Mentors", href: "/mentee/find-mentors" },
      { label: "Become a Mentor", href: "#" },
      { label: "Group Sessions", href: "#" },
      { label: "Mock Interviews", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Resources",
    color: "text-[#f59e0b]",
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
    color: "text-[#ef4444]",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Legal",
    color: "text-[#ef4444]",
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

export default function FooterSection() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Left — Brand & Contact */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <BrandMark />
              <div className="flex flex-col text-[1.35rem] font-bold leading-[0.95] tracking-[-0.04em]">
                <span>Peer</span>
                <span>Support</span>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-400">
              India&apos;s leading mentorship marketplace connecting MBA aspirants with
              experienced professionals from IIMs, FMS, and other premier business schools.
            </p>

            <div className="mt-6 flex flex-col gap-3.5">
              {contactInfo.map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-700 text-gray-400">
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-white">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Newsletter & Social */}
          <div>
            <h3 className="text-xl font-bold">Stay Updated !</h3>
            <p className="mt-2 text-sm text-gray-400">
              Get weekly MBA prep tips, success stories, and exclusive mentor sessions
              straight to your inbox.
            </p>

            <form className="mt-5 flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-700 bg-[#252540] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#F9C41A]"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-[#F9C41A] px-6 py-3 text-sm font-bold text-[#0d0d0f] transition-opacity hover:opacity-90"
              >
                Subscribe →
              </button>
            </form>

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Follow Us
              </p>
              <div className="mt-3 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors hover:border-gray-500 hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <hr className="border-gray-800" />
      </div>

      {/* Links Section */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className={`text-sm font-bold ${section.color}`}>{section.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
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

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <hr className="border-gray-800" />
      </div>

      {/* B-Schools */}
      <div className="mx-auto max-w-7xl px-6 py-8 text-center lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Mentors from Top B-Schools
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {bSchools.map((school) => (
            <span
              key={school}
              className="rounded-full border border-gray-700 px-4 py-1.5 text-xs font-medium text-gray-400"
            >
              {school}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <hr className="border-gray-800" />
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 sm:flex-row">
          <p>© 2026 PeerSupport. All rights reserved.</p>
          <p>
            Made with <span className="text-red-500">❤</span> in India
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="transition-colors hover:text-white">
              Sitemap ↗
            </Link>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
