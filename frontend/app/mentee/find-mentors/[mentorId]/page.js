"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft, Star, BookOpen, Clock, ChevronDown, ChevronUp,
  Calendar, GraduationCap, Briefcase, CalendarCheck, Loader2, Check,
} from "lucide-react";
import { publicMentorApi, v2Api, resolveUploadUrl } from "../../../../lib/api";
import useAuthStore from "../../../../store/useAuthStore";

/* ─── Helpers ──────────────────────────────────────────────── */
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

function getAvailableDates(availability, serviceId, count = 14) {
  const dates = [];
  const today = new Date();
  
  // Filter availability windows for this specific service
  const relevantWindows = availability?.filter(w => 
    w.services?.some(s => s.mentorServiceId === serviceId) || w.services?.length === 0
  ) || [];

  if (relevantWindows.length === 0) return []; // No availability at all for this service

  const dayOfWeekMap = {
    0: 'SUNDAY',
    1: 'MONDAY',
    2: 'TUESDAY',
    3: 'WEDNESDAY',
    4: 'THURSDAY',
    5: 'FRIDAY',
    6: 'SATURDAY'
  };

  const d = new Date(today);
  d.setHours(0, 0, 0, 0);

  // Look ahead up to 60 days to find `count` dates
  let lookAhead = 0;
  while (dates.length < count && lookAhead < 60) {
    const dStr = d.toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
    const dayStr = dayOfWeekMap[d.getDay()];

    const isAvailable = relevantWindows.some(w => {
      if (w.specificDate === dStr) return true;
      if (w.dayOfWeek === dayStr && !w.specificDate) return true;
      return false;
    });

    if (isAvailable) {
      dates.push(new Date(d));
    }

    d.setDate(d.getDate() + 1);
    lookAhead++;
  }

  return dates;
}

