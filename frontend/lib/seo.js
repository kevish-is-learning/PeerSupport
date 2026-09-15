export const SITE_NAME = "PeerSupport";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://peersupport.co.in";

export const SITE_DESCRIPTION =
  "Book 1-on-1 mentorship with IIM alumni and CAT toppers. Get interview prep, " +
  "profile reviews, GD/WAT practice and personalised guidance for your MBA journey.";

/** Routes that should appear in the sitemap and be crawlable. */
export const PUBLIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/find-mentors", priority: 0.9, changeFrequency: "daily" },
  { path: "/explore-mentor", priority: 0.7, changeFrequency: "daily" },
  { path: "/auth", priority: 0.3, changeFrequency: "monthly" },
];

/** Areas behind auth — no value in crawling, and they leak nothing useful. */
export const PRIVATE_PATH_PREFIXES = [
  "/admin",
  "/mentee",
  "/mentor",
  "/meeting",
  "/onboarding",
];

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  areaServed: "IN",
  knowsAbout: [
    "CAT exam preparation",
    "MBA admissions",
    "Personal interview preparation",
    "Group discussion and WAT practice",
  ],
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/find-mentors?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

/** Renders a JSON-LD block. Next dedupes these into <head>. */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
