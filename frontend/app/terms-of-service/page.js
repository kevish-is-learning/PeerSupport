import PublicShell from "../../components/public/PublicShell";
import { LegalSection, LegalList, LastUpdated } from "../../components/public/LegalDoc";

export const metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the PeerSupport platform.",
};

export default function TermsOfServicePage() {
  return (
    <PublicShell title="Terms of Service" description="The rules that govern your use of PeerSupport.">
      <LastUpdated date="20 September 2026" />

      <LegalSection first title="1. Acceptance of terms">
        <p>
          By creating an account or using PeerSupport, you agree to these Terms of Service and our
          Privacy Policy. If you do not agree, please do not use the platform.
        </p>
      </LegalSection>

      <LegalSection title="2. Who can use PeerSupport">
        <p>
          You must be at least 18 years old and able to form a binding contract to use PeerSupport.
          By registering, you confirm that the information you provide is accurate and that you will
          keep it up to date.
        </p>
      </LegalSection>

      <LegalSection title="3. Mentees and mentors">
        <LegalList
          items={[
            "Mentees book sessions, group discussions, and webinars with mentors listed on the platform for guidance, interview preparation, and related mentorship services.",
            "Mentors apply to join the platform and go through a verification process, which may include a review of submitted documents and a verification call, before their profile is approved and made visible to mentees.",
            "PeerSupport acts as a marketplace connecting mentees and mentors. We do not guarantee specific outcomes (such as admission results, job offers, or exam scores) from any session.",
            "Mentors are independent contractors, not employees or agents of PeerSupport, and are solely responsible for the accuracy of their listed qualifications and the advice they give.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Bookings, sessions, and conduct">
        <LegalList
          items={[
            "Sessions must be booked, rescheduled, and cancelled through the platform so that both parties have an accurate record.",
            "You agree to join scheduled sessions on time and to treat other users with respect. We may suspend or remove accounts that engage in harassment, fraud, impersonation, or other abusive conduct.",
            "Video sessions are conducted through our in-app video technology. Do not record, screenshot, or redistribute a session without the explicit consent of all participants.",
            "You are responsible for having a stable internet connection and a suitable device to join sessions; we are not liable for issues caused by your own connectivity or hardware.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Payments and payouts">
        <p>
          Session fees are shown at the time of booking and charged through our payment processor.
          Mentor payouts are processed on the schedule described in the mentor dashboard, subject to
          verification and any applicable fees. See our{" "}
          <a href="/refund-policy" className="font-semibold text-[#5061E4] hover:underline">
            Refund Policy
          </a>{" "}
          for cancellation and refund terms.
        </p>
      </LegalSection>

      <LegalSection title="6. Account responsibilities">
        <LegalList
          items={[
            "You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.",
            "Notify us immediately if you suspect unauthorized access to your account.",
            "We may suspend or terminate accounts that violate these terms, provide false information, or misuse the platform.",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Intellectual property">
        <p>
          The PeerSupport name, logo, platform design, and underlying software are owned by
          PeerSupport and protected by applicable intellectual property laws. Content you submit
          (such as your profile, bio, and mentoring answers) remains yours, but you grant us a
          license to display it on the platform for the purpose of operating our services.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitation of liability">
        <p>
          PeerSupport is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the
          maximum extent permitted by law, PeerSupport is not liable for indirect, incidental, or
          consequential damages arising from your use of the platform, including the advice or
          conduct of mentors or mentees, or from service interruptions.
        </p>
      </LegalSection>

      <LegalSection title="9. Changes to the platform and terms">
        <p>
          We may update these Terms from time to time, and we may modify or discontinue features of
          the platform. We will provide notice of material changes to these Terms before they take
          effect. Continued use of the platform after changes take effect constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection title="10. Governing law">
        <p>
          These Terms are governed by the laws of India, without regard to conflict-of-law
          principles, and disputes will be subject to the exclusive jurisdiction of the courts in
          Mumbai, Maharashtra.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact us">
        <p>
          Questions about these Terms? Reach us at{" "}
          <a href="mailto:hello@peersupport.in" className="font-semibold text-[#5061E4] hover:underline">
            hello@peersupport.in
          </a>.
        </p>
      </LegalSection>
    </PublicShell>
  );
}
