import { useState } from "react";
import { X, Calendar as CalendarIcon, Clock, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { v2BookingApi } from "../../lib/api";
import RescheduleModal from "../shared/RescheduleModal";

export default function MentorBookingDetailsModal({ session, mentee, onClose, onSessionUpdated }) {
  if (!session) return null;

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const canCancel = ["PAYMENT_PENDING", "CONFIRMED"].includes(session.status);
  const canReschedule = ["PAYMENT_PENDING", "CONFIRMED"].includes(session.status);

  const handleCancel = async () => {
    try {
      setCancelling(true);
      await v2BookingApi.cancelBooking(session.id, {
        cancelledReason: cancelReason || undefined,
      });
      toast.success("Session cancelled successfully. Mentee will be refunded.");
      onSessionUpdated?.();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to cancel session");
    } finally {
      setCancelling(false);
    }
  };

  const dateStr = format(new Date(session.startTime), "yyyy-MM-dd");
  const timeStr = format(new Date(session.startTime), "h:mm a");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-[24px] bg-white border-2 border-black shadow-[8px_8px_0_0_#5763E6]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <h2 className="text-2xl font-extrabold text-gray-900">Booking Details</h2>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black bg-white hover:bg-gray-100 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-6 pt-4 space-y-6">
          {/* Top Info Box */}
          <div className="rounded-xl border border-[#8B5CF6] bg-[#E0E7FF] p-4 text-sm font-medium">
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Mentee:</span>
              <span className="font-bold text-gray-900">{mentee?.name || session.menteeName || "Unknown Mentee"}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Session Type:</span>
              <span className="font-bold text-gray-900">1:1</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Duration:</span>
              <span className="font-bold text-gray-900">{session.durationMinutes || 60} minutes</span>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-3 text-sm font-extrabold text-gray-800">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#FDF5F3] p-4">
                <Mail size={18} className="text-[#5061E4]" />
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-500">Email</p>
                  <p className="text-sm font-bold text-gray-900">{mentee?.email || session.menteeEmail || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div>
            <h3 className="mb-3 text-sm font-extrabold text-gray-800">Session Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#FFF5F3] p-4">
                <CalendarIcon size={18} className="text-[#5061E4]" />
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-500">Date & Time</p>
                  <p className="text-sm font-bold text-gray-900">{dateStr} at {timeStr}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#FFF5F3] p-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-500">Topic</p>
                  <p className="text-sm font-bold text-gray-900">{session.serviceName || "Not available"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* What Mentee Wants to Discuss */}
          {session.purposeOfCall && (
            <div>
              <h3 className="mb-3 text-sm font-extrabold text-gray-800">What Mentee Wants to Discuss</h3>
              <div className="rounded-xl border border-[#E5E7EB] bg-[#FFF1EB] p-4">
                <p className="text-sm font-medium text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {session.purposeOfCall}
                </p>
              </div>
            </div>
          )}

          {/* Cancel Confirmation */}
          {showCancelConfirm && (
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5 space-y-3 mt-4 animate-in fade-in zoom-in-95 duration-200">
              <p className="text-sm font-bold text-red-700">Are you sure you want to cancel this session?</p>
              <p className="text-xs text-red-600">The mentee will receive a full 100% refund. This action cannot be undone.</p>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason for cancellation (optional)"
                className="w-full rounded-lg border border-red-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-red-300 resize-none"
                rows={2}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  {cancelling ? "Cancelling..." : "Yes, Cancel Session"}
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 rounded-xl border border-gray-300 bg-white py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  No, Keep It
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {canCancel && !showCancelConfirm && (
          <div className="flex gap-3 border-t-2 border-black bg-gray-50 p-6">
            {canReschedule && (
              <button
                onClick={() => setShowReschedule(true)}
                className="flex-1 rounded-xl border-2 border-black bg-white py-3 text-sm font-extrabold text-gray-700 hover:bg-gray-100 transition-transform hover:-translate-y-0.5 cursor-pointer"
                style={{ boxShadow: "2px 2px 0 0 #000" }}
              >
                Reschedule Session
              </button>
            )}
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="flex-1 rounded-xl border-2 border-black bg-[#EF4444] py-3 text-sm font-extrabold text-white hover:bg-red-600 transition-transform hover:-translate-y-0.5 cursor-pointer"
              style={{ boxShadow: "2px 2px 0 0 #000" }}
            >
              Cancel Session
            </button>
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {showReschedule && (
        <RescheduleModal
          session={session}
          onClose={() => setShowReschedule(false)}
          onSuccess={() => {
            onSessionUpdated?.();
            onClose();
          }}
        />
      )}
    </div>
  );
}