/* ─── Loading Skeleton ─────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-64 animate-pulse rounded-2xl border-2 border-gray-200 bg-white" />
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3 h-72 animate-pulse rounded-2xl border-2 border-gray-200 bg-white" />
          <div className="col-span-2 h-72 animate-pulse rounded-2xl border-2 border-gray-200 bg-white" />
        </div>
      </div>
    </div>
  );
}

/* ─── Service Accordion ────────────────────────────────────── */
function ServiceAccordion({ service, availability, isOpen, onToggle, mentorProfileId, user, router }) {
  const [dates] = useState(() => getAvailableDates(availability, service.serviceId || service.id, 14));
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [booking, setBooking] = useState(false);

  const fetchSlots = useCallback(async (date) => {
    setSlotsLoading(true);
    setSlots([]);
    setSelectedSlot(null);
    try {
      const dateStr = date.toLocaleDateString("en-CA");
      const res = await v2Api.getSlots(mentorProfileId, {
        serviceId: service.serviceId || service.id,
        date: dateStr,
      });
      setSlots(res?.data?.slots || []);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [mentorProfileId, service]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    fetchSlots(date);
  };

  const handleContinueToBook = async () => {
    if (!selectedSlot || !user) {
      if (!user) router.push("/auth?mode=login");
      return;
    }
    setBooking(true);
    try {
      const res = await v2Api.createBooking({
        mentorProfileId,
        mentorServiceId: service.id,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      });
      const { booking: bk, order } = res?.data;
      if (!bk?.id || !order?.orderId) throw new Error("Failed to initiate booking");

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Peer Support",
        description: service.serviceName || service.label,
        order_id: order.orderId,
        prefill: order.prefill,
        theme: { color: "#7C3AED" },
        handler: async (response) => {
          try {
            const { paymentApi } = await import("../../../../lib/api");
            await paymentApi.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: bk.id,
            });
            toast.success("Booking confirmed! 🎉");
            setSelectedSlot(null);
            if (selectedDate) fetchSlots(selectedDate);
          } catch {
            toast.error("Payment verification failed.");
          }
        },
        modal: {
          ondismiss: async () => {
            const { paymentApi } = await import("../../../../lib/api");
            await paymentApi.handleFailure({ razorpay_order_id: order.orderId, bookingId: bk.id }).catch(() => {});
            toast.error("Payment cancelled. Slot released.");
          },
        },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async (r) => {
          const { paymentApi } = await import("../../../../lib/api");
          await paymentApi.handleFailure({ razorpay_order_id: order.orderId, bookingId: bk.id }).catch(() => {});
          toast.error(r.error?.description || "Payment failed.");
        });
        rzp.open();
      } else {
        toast.error("Payment gateway not loaded. Refresh the page.");
      }
    } catch (e) {
      if (e.status === 409) {
        toast.error("Slot just booked by someone else.");
        if (selectedDate) fetchSlots(selectedDate);
      } else {
        toast.error(e.message || "Booking failed");
      }
    } finally {
      setBooking(false);
    }
  };

  const dur = service.durationMinutes || 60;
  const price = service.pricePerSession || service.price;

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white overflow-hidden transition-all hover:border-gray-300">
      {/* ── Collapsed header ── */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left cursor-pointer"
      >
        <div>
          <h3 className="text-base font-bold text-gray-900">{service.serviceName || service.label}</h3>
          <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
            <span className="font-semibold text-[#7C3AED]">
              ₹ {price ? Math.round(price).toLocaleString("en-IN") : "—"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {dur === 60 ? "1 hour" : `${dur} min`}
            </span>
          </div>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>

      {/* ── Expanded body ── */}
      {isOpen && (
        <div className="border-t border-dashed border-gray-200 px-5 pb-5 pt-4 space-y-5">

          {/* ── Select a Date ── */}
          <div>
            <p className="mb-3 text-sm font-bold text-gray-900">Select a Date</p>
            {dates.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No upcoming dates available</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {dates.map((date) => {
                  const isSel = selectedDate && date.toDateString() === selectedDate.toDateString();
                  const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" });
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all cursor-pointer ${
                        isSel
                          ? "border-[#7C3AED] bg-[#7C3AED] text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-[#7C3AED]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Select a Time Slot ── */}
          {selectedDate && (
            <div>
              <p className="mb-3 text-sm font-bold text-gray-900">Select a Time Slot</p>
              {slotsLoading ? (
                <div className="flex h-20 items-center justify-center">
                  <Loader2 className="animate-spin text-[#7C3AED]" size={24} />
                </div>
              ) : slots.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No slots available for this date</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((slot, idx) => {
                    const isSel = selectedSlot?.startTime === slot.startTime;
                    return (
                      <button
                        key={`${slot.startTime}-${idx}`}
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all cursor-pointer ${
                          isSel
                            ? "border-[#16A34A] bg-[#16A34A] text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#16A34A]"
                        }`}
                      >
                        {formatSlotTime(slot.startTime)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── Continue to Book Session CTA ── */}
          {selectedSlot && (
            <button
              onClick={handleContinueToBook}
              disabled={booking}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] py-3.5 text-sm font-extrabold text-white transition-all hover:bg-[#6D28D9] disabled:opacity-50 cursor-pointer"
            >
              {booking ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <CalendarCheck className="h-4 w-4" />
              )}
              {booking ? "Processing..." : "Continue to Book Session"}
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
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-[#F3E8FF]">
          {review.authorPicture ? (
            <img src={resolveUploadUrl(review.authorPicture)} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs font-black text-[#7C3AED]">
              {review.authorName?.charAt(0) || "?"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900">{review.authorName}</h4>
            <span className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-gray-200"}`} />
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
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <span className="text-5xl">😔</span>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900">Mentor not found</h2>
          <Link href="/mentee/find-mentors" className="mt-4 inline-block text-sm font-bold text-[#7C3AED] hover:underline">
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
      <div className="mx-auto max-w-7xl px-6 py-6">

        {/* ── Back Button ── */}
        <Link
          href="/mentee/find-mentors"
          className="mb-6 inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-2 text-sm font-bold text-gray-900 shadow-[2px_2px_0px_0px_#1E1E1E] transition hover:shadow-[4px_4px_0px_0px_#1E1E1E] no-underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>

        {/* ══════════ HERO CARD ══════════ */}
        <div className="rounded-2xl border-2 border-black bg-white shadow-[5px_5px_0px_0px_#C4B5FD]">
          {/* Top: Avatar + Info + Book Button */}
          <div className="flex items-start justify-between gap-4 p-6 pb-4">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-gray-200 bg-[#F3E8FF]">
                {mentor.profilePicture ? (
                  <img src={resolveUploadUrl(mentor.profilePicture)} alt={mentor.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-black text-[#7C3AED]">
                    {mentor.name?.charAt(0)}
                  </div>
                )}
              </div>
              {/* Info */}
              <div>
                <h1 className="text-2xl font-black text-gray-900">{mentor.name}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  {college && (
                    <span className="flex items-center gap-1 font-semibold">
                      <GraduationCap className="h-4 w-4 text-[#7C3AED]" /> {college}
                    </span>
                  )}
                  {workExp && (
                    <span className="flex items-center gap-1 font-semibold">
                      <Briefcase className="h-4 w-4 text-gray-400" /> {workExp}
                    </span>
                  )}
                </div>
                {/* Stats pills */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-bold text-gray-700">
                    <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    {avgRating > 0 ? avgRating.toFixed(1) : "New"} rating
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-bold text-gray-700">
                    <BookOpen className="h-3.5 w-3.5 text-[#7C3AED]" />
                    {mentor.totalSessions} sessions
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-bold text-gray-700">
                    <Clock className="h-3.5 w-3.5 text-[#22C55E]" />
                    {mentor.totalSessions * 1 || 0} hours
                  </span>
                </div>
              </div>
            </div>
            {/* Book Session CTA */}
            <button
              onClick={scrollToBook}
              className="shrink-0 flex items-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#6D28D9] shadow-[0_2px_8px_rgba(124,58,237,0.3)] cursor-pointer"
            >
              <CalendarCheck className="h-4 w-4" /> Book Session
            </button>
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-gray-100" />

          {/* About */}
          <div className="px-6 py-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">About</h3>
            <p className="text-sm leading-relaxed text-gray-600">{mentor.bio || "No bio provided."}</p>
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-gray-100" />

          {/* Areas of Expertise */}
          {mentor.expertiseTags?.length > 0 && (
            <div className="px-6 py-4">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.expertiseTags.map((tag) => (
                  <span key={tag} className="rounded-lg bg-[#7C3AED] px-3 py-1.5 text-xs font-bold text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ══════════ BOTTOM: BOOK + REVIEWS ══════════ */}
        <div id="book-section" className="mt-6 grid gap-6 lg:grid-cols-[3fr_2fr]">
          {/* ── Book a Session ── */}
          <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-[5px_5px_0px_0px_#C4B5FD]">
            <h2 className="mb-1 flex items-center gap-2 text-lg font-black text-gray-900">
              <Calendar className="h-5 w-5" /> Book a Session
            </h2>
            <p className="mb-4 text-sm text-gray-400">Select a service to view available dates and time slots</p>

            {services.length === 0 ? (
              <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-sm font-bold text-gray-400">No services available yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {services.map((svc) => (
                  <ServiceAccordion
                    key={svc.id}
                    service={svc}
                    availability={mentor.availability}
                    isOpen={openService === svc.id}
                    onToggle={() => setOpenService(openService === svc.id ? null : svc.id)}
                    mentorProfileId={mentor.id}
                    user={user}
                    router={router}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Reviews & Ratings ── */}
          <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-[5px_5px_0px_0px_#FDBA74]">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-gray-900">
              <Star className="h-5 w-5 fill-[#F59E0B] text-[#F59E0B]" /> Reviews & Ratings
            </h2>

            {/* Rating Summary */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl font-black text-gray-900">
                {avgRating > 0 ? avgRating.toFixed(1) : "—"}
              </span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(avgRating) ? "fill-[#F59E0B] text-[#F59E0B]" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">({reviews.length} reviews)</span>
            </div>

            {/* Review List */}
            {reviews.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
                <p className="text-sm text-gray-400">No reviews yet</p>
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

        <div className="h-12" />
      </div>
    </div>
  );
}
