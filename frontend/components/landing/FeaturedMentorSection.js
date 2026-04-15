import Link from "next/link";

const mentors = [
  {
    name: "Priya Sharma",
    college: "IIM Ahmedabad",
    bio: "Marketing & Strategy expert with 5+ years at top consulting firms. Specialized in case prep & GD sessions.",
    rating: "4.9",
    hours: "250+",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    accent: "#2563eb",
    ctaColor: "bg-[#F9C41A] text-[#0d0d0f]"
  },
  {
    name: "Rahul Verma",
    college: "IIM Bangalore",
    bio: "Finance & Analytics mentor. Former Investment Banker helping students crack top B-schools with proven strategies.",
    rating: "4.8",
    hours: "180+",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    accent: "#7c3aed",
    ctaColor: "bg-[#F9C41A] text-[#0d0d0f]"
  },
  {
    name: "Anjali Desai",
    college: "FMS Delhi",
    bio: "Operations & HR specialist. Conducted 500+ mock interviews and GDs. Known for personalized mentorship approach.",
    rating: "4.9",
    hours: "320+",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    accent: "#ef4444",
    ctaColor: "bg-[#ef4444] text-white"
  }
];

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 2l2.09 6.26L21 10l-6.26 2.09L12 22l-2.09-6.26L3 14l6.26-2.09z" />
    </svg>
  );
}

function StarIcon({ className }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.09 6.26L21 10l-6.26 2.09L12 22l-2.09-6.26L3 14l6.26-2.09z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function MentorCard({ mentor }) {
  return (
    <article className="flex flex-col rounded-[22px] border-[2.5px] border-[#1a1a1a] bg-white shadow-[5px_5px_0_0_#1a1a1a] transition-transform hover:-translate-y-1">
      {/* Photo with accent border */}
      <div className="relative m-3 mb-0 aspect-4/3.5 overflow-hidden rounded-[14px]">
        <div
          className="absolute inset-0 rounded-[14px] ring-4 ring-inset"
          style={{ "--tw-ring-color": mentor.accent }}
        />
        <img
          src={mentor.image}
          alt={mentor.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <h3 className="text-xl font-extrabold tracking-[-0.02em] text-[#0d0d0f]">
          {mentor.name}
        </h3>

        {/* College badge */}
        <span className="mt-1.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-black/15 bg-[#f5f5f5] px-3 py-1 text-xs font-semibold text-[#0d0d0f]">
          <span className="text-[10px] text-green-600">✦</span>
          {mentor.college}
        </span>

        {/* Bio */}
        <p className="mt-3 flex-1 text-[0.82rem] leading-[1.6] text-[#5c5f69]">
          {mentor.bio}
        </p>

        {/* Rating + hours */}
        <div className="mt-3 flex items-center gap-4 text-sm font-bold text-[#0d0d0f]">
          <span className="flex items-center gap-1">
            <StarIcon className="text-[#F9C41A]" />
            {mentor.rating}
          </span>
          <span className="flex items-center gap-1 text-[#5c5f69]">
            <ClockIcon />
            {mentor.hours} hrs
          </span>
        </div>

        {/* CTA */}
        <Link
          href="/mentee/find-mentors"
          className={`mt-4 flex items-center justify-center gap-2 rounded-full border-[2.5px] border-[#1a1a1a] px-5 py-2.5 text-sm font-bold shadow-[3px_3px_0_0_#1a1a1a] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_#1a1a1a] ${mentor.ctaColor}`}
        >
          Book Session
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedMentorSection() {
  return (
    <section
      id="how-it-works"
      className="relative mx-auto w-full scroll-mt-24 overflow-hidden px-4 py-20 sm:px-6 lg:px-10"
    >
      {/* Decorative pink square — top left */}
      <div
        className="absolute left-6 top-8 h-14 w-14 -rotate-12 rounded-[4px] bg-[#f5c6aa] opacity-60 sm:left-10 sm:h-16 sm:w-16"
        aria-hidden="true"
      />

      {/* Decorative circle — bottom right */}
      <div
        className="absolute bottom-8 right-6 h-14 w-14 rounded-full border-[3px] border-[#e5e0dc] bg-[#fdf5f2] sm:right-10 sm:h-16 sm:w-16"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F9C41A] px-4 py-2 text-sm font-bold text-[#0d0d0f] shadow-[3px_3px_0_0_#1a1a1a]">
            <SparkleIcon />
            Top Mentors
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-5 text-center text-[2.2rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0d0d0f] sm:text-[2.8rem]">
          Meet Our Best Mentors
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-lg text-center text-[0.95rem] leading-relaxed text-[#5c5f69]">
          Connect with experienced professionals from top B&#8209;schools who are ready to guide you to success
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((m) => (
            <MentorCard key={m.name} mentor={m} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/mentee/find-mentors"
            className="inline-flex items-center gap-2.5 rounded-full border-[2.5px] border-[#1a1a1a] bg-[#F9C41A] px-7 py-3.5 text-[0.95rem] font-bold text-[#0d0d0f] shadow-[4px_4px_0_0_#1a1a1a] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#1a1a1a]"
          >
            Explore all our Mentors
            <span aria-hidden="true" className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
