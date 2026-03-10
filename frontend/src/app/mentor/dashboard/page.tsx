"use client";

import { useEffect } from "react";
import { useMentorStore } from "@/stores/mentorStore";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import {
  Calendar,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

export default function MentorDashboardPage() {
  const { dashboard, isLoading, fetchDashboard, fetchBookings, bookings } = useMentorStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchDashboard();
    fetchBookings({ status: "CONFIRMED" });
  }, [fetchDashboard, fetchBookings]);

  if (isLoading && !dashboard) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Sessions",
      value: dashboard?.totalBookings || 0,
      icon: Calendar,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Completed",
      value: dashboard?.completedSessions || 0,
      icon: Users,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Upcoming",
      value: dashboard?.upcomingSessions || 0,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Total Earnings",
      value: `₹${(dashboard?.totalEarnings || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Balance",
      value: `₹${(dashboard?.balance || 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Rating",
      value: dashboard?.averageRating ? `${dashboard.averageRating.toFixed(1)} ★` : "N/A",
      icon: Star,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ];

  const upcomingBookings = bookings
    .filter((b) => b.status === "CONFIRMED")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.name || "Mentor"}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s your dashboard overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className={`${stat.bg} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Manage Slots", href: "/mentor/availability", icon: Clock },
          { label: "View Calendar", href: "/mentor/calendar", icon: Calendar },
          { label: "Check Payouts", href: "/mentor/payouts", icon: DollarSign },
          { label: "View Profile", href: "/mentor/profile", icon: Users },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition flex items-center gap-3 group"
          >
            <action.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition" />
            <span className="text-sm font-medium text-foreground">{action.label}</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-primary transition" />
          </Link>
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-card border border-border rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Upcoming Sessions</h2>
          <Link
            href="/mentor/calendar"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-border">
          {upcomingBookings.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No upcoming sessions scheduled
            </div>
          ) : (
            upcomingBookings.map((booking) => (
              <div key={booking.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                    {booking.mentee?.name?.[0]?.toUpperCase() || "M"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {booking.mentee?.name || "Mentee"}
                    </p>
                    <p className="text-xs text-muted-foreground">{booking.purpose}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">
                    {booking.slot
                      ? format(new Date(booking.slot.startTime), "MMM d, h:mm a")
                      : "TBD"}
                  </p>
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
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pending Earnings */}
      {dashboard && (dashboard.pendingEarnings || 0) > 0 && (
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/10 w-10 h-10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Pending Earnings: ₹{dashboard.pendingEarnings.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                These earnings are being processed and will be available soon
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
