"use client";

import { useEffect } from "react";
import Link from "next/link";
import useAuthStore from "../../store/useAuthStore";

export default function HeaderAuthButton() {
  const { user, hasCheckedSession, fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  if (!hasCheckedSession) {
    return (
      <span className="inline-flex h-11 min-w-37.5 items-center justify-center rounded-full border-2 border-black bg-[#f3f0ee] px-5 text-sm font-semibold">
        Loading...
      </span>
    );
  }

  if (user) {
    const targetPath = user.role === "MENTEE" && !user.onboardingCompleted ? "/onboarding" : "/profile";

    return (
      <Link
        href={targetPath}
        className="inline-flex h-11 min-w-37.5 items-center justify-center rounded-full border-2 border-black bg-[#c6f6d5] px-5 text-sm font-semibold shadow-[3px_3px_0_rgba(0,0,0,1)] transition-all hover:translate-y-0.5 hover:shadow-[0px_0px_0_rgba(0,0,0,1)]"
      >
        {user.name || user.email}
      </Link>
    );
  }

  return (
    <Link
      href="/auth?mode=login"
      className="inline-flex h-11 min-w-37.5 items-center justify-center rounded-full border-2 border-black bg-[#5f6cf3] px-5 text-sm font-semibold text-[#f8f8ff] shadow-[3px_3px_0_rgba(0,0,0,1)] transition-all hover:translate-y-0.5 hover:shadow-[0px_0px_0_rgba(0,0,0,1)]"
    >
      Login / Sign up
    </Link>
  );
}
