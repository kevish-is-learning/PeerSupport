"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import useAuthStore from "../../store/useAuthStore";
import { ADMIN_NAV_ITEMS, normalizeAdminPath } from "./adminNavigation";

const getRedirectRouteForUser = (user) => {
  if (!user) {
    return "/auth?mode=login";
  }

  if (user.role !== "ADMIN" && !user.onboardingCompleted) {
    return "/onboarding";
  }

  if (user.role === "MENTOR") {
    return "/mentor/dashboard";
  }

  if (user.role === "MENTEE") {
    return "/mentee/dashboard";
  }

  if (user.role === "ADMIN") {
    return "/admin/dashboard";
  }

  return "/auth?mode=login";
};

export default function AdminSidebarShell({ children }) {
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

    if (!user || user.role !== "ADMIN") {
      router.replace(getRedirectRouteForUser(user));
    }
  }, [hasCheckedSession, user, router]);

  const normalizedPath = normalizeAdminPath(pathname);
  const activeItem = useMemo(
    () =>
      ADMIN_NAV_ITEMS.find((item) => normalizeAdminPath(item.href) === normalizedPath) ||
      ADMIN_NAV_ITEMS[0],
    [normalizedPath]
  );

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
      <main className="min-h-screen bg-[#0f141e] p-4 text-[#f7f8fb] sm:p-6 lg:p-8">
        <div className="mx-auto flex min-h-[80vh] w-full items-center justify-center rounded-4xl border border-white/20 bg-[#141b28] px-6 py-12">
          <p className="text-lg font-semibold">Loading admin workspace...</p>
        </div>
      </main>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_12%_15%,#2d3352_0%,#151b2b_45%,#0b101a_100%)] p-3 text-[#f4f5f8] sm:p-6">
      <div className="mx-auto grid w-full gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
        <aside className="rounded-[1.75rem] border border-white/30 bg-[#171d2c] p-4 shadow-[0_14px_45px_rgba(0,0,0,0.4)] sm:p-5 lg:min-h-[calc(100vh-3rem)] lg:sticky lg:top-6">
          <div className="border-b border-white/15 pb-4">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/60">Admin Console</p>
            <h1 className="mt-1 text-xl font-bold">Control Center</h1>
          </div>

          <nav className="mt-4 grid gap-2">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive = normalizeAdminPath(item.href) === normalizedPath;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "border-white/65 bg-white/15 text-white"
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

        <section className="rounded-[1.75rem] border border-black/10 bg-[#f8f7f3] p-4 text-[#0d1117] shadow-[0_16px_45px_rgba(0,0,0,0.2)] sm:p-6 lg:p-7">
          <header className="rounded-2xl border border-black/10 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-black/50">Admin Workspace</p>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-bold tracking-[-0.02em]">{activeItem.label}</h2>
              <span className="rounded-full bg-[#e0e7ff] px-3 py-1 text-xs font-bold text-[#312e81]">
                {user.name || "Administrator"}
              </span>
            </div>
          </header>
          <div className="mt-5">{children}</div>
        </section>
      </div>
    </main>
  );
}
