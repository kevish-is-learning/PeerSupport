const faqs = [
  {
    question: "How do I choose the right mentor?",
    answer:
      "Use Find Mentors to compare specialization, ratings, and session counts, then shortlist based on your immediate goal.",
  },
  {
    question: "Can I reschedule a booking?",
    answer:
      "Yes. Open your booking details and request a new slot before session start time based on mentor availability.",
  },
  {
    question: "Where can I update my learning profile?",
    answer:
      "Use the Profile tab and keep your goals, certifications, and experience updated for better mentor recommendations.",
  },
];

export default function MenteeHelpCenterPage() {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#eef2ff_0%,#ffffff_100%)] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-black/50">Help Center</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Need Help Navigating Your Journey?</h3>
        <p className="mt-2 text-black/70">
          Get quick support on bookings, mentor discovery, and profile updates.
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
        <p className="text-sm font-semibold text-black/65">Still need support?</p>
        <p className="mt-2 text-sm text-black/75">
          Reach out with your account email and booking details so support can resolve issues quickly.
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
