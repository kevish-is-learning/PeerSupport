"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/stores/adminStore";
import { Users, UserCheck, UserPlus, FileCheck, Loader2, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { stats, fetchStats, isLoading } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const STAT_CARDS = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-500/10 text-blue-400",
      href: "/admin/users",
    },
    {
      title: "Mentors",
      value: stats?.totalMentors || 0,
      icon: UserCheck,
      color: "bg-green-500/10 text-green-400",
      href: "/admin/users?role=MENTOR",
    },
    {
      title: "Mentees",
      value: stats?.totalMentees || 0,
      icon: UserPlus,
      color: "bg-purple-500/10 text-purple-400",
      href: "/admin/users?role=MENTEE",
    },
    {
      title: "Pending Applications",
      value: stats?.pendingApplications || 0,
      icon: FileCheck,
      color: "bg-yellow-500/10 text-yellow-400",
      href: "/admin/applications?status=PENDING",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of platform activity and statistics
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {card.value.toLocaleString()}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                  <card.icon size={24} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link
            href="/admin/applications"
            className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition group"
          >
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <FileCheck size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Review Applications</p>
              <p className="text-xs text-muted-foreground">Approve mentor requests</p>
            </div>
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition group"
          >
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Manage Users</p>
              <p className="text-xs text-muted-foreground">View and edit users</p>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition group"
          >
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Platform Settings</p>
              <p className="text-xs text-muted-foreground">Configure platform</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <p className="text-sm text-muted-foreground text-center py-8">
          Activity feed coming soon...
        </p>
      </div>
    </div>
  );
}
