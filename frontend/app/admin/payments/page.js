"use client";

import { useEffect, useState, useCallback, Fragment } from "react";
import { toast } from "sonner";
import { adminApi } from "../../../lib/api";

const formatDateTime = (v) => {
  if (!v) return "-";
  try { return new Date(v).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); } catch { return v; }
};
const formatCurrency = (v) => `₹${(v || 0).toLocaleString("en-IN")}`;

const STATUS_COLORS = {
  SUCCESS: "border-emerald-900/50 bg-emerald-950/20 text-emerald-400",
  PENDING: "border-amber-900/50 bg-amber-950/20 text-amber-400",
  FAILED: "border-red-900/50 bg-red-950/20 text-red-400",
  REFUNDED: "border-purple-900/50 bg-purple-950/20 text-purple-400",
  PARTIALLY_REFUNDED: "border-indigo-900/50 bg-indigo-950/20 text-indigo-400",
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState("");
  const [mutatingId, setMutatingId] = useState("");
  
  // Refund state
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");

  const loadData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const [paymentsRes, summaryRes] = await Promise.all([
        adminApi.listPayments({ page, limit: 20, status: statusFilter || undefined }),
        adminApi.getRevenueSummary()
      ]);
      setPayments(paymentsRes.data.payments);
      setPagination(paymentsRes.data.pagination);
      setSummary(summaryRes.data);
    } catch (err) {
      toast.error(err.message || "Failed to load payment data");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadData(1);
  }, [loadData]);

  const handleRefund = async (paymentId, maxAmount) => {
    const amount = Number(refundAmount) || maxAmount;
    if (amount > maxAmount) return toast.error("Refund amount cannot exceed payment amount");
    
    if (!confirm(`Are you sure you want to refund ${formatCurrency(amount)}?`)) return;
    
    setMutatingId(paymentId);
    try {
      await adminApi.adminRefund(paymentId, { amount, reason: refundReason || "Admin refund" });
      toast.success("Refund processed successfully");
      setRefundAmount("");
      setRefundReason("");
      setExpandedId("");
      loadData(pagination.page);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setMutatingId("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <h1 className="text-3xl font-light tracking-tight text-white">Payments & Revenue</h1>
        <p className="mt-2 text-sm text-zinc-400">Track platform revenue, mentor earnings, and process refunds.</p>
      </header>

      {/* Summary Cards */}
      {summary && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">Total Volume</p>
            <p className="mt-3 text-3xl font-medium tracking-tight text-white">{formatCurrency(summary.allTime.totalCollected)}</p>
            <p className="mt-2 text-xs text-zinc-500">{summary.allTime.transactionCount} transactions</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">Platform Revenue</p>
            <p className="mt-3 text-3xl font-medium tracking-tight text-emerald-400">{formatCurrency(summary.allTime.platformEarnings)}</p>
            <p className="mt-2 text-xs text-zinc-500">This month: {formatCurrency(summary.thisMonth.platformEarnings)}</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">Mentor Earnings</p>
            <p className="mt-3 text-3xl font-medium tracking-tight text-white">{formatCurrency(summary.allTime.mentorEarnings)}</p>
            <p className="mt-2 text-xs text-zinc-500">Total generated for mentors</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500">Total Refunded</p>
            <p className="mt-3 text-3xl font-medium tracking-tight text-white">{formatCurrency(summary.refunds.totalRefunded)}</p>
            <p className="mt-2 text-xs text-zinc-500">{summary.refunds.refundCount} refunds processed</p>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-zinc-800 bg-[#0a0a0a] px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-600 transition-colors"
        >
          <option value="">All Statuses</option>
          {Object.keys(STATUS_COLORS).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 pl-2">
          {pagination.total} payments
        </div>
      </section>

      {/* Payments List */}
      <section className="rounded-2xl border border-zinc-800 bg-[#0a0a0a] overflow-hidden">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-zinc-800 border-t-white" />
          </div>
        ) : payments.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-zinc-500">No payments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-zinc-800 bg-black/50 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  <th className="px-6 py-4 font-medium">Transaction</th>
                  <th className="px-6 py-4 font-medium">Amount & Fee</th>
                  <th className="px-6 py-4 font-medium">Users</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {payments.map((p) => (
                  <Fragment key={p.id}>
                    <tr className="hover:bg-zinc-900/20 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-mono text-xs text-white">{p.razorpayPaymentId || p.id.slice(0, 13)}</p>
                        <p className="mt-1 text-[11px] text-zinc-500">{formatDateTime(p.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">{formatCurrency(p.amount)}</p>
                        <p className="mt-1 text-[10px] text-zinc-500">Fee: {formatCurrency(p.platformFee)} · Mentor: {formatCurrency(p.mentorAmount)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-white truncate max-w-[150px]">{p.booking?.menteeName || "Unknown"}</p>
                        <p className="mt-1 text-xs text-zinc-500 truncate max-w-[150px]">→ {p.booking?.mentorName || "Unknown"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${STATUS_COLORS[p.paymentStatus] || "border-zinc-800 text-zinc-400 bg-zinc-900/50"}`}>
                          {p.paymentStatus}
                        </span>
                        {p.refundedAmount > 0 && (
                          <p className="mt-1 text-[10px] text-zinc-500">Refunded: {formatCurrency(p.refundedAmount)}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {p.paymentStatus === "SUCCESS" && (
                          <button
                            onClick={() => setExpandedId(expandedId === p.id ? "" : p.id)}
                            className="rounded-lg border border-zinc-800 bg-black px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                          >
                            {expandedId === p.id ? "Cancel" : "Refund"}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expandedId === p.id && (
                      <tr>
                        <td colSpan="5" className="p-0 border-b border-zinc-800">
                          <div className="bg-black/80 p-6">
                            <h4 className="text-[10px] font-medium uppercase tracking-wider text-red-500 mb-4">Process Refund</h4>
                            <div className="flex flex-wrap items-end gap-3 max-w-2xl">
                              <div className="flex-1">
                                <label className="block text-xs text-zinc-500 mb-1.5">Amount (leave blank for full refund)</label>
                                <input
                                  type="number"
                                  placeholder="₹"
                                  value={refundAmount}
                                  onChange={(e) => setRefundAmount(e.target.value)}
                                  className="w-full rounded-lg border border-zinc-800 bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-zinc-600 transition-colors"
                                />
                              </div>
                              <div className="flex-[2]">
                                <label className="block text-xs text-zinc-500 mb-1.5">Reason</label>
                                <input
                                  type="text"
                                  placeholder="Reason for refund..."
                                  value={refundReason}
                                  onChange={(e) => setRefundReason(e.target.value)}
                                  className="w-full rounded-lg border border-zinc-800 bg-[#0a0a0a] px-3 py-2 text-sm text-white outline-none focus:border-zinc-600 transition-colors"
                                />
                              </div>
                              <button
                                onClick={() => handleRefund(p.id, p.amount)}
                                disabled={!!mutatingId}
                                className="rounded-lg border border-red-900/50 bg-red-950/30 px-5 py-2 text-sm font-medium text-red-400 hover:bg-red-900/50 transition-colors disabled:opacity-50 h-[38px]"
                              >
                                {mutatingId === p.id ? "Processing..." : "Process Refund"}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4">
            <button
              onClick={() => loadData(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="rounded-lg border border-zinc-800 bg-black px-4 py-2 text-xs font-medium text-white hover:bg-zinc-900 transition-colors disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => loadData(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="rounded-lg border border-zinc-800 bg-black px-4 py-2 text-xs font-medium text-white hover:bg-zinc-900 transition-colors disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
