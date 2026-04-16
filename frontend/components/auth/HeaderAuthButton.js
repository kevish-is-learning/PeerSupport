"use client";

import { useEffect } from "react";
import Link from "next/link";
import useAuthStore from "../../store/useAuthStore";

const outlineBtn =
  "inline-flex h-11 items-center justify-center rounded-full border-2 border-black bg-white px-5 text-sm font-bold text-[#0d0d0f] transition-colors hover:bg-neutral-50";
const exploreBtn =
  "inline-flex h-11 items-center justify-center rounded-full border-2 border-black bg-[#2563eb] px-5 text-sm font-bold text-white shadow-[4px_4px_0_0_#1a1a1a] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_#1a1a1a]";

export default function HeaderAuthButton() {
  const { user, hasCheckedSession, fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  const exploreMentors = (
    <Link href="/explore-mentor" className={exploreBtn}>
      Book a Session
    </Link>
  );

  if (!hasCheckedSession) {
    return (
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <span className="inline-flex h-11 min-w-[5.5rem] animate-pulse rounded-full border border-black/20 bg-white/80" />
        <span className="inline-flex h-11 min-w-[8.5rem] animate-pulse rounded-full border-2 border-black/20 bg-[#2563eb]/40" />
      </div>
    );
  }

  if (user) {
    const targetPath =
      user.role !== "ADMIN" && !user.onboardingCompleted
        ? "/onboarding"
        : user.role === "MENTOR"
          ? "/mentor/dashboard"
          : user.role === "MENTEE"
            ? "/mentee/dashboard"
            : user.role === "ADMIN"
              ? "/admin/dashboard"
              : "/profile";

    return (
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <Link href={targetPath} className={outlineBtn}>
          {user.name || user.email}
        </Link>
        {exploreMentors}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
      <Link href="/auth?mode=login" className={outlineBtn}>
        Sign In
      </Link>
      {exploreMentors}
    </div>
  );
}
