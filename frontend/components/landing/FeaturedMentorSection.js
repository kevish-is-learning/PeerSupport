"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HighlightPill from "../ui/HighlightPill";
import PillButton from "../ui/PillButton";
import { publicMentorApi, resolveUploadUrl } from "../../lib/api";
import { ArrowRight, Clock, GraduationCap, Sparkles, Star, UserRound } from "lucide-react";

const CARD_STYLES = [
  { accent: "#5763E6", ctaColor: "bg-[#5763E6] text-white" },
  { accent: "#FFB705", ctaColor: "bg-[#F9C41A] text-[#0d0d0f]" },
  { accent: "#EF4444", ctaColor: "bg-[#ef4444] text-white" },
];

const getCollegeName = (mentor) => mentor.pgCollege || mentor.ugCollege || "College not listed";

function MentorCard({ mentor, index }) {
  const style = CARD_STYLES[index % CARD_STYLES.length];
  const rating = Number(mentor.rating) || 0;
  const sessions = Number(mentor.totalSessions) || 0;
  const imageUrl = resolveUploadUrl(mentor.profilePicture);

  return (
    <article className="flex flex-col rounded-[22px] border-4 bg-white shadow-[5px_5px_0_0_#1a1a1a]">
      <div className="relative m-3 mb-0 flex aspect-4/3.5 items-center justify-center overflow-hidden rounded-xl border-t-8 bg-gray-100" style={{ borderColor: style.accent }}>
        {imageUrl ? (
          <img src={imageUrl} alt={mentor.name} className="h-full w-full object-cover object-top" loading="lazy" />
        ) : (
          <UserRound size={44} className="text-gray-400" aria-label="No profile photo" />
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <h3 className="text-xl font-extrabold tracking-[-0.02em] text-[#0d0d0f]">{mentor.name}</h3>

        <span className="mt-1.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-black/15 bg-[#f5f5f5] px-3 py-1 text-xs font-semibold text-[#0d0d0f]">
          <GraduationCap size={16} color="#5763E6" />
          {getCollegeName(mentor)}
        </span>

        <p className="mt-3 flex-1 text-[0.82rem] leading-[1.6] text-[#5c5f69]">
          {mentor.bio || "No bio added yet."}
        </p>

        <div className="mt-3 flex items-center gap-4 text-sm font-bold text-[#0d0d0f]">
          {rating > 0 ? (
            <span className="flex items-center gap-1">
              <Star size={16} className="fill-[#FFB705] text-[#FFB705]" />
              {rating.toFixed(1)}
            </span>
          ) : (
            <span className="text-[#5c5f69]">New mentor</span>
          )}
          {sessions > 0 && (
            <span className="flex items-center gap-1 text-[#000000]">
              <Clock size={16} color="#5763E6" />
              {sessions} {sessions === 1 ? "session" : "sessions"}
            </span>
          )}
        </div>

        <Link
          href={`/mentee/find-mentors/${mentor.id}`}
          className={`mt-4 flex items-center justify-center gap-2 rounded-full border-[2.5px] border-[#1a1a1a] px-5 py-2.5 text-sm font-bold shadow-[3px_3px_0_0_#1a1a1a] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_#1a1a1a] ${style.ctaColor}`}
        >
          View Mentor
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedMentorSection() {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const response = await publicMentorApi.listMentors({ page: 1, limit: 3, sort: "rating" });
        setMentors(response.data?.mentors || []);
      } catch {
        setMentors([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadMentors();
  }, []);

  return (
    <section id="how-it-works" className="relative mx-auto w-full scroll-mt-24 overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
      <div className="absolute left-6 top-8 h-14 w-14 rotate-16 border-2 bg-[#FBECE6] sm:left-10 sm:h-16 sm:w-16" aria-hidden="true" />
      <div className="absolute bottom-8 right-6 h-14 w-14 rounded-full border-[3px] border-black bg-[#FDF5F3] sm:right-10 sm:h-20 sm:w-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex justify-center">
          <HighlightPill text="Mentors" variant="secondary" icon={<Sparkles size={16} />} />
        </div>

        <h2 className="mt-5 text-center text-[2.2rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0d0d0f] sm:text-[2.8rem]">
          Meet Our Mentors
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-[0.95rem] leading-relaxed text-[#5c5f69]">
          Browse approved mentors currently available on Peer Support.
        </p>

        {isLoading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[390px] animate-pulse rounded-[22px] border-4 border-gray-200 bg-gray-100" />
            ))}
          </div>
        ) : mentors.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor, index) => <MentorCard key={mentor.id} mentor={mentor} index={index} />)}
          </div>
        ) : (
          <p className="mt-12 text-center text-sm font-semibold text-[#5c5f69]">Mentors will appear here once they are approved.</p>
        )}

        <div className="mt-12 flex justify-center">
          <PillButton href="/mentee/find-mentors" variant="accent">
            Explore all mentors
            <span aria-hidden="true" className="text-lg">→</span>
          </PillButton>
        </div>
      </div>
    </section>
  );
}
