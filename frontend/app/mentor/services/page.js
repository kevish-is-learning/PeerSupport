const serviceCards = [
  {
    title: "Interview Drill",
    duration: "45 min",
    details: "Mock interviews and structured feedback on communication and domain clarity.",
  },
  {
    title: "CAT Strategy Session",
    duration: "60 min",
    details: "Personalized strategy planning across Quant, VARC, and DILR with action steps.",
  },
  {
    title: "Profile Review",
    duration: "30 min",
    details: "Resume and application walkthrough aligned to target schools and goals.",
  },
];

export default function MentorServicesPage() {
  return (
    <div className="grid gap-4">
      <section className="rounded-3xl border border-black/10 bg-[linear-gradient(120deg,#f0fdf4_0%,#ffffff_100%)] p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-black/50">Services</p>
        <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">Curate Your Offerings</h3>
        <p className="mt-2 text-black/70">
          Design session packages that reflect your expertise and make expectations clear for mentees.
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {serviceCards.map((service) => (
          <article key={service.title} className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-black/50">{service.duration}</p>
            <h4 className="mt-2 text-xl font-bold tracking-[-0.02em]">{service.title}</h4>
            <p className="mt-2 text-sm text-black/70">{service.details}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
