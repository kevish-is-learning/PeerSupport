"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cx } from "../ui/kit";

const NAV_LINKS = [
  { href: "/find-mentors", label: "Find Mentors" },
  { href: "/webinars", label: "Webinars" },
  { href: "/group-discussions", label: "Group Discussions" },
  { href: "/resources", label: "Resources" },
  { href: "/faq", label: "Help" },
];

/**
 * Header + footer chrome for the logged-out marketing pages.
 */
export default function PublicShell({ children, title, description, wide = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="text-base font-extrabold tracking-tight text-gray-900">
            Peer<span className="text-[#5061E4]">Support</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname?.startsWith(link.href)
                    ? "text-[#5061E4]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/auth"
              className="hidden rounded-lg bg-[#5061E4] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4453cc] sm:block"
            >
              Sign in
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-gray-100 bg-white px-4 py-2 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth"
              onClick={() => setMobileOpen(false)}
              className="mt-1 block rounded-lg bg-[#5061E4] px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Sign in
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {(title || description) && (
          <div className="border-b border-gray-100">
            <div
              className={cx(
                "mx-auto px-4 py-10 sm:px-6 sm:py-14",
                wide ? "max-w-6xl" : "max-w-4xl"
              )}
            >
              {title && (
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {title}
                </h1>
              )}
              {description && (
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}

        <div className={cx("mx-auto px-4 py-8 sm:px-6 sm:py-10", wide ? "max-w-6xl" : "max-w-4xl")}>
          {children}
        </div>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-gray-500 sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} PeerSupport. All rights reserved.</span>
          <div className="flex gap-4">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-gray-900">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
