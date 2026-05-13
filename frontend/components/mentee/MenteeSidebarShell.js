"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import {
  MENTEE_NAV_ITEMS,
  normalizeMenteePath,
} from "./menteeNavigation";
import { LogOut, Home, CalendarDays, Compass, User as UserIcon, Menu, X } from "lucide-react";

// Map labels to icons
const getIconForNav = (label) => {
  switch (label) {
    case "Home": return Home;
    case "My Sessions": return CalendarDays;
    case "Explore Mentors": return Compass;
    case "Profile": return UserIcon;
    default: return Home;
  }
};

export default function MenteeSidebarShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const {
    user,
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
      const targetPath =
        user.role === "MENTOR"
          ? "/mentor/dashboard"
          : user.role === "ADMIN"
            ? "/admin/dashboard"
            : "/auth?mode=login";
      router.replace(targetPath);
      return;
    }

  }, [hasCheckedSession, user, router]);

  const normalizedPath = normalizeMenteePath(pathname);

  const onLogout = async () => {
    try {
      await logout();
      router.replace("/auth?mode=login");
    } catch (_error) {
      // Toast handled in store.
    }
  };

  if (!user || user.role !== "MENTEE") {
    return null;
  }

  return (
    <main className="h-screen bg-[#FFF7F5] flex flex-col md:flex-row text-black overflow-hidden">
      {/* Mobile Top Navigation */}
      <div className="md:hidden flex items-center justify-between p-4 border-b-2 border-black bg-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED] text-white font-bold text-sm">
            P
          </div>
          <span className="font-extrabold text-[#111] text-lg">Peer Support</span>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-1">
          <Menu size={24} />
        </button>
      </div>

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 border-r-2 border-black bg-white flex flex-col h-screen transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}>
        {/* Logo & Role Badge */}
        <div className="p-6 pb-2 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7C3AED] text-white font-bold text-sm">
                P
              </div>
              <span className="font-extrabold text-[#111] text-lg">Peer Support</span>
            </div>
            <div className="mt-3">
              <span className="inline-block rounded-md bg-[#10B981] px-3 py-1 text-xs font-bold text-white">
                Mentee
              </span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-4 flex flex-col gap-1.5 grow overflow-y-auto">
          {MENTEE_NAV_ITEMS.map((item) => {
            const isActive = normalizeMenteePath(item.href) === normalizedPath;
            const Icon = getIconForNav(item.label);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 font-bold transition-all ${
                  isActive
                    ? "text-[#7C3AED] text-base bg-[#F3E8FF]"
                    : "text-gray-500 hover:text-black hover:bg-gray-50 text-sm"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl border-2 border-black bg-[#FDE9E6] px-4 py-3 text-sm font-bold text-black transition-all hover:bg-[#facdc5] cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      <section className="flex-1 flex flex-col h-screen md:py-10 py-4 overflow-y-scroll relative">
        {children}
      </section>
    </main>
  );
}
