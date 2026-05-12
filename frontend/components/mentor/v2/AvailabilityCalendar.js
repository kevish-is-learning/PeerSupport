"use client";

import { useState, useEffect } from "react";
import { v2Api } from "../../../lib/api";
import { toast } from "sonner";
import {
  Loader2, Plus, Trash2, Save, X, ChevronLeft, ChevronRight,
} from "lucide-react";

function formatLocalDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isPastDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return target < today;
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function generateCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay();
  const days = [];

  for (let i = 0; i < startPad; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

export default function AvailabilityCalendar() {
  const [windows, setWindows] = useState([]);
  const [mentorServices, setMentorServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Calendar state
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  // Modal form state
  const [formWindows, setFormWindows] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [availRes, svcRes] = await Promise.all([
        v2Api.getAvailability(),
        v2Api.getMentorServices(),
      ]);
      setWindows(availRes?.data?.windows || []);
      setMentorServices(svcRes?.data?.services || []);
    } catch (e) {
      toast.error("Failed to load availability");
    } finally {
      setLoading(false);
    }
  };

  // Which dates have windows
  const activeDates = new Set(windows.map((w) => w.specificDate).filter(Boolean));

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
  };

  const calDays = generateCalendarDays(calYear, calMonth);
  const monthLabel = new Date(calYear, calMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const openModal = (date) => {
    if (isPastDate(date)) {
      toast.error("You can't set availability in the past");
      return;
    }

    const dateStr = formatLocalDate(date);
    setSelectedDate(dateStr);
    // Load existing windows for this date
    const existing = windows.filter((w) => w.specificDate === dateStr);
    if (existing.length > 0) {
      setFormWindows(
        existing.map((w) => ({
          startTime: w.startTime,
          endTime: w.endTime,
          mentorServiceIds: w.services?.map((s) => s.mentorServiceId) || [],
        }))
      );
    } else {
      setFormWindows([{ startTime: "09:00", endTime: "17:00", mentorServiceIds: [] }]);
    }
    setModalOpen(true);
  };

  const addWindowRow = () => {
    setFormWindows((prev) => [...prev, { startTime: "09:00", endTime: "17:00", mentorServiceIds: [] }]);
  };

  const removeWindowRow = (idx) => {
    setFormWindows((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateWindowRow = (idx, field, value) => {
    setFormWindows((prev) => prev.map((w, i) => (i === idx ? { ...w, [field]: value } : w)));
  };

  const toggleService = (idx, msId) => {
    setFormWindows((prev) =>
      prev.map((w, i) => {
        if (i !== idx) return w;
        const has = w.mentorServiceIds.includes(msId);
        return {
          ...w,
          mentorServiceIds: has
            ? w.mentorServiceIds.filter((id) => id !== msId)
            : [...w.mentorServiceIds, msId],
        };
      })
    );
  };

  const handleSave = async () => {
    // Validate
    for (const fw of formWindows) {
      if (fw.mentorServiceIds.length === 0) {
        toast.error("Each window must have at least one service selected");
        return;
      }
    }

    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    setSaving(true);
    try {
      const res = await v2Api.replaceAvailabilityForDate(
        selectedDate,
        formWindows.map((fw) => ({
          startTime: fw.startTime,
          endTime: fw.endTime,
          mentorServiceIds: fw.mentorServiceIds,
        }))
      );

      const updatedWindows = res?.data?.windows || [];
      setWindows((prev) => [
        ...prev.filter((w) => w.specificDate !== selectedDate),
        ...updatedWindows,
      ]);
      toast.success(`${formatDisplayDate(selectedDate)} availability saved`);
      setModalOpen(false);
    } catch (e) {
      if (e.status === 409) {
        toast.error(e.message || "Conflicting bookings exist");
      } else {
        toast.error(e.message || "Failed to save availability");
      }
      // Refresh to keep state consistent after partial failures
      loadData();
    } finally {
      setSaving(false);
    }
  };

  const removeDay = async () => {
    setSaving(true);
    try {
      if (!selectedDate) {
        toast.error("Please select a date");
        return;
      }

      const windowsForDate = windows.filter((w) => w.specificDate === selectedDate);
      if (windowsForDate.length === 0) {
        toast.error("No availability windows found for this date");
        return;
      }

      await Promise.all(
        windowsForDate.map((w) => v2Api.deleteAvailabilityWindow(w.id))
      );

      setWindows((prev) => prev.filter((w) => w.specificDate !== selectedDate));
      toast.success(`${formatDisplayDate(selectedDate)} availability removed`);
      setModalOpen(false);
    } catch (e) {
      if (e.status === 409) {
        toast.error(e.message || "Conflicting bookings exist");
      } else {
        toast.error(e.message || "Failed to remove availability");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-[#5061E4]" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#111]">Availability</h2>
        <p className="mt-1 text-sm font-medium text-gray-500">
          Click a date to set your availability windows
        </p>
      </div>

      {/* Calendar */}
      <div
        className="rounded-xl border-[3px] border-black bg-white p-6"
        style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
      >
        {/* Month nav */}
        <div className="mb-4 flex items-center justify-between">
          <button onClick={prevMonth} className="rounded-lg border-2 border-black p-2 hover:bg-gray-100">
            <ChevronLeft size={18} />
          </button>
          <h3 className="text-lg font-extrabold">{monthLabel}</h3>
          <button onClick={nextMonth} className="rounded-lg border-2 border-black p-2 hover:bg-gray-100">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-xs font-bold uppercase tracking-wide text-gray-400 py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calDays.map((date, idx) => {
            if (!date) {
              return <div key={`pad-${idx}`} className="h-12" />;
            }

            const dateStr = formatLocalDate(date);
            const hasAvailability = activeDates.has(dateStr);
            const isPast = isPastDate(date);
            const isToday =
              date.getDate() === now.getDate() &&
              date.getMonth() === now.getMonth() &&
              date.getFullYear() === now.getFullYear();

            return (
              <button
                key={dateStr}
                onClick={() => openModal(date)}
                className={`relative flex h-12 items-center justify-center rounded-lg border-2 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                  hasAvailability
                    ? "border-[#5061E4] bg-[#EEF0FF] text-[#5061E4] hover:bg-[#DDE1FF]"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                } ${isToday ? "ring-2 ring-[#F59E0B] ring-offset-1" : ""} ${isPast ? "opacity-40" : ""}`}
                disabled={isPast}
              >
                {date.getDate()}
                {hasAvailability && (
                  <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-[#5061E4]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className="w-full max-w-lg rounded-2xl border-[3px] border-black bg-white p-6"
            style={{ boxShadow: "8px 8px 0 0 #5061E4" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-extrabold">
                {formatDisplayDate(selectedDate)} Availability
              </h3>
              <button onClick={() => setModalOpen(false)} className="rounded-lg border-2 border-black p-1.5 hover:bg-gray-100">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
              {formWindows.map((fw, idx) => (
                <div key={idx} className="rounded-lg border-2 border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      Window {idx + 1}
                    </span>
                    {formWindows.length > 1 && (
                      <button
                        onClick={() => removeWindowRow(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-500">Start</label>
                      <input
                        type="time"
                        value={fw.startTime}
                        onChange={(e) => updateWindowRow(idx, "startTime", e.target.value)}
                        className="w-full rounded-lg border-2 border-black px-3 py-2 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-gray-500">End</label>
                      <input
                        type="time"
                        value={fw.endTime}
                        onChange={(e) => updateWindowRow(idx, "endTime", e.target.value)}
                        className="w-full rounded-lg border-2 border-black px-3 py-2 text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-gray-500">Services Offered</label>
                    <div className="flex flex-wrap gap-2">
                      {mentorServices.filter((ms) => ms.isActive).map((ms) => {
                        const isSelected = fw.mentorServiceIds.includes(ms.id);
                        return (
                          <button
                            key={ms.id}
                            onClick={() => toggleService(idx, ms.id)}
                            className={`rounded-lg border-2 px-3 py-1.5 text-xs font-bold transition-colors ${
                              isSelected
                                ? "border-[#5061E4] bg-[#5061E4] text-white"
                                : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                            }`}
                          >
                            {ms.serviceName}
                          </button>
                        );
                      })}
                    </div>
                    {mentorServices.filter((ms) => ms.isActive).length === 0 && (
                      <p className="text-xs text-red-500 font-medium mt-1">
                        No active services. Configure services first.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addWindowRow}
              className="mt-3 flex items-center gap-2 text-sm font-bold text-[#5061E4] hover:underline"
            >
              <Plus size={14} /> Add another window
            </button>

            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={removeDay}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl border-2 border-red-300 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} /> Remove Date
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-6 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                style={{ boxShadow: "4px 4px 0 0 #000" }}
              >
                {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
