import { Star, Quote, Award } from "lucide-react";
import HighlightPill from "../ui/HighlightPill";

const PRIMARY_BLUE = "#5061E4";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "MBA Graduate",
    badge: "IIM Lucknow",
    quote:
      "The mock interviews were a game-changer! My mentor from IIM-A gave me insights I could never find in books. Cleared my dream B-school interview!",
    tag: "IIM Indore",
    stars: 5
  },
  {
    name: "Ananya Gupta",
    role: "MBA Graduate",
    badge: "FMS Delhi",
    quote:
      "Group discussions here are so realistic! Practicing with peers and getting instant feedback helped me ace my GD rounds.",
    tag: "FMS Delhi",
    stars: 5
  },
  {
    name: "Sneha Patel",
    role: "MBA Graduate",
    badge: "XLRI Jamshedpur",
    quote:
      "My mentor helped me craft a compelling story for my interview. The personalized attention made all the difference!",
    tag: "XLRI Jamshedpur",
    stars: 5
  },
  {
    name: "Rajesh Kumar",
    role: "MBA Graduate",
    badge: "IIM Bangalore",
    quote:
      "The one-on-one sessions helped me identify and work on my weak areas. My mentor's guidance was invaluable!",
    tag: "IIM Bangalore",
    stars: 5
  },
  {
    name: "Kavya Reddy",
    role: "MBA Graduate",
    badge: "ISB Hyderabad",
    quote:
      "The case study practice sessions were incredibly helpful. I felt fully prepared for my interviews thanks to my mentor.",
    tag: "ISB Hyderabad",
    stars: 5
  },
  {
    name: "Arjun Malhotra",
    role: "MBA Graduate",
    badge: "SPJIMR Mumbai",
    quote:
      "Got personalized essay review and career counseling. The mentors really care about your success!",
    tag: "SPJIMR Mumbai",
    stars: 5
  }
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-[#FFB800]">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <article
      className="relative flex flex-col rounded-3xl border-[3px] bg-[#FAF0E8] p-7 pt-8 shadow-[6px_6px_0_0_#5061E4] sm:rounded-[28px] sm:p-8 sm:pt-9"
      style={{ borderColor: PRIMARY_BLUE }}
    >
      <Quote
        size={75}
        className="pointer-events-none absolute right-4 top-4 z-0 text-[#5061E4]/20 sm:right-5 sm:top-5"
        strokeWidth={0}
        fill="currentColor"
        aria-hidden
      />

      <div className="absolute right-3 top-3 z-20 max-w-[min(52%,11rem)] sm:right-4 sm:top-4 sm:max-w-none">
        <span
          className="inline-block rounded-full border-[3px] px-3 py-1.5 text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide text-white sm:text-[11px]"
          style={{ borderColor: "#1f2937", backgroundColor: PRIMARY_BLUE }}
        >
          {t.badge}
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-5 pr-1">
        <div className="flex gap-4">
          <div className="relative shrink-0">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#1f2937] bg-white text-base font-bold text-[#1f2937]"
              aria-hidden
            >
              {t.name.charAt(0)}
            </div>
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="text-[0.95rem] font-extrabold tracking-tight text-[#1f2937]">{t.name}</p>
            <p className="mt-0.5 text-[0.8rem] text-[#6b7280]">{t.role}</p>
            <div className="mt-2">
              <Stars count={t.stars} />
            </div>
          </div>
        </div>

        <p className="text-[0.9rem] italic leading-[1.7] text-[#374151]">&ldquo;{t.quote}&rdquo;</p>

        <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border-[3px] border-[#1f2937] bg-white px-3.5 py-2 text-[11px] font-extrabold text-[#1f2937]">
          <Award size={15} strokeWidth={2.4} className="shrink-0 text-[#5061E4]" aria-hidden />
          {t.tag}
        </span>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-10"
      style={{ backgroundColor: "#FFF8F4" }}
    >
      <div
        className="absolute left-4 top-10 h-20 w-20 rotate-45 rounded-md bg-[#FFB800] sm:left-10 sm:top-14 sm:h-24 sm:w-24"
        aria-hidden
      />

      <div
        className="absolute -bottom-12 -right-12 h-52 w-52 rounded-full sm:-bottom-16 sm:-right-16 sm:h-72 sm:w-72"
        style={{ backgroundColor: `${PRIMARY_BLUE}33` }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex justify-center">
          <HighlightPill text="Success Stories" variant="orange" icon={<Quote size={16}/>}/>
        </div>

        <h2 className="mt-6 text-center text-[2rem] font-extrabold leading-tight tracking-[-0.03em] text-[#1f2937] sm:text-[3.5rem]">
          <span className="block">Real People.</span>
          <span className="relative mt-1 inline-block">
            <span className="relative z-10">Real Results.</span>
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-center text-[0.95rem] leading-relaxed text-[#6b7280]">
          Don&apos;t just take our word for it—hear from those who&apos;ve transformed their careers!
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
