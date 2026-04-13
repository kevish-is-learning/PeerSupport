export const ADMIN_NAV_ITEMS = [
  { label: "Mentor Applications", href: "/admin/dashboard" },
];

export const normalizeAdminPath = (path) => {
  if (!path) {
    return "/admin";
  }

  const normalized = path.endsWith("/") ? path.slice(0, -1) : path;
  return normalized || "/admin";
};
