import Link from "next/link";
import {
  Users,
  MessageCircle,
  Zap,
  ArrowRight,
  Music,
  Target,
  Rocket,
  Calendar
} from "lucide-react";
import HighlightPill from "../ui/HighlightPill";
import PillButton from "../ui/PillButton";

const features = [
  {
    icon: MessageCircle,
    label: "Daily discussions & expert insights"
  },
  {
    icon: Calendar,
    label: "Peer support & mentor success stories"
  },
  {
    icon: Zap,
    label: "Quick tips & motivation that fits your pace"
  }
];

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-[8%] top-[12%] h-16 w-16 rotate-12 rounded-lg border-2 border-white/15" />
      <div className="absolute right-[15%] top-[20%] h-24 w-24 rounded-full border-2 border-white/10" />
      <div className="absolute bottom-[25%] left-[12%] h-10 w-10 rounded-md border-2 border-white/12" />
      <div className="absolute bottom-[18%] right-[8%] h-20 w-20 rounded-full border-2 border-white/10" />
      <div className="absolute left-[20%] top-[40%] h-8 w-8 rotate-45 rounded-sm border-2 border-purple-300/25" />
      <div className="absolute right-[25%] bottom-[35%] h-6 w-6 rotate-12 rounded-md border-2 border-purple-300/20" />
      <Rocket
        className="absolute right-[22%] top-[8%] h-14 w-14 text-white/12"
        strokeWidth={1.5}
        aria-hidden
      />
    </div>
  );
}

function StackedCommunityCards() {
  return (
    <div className="relative mx-auto flex w-full max-w-[340px] justify-center py-6 lg:mx-0 lg:max-w-none lg:justify-end lg:py-2">
      <div className="relative h-[300px] w-[280px] sm:h-[320px] sm:w-[300px]">
        {/* Back — blue */}
        <div
          className="absolute left-[52px] top-[28px] h-[248px] w-[200px] rotate-10 rounded-[22px] border-[3px] border-[#1f2937] bg-white shadow-[5px_5px_0_0_#1f2937]"
          style={{ zIndex: 1 }}
        >
          <div className="p-5">
            <div className="h-12 w-12 rounded-full border-[2.5px] border-[#1f2937] bg-[#5061E4]" />
            <div className="mt-5 space-y-2">
              <div className="h-2 rounded-full bg-neutral-200" />
              <div className="h-2 w-[88%] rounded-full bg-neutral-200" />
              <div className="h-2 w-[72%] rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>

        {/* Middle — orange */}
        <div
          className="absolute left-[28px] top-[14px] h-[248px] w-[200px] rotate-[5deg] rounded-[22px] border-[3px] border-[#1f2937] bg-white shadow-[5px_5px_0_0_#1f2937]"
          style={{ zIndex: 2 }}
        >
          <div className="p-5">
            <div className="h-12 w-12 rounded-full border-[2.5px] border-[#1f2937] bg-[#F59E0B]" />
            <div className="mt-5 space-y-2">
              <div className="h-2 rounded-full bg-neutral-200" />
              <div className="h-2 w-[85%] rounded-full bg-neutral-200" />
              <div className="h-2 w-[68%] rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>

        {/* Front — red */}
        <div
          className="absolute left-0 top-0 flex h-[248px] w-[200px] flex-col rounded-[22px] border-[3px] border-[#1f2937] bg-white p-5 shadow-[6px_6px_0_0_#1f2937]"
          style={{ zIndex: 3 }}
        >
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] border-[#1f2937] bg-[#E53E3E]">
              <Target className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="mt-5 flex-1 space-y-2">
            <div className="h-2 rounded-full bg-neutral-200" />
            <div className="h-2 w-[90%] rounded-full bg-neutral-200" />
            <div className="h-2 w-[70%] rounded-full bg-neutral-200" />
            <div className="h-2 w-[55%] rounded-full bg-neutral-100" />
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            <span className="inline-flex items-center gap-1 rounded-full border-2 border-[#1f2937] bg-[#FFB800] px-2 py-0.5 text-[10px] font-extrabold text-[#1f2937] shadow-[2px_2px_0_0_#1f2937]">
              👍24
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border-2 border-[#1f2937] bg-[#E53E3E] px-2 py-0.5 text-[10px] font-extrabold text-white shadow-[2px_2px_0_0_#1f2937]">
              💬12
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function CommunitySection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-10"
      style={{ backgroundColor: "#5061E4" }}
    >
      <BackgroundDecor />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="max-w-xl lg:max-w-none">
          <HighlightPill text="Peer Support Community" variant="secondary" icon={<Users size={16} />} />

          <h2 className="mt-6 text-3xl font-extrabold leading-[1.2] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.65rem]">
            Join Our Thriving{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Community</span>
            </span>{" "}
            🚀
          </h2>

          <p className="mt-6 text-base font-medium leading-relaxed text-white/95 sm:text-[1.05rem]">
            Connect with like-minded MBA aspirants, share experiences, get daily tips, and stay motivated
            with our vibrant community of mentors and mentees.
          </p>

          <ul className="mt-8 space-y-4">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-[3px] border-[#1f2937] bg-[#F59E0B] shadow-[3px_3px_0_0_#1f2937]">
                  <Icon size={18} className="text-white" strokeWidth={2.5} aria-hidden />
                </span>
                <span className="pt-1.5 text-[0.95rem] font-semibold leading-snug text-white">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
           <PillButton href="/mentee/find-mentors" variant="yellow">
            Join the Community
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
            </PillButton>
          </div>
        </div>

        <StackedCommunityCards />
      </div>
    </section>
  );
}
