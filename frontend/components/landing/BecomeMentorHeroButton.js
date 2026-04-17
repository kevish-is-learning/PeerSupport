"use client";

import { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import PillButton from "../ui/PillButton";
import { ArrowRight } from "lucide-react";

export default function BecomeMentorHeroButton() {
  const { user, hasCheckedSession, fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    if (!hasCheckedSession) {
      fetchCurrentUser();
    }
  }, [hasCheckedSession, fetchCurrentUser]);

  if (!hasCheckedSession) {
    return (
      <span
        className="inline-flex h-11 min-w-41.25 animate-pulse rounded-full border-2 border-black/20 bg-[#f3f0ee]/60"
        aria-hidden="true"
      />
    );
  }

  const href = user ? "/mentor/dashboard" : "/auth?mode=register";

  return (
    <PillButton href={href} variant="primary">
      Become a Mentor
      <ArrowRight size={16} className="ml-2"/>
    </PillButton>
  );
}
