"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MentorBookingPage from "../../../components/mentee/v2/MentorBookingPage";
import { publicMentorApi } from "../../../lib/api";
import { Loader2, ArrowLeft, Star, MapPin } from "lucide-react";
import Link from "next/link";

export default function BookMentorPage({ params }) {
  const { id: mentorProfileId } = params;
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await publicMentorApi.getMentorProfile(mentorProfileId);
        setMentor(res?.data?.mentor || res?.data);
      } catch (e) {
        console.error("Failed to load mentor:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [mentorProfileId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF7F5] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5061E4]" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7F5]">
      {/* Top bar */}
      <div className="border-b-2 border-black bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <Link
            href="/mentee/find-mentors"
            className="flex items-center gap-2 rounded-lg border-2 border-black px-3 py-1.5 text-sm font-bold hover:bg-gray-50"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          {mentor && (
            <div className="flex items-center gap-3">
              {mentor.profilePicture ? (
                <img
                  src={mentor.profilePicture}
                  alt={mentor.name}
                  className="h-10 w-10 rounded-full border-2 border-black object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#5061E4] text-white font-bold">
                  {(mentor.name || "M")[0]}
                </div>
              )}
              <div>
                <h2 className="text-base font-extrabold">{mentor.name || "Mentor"}</h2>
                {mentor.bio && (
                  <p className="text-xs text-gray-500 max-w-md truncate">{mentor.bio}</p>
                )}
              </div>
              {mentor.averageRating > 0 && (
                <span className="ml-3 flex items-center gap-1 rounded-lg border-2 border-[#F59E0B] bg-[#FEF3C7] px-2 py-1 text-xs font-bold text-[#92400E]">
                  <Star size={10} fill="#F59E0B" />
                  {mentor.averageRating.toFixed(1)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Booking content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <MentorBookingPage mentorProfileId={mentorProfileId} />
      </div>
    </div>
  );
}
