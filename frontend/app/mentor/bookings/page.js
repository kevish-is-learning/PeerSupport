"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Video,
  LinkIcon,
  Loader2,
} from "lucide-react";
import { format, isSameDay } from "date-fns";
import { mentorBookingApi, resolveUploadUrl } from "../../../lib/api";
import { canJoinSession, joinDisabledReason } from "../../../lib/sessionUtils";
import { toast } from "sonner";
import MentorBookingDetailsModal from "../../../components/mentor/MentorBookingDetailsModal";

/* ── helpers (matching AvailabilityCalendar) ─────────────────────── */

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

function isTodayDate(date) {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
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

const STATUS_STYLES = {
  CONFIRMED: { label: "scheduled", bg: "bg-[#F59E0B]", text: "text-white" },
  PENDING: { label: "pending", bg: "bg-[#E5E7EB]", text: "text-gray-600" },
  COMPLETED: { label: "completed", bg: "bg-[#10B981]", text: "text-white" },
};

function getStatusBadge(status) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.PENDING;
  return (
    <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-[11px] font-bold ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

/* ── Skeleton ────────────────────────────────────────────────────── */

function CalendarSkeleton() {
  return (
    <div className="rounded-[24px] border-[3px] border-gray-200 bg-white overflow-hidden animate-pulse" style={{ boxShadow: "6px 6px 0 0 #E5E7EB" }}>
      <div className="flex items-center justify-between px-8 py-6 border-b-2 border-gray-200">
        <div className="h-10 w-10 rounded-xl bg-gray-200" />
        <div className="flex flex-col items-center gap-2">
          <div className="h-7 w-48 bg-gray-200 rounded" />
          <div className="h-3 w-40 bg-gray-200 rounded" />
        </div>
        <div className="h-10 w-10 rounded-xl bg-gray-200" />
      </div>
      <div className="grid grid-cols-7 border-b-[3px] border-gray-200">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-10 border-r border-gray-200 bg-gray-50" />
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="h-[96px] border-b border-r border-gray-200 flex flex-col p-2.5">
            <div className="h-5 w-5 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gray-200 shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-3 w-12 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-3/4 rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-9 flex-1 rounded-lg bg-gray-200" />
            <div className="h-9 flex-1 rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Upcoming Session Card (Sidebar) ─────────────────────────────── */

function UpcomingSessionCard({ session, onViewDetails }) {
  const router = useRouter();
  const startDate = new Date(session.startTime);
  const endDate = new Date(session.endTime);

  return (
    <div className="rounded-xl border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#F59E0B] transition-transform hover:-translate-y-0.5">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-black bg-gray-100">
          {session.mentee?.profilePicture ? (
            <img src={resolveUploadUrl(session.mentee.profilePicture)} alt={session.mentee.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-400">
              {session.mentee?.name?.charAt(0) || "M"}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="truncate text-sm font-extrabold text-gray-900">{session.mentee?.name || "Mentee"}</h4>
          <span className="inline-flex items-center rounded bg-[#5061E4] px-1.5 py-0.5 text-[10px] font-bold text-white mt-0.5">1:1</span>
        </div>
      </div>
      <p className="text-sm font-bold text-gray-800 mb-2 line-clamp-1">{session.serviceName}</p>
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <CalendarIcon size={13} className="text-gray-400 shrink-0" />
          <span className="font-semibold">{format(startDate, "d MMM yyyy")}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={13} className="text-[#F59E0B] shrink-0" />
          <span className="font-semibold">{format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Video size={13} className="text-gray-400 shrink-0" />
          <span className="font-semibold">{session.durationMinutes} mins</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          disabled={!canJoinSession(session.startTime, session.endTime)}
          onClick={() => {
            if (session.meetingLink) router.push(`/meeting/${session.id}`);
            else toast.info("Meeting link will be available soon.");
          }}
          className={`flex-1 rounded-lg border-2 border-black px-3 py-2 text-xs font-bold text-white shadow-[2px_2px_0_0_#000] transition-all ${
            canJoinSession(session.startTime, session.endTime)
              ? "bg-[#5061E4] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#000] active:translate-y-0 active:shadow-none cursor-pointer"
              : "bg-gray-400 opacity-60 cursor-not-allowed"
          }`}
          title={!canJoinSession(session.startTime, session.endTime) ? joinDisabledReason(session.startTime) : ""}
        >
          {canJoinSession(session.startTime, session.endTime) ? "Join" : joinDisabledReason(session.startTime)}
        </button>
        <button
          onClick={() => onViewDetails(session)}
          className="flex-1 rounded-lg border-2 border-black bg-white px-3 py-2 text-xs font-bold text-gray-800 shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#000] active:translate-y-0 active:shadow-none cursor-pointer"
        >
          Details
        </button>
      </div>
    </div>
  );
}

/* ── Day Session Card (Bottom Panel) ─────────────────────────────── */

function DaySessionCard({ session }) {
  const router = useRouter();
  const startDate = new Date(session.startTime);
  const endDate = new Date(session.endTime);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_#E5E7EB]">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-black bg-gray-100">
        {session.mentee?.profilePicture ? (
          <img src={resolveUploadUrl(session.mentee.profilePicture)} alt={session.mentee.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-400">
            {session.mentee?.name?.charAt(0) || "M"}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h4 className="text-base font-extrabold text-gray-900">{session.serviceName}</h4>
          {getStatusBadge(session.status)}
        </div>
        <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mb-1">
          <Users size={14} className="text-gray-400" />
          {session.mentee?.name || "Mentee"}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={13} className="text-gray-400" />
            {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
          </span>
          <span className="inline-flex items-center rounded bg-[#5061E4] px-1.5 py-0.5 text-[10px] font-bold text-white">1:1</span>
        </div>
        {session.purposeOfCall && (
          <div className="mt-3 rounded-lg border border-dashed border-gray-300 bg-[#FAFAFA] px-3 py-2">
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{session.purposeOfCall}</p>
          </div>
        )}
      </div>
      <div className="sm:ml-auto shrink-0">
        <button
          disabled={!canJoinSession(session.startTime, session.endTime)}
          onClick={() => {
            if (session.meetingLink) router.push(`/meeting/${session.id}`);
            else toast.info("Meeting link will be available soon.");
          }}
          className={`flex items-center gap-2 rounded-xl border-2 border-black px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_#000] transition-all ${
            canJoinSession(session.startTime, session.endTime)
              ? "bg-[#F97316] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-none cursor-pointer"
              : "bg-gray-400 opacity-60 cursor-not-allowed"
          }`}
          title={!canJoinSession(session.startTime, session.endTime) ? joinDisabledReason(session.startTime) : ""}
        >
          <LinkIcon size={15} />
          {canJoinSession(session.startTime, session.endTime) ? "Join Meeting" : joinDisabledReason(session.startTime)}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */

export default function MentorSessionsPage() {
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState(formatLocalDate(now));
  const [loading, setLoading] = useState(true);
  const [calendarSessions, setCalendarSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [datesWithSessions, setDatesWithSessions] = useState([]);
  const [detailsSession, setDetailsSession] = useState(null);

  /* ── fetch ────────────────────────────────────────────────────── */

  const fetchSessions = useCallback(async (month, year) => {
    try {
      setLoading(true);
      const res = await mentorBookingApi.getSessions({ month: month + 1, year });
      setCalendarSessions(res.data?.calendarSessions || []);
      setUpcomingSessions(res.data?.upcomingSessions || []);
      setDatesWithSessions(res.data?.datesWithSessions || []);
    } catch (e) {
      toast.error("Failed to load sessions");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions(calMonth, calYear);
  }, [calMonth, calYear, fetchSessions]);

  /* ── calendar nav (same pattern as AvailabilityCalendar) ─────── */

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

  /* ── derived data ────────────────────────────────────────────── */

  // Build dateStr -> session count map
  const dateSessionCounts = useMemo(() => {
    const map = {};
    for (const dateStr of datesWithSessions) {
      map[dateStr] = (map[dateStr] || 0) + 1;
    }
    // Also count from calendarSessions for accurate counts
    for (const s of calendarSessions) {
      const d = formatLocalDate(new Date(s.startTime));
      map[d] = (map[d] || 0);
    }
    return map;
  }, [datesWithSessions, calendarSessions]);

  // Count sessions per date from actual data
  const sessionCountByDate = useMemo(() => {
    const map = {};
    for (const s of calendarSessions) {
      const d = formatLocalDate(new Date(s.startTime));
      map[d] = (map[d] || 0) + 1;
    }
    return map;
  }, [calendarSessions]);

  // Sessions for selected date
  const sessionsForSelectedDate = useMemo(() => {
    return calendarSessions.filter((s) => {
      const sDate = formatLocalDate(new Date(s.startTime));
      return sDate === selectedDate;
    });
  }, [calendarSessions, selectedDate]);

  const selectedDateDisplay = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  /* ── calendar click ──────────────────────────────────────────── */

  const handleDateClick = (date) => {
    if (isPastDate(date)) return;
    setSelectedDate(formatLocalDate(date));
  };

  /* ── render ──────────────────────────────────────────────────── */

  return (
    <div className="w-full h-full overflow-y-auto bg-[#FFF7F5]">
      <div className="mx-auto max-w-7xl p-6 lg:p-10">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111]">Sessions</h1>
          <p className="mt-1 text-sm font-medium text-gray-500">Manage your mentoring sessions and schedule</p>
        </header>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* ── Calendar Card (matches AvailabilityCalendar) ──────── */}
          {loading ? (
            <CalendarSkeleton />
          ) : (
            <div
              className="rounded-[24px] border-[3px] border-black bg-white overflow-hidden"
              style={{ boxShadow: "6px 6px 0 0 #5061E4" }}
            >
              {/* Month navigation */}
              <div className="flex items-center justify-between px-8 py-6">
                <button
                  onClick={prevMonth}
                  className="flex items-center justify-center h-10 w-10 rounded-xl border-[3px] border-black bg-white hover:bg-gray-50 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <ChevronLeft size={18} strokeWidth={3} />
                </button>
                <div className="text-center">
                  <h3 className="text-xl font-black text-black">{monthLabel}</h3>
                  <p className="text-xs font-medium text-gray-400 mt-0.5">
                    Click a date to see sessions
                  </p>
                </div>
                <button
                  onClick={nextMonth}
                  className="flex items-center justify-center h-10 w-10 rounded-xl border-[3px] border-black bg-white hover:bg-gray-50 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
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
                      <div key={`pad-${idx}`} className="h-[96px] border-b border-r border-gray-200" />
                    );
                  }

                  const dateStr = formatLocalDate(date);
                  const sessionCount = sessionCountByDate[dateStr] || 0;
                  const hasSessions = datesWithSessions.includes(dateStr);
                  const past = isPastDate(date);
                  const today = isTodayDate(date);
                  const isSelected = dateStr === selectedDate;

                  return (
                    <button
                      key={dateStr}
                      onClick={() => handleDateClick(date)}
                      disabled={past}
                      className={`relative h-[96px] flex flex-col items-start justify-start p-2.5 border-b border-r border-gray-200 transition-all group ${
                        past
                          ? "opacity-35 cursor-not-allowed"
                          : "hover:bg-[#F0F9FF] cursor-pointer"
                      } ${hasSessions && !past ? "bg-[#EDE9FE]" : ""} ${
                        today && !isSelected ? "bg-[#FFF8ED]" : ""
                      } ${
                        isSelected && !past
                          ? "bg-[#E0E7FF] ring-2 ring-inset ring-[#5061E4]"
                          : ""
                      }`}
                    >
                      {/* Date number */}
                      <span
                        className={`text-sm font-bold ${
                          today
                            ? "h-7 w-7 flex items-center justify-center rounded-full bg-[#F59E0B] text-white border-2 border-[#D97706]"
                            : isSelected && !past
                            ? "h-7 w-7 flex items-center justify-center rounded-full bg-[#5061E4] text-white"
                            : hasSessions
                            ? "text-[#5061E4] font-black"
                            : "text-gray-600"
                        }`}
                      >
                        {date.getDate()}
                      </span>

                      {/* Session indicators */}
                      {hasSessions && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0.5">
                          {Array.from({ length: Math.min(sessionCount || 1, 3) }).map((_, i) => (
                            <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#5061E4]" />
                          ))}
                          {sessionCount > 0 && (
                            <span className="text-[10px] font-bold text-[#5061E4] ml-0.5">
                              {sessionCount} session{sessionCount > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 px-8 py-4 border-t border-gray-100 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#F59E0B] border border-[#D97706]" />
                  <span className="text-xs font-semibold text-gray-500">Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#5061E4]" />
                  <span className="text-xs font-semibold text-gray-500">Has sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-gray-300" />
                  <span className="text-xs font-semibold text-gray-500">Past (locked)</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Upcoming Sessions Sidebar ─────────────────────────── */}
          <div className="rounded-2xl border-[3px] border-black bg-[#FFF9F6]" style={{ boxShadow: "6px 6px 0 0 #F97316" }}>
            <div className="flex items-center gap-2 border-b-[3px] border-black bg-[#F8EBE6] px-5 py-4 rounded-t-[21px]">
              <CalendarIcon size={18} className="text-gray-900" />
              <h3 className="text-lg font-black text-gray-900">Upcoming Sessions</h3>
            </div>
            <div className="p-4 max-h-[560px] overflow-y-auto custom-scrollbar">
              {loading ? (
                <SidebarSkeleton />
              ) : upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <UpcomingSessionCard key={session.id} session={session} onViewDetails={(s) => setDetailsSession(s)} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="mb-3 rounded-full bg-gray-100 p-3">
                    <Video size={22} className="text-gray-400" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">No upcoming sessions</h4>
                  <p className="mt-1 text-xs text-gray-500">Sessions will appear here once mentees book.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Selected Date Sessions Panel ───────────────────────── */}
        <div className="mt-6 rounded-[24px] border-[3px] border-black bg-white" style={{ boxShadow: "6px 6px 0 0 #F59E0B" }}>
          <div className="flex items-center gap-2 border-b-[3px] border-black bg-[#FEF3C7] px-6 py-4 rounded-t-[21px]">
            <CalendarIcon size={18} className="text-gray-900" />
            <h3 className="text-lg font-black text-gray-900">
              Sessions on {selectedDateDisplay}
            </h3>
          </div>
          <div className="p-5">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-[#5061E4]" />
              </div>
            ) : sessionsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {sessionsForSelectedDate.map((session) => (
                  <DaySessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-3 rounded-full bg-gray-100 p-3">
                  <CalendarIcon size={22} className="text-gray-400" />
                </div>
                <h4 className="text-sm font-bold text-gray-700">No sessions on this date</h4>
                <p className="mt-1 text-xs text-gray-500">Select a date with a dot indicator to see scheduled sessions.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {detailsSession && (
        <MentorBookingDetailsModal
          session={detailsSession}
          mentee={detailsSession.mentee}
          onClose={() => setDetailsSession(null)}
        />
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>
    </div>
  );
}
