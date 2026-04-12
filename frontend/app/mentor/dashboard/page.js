const quickStats = [
  { label: "Total Meetings", value: "42" },
  { label: "Total Payouts", value: "$2,480" },
  { label: "Avg. Rating", value: "4.8" },
  { label: "Upcoming Sessions", value: "8" },
];

const focusAreas = [
  "Review upcoming session requests",
  "Keep your services updated with current pricing",
  "Track payout status and pending invoices",
];

export default function MentorDashboardPage() {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#0f172a_0%,#1e293b_55%,#334155_100%)] p-6 text-white sm:p-7">
        <p className="text-xs uppercase tracking-[0.18em] text-white/70">Mentor Dashboard</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Run Your Mentorship Operations</h3>
        <p className="mt-3 max-w-2xl text-white/80">
          This is your control center for bookings, offers, and payouts. Keep your profile and availability up to date to improve booking quality.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-black/10 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-black/50">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-[-0.03em]">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5">
        <h4 className="text-lg font-bold">Priority Checklist</h4>
        <ul className="mt-3 grid gap-2 text-sm text-black/75">
          {focusAreas.map((item) => (
            <li key={item} className="rounded-xl border border-black/10 bg-[#f8fafc] px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
