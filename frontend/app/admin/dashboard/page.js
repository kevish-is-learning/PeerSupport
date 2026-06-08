"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { adminApi } from "../../../lib/api";

const formatCurrency = (v) => `₹${(v || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
const formatDate = (v) => {
  if (!v) return "-";
  try { return new Date(v).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); } catch { return v; }
};
const formatDateTime = (v) => {
  if (!v) return "-";
  try { return new Date(v).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); } catch { return v; }
};

const STATUS_COLORS = {
  CONFIRMED: "border-blue-900/50 text-blue-400 bg-blue-950/20",
  COMPLETED: "border-emerald-900/50 text-emerald-400 bg-emerald-950/20",
  PAYMENT_PENDING: "border-amber-900/50 text-amber-400 bg-amber-950/20",
  CANCELLED_BY_MENTOR: "border-red-900/50 text-red-400 bg-red-950/20",
  CANCELLED_BY_MENTEE: "border-red-900/50 text-red-400 bg-red-950/20",
  NO_SHOW_MENTOR: "border-orange-900/50 text-orange-400 bg-orange-950/20",
  NO_SHOW_MENTEE: "border-orange-900/50 text-orange-400 bg-orange-950/20",
  REFUND_INITIATED: "border-purple-900/50 text-purple-400 bg-purple-950/20",
  REFUND_COMPLETED: "border-purple-900/50 text-purple-400 bg-purple-950/20",
  IN_PROGRESS: "border-cyan-900/50 text-cyan-400 bg-cyan-950/20",
};

function StatCard({ label, value, sub }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-medium tracking-tight text-white">{value}</p>
      {sub && <p className="mt-2 text-xs text-zinc-500">{sub}</p>}
    </article>
  );
}

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || "border-zinc-800 text-zinc-400 bg-zinc-900/50";
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${color}`}>
      {status?.replace(/_/g, " ")}
    </span>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminApi.getDashboardStats();
        setStats(res.data);
      } catch (err) {
        toast.error(err.message || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-zinc-800 border-t-white" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-light tracking-tight text-white">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-zinc-400">Platform metrics and recent activity across PeerSupport.</p>
      </header>

      {/* Key Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={stats.users.total} sub={`${stats.users.mentors} Mentors · ${stats.users.mentees} Mentees`} />
        <StatCard label="Total Revenue" value={formatCurrency(stats.revenue.totalCollected)} sub={`Platform: ${formatCurrency(stats.revenue.platformEarnings)}`} />
        <StatCard label="Total Bookings" value={stats.bookings.total} sub={`${stats.bookings.thisMonth} this month`} />
        <StatCard label="Pending Payouts" value={stats.payouts.pending} sub={`Disbursed: ${formatCurrency(stats.payouts.completedTotal)}`} />
      </section>

      {/* Secondary Metrics */}
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active Mentors" value={stats.users.activeMentors} />
        <StatCard label="Pending Applications" value={stats.users.pendingMentors} />
        <StatCard label="This Month Revenue" value={formatCurrency(stats.revenue.thisMonthCollected)} sub={`Platform: ${formatCurrency(stats.revenue.thisMonthPlatformFee)}`} />
      </section>

      {/* Booking Status Breakdown */}
      <section className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-6">
        <h2 className="text-sm font-medium text-white">Booking Breakdown</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {Object.entries(stats.bookings.byStatus || {}).map(([status, count]) => (
            <div key={status} className="flex items-center gap-3 rounded-full border border-zinc-800 bg-black pl-1 pr-4 py-1">
              <StatusBadge status={status} />
              <span className="text-sm font-medium text-white">{count}</span>
            </div>
          ))}
          {Object.keys(stats.bookings.byStatus || {}).length === 0 && (
            <p className="text-sm text-zinc-500">No bookings yet</p>
          )}
        </div>
      </section>

      {/* Two-column: Recent Bookings + Mentor Applications */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <section className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] overflow-hidden">
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
            <h2 className="text-sm font-medium text-white">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
              View All
            </Link>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {(stats.recentBookings || []).map((b) => (
              <div key={b.id} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-900/20 transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">{b.menteeName} <span className="text-zinc-600 mx-1">→</span> {b.mentorName}</p>
                  <p className="mt-1 text-[11px] text-zinc-500">{b.serviceName} · {formatDateTime(b.startTime)}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
            {(stats.recentBookings || []).length === 0 && (
              <div className="px-6 py-8 text-center text-sm text-zinc-500">No recent bookings</div>
            )}
          </div>
        </section>

        {/* Pending Mentor Applications */}
        <section className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] overflow-hidden">
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
            <h2 className="text-sm font-medium text-white">Pending Mentor Applications</h2>
            <Link href="/admin/mentors" className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
              View All
            </Link>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {(stats.recentApplications || []).map((a) => (
              <div key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-900/20 transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">{a.name}</p>
                  <p className="mt-1 text-[11px] text-zinc-500">{a.email}</p>
                </div>
                <span className="text-[11px] text-zinc-600">{formatDate(a.createdAt)}</span>
              </div>
            ))}
            {(stats.recentApplications || []).length === 0 && (
              <div className="px-6 py-8 text-center text-sm text-zinc-500">No pending applications</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
