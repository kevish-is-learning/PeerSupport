import { Sparkles } from "lucide-react";

const colleges = [
  "IIM Ahmedabad",
  "IIM Bangalore",
  "IIM Calcutta",
  "IIM Lucknow",
  "IIM Kozhikode",
  "IIM Indore",
  "FMS Delhi",
  "XLRI Jamshedpur",
  "ISB Hyderabad",
  "SPJIMR Mumbai",
  "MDI Gurgaon",
  "IIFT Delhi",
];

export default function CollegeMarqueeSection() {
  const loop = [...colleges, ...colleges];

  return (
    <section
      className="w-full border-y border-black/20 bg-[#2d2d2d] py-9 sm:py-10"
      aria-label="Partner business schools"
    >
      <p className="mb-6 flex items-center justify-center gap-2 px-4 text-center text-sm font-medium text-white sm:text-[0.95rem]">
        <span>Mentors from colleges students dream of</span>
        <Sparkles className="h-4 w-4 shrink-0 text-[#F9C41A]" strokeWidth={2} aria-hidden />
      </p>

      <div className="college-marquee-fade relative overflow-hidden">
        <div className="college-marquee-track flex w-max gap-3 pr-3">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#0d0d0f] shadow-[4px_4px_0_0_#F9C41A] sm:px-5 sm:py-2.5 sm:text-[0.9rem]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
