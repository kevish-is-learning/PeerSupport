"use client";

import { useEffect } from "react";
import Link from "next/link";
import useAuthStore from "../../store/useAuthStore";
import PillButton from "../ui/PillButton";

const outlineBtn =
  "inline-flex h-11 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-white px-5 text-sm font-bold text-[#0d0d0f] transition-colors hover:bg-neutral-50";
export default function HeaderAuthButton() {
  const { user, hasCheckedSession, fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  const BookSession = (
    <PillButton href="/mentors" variant="primary">
      Book a Session
    </PillButton>
  );

  if (!hasCheckedSession) {
    return (
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <span className="inline-flex h-11 min-w-22 animate-pulse rounded-full border border-black/20 bg-white/80" />
        <span className="inline-flex h-11 min-w-34 animate-pulse rounded-full border-2 border-black/20 bg-[#2563eb]/40" />
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
      <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <Link href={targetPath} className={outlineBtn}>
          {user.name || user.email}
        </Link>
        {BookSession}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
      <Link href="/auth?mode=login" className={outlineBtn}>
        Sign In
      </Link>
      {BookSession}
    </div>
  );
}
