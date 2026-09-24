import PublicShell from "../../components/public/PublicShell";
import { LegalSection, LegalList, LastUpdated } from "../../components/public/LegalDoc";

export const metadata = {
  title: "Refund Policy",
  description: "Cancellation windows and refund rules for PeerSupport bookings.",
};

export default function RefundPolicyPage() {
  return (
    <PublicShell title="Refund Policy" description="How cancellations and refunds work for sessions booked on PeerSupport.">
      <LastUpdated date="20 September 2026" />

      <LegalSection first title="1. Cancellations by a mentee">
        <p>
          If you cancel a paid booking, the refund you receive depends on how far in advance you
          cancel relative to the scheduled start time:
        </p>
        <LegalList
          items={[
            "More than 24 hours before the session — full refund (100%).",
            "Between 12 and 24 hours before the session — partial refund (50%).",
            "Less than 12 hours before the session — no refund.",
          ]}
        />
        <p>
          You can cancel a booking directly from your dashboard. The refund percentage is
          calculated automatically at the moment you cancel, based on the time remaining until the
          session.
        </p>
      </LegalSection>

      <LegalSection title="2. Cancellations by a mentor">
        <p>
          If a mentor cancels a confirmed booking for any reason, you receive a full refund (100%),
          regardless of how close to the session time the cancellation happens.
        </p>
      </LegalSection>

      <LegalSection title="3. No-shows">
        <LegalList
          items={[
            "If a mentor does not join a session you have paid for, contact support with your booking ID — we will review the case and issue a refund where appropriate.",
            "If you (the mentee) do not join a session without cancelling in advance, the booking is treated as completed for refund purposes and no refund is issued, consistent with the cancellation windows above.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. How refunds are processed">
        <LegalList
          items={[
            "Refunds are issued to the original payment method used at checkout, through our payment processor.",
            "Once a refund is initiated, it typically takes 5–7 business days to reflect in your account, depending on your bank or card issuer.",
            "You'll see the booking's status update to reflect the refund in your dashboard once it has been processed.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Rescheduling">
        <p>
          Rescheduling a session to a new time (where offered) does not count as a cancellation and
          does not trigger a refund — your existing payment simply carries over to the new time. If
          you'd prefer a refund instead of rescheduling, cancel the booking under the terms above.
        </p>
      </LegalSection>

      <LegalSection title="6. Group sessions, webinars, and packages">
        <p>
          The cancellation windows above apply to all paid formats on PeerSupport, including 1-on-1
          sessions, group discussions, and webinars, unless a specific offering states otherwise at
          the time of booking. For multi-session packages, refunds are calculated on the unused
          portion of the package based on the same windows.
        </p>
      </LegalSection>

      <LegalSection title="7. Mentor payouts and refunds">
        <p>
          When a booking is refunded, any earnings already credited to the mentor for that booking
          are reversed from the mentor's wallet. This keeps mentor payout balances accurate and is
          reflected automatically — mentors don't need to take any action.
        </p>
      </LegalSection>

      <LegalSection title="8. Disputes">
        <p>
          If you believe a refund was calculated incorrectly, or you have a booking issue not
          covered above, contact us at{" "}
          <a href="mailto:hello@peersupport.in" className="font-semibold text-[#5061E4] hover:underline">
            hello@peersupport.in
          </a>{" "}
          with your booking ID and we'll review it.
        </p>
      </LegalSection>
    </PublicShell>
  );
}
