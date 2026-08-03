"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import {
  MENTOR_NAV_ITEMS,
  getMentorApprovalMeta,
  isMentorApproved,
  isMentorRouteAllowedWithoutApproval,
  normalizeMentorPath,
} from "./mentorNavigation";

import { LogOut, Menu, X } from "lucide-react";

export default function MentorSidebarShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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

    if (user.role !== "MENTOR") {
      const targetPath =
        user.role === "MENTEE"
          ? "/mentee/dashboard"
          : user.role === "ADMIN"
            ? "/admin/dashboard"
            : "/auth?mode=login";
      router.replace(targetPath);
      return;
    }

    if (!user.onboardingCompleted) {
      router.replace("/onboarding");
    }
  }, [hasCheckedSession, user, router]);

  const normalizedPath = normalizeMentorPath(pathname);
  const approved = isMentorApproved(user);
  const approvalMeta = getMentorApprovalMeta(user);

  const showRestrictedView =
    Boolean(user) &&
    user.role === "MENTOR" &&
    user.onboardingCompleted &&
    !approved &&
    !isMentorRouteAllowedWithoutApproval(normalizedPath);

  const onLogout = async () => {
    try {
      await logout();
      router.replace("/auth?mode=login");
    } catch (_error) {
      // Toast handled in store.
    }
  };


  if (!user || user.role !== "MENTOR" || !user.onboardingCompleted) {
    return null;
  }

  return (
    <main className="h-screen bg-[#FAF9F6] flex flex-col md:flex-row text-black overflow-hidden">
      {/* Mobile Top Navigation */}
      <div className="md:hidden flex items-center justify-between p-4 border-b-2 border-black bg-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5061E4] text-white font-bold text-sm">
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
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5061E4] text-white font-bold text-sm">
                P
              </div>
              <span className="font-extrabold text-[#111] text-lg">Peer Support</span>
            </div>
            <div className="mt-3">
              <span className="inline-block rounded-md bg-[#F59E0B] px-3 py-1 text-xs font-bold text-white">
                Mentor
              </span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-6 px-4 flex flex-col gap-1.5 grow overflow-y-auto">
          {MENTOR_NAV_ITEMS.map((item) => {
            const isActive = normalizeMentorPath(item.href) === normalizedPath;
            const isLocked = item.requiresApproval && !approved;
            const Icon = item.icon;

            if (isLocked) {
              return (
                <div
                  key={item.href}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-gray-300 border-2 border-transparent"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span className="font-bold">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Locked</span>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 font-bold transition-all ${
                  isActive
                    ? "text-[#5061E4] text-base bg-[#E0E7FF]"
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

      <section className="flex-1 flex flex-col h-screen relative">
        {showRestrictedView ? (
          <div className="px-8 lg:px-12 h-full overflow-y-auto w-full">
            <div className="rounded-3xl border-2 border-black bg-[#fff7dd] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/60">Access Restricted</p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">{approvalMeta.title}</h3>
              <p className="mt-3 max-w-2xl text-base text-black/80">{approvalMeta.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/mentor/profile"
                  className="rounded-xl border-2 border-black bg-[#111827] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                >
                  Open Profile
                </Link>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </section>
    </main>
  );
}
