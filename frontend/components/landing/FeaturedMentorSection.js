import Link from "next/link";
import HighlightPill from "../ui/HighlightPill";
import PillButton from "../ui/PillButton";
import { ArrowRight, Clock, GraduationCap, Sparkles } from "lucide-react";

const mentors = [
  {
    name: "Priya Sharma",
    college: "IIM Ahmedabad",
    bio: "Marketing & Strategy expert with 5+ years at top consulting firms. Specialized in case prep & GD sessions.",
    rating: "4.9",
    hours: "250+",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    accent: "#5763E6",
    ctaColor: "bg-[#5763E6] text-white"
  },
  {
    name: "Rahul Verma",
    college: "IIM Bangalore",
    bio: "Finance & Analytics mentor. Former Investment Banker helping students crack top B-schools with proven strategies.",
    rating: "4.8",
    hours: "180+",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    accent: "#FFB705",
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
    accent: "#EF4444",
    ctaColor: "bg-[#ef4444] text-white"
  }
];


function MentorCard({ mentor }) {
  return (
    <article className="flex flex-col rounded-[22px] border-4 bg-white shadow-[5px_5px_0_0_#1a1a1a]">
      {/* Photo */}
      <div className={`relative m-3 mb-0 aspect-4/3.5 overflow-hidden rounded-xl border-t-8`} style={{ borderColor: mentor.accent }}>
        <img
          src={mentor.image}
          alt={mentor.name}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <h3 className="text-xl font-extrabold tracking-[-0.02em] text-[#0d0d0f]">
          {mentor.name}
        </h3>

        {/* College badge */}
        <span className="mt-1.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-black/15 bg-[#f5f5f5] px-3 py-1 text-xs font-semibold text-[#0d0d0f]">
          <GraduationCap size={16} color="#5763E6"/>
          {mentor.college}
        </span>

        {/* Bio */}
        <p className="mt-3 flex-1 text-[0.82rem] leading-[1.6] text-[#5c5f69]">
          {mentor.bio}
        </p>

        {/* Rating + hours */}
        <div className="mt-3 flex items-center gap-4 text-sm font-bold text-[#0d0d0f]">
          <span className="flex items-center gap-1">
            <span className="text-[#FFB705]">★</span>
            {mentor.rating}
          </span>
          <span className="flex items-center gap-1 text-[#000000]">
            <Clock size={16} color="#5763E6"/>
            {mentor.hours} hrs
          </span>
        </div>

        {/* CTA */}
        <Link
          href="/mentee/find-mentors"
          className={`mt-4 flex items-center justify-center gap-2 rounded-full border-[2.5px] border-[#1a1a1a] px-5 py-2.5 text-sm font-bold shadow-[3px_3px_0_0_#1a1a1a] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_#1a1a1a] ${mentor.ctaColor}`}
        >
          Book Session
          <ArrowRight size={16} />
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
        className="absolute left-6 top-8 h-14 w-14 rotate-16 border-2 bg-[#FBECE6] sm:left-10 sm:h-16 sm:w-16"
        aria-hidden="true"
      />

      {/* Decorative circle — bottom right */}
      <div
        className="absolute bottom-8 right-6 h-14 w-14 rounded-full border-[3px] border-black bg-[#FDF5F3] sm:right-10 sm:h-20 sm:w-20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Badge */}
        <div className="flex justify-center">
          <HighlightPill text="Top Mentors" variant="secondary" icon={<Sparkles size={16} />} />
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
          <PillButton href="/mentee/find-mentors" variant="accent">
            Explore all our Mentors
            <span aria-hidden="true" className="text-lg">→</span>
          </PillButton>
        </div>
      </div>
    </section>
  );
}
