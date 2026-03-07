"use client";

import { useEffect } from "react";
import {
  Calendar,
  DollarSign,
  Clock,
  TrendingUp,
  Users,
  Star,
  Wallet,
  Gift,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMentorStore } from "../../stores/mentorStore";
import { useAuthStore } from "../../stores/authStore";
import { formatDateTime, getInitials, formatCurrency } from "../../lib/utils";
import { Spinner } from "../ui/spinner";

export function MentorDashboard() {
  const user = useAuthStore((state) => state.user);
  const {
    dashboard,
    dashboardLoading,
    fetchDashboard,
    bookings,
    bookingsLoading,
    fetchBookings,
    earnings,
    earningsLoading,
    fetchEarnings,
    canAccept,
    canAcceptLoading,
    checkCanAcceptBookings,
  } = useMentorStore();

  useEffect(() => {
    fetchDashboard();
    fetchBookings({ limit: 5, status: "CONFIRMED" });
    fetchEarnings();
    checkCanAcceptBookings();
  }, [fetchDashboard, fetchBookings, fetchEarnings, checkCanAcceptBookings]);

  const stats = [
    {
      title: "Total Earnings",
      value: formatCurrency(earnings?.totalEarnings || 0),
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Completed Sessions",
      value: dashboard?.completedSessions || 0,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Mentees",
      value: dashboard?.totalMentees || 0,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Average Rating",
      value: dashboard?.averageRating?.toFixed(1) || "N/A",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="mt-1 text-gray-600">
            Here&apos;s your mentorship overview
          </p>
        </div>
        {!canAcceptLoading && !canAccept && (
          <Badge variant="warning" className="w-fit">
            Complete profile to accept bookings
          </Badge>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-xl p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">
                Available Balance
              </p>
              <p className="text-3xl font-bold">
                {formatCurrency(earnings?.balance || 0)}
              </p>
              <p className="mt-1 text-sm text-white/80">
                Pending: {formatCurrency(earnings?.pendingEarnings || 0)}
              </p>
            </div>
            <Link href="/dashboard/earnings">
              <Button variant="secondary" className="gap-2">
                <Wallet className="h-4 w-4" />
                Withdraw
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
            <Link href="/dashboard/bookings">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {bookingsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : bookings.length === 0 ? (
              <div className="py-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  No upcoming sessions
                </p>
                <Link href="/dashboard/slots">
                  <Button className="mt-4" size="sm">
                    Manage Slots
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    <Avatar>
                      <AvatarImage src={booking.mentee?.profilePicture} />
                      <AvatarFallback>
                        {getInitials(booking.mentee?.name || "M")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{booking.mentee?.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(booking.slot?.startTime)}
                      </p>
                    </div>
                    <Badge variant="secondary">{booking.sessionMode}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium">Earnings</span>
                </div>
                <span className="text-lg font-bold">
                  {formatCurrency(dashboard?.monthlyEarnings || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium">Sessions</span>
                </div>
                <span className="text-lg font-bold">
                  {dashboard?.monthlySessions || 0}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="font-medium">New Mentees</span>
                </div>
                <span className="text-lg font-bold">
                  {dashboard?.newMentees || 0}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-2">
                    <Gift className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="font-medium">Incentives</span>
                </div>
                <span className="text-lg font-bold">
                  {formatCurrency(dashboard?.incentivesEarned || 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/slots">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <Clock className="h-6 w-6" />
                <span>Manage Slots</span>
              </Button>
            </Link>
            <Link href="/dashboard/bookings">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <Calendar className="h-6 w-6" />
                <span>View Bookings</span>
              </Button>
            </Link>
            <Link href="/dashboard/earnings">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <DollarSign className="h-6 w-6" />
                <span>Earnings</span>
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <TrendingUp className="h-6 w-6" />
                <span>Update Profile</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
