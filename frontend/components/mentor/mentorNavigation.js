export const MENTOR_NAV_ITEMS = [
  { label: "Dashboard", href: "/mentor/dashboard", requiresApproval: true },
  { label: "Bookings", href: "/mentor/bookings", requiresApproval: true },
  { label: "Services", href: "/mentor/services", requiresApproval: true },
  { label: "Payments", href: "/mentor/payments", requiresApproval: true },
  { label: "Profile", href: "/mentor/profile", requiresApproval: false },
  { label: "Help Center", href: "/mentor/help-center", requiresApproval: false },
];

export const MENTOR_ALLOWED_UNAPPROVED_ROUTES = ["/mentor/profile", "/mentor/help-center"];

export const normalizeMentorPath = (path) => {
  if (!path) {
    return "/mentor";
  }

  const normalized = path.endsWith("/") ? path.slice(0, -1) : path;
  return normalized || "/mentor";
};

export const isMentorApproved = (approvalStatus) => approvalStatus === "APPROVED";

export const isMentorRouteAllowedWithoutApproval = (path) =>
  MENTOR_ALLOWED_UNAPPROVED_ROUTES.includes(normalizeMentorPath(path));

export const getMentorApprovalMeta = (approvalStatus) => {
  if (approvalStatus === "APPROVED") {
    return {
      label: "Approved",
      badgeClassName: "bg-[#c6f6d5] text-[#0f3e22]",
      title: "Mentor Access Active",
      description:
        "Admin has approved your mentor account. You now have access to bookings, services, and payment tools.",
    };
  }

  if (approvalStatus === "REJECTED") {
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
