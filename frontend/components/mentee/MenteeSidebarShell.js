"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Home, Calendar as CalendarIcon, Search, User, LogOut } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import {
  getWorkspaceRouteByRole,
  normalizeMenteePath,
} from "./menteeNavigation";

export default function MenteeSidebarShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const {
    user,
    isLoading,
    hasCheckedSession,
    fetchCurrentUser,
    logout,
  } = useAuthStore();

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  useEffect(() => {
    if (!hasCheckedSession) {
      return;
    }

    if (!user) {
      router.replace("/auth?mode=login");
      return;
    }

    if (user.role !== "MENTEE") {
      router.replace(getWorkspaceRouteByRole(user.role));
      return;
    }

    if (!user.onboardingCompleted) {
      router.replace("/onboarding");
    }
  }, [hasCheckedSession, user, router]);

  const normalizedPath = normalizeMenteePath(pathname);

  const NAV_ITEMS = [
    { label: "Home", href: "/mentee/dashboard", icon: Home },
    { label: "My Sessions", href: "/mentee/sessions", icon: CalendarIcon },
    { label: "Explore Mentors", href: "/find-mentors", icon: Search },
    { label: "Profile", href: "/mentee/profile", icon: User },
  ];

  const onLogout = async () => {
    try {
      await logout();
      router.replace("/auth?mode=login");
    } catch (_error) {
      // Toast handled in store.
    }
  };

  if (!hasCheckedSession || isLoading) {
    return (
      <main className="min-h-screen bg-[#FCF8F5] p-4 flex items-center justify-center">
        <p className="text-lg font-bold text-gray-900">Loading mentee workspace...</p>
      </main>
    );
  }

  if (!user || user.role !== "MENTEE" || !user.onboardingCompleted) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-[#FCF8F5] text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-r-2 border-black bg-white px-6 py-8">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#8B5CF6] text-xl font-black text-white shadow-[2px_2px_0px_0px_#1E1E1E]">
            P
          </div>
          <span className="text-xl font-extrabold tracking-tight">Peer Support</span>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = normalizeMenteePath(item.href) === normalizedPath;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-[#F3E8FF] text-[#8B5CF6]"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onLogout}
          className="mt-auto flex w-full items-center gap-3 rounded-xl border-2 border-black bg-[#FDE6D5] px-4 py-3 text-sm font-bold text-gray-900 transition-transform active:translate-y-1"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 lg:p-12">
        {children}
      </main>
    </div>
  );
}
