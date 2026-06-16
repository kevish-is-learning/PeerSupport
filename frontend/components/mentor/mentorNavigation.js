import { Home, Users, Calendar, Wallet, User, Briefcase, CalendarDays, BarChart3 } from "lucide-react";

export const MENTOR_NAV_ITEMS = [
  { label: "Home", href: "/mentor/dashboard", icon: Home, requiresApproval: true },
  { label: "My Mentees", href: "/mentor/mentees", icon: Users, requiresApproval: true },
  { label: "Sessions", href: "/mentor/bookings", icon: Calendar, requiresApproval: true },
  { label: "Analytics", href: "/mentor/analytics", icon: BarChart3, requiresApproval: true },
  { label: "Payouts", href: "/mentor/payments", icon: Wallet, requiresApproval: true },
  { label: "Profile", href: "/mentor/profile", icon: User, requiresApproval: false },
  { label: "Availability", href: "/mentor/availability", icon: CalendarDays, requiresApproval: false },
];

export const MENTOR_ALLOWED_UNAPPROVED_ROUTES = ["/mentor/profile", "/mentor/help-center", "/mentor/availability"];

export const normalizeMentorPath = (path) => {
  if (!path) {
    return "/mentor";
  }

  const normalized = path.endsWith("/") ? path.slice(0, -1) : path;
  return normalized || "/mentor";
};

export const isMentorApproved = (user) => user?.mentorApprovalStatus === "APPROVED" || user?.mentorIsVerified === true;

export const isMentorRouteAllowedWithoutApproval = (path) =>
  MENTOR_ALLOWED_UNAPPROVED_ROUTES.includes(normalizeMentorPath(path));

export const getMentorApprovalMeta = (user) => {
  if (isMentorApproved(user)) {
    return {
      label: "Approved",
      badgeClassName: "bg-[#c6f6d5] text-[#0f3e22]",
      title: "Mentor Access Active",
      description:
        "Admin has approved your mentor account. You now have access to bookings, services, and payment tools.",
    };
  }

  if (user?.mentorApprovalStatus === "REJECTED") {
    return {
      label: "Needs Changes",
      badgeClassName: "bg-[#fed7d7] text-[#7a1f1f]",
      title: "Mentor Access Paused",
      description:
        "Your mentor profile needs updates before approval. Edit your profile and upload corrected details to continue.",
    };
  }

  return {
    label: "Pending Approval",
    badgeClassName: "bg-[#fef3c7] text-[#7a4b00]",
    title: "Waiting For Admin Approval",
    description:
      "Your mentor profile is under review. You can use Profile and Help Center while admin completes verification.",
  };
};
