"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { adminApi } from "../../../lib/api";

const formatDateTime = (v) => {
  if (!v) return "-";
  try { return new Date(v).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); } catch { return v; }
};
const formatCurrency = (v) => `₹${(v || 0).toLocaleString("en-IN")}`;

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

const OVERRIDE_STATUSES = [
  "CONFIRMED", "COMPLETED", "CANCELLED_BY_MENTOR", "CANCELLED_BY_MENTEE",
  "NO_SHOW_MENTOR", "NO_SHOW_MENTEE", "REFUND_INITIATED", "REFUND_COMPLETED"
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState("");
  const [mutatingId, setMutatingId] = useState("");
  
  // Override state
  const [overrideStatus, setOverrideStatus] = useState("");
  const [adminNote, setAdminNote] = useState("");

  const loadBookings = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await adminApi.listBookings({
        page,
        limit: 20,
        search: search || undefined,
        status: statusFilter || undefined,
      });
      setBookings(res.data.bookings);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    loadBookings(1);
  }, [loadBookings]);

  const handleOverrideStatus = async (bookingId) => {
    if (!overrideStatus) return toast.error("Select a status to override");
    setMutatingId(bookingId);
    try {
      await adminApi.overrideBookingStatus(bookingId, { status: overrideStatus, adminNote });
      toast.success("Booking status overridden");
      setOverrideStatus("");
      setAdminNote("");
      loadBookings(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setMutatingId("");
    }
  };

  const handleAdminCancel = async (bookingId) => {
    if (!confirm("Are you sure you want to force-cancel this booking? It will trigger a full refund automatically.")) return;
    setMutatingId(bookingId);
    try {
      await adminApi.adminCancelBooking(bookingId, { reason: adminNote || "Admin force cancel" });
      toast.success("Booking cancelled and refund initiated");
      setAdminNote("");
      loadBookings(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setMutatingId("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Bookings</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Monitor all sessions, override statuses, and manage disputes.</p>
      </header>

      {/* Filters */}
      <section className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by ID, mentor, or mentee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-[240px] flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] px-4 py-2.5 text-sm text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-indigo-500 transition-colors shadow-xs"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] px-4 py-2.5 text-sm text-zinc-900 dark:text-white outline-none focus:border-indigo-500 transition-colors shadow-xs cursor-pointer"
        >
          <option value="">All Statuses</option>
          {Object.keys(STATUS_COLORS).map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 pl-2">
          {pagination.total} bookings
        </div>
      </section>

      {/* Bookings List */}
      <section className="space-y-4">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-zinc-300 dark:border-zinc-800 border-t-indigo-600 dark:border-t-white" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-12 text-center shadow-xs">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No bookings found</p>
          </div>
        ) : (
          bookings.map((b) => (
            <article key={b.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-xs transition-colors">
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {b.mentee?.name || "Unknown"} <span className="text-zinc-400 dark:text-zinc-600 mx-2">→</span> {b.mentor?.name || "Unknown"}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{b.service?.title} · {formatDateTime(b.startTime)}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[b.status] || "border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/50"}`}>
                      {b.status?.replace(/_/g, " ")}
                    </span>
                    <p className="mt-2 font-mono text-[10px] text-zinc-400 dark:text-zinc-600">ID: {b.id}</p>
                  </div>
                </div>

                {/* Actions row */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      if (expandedId === b.id) {
                        setExpandedId("");
                      } else {
                        setExpandedId(b.id);
                        setOverrideStatus("");
                        setAdminNote("");
                      }
                    }}
                    className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
                  >
                    {expandedId === b.id ? "Close Actions" : "Manage Booking"}
                  </button>
                  {b.payment && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Payment: <span className="font-semibold text-zinc-900 dark:text-white">{formatCurrency(b.payment.amount)}</span> ({b.payment.status})
                    </span>
                  )}
                </div>

                {/* Expanded Detail & Admin Actions */}
                {expandedId === b.id && (
                  <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Info Panel */}
                      <div className="space-y-4 rounded-xl bg-zinc-50 dark:bg-black p-4 border border-zinc-200 dark:border-zinc-800/50">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Booking Info</h4>
                        {b.purposeOfCall && (
                          <div>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Purpose</span>
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">{b.purposeOfCall}</span>
                          </div>
                        )}
                        {b.cancelledReason && (
                          <div>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Cancel Reason</span>
                            <span className="text-sm text-red-500 font-medium">{b.cancelledReason}</span>
                          </div>
                        )}
                        {b.payment && (
                          <div className="flex flex-wrap gap-4 pt-2">
                            <div>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Platform Fee</span>
                              <span className="text-sm font-semibold text-zinc-900 dark:text-white">{formatCurrency(b.payment.platformFee)}</span>
                            </div>
                            <div>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Mentor Earned</span>
                              <span className="text-sm font-semibold text-zinc-900 dark:text-white">{formatCurrency(b.payment.mentorAmount)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Admin Actions Panel */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-red-500">Danger Zone</h4>
                        
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Admin note (required for actions)..."
                            value={adminNote}
                            onChange={(e) => setAdminNote(e.target.value)}
                            className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-3 py-2 text-xs text-zinc-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                          />
                          
                          <div className="flex gap-2">
                            <select
                              value={overrideStatus}
                              onChange={(e) => setOverrideStatus(e.target.value)}
                              className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-3 py-2 text-xs text-zinc-900 dark:text-white outline-none focus:border-indigo-500 cursor-pointer"
                            >
                              <option value="">Select status override...</option>
                              {OVERRIDE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <button
                              onClick={() => handleOverrideStatus(b.id)}
                              disabled={!overrideStatus || mutatingId === b.id}
                              className="rounded-lg bg-zinc-900 dark:bg-zinc-800 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              {mutatingId === b.id ? "..." : "Override"}
                            </button>
                          </div>

                          {!["COMPLETED", "CANCELLED_BY_MENTOR", "CANCELLED_BY_MENTEE", "REFUND_COMPLETED"].includes(b.status) && (
                            <button
                              onClick={() => handleAdminCancel(b.id)}
                              disabled={mutatingId === b.id}
                              className="w-full rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-900/50 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              Force Cancel &amp; Refund
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </section>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <button
            onClick={() => loadBookings(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={() => loadBookings(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
