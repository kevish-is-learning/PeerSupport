"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { GraduationCap, Users, Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, fetchMe } = useAuthStore();
  const [selected, setSelected] = useState<"MENTEE" | "MENTOR" | null>(null);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    // If already a mentor, go to mentor dashboard
    if (user?.role === "MENTOR") {
      router.replace("/mentor/dashboard");
    }
  }, [isLoading, isAuthenticated, user, router]);

  const handleContinue = () => {
    if (selected === "MENTOR") {
      router.push("/apply-mentor");
    } else if (selected === "MENTEE") {
      // For mentee, they stay as MENTEE (default role)
      router.push("/mentee/dashboard");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground">Welcome to PeerSupport</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            How would you like to use the platform?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mentee Card */}
          <button
            onClick={() => setSelected("MENTEE")}
            className={`relative p-6 rounded-xl border-2 transition-all text-left ${
              selected === "MENTEE"
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-muted-foreground/50"
            }`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selected === "MENTEE"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <Users size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">I&apos;m a Mentee</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Find experienced mentors, book 1-on-1 sessions, and get guidance for your career and exams.
                </p>
              </div>
            </div>
            {selected === "MENTEE" && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>

          {/* Mentor Card */}
          <button
            onClick={() => setSelected("MENTOR")}
            className={`relative p-6 rounded-xl border-2 transition-all text-left ${
              selected === "MENTOR"
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-muted-foreground/50"
            }`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selected === "MENTOR"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <GraduationCap size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">I&apos;m a Mentor</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Share your expertise, conduct sessions, and earn by helping aspiring students and professionals.
                </p>
              </div>
            </div>
            {selected === "MENTOR" && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed text-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
