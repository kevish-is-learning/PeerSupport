"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft, Star, BookOpen, Clock, ChevronDown, ChevronUp,
  Calendar, Award, Briefcase, GraduationCap, Users, CheckCircle,
} from "lucide-react";
import { publicMentorApi, bookingApi, resolveUploadUrl } from "../../../../lib/api";
import useAuthStore from "../../../../store/useAuthStore";
import MentorBookingPage from "../../../../components/mentee/v2/MentorBookingPage";

/* ─── Constants ────────────────────────────────────────────── */
const DAY_SHORT = {
  MONDAY: "Mon", TUESDAY: "Tue", WEDNESDAY: "Wed",
  THURSDAY: "Thu", FRIDAY: "Fri", SATURDAY: "Sat", SUNDAY: "Sun",
};

function formatTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${String(h > 12 ? h - 12 : h || 12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

function getNextDatesForService(availability, serviceId, count = 3) {
  const validDays = [];
  for (const day of availability) {
    const hasSlot = day.slots?.some((s) =>
      s.services?.some((sv) => sv.mentorServiceId === serviceId)
    );
    if (hasSlot) validDays.push(day.dayOfWeek);
  }
  if (!validDays.length) return [];

  const dayMap = { SUNDAY: 0, MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3, THURSDAY: 4, FRIDAY: 5, SATURDAY: 6 };
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 30 && dates.length < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = Object.keys(dayMap).find((k) => dayMap[k] === d.getDay());
    if (validDays.includes(dayName)) {
      dates.push({
        date: d,
        dateStr: d.toISOString().split("T")[0],
        label: `${d.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}, ${DAY_SHORT[dayName]}`,
      });
    }
  }
  return dates;
}

/* ─── Loading Skeleton ─────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-40 animate-pulse rounded-2xl border-2 border-gray-200 bg-white" />
        <div className="h-48 animate-pulse rounded-2xl border-2 border-gray-200 bg-white" />
        <div className="h-64 animate-pulse rounded-2xl border-2 border-gray-200 bg-white" />
      </div>
    </div>
  );
}

/* ─── Service Accordion ────────────────────────────────────── */
function ServiceAccordion({ service, isOpen, onToggle, mentor, user, router }) {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateLabel, setSelectedDateLabel] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (isOpen && mentor?.availability) {
      const d = getNextDatesForService(mentor.availability, service.id);
      setDates(d);
      setSelectedDate(null);
      setSelectedDateLabel(null);
      setSelectedSlot(null);
      setSlots([]);
    }
  }, [isOpen, mentor?.availability, service.id]);

  const fetchSlots = useCallback(async (dateStr) => {
    setLoadingSlots(true);
    setSelectedSlot(null);
    try {
      const res = await bookingApi.getAvailableSlots(mentor.id, {
        serviceType: service.serviceType,
        date: dateStr,
      });
      setSlots(res.data?.slots || []);
    } catch {
      setSlots([]);
      toast.error("Could not fetch slots");
    } finally {
      setLoadingSlots(false);
    }
  }, [mentor?.id, service.serviceType]);

  const handleDateSelect = (d) => {
    setSelectedDate(d.dateStr);
    setSelectedDateLabel(d.label);
    fetchSlots(d.dateStr);
  };

  const handleContinueToBook = () => {
    if (!user) {
      router.push("/auth?mode=login");
      return;
    }
    if (!selectedSlot || !selectedDate) return;

    // Encode booking data in URL params and navigate to booking wizard
    const params = new URLSearchParams({
      serviceId: service.id,
      serviceType: service.serviceType,
      serviceLabel: service.label,
      price: String(service.pricePerSession),
      duration: String(service.durationMinutes || 60),
      date: selectedDate,
      dateLabel: selectedDateLabel || selectedDate,
      slotId: selectedSlot.id,
      slotTime: selectedSlot.startTime,
    });
    router.push(`/mentee/find-mentors/${mentor.id}/book?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl border-2 border-black bg-white overflow-hidden transition-shadow hover:shadow-[4px_4px_0px_0px_#E8A040]">
      <button onClick={onToggle} className="flex w-full items-center justify-between p-5 text-left">
        <div>
          <h3 className="text-base font-extrabold text-gray-900">{service.label}</h3>
          <div className="mt-1 flex items-center gap-3 text-sm">
            <span className="font-bold text-[#8B5CF6]">₹{Math.round(service.pricePerSession)}</span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center gap-1 text-gray-500 font-semibold">
              <Clock className="h-3.5 w-3.5" /> {service.durationMinutes || 60} min
            </span>
          </div>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>

      {isOpen && (
        <div className="border-t-2 border-dashed border-gray-200 px-5 pb-5 pt-4 space-y-4">
          {/* Dates */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Select a Date</p>
            {dates.length === 0 ? (
              <p className="text-sm text-gray-400">No available dates in the next 30 days</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {dates.map((d) => (
                  <button
                    key={d.dateStr}
                    onClick={() => handleDateSelect(d)}
                    className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition-all ${
                      selectedDate === d.dateStr
                        ? "border-[#22C55E] bg-[#22C55E] text-white shadow-[2px_2px_0px_0px_#166534]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#8B5CF6]"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Select a Time Slot</p>
              {loadingSlots ? (
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-28 animate-pulse rounded-xl border-2 border-gray-200 bg-gray-100" />
                  ))}
                </div>
              ) : slots.length === 0 ? (
                <p className="text-sm text-gray-400">No slots available on this date</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition-all ${
                        selectedSlot?.id === slot.id
                          ? "border-[#22C55E] bg-[#22C55E] text-white shadow-[2px_2px_0px_0px_#166534]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-[#8B5CF6]"
                      }`}
                    >
                      {formatTime(slot.startTime)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Continue Button */}
          {selectedSlot && (
            <button
              onClick={handleContinueToBook}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-[#22C55E] py-3 text-sm font-extrabold text-white shadow-[3px_3px_0px_0px_#166534] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#166534] active:translate-y-0 active:shadow-none"
            >
              <Calendar className="h-4 w-4" />
              Continue to Book Session
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Review Card ──────────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 bg-[#F3E8FF]">
          {review.authorPicture ? (
            <img src={resolveUploadUrl(review.authorPicture)} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-black text-[#8B5CF6]">
              {review.authorName?.charAt(0) || "?"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-gray-900">{review.authorName}</h4>
            <span className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-gray-200"}`} />
            ))}
          </div>
          {review.review && <p className="mt-2 text-sm text-gray-600 leading-relaxed">{review.review}</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────────────── */
export default function MentorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openService, setOpenService] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await publicMentorApi.getMentorProfile(params.mentorId);
        setMentor(res.data);
        if (res.data?.services?.length > 0) setOpenService(res.data.services[0].id);
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
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <span className="text-5xl">😔</span>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900">Mentor not found</h2>
          <Link href="/mentee/find-mentors" className="mt-4 inline-block text-sm font-bold text-[#8B5CF6] hover:underline">
            ← Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const college = mentor.pgCollege || mentor.ugCollege;

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans">
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">

        {/* Back */}
        <Link
          href="/mentee/find-mentors"
          className="mb-6 inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-bold text-gray-900 shadow-[2px_2px_0px_0px_#1E1E1E] transition hover:shadow-[4px_4px_0px_0px_#1E1E1E] no-underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>

        {/* ── Hero Card ── */}
        <div className="rounded-2xl border-2 border-black bg-white p-6 shadow-[5px_5px_0px_0px_#8B5CF6]">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-3 border-black bg-[#F3E8FF]">
                {mentor.profilePicture ? (
                  <img src={resolveUploadUrl(mentor.profilePicture)} alt={mentor.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-black text-[#8B5CF6]">
                    {mentor.name?.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">{mentor.name}</h1>
                {mentor.workExperience && (
                  <p className="mt-0.5 text-sm font-semibold text-gray-500">{mentor.workExperience}</p>
                )}
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
                  {college && (
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5 text-[#22C55E]" /> {college}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    {mentor.averageRating > 0 ? mentor.averageRating.toFixed(1) : "New"}
                    {mentor.totalReviews > 0 && ` (${mentor.totalReviews} reviews)`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {mentor.totalSessions} mentees
                  </span>
                </div>
              </div>
            </div>
            {mentor.startingPrice && (
              <div className="rounded-xl border-2 border-black bg-[#FFF7ED] px-4 py-3 text-center shadow-[3px_3px_0px_0px_#E8A040]">
                <p className="text-xs font-semibold text-gray-500">Starting from</p>
                <p className="text-2xl font-black text-gray-900">₹{Math.round(mentor.startingPrice)}</p>
                <a href="#book" className="mt-2 inline-flex items-center gap-1 rounded-lg bg-[#8B5CF6] px-4 py-1.5 text-xs font-bold text-white transition hover:bg-[#7C3AED]">
                  <Calendar className="h-3 w-3" /> Book Session
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── About & Achievements ── */}
        <div className="mt-6 grid gap-6 sm:grid-cols-5">
          <div className="sm:col-span-3 rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#C084FC]">
            <h2 className="mb-3 flex items-center gap-2 text-base font-extrabold text-gray-900">
              <Briefcase className="h-4 w-4 text-[#8B5CF6]" /> About
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">{mentor.bio || "No bio provided."}</p>
          </div>
          <div className="sm:col-span-2 rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#F59E0B]">
            <h2 className="mb-3 flex items-center gap-2 text-base font-extrabold text-gray-900">
              <Award className="h-4 w-4 text-[#F59E0B]" /> Achievements
            </h2>
            <ul className="space-y-2">
              {mentor.totalSessions > 0 && (
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                  Mentored {mentor.totalSessions}+ students
                </li>
              )}
              {college && (
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                  Alumni of {college}
                </li>
              )}
              {mentor.certifications && (
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                  {mentor.certifications}
                </li>
              )}
              {mentor.averageRating >= 4.5 && (
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                  Top-rated mentor ({mentor.averageRating.toFixed(1)} ⭐)
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* ── Expertise ── */}
        {mentor.expertiseTags?.length > 0 && (
          <div className="mt-6 rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#1E1E1E]">
            <h2 className="mb-3 text-base font-extrabold text-gray-900">Areas of Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {mentor.expertiseTags.map((tag) => (
                <span key={tag} className="rounded-lg border-2 border-[#8B5CF6] bg-[#F3E8FF] px-3 py-1 text-xs font-bold text-[#7C3AED]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Book a Session ── */}
        <div id="book" className="mt-6 rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#22C55E]">
          <MentorBookingPage mentorProfileId={mentor.id} />
        </div>

        {/* ── Reviews ── */}
        {mentor.reviews?.length > 0 && (
          <div className="mt-6 rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#F59E0B]">
            <h2 className="mb-4 text-lg font-black text-gray-900">
              Reviews &amp; Ratings
            </h2>
            <div className="space-y-3">
              {mentor.reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        )}

        <div className="h-12" />
      </div>
    </div>
  );
}
