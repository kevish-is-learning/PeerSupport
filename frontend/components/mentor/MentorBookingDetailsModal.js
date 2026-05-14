import { X, Calendar as CalendarIcon, Clock, Mail, Phone } from "lucide-react";
import { format } from "date-fns";

export default function MentorBookingDetailsModal({ session, mentee, onClose }) {
  if (!session) return null;

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

        </div>
      </div>
    </div>
  );
}
