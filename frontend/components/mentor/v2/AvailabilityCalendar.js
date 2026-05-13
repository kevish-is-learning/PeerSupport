"use client";

import { useState, useEffect, useCallback } from "react";
import { v2Api, mentorServiceApi } from "../../../lib/api";
import { toast } from "sonner";
import {
  Loader2, Plus, Trash2, X, ChevronLeft, ChevronRight, Copy,
} from "lucide-react";

/* ── helpers ────────────────────────────────────────────────────── */

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

function isToday(date) {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
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

/** Generate time options in 30-min increments from 06:00 to 23:30 */
function generateTimeOptions() {
  const options = [];
  for (let h = 6; h < 24; h++) {
    for (const m of [0, 30]) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      const val = `${hh}:${mm}`;
      const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      const label = `${String(hour12).padStart(2, "0")}:${mm} ${ampm}`;
      options.push({ value: val, label });
    }
  }
  return options;
}

const TIME_OPTIONS = generateTimeOptions();

/* ── main component ─────────────────────────────────────────────── */

export default function AvailabilityCalendar() {
  const [windows, setWindows] = useState([]);
  const [mentorServices, setMentorServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  const [formWindows, setFormWindows] = useState([]);

  // Drag-to-copy state
  const [dragSourceDate, setDragSourceDate] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);
  const [copyModal, setCopyModal] = useState({ open: false, from: null, to: null });
  const [copying, setCopying] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [availRes, svcRes] = await Promise.all([
        v2Api.getAvailability(),
        mentorServiceApi.getMine(),
      ]);
      setWindows(availRes?.data?.windows || []);
      setMentorServices(svcRes?.data?.services || []);
    } catch {
      toast.error("Failed to load availability");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  /* ── calendar helpers ────────────────────────────────────────── */

  // Build a map: dateStr -> count of windows
  const dateSlotCounts = {};
  for (const w of windows) {
    if (w.specificDate) {
      dateSlotCounts[w.specificDate] = (dateSlotCounts[w.specificDate] || 0) + 1;
    }
  }

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
  };

  const calDays = generateCalendarDays(calYear, calMonth);
  const monthLabel = new Date(calYear, calMonth).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  /* ── modal logic ─────────────────────────────────────────────── */

  const openModal = (date) => {
    if (isPastDate(date)) {
      toast.error("You can't set availability in the past");
      return;
    }
    const dateStr = formatLocalDate(date);
    setSelectedDate(dateStr);

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
      setFormWindows([{ startTime: "09:00", endTime: "10:00", mentorServiceIds: [] }]);
    }
    setModalOpen(true);
  };

  const addTimeFrame = () => {
    setFormWindows((prev) => [
      ...prev,
      { startTime: "10:00", endTime: "11:00", mentorServiceIds: [] },
    ]);
  };

  const removeTimeFrame = (idx) => {
    setFormWindows((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateTimeFrame = (idx, field, value) => {
    setFormWindows((prev) =>
      prev.map((w, i) => (i === idx ? { ...w, [field]: value } : w))
    );
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
    for (const fw of formWindows) {
      if (fw.mentorServiceIds.length === 0) {
        toast.error("Each time frame must have at least one service selected");
        return;
      }
    }
    if (!selectedDate) return;

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
      toast.success("Availability saved!");
      setModalOpen(false);
    } catch (e) {
      toast.error(e.message || "Failed to save availability");
      loadData();
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveDay = async () => {
    if (!selectedDate) return;
    const windowsForDate = windows.filter((w) => w.specificDate === selectedDate);
    if (windowsForDate.length === 0) {
      toast.error("No availability to remove");
      return;
    }
    setSaving(true);
    try {
      await Promise.all(windowsForDate.map((w) => v2Api.deleteAvailabilityWindow(w.id)));
      setWindows((prev) => prev.filter((w) => w.specificDate !== selectedDate));
      toast.success("Availability removed");
      setModalOpen(false);
    } catch (e) {
      toast.error(e.message || "Failed to remove availability");
    } finally {
      setSaving(false);
    }
  };

  /* ── drag-to-copy handlers ────────────────────────────────────── */

  const handleDragStart = (e, dateStr) => {
    setDragSourceDate(dateStr);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/plain", dateStr);
  };

  const handleDragOver = (e, dateStr) => {
    e.preventDefault();
    if (dateStr !== dragSourceDate) {
      e.dataTransfer.dropEffect = "copy";
      setDragOverDate(dateStr);
    }
  };

  const handleDragLeave = () => {
    setDragOverDate(null);
  };

  const handleDragEnd = () => {
    setDragSourceDate(null);
    setDragOverDate(null);
  };

  const handleDrop = (e, targetDateStr) => {
    e.preventDefault();
    const sourceDateStr = e.dataTransfer.getData("text/plain");
    setDragSourceDate(null);
    setDragOverDate(null);

    if (!sourceDateStr || sourceDateStr === targetDateStr) return;
    if (isPastDate(new Date(`${targetDateStr}T00:00:00`))) return;

    const sourceWindows = windows.filter((w) => w.specificDate === sourceDateStr);
    if (sourceWindows.length === 0) return;

    setCopyModal({ open: true, from: sourceDateStr, to: targetDateStr });
  };

  const handleCopyConfirm = async () => {
    const { from, to } = copyModal;
    if (!from || !to) return;

    const sourceWindows = windows.filter((w) => w.specificDate === from);
    if (sourceWindows.length === 0) return;

    setCopying(true);
    try {
      const payload = sourceWindows.map((w) => ({
        startTime: w.startTime,
        endTime: w.endTime,
        mentorServiceIds: w.services?.map((s) => s.mentorServiceId) || [],
      }));

      const res = await v2Api.replaceAvailabilityForDate(to, payload);
      const newWindows = res?.data?.windows || [];

      setWindows((prev) => [
        ...prev.filter((w) => w.specificDate !== to),
        ...newWindows,
      ]);

      toast.success(`Copied ${sourceWindows.length} slot${sourceWindows.length > 1 ? "s" : ""} to ${formatDisplayDate(to)}`);
      setCopyModal({ open: false, from: null, to: null });
    } catch (e) {
      toast.error(e.message || "Failed to copy availability");
    } finally {
      setCopying(false);
    }
  };

  /* ── render ──────────────────────────────────────────────────── */

  if (loading) {
    return (
      <div
        className="rounded-[24px] border-[3px] border-gray-200 bg-white overflow-hidden animate-pulse"
        style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b-[3px] border-gray-200">
          <div className="h-10 w-10 rounded-xl bg-gray-200"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-7 w-48 bg-gray-200 rounded"></div>
            <div className="h-3 w-40 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-7 border-b-[3px] border-gray-200">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-10 border-r border-gray-200 bg-gray-50"></div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-[96px] border-b border-r border-gray-200 flex flex-col p-2.5">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const activeServices = mentorServices.filter((ms) => ms.isActive);

  return (
    <>
      {/* ── Calendar Card ── */}
      <div
        className="rounded-[24px] border-[3px] border-black bg-white overflow-hidden"
        style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
      >
        {/* Month navigation */}
        <div className="flex items-center justify-between px-8 py-6">
          <button
            onClick={prevMonth}
            className="flex items-center justify-center h-10 w-10 rounded-xl border-[3px] border-black bg-white hover:bg-gray-50 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ChevronLeft size={18} strokeWidth={3} />
          </button>
          <div className="text-center">
            <h3 className="text-xl font-black text-black">{monthLabel}</h3>
            <p className="text-xs font-medium text-gray-400 mt-0.5">
              Click a date to set your availability
            </p>
          </div>
          <button
            onClick={nextMonth}
            className="flex items-center justify-center h-10 w-10 rounded-xl border-[3px] border-black bg-white hover:bg-gray-50 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <ChevronRight size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-t-[3px] border-black">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div
              key={d}
              className="text-center text-[11px] font-black uppercase tracking-widest text-gray-400 py-3 border-b border-gray-100"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {calDays.map((date, idx) => {
            if (!date) {
              return (
                <div
                  key={`pad-${idx}`}
                  className="h-[96px] border-b border-r border-gray-200"
                />
              );
            }

            const dateStr = formatLocalDate(date);
            const slotCount = dateSlotCounts[dateStr] || 0;
            const hasSlots = slotCount > 0;
            const past = isPastDate(date);
            const today = isToday(date);

            return (
              <button
                key={dateStr}
                onClick={() => openModal(date)}
                disabled={past}
                draggable={hasSlots && !past}
                onDragStart={(e) => hasSlots && handleDragStart(e, dateStr)}
                onDragOver={(e) => !past && handleDragOver(e, dateStr)}
                onDragLeave={handleDragLeave}
                onDragEnd={handleDragEnd}
                onDrop={(e) => !past && handleDrop(e, dateStr)}
                className={`relative h-[96px] flex flex-col items-start justify-start p-2.5 border-b border-r border-gray-200 transition-all group ${
                  past
                    ? "opacity-35 cursor-not-allowed"
                    : "hover:bg-[#F0F9FF] cursor-pointer"
                } ${hasSlots ? "bg-[#F0FDF9]" : ""} ${
                  today ? "bg-[#FFF8ED]" : ""
                } ${
                  dragOverDate === dateStr && dragSourceDate !== dateStr
                    ? "!bg-[#EDE9FE] ring-2 ring-inset ring-[#5061E4]"
                    : ""
                } ${
                  dragSourceDate === dateStr ? "opacity-50 scale-95" : ""
                }`}
              >
                {/* Date number — top left */}
                <span
                  className={`text-sm font-bold ${
                    today
                      ? "h-7 w-7 flex items-center justify-center rounded-full bg-[#F59E0B] text-white border-2 border-[#D97706]"
                      : hasSlots
                      ? "text-[#10B981] font-black"
                      : "text-gray-600"
                  }`}
                >
                  {date.getDate()}
                </span>

                {/* Slot indicators — bottom center */}
                {hasSlots && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0.5">
                    {Array.from({ length: Math.min(slotCount, 3) }).map((_, i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-[#10B981]"
                      />
                    ))}
                    <span className="text-[10px] font-bold text-[#10B981] ml-0.5">
                      {slotCount} slot{slotCount > 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                {/* Hover plus icon */}
                {!past && !hasSlots && (
                  <Plus
                    size={14}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 px-8 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#F59E0B] border border-[#D97706]" />
            <span className="text-xs font-semibold text-gray-500">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#10B981]" />
            <span className="text-xs font-semibold text-gray-500">Has availability</span>
          </div>
          <div className="flex items-center gap-2">
            <Plus size={12} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-500">Hover to add</span>
          </div>
          <div className="flex items-center gap-2">
            <Copy size={12} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-500">Drag to copy</span>
          </div>
        </div>
      </div>

      {/* ── Copy Confirmation Modal ── */}
      {copyModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCopyModal({ open: false, from: null, to: null })} />
          <div
            className="relative w-full max-w-md rounded-[24px] border-[3px] border-black bg-white p-7 text-center"
            style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-black bg-[#EDE9FE]">
              <Copy size={24} className="text-[#5061E4]" />
            </div>
            <h3 className="text-lg font-black text-black mb-1">Copy Availability?</h3>
            <p className="text-sm text-gray-500 font-medium mb-1">
              Copy all time slots from
            </p>
            <p className="text-sm font-bold text-[#5061E4] mb-1">
              {formatDisplayDate(copyModal.from)}
            </p>
            <p className="text-sm text-gray-500 font-medium mb-1">to</p>
            <p className="text-sm font-bold text-[#5061E4] mb-5">
              {formatDisplayDate(copyModal.to)}
            </p>
            {/* Preview of what will be copied */}
            <div className="rounded-xl border-[2px] border-gray-200 bg-[#FAFAFA] p-3 mb-5 text-left">
              {windows.filter((w) => w.specificDate === copyModal.from).map((w, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-600 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                  {TIME_OPTIONS.find((o) => o.value === w.startTime)?.label || w.startTime}
                  {" → "}
                  {TIME_OPTIONS.find((o) => o.value === w.endTime)?.label || w.endTime}
                  <span className="text-gray-400 ml-auto">
                    {w.services?.length || 0} service{(w.services?.length || 0) !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCopyModal({ open: false, from: null, to: null })}
                disabled={copying}
                className="flex-1 rounded-xl border-[3px] border-black bg-white py-2.5 text-sm font-black hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCopyConfirm}
                disabled={copying}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] py-2.5 text-sm font-black text-white shadow-[3px_3px_0_0_#000] hover:opacity-90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50 transition-all"
              >
                {copying && <Loader2 size={14} className="animate-spin" />}
                Copy Slots
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Set Availability Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          <div
            className="relative w-full max-w-[560px] max-h-[90vh] rounded-[24px] border-[3px] border-black bg-white flex flex-col overflow-hidden"
            style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between px-7 pt-6 pb-4">
              <div>
                <h3 className="text-xl font-black text-black">Set Availability</h3>
                <p className="text-sm font-bold text-[#5061E4] mt-0.5">
                  {formatDisplayDate(selectedDate)}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="flex items-center justify-center h-9 w-9 rounded-full border-[2px] border-gray-200 hover:border-black transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal body — scrollable */}
            <div className="flex-1 overflow-y-auto px-7 pb-4">
              <div className="space-y-5">
                {formWindows.map((fw, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border-[2px] border-gray-200 p-5"
                  >
                    {/* Time frame header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                        Time Frame {idx + 1}
                      </span>
                      {formWindows.length > 1 && (
                        <button
                          onClick={() => removeTimeFrame(idx)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* FROM / TO selects */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1">
                        <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5 block">
                          From
                        </label>
                        <select
                          value={fw.startTime}
                          onChange={(e) =>
                            updateTimeFrame(idx, "startTime", e.target.value)
                          }
                          className="w-full rounded-xl border-[2.5px] border-black px-3 py-2.5 text-sm font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#5061E4]/10 appearance-none cursor-pointer"
                        >
                          {TIME_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span className="text-gray-300 mt-5 font-bold">→</span>
                      <div className="flex-1">
                        <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5 block">
                          To
                        </label>
                        <select
                          value={fw.endTime}
                          onChange={(e) =>
                            updateTimeFrame(idx, "endTime", e.target.value)
                          }
                          className="w-full rounded-xl border-[2.5px] border-black px-3 py-2.5 text-sm font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#5061E4]/10 appearance-none cursor-pointer"
                        >
                          {TIME_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Services chips */}
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">
                        Services Offered During This Time
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {activeServices.map((ms) => {
                          const isSelected = fw.mentorServiceIds.includes(ms.id);
                          return (
                            <button
                              key={ms.id}
                              type="button"
                              onClick={() => toggleService(idx, ms.id)}
                              className={`flex items-center gap-1.5 rounded-full border-[2px] px-3.5 py-1.5 text-xs font-bold transition-all ${
                                isSelected
                                  ? "border-[#10B981] bg-[#10B981] text-white shadow-sm"
                                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-400"
                              }`}
                            >
                              {isSelected && (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                              {ms.title || ms.serviceName}
                            </button>
                          );
                        })}
                      </div>

                      {activeServices.length === 0 && (
                        <p className="text-xs text-red-500 font-medium mt-2">
                          No active services. Create services first.
                        </p>
                      )}

                      {fw.mentorServiceIds.length === 0 && activeServices.length > 0 && (
                        <p className="text-xs text-red-400 font-medium mt-2">
                          Select at least one service
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add another time frame */}
              <button
                onClick={addTimeFrame}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl border-[2px] border-dashed border-gray-300 py-3.5 text-sm font-bold text-[#5061E4] hover:border-[#5061E4] hover:bg-[#F8F8FF] transition-all"
              >
                <Plus size={16} strokeWidth={2.5} /> Add Another Time Frame
              </button>
            </div>

            {/* Modal footer */}
            <div className="flex items-center gap-3 px-7 py-5 border-t-[2px] border-gray-100">
              {/* Remove day button (only if existing availability) */}
              {windows.some((w) => w.specificDate === selectedDate) && (
                <button
                  onClick={handleRemoveDay}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl border-[2px] border-red-200 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 disabled:opacity-50 transition-all mr-auto"
                >
                  <Trash2 size={14} /> Remove
                </button>
              )}

              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                  className="rounded-xl border-[3px] border-black bg-white px-6 py-2.5 text-sm font-black hover:bg-gray-50 disabled:opacity-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#5061E4] px-6 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_0_#000] hover:opacity-90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50 transition-all"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  Save Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
