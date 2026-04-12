const bookingBuckets = [
  { title: "Upcoming", value: "4", note: "Scheduled sessions this week" },
  { title: "Ongoing", value: "1", note: "Sessions currently in progress" },
  { title: "Completed", value: "27", note: "Finished sessions this month" },
  { title: "Cancelled", value: "2", note: "Cancelled sessions this month" },
];

export default function MenteeBookingsPage() {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#eff6ff_0%,#ffffff_100%)] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-black/50">Bookings</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Track Your Session Journey</h3>
        <p className="mt-2 text-black/70">
          Manage your mentorship calendar and review session history to stay on top of your preparation.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
