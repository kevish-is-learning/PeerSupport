"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft, Star, GraduationCap, Briefcase, BookOpen, Clock, CalendarCheck
} from "lucide-react";
import { publicMentorApi, resolveUploadUrl } from "../../../../lib/api";
import MentorBookingPage from "../../../../components/mentee/v2/MentorBookingPage";

function parseWorkExp(raw) {
  if (!raw) return null;
  const parts = raw.split("|");
  if (parts.length === 3) return `${parts[0]} years at ${parts[1]}`;
  return raw;
}

function parseCollege(raw) {
  if (!raw) return null;
  const parts = raw.split("||");
  if (parts.length === 2) return `${parts[0]} (${parts[1]})`;
  return raw;
}

function formatSlotTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
}

/* ─── Loading Skeleton ─────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-64 animate-pulse rounded-2xl border-2 border-gray-200 bg-white" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 h-72 animate-pulse rounded-2xl border-2 border-gray-200 bg-white" />
          <div className="lg:col-span-2 h-72 animate-pulse rounded-2xl border-2 border-gray-200 bg-white" />
        </div>
      </div>
    </div>
  );
}

/* ─── Review Card ──────────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3.5 sm:p-4">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-[#F3E8FF]">
          {review.authorPicture ? (
            <img src={resolveUploadUrl(review.authorPicture)} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-black text-[#7C3AED]">
              {review.authorName?.charAt(0) || "?"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">{review.authorName}</h4>
            <span className="text-[10px] sm:text-xs text-gray-400 shrink-0">
              {new Date(review.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-gray-200"}`} />
            ))}
          </div>
          {review.review && <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed break-words">{review.review}</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function MentorProfilePage() {
  const params = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await publicMentorApi.getMentorProfile(params.mentorId);
        setMentor(res.data);
      } catch {
        toast.error("Could not load mentor profile");
      } finally {
        setLoading(false);
      }
    })();
  }, [params.mentorId]);

  if (loading) return <LoadingSkeleton />;

  if (!mentor) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="text-center">
          <span className="text-4xl sm:text-5xl">😔</span>
          <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-gray-900">Mentor not found</h2>
          <Link href="/mentee/find-mentors" className="mt-4 inline-block text-xs sm:text-sm font-bold text-[#7C3AED] hover:underline">
            ← Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const college = parseCollege(mentor.pgCollege) || parseCollege(mentor.ugCollege);
  const workExp = parseWorkExp(mentor.workExperience);
  const services = mentor.services || [];
  const reviews = mentor.reviews || [];
  const avgRating = mentor.averageRating || 0;

  const scrollToBook = () => {
    document.getElementById("book-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-full overflow-y-auto">
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 py-4 sm:py-6">

        {/* ── Back Button ── */}
        <Link
          href="/mentee/find-mentors"
          className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-gray-900 shadow-[2px_2px_0px_0px_#1E1E1E] transition hover:shadow-[4px_4px_0px_0px_#1E1E1E] no-underline cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back to Explore
        </Link>

        {/* ══════════ HERO CARD ══════════ */}
        <div className="rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_#C4B5FD] sm:shadow-[5px_5px_0px_0px_#C4B5FD] overflow-hidden">
          {/* Top: Avatar + Info + Book Button */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-4 sm:p-6 pb-4">
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3.5 sm:gap-5 min-w-0 flex-1">
              {/* Avatar */}
              <div className="h-16 w-16 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-gray-200 bg-[#F3E8FF]">
                {mentor.profilePicture ? (
                  <img src={resolveUploadUrl(mentor.profilePicture)} alt={mentor.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl sm:text-3xl font-black text-[#7C3AED]">
                    {mentor.name?.charAt(0)}
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 truncate">{mentor.name}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                  {college && (
                    <span className="flex items-center gap-1 font-semibold truncate max-w-full">
                      <GraduationCap className="h-4 w-4 text-[#7C3AED] shrink-0" /> <span className="truncate">{college}</span>
                    </span>
                  )}
                  {workExp && (
                    <span className="flex items-center gap-1 font-semibold truncate max-w-full">
                      <Briefcase className="h-4 w-4 text-gray-400 shrink-0" /> <span className="truncate">{workExp}</span>
                    </span>
                  )}
                </div>
                {/* Stats pills */}
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-gray-700">
                    <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    {avgRating > 0 ? avgRating.toFixed(1) : "New"} rating
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-gray-700">
                    <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#7C3AED]" />
                    {mentor.totalSessions} sessions
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold text-gray-700">
                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#22C55E]" />
                    {mentor.totalSessions * 1 || 0} hours
                  </span>
                </div>
              </div>
            </div>
            {/* Book Session CTA */}
            <button
              onClick={scrollToBook}
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#6D28D9] shadow-[0_2px_8px_rgba(124,58,237,0.3)] cursor-pointer"
            >
              <CalendarCheck className="h-4 w-4" /> Book Session
            </button>
          </div>

          {/* Divider */}
          <div className="mx-4 sm:mx-6 border-t border-gray-100" />

          {/* About */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4">
            <h3 className="mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">About</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-600 break-words whitespace-pre-line max-w-full">
              {mentor.bio || "No bio provided."}
            </p>
          </div>

          {/* Divider */}
          {mentor.expertiseTags?.length > 0 && <div className="mx-4 sm:mx-6 border-t border-gray-100" />}

          {/* Areas of Expertise */}
          {mentor.expertiseTags?.length > 0 && (
            <div className="px-4 sm:px-6 py-3.5 sm:py-4">
              <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-gray-400">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {mentor.expertiseTags.map((tag) => (
                  <span key={tag} className="rounded-lg bg-[#7C3AED] px-2.5 py-1 text-[11px] sm:text-xs font-bold text-white truncate max-w-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ══════════ BOTTOM: BOOK + REVIEWS ══════════ */}
        <div id="book-section" className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-[3fr_2fr]">
          {/* ── Book a Session ── */}
          <div className="w-full min-w-0">
            <MentorBookingPage mentorProfileId={mentor.id} />
          </div>

          {/* ── Reviews & Ratings ── */}
          <div className="rounded-2xl border-2 border-black bg-white p-4 sm:p-5 shadow-[4px_4px_0px_0px_#FDBA74] sm:shadow-[5px_5px_0px_0px_#FDBA74] max-h-max min-w-0">
            <h2 className="mb-3 flex items-center gap-2 text-base sm:text-lg font-black text-gray-900">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-[#F59E0B] text-[#F59E0B]" /> Reviews & Ratings
            </h2>

            {/* Rating Summary */}
            <div className="mb-4 flex items-center gap-2.5 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-black text-gray-900">
                {avgRating > 0 ? avgRating.toFixed(1) : "—"}
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${i < Math.round(avgRating) ? "fill-[#F59E0B] text-[#F59E0B]" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-400">({reviews.length} reviews)</span>
            </div>

            {/* Review List */}
            {reviews.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
                <p className="text-xs sm:text-sm text-gray-400">No reviews yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {reviews.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="h-8 sm:h-12" />
      </div>
    </div>
  );
}
