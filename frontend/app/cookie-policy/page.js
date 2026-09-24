import PublicShell from "../../components/public/PublicShell";
import { LegalSection, LegalList, LastUpdated } from "../../components/public/LegalDoc";

export const metadata = {
  title: "Cookie Policy",
  description: "How PeerSupport uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <PublicShell title="Cookie Policy" description="How we use cookies and similar storage technologies.">
      <LastUpdated date="20 September 2026" />

      <LegalSection first title="1. What cookies are">
        <p>
          Cookies are small text files stored on your device when you visit a website. We also use
          similar browser storage technologies (such as local storage) for the same general
          purposes described below.
        </p>
      </LegalSection>

      <LegalSection title="2. How we use them">
        <LegalList
          items={[
            "Essential/authentication: we use a secure, HTTP-only session cookie to keep you signed in and to authenticate your requests. Without it, you would need to log in again on every page.",
            "Preferences and drafts: while completing your mentor or mentee onboarding form, your in-progress answers are saved to your browser's local storage so you don't lose your progress if you navigate away or refresh the page. This data stays on your device and clears automatically once you submit the form.",
            "Sign-in with Google: if you choose to sign up or log in with Google, Google may set its own cookies as part of that authentication flow, governed by Google's own privacy practices.",
          ]}
        />
        <p>We do not currently use third-party advertising or cross-site tracking cookies.</p>
      </LegalSection>

      <LegalSection title="3. Managing cookies">
        <p>
          Most browsers let you view, delete, and block cookies through their settings. Because our
          authentication cookie is essential to keeping you signed in, blocking it will prevent you
          from using logged-in features of PeerSupport (such as bookings and your dashboard), though
          you can still browse the public parts of the site.
        </p>
      </LegalSection>

      <LegalSection title="4. Changes to this policy">
        <p>
          If the cookies and technologies we use change materially, we'll update this page. We
          encourage you to review it occasionally.
        </p>
      </LegalSection>

      <LegalSection title="5. Contact us">
        <p>
          Questions about this policy? Reach us at{" "}
          <a href="mailto:hello@peersupport.in" className="font-semibold text-[#5061E4] hover:underline">
            hello@peersupport.in
          </a>.
        </p>
      </LegalSection>
    </PublicShell>
  );
}
