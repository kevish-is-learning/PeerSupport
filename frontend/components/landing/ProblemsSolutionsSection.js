import HighlightPill from "../ui/HighlightPill";
import CircularFeatureCard from "../ui/CircularFeatureCard";
import { CircleDot, Clock, Map, XCircle, CheckCircle2, Sparkles, Trophy, Rocket } from "lucide-react";

const problems = [
  {
    icon: Map,
    title: "Lack of Guidance",
    description: "No insider perspectives from top colleges"
  },
  {
    icon: XCircle,
    title: "Limited Mentor Access",
    description: "Hard to find experienced B-school mentors"
  },
  {
    icon: Clock,
    title: "Generic Preparation",
    description: "One-size-fits-all courses don't work"
  }
];

const solutions = [
  {
    icon: CheckCircle2,
    title: "Direct Access",
    description: "Connect 1:1 with IIM & FMS alumni"
  },
  {
    icon: Sparkles,
    title: "Personalized",
    description: "Customized guidance for your profile"
  },
  {
    icon: Trophy,
    title: "Proven Results",
    description: "Real experiences, real success stories"
  }
];

const VB = 540;
const CX = 270;
const CY = 270;
const RING_R = 180;
const NODE = 75;

function JourneyCenter() {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex h-19 w-19 items-center justify-center rounded-full border-[3px] border-[#1f2937] bg-white sm:h-22 sm:w-22"
        style={{ boxShadow: "5px 5px 0 0 #FFB800" }}
      >
        <Rocket className="text-[#5061E4]" size={34} strokeWidth={2.25} aria-hidden />
      </div>
      <p className="mt-3 text-center text-base font-extrabold tracking-tight text-[#1f2937] sm:text-lg">
        Our Journey
      </p>
    </div>
  );
}

/** Polar degrees: 0 = right; problems on top arc, solutions on bottom arc */
function JourneyRing() {
  const angles = [
    { item: problems[1], accent: "orange", deg: -150 }, // Limited Mentor Access
    { item: problems[2], accent: "orange", deg: -90 },  // Generic Preparation
    { item: problems[0], accent: "orange", deg: -30 },  // Lack of Guidance
    { item: solutions[0], accent: "blue", deg: 150 },   // Direct Access
    { item: solutions[1], accent: "blue", deg: 90 },    // Personalized
    { item: solutions[2], accent: "blue", deg: 30 }     // Proven Results
  ];

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <svg
        className="h-auto w-full text-[#d1d5db]"
        viewBox={`0 0 ${VB} ${VB}`}
        role="img"
        aria-label="Problems and solutions journey"
      >
        <foreignObject x={CX - 56} y={CY - 70} width="112" height="150">
          <div className="flex h-full w-full items-center justify-center" xmlns="http://www.w3.org/1999/xhtml">
            <JourneyCenter />
          </div>
        </foreignObject>

        {angles.map(({ item, accent, deg }) => {
          const rad = (deg * Math.PI) / 180;
          const px = CX + RING_R * Math.cos(rad);
          const py = CY + RING_R * Math.sin(rad);
          return (
            <foreignObject key={item.title} x={px - NODE} y={py - NODE} width={NODE * 2} height={NODE * 2}>
              <div
                className="flex h-full w-full items-center justify-center"
                xmlns="http://www.w3.org/1999/xhtml"
              >
                <CircularFeatureCard {...item} accent={accent} compact />
              </div>
            </foreignObject>
          );
        })}
      </svg>
    </div>
  );
}

function BackgroundCream() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -right-16 top-8 h-64 w-64 rounded-full bg-[#5061E4]/6 blur-2xl" />
      <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-[#F59E0B]/10 blur-2xl" />
    </div>
  );
}

export default function ProblemsSolutionsSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F4] px-4 pb-0 pt-16 sm:px-6 sm:pt-20 lg:px-10">
      <BackgroundCream />

      <div className="relative mx-auto max-w-5xl pb-14">
        <div className="flex flex-col items-center text-center">
          <HighlightPill variant="primary" className="gap-2 border-[#1f2937] font-semibold">
            <CircleDot className="h-4 w-4 shrink-0" strokeWidth={2.5} />
            About Us
          </HighlightPill>

          <h2 className="mt-6 max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-[-0.03em] text-[#1f2937] sm:text-4xl lg:text-[2.5rem]">
            From Problems to{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Solutions</span>
              <span
                className="absolute -bottom-1 left-0 right-0 z-0 h-1.5 rounded-sm bg-[#FFB800]"
                aria-hidden
              />
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[#6b7280] sm:text-[1.05rem]">
            We identified the challenges MBA aspirants face and built a platform to solve them.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8">
          <HighlightPill text="Problems" variant="orange" className="border-[#1f2937] font-bold shadow-[4px_4px_0_0_#1f2937]" />

          <JourneyRing />

          <HighlightPill text="Solutions" variant="blue" className="border-[#1f2937] font-bold shadow-[4px_4px_0_0_#1f2937]" />
        </div>
      </div>

      <div
        className="h-1.5 w-full bg-linear-to-r from-[#F59E0B] via-[#FFB800] to-[#5061E4]"
        aria-hidden
      />
    </section>
  );
}
