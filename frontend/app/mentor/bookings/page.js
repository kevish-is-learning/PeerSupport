const bookingBuckets = [
  { title: "Upcoming", value: "8", note: "Sessions scheduled for this week" },
  { title: "Awaiting Response", value: "3", note: "Requests that need confirmation" },
  { title: "Completed", value: "24", note: "Sessions completed this month" },
];

export default function MentorBookingsPage() {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#eff6ff_0%,#ffffff_100%)] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-black/50">Bookings</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Manage Session Pipeline</h3>
        <p className="mt-2 text-black/70">
          Review incoming requests, confirm session times, and keep your mentorship calendar organized.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {bookingBuckets.map((bucket) => (
          <article key={bucket.title} className="rounded-2xl border border-black/10 bg-white p-4">
            <p className="text-sm font-semibold text-black/60">{bucket.title}</p>
            <p className="mt-2 text-3xl font-bold tracking-[-0.03em]">{bucket.value}</p>
            <p className="mt-1 text-sm text-black/60">{bucket.note}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
