import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  Banknote,
  Star,
  FileText,
  Video,
  MessagesSquare,
  LifeBuoy,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    description: "Platform health, user statistics & revenue metrics overview",
    icon: LayoutDashboard,
    shortcut: "G D",
    key: "dashboard",
  },
  {
    href: "/admin/mentors",
    label: "Mentors",
    description: "Review pending applications, credentials & manage mentor approvals",
    icon: GraduationCap,
    shortcut: "G M",
    key: "mentors",
  },
  {
    href: "/admin/users",
    label: "Users",
    description: "Search registered mentees & mentors, inspect profiles & toggle access",
    icon: Users,
    shortcut: "G U",
    key: "users",
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
    description: "Monitor live 1:1 sessions, reschedule or override booking statuses",
    icon: Calendar,
    shortcut: "G B",
    key: "bookings",
  },
  {
    href: "/admin/payments",
    label: "Payments",
    description: "Track mentee transactions, platform commissions & order records",
    icon: CreditCard,
    shortcut: "G P",
    key: "payments",
  },
  {
    href: "/admin/payouts",
    label: "Payouts",
    description: "Process mentor withdrawal requests & track disbursement records",
    icon: Banknote,
    shortcut: "G O",
    key: "payouts",
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    description: "Audit mentee ratings, written feedback & testimonial moderation",
    icon: Star,
    shortcut: "G R",
    key: "reviews",
  },
  {
    href: "/admin/content",
    label: "Content",
    description: "Publish blog articles, curate FAQs & manage homepage testimonials",
    icon: FileText,
    shortcut: "G C",
    key: "content",
  },
  {
    href: "/admin/webinars",
    label: "Webinars",
    description: "Schedule live sessions, set pricing & track registrations",
    icon: Video,
    shortcut: "G W",
    key: "webinars",
  },
  {
    href: "/admin/group-discussions",
    label: "Group Discussions",
    description: "Open GD/WAT practice slots & monitor panel thresholds",
    icon: MessagesSquare,
    shortcut: "G G",
    key: "group-discussions",
  },
  {
    href: "/admin/support",
    label: "Support",
    description: "Respond to user tickets & track resolution status",
    icon: LifeBuoy,
    shortcut: "G S",
    key: "support",
  },
];

export const normalizeAdminPath = (path) => {
  if (!path) {
    return "/admin";
  }

  const normalized = path.endsWith("/") ? path.slice(0, -1) : path;
  return normalized || "/admin";
};
