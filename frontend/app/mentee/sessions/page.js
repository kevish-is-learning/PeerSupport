"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Star,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  IndianRupee,
  Mail,
  Phone,
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
} from "lucide-react";
import { menteeBookingApi, resolveUploadUrl } from "../../../lib/api";
import { canJoinSession, joinDisabledReason } from "../../../lib/sessionUtils";
import { format } from "date-fns";
import { toast } from "sonner";
import { v2BookingApi } from "../../../lib/api";
import RescheduleModal from "../../../components/shared/RescheduleModal";
/* ─── Status Badge ──────────────────────────────────────────── */
const statusConfig = {
  CONFIRMED: { label: "Confirmed", icon: CheckCircle, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  PAYMENT_PENDING: { label: "Payment Pending", icon: Clock, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  IN_PROGRESS: { label: "In Progress", icon: Video, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  COMPLETED: { label: "Completed", icon: CheckCircle, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  RESCHEDULE_REQUESTED: { label: "Reschedule Requested", icon: Clock, bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  RESCHEDULE_ACCEPTED: { label: "Rescheduled", icon: CheckCircle, bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  RESCHEDULE_REJECTED: { label: "Reschedule Rejected", icon: XCircle, bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  CANCELLED_BY_MENTOR: { label: "Cancelled by Mentor", icon: XCircle, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  CANCELLED_BY_MENTEE: { label: "Cancelled", icon: XCircle, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  NO_SHOW_MENTOR: { label: "Mentor No-Show", icon: AlertTriangle, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  NO_SHOW_MENTEE: { label: "No-Show", icon: AlertTriangle, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  REFUND_INITIATED: { label: "Refund Processing", icon: Clock, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  REFUND_COMPLETED: { label: "Refunded", icon: CheckCircle, bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.PAYMENT_PENDING;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[11px] font-bold ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <Icon className="h-3 w-3" /> {cfg.label}
    </span>
  );
}

/* ─── Feedback Modal ────────────────────────────────────────── */
function FeedbackModal({ session, onClose }) {
  if (!session) return null;
  const fb = session.feedback;
  const rv = session.review;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[24px] border-2 border-black bg-white"
        style={{ boxShadow: "8px 8px 0 0 #06B6D4" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black px-6 py-4 bg-[#F8EBE6]">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">Session Feedback</h2>
            <p className="text-xs font-semibold text-gray-500">
              {session.mentorName} • {format(new Date(session.startTime), "MMM d, yyyy")}
            </p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white hover:bg-gray-100 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-5">
          {/* Your Review */}
          {rv ? (
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Your Review</p>
              <div className="rounded-xl border-2 border-black bg-[#FFF7F5] p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < rv.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-gray-200"}`} />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-700">{rv.rating}/5</span>
                </div>
                {rv.review && <p className="text-sm text-gray-600 leading-relaxed">{rv.review}</p>}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 text-center">
              <Star className="mx-auto h-6 w-6 text-gray-300 mb-1" />
              <p className="text-sm font-bold text-gray-400">You haven't reviewed this session yet</p>
            </div>
          )}

          {/* Mentor Feedback */}
          {fb ? (
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Mentor's Feedback</p>
              <div className="space-y-3">
                {fb.strengths && (
                  <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-bold text-emerald-600 mb-1">💪 Strengths</p>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{fb.strengths}</p>
                  </div>
                )}
                {fb.weaknesses && (
                  <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
                    <p className="text-xs font-bold text-amber-600 mb-1">⚡ Areas to Improve</p>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{fb.weaknesses}</p>
                  </div>
                )}
                {fb.recommendations && (
                  <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
                    <p className="text-xs font-bold text-blue-600 mb-1">📋 Recommendations</p>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{fb.recommendations}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 text-center">
              <MessageSquare className="mx-auto h-6 w-6 text-gray-300 mb-1" />
              <p className="text-sm font-bold text-gray-400">No mentor feedback yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Session Card ──────────────────────────────────────────── */
function SessionCard({ session, isUpcoming, onFeedbackClick, onSessionUpdated }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const canCancel = ['PAYMENT_PENDING', 'CONFIRMED'].includes(session.status);
  const canReschedule = ['PAYMENT_PENDING', 'CONFIRMED'].includes(session.status);

  const handleCancel = async () => {
    try {
      setCancelling(true);
      const res = await v2BookingApi.cancelBooking(session.id, {
        cancelledReason: cancelReason || undefined,
      });
      toast.success("Session cancelled successfully");
      if (res.data?.refund?.eligible) {
        toast.info(`Refund of ₹${res.data.refund.amount} (${res.data.refund.percentage}%) will be processed`);
      }
      setShowCancelConfirm(false);
      onSessionUpdated?.();
    } catch (err) {
      toast.error(err.message || "Failed to cancel session");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all">
      {/* Main row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Avatar */}
          <div className="h-14 w-14 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shrink-0">
            {session.mentorPicture ? (
              <img src={resolveUploadUrl(session.mentorPicture)} alt={session.mentorName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-400">
                {session.mentorName?.charAt(0) || "M"}
              </div>
            )}
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-gray-900 text-sm">{session.mentorName}</h4>
              <StatusBadge status={session.status} />
            </div>
            <p className="text-xs font-semibold text-[#7C3AED] mt-0.5">{session.serviceType}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1">
                <CalendarIcon className="h-3.5 w-3.5" />
                {format(new Date(session.startTime), "EEE, MMM d")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {format(new Date(session.startTime), "h:mm a")} • {session.durationMinutes} min
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="h-3.5 w-3.5" />
                ₹{session.price}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          {isUpcoming ? (
            <>
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl border-2 border-black bg-white px-3 py-2 text-xs font-bold shadow-[2px_2px_0px_0px_#1E1E1E] transition-all hover:shadow-[4px_4px_0px_0px_#1E1E1E]"
              >
                <FileText className="h-3.5 w-3.5" />
                Details
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              <button
                disabled={!canJoinSession(session.startTime, session.endTime)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl border-2 border-black px-4 py-2 text-xs font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition-all ${
                  canJoinSession(session.startTime, session.endTime)
                    ? "bg-[#8B5CF6] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1E1E1E] active:translate-y-0 active:shadow-none"
                    : "bg-gray-400 opacity-60 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (canJoinSession(session.startTime, session.endTime) && session.meetingLink) router.push(`/meeting/${session.id}`);
                }}
                title={!canJoinSession(session.startTime, session.endTime) ? joinDisabledReason(session.startTime) : ""}
              >
                <Video className="h-3.5 w-3.5" />
                {canJoinSession(session.startTime, session.endTime) ? "Join Session" : joinDisabledReason(session.startTime)}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl border-2 border-black bg-white px-3 py-2 text-xs font-bold shadow-[2px_2px_0px_0px_#1E1E1E] transition-all hover:shadow-[4px_4px_0px_0px_#1E1E1E]"
              >
                <FileText className="h-3.5 w-3.5" />
                Details
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              {session.status === "COMPLETED" && (
                <button
                  onClick={() => onFeedbackClick(session)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl border-2 border-black bg-[#06B6D4] px-4 py-2 text-xs font-bold text-white shadow-[2px_2px_0px_0px_#1E1E1E] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1E1E1E] active:translate-y-0 active:shadow-none"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  View Feedback
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid gap-3 sm:grid-cols-2">
            {session.discussionTopic && (
              <div className="sm:col-span-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Discussion Topic</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white rounded-lg border border-gray-100 p-3">{session.discussionTopic}</p>
              </div>
            )}
            {session.specificQuestions && (
              <div className="sm:col-span-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Specific Questions</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white rounded-lg border border-gray-100 p-3">{session.specificQuestions}</p>
              </div>
            )}
            {session.notes && (
              <div className="sm:col-span-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Notes</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white rounded-lg border border-gray-100 p-3">{session.notes}</p>
              </div>
            )}
            {(session.menteeEmail || session.menteePhone) && (
              <div className="sm:col-span-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Contact Info Shared</p>
                <div className="flex flex-wrap gap-3">
                  {session.menteeEmail && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white rounded-lg border border-gray-100 px-3 py-2">
                      <Mail className="h-3.5 w-3.5 text-blue-500" /> {session.menteeEmail}
                    </span>
                  )}
                  {session.menteePhone && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white rounded-lg border border-gray-100 px-3 py-2">
                      <Phone className="h-3.5 w-3.5 text-blue-500" /> {session.menteePhone}
                    </span>
                  )}
                </div>
              </div>
            )}
            {session.cancelledReason && (
              <div className="sm:col-span-2">
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-red-600">Cancellation Reason</p>
                    <p className="text-sm text-red-700 mt-0.5">{session.cancelledReason}</p>
                  </div>
                </div>
              </div>
            )}
            {session.payment && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Payment</p>
                <div className="bg-white rounded-lg border border-gray-100 px-3 py-2">
                  <p className="text-sm font-bold text-gray-900">₹{session.payment.amount} <span className="text-xs font-medium text-gray-400">{session.payment.currency}</span></p>
                  <p className={`text-xs font-semibold mt-0.5 ${session.payment.paymentStatus === "SUCCESS" ? "text-emerald-600" : "text-amber-600"}`}>
                    {session.payment.paymentStatus}
                  </p>
                </div>
              </div>
            )}
            {!isUpcoming && session.review && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Rating</p>
                <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-100 px-3 py-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < session.review.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-gray-200"}`} />
                  ))}
                  <span className="ml-1 text-xs font-bold text-gray-600">{session.review.rating}/5</span>
                </div>
              </div>
            )}
            
            {/* Cancel & Reschedule Footer */}
            {isUpcoming && canCancel && (
              <div className="sm:col-span-2 mt-2 border-t border-gray-100 pt-4">
                {showCancelConfirm ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                    <p className="text-sm font-bold text-red-700">Are you sure you want to cancel this session?</p>
                    <p className="text-xs text-red-600">Refund policy: 100% if &gt;24h before, 50% if 12-24h, no refund if &lt;12h</p>
                    <textarea
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Reason for cancellation (optional)"
                      className="w-full rounded-lg border border-red-200 bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-red-300 resize-none"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        disabled={cancelling}
                        className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-50"
                      >
                        {cancelling ? "Cancelling..." : "Yes, Cancel"}
                      </button>
                      <button
                        onClick={() => setShowCancelConfirm(false)}
                        className="flex-1 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
                      >
                        No, Keep It
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    {canReschedule && (
                      <button
                        onClick={() => setShowReschedule(true)}
                        className="flex-1 rounded-xl border border-gray-300 bg-white py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        Reschedule
                      </button>
                    )}
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      className="flex-1 rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors shadow-sm"
                    >
                      Cancel Session
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showReschedule && (
        <RescheduleModal
          session={session}
          onClose={() => setShowReschedule(false)}
          onSuccess={onSessionUpdated}
        />
      )}
    </div>
  );
}

/* ─── Empty State ───────────────────────────────────────────── */
function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-3 rounded-full bg-gray-100 p-3">
        <Icon className="h-6 w-6 text-gray-400" />
      </div>
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function MenteeSessionsPage() {
  const [sessionsData, setSessionsData] = useState({ upcoming: [], past: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackSession, setFeedbackSession] = useState(null);

  const fetchSessions = async (hideLoading = false) => {
    try {
      if (!hideLoading) setIsLoading(true);
      const res = await menteeBookingApi.getMySessions();
      setSessionsData(res.data);
    } catch (err) {
      if (!hideLoading) setError(err?.message || "Failed to load sessions");
    } finally {
      if (!hideLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl p-10">
        <div className="mb-8 animate-pulse">
          <div className="h-8 w-40 rounded-lg bg-gray-200 mb-2" />
          <div className="h-4 w-72 rounded bg-gray-200" />
        </div>
        <div className="grid gap-8">
          {[{ shadow: "#8B5CF6", rows: 2 }, { shadow: "#06B6D4", rows: 2 }].map((sec, si) => (
            <div key={si} className="animate-pulse rounded-2xl border-2 border-gray-200 bg-white" style={{ boxShadow: `8px 8px 0px 0px #E5E7EB` }}>
              <div className="flex items-center gap-3 border-b-2 border-gray-200 px-5 py-4 rounded-t-[14px]">
                <div className="h-5 w-5 rounded bg-gray-200" />
                <div className="h-5 w-40 rounded bg-gray-200" />
              </div>
              <div className="p-6 space-y-4">
                {Array.from({ length: sec.rows }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl bg-gray-200 shrink-0" />
                      <div>
                        <div className="h-4 w-32 rounded bg-gray-200 mb-2" />
                        <div className="h-3 w-24 rounded bg-gray-200 mb-2" />
                        <div className="flex gap-3">
                          <div className="h-3 w-20 rounded bg-gray-200" />
                          <div className="h-3 w-28 rounded bg-gray-200" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-9 w-20 rounded-xl bg-gray-200" />
                      <div className="h-9 w-24 rounded-xl bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="font-bold text-red-500">{error}</p>
      </div>
    );
  }

  const { upcoming, past } = sessionsData;

  return (
    <div className="mx-auto w-full max-w-7xl p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Sessions</h1>
        <p className="mt-1 text-sm font-medium text-gray-500">Manage your upcoming and past mentoring sessions</p>
      </div>

      <div className="grid gap-8">
        {/* Upcoming */}
        <div className="relative rounded-2xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_#8B5CF6]">
          <div className="flex items-center justify-between border-b-2 border-black bg-[#F8EBE6] px-5 py-4 rounded-t-[14px]">
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-gray-900" />
              <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
            </div>
            {upcoming.length > 0 && (
              <span className="rounded-full bg-[#8B5CF6] px-2.5 py-0.5 text-xs font-bold text-white">{upcoming.length}</span>
            )}
          </div>
          <div className="p-5">
            {upcoming.length > 0 ? (
              <div className="space-y-3">
                {upcoming.map((s) => (
                  <SessionCard 
                    key={s.id} 
                    session={s} 
                    isUpcoming={true} 
                    onFeedbackClick={setFeedbackSession}
                    onSessionUpdated={() => fetchSessions(true)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState icon={Video} title="No upcoming sessions" subtitle="Book a session with a mentor to get started." />
            )}
          </div>
        </div>

        {/* Past */}
        <div className="relative rounded-2xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_#06B6D4]">
          <div className="flex items-center justify-between border-b-2 border-black bg-[#F8EBE6] px-5 py-4 rounded-t-[14px]">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-900" />
              <h3 className="text-lg font-bold text-gray-900">Past Sessions</h3>
            </div>
            {past.length > 0 && (
              <span className="rounded-full bg-[#06B6D4] px-2.5 py-0.5 text-xs font-bold text-white">{past.length}</span>
            )}
          </div>
          <div className="p-5">
            {past.length > 0 ? (
              <div className="space-y-3">
                {past.map((s) => (
                  <SessionCard 
                    key={s.id} 
                    session={s} 
                    isUpcoming={false} 
                    onFeedbackClick={setFeedbackSession}
                    onSessionUpdated={() => fetchSessions(true)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState icon={Clock} title="No past sessions" subtitle="Your completed sessions will appear here." />
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {feedbackSession && (
        <FeedbackModal session={feedbackSession} onClose={() => setFeedbackSession(null)} />
      )}
    </div>
  );
}
