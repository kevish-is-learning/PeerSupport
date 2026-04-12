const mentorCards = [
  {
    name: "Aarav Mehta",
    specialty: "CAT Quant & DILR",
    rating: "4.9",
    sessions: "120+ sessions",
  },
  {
    name: "Riya Sharma",
    specialty: "VARC + Interview Prep",
    rating: "4.8",
    sessions: "95+ sessions",
  },
  {
    name: "Kabir Rao",
    specialty: "Profile Building",
    rating: "4.7",
    sessions: "80+ sessions",
  },
];

export default function MenteeFindMentorsPage() {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#ecfeff_0%,#ffffff_100%)] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-black/50">Find Mentors</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Discover Your Best Mentor Match</h3>
        <p className="mt-2 text-black/70">
          Browse by specialization, session quality, and mentoring style to find the right fit for your preparation goals.
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {mentorCards.map((mentor) => (
          <article key={mentor.name} className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-black/50">{mentor.sessions}</p>
            <h4 className="mt-2 text-xl font-bold tracking-[-0.02em]">{mentor.name}</h4>
            <p className="mt-1 text-sm font-semibold text-black/70">{mentor.specialty}</p>
            <p className="mt-3 inline-flex rounded-full bg-[#dcfce7] px-3 py-1 text-sm font-bold text-[#166534]">
              Rating {mentor.rating}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
