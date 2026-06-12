"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { adminApi } from "../../lib/api";

const STATUS_COLORS = {
  SCHEDULED: "border-blue-900/50 bg-blue-950/20 text-blue-400",
  COMPLETED: "border-emerald-900/50 bg-emerald-950/20 text-emerald-400",
  CANCELLED: "border-zinc-800 bg-zinc-900/50 text-zinc-400",
  NO_SHOW: "border-red-900/50 bg-red-950/20 text-red-400",
  RESCHEDULED: "border-orange-900/50 bg-orange-950/20 text-orange-400",
};

const formatDate = (v) => {
  if (!v) return "-";
  try {
    return new Date(v).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return v;
  }
};

export default function MentorVerificationCall({ mentorProfileId }) {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(15);
  const [notes, setNotes] = useState("");

  const loadCalls = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getVerificationCallsForMentor(mentorProfileId);
      setCalls(res.data);
    } catch (err) {
      toast.error("Failed to load verification calls");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalls();
  }, [mentorProfileId]);

  const activeCall = calls.find((c) => c.status === "SCHEDULED");

  const openSchedule = () => {
    setDate("");
    setTime("");
    setDuration(15);
    setNotes("");
    setShowScheduleModal(true);
  };

  const openReschedule = (call) => {
    if (!call) return;
    const start = new Date(call.startsAt);
    setDate(start.toISOString().split("T")[0]);
    setTime(start.toTimeString().substring(0, 5));
    const end = new Date(call.endsAt);
    const durationMins = Math.round((end - start) / 60000);
    setDuration(durationMins);
    setNotes(call.notes || "");
    setSelectedCallId(call.id);
    setShowRescheduleModal(true);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) return toast.error("Date and time are required");
    
    const startsAt = new Date(`${date}T${time}:00`).toISOString();
    
    setIsSubmitting(true);
    try {
      await adminApi.scheduleVerificationCall({
        mentorProfileId,
        startsAt,
        durationMinutes: parseInt(duration),
        notes,
      });
      toast.success("Verification call scheduled");
      setShowScheduleModal(false);
      loadCalls();
    } catch (err) {
      toast.error(err.message || "Failed to schedule call");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) return toast.error("Date and time are required");
    
    const startsAt = new Date(`${date}T${time}:00`).toISOString();
    
    setIsSubmitting(true);
    try {
      await adminApi.rescheduleVerificationCall(selectedCallId, {
        startsAt,
        durationMinutes: parseInt(duration),
        notes,
      });
      toast.success("Verification call rescheduled");
      setShowRescheduleModal(false);
      loadCalls();
    } catch (err) {
      toast.error(err.message || "Failed to reschedule call");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusAction = async (callId, action) => {
    try {
      if (action === 'complete') await adminApi.completeVerificationCall(callId);
      if (action === 'cancel') await adminApi.cancelVerificationCall(callId);
      if (action === 'no-show') await adminApi.markVerificationNoShow(callId);
      
      toast.success(`Call marked as ${action}`);
      loadCalls();
    } catch (err) {
      toast.error(err.message || `Failed to ${action} call`);
    }
  };

  if (loading) {
    return <div className="text-xs text-zinc-500 animate-pulse">Loading calls...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Active Call Section */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Verification Call</h4>
        {!activeCall && (
          <button
            onClick={openSchedule}
            className="rounded-md bg-white px-3 py-1.5 text-[10px] font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            Schedule Call
          </button>
        )}
      </div>

      {activeCall ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-block rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${STATUS_COLORS[activeCall.status]}`}>
                  {activeCall.status}
                </span>
                <span className="text-xs text-white font-medium">{formatDate(activeCall.startsAt)}</span>
              </div>
              <p className="text-xs text-zinc-400">Scheduled by: {activeCall.scheduledBy?.name}</p>
            </div>
            {activeCall.meetingLink && (
              <a 
                href={activeCall.meetingLink} 
                target="_blank" 
                rel="noreferrer"
                className="rounded-md border border-blue-900/50 bg-blue-950/30 px-3 py-1.5 text-[10px] font-medium text-blue-400 hover:bg-blue-900/50 transition-colors"
              >
                Join Google Meet
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800">
            <button
              onClick={() => handleStatusAction(activeCall.id, 'complete')}
              className="rounded-md border border-emerald-900/50 px-3 py-1 text-[10px] text-emerald-400 hover:bg-emerald-950/30 transition-colors"
            >
              Mark Completed
            </button>
            <button
              onClick={() => handleStatusAction(activeCall.id, 'no-show')}
              className="rounded-md border border-orange-900/50 px-3 py-1 text-[10px] text-orange-400 hover:bg-orange-950/30 transition-colors"
            >
              Mark No-Show
            </button>
            <button
              onClick={() => openReschedule(activeCall)}
              className="rounded-md border border-blue-900/50 px-3 py-1 text-[10px] text-blue-400 hover:bg-blue-950/30 transition-colors"
            >
              Reschedule
            </button>
            <button
              onClick={() => handleStatusAction(activeCall.id, 'cancel')}
              className="rounded-md border border-red-900/50 px-3 py-1 text-[10px] text-red-400 hover:bg-red-950/30 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        calls.length > 0 ? (
          <p className="text-xs text-zinc-500">No active scheduled calls.</p>
        ) : (
          <p className="text-xs text-zinc-500">Never scheduled.</p>
        )
      )}

      {/* Call History */}
      {calls.length > 0 && (
        <div className="mt-6">
          <h5 className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-2">History</h5>
          <div className="space-y-2">
            {calls.map(call => (
              <div key={call.id} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                <div>
                  <span className={`inline-block mr-2 rounded border px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${STATUS_COLORS[call.status]}`}>
                    {call.status}
                  </span>
                  <span className="text-xs text-zinc-300">{formatDate(call.startsAt)}</span>
                </div>
                {call.meetingLink && (
                  <a href={call.meetingLink} target="_blank" rel="noreferrer" className="text-[10px] text-zinc-500 hover:text-white transition-colors">
                    Link
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule / Reschedule Modal */}
      {(showScheduleModal || showRescheduleModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-6 shadow-2xl">
            <h3 className="text-lg font-medium text-white mb-4">
              {showScheduleModal ? "Schedule Verification Call" : "Reschedule Call"}
            </h3>
            
            <form onSubmit={showScheduleModal ? handleScheduleSubmit : handleRescheduleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-2 text-sm text-white outline-none focus:border-zinc-600 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Time</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-2 text-sm text-white outline-none focus:border-zinc-600 transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Duration (mins)</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-2 text-sm text-white outline-none focus:border-zinc-600 transition-colors appearance-none"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes for the meeting invite..."
                  rows={3}
                  className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600 transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowScheduleModal(false); setShowRescheduleModal(false); }}
                  className="flex-1 rounded-xl border border-zinc-800 bg-black py-2.5 text-sm font-medium text-white hover:bg-zinc-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-white py-2.5 text-sm font-medium text-black hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
