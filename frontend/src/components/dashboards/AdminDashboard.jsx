"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  FileText,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAdminStore } from "../../stores/adminStore";
import { useAuthStore } from "../../stores/authStore";
import { formatDate, getInitials } from "../../lib/utils";
import { Spinner } from "../ui/spinner";

export function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const {
    users,
    usersLoading,
    fetchUsers,
    applications,
    applicationsLoading,
    fetchApplications,
  } = useAdminStore();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMentors: 0,
    totalMentees: 0,
    pendingApplications: 0,
  });

  useEffect(() => {
    fetchUsers({ limit: 5 });
    fetchApplications({ status: "PENDING", limit: 5 });
  }, [fetchUsers, fetchApplications]);

  useEffect(() => {
    const mentors = users.filter((u) => u.role === "MENTOR").length;
    const mentees = users.filter((u) => u.role === "MENTEE").length;
    const pending = applications.filter((a) => a.status === "PENDING").length;

    setStats({
      totalUsers: users.length,
      totalMentors: mentors,
      totalMentees: mentees,
      pendingApplications: pending,
    });
  }, [users, applications]);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Mentors",
      value: stats.totalMentors,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Mentees",
      value: stats.totalMentees,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pending Applications",
      value: stats.pendingApplications,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-gray-600">
          Manage users, applications, and platform settings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
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
        {/* Pending Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Pending Applications</CardTitle>
              {stats.pendingApplications > 0 && (
                <Badge variant="destructive">{stats.pendingApplications}</Badge>
              )}
            </div>
            <Link href="/dashboard/applications">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {applicationsLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : applications.filter((a) => a.status === "PENDING").length === 0 ? (
              <div className="py-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  No pending applications
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications
                  .filter((a) => a.status === "PENDING")
                  .slice(0, 5)
                  .map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center gap-4 rounded-lg border p-4"
                    >
                      <Avatar>
                        <AvatarImage src={app.user?.profilePicture} />
                        <AvatarFallback>
                          {getInitials(app.user?.name || "U")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{app.user?.name}</p>
                        <p className="text-sm text-gray-600">
                          {app.headline || "Mentor Application"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Applied {formatDate(app.createdAt)}
                        </p>
                      </div>
                      <Link href={`/dashboard/applications/${app.id}`}>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Users</CardTitle>
            <Link href="/dashboard/users">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : users.length === 0 ? (
              <div className="py-8 text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">No users found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.slice(0, 5).map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    <Avatar>
                      <AvatarImage src={u.profilePicture} />
                      <AvatarFallback>{getInitials(u.name || "U")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{u.name}</p>
                      <p className="text-sm text-gray-600">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          u.role === "ADMIN"
                            ? "destructive"
                            : u.role === "MENTOR"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {u.role}
                      </Badge>
                      {!u.isActive && (
                        <Badge variant="outline" className="text-red-600">
                          Inactive
                        </Badge>
                      )}
                    </div>
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
            <Link href="/dashboard/users">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Button>
            </Link>
            <Link href="/dashboard/applications">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <FileText className="h-6 w-6" />
                <span>Review Applications</span>
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <TrendingUp className="h-6 w-6" />
                <span>View Analytics</span>
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <AlertCircle className="h-6 w-6" />
                <span>Settings</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
