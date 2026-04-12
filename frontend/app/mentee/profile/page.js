"use client";

import Link from "next/link";
import { useEffect } from "react";
import useAuthStore from "../../../store/useAuthStore";

export default function MenteeProfilePage() {
  const { user, hasCheckedSession, fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#f5f3ff_0%,#ffffff_100%)] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-black/50">Profile</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Your Learning Profile</h3>
        <p className="mt-2 text-black/70">
          Keep your goals, background, and skill interests updated to get better mentor recommendations.
        </p>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-black/10 bg-[#f8fafc] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-black/50">Name</p>
            <p className="mt-1 text-lg font-bold">{user?.name || "Not set"}</p>
          </article>
          <article className="rounded-xl border border-black/10 bg-[#f8fafc] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-black/50">Email</p>
            <p className="mt-1 text-base font-semibold">{user?.email || "Not available"}</p>
          </article>
          <article className="rounded-xl border border-black/10 bg-[#f8fafc] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-black/50">Role</p>
            <p className="mt-1 text-base font-semibold">{user?.role || "MENTEE"}</p>
          </article>
          <article className="rounded-xl border border-black/10 bg-[#f8fafc] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-black/50">Onboarding</p>
            <p className="mt-1 text-base font-semibold">{user?.onboardingCompleted ? "Completed" : "Pending"}</p>
          </article>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/profile"
            className="rounded-xl border-2 border-black bg-[#111827] px-4 py-2 text-sm font-bold text-white"
          >
            Profile Editor
          </Link>
        </div>
      </section>
    </div>
  );
}
