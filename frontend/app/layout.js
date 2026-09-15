import "./globals.css";
import AppToaster from "../components/ui/AppToaster";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — CAT Mentorship from IIM Alumni & Toppers`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "CAT preparation",
    "CAT mentorship",
    "IIM alumni mentor",
    "MBA interview preparation",
    "GD WAT practice",
    "CAT topper guidance",
    "B-school admissions",
    "1-on-1 mentoring",
  ],
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
    title: `${SITE_NAME} — CAT Mentorship from IIM Alumni & Toppers`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — CAT Mentorship from IIM Alumni & Toppers`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5061E4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
