"use client";

import { useEffect } from "react";
import { useMentorStore } from "@/stores/mentorStore";
import { Bell, CheckCheck, Loader2, Inbox as InboxIcon } from "lucide-react";
import { format } from "date-fns";

export default function MentorInboxPage() {
  const {
    notifications,
    bookings,
    fetchNotifications,
    fetchBookings,
    markNotificationRead,
    markAllNotificationsRead,
    isLoading,
  } = useMentorStore();

  useEffect(() => {
    fetchNotifications();
    fetchBookings();
  }, [fetchNotifications, fetchBookings]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
            Notifications & upcoming session updates
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-sm text-primary hover:underline flex items-center gap-1.5"
          >
            <CheckCheck size={16} /> Mark all as read
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Bell size={18} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h2>
          </div>

          {isLoading && notifications.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <InboxIcon size={40} className="mb-3 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border max-h-150 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-secondary/50 transition cursor-pointer ${
                    !notification.isRead ? "bg-primary/5" : ""
                  }`}
                  onClick={() => {
                    if (!notification.isRead) {
                      markNotificationRead(notification.id);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        notification.isRead ? "bg-transparent" : "bg-primary"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(notification.createdAt), "MMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Sessions Sidebar */}
        <div className="bg-card border border-border rounded-xl">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Sessions</h2>
          </div>
          <div className="divide-y divide-border max-h-150 overflow-y-auto">
            {upcomingSessions.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                No upcoming sessions
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
