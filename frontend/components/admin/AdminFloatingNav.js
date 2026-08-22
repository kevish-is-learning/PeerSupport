"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { ADMIN_NAV_ITEMS, normalizeAdminPath } from "./adminNavigation";
import useAuthStore from "../../store/useAuthStore";

export default function AdminFloatingNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const normalizedPath = normalizeAdminPath(pathname);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth?mode=login");
    } catch (_error) {
      // Handled in store
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-max overflow-visible">
      <nav className="flex items-center gap-1 sm:gap-1.5 rounded-[2.5rem] p-2 sm:p-2.5 bg-white/95 dark:bg-[#0c0c0e]/95 border border-zinc-200 dark:border-zinc-800 shadow-2xl backdrop-blur-xl w-max mx-auto relative transition-colors duration-200">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = normalizeAdminPath(item.href) === normalizedPath;
          const Icon = item.icon;

          return (
            <div key={item.href} className="relative flex items-center justify-center">
              <Link
                href={item.href}
                className={`flex items-center justify-center transition-all duration-200 ease-in-out relative cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white rounded-full px-4 sm:px-5 py-2.5 sm:py-3 gap-2 sm:gap-2.5 shadow-lg shadow-indigo-600/30 border border-indigo-500/50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-full w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] border border-transparent"
                }`}
                aria-label={item.label}
              >
                <Icon
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`shrink-0 ${
                    isActive
                      ? "w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
                      : "w-5 h-5 sm:w-[22px] sm:h-[22px]"
                  }`}
                />
                {isActive && (
                  <span className="text-[13px] sm:text-sm font-bold tracking-wide whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            </div>
          );
        })}

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

        {/* Quick Logout */}
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-full w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] border border-transparent transition-all duration-200 cursor-pointer"
            aria-label="Logout"
          >
            <LogOut strokeWidth={2} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
          </button>
        </div>
      </nav>
    </div>
  );
}

