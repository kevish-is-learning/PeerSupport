"use client";

import { useEffect, useState } from "react";
import { useMentorStore } from "@/stores/mentorStore";
import { toast } from "sonner";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Video,
  Phone,
  MessageSquare,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

export default function MentorCalendarPage() {
  const {
    bookings,
    slots,
    fetchBookings,
    fetchSlots,
    completeBooking,
    cancelBooking,
    isLoading,
  } = useMentorStore();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchBookings();
    fetchSlots();
  }, [fetchBookings, fetchSlots]);

  // Generate calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let day = calStart;
  while (day <= calEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  // Get bookings for a specific day
  const getBookingsForDay = (date: Date) =>
    bookings.filter((b) => {
      if (!b.slot?.startTime) return false;
      return isSameDay(new Date(b.slot.startTime), date);
    });

  // Get filtered bookings for selected date
  const selectedDayBookings = selectedDate
    ? getBookingsForDay(selectedDate).filter((b) =>
        filter === "all" ? true : b.status === filter.toUpperCase()
      )
    : [];

  const handleComplete = async (bookingId: string) => {
    try {
      await completeBooking(bookingId);
      toast.success("Booking marked as completed");
    } catch {
      // handled by interceptor
    }
  };

  const handleCancel = async (bookingId: string) => {
    const reason = prompt("Cancel reason (optional):");
    try {
      await cancelBooking(bookingId, reason || undefined);
      toast.success("Booking cancelled");
    } catch {
      // handled by interceptor
    }
  };

  const sessionModeIcon = (mode: string) => {
    switch (mode) {
      case "VIDEO":
        return <Video size={14} />;
      case "AUDIO":
        return <Phone size={14} />;
      default:
        return <MessageSquare size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        <p className="text-muted-foreground mt-1">View and manage your sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 hover:bg-secondary rounded-lg transition"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold text-foreground">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 hover:bg-secondary rounded-lg transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Week headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium text-muted-foreground py-2"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
              const dayBookings = getBookingsForDay(d);
              const isSelected = selectedDate && isSameDay(d, selectedDate);
              const isCurrentMonth = isSameMonth(d, currentMonth);

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className={`relative p-2 min-h-[60px] rounded-lg text-sm transition text-left ${
                    isSelected
                      ? "bg-primary/20 border border-primary"
                      : isToday(d)
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-secondary border border-transparent"
                  } ${!isCurrentMonth ? "opacity-30" : ""}`}
                >
                  <span
                    className={`text-xs ${
                      isToday(d)
                        ? "text-primary font-bold"
                        : isCurrentMonth
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {format(d, "d")}
                  </span>
                  {dayBookings.length > 0 && (
                    <div className="mt-1 flex gap-0.5 flex-wrap">
                      {dayBookings.slice(0, 3).map((b) => (
                        <div
                          key={b.id}
                          className={`w-1.5 h-1.5 rounded-full ${
                            b.status === "CONFIRMED"
                              ? "bg-green-400"
                              : b.status === "COMPLETED"
                              ? "bg-blue-400"
                              : b.status === "CANCELLED"
                              ? "bg-red-400"
                              : "bg-yellow-400"
                          }`}
                        />
                      ))}
                      {dayBookings.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">
                          +{dayBookings.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected day details */}
        <div className="bg-card border border-border rounded-xl">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <CalendarIcon size={18} className="text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Select a day"}
              </h2>
            </div>
            {/* Filter */}
            <div className="flex gap-1 mt-3 flex-wrap">
              {["all", "confirmed", "pending", "completed", "cancelled"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : selectedDayBookings.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No sessions on this day
              </div>
            ) : (
              selectedDayBookings.map((booking) => (
                <div key={booking.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                        {booking.mentee?.name?.[0]?.toUpperCase() || "M"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {booking.mentee?.name || "Mentee"}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {sessionModeIcon(booking.sessionMode)}
                          <span>{booking.sessionMode}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-500/10 text-green-400"
                          : booking.status === "COMPLETED"
                          ? "bg-blue-500/10 text-blue-400"
                          : booking.status === "CANCELLED"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">{booking.purpose}</p>

                  {booking.slot && (
                    <p className="text-xs text-foreground">
                      {format(new Date(booking.slot.startTime), "h:mm a")} -{" "}
                      {format(new Date(booking.slot.endTime), "h:mm a")}
                    </p>
                  )}

                  {booking.meetingLink && (
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-primary hover:underline"
                    >
                      Join Meeting Room
                    </a>
                  )}

                  {booking.status === "CONFIRMED" && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleComplete(booking.id)}
                        className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-lg hover:bg-green-500/20 transition flex items-center gap-1"
                      >
                        <CheckCircle2 size={12} /> Complete
                      </button>
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="text-xs bg-red-500/10 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500/20 transition flex items-center gap-1"
                      >
                        <XCircle size={12} /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
