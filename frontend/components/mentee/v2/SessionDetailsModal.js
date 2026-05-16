import { X, Calendar as CalendarIcon, Clock, Video, Mail, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { resolveUploadUrl } from "../../../lib/api";
import { canJoinSession, joinDisabledReason } from "../../../lib/sessionUtils";

export default function SessionDetailsModal({ session, onClose }) {
  const router = useRouter();
  if (!session) return null;

  const dateStr = format(new Date(session.startTime), "EEE, MMM d");
  const timeStr = format(new Date(session.startTime), "h:mm a");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-[24px] border-4 border-black bg-white"
        style={{ boxShadow: "8px 8px 0 0 #5061E4" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-[3px] border-black p-5">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">Session Details</h2>
            <p className="text-xs font-semibold text-gray-500">Review your booking information</p>
          </div>
          <button 
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 space-y-6">
          {/* Profile Card */}
          <div className="flex items-center justify-between rounded-xl border-2 border-black bg-[#FAF5FF] p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-lg border-2 border-black bg-white">
                {session.mentorPicture ? (
                  <img src={resolveUploadUrl(session.mentorPicture)} alt={session.mentorName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-black text-[#5061E4]">
                    {session.mentorName?.charAt(0) || "M"}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900">{session.mentorName}</h3>
                <p className="text-xs font-semibold text-gray-500">{session.serviceName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-[#7C3AED]">₹{session.price}</p>
              <p className="text-xs font-semibold text-gray-500">{session.durationMinutes} min</p>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Schedule</p>
            <div className="flex gap-3">
              <div className="flex-1 rounded-xl border-2 border-black bg-[#FFF7F5] p-3">
                <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <CalendarIcon size={14} className="text-[#F59E0B]" /> Date
                </div>
                <p className="font-extrabold text-gray-900">{dateStr}</p>
              </div>
              <div className="flex-1 rounded-xl border-2 border-black bg-[#FFF7F5] p-3">
                <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-gray-500">
                  <Clock size={14} className="text-[#3B82F6]" /> Time
                </div>
                <p className="font-extrabold text-gray-900">{timeStr}</p>
              </div>
            </div>
          </div>

          {/* Discussion Topic */}
          {session.discussionTopic && (
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">What you want to discuss</p>
              <div className="rounded-xl border-2 border-black bg-[#FFF7F5] p-4">
                <p className="text-sm font-medium text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {session.discussionTopic}
                </p>
              </div>
            </div>
          )}

          {/* Specific Questions */}
          {session.specificQuestions && (
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Specific Questions</p>
              <div className="rounded-xl border-2 border-black bg-[#FFF7F5] p-4">
                <p className="text-sm font-medium text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {session.specificQuestions}
                </p>
              </div>
            </div>
          )}

          {/* Previous Session Feedback (Visual parity with design) */}
          <div className="rounded-xl border-2 border-[#A78BFA] bg-[#EEF2FF] p-4 flex gap-3">
            <CheckCircle className="text-[#6366F1] mt-0.5 shrink-0" size={16} />
            <div>
              <p className="text-sm font-extrabold text-[#3730A3]">Previous Session Feedback Requested</p>
              <p className="text-xs font-medium text-[#4338CA] mt-0.5">You asked the mentor to review previous session notes before this meeting</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Contact Information</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-xl border-2 border-black bg-white p-3">
                <Mail size={16} className="text-[#3B82F6]" />
                <p className="text-sm font-bold text-gray-700">{session.menteeEmail || "N/A"}</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border-2 border-black bg-white p-3">
                <Phone size={16} className="text-[#3B82F6]" />
                <p className="text-sm font-bold text-gray-700">{session.menteePhone || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Meeting Link */}
          {session.meetingLink && (
            canJoinSession(session.startTime, session.endTime) ? (
              <button 
                onClick={() => router.push(`/meeting/${session.id}`)}
                className="w-full flex items-center justify-between rounded-xl border-2 border-black bg-[#22C55E] p-4 transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center gap-3 text-white">
                  <Video size={20} />
                  <div>
                    <p className="font-extrabold text-white">Join Meeting</p>
                    <p className="text-xs font-semibold text-green-100">Click to open meeting room</p>
                  </div>
                </div>
                <ArrowRight size={20} className="text-white" />
              </button>
            ) : (
              <div className="flex items-center justify-between rounded-xl border-2 border-gray-300 bg-gray-100 p-4 opacity-60">
                <div className="flex items-center gap-3 text-gray-500">
                  <Video size={20} />
                  <div>
                    <p className="font-extrabold text-gray-500">Meeting Link</p>
                    <p className="text-xs font-semibold text-gray-400">{joinDisabledReason(session.startTime)}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer actions */}
        <div className="flex gap-3 border-t-[3px] border-black bg-gray-50 p-5">
          <button 
            className="flex-1 rounded-xl border-2 border-black bg-[#3B82F6] py-3 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5"
            onClick={() => alert("Reschedule coming soon")}
            style={{ boxShadow: "2px 2px 0 0 #000" }}
          >
            Reschedule Session
          </button>
          <button 
            className="flex-1 rounded-xl border-2 border-black bg-white py-3 text-sm font-extrabold text-[#EF4444] transition-transform hover:-translate-y-0.5 hover:bg-red-50"
            onClick={() => alert("Cancel coming soon")}
            style={{ boxShadow: "2px 2px 0 0 #000" }}
          >
            Cancel Session
          </button>
        </div>
      </div>
    </div>
  );
}

// Quick fallback for ArrowRight missing above
function ArrowRight({ className, size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
