export const MENTEE_NAV_ITEMS = [
  { label: "Home", href: "/mentee/dashboard" },
  { label: "My Sessions", href: "/mentee/sessions" },
  { label: "Explore Mentors", href: "/mentee/find-mentors" },
  { label: "Profile", href: "/mentee/profile" },
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
