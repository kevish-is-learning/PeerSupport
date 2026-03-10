"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function ApplicationStatusPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, fetchMe, fetchMentorApplication, mentorApplication } =
    useAuthStore();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchMentorApplication();
    }
  }, [isLoading, isAuthenticated, fetchMentorApplication]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // If the user is already a mentor, redirect to dashboard
  useEffect(() => {
    if (user?.role === "MENTOR") {
      router.replace("/mentor/dashboard");
    }
  }, [user, router]);

  // If no application yet, redirect to apply
  useEffect(() => {
    if (!isLoading && isAuthenticated && mentorApplication === null) {
      // Give time for the fetch
      const timer = setTimeout(() => {
        if (!mentorApplication) {
          router.replace("/onboarding");
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, mentorApplication, router]);

  if (isLoading || !mentorApplication) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const statusConfig = {
    PENDING: {
      icon: Clock,
      title: "Application Under Review",
      description:
        "Your mentor application has been submitted successfully and is currently being reviewed by our admin team. This usually takes 1-3 business days.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
    APPROVED: {
      icon: CheckCircle2,
      title: "Application Approved!",
      description:
        "Congratulations! Your mentor application has been approved. You can now access your mentor dashboard.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    REJECTED: {
      icon: XCircle,
      title: "Application Rejected",
      description:
        mentorApplication.rejectionReason ||
        "Unfortunately, your application was not approved at this time. You may reapply with updated information.",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
  };

  const config = statusConfig[mentorApplication.status];
  const Icon = config.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        <div
          className={`${config.bgColor} ${config.borderColor} border rounded-xl p-8 text-center`}
        >
          <div className={`inline-flex p-4 rounded-full ${config.bgColor} mb-4`}>
            <Icon className={`h-12 w-12 ${config.color}`} />
          </div>

          <h1 className={`text-2xl font-bold ${config.color} mb-3`}>{config.title}</h1>

          <p className="text-muted-foreground leading-relaxed">{config.description}</p>

          <div className="mt-6 p-4 bg-card rounded-lg border border-border">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Submitted</span>
              <span className="text-foreground">
                {new Date(mentorApplication.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Status</span>
              <span className={`font-medium ${config.color}`}>{mentorApplication.status}</span>
            </div>
            {mentorApplication.reviewedAt && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Reviewed</span>
                <span className="text-foreground">
                  {new Date(mentorApplication.reviewedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          {mentorApplication.status === "APPROVED" && (
            <button
              onClick={() => {
                fetchMe().then(() => router.push("/mentor/dashboard"));
              }}
              className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              Go to Dashboard
            </button>
          )}

          {mentorApplication.status === "REJECTED" && (
            <button
              onClick={() => router.push("/onboarding")}
              className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              Back to Home
            </button>
          )}

          {mentorApplication.status === "PENDING" && (
            <p className="mt-6 text-sm text-muted-foreground">
              We&apos;ll notify you once your application has been reviewed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
