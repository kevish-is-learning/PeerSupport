"use client";

import { useEffect } from "react";
import {
  Calendar,
  Users,
  Clock,
  TrendingUp,
  BookOpen,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMenteeStore } from "../../stores/menteeStore";
import { useAuthStore } from "../../stores/authStore";
import { formatDateTime, getInitials, formatCurrency } from "../../lib/utils";
import { Spinner } from "../ui/spinner";

export function MenteeDashboard() {
  const user = useAuthStore((state) => state.user);
  const {
    dashboardStats,
    dashboardLoading,
    fetchDashboardStats,
    bookings,
    bookingsLoading,
    fetchBookings,
    mentors,
    mentorsLoading,
    fetchMentors,
  } = useMenteeStore();

  useEffect(() => {
    fetchDashboardStats();
    fetchBookings({ limit: 5 });
    fetchMentors({ limit: 4 });
  }, [fetchDashboardStats, fetchBookings, fetchMentors]);

  const stats = [
    {
      title: "Total Sessions",
      value: dashboardStats?.totalSessions || 0,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Hours Learning",
      value: dashboardStats?.totalHours || 0,
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Mentors Connected",
      value: dashboardStats?.mentorsConnected || 0,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Upcoming Sessions",
      value: dashboardStats?.upcomingSessions || 0,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="mt-1 text-gray-600">
          Here&apos;s what&apos;s happening with your mentorship journey
        </p>
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
            <Link href="/dashboard/bookings">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
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
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  No upcoming sessions
                </p>
                <Link href="/dashboard/mentors">
                  <Button className="mt-4" size="sm">
                    Find a Mentor
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings
                  .filter((b) => b.status === "CONFIRMED" || b.status === "PENDING")
                  .slice(0, 3)
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center gap-4 rounded-lg border p-4"
                    >
                      <Avatar>
                        <AvatarImage src={booking.mentor?.profilePicture} />
                        <AvatarFallback>
                          {getInitials(booking.mentor?.name || "M")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{booking.mentor?.name}</p>
                        <p className="text-sm text-gray-600">
                          {formatDateTime(booking.slot?.startTime)}
                        </p>
                      </div>
                      <Badge
                        variant={
                          booking.status === "CONFIRMED" ? "success" : "secondary"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Mentors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recommended Mentors</CardTitle>
            <Link href="/dashboard/mentors">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {mentorsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : mentors.length === 0 ? (
              <div className="py-8 text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  No mentors available
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {mentors.slice(0, 4).map((mentor) => (
                  <div
                    key={mentor.id}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    <Avatar>
                      <AvatarImage src={mentor.profilePicture} />
                      <AvatarFallback>
                        {getInitials(mentor.name || "M")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{mentor.name}</p>
                      <p className="text-sm text-gray-600">
                        {mentor.mentorProfile?.headline || "Expert Mentor"}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {mentor.mentorProfile?.rating?.toFixed(1) || "N/A"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatCurrency(
                            mentor.mentorProfile?.pricePerSession || 0
                          )}
                          /session
                        </span>
                      </div>
                    </div>
                    <Link href={`/dashboard/mentors/${mentor.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
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
            <Link href="/dashboard/mentors">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <Users className="h-6 w-6" />
                <span>Find Mentors</span>
              </Button>
            </Link>
            <Link href="/dashboard/bookings">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <Calendar className="h-6 w-6" />
                <span>My Bookings</span>
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <BookOpen className="h-6 w-6" />
                <span>Update Profile</span>
              </Button>
            </Link>
            <Link href="/dashboard/notifications">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <TrendingUp className="h-6 w-6" />
                <span>Notifications</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
