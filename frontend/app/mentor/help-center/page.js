const faqs = [
  {
    question: "How long does mentor approval take?",
    answer:
      "Approvals are typically reviewed within 1-3 business days. Ensure your profile and document uploads are complete.",
  },
  {
    question: "Why are some tabs locked?",
    answer:
      "Dashboard, bookings, services, and payments are unlocked only after your mentor approval status is APPROVED.",
  },
  {
    question: "What should I do if my mentor profile is rejected?",
    answer:
      "Open your Profile tab, update missing or incorrect details, and resubmit through the onboarding/profile forms.",
  },
];

export default function MentorHelpCenterPage() {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#eef2ff_0%,#ffffff_100%)] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-black/50">Help Center</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Need Help With Mentor Access?</h3>
        <p className="mt-2 text-black/70">
          Find quick answers for onboarding, approval status, and access rules for mentor features.
        </p>
      </section>

      <section className="grid gap-3">
        {faqs.map((item) => (
          <article key={item.question} className="rounded-2xl border border-black/10 bg-white p-5">
            <h4 className="text-lg font-bold tracking-[-0.01em]">{item.question}</h4>
            <p className="mt-2 text-sm text-black/75">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5">
        <p className="text-sm font-semibold text-black/65">Still need help?</p>
        <p className="mt-2 text-sm text-black/75">
          Contact support with your account email and any screenshot of the issue so admin can assist faster.
        </p>
        <a
          href="mailto:support@peersupport.app"
          className="mt-4 inline-flex rounded-xl border-2 border-black bg-[#111827] px-4 py-2 text-sm font-bold text-white"
        >
          Email Support
        </a>
      </section>
    </div>
  );
}
