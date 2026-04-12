"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/useAuthStore";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, hasCheckedSession, fetchCurrentUser, logout } = useAuthStore();

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  useEffect(() => {
    if (hasCheckedSession && !user) {
      router.replace("/auth?mode=login");
    }
  }, [hasCheckedSession, user, router]);

  useEffect(() => {
    if (hasCheckedSession && user?.role === "MENTEE" && !user?.onboardingCompleted) {
      router.replace("/onboarding");
    }
  }, [hasCheckedSession, user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth?mode=login");
    } catch (_error) {
      // Toast is handled by store.
    }
  };

  if (!hasCheckedSession || isLoading) {
    return (
      <main className="min-h-screen bg-[#FFFFFF] bg-grid-paper px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl rounded-[1.75rem] border-2 border-black bg-white p-6 shadow-[6px_6px_0_rgba(0,0,0,1)]">
          <p className="text-lg font-semibold">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] bg-grid-paper px-4 py-10 text-[#0d0d0f] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-[1.75rem] border-2 border-black bg-white p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">Your Profile</h1>
        <p className="mt-2 text-[#66686d]">You are authenticated and this page is accessible only when logged in.</p>

        <div className="mt-6 rounded-xl border border-black/20 bg-[#f7fafc] p-4">
          <p className="text-sm text-black/70">Name</p>
          <p className="text-lg font-bold">{user.name || "Not set"}</p>
          <p className="mt-4 text-sm text-black/70">Email</p>
          <p className="text-base font-semibold">{user.email}</p>
          <p className="mt-4 text-sm text-black/70">Onboarding Status</p>
          <p className="text-base font-semibold">
            {user.role === "MENTEE" ? (user.onboardingCompleted ? "Completed" : "Pending") : "Not required"}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {user.role === "MENTEE" ? (
            <Link
              href="/onboarding"
              className="rounded-xl border-2 border-black bg-[#ffc20f] px-4 py-2 text-sm font-bold text-black"
            >
              Manage Onboarding
            </Link>
          ) : null}
          <Link
            href="/"
            className="rounded-xl border-2 border-black bg-[#5f6cf3] px-4 py-2 text-sm font-bold text-white"
          >
            Go to Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border-2 border-black bg-[#f56565] px-4 py-2 text-sm font-bold text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
