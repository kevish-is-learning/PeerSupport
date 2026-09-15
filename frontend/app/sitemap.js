import { SITE_URL, PUBLIC_ROUTES } from "../lib/seo";
import { API_BASE_URL } from "../lib/api";

export const revalidate = 3600;

/**
 * Approved mentors get their own crawlable profile URLs. A sitemap must never
 * fail the build, so an unreachable API just yields the static routes.
 */
async function fetchMentorRoutes() {
  try {
    const response = await fetch(`${API_BASE_URL}/mentors?limit=500`, {
      next: { revalidate },
    });
    if (!response.ok) return [];

    const payload = await response.json();
    return (payload?.data?.mentors || []).map((mentor) => ({
      url: `${SITE_URL}/mentee/find-mentors/${mentor.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const staticRoutes = PUBLIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return [...staticRoutes, ...(await fetchMentorRoutes())];
}
