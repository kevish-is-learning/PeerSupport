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
            : "/profile";
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#1f2432_0%,#0b0d12_42%,#06080d_100%)] p-3 text-[#f5f6f8] sm:p-6">
      <div className="mx-auto grid w-full gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <aside className="rounded-[1.75rem] border border-white/35 bg-[#11141c] p-4 shadow-[0_14px_45px_rgba(0,0,0,0.45)] sm:p-5 lg:min-h-[calc(100vh-3rem)] lg:sticky lg:top-6">
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/60">Mentor POV</p>
              <h1 className="mt-1 text-xl font-bold">Workspace</h1>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${approvalMeta.badgeClassName}`}>
              {approvalMeta.label}
            </span>
          </div>

          <nav className="mt-4 grid gap-2">
            {MENTOR_NAV_ITEMS.map((item) => {
              const isActive = normalizeMentorPath(item.href) === normalizedPath;
              const isLocked = item.requiresApproval && !approved;

              if (isLocked) {
                return (
                  <div
                    key={item.href}
                    className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white/45"
                  >
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.15em]">Locked</span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "border-white/60 bg-white/15 text-white"
                      : "border-white/15 bg-transparent text-white/85 hover:border-white/40 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={onLogout}
            className="mt-6 w-full rounded-2xl border border-white/35 bg-transparent px-3 py-2.5 text-left text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Logout
          </button>
        </aside>

        <section className="rounded-[1.75rem] border border-black/10 bg-[#f8f7f3] p-4 text-[#0d1117] shadow-[0_16px_45px_rgba(0,0,0,0.18)] sm:p-6 lg:p-7">
          <header className="rounded-2xl border border-black/10 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-black/50">Mentor Console</p>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-bold tracking-[-0.02em]">{activeItem.label}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${approvalMeta.badgeClassName}`}>
                {approvalMeta.label}
              </span>
            </div>
          </header>

          {showRestrictedView ? (
            <div className="mt-5 rounded-3xl border border-black/10 bg-[linear-gradient(130deg,#fff7dd_0%,#ffffff_55%)] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Access Restricted</p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">{approvalMeta.title}</h3>
              <p className="mt-3 max-w-2xl text-base text-black/75">{approvalMeta.description}</p>
              <p className="mt-5 rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-black/75">
                Waiting for approval from admin to access this page. You can continue with Profile and Help Center in the meantime.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/mentor/profile"
                  className="rounded-xl border-2 border-black bg-[#111827] px-4 py-2 text-sm font-bold text-white"
                >
                  Open Profile
                </Link>
                <Link
                  href="/mentor/help-center"
                  className="rounded-xl border-2 border-black bg-[#f3f4f6] px-4 py-2 text-sm font-bold text-black"
                >
                  Open Help Center
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-5">{children}</div>
          )}
        </section>
      </div>
    </main>
  );
}
