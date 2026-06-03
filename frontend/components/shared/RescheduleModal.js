"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { v2Api } from "../../lib/api";
import { format, addDays } from "date-fns";
import { toast } from "sonner";

/**
 * Shared Reschedule Modal — used by both mentee and mentor flows.
 *
 * Props:
 *  - session: { id, mentorProfileId, mentorServiceId, startTime, endTime, ... }
 *  - onClose: () => void
 *  - onSuccess: () => void  — called after successful reschedule
 */
export default function RescheduleModal({ session, onClose, onSuccess }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [rescheduling, setRescheduling] = useState(false);
  const [error, setError] = useState("");

  // Generate next 14 days for date picker
  const dateOptions = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      dates.push(addDays(today, i));
    }
    return dates;
  }, []);

  // Fetch slots when date changes
  const fetchSlots = useCallback(
    async (date) => {
      if (!date) return;
      try {
        setLoadingSlots(true);
        setSelectedSlot(null);
        setError("");
        const dateStr = format(date, "yyyy-MM-dd");
        const res = await v2Api.getSlots(session.mentorProfileId, {
          serviceId: session.mentorServiceId,
          date: dateStr,
        });
        setSlots(res.data?.slots || []);
      } catch (err) {
        console.error("Failed to fetch slots:", err);
        setSlots([]);
        setError(err.message || "Failed to load available slots");
      } finally {
        setLoadingSlots(false);
      }
    },
    [session.mentorProfileId, session.mentorServiceId]
  );

  useEffect(() => {
    if (selectedDate) {
      fetchSlots(selectedDate);
    }
  }, [selectedDate, fetchSlots]);

  const handleReschedule = async () => {
    if (!selectedSlot) return;

    try {
      setRescheduling(true);
      setError("");
      await v2Api.rescheduleBooking(session.id, {
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      });
      toast.success("Session rescheduled successfully!");
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to reschedule session");
      toast.error(err.message || "Failed to reschedule");
    } finally {
      setRescheduling(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[24px] border-[3px] border-black bg-white"
        style={{ boxShadow: "8px 8px 0 0 #5061E4" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-[3px] border-black bg-[#F8EBE6] p-5">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              Reschedule Session
            </h2>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">
              Pick a new date and time slot
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-5 space-y-5">
          {/* Current session info */}
          <div className="rounded-xl border-2 border-black bg-[#FFF7F5] p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
              Current Schedule
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <CalendarIcon size={14} className="text-[#F59E0B]" />
                {format(new Date(session.startTime), "EEE, MMM d, yyyy")}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <Clock size={14} className="text-[#3B82F6]" />
                {format(new Date(session.startTime), "h:mm a")}
              </div>
            </div>
          </div>

          {/* Date Picker — horizontal scroll */}
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
              Select New Date
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
              {dateOptions.map((date) => {
                const isSelected =
                  selectedDate &&
                  format(date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd");
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`flex flex-col items-center rounded-xl border-2 border-black px-4 py-3 min-w-[72px] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#5061E4] text-white shadow-[3px_3px_0_0_#000]"
                        : "bg-white text-gray-700 hover:bg-gray-50 shadow-[2px_2px_0_0_#E5E7EB]"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase">
                      {format(date, "EEE")}
                    </span>
                    <span className="text-lg font-extrabold leading-tight">
                      {format(date, "d")}
                    </span>
                    <span className="text-[10px] font-semibold">
                      {format(date, "MMM")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Available Slots */}
          {selectedDate && (
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Available Slots — {format(selectedDate, "EEE, MMM d")}
              </p>

              {loadingSlots ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2
                    className="h-6 w-6 animate-spin text-[#5061E4]"
                  />
                  <span className="ml-2 text-sm font-semibold text-gray-500">
                    Loading slots...
                  </span>
                </div>
              ) : slots.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                  <CalendarIcon className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-sm font-bold text-gray-400">
                    No available slots on this date
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try a different date
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot, idx) => {
                    const isSelected =
                      selectedSlot?.startTime === slot.startTime;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-xl border-2 border-black px-3 py-2.5 text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#22C55E] text-white shadow-[3px_3px_0_0_#000]"
                            : "bg-white text-gray-700 hover:bg-[#F0FDF4] shadow-[2px_2px_0_0_#E5E7EB]"
                        }`}
                      >
                        <span className="text-sm font-bold">
                          {format(new Date(slot.startTime), "h:mm a")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border-2 border-[#EF4444] bg-[#FEE2E2] px-4 py-3">
              <AlertCircle size={16} className="text-[#EF4444] shrink-0" />
              <p className="text-xs font-bold text-[#991B1B]">{error}</p>
            </div>
          )}

          {/* Selected slot summary */}
          {selectedSlot && (
            <div className="flex items-center gap-2 rounded-xl border-2 border-[#22C55E] bg-[#DCFCE7] px-4 py-3">
              <CheckCircle size={16} className="text-[#22C55E] shrink-0" />
              <p className="text-xs font-bold text-[#166534]">
                New time:{" "}
                {format(new Date(selectedSlot.startTime), "EEE, MMM d")} at{" "}
                {format(new Date(selectedSlot.startTime), "h:mm a")} –{" "}
                {format(new Date(selectedSlot.endTime), "h:mm a")}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t-[3px] border-black bg-gray-50 p-5">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-black bg-white py-3 text-sm font-extrabold text-gray-700 transition-transform hover:-translate-y-0.5 cursor-pointer"
            style={{ boxShadow: "2px 2px 0 0 #000" }}
          >
            Cancel
          </button>
          <button
            onClick={handleReschedule}
            disabled={!selectedSlot || rescheduling}
            className={`flex-1 rounded-xl border-2 border-black py-3 text-sm font-extrabold text-white transition-transform cursor-pointer ${
              !selectedSlot || rescheduling
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-[#5061E4] hover:-translate-y-0.5"
            }`}
            style={{ boxShadow: "2px 2px 0 0 #000" }}
          >
            {rescheduling ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Rescheduling...
              </span>
            ) : (
              "Confirm Reschedule"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
