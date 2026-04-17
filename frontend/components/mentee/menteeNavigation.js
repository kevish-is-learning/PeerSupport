export const MENTEE_NAV_ITEMS = [
  { label: "Dashboard", href: "/mentee/dashboard" },
  { label: "Find Mentors", href: "/mentee/find-mentors" },
  { label: "Bookings", href: "/mentee/bookings" },
  { label: "Profile", href: "/mentee/profile" },
  { label: "Help Center", href: "/mentee/help-center" },
];

export const normalizeMenteePath = (path) => {
  if (!path) {
    return "/mentee";
  }

  const normalized = path.endsWith("/") ? path.slice(0, -1) : path;
  return normalized || "/mentee";
};

export const getWorkspaceRouteByRole = (role) => {
  if (role === "MENTOR") {
    return "/mentor/dashboard";
  }

  if (role === "MENTEE") {
    return "/mentee/dashboard";
  }

  if (role === "ADMIN") {
    return "/admin/dashboard";
  }

  return "/auth?mode=login";
};
