"use client";

import { useEffect } from "react";
import { useMentorStore } from "@/stores/mentorStore";
import { Loader2, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function MentorInboxPage() {
  const {
    bookings,
    fetchBookings,
    isLoading,
  } = useMentorStore();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Upcoming sessions for the sidebar
  const upcomingSessions = bookings
    .filter((b) => b.status === "CONFIRMED" || b.status === "PENDING")
    .sort((a, b) => {
      const aTime = a.slot?.startTime ? new Date(a.slot.startTime).getTime() : 0;
      const bTime = b.slot?.startTime ? new Date(b.slot.startTime).getTime() : 0;
      return aTime - bTime;
    })
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
          <p className="text-muted-foreground mt-1">
            Upcoming session updates
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Upcoming Sessions */}
        <div className="bg-card border border-border rounded-xl">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <CalendarIcon size={18} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Upcoming Sessions</h2>
          </div>
          <div className="divide-y divide-border">
            {isLoading && bookings.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : upcomingSessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <CalendarIcon size={40} className="mb-3 opacity-50" />
                <p>No upcoming sessions</p>
              </div>
            ) : (
              upcomingSessions.map((booking) => (
                <div key={booking.id} className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                      {booking.mentee?.name?.[0]?.toUpperCase() || "M"}
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                      {booking.mentee?.name || "Mentee"}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{booking.purpose}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {booking.slot
                        ? format(new Date(booking.slot.startTime), "MMM d, h:mm a")
                        : "TBD"}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  {booking.meetingLink && (
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-xs text-primary hover:underline block"
                    >
                      Join Meeting
                    </a>
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
