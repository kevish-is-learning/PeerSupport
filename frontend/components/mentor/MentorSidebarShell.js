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
  const approvalStatus = user?.mentorApprovalStatus || "PENDING";
  const approved = isMentorApproved(approvalStatus);
  const approvalMeta = getMentorApprovalMeta(approvalStatus);

  const activeItem = useMemo(
    () =>
      MENTOR_NAV_ITEMS.find((item) => normalizeMentorPath(item.href) === normalizedPath) ||
      MENTOR_NAV_ITEMS[0],
    [normalizedPath]
  );

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

  if (!hasCheckedSession || isLoading) {
    return (
      <main className="min-h-screen bg-[#0a0c10] p-4 text-[#f7f8fb] sm:p-6 lg:p-8">
        <div className="mx-auto flex min-h-[80vh] w-full items-center justify-center rounded-4xl border border-white/20 bg-[#10131a] px-6 py-12">
          <p className="text-lg font-semibold">Loading mentor workspace...</p>
        </div>
      </main>
    );
  }

  if (!user || user.role !== "MENTOR" || !user.onboardingCompleted) {
    return null;
  }

  return (
    <main className="h-screen bg-[#FFF7F5] flex text-black overflow-hidden">
      <aside className="w-64 shrink-0 border-r-2 border-black bg-white flex flex-col h-screen">
        <div className="p-6 flex items-center gap-3 border-b-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5061E4] border-2 border-black text-white font-bold">
            P
          </div>
          <span className="font-extrabold text-[#111] text-lg">Peer Support</span>
        </div>

        <nav className="mt-6 px-4 flex flex-col gap-2 flex-grow">
          {MENTOR_NAV_ITEMS.map((item) => {
            const isActive = normalizeMentorPath(item.href) === normalizedPath;
            const isLocked = item.requiresApproval && !approved;
            const Icon = item.icon;

            if (isLocked) {
              return (
                <div
                  key={item.href}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-gray-400"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  <span className="text-[0.65rem] uppercase tracking-[0.15em]">Locked</span>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-all ${
                  isActive
                    ? "text-[#5061E4]"
                    : "text-gray-500 hover:text-black hover:bg-gray-50"
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
            className="flex w-full items-center gap-3 rounded-xl border-2 border-black bg-[#FDE9E6] px-4 py-3 text-sm font-bold text-black transition-all hover:bg-[#facdc5]"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <section className="flex-1 flex flex-col h-screen overflow-hidden">
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
