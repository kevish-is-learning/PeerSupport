import { SITE_URL, PRIVATE_PATH_PREFIXES } from "../lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: PRIVATE_PATH_PREFIXES.map((prefix) => `${prefix}/`),
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
