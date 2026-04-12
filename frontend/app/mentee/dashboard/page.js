const overviewStats = [
  { label: "Learning Streak", value: "12 days" },
  { label: "Mentor Matches", value: "18" },
  { label: "Sessions Completed", value: "27" },
  { label: "Upcoming Sessions", value: "4" },
];

const nextActions = [
  "Shortlist mentors by CAT percentile focus",
  "Book 1 strategy session this week",
  "Update your profile goals before next booking",
];

export default function MenteeDashboardPage() {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#312e81_0%,#4338ca_55%,#6366f1_100%)] p-6 text-white sm:p-7">
        <p className="text-xs uppercase tracking-[0.18em] text-white/70">Mentee Dashboard</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Plan Better, Learn Faster</h3>
        <p className="mt-3 max-w-2xl text-white/85">
          Track your sessions, discover new mentors, and keep momentum through focused weekly learning goals.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-black/10 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-black/50">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-[-0.03em]">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5">
        <h4 className="text-lg font-bold">Next Actions</h4>
        <ul className="mt-3 grid gap-2 text-sm text-black/75">
          {nextActions.map((item) => (
            <li key={item} className="rounded-xl border border-black/10 bg-[#f8fafc] px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
