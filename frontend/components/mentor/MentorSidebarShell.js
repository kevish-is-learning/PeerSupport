"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import useAuthStore from "../../store/useAuthStore";
import {
  MENTOR_NAV_ITEMS,
  getMentorApprovalMeta,
  isMentorApproved,
  isMentorRouteAllowedWithoutApproval,
  normalizeMentorPath,
} from "./mentorNavigation";

import { LogOut } from "lucide-react";

export default function MentorSidebarShell({ children }) {
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
    <main className="h-screen bg-[#FAF9F6] flex text-black">
      <aside className="w-72 shrink-0 border-r-[3px] border-black bg-white flex flex-col h-screen">
        <div className="p-8 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5061E4] border-[3px] border-black text-white font-black text-xl shadow-[2px_2px_0_0_#000]">
              P
            </div>
            <span className="font-black text-[#111] text-xl tracking-tight">Peer Support</span>
          </div>
          <div className="ml-0.5">
            <span className="inline-block rounded-lg border-2 border-black bg-[#F59E0B] px-3 py-1 text-[10px] font-black text-black uppercase tracking-wider shadow-[2px_2px_0_0_#000]">
              Mentor
            </span>
          </div>
        </div>

        <nav className="mt-4 px-6 flex flex-col gap-3 grow">
          {MENTOR_NAV_ITEMS.map((item) => {
            const isActive = normalizeMentorPath(item.href) === normalizedPath;
            const isLocked = item.requiresApproval && !approved;
            const Icon = item.icon;

            if (isLocked) {
              return (
                <div
                  key={item.href}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 text-sm text-gray-300 border-2 border-transparent"
                >
                  <div className="flex items-center gap-4">
                    <Icon size={20} strokeWidth={2.5} />
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
                className={`flex items-center gap-4 rounded-2xl px-4 py-4 font-black transition-all ${
                  isActive
                    ? "text-[#5061E4] text-lg bg-[#FAF9F6] border-[3px] border-black shadow-[4px_4px_0_0_#5061E4]"
                    : "text-gray-400 hover:text-black hover:bg-gray-50 text-base"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 3 : 2.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border-[3px] border-black bg-[#FDE9E6] px-5 py-4 text-base font-black text-black transition-all shadow-[4px_4px_0_0_#000] hover:bg-[#facdc5] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            <LogOut size={20} strokeWidth={3} />
            Logout
          </button>
        </div>
      </aside>

      <section className="flex-1 flex flex-col h-screen">
        {showRestrictedView ? (
          <div className="p-8 lg:p-12 h-full overflow-y-auto w-full">
            <div className="mt-5 rounded-3xl border-[3px] border-black bg-[#fff7dd] p-6 sm:p-8" style={{ boxShadow: "6px 6px 0 0 #000" }}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/60">Access Restricted</p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">{approvalMeta.title}</h3>
              <p className="mt-3 max-w-2xl text-base text-black/80">{approvalMeta.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/mentor/profile"
                  className="rounded-xl border-[3px] border-black bg-[#111827] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                  style={{ boxShadow: "3px 3px 0 0 #000" }}
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
