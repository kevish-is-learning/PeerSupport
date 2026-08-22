"use client";

import { useEffect } from "react";
import Link from "next/link";
import useAuthStore from "../../store/useAuthStore";
import PillButton from "../ui/PillButton";

const outlineBtn =
  "inline-flex h-10 sm:h-11 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-white px-4 sm:px-5 text-xs sm:text-sm font-bold text-[#0d0d0f] transition-colors hover:bg-neutral-50 shadow-[2px_2px_0px_0px_#1a1a1a]";

export default function HeaderAuthButton() {
  const { user, hasCheckedSession, fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  const BookSession = (
    <PillButton href="/mentee/find-mentors" variant="primary" className="justify-center text-center">
      Book a Session
    </PillButton>
  );

  if (!hasCheckedSession) {
    return (
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <span className="inline-flex h-10 sm:h-11 min-w-20 animate-pulse rounded-full border border-black/20 bg-white/80" />
        <span className="inline-flex h-10 sm:h-11 min-w-28 animate-pulse rounded-full border-2 border-black/20 bg-[#2563eb]/40" />
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
              : "/auth?mode=login";

    return (
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto">
        <Link href={targetPath} className={`${outlineBtn} truncate max-w-48`}>
          {user.name || user.email}
        </Link>
        {BookSession}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto">
      <Link href="/auth?mode=login" className={outlineBtn}>
        Sign In
      </Link>
      {BookSession}
    </div>
  );
}
